import Image from 'next/image'
import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import { toolLogos, tools } from '../../data/tools.js'
import './Tools.css'

function ToolList({ items, duplicate = false, eager = false }) {
  return (
    <ul className="tools-track-group" aria-hidden={duplicate ? 'true' : undefined}>
      {items.map((item) => (
        <li className="tools-item" key={item}>
          <Image
            src={toolLogos[item]}
            alt=""
            width={44}
            height={44}
            className="tools-logo"
            loading={eager ? 'eager' : undefined}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ToolsSection({ withoutReveal = false }) {
  const items = tools.groups.flatMap((group) => group.items)
  const content = (
    <>
      <div className="tools-intro">
        <SectionEyebrow>{tools.eyebrow}</SectionEyebrow>
        <h2 className="tools-heading">{tools.heading}</h2>
      </div>

      <div className="tools-marquee" aria-label="Tools Paul uses">
        <div className="tools-track">
          <ToolList items={items} eager={withoutReveal} />
          <ToolList items={items} duplicate eager={withoutReveal} />
        </div>
      </div>
    </>
  )

  return (
    <Section background="white" className="tools-section" aria-label="Tools I use">
      {withoutReveal ? (
        <div className="tools-content">{content}</div>
      ) : (
        <Reveal className="tools-content" selector=".tools-intro, .tools-marquee" preset="content" y={14}>
          {content}
        </Reveal>
      )}
    </Section>
  )
}
