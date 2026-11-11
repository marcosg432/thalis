import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

const PRODUCTS = [
  {
    id: "barrier-cream", kind: "jar", name: "Barrier Restore Cream", short: "Barrier Restore", sub: "Cream", category: "Hidratante",
    photo: "/illustrations/frascos/sauvage.png?v=2",
    color: "#f3f1ec", cap: "#f6f5f1", label: "#f3f1ec", ink: "#1a1a1a", price: 29, sizes: ["50 ml", "100 ml"], rating: 4.8, reviews: 3284,
    tagline: "Um creme macio para a barreira da pele.",
    description: "Hidratante rico e leve, com ceramidas, colesterol e ácidos graxos para a pele recuperar e ficar calma.",
    benefits: ["Complexo de ceramidas 3%", "Sem fragrância", "Para pele seca e sensível"],
    ingredients: "Aqua, Squalane, Glycerin, Ceramide NP, Ceramide AP, Cholesterol, Phytosphingosine, Panthenol, Niacinamide.",
    howTo: "Aqueça uma pequena quantidade nas pontas dos dedos e pressione na pele limpa, de manhã e à noite.",
  },
  {
    id: "niacinamide", kind: "dropper", name: "Niacinamide 10% + Zinc 1%", short: "Niacinamide", sub: "10% + Zinc 1%", category: "Sérum",
    photo: "/illustrations/frascos/gio.png",
    color: "#e9eef0", cap: "#f7f7f5", label: "#ffffff", ink: "#111111", glass: true, liquid: "#f4efe2", price: 12, sizes: ["30 ml", "60 ml"], rating: 4.6, reviews: 18420,
    tagline: "Um sérum forte para brilho e oleosidade.",
    description: "Sérum aquoso que reduz a aparência de manchas e poros, com 10% de niacinamida e 1% de zinco.",
    benefits: ["Atenua os poros", "Equilibra a oleosidade", "Vegano"],
    ingredients: "Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum.",
    howTo: "Algumas gotas no rosto, de manhã e à noite, antes dos cremes.",
  },
  {
    id: "mineral-spf", kind: "tube", name: "Mineral UV Filters SPF 30", short: "Mineral UV Filters", sub: "SPF 30", category: "Protetor",
    color: "#f6f6f3", cap: "#efeee9", label: "#f6f6f3", ink: "#111111", price: 14, sizes: ["50 ml"], rating: 4.4, reviews: 2150,
    tagline: "Proteção mineral, sem deixar branco.",
    description: "Protetor mineral leve, com óxido de zinco e dióxido de titânio, que some na pele.",
    benefits: ["FPS 30", "Filtro mineral", "Por baixo da maquiagem"],
    ingredients: "Aqua, Zinc Oxide, Titanium Dioxide, Caprylic Triglyceride, Tocopherol, Squalane, Glycerin.",
    howTo: "Aplique como último passo da manhã. Reaplique a cada duas horas no sol.",
  },
  {
    id: "glazing-milk", kind: "pump", name: "Glazing Milk", short: "glazing milk", sub: "essência", category: "Essência",
    photo: "/illustrations/frascos/invictus.png",
    color: "#ebe3d9", cap: "#e6ddd2", label: "#ebe3d9", ink: "#6b5a4c", price: 30, sizes: ["150 ml"], rating: 4.7, reviews: 5210,
    tagline: "Uma essência leitosa que prepara o brilho.",
    description: "Essência sedosa com ceramidas e peptídeos, o primeiro passo para a pele ficar macia.",
    benefits: ["Ceramidas e peptídeos", "Textura de leite", "Combina com tudo"],
    ingredients: "Aqua, Glycerin, Ceramide NP, Palmitoyl Tripeptide-1, Beta Glucan, Squalane, Panthenol.",
    howTo: "Passe nas palmas e pressione na pele limpa, antes do sérum e do hidratante.",
  },
  {
    id: "hyaluronic", kind: "dropper", name: "Hyaluronic Acid 2% + B5", short: "Hyaluronic Acid", sub: "2% + B5", category: "Sérum",
    photo: "/illustrations/frascos/million.png",
    color: "#e9eef0", cap: "#f7f7f5", label: "#ffffff", ink: "#111111", glass: true, liquid: "#eef3f6", price: 11, sizes: ["30 ml", "60 ml"], rating: 4.6, reviews: 21870,
    tagline: "Hidratação em várias camadas, com vitamina B5.",
    description: "Ácido hialurônico em três pesos, com vitamina B5, para a pele ficar cheia e lisa.",
    benefits: ["Três pesos de HA", "Sem óleo", "Todos os tipos de pele"],
    ingredients: "Aqua, Sodium Hyaluronate, Pentylene Glycol, Propanediol, Sodium Hyaluronate Crosspolymer, Panthenol.",
    howTo: "Algumas gotas na pele úmida, de manhã e à noite, e feche com hidratante.",
  },
  {
    id: "invisible-spf", kind: "pump", name: "Invisible Fluid SPF 50", short: "Invisible Fluid", sub: "FPS 50", category: "Protetor",
    photo: "/illustrations/frascos/vip.png",
    color: "#f1ede6", cap: "#2b2b2b", label: "#f1ede6", ink: "#3c342d", price: 24, sizes: ["50 ml", "100 ml"], rating: 4.7, reviews: 1608,
    tagline: "Um fluido leve, com proteção alta.",
    description: "Protetor fluido de FPS 50 que some na pele e funciona como primer.",
    benefits: ["FPS 50", "Acabamento invisível", "Resistente à água"],
    ingredients: "Aqua, Homosalate, Ethylhexyl Salicylate, Glycerin, Niacinamide.",
    howTo: "Aplique de manhã no rosto e no pescoço. Reaplique depois de suor ou água.",
  },
  {
    id: "lip-treatment", kind: "lip", name: "Peptide Lip Treatment", short: "peptide lip", sub: "tratamento", category: "Lábios",
    photo: "/illustrations/frascos/theone.png",
    color: "#e7c3bb", cap: "#e7c3bb", label: "#e7c3bb", ink: "#7d4740", price: 18, sizes: ["10 ml"], rating: 4.8, reviews: 9420,
    tagline: "Um bálsamo brilhante, com peptídeos.",
    description: "Tratamento espesso e brilhante, com peptídeos e manteiga de karité.",
    benefits: ["Peptídeos", "Brilho sem grudar", "Cor suave"],
    ingredients: "Polybutene, Shea Butter, Palmitoyl Tripeptide-1, Babassu Oil, Tocopherol.",
    howTo: "Passe nos lábios sempre que quiser.",
  },
  {
    id: "squalane-cleanser", kind: "tube", name: "Squalane Cleanser", short: "Squalane", sub: "Cleanser", category: "Limpeza",
    photo: "/illustrations/frascos/lemale.png",
    color: "#f6f6f3", cap: "#f6f6f3", label: "#f6f6f3", ink: "#111111", price: 10, sizes: ["50 ml", "150 ml"], rating: 4.7, reviews: 12040,
    tagline: "Um limpador que derrete a maquiagem.",
    description: "Bálsamo que vira óleo na massagem e tira maquiagem e protetor sem repuxar.",
    benefits: ["Tira a maquiagem", "Não resseca", "Enxágua fácil"],
    ingredients: "Squalane, Aqua, Coco-Caprylate/Caprate, Glycerin, Sucrose Stearate.",
    howTo: "Massageie na pele seca, molhe para emulsionar e enxágue.",
  },
  {
    id: "malt-shampoo", kind: "bottle", name: "Malt & Hops Volumising Shampoo", short: "Malt & Hops", sub: "Shampoo", category: "Cabelo",
    color: "#7a3f14", cap: "#141414", label: "#f6f2ea", ink: "#111111", glass: true, liquid: "#b8752a", price: 18, compareAt: 22, sizes: ["250 ml", "500 ml"], rating: 4.6, reviews: 611,
    tagline: "Volume e brilho da raiz às pontas.",
    description: "Shampoo com malte, lúpulo e biotina, que levanta a raiz e deixa brilho.",
    benefits: ["Volume na raiz", "Sem sulfato", "Seguro para cor"],
    ingredients: "Aqua, Humulus Lupulus Extract, Hydrolyzed Barley Protein, Coco-Glucoside, Biotin.",
    howTo: "Massageie no cabelo molhado, espere um minuto e enxágue.",
  },
  {
    id: "glycolic-toner", kind: "bottle", name: "Glycolic Acid 7% Toning Solution", short: "Glycolic Acid 7%", sub: "Tônico", category: "Esfoliante",
    color: "#e8eef0", cap: "#f4f4f1", label: "#ffffff", ink: "#111111", glass: true, liquid: "#f2e9ee", price: 13, sizes: ["100 ml", "240 ml"], rating: 4.5, reviews: 15530,
    tagline: "Esfolia para a pele ficar mais lisa.",
    description: "Tônico com 7% de ácido glicólico, para mais viço e textura uniforme.",
    benefits: ["Ácido glicólico 7%", "Mais viço", "Uso à noite"],
    ingredients: "Aqua, Glycolic Acid, Rosa Damascena Flower Water, Aloe Barbadensis Leaf Water.",
    howTo: "Passe no rosto com um algodão à noite. Use protetor no dia seguinte.",
  },
  {
    id: "barrier-butter", kind: "jar", name: "Barrier Butter Night Cream", short: "barrier butter", sub: "creme da noite", category: "Creme da noite",
    color: "#e8dbd1", cap: "#e8dbd1", label: "#e8dbd1", ink: "#6b4f44", price: 28, sizes: ["50 ml"], rating: 4.8, reviews: 2710,
    tagline: "Um creme da noite, para acordar com a pele macia.",
    description: "Creme denso com karité, peptídeos e bakuchiol, para a noite.",
    benefits: ["Bakuchiol e peptídeos", "Rico, sem pesar", "Repara durante o sono"],
    ingredients: "Aqua, Shea Butter, Squalane, Bakuchiol, Palmitoyl Tripeptide-1, Ceramide NP.",
    howTo: "Último passo da rotina da noite.",
  },
  {
    id: "no1-parfum", kind: "perfume", name: "No. 1 Eau de Parfum", short: "No. 1", sub: "Eau de parfum", category: "Fragrância",
    color: "#eeece8", cap: "#151515", label: "#eeece8", ink: "#1a1a1a", glass: true, liquid: "#f1e2cd", price: 68, sizes: ["50 ml", "100 ml"], rating: 4.9, reviews: 812,
    tagline: "Musk de pele, chá branco e um pouco de figo.",
    description: "Um cheiro perto da pele, de pele limpa, musk, chá branco e figo verde.",
    benefits: ["Até 8 horas", "Fórmula vegana", "Frasco refilável"],
    ingredients: "Alcohol Denat., Parfum, Aqua, Ambrettolide, Fig Leaf Absolute.",
    howTo: "Um spray no pulso e outro no pescoço.",
  },
];

const SHELVES = [
  { id: "vendidos", title: "Mais vendidos", ids: ["hyaluronic", "niacinamide", "squalane-cleanser", "glycolic-toner", "lip-treatment", "invisible-spf", "glazing-milk", "no1-parfum"] },
  { id: "famosos", title: "Mais famosos", ids: ["no1-parfum", "barrier-cream", "lip-treatment", "barrier-butter", "invisible-spf", "malt-shampoo", "niacinamide", "hyaluronic"] },
  { id: "frio", title: "Frio", ids: ["hyaluronic", "niacinamide", "invisible-spf", "mineral-spf", "glazing-milk", "squalane-cleanser", "glycolic-toner"] },
  { id: "noite", title: "À noite", ids: ["barrier-butter", "no1-parfum", "glycolic-toner", "lip-treatment", "barrier-cream", "malt-shampoo"] },
  { id: "calor", title: "Calor", ids: ["no1-parfum", "malt-shampoo", "barrier-butter", "glazing-milk", "lip-treatment", "invisible-spf", "barrier-cream", "squalane-cleanser"] },
];

const SHELF_SCENT = {
  "barrier-cream": { frio: 0.55, amadeirado: 1 },
  niacinamide: { frio: 1 },
  "glazing-milk": { frio: 0.45, amadeirado: 0.35 },
  hyaluronic: { quente: 1 },
  "invisible-spf": { amadeirado: 1, frio: 0.4 },
  "lip-treatment": { quente: 0.85 },
  "squalane-cleanser": { frio: 0.4, amadeirado: 0.45 },
};
const WISH_FACETS = [
  { id: "frio", words: ["frio", "fria", "gelado", "gelada", "fresco", "fresca", "refrescante", "citrico", "aquatico", "mar"] },
  { id: "quente", words: ["quente", "calor", "noite", "doce", "baunilha", "ambar", "oriental"] },
  { id: "amadeirado", words: ["amadeirado", "amadeirada", "madeira", "cedro", "vetiver", "sandalo", "seco", "seca"] },
];

function suggestShelf(query, products) {
  const words = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/).filter((word) => word.length > 1);
  if (!words.length) return null;
  const wanted = WISH_FACETS.filter((facet) => facet.words.some((word) => words.includes(word)));
  const catalog = products.filter((product) => product.photo && SHELF_SCENT[product.id]);
  const ranked = catalog.map((product) => {
    const profile = SHELF_SCENT[product.id];
    const score = wanted.reduce((total, facet) => total + (profile[facet.id] || 0), 0);
    const covered = wanted.filter((facet) => (profile[facet.id] || 0) >= 0.8).length;
    return { product, score, covered };
  }).sort((a, b) => b.score - a.score);
  const best = ranked[0];
  if (!best) return null;
  return { exact: wanted.length > 0 && best.covered === wanted.length, product: best.product };
}

const SHELF_MOVE = { duration: 0.55, ease: [0.65, 0, 0.35, 1] };

function useShelfCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 800px)");
    const apply = () => setCount(query.matches ? 2 : 4);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return count;
}

function ShelfLane({ title, items, currency, openLayoutId, onOpen }) {
  const [start, setStart] = useState(0);
  const reduce = useReducedMotion();
  const visible = useShelfCount();
  const max = Math.max(0, items.length - visible);
  useEffect(() => {
    setStart((current) => Math.min(current, max));
  }, [max]);
  const shift = items.length ? (start * 100) / items.length : 0;
  const track = { width: `${(items.length / visible) * 100}%` };
  const move = reduce ? { duration: 0 } : SHELF_MOVE;

  function step(dir) {
    setStart((current) => Math.min(max, Math.max(0, current + dir)));
  }

  return (
    <div className="relative mb-16" aria-label={title}>
      <h3 className="mb-5 text-center font-serif text-[1.7rem] font-medium tracking-[-0.03em]">{title}</h3>
      <button type="button" aria-label={`Anterior em ${title}`} disabled={start === 0} onClick={() => step(-1)} className="shelf-arrow shelf-arrow--prev">
        <ChevronLeft size={18} strokeWidth={1.6} />
      </button>
      <button type="button" aria-label={`Próximo em ${title}`} disabled={start >= max} onClick={() => step(1)} className="shelf-arrow shelf-arrow--next">
        <ChevronRight size={18} strokeWidth={1.6} />
      </button>
      <div className="overflow-hidden px-12">
        <motion.div className="flex items-end" animate={{ x: `-${shift}%` }} transition={move} style={track}>
          {items.map((p, index) => {
            const layoutId = `${title}-${p.id}`;
            const inside = index >= start && index < start + visible;
            return (
              <motion.div key={p.id} className="flex justify-center" style={{ width: `${100 / items.length}%` }} animate={{ opacity: inside ? 1 : 0 }} transition={move}>
                {openLayoutId === layoutId ? (
                  <div className="aspect-[2/3] w-full max-w-[160px]" />
                ) : (
                  <motion.button layoutId={layoutId} type="button" onClick={() => onOpen(p, layoutId)} aria-label={`${p.name}, ${currency} ${p.price}`} transition={SPRING} className="shelf-product relative aspect-[2/3] w-full max-w-[160px]">
                    <ProductArt p={p} onShelf className="size-full" />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div aria-hidden className="relative z-10 mx-12 -mt-[6px] h-[16px] overflow-hidden rounded-full">
        <div className="absolute inset-x-0 top-0 h-[8px] bg-[linear-gradient(to_bottom,#e6e6ea,#fbfbfd)]" />
        <div className="absolute inset-x-0 top-[8px] h-[8px] bg-[linear-gradient(to_bottom,#ffffff,#ececf0)] shadow-[0_1px_0_rgba(0,0,0,0.04)]" />
      </div>
      <div className="overflow-hidden px-12">
        <motion.div className="mt-5 flex" animate={{ x: `-${shift}%` }} transition={move} style={track}>
          {items.map((p, index) => {
            const inside = index >= start && index < start + visible;
            return (
              <motion.div key={p.id} className="px-2 text-center" style={{ width: `${100 / items.length}%` }} animate={{ opacity: inside ? 1 : 0 }} transition={move}>
                <div className="text-[13px] leading-tight font-medium sm:text-[14px]">{p.short}</div>
                <div className="mt-0.5 text-[12px] text-[#7c6d60] tabular-nums sm:text-[13px]">{currency} {p.price}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-[#9c3b06] sm:text-[12px]">{p.sizes.join(" · ")}</div>
                <button type="button" className="shelf-cart" aria-label={`Adicionar ${p.name} à sacola`} onClick={() => onOpen(p, `${title}-${p.id}`)}>
                  <ShoppingCart size={16} strokeWidth={1.8} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

const hexRgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mixRgb = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const css = (c, k = 1, a = 1) => `rgba(${[0, 1, 2].map((i) => Math.round(Math.min(255, Math.max(0, c[i] * k)))).join(",")},${a})`;
const WHITE = [255, 255, 255];
const lum = (c) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;

const rr = (x, y, w, h, r) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;

const ridges = (x, y, w, h, step = 2.6) =>
  Array.from({ length: Math.floor(w / step) }, (_, i) => (
    <line key={i} x1={x + 1 + i * step} y1={y + 1.5} x2={x + 1 + i * step} y2={y + h - 1.5} stroke="#000" strokeOpacity={i % 2 ? 0.14 : 0.06} strokeWidth="1" />
  ));

const SHAPES = {
  jar: {
    body: "M42 208 H158 Q162 208 162 214 V276 Q162 286 150 286 H50 Q38 286 38 276 V214 Q38 208 42 208 Z",
    box: { x: 38, y: 208, w: 124, h: 78 },
    print: { x: 38, y: 226, w: 124, h: 46 },
    cap: (id) => (
      <>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-cap)`} />
        <g>{ridges(36, 178, 128, 30, 2.2)}</g>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-capv)`} />
        <path d="M42 173.2 H158" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.2" />
        <rect x="38" y="208" width="124" height="3" fill="#000" opacity="0.22" />
      </>
    ),
  },
  tube: {
    body: "M80 250 L67 74 Q66 60 74 58 L126 58 Q134 60 133 74 L120 250 Z",
    box: { x: 66, y: 58, w: 68, h: 192 },
    print: { x: 66, y: 104, w: 68, h: 110 },
    cap: (id) => (
      <>
        <path d="M62 40 H138 V58 H62 Z" fill={`url(#${id}-body)`} />
        <path d={`M62 40 ${Array.from({ length: 19 }, (_, i) => `L${64 + i * 4} ${i % 2 ? 40 : 37.5}`).join(" ")} L138 40`} fill={`url(#${id}-body)`} />
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={64 + i * 4.1} y1="42" x2={64 + i * 4.1} y2="56" stroke="#000" strokeOpacity="0.09" />
        ))}
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-cap)`} />
        <g>{ridges(73, 256, 54, 28, 2.4)}</g>
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-capv)`} />
        <path d="M75 251 H125" stroke="#000" strokeOpacity="0.2" />
      </>
    ),
  },
  pump: {
    body: "M58 136 Q58 110 84 108 L116 108 Q142 110 142 136 L142 272 Q142 286 128 286 L72 286 Q58 286 58 272 Z",
    box: { x: 58, y: 108, w: 84, h: 178 },
    print: { x: 58, y: 160, w: 84, h: 90 },
    tube: true,
    fill: 132,
    cap: (id) => (
      <>
        <rect x="95.5" y="60" width="9" height="32" fill={`url(#${id}-cap)`} />
        <path d="M82 50 H126 Q132 50 132 55 V64 H78 V55 Q78 50 82 50 Z" fill={`url(#${id}-cap)`} />
        <path d="M126 53 H153 Q157 53 157 56.5 V60 H126 Z" fill={`url(#${id}-cap)`} />
        <path d="M80 51.5 H128" stroke="#fff" strokeOpacity="0.7" />
        <path d={rr(80, 88, 40, 22, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 88, 40, 22, 2.2)}</g>
        <path d={rr(80, 88, 40, 22, 3)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  dropper: {
    body: "M64 170 Q64 152 86 150 L86 140 L114 140 L114 150 Q136 152 136 170 L136 272 Q136 286 122 286 L78 286 Q64 286 64 272 Z",
    box: { x: 64, y: 140, w: 72, h: 146 },
    print: { x: 64, y: 192, w: 72, h: 70, paper: true },
    fill: 168,
    cap: (id) => (
      <>
        <path d="M86 118 V86 Q86 62 100 62 Q114 62 114 86 V118 Z" fill={`url(#${id}-bulb)`} />
        <path d="M91 74 Q93 66 100 65" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 114, 40, 28, 2)}</g>
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  perfume: {
    body: "M58 166 H142 Q154 166 156 178 L158 270 Q158 286 142 286 H58 Q42 286 42 270 L44 178 Q46 166 58 166 Z",
    box: { x: 42, y: 166, w: 116, h: 120 },
    print: { x: 66, y: 204, w: 68, h: 44 },
    fill: 178,
    cap: (id) => (
      <>
        <rect x="88" y="150" width="24" height="18" fill={`url(#${id}-cap)`} />
        <path d={rr(70, 96, 60, 56, 4)} fill={`url(#${id}-cap)`} />
        <path d={rr(70, 96, 60, 56, 4)} fill={`url(#${id}-capv)`} />
        <path d="M72 97.5 H128" stroke="#fff" strokeOpacity="0.8" />
      </>
    ),
  },
  mist: {
    body: "M62 154 Q62 130 86 128 L114 128 Q138 130 138 154 L138 272 Q138 286 124 286 L76 286 Q62 286 62 272 Z",
    box: { x: 62, y: 128, w: 76, h: 158 },
    print: { x: 62, y: 178, w: 76, h: 78 },
    tube: true,
    fill: 168,
    cap: (id) => (
      <>
        <path d={rr(82, 110, 36, 22, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(82, 110, 36, 22, 2.2)}</g>
        <path d={rr(86, 82, 28, 30, 6)} fill={`url(#${id}-cap)`} />
        <path d={rr(86, 82, 28, 30, 6)} fill={`url(#${id}-capv)`} />
        <circle cx="111" cy="94" r="2.2" fill="#000" opacity="0.45" />
      </>
    ),
  },
  bottle: {
    body: "M62 114 Q62 86 86 82 L114 82 Q138 86 138 114 L141 268 Q141 286 122 286 L78 286 Q59 286 59 268 Z",
    box: { x: 59, y: 82, w: 82, h: 204 },
    print: { x: 59, y: 140, w: 82, h: 100, paper: true },
    fill: 110,
    cap: (id) => (
      <>
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-cap)`} />
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-capv)`} />
        <path d="M80 63 H120" stroke="#000" strokeOpacity="0.45" />
        <path d="M80 51.5 H120" stroke="#fff" strokeOpacity="0.4" />
      </>
    ),
  },
  lip: {
    body: "M89 250 L85 152 Q85 144 91 143 L109 143 Q115 144 115 152 L111 250 Z",
    box: { x: 85, y: 143, w: 30, h: 107 },
    print: { x: 85, y: 166, w: 30, h: 60 },
    cap: (id) => (
      <>
        <path d="M83 128 H117 V143 H83 Z" fill={`url(#${id}-body)`} />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={85 + i * 4.2} y1="130" x2={85 + i * 4.2} y2="141" stroke="#000" strokeOpacity="0.08" />
        ))}
        <path d={rr(86, 248, 28, 38, 5)} fill={`url(#${id}-cap)`} />
        <path d={rr(86, 248, 28, 38, 5)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  stick: {
    body: rr(81, 224, 38, 62, 4),
    box: { x: 81, y: 224, w: 38, h: 62 },
    print: { x: 81, y: 236, w: 38, h: 38 },
    cap: (id) => (
      <>
        <path d={rr(81, 168, 38, 58, 5)} fill={`url(#${id}-cap)`} />
        <path d={rr(81, 168, 38, 58, 5)} fill={`url(#${id}-capv)`} />
        <rect x="81" y="222" width="38" height="2.5" fill="#000" opacity="0.3" />
      </>
    ),
  },
};

const EXTENT = {
  jar: { top: 172, w: 128 }, tube: { top: 37, w: 76 }, pump: { top: 50, w: 101 }, dropper: { top: 60, w: 72 },
  perfume: { top: 96, w: 116 }, mist: { top: 80, w: 76 }, bottle: { top: 48, w: 84 }, stick: { top: 166, w: 38 }, lip: { top: 128, w: 34 },
};
const pageZoom = (k) => Math.min(2.2, 262 / (290 - EXTENT[k].top), 190 / EXTENT[k].w);

function ProductArt({ p, spin, className, onShelf }) {
  if (p.photo) {
    return <img src={p.photo} alt="" className={cn(className, onShelf ? "shelf-photo" : "object-contain object-bottom")} draggable="false" />;
  }
  const id = "ps" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const s = SHAPES[p.kind];
  const c = hexRgb(p.color);
  const k = hexRgb(p.cap);
  const lab = hexRgb(p.label);
  const a = p.glass ? (lum(c) > 200 ? 0.28 : 0.8) : 1;
  const liq = hexRgb(p.liquid ?? p.color);
  const { print: P, box: B } = s;
  const period = P.w * 2.6;
  const fallback = useMotionValue(0);
  const x = useTransform(spin ?? fallback, (v) => -((((v * period) % period) + period) % period));
  const nameSize = Math.min(10.5, P.w * 0.12, (P.w * 1.12) / p.short.length);
  const subSize = Math.min(7, P.w * 0.08, (P.w * 1.25) / (p.sub ?? " ").length);
  const printArt = (dx) => (
    <g transform={`translate(${dx} 0)`}>
      {P.paper && <rect x={P.x} y={P.y} width={P.w} height={P.h} fill={css(lab)} />}
      <text x={P.x + P.w / 2} y={P.y + P.h * 0.2} fill={p.ink} fontSize={Math.min(6.5, P.w * 0.075)} fontWeight="600" letterSpacing={Math.min(1.6, P.w * 0.02)} textAnchor="middle">SAGE</text>
      <text x={P.x + P.w / 2} y={P.y + P.h * 0.46} fill={p.ink} fontSize={nameSize} fontWeight="500" letterSpacing="-0.15" textAnchor="middle">{p.short}</text>
      {p.sub && <text x={P.x + P.w / 2} y={P.y + P.h * 0.62} fill={p.ink} fontSize={subSize} opacity="0.8" textAnchor="middle">{p.sub}</text>}
      <text x={P.x + P.w / 2} y={P.y + P.h * 0.86} fill={p.ink} opacity="0.6" fontSize={Math.min(5.8, P.w * 0.07)} textAnchor="middle">{p.sizes[0]}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 200 300" className={className} aria-hidden overflow="visible">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" x2="1">
          <stop offset="0" stopColor={css(c, 0.42, a)} />
          <stop offset="0.06" stopColor={css(c, 0.64, a)} />
          <stop offset="0.1" stopColor={css(c, 0.92, a)} />
          <stop offset="0.16" stopColor={css(mixRgb(c, WHITE, 0.16), 1, a)} />
          <stop offset="0.36" stopColor={css(c, 1.02, a)} />
          <stop offset="0.55" stopColor={css(c, 0.93, a)} />
          <stop offset="0.76" stopColor={css(c, 0.78, a)} />
          <stop offset="0.9" stopColor={css(c, 0.6, a)} />
          <stop offset="0.95" stopColor={css(mixRgb(c, WHITE, 0.14), 0.9, a)} />
          <stop offset="1" stopColor={css(c, 0.5, a)} />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(k, 0.4)} />
          <stop offset="0.1" stopColor={css(k, 0.7)} />
          <stop offset="0.22" stopColor={css(mixRgb(k, WHITE, 0.6))} />
          <stop offset="0.3" stopColor={css(k, 1.02)} />
          <stop offset="0.6" stopColor={css(k, 0.86)} />
          <stop offset="0.85" stopColor={css(k, 0.62)} />
          <stop offset="0.93" stopColor={css(mixRgb(k, WHITE, 0.2), 0.9)} />
          <stop offset="1" stopColor={css(k, 0.4)} />
        </linearGradient>
        <linearGradient id={`${id}-capv`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}-wrap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(c, 0.42)} stopOpacity="1" />
          <stop offset="0.14" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="0.86" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="1" stopColor={css(c, 0.42)} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" x2="1">
          <stop offset="0" stopColor={css(liq, 0.7)} />
          <stop offset="0.3" stopColor={css(liq, 1)} />
          <stop offset="0.7" stopColor={css(liq, 0.92)} />
          <stop offset="1" stopColor={css(liq, 0.7)} />
        </linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d={s.body} />
        </clipPath>
        <radialGradient id={`${id}-bulb`} cx="0.35" cy="0.25" r="0.9">
          <stop offset="0" stopColor={css(mixRgb(k, WHITE, 0.4))} />
          <stop offset="0.55" stopColor={css(k, 0.9)} />
          <stop offset="1" stopColor={css(k, 0.55)} />
        </radialGradient>
        <radialGradient id={`${id}-floor`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={s.body} fill={`url(#${id}-body)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {p.glass && s.fill !== undefined && (
          <>
            <rect x={B.x + 3} y={s.fill} width={B.w - 6} height={286 - s.fill - 9} fill={`url(#${id}-liquid)`} opacity="0.75" />
            <rect x={B.x + 3} y={s.fill} width={B.w - 6} height="1.6" fill="#fff" opacity="0.45" />
            {s.tube && <rect x="98.6" y={B.y - 4} width="2.8" height={286 - B.y - 4} fill="#fff" opacity="0.4" />}
            <rect x={B.x} y="274" width={B.w} height="12" fill={css(c, 0.5, 0.55)} />
            <path d={`M${B.x + 6} 275 H${B.x + B.w - 6}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="0.8" />
          </>
        )}
        <motion.g style={{ x }}>
          {printArt(0)}
          {printArt(period)}
        </motion.g>
        <rect x={B.x} y={P.y - 2} width={B.w} height={P.h + 4} fill={`url(#${id}-wrap)`} opacity="0.5" />
        <rect x={B.x} y={B.y} width={B.w} height={B.h} fill={`url(#${id}-shade)`} />
        <rect x={B.x + B.w * 0.07} y={B.y + 4} width={B.w * 0.11} height={B.h - 8} rx="3" fill="#fff" opacity={lum(c) > 200 ? 0.45 : 0.3} filter={`url(#${id}-soft)`} />
        <rect x={B.x + B.w * 0.11} y={B.y + 6} width={B.w * 0.028} height={B.h - 12} rx="1" fill="#fff" opacity="0.85" />
        <rect x={B.x + B.w * 0.86} y={B.y + 8} width={B.w * 0.025} height={B.h - 16} rx="1" fill="#fff" opacity="0.3" />
      </g>
      <path d={s.body} fill="none" stroke={css(c, 0.45, 0.45)} strokeWidth="0.7" />
      {s.cap(id)}
    </svg>
  );
}

const SPRING = { type: "spring", bounce: 0, duration: 0.55 };

export function ProductShelf({ products = PRODUCTS, currency = "R$", onOpen }) {
  const [openItem, setOpenItem] = useState(null);
  const [wish, setWish] = useState("");
  const [match, setMatch] = useState(null);
  const byId = new Map(products.map((product) => [product.id, product]));
  const shelves = SHELVES.map((shelf) => ({ ...shelf, items: shelf.ids.map((id) => byId.get(id)).filter(Boolean) }));
  const open = openItem?.product ?? null;

  useEffect(() => {
    if (!openItem) return;
    const onKey = (e) => e.key === "Escape" && setOpenItem(null);
    document.body.classList.add("product-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("product-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [openItem]);

  const addToBag = (qty) => qty;

  return (
    <div className="relative w-full overflow-x-hidden bg-[#efe2d2] text-[#2c261f]">
      <LayoutGroup>
        <div className="mx-auto w-full max-w-[1080px] px-5 pt-8 pb-12">
          <h2 className="mb-6 text-center font-serif text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.03em]">A prateleira</h2>
          <form
            className="mx-auto mb-12 max-w-[640px] text-center"
            onSubmit={(event) => {
              event.preventDefault();
              setMatch(suggestShelf(wish, products));
            }}
          >
            <label htmlFor="shelf-wish" className="mb-3 block font-serif text-[1.15rem]">
              Conta o perfume que você quer. A gente indica um.
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="shelf-wish"
                value={wish}
                onChange={(event) => setWish(event.target.value)}
                placeholder="perfume frio amadeirado"
                className="h-12 flex-1 rounded-full border border-[#ddd2c4] bg-[#f7f1e8] px-5 text-[15px] outline-none"
              />
              <button type="submit" className="h-12 rounded-full border border-[#9c3b06] bg-transparent px-6 text-[15px] text-[#9c3b06]">
                Indicar
              </button>
            </div>
            {match && (
              <button type="button" onClick={() => setOpenItem({ product: match.product, layoutId: `wish-${match.product.id}` })} className="mx-auto mt-8 block w-full max-w-[220px] border-0 bg-transparent p-0 text-center shadow-none">
                <p className="mb-5 text-[15px] leading-snug text-[#3c2918]">
                  {match.exact
                    ? "Esta fragrância combina com o que você descreveu."
                    : "Infelizmente não temos essa fragrância que você procura, mas temos esta aqui, que seria bem parecida."}
                </p>
                <div className="mx-auto aspect-[2/3] w-[140px]">
                  <ProductArt p={match.product} onShelf className="size-full" />
                </div>
                <div aria-hidden className="relative -mt-[6px] h-[16px] overflow-hidden rounded-full">
                  <div className="absolute inset-x-0 top-0 h-[8px] bg-[linear-gradient(to_bottom,#e6e6ea,#fbfbfd)]" />
                  <div className="absolute inset-x-0 top-[8px] h-[8px] bg-[linear-gradient(to_bottom,#ffffff,#ececf0)] shadow-[0_1px_0_rgba(0,0,0,0.04)]" />
                </div>
                <div className="mt-4 text-[15px] font-medium">{match.product.short}</div>
                <div className="mt-0.5 text-[13px] text-[#7c6d60]">{currency} {match.product.price}</div>
                <div className="mt-0.5 text-[12px] text-[#9c3b06]">{match.product.sizes.join(" · ")}</div>
              </button>
            )}
          </form>
          {shelves.map((shelf) => (
            <ShelfLane
              key={shelf.id}
              title={shelf.title}
              items={shelf.items}
              currency={currency}
              openLayoutId={openItem?.layoutId}
              onOpen={(product, layoutId) => setOpenItem({ product, layoutId })}
            />
          ))}
        </div>

        {open && createPortal(
          <AnimatePresence>
            <ProductPage key={openItem.layoutId} p={open} layoutId={openItem.layoutId} currency={currency} onClose={() => setOpenItem(null)} onAdd={addToBag} />
          </AnimatePresence>,
          document.body,
        )}
      </LayoutGroup>
    </div>
  );
}

function ProductPoster({ p, layoutId }) {
  return (
    <section className="product-poster" aria-label="Apresentação do perfume">
      <div className="product-poster__top">
        <span>Silhouette</span>
        <span className="product-poster__pair">
          <span>Luxury</span>
          <span>Fragrance</span>
        </span>
      </div>
      <p className="product-poster__beauty">Beauty Product</p>
      <div className="product-poster__mid">
        <span>Presented by Emma Brooks</span>
        <span className="product-poster__start">
          Start slide now
          <i aria-hidden="true" />
        </span>
      </div>
      <p className="product-poster__word">Perfume</p>
      <motion.img
        layoutId={layoutId}
        transition={SPRING}
        className="product-poster__bottle"
        src={p.photo}
        alt=""
        draggable="false"
      />
    </section>
  )
}

const ESSENCES = [
  { name: "Coco", src: "/illustrations/coco.png", side: "left" },
  { name: "Canela", src: "/illustrations/canela.png", side: "right" },
  { name: "Sândalo", src: "/illustrations/sandalo.png", side: "left" },
  { name: "Hortelã", src: "/illustrations/hortela.png", side: "right" },
  { name: "Flores", src: "/illustrations/flores.png", side: "left" },
  { name: "Limão", src: "/illustrations/limao.png", side: "right" },
]

function EssenceRise({ reduce }) {
  return (
    <div className="note-rise" aria-hidden="true">
      {ESSENCES.map((note, index) => {
        const base = reduce ? 0 : 0.75 + index * 0.62
        const appear = reduce ? { duration: 0 } : { duration: 0.45, delay: base, ease: [0.22, 1, 0.36, 1] }
        const line = reduce ? { duration: 0 } : { duration: 0.35, delay: base + 0.28, ease: [0.22, 1, 0.36, 1] }
        return (
          <div key={note.name} className={cn("note-rise__row", note.side === "left" && "is-left")}>
            <motion.div
              className="note-rise__label"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={line}
            >
              {note.side === "left" && <span>{note.name}</span>}
              <motion.i
                className="note-rise__trave"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={line}
              />
              {note.side === "right" && <span>{note.name}</span>}
            </motion.div>
            <motion.img
              className="note-rise__photo"
              src={note.src}
              alt=""
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={appear}
            />
          </div>
        )
      })}
    </div>
  )
}

function ProductPage({ p, currency, onClose, onAdd, layoutId }) {
  const reduce = useReducedMotion();
  const spin = useMotionValue(0);
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [section, setSection] = useState("Detalhes");
  const closeRef = useRef(null);
  const drag = useRef(null);

  useEffect(() => {
    if (reduce) return;
    const c = animate(spin, 1, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 });
    return () => c.stop();
  }, [spin, reduce]);

  const price = p.price * (p.sizes.indexOf(size) > 0 ? 1.7 : 1);
  const add = () => {
    onAdd(qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const onDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    spin.stop();
    drag.current = { x: e.clientX, v: spin.get(), samples: [{ x: e.clientX, t: e.timeStamp }] };
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    spin.set(d.v - (e.clientX - d.x) / 380);
    d.samples.push({ x: e.clientX, t: e.timeStamp });
    if (d.samples.length > 5) d.samples.shift();
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const vx = last.t > first.t ? ((last.x - first.x) / (last.t - first.t)) * 1000 : 0;
    const velocity = -vx / 380;
    const projected = spin.get() + ((velocity / 1000) * 0.998) / (1 - 0.998);
    animate(spin, Math.round(projected), { type: "spring", bounce: 0, duration: 0.9, velocity });
  };

  const poster = Boolean(p.photo?.includes("million"))
  const sections = [
    ["Detalhes", <ul key="d" className="shelf-notes">{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>],
    ["Ingredientes", <p key="i">{p.ingredients}</p>],
    ["Como usar", <p key="h">{p.howTo}</p>],
  ];

  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-[80] overflow-y-auto bg-[#efe2d2]">
      <motion.div className="fixed inset-0 bg-[#efe2d2]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
      {poster && <ProductPoster p={p} layoutId={layoutId} />}
      <div className={cn("relative mx-auto min-h-full max-w-[1080px] px-5 pb-12", poster ? "pt-10" : "as-grid grid-cols-1 items-center gap-8 pt-20 md:grid-cols-[1.05fr_1fr] md:gap-14")}>
        {!poster && (
          <div className="product-stage relative flex flex-col items-center justify-center md:h-[calc(100dvh-7rem)]">
            <motion.div
              layoutId={layoutId}
              transition={SPRING}
              className="relative z-10 aspect-[2/3] h-[44vh] touch-none select-none md:h-[62vh]"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <EssenceRise reduce={reduce} />
            <motion.div
                className="pointer-events-none flex size-full items-end justify-center"
                style={{ transformOrigin: p.photo ? "center bottom" : "50% 96.7%" }}
                initial={{ scale: p.photo ? 0.77 : 1 }}
                animate={{ scale: p.photo ? 0.77 : pageZoom(p.kind) }}
                exit={{ scale: 1 }}
                transition={SPRING}
              >
                <ProductArt p={p} spin={spin} className="size-full" />
              </motion.div>
            </motion.div>
            <div aria-hidden className="relative -mt-[6px] h-[16px] w-[92%] overflow-hidden rounded-full">
              <div className="absolute inset-x-0 top-0 h-[8px] bg-[linear-gradient(to_bottom,#e6e6ea,#fbfbfd)]" />
              <div className="absolute inset-x-0 top-[8px] h-[8px] bg-[linear-gradient(to_bottom,#ffffff,#ececf0)] shadow-[0_1px_0_rgba(0,0,0,0.04)]" />
            </div>
            <button type="button" className="shelf-images">ver imagens</button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shelf-back -ml-1.5 mb-6 inline-flex items-center gap-0.5 px-1.5 py-1 text-[15px] text-[#2c261f] underline-offset-4 hover:underline"
          >
            <ChevronLeft className="size-4" strokeWidth={2.2} /> Voltar
          </button>
          <div className="text-[14px] text-[#7c6d60]">{p.category}</div>
          <h2 className="mt-1 text-[clamp(30px,4vw,40px)] leading-[1.08] font-semibold tracking-[-0.022em]">{p.name}</h2>
          <p className="mt-2 text-[19px] leading-snug text-[#7c6d60]">{p.tagline}</p>

          <div className="mt-6 flex items-baseline gap-2.5 tabular-nums">
            <span className="text-[24px] font-semibold tracking-[-0.01em]">{currency} {price.toFixed(2)}</span>
            {p.compareAt && <span className="text-[17px] text-[#8a7b6e] line-through">{currency} {(p.compareAt * (price / p.price)).toFixed(2)}</span>}
          </div>
          <p className="mt-4 max-w-[54ch] text-[17px] leading-[1.47] tracking-[-0.01em] text-[#2c261f]/85">{p.description}</p>

          <fieldset className="mt-7">
            <legend className="mb-2.5 text-[17px] font-semibold tracking-[-0.01em]">Tamanho</legend>
            <div className="as-grid grid-cols-2 gap-2.5">
              {p.sizes.map((sz, i) => {
                const on = size === sz;
                return (
                  <label
                    key={sz}
                    className={cn(
                      "flex items-center justify-between rounded-xl border bg-[#efe2d2] px-4 py-3.5 text-[15px]",
                      on ? "border-[#9c3b06] shadow-[0_0_0_1px_#9c3b06]" : "border-[#ddd2c4]",
                    )}
                  >
                    <input type="radio" name={`size-${p.id}`} value={sz} checked={on} onChange={() => setSize(sz)} className="sr-only" />
                    <span className="font-medium">{sz}</span>
                    <span className="text-[#7c6d60] tabular-nums">{currency} {(p.price * (i > 0 ? 1.7 : 1)).toFixed(2)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7 flex items-stretch gap-3">
            <div className="flex items-center rounded-xl border border-[#ddd2c4] bg-[#efe2d2]">
              <button type="button" aria-label="Diminuir" onClick={() => setQty((q) => Math.max(1, q - 1))} className="as-grid h-full w-11 place-items-center" disabled={qty === 1}>
                <Minus className="size-4" />
              </button>
              <span className="w-7 text-center text-[17px] tabular-nums">{qty}</span>
              <button type="button" aria-label="Aumentar" onClick={() => setQty((q) => Math.min(9, q + 1))} className="as-grid h-full w-11 place-items-center">
                <Plus className="size-4" />
              </button>
            </div>
            <button type="button" onClick={add} className="bag-btn">
              {added ? "Adicionado" : "Adicionar à sacola"}
            </button>
          </div>

          <dl className="mt-6 as-grid gap-1 text-[14px] leading-snug">
            <div className="flex flex-wrap gap-x-2"><dt className="font-semibold">Entrega:</dt><dd className="text-[#7c6d60]">Frete grátis a partir de R$ 299</dd></div>
            <div className="flex flex-wrap gap-x-2"><dt className="font-semibold">Pix:</dt><dd className="text-[#7c6d60]">5% de desconto no pagamento</dd></div>
          </dl>

          <div className="mt-8 flex flex-col gap-3">
            {sections.map(([title, body]) => {
              const isOpen = section === title;
              return (
                <div key={title} className={cn("overflow-hidden rounded-2xl border transition-colors", isOpen ? "border-[#c4a07a] bg-[#f7f1e8]" : "border-[#e4d3be] bg-[#efe2d2]")}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setSection(isOpen ? null : title)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left font-serif text-[1.35rem] font-medium tracking-[-0.02em] text-[#2c261f]"
                  >
                    {title}
                    <span className={cn("grid size-8 place-items-center rounded-full border text-[#9c3b06] transition-colors", isOpen ? "border-[#9c3b06] bg-[#efe2d2]" : "border-[#d7c4ae]")}>
                      <ChevronDown className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={SPRING} className="overflow-hidden">
                        <div className="px-5 pb-5 text-[15px] leading-relaxed text-[#3c2918]">{body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
