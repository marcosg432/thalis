import { useId } from 'react'

export function Bottle({ liquid = '#e0923a', cap = '#1c1612', family = '', className = '' }) {
  const uid = useId().replace(/:/g, '')
  const glass = `${uid}-glass`
  const fill = `${uid}-fill`

  return (
    <svg className={`bottle ${className}`} viewBox="0 0 140 300" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="0.42" stopColor="#f7f3ec" stopOpacity="0.28" />
          <stop offset="1" stopColor="#d5cbbd" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={liquid} stopOpacity="0.78" />
          <stop offset="1" stopColor={liquid} />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="286" rx="30" ry="6" fill="rgba(28,22,18,0.13)" />
      <rect x="51" y="8" width="38" height="34" rx="3" fill={cap} />
      <rect x="57" y="12" width="7" height="24" rx="2" fill="#fff" opacity="0.18" />
      <rect x="46" y="40" width="48" height="9" rx="1.5" fill="#c4b69f" />
      <path d="M60 49h20v28H60z" fill={`url(#${glass})`} stroke="#d3c8b8" />
      <path
        d="M70 76c22 0 36 8 36 26v146c0 24-14 30-36 30s-36-6-36-30V102c0-18 14-26 36-26z"
        fill={`url(#${glass})`}
        stroke="#d3c8b8"
      />
      <path
        d="M40 158h60v90c0 20-12 24-30 24s-30-4-30-24z"
        fill={`url(#${fill})`}
      />
      <path d="M48 108c-2 48 0 96 2 142" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="44" y="168" width="52" height="64" rx="2" fill="#fbf8f3" stroke="#e6dfd3" />
      <path d="M52 186h36" stroke="#c4a574" strokeWidth="1" />
      <text x="70" y="204" textAnchor="middle" fontSize="8" letterSpacing="1.6" fill="#1c1612" fontFamily="Fraunces, Georgia, serif">
        SAGE
      </text>
      <text x="70" y="218" textAnchor="middle" fontSize="6.5" fill="#6f675f" fontFamily="Outfit, sans-serif">
        {family}
      </text>
    </svg>
  )
}

export function FragranceVisual({ product, className = '' }) {
  if (product.photo) {
    return <img className={`bottle-photo ${className}`} src={product.photo} alt="" />
  }
  if (product.liquids) {
    return (
      <div className={`trio ${className}`}>
        {product.liquids.map((liquid) => (
          <Bottle key={liquid} liquid={liquid} cap={product.cap} family="" />
        ))}
      </div>
    )
  }

  return <Bottle liquid={product.liquid} cap={product.cap} family={product.family} className={className} />
}
