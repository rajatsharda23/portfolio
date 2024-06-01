import { useDispatch, useSelector } from 'react-redux'
import back from '../assets/icons/safariBack.png'
import { RootState } from '../redux/store'
import { setCurrApp } from '../redux/slices/homePage/appSlice'
import SiriMessage from '../components/SiriMessage'
import UserMessage from '../components/UserMessage'
import { useState } from 'react'

const Siri = () => {
  const currApp = useSelector((state: RootState) => state.app.currApp)
  const dispatch = useDispatch()

  const [userInput, setUserInput] = useState<string>("")
  const [input, setInput] = useState<string>("")

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e:any) => {
    if(e.key==='Enter'){
        setUserInput(input)
        setInput("")
    }
  }



  return (
    <div className="fixed h-screen w-screen bg-light-bg bg-cover text-white">
        <div className="h-full w-full backdrop-filter backdrop-brightness-105 backdrop-blur-2xl">
            <div className="p-20 w-full">
                <div className="flex justify-center">
                    <div className="absolute left-0 top-0 pt-16 pl-20">
                        <img src={back} className='cursor-pointer' alt="back-button" onClick={() => dispatch(setCurrApp('Finder'))} />
                    </div>
                    <div className="text-5xl font-Apple_Bold">
                        Ask Siri anything about Me!
                    </div>
                </div>
            </div>
        
            <div className='fixed p-20 py-10 h-4/6 w-full'>
                <div className='p-16 pt-16 border h-full w-full border-white rounded-3xl shadow-sm shadow-white overflow-auto'>
                    <div className='font-Apple_Regular text-xl bg-inherit space-y-2'>
                        <div className='flex flex-col space-y-2'>
                        <SiriMessage />

                        {userInput && <UserMessage userInput={userInput}/>}

                        </div>
                    </div>
                </div>
            </div>
            
            <div className='fixed bottom-10 left-0 right-0 px-20 w-full rounded-xl font-Apple_Regular'>
                <input type='text' 
                className='rounded-xl border border-white  shadow-xl bg-inherit w-full min-h-12 overflow-hidden px-3 text-lg' 
                onChange={handleInput} 
                onKeyDown={handleKeyDown}/>
            </div>

        </div>
    </div>
  )
}

export default Siri
