import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Code2,
  Database,
  Edit3,
  FileBarChart,
  FileCheck2,
  FileText,
  GraduationCap,
  Home,
  Layers3,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  PenLine,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trash2,
  TrendingUp,
  User,
  Users,
  X,
  Zap
} from "lucide-react";
import Exams from "./pages/system/Exams";

const logoPath = "/logo/schoolmarks-logo.png";

const seedStudents = [
  {
    id: "STU-001",
    name: "Ayaan Ahmed",
    roll: "09-001",
    className: "Class 9-A",
    gender: "Male",
    status: "Active",
    attendance: 94,
    average: 88
  },
  {
    id: "STU-002",
    name: "Sara Khan",
    roll: "09-002",
    className: "Class 9-A",
    gender: "Female",
    status: "Active",
    attendance: 97,
    average: 92
  },
  {
    id: "STU-003",
    name: "Hamza Ali",
    roll: "09-003",
    className: "Class 9-A",
    gender: "Male",
    status: "Active",
    attendance: 89,
    average: 81
  },
  {
    id: "STU-004",
    name: "Hania Raza",
    roll: "09-004",
    className: "Class 9-A",
    gender: "Female",
    status: "Active",
    attendance: 96,
    average: 95
  },
  {
    id: "STU-005",
    name: "Usman Tariq",
    roll: "09-005",
    className: "Class 9-B",
    gender: "Male",
    status: "Active",
    attendance: 84,
    average: 76
  },
  {
    id: "STU-006",
    name: "Maham Noor",
    roll: "09-006",
    className: "Class 9-B",
    gender: "Female",
    status: "Active",
    attendance: 91,
    average: 86
  },
  {
    id: "STU-007",
    name: "Zain Malik",
    roll: "10-A-001",
    className: "Class 10-A",
    gender: "Male",
    status: "Active",
    attendance: 93,
    average: 89
  },
  {
    id: "STU-008",
    name: "Anaya Hassan",
    roll: "10-A-002",
    className: "Class 10-A",
    gender: "Female",
    status: "Active",
    attendance: 98,
    average: 96
  }
];

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    id: "students",
    label: "Students",
    icon: Users
  },
  {
    id: "academics",
    label: "Academics",
    icon: BookOpen
  },
  {
    id: "exams",
    label: "Exams",
    icon: ClipboardCheck
  },
  {
    id: "marks",
    label: "Marks",
    icon: PenLine
  },
  {
    id: "results",
    label: "Results",
    icon: FileCheck2
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: CalendarDays
  },
  {
    id: "performance",
    label: "Performance",
    icon: TrendingUp
  }
];

const workflowSteps = [
  {
    number: "01",
    title: "Scan",
    description: "Capture student records, marks and attendance in seconds.",
    icon: Search
  },
  {
    number: "02",
    title: "Process",
    description: "SchoolMarks organizes academic information automatically.",
    icon: Database
  },
  {
    number: "03",
    title: "Understand",
    description: "Turn raw academic data into clear insights.",
    icon: Brain
  },
  {
    number: "04",
    title: "Preserve",
    description: "Keep every important academic record available for the future.",
    icon: ShieldCheck
  }
];

const aiQuestions = [
  "Which students need academic support?",
  "Which class has the strongest average?",
  "Show students with attendance below 75%.",
  "Which subjects need the most attention?",
  "Who are the top performing students?",
  "Compare Class 9-A and Class 9-B.",
  "Find students with both low marks and low attendance.",
  "Summarize this month's academic performance.",
  "Which students improved the most?",
  "What should teachers focus on next?"
];

const subjects = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Urdu",
  "Pakistan Studies"
];

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    const animate = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "" }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`${className} reveal ${visible ? "reveal-visible" : ""}`}
    >
      {children}
    </div>
  );
}

function Logo({ compact = false }) {
  return (
    <div className={`brand-logo ${compact ? "brand-logo-compact" : ""}`}>
      <img src={logoPath} alt="SchoolMarks" />
    </div>
  );
}

function Toast({ toast, close }) {
  if (!toast) {
    return null;
  }

  return (
    <div className="toast">
      <div className="toast-icon">
        <CheckCircle2 size={18} />
      </div>

      <div>
        <strong>{toast.title}</strong>
        <span>{toast.message}</span>
      </div>

      <button onClick={close}>
        <X size={16} />
      </button>
    </div>
  );
}

function CountMetric({ value, suffix = "", label }) {
  const count = useCountUp(value);

  return (
    <div className="count-metric">
      <strong>
        {count}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview">
      <div className="preview-glow" />

      <div className="preview-window">
        <div className="preview-topbar">
          <div className="preview-dots">
            <span />
            <span />
            <span />
          </div>

          <div className="preview-search">
            <Search size={12} />
            Search anything
          </div>

          <div className="preview-avatar">SA</div>
        </div>

        <div className="preview-body">
          <div className="preview-sidebar">
            <div className="preview-mini-logo">
              <Logo compact />
            </div>

            {[
              LayoutDashboard,
              Users,
              BookOpen,
              ClipboardCheck,
              PenLine,
              TrendingUp
            ].map((Icon, index) => (
              <div
                className={`preview-side-icon ${
                  index === 0 ? "active" : ""
                }`}
                key={index}
              >
                <Icon size={13} />
              </div>
            ))}
          </div>

          <div className="preview-content">
            <div className="preview-heading">
              <div>
                <span>Overview</span>
                <strong>Good morning, School Admin</strong>
              </div>

              <button>
                <Plus size={12} />
                Add record
              </button>
            </div>

            <div className="preview-stats">
              <div>
                <span>Total students</span>
                <strong>1,284</strong>
                <small>
                  <ArrowUpRight size={10} />
                  8.4%
                </small>
              </div>

              <div>
                <span>Attendance</span>
                <strong>91.8%</strong>
                <small>
                  <ArrowUpRight size={10} />
                  2.1%
                </small>
              </div>

              <div>
                <span>Average score</span>
                <strong>84.6%</strong>
                <small>
                  <ArrowUpRight size={10} />
                  4.7%
                </small>
              </div>
            </div>

            <div className="preview-main-grid">
              <div className="preview-chart-card">
                <div className="preview-card-title">
                  <span>Academic performance</span>
                  <MoreHorizontal size={13} />
                </div>

                <div className="fake-chart">
                  <div className="chart-line chart-line-one" />
                  <div className="chart-line chart-line-two" />
                  <div className="chart-line chart-line-three" />
                  <div className="chart-area" />
                </div>
              </div>

              <div className="preview-list-card">
                <div className="preview-card-title">
                  <span>Top students</span>
                  <ChevronRight size={13} />
                </div>

                {[
                  ["AH", "Anaya Hassan", "96%"],
                  ["HN", "Hania Raza", "95%"],
                  ["SK", "Sara Khan", "92%"]
                ].map(student => (
                  <div className="preview-student" key={student[1]}>
                    <div className="preview-student-avatar">
                      {student[0]}
                    </div>

                    <div>
                      <strong>{student[1]}</strong>
                      <span>Class 10-A</span>
                    </div>

                    <b>{student[2]}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Workflow() {
  return (
    <section className="workflow-section">
      <div className="section-container">
        <Reveal className="section-intro">
          <span className="eyebrow">Simple by design</span>
          <h2>From scan to permanent history.</h2>
          <p>
            SchoolMarks turns everyday school activity into organized,
            searchable and useful academic history.
          </p>
        </Reveal>

        <div className="workflow-grid">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal
                className="workflow-card"
                key={step.number}
              >
                <div className="workflow-number">{step.number}</div>

                <div className="workflow-icon">
                  <Icon size={22} />
                </div>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="workflow-arrow" size={18} />
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeAI({ navigate }) {
  const [selected, setSelected] = useState(aiQuestions[0]);

  return (
    <section className="home-ai-section">
      <div className="section-container">
        <Reveal className="ai-showcase">
          <div className="ai-copy">
            <span className="eyebrow">School intelligence</span>

            <h2>
              Ask your school data
              <span> better questions.</span>
            </h2>

            <p>
              Explore student performance, attendance and academic trends
              through a simple AI workspace built around your school's data.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("ai")}
            >
              Open AI workspace
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="ai-panel">
            <div className="ai-panel-top">
              <div className="ai-panel-title">
                <div className="ai-icon">
                  <Sparkles size={17} />
                </div>

                <div>
                  <strong>SchoolMarks AI</strong>
                  <span>Academic assistant</span>
                </div>
              </div>

              <span className="ai-status">
                <i />
                Ready
              </span>
            </div>

            <div className="ai-question">
              <span>Your question</span>
              <strong>{selected}</strong>
            </div>

            <div className="ai-answer">
              <div className="ai-answer-icon">
                <Brain size={16} />
              </div>

              <div>
                <span>SchoolMarks AI</span>
                <p>
                  I can analyze student records, attendance and marks to
                  generate a useful academic summary for this question.
                </p>
              </div>
            </div>

            <div className="ai-chips">
              {aiQuestions.slice(0, 4).map(question => (
                <button
                  key={question}
                  className={selected === question ? "active" : ""}
                  onClick={() => setSelected(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomePage({ navigate }) {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-grid" />

        <div className="hero-container">
          <Reveal className="hero-copy">
            <div className="hero-badge">
              <span className="status-dot" />
              Modern academic management
            </div>

            <h1>
              School data,
              <br />
              <span>made simple.</span>
            </h1>

            <p>
              SchoolMarks gives schools one clean place to manage students,
              academics, exams, marks, attendance and performance.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => navigate("dashboard")}
              >
                Open dashboard
                <ArrowRight size={17} />
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("ai")}
              >
                Explore AI
                <Sparkles size={16} />
              </button>
            </div>

            <div className="hero-metrics">
              <CountMetric
                value={1284}
                label="Students managed"
                suffix="+"
              />

              <CountMetric
                value={92}
                label="Average attendance"
                suffix="%"
              />

              <CountMetric
                value={100}
                label="Digital records"
                suffix="%"
              />
            </div>
          </Reveal>

          <Reveal className="hero-visual">
            <ProductPreview />
          </Reveal>
        </div>
      </section>

      <Workflow />

      <section className="feature-section">
        <div className="section-container">
          <Reveal className="section-intro">
            <span className="eyebrow">One connected system</span>
            <h2>Everything academic. One workspace.</h2>
            <p>
              Replace disconnected spreadsheets and scattered records with a
              consistent school management experience.
            </p>
          </Reveal>

          <div className="feature-grid">
            {[
              {
                icon: Users,
                title: "Student management",
                text: "Keep profiles, classes and academic history organized."
              },
              {
                icon: ClipboardCheck,
                title: "Exams",
                text: "Create and manage examinations with dates, classes and subjects."
              },
              {
                icon: PenLine,
                title: "Marks",
                text: "Record results and make academic progress easier to understand."
              },
              {
                icon: CalendarDays,
                title: "Attendance",
                text: "Track daily attendance and identify patterns quickly."
              },
              {
                icon: BarChart3,
                title: "Performance",
                text: "Turn marks into clear performance insights."
              },
              {
                icon: Brain,
                title: "AI workspace",
                text: "Ask questions about your academic data and get useful summaries."
              }
            ].map(feature => {
              const Icon = feature.icon;

              return (
                <Reveal className="feature-card" key={feature.title}>
                  <div className="feature-icon">
                    <Icon size={21} />
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>

                  <ArrowUpRight
                    className="feature-arrow"
                    size={18}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <HomeAI navigate={navigate} />

      <section className="cta-section">
        <div className="section-container">
          <Reveal className="cta-card">
            <div>
              <span className="eyebrow">Built for schools</span>
              <h2>Ready to make academic management simpler?</h2>
              <p>
                Start with the dashboard and keep every important record
                connected.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => navigate("dashboard")}
            >
              Enter SchoolMarks
              <ArrowRight size={17} />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Sidebar({ page, setPage, collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <Logo compact={!collapsed} />

        {!collapsed && (
          <div className="sidebar-brand-copy">
            <strong>SchoolMarks</strong>
            <span>Academic OS</span>
          </div>
        )}
      </div>

      <div className="sidebar-section-label">
        {!collapsed && "Workspace"}
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;

          return (
            <button
              className={`sidebar-link ${
                page === item.id ? "active" : ""
              }`}
              onClick={() => setPage(item.id)}
              key={item.id}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-section-label sidebar-secondary-label">
        {!collapsed && "System"}
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-link ${page === "ai" ? "active" : ""}`}
          onClick={() => setPage("ai")}
          title={collapsed ? "AI workspace" : undefined}
        >
          <Sparkles size={18} />
          {!collapsed && <span>AI workspace</span>}
        </button>

        <button
          className={`sidebar-link ${
            page === "profile" ? "active" : ""
          }`}
          onClick={() => setPage("profile")}
          title={collapsed ? "Profile" : undefined}
        >
          <User size={18} />
          {!collapsed && <span>Profile</span>}
        </button>

        <button
          className={`sidebar-link ${
            page === "settings" ? "active" : ""
          }`}
          onClick={() => setPage("settings")}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>
      </nav>

      <button
        className="sidebar-collapse"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight size={17} />
        ) : (
          <>
            <ChevronDown size={17} />
            <span>Collapse sidebar</span>
          </>
        )}
      </button>
    </aside>
  );
}

function Topbar({ profile, page, setPage }) {
  const current =
    navItems.find(item => item.id === page) ||
    [
      { id: "ai", label: "AI workspace" },
      { id: "profile", label: "Profile" },
      { id: "settings", label: "Settings" }
    ].find(item => item.id === page);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <span className="topbar-overline">SchoolMarks</span>
          <h1>{current?.label || "Dashboard"}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="icon-button">
          <Search size={18} />
        </button>

        <button className="icon-button notification-button">
          <Bell size={18} />
          <i />
        </button>

        <button
          className="profile-trigger"
          onClick={() => setPage("profile")}
        >
          <div className="profile-avatar">
            {profile.name
              ?.split(" ")
              .map(part => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="profile-trigger-copy">
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </div>

          <ChevronDown size={15} />
        </button>
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  suffix = "",
  change,
  icon: Icon,
  positive = true
}) {
  const numeric = Number(String(value).replace(/,/g, ""));
  const count = useCountUp(Number.isFinite(numeric) ? numeric : 0);

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>

        <span
          className={`stat-change ${
            positive ? "positive" : "negative"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}
          {change}
        </span>
      </div>

      <div className="stat-value">
        {typeof value === "number" ? count.toLocaleString() : value}
        {suffix}
      </div>

      <span className="stat-label">{label}</span>
    </div>
  );
}

function DashboardPage({ navigate, students }) {
  const totalStudents = students.length;
  const average =
    students.length > 0
      ? Math.round(
          students.reduce(
            (sum, student) => sum + Number(student.average || 0),
            0
          ) / students.length
        )
      : 0;

  const attendance =
    students.length > 0
      ? Math.round(
          students.reduce(
            (sum, student) => sum + Number(student.attendance || 0),
            0
          ) / students.length
        )
      : 0;

  const topStudents = [...students]
    .sort((a, b) => Number(b.average) - Number(a.average))
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <div>
          <span className="eyebrow">Overview</span>
          <h2>Good morning, School Admin.</h2>
          <p>
            Here's what's happening across your academic workspace.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("students")}
        >
          <Plus size={17} />
          Add student
        </button>
      </section>

      <section className="stats-grid">
        <StatCard
          label="Total students"
          value={totalStudents}
          change="8.4%"
          icon={Users}
        />

        <StatCard
          label="Average attendance"
          value={attendance}
          suffix="%"
          change="2.1%"
          icon={CalendarDays}
        />

        <StatCard
          label="Average score"
          value={average}
          suffix="%"
          change="4.7%"
          icon={BarChart3}
        />

        <StatCard
          label="Active classes"
          value={6}
          change="1 new"
          icon={GraduationCap}
        />
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card performance-card">
          <div className="dashboard-card-header">
            <div>
              <span>Academic performance</span>
              <h3>Performance overview</h3>
            </div>

            <button>
              This term
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="performance-chart">
            <div className="chart-y">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            <div className="chart-area-large">
              <div className="chart-grid-lines">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <svg
                viewBox="0 0 700 250"
                preserveAspectRatio="none"
                className="performance-svg"
              >
                <path
                  d="M0 190 C60 175 85 185 130 145 C180 100 215 125 260 118 C305 110 330 80 375 95 C420 110 450 74 500 72 C550 70 580 45 620 58 C655 70 675 42 700 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              <div className="chart-months">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <span>Students</span>
              <h3>Top performers</h3>
            </div>

            <button onClick={() => navigate("students")}>
              View all
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="student-mini-list">
            {topStudents.map((student, index) => (
              <div className="student-mini-row" key={student.id}>
                <div className="rank">{index + 1}</div>

                <div className="mini-avatar">
                  {student.name
                    .split(" ")
                    .map(part => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="mini-student-copy">
                  <strong>{student.name}</strong>
                  <span>{student.className}</span>
                </div>

                <b>{student.average}%</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-bottom-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <span>Quick actions</span>
              <h3>Common tasks</h3>
            </div>
          </div>

          <div className="quick-actions">
            {[
              ["students", Users, "Students"],
              ["exams", ClipboardCheck, "Create exam"],
              ["marks", PenLine, "Enter marks"],
              ["attendance", CalendarDays, "Attendance"]
            ].map(([id, Icon, label]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
              >
                <Icon size={18} />
                <span>{label}</span>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-card insight-card">
          <div className="insight-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <span>SchoolMarks insight</span>
            <h3>Your academic data is ready to explore.</h3>
            <p>
              Ask the AI workspace about attendance, performance or
              students who may need additional support.
            </p>
          </div>

          <button onClick={() => navigate("ai")}>
            Ask AI
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}

function StudentsPage({ students, setStudents, notify }) {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    roll: "",
    className: "Class 9-A",
    gender: "Male"
  });

  const classes = [
    "All",
    ...Array.from(new Set(students.map(student => student.className)))
  ];

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    return students.filter(student => {
      const matchesQuery =
        !normalized ||
        student.name.toLowerCase().includes(normalized) ||
        student.roll.toLowerCase().includes(normalized);

      const matchesClass =
        classFilter === "All" ||
        student.className === classFilter;

      return matchesQuery && matchesClass;
    });
  }, [students, query, classFilter]);

  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      roll: "",
      className: "Class 9-A",
      gender: "Male"
    });
    setShowModal(true);
  };

  const openEdit = student => {
    setEditing(student);
    setForm({
      name: student.name,
      roll: student.roll,
      className: student.className,
      gender: student.gender
    });
    setShowModal(true);
  };

  const saveStudent = event => {
    event.preventDefault();

    if (!form.name.trim() || !form.roll.trim()) {
      notify("Missing information", "Name and roll number are required.");
      return;
    }

    if (editing) {
      setStudents(current =>
        current.map(student =>
          student.id === editing.id
            ? {
                ...student,
                ...form
              }
            : student
        )
      );

      notify("Student updated", `${form.name} was updated successfully.`);
    } else {
      const student = {
        id: `STU-${Date.now()}`,
        ...form,
        status: "Active",
        attendance: 100,
        average: 0
      };

      setStudents(current => [...current, student]);

      notify("Student added", `${form.name} was added successfully.`);
    }

    setShowModal(false);
  };

  const removeStudent = student => {
    setStudents(current =>
      current.filter(item => item.id !== student.id)
    );

    notify("Student removed", `${student.name} was removed.`);
  };

  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Directory</span>
          <h2>Students</h2>
          <p>Manage student profiles and academic records.</p>
        </div>

        <button className="primary-button" onClick={openAdd}>
          <Plus size={17} />
          Add student
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={17} />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search students..."
          />
        </div>

        <select
          value={classFilter}
          onChange={event => setClassFilter(event.target.value)}
        >
          {classes.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="table-card">
        <div className="table-header">
          <span>Student</span>
          <span>Roll number</span>
          <span>Class</span>
          <span>Attendance</span>
          <span>Average</span>
          <span />
        </div>

        {filtered.map(student => (
          <div className="table-row" key={student.id}>
            <div className="table-student">
              <div className="table-avatar">
                {student.name
                  .split(" ")
                  .map(part => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <strong>{student.name}</strong>
                <span>{student.gender}</span>
              </div>
            </div>

            <span>{student.roll}</span>
            <span>{student.className}</span>

            <span>
              <b className={student.attendance < 75 ? "danger" : ""}>
                {student.attendance}%
              </b>
            </span>

            <span>
              <b>{student.average}%</b>
            </span>

            <div className="row-actions">
              <button onClick={() => openEdit(student)}>
                <Edit3 size={15} />
              </button>

              <button onClick={() => removeStudent(student)}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        {!filtered.length && (
          <div className="empty-state">
            <Users size={26} />
            <strong>No students found</strong>
            <span>Try another search or add a new student.</span>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop" onMouseDown={() => setShowModal(false)}>
          <div
            className="modal"
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="eyebrow">
                  {editing ? "Edit record" : "New record"}
                </span>
                <h3>{editing ? "Edit student" : "Add student"}</h3>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveStudent}>
              <label>
                Student name
                <input
                  value={form.name}
                  onChange={event =>
                    setForm({
                      ...form,
                      name: event.target.value
                    })
                  }
                  placeholder="Enter student name"
                />
              </label>

              <label>
                Roll number
                <input
                  value={form.roll}
                  onChange={event =>
                    setForm({
                      ...form,
                      roll: event.target.value
                    })
                  }
                  placeholder="Enter roll number"
                />
              </label>

              <div className="form-grid">
                <label>
                  Class
                  <select
                    value={form.className}
                    onChange={event =>
                      setForm({
                        ...form,
                        className: event.target.value
                      })
                    }
                  >
                    {[
                      "Class 9-A",
                      "Class 9-B",
                      "Class 9-C",
                      "Class 10-A",
                      "Class 10-B",
                      "Class 10-C"
                    ].map(item => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Gender
                  <select
                    value={form.gender}
                    onChange={event =>
                      setForm({
                        ...form,
                        gender: event.target.value
                      })
                    }
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  {editing ? "Save changes" : "Add student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AcademicsPage() {
  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Academic structure</span>
          <h2>Academics</h2>
          <p>Organize classes, subjects and academic planning.</p>
        </div>

        <button className="primary-button">
          <Plus size={17} />
          Add class
        </button>
      </div>

      <div className="academic-grid">
        {[
          {
            title: "Classes",
            count: "6",
            icon: GraduationCap,
            items: ["Class 9-A", "Class 9-B", "Class 9-C"]
          },
          {
            title: "Subjects",
            count: "8",
            icon: BookOpen,
            items: subjects.slice(0, 4)
          },
          {
            title: "Academic year",
            count: "2026",
            icon: CalendarDays,
            items: ["Term 1", "Term 2", "Term 3"]
          }
        ].map(item => {
          const Icon = item.icon;

          return (
            <div className="academic-card" key={item.title}>
              <div className="academic-card-top">
                <div className="feature-icon">
                  <Icon size={20} />
                </div>

                <span>{item.count}</span>
              </div>

              <h3>{item.title}</h3>

              <div className="academic-items">
                {item.items.map(value => (
                  <div key={value}>
                    <span>{value}</span>
                    <ChevronRight size={14} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-card curriculum-card">
        <div className="dashboard-card-header">
          <div>
            <span>Curriculum</span>
            <h3>Subjects overview</h3>
          </div>
        </div>

        <div className="subject-grid">
          {subjects.map((subject, index) => (
            <div className="subject-item" key={subject}>
              <div className="subject-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <strong>{subject}</strong>
                <span>Active subject</span>
              </div>

              <CheckCircle2 size={17} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarksPage({ notify }) {
  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Academic records</span>
          <h2>Marks</h2>
          <p>Enter and manage student examination marks.</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            notify("Marks entry", "Marks entry workspace opened.")
          }
        >
          <Plus size={17} />
          Enter marks
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Records entered"
          value={842}
          change="12%"
          icon={PenLine}
        />

        <StatCard
          label="Average score"
          value={85}
          suffix="%"
          change="4.7%"
          icon={BarChart3}
        />

        <StatCard
          label="Passing rate"
          value={93}
          suffix="%"
          change="2.8%"
          icon={CheckCircle2}
        />

        <StatCard
          label="Pending"
          value={34}
          change="8 fewer"
          icon={Clock3}
          positive={false}
        />
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div>
            <span>Latest records</span>
            <h3>Recent mark entries</h3>
          </div>

          <button>
            Export
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="marks-list">
          {[
            ["Mathematics", "Class 9-A", "88%", "Today"],
            ["English", "Class 10-A", "91%", "Today"],
            ["Physics", "Class 9-B", "82%", "Yesterday"],
            ["Computer Science", "Class 10-A", "96%", "Yesterday"]
          ].map(row => (
            <div className="marks-row" key={`${row[0]}-${row[1]}`}>
              <div className="marks-subject-icon">
                <BookOpen size={17} />
              </div>

              <div>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
              </div>

              <b>{row[2]}</b>
              <span>{row[3]}</span>

              <ChevronRight size={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Outcome management</span>
          <h2>Results</h2>
          <p>Review examination outcomes and academic summaries.</p>
        </div>

        <button className="primary-button">
          <FileText size={17} />
          Generate result
        </button>
      </div>

      <div className="result-summary-grid">
        {[
          ["Overall average", "84.6%", TrendingUp],
          ["Pass rate", "93%", CheckCircle2],
          ["Distinctions", "184", Award],
          ["At risk", "27", Target]
        ].map(([label, value, Icon]) => (
          <div className="result-summary" key={label}>
            <div className="feature-icon">
              <Icon size={19} />
            </div>

            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div>
            <span>Results</span>
            <h3>Class performance</h3>
          </div>
        </div>

        <div className="result-bars">
          {[
            ["Class 9-A", 88],
            ["Class 9-B", 81],
            ["Class 9-C", 84],
            ["Class 10-A", 92],
            ["Class 10-B", 79],
            ["Class 10-C", 86]
          ].map(([name, value]) => (
            <div className="result-bar-row" key={name}>
              <div>
                <strong>{name}</strong>
                <span>{value}%</span>
              </div>

              <div className="bar-track">
                <i style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendancePage() {
  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Daily records</span>
          <h2>Attendance</h2>
          <p>Track attendance and identify students who need attention.</p>
        </div>

        <button className="primary-button">
          <Plus size={17} />
          Mark attendance
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Present today"
          value={1179}
          change="3.2%"
          icon={CheckCircle2}
        />

        <StatCard
          label="Attendance rate"
          value={92}
          suffix="%"
          change="2.1%"
          icon={CalendarDays}
        />

        <StatCard
          label="Absent"
          value={72}
          change="5 fewer"
          icon={X}
          positive={false}
        />

        <StatCard
          label="Late"
          value={33}
          change="1.4%"
          icon={Clock3}
          positive={false}
        />
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div>
            <span>Today</span>
            <h3>Attendance overview</h3>
          </div>

          <button>
            18 Sep 2026
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="attendance-grid">
          {[
            ["Class 9-A", 96],
            ["Class 9-B", 91],
            ["Class 9-C", 89],
            ["Class 10-A", 95],
            ["Class 10-B", 87],
            ["Class 10-C", 92]
          ].map(([name, value]) => (
            <div className="attendance-card" key={name}>
              <div className="attendance-top">
                <strong>{name}</strong>
                <b>{value}%</b>
              </div>

              <div className="bar-track">
                <i style={{ width: `${value}%` }} />
              </div>

              <span>
                {value >= 90 ? "Healthy attendance" : "Needs attention"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformancePage({ students }) {
  const sorted = [...students].sort(
    (a, b) => Number(b.average) - Number(a.average)
  );

  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Insights</span>
          <h2>Performance</h2>
          <p>Understand academic trends across students and classes.</p>
        </div>

        <button className="secondary-button">
          <FileBarChart size={17} />
          Generate report
        </button>
      </div>

      <div className="performance-overview">
        <div className="performance-score-card">
          <span>Overall performance</span>
          <strong>84.6%</strong>
          <div>
            <TrendingUp size={15} />
            Improving this term
          </div>
        </div>

        <div className="performance-ring">
          <div>
            <strong>85</strong>
            <span>Average</span>
          </div>
        </div>

        <div className="performance-info">
          <div>
            <span>Strong performers</span>
            <strong>
              {students.filter(student => student.average >= 85).length}
            </strong>
          </div>

          <div>
            <span>Needs support</span>
            <strong>
              {students.filter(student => student.average < 75).length}
            </strong>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div>
            <span>Ranking</span>
            <h3>Student performance</h3>
          </div>
        </div>

        <div className="performance-list">
          {sorted.map((student, index) => (
            <div className="performance-row" key={student.id}>
              <span className="performance-rank">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="mini-avatar">
                {student.name
                  .split(" ")
                  .map(part => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="mini-student-copy">
                <strong>{student.name}</strong>
                <span>
                  {student.className} · {student.attendance}% attendance
                </span>
              </div>

              <div className="performance-progress">
                <div className="bar-track">
                  <i style={{ width: `${student.average}%` }} />
                </div>
              </div>

              <strong>{student.average}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIPage({ students }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask me something about your students, attendance, marks or academic performance."
  );
  const [history, setHistory] = useState([]);

  const generateAnswer = prompt => {
    const text = prompt.toLowerCase();

    let response =
      "Based on the available SchoolMarks records, I can help you analyze this area further.";

    if (text.includes("support") || text.includes("risk")) {
      const atRisk = students.filter(
        student =>
          Number(student.average) < 75 ||
          Number(student.attendance) < 75
      );

      response =
        atRisk.length > 0
          ? `${atRisk.length} student${atRisk.length > 1 ? "s" : ""} may need additional support based on the current marks and attendance records.`
          : "No students currently meet the selected support criteria.";
    } else if (
      text.includes("top") ||
      text.includes("performing")
    ) {
      const top = [...students]
        .sort((a, b) => Number(b.average) - Number(a.average))
        .slice(0, 3);

      response = `The current top performers are ${top
        .map(student => `${student.name} (${student.average}%)`)
        .join(", ")}.`;
    } else if (text.includes("attendance")) {
      const averageAttendance =
        students.length > 0
          ? Math.round(
              students.reduce(
                (sum, student) =>
                  sum + Number(student.attendance || 0),
                0
              ) / students.length
            )
          : 0;

      response = `The current average attendance across the available student records is ${averageAttendance}%.`;
    } else if (text.includes("class")) {
      const classMap = {};

      students.forEach(student => {
        if (!classMap[student.className]) {
          classMap[student.className] = [];
        }

        classMap[student.className].push(Number(student.average || 0));
      });

      const classResults = Object.entries(classMap).map(
        ([name, values]) => ({
          name,
          average: Math.round(
            values.reduce((sum, value) => sum + value, 0) /
              values.length
          )
        })
      );

      classResults.sort((a, b) => b.average - a.average);

      response =
        classResults.length > 0
          ? `The current class averages are ${classResults
              .map(item => `${item.name}: ${item.average}%`)
              .join(", ")}.`
          : "There is not enough class data available yet.";
    } else if (text.includes("subject")) {
      response =
        "Subject-level analysis can be connected to the marks records so SchoolMarks can identify strengths, weaknesses and trends by subject.";
    } else if (text.includes("improve")) {
      response =
        "SchoolMarks can compare historical marks and attendance records to identify students with the largest positive changes over time.";
    } else {
      response =
        "I can analyze students, classes, attendance, marks, performance and academic trends. Try one of the suggested questions below.";
    }

    setAnswer(response);
    setHistory(current => [
      {
        question: prompt,
        answer: response
      },
      ...current
    ]);
    setQuestion("");
  };

  return (
    <div className="system-page ai-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Intelligence workspace</span>
          <h2>SchoolMarks AI</h2>
          <p>
            Ask questions about your academic records and explore useful
            insights.
          </p>
        </div>

        <div className="ai-ready-badge">
          <span />
          AI ready
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-main-card">
          <div className="ai-main-header">
            <div className="ai-panel-title">
              <div className="ai-icon large">
                <Sparkles size={19} />
              </div>

              <div>
                <strong>Academic assistant</strong>
                <span>Powered by your SchoolMarks workspace</span>
              </div>
            </div>

            <button
              onClick={() =>
                setAnswer(
                  "Ask me something about your students, attendance, marks or academic performance."
                )
              }
            >
              <RefreshCw size={15} />
              Reset
            </button>
          </div>

          <div className="ai-conversation">
            <div className="ai-message ai-message-assistant">
              <div className="ai-avatar">
                <Brain size={16} />
              </div>

              <div>
                <span>SchoolMarks AI</span>
                <p>{answer}</p>
              </div>
            </div>

            {history.slice(0, 3).map((item, index) => (
              <React.Fragment key={`${item.question}-${index}`}>
                <div className="ai-message ai-message-user">
                  <div className="ai-user-avatar">SA</div>

                  <div>
                    <span>You</span>
                    <p>{item.question}</p>
                  </div>
                </div>

                <div className="ai-message ai-message-assistant">
                  <div className="ai-avatar">
                    <Brain size={16} />
                  </div>

                  <div>
                    <span>SchoolMarks AI</span>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="ai-input-area">
            <div className="ai-input">
              <input
                value={question}
                onChange={event => setQuestion(event.target.value)}
                onKeyDown={event => {
                  if (event.key === "Enter" && question.trim()) {
                    generateAnswer(question.trim());
                  }
                }}
                placeholder="Ask SchoolMarks AI..."
              />

              <button
                disabled={!question.trim()}
                onClick={() => {
                  if (question.trim()) {
                    generateAnswer(question.trim());
                  }
                }}
              >
                <ArrowUpRight size={17} />
              </button>
            </div>

            <span>
              SchoolMarks AI provides insights from available academic
              records.
            </span>
          </div>
        </div>

        <aside className="ai-sidebar-card">
          <div>
            <span className="eyebrow">Suggested questions</span>
            <h3>Explore your data</h3>
          </div>

          <div className="ai-question-list">
            {aiQuestions.map(item => (
              <button
                key={item}
                onClick={() => generateAnswer(item)}
              >
                <span>{item}</span>
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProfilePage({ profile, setProfile, notify }) {
  const [form, setForm] = useState(profile);

  const save = event => {
    event.preventDefault();

    const next = {
      ...form,
      name: form.name.trim() || "School Admin"
    };

    setProfile(next);
    localStorage.setItem("schoolmarks_profile", JSON.stringify(next));

    notify("Profile saved", "Your profile has been updated.");
  };

  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Account</span>
          <h2>Profile</h2>
          <p>Manage the profile used across your SchoolMarks workspace.</p>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-summary-card">
          <div className="profile-large-avatar">
            {form.name
              ?.split(" ")
              .map(part => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <h3>{form.name || "School Admin"}</h3>
          <span>{form.role}</span>

          <div className="profile-divider" />

          <div className="profile-summary-item">
            <MailIcon />
            <div>
              <span>Email</span>
              <strong>{form.email}</strong>
            </div>
          </div>

          <div className="profile-summary-item">
            <GraduationCap size={17} />
            <div>
              <span>Campus</span>
              <strong>{form.campus}</strong>
            </div>
          </div>
        </div>

        <form className="profile-form-card" onSubmit={save}>
          <div className="dashboard-card-header">
            <div>
              <span>Profile settings</span>
              <h3>Personal information</h3>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Name
              <input
                value={form.name}
                onChange={event =>
                  setForm({
                    ...form,
                    name: event.target.value
                  })
                }
              />
            </label>

            <label>
              Role
              <input
                value={form.role}
                onChange={event =>
                  setForm({
                    ...form,
                    role: event.target.value
                  })
                }
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={event =>
                  setForm({
                    ...form,
                    email: event.target.value
                  })
                }
              />
            </label>

            <label>
              Campus
              <input
                value={form.campus}
                onChange={event =>
                  setForm({
                    ...form,
                    campus: event.target.value
                  })
                }
              />
            </label>

            <label>
              Interface
              <select
                value={form.interface}
                onChange={event =>
                  setForm({
                    ...form,
                    interface: event.target.value
                  })
                }
              >
                <option>English</option>
                <option>Urdu</option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button className="primary-button" type="submit">
              <Check size={17} />
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MailIcon() {
  return <MessageSquare size={17} />;
}

function SettingsPage({ notify }) {
  const [notifications, setNotifications] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <div className="system-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Workspace preferences</span>
          <h2>Settings</h2>
          <p>Configure how SchoolMarks works for your school.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-icon">
            <Bell size={18} />
          </div>

          <div>
            <strong>Notifications</strong>
            <span>Receive important academic updates.</span>
          </div>

          <button
            className={`toggle ${notifications ? "active" : ""}`}
            onClick={() => setNotifications(!notifications)}
          >
            <i />
          </button>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <LayoutDashboard size={18} />
          </div>

          <div>
            <strong>Compact dashboard</strong>
            <span>Use a denser workspace layout.</span>
          </div>

          <button
            className={`toggle ${compact ? "active" : ""}`}
            onClick={() => setCompact(!compact)}
          >
            <i />
          </button>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <ShieldCheck size={18} />
          </div>

          <div>
            <strong>Local data protection</strong>
            <span>Your current demo records are stored locally.</span>
          </div>

          <CheckCircle2 size={18} />
        </div>
      </div>

      <div className="dashboard-card settings-info">
        <div className="settings-info-icon">
          <Database size={20} />
        </div>

        <div>
          <span>Storage</span>
          <h3>SchoolMarks local workspace</h3>
          <p>
            Student and academic records can persist locally between
            sessions using the SchoolMarks storage layer.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            notify("Storage", "Local SchoolMarks storage is active.")
          }
        >
          Check storage
        </button>
      </div>
    </div>
  );
}

function HistoryIcon() {
  return (
    <div className="history-icon">
      <Clock3 size={19} />
    </div>
  );
}

function AppLayout({
  page,
  setPage,
  profile,
  children
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className={`app-main ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar
          profile={profile}
          page={page}
          setPage={setPage}
        />

        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [students, setStudents] = useState(seedStudents);
  const [toast, setToast] = useState(null);

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("schoolmarks_profile");

      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}

    return {
      name: "School Admin",
      role: "Administrator",
      email: "admin@schoolmarks.local",
      campus: "Main Campus",
      interface: "English"
    };
  });

  useEffect(() => {
    const storedStudents = localStorage.getItem("schoolmarks_students");

    if (storedStudents) {
      try {
        const parsed = JSON.parse(storedStudents);

        if (Array.isArray(parsed) && parsed.length) {
          setStudents(parsed);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "schoolmarks_students",
      JSON.stringify(students)
    );
  }, [students]);

  const notify = (title, message) => {
    setToast({
      title,
      message
    });

    window.clearTimeout(window.__schoolmarksToast);

    window.__schoolmarksToast = window.setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const goTo = nextPage => {
    setPage(nextPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  let content = null;

  switch (page) {
    case "home":
      content = <HomePage navigate={goTo} />;
      break;

    case "dashboard":
      content = (
        <DashboardPage
          navigate={goTo}
          students={students}
        />
      );
      break;

    case "students":
      content = (
        <StudentsPage
          students={students}
          setStudents={setStudents}
          notify={notify}
        />
      );
      break;

    case "academics":
      content = <AcademicsPage />;
      break;

    case "exams":
      content = <Exams />;
      break;

    case "marks":
      content = <MarksPage notify={notify} />;
      break;

    case "results":
      content = <ResultsPage />;
      break;

    case "attendance":
      content = <AttendancePage />;
      break;

    case "performance":
      content = <PerformancePage students={students} />;
      break;

    case "ai":
      content = <AIPage students={students} />;
      break;

    case "profile":
      content = (
        <ProfilePage
          profile={profile}
          setProfile={setProfile}
          notify={notify}
        />
      );
      break;

    case "settings":
      content = <SettingsPage notify={notify} />;
      break;

    default:
      content = <HomePage navigate={goTo} />;
  }

  const isSystemPage = page !== "home";

  return (
    <>
      {isSystemPage ? (
        <AppLayout
          page={page}
          setPage={goTo}
          profile={profile}
        >
          {content}
        </AppLayout>
      ) : (
        <div className="public-shell">
          <header className="public-header">
            <button
              className="public-brand"
              onClick={() => goTo("home")}
            >
              <Logo />

              <div>
                <strong>SchoolMarks</strong>
                <span>Academic OS</span>
              </div>
            </button>

            <nav className="public-nav">
              <button onClick={() => goTo("home")}>Home</button>
              <button onClick={() => goTo("dashboard")}>
                Dashboard
              </button>
              <button onClick={() => goTo("ai")}>AI workspace</button>
            </nav>

            <div className="public-actions">
              <button
                className="secondary-button"
                onClick={() => goTo("profile")}
              >
                <User size={16} />
                Profile
              </button>

              <button
                className="primary-button"
                onClick={() => goTo("dashboard")}
              >
                Open dashboard
                <ArrowRight size={16} />
              </button>
            </div>

            <button className="mobile-menu-button">
              <Menu size={19} />
            </button>
          </header>

          {content}
        </div>
      )}

      <Toast
        toast={toast}
        close={() => setToast(null)}
      />
    </>
  );
}