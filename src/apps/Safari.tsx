import React, { useEffect, useState } from 'react'
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable, {DraggableCore} from 'react-draggable'
import '../components/Resizable.css'
import { ListFormat } from 'typescript';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import rMate from '../assets/sites/RhythMate.png'
import inv from '../assets/sites/Invictus.png'
import r2d2 from '../assets/sites/R2D2.png'
import cVerse from '../assets/sites/Creativerse.png'
import naruto from '../assets/sites/Narutoo.png'
import mVerse from '../assets/sites/MovieVerse.png'
import { setSafariUrl } from '../redux/slices/homePage/appSlice';

const Safari = () => {

    const url = useSelector((state: RootState) => state.app.safariUrl)
    const dispatch = useDispatch()
    const safariUrl = useSelector((state: RootState) => state.app.safariUrl)

    return (
        <div className="h-full w-full inline-block overflow-auto">
            
            {url==='homePage'?
            <div className='bg-notepadBG h-full w-full'>
                <div className='p-20'>
                    <div className='font-Apple_Bold text-3xl'>
                        Favorites
                    </div>
                    <div className='flex flex-row space-x-4 pt-6 items-end justify-start'>
                        <div className='font-Apple_Regular text-lg flex items-start justify-center flex-col space-y-1' onClick={() => window.open("https://github.com/rajatsharda23", "_blank")}>
                            <div className='h-11 w-11 flex items-center justify-center pl-2'>
                                <img width="96" height="96" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/000000/external-github-community-for-software-building-and-testing-online-logo-shadow-tal-revivo.png" alt="external-github-community-for-software-building-and-testing-online-logo-shadow-tal-revivo"/>
                            </div>
                            <div>
                                Github
                            </div>
                        </div>    
                        <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col space-y-1' onClick={() => window.open("https://www.linkedin.com/in/rajat-sharda-3b562622b/", "_blank")}>
                            <div className='h-10 w-10'>
                                <img src="data:image/png;base64,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" />
                            </div>
                            <div>
                                LinkedIn
                            </div>
                        </div>   
                        <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col space-y-1' onClick={() => window.open("https://x.com/RajatSharda_", "_blank")}>
                            <div className='h-10 w-10'>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjUlEQVR4nO1ZWSj8XxS/9n3JToiiGGTLLyUJEcZWPCh5GCmFF+WBlDxZXyTK8miLSCLlhWwJke1BkX0rZR37cn6dW9+b7/wtY8z4zq//nDopn3vv93zuPefcc+6Q+Ph4IIT805qQkIB/hTdESUqENkBDhGhOhAjuPqCJESL8ToPmRIjMLohEImhubv5SGxoawNTUVOFddXNzY2vV19eDmZmZck9ES0sLBgcHQR5paWlRiIS5uTmsrKzQNV5fXyErK0s1rmVnZwcnJydykUlPT/+WETo6OjA0NMTml5eXqzZGUlJS2MfW1tbA0NCQYYGBgfDw8ECx09NTcHR0lHvdxsZGtm53dzf1AJUHO7oOJ7W1tTysuLiYYSMjI3IZVFRUxOZMTU3xNkelRExMTGB9fZ1++OXlBaKiohimra0No6OjzLD8/PxP1xKLxfD8/EzHbm1tUfdVkMT3iaAGBwfD4+MjNeDg4ACsrKwY5uzsDGdnZxS7u7sDPz+/d9cICgoCqVRKx11eXoKvr+9PSChGBLWsrIztfF9fHw/LzMxk2OLiIujr6/NwJycn2N/fpzhuSHR09E9JgMJE0I3Gx8eZwbLpsqOjg2GVlZXs/3jPLC0tMSw3N1cZJOBH/Yi7uzt1C5Tr62vw8PBgmIWFBezs7LBYioyMpGl2YGCAkaioqFAWCfhxYyWRSJhhk5OT1FgOi4iIoCRQdnd3obW1lY3t6elRNM2CSoigYu7npLS0lIdVVVXJXJcA8/PzYGxsrEwSoBQi1tbWcHh4yII3JCSEYRjoCwsLjASejL29vbJJgNJ69piYGFojoWxubvIKPm9vb7i5uaHY+fk5uLq6qi8RQgjU1dWxnW9qauJheDlyMjExwYsltSNiYGAAy8vLzODk5OQPK2gsTdSWCCEEfHx86I3+XvFoa2sLx8fHFLu/v4eAgAD1JUII4e388PAwL80mJSWxWJKtoIk6EcnJyflPupUtHjF+OMG4UjsicXFx8PT0RA3c29tjxePt7S1tl9+roPF0YmNj1YeISCSiqRXl6uoK/P39IS0t7cPiEatfrhHDOwjvIiI0EQcHB1ZXYX/xNlu1tbUxMnjLv52HVQAn/f39whIxMjKCmZkZZlBBQQEPx+Jxe3v7w0ZsbGyMzZVIJMIQwWzU1dX1ZeCGhYWxThD7kLeNmIuLC4slqVQKnp6ev0+kurqal2Z1dXU/HIslOye9vb08DHsZTubm5kBPT+/3iGRnZ7OPr66uUhf6bDySnJ2dZXOwi3yLd3Z2Mgy7z18hgn0Gl3GOjo6oe8gzz8vLixWPFxcX9GWRwywtLWlljIIpPDQ0VLVE0Ji398OfP3++NT8vL+/DRiw8PJzFkmwFrVQiNjY2sLGxwTJQamrqt09TtngsKSnh4TU1NYo+v8o3EGui6elp9pHCwkJF/JgVjyp4fiVy7WJ7eztbHHtvRUlwij+Lc8XjZ3Iq//Pr1x/F1pV77sennc/S7HcUT1WenysyMjKU51r/gBKhDdAQIZoTIYK7D2hihAi/0/D/OhGxWCy8ET/UxMRE+AudTTlpNfCwagAAAABJRU5ErkJggg==" />
                            </div>
                            <div>
                                Twitter
                            </div>
                        </div>
                        <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col space-y-1' onClick={() => window.open("https://leetcode.com/", "_blank")}>
                            <div className='h-10 w-10'>
                                <img width="96" height="96" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png" alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo"/>
                            </div>
                            <div>
                                Leetcode
                            </div>
                        </div>
                        <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col space-y-1' onClick={() => window.open('mailto:rajatsharda23@gmail.com', "_blank")}>
                            <div className='h-10 w-10'>
                                <img width="48" height="48" src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new"/>
                            </div>
                            <div>
                                Email
                            </div>
                        </div>
                    </div>
                </div>


                <div className='p-20 pt-2'>
                    <div className='font-Apple_Bold text-3xl'>
                        Projects
                    </div>
                    <div className='flex flex-row space-x-4 pt-6 items-end justify-start'>
                        <div className='flex flex-col space-y-4'>
                            <div className='flex flex-row space-x-3'>
                                <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col' onClick={() => window.open("https://rhythmate-frontend.onrender.com", "_blank")}>
                                    <div className='flex items-center justify-center pl-2 rounded-lg h-32 w-44'>
                                        <img src={rMate} className='rounded-lg' />
                                    </div>
                                    <div className='text-sm'>
                                        RhythMate
                                    </div>
                                </div>    
                                <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col' onClick={() => window.open("https://r2d2bot.streamlit.app/", "_blank")}>
                                    <div className='flex items-center justify-center pl-2 rounded-lg h-32 w-44'>
                                        <img src={r2d2} className='rounded-lg'/>
                                    </div>
                                    <div className='text-sm'>
                                        R2/D2
                                    </div>
                                </div>   
                                
                                <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col' onClick={() => window.open("https://www.invictusdtu.in/", "_blank")}>
                                    <div className='flex items-center justify-center pl-2 rounded-lg h-32 w-44'>
                                        <img src={inv}  className='rounded-lg'/>
                                    </div>
                                    <div className='text-sm'>
                                        Invictus
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-row space-x-3'>
                                <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col' onClick={() => window.open("https://creativerse23.netlify.app/login", "_blank")}>
                                    <div className='flex items-center justify-center pl-2 rounded-lg h-32 w-44'>
                                        <img src={cVerse}  className='rounded-lg'/>
                                    </div>
                                    <div className='text-sm'>
                                        CreatiVerse
                                    </div>
                                </div>
                                <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col' onClick={() => window.open('https://narutoapp.netlify.app/', "_blank")}>
                                    <div className='flex items-center justify-center pl-2 rounded-lg h-32 w-44'>
                                        <img src={naruto} className='rounded-lg'/>
                                    </div>
                                    <div className='text-sm'>
                                        Maze Path Finder 
                                    </div>
                                </div>
                                <div className='font-Apple_Regular text-lg flex items-center justify-center flex-col' onClick={() => window.open('https://movieverse-n9uh.vercel.app/', "_blank")}>
                                    <div className='flex items-center justify-center pl-2 rounded-lg h-32 w-44'>
                                        <img src={mVerse} className='rounded-lg'/>
                                    </div>
                                    <div className='text-sm'>
                                        MovieVerse 
                                    </div>
                                </div>
                            </div>   
                        </div>     
                    </div>
                </div>


            </div>
                :
            <iframe
                src={url}
                width="100%"
                height="100%"
                title="Embedded Website"
                className="border-0 h-full w-full"
            ></iframe>
            }

        </div>
  )
}
export default Safari