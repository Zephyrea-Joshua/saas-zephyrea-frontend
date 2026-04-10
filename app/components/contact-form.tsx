'use client'

import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-2xl font-bold text-zinc-900 dark:text-white">
          ¡Mensaje enviado!
        </span>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Te contactaremos en breve. Mientras tanto, revisa tu correo.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cf-name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
          >
            Nombre
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="cf-email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
          >
            Correo
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="tu@empresa.com"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="cf-message"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
        >
          Mensaje
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="Cuéntanos qué necesita tu empresa hoy…"
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-fit rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
