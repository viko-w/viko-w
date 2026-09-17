import { createElement } from 'react'

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g

function safeUrl(url) {
  if (/javascript:/i.test(url)) return '#'
  if (/^(https?:|mailto:|#|\.|\/)/i.test(url)) return url
  return '#'
}

function renderInline(text) {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((piece, i) => {
      if (piece.startsWith('`') && piece.endsWith('`')) {
        return <code key={i}>{piece.slice(1, -1)}</code>
      }
      if (piece.startsWith('**') && piece.endsWith('**')) {
        return <strong key={i}>{piece.slice(2, -2)}</strong>
      }
      if (piece.startsWith('*') && piece.endsWith('*')) {
        return <em key={i}>{piece.slice(1, -1)}</em>
      }
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(piece)
      if (link) {
        return (
          <a key={i} href={safeUrl(link[2])}>
            {link[1]}
          </a>
        )
      }
      return piece
    })
}

function mdToBlocks(src) {
  const lines = src.split(/\r?\n/)
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (/^```/.test(line)) {
      const buf = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i])
        i++
      }
      i++ // closing fence
      blocks.push({ type: 'code', text: buf.join('\n') })
    } else if (/^#{1,6} /.test(line)) {
      const m = /^(#{1,6}) (.*)$/.exec(line)
      blocks.push({ type: 'h', level: m[1].length, text: m[2] })
      i++
    } else if (/^[-*] /.test(line)) {
      const items = []
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: 'ul', items })
    } else if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      blocks.push({ type: 'ol', items })
    } else if (/^> ?/.test(line)) {
      const items = []
      while (i < lines.length && /^> ?/.test(lines[i])) {
        items.push(lines[i].replace(/^> ?/, ''))
        i++
      }
      blocks.push({ type: 'quote', items })
    } else if (/^---+\s*$/.test(line) || /^\*\*\*+\s*$/.test(line)) {
      blocks.push({ type: 'hr' })
      i++
    } else if (line.trim() === '') {
      i++
    } else {
      const buf = []
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        !/^(#{1,6} |```|[-*] |\d+\. |> |---+\s*$|\*\*\*+\s*$)/.test(lines[i])
      ) {
        buf.push(lines[i])
        i++
      }
      blocks.push({ type: 'p', text: buf.join('\n') })
    }
  }

  return blocks
}

export default function Markdown({ children }) {
  return (
    <div className="markdown">
      {mdToBlocks(children).map((block, i) => {
        switch (block.type) {
          case 'code':
            return (
              <pre key={i}>
                <code>{block.text}</code>
              </pre>
            )
          case 'h':
            return createElement(`h${block.level}`, { key: i }, ...renderInline(block.text))
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            )
          case 'quote':
            return (
              <blockquote key={i}>
                {block.items.map((item, j) => (
                  <p key={j}>{renderInline(item)}</p>
                ))}
              </blockquote>
            )
          case 'hr':
            return <hr key={i} />
          default:
            return <p key={i}>{renderInline(block.text)}</p>
        }
      })}
    </div>
  )
}