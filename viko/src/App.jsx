import { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import Markdown from './Markdown.jsx'
import './index.css'

function App() {
  const [content, setContent] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch('/README.md')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        if (!text.trim()) throw new Error('empty')
        setContent(text)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
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
      </main>
      <footer className="footer">
        <p>© 2026 Viko</p>
      </footer>
    </div>
  )
}

export default App