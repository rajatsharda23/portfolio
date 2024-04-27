import React from 'react'
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable, {DraggableCore} from 'react-draggable'
import '../components/Resizable.css'

const Notepad = () => {
 
  return (
    <div className='text-white'>
      <ResizableBox width={800} height={400} 
        minConstraints={[100, 100]} maxConstraints={[Infinity, Infinity]} className='bg-green-200'>
         <div className='h-full w-full border border-red-500'>
          Hello
         </div>
      </ResizableBox>  
    </div>
  )
}
export default Notepad