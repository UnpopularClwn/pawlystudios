'use client'

import Image from 'next/image'
import { useRef } from 'react'
import Container from '../shared/Container.jsx'
import SetSailDialog from '../projects/setsail/SetSailDialog.jsx'
import './SetSailStage.css'

// Homepage entry to the SetSail case study. The laptop and phone are the
// approved transparent device mockups and sit directly on the page: the laptop
// is lifted across the hero's bottom edge (geometry lives in HomeSequence.css).
// The approved SetSailDialog is unchanged and opened from a visible button.
const laptop = {
  src: '/images/hero/laptop-agency-overview.webp',
  width: 2000,
  height: 1149,
  alt: 'SetSail agency workspace on a laptop, showing client counts, onboarding status, pending approvals and client growth.',
}

const phone = {
  src: '/images/hero/phone-approvals.webp',
  width: 720,
  height: 1468,
  alt: 'SetSail client view on a phone, showing a social media post waiting for approval.',
}

export default function SetSailStage() {
  const dialogRef = useRef(null)
  const devicesRef = useRef(null)
  const triggerRef = useRef(null)

  function openCaseStudy() {
    dialogRef.current?.open(devicesRef.current, triggerRef.current)
  }

  return (
    <section className="ss" id="work" aria-labelledby="setsail-stage-heading">
      <Container className="ss-inner">
        <div className="ss-copy">
          <p className="ss-eyebrow">Featured Build</p>
          <h2 className="ss-title" id="setsail-stage-heading">
            SetSail
          </h2>
          <div className="ss-description">
            <p>SetSail started as my first web app project for an organic social media agency.</p>
            <p>
              The problem was simple: clients were using the agency&rsquo;s project management tool to review,
              approve, and give feedback on content. It worked for the team, but it wasn&rsquo;t built for the
              client experience.
            </p>
            <p>
              I started by looking at where the team struggled most. Tracking client KPIs. Getting content
              approved. Booking strategy calls. Keeping clients updated on what stage they were in. Scheduling
              content. Managing the work behind each account.
            </p>
            <p className="ss-pivot">Those problems became SetSail.</p>
            <p>
              A client portal and agency workspace with KPI tracking, project stages, strategy call booking,
              automatic scheduling, and a lightweight project management system.
            </p>
            <p>
              For content approvals, I borrowed a familiar interaction from Tinder: swipe right to approve a post,
              swipe left to request changes.
            </p>
            <p>
              SetSail also connects with a third-party social media platform, allowing approved content to move into
              scheduling and publishing across connected social accounts.
            </p>
          </div>
          <div className="ss-actions">
            <button
              type="button"
              className="btn btn--primary"
              ref={triggerRef}
              aria-haspopup="dialog"
              aria-controls="setsail-project-dialog-home"
              onClick={openCaseStudy}
            >
              <span>See how I built SetSail</span>
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        </div>
      </Container>

      <div className="ss-devices" ref={devicesRef}>
        <figure className="ss-figure">
          <Image
            src={laptop.src}
            alt={laptop.alt}
            width={laptop.width}
            height={laptop.height}
            sizes="(max-width: 640px) 116vw, (max-width: 1180px) 92vw, min(66vw, 1080px)"
            className="ss-device"
            priority
          />
        </figure>
      </div>

      <div className="ss-phone">
        <div className="ss-phone-inner">
          <figure className="ss-figure">
            <Image
              src={phone.src}
              alt={phone.alt}
              width={phone.width}
              height={phone.height}
              sizes="(max-width: 640px) 190px, (max-width: 1180px) 24vw, 280px"
              className="ss-device"
            />
          </figure>
        </div>
      </div>

      <SetSailDialog ref={dialogRef} id="setsail-project-dialog-home" />
    </section>
  )
}
