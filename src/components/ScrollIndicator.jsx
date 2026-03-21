import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position:   'absolute',
        bottom:     '2.5rem',
        left:       '50%',
        transform:  'translateX(-50%)',
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap:        '0.5rem',
        zIndex:     10,
      }}
    >
      {/* Mouse outline */}
      <div
        style={{
          width:        '22px',
          height:       '36px',
          border:       '1.5px solid rgba(245, 245, 240, 0.25)',
          borderRadius: '12px',
          display:      'flex',
          justifyContent: 'center',
          paddingTop:   '6px',
        }}
      >
        <motion.div
          style={{
            width:        '3px',
            height:       '7px',
            background:   'var(--gold)',
            borderRadius: '2px',
          }}
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{
            duration: 1.6,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'rgba(245, 245, 240, 0.3)',
        }}
      >
        Scroll
      </span>
    </motion.div>
  )
}
