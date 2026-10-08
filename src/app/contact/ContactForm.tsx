"use client";

import { useState, FormEvent } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const SUCCESS_MESSAGE =
  "Thank you for your message! I'll get back to you soon.";

const inputClass =
  "fields-input block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

// A TypeScript-style annotation after each label. Screen readers skip it,
// so the fields are still just "Name", "Email" and "Message".
function TypeHint() {
  return (
    <span aria-hidden="true" className="text-muted-foreground">
      : string
    </span>
  );
}

// Each field is a `fields` reveal item (see styles/motion/site.css): its
// underline draws, then its label drops in.
export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
      <div data-reveal-item>
        <label
          htmlFor="name"
          className="fields-label mb-2 block overflow-hidden font-mono text-sm font-medium text-card-foreground"
        >
          <span className="fields-label-text">
            Name
            <TypeHint />
          </span>
        </label>
        <div className="fields-control">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>
      </div>

      <div data-reveal-item>
        <label
          htmlFor="email"
          className="fields-label mb-2 block overflow-hidden font-mono text-sm font-medium text-card-foreground"
        >
          <span className="fields-label-text">
            Email
            <TypeHint />
          </span>
        </label>
        <div className="fields-control">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className={inputClass}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="md:col-span-2" data-reveal-item>
        <label
          htmlFor="message"
          className="fields-label mb-2 block overflow-hidden font-mono text-sm font-medium text-card-foreground"
        >
          <span className="fields-label-text">
            Message
            <TypeHint />
          </span>
        </label>
        <div className="fields-control">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="Your message..."
          />
        </div>
      </div>

      {/* Screen readers announce a live region's new text reliably only
          when the region is already in the page, so this one always is.
          The visible box below repeats it, hidden from them. */}
      <p role="status" className="sr-only">
        {status === "success" ? SUCCESS_MESSAGE : ""}
      </p>
      {status === "success" && (
        <div
          aria-hidden="true"
          className="fields-status rounded-lg md:col-span-2 bg-green-100 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-400"
        >
          {SUCCESS_MESSAGE}
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="fields-status rounded-lg md:col-span-2 bg-red-100 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        data-reveal-item
        className="fields-submit w-full rounded-lg md:col-span-2 bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
