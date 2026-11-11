import { Svg } from "./svg.jsx"

const stroke = { stroke: "currentColor", strokeWidth: 1.3, fill: "none", strokeLinejoin: "round" }

export function Faixa(props) {
  return (
    <Svg title="Faixa" viewBox="0 0 200 48" {...props}>
      <path d="M8 10h168l16 14-16 14H8l12-14Z" {...stroke} />
    </Svg>
  )
}

export function CantoFolha(props) {
  return (
    <Svg title="Folha de canto" viewBox="0 0 96 96" {...props}>
      <path d="M8 88C20 48 48 20 88 8" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M24 70c8-16 20-28 40-36M36 78c6-14 16-24 34-30M18 54c12-8 24-12 40-12" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </Svg>
  )
}

export function SeloFita(props) {
  return (
    <Svg title="Selo com fita" {...props}>
      <circle cx="32" cy="26" r="14" {...stroke} />
      <path d="M22 38v18l10-6 10 6V38" {...stroke} />
    </Svg>
  )
}
