import React from 'react';
import './App.css';
import bkgrd from './assets/ui/wallpaper-day.jpg'
import Navbar from './components/Navbar';
import Dock from './components/Dock';

function App() {
  return (
    <div className='fixed h-screen w-screen bg-light-bg bg-cover'>

      
      <Navbar />
      
      <div className='flex fixed bottom-0 right-0 left-0'>
        <Dock/>
      </div>
      
    </div>
  )
}

export default App;
