import { Svg } from "./svg.jsx"

export function TexturaPontos(props) {
  const dots = []
  for (let y = 4; y < 80; y += 8) {
    for (let x = 4; x < 80; x += 8) dots.push(`${x},${y}`)
  }
  return (
    <Svg title="Textura de pontos" viewBox="0 0 80 80" {...props}>
      {dots.map((point) => {
        const [x, y] = point.split(",")
        return <circle key={point} cx={x} cy={y} r="0.9" fill="currentColor" />
      })}
    </Svg>
  )
}

export function TexturaLinhas(props) {
  const lines = []
  for (let y = 2; y < 80; y += 6) lines.push(y)
  return (
    <Svg title="Textura de linhas" viewBox="0 0 80 80" {...props}>
      {lines.map((y) => (
        <path key={y} d={`M0 ${y}H80`} stroke="currentColor" strokeWidth="0.6" />
      ))}
    </Svg>
  )
}

export function TexturaGrade(props) {
  return (
    <Svg title="Textura em grade" viewBox="0 0 80 80" {...props}>
      <path d="M0 0H80V80H0Z" stroke="currentColor" strokeWidth="0.4" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${i * 10} 0V80M0 ${i * 10}H80`} stroke="currentColor" strokeWidth="0.4" />
      ))}
    </Svg>
  )
}

export function TexturaSeda(props) {
  return (
    <Svg title="Textura de seda" viewBox="0 0 80 80" {...props}>
      <path d="M-10 20c20 10 40-10 60 0s40-10 60 0M-10 40c20 10 40-10 60 0s40-10 60 0M-10 60c20 10 40-10 60 0s40-10 60 0" stroke="currentColor" strokeWidth="0.7" fill="none" />
    </Svg>
  )
}
