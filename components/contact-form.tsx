'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { INQUIRIES } from '@/lib/site-data'

export function ContactForm() {
  const [type, setType] = useState(INQUIRIES[0].id)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  })

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const inquiry = INQUIRIES.find((i) => i.id === type)
    const subject = `${inquiry?.title} — ${form.organization || form.name}`
    const body = [
      `Inquiry type: ${inquiry?.title}`,
      `Name: ${form.name}`,
      `Organization: ${form.organization}`,
      `Email: ${form.email}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:varellentech@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      {/* Inquiry types */}
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Select inquiry type
        </span>
        <div className="mt-6 flex flex-col gap-px">
          {INQUIRIES.map((inquiry) => {
            const active = type === inquiry.id
            return (
              <button
                key={inquiry.id}
                type="button"
                onClick={() => setType(inquiry.id)}
                className={`group border-t border-border py-5 text-left transition-colors ${
                  active ? '' : 'opacity-55 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl font-medium tracking-tight">
                    {inquiry.title}
                  </span>
                  <span
                    className={`size-2.5 rounded-full border border-foreground transition-colors ${
                      active ? 'bg-foreground' : 'bg-transparent'
                    }`}
                  />
                </div>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {inquiry.body}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="border-t border-border pt-8">
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <Field
            label="Full name"
            value={form.name}
            onChange={onChange('name')}
            required
          />
          <Field
            label="Organization"
            value={form.organization}
            onChange={onChange('organization')}
          />
          <div className="sm:col-span-2">
            <Field
              label="Work email"
              type="email"
              value={form.email}
              onChange={onChange('email')}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              How can we help?
            </label>
            <textarea
              value={form.message}
              onChange={onChange('message')}
              rows={4}
              required
              className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground"
              placeholder="Tell us about the systems you need to build."
            />
          </div>
        </div>

        <button
          type="submit"
          className="group mt-10 inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
        >
          {sent ? (
            <>
              Opening your email <Check className="size-4" />
            </>
          ) : (
            <>
              Send Inquiry
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-3 w-full border-b border-border bg-transparent pb-3 text-base outline-none transition-colors focus:border-foreground"
      />
    </div>
  )
}
