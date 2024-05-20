import React, { useState } from 'react'
import { ResizableBox } from 'react-resizable'
import Draggable from 'react-draggable'
import '../components/Resizable.css'
import Notepad from './Notepad'
import close from '../assets/icons/mac_close/icons8-macos-close-30.png'
import minimize from '../assets/icons/mac_minimize/icons8-macos-minimize-30.png'
import fullScrn from '../assets/icons/mac_FullScrn/icons8-macos-full-screen-30.png'

const MasterApp = () => {
  type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'

  type ResizeCallbackData = {
    node: HTMLElement,
    size: { width: number, height: number },
    handle: ResizeHandleAxis
  }

  const [width, setWidth] = useState<number>(900)
  const [height, setHeight] = useState<number>(700)

  const handleResize = (event: any, { size }: ResizeCallbackData) => {
    setWidth(size.width)
    setHeight(size.height)
  }

  const setPos = {
    x: 400,
    y: 40,
  }

  return (
    <div className='text-white w-screen h-screen'>
      <div className='relative h-screen w-screen mt-8'>
        <Draggable
          bounds='parent'
          handle='.drag-handle'
          defaultPosition={setPos}
        >
          <div className='absolute top-0 left-0 shadow-md border border-gray-600 rounded-xl'>
            <div className='bg-gray-600 h-8 drag-handle rounded-t-xl rounded-b-none flex items-center p-1 pl-2'>
              <img src={close} className='h-4 mr-1' />
              <img src={minimize} className='h-4 mr-1' />
              <img src={fullScrn} className='h-4' />

              
            </div>
            
            <ResizableBox
              width={width}
              height={height}
              minConstraints={[100, 100]}
              maxConstraints={[Infinity, Infinity]}
              resizeHandles={['se', 's', 'e']}
              onResize={handleResize}
              className='bg-green-200 rounded-b-xl'
              lockAspectRatio={false}
            >
              <div className='flex items-center justify-center h-full w-full'>
                <Notepad />
              </div>
            </ResizableBox>
          </div>
        </Draggable>
      </div>
    </div>
  )
}

export default MasterApp
