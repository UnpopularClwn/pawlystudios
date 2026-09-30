import AboutSection from '../../components/about/AboutSection.jsx'
import Footer from '../../components/footer/Footer.jsx'

export const metadata = {
  title: 'About Paul',
  description:
    'Meet Niño Paul Cabiles, the independent operator behind pawlystudios. Learn about his web development and digital product work.',
}

export default function AboutPage() {
  return (
    <>
      <AboutSection standalone />
      <Footer />
    </>
  )
}
