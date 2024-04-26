import React, { useState } from 'react'
import  appleLogo from '../assets/icons/apple_light/icons8-apple-100.png'
import ProgressBar from "@ramonak/react-progress-bar";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setSleep, setRestart, setShutDown } from '../redux/slices/homePage/homeSlice'



const ShutSleep = () => {

    const[value,setValue] = useState(0)

    const isRestart = useSelector((state: RootState) => state.home.isRestart)
    const isSleep = useSelector((state: RootState) => state.home.isSleep)
    const isShutDown = useSelector((state: RootState) => state.home.isShutDown)
    const dispatch = useDispatch();

    React.useEffect(() => {
        const id = setInterval(() => {
            if (value === 100) {
                clearInterval(id);
                // Trigger actions when value reaches 100
                dispatch(setSleep(false));
                dispatch(setRestart(false));
                dispatch(setShutDown(false));
            } else {
                setValue((prevValue) => prevValue + 1); 
            }
        }, 20);

        return () => clearInterval(id); // Cleanup interval on unmount
    }, [dispatch, value]);


    const handleShutdown  = () => {
        dispatch(setShutDown(false))
        setValue(0)
        dispatch(setRestart(true))
        
    }

  return (
    <div className='flex h-screen w-screen fixed bg-black font-Apple_Regular text-white'>
        <div className='flex flex-col items-center justify-center h-full w-full space-y-8'>
            <div>
                <img src={appleLogo} />
            </div>
            <div className='py-4'>
                {isSleep? <div onClick={()=> dispatch(setSleep(false))}> Click to wake up</div> : 
                 isShutDown? <div onClick={handleShutdown}>Click to boot</div>  : 
                 isRestart?
                 <div>
                    <ProgressBar completed={value} className='w-80' baseBgColor='gray' bgColor='white' height='8px' transitionDuration='10'/>
                </div> :
                <div>wutt</div>}
            </div>
        </div>
    </div>
  )
}

export default ShutSleep
