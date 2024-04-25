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

function App() {
  
  const isLocked = useSelector((state: RootState) => state.home.isLocked)
  const dispatch = useDispatch()

  return (

    isLocked?
    <div className='fixed h-screen w-screen'>
      <ShutSleep />
      {/* <Login /> */}
    </div>
    :
    <div className='fixed h-screen w-screen bg-light-bg bg-cover'>
      
      <div>
        <Navbar />
      </div>

      <div className='flex justify-center items-center h-screen'> 
        <Notepad/>
        {/* <button onClick={()=>dispatch(setLock(true))}>Logout</button> */}
      </div>
      
      <div></div>
      
      <div className='flex fixed bottom-0 right-0 left-0'>
        <Dock/>
      </div>

      
    </div>
  )
}

export default App;
