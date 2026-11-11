import { useEffect, useMemo, useRef, useState } from 'react'
import { FragranceVisual } from './Bottle.jsx'
import { ProductShelf } from './ProductShelf.jsx'
import { HomeHero, SiteHeader } from './HomeHero.jsx'
import { ShoppingBag, Package, Gift, SprayCan, TestTubes, Undo2, HandHeart, Droplets, Clock, FlaskConical, ArrowRight, Heart, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  FEATURED_ID,
  FREE_SHIPPING,
  SHIPPING_FEE,
  brl,
  defaultSize,
  findProduct,
  money,
  pixDiscount,
  products,
  samples,
  relatedProducts,
  sizeLabel,
} from './data.js'

const CART_KEY = 'thalis-cart'
const ORDER_KEY = 'thalis-order'
const UFS = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    if (!Array.isArray(raw)) return []
    return raw.filter((item) => item && item.id && item.ml && item.qty > 0 && findProduct(item.id))
  } catch {
    return []
  }
}

function parseHash() {
  const hash = location.hash.replace(/^#/, '') || '/'
  if (hash.startsWith('/produto/')) {
    return { screen: 'product', productId: decodeURIComponent(hash.slice('/produto/'.length)) }
  }
  if (hash === '/checkout') return { screen: 'checkout', productId: null }
  if (hash === '/pedido') return { screen: 'done', productId: null }
  if (hash === '/presentes') return { screen: 'gifts', productId: null }
  return { screen: 'home', productId: null }
}

function go(hash) {
  window.dispatchEvent(new CustomEvent('curtain-go', { detail: { hash } }))
}

function afterReveal(fn) {
  const run = () => {
    window.removeEventListener('curtain-reveal', run)
    window.setTimeout(fn, 80)
  }
  window.addEventListener('curtain-reveal', run)
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const [filter, setFilter] = useState('todos')
  const [sort, setSort] = useState('destaques')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState(loadCart)
  const [order, setOrder] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null')
    } catch {
      return null
    }
  })

  useEffect(() => {
    const onReveal = () => setRoute(parseHash())
    window.addEventListener('curtain-reveal', onReveal)
    return () => window.removeEventListener('curtain-reveal', onReveal)
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') setCartOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (route.screen !== 'home') window.scrollTo(0, 0)
  }, [route])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return
    let target = window.scrollY
    let frame = 0
    let owned = null

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    }

    function nestedScroll(node, delta) {
      while (node && node !== document.body && node !== document.documentElement) {
        if (node instanceof Element) {
          const style = getComputedStyle(node)
          const can = style.overflowY === 'auto' || style.overflowY === 'scroll'
          if (can && node.scrollHeight > node.clientHeight + 1) {
            const atTop = node.scrollTop <= 0
            const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1
            if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) return true
          }
        }
        node = node.parentElement
      }
      return false
    }

    function tick() {
      const current = window.scrollY
      const diff = target - current
      if (Math.abs(diff) < 0.5) {
        owned = target
        window.scrollTo(0, target)
        frame = 0
        return
      }
      const next = current + diff * 0.22
      owned = next
      window.scrollTo(0, next)
      frame = requestAnimationFrame(tick)
    }

    function onWheel(event) {
      if (event.ctrlKey || document.body.style.overflow === 'hidden') return
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const mouseWheel = event.deltaMode !== 0 || Math.abs(event.deltaY) >= 50
      if (!mouseWheel || nestedScroll(event.target, event.deltaY)) return
      event.preventDefault()
      const delta = (event.deltaMode === 1 ? event.deltaY * 32 : event.deltaY) * 0.9
      const current = window.scrollY
      if (!frame || Math.sign(delta) !== Math.sign(target - current)) target = current
      target = Math.min(maxScroll(), Math.max(0, target + delta))
      const lead = 280
      target = Math.min(current + lead, Math.max(current - lead, target))
      if (!frame) frame = requestAnimationFrame(tick)
    }

    function onScroll() {
      if (owned !== null && Math.abs(window.scrollY - owned) < 1.5) return
      if (!frame) {
        target = window.scrollY
        return
      }
      cancelAnimationFrame(frame)
      frame = 0
      target = window.scrollY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const product = findProduct(route.productId)
    const titles = {
      home: 'Sage — Perfumaria online',
      gifts: 'Presentes — Sage',
      checkout: 'Checkout — Sage',
      done: 'Pedido registrado — Sage',
      product: product ? `${product.name} — Sage` : 'Sage — Perfumaria online',
    }
    document.title = titles[route.screen]
  }, [route])

  const lines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = findProduct(item.id)
          const size = product?.sizes.find((entry) => entry.ml === item.ml)
          if (!product || !size) return null
          return { ...item, product, size, total: money(size.price * item.qty) }
        })
        .filter(Boolean),
    [cart],
  )

  const subtotal = money(lines.reduce((sum, line) => sum + line.total, 0))
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE
  const count = lines.reduce((sum, line) => sum + line.qty, 0)
  const remaining = Math.max(0, money(FREE_SHIPPING - subtotal))
  const suggestion = products
    .filter((product) => !lines.some((line) => line.id === product.id))
    .sort((a, b) => defaultSize(a).price - defaultSize(b).price)[0]

  useEffect(() => {
    if (location.hash === '#/checkout' && lines.length === 0) go('#/')
    if (location.hash === '#/pedido' && !order) go('#/')
  }, [route, lines.length, order])

  function addProduct(product, size = defaultSize(product), qty = 1) {
    setCart((current) => {
      const index = current.findIndex((item) => item.id === product.id && item.ml === size.ml)
      if (index >= 0) {
        return current.map((item, itemIndex) =>
          itemIndex === index ? { ...item, qty: Math.min(6, item.qty + qty) } : item,
        )
      }
      return [...current, { id: product.id, ml: size.ml, qty }]
    })
    setCartOpen(true)
  }

  function setLineQty(id, ml, qty) {
    setCart((current) => {
      if (qty <= 0) return current.filter((item) => !(item.id === id && item.ml === ml))
      return current.map((item) => (item.id === id && item.ml === ml ? { ...item, qty: Math.min(6, qty) } : item))
    })
  }

  function placeOrder(payload) {
    const discount = payload.pagamento === 'pix' ? pixDiscount(subtotal) : 0
    const nextOrder = {
      id: `TH-${Math.floor(100000 + Math.random() * 900000)}`,
      lines: lines.map((line) => ({
        name: line.product.name,
        size: sizeLabel(line.size),
        qty: line.qty,
        total: line.total,
      })),
      subtotal,
      shipping,
      discount,
      total: money(subtotal - discount + shipping),
      pagamento: payload.pagamento,
      nome: payload.nome,
      email: payload.email,
      cidade: payload.cidade,
      uf: payload.uf,
    }
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(nextOrder))
    setOrder(nextOrder)
    setCart([])
    setCartOpen(false)
    go('#/pedido')
  }

  function showHomeSection(id) {
    setCartOpen(false)
    afterReveal(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    go('#/')
  }

  function goHomeTop() {
    setCartOpen(false)
    afterReveal(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    go('#/')
  }

  function openCatalog() {
    showHomeSection('descobrir')
  }

  const featured = findProduct(FEATURED_ID)
  const product = findProduct(route.productId)

  return (
    <div className={`app${route.screen === 'product' ? ' pdp-open' : ''}${route.screen !== 'home' ? ' has-nav' : ''}${route.screen === 'gifts' ? ' gifts-open' : ''}`}>
      {route.screen !== 'home' && (
        <div className="sticky-head">
          <SiteHeader
            count={count}
            onCart={() => setCartOpen(true)}
            onHome={goHomeTop}
            onDiscover={() => showHomeSection('descobrir')}
            onCombos={() => { setCartOpen(false); go('#/presentes') }}
            onSmall={() => { setCartOpen(false); go('#/presentes') }}
            onAbout={() => showHomeSection('sobre')}
            onSearch={() => { setCartOpen(false); go('#/presentes') }}
          />
        </div>
      )}

      <main>
        {route.screen === 'home' && (
          <>
            <HomeHero
              count={count}
              onCart={() => setCartOpen(true)}
              onHome={goHomeTop}
              onDiscover={() => showHomeSection('descobrir')}
              onCombos={() => { setCartOpen(false); go('#/presentes') }}
              onSmall={() => { setCartOpen(false); go('#/presentes') }}
              onAbout={() => showHomeSection('sobre')}
              onSearch={() => { setCartOpen(false); go('#/presentes') }}
            />
            <Ticker />
            <SampleCard onOpen={() => go('#/presentes')} />
            <section id="descobrir" className="discover" aria-label="Promoções e prateleira">
              <FocusProduct />
              <ProductShelf currency="R$" onOpen={(id) => go(`#/produto/${id}`)} />
            </section>
            <ShelfDuo onShop={() => openCatalog('todos')} onKit={() => go('#/presentes')} />
            <Services />
            <HomePaths
              onMen={() => showHomeSection('descobrir')}
              onWomen={() => showHomeSection('descobrir')}
              onGifts={() => { setCartOpen(false); go('#/presentes') }}
              onSamples={() => { setCartOpen(false); go('#/presentes') }}
            />
          </>
        )}

        {route.screen === 'gifts' && (
          <Gifts onOpen={(id) => go(`#/produto/${id}`)} onAdd={addProduct} />
        )}

        {route.screen === 'product' && product && (
          <ProductView
            key={product.id}
            product={product}
            onAdd={addProduct}
            onOpen={(id) => go(`#/produto/${id}`)}
            onBack={() => openCatalog(filter)}
            cartOpen={cartOpen}
          />
        )}

        {route.screen === 'product' && !product && (
          <div className="wrap empty-page">
            <h1>Essa fragrância não está na loja.</h1>
            <button className="btn wine" type="button" onClick={() => openCatalog('todos')}>
              Voltar aos perfumes
            </button>
          </div>
        )}

        {route.screen === 'checkout' && lines.length > 0 && (
          <Checkout lines={lines} subtotal={subtotal} shipping={shipping} onPlace={placeOrder} onBack={() => go('#/')} />
        )}

        {route.screen === 'done' && order && <Done order={order} onHome={() => openCatalog('todos')} />}
      </main>

      <Footer onShop={() => openCatalog('todos')} />

      {cartOpen && (
        <CartDrawer
          lines={lines}
          subtotal={subtotal}
          shipping={shipping}
          remaining={remaining}
          suggestion={remaining > 0 ? suggestion : null}
          onClose={() => setCartOpen(false)}
          onQty={setLineQty}
          onAdd={addProduct}
          onCheckout={() => {
            setCartOpen(false)
            go('#/checkout')
          }}
        />
      )}
    </div>
  )
}

function Hero({ product, onOpen, onAdd, onShop }) {
  const size = defaultSize(product)
  return (
    <section className="wrap hero">
      <div className="hero-copy">
        <p className="eyebrow">Perfumaria Sage</p>
        <h1>O perfume certo, a caminho hoje.</h1>
        <p className="lede">
          Nove fragrâncias em estoque, prontas para envio. Escolha o frasco, pague no Pix com 5% e receba em até 24 horas úteis.
        </p>
        <div className="hero-actions">
          <button className="btn wine" type="button" onClick={onShop}>
            Comprar agora
          </button>
          <button className="btn ghost" type="button" onClick={() => onOpen(product.id)}>
            Ver o mais vendido
          </button>
        </div>
      </div>
      <article className="hero-stage">
        <button className="hero-visual" type="button" onClick={() => onOpen(product.id)} aria-label={`Ver ${product.name}`}>
          <FragranceVisual product={product} />
        </button>
        <div className="hero-buy">
          <span className="badge">{product.tag}</span>
          <h2>{product.name}</h2>
          <p className="meta">
            {product.family} · {product.gender}
          </p>
          <p className="blurb">{product.blurb}</p>
          <p className="price">{brl(size.price)}</p>
          <p className="pix-note">{brl(size.price - pixDiscount(size.price))} no Pix · ou 3x de {brl(size.price / 3)}</p>
          <button className="btn wine full" type="button" onClick={() => onAdd(product, size)}>
            Adicionar {sizeLabel(size)}
          </button>
        </div>
      </article>
    </section>
  )
}

const PROMOS = [
  { id: 'promo-1', tone: '#9c3b06', image: '/home/promo-1.jpg?v=3' },
  { id: 'promo-2', tone: '#7a3410', image: '/home/promo-2.jpg' },
  { id: 'promo-3', tone: '#5c280c', image: '/home/promo-3.jpg' },
]

function PromoKitCopy() {
  const points = [
    ['Perfume Exclusivo', 'bottle'],
    ['Versão de Viagem', 'vial'],
    ['Vela Aromática', 'candle'],
  ]
  return (
    <div className="promo-copy">
      <p className="promo-copy__kicker">Kit presente</p>
      <h2>Presente Perfeito</h2>
      <p>Uma experiência completa em fragrância e bem-estar.</p>
      <ul>
        {points.map(([label, icon]) => (
          <li key={label}>
            <PromoKitIcon name={icon} />
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => go('#/presentes')}>
        Monte o Seu Kit
        <ArrowRight size={16} strokeWidth={1.6} />
      </button>
    </div>
  )
}

function PromoWeekCopy() {
  return (
    <div className="promo-copy promo-copy--week">
      <p className="promo-copy__kicker">Promoção da semana</p>
      <h2>Kit Sofisticação</h2>
      <p className="promo-copy__line">Perfume + Frasco de Viagem</p>
      <span className="promo-copy__off">Até <strong>20%</strong> OFF</span>
    </div>
  )
}

function PromoComboCopy() {
  return (
    <div className="promo-copy promo-copy--left">
      <p className="promo-copy__kicker">Promoção especial</p>
      <h2>Combo Essencial</h2>
      <p>Três fragrâncias marcantes, para todas as ocasiões.</p>
      <button type="button" onClick={() => go('#/presentes')}>
        Aproveitar Oferta
        <ArrowRight size={16} strokeWidth={1.6} />
      </button>
    </div>
  )
}

function PromoSlideCopy({ id }) {
  if (id === 'promo-1') return <PromoKitCopy />
  if (id === 'promo-2') return <PromoWeekCopy />
  if (id === 'promo-3') return <PromoComboCopy />
  return null
}

function PromoKitIcon({ name }) {
  if (name === 'vial') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M11 14.5h8.2v12.2a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V14.5z" />
        <path d="M13.6 14.5V9.2h3.4v5.3" />
        <path d="M17 11.2h4.2" />
        <path d="M21.2 11.2c2.4-2.6 4.6-3.4 6.4-3.4" />
        <circle cx="27.8" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (name === 'candle') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2.2c2 2.8.6 4.6 0 6.2-.6-1.6-2-3.4 0-6.2z" />
        <path d="M16 7.6c1.3 1.6.3 2.6 0 3.5" />
        <path d="M16 12.8v2" />
        <path d="M8.8 16.2h14.4l-1.5 10.6a2.3 2.3 0 0 1-2.3 2H12.6a2.3 2.3 0 0 1-2.3-2L8.8 16.2z" />
        <path d="M9.4 20.6h13.2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M12.2 2.6h7.6v3.2h-7.6z" />
      <path d="M14 5.8h4V9h-4z" />
      <path d="M8.2 12.2c.8-2.2 2.8-3.4 7.8-3.4s7 1.2 7.8 3.4v14.2a2.2 2.2 0 0 1-2.2 2.2H10.4a2.2 2.2 0 0 1-2.2-2.2V12.2z" />
      <path d="M11.4 18.4h9.2" />
    </svg>
  )
}

function FocusProduct() {
  const [front, setFront] = useState(0)
  const [motion, setMotion] = useState(null)
  const promo = PROMOS[front]
  const incoming = motion ? PROMOS[(front + motion.dir + PROMOS.length) % PROMOS.length] : null

  function bring(dir) {
    if (motion) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFront((current) => (current + dir + PROMOS.length) % PROMOS.length)
      return
    }
    setMotion({ dir, run: false })
  }

  useEffect(() => {
    if (!motion || motion.run) return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        setMotion((current) => (current ? { ...current, run: true } : current))
      })
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [motion])

  function finish(event) {
    if (!motion?.run || event.propertyName !== 'transform') return
    const dir = motion.dir
    setFront((current) => (current + dir + PROMOS.length) % PROMOS.length)
    setMotion(null)
  }

  const leave = motion?.run ? (motion.dir > 0 ? 'is-leave-left' : 'is-leave-right') : ''
  const enter = !motion ? '' : motion.run ? 'is-on' : (motion.dir > 0 ? 'is-from-right' : 'is-from-left')

  return (
    <div className="focus" style={{ background: promo.tone }}>
      <div className="focus-photos">
        {promo.image ? (
          <div key={promo.id} className={`promo-photo ${leave}`}>
            <img src={promo.image} alt="" />
            <PromoSlideCopy id={promo.id} />
            {promo.id === 'promo-1' ? <span className="promo-tag">Kit Presente</span> : null}
          </div>
        ) : null}
        {incoming?.image ? (
          <div key={incoming.id} className={`promo-photo promo-photo--enter ${enter}`} onTransitionEnd={finish}>
            <img src={incoming.image} alt="" />
            <PromoSlideCopy id={incoming.id} />
            {incoming.id === 'promo-1' ? <span className="promo-tag">Kit Presente</span> : null}
          </div>
        ) : null}
      </div>
      <svg className="focus-wave focus-wave--top" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#efe2d2" d="M0,44 C90,10 150,78 280,48 C410,18 470,82 620,46 C770,8 840,76 1000,44 C1140,16 1220,74 1340,42 C1390,28 1420,50 1440,46 L1440,0 L0,0 Z" />
      </svg>
      <svg className="focus-wave" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#efe2d2" d="M0,52 C90,86 150,18 280,48 C410,78 470,14 620,50 C770,88 840,20 1000,52 C1140,80 1220,22 1340,54 C1390,68 1420,46 1440,50 L1440,96 L0,96 Z" />
      </svg>
      <div className="focus-nav">
        <button type="button" aria-label="Promoção anterior" onClick={() => bring(-1)}>
          <ChevronLeft size={18} strokeWidth={1.6} />
        </button>
        <button type="button" aria-label="Próxima promoção" onClick={() => bring(1)}>
          <ChevronRight size={18} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  )
}

const SAMPLE_SORTS = [
  ['vendidos', 'Mais vendidos'],
  ['menor', 'Menor preço'],
  ['maior', 'Maior preço'],
]
const SAMPLE_FAMILIES = ['Amadeirado', 'Cítrico', 'Aromático', 'Oriental', 'Floral', 'Fresco']
const SAMPLE_BRANDS = ['Armani', 'Dior', 'Chanel', 'Paco Rabanne', 'Dolce & Gabbana']
const SAMPLE_MORE_BRANDS = ['Carolina Herrera', 'Jean Paul Gaultier']

function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div>
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index}>Cheiro caro, gaste menos</span>
        ))}
      </div>
      <svg className="ticker-wave" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#efe2d2" d="M0,20 C90,40 150,6 280,18 C410,34 470,4 620,20 C770,38 840,6 1000,20 C1140,34 1220,6 1340,22 C1390,30 1420,16 1440,20 L1440,48 L0,48 Z" />
      </svg>
    </div>
  )
}

function Gifts({ onOpen, onAdd }) {
  const [families, setFamilies] = useState([])
  const [brands, setBrands] = useState([])
  const [moreBrands, setMoreBrands] = useState(false)
  const [sort, setSort] = useState('vendidos')
  const [sortOpen, setSortOpen] = useState(false)
  const [saved, setSaved] = useState([])
  const sortRef = useRef(null)
  const sortLabel = SAMPLE_SORTS.find(([value]) => value === sort)?.[1]

  useEffect(() => {
    if (!sortOpen) return
    function onPointer(event) {
      if (!sortRef.current?.contains(event.target)) setSortOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [sortOpen])
  const brandList = moreBrands ? [...SAMPLE_BRANDS, ...SAMPLE_MORE_BRANDS] : SAMPLE_BRANDS

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }

  const list = samples.filter((product) => {
    const familyOk = families.length === 0 || families.includes(product.family)
    const brandOk = brands.length === 0 || brands.includes(product.brand)
    return familyOk && brandOk
  })
  const sorted = [...list].sort((a, b) => {
    if (sort === 'menor') return a.price - b.price
    if (sort === 'maior') return b.price - a.price
    return a.rank - b.rank
  })

  return (
    <>
    <section className="gifts-banner" aria-label="Frascos de teste">
      <img src="/home/presentes-banner.jpg" alt="Três frascos de teste e um estojo sobre uma pedra" />
      <div className="gifts-banner__copy">
        <p>Experimente antes de escolher</p>
        <h2>Frascos para Teste</h2>
        <p className="gifts-banner__desc">Conheça o aroma de suas fragrâncias favoritas em versões menores, ideais para você sentir o cheiro antes de comprar o frasco original.</p>
        <ul>
          <li><Droplets size={22} strokeWidth={1.4} /> Mesmo aroma do original</li>
          <li><Clock size={22} strokeWidth={1.4} /> Fixação e duração menores</li>
          <li><FlaskConical size={22} strokeWidth={1.4} /> Ideal para experimentar</li>
        </ul>
      </div>
    </section>
    <Ticker />
    <section className="vial-page">
      <aside className="vial-filters">
        <h1>Filtrar Frascos</h1>
        <fieldset>
          <legend>
            Família Olfativa
            <ChevronDown size={16} />
          </legend>
          {SAMPLE_FAMILIES.map((family) => (
            <label key={family}>
              <input
                type="checkbox"
                checked={families.includes(family)}
                onChange={() => toggle(families, setFamilies, family)}
              />
              <span>{family}</span>
              <em>({samples.filter((item) => item.family === family).length})</em>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>
            Marca / Linha
            <ChevronDown size={16} />
          </legend>
          {brandList.map((brand) => (
            <label key={brand}>
              <input
                type="checkbox"
                checked={brands.includes(brand)}
                onChange={() => toggle(brands, setBrands, brand)}
              />
              <span>{brand}</span>
              <em>({samples.filter((item) => item.brand === brand).length})</em>
            </label>
          ))}
          <button type="button" onClick={() => setMoreBrands((value) => !value)}>
            {moreBrands ? 'Ver menos' : 'Ver mais +'}
          </button>
        </fieldset>
      </aside>

      <div className="vial-main">
        <div className="vial-bar">
          <p>{sorted.length} {sorted.length === 1 ? 'fragrância' : 'fragrâncias'} para experimentar</p>
          <div className={`vial-sort${sortOpen ? ' open' : ''}`} ref={sortRef}>
            <span>Ordenar por</span>
            <button type="button" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)}>
              {sortLabel}
              <ChevronDown size={16} strokeWidth={1.6} />
            </button>
            {sortOpen && (
              <ul>
                {SAMPLE_SORTS.map(([value, label]) => (
                  <li key={value}>
                    <button
                      type="button"
                      aria-current={value === sort ? 'true' : undefined}
                      onClick={() => { setSort(value); setSortOpen(false) }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {sorted.length === 0 ? (
          <p className="empty">Nenhum frasco com esses filtros.</p>
        ) : (
          <ul className="vial-grid">
            {sorted.map((product) => {
              const size = defaultSize(product)
              const liked = saved.includes(product.id)
              return (
                <li key={product.id}>
                  <article className="vial-card">
                    <button
                      className={`vial-heart${liked ? ' on' : ''}`}
                      type="button"
                      aria-label={liked ? `Tirar ${product.name} dos salvos` : `Salvar ${product.name}`}
                      aria-pressed={liked}
                      onClick={() => toggle(saved, setSaved, product.id)}
                    >
                      <Heart size={16} strokeWidth={1.6} fill={liked ? 'currentColor' : 'none'} />
                    </button>
                    <button className="vial-photo" type="button" onClick={() => onOpen(product.id)} aria-label={`Ver ${product.name}`}>
                      <img src={product.photo} alt="" />
                    </button>
                    <h2>
                      <button type="button" onClick={() => onOpen(product.id)}>{product.name}</button>
                    </h2>
                    <p>Frasco para teste — 5 ml</p>
                    <div className="vial-buy">
                      <strong>{brl(size.price)}</strong>
                      <button type="button" aria-label={`Adicionar ${product.name}`} onClick={() => onAdd(product, size)}>
                        <ShoppingCart size={15} strokeWidth={1.7} />
                      </button>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
    </>
  )
}

function Catalog({ filter, sort, onSort, onOpen, onAdd }) {
  const list = products.filter((product) => filter === 'todos' || product.gender.toLowerCase() === filter)
  const sorted = [...list].sort((a, b) => {
    if (sort === 'menor') return defaultSize(a).price - defaultSize(b).price
    if (sort === 'maior') return defaultSize(b).price - defaultSize(a).price
    return 0
  })

  return (
    <section className="wrap catalog" id="catalogo">
      <div className="catalog-head">
        <div>
          <h2>A loja</h2>
          <p>
            {sorted.length} {sorted.length === 1 ? 'fragrância' : 'fragrâncias'} em estoque
          </p>
        </div>
        <label className="sort">
          Ordenar
          <select value={sort} onChange={(event) => onSort(event.target.value)}>
            <option value="destaques">Destaques</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </label>
      </div>
      {sorted.length === 0 ? (
        <p className="empty">Nada nessa categoria agora.</p>
      ) : (
        <ul className="grid">
          {sorted.map((product) => {
            const size = defaultSize(product)
            const small = product.sizes.length > 1 ? product.sizes[0] : null
            return (
              <li key={product.id}>
                <article className="card">
                  <button className="card-visual" type="button" onClick={() => onOpen(product.id)} aria-label={`Ver ${product.name}`}>
                    {product.tag && <span className={product.tag === 'Estoque baixo' ? 'badge warn' : 'badge'}>{product.tag}</span>}
                    <FragranceVisual product={product} />
                  </button>
                  <p className="meta">
                    {product.family} · {product.gender}
                  </p>
                  <h3>
                    <button type="button" className="name" onClick={() => onOpen(product.id)}>
                      {product.name}
                    </button>
                  </h3>
                  <p className="blurb">{product.blurb}</p>
                  <div className="card-buy">
                    <p className="price">{brl(size.price)}</p>
                    <button className="btn wine" type="button" onClick={() => onAdd(product, size)}>
                      Adicionar
                    </button>
                    <p className="pix-note">
                      {brl(size.price - pixDiscount(size.price))} no Pix
                      {small ? ` · ${sizeLabel(small)} por ${brl(small.price)}` : ''}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function Trust() {
  const items = [
    ['01', 'Envio em 24h', 'Sai do estoque no próximo dia útil, para todo o Brasil.'],
    ['02', 'Troca em 7 dias', 'Se o perfume não for o seu, a troca é simples.'],
    ['03', 'Pix com 5%', 'O desconto entra na hora, direto no total do pedido.'],
  ]
  return (
    <section className="wrap trust">
      {items.map(([index, title, text]) => (
        <article key={index}>
          <span>{index}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </section>
  )
}

function ProductView({ product, onAdd, onOpen, onBack, cartOpen }) {
  const initial = defaultSize(product)
  const [ml, setMl] = useState(initial.ml)
  const [qty, setQty] = useState(1)
  const size = product.sizes.find((entry) => entry.ml === ml) || initial
  const related = relatedProducts(product)

  return (
    <article className="wrap pdp">
      <div className="pdp-visual">
        <button className="linkish" type="button" onClick={onBack}>
          Voltar à loja
        </button>
        <FragranceVisual product={product} />
      </div>
      <div className="buybox">
        {product.tag && <span className={product.tag === 'Estoque baixo' ? 'badge warn static' : 'badge static'}>{product.tag}</span>}
        <p className="meta">
          {product.family} · {product.gender}
        </p>
        <h1>{product.name}</h1>
        <p className="lede">{product.description}</p>
        <p className="price big">{brl(size.price)}</p>
        <p className="pix-note">
          {brl(size.price - pixDiscount(size.price))} no Pix · ou 3x de {brl(size.price / 3)} sem juros
        </p>
        {product.stockNote && <p className="stock">{product.stockNote}</p>}
        <fieldset className="sizes">
          <legend>Tamanho</legend>
          {product.sizes.map((entry) => (
            <label key={entry.ml} className={entry.ml === size.ml ? 'on' : ''}>
              <input
                type="radio"
                name="tamanho"
                checked={entry.ml === size.ml}
                onChange={() => setMl(entry.ml)}
              />
              <span>{sizeLabel(entry)}</span>
              <strong>{brl(entry.price)}</strong>
              {entry.ml === defaultSize(product).ml && product.sizes.length > 1 && <em>Mais escolhido</em>}
            </label>
          ))}
        </fieldset>
        <div className="qty-row">
          <span>Quantidade</span>
          <div className="qty">
            <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Diminuir quantidade">
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((value) => Math.min(6, value + 1))} aria-label="Aumentar quantidade">
              +
            </button>
          </div>
        </div>
        <button className="btn wine full" type="button" onClick={() => onAdd(product, size, qty)}>
          Adicionar ao carrinho · {brl(size.price * qty)}
        </button>
        <ul className="assure">
          <li>Envio em até 24h úteis</li>
          <li>Troca em 7 dias</li>
          <li>Frete grátis a partir de {brl(FREE_SHIPPING)}</li>
        </ul>
        <dl className="pyramid">
          <div>
            <dt>Saída</dt>
            <dd>{product.notes.saida.join(' · ')}</dd>
          </div>
          <div>
            <dt>Coração</dt>
            <dd>{product.notes.coracao.join(' · ')}</dd>
          </div>
          <div>
            <dt>Fundo</dt>
            <dd>{product.notes.fundo.join(' · ')}</dd>
          </div>
        </dl>
      </div>
      <section className="related">
        <h2>Quem leva este também pede</h2>
        <ul className="grid compact">
          {related.map((item) => {
            const itemSize = defaultSize(item)
            return (
              <li key={item.id}>
                <article className="card">
                  <button className="card-visual" type="button" onClick={() => onOpen(item.id)} aria-label={`Ver ${item.name}`}>
                    <FragranceVisual product={item} />
                  </button>
                  <h3>
                    <button type="button" className="name" onClick={() => onOpen(item.id)}>
                      {item.name}
                    </button>
                  </h3>
                  <div className="card-buy">
                    <p className="price">{brl(itemSize.price)}</p>
                    <button className="btn wine" type="button" onClick={() => onAdd(item, itemSize)}>
                      Adicionar
                    </button>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </section>
      {!cartOpen && (
        <div className="mobile-buy">
          <div>
            <strong>{brl(size.price * qty)}</strong>
            <span>{sizeLabel(size)}</span>
          </div>
          <button className="btn wine" type="button" onClick={() => onAdd(product, size, qty)}>
            Adicionar
          </button>
        </div>
      )}
    </article>
  )
}

function CartDrawer({ lines, subtotal, shipping, remaining, suggestion, onClose, onQty, onAdd, onCheckout }) {
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100)
  const total = money(subtotal + shipping)

  return (
    <>
      <button className="backdrop" type="button" aria-label="Fechar carrinho" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-head">
          <h2 id="cart-title">Seu carrinho</h2>
          <button className="linkish" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="empty">
            <p>Seu carrinho está vazio.</p>
            <button className="btn wine" type="button" onClick={onClose}>
              Ver fragrâncias
            </button>
          </div>
        ) : (
          <>
            <div className="ship">
              <p>{remaining === 0 ? 'Frete grátis nesta compra.' : `Faltam ${brl(remaining)} para o frete grátis.`}</p>
              <div className="ship-bar" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <ul className="lines">
              {lines.map((line) => (
                <li key={`${line.id}-${line.ml}`} className="line">
                  <div className="line-visual">
                    <FragranceVisual product={line.product} />
                  </div>
                  <div>
                    <strong>{line.product.name}</strong>
                    <span>{sizeLabel(line.size)}</span>
                    <div className="qty">
                      <button type="button" onClick={() => onQty(line.id, line.ml, line.qty - 1)} aria-label={`Diminuir ${line.product.name}`}>
                        −
                      </button>
                      <span>{line.qty}</span>
                      <button type="button" onClick={() => onQty(line.id, line.ml, line.qty + 1)} aria-label={`Aumentar ${line.product.name}`}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="line-end">
                    <span>{brl(line.total)}</span>
                    <button className="linkish" type="button" onClick={() => onQty(line.id, line.ml, 0)}>
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {suggestion && (
              <div className="suggest">
                <p>
                  {defaultSize(suggestion).price >= remaining
                    ? `Leve ${suggestion.name} e o frete sai de graça.`
                    : `Que tal levar também ${suggestion.name}?`}
                </p>
                <button className="btn ghost" type="button" onClick={() => onAdd(suggestion)}>
                  Adicionar · {brl(defaultSize(suggestion).price)}
                </button>
              </div>
            )}
            <div className="totals">
              <p>
                <span>Subtotal</span>
                <span>{brl(subtotal)}</span>
              </p>
              <p>
                <span>Frete</span>
                <span>{shipping === 0 ? 'Grátis' : brl(shipping)}</span>
              </p>
              <p className="grand">
                <span>Total</span>
                <span>{brl(total)}</span>
              </p>
              <button className="btn wine full" type="button" onClick={onCheckout}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

function Checkout({ lines, subtotal, shipping, onPlace, onBack }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: 'SP',
    pagamento: 'pix',
  })
  const [errors, setErrors] = useState({})
  const discount = form.pagamento === 'pix' ? pixDiscount(subtotal) : 0
  const total = money(subtotal - discount + shipping)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function submit(event) {
    event.preventDefault()
    const next = {}
    if (form.nome.trim().length < 3) next.nome = 'Diga o nome de quem recebe.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'E-mail inválido.'
    if (form.telefone.replace(/\D/g, '').length < 10) next.telefone = 'Telefone com DDD.'
    if (form.cep.replace(/\D/g, '').length !== 8) next.cep = 'CEP com 8 números.'
    if (form.endereco.trim().length < 5) next.endereco = 'Informe rua e número.'
    if (form.cidade.trim().length < 2) next.cidade = 'Informe a cidade.'
    if (!form.uf) next.uf = 'Escolha o estado.'
    setErrors(next)
    if (Object.keys(next).length === 0) onPlace(form)
  }

  return (
    <section className="wrap checkout">
      <form onSubmit={submit} noValidate>
        <button className="linkish" type="button" onClick={onBack}>
          Continuar comprando
        </button>
        <h1>Entrega e pagamento</h1>
        <div className="fields">
          <Field label="Nome" error={errors.nome} className="span-2">
            <input autoComplete="name" value={form.nome} onChange={(event) => update('nome', event.target.value)} />
          </Field>
          <Field label="E-mail" error={errors.email}>
            <input autoComplete="email" inputMode="email" value={form.email} onChange={(event) => update('email', event.target.value)} />
          </Field>
          <Field label="Telefone" error={errors.telefone}>
            <input autoComplete="tel" inputMode="tel" value={form.telefone} onChange={(event) => update('telefone', event.target.value)} />
          </Field>
          <Field label="CEP" error={errors.cep}>
            <input autoComplete="postal-code" inputMode="numeric" value={form.cep} onChange={(event) => update('cep', event.target.value)} />
          </Field>
          <Field label="Endereço" error={errors.endereco}>
            <input autoComplete="street-address" value={form.endereco} onChange={(event) => update('endereco', event.target.value)} />
          </Field>
          <Field label="Cidade" error={errors.cidade}>
            <input autoComplete="address-level2" value={form.cidade} onChange={(event) => update('cidade', event.target.value)} />
          </Field>
          <Field label="Estado" error={errors.uf}>
            <select autoComplete="address-level1" value={form.uf} onChange={(event) => update('uf', event.target.value)}>
              {UFS.map((uf) => (
                <option key={uf}>{uf}</option>
              ))}
            </select>
          </Field>
        </div>
        <fieldset className="pay">
          <legend>Pagamento</legend>
          <label className={form.pagamento === 'pix' ? 'on' : ''}>
            <input type="radio" name="pagamento" checked={form.pagamento === 'pix'} onChange={() => update('pagamento', 'pix')} />
            <span>Pix</span>
            <strong>5% de desconto</strong>
          </label>
          <label className={form.pagamento === 'cartao' ? 'on' : ''}>
            <input type="radio" name="pagamento" checked={form.pagamento === 'cartao'} onChange={() => update('pagamento', 'cartao')} />
            <span>Cartão</span>
            <strong>3x sem juros</strong>
          </label>
        </fieldset>
        <button className="btn wine full" type="submit">
          Confirmar pedido · {brl(total)}
        </button>
        <p className="fine">Demonstração: o pedido fica registrado nesta tela e nenhum valor é cobrado.</p>
      </form>
      <aside className="summary">
        <h2>Resumo</h2>
        <ul>
          {lines.map((line) => (
            <li key={`${line.id}-${line.ml}`}>
              <span>
                {line.product.name} · {sizeLabel(line.size)} × {line.qty}
              </span>
              <span>{brl(line.total)}</span>
            </li>
          ))}
        </ul>
        <p>
          <span>Subtotal</span>
          <span>{brl(subtotal)}</span>
        </p>
        <p>
          <span>Frete</span>
          <span>{shipping === 0 ? 'Grátis' : brl(shipping)}</span>
        </p>
        {discount > 0 && (
          <p>
            <span>Desconto Pix</span>
            <span>− {brl(discount)}</span>
          </p>
        )}
        <p className="grand">
          <span>Total</span>
          <span>{brl(total)}</span>
        </p>
      </aside>
    </section>
  )
}

function Field({ label, error, className = '', children }) {
  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  )
}

function Done({ order, onHome }) {
  return (
    <section className="wrap done">
      <p className="eyebrow">Pedido {order.id}</p>
      <h1>Pedido reservado, {order.nome.split(' ')[0]}.</h1>
      <p className="lede">
        Destino: {order.cidade}/{order.uf}. Pagamento escolhido:{' '}
        {order.pagamento === 'pix' ? 'Pix com 5% de desconto' : 'cartão em até 3x'}. Total de {brl(order.total)}.
      </p>
      <ul>
        {order.lines.map((line) => (
          <li key={`${line.name}-${line.size}`}>
            {line.name} · {line.size} × {line.qty}
            <span>{brl(line.total)}</span>
          </li>
        ))}
      </ul>
      <p className="fine">Nesta demonstração a reserva fica só neste navegador. Nenhum valor foi cobrado.</p>
      <button className="btn wine" type="button" onClick={onHome}>
        Comprar mais um perfume
      </button>
    </section>
  )
}

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <span>S</span>
      <span>A</span>
      <span>G</span>
      <span>E</span>
    </span>
  )
}

function ShelfDuo({ onShop, onKit }) {
  return (
    <section className="duo" aria-label="Destaques Sage">
      <article>
        <img src="/duo/face.jpg" alt="" />
        <div className="duo-copy">
          <p>sinta os cheiros da</p>
          <strong>sage</strong>
        </div>
        <button className="duo-shop" type="button" onClick={onShop}>ver os perfumes</button>
      </article>
      <article>
        <img className="duo-kit" src="/duo/kit.jpg" alt="Kit de fragrâncias" />
        <button className="duo-pack" type="button" onClick={onKit}>construa seu próprio pacote</button>
      </article>
    </section>
  )
}

function SampleCard({ onOpen }) {
  const points = [
    ['Mesmo aroma do original', Droplets],
    ['Duração reduzida', Clock],
    ['Ideal para conhecer', FlaskConical],
  ]
  return (
    <section className="sample-banner" id="inicio-depois" aria-labelledby="sample-title">
      <article className="sample-card">
        <img src="/home/frascos-teste.png?v=3" alt="" />
        <div className="sample-card__main">
          <div className="sample-card__lead">
            <div>
              <p>Experimente antes</p>
              <h2 id="sample-title">Fragrâncias para conhecer.</h2>
              <p className="sample-card__desc">Descubra o aroma de suas fragrâncias favoritas em pequenos frascos, feitos para experimentar antes de escolher.</p>
            </div>
            <div className="sample-card__cta">
              <button type="button" onClick={onOpen}>
                Ver frascos de teste
                <ArrowRight size={16} strokeWidth={1.6} />
              </button>
            </div>
          </div>
          <div className="sample-card__foot">
            <ul>
              {points.map(([label, Icon]) => (
                <li key={label}>
                  <Icon size={28} strokeWidth={1.4} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <p>A proposta é conhecer o aroma. A fixação e a duração podem ser inferiores às do perfume original.</p>
          </div>
        </div>
        <img className="sample-card__leaves" src="/home/folhas.png" alt="" />
      </article>
    </section>
  )
}

function Services() {
  const items = [
    ['Entrega grátis a partir de R$ 299', Package],
    ['Caixa de presente grátis', Gift],
    ['Dose para testar a fragrância', SprayCan],
    ['Duas amostras grátis em todo pedido', TestTubes],
    ['Troca grátis em até 7 dias', Undo2],
    ['Presente de boas-vindas', HandHeart],
  ]
  return (
    <section className="services" id="sobre" aria-label="A sua disposição">
      <h2>A sua disposição</h2>
      <div>
        {items.map(([label, Icon]) => (
          <article key={label}>
            <span className="service-icon">
              <Icon strokeWidth={1.4} />
            </span>
            <p>{label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function HomePaths({ onMen, onWomen, onGifts, onSamples }) {
  const cards = [
    ['Masculinos', '/illustrations/frascos/lemale.png', onMen],
    ['Femininos', '/gallery/flower.jpg', onWomen],
    ['Cestas de Presente', '/holiday/gifts.jpg', onGifts],
    ['Frascos para Teste', '/home/frascos-teste.png', onSamples],
  ]
  return (
    <section className="paths" aria-label="Caminhos da loja">
      {cards.map(([label, image, action]) => (
        <button key={label} type="button" onClick={action}>
          <img src={image} alt="" />
          <span>{label}</span>
          <ArrowRight size={16} strokeWidth={1.6} />
        </button>
      ))}
    </section>
  )
}

function Footer({ onShop }) {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="logo" aria-label="Sage"><Mark /></p>
          <p>Perfumaria online. Fragrâncias para usar, não para ficar na prateleira.</p>
        </div>
        <div>
          <p>Envio para todo o Brasil</p>
          <p>Atendimento em dias úteis, das 9h às 18h</p>
        </div>
        <button className="btn paper" type="button" onClick={onShop}>
          Ir para a loja
        </button>
      </div>
    </footer>
  )
}
