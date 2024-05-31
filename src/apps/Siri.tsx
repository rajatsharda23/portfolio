import { useDispatch, useSelector } from 'react-redux'
import back from '../assets/icons/safariBack.png'
import { RootState } from '../redux/store'
import { setCurrApp } from '../redux/slices/homePage/appSlice'
import siri from '../assets/icons/siri.png'

const Siri = () => {
  const currApp = useSelector((state: RootState) => state.app.currApp)
  const dispatch = useDispatch()

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
        
        <div className='fixed p-20 h-5/6 w-full'>
            <div className='p-20 border h-full w-full border-white rounded-3xl shadow-sm shadow-white'>
                <div className='h-full w-full backdrop-blur-3xl'>
                    <div className='font-Apple_Regular text-xl bg-inherit'>
                
                        <div className='flex items-center space-x-2'>
                            
                            <div className='h-10 w-10'>
                                <img src={siri} alt="siriLogo" />
                            </div>
                            <div className='min-w-40 min-h-12 p-2 border border-gray-400 rounded-xl overflow-hidden bg-blue-900 bg-opacity-50 bg-blend-overlay'>
                                Hey there! I am a PhD student at the Computer Science and Engineering department of Pennsylvania State University. Previously, I received my master's degree in Computer Science from Boston University and my bachelor’s degree in Software Engineering from Tongji University. I'm trying to find a balance between research and engineering.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Siri
