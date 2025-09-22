"use client";

import { useState } from "react";

type Props = {
  listingId: string;
};

export default function InquiryForm({ listingId }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      listing_id: listingId,
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Redirect to success page
        window.location.href = `/listing/${listingId}/contact/success`;
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Something went wrong. Please try again.");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {error ? (
        <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          className="rounded-lg border px-3 py-2"
          placeholder="Jane Doe"
          disabled={pending}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          className="rounded-lg border px-3 py-2"
          placeholder="jane@example.com"
          disabled={pending}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          required
          className="rounded-lg border px-3 py-2"
          placeholder="0700 000 000"
          disabled={pending}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={8}
          className="min-h-[90px] rounded-lg border px-3 py-2"
          placeholder="I am interested in this listing."
          disabled={pending}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
