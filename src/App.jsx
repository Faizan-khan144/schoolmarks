import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap
} from "lucide-react";

const studentsSeed = [
  { id: 1, name: "Ayaan Khan", className: "9-A", avg: 91, attendance: 96 },
  { id: 2, name: "Hassan Ahmed", className: "9-A", avg: 87, attendance: 93 },
  { id: 3, name: "Maham Ali", className: "9-B", avg: 95, attendance: 98 },
  { id: 4, name: "Zayan Sheikh", className: "9-B", avg: 82, attendance: 89 },
  { id: 5, name: "Areeba Khan", className: "9-A", avg: 94, attendance: 97 },
  { id: 6, name: "Huzaifa Malik", className: "9-C", avg: 76, attendance: 84 }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Exams", icon: CalendarDays },
  { id: "marks", label: "Marks", icon: ClipboardCheck },
  { id: "results", label: "Results", icon: BarChart3 },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: LineChart },
  { id: "ai", label: "AI Assistant", icon: BrainCircuit }
];

const modules = [
  {
    number: "01",
    title: "Student Records",
    text: "Keep every student profile, class, subject and academic record organized in one place.",
    icon: Users
  },
  {
    number: "02",
    title: "Marks Management",
    text: "Enter marks quickly, calculate results automatically and keep academic data consistent.",
    icon: ClipboardCheck
  },
  {
    number: "03",
    title: "Attendance",
    text: "Track attendance patterns and instantly identify students who need attention.",
    icon: UserCheck
  },
  {
    number: "04",
    title: "Performance",
    text: "Turn raw marks into clear performance trends that teachers and schools can understand.",
    icon: TrendingUp
  },
  {
    number: "05",
    title: "Exams",
    text: "Organize upcoming exams, schedules and academic timelines without spreadsheets.",
    icon: CalendarDays
  },
  {
    number: "06",
    title: "AI Assistant",
    text: "Ask questions about academic data and get useful insights in seconds.",
    icon: Sparkles
  }
];

const workflow = [
  ["Add students", "Create organized student profiles with classes and academic details.", Users],
  ["Record marks", "Enter subject marks and let SchoolMarks handle the calculations.", ClipboardCheck],
  ["Track attendance", "Monitor attendance and discover patterns across classes.", UserCheck],
  ["Understand results", "See performance trends, rankings and useful academic signals.", BarChart3]
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getStatus = (avg) => {
  if (avg >= 90) return "Excellent";
  if (avg >= 80) return "On Track";
  if (avg >= 70) return "Needs Attention";
  return "At Risk";
};

function Logo({ dark = false }) {
  return (
    <div className={`logo ${dark ? "logo-dark" : ""}`}>
      <div className="logo-mark">S</div>
      <div>
        <strong>SchoolMarks</strong>
        <span>Academic Intelligence</span>
      </div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProductPreview() {
  const previewStudents = studentsSeed.slice(0, 4);

  return (
    <div className="product-stage">
      <div className="stage-glow" />
      <div className="preview-window">
        <div className="preview-topbar">
          <div className="preview-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="preview-address">app.schoolmarks.local/dashboard</div>
          <div className="preview-avatar">FK</div>
        </div>

        <div className="preview-layout">
          <aside className="preview-sidebar">
            <div className="preview-brand">
              <span>SM</span>
              <strong>SchoolMarks</strong>
            </div>

            <div className="preview-nav">
              <div className="active">
                <LayoutDashboard size={14} />
                Overview
              </div>
              <div>
                <Users size={14} />
                Students
              </div>
              <div>
                <BookOpen size={14} />
                Academics
              </div>
              <div>
                <ClipboardCheck size={14} />
                Marks
              </div>
              <div>
                <LineChart size={14} />
                Performance
              </div>
            </div>

            <div className="preview-sidebar-bottom">
              <Settings size={14} />
              Settings
            </div>
          </aside>

          <main className="preview-content">
            <div className="preview-heading">
              <div>
                <span>OVERVIEW</span>
                <h3>Good morning, Faizan</h3>
              </div>
              <button>
                <Plus size={13} />
                Add student
              </button>
            </div>

            <div className="preview-kpis">
              <div>
                <span>Total Students</span>
                <strong>248</strong>
                <small>+12 this month</small>
              </div>
              <div>
                <span>Average Score</span>
                <strong>87.4%</strong>
                <small>+4.2% vs last term</small>
              </div>
              <div>
                <span>Attendance</span>
                <strong>94.8%</strong>
                <small>+1.8% this month</small>
              </div>
            </div>

            <div className="preview-grid">
              <div className="preview-chart-card">
                <div className="preview-card-head">
                  <div>
                    <span>Academic performance</span>
                    <strong>Average score trend</strong>
                  </div>
                  <button>Last 12 months</button>
                </div>
                <div className="preview-chart">
                  <div className="chart-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <svg viewBox="0 0 500 170" preserveAspectRatio="none">
                    <path
                      d="M0 135 C40 126 52 117 82 122 C110 126 127 99 155 105 C183 112 200 86 229 93 C255 100 277 72 303 78 C335 85 347 54 374 63 C405 72 425 39 455 48 C470 52 486 30 500 36"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="preview-chart-months">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                </div>
              </div>

              <div className="preview-ai-card">
                <div className="preview-ai-icon">
                  <Sparkles size={17} />
                </div>
                <span>AI INSIGHT</span>
                <strong>Performance is improving</strong>
                <p>
                  Class 9 students improved their average score by 6.8% over
                  the previous assessment.
                </p>
                <div className="preview-ai-bottom">
                  <TrendingUp size={14} />
                  <span>Positive trend</span>
                </div>
              </div>
            </div>

            <div className="preview-table">
              <div className="preview-table-head">
                <span>Student</span>
                <span>Class</span>
                <span>Average</span>
                <span>Attendance</span>
              </div>

              {previewStudents.map((student) => (
                <div className="preview-table-row" key={student.id}>
                  <div>
                    <span className="mini-avatar">
                      {getInitials(student.name)}
                    </span>
                    <strong>{student.name}</strong>
                  </div>
                  <span>{student.className}</span>
                  <strong>{student.avg}%</strong>
                  <span>{student.attendance}%</span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      <div className="floating-stat floating-stat-one">
        <div>
          <TrendingUp size={14} />
        </div>
        <span>Performance</span>
        <strong>+12.4%</strong>
      </div>

      <div className="floating-stat floating-stat-two">
        <div>
          <Check size={14} />
        </div>
        <span>Attendance</span>
        <strong>94.8%</strong>
      </div>
    </div>
  );
}

function HomeAI() {
  return (
    <div className="home-ai-box">
      <div className="home-ai-header">
        <div className="ai-title-row">
          <div className="ai-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <span>SchoolMarks AI</span>
            <strong>Academic Intelligence</strong>
          </div>
        </div>
        <span className="home-ai-bot">
          <i />
          Online
        </span>
      </div>

      <div className="ai-mode-row">
        <button className="active">Ask SchoolMarks</button>
        <button>Analyze data</button>
        <button>Find students</button>
      </div>

      <div className="home-ai-input">
        <span>Ask something about your students...</span>
        <button>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="home-ai-suggestions">
        <span>Which students need attention?</span>
        <span>Show class 9 performance</span>
        <span>Compare attendance</span>
      </div>
    </div>
  );
}

function HomePage({ onOpenApp }) {
  return (
    <div className="public-site">
      <nav className="public-nav">
        <Logo />
        <div className="public-nav-links">
          <a href="#platform">Platform</a>
          <a href="#workflow">How it works</a>
          <a href="#features">Features</a>
          <a href="#intelligence">AI</a>
        </div>
        <div className="nav-actions">
          <button className="nav-ai" onClick={onOpenApp}>
            <Sparkles size={15} />
            AI Assistant
          </button>
          <button className="nav-cta" onClick={onOpenApp}>
            Open platform
            <ArrowUpRight size={15} />
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="platform">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-grid" />

          <div className="hero-copy">
            <Reveal>
              <div className="hero-label">
                <span className="pulse-dot" />
                Academic management, rethought
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1>
                Turn student data into
                <em> better outcomes.</em>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p>
                SchoolMarks brings students, marks, attendance, exams and
                performance into one intelligent platform built for modern
                schools.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="hero-buttons">
                <button className="primary-button" onClick={onOpenApp}>
                  Explore SchoolMarks
                  <ArrowRight size={17} />
                </button>
                <a href="#workflow" className="secondary-button">
                  See how it works
                  <ChevronRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="hero-proof">
                <div className="proof-avatars">
                  <span>AK</span>
                  <span>MA</span>
                  <span>ZS</span>
                  <span>FK</span>
                </div>
                <div>
                  <strong>Built for focused academic teams</strong>
                  <span>One workspace. Clearer decisions.</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-product" delay={320}>
            <ProductPreview />
          </Reveal>

          <div className="hero-bottom-stats">
            <div>
              <strong>248+</strong>
              <span>Students managed</span>
            </div>
            <div>
              <strong>94.8%</strong>
              <span>Average attendance</span>
            </div>
            <div>
              <strong>87.4%</strong>
              <span>Academic average</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Core modules</span>
            </div>
          </div>
        </section>

        <div className="marquee-wrap">
          <div className="marquee">
            <span>STUDENTS</span>
            <i />
            <span>ACADEMICS</span>
            <i />
            <span>EXAMS</span>
            <i />
            <span>MARKS</span>
            <i />
            <span>ATTENDANCE</span>
            <i />
            <span>PERFORMANCE</span>
            <i />
            <span>AI INSIGHTS</span>
            <i />
            <span>STUDENTS</span>
            <i />
            <span>ACADEMICS</span>
            <i />
            <span>EXAMS</span>
            <i />
            <span>MARKS</span>
          </div>
        </div>

        <section className="section problem-section">
          <div className="problem-layout">
            <Reveal className="big-number">
              <span>01</span>
              <strong>Less admin.</strong>
              <strong>More clarity.</strong>
            </Reveal>

            <Reveal className="problem-copy" delay={80}>
              <div className="section-eyebrow">THE PROBLEM</div>
              <h2>
                Academic data shouldn't live across
                <span> spreadsheets and registers.</span>
              </h2>
              <p>
                Marks in one file. Attendance somewhere else. Results copied
                manually. SchoolMarks connects the entire academic workflow
                so teachers can focus on students instead of administration.
              </p>

              <div className="problem-points">
                <div>
                  <Check size={15} />
                  <span>One organized student record</span>
                </div>
                <div>
                  <Check size={15} />
                  <span>Automatic academic calculations</span>
                </div>
                <div>
                  <Check size={15} />
                  <span>Clear performance signals</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="signal-board" delay={160}>
              <div className="signal-main">
                <div className="signal-circle">
                  <span>87%</span>
                  <small>Academic health</small>
                </div>
                <div className="signal-details">
                  <span>LIVE SIGNAL</span>
                  <strong>Class 9 performance</strong>
                  <p>Improving across 4 subjects</p>
                </div>
              </div>
              <div className="signal-warning">
                <span>
                  <CircleHelp size={14} />
                </span>
                <div>
                  <strong>12 students need attention</strong>
                  <small>Based on recent performance</small>
                </div>
                <ArrowUpRight size={15} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <Reveal>
            <div className="section-heading">
              <div>
                <div className="section-eyebrow">THE WORKFLOW</div>
                <h2>
                  From student record to
                  <span> meaningful insight.</span>
                </h2>
              </div>
              <p>
                A simple academic workflow designed to keep information
                organized from the first entry to the final result.
              </p>
            </div>
          </Reveal>

          <div className="workflow-line">
            {workflow.map(([title, text, Icon], index) => (
              <Reveal className="workflow-step" delay={index * 70} key={title}>
                <div className="workflow-number">0{index + 1}</div>
                <div className="workflow-icon">
                  <Icon size={21} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                {index < workflow.length - 1 && (
                  <ArrowRight className="workflow-arrow" size={17} />
                )}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section modules-section" id="features">
          <Reveal>
            <div className="section-heading">
              <div>
                <div className="section-eyebrow">ONE PLATFORM</div>
                <h2>
                  Everything your academic team
                  <span> needs.</span>
                </h2>
              </div>
              <p>
                Replace disconnected tools with one focused workspace for
                daily school operations.
              </p>
            </div>
          </Reveal>

          <div className="module-grid">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Reveal className="module-card" delay={index * 50} key={module.title}>
                  <div className="module-top">
                    <span>{module.number}</span>
                    <ArrowUpRight size={18} />
                  </div>
                  <div className="module-icon">
                    <Icon size={20} />
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.text}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section intelligence-section" id="intelligence">
          <div className="intelligence-layout">
            <Reveal className="intelligence-copy">
              <div className="section-eyebrow">SCHOOLMARKS AI</div>
              <h2>
                Ask your academic data
                <span> anything.</span>
              </h2>
              <p>
                Instead of digging through tables, ask questions in plain
                language. SchoolMarks AI helps surface patterns, students
                needing attention and performance insights.
              </p>

              <div className="ai-capabilities">
                <div>
                  <Check size={15} />
                  <span>Understand class performance</span>
                </div>
                <div>
                  <Check size={15} />
                  <span>Find students needing attention</span>
                </div>
                <div>
                  <Check size={15} />
                  <span>Compare academic trends</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <HomeAI />
            </Reveal>
          </div>
        </section>

        <section className="section analytics-section">
          <div className="analytics-layout">
            <Reveal className="analytics-main">
              <div className="analytics-header">
                <div>
                  <div className="section-eyebrow">ACADEMIC ANALYTICS</div>
                  <h2>
                    See progress.
                    <span> Not just numbers.</span>
                  </h2>
                </div>
                <div className="growth-badge">
                  <TrendingUp size={15} />
                  +12.4%
                </div>
              </div>

              <div className="large-chart">
                <div className="chart-y">
                  <span>100</span>
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                </div>
                <div className="large-chart-area">
                  <div className="large-grid-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <svg viewBox="0 0 700 260" preserveAspectRatio="none">
                    <path
                      d="M0 215 C40 208 70 193 100 198 C135 205 160 165 195 174 C228 182 250 151 285 157 C320 165 345 125 378 135 C410 145 445 104 480 114 C515 124 535 80 570 94 C610 108 640 54 700 66"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      d="M0 215 C40 208 70 193 100 198 C135 205 160 165 195 174 C228 182 250 151 285 157 C320 165 345 125 378 135 C410 145 445 104 480 114 C515 124 535 80 570 94 C610 108 640 54 700 66 L700 260 L0 260 Z"
                      fill="currentColor"
                      opacity=".08"
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
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="analytics-side" delay={100}>
              <div className="metric-card">
                <div className="metric-icon">
                  <Target size={18} />
                </div>
                <span>Average score</span>
                <strong>87.4%</strong>
                <div className="metric-bar">
                  <i style={{ width: "87%" }} />
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <UserCheck size={18} />
                </div>
                <span>Attendance</span>
                <strong>94.8%</strong>
                <div className="metric-bar">
                  <i style={{ width: "95%" }} />
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <AwardIcon />
                </div>
                <span>Top performance</span>
                <strong>95.2%</strong>
                <div className="metric-bar">
                  <i style={{ width: "95%" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section compare-section">
          <Reveal>
            <div className="section-heading centered">
              <div>
                <div className="section-eyebrow">WHY SCHOOLMARKS</div>
                <h2>
                  A simpler way to manage
                  <span> academic operations.</span>
                </h2>
              </div>
              <p>
                Built around the information schools already use, without the
                clutter that makes academic administration harder.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="compare-table">
              <div className="compare-head">
                <span>Traditional approach</span>
                <span>SchoolMarks</span>
              </div>

              {[
                ["Multiple spreadsheets", "One connected workspace"],
                ["Manual calculations", "Automatic results"],
                ["Static marks", "Performance trends"],
                ["Separate attendance records", "Connected student profiles"],
                ["Finding insights manually", "AI-assisted analysis"]
              ].map(([left, right]) => (
                <div className="compare-row" key={left}>
                  <div>
                    <X size={15} />
                    <span>{left}</span>
                  </div>
                  <div className="schoolmarks-col">
                    <Check size={15} />
                    <span>{right}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="cta-section">
          <div className="cta-glow" />
          <Reveal className="cta-content">
            <div className="section-eyebrow">READY WHEN YOU ARE</div>
            <h2>
              Make academic data
              <span> work harder.</span>
            </h2>
            <p>
              Explore the SchoolMarks workspace and see how a modern academic
              dashboard can feel.
            </p>
            <button className="light-button" onClick={onOpenApp}>
              Open SchoolMarks
              <ArrowRight size={17} />
            </button>
          </Reveal>
        </section>
      </main>

      <footer className="public-footer">
        <div className="footer-main">
          <Logo dark />
          <p>
            A modern academic intelligence platform for students, teachers and
            schools.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <strong>Platform</strong>
            <a href="#platform">Overview</a>
            <a href="#features">Features</a>
            <a href="#intelligence">AI Assistant</a>
          </div>
          <div>
            <strong>Product</strong>
            <a href="#workflow">Workflow</a>
            <a href="#features">Modules</a>
            <a href="#platform">Analytics</a>
          </div>
          <div>
            <strong>SchoolMarks</strong>
            <a href="#platform">About</a>
            <a href="#workflow">How it works</a>
            <a href="#features">Features</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SchoolMarks</span>
          <span>Academic Intelligence Platform</span>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${mobileOpen ? "show" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="school-switcher">
          <div className="school-avatar">SM</div>
          <div>
            <strong>JEB School</strong>
            <span>Academic workspace</span>
          </div>
          <ChevronRight size={15} />
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={page === item.id ? "active" : ""}
                onClick={() => {
                  setPage(item.id);
                  setMobileOpen(false);
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === "ai" && <i>AI</i>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-setting">
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <div className="profile-mini">
            <div>FK</div>
            <span>
              <strong>Faizan Khan</strong>
              <small>Administrator</small>
            </span>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ setMobileOpen, setPage }) {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <div className="breadcrumb">
          <span>SchoolMarks</span>
          <ChevronRight size={14} />
          <strong>Workspace</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="search-button">
          <Search size={16} />
          <span>Search</span>
          <kbd>⌘ K</kbd>
        </button>

        <button className="icon-button">
          <CircleHelp size={18} />
        </button>

        <button className="icon-button">
          <Activity size={18} />
        </button>

        <button className="top-ai" onClick={() => setPage("ai")}>
          <Sparkles size={15} />
          Ask AI
        </button>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, change, danger = false }) {
  return (
    <div className="dashboard-stat">
      <div className="stat-icon">
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={danger ? "danger-text" : ""}>
        <TrendingUp size={12} />
        {change}
      </small>
    </div>
  );
}

function DashboardPage({ students }) {
  const average = Math.round(
    students.reduce((sum, student) => sum + student.avg, 0) / students.length
  );

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">OVERVIEW</span>
          <h1>Good morning, Faizan.</h1>
          <p>Here’s what’s happening across your academic workspace.</p>
        </div>
        <div className="heading-actions">
          <button className="outline-button">
            <CalendarDays size={16} />
            This term
          </button>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <StatCard
          icon={Users}
          label="Total students"
          value={students.length + 242}
          change="+12 this month"
        />
        <StatCard
          icon={Target}
          label="Average score"
          value={`${average}%`}
          change="+4.2% vs last term"
        />
        <StatCard
          icon={UserCheck}
          label="Attendance"
          value="94.8%"
          change="+1.8% this month"
        />
        <StatCard
          icon={ClipboardCheck}
          label="Exams completed"
          value="18"
          change="3 remaining"
        />
      </div>

      <div className="dashboard-grid-main">
        <div className="dashboard-chart-card">
          <div className="card-heading">
            <div>
              <span>ACADEMIC PERFORMANCE</span>
              <h2>Average score trend</h2>
            </div>
            <select className="select-field">
              <option>Last 12 months</option>
              <option>This term</option>
              <option>This year</option>
            </select>
          </div>

          <div className="dashboard-big-chart">
            <div className="big-chart-labels">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            <div className="big-chart-area">
              <div className="big-chart-grid">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <svg viewBox="0 0 900 300" preserveAspectRatio="none">
                <path
                  d="M0 250 C60 244 90 220 140 228 C190 236 215 195 265 205 C315 215 340 175 395 185 C445 195 480 155 530 166 C580 178 610 125 665 140 C715 154 750 96 800 110 C840 120 865 70 900 82"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M0 250 C60 244 90 220 140 228 C190 236 215 195 265 205 C315 215 340 175 395 185 C445 195 480 155 530 166 C580 178 610 125 665 140 C715 154 750 96 800 110 C840 120 865 70 900 82 L900 300 L0 300 Z"
                  fill="currentColor"
                  opacity=".07"
                />
              </svg>
              <div className="big-chart-months">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-ai-card">
          <div className="ai-card-label">
            <Sparkles size={14} />
            SCHOOLMARKS AI
          </div>
          <div className="ai-signal">
            <div className="signal-icon success">
              <TrendingUp size={18} />
            </div>
            <div>
              <span>Positive signal</span>
              <strong>Class performance is improving</strong>
            </div>
          </div>
          <p>
            The average score for Class 9 increased by 6.8% compared with the
            previous assessment.
          </p>
          <button onClick={() => {}}>
            Explore insight
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="table-card">
          <div className="card-heading compact">
            <div>
              <span>RECENT STUDENTS</span>
              <h2>Student performance</h2>
            </div>
            <button className="text-button">View all <ArrowRight size={14} /></button>
          </div>

          <div className="data-table">
            <div className="table-row table-header">
              <span>Student</span>
              <span>Class</span>
              <span>Average</span>
              <span>Status</span>
            </div>

            {students.slice(0, 5).map((student) => (
              <div className="table-row" key={student.id}>
                <div className="table-student">
                  <span>{getInitials(student.name)}</span>
                  <strong>{student.name}</strong>
                </div>
                <span>{student.className}</span>
                <strong>{student.avg}%</strong>
                <span className={`status ${student.avg < 80 ? "warning" : ""}`}>
                  {getStatus(student.avg)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="side-card">
          <div className="card-heading compact">
            <div>
              <span>UPCOMING</span>
              <h2>Exam schedule</h2>
            </div>
            <CalendarDays size={17} />
          </div>

          <div className="exam-mini">
            <div>
              <strong>Mathematics</strong>
              <span>Class 9 · Mid Term</span>
            </div>
            <b>24</b>
          </div>
          <div className="exam-mini">
            <div>
              <strong>Computer Science</strong>
              <span>Class 9 · Mid Term</span>
            </div>
            <b>27</b>
          </div>
          <div className="exam-mini">
            <div>
              <strong>Physics</strong>
              <span>Class 9 · Mid Term</span>
            </div>
            <b>30</b>
          </div>

          <div className="pulse-grid">
            <div className="pulse-card">
              <span>Attendance</span>
              <strong>94.8%</strong>
            </div>
            <div className="pulse-card">
              <span>At risk</span>
              <strong>12</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("9-A");

  return (
    <div className="student-modal-backdrop" onMouseDown={onClose}>
      <div className="add-student-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>NEW RECORD</span>
            <h2>Add student</h2>
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="student-form-grid">
          <label>
            Student name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </label>

          <label>
            Class
            <select value={className} onChange={(e) => setClassName(e.target.value)}>
              <option>9-A</option>
              <option>9-B</option>
              <option>9-C</option>
              <option>10-A</option>
              <option>10-B</option>
            </select>
          </label>
        </div>

        <div className="modal-foot">
          <button className="outline-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="save-student"
            onClick={() => {
              if (!name.trim()) return;
              onSave({
                id: Date.now(),
                name: name.trim(),
                className,
                avg: 0,
                attendance: 0
              });
            }}
          >
            Add student
            <Check size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ students, setStudents }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = students.filter((student) =>
    `${student.name} ${student.className}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">STUDENTS</span>
          <h1>Student records.</h1>
          <p>Manage profiles, classes and academic information.</p>
        </div>
        <button className="primary-button small" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add student
        </button>
      </div>

      <div className="large-table-card">
        <div className="marks-toolbar">
          <div className="student-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
            />
          </div>

          <div className="toolbar-actions">
            <button className="outline-button">All classes</button>
            <button className="outline-button">
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>

        <div className="data-table">
          <div className="table-row table-header">
            <span>Student</span>
            <span>Class</span>
            <span>Average</span>
            <span>Attendance</span>
            <span>Status</span>
          </div>

          {filtered.map((student) => (
            <div className="table-row" key={student.id}>
              <div className="table-student">
                <span>{getInitials(student.name)}</span>
                <strong>{student.name}</strong>
              </div>
              <span>{student.className}</span>
              <strong className="score-cell">{student.avg || "—"}%</strong>
              <span>{student.attendance || "—"}%</span>
              <span className={`status ${student.avg < 80 ? "warning" : ""}`}>
                {student.avg ? getStatus(student.avg) : "New"}
              </span>
            </div>
          ))}

          {!filtered.length && (
            <div className="empty-state">
              <Search size={22} />
              <strong>No students found</strong>
              <span>Try another search term.</span>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <StudentModal
          onClose={() => setShowModal(false)}
          onSave={(student) => {
            setStudents((current) => [...current, student]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

function AcademicsPage() {
  const subjects = [
    ["Mathematics", 92, TrendingUp],
    ["Computer Science", 96, BrainCircuit],
    ["Physics", 84, Activity],
    ["Chemistry", 81, Zap],
    ["English", 89, BookOpen],
    ["Urdu", 94, FileText]
  ];

  return (
    <div className="page-stack">
      <div className="academic-hero">
        <div>
          <span className="page-eyebrow">ACADEMICS</span>
          <h1>Academic overview.</h1>
          <p>Understand how your classes are progressing across subjects.</p>
        </div>
        <div className="academic-progress">
          <strong>89.3%</strong>
          <span>Overall average</span>
          <div>
            <i style={{ width: "89%" }} />
          </div>
        </div>
      </div>

      <div className="subject-grid">
        {subjects.map(([name, score, Icon]) => (
          <div className="subject-card" key={name}>
            <div className="subject-head">
              <div className="subject-icon">
                <Icon size={18} />
              </div>
              <span>{score}%</span>
            </div>
            <h3>{name}</h3>
            <p>Class average</p>
            <div className="subject-bar">
              <i style={{ width: `${score}%` }} />
            </div>
            <div className="subject-foot">
              <span>Performance</span>
              <strong>{score >= 90 ? "Excellent" : "On track"}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsPage() {
  const exams = [
    ["24", "Mathematics", "09:00 AM", "Class 9-A"],
    ["27", "Computer Science", "10:30 AM", "Class 9-A"],
    ["30", "Physics", "09:30 AM", "Class 9-B"],
    ["03", "Chemistry", "11:00 AM", "Class 9-A"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">EXAMS</span>
          <h1>Exam schedule.</h1>
          <p>Keep every assessment organized and visible.</p>
        </div>
        <button className="primary-button small">
          <Plus size={16} />
          New exam
        </button>
      </div>

      <div className="exam-overview">
        <div>
          <span>Upcoming exams</span>
          <strong>04</strong>
        </div>
        <div>
          <span>Classes covered</span>
          <strong>03</strong>
        </div>
        <div>
          <span>This month</span>
          <strong>08</strong>
        </div>
        <div>
          <span>Completed</span>
          <strong>18</strong>
        </div>
      </div>

      <div className="timeline-card">
        <div className="card-heading">
          <div>
            <span>EXAM TIMELINE</span>
            <h2>Upcoming assessments</h2>
          </div>
        </div>

        <div className="exam-timeline">
          {exams.map(([date, title, time, className], index) => (
            <div className="exam-line" key={title}>
              <div className="exam-date">
                <strong>{date}</strong>
                <span>SEP</span>
              </div>
              <div className="exam-line-dot" />
              <div className="exam-info">
                <strong>{title}</strong>
                <span>{className}</span>
                <small>
                  <Clock3 size={13} />
                  {time}
                </small>
              </div>
              <span className={`exam-time ${index === 0 ? "" : "draft"}`}>
                {index === 0 ? "Scheduled" : "Upcoming"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarksPage() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">MARKS</span>
          <h1>Marks management.</h1>
          <p>Enter and review academic marks by subject and class.</p>
        </div>
        <button className="primary-button small">
          <Check size={16} />
          Save changes
        </button>
      </div>

      <div className="marks-card">
        <div className="marks-toolbar">
          <div>
            <strong>Mathematics · Class 9-A</strong>
            <span>Mid Term Assessment</span>
          </div>
          <div className="table-summary-actions">
            <button className="outline-button">Class 9-A</button>
            <button className="outline-button">Mathematics</button>
          </div>
        </div>

        <div className="marks-table">
          {students.map((student, index) => (
            <div className="marks-row" key={student.id}>
              <div className="table-student">
                <span>{getInitials(student.name)}</span>
                <strong>{student.name}</strong>
              </div>
              <span>100</span>
              <input defaultValue={Math.max(0, student.avg - index * 2)} />
              <strong>{Math.max(0, student.avg - index * 2)}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ students }) {
  const sorted = [...students].sort((a, b) => b.avg - a.avg);

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">RESULTS</span>
          <h1>Results overview.</h1>
          <p>Understand outcomes across your current academic data.</p>
        </div>
        <button className="outline-button">
          <FileText size={16} />
          Export report
        </button>
      </div>

      <div className="result-stat-grid">
        <StatCard icon={Target} label="Class average" value="87.4%" change="+4.2%" />
        <StatCard icon={AwardIcon} label="Highest score" value="95.2%" change="Top performer" />
        <StatCard icon={ShieldCheck} label="Pass rate" value="96.8%" change="+2.1%" />
        <StatCard icon={TrendingUp} label="Improvement" value="+12.4%" change="vs previous term" />
      </div>

      <div className="results-grid">
        <div className="distribution-card">
          <div className="card-heading compact">
            <div>
              <span>SCORE DISTRIBUTION</span>
              <h2>Class performance</h2>
            </div>
            <PieChart size={18} />
          </div>
          <div className="distribution">
            {[["90–100", 32], ["80–89", 41], ["70–79", 18], ["60–69", 7], ["Below 60", 2]].map(
              ([label, value]) => (
                <div className="distribution-label" key={label}>
                  <span>{label}</span>
                  <div>
                    <i style={{ width: `${value * 2}%` }} />
                  </div>
                  <strong>{value}%</strong>
                </div>
              )
            )}
          </div>
        </div>

        <div className="top-students-card">
          <div className="card-heading compact">
            <div>
              <span>TOP STUDENTS</span>
              <h2>Leading performance</h2>
            </div>
            <AwardIcon />
          </div>

          {sorted.slice(0, 4).map((student, index) => (
            <div className="top-student" key={student.id}>
              <span className="rank">0{index + 1}</span>
              <div>{getInitials(student.name)}</div>
              <strong>{student.name}</strong>
              <b>{student.avg}%</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendancePage() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">ATTENDANCE</span>
          <h1>Attendance overview.</h1>
          <p>Track presence and identify attendance patterns.</p>
        </div>
      </div>

      <div className="attendance-overview">
        <div className="attendance-ring">
          <span>94.8%</span>
          <small>Overall attendance</small>
        </div>
        <div className="attendance-copy">
          <span>THIS MONTH</span>
          <h2>Attendance is healthy.</h2>
          <p>
            Most students are maintaining strong attendance. A small group may
            need follow-up based on recent attendance patterns.
          </p>
          <div className="attendance-mini-stats">
            <div>
              <strong>226</strong>
              <span>Present today</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Absent today</span>
            </div>
            <div>
              <strong>10</strong>
              <span>Late arrivals</span>
            </div>
          </div>
        </div>
      </div>

      <div className="attendance-bars">
        {[
          ["9-A", 96],
          ["9-B", 94],
          ["9-C", 91],
          ["10-A", 97],
          ["10-B", 93]
        ].map(([name, value]) => (
          <div key={name}>
            <span>{name}</span>
            <div>
              <i style={{ width: `${value}%` }} />
            </div>
            <strong>{value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformancePage() {
  const subjects = [
    ["Mathematics", 92, "+6.2%", "up"],
    ["Computer Science", 96, "+8.4%", "up"],
    ["Physics", 84, "+2.1%", "up"],
    ["Chemistry", 81, "-1.8%", "down"],
    ["English", 89, "+4.7%", "up"]
  ];

  return (
    <div className="page-stack">
      <div className="performance-hero">
        <div>
          <span className="page-eyebrow">PERFORMANCE</span>
          <h1>Performance intelligence.</h1>
          <p>
            See where students are progressing and where support may be
            needed.
          </p>
        </div>
        <div className="performance-score">
          <span>OVERALL SCORE</span>
          <strong>87.4</strong>
          <small>/ 100</small>
        </div>
      </div>

      <div className="performance-copy">
        <div>
          <span>TERM PERFORMANCE</span>
          <h2>Students are trending upward.</h2>
          <p>
            Overall academic performance increased across most subjects during
            the current assessment period.
          </p>
        </div>
        <div className="performance-mini-chart">
          <svg viewBox="0 0 300 110" preserveAspectRatio="none">
            <path
              d="M0 88 C30 82 48 72 72 77 C100 82 115 60 142 66 C170 72 190 45 212 52 C240 60 260 27 300 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      <div className="performance-subjects">
        {subjects.map(([name, score, change, direction], index) => (
          <div className="performance-subject" key={name}>
            <div className="subject-rank">0{index + 1}</div>
            <div className="performance-subject-name">
              <strong>{name}</strong>
              <span>Class average</span>
            </div>
            <strong className="performance-score-small">{score}%</strong>
            <span className={`change ${direction}`}>{change}</span>
            <div className="performance-progress">
              <i style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Hi Faizan. I’m SchoolMarks AI. Ask me anything about your academic data."
    },
    {
      type: "assistant",
      text: "For example, I can help identify students who need attention, compare class performance, or summarize attendance."
    }
  ]);

  const ask = (text = question) => {
    if (!text.trim()) return;

    const answer =
      text.toLowerCase().includes("attendance")
        ? "Overall attendance is 94.8%. The strongest attendance is currently in Class 10-A, while Class 9-C has the most room for improvement."
        : text.toLowerCase().includes("performance")
        ? "The current academic average is 87.4%. Computer Science is the strongest subject at 96%, followed by Mathematics at 92%."
        : "Based on the current SchoolMarks data, 12 students may need additional attention. The main signals are lower academic averages and attendance patterns.";

    setMessages((current) => [
      ...current,
      { type: "user", text },
      { type: "assistant", text: answer }
    ]);
    setQuestion("");
  };

  return (
    <div className="ai-page">
      <div className="ai-workspace-head">
        <div>
          <span className="page-eyebrow">SCHOOLMARKS AI</span>
          <h1>Academic intelligence.</h1>
          <p>Ask questions. Explore patterns. Understand your students.</p>
        </div>
        <div className="ai-live">
          <i />
          AI online
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat">
          <div className="chat-header">
            <div className="chat-agent">
              <div className="chat-agent-icon">
                <Sparkles size={17} />
              </div>
              <div>
                <strong>SchoolMarks AI</strong>
                <span>Academic assistant</span>
              </div>
            </div>

            <div className="chat-modes">
              <button className="active">Ask</button>
              <button>Analyze</button>
              <button>Summarize</button>
            </div>
          </div>

          <div className="chat-scroll">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.type}`} key={index}>
                <div className="message-avatar">
                  {message.type === "assistant" ? <Sparkles size={14} /> : "FK"}
                </div>
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}

            <div className="chat-message assistant">
              <div className="message-avatar">
                <Sparkles size={14} />
              </div>
              <div className="message-bubble">
                <strong>Try asking:</strong>
                <div className="chat-answer-list">
                  <button onClick={() => ask("Which students need attention?")}>
                    Which students need attention?
                  </button>
                  <button onClick={() => ask("How is class performance?")}>
                    How is class performance?
                  </button>
                  <button onClick={() => ask("Show attendance insights")}>
                    Show attendance insights
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-composer">
            <div className="composer-input">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") ask();
                }}
                placeholder="Ask SchoolMarks AI..."
              />
              <button onClick={() => ask()}>
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="ai-tools">
              <span>
                <Sparkles size={13} />
                AI-powered insights
              </span>
              <span>Enter to send</span>
            </div>
          </div>
        </div>

        <aside className="ai-tools-panel">
          <div className="ai-tools-head">
            <span>INTELLIGENCE</span>
            <strong>Quick tools</strong>
          </div>

          <div className="tool-list">
            <button className="tool-item" onClick={() => ask("Show class performance")}>
              <div>
                <BarChart3 size={17} />
              </div>
              <span>
                <strong>Analyze performance</strong>
                <small>Find trends across classes</small>
              </span>
              <ChevronRight size={15} />
            </button>

            <button className="tool-item" onClick={() => ask("Show attendance insights")}>
              <div>
                <UserCheck size={17} />
              </div>
              <span>
                <strong>Review attendance</strong>
                <small>Find attendance patterns</small>
              </span>
              <ChevronRight size={15} />
            </button>

            <button className="tool-item" onClick={() => ask("Which students need attention?")}>
              <div>
                <ShieldCheck size={17} />
              </div>
              <span>
                <strong>Find at-risk students</strong>
                <small>Identify students needing support</small>
              </span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="live-signals">
            <span>LIVE SIGNALS</span>
            <div>
              <i className="success" />
              <span>Academic data synced</span>
            </div>
            <div>
              <i className="success" />
              <span>Attendance updated</span>
            </div>
            <div>
              <i className="warning" />
              <span>12 students need review</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AwardIcon() {
  return <span className="award-icon">★</span>;
}

function AppLayout({ page, setPage, students, setStudents }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = useMemo(() => {
    switch (page) {
      case "students":
        return <StudentsPage students={students} setStudents={setStudents} />;
      case "academics":
        return <AcademicsPage />;
      case "exams":
        return <ExamsPage />;
      case "marks":
        return <MarksPage />;
      case "results":
        return <ResultsPage students={students} />;
      case "attendance":
        return <AttendancePage />;
      case "performance":
        return <PerformancePage />;
      case "ai":
        return <AIPage />;
      default:
        return <DashboardPage students={students} />;
    }
  }, [page, students, setStudents]);

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="app-main">
        <Topbar setMobileOpen={setMobileOpen} setPage={setPage} />
        <main className="app-content">{content}</main>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [students, setStudents] = useState(studentsSeed);

  if (page === "home") {
    return <HomePage onOpenApp={() => setPage("dashboard")} />;
  }

  return (
    <AppLayout
      page={page}
      setPage={setPage}
      students={students}
      setStudents={setStudents}
    />
  );
}