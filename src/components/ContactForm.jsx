import React, { useState } from "react";

const API_URL = "https://vernanbackend.ezlab.in/api/contact-us/";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, errorMsg: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus({ loading: true, success: false, errorMsg: "" });

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server error: ${resp.status} ${text}`);
      }
      const data = await resp.json();
      // API returns created object — show success
      setStatus({ loading: false, success: true, errorMsg: "" });
      // show required success message text: "Form Submitted"
      // optionally reset form
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: false, errorMsg: err.message || "Submission failed" });
    }
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <small className="err">{errors.name}</small>}
      </label>

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <small className="err">{errors.email}</small>}
      </label>

      <label>
        Phone
        <input name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <small className="err">{errors.phone}</small>}
      </label>

      <label>
        Message
        <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
        {errors.message && <small className="err">{errors.message}</small>}
      </label>

      <div className="actions">
        <button type="submit" disabled={status.loading}>
          {status.loading ? "Sending..." : "Send Message"}
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            setForm({ name: "", email: "", phone: "", message: "" });
            setErrors({});
            setStatus({ loading: false, success: false, errorMsg: "" });
          }}
        >
          Reset
        </button>
      </div>

      {status.success && <div className="success">Form Submitted</div>}
      {status.errorMsg && <div className="err">Error: {status.errorMsg}</div>}
    </form>
  );
}
