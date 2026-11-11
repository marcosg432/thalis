export const FREE_SHIPPING = 299
export const SHIPPING_FEE = 24
export const PIX_RATE = 0.05
export const FEATURED_ID = 'noite-de-ambar'

export const products = [
  {
    id: 'noite-de-ambar',
    name: 'Noite de Âmbar',
    gender: 'Unissex',
    family: 'Oriental',
    tag: 'Mais vendido',
    blurb: 'Doce, quente e feito para a noite.',
    description:
      'Abre cítrico, esquenta em rosa e âmbar e fica cremoso na pele por horas. É a fragrância que mais volta para a segunda unidade.',
    notes: {
      saida: ['Bergamota', 'Açafrão'],
      coracao: ['Rosa', 'Âmbar'],
      fundo: ['Baunilha', 'Sândalo'],
    },
    sizes: [
      { ml: 50, price: 229 },
      { ml: 100, price: 349 },
    ],
    liquid: '#e0923a',
    cap: '#1c1612',
  },
  {
    id: 'petala-negra',
    name: 'Pétala Negra',
    gender: 'Feminino',
    family: 'Floral',
    tag: 'Novo',
    blurb: 'Floral escuro, elegante sem ser tímido.',
    description:
      'Ameixa e rosa negra na saída, jasmim no meio e um fundo macio de almíscar. Presença marcada, sem ficar doce demais.',
    notes: {
      saida: ['Ameixa', 'Rosa negra'],
      coracao: ['Jasmim', 'Íris'],
      fundo: ['Almíscar', 'Patchouli'],
    },
    sizes: [
      { ml: 50, price: 259 },
      { ml: 100, price: 389 },
    ],
    liquid: '#72283c',
    cap: '#1c1612',
  },
  {
    id: 'jardim-branco',
    name: 'Jardim Branco',
    gender: 'Feminino',
    family: 'Floral',
    blurb: 'Limpo, floral e fácil de usar todo dia.',
    description:
      'Peônia, lírio e néroli sobre um musk branco. A escolha de quem quer cheiro de pele limpa, com um toque de flor.',
    notes: {
      saida: ['Néroli', 'Pêra'],
      coracao: ['Peônia', 'Lírio'],
      fundo: ['Musk branco', 'Cedro'],
    },
    sizes: [
      { ml: 50, price: 199 },
      { ml: 100, price: 299 },
    ],
    liquid: '#f0c9cf',
    cap: '#d9d0c4',
  },
  {
    id: 'iris-em-po',
    name: 'Íris em Pó',
    gender: 'Feminino',
    family: 'Atalcado',
    blurb: 'Atalcado, chique e com cara de pele.',
    description:
      'Íris e violeta com uma baunilha seca. Cheiro de pó de arroz e madeira clara — o frasco que esgota entre quem gosta de elegância quieta.',
    notes: {
      saida: ['Cenoura', 'Pimenta rosa'],
      coracao: ['Íris', 'Violeta'],
      fundo: ['Baunilha seca', 'Âmbar'],
    },
    sizes: [
      { ml: 50, price: 279 },
      { ml: 100, price: 419 },
    ],
    liquid: '#cbb6d6',
    cap: '#2a2430',
  },
  {
    id: 'costa-salgada',
    name: 'Costa Salgada',
    gender: 'Masculino',
    family: 'Aquático',
    blurb: 'Frescor salgado, como pele depois do mar.',
    description:
      'Toranja e sal na abertura, lavanda no coração e madeira clara no fundo. Fresco o bastante para o dia, com corpo para não sumir.',
    notes: {
      saida: ['Toranja', 'Sal'],
      coracao: ['Lavanda', 'Notas marinhas'],
      fundo: ['Madeira', 'Âmbar'],
    },
    sizes: [
      { ml: 50, price: 209 },
      { ml: 100, price: 319 },
    ],
    liquid: '#3f8f93',
    cap: '#17343a',
  },
  {
    id: 'vetiver-fumaca',
    name: 'Vetiver & Fumaça',
    gender: 'Masculino',
    family: 'Amadeirado',
    blurb: 'Verde, seco e com uma trilha de fumaça.',
    description:
      'Vetiver raiz, cedro e uma fumaça leve. Para quem quer amadeirado sem baunilha e sem doçura.',
    notes: {
      saida: ['Bergamota', 'Pimenta'],
      coracao: ['Vetiver', 'Gerânio'],
      fundo: ['Fumaça', 'Cedro'],
    },
    sizes: [
      { ml: 50, price: 239 },
      { ml: 100, price: 359 },
    ],
    liquid: '#5d6a4e',
    cap: '#1b1a17',
  },
  {
    id: 'couro-cru',
    name: 'Couro Cru',
    gender: 'Masculino',
    family: 'Couro',
    blurb: 'Couro macio, sem aquele couro agressivo.',
    description:
      'Couro novo, lavanda e um fio de tabaco. Cheiro de jaqueta e pele, com cardamomo na saída para não ficar pesado.',
    notes: {
      saida: ['Cardamomo', 'Maçã'],
      coracao: ['Couro', 'Lavanda'],
      fundo: ['Tabaco', 'Âmbar'],
    },
    sizes: [
      { ml: 50, price: 249 },
      { ml: 100, price: 379 },
    ],
    liquid: '#7a4632',
    cap: '#241812',
  },
  {
    id: 'oud-real',
    name: 'Oud Real',
    gender: 'Unissex',
    family: 'Oud',
    tag: 'Estoque baixo',
    stockNote: 'Poucas unidades do frasco de 100 ml.',
    blurb: 'Oud limpo, rosado e presente.',
    description:
      'Oud tratado com rosa e açafrão, sem o cheiro de curral que afasta quem está começando. Resina e sândalo seguram a fragrância na pele.',
    notes: {
      saida: ['Açafrão', 'Noz-moscada'],
      coracao: ['Rosa', 'Oud'],
      fundo: ['Sândalo', 'Resina'],
    },
    sizes: [
      { ml: 50, price: 329 },
      { ml: 100, price: 489 },
    ],
    liquid: '#3a241c',
    cap: '#11100e',
  },
  {
    id: 'kit-tres-rotas',
    name: 'Kit Três Rotas',
    gender: 'Unissex',
    family: 'Descoberta',
    tag: 'Presente',
    giftFor: 'Para quem não sabe o cheiro',
    blurb: 'Três caminhos para achar a sua assinatura.',
    description:
      'Miniaturas de 15 ml de Noite de Âmbar, Costa Salgada e Pétala Negra. O jeito mais seguro de acertar o perfume — ou de presentear sem chute.',
    notes: {
      saida: ['Três famílias'],
      coracao: ['Oriental', 'Aquático', 'Floral'],
      fundo: ['15 ml de cada'],
    },
    sizes: [{ ml: 45, price: 189, label: '3 × 15 ml' }],
    liquids: ['#e0923a', '#3f8f93', '#72283c'],
    cap: '#1c1612',
  },
  {
    id: 'kit-para-ela',
    name: 'Kit Para Ela',
    gender: 'Feminino',
    family: 'Presente',
    giftFor: 'Para ela',
    blurb: 'Floral escuro, flor branca e um atalcado chique.',
    description:
      'Pétala Negra, Jardim Branco e Íris em Pó em miniaturas de 15 ml. Um presente para quem gosta de flor, do suave ao mais marcado.',
    notes: {
      saida: ['Rosa negra', 'Peônia', 'Íris'],
      coracao: ['Três florais'],
      fundo: ['15 ml de cada'],
    },
    sizes: [{ ml: 45, price: 219, label: '3 × 15 ml' }],
    liquids: ['#72283c', '#f0c9cf', '#cbb6d6'],
    cap: '#1c1612',
  },
  {
    id: 'kit-para-ele',
    name: 'Kit Para Ele',
    gender: 'Masculino',
    family: 'Presente',
    giftFor: 'Para ele',
    blurb: 'Mar, madeira verde e couro macio.',
    description:
      'Costa Salgada, Vetiver & Fumaça e Couro Cru. Três caminhos masculinos, do fresco ao mais quente, em 15 ml cada.',
    notes: {
      saida: ['Sal', 'Vetiver', 'Couro'],
      coracao: ['Três rotas'],
      fundo: ['15 ml de cada'],
    },
    sizes: [{ ml: 45, price: 209, label: '3 × 15 ml' }],
    liquids: ['#3f8f93', '#5d6a4e', '#7a4632'],
    cap: '#1b1a17',
  },
  {
    id: 'kit-noite',
    name: 'Kit Noite',
    gender: 'Unissex',
    family: 'Presente',
    giftFor: 'Para um encontro',
    blurb: 'Âmbar, rosa negra e oud. Cheiro de ficar.',
    description:
      'Noite de Âmbar, Pétala Negra e Oud Real. O kit para quem vai presentear alguém que gosta de sair à noite.',
    notes: {
      saida: ['Âmbar', 'Rosa', 'Oud'],
      coracao: ['Quente'],
      fundo: ['15 ml de cada'],
    },
    sizes: [{ ml: 45, price: 249, label: '3 × 15 ml' }],
    liquids: ['#e0923a', '#72283c', '#3a241c'],
    cap: '#11100e',
  },
  {
    id: 'kit-dia',
    name: 'Kit Dia Claro',
    gender: 'Unissex',
    family: 'Presente',
    giftFor: 'Para o dia a dia',
    blurb: 'Flor limpa, mar e pó de íris.',
    description:
      'Jardim Branco, Costa Salgada e Íris em Pó. Leve o bastante para usar todo dia e fácil de acertar em qualquer pessoa.',
    notes: {
      saida: ['Peônia', 'Sal', 'Íris'],
      coracao: ['Fresco'],
      fundo: ['15 ml de cada'],
    },
    sizes: [{ ml: 45, price: 199, label: '3 × 15 ml' }],
    liquids: ['#f0c9cf', '#3f8f93', '#cbb6d6'],
    cap: '#d9d0c4',
  },
]

const FRAGRANCE_FACETS = [
  { id: 'frio', words: ['frio', 'fria', 'gelado', 'gelada', 'fresco', 'fresca', 'refrescante', 'citrico', 'cítrico', 'aquatico', 'aquático', 'mar', 'oceano'] },
  { id: 'quente', words: ['quente', 'calor', 'noite', 'doce', 'baunilha', 'ambar', 'âmbar', 'oriental'] },
  { id: 'amadeirado', words: ['amadeirado', 'amadeirada', 'madeira', 'cedro', 'vetiver', 'sandalo', 'sândalo', 'seco', 'seca'] },
  { id: 'floral', words: ['floral', 'flor', 'rosa', 'jasmim', 'peonia', 'peônia'] },
  { id: 'atalcado', words: ['atalcado', 'atalcada', 'talco', 'iris', 'íris', 'po', 'pó'] },
  { id: 'couro', words: ['couro', 'tabaco'] },
  { id: 'oud', words: ['oud', 'oudh'] },
]

const FRAGRANCE_PROFILES = {
  'costa-salgada': { frio: 1, amadeirado: 0.35 },
  'vetiver-fumaca': { amadeirado: 1, frio: 0.3 },
  'noite-de-ambar': { quente: 1 },
  'petala-negra': { floral: 1, quente: 0.6 },
  'jardim-branco': { floral: 1, frio: 0.7 },
  'iris-em-po': { atalcado: 1 },
  'couro-cru': { couro: 1, quente: 0.4 },
  'oud-real': { oud: 1, quente: 0.7 },
}

function foldText(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function suggestFragrance(query) {
  const words = foldText(query).split(/[^a-z0-9]+/).filter((word) => word.length > 1)
  if (words.length === 0) return null
  const wanted = FRAGRANCE_FACETS.filter((facet) => facet.words.some((word) => words.includes(foldText(word))))
  const catalog = products.filter((product) => FRAGRANCE_PROFILES[product.id])
  const ranked = catalog.map((product) => {
    const profile = FRAGRANCE_PROFILES[product.id]
    const score = wanted.reduce((total, facet) => total + (profile[facet.id] || 0), 0)
    const covered = wanted.filter((facet) => (profile[facet.id] || 0) >= 0.8).length
    return { product, score, covered }
  }).sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
  const best = ranked[0]
  const exact = wanted.length > 0 && best.covered === wanted.length
  return { exact, product: best.product }
}

export function money(value) {
  return Math.round(value * 100) / 100
}

export function brl(value) {
  return money(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function pixDiscount(subtotal) {
  return money(subtotal * PIX_RATE)
}

export const samples = [
  { id: 'sauvage', name: 'Sauvage', brand: 'Dior', family: 'Amadeirado', price: 12.9, photo: '/illustrations/frascos/sauvage.png', rank: 1 },
  { id: 'acqua-di-gio', name: 'Acqua di Giò', brand: 'Armani', family: 'Cítrico', price: 12.9, photo: '/illustrations/frascos/gio.png', rank: 2 },
  { id: 'one-million', name: '1 Million', brand: 'Paco Rabanne', family: 'Oriental', price: 13.9, photo: '/illustrations/frascos/million.png', rank: 3 },
  { id: 'invictus', name: 'Invictus Victory', brand: 'Paco Rabanne', family: 'Aromático', price: 13.9, photo: '/illustrations/frascos/invictus.png', rank: 4 },
  { id: 'vip-212', name: '212 VIP', brand: 'Carolina Herrera', family: 'Amadeirado', price: 12.9, photo: '/illustrations/frascos/vip.png', rank: 5 },
  { id: 'the-one', name: 'The One', brand: 'Dolce & Gabbana', family: 'Oriental', price: 13.9, photo: '/illustrations/frascos/theone.png', rank: 6 },
  { id: 'le-male', name: 'Le Male', brand: 'Jean Paul Gaultier', family: 'Aromático', price: 12.9, photo: '/illustrations/frascos/lemale.png', rank: 7 },
  { id: 'bleu', name: 'Bleu de Chanel', brand: 'Chanel', family: 'Fresco', price: 14.9, photo: '/illustrations/frascos/bleu.png', rank: 8 },
].map((item) => ({
  ...item,
  sample: true,
  gender: 'Unissex',
  blurb: 'Frasco para teste — 5 ml',
  description: `${item.name} em frasco de 5 ml, para sentir o aroma antes de escolher o tamanho.`,
  notes: { saida: [item.family], coracao: [item.brand], fundo: ['5 ml'] },
  sizes: [{ ml: 5, price: item.price, label: '5 ml' }],
  liquid: '#c4a574',
  cap: '#1c1612',
}))

export function findProduct(id) {
  return products.find((product) => product.id === id) || samples.find((product) => product.id === id)
}

export function defaultSize(product) {
  return product.sizes[product.sizes.length - 1]
}

export function sizeLabel(size) {
  return size.label || `${size.ml} ml`
}

export function relatedProducts(product) {
  const same = products.filter((item) => item.id !== product.id && item.gender === product.gender)
  const rest = products.filter((item) => item.id !== product.id && item.gender !== product.gender)
  return [...same, ...rest].slice(0, 3)
}
