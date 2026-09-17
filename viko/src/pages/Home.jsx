import Markdown from '../Markdown.jsx'
import useReadme from './useReadme.js'

export default function Home() {
  const { content, status } = useReadme()
  return (
    <>
      {status === 'loading' && <p className="page-state">Loading readme…</p>}
      {status === 'error' && (
        <div className="empty-state">
          <p className="empty-title">This page runs on <code>README.md</code></p>
          <p>
            Drop a <code>README.md</code> in <code>/viko</code> and this page
            fills itself.
          </p>
        </div>
      )}
      {status === 'ready' && <Markdown>{content}</Markdown>}
    </>
  )
}