import { useDispatch, useSelector } from 'react-redux'
import back from '../assets/icons/safariBack.png'
import { RootState } from '../redux/store'
import { setCurrApp } from '../redux/slices/homePage/appSlice'
import SiriMessage from '../components/SiriMessage'
import UserMessage from '../components/UserMessage'
import { useState, useEffect, useRef } from 'react'
import { getGroqChatStream } from '../Siri_backend/groq'

const Siri = () => {
  const currApp = useSelector((state: RootState) => state.app.currApp)
  const dispatch = useDispatch()

  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [responseSpeed, setResponseSpeed] = useState<string>("immediate")

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponseSpeed(e.target.value)
  }

  const handleKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
        const userMessage = input.trim()
        if (userMessage) {
            setMessages([...messages, { sender: 'user', text: userMessage }])
            setInput("")
            setLoading(true)
            
            try {
                const stream = await getGroqChatStream(userMessage)
                let siriMessage = ""

                setMessages((prevMessages) => [...prevMessages, { sender: 'siri', text: "" }])
                
                const delay = responseSpeed === 'immediate' ? 0 : responseSpeed === 'fast' ? 50 : 100
                
                for await (const chunk of stream) {
                    siriMessage += chunk.choices[0]?.delta?.content || ""
                    
                    setMessages((prevMessages) => {
                        const newMessages = [...prevMessages]
                        newMessages[newMessages.length - 1] = { sender: 'siri', text: siriMessage }
                        return newMessages
                    })

                    if (delay > 0) {
                      await new Promise(resolve => setTimeout(resolve, delay))
                    }
                }
            } catch (error) {
                console.error("Error fetching the API:", error)
                setMessages((prevMessages) => [...prevMessages, { sender: 'siri', text: "Sorry, I couldn't get an answer." }])
            } finally {
                setLoading(false)
            }
        }
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="fixed h-screen w-screen bg-light-bg bg-cover text-white">
      <div className="h-full w-full backdrop-filter backdrop-brightness-105 backdrop-blur-2xl">
        <div className="p-20 w-full">
          <div className="flex justify-center">
            <div className="absolute left-0 top-0 pt-16 pl-20">
              <img src={back} className='cursor-pointer' alt="back-button" onClick={() => dispatch(setCurrApp('Finder'))} />
            </div>
            <div className="text-5xl font-Apple_Bold">
              Ask Siri about anything!
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <div className='font-Apple_Regular text-sm'>
                <a className='pr-4'> Response : </a>
              <label className="pr-4">
                <input type="radio" value="immediate" checked={responseSpeed === 'immediate'} onChange={handleSpeedChange} />
                Immediate
              </label>
              <label className="pr-4">
                <input type="radio" value="fast" checked={responseSpeed === 'fast'} onChange={handleSpeedChange} />
                Fast
              </label>
              <label>
                <input type="radio" value="slow" checked={responseSpeed === 'slow'} onChange={handleSpeedChange} />
                Slow
              </label>
            </div>
          </div>
        </div>
      
        <div className='fixed p-20 py-10 h-3/5 w-full'>
          <div className='p-16 pt-16 border h-full w-full border-white rounded-3xl shadow-sm shadow-white overflow-auto'>
            <div className='font-Apple_Regular text-xl bg-inherit space-y-2'>
              <div className='flex flex-col space-y-2'>
                <SiriMessage />
                {messages.map((msg, index) => (
                  msg.sender === 'user' ? 
                  <UserMessage key={index} userInput={msg.text} /> : 
                  <SiriMessage key={index} message={msg.text} />
                ))}
                {loading && <div className="text-white">Siri is typing...</div>}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
        
        <div className='fixed bottom-10 left-0 right-0 px-20 w-full rounded-xl font-Apple_Regular'>
          <input type='text' 
            placeholder='Write anything to ask to Siri....'
            className='rounded-xl border border-white shadow-xl bg-inherit w-full min-h-12 overflow-hidden px-3 text-lg' 
            value={input}
            onChange={handleInput} 
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  )
}

export default Siri
