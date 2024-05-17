import React, { useState } from 'react'
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable, {DraggableCore} from 'react-draggable'
import '../components/Resizable.css'
import Notepad from './Notepad';

const MasterApp
 = () => {

  type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'

  type ResizeCallbackData = {
    node: HTMLElement,
    size: {width: number, height: number},
    handle: ResizeHandleAxis
  }

  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(400);

  const handleResize = (event: any, { size }: ResizeCallbackData) => {
    setWidth(size.width);
    setHeight(size.height);
  }
 
  return (
    <div className='text-white relative w-screen h-screen'>
      
        <div className='flex items-center justify-center'>
        <Draggable
          bounds = ''
          >
            <div className='absolute top-0 left-0 items-center justify-center'>
              <ResizableBox width={800}
                height={400} 
                minConstraints={[100, 100]} 
                maxConstraints={[Infinity, Infinity]} 
                resizeHandles={['se', 's', 'e']} 
                onResize = {(handleResize)}
                className='bg-green-200'>
          
                <div className='flex items-center justify-center h-full w-full border border-red-500 '>
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
