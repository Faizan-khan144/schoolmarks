import React from "react"
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react"
import { Reveal } from "../../../components/Reveal"
import { Logo } from "../../../components/Logo"

export function FinalCta({ onOpenApp }) {
  return (
    <section className="section final-cta">
      <div className="section-inner">
        <Reveal className="final-cta-panel">
          <div className="final-cta-glow" />
          <div className="final-cta-grid" />
          <span className="section-eyebrow is-light">
            <i />
            BUILT FOR CLARITY
          </span>
          <h2>
            Turn academic activity into
            <br />
            a permanent academic record.
          </h2>
          <p>
            SchoolMarks isn’t just storing school data. It turns everyday
            academic work into an organised, understandable system — for every
            student, every term.
          </p>

          <div className="final-cta-actions">
            <button className="button button-light button-lg" onClick={() => onOpenApp("dashboard")}>
              Open the platform
              <ArrowRight size={17} className="arrow" />
            </button>
            <button className="button button-dark-ghost button-lg" onClick={() => onOpenApp("ai")}>
              <Sparkles size={16} />
              Try the AI workspace
            </button>
          </div>

          <div className="final-cta-trust">
            <span>
              <ShieldCheck size={15} />
              Local-first storage
            </span>
            <span>
              <ShieldCheck size={15} />
              No external account required
            </span>
            <span>
              <ShieldCheck size={15} />
              Data survives refresh
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer({ onOpenApp }) {
  const columns = [
    {
      title: "Platform",
      links: [
        ["Dashboard", "dashboard"],
        ["Students", "students"],
        ["Marks", "marks"],
        ["Attendance", "attendance"]
      ]
    },
    {
      title: "Academics",
      links: [
        ["Exams", "exams"],
        ["Results", "results"],
        ["Performance", "performance"],
        ["Reports", "reports"]
      ]
    },
    {
      title: "Intelligence",
      links: [
        ["AI Assistant", "ai"],
        ["Notices", "notices"],
        ["Profile", "profile"],
        ["Settings", "settings"]
      ]
    }
  ]

  return (
    <footer className="site-footer">
      <div className="section-inner footer-grid">
        <div className="footer-brand">
          <Logo dark />
          <p>
            Modern academic management, built for clarity. Every student’s marks,
            attendance and performance in one connected system.
          </p>
          <span className="footer-badge">
            <ShieldCheck size={14} />
            Academic records stored locally in your browser
          </span>
        </div>

        <div className="footer-links">
          {columns.map(column => (
            <div key={column.title}>
              <strong>{column.title}</strong>
              {column.links.map(([label, page]) => (
                <button key={page} onClick={() => onOpenApp(page)}>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="section-inner footer-bottom">
        <span>© 2026 SchoolMarks</span>
        <span>Modern academic management, built for clarity.</span>
      </div>
    </footer>
  )
}