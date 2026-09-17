import { useEffect, useState } from 'react'

export default function useReadme() {
  const [status, setStatus] = useState('loading')
  const [content, setContent] = useState(null)

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

  return { content, status }
}