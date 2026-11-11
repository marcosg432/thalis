import { Svg } from "./svg.jsx"

const stroke = { stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", fill: "none" }

export function Arabesco(props) {
  return (
    <Svg title="Arabesco" viewBox="0 0 160 48" {...props}>
      <path d="M8 24h28M124 24h28" {...stroke} />
      <path d="M36 24c8-14 18-14 24 0 6 14 16 14 24 0 8-14 18-14 24 0" {...stroke} />
      <circle cx="80" cy="24" r="3" fill="currentColor" />
    </Svg>
  )
}

export function CantoLuxo(props) {
  return (
    <Svg title="Canto de luxo" {...props}>
      <path d="M8 40V14h26" {...stroke} />
      <path d="M14 34c10-2 16-10 18-20" {...stroke} />
      <path d="M22 36c6-8 8-16 6-24" {...stroke} />
      <circle cx="14" cy="14" r="1.6" fill="currentColor" />
    </Svg>
  )
}

export function Florao(props) {
  return (
    <Svg title="Florão" {...props}>
      <path d="M32 8v48M8 32h48" {...stroke} />
      <path d="M14 14c10 4 12 8 18 18 6-10 8-14 18-18-10 4-12 8-18 18-6-10-8-14-18-18ZM14 50c10-4 12-8 18-18 6 10 8 14 18 18-10-4-12-8-18-18-6 10-8 14-18 18Z" {...stroke} />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </Svg>
  )
}

export function MonogramaAnel(props) {
  return (
    <Svg title="Anel de monograma" {...props}>
      <circle cx="32" cy="32" r="20" {...stroke} />
      <circle cx="32" cy="32" r="15" stroke="currentColor" strokeWidth="0.8" />
      <path d="M32 12v4M32 48v4M12 32h4M48 32h4" stroke="currentColor" strokeWidth="1.2" />
    </Svg>
  )
}
