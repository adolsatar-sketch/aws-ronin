"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FadeIn } from "@/components/motion/FadeIn";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full border-b border-ronin-white/20 bg-transparent py-3 text-ronin-white placeholder:text-ronin-mist focus:border-ronin-red focus:outline-none transition-colors";

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errorField, setErrorField] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // React nullifies e.currentTarget once the handler yields, so grab the
    // form element itself now — not just its data — for use after the await.
    const formEl = e.currentTarget;
    setStatus("sending");
    setErrorField(null);

    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        formEl.reset();
      } else {
        setErrorField(data.field ?? null);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl text-ronin-white"
        role="status"
      >
        {t.contact.success}
      </motion.p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <FadeIn as="div" repeat>
          <label className="mb-2 block text-xs tracking-widest text-ronin-mist uppercase" htmlFor="name">
            {t.contact.name}
          </label>
          <input id="name" name="name" type="text" required className={fieldClass} />
          {errorField === "name" && <p className="mt-2 text-xs text-ronin-red">{t.contact.validation.name}</p>}
        </FadeIn>
        <FadeIn as="div" delay={0.05} repeat>
          <label className="mb-2 block text-xs tracking-widest text-ronin-mist uppercase" htmlFor="email">
            {t.contact.email}
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} />
          {errorField === "email" && <p className="mt-2 text-xs text-ronin-red">{t.contact.validation.email}</p>}
        </FadeIn>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <FadeIn as="div" delay={0.1} repeat>
          <label className="mb-2 block text-xs tracking-widest text-ronin-mist uppercase" htmlFor="projectType">
            {t.contact.projectType}
          </label>
          <select id="projectType" name="projectType" className={`${fieldClass} appearance-none`}>
            {t.contact.projectTypeOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-ronin-black">
                {opt}
              </option>
            ))}
          </select>
        </FadeIn>
        <FadeIn as="div" delay={0.15} repeat>
          <label className="mb-2 block text-xs tracking-widest text-ronin-mist uppercase" htmlFor="budget">
            {t.contact.budget}
          </label>
          <input id="budget" name="budget" type="text" className={fieldClass} />
        </FadeIn>
      </div>

      <FadeIn as="div" delay={0.2} repeat>
        <label className="mb-2 block text-xs tracking-widest text-ronin-mist uppercase" htmlFor="message">
          {t.contact.message}
        </label>
        <textarea id="message" name="message" rows={5} required className={fieldClass} />
        {errorField === "message" && <p className="mt-2 text-xs text-ronin-red">{t.contact.validation.message}</p>}
      </FadeIn>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="cursor-hover rounded-full bg-ronin-red px-8 py-3.5 text-sm font-semibold tracking-wide text-ronin-white uppercase transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-60"
        >
          {status === "sending" ? t.contact.sending : t.contact.send}
        </button>
        <AnimatePresence>
          {status === "error" && !errorField && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-ronin-red"
              role="alert"
            >
              {t.contact.error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
