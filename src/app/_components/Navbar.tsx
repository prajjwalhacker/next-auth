'use client';
import { navVariants } from "@/utils/motion";
import { motion } from "framer-motion";

const Navbar = () => (
  <motion.nav 
   variants={navVariants}
   initial='hidden'
   animate='show'
  >
    navbar
  </motion.nav>
);

export default Navbar;