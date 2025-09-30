// app/page.tsx
"use client";

import { useState } from "react";
import LikeButton from "../src/components/LikeButton"; // adjust if your component lives elsewhere

export default function Home() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(null);
    setSending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget) as any);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Bad response");
      setSent("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setSent("err");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-wrap">
          <div className="brand">
            <span className="dot" />
            ImaraLink
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a className="btn ghost" href="#features">Features</a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <span className="pill">Property & Asset Management</span>
            <h1 className="title">Manage properties the modern way.</h1>
            <p className="lead">
              Centralize leases, track maintenance, and keep owners in the loop.
              Blazing fast. Secure. Easy to use.
            </p>
            <div className="row">
              <div>
                <a className="btn" href="#contact">Request a demo</a>
                <span style={{ marginLeft: 12 }}><LikeButton id="hero-like" /></span>
              </div>
              <div className="muted">
                <strong>Live:</strong> <a href="/api/health">/api/health</a> returns <code>{"{ ok: true }"}</code>.
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div id="features" className="grid">
            <div className="card">
              <h3>Portfolio overview</h3>
              <p className="muted">Real-time occupancy, rent roll, and alerts in one place.</p>
            </div>
            <div className="card">
              <h3>Maintenance workflow</h3>
              <p className="muted">Intake → assign → track → close, with resident updates.</p>
            </div>
            <div className="card">
              <h3>Owner reporting</h3>
              <p className="muted">Share branded, exportable statements and insights.</p>
            </div>
          </div>

          {/* CONTACT */}
          <div id="contact" className="card" style={{ marginTop: 20 }}>
            <h3>Contact us</h3>
            <p className="muted" style={{ marginTop: -4 }}>We’ll get back to you within one business day.</p>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Jane Doe" required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="jane@company.com" required />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} placeholder="Tell us a bit about your needs…" required />
              </div>
              <div className="row" style={{ alignItems: "center" }}>
                <button className="btn" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Send message"}
                </button>
                {sent === "ok" && <span className="muted">✅ Thanks—message received.</span>}
                {sent === "err" && <span className="muted">❌ Something went wrong. Please try again.</span>}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-wrap">
          <div>© {new Date().getFullYear()} ImaraLink</div>
          <div style={{ display: "flex", gap: 14 }}>
            <a href="/robots.txt" className="muted">Robots</a>
            <a href="/sitemap.xml" className="muted">Sitemap</a>
          </div>
        </div>
      </footer>
    </>
  );
}
