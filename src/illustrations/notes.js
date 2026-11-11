const groups = {
  citricos: ['Bergamota', 'Néroli', 'Toranja'],
  flores: ['Rosa', 'Rosa negra', 'Jasmim', 'Íris', 'Peônia', 'Lírio', 'Violeta', 'Gerânio', 'Lavanda'],
  frutas: ['Ameixa', 'Pêra', 'Maçã'],
  madeiras: ['Sândalo', 'Cedro', 'Vetiver', 'Madeira', 'Oud', 'Patchouli'],
  especiarias: ['Açafrão', 'Baunilha', 'Baunilha seca', 'Pimenta rosa', 'Pimenta', 'Cardamomo', 'Noz-moscada'],
  ingredientes: ['Âmbar', 'Almíscar', 'Musk branco', 'Cenoura', 'Sal', 'Notas marinhas', 'Fumaça', 'Couro', 'Tabaco', 'Resina'],
}

export function noteKey(name) {
  return String(name)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const noteGroups = groups

export const noteIllustrations = Object.fromEntries(
  Object.values(groups)
    .flat()
    .map((name) => [noteKey(name), null]),
)

export function illustrationForNote(name) {
  return noteIllustrations[noteKey(name)] || null
}
