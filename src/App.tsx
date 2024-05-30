import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dock from './components/Dock'
import Login from './components/Login'
import Notepad from './apps/Notepad'
import type { RootState } from '../src/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setLock } from './redux/slices/homePage/homeSlice'
import ShutSleep from './components/ShutSleep'
import MasterApp from './apps/MasterApp'
import { Root } from 'react-dom/client'
import { stat } from 'fs'

function App() {
  
  const isLocked = useSelector((state: RootState) => state.home.isLocked)
  const isRestart = useSelector((state: RootState) => state.home.isRestart)
  const isSleep = useSelector((state: RootState) => state.home.isSleep)
  const isShutDown = useSelector((state: RootState) => state.home.isShutDown)
  const currApp = useSelector((state : RootState) => state.app.currApp)
  
  const dispatch = useDispatch()

  return (

    isLocked?
    <div className='fixed h-screen w-screen'>
      {isSleep || isRestart || isShutDown?<ShutSleep /> : 
      <Login />}
    </div>
    :
    <div className='fixed h-screen w-screen bg-light-bg bg-cover'>
      
      <div>
        <Navbar />
      </div>

      <div className='flex justify-center items-center h-screen'> 
        {currApp==="Finder"? <div></div> 
        :<MasterApp />}
      </div>
      
      <div></div>
      
      <div className='flex fixed bottom-0 right-0 left-0'>
        <Dock/>
      </div>

      
    </div>
  )
}

export default App;
