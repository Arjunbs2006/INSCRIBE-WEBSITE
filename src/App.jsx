import './App.css'

const highlights = [
  {
    title: 'Hands-on Technology',
    description:
      'Explore software, hardware, and emerging tools through guided experiments and practical collaboration.',
  },
  {
    title: 'Innovation Projects',
    description:
      'Work with peers to transform ideas into prototypes, presentations, and meaningful technical outcomes.',
  },
  {
    title: 'Growth Community',
    description:
      'Learn with a supportive network focused on curiosity, teamwork, and creative problem-solving.',
  },
]

const departments = [
  'Development & Engineering',
  'Design & Branding',
  'Research & Innovation',
  'Operations & Community',
]

function App() {
  return (
    <>
      <header className="hero" id="home">
        <p className="eyebrow">INSCRIBE · Technical & Innovation Club</p>
        <h1>Build ideas. Create impact.</h1>
        <p className="lead">
          INSCRIBE is a student-focused club where technology, innovation, and
          collaboration come together. Discover what we do and prepare to apply
          for recruitment.
        </p>
        <div className="actions">
          <a className="button primary" href="#recruitment">
            Explore Recruitment
          </a>
          <a className="button secondary" href="#about">
            Learn About INSCRIBE
          </a>
        </div>
      </header>

      <main>
        <section id="about" className="section">
          <h2>About INSCRIBE</h2>
          <p>
            INSCRIBE is built for students who want to learn by building. We
            encourage experimentation, interdisciplinary thinking, and practical
            skills that support both academic and professional growth.
          </p>
        </section>

        <section id="what-we-do" className="section grid">
          <h2>What We Do</h2>
          <div className="cards">
            {highlights.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="departments" className="section">
          <h2>Departments / Teams</h2>
          <p>
            Final team names will be confirmed. The structure below shows the
            direction for role-based collaboration.
          </p>
          <ul className="department-list">
            {departments.map((department) => (
              <li key={department}>{department}</li>
            ))}
          </ul>
        </section>

        <section id="recruitment" className="section">
          <h2>Recruitment</h2>
          <p>
            Recruitment details like eligibility, timelines, and selection
            stages will be announced soon. Applicants should be ready to share
            interests, skills, and preferred team roles.
          </p>
          <div className="notice">
            Application form integration with Google Sheets via Google Apps
            Script is planned after frontend completion and local testing.
          </div>
        </section>
      </main>

      <footer id="contact" className="section footer">
        <h2>Contact</h2>
        <p>
          Official contact channels and social links will be added once shared
          by club coordinators.
        </p>
      </footer>
    </>
  )
}

export default App
