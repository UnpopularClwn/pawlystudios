import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Link from 'next/link'
import ProfileCardExperience from './ProfileCardExperience.jsx'
import { BRAND_NAME } from '../../data/brand.js'
import './About.css'

export default function AboutSection() {
  return (
    <Section
      background="pine"
      className="about-section about-section--standalone"
      containerClassName="about-layout about-layout--standalone"
      aria-labelledby="about-heading"
      id="about"
    >
      <div className="about-copy about-copy--intro">
        <SectionEyebrow>
          Behind <span className="about-brand-name">{BRAND_NAME}</span>
        </SectionEyebrow>
        <h1 id="about-heading">Hi, I’m Paul.</h1>
      </div>

      <ProfileCardExperience avatarUrl="/images/paul-about-portrait.jpg" portraitMode />

      <div className="about-story">
        <p>
          I grew up in a small town in the Philippines, surrounded mostly by women who shaped a lot of who I am
          today. They taught me to respect people, appreciate the small things, and make the most of what I have.
        </p>
        <p>
          My career started almost by accident. After senior high school, I applied for what I thought would just be
          a summer job. I ended up working remotely, tried balancing it with college, and eventually realized I
          wanted to take a different path. I left school and focused on building my career.
        </p>
        <p>
          Since then, that path has taken me through executive support, operations, project coordination, marketing,
          SEO, social media, automation, and client success. Somewhere along the way, curiosity pulled me into AI,
          web development, and building internal tools.
        </p>
        <p>That curiosity is probably the most consistent thing about me.</p>
        <p>
          I have a habit of discovering something interesting and going much deeper than I expected. Coffee went
          from being just a drink to classes, equipment, different beans and brewing methods, cuppings, coffee
          festivals, and spending far too much time trying to get one recipe right.
        </p>
        <p>
          The same thing happened with technology. I started experimenting, then building, then wondering what else I
          could make. <strong>pawlystudios. grew out of that curiosity.</strong> It gives me a place to turn ideas into
          websites that people can actually use.
        </p>
        <p>
          Before pawlystudios., I worked with a digital marketing agency that built websites for real estate investors
          around lead generation and search visibility. It taught me that a website has a job to do: make a business
          easy to find, easy to understand, and easy to contact. That is how I approach every site, including SetSail,
          a larger build that started when I noticed where a client experience broke down.
        </p>
        <p className="about-story-link-row">
          <Link className="about-story-link" href="/work/setsail">
            See how I built SetSail <span aria-hidden="true">→</span>
          </Link>
        </p>
        <p>
          Outside of work, you’ll probably find me exploring a coffee shop, watching F1 or MKBHD, learning something
          completely unrelated to what I was learning last week, or flying an A320neo in a simulator that I’ve
          somehow spent hundreds of hours learning to fly.
        </p>
        <p>
          I recently traveled outside the Philippines for the first time, to Taiwan. It reminded me that there’s
          still a lot I haven’t seen, tried, built, or learned yet.
        </p>
        <p>
          I’m still figuring out where all of this takes me. For now, I’m enjoying meeting new people, building
          things, following whatever I’m curious about next, drinking good coffee, and seeing a little more of the
          world along the way.
        </p>
      </div>
    </Section>
  )
}
