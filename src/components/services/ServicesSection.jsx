import Section from '../shared/Section.jsx'
import Reveal from '../shared/Reveal.jsx'
import ServiceRow from './ServiceRow.jsx'
import { services } from '../../data/services.js'
import './Services.css'

export default function ServicesSection() {
  return (
    <Section background="white" className="services-section" aria-label="What I build" id="services">
      <Reveal as="div" className="services-intro" preset="content">
        <h2 className="services-heading">Three ways I can help with your website.</h2>
        <p className="services-lead">
          Whether you are starting fresh, updating a site that has fallen behind, or need one page that does one
          job, this is what I build.
        </p>
      </Reveal>

      <ul className="services-list">
        {services.map((service) => (
          <ServiceRow key={service.number} service={service} />
        ))}
      </ul>
    </Section>
  )
}
