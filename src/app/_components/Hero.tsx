'use client';
import { navVariants, slideIn, staggerContainer, textVariant } from "@/utils/motion";
import styles from "@/utils/stylesMap";
import coverI from '../../../public/cover.png';
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
        <div className="flex flex-col justify-center items-center z-10">
        <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
           Interview 
        </motion.h1>
        <motion.div variants={textVariant(1.2)} className={`${styles.heroHeading} flex flex-row justify-center items-center`}>
           With AI
        </motion.div>
        </div>
        <motion.div
         variants={slideIn('right', 'tween', 0.2, 1)}
         className="relative w-full h-[300px] md-mt-[20px] -mt-[12px]"
        >
          <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] -top-[30px]">
              <img src={coverI.src} alt="" className="-top-[30px] w-full sm:h-[300px] h-[300px] object-cover rounded-tl-[140px] z-0 relative"/>   
          </div>  
        </motion.div>
    </motion.div>
    </section>
  )
}

export default Hero