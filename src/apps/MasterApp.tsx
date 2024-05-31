import React, { useState, useEffect } from 'react'
import { ResizableBox } from 'react-resizable'
import Draggable from 'react-draggable'
import '../components/Resizable.css'
import close from '../assets/icons/mac_close/icons8-macos-close-30.png'
import minimize from '../assets/icons/mac_minimize/icons8-macos-minimize-30.png'
import fullScrn from '../assets/icons/mac_FullScrn/icons8-macos-full-screen-30.png'
import Safari from './Safari'
import back from '../assets/icons/safariBack.png'
import fwd from '../assets/icons/safariForward.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setSafariUrl, goBack, goForward, setCurrApp } from '../redux/slices/homePage/appSlice'
import Notepad from './Notepad'
import VSCode from './VSCode'

const MasterApp = () => {
  const dispatch = useDispatch()
  const safariUrl = useSelector((state: RootState) => state.app.safariUrl)
  const currApp = useSelector((state: RootState) => state.app.currApp)

  const [width, setWidth] = useState<number>(900)
  const [height, setHeight] = useState<number>(700)
  const [url, setUrl] = useState<string>("")
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const isMobile = windowWidth <= 640
    if (isMobile) {
      setWidth(windowWidth - 20)
      setHeight(windowHeight - 80)
    } else {
      setWidth(900)
      setHeight(700)
    }
  }, [windowWidth, windowHeight])

  useEffect(() => {
    console.log('Current URL:', url)
  }, [url])

  const handleResize = (event: any, { size }: { size: { width: number, height: number } }) => {
    setWidth(size.width)
    setHeight(size.height)
  };

  const setPos = {
    x: Math.max(0, (windowWidth - width) / 2),
    y: Math.max(0, (windowHeight - height) / 2),
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (url.includes("www")) {
        dispatch(setSafariUrl(url))
      } else {
        const newUrl = "https://www.bing.com/search?q=" + url
        dispatch(setSafariUrl(newUrl))
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleBackClick = () => {
    dispatch(goBack())
  }

  const handleForwardClick = () => {
    dispatch(goForward())
  };

  const handleCloseButton = () => {
    dispatch(setCurrApp("Finder"))
    console.log(currApp);
  };

  return (
    <div className='text-white w-screen h-screen'>
      <div className='relative h-screen w-screen mt-8'>
        <Draggable
          bounds='parent'
          handle='.drag-handle'
          defaultPosition={setPos}
        >
          <div className='absolute top-0 left-0 shadow-md border border-gray-600 rounded-xl'>
            <div className={`bg-menuBar ${currApp === "Safari" ? 'h-14' : 'h-8'} drag-handle rounded-t-xl rounded-b-none flex items-center p-1 pl-3`}>
              <img src={close} className='h-4 mr-1' onClick={handleCloseButton} alt="Close button"/>
              <img src={minimize} className='h-4 mr-1' alt="Minimize button"/>
              <img src={fullScrn} className='h-4' alt="Full Screen button"/>

              {currApp === "Safari" ?
                <div className='flex w-full relative'>
                  <div className='flex items-center w-2/5 pl-4 space-x-1'>
                    <div className='border border-l-1 border-gray-500 h-full shadow-xl shadow-gray-600 blur-0'></div>

                    <div className='ml-2 hover:bg-gray-100 p-1 hover:opacity-50 rounded-md'>
                      <img src={back} className='h-5 w-5' onClick={handleBackClick} alt="back-button"/>
                    </div>

                    <div className='hover:bg-gray-100 p-1 hover:opacity-50 rounded-md'>
                      <img src={fwd} className='h-5 w-5' onClick={handleForwardClick} alt="forward-button"/>
                    </div>
                  </div>

                  <div className='flex items-start justify-start w-full'>
                    <input className='flex items-center z-0 justify-center bg-notepadTextBG w-3/5 px-2 rounded-lg text-sm h-10
                      placeholder:flex placeholder:text-sm placeholder:pl-1 placeholder:font-Apple_Regular'
                      placeholder='Enter Search or Enter Website' onKeyDown={handleKeyDown} onChange={handleChange}
                    />
                  </div>
                </div> :

                <div className=' w-full flex items-center justify-center pr-12'>
                  {currApp}
                </div>
              }

            </div>


            <ResizableBox
              width={width}
              height={height}
              minConstraints={[100, 100]}
              maxConstraints={[windowWidth - 20, windowHeight - 80]}
              resizeHandles={['se', 's', 'e']}
              onResize={handleResize}
              className='bg-notepadBG rounded-b-xl'
              lockAspectRatio={false}
            >
              <div className='flex items-center justify-center h-full w-full'>
                {currApp === 'Safari' ? (
                  <Safari />
                ) : currApp === 'Notes' ? (
                  <Notepad />
                ) : currApp === 'VSCode' ?(
                  <VSCode />
                ) : <div></div>}
              </div>
            </ResizableBox>
          </div>
        </Draggable>
      </div>
    </div>
  )
}

export default MasterApp;
