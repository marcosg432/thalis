import { Svg } from "./svg.jsx"

const stroke = { stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" }

export function Folha(props) {
  return (
    <Svg title="Folha" {...props}>
      <path d="M32 56C18 40 8 26 32 6c24 20 14 34 0 50Z" {...stroke} />
      <path d="M32 50V18" {...stroke} />
      <path d="M32 34c-6-2-10-8-12-14M32 40c6-1 11-6 14-12" {...stroke} />
    </Svg>
  )
}

export function Ramo(props) {
  return (
    <Svg title="Ramo" {...props}>
      <path d="M10 50c14-4 22-14 26-34" {...stroke} />
      <path d="M24 40c-6-1-12-6-14-12 6 1 11 5 14 12ZM30 32c7-1 13-6 16-13-7 2-13 7-16 13ZM34 24c6-2 10-7 12-13-6 2-10 7-12 13Z" {...stroke} />
    </Svg>
  )
}

export function FlorSimples(props) {
  return (
    <Svg title="Flor" {...props}>
      <circle cx="32" cy="32" r="4" {...stroke} />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="32" cy="16" rx="5" ry="9" {...stroke} transform={`rotate(${angle} 32 32)`} />
      ))}
    </Svg>
  )
}

export function BotaoFloral(props) {
  return (
    <Svg title="Botão floral" {...props}>
      <path d="M32 54V30" {...stroke} />
      <path d="M32 42c-8 2-14 8-16 12M32 46c8 1 14 6 16 10" {...stroke} />
      <path d="M32 30c-8-2-14-12-10-20 6 6 10 12 10 20Zm0 0c8-2 14-12 10-20-6 6-10 12-10 20Z" {...stroke} />
    </Svg>
  )
}

export function Hera(props) {
  return (
    <Svg title="Hera" viewBox="0 0 80 80" {...props}>
      <path d="M8 70c18-8 28-24 34-52" {...stroke} />
      <path d="M28 58c-2-10 2-16 10-20-8 8-10 14-10 20ZM40 44c2-12 10-18 20-20-12 8-18 14-20 20ZM46 28c6-10 16-14 26-14-12 6-20 12-26 14Z" {...stroke} />
    </Svg>
  )
}
