const projects = [
  'Game development in C++ using Vulkan',
  'Program that generates documents based on dynamic JSON data',
]

export default function Projects() {
  return (
    <section className="section">
      <h2>Projects</h2>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>
    </section>
  )
}