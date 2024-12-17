'use client';
import { navVariants } from "@/utils/motion";
import styles from "@/utils/stylesMap";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = ({ buttons  }: { buttons: { name: string, title: string, href: string }[] }) => {
  
  const router = useRouter();

  return (<motion.nav 
   variants={navVariants}
   initial='hidden'
   className={`${styles.xPaddings} py-8 relative`}
   animate='show'
  >
     <div className="absolute w-[50%] inset-0 gradient-01"/>
     <div className="flex justify-between">
     <div className="font-extrabold text-[24px] leading-[30px] text-white">
        Mock interview with AI
     </div>
     <div className="flex gap-4">
       {buttons.map((item, id) => {
           return (
            <button key={id} className="px-6 py-3 bg-white text-primary-black font-semibold rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => { router.push(item.href) }}>
             {item.title || ''}
           </button>
           )
       })}
     </div>
     </div>
  </motion.nav>)
}

export default Navbar;