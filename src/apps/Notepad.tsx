import React, { useState } from 'react'
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable, {DraggableCore} from 'react-draggable'
import '../components/Resizable.css'
import { ListFormat } from 'typescript';

const Notepad = () => {

  const [selectedId, setSelectedId] = useState<number>(1);
 
  return (
    <div className='h-full w-full rounded-b-lg shadow-lg shadow-black inline-block '>
      <div className='flex w-full h-full'>

        <div className='w-64 h-full border-gray-600 bg-notepadBG border-r-2 flex flex-col overflow-auto'>

          <div className='flex flex-col h-24 px-1 py-1 items-start justify-center border-b-2 border-gray-500 overflow-auto' onClick={() => setSelectedId(1)}>
            <div className={`${selectedId === 1 ? 'bg-notepadSelected' : 'bg-inherit'} p-2 px-6 rounded-xl`}>
              <div className='font-Apple_Bold text-xl'>
                About Me
              </div>
              <div className='font-Apple_Regular text-xs text-gray-300'>
                Hello, I've waited her for you, Everlong...
              </div>
            </div>
          </div>

          <div className='flex flex-col h-24 px-1 py-1 items-start justify-center border-b-2 border-gray-500 overflow-auto' onClick={() => setSelectedId(2)}>
            <div className={`${selectedId === 2 ? 'bg-notepadSelected' : 'bg-inherit'} p-2 px-6 rounded-xl`}>
              <div className='font-Apple_Bold text-xl'>
                About this Site
              </div>
              <div className=' font-Apple_Regular text-xs text-gray-300'>
                Well well, what do we have here?
              </div>
            </div>
          </div>

          <div className='flex flex-col h-32 px-1 py-1 items-start justify-center border-b-2 border-gray-500 overflow-auto py-4' onClick={() => setSelectedId(3)}>
            <div className={`${selectedId === 3 ? 'bg-notepadSelected' : 'bg-inherit'} p-2 px-6 rounded-xl`}>
              <div className='font-Apple_Bold text-xl'>
                Contact Me
              </div>
              <div className=' font-Apple_Regular text-xs text-gray-300'>
                I was wondering if after all these years you'd like to meet
              </div>
            </div>
          </div>

        </div>

        <div className='h-full w-full bg-notepadTextBG border-black overflow-auto'>
          <div className='flex flex-col items-start px-8 py-8'>
            
            {selectedId===1? 
            <div>

              <div className='text-3xl font-Apple_Bold'>
                About Me!
              </div>

              <div className='font-Apple_Regular text-lg pt-8'>
                Hi there! I'm a pre-final student at <a href='https://dtu.ac.in/' target='_blank' className=' underline text-notepadSelected'>Delhi Technological University</a> pursuing 
                Electronics and Communications Engineering, with a minor in Computer Science. I have a keen interest in Generative AI and 
                am expericed in building and designing exciting websites!
              </div>

              <div className='font-Apple_Regular text-lg pt-8'>
                I am an avid rock fan, who plays the violin and guitar. I also like to play football and badminton.

              </div>

              <br />
              <br />

              <div className='text-3xl font-Apple_Bold'>
                Résumé
                <div className='font-Apple_Regular text-lg pt-4'>
                  <ul className="list-disc list-inside">
                    <li>Normal Version: <a href='https://docs.google.com/document/d/1TURpRTytl0NrM---_L37zU43SrBD8QJh/edit?usp=sharing&ouid=112629307061188286717&rtpof=true&sd=true' target='_blank' className=' underline text-notepadSelected'>Google Docs</a></li>
                    <li>Interesting Version: <a href='mailto:rajatsharda23@gmail.com' target='_blank' className=' underline text-notepadSelected'>Portfolio Webiste</a></li>
                  </ul>
                </div>  

              </div>

            </div>
             : <div></div>}

            {selectedId===2? 
            <div className='overflow-auto'>

              <div className='text-3xl font-Apple_Bold '>
                About this site!
              </div>

              <div className='font-Apple_Regular text-lg pt-8'>
                This is inspired by macOS and  <a href='https://github.com/Renovamen' target='_blank' className=' underline text-notepadSelected'>@Renovamen</a>'s portfolio website!
                Developed using React, TypeScript, Redux and Tailwind CSS. <br />
                <br />
                <p>The source code is hosted <a href='https://github.com/rajatsharda23' target='_blank' className=' underline text-notepadSelected'>here</a></p>
              </div>
            </div>
             : <div></div>}


            {selectedId===3? 
            <div>

              <div className='text-3xl font-Apple_Bold'>
                Contact Me!
              </div>

              <div className='font-Apple_Regular text-lg pt-8'>
                Contact me by - 
                <ul className="list-disc list-inside">
                  <li>Email: <a href='mailto:rajatsharda23@gmail.com' target='_blank' className=' underline text-notepadSelected'>rajatsharda23@gmail.com</a></li>
                  <li>Github: <a href='https://github.com/rajatsharda23' target='_blank' className=' underline text-notepadSelected'>@rajatsharda23</a></li>
                  <li>LinkedIn: <a href='https://www.linkedin.com/in/rajat-sharda-3b562622b/' target='_blank' className=' underline text-notepadSelected'>rajat-sharda</a></li>
                  <li>Twitter: <a href='https://x.com/RajatSharda_' target='_blank' className=' underline text-notepadSelected'>rajatsharda_</a></li>
                </ul>
              </div>

            </div>
             : <div></div>}
            


          </div>
        </div>

      </div>
    </div>
  )
}
export default Notepad