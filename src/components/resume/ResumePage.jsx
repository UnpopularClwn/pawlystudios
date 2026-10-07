import Container from '../shared/Container.jsx'
import Button from '../shared/Button.jsx'
import Reveal from '../shared/Reveal.jsx'
import { resume } from '../../data/resume.js'
import './Resume.css'

// /resume: the structured professional record, set in the portfolio's own type and rules rather
// than as a document on a page. The experience itself is the visual content: no timeline dots,
// logos, skill bars or cards. Copy lives in src/data/resume.js.
const { glance, experience, project, training, tools } = resume

// Visible text with an optional plain-language reading for screen readers (2021–2024 as "2021 to 2024").
function Spoken({ text, spoken }) {
  if (!spoken) return text
  return (
    <>
      <span aria-hidden="true">{text}</span>
      <span className="visually-hidden">{spoken}</span>
    </>
  )
}

export default function ResumePage() {
  return (
    <article className="rs">
      {/* ---------- Introduction ---------- */}
      <header className="rs-hero">
        <Container>
          <p className="rs-eyebrow">{resume.eyebrow}</p>
          <h1 className="rs-name">{resume.name}</h1>
          <p className="rs-role">
            {resume.role} <span className="rs-role-detail">{resume.roleDetail}</span>
          </p>
          <div className="rs-intro">
            {resume.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </header>

      {/* ---------- At a glance ---------- */}
      <section className="rs-glance" aria-labelledby="rs-glance-heading">
        <Container>
          <div className="rs-glance-head">
            <h2 className="rs-label" id="rs-glance-heading">
              {glance.heading}
            </h2>
            <p className="rs-glance-context" id="rs-glance-context">
              {glance.context}
            </p>
          </div>
          <Reveal
            as="ul"
            className="rs-glance-list"
            selector=":scope > li"
            preset="content"
            y={12}
            aria-describedby="rs-glance-context"
          >
            {glance.items.map((item) => (
              <li className="rs-glance-item" key={item.label}>
                <span className="rs-glance-value">
                  <Spoken text={item.value} spoken={item.spoken} />
                </span>{' '}
                <span className="rs-glance-label">{item.label}</span>{' '}
                <span className="rs-glance-source">{item.source}</span>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ---------- Experience ---------- */}
      <section className="rs-experience" aria-labelledby="rs-experience-heading">
        <Container>
          <h2 className="rs-section-heading" id="rs-experience-heading">
            {experience.heading}
          </h2>
          <ol className="rs-roles">
            {experience.roles.map((role) => (
              <li className="rs-role-item" key={role.company}>
                <Reveal as="div" className="rs-role-grid" selector=".rs-role-meta, .rs-role-body" preset="content" y={16}>
                  <div className="rs-role-meta">
                    <p className="rs-role-dates">
                      <Spoken text={role.dates} spoken={role.datesSpoken} />
                    </p>
                    <p className="rs-role-company">{role.company}</p>
                    <p className="rs-role-location">{role.location}</p>
                    {role.figure && (
                      <p className="rs-role-figure">
                        <span className="rs-role-figure-value">
                          <Spoken text={role.figure.value} spoken={role.figure.spoken} />
                        </span>{' '}
                        <span className="rs-role-figure-label">{role.figure.label}</span>
                      </p>
                    )}
                  </div>
                  <div className="rs-role-body">
                    <h3 className="rs-role-title">{role.role}</h3>
                    {role.summary && <p className="rs-role-summary">{role.summary}</p>}
                    <ul className="rs-role-points">
                      {role.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {role.note && <p className="rs-role-note">{role.note}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------- Selected project ---------- */}
      <section className="rs-project" aria-labelledby="rs-project-heading">
        <Container>
          <Reveal as="div" className="rs-project-grid" preset="content">
            <div className="rs-project-head">
              <p className="rs-label">{project.eyebrow}</p>
              <h2 className="rs-project-name" id="rs-project-heading">
                {project.name}
              </h2>
            </div>
            <div className="rs-project-body">
              {project.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="rs-project-action">
                <Button href={project.href} arrow>
                  {project.cta}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Training and tools ---------- */}
      <section className="rs-skills" aria-labelledby="rs-training-heading rs-tools-heading">
        <Container>
          <div className="rs-skills-grid">
            <div className="rs-training">
              <h2 className="rs-label" id="rs-training-heading">
                {training.heading}
              </h2>
              <p className="rs-training-program">{training.program}</p>
              <p className="rs-training-meta">
                {training.provider} &middot; {training.dates}
              </p>
              <p className="rs-training-body">{training.body}</p>
            </div>

            <div className="rs-tools">
              <h2 className="rs-label" id="rs-tools-heading">
                {tools.heading}
              </h2>
              <dl className="rs-tools-list">
                {tools.groups.map((group) => (
                  <div className="rs-tools-row" key={group.category}>
                    <dt>{group.category}</dt>
                    <dd>{group.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
              <p className="rs-tools-ai">{tools.ai}</p>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
