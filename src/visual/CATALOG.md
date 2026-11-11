# Biblioteca visual

Nada desta pasta entra no site até um pedido explícito. O ponto de entrada é `src/visual/index.js`. A busca por nome fica em `src/visual/registry.js` (`findVisual`).

O que já existe no site, e deve ser olhado antes de criar algo novo:

- `src/illustrations/` — ilustrações e notas olfativas já usadas
- `public/illustrations/frascos/` — fotos de frascos
- `public/editorial/`, `public/gallery/`, `public/home/`, `public/holiday/` — fotos já publicadas

## Ícones monocromáticos

| Fonte | Como usar | Situação |
| --- | --- | --- |
| Lucide | `import { Leaf } from "lucide-react"` | Já estava no projeto. Primeira escolha para ícones de interface. |
| Phosphor | `import { Leaf } from "@phosphor-icons/react"` | Instalado. Pesos: `thin`, `light`, `regular`, `bold`, `fill`, `duotone`. |
| Hugeicons free | `import { HugeiconsIcon } from "@hugeicons/react"` e `import { Leaf01Icon } from "@hugeicons/core-free-icons"` | Instalado. Só o pacote gratuito. Não instalar a coleção Pro sem autorização. |
| Tabler | `<Icon icon="tabler:leaf" />` de `@iconify/react` | Não instalado à parte. O Iconify busca o ícone na hora. |
| Radix Icons | `<Icon icon="radix-icons:leaf" />` | Mesmo caminho do Iconify. |
| React Icons | — | Não instalado. Repete Lucide, Phosphor e Tabler e aumenta o projeto. |

## Ícones coloridos

Não há pacote colorido no bundle. Quando o pedido pedir cor, use o Iconify com um destes prefixos: `noto`, `fluent-emoji`, `twemoji`, `flat-color-icons`.

```jsx
import { Icon } from "@iconify/react"
<Icon icon="noto:fallen-leaf" />
```

O ícone é baixado na hora em que o componente aparece. Se ele for para uma página definitiva, vale trocar por um SVG salvo em `src/visual/assets/svg/`.

## Desenhos originais

Todos aceitam `size` e usam `currentColor`.

| Pedido | Export | Arquivo |
| --- | --- | --- |
| Folha, ramo, flor, botão, hera | `Folha`, `Ramo`, `FlorSimples`, `BotaoFloral`, `Hera` | `decor/flores.jsx` |
| Moldura fina, dupla, de cantos ou em arco | `MolduraFina`, `MolduraDupla`, `MolduraCantos`, `MolduraArco` | `decor/molduras.jsx` |
| Círculo, losango, arco, gota, selo | `Circulo`, `Losango`, `Arco`, `Gota`, `Selo` | `decor/formas.jsx` |
| Arabesco, canto de luxo, florão, monograma | `Arabesco`, `CantoLuxo`, `Florao`, `MonogramaAnel` | `decor/ornamentos.jsx` |
| Linha, losango, pontos, ornato | `DivisorLinha`, `DivisorLosango`, `DivisorPontos`, `DivisorOrnato` | `decor/divisores.jsx` |
| Pontos, linhas, grade, seda | `TexturaPontos`, `TexturaLinhas`, `TexturaGrade`, `TexturaSeda` | `decor/texturas.jsx` |
| Faixa, folha de canto, selo com fita | `Faixa`, `CantoFolha`, `SeloFita` | `decor/banners.jsx` |
| Frasco, borrifador, nota, gota | `Frasco`, `Borrifador`, `NotaOlfativa`, `GotaEssencia` | `decor/perfumes.jsx` |

```jsx
import { CantoFolha } from "@/visual/decor/banners.jsx"
```

## Sombras e luz

`sombras` e `luzes` em `decor/sombras.js`. São strings de `box-shadow`: `suave`, `repouso`, `produto`, `flutuante`, `foco`, `brilhoTopo`, `vidro`, `selo`.

## Animações

| Ferramenta | Situação | Uso |
| --- | --- | --- |
| Motion | Já estava no projeto | Continua sendo a animação das páginas. Presets novos: `presets` e `variantes` em `motion/presets.js`. |
| GSAP | Instalado, não ligado | `import gsap from "gsap"`. Plugins pagos do Club não foram instalados. |
| React Spring | Não instalado | Motion já cobre as mesmas transições. |
| Lenis | Instalado, não ligado | `import { ReactLenis } from "lenis/react"`. Só entra na página se o pedido for rolagem suave. |

## Componentes

| Peça | Situação |
| --- | --- |
| `PremiumCarousel` | Pronto em `components/PremiumCarousel.jsx`, sobre o Embla. Não está em nenhuma página. |
| Embla | Instalado. |
| Swiper | Não instalado. O Embla cobre o carrossel com menos peso. |
| Radix UI | Instalado (`radix-ui`). Primitivos sem estilo, por exemplo `import { Dialog } from "radix-ui"`. |
| shadcn/ui | Configurado em `components.json` para gravar em `src/visual/ui` e em `src/visual/theme.css`. Não rodar de um jeito que altere `src/styles.css`. |
| Magic UI | Copiar sob pedido para `src/visual/components/`. https://magicui.design |
| Aceternity UI | Copiar sob pedido para `src/visual/components/`. https://ui.aceternity.com |
| 21st.dev | Copiar sob pedido para `src/visual/components/`. https://21st.dev |

## Arquivos de fora do npm

Salvar em `src/visual/assets/svg`, `png` ou `webp`. Conferir a licença de cada arquivo antes de baixar.

| Acervo | Endereço | Regra |
| --- | --- | --- |
| SVG Repo | https://www.svgrepo.com | A licença muda por ícone. Preferir CC0 ou MIT. |
| unDraw | https://undraw.co | Ilustrações abertas. Baixar uma a uma quando o pedido existir. |
| Haikei | https://haikei.app | Gerar o SVG na hora do pedido. |
| BGJar | https://bgjar.com | Gerar o fundo na hora do pedido. |
| Hero Patterns | https://heropatterns.com | Padrões em licença MIT. |
| Freepik | https://www.freepik.com | Não baixar sem autorização. A maior parte é paga ou pede atribuição. |
| Flaticon | https://www.flaticon.com | Não baixar sem autorização. |

## O que não fazer

- Não importar esta biblioteca em `main.jsx`, `App.jsx` ou `src/styles.css` sem pedido.
- Não trocar fotos ou desenhos que já estão na página.
- Não instalar a coleção Pro da Hugeicons, plugins pagos do GSAP, nem pacotes repetidos só para aumentar a lista.
