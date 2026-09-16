import Navbar from './Navbar.jsx'
import './index.css'

const projects = [
  'Game development in C++ using Vulkan',
  'Program that generates documents based on dynamic JSON data',
]

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <section id="home" className="hero">
          <h1>Hi, I'm Viko</h1>
          <p className="hero-sub">IT Development student with a passion for everything awesome.</p>
          <a className="hero-cta" href="#projects">View projects</a>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project}>{project}</li>
            ))}
          </ul>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          <p>Former: SMX stats site &amp; C++ telemetry API with Victoria Metrics</p>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p className="muted">Coming soon</p>
        </section>
      </main>
      <footer className="footer">
        <p>© 2026 Viko</p>
      </footer>
    </div>
  )
}

export default App