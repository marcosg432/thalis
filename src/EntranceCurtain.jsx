import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const STRIPS = 8
const OPEN_DURATION = 1.15
const OPEN_STAGGER = 0.12
const CLOSE_DURATION = 0.9
const CLOSE_STAGGER = 0.07
const EASE = [0.65, 0, 0.35, 1]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function reveal() {
  window.dispatchEvent(new Event('curtain-reveal'))
}

export function EntranceCurtain() {
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? 'idle' : 'shut'))
  const targetRef = useRef('')
  const externalRef = useRef(false)
  const ownedRef = useRef(false)
  const busyRef = useRef(false)

  useEffect(() => {
    if (phase !== 'shut') return
    const timer = window.setTimeout(() => setPhase('opening'), 30)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'opening') return
    const total = (STRIPS - 1) * OPEN_STAGGER * 1000 + OPEN_DURATION * 1000 + 40
    const timer = window.setTimeout(() => {
      busyRef.current = false
      setPhase('idle')
    }, total)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'closing') return
    const total = (STRIPS - 1) * CLOSE_STAGGER * 1000 + CLOSE_DURATION * 1000 + 60
    const timer = window.setTimeout(() => {
      const hash = targetRef.current
      if (!externalRef.current && location.hash !== hash) {
        ownedRef.current = true
        location.hash = hash
      }
      reveal()
      setPhase('shut')
    }, total)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'idle') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [phase])

  useEffect(() => {
    function start(hash, external) {
      if (busyRef.current) return
      if (!external && location.hash === hash) {
        reveal()
        return
      }
      if (prefersReducedMotion()) {
        if (!external && location.hash !== hash) {
          ownedRef.current = true
          location.hash = hash
        }
        reveal()
        return
      }
      busyRef.current = true
      targetRef.current = hash
      externalRef.current = external
      setPhase('closing')
    }

    function onGo(event) {
      start(event.detail.hash, false)
    }

    function onHash() {
      if (ownedRef.current) {
        ownedRef.current = false
        return
      }
      start(location.hash, true)
    }

    window.addEventListener('curtain-go', onGo)
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('curtain-go', onGo)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  const covered = phase === 'shut' || phase === 'closing'
  const opening = phase === 'opening'
  const closing = phase === 'closing'
  const duration = closing ? CLOSE_DURATION : opening ? OPEN_DURATION : 0

  return (
    <div className={`entrance-curtain${covered ? ' is-covered' : ''}${phase === 'idle' ? ' is-idle' : ''}`} aria-hidden>
      {Array.from({ length: STRIPS }, (_, index) => {
        const delay = closing ? (STRIPS - 1 - index) * CLOSE_STAGGER : index * OPEN_STAGGER
        const transition = duration ? { duration, delay, ease: EASE } : { duration: 0 }
        const left = covered ? '0%' : '-105%'
        const right = covered ? '0%' : '105%'

        return (
          <div key={index} className="entrance-curtain__row">
            <motion.div
              className="entrance-curtain__pane entrance-curtain__pane--left"
              initial={false}
              animate={{ x: left }}
              transition={transition}
            />
            <motion.div
              className="entrance-curtain__pane entrance-curtain__pane--right"
              initial={false}
              animate={{ x: right }}
              transition={transition}
            />
          </div>
        )
      })}
    </div>
  )
}
