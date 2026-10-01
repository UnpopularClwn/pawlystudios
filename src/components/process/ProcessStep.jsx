import Reveal from '../shared/Reveal.jsx'

export default function ProcessStep({ step }) {
  const { number, title, description, detail } = step

  return (
    <li className="roadmap-step">
      <Reveal as="div" className="roadmap-node" aria-hidden="true" selector=".roadmap-node-fill" y={0} fromScale={0.3}>
        <span className="roadmap-node-base" />
        <span className="roadmap-node-fill" />
      </Reveal>
      <Reveal as="div" className="roadmap-content" y={18}>
        <span className="roadmap-step-number">{number}</span>
        <h3 className="roadmap-step-title">{title}</h3>
        {detail && <span className="roadmap-step-detail">{detail}</span>}
        {description.map((paragraph) => (
          <p className="roadmap-step-copy" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </Reveal>
    </li>
  )
}
