import { Illustration } from './Illustration.jsx'
import { illustrationForNote, noteKey } from './notes.js'

export function FragranceNote({ note, src, alt, width = 64, height = 64, className }) {
  const file = src || illustrationForNote(note)
  if (!file) return null

  return (
    <Illustration
      src={file}
      alt={alt || note || ''}
      width={width}
      height={height}
      className={className || `note-${noteKey(note || 'ilustracao')}`}
    />
  )
}
