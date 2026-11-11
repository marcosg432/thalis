import { Svg } from "./svg.jsx"

const stroke = { stroke: "currentColor", strokeWidth: 1.4 }

export function Circulo(props) {
  return (
    <Svg title="Círculo" {...props}>
      <circle cx="32" cy="32" r="22" {...stroke} />
    </Svg>
  )
}

export function Losango(props) {
  return (
    <Svg title="Losango" {...props}>
      <path d="M32 8 56 32 32 56 8 32Z" {...stroke} />
    </Svg>
  )
}

export function Arco(props) {
  return (
    <Svg title="Arco" {...props}>
      <path d="M10 48c0-20 10-32 22-32s22 12 22 32" {...stroke} fill="none" />
    </Svg>
  )
}

export function Gota(props) {
  return (
    <Svg title="Gota" {...props}>
      <path d="M32 8C20 24 12 34 12 44a20 20 0 0 0 40 0C52 34 44 24 32 8Z" {...stroke} />
    </Svg>
  )
}

export function Selo(props) {
  return (
    <Svg title="Selo" {...props}>
      <circle cx="32" cy="32" r="18" {...stroke} />
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
    </Svg>
  )
}
