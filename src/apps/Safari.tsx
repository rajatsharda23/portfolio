import React, { useState } from 'react'
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable, {DraggableCore} from 'react-draggable'
import '../components/Resizable.css'
import { ListFormat } from 'typescript';

const Safari = () => {

    return (
    <div className="container h-full w-full">
        <iframe
        src="https://www.bing.com/"
        width="100%"
        height="100%"
        title="Embedded Website"
        className="border-0"
        ></iframe>
    </div>
  )
}
export default Safari