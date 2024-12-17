'use client';
import { navVariants } from "@/utils/motion";
import styles from "@/utils/stylesMap";
import { motion } from "framer-motion";

const Navbar = () => (
  <motion.nav 
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
     <div>
        Dfsdfsdf
     </div>
     </div>
  </motion.nav>
);

export default Navbar;