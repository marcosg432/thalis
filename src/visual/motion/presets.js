export const presets = {
  entrada: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  suave: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
  troca: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
}

export const variantes = {
  surgir: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  },
  revelar: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
}
