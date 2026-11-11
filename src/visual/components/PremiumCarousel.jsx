import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

export function PremiumCarousel({ slides, ariaLabel = "Carrossel" }) {
  const [viewport, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" })
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setIndex(api.selectedScrollSnap())
    setCount(api.scrollSnapList().length)
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  return (
    <div>
      <div ref={viewport} style={{ overflow: "hidden" }} aria-roledescription="carousel" aria-label={ariaLabel}>
        <div style={{ display: "flex", touchAction: "pan-y pinch-zoom" }}>
          {slides.map((slide, i) => (
            <div key={i} style={{ flex: "0 0 100%", minWidth: 0 }} aria-roledescription="slide">
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
        <button type="button" onClick={() => api?.scrollPrev()} disabled={!api || index === 0}>Anterior</button>
        <span>{count ? `${index + 1} / ${count}` : "0 / 0"}</span>
        <button type="button" onClick={() => api?.scrollNext()} disabled={!api || index >= count - 1}>Próximo</button>
      </div>
    </div>
  )
}
