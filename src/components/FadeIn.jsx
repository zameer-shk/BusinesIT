import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeIn({ children, delay = 0, direction = 'up', className = '', ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
