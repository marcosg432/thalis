export const registry = [
  { id: "folha", category: "flores", keywords: ["folha", "leaf", "planta", "canto"], file: "src/visual/decor/flores.jsx", exportName: "Folha" },
  { id: "ramo", category: "flores", keywords: ["ramo", "galho", "planta"], file: "src/visual/decor/flores.jsx", exportName: "Ramo" },
  { id: "flor-simples", category: "flores", keywords: ["flor", "pétala", "petala"], file: "src/visual/decor/flores.jsx", exportName: "FlorSimples" },
  { id: "botao-floral", category: "flores", keywords: ["botão", "botao", "broto"], file: "src/visual/decor/flores.jsx", exportName: "BotaoFloral" },
  { id: "hera", category: "flores", keywords: ["hera", "vinha", "canto"], file: "src/visual/decor/flores.jsx", exportName: "Hera" },
  { id: "moldura-fina", category: "molduras", keywords: ["moldura", "quadro", "fina"], file: "src/visual/decor/molduras.jsx", exportName: "MolduraFina" },
  { id: "moldura-dupla", category: "molduras", keywords: ["moldura", "dupla", "elegante"], file: "src/visual/decor/molduras.jsx", exportName: "MolduraDupla" },
  { id: "moldura-cantos", category: "molduras", keywords: ["moldura", "cantos", "foto"], file: "src/visual/decor/molduras.jsx", exportName: "MolduraCantos" },
  { id: "moldura-arco", category: "molduras", keywords: ["arco", "moldura", "portal"], file: "src/visual/decor/molduras.jsx", exportName: "MolduraArco" },
  { id: "circulo", category: "formas", keywords: ["círculo", "circulo", "bola"], file: "src/visual/decor/formas.jsx", exportName: "Circulo" },
  { id: "losango", category: "formas", keywords: ["losango", "diamante"], file: "src/visual/decor/formas.jsx", exportName: "Losango" },
  { id: "arco", category: "formas", keywords: ["arco", "meia-lua"], file: "src/visual/decor/formas.jsx", exportName: "Arco" },
  { id: "gota", category: "formas", keywords: ["gota", "drop"], file: "src/visual/decor/formas.jsx", exportName: "Gota" },
  { id: "selo", category: "formas", keywords: ["selo", "medalha", "círculo"], file: "src/visual/decor/formas.jsx", exportName: "Selo" },
  { id: "arabesco", category: "ornamentos", keywords: ["arabesco", "luxo", "divisor"], file: "src/visual/decor/ornamentos.jsx", exportName: "Arabesco" },
  { id: "canto-luxo", category: "ornamentos", keywords: ["canto", "luxo", "ornamento"], file: "src/visual/decor/ornamentos.jsx", exportName: "CantoLuxo" },
  { id: "florao", category: "ornamentos", keywords: ["florão", "florao", "roseta"], file: "src/visual/decor/ornamentos.jsx", exportName: "Florao" },
  { id: "monograma", category: "ornamentos", keywords: ["monograma", "anel", "selo"], file: "src/visual/decor/ornamentos.jsx", exportName: "MonogramaAnel" },
  { id: "divisor-linha", category: "divisores", keywords: ["linha", "divisor", "traço"], file: "src/visual/decor/divisores.jsx", exportName: "DivisorLinha" },
  { id: "divisor-losango", category: "divisores", keywords: ["divisor", "losango"], file: "src/visual/decor/divisores.jsx", exportName: "DivisorLosango" },
  { id: "divisor-pontos", category: "divisores", keywords: ["pontos", "divisor"], file: "src/visual/decor/divisores.jsx", exportName: "DivisorPontos" },
  { id: "divisor-ornato", category: "divisores", keywords: ["ornato", "divisor", "luxo"], file: "src/visual/decor/divisores.jsx", exportName: "DivisorOrnato" },
  { id: "textura-pontos", category: "texturas", keywords: ["textura", "pontos", "fundo"], file: "src/visual/decor/texturas.jsx", exportName: "TexturaPontos" },
  { id: "textura-linhas", category: "texturas", keywords: ["textura", "linhas", "listras"], file: "src/visual/decor/texturas.jsx", exportName: "TexturaLinhas" },
  { id: "textura-grade", category: "texturas", keywords: ["grade", "textura", "grid"], file: "src/visual/decor/texturas.jsx", exportName: "TexturaGrade" },
  { id: "textura-seda", category: "texturas", keywords: ["seda", "textura", "onda"], file: "src/visual/decor/texturas.jsx", exportName: "TexturaSeda" },
  { id: "faixa", category: "banners", keywords: ["faixa", "banner", "fita"], file: "src/visual/decor/banners.jsx", exportName: "Faixa" },
  { id: "canto-folha", category: "banners", keywords: ["canto", "folha", "banner"], file: "src/visual/decor/banners.jsx", exportName: "CantoFolha" },
  { id: "selo-fita", category: "banners", keywords: ["selo", "fita", "prêmio"], file: "src/visual/decor/banners.jsx", exportName: "SeloFita" },
  { id: "frasco", category: "perfumes", keywords: ["frasco", "perfume", "vidro"], file: "src/visual/decor/perfumes.jsx", exportName: "Frasco" },
  { id: "borrifador", category: "perfumes", keywords: ["spray", "borrifador", "perfume"], file: "src/visual/decor/perfumes.jsx", exportName: "Borrifador" },
  { id: "nota-olfativa", category: "perfumes", keywords: ["nota", "amadeirado", "olfativa"], file: "src/visual/decor/perfumes.jsx", exportName: "NotaOlfativa" },
  { id: "gota-essencia", category: "perfumes", keywords: ["gota", "essência", "essencia"], file: "src/visual/decor/perfumes.jsx", exportName: "GotaEssencia" },
  { id: "sombras", category: "sombras", keywords: ["sombra", "luz", "brilho"], file: "src/visual/decor/sombras.js", exportName: "sombras" },
  { id: "presets-motion", category: "animacoes", keywords: ["animação", "animacao", "motion", "entrada"], file: "src/visual/motion/presets.js", exportName: "presets" },
  { id: "carrossel", category: "componentes", keywords: ["carrossel", "carousel", "slider", "premium"], file: "src/visual/components/PremiumCarousel.jsx", exportName: "PremiumCarousel" },
]

export function findVisual(query) {
  const words = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/).filter(Boolean)
  return registry.filter((item) => {
    const haystack = [item.id, item.category, item.exportName, ...item.keywords].join(" ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return words.some((word) => haystack.includes(word))
  })
}
