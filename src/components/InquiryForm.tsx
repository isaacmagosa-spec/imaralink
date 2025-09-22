"use client";

import { useState } from "react";

export default function InquiryForm({ listingId }: { listingId: string }) {
  const [status, setStatus] =
    useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const payload = {
      listing_id: listingId,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value || null,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value || null,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value || null,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || res.statusText);
      }

      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Failed to send inquiry.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded border px-3 py-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email (optional)"
        className="w-full rounded border px-3 py-2"
      />
      <input
        name="phone"
        placeholder="Phone (optional)"
        className="w-full rounded border px-3 py-2"
      />
      <textarea
        name="message"
        rows={4}
        placeholder="Message (optional)"
        className="w-full rounded border px-3 py-2"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition"
      >
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>

      {status === "success" && (
        <p className="text-green-700">Thanks — we received your inquiry.</p>
      )}
      {status === "error" && (
        <p className="text-red-600">Error: {error}</p>
      )}
    </form>
  );
}
