"use client";

import { useState } from "react";

export default function InquiryForm({ listingId }: { listingId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setDone(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing_id: listingId,
          name,
          email: email || null,
          phone: phone || null,
          message,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json?.error || "Failed to send inquiry");
      } else {
        setDone("Inquiry sent. We’ll get back to you shortly.");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {err && <p className="text-red-600">{err}</p>}
      {done && <p className="text-green-700">{done}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded-lg border px-3 py-2"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email (optional)"
          className="rounded-lg border px-3 py-2"
        />
      </div>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        className="rounded-lg border px-3 py-2 w-full"
      />
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        rows={4}
        className="rounded-lg border px-3 py-2 w-full"
      />
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition disabled:opacity-60"
      >
        {busy ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
