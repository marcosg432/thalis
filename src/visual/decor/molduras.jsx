import { Svg } from "./svg.jsx"

const stroke = { stroke: "currentColor", strokeWidth: 1.4, fill: "none" }

export function MolduraFina(props) {
  return (
    <Svg title="Moldura fina" viewBox="0 0 120 120" {...props}>
      <rect x="8" y="8" width="104" height="104" rx="2" {...stroke} />
    </Svg>
  )
}

export function MolduraDupla(props) {
  return (
    <Svg title="Moldura dupla" viewBox="0 0 120 120" {...props}>
      <rect x="6" y="6" width="108" height="108" {...stroke} />
      <rect x="14" y="14" width="92" height="92" {...stroke} />
    </Svg>
  )
}

export function MolduraCantos(props) {
  return (
    <Svg title="Moldura de cantos" viewBox="0 0 120 120" {...props}>
      <path d="M8 36V12h24M84 12h24v24M112 84v24H88M36 108H12V84" stroke="currentColor" strokeWidth="1.6" />
    </Svg>
  )
}

export function MolduraArco(props) {
  return (
    <Svg title="Moldura em arco" viewBox="0 0 120 150" {...props}>
      <path d="M16 138V62C16 30 36 14 60 14s44 16 44 48v76" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 138V64c0-24 14-38 32-38s32 14 32 38v74" stroke="currentColor" strokeWidth="1.2" />
    </Svg>
  )
}
