import React from "react"
import {
  BrainCircuit,
  CalendarCheck,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react"
import { Reveal, CountUp } from "../../../components/Reveal"
import { LineChart, Ring } from "../../../components/Charts"

const performance = [
  { label: "Apr", value: 71 },
  { label: "May", value: 76 },
  { label: "Jun", value: 74 },
  { label: "Jul", value: 82 },
  { label: "Aug", value: 85 },
  { label: "Sep", value: 89 }
]

const students = [
  { name: "Areeba Khan", className: "9-B", average: 91, attendance: 98, status: "Excellent" },
  { name: "Hiba Fatima", className: "9-A", average: 87, attendance: 94, status: "Excellent" },
  { name: "Ayaan Khan", className: "9-A", average: 82, attendance: 96, status: "Good" },
  { name: "Bilal Ahmed", className: "10-A", average: 61, attendance: 88, status: "Attention" }
]

const initials = name =>
  name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)

export default function ProductPreview() {
  return (
    <section className="section preview-section" id="preview">
      <div className="section-inner">
        <Reveal>
          <div className="section-head">
            <span className="section-eyebrow">
              <i />
              THE PRODUCT
            </span>
            <h2>
              A workspace that reflects
              <br />
              the way schools actually work.
            </h2>
            <p className="section-lead">
              Live numbers, connected records and clear signals — the SchoolMarks
              dashboard turns everyday academic activity into a single view.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="preview-stage">
          <div className="preview-glow" />

          <div className="dash-mock">
            <aside className="dash-mock-sidebar">
              <div className="dash-mock-logo">
                <span className="logo-mark">
                  <img src="/logo/schoolmarks-logo.png" alt="" width="22" height="22" />
                </span>
                <strong>SchoolMarks</strong>
              </div>

              <nav>
                {[
                  { label: "Dashboard", icon: LayoutDashboard, active: true },
                  { label: "Students", icon: Users },
                  { label: "Attendance", icon: CalendarCheck },
                  { label: "Performance", icon: TrendingUp },
                  { label: "AI Assistant", icon: BrainCircuit }
                ].map(item => (
                  <span
                    key={item.label}
                    className={item.active ? "active" : ""}
                  >
                    <item.icon size={15} />
                    {item.label}
                  </span>
                ))}
              </nav>

              <div className="dash-mock-profile">
                <span className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>
                  SA
                </span>
                <div>
                  <strong>School Admin</strong>
                  <small>Administrator</small>
                </div>
              </div>
            </aside>

            <div className="dash-mock-main">
              <div className="dash-mock-topbar">
                <div>
                  <small>ACADEMIC OVERVIEW</small>
                  <strong>Good morning, Admin</strong>
                </div>
                <span className="dash-mock-live">
                  <i />
                  Live
                </span>
              </div>

              <div className="dash-mock-kpis">
                <div>
                  <span>
                    <Users size={14} /> Students
                  </span>
                  <strong>
                    <CountUp value={842} />
                  </strong>
                  <em>+24 this term</em>
                </div>
                <div>
                  <span>
                    <TrendingUp size={14} /> Average
                  </span>
                  <strong>
                    <CountUp value={87.4} decimals={1} suffix="%" />
                  </strong>
                  <em>+3.2% vs last term</em>
                </div>
                <div>
                  <span>
                    <CalendarCheck size={14} /> Attendance
                  </span>
                  <strong>
                    <CountUp value={94.8} decimals={1} suffix="%" />
                  </strong>
                  <em>+1.8% this month</em>
                </div>
              </div>

              <div className="dash-mock-grid">
                <div className="dash-mock-chart">
                  <div className="dash-mock-card-head">
                    <div>
                      <small>PERFORMANCE</small>
                      <strong>Academic progress</strong>
                    </div>
                    <span className="dash-mock-badge">
                      <TrendingUp size={12} />
                      +8.4%
                    </span>
                  </div>
                  <LineChart data={performance} height={148} />
                </div>

                <div className="dash-mock-side-card">
                  <div className="dash-mock-card-head">
                    <div>
                      <small>ATTENDANCE</small>
                      <strong>This month</strong>
                    </div>
                  </div>
                  <Ring value={94.8} size={128} stroke={11} label="94.8%" sub="Present" />
                  <div className="dash-mock-mini-stats">
                    <span>
                      <b>41</b> Present
                    </span>
                    <span>
                      <b>2</b> Absent
                    </span>
                  </div>
                </div>
              </div>

              <div className="dash-mock-ai">
                <div className="dash-mock-ai-icon">
                  <Sparkles size={15} />
                </div>
                <div>
                  <strong>AI insight</strong>
                  <p>
                    18 students show a drop in Mathematics across the last two
                    assessments. Review before the mid-term.
                  </p>
                </div>
                <span className="dash-mock-ai-action">Review</span>
              </div>

              <div className="dash-mock-table">
                <div className="dash-mock-table-head">
                  <span>Student</span>
                  <span>Class</span>
                  <span>Average</span>
                  <span>Attendance</span>
                  <span>Status</span>
                </div>
                {students.map((student, index) => (
                  <div
                    className="dash-mock-table-row"
                    key={student.name}
                    style={{ "--row-delay": `${index * 70}ms` }}
                  >
                    <span className="dash-mock-table-name">
                      <i>{initials(student.name)}</i>
                      {student.name}
                    </span>
                    <span>{student.className}</span>
                    <strong>{student.average}%</strong>
                    <span>{student.attendance}%</span>
                    <span className={`mock-status ${student.status.toLowerCase().replace(" ", "-")}`}>
                      {student.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}