import Image from 'next/image'
import Link from 'next/link'
import Container from '../shared/Container.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import './AboutPaul.css'

export default function AboutPaul() {
  return (
    <section className="about-paul" id="about" aria-labelledby="about-paul-heading">
      <Container>
        <div className="about-paul-layout">
          <div className="about-paul-story">
            <SectionEyebrow variant="quiet">A little about me</SectionEyebrow>
            <h2 className="about-paul-heading" id="about-paul-heading">Curiosity usually gets me into things.</h2>
            <p>
              My career has taken me through executive support, operations, marketing, SEO, automation, and
              eventually web development. I have a habit of finding something interesting, learning how it works, and
              seeing what I can build with it.
            </p>
            <p className="about-paul-turn">
              pawlystudios. is where a lot of that curiosity ends up. It&rsquo;s the name I build websites under and where I bring
              that work together.
            </p>
            <p>
              Outside of work, I&rsquo;m usually somewhere between finding a good cup of coffee, watching F1, learning
              something completely unrelated, or spending way too much time flying an A320neo in a simulator.
            </p>
            <Link className="about-paul-link" href="/about">More about me <span aria-hidden="true">→</span></Link>
          </div>

          <figure className="about-paul-portrait">
            <Image
              src="/images/paul-about-portrait.jpg"
              alt="Niño Paul Cabiles standing outdoors among trees."
              width={1200}
              height={1680}
              sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 42vw, 640px"
            />
            <figcaption>Paul, away from the desk.</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
