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
     <div className=""/>
  </motion.nav>
);

export default Navbar;