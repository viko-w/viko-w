import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import { Home, Projects, About, Contact, NotFound } from './pages/index.jsx'
import './index.css'

function App() {
  const location = useLocation()

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <div className="page" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <p>© 2026 Viko</p>
      </footer>
    </div>
  )
}

export default App