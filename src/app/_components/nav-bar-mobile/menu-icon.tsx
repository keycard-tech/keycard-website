import { motion } from 'framer-motion'

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="38" height="38" rx="12" fill="white" fillOpacity="0" />
    <rect
      x="1"
      y="1"
      width="37"
      height="37"
      rx="11.5"
      stroke="transparent"
      strokeOpacity="0"
    />
    <motion.line
      layout
      x1="12"
      y1="14"
      x2="26"
      y2="14"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{
        rotateZ: isOpen ? 45 : 0,
        y: isOpen ? 6 : 0,
      }}
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
    />
    <motion.line
      x1="12"
      y1="20"
      x2="26"
      y2="20"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{
        opacity: 1,
        x: 0,
      }}
      animate={{
        opacity: isOpen ? 0 : 1,
        x: isOpen ? 20 : 0,
      }}
      exit={{
        opacity: 1,
        x: 20,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
    />

    <motion.line
      layout
      x1="12"
      y1="26"
      x2="26"
      y2="26"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{
        rotateZ: isOpen ? -45 : 0,
        y: isOpen ? -6 : 0,
      }}
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
    />
  </svg>
)

export { MenuIcon }
