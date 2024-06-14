import { useDispatch, useSelector } from 'react-redux';
import { setAppleClicked, setLock, setRestart, setShutDown, setSleep } from '../redux/slices/homePage/homeSlice';
import { RootState } from '../redux/store';
import { stat } from 'fs';

const MenuBar = () => {
    const dispatch = useDispatch()

    const appleClicked = useSelector((state : RootState)=> state.home.appleClicked)

    const handleShutDown = () => {
        dispatch(setShutDown(true))
        dispatch(setLock(true))
    }

    const handleRestart = () => {
        dispatch(setRestart(true))
        dispatch(setLock(true))
    }

    return (
        <div className={`w-60 border border-gray-300 shadow-md bg-slate-100 rounded-lg pl-2 ${!appleClicked && 'hidden'}`} onClick={() => dispatch(setAppleClicked(false))}>
            <div className='pr-1 font-sans text-sm'>
                <div className='py-1'>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md'>
                        <div className='py-1 px-2'>
                            About this Mac
                        </div>
                    </div>
                </div>
                <div className='border-t border-gray-300 mx-2 my-1'></div>
                <div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md'>
                        <div className='py-1 px-2'>
                            System Preferences...
                        </div>
                    </div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md'>
                        <div className='py-1 px-2'>
                            App Store...
                        </div>
                    </div>
                </div>
                <div className='border-t border-gray-300 mx-2 my-1'></div>
                <div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md'>
                        <div className='py-1 px-2'>
                            Recent Items
                        </div>
                    </div>
                </div>
                <div className='border-t border-gray-300 mx-2 my-1'></div>
                <div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md'>
                        <div className='py-1 px-2'>
                            Force Quit...
                        </div>
                    </div>
                </div>
                <div className='border-t border-gray-300 mx-2 my-1'></div>
                <div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md' onClick={() => dispatch(setSleep(true))}>
                        <div className='py-1 px-2'>
                            Sleep
                        </div>
                    </div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md' onClick={handleRestart}>
                        <div className='py-1 px-2'>
                            Restart...
                        </div>
                    </div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md' onClick={handleShutDown}>
                        <div className='py-1 px-2'>
                            Shut Down...
                        </div>
                    </div>
                </div>
                <div className='border-t border-gray-300 mx-2 my-1'></div>
                <div className='py-1'>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md' onClick={() => dispatch(setLock(true))}>
                        <div className='py-1 px-2'>
                            Lock Screen
                        </div>
                    </div>
                    <div className='hover:bg-blue-500 hover:text-white rounded-md' onClick={() => dispatch(setShutDown(true))}>
                        <div className='py-1 px-2'>
                            Log Out Rajat Sharda...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuBar
