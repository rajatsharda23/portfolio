import Datetime from 'react-datetime';
import apple_logo from '../assets/icons/apple_light/icons8-apple-50.png'
import battery from '../assets/icons/battery.png'
import wifi from '../assets/icons/wifi.png'
import search from '../assets/icons/search.png'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function getMacOsFormattedDate(): string {
    const d = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour clock format
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(d);


    return formattedDate.replace(/,/g, '');
  }
  

const Navbar = () => {

    const formattedDate = getMacOsFormattedDate();
    const currApp = useSelector((state: RootState) => state.app.currApp)

  return (
    <div className='fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-10 backdrop-filter backdrop-brightness-105 backdrop-blur-3xl text-white'> 
        <div className='flex flex-row items-center'>
            <div className='flex items-center h-6 rounded-md px-2 p-1 relative '>
                <img src={apple_logo} className='h-4 relative z-50 peer' alt="Apple Logo icon"/> 
                <div className='absolute inset-0 top-0 left-0 hover:bg-slate-200 hover:opacity-50 rounded-md peer-hover:bg-slate-200 peer-hover:opacity-50' /> 
            </div>

            <div className='font-Apple_Bold mx-1 px-2 pt-1 w-max-8 relative'>
                {currApp}
                <div className='absolute inset-0 top-0 left-0 hover:bg-slate-200 hover:opacity-50 rounded-md' /> 
            </div>
        </div>

        <div className='flex flex-row items-center justify-center space-x-1 font-Apple_Regular font-bold text-sm'>
            <div className='flex flex-row items-center space-x-1 relative px-2'>
                <div className='flex items-start pt-1'>
                    99%
                </div>
                <div className='flex items-center justify-center'>
                    <img src={battery} className='h-6' alt="Battery icon"/>
                </div>

                <div className='absolute inset-0 top-0 left-0 hover:bg-slate-100 hover:opacity-50 rounded-md' /> 
            </div>

            <div className='flex items-center justify-center h-6 rounded-md px-2 p-1 relative '>
                <img src={wifi} className='h-5 relative z-50 peer/wifi' alt="Wifi icon"/> 
                <div className='absolute inset-0 top-0 left-0 hover:bg-slate-100 hover:opacity-50 rounded-md peer-hover/wifi:bg-slate-200 peer-hover/wifi:opacity-50' /> 
            </div>

            <div className='flex items-center justify-center h-6 rounded-md px-2 p-1 relative '>
                <img src={search} className='h-5 relative z-50 peer/wifi' alt="Search icon"/> 
                <div className='absolute inset-0 top-0 left-0 hover:bg-slate-100 hover:opacity-50 rounded-md peer-hover/wifi:bg-slate-200 peer-hover/wifi:opacity-50' /> 
            </div>

            <div className='flex items-center justify-center h-6 rounded-md px-2 p-1 relative'>
            <svg viewBox="0 0 29 29" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z"></path></svg>
                <div className='absolute inset-0 top-0 left-0 hover:bg-slate-100 hover:opacity-50 rounded-md peer-hover/wifi:bg-slate-200 peer-hover/wifi:opacity-50' /> 
            </div>

            <div className='flex items-center justify-center h-6 rounded-md px-2 p-1 mt-1 relative font-Apple_Bold '>
                {formattedDate}
                <div className='absolute inset-0 top-0 left-0 hover:bg-slate-100 hover:opacity-50 rounded-md peer-hover/wifi:bg-slate-200 peer-hover/wifi:opacity-50' /> 
            </div>
            
        </div>
        
    </div>

  )
}

export default Navbar