import { Svg } from "./svg.jsx"

const stroke = { stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" }

export function DivisorLinha(props) {
  return (
    <Svg title="Divisor linha" viewBox="0 0 240 16" {...props}>
      <path d="M4 8h232" {...stroke} />
    </Svg>
  )
}

export function DivisorLosango(props) {
  return (
    <Svg title="Divisor com losango" viewBox="0 0 240 16" {...props}>
      <path d="M4 8h100M136 8h100" {...stroke} />
      <path d="M120 2l6 6-6 6-6-6Z" fill="currentColor" />
    </Svg>
  )
}

export function DivisorPontos(props) {
  return (
    <Svg title="Divisor de pontos" viewBox="0 0 240 16" {...props}>
      <circle cx="104" cy="8" r="1.4" fill="currentColor" />
      <circle cx="120" cy="8" r="2" fill="currentColor" />
      <circle cx="136" cy="8" r="1.4" fill="currentColor" />
    </Svg>
  )
}

export function DivisorOrnato(props) {
  return (
    <Svg title="Divisor ornato" viewBox="0 0 240 24" {...props}>
      <path d="M8 12h70M162 12h70" {...stroke} />
      <path d="M86 12c8-8 16-8 22 0 6 8 14 8 22 0 8-8 16-8 22 0" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </Svg>
  )
}
