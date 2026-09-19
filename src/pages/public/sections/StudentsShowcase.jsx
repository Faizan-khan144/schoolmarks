import React, { useState } from "react"
import {
  Activity,
  CalendarCheck,
  GraduationCap,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
  Users
} from "lucide-react"
import { Reveal } from "../../../components/Reveal"
import { Sparkline } from "../../../components/Charts"

const roster = [
  {
    id: 1,
    name: "Areeba Khan",
    className: "Class 9 · B",
    roll: "905",
    average: 91,
    attendance: 98,
    status: "Excellent",
    email: "areeba.khan@schoolmarks.edu",
    phone: "+92 300 901 0055",
    trend: [78, 82, 80, 85, 88, 91],
    activity: [
      ["Marks updated", "Mathematics · Quiz 1"],
      ["Attendance recorded", "Present · Sep 17"],
      ["Result generated", "Mid-term preview"]
    ]
  },
  {
    id: 2,
    name: "Hiba Fatima",
    className: "Class 9 · A",
    roll: "907",
    average: 87,
    attendance: 94,
    status: "Excellent",
    email: "hiba.fatima@schoolmarks.edu",
    phone: "+92 300 901 0077",
    trend: [70, 74, 79, 81, 85, 87],
    activity: [
      ["Assignment graded", "Computer Science · 92%"],
      ["Attendance recorded", "Present · Sep 17"],
      ["Profile updated", "Guardian details"]
    ]
  },
  {
    id: 3,
    name: "Ayaan Khan",
    className: "Class 9 · A",
    roll: "901",
    average: 82,
    attendance: 96,
    status: "Good",
    email: "ayaan.khan@schoolmarks.edu",
    phone: "+92 300 901 0011",
    trend: [68, 71, 70, 76, 80, 82],
    activity: [
      ["Marks recorded", "English · Quiz 1"],
      ["Attendance recorded", "Late · Sep 15"],
      ["Notice acknowledged", "Mid-term schedule"]
    ]
  },
  {
    id: 4,
    name: "Rayyan Malik",
    className: "Class 9 · C",
    roll: "906",
    average: 64,
    attendance: 79,
    status: "Attention",
    email: "rayyan.malik@schoolmarks.edu",
    phone: "+92 300 901 0066",
    trend: [72, 69, 65, 67, 63, 64],
    activity: [
      ["Marked for review", "Low attendance alert"],
      ["Marks recorded", "Physics · Quiz 1"],
      ["Attendance recorded", "Absent · Sep 14"]
    ]
  }
]

export default function StudentsShowcase() {
  const [selected, setSelected] = useState(0)
  const student = roster[selected]

  return (
    <section className="section students-showcase" id="students">
      <div className="section-inner">
        <Reveal>
          <div className="section-head is-left">
            <span className="section-eyebrow">
              <i />
              STUDENT MANAGEMENT
            </span>
            <h2>
              Every student, with their
              <br />
              whole academic story.
            </h2>
            <p className="section-lead">
              Profiles, classes, attendance, performance and recent activity live
              together — so opening a student tells you everything that matters.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="students-board">
          <div className="students-list-panel">
            <div className="students-list-toolbar">
              <div className="students-search">
                <Search size={15} />
                <span>Search students</span>
              </div>
              <span className="students-filter">
                <SlidersHorizontal size={14} />
              </span>
            </div>

            <div className="students-chips">
              <span className="active">All</span>
              <span>Class 9</span>
              <span>Excellent</span>
              <span>Attention</span>
            </div>

            <div className="students-list">
              {roster.map((item, index) => (
                <button
                  key={item.id}
                  className={`students-row ${index === selected ? "active" : ""}`}
                  onMouseEnter={() => setSelected(index)}
                  onFocus={() => setSelected(index)}
                  onClick={() => setSelected(index)}
                >
                  <span className="students-row-avatar">
                    {item.name.split(" ").map(part => part[0]).join("")}
                  </span>
                  <span className="students-row-main">
                    <strong>{item.name}</strong>
                    <small>
                      {item.className} · Roll {item.roll}
                    </small>
                  </span>
                  <span className={`students-row-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="student-profile-panel">
            <div className="student-profile-head">
              <span className="student-profile-avatar">
                {student.name.split(" ").map(part => part[0]).join("")}
              </span>
              <div>
                <h3>{student.name}</h3>
                <p>
                  {student.className} · Roll {student.roll}
                </p>
              </div>
              <span className="student-profile-badge">
                <ShieldCheck size={13} />
                {student.status}
              </span>
            </div>

            <div className="student-profile-metrics">
              <div>
                <span>
                  <TrendingUp size={13} /> Average
                </span>
                <strong>{student.average}%</strong>
              </div>
              <div>
                <span>
                  <CalendarCheck size={13} /> Attendance
                </span>
                <strong>{student.attendance}%</strong>
              </div>
              <div className="student-trend">
                <span>
                  <Activity size={13} /> Trend
                </span>
                <Sparkline data={student.trend} width={92} height={30} />
              </div>
            </div>

            <div className="student-profile-contact">
              <span>
                <Mail size={13} /> {student.email}
              </span>
              <span>
                <Phone size={13} /> {student.phone}
              </span>
            </div>

            <div className="student-activity">
              <div className="student-activity-head">
                <UserRound size={14} />
                Recent activity
              </div>
              {student.activity.map(([title, detail], index) => (
                <div
                  className="student-activity-row"
                  key={title + index}
                  style={{ "--activity-delay": `${index * 60}ms` }}
                >
                  <i />
                  <span>
                    <strong>{title}</strong>
                    <small>{detail}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200} className="showcase-features">
          {[
            { icon: Users, label: "Profiles & roll numbers" },
            { icon: GraduationCap, label: "Class & section assignment" },
            { icon: TrendingUp, label: "Performance history" },
            { icon: Activity, label: "Recent activity trail" }
          ].map(item => (
            <span className="showcase-feature" key={item.label}>
              <item.icon size={15} />
              {item.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}