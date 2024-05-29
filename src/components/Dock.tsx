import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import safariImg from '../assets/icons/safari.png'
import vscodeImg from '../assets/icons/vscode.png'
import notesImg from '../assets/icons/notess.png' 
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { setCurrApp } from "../redux/slices/homePage/appSlice"

function Dock() {

  let mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-20 items-end gap-4 rounded-xl backdrop-filter backdrop-brightness-105 backdrop-blur-3xl px-4 pb-5 border-opacity-20 border border-slate-100"
    >
      {new Array(6).fill(0).map((_, i) => {
        let imgSrc, imgName
        if (i === 0) {
          imgSrc = notesImg
          imgName = 'Notes'
        } else if (i === 1) {
          imgSrc = safariImg
          imgName = 'Safari'
        } else if (i === 2) {
          imgSrc = vscodeImg
          imgName = 'VSCode'
        } else {
          imgSrc = safariImg
          imgName = 'Safari'
        }
        return <AppIcon mouseX={mouseX} key={i} imgSrc={imgSrc} imgName={imgName} />
      })}
    </motion.div>
  )
}

function AppIcon({ mouseX, imgSrc, imgName }: { mouseX: MotionValue, imgSrc: string, imgName: string }) {

  const dispatch = useDispatch()
  const currApp = useSelector((state: RootState) => state.app.currApp)

  const handleClick = (app: string) => {
    dispatch(setCurrApp(app))
    console.log(app)
  }
  

  let ref = useRef<HTMLDivElement>(null)

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40])
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square w-10 container"
      onClick={() => handleClick(imgName)}
    >
      <img src={imgSrc} alt="App Icon" className="w-full h-full object-contain" />
    </motion.div>
  )
}

export default Dock
