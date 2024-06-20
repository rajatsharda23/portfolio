import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import back from '../assets/icons/safariBack.png';
import { RootState } from '../redux/store';
import { setCurrApp } from '../redux/slices/homePage/appSlice';
import SiriMessage from '../components/SiriMessage';
import UserMessage from '../components/UserMessage';
import { newGroq, ConversationMemory } from '../Siri_backend/better_groq';

const Siri: React.FC = () => {
  const currApp = useSelector((state: RootState) => state.app.currApp);
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [responseSpeed, setResponseSpeed] = useState<string>("immediate");

  const memoryRef = useRef<ConversationMemory>(new ConversationMemory(5));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponseSpeed(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const userMessage = input.trim();
      if (userMessage) {
        setMessages(prevMessages => [...prevMessages, { sender: 'user', text: userMessage }]);
        setInput("");
        setLoading(true);

        try {
          const stream = newGroq(userMessage, memoryRef.current);
          let siriMessage = "";

          setMessages(prevMessages => [...prevMessages, { sender: 'siri', text: ".........." }]);

          const delay = responseSpeed === 'immediate' ? 0 : responseSpeed === 'fast' ? 50 : 100;

          for await (const chunk of stream) {
            siriMessage += chunk || "";

            setMessages(prevMessages => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1] = { sender: 'siri', text: siriMessage };
              return newMessages;
            });

            if (delay > 0) {
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        } catch (error) {
          console.error('Error fetching the API:', error);
          setMessages(prevMessages => {
            const errorMessage = "Sorry, I couldn't get an answer.";
            const isErrorAlreadyPresent = prevMessages.some(msg => msg.text === errorMessage);
            if (!isErrorAlreadyPresent) {
              return [...prevMessages, { sender: 'siri', text: errorMessage }];
            }
            return prevMessages;
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="fixed h-screen w-screen bg-light-bg bg-cover text-white">
      <div className="h-full w-full backdrop-filter backdrop-brightness-105 backdrop-blur-2xl pt-10">
        <div className="p-4 sm:p-4 lg:p-6 w-full">
          <div className="flex items-center mb-8">
            <div className="flex items-center p-1">
              <img
                src={back}
                className="cursor-pointer h-8 w-8"
                alt="back-button"
                onClick={() => dispatch(setCurrApp('Finder'))}
              />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl flex justify-center font-Apple_Bold w-full text-center">
              Ask Siri anything about Me!
            </div>
          </div>
          <div className="flex justify-center mb-4 text-center">
            <div className="font-Apple_Regular text-sm">
              <span className="pr-4">Response:</span>
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

        <div className="fixed inset-x-0 top-1/4 p-4 sm:p-2 lg:p-4 h-2/3 lg:h-1/2">
          <div className="p-4 border h-full border-white rounded-3xl shadow-sm shadow-white overflow-auto">
            <div className="font-Apple_Regular text-lg bg-inherit space-y-2">
              <div className="flex flex-col space-y-2">
                <SiriMessage />
                {messages.map((msg, index) =>
                  msg.sender === 'user' ? (
                    <UserMessage key={index} userInput={msg.text} />
                  ) : (
                    <SiriMessage key={index} message={msg.text} />
                  )
                )}
                {loading && <div className="text-white"></div>}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 left-0 right-0 px-8 sm:px-4 lg:px-6 w-full">
          <input
            type="text"
            placeholder="Write anything to ask to Siri...."
            className="rounded-xl border border-white shadow-xl bg-inherit w-full min-h-12 px-3 text-lg lg:text-base"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Siri;
