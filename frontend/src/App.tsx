import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dock from './components/Dock';
import Login from './components/Login';
import Notepad from './apps/Notepad';
import type { RootState } from '../src/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setAppleClicked, setLock } from './redux/slices/homePage/homeSlice';
import ShutSleep from './components/ShutSleep';
import MasterApp from './apps/MasterApp';
import MenuBar from './components/MenuBar';
import Siri from './apps/Siri';

function App() {
    const isLocked = useSelector((state: RootState) => state.home.isLocked);
    const isRestart = useSelector((state: RootState) => state.home.isRestart);
    const isSleep = useSelector((state: RootState) => state.home.isSleep);
    const isShutDown = useSelector((state: RootState) => state.home.isShutDown);
    const currApp = useSelector((state: RootState) => state.app.currApp);
    const appleClicked = useSelector((state : RootState) => state.home.appleClicked)

    const dispatch = useDispatch();


    return (
        <div className='fixed h-screen w-screen'>
            {isSleep || isRestart || isShutDown ? (
                <ShutSleep />
            ) : isLocked ? (
                <Login />
            ) : (
                currApp === 'Siri' ?  <Siri />
                :<div className='fixed h-screen w-screen bg-light-bg bg-cover' >
                    <div>
                        <Navbar />
                    </div>

                    {appleClicked && <div className='top-0 left-0 pt-8 pl-2 absolute z-50'>
                        <MenuBar />
                    </div>}

                    <div className='h-full w-full' onClick={()=>dispatch(setAppleClicked(false))}>
                      <div className='flex justify-center items-center h-screen'>
                          {currApp === "Finder" ? <div></div> : <MasterApp />}
                      </div>

                      <div></div>

                      <div className='flex fixed bottom-0 right-0 left-0'>
                          <Dock />
                      </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
