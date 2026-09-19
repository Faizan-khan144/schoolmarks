import React from "react"
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  ShieldCheck,
  TrendingUp
} from "lucide-react"
import { Reveal } from "../../../components/Reveal"

const modules = [
  { title: "Dashboard", text: "A live academic overview", icon: LayoutDashboard },
  { title: "Students", text: "Profiles and full records", icon: GraduationCap },
  { title: "Classes", text: "Sections and teachers", icon: BookOpen },
  { title: "Subjects", text: "Curriculum structure", icon: ClipboardCheck },
  { title: "Marks", text: "Assessments and grading", icon: BarChart3 },
  { title: "Attendance", text: "Daily presence tracking", icon: CalendarCheck },
  { title: "Exams", text: "Schedules and timelines", icon: FileText },
  { title: "Results", text: "Calculated outcomes", icon: TrendingUp },
  { title: "Reports", text: "Shareable summaries", icon: FileText },
  { title: "Notices", text: "School-wide updates", icon: Megaphone },
  { title: "AI Assistant", text: "Academic intelligence", icon: BrainCircuit },
  { title: "Settings", text: "Control the workspace", icon: Settings }
]

export default function Ecosystem() {
  return (
    <section className="section ecosystem" id="platform">
      <div className="section-inner">
        <Reveal>
          <div className="section-head">
            <span className="section-eyebrow">
              <i />
              THE ECOSYSTEM
            </span>
            <h2>
              Many modules.
              <br />
              One academic core.
            </h2>
            <p className="section-lead">
              Every part of SchoolMarks reads from the same connected model, so a
              mark entered once flows into attendance trends, results, reports and
              AI insights.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="ecosystem-core">
          <span className="ecosystem-core-icon">
            <ShieldCheck size={20} />
          </span>
          <div>
            <strong>Connected academic records</strong>
            <span>Students · Marks · Attendance · Exams · Results · Analytics</span>
          </div>
        </Reveal>

        <div className="ecosystem-grid">
          {modules.map((module, index) => (
            <Reveal
              key={module.title}
              delay={(index % 4) * 70}
              className="module-card"
            >
              <span className="module-card-icon">
                <module.icon size={18} />
              </span>
              <strong>{module.title}</strong>
              <span>{module.text}</span>
              <i className="module-card-arrow" aria-hidden="true">
                →
              </i>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}