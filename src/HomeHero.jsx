import { useState } from 'react'
import { Plus } from 'lucide-react'

const SLIDES = [
  {
    image: '/home/hero-inicio-4k.jpg',
    kicker: 'Mais do que um perfume',
    text: 'Surpreenda com o Kit Perfeito da Mabiè,\ne transforme momentos em memórias.',
    cta: 'Conheça os Combos',
    action: 'combos',
  },
]

export function SiteHeader({ onHome, onSmall, onAbout }) {
  return (
    <div className="site-nav">
      <header className="home-hero__nav">
        <div className="home-hero__group">
          <button type="button" onClick={onHome}>Início</button>
          <button type="button" onClick={onSmall}>Miniaturas</button>
          <button type="button" onClick={onAbout}>Sobre</button>
        </div>
      </header>
    </div>
  )
}

export function HomeHero({ onHome, onDiscover, onCombos, onSmall, onAbout }) {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const actions = { discover: onDiscover, combos: onCombos, small: onSmall }

  function goSlide(next) {
    const total = SLIDES.length
    setIndex((next + total) % total)
  }

  return (
    <section className="home-hero" aria-roledescription="carrossel" aria-label="Destaques">
      <div className="home-hero__viewport">
        {SLIDES.map((item, slideIndex) => (
          <article
            key={item.image}
            className="home-hero__slide"
            style={{ transform: `translateX(${(slideIndex - index) * 100}%)` }}
            aria-hidden={slideIndex !== index}
          >
            <img src={item.image} alt="" />
          </article>
        ))}
      </div>

      <SiteHeader onHome={onHome} onSmall={onSmall} onAbout={onAbout} />

      <div className="home-hero__copy">
        <p>{slide.kicker}</p>
        <h1 className="home-hero__title">
          <span>Um presente</span>
          <span>que permanece.</span>
        </h1>
        <p className="home-hero__text">{slide.text}</p>
        <button className="home-hero__cta" type="button" onClick={actions[slide.action]}>
          {slide.cta}
          <span className="home-hero__plus" aria-hidden="true">
            <Plus size={13} strokeWidth={1.4} />
          </span>
        </button>
      </div>

      <button
        className="home-hero__scroll"
        type="button"
        onClick={() => document.getElementById('inicio-depois')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span />
        Deslize para descobrir
      </button>

      {SLIDES.length > 1 && (
        <div className="home-hero__dots">
          {SLIDES.map((item, slideIndex) => (
            <button
              key={item.image}
              type="button"
              aria-label={`Slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? 'true' : undefined}
              onClick={() => goSlide(slideIndex)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
