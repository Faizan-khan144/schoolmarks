import React, { useState } from "react"
import {
  BarChart3,
  BrainCircuit,
  CalendarCheck,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react"
import { Reveal, CountUp } from "../../../components/Reveal"
import { Bars, LineChart, Ring } from "../../../components/Charts"
import { Frame } from "./SectionHead"

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "marks", label: "Marks", icon: BarChart3 },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "ai", label: "AI Insight", icon: BrainCircuit }
]

const performance = [
  { label: "Apr", value: 72 },
  { label: "May", value: 76 },
  { label: "Jun", value: 74 },
  { label: "Jul", value: 81 },
  { label: "Aug", value: 84 },
  { label: "Sep", value: 88 }
]

const weekly = [
  { label: "W1", value: 92 },
  { label: "W2", value: 95 },
  { label: "W3", value: 90 },
  { label: "W4", value: 96 }
]

const studentRows = [
  ["Areeba Khan", "9-B", "91%", "98%"],
  ["Hiba Fatima", "9-A", "87%", "94%"],
  ["Bilal Ahmed", "10-A", "61%", "88%"],
  ["Rayyan Malik", "9-C", "64%", "79%"]
]

export default function DashboardShowcase() {
  const [tab, setTab] = useState("overview")

  return (
    <section className="section dashboard-showcase" id="dashboard">
      <div className="section-inner">
        <Reveal>
          <div className="section-head">
            <span className="section-eyebrow">
              <i />
              INTERACTIVE DASHBOARD
            </span>
            <h2>
              Explore the workspace
              <br />
              from the landing page.
            </h2>
            <p className="section-lead">
              Switch between modules to preview how SchoolMarks presents academic
              data — the same experience continues inside the platform.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="dashboard-tabs">
            {tabs.map(item => (
              <button
                key={item.id}
                className={`dashboard-tab ${tab === item.id ? "active" : ""}`}
                onClick={() => setTab(item.id)}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160} className="dashboard-showcase-frame">
          <Frame title="schoolmarks.app/dashboard" toolbar={<span className="browser-badge">Interactive</span>}>
            <div className="demo-tab-body" key={tab}>
              {tab === "overview" && (
                <div className="demo-overview">
                  <div className="demo-kpis">
                    <div>
                      <span>Students</span>
                      <strong>
                        <CountUp value={842} />
                      </strong>
                      <em>+24 this term</em>
                    </div>
                    <div>
                      <span>Average</span>
                      <strong>
                        <CountUp value={87.4} decimals={1} suffix="%" />
                      </strong>
                      <em>+3.2%</em>
                    </div>
                    <div>
                      <span>Attendance</span>
                      <strong>
                        <CountUp value={94.8} decimals={1} suffix="%" />
                      </strong>
                      <em>+1.8%</em>
                    </div>
                    <div>
                      <span>At risk</span>
                      <strong>18</strong>
                      <em className="is-warn">Needs review</em>
                    </div>
                  </div>
                  <div className="demo-chart-panel">
                    <div className="demo-panel-head">
                      <span>Academic progress</span>
                      <span className="demo-badge">
                        <TrendingUp size={12} />
                        +8.4%
                      </span>
                    </div>
                    <LineChart data={performance} height={170} />
                  </div>
                </div>
              )}

              {tab === "students" && (
                <div className="demo-table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Class</th>
                        <th>Average</th>
                        <th>Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentRows.map(row => (
                        <tr key={row[0]}>
                          <td className="cell-person">
                            <span className="demo-avatar">
                              {row[0].split(" ").map(part => part[0]).join("")}
                            </span>
                            {row[0]}
                          </td>
                          <td>{row[1]}</td>
                          <td className="cell-strong cell-num">{row[2]}</td>
                          <td className="cell-num">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === "marks" && (
                <div className="demo-marks">
                  {[
                    ["Mathematics", 78],
                    ["Physics", 84],
                    ["English", 90],
                    ["Computer Science", 94]
                  ].map(item => (
                    <div className="demo-mark-row" key={item[0]}>
                      <span>{item[0]}</span>
                      <div className="demo-mark-bar">
                        <i style={{ width: `${item[1]}%` }} />
                      </div>
                      <strong>{item[1]}%</strong>
                    </div>
                  ))}
                </div>
              )}

              {tab === "attendance" && (
                <div className="demo-attendance">
                  <Ring value={94.8} size={150} stroke={12} label="94.8%" sub="Overall" />
                  <div className="demo-attendance-bars">
                    <Bars data={weekly} height={140} />
                  </div>
                </div>
              )}

              {tab === "ai" && (
                <div className="demo-ai">
                  <div className="demo-ai-head">
                    <span className="demo-ai-orb">
                      <Sparkles size={15} />
                    </span>
                    <div>
                      <strong>SchoolMarks AI</strong>
                      <small>Performance signal</small>
                    </div>
                  </div>
                  <p>
                    Mathematics performance dropped across the last two
                    assessments for 18 students in Class 9. Attendance for the
                    same group remains strong, suggesting a topic-level gap rather
                    than an engagement issue.
                  </p>
                  <div className="demo-ai-actions">
                    <span>Review students</span>
                    <span>View marks</span>
                  </div>
                </div>
              )}
            </div>
          </Frame>
        </Reveal>
      </div>
    </section>
  )
}