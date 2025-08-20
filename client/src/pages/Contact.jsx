import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("Thanks! I’ll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (e2) {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <section className="section card" id="contact">
      <h1>Contact</h1>
      <p>Want to collaborate or have a question? Send a message below.</p>
      <form onSubmit={onSubmit} className="grid" style={{ gap: 12, maxWidth: 560, marginTop: 8 }}>
        <input
          className="card"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={onChange}
          required
          style={{ padding: 12 }}
        />
        <input
          className="card"
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={onChange}
          required
          style={{ padding: 12 }}
        />
        <textarea
          className="card"
          name="message"
          placeholder="Your message"
          rows={6}
          value={form.message}
          onChange={onChange}
          required
          style={{ padding: 12, resize: "vertical" }}
        />
        <button
          type="submit"
          className="badge"
          style={{ padding: "10px 14px", cursor: "pointer", borderColor: "#334155", color: "white" }}
        >
          Send
        </button>
        {status ? <div style={{ color: "#9ca3af" }}>{status}</div> : null}
      </form>
    </section>
  );
}
