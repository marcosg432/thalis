export function Illustration({ src, alt = '', width = 64, height = 64, className }) {
  if (!src) return null

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      decoding="async"
      draggable="false"
      style={{
        width,
        height,
        objectFit: 'contain',
        backgroundColor: 'transparent',
        verticalAlign: 'middle',
      }}
    />
  )
}
