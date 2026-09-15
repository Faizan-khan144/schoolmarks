import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeProvider";

export default function DashboardLayout({ onBack }) {
  const [active, setActive] = useState("dashboard");
  const { colors, resolvedMode } = useTheme();

  const pageTitles = {
    dashboard: ["Dashboard", "School overview and academic insights"],
    students: ["Students", "Manage student records"],
    classes: ["Classes", "Manage school classes"],
    subjects: ["Subjects", "Manage academic subjects"],
    exams: ["Exams", "Create and manage examinations"],
    marks: ["Marks", "Enter and manage student marks"],
    results: ["Results", "View academic results and rankings"],
    attendance: ["Attendance", "Track student attendance"],
    performance: ["Performance", "Analyze academic performance"],
    notices: ["Notices", "Manage school announcements"],
    reports: ["Reports", "Generate school reports"],
    settings: ["Settings", "Configure your school system"]
  };

  const [title, subtitle] = pageTitles[active];

  return (
    <div className="dashboard-layout">
      <Sidebar active={active} setActive={setActive} />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <button className="back-button" onClick={onBack}>
              ← Public Website
            </button>

            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="header-actions">
            <button className="icon-button">⌕</button>
            <button className="icon-button">◷</button>

            <div className="profile">
              <div
                className="profile-avatar"
                style={{ background: colors.primary }}
              >
                FK
              </div>

              <div>
                <strong>Faizan Khan</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {active === "dashboard" ? (
          <DashboardHome colors={colors} resolvedMode={resolvedMode} />
        ) : (
          <div className="coming-page">
            <div
              className="coming-icon"
              style={{
                color: colors.primary,
                background: `${colors.primary}12`
              }}
            >
              {title.charAt(0)}
            </div>

            <h2>{title}</h2>
            <p>
              This module is part of the next SchoolMarks chapter.
            </p>

            <button
              className="primary-button"
              style={{ background: colors.primary }}
              onClick={() => setActive("dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function DashboardHome({ colors }) {
  return (
    <div className="dashboard-content">
      <div className="dashboard-welcome">
        <div>
          <span>OVERVIEW</span>
          <h2>Welcome back, Faizan.</h2>
          <p>Here is what's happening in your school today.</p>
        </div>

        <button
          className="primary-button"
          style={{ background: colors.primary }}
        >
          + Add Student
        </button>
      </div>

      <div className="dashboard-stats">
        {[
          ["Total Students", "1,248", "+8.4%", "ST"],
          ["Total Classes", "32", "+3.2%", "CL"],
          ["Average Score", "82.6%", "+5.8%", "AS"],
          ["Attendance", "94.8%", "+2.1%", "AT"]
        ].map(([label, value, change, icon]) => (
          <div className="dashboard-stat" key={label}>
            <div
              className="stat-icon"
              style={{
                color: colors.primary,
                background: `${colors.primary}12`
              }}
            >
              {icon}
            </div>

            <div>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{change} this month</small>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel performance-panel">
          <div className="panel-header">
            <div>
              <span>ACADEMIC ANALYTICS</span>
              <h3>Performance Overview</h3>
            </div>

            <select defaultValue="2026">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>

          <div className="large-chart">
            {[55, 72, 61, 80, 69, 88, 76, 92, 83, 96].map(
              (height, index) => (
                <div className="large-bar" key={index}>
                  <span
                    style={{
                      height: `${height}%`,
                      background: colors.primary
                    }}
                  />
                  <small>{index + 1}</small>
                </div>
              )
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span>QUICK STATS</span>
              <h3>School Overview</h3>
            </div>
          </div>

          <div className="overview-list">
            <div>
              <span>Present Today</span>
              <strong>1,183</strong>
            </div>

            <div>
              <span>Absent Today</span>
              <strong>65</strong>
            </div>

            <div>
              <span>Exams This Month</span>
              <strong>8</strong>
            </div>

            <div>
              <span>Active Subjects</span>
              <strong>24</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}