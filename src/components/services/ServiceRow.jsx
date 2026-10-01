import Reveal from '../shared/Reveal.jsx'

export default function ServiceRow({ service }) {
  const { number, title, prompt, description } = service

  return (
    <Reveal
      as="li"
      className="service-row"
      y={16}
      selector=".service-number, .service-title, .service-body"
    >
      <span className="service-number" aria-hidden="true">
        {number}
      </span>
      <h3 className="service-title">{title}</h3>
      <div className="service-body">
        {prompt && <p className="service-prompt">{prompt}</p>}
        <p className="service-description">{description}</p>
      </div>
    </Reveal>
  )
}
