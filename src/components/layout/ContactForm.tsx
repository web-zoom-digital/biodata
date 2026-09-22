"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "../ui/Button";

const field = "mt-1.5 block w-full rounded-xl border border-ink/15 bg-white px-3.5 text-base focus:border-brand focus:outline-2 focus:outline-brand/30";

/** No backend: the form opens the visitor's own email app with the message filled in. */
export function ContactForm() {
  const [error, setError] = useState("");

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = String(form.get("name") ?? "").trim();
        const email = String(form.get("email") ?? "").trim();
        const message = String(form.get("message") ?? "").trim();
        if (!name || !message) return setError("Please add your name and a message.");
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("That email address does not look right.");
        setError("");
        const body = `${message}\n\nFrom: ${name}${email ? ` (${email})` : ""}`;
        window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`${siteConfig.name} message from ${name}`)}&body=${encodeURIComponent(body)}`;
      }}
    >
      <div>
        <label htmlFor="c-name" className="text-sm font-medium">
          Your name
        </label>
        <input id="c-name" name="name" autoComplete="name" className={`${field} h-12`} />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-medium">
          Email (so we can reply)
        </label>
        <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" className={`${field} h-12`} />
      </div>
      <div>
        <label htmlFor="c-message" className="text-sm font-medium">
          Message
        </label>
        <textarea id="c-message" name="message" rows={6} className={`${field} py-3`} />
      </div>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg">
        <Mail className="size-5" aria-hidden="true" /> Open in my email app
      </Button>
      <p className="text-sm text-ink/60">This opens your email app with the message ready to send. Nothing is sent from this page.</p>
    </form>
  );
}
