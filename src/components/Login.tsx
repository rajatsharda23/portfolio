import React from 'react'
import PPic from '../assets/ui/Profile_pic.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setRestart, setShutDown, setSleep } from '../redux/slices/homePage/homeSlice'

const Login = () => {
    
    const isRestart = useSelector((state: RootState) => state.home.isRestart)
    const isSleep = useSelector((state: RootState) => state.home.isSleep)
    const isShutDown = useSelector((state: RootState) => state.home.isShutDown)
    const dispatch = useDispatch();

    const quesMark = "data:image/svg+xml;utf8,%3Csvg%20viewBox%3D'0%200%2016%2016'%20display%3D'inline-block'%20width%3D'1em'%20height%3D'1em'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20%3E%3Cpath%20fill%3D'currentColor'%20d%3D'M2%200a2%202%200%200%200-2%202v12a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V2a2%202%200%200%200-2-2zm3.496%206.033a.237.237%200%200%201-.24-.247C5.35%204.091%206.737%203.5%208.005%203.5c1.396%200%202.672.73%202.672%202.24c0%201.08-.635%201.594-1.244%202.057c-.737.559-1.01.768-1.01%201.486v.105a.25.25%200%200%201-.25.25h-.81a.25.25%200%200%201-.25-.246l-.004-.217c-.038-.927.495-1.498%201.168-1.987c.59-.444.965-.736.965-1.371c0-.825-.628-1.168-1.314-1.168c-.803%200-1.253.478-1.342%201.134c-.018.137-.128.25-.266.25h-.825zm2.325%206.443c-.584%200-1.009-.394-1.009-.927c0-.552.425-.94%201.01-.94c.609%200%201.028.388%201.028.94c0%20.533-.42.927-1.029.927'/%3E%3C/svg%3E";
    const sleep = "data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' fill-rule='evenodd' d='M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-4.101 5A6.977 6.977 0 0 1 12 19a6.977 6.977 0 0 1-4.899-2zm1.427-2a7 7 0 1 0-12.653 0z' clip-rule='evenodd'/%3E%3C/svg%3E"
    const restart = "data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772z'/%3E%3C/svg%3E"
    const shutDown = "data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m6.265 3.807l1.147 1.639a8 8 0 1 0 9.176 0l1.147-1.639A9.988 9.988 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12a9.988 9.988 0 0 1 4.265-8.193M11 12V2h2v10z'/%3E%3C/svg%3E"


    return (

    <div className='fixed h-screen w-screen bg-light-bg bg-cover font-Apple_Regular'>
        
        <div className='flex flex-col items-center justify-center h-4/5 space-y-4'>
            
            <div className='h-32 w-32 rounded inline-block'>
                <img src={PPic} className='rounded-full border border-white '/>
            </div>

            <div className='text-2xl font-Apple_Bold text-white'>
                Rajat Sharda
            </div>

            <div className='relative flex items-center'>
                <img src={quesMark} className='absolute z-50 right-2'
                style={{ width: '16px', height: '16px', filter: 'invert(100%)' }}/>
                <input className='text-white bg-gray-400 pt-1 p-1 pl-2 pr-8 rounded-lg opacity-95 tracking-wide flex items-center text-justify text-sm
                 placeholder:text-white placeholder:flex placeholder:text-sm placeholder:pl-1 placeholder:font-Apple_Regular' 
                type='password' placeholder='Enter Password '/>
            </div>

            <div className='text-white'>
                Click to Enter
            </div>

        </div>

        <div className='text-white flex flex-row items-center justify-center space-x-4'>
            
            <div className='flex flex-col items-center justify-center space-y-2 mx-8' onClick={()=>dispatch(setSleep(true))}>
                <div className='inline-block bg-slate-800 rounded-full'>
                    <img src={sleep} className='h-12 w-12' style={{ filter: 'invert(100%)' }} />
                </div>
               <div>
                    Sleep
               </div>
            </div>

            <div className='flex flex-col items-center justify-center space-y-2 px-8' onClick={()=>dispatch(setRestart(true))}>
                <div className='inline-block bg-slate-800 rounded-full'>
                    <img src={restart} className='h-12 w-12' style={{ filter: 'invert(100%)' }} />
                </div>
               <div>
                    Restart
               </div>
            </div>

            <div className='flex flex-col items-center justify-center space-y-2 px-4' onClick={()=>dispatch(setShutDown(true))}>
                <div className='inline-block bg-slate-800 rounded-full'>
                    <img src={shutDown} className='h-12 w-12' style={{ filter: 'invert(100%)' }} />
                </div>
               <div>
                    Shut Down
               </div>
            </div>

        </div>

    </div>
  )
}

export default Login