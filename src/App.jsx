import React from "react";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-inner">
          <h1 className="title">EZ Labs</h1>
          <p className="subtitle">Turning ideas into clean web experiences</p>
        </div>
      </header>

      <main className="main">
        <section className="about">
          <div>
            <h2>Welcome</h2>
            <p>
              This is a single-page implementation of the EZ Labs home design.
              The contact form is below — submit it to test the API integration.
            </p>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-card">
            <h3>Contact Us</h3>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} EZ Labs — Sample assignment</p>
      </footer>
    </div>
  );
}
