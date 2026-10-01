'use client'

import { useEffect, useRef, useState } from 'react'
import Button from '../shared/Button.jsx'
import DirectContactLinks from './DirectContactLinks.jsx'
import { submitContactForm } from '../../lib/submitContactForm.js'
import { contactFieldLimits, projectTypes } from '../../data/contact.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL_FIELDS = { name: '', email: '', company: '', projectType: '', details: '', hp_field: '' }

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required.'
  else if (fields.name.length > contactFieldLimits.name) {
    errors.name = `Name must be ${contactFieldLimits.name} characters or fewer.`
  }
  if (!fields.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_PATTERN.test(fields.email)) errors.email = 'Enter a valid email address.'
  else if (fields.email.length > contactFieldLimits.email) {
    errors.email = `Email must be ${contactFieldLimits.email} characters or fewer.`
  }
  if (fields.company.length > contactFieldLimits.company) {
    errors.company = `Company must be ${contactFieldLimits.company} characters or fewer.`
  }
  if (!projectTypes.includes(fields.projectType)) errors.projectType = 'Select a project type.'
  if (!fields.details.trim()) errors.details = 'Tell me a little about the project.'
  else if (fields.details.length > contactFieldLimits.details) {
    errors.details = `Project details must be ${contactFieldLimits.details} characters or fewer.`
  }
  return errors
}

export default function InquiryForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | unconfigured | rate-limited
  const fieldRefs = useRef({})
  const successRef = useRef(null)

  // The form is replaced by the success message, so move focus there instead of dropping it.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const setField = (name, value) => setFields((prev) => ({ ...prev, [name]: value }))

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(fields)
    setErrors(nextErrors)

    const firstInvalid = ['name', 'email', 'company', 'projectType', 'details'].find((key) => nextErrors[key])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    setStatus('submitting')
    try {
      const result = await submitContactForm(fields)
      if (result.ok) {
        setStatus('success')
      } else if (result.code === 'VALIDATION_ERROR') {
        setErrors(result.errors)
        setStatus('idle')
        const firstServerInvalid = ['name', 'email', 'company', 'projectType', 'details'].find(
          (key) => result.errors[key],
        )
        if (firstServerInvalid) fieldRefs.current[firstServerInvalid]?.focus()
        else setStatus('error')
      } else if (result.code === 'NOT_CONFIGURED') {
        setStatus('unconfigured')
      } else if (result.code === 'RATE_LIMITED') {
        setStatus('rate-limited')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
        <p className="form-success-heading">Thanks, I got your inquiry.</p>
        <p className="form-success-copy">I&rsquo;ll review the details and get back to you.</p>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} aria-busy={isSubmitting} noValidate>
      <p aria-live="polite" className="visually-hidden">
        {isSubmitting ? 'Sending your inquiry…' : ''}
      </p>

      {/* Honeypot — hidden from real users and screen readers, left for bots. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="hp_field">Leave this field blank</label>
        <input
          type="text"
          id="hp_field"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
          maxLength={contactFieldLimits.honeypot}
          value={fields.hp_field}
          onChange={(event) => setField('hp_field', event.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={contactFieldLimits.name}
          value={fields.name}
          onChange={(event) => setField('name', event.target.value)}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          ref={(el) => (fieldRefs.current.name = el)}
        />
        {errors.name && (
          <p className="field-error" id="name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          maxLength={contactFieldLimits.email}
          value={fields.email}
          onChange={(event) => setField('email', event.target.value)}
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          ref={(el) => (fieldRefs.current.email = el)}
        />
        {errors.email && (
          <p className="field-error" id="email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="company">
          Company / Business <span className="field-optional">(optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          maxLength={contactFieldLimits.company}
          value={fields.company}
          onChange={(event) => setField('company', event.target.value)}
          aria-invalid={errors.company ? 'true' : undefined}
          aria-describedby={errors.company ? 'company-error' : undefined}
          ref={(el) => (fieldRefs.current.company = el)}
        />
        {errors.company && (
          <p className="field-error" id="company-error">
            {errors.company}
          </p>
        )}
      </div>

      <fieldset className="field-group chip-fieldset">
        <legend>What can I help with?</legend>
        <div className="chip-group">
          {projectTypes.map((type) => {
            const id = `pt-${type.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
            return (
              <span className="chip" key={type}>
                <input
                  type="radio"
                  id={id}
                  name="projectType"
                  value={type}
                  className="visually-hidden chip-input"
                  checked={fields.projectType === type}
                  onChange={() => setField('projectType', type)}
                  aria-invalid={errors.projectType ? 'true' : undefined}
                  aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  ref={(el) => {
                    if (type === projectTypes[0]) fieldRefs.current.projectType = el
                  }}
                />
                <label htmlFor={id} className="chip-label">
                  {type}
                </label>
              </span>
            )
          })}
        </div>
        {errors.projectType && (
          <p className="field-error" id="projectType-error">
            {errors.projectType}
          </p>
        )}
      </fieldset>

      <div className="field-group">
        <label htmlFor="details">Tell me a little about the project</label>
        <textarea
          id="details"
          name="details"
          rows={6}
          required
          maxLength={contactFieldLimits.details}
          value={fields.details}
          onChange={(event) => setField('details', event.target.value)}
          aria-invalid={errors.details ? 'true' : undefined}
          aria-describedby={errors.details ? 'details-error' : undefined}
          ref={(el) => (fieldRefs.current.details = el)}
        />
        {errors.details && (
          <p className="field-error" id="details-error">
            {errors.details}
          </p>
        )}
      </div>

      {(status === 'error' || status === 'unconfigured' || status === 'rate-limited') && (
        <div className="form-error-banner" role="alert">
          <p>
            {status === 'rate-limited'
              ? 'Too many attempts. Please wait a few minutes and try again.'
              : status === 'unconfigured'
                ? 'Online inquiries are temporarily unavailable, and your message was not sent. You can reach me directly instead:'
                : 'Something went wrong, and your inquiry was not sent. You can try again, or reach me directly:'}
          </p>
          {status !== 'rate-limited' && <DirectContactLinks />}
        </div>
      )}

      <div className="form-actions">
        <Button type="submit" arrow disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Inquiry'}
        </Button>
      </div>
    </form>
  )
}
