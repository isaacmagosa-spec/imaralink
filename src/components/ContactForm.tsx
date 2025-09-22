"use client";

import { useState } from "react";

export default function ContactForm({ listingId }: { listingId: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing_id: listingId,
          name,
          phone: phone || null,
          message: message || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Failed");
      } else {
        setOk("Sent! We’ll contact you shortly.");
        setName("");
        setPhone("");
        setMessage("");
      }
    } catch (e) {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 p-4 border rounded-xl">
      <h3 className="font-semibold">Contact the agent</h3>
      {ok && <p className="text-green-600 text-sm">{ok}</p>}
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <input
        className="w-full border rounded-lg px-3 h-10"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border rounded-lg px-3 h-10"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <textarea
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Message (optional)"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="h-10 px-4 rounded-lg bg-blue-600 text-white disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
