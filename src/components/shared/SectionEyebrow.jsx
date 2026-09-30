import './SectionEyebrow.css'

// variant: default (UI, uppercase; secondary pages), 'expressive' (Sofia label),
// 'quiet' (UI, sentence case caption). Homepage uses expressive sparingly.
export default function SectionEyebrow({ children, variant }) {
  const className = variant ? `section-eyebrow section-eyebrow--${variant}` : 'section-eyebrow'
  return <p className={className}>{children}</p>
}
