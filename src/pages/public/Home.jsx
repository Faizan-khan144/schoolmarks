import React, { useEffect, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CalendarCheck,
  Menu,
  Sparkles,
  TrendingUp,
  Users,
  X
} from "lucide-react"
import { Reveal, CountUp } from "../../components/Reveal"
import { LineChart } from "../../components/Charts"
import { Logo } from "../../components/Logo"
import ProductPreview from "./sections/ProductPreview"
import WorkflowStory from "./sections/WorkflowStory"
import StudentsShowcase from "./sections/StudentsShowcase"
import MarksShowcase from "./sections/MarksShowcase"
import AttendanceShowcase from "./sections/AttendanceShowcase"
import ExamsShowcase from "./sections/ExamsShowcase"
import ResultsShowcase from "./sections/ResultsShowcase"
import AnalyticsShowcase from "./sections/AnalyticsShowcase"
import AIWorkspace from "./sections/AIWorkspace"
import HistoryStory from "./sections/HistoryStory"
import DashboardShowcase from "./sections/DashboardShowcase"
import Ecosystem from "./sections/Ecosystem"
import { FinalCta, Footer } from "./sections/CtaFooter"

const navLinks = [
  { label: "Product", href: "#preview" },
  { label: "Workflow", href: "#workflow" },
  { label: "Modules", href: "#students" },
  { label: "Analytics", href: "#analytics" },
  { label: "Intelligence", href: "#ai" }
]

const heroTrend = [
  { label: "Apr", value: 71 },
  { label: "May", value: 75 },
  { label: "Jun", value: 74 },
  { label: "Jul", value: 81 },
  { label: "Aug", value: 84 },
  { label: "Sep", value: 89 }
]

function Navigation({ onOpenApp }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="section-inner nav-inner">
        <a href="#top" className="nav-logo" aria-label="SchoolMarks home">
          <Logo />
        </a>

        <nav className="nav-links" aria-label="Sections">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="button button-ghost button-sm nav-signin" onClick={() => onOpenApp("dashboard")}>
            Open platform
          </button>
          <button className="button button-primary button-sm" onClick={() => onOpenApp("dashboard")}>
            Get started
            <ArrowRight size={15} className="arrow" />
          </button>
          <button
            className="nav-mobile-toggle"
            onClick={() => setOpen(current => !current)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`nav-mobile ${open ? "open" : ""}`}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <button className="button button-primary" onClick={() => onOpenApp("dashboard")}>
          Open the platform
          <ArrowRight size={16} className="arrow" />
        </button>
      </div>
    </header>
  )
}

function Hero({ onOpenApp }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="hero-grid-pattern" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-noise" />
      </div>

      <div className="section-inner hero-inner">
        <div className="hero-copy">
          <Reveal>
            <span className="hero-eyebrow">
              <i className="pulse-dot" />
              SCHOOL ACADEMIC MANAGEMENT
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1>
              Every student.
              <br />
              <span className="gradient-text">One academic history.</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="hero-lead">
              SchoolMarks connects students, marks, attendance, examinations and
              performance into one intelligent academic workspace — built for
              clarity from the first entry to the permanent record.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="hero-actions">
              <button className="button button-primary button-lg" onClick={() => onOpenApp("dashboard")}>
                Open the platform
                <ArrowRight size={17} className="arrow" />
              </button>
              <a className="button button-secondary button-lg" href="#workflow">
                See the workflow
              </a>
            </div>
          </Reveal>

          <Reveal delay={290}>
            <div className="hero-meta">
              <div className="hero-avatars">
                <span>AK</span>
                <span>HF</span>
                <span>MR</span>
                <span>SA</span>
              </div>
              <p>
                <strong>Built for modern schools</strong>
                <span>Students · Teachers · Administrators</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} variant="scale" className="hero-visual">
          <div className="hero-panel">
            <div className="hero-panel-bar">
              <span className="hero-panel-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="hero-panel-title">Academic overview · 2026</span>
              <span className="hero-panel-live">
                <i />
                Live
              </span>
            </div>

            <div className="hero-panel-body">
              <div className="hero-panel-stats">
                <div>
                  <span>
                    <Users size={13} /> Students
                  </span>
                  <strong>
                    <CountUp value={842} />
                  </strong>
                </div>
                <div>
                  <span>
                    <TrendingUp size={13} /> Average
                  </span>
                  <strong>
                    <CountUp value={87.4} decimals={1} suffix="%" />
                  </strong>
                </div>
                <div>
                  <span>
                    <CalendarCheck size={13} /> Attendance
                  </span>
                  <strong>
                    <CountUp value={94.8} decimals={1} suffix="%" />
                  </strong>
                </div>
              </div>

              <div className="hero-panel-chart">
                <div className="hero-panel-chart-head">
                  <span>Class performance</span>
                  <span className="hero-panel-badge">
                    <TrendingUp size={12} />
                    +8.4%
                  </span>
                </div>
                <LineChart data={heroTrend} height={150} />
              </div>

              <div className="hero-panel-ai">
                <span className="hero-panel-ai-icon">
                  <Sparkles size={14} />
                </span>
                <p>
                  <strong>AI insight</strong>
                  Mathematics shows a topic-level gap in Class 9.
                </p>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </div>

          <div className="hero-float hero-float-one">
            <span className="hero-float-icon">
              <BrainCircuit size={15} />
            </span>
            <div>
              <strong>AI analysis ready</strong>
              <small>Grounded in stored records</small>
            </div>
          </div>

          <div className="hero-float hero-float-two">
            <span className="hero-float-icon green">
              <TrendingUp size={15} />
            </span>
            <div>
              <strong>+12.8%</strong>
              <small>Term progress</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home({ onOpenApp }) {
  return (
    <div className="public-site">
      <Navigation onOpenApp={onOpenApp} />
      <Hero onOpenApp={onOpenApp} />

      <div className="trust-strip">
        <div className="trust-strip-inner">
          {[
            "Schools",
            "Academic Coordinators",
            "Class Teachers",
            "Administrators",
            "Examination Cells",
            "Student Records",
            "Schools",
            "Academic Coordinators",
            "Class Teachers",
            "Administrators",
            "Examination Cells",
            "Student Records"
          ].map((item, index) => (
            <span key={`${item}-${index}`}>
              <i />
              {item}
            </span>
          ))}
        </div>
      </div>

      <ProductPreview />
      <WorkflowStory />
      <StudentsShowcase />
      <MarksShowcase />
      <AttendanceShowcase />
      <ExamsShowcase />
      <ResultsShowcase />
      <AnalyticsShowcase />
      <AIWorkspace />
      <HistoryStory />
      <DashboardShowcase />
      <Ecosystem />

      <section className="section statement-section">
        <div className="section-inner statement-inner">
          <Reveal>
            <span className="section-eyebrow">
              <i />
              WHY SCHOOLMARKS
            </span>
            <h2>
              SchoolMarks isn’t just storing school data.
              <br />
              <span className="gradient-text">
                It turns academic activity into an organised, permanent system.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={120} className="statement-points">
            {[
              ["Connected by default", "Marks, attendance, exams and results share one model."],
              ["Clear at a glance", "Signals, not spreadsheets — every number has context."],
              ["Permanent by design", "Every entry becomes part of a student’s academic history."],
              ["Intelligent where it counts", "AI grounded in your real academic records."]
            ].map(item => (
              <div key={item[0]}>
                <strong>{item[0]}</strong>
                <span>{item[1]}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCta onOpenApp={onOpenApp} />
      <Footer onOpenApp={onOpenApp} />
    </div>
  )
}