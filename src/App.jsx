import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";
import StudentsPage from "./pages/system/Students";

const studentsSeed = [
  {
    id: 1,
    name: "Ayaan Khan",
    className: "9-A",
    avg: 87,
    attendance: 96,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Zayan Ahmed",
    className: "9-B",
    avg: 51,
    attendance: 73,
    status: "At Risk",
  },
  {
    id: 3,
    name: "Maham Ali",
    className: "9-A",
    avg: 82,
    attendance: 91,
    status: "Good",
  },
  {
    id: 4,
    name: "Hassan Raza",
    className: "9-C",
    avg: 76,
    attendance: 88,
    status: "Good",
  },
  {
    id: 5,
    name: "Areeba Khan",
    className: "9-B",
    avg: 91,
    attendance: 98,
    status: "Excellent",
  },
  {
    id: 6,
    name: "Rayyan Malik",
    className: "9-C",
    avg: 64,
    attendance: 79,
    status: "Attention",
  },
];

const navigation = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Academic",
    items: [
      {
        id: "students",
        label: "Students",
        icon: Users,
      },
      {
        id: "classes",
        label: "Classes",
        icon: GraduationCap,
      },
      {
        id: "subjects",
        label: "Subjects",
        icon: BookOpen,
      },
      {
        id: "marks",
        label: "Marks",
        icon: ClipboardList,
      },
      {
        id: "exams",
        label: "Exams",
        icon: CalendarDays,
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        id: "performance",
        label: "Performance",
        icon: Activity,
      },
      {
        id: "attendance",
        label: "Attendance",
        icon: CheckCircle2,
      },
      {
        id: "reports",
        label: "Reports",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        id: "ai",
        label: "AI Assistant",
        icon: Sparkles,
      },
      {
        id: "notices",
        label: "Notices",
        icon: Bell,
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

function PagePlaceholder({ title, description, icon: Icon }) {
  return (
    <div className="page-stack">
      <section className="placeholder-page">
        <div className="placeholder-icon">
          <Icon size={25} />
        </div>

        <div>
          <div className="page-eyebrow">SCHOOLMARKS</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
    </div>
  );
}

function DashboardPage({ setPage }) {
  const averageScore = Math.round(
    studentsSeed.reduce((total, student) => total + student.avg, 0) /
      studentsSeed.length
  );

  const averageAttendance = Math.round(
    studentsSeed.reduce(
      (total, student) => total + student.attendance,
      0
    ) / studentsSeed.length
  );

  return (
    <div className="page-stack">
      <section className="dashboard-welcome">
        <div>
          <div className="page-eyebrow">MONDAY · SEPTEMBER 2026</div>
          <h1>
            Good morning,
            <br />
            <span>Faizan.</span>
          </h1>
          <p>
            Here's what's happening across your school today.
          </p>
        </div>

        <button
          className="dark-button"
          onClick={() => setPage("students")}
        >
          <Users size={16} />
          View students
          <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="dashboard-metrics">
        <div className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span>Total students</span>
            <Users size={17} />
          </div>
          <strong>248</strong>
          <small>
            <b>+12</b> from last month
          </small>
        </div>

        <div className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span>Average score</span>
            <BarChart3 size={17} />
          </div>
          <strong>{averageScore}%</strong>
          <small>
            <b>+4.2%</b> from last term
          </small>
        </div>

        <div className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span>Attendance</span>
            <CheckCircle2 size={17} />
          </div>
          <strong>{averageAttendance}%</strong>
          <small>
            <b>+1.8%</b> this month
          </small>
        </div>

        <div className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span>Classes</span>
            <GraduationCap size={17} />
          </div>
          <strong>18</strong>
          <small>
            <b>3</b> active sections
          </small>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card performance-card">
          <div className="card-heading">
            <div>
              <span>PERFORMANCE</span>
              <h2>Academic overview</h2>
            </div>

            <button className="icon-button">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="performance-visual">
            <div className="performance-number">
              <strong>{averageScore}%</strong>
              <span>Average score</span>
            </div>

            <div className="performance-bars">
              {[58, 71, 64, 78, 82, 74, 88, 91, 84, 94, 87, 96].map(
                (height, index) => (
                  <div className="performance-bar" key={index}>
                    <span style={{ height: `${height}%` }} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-card activity-card">
          <div className="card-heading">
            <div>
              <span>RECENT ACTIVITY</span>
              <h2>Latest updates</h2>
            </div>

            <button className="text-button">
              View all
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-avatar">AK</span>
              <div>
                <strong>Ayaan Khan</strong>
                <p>Marks updated for Mathematics</p>
              </div>
              <small>8m</small>
            </div>

            <div className="activity-item">
              <span className="activity-avatar">MA</span>
              <div>
                <strong>Maham Ali</strong>
                <p>Attendance record submitted</p>
              </div>
              <small>21m</small>
            </div>

            <div className="activity-item">
              <span className="activity-avatar">AR</span>
              <div>
                <strong>Areeba Khan</strong>
                <p>Excellent performance detected</p>
              </div>
              <small>1h</small>
            </div>

            <div className="activity-item">
              <span className="activity-avatar">RM</span>
              <div>
                <strong>Rayyan Malik</strong>
                <p>Attendance needs attention</p>
              </div>
              <small>2h</small>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-card students-overview">
        <div className="card-heading">
          <div>
            <span>STUDENTS</span>
            <h2>Performance snapshot</h2>
          </div>

          <button
            className="text-button"
            onClick={() => setPage("students")}
          >
            All students
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="mini-student-table">
          {studentsSeed.slice(0, 4).map((student) => (
            <div className="mini-student-row" key={student.id}>
              <div className="mini-student-person">
                <span>
                  {student.name
                    .split(" ")
                    .map((item) => item[0])
                    .join("")}
                </span>

                <div>
                  <strong>{student.name}</strong>
                  <small>{student.className}</small>
                </div>
              </div>

              <div className="mini-score">
                <strong>{student.avg}%</strong>
                <span>Average</span>
              </div>

              <div className="mini-attendance">
                <strong>{student.attendance}%</strong>
                <span>Attendance</span>
              </div>

              <span
                className={`status-pill ${
                  student.status === "At Risk"
                    ? "risk"
                    : student.status === "Attention"
                    ? "attention"
                    : ""
                }`}
              >
                {student.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AIPage() {
  const [prompt, setPrompt] = useState("");

  const suggestions = useMemo(
    () => [
      "Which students need attention this week?",
      "Summarize class 9-A performance",
      "Find students with low attendance",
      "Create a revision plan for exams",
    ],
    []
  );

  return (
    <div className="page-stack">
      <section className="ai-hero">
        <div className="ai-mark">
          <Sparkles size={22} />
        </div>

        <div>
          <div className="page-eyebrow">SCHOOLMARKS AI</div>
          <h1>Your academic copilot.</h1>
          <p>
            Ask questions about students, performance, attendance and
            academic trends.
          </p>
        </div>
      </section>

      <section className="ai-workspace">
        <div className="ai-chat-area">
          <div className="ai-empty">
            <div className="ai-empty-icon">
              <Sparkles size={25} />
            </div>
            <h2>What would you like to know?</h2>
            <p>
              Start with a question or choose one of the suggestions
              below.
            </p>
          </div>

          <div className="ai-suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setPrompt(suggestion)}
              >
                {suggestion}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>

          <div className="ai-input">
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ask SchoolMarks AI anything..."
            />
            <button>
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>

        <aside className="ai-side-panel">
          <div>
            <span>AI WORKSPACE</span>
            <h3>Academic intelligence</h3>
          </div>

          <div className="ai-side-item">
            <Sparkles size={16} />
            <div>
              <strong>Performance insights</strong>
              <p>Identify trends across classes.</p>
            </div>
          </div>

          <div className="ai-side-item">
            <Activity size={16} />
            <div>
              <strong>Early signals</strong>
              <p>Spot students who need attention.</p>
            </div>
          </div>

          <div className="ai-side-item">
            <FileText size={16} />
            <div>
              <strong>Reports</strong>
              <p>Turn school data into summaries.</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitles = {
    dashboard: "Dashboard",
    students: "Students",
    classes: "Classes",
    subjects: "Subjects",
    marks: "Marks",
    exams: "Exams",
    performance: "Performance",
    attendance: "Attendance",
    reports: "Reports",
    ai: "AI Assistant",
    notices: "Notices",
    settings: "Settings",
  };

  const handleNavigation = (id) => {
    setPage(id);
    setSidebarOpen(false);
  };

  let content;

  if (page === "dashboard") {
    content = <DashboardPage setPage={setPage} />;
  } else if (page === "students") {
    content = <StudentsPage />;
  } else if (page === "ai") {
    content = <AIPage />;
  } else {
    const currentNavigation = navigation
      .flatMap((group) => group.items)
      .find((item) => item.id === page);

    content = (
      <PagePlaceholder
        title={pageTitles[page]}
        description={`Manage ${pageTitles[
          page
        ].toLowerCase()} from your SchoolMarks workspace.`}
        icon={currentNavigation?.icon || FileText}
      />
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-symbol">
              <span />
              <span />
              <span />
            </div>

            <div>
              <strong>schoolmarks</strong>
              <small>Academic workspace</small>
            </div>
          </div>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((group) => (
            <div className="nav-group" key={group.label}>
              <span className="nav-label">{group.label}</span>

              {group.items.map((item) => {
                const Icon = item.icon;
                const active = page === item.id;

                return (
                  <button
                    key={item.id}
                    className={`nav-item ${active ? "active" : ""}`}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <Icon size={17} strokeWidth={active ? 2.1 : 1.8} />
                    <span>{item.label}</span>

                    {item.id === "ai" && (
                      <span className="nav-new">NEW</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="school-mini-profile">
            <div className="school-avatar">J</div>

            <div>
              <strong>JEB School</strong>
              <span>Administrator</span>
            </div>

            <ChevronDown size={15} />
          </div>

          <div className="sidebar-version">SCHOOLMARKS · V1.0</div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="breadcrumb">
              <span>SchoolMarks</span>
              <span>/</span>
              <strong>{pageTitles[page]}</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="topbar-search">
              <Search size={17} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>

            <button className="topbar-icon">
              <Bell size={18} />
              <i />
            </button>

            <div className="topbar-divider" />

            <button className="profile-button">
              <span className="profile-avatar">FK</span>
              <span className="profile-name">Faizan</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        <div className="content-area">{content}</div>
      </main>
    </div>
  );
}

export default App;