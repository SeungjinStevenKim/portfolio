import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
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
    } catch (err) {
      console.error(err);
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <section>
      <h1 style={{ marginTop: 0 }}>Contact</h1>
      <p style={{ color: "#374151" }}>
        Want to collaborate or have a question? Send a message below.
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 560 }}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={onChange}
          required
          style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 10 }}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={onChange}
          required
          style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 10 }}
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={6}
          value={form.message}
          onChange={onChange}
          required
          style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 10, resize: "vertical" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 14px", border: "1px solid #111827", borderRadius: 10, background: "#111827", color: "white", cursor: "pointer" }}
        >
          Send
        </button>
        {status ? <div style={{ color: "#374151" }}>{status}</div> : null}
      </form>
    </section>
  );
}
