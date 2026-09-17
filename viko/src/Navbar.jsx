import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main">
      <NavLink className="navbar-brand" to="/">Viko</NavLink>
      <ul className="navbar-links">
        {links.map(({ label, href }) => (
          <li key={href}>
            <NavLink to={href} end={href === '/'}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar