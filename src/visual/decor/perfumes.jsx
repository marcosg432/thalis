import { Svg } from "./svg.jsx"

const stroke = { stroke: "currentColor", strokeWidth: 1.4, strokeLinejoin: "round", fill: "none" }

export function Frasco(props) {
  return (
    <Svg title="Frasco" {...props}>
      <path d="M26 16h12v6H26z" {...stroke} />
      <path d="M22 22h20v30a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V22Z" {...stroke} />
      <path d="M24 34h16" stroke="currentColor" strokeWidth="1" />
    </Svg>
  )
}

export function Borrifador(props) {
  return (
    <Svg title="Borrifador" {...props}>
      <path d="M24 24h16v28H24z" {...stroke} />
      <path d="M28 24V16h8v8" {...stroke} />
      <path d="M36 18h10M40 18c4-6 10-8 14-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="54" cy="8" r="1" fill="currentColor" />
    </Svg>
  )
}

export function NotaOlfativa(props) {
  return (
    <Svg title="Nota olfativa" {...props}>
      <path d="M18 46c8-16 14-22 14-34 8 10 16 20 16 32a16 16 0 0 1-30 2Z" {...stroke} />
      <path d="M32 28c4 4 6 8 6 14" stroke="currentColor" strokeWidth="1.2" />
    </Svg>
  )
}

export function GotaEssencia(props) {
  return (
    <Svg title="Gota de essência" {...props}>
      <path d="M32 8C22 22 14 32 14 42a18 18 0 0 0 36 0C50 32 42 22 32 8Z" {...stroke} />
      <path d="M24 40c2 6 6 8 10 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  )
}
