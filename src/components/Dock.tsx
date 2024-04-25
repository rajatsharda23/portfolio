import {
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
  } from "framer-motion";
  
  import { useRef } from "react";
  
  function Dock() {
    let mouseX = useMotionValue(Infinity);
  
    return (
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-20  items-end gap-4 rounded-xl backdrop-filter backdrop-brightness-105 backdrop-blur-3xl px-4 pb-5 border-opacity-20 border border-slate-100"
      >
        
    {new Array(8).fill(0).map((_, i) => ( 
    <AppIcon mouseX={mouseX} key={i} />
        ))}
      </motion.div>
    );
  }
  
  function AppIcon({ mouseX }: { mouseX: MotionValue }) {
    let ref = useRef<HTMLDivElement>(null);
  
    let distance = useTransform(mouseX, (val) => {
      let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
  
      return val - bounds.x - bounds.width / 2;
    });
  
    let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  
    return (
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square w-10 bg-gray-400"
      />
      
    );
  }
  
  export default Dock