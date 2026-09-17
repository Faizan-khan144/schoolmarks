import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileText,
  Filter,
  GraduationCap,
  Home,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  Send,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
  BrainCircuit
} from "lucide-react";

const students = [
  { name: "Ayaan Khan", className: "9-A", average: 87, attendance: 96, status: "Excellent" },
  { name: "Zayan Ahmed", className: "9-B", average: 51, attendance: 73, status: "At Risk" },
  { name: "Maham Ali", className: "9-A", average: 82, attendance: 91, status: "Good" },
  { name: "Hassan Raza", className: "9-C", average: 76, attendance: 88, status: "Good" },
  { name: "Areeba Khan", className: "9-B", average: 91, attendance: 98, status: "Excellent" },
  { name: "Rayyan Malik", className: "9-C", average: 64, attendance: 79, status: "Attention" },
  { name: "Hiba Noor", className: "9-A", average: 84, attendance: 94, status: "Good" },
  { name: "Hamza Ali", className: "9-C", average: 72, attendance: 86, status: "Good" }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: ClipboardCheck },
  { id: "marks", label: "Marks & Results", icon: FileText },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "ai", label: "AI Assistant", icon: BrainCircuit }
];

const modules = [
  {
    icon: Users,
    number: "01",
    title: "Student Management",
    text: "Keep profiles, classes, enrollment and academic records organized in one connected workspace."
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Academic Management",
    text: "Structure subjects, classes and academic information without scattered records."
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Examinations",
    text: "Plan assessments, schedules and examination workflows from one place."
  },
  {
    icon: Award,
    number: "04",
    title: "Marks & Results",
    text: "Record marks, calculate performance and understand academic outcomes."
  },
  {
    icon: UserCheck,
    number: "05",
    title: "Attendance",
    text: "Track attendance patterns and surface students who need attention."
  },
  {
    icon: LineChart,
    number: "06",
    title: "Analytics",
    text: "Transform raw academic records into visual trends and useful signals."
  }
];

const questions = [
  "Who needs attention?",
  "Show attendance",
  "Who are the top students?",
  "What is the weakest subject?",
  "What exams are coming?",
  "Compare student performance"
];

function Logo({ dark = false }) {
  return (
    <div className={`brand ${dark ? "brand-dark" : ""}`}>
      <div className="brand-mark">
        <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" />
      </div>
      <div className="brand-text">
        <strong>SchoolMarks</strong>
        <span>Academic Intelligence</span>
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const [show, setShow] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) setShow(true);
      },
      { threshold: 0.08 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} reveal ${show ? "reveal-visible" : ""}`}>
      {children}
    </div>
  );
}

function MiniChart({ large = false }) {
  return (
    <div className={`mini-chart ${large ? "mini-chart-large" : ""}`}>
      <div className="chart-grid">
        <i />
        <i />
        <i />
        <i />
      </div>

      <svg viewBox="0 0 600 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3f8f5d" stopOpacity=".25" />
            <stop offset="100%" stopColor="#3f8f5d" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="chart-area"
          d="M0 180 C55 170 80 145 125 153 C175 162 205 117 255 126 C300 136 320 92 365 105 C410 118 438 78 478 86 C525 96 550 42 600 50 L600 220 L0 220 Z"
        />

        <path
          className="chart-line"
          d="M0 180 C55 170 80 145 125 153 C175 162 205 117 255 126 C300 136 320 92 365 105 C410 118 438 78 478 86 C525 96 550 42 600 50"
        />

        <circle className="chart-dot" cx="600" cy="50" r="5" />
      </svg>

      <div className="chart-labels">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}

function ProgressRing({ value = 94.6 }) {
  return (
    <div
      className="progress-ring"
      style={{ "--progress": `${value * 3.6}deg` }}
    >
      <div className="ring-inner">
        <strong>{value}%</strong>
        <span>Present</span>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="hero-dashboard">
      <div className="mockup-top">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>schoolmarks.app/dashboard</span>
        <MoreHorizontal size={16} />
      </div>

      <div className="mockup-body">
        <aside className="mockup-sidebar">
          <div className="mockup-logo">
            <span>SM</span>
            <strong>SchoolMarks</strong>
          </div>

          <div className="mock-nav active">
            <LayoutDashboard size={14} />
            Dashboard
          </div>
          <div className="mock-nav">
            <Users size={14} />
            Students
          </div>
          <div className="mock-nav">
            <BookOpen size={14} />
            Academics
          </div>
          <div className="mock-nav">
            <BarChart3 size={14} />
            Analytics
          </div>
          <div className="mock-nav">
            <BrainCircuit size={14} />
            Intelligence
          </div>
        </aside>

        <div className="mock-content">
          <div className="mock-heading">
            <div>
              <span>OVERVIEW</span>
              <h3>School Overview</h3>
            </div>
            <div className="mock-avatar">FK</div>
          </div>

          <div className="mock-stats">
            <div>
              <strong>248</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>94.6%</strong>
              <span>Attendance</span>
            </div>
            <div>
              <strong>82.7%</strong>
              <span>Average</span>
            </div>
            <div>
              <strong>6</strong>
              <span>At risk</span>
            </div>
          </div>

          <div className="mock-grid">
            <div className="mock-card mock-chart">
              <div className="mock-card-head">
                <div>
                  <span>Performance trend</span>
                  <strong>+12.8%</strong>
                </div>
                <small>6 months</small>
              </div>
              <MiniChart />
            </div>

            <div className="mock-card mock-attendance">
              <div className="mock-card-head">
                <span>Attendance</span>
                <MoreHorizontal size={14} />
              </div>

              <ProgressRing />

              <div className="mock-legend">
                <span><i className="green-dot" /> Present</span>
                <span><i className="yellow-dot" /> Late</span>
                <span><i className="red-dot" /> Absent</span>
              </div>
            </div>

            <div className="mock-card mock-students">
              <div className="mock-card-head">
                <span>Top students</span>
                <small>View all</small>
              </div>

              {students.slice(0, 3).map(student => (
                <div className="mock-student" key={student.name}>
                  <div>{student.name.split(" ").map(x => x[0]).join("")}</div>
                  <span>{student.name}</span>
                  <strong>{student.average}%</strong>
                </div>
              ))}
            </div>

            <div className="mock-card mock-ai">
              <div className="mock-ai-title">
                <div><Sparkles size={15} /></div>
                <span>SchoolMarks AI<small>Live intelligence</small></span>
              </div>
              <p>6 students may need additional academic attention.</p>
              <div className="mock-tags">
                <span>Risk</span>
                <span>Attendance</span>
                <span>Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onOpenDashboard, onOpenAI }) {
  return (
    <div className="site">
      <nav className="public-nav">
        <div className="container nav-inner">
          <Logo />

          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#workflow">Workflow</a>
            <a href="#analytics">Analytics</a>
            <a href="#intelligence">Intelligence</a>
          </div>

          <div className="nav-actions">
            <button className="nav-ai" onClick={onOpenAI}>
              <BrainCircuit size={15} />
              AI Lab
            </button>

            <button className="nav-button" onClick={onOpenDashboard}>
              Open platform
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-grid-lines" />

          <div className="container hero-container">
            <div className="hero-copy">
              <div className="hero-label">
                <span className="pulse-dot" />
                SCHOOL MANAGEMENT, REIMAGINED
              </div>

              <h1>
                Your school.
                <br />
                <em>One intelligent workspace.</em>
              </h1>

              <p>
                SchoolMarks connects students, academics, attendance,
                examinations, results and performance intelligence into one
                modern platform.
              </p>

              <div className="hero-buttons">
                <button className="primary-button" onClick={onOpenDashboard}>
                  Explore SchoolMarks
                  <ArrowRight size={17} />
                </button>

                <button className="ghost-button" onClick={onOpenAI}>
                  Explore AI
                  <Sparkles size={16} />
                </button>
              </div>

              <div className="hero-metrics">
                <div>
                  <strong>248+</strong>
                  <span>Students</span>
                </div>
                <div>
                  <strong>94.6%</strong>
                  <span>Attendance</span>
                </div>
                <div>
                  <strong>82.7%</strong>
                  <span>Performance</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <DashboardMockup />

              <div className="floating-card floating-performance">
                <div className="floating-icon"><TrendingUp size={16} /></div>
                <div>
                  <strong>+12.8%</strong>
                  <span>Performance trend</span>
                </div>
              </div>

              <div className="floating-card floating-attendance">
                <div className="floating-icon"><UserCheck size={16} /></div>
                <div>
                  <strong>94.6%</strong>
                  <span>Attendance today</span>
                </div>
              </div>

              <div className="floating-card floating-ai">
                <Sparkles size={15} />
                <span>AI insight generated</span>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <div className="container logo-strip-inner">
            <span>ONE PLATFORM</span>
            <i />
            <span>CONNECTED RECORDS</span>
            <i />
            <span>SMARTER REPORTING</span>
            <i />
            <span>ACADEMIC INTELLIGENCE</span>
          </div>
        </section>

        <Reveal className="intro-section">
          <div className="container intro-grid">
            <div className="intro-title">
              <span className="eyebrow">THE MODERN SCHOOL</span>
              <h2>Everything important should work together.</h2>
            </div>

            <div className="intro-copy">
              <p>
                School operations become difficult when student records,
                attendance, marks and analytics live in separate systems.
              </p>

              <p>
                SchoolMarks creates one connected layer where information can
                move naturally from classroom activity to useful insight.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="platform-section" >
          <div className="container" id="platform">
            <div className="section-head centered">
              <span className="eyebrow">THE PLATFORM</span>
              <h2>Built around the entire academic journey.</h2>
              <p>
                Six connected areas. One clean workspace.
              </p>
            </div>

            <div className="module-grid">
              {modules.map(item => {
                const Icon = item.icon;

                return (
                  <div className="module-card" key={item.number}>
                    <div className="module-top">
                      <span>{item.number}</span>
                      <ArrowUpRight size={17} />
                    </div>

                    <div className="module-icon">
                      <Icon size={21} />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>

                    <div className="module-line" />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal className="bento-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">DESIGNED FOR CLARITY</span>
              <h2>Not another spreadsheet with a nicer logo.</h2>
            </div>

            <div className="bento-grid">
              <div className="bento-card bento-large">
                <div className="bento-copy">
                  <span>01 · CENTRALIZED</span>
                  <h3>One source of truth for your school.</h3>
                  <p>
                    Student records, attendance, results and performance stay
                    connected instead of being scattered across files.
                  </p>
                </div>

                <div className="bento-stack">
                  <div><Users size={16} /> Students <Check size={15} /></div>
                  <div><BookOpen size={16} /> Academics <Check size={15} /></div>
                  <div><BarChart3 size={16} /> Analytics <Check size={15} /></div>
                  <div><BrainCircuit size={16} /> Intelligence <Check size={15} /></div>
                </div>
              </div>

              <div className="bento-card bento-green">
                <div className="bento-mini-icon"><TrendingUp size={18} /></div>
                <span>PERFORMANCE</span>
                <strong>82.7%</strong>
                <p>Academic average</p>
                <div className="bento-mini-chart">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="bento-card">
                <div className="bento-mini-icon"><UserCheck size={18} /></div>
                <span>ATTENDANCE</span>
                <strong>94.6%</strong>
                <p>Current presence rate</p>
                <ProgressRing value={94.6} />
              </div>

              <div className="bento-card bento-wide">
                <div>
                  <span>02 · INTELLIGENCE</span>
                  <h3>Ask questions. Get useful signals.</h3>
                  <p>
                    SchoolMarks Intelligence turns school data into answers
                    that are easier to understand and act on.
                  </p>
                </div>

                <button onClick={onOpenAI}>
                  Open AI Assistant
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="workflow-section" id="workflow">
          <div className="container">
            <div className="section-head centered">
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>From school setup to meaningful insight.</h2>
              <p>A simple workflow designed to keep everything connected.</p>
            </div>

            <div className="workflow-layout">
              <div className="workflow-list">
                {[
                  ["01", "Set up your school", "Create your academic structure."],
                  ["02", "Add students", "Organize student profiles and classes."],
                  ["03", "Track attendance", "Record daily attendance in one place."],
                  ["04", "Enter marks", "Capture assessment results."],
                  ["05", "Analyze performance", "Understand academic trends."],
                  ["06", "Ask AI", "Explore your data with natural questions."]
                ].map(([number, title, text], index) => (
                  <div className={`workflow-item ${index === 5 ? "workflow-final" : ""}`} key={number}>
                    <div className="workflow-number">{number}</div>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    <ArrowRight size={17} />
                  </div>
                ))}
              </div>

              <div className="workflow-preview">
                <div className="workflow-orb" />
                <div className="workflow-stat">
                  <span>School performance</span>
                  <strong>82.7%</strong>
                  <small><TrendingUp size={12} /> +8.4%</small>
                </div>
                <MiniChart large />
                <div className="workflow-floating">
                  <Sparkles size={15} />
                  <span>Pattern detected</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="analytics-section" id="analytics">
          <div className="container analytics-layout">
            <div className="analytics-copy">
              <span className="eyebrow">PERFORMANCE ANALYTICS</span>
              <h2>See the signals hiding inside your data.</h2>
              <p>
                Raw academic records become visual trends, attendance patterns
                and student-level signals.
              </p>

              <div className="signal-list">
                <div><Check size={16} /> Class performance trends</div>
                <div><Check size={16} /> Attendance risk signals</div>
                <div><Check size={16} /> Student performance tracking</div>
                <div><Check size={16} /> Assessment result insights</div>
              </div>

              <button className="text-link" onClick={onOpenDashboard}>
                Explore analytics
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="analytics-visual">
              <div className="analytics-main">
                <div className="analytics-head">
                  <div>
                    <span>Class performance</span>
                    <strong>82.7%</strong>
                  </div>
                  <span className="trend">+8.4%</span>
                </div>
                <MiniChart large />
              </div>

              <div className="analytics-float analytics-float-one">
                <TrendingUp size={16} />
                <div>
                  <strong>+12.8%</strong>
                  <span>Performance trend</span>
                </div>
              </div>

              <div className="analytics-float analytics-float-two">
                <UserCheck size={16} />
                <div>
                  <strong>94.6%</strong>
                  <span>Attendance</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="intelligence-section" id="intelligence">
          <div className="container">
            <div className="intelligence-banner">
              <div className="intelligence-copy">
                <div className="ai-symbol">
                  <BrainCircuit size={22} />
                </div>
                <span className="eyebrow">SCHOOLMARKS INTELLIGENCE</span>
                <h2>Your school data can answer questions.</h2>
                <p>
                  Ask about attendance, students, performance, exams and
                  results using natural language.
                </p>

                <button className="primary-button" onClick={onOpenAI}>
                  Open AI Assistant
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="intelligence-chat">
                <div className="chat-top">
                  <div>
                    <span className="online-dot" />
                    SchoolMarks AI
                  </div>
                  <small>Local intelligence</small>
                </div>

                <div className="chat-bubble">
                  <div className="chat-avatar"><Sparkles size={14} /></div>
                  <div>
                    <span>SchoolMarks AI</span>
                    <p>What would you like to understand?</p>
                  </div>
                </div>

                <div className="chat-question">
                  Who needs attention?
                  <ArrowRight size={14} />
                </div>

                <div className="chat-answer">
                  <div className="chat-avatar"><BrainCircuit size={14} /></div>
                  <div>
                    <span>Insight</span>
                    <p>
                      6 students are currently flagged for additional
                      attention.
                    </p>
                    <div>
                      <b>Zayan · 51%</b>
                      <b>Rayyan · 64%</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="comparison-section">
          <div className="container">
            <div className="section-head centered">
              <span className="eyebrow">THE DIFFERENCE</span>
              <h2>Move from scattered information to connected intelligence.</h2>
            </div>

            <div className="comparison">
              <div className="comparison-side old">
                <span>TRADITIONAL WORKFLOW</span>
                <div><X size={16} /> Separate spreadsheets</div>
                <div><X size={16} /> Manual calculations</div>
                <div><X size={16} /> Delayed insights</div>
                <div><X size={16} /> Difficult reporting</div>
              </div>

              <div className="comparison-middle">
                <Sparkles size={19} />
              </div>

              <div className="comparison-side new">
                <span>SCHOOLMARKS</span>
                <div><Check size={16} /> Connected records</div>
                <div><Check size={16} /> Clear analytics</div>
                <div><Check size={16} /> Actionable signals</div>
                <div><Check size={16} /> Intelligent answers</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="timeline-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">A BETTER SCHOOL DAY</span>
              <h2>Everything has a place.</h2>
            </div>

            <div className="timeline">
              <div>
                <span>08:00</span>
                <strong>Attendance</strong>
                <p>Daily presence is recorded.</p>
              </div>
              <div>
                <span>10:30</span>
                <strong>Academics</strong>
                <p>Class activity stays organized.</p>
              </div>
              <div>
                <span>13:00</span>
                <strong>Assessments</strong>
                <p>Marks move into the academic record.</p>
              </div>
              <div>
                <span>15:30</span>
                <strong>Analytics</strong>
                <p>Performance trends become visible.</p>
              </div>
              <div>
                <span>16:00</span>
                <strong>AI Insight</strong>
                <p>Questions become answers.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <span className="eyebrow">READY TO EXPLORE?</span>
                <h2>Make your school data work harder.</h2>
                <p>
                  Explore the SchoolMarks workspace and intelligence layer.
                </p>

                <button className="primary-button" onClick={onOpenDashboard}>
                  Open SchoolMarks
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="cta-visual">
                <div><Users size={17} /><strong>248</strong><span>Students</span></div>
                <div><TrendingUp size={17} /><strong>82.7%</strong><span>Performance</span></div>
                <div><BrainCircuit size={17} /><strong>AI</strong><span>Intelligence</span></div>
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <Logo />
          <div>
            <span>Platform</span>
            <a href="#platform">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#analytics">Analytics</a>
          </div>
          <div>
            <span>Intelligence</span>
            <a href="#intelligence">AI Assistant</a>
            <a href="#analytics">Performance</a>
            <a href="#workflow">Insights</a>
          </div>
          <div className="footer-last">
            <span>SchoolMarks</span>
            <p>Academic Intelligence Platform.</p>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 SchoolMarks</span>
          <span>Built for modern education.</span>
        </div>
      </footer>
    </div>
  );
}

function AppSidebar({ active, onNavigate, onBack }) {
  const [open, setOpen] = useState(false);

  const go = id => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <aside className={`app-sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <Logo dark />
        </div>

        <div className="school-switcher">
          <div className="school-avatar">SM</div>
          <div>
            <strong>SchoolMarks Academy</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={14} />
        </div>

        <div className="sidebar-title">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={active === item.id ? "sidebar-link active" : "sidebar-link"}
                onClick={() => go(item.id)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === "ai" && <b>AI</b>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-title">SYSTEM</div>

          <button className="sidebar-link">
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <button className="sidebar-link" onClick={onBack}>
            <Home size={17} />
            <span>Back to website</span>
          </button>
        </div>
      </aside>

      {open && (
        <button className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      <button className="mobile-menu-button" onClick={() => setOpen(true)}>
        <Menu size={21} />
      </button>
    </>
  );
}

function AppTopbar({ active }) {
  const item = navItems.find(x => x.id === active);

  return (
    <header className="app-topbar">
      <div className="breadcrumb">
        <span>SchoolMarks</span>
        <ArrowRight size={13} />
        <strong>{item?.label || "Overview"}</strong>
      </div>

      <div className="topbar-right">
        <button className="topbar-icon">
          <Search size={18} />
        </button>

        <button className="topbar-icon notification">
          <Bell size={18} />
          <i />
        </button>

        <div className="profile">
          <div className="profile-avatar">FK</div>
          <div>
            <strong>Faizan Khan</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}

function AppShell({ active, onNavigate, onBack, children }) {
  return (
    <div className="app-shell">
      <AppSidebar
        active={active}
        onNavigate={onNavigate}
        onBack={onBack}
      />

      <div className="app-main">
        <AppTopbar active={active} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, negative }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>
        <MoreHorizontal size={17} />
      </div>

      <span>{label}</span>

      <div className="stat-value">
        <strong>{value}</strong>
        <small className={negative ? "negative" : ""}>
          {negative ? "−" : "+"}{change}
        </small>
      </div>
    </div>
  );
}

function PerformanceCard() {
  return (
    <div className="workspace-card performance-workspace">
      <div className="workspace-card-head">
        <div>
          <span>Performance trend</span>
          <strong>Academic average</strong>
        </div>
        <button>Last 6 months <ChevronDown size={13} /></button>
      </div>

      <div className="performance-number">
        <strong>82.7%</strong>
        <span><TrendingUp size={14} /> 8.4% vs previous period</span>
      </div>

      <MiniChart large />
    </div>
  );
}

function AttendanceCard() {
  return (
    <div className="workspace-card attendance-workspace">
      <div className="workspace-card-head">
        <div>
          <span>Attendance overview</span>
          <strong>Daily presence</strong>
        </div>
        <MoreHorizontal size={17} />
      </div>

      <div className="attendance-layout">
        <ProgressRing />

        <div className="attendance-list">
          <div>
            <span><i className="present-dot" /> Present</span>
            <strong>235</strong>
          </div>
          <div>
            <span><i className="late-dot" /> Late</span>
            <strong>7</strong>
          </div>
          <div>
            <span><i className="absent-dot" /> Absent</span>
            <strong>6</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsTable() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return students.filter(student =>
      `${student.name} ${student.className}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="workspace-card table-workspace">
      <div className="workspace-card-head">
        <div>
          <span>Student performance</span>
          <strong>Recent academic overview</strong>
        </div>

        <button className="outline-button">
          <Plus size={15} />
          Add student
        </button>
      </div>

      <div className="table-toolbar">
        <div className="table-search">
          <Search size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search students..."
          />
        </div>

        <button className="filter-button">
          <Filter size={15} />
          Filter
        </button>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Average</th>
              <th>Attendance</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {filtered.map(student => (
              <tr key={student.name}>
                <td>
                  <div className="student-cell">
                    <div className="table-avatar">
                      {student.name.split(" ").map(x => x[0]).join("")}
                    </div>
                    <strong>{student.name}</strong>
                  </div>
                </td>

                <td>{student.className}</td>

                <td>
                  <div className="score-cell">
                    <strong>{student.average}%</strong>
                    <div>
                      <i style={{ width: `${student.average}%` }} />
                    </div>
                  </div>
                </td>

                <td>{student.attendance}%</td>

                <td>
                  <span className={`status ${student.status.toLowerCase().replace(" ", "-")}`}>
                    <i />
                    {student.status}
                  </span>
                </td>

                <td>
                  <MoreHorizontal size={17} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UpcomingExams() {
  const exams = [
    ["Mathematics", "21 Sep", "9-A"],
    ["English", "24 Sep", "9-B"],
    ["Computer", "27 Sep", "9-C"],
    ["Science", "30 Sep", "9-A"]
  ];

  return (
    <div className="workspace-card exams-workspace">
      <div className="workspace-card-head">
        <div>
          <span>Upcoming examinations</span>
          <strong>Next assessments</strong>
        </div>
        <ArrowUpRight size={16} />
      </div>

      <div className="exam-list">
        {exams.map(([subject, date, className]) => (
          <div className="exam-item" key={subject}>
            <div className="exam-icon">
              <BookOpen size={16} />
            </div>

            <div>
              <strong>{subject}</strong>
              <span>{className} · Assessment</span>
            </div>

            <strong>{date}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    ["Areeba Khan", "received 91% in Mathematics", "8 min ago"],
    ["Admin", "updated Class 9-B attendance", "24 min ago"],
    ["Hassan Raza", "completed Computer assessment", "42 min ago"],
    ["Admin", "published September exam schedule", "1 hr ago"]
  ];

  return (
    <div className="workspace-card activity-workspace">
      <div className="workspace-card-head">
        <div>
          <span>Recent activity</span>
          <strong>Latest updates</strong>
        </div>
        <RefreshCcw size={16} />
      </div>

      <div className="activity-list">
        {activities.map(([name, text, time], index) => (
          <div className="activity-item" key={time}>
            <i className={`activity-dot activity-dot-${index}`} />
            <div>
              <p><strong>{name}</strong> {text}</p>
              <span><Clock3 size={12} /> {time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage({ onNavigate, onBack }) {
  return (
    <AppShell active="dashboard" onNavigate={onNavigate} onBack={onBack}>
      <div className="workspace-header">
        <div>
          <div className="workspace-eyebrow">
            <span /> SCHOOL OVERVIEW
          </div>
          <h1>Good evening, Faizan.</h1>
          <p>Here’s what’s happening across your school today.</p>
        </div>

        <div className="workspace-actions">
          <button className="date-button">
            <CalendarDays size={16} />
            17 Sep 2026
          </button>

          <button className="workspace-ai-button" onClick={() => onNavigate("ai")}>
            <Sparkles size={16} />
            Ask AI
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={Users} label="Total students" value="248" change="8.2%" />
        <StatCard icon={UserCheck} label="Attendance" value="94.6%" change="2.1%" />
        <StatCard icon={TrendingUp} label="Average performance" value="82.7%" change="8.4%" />
        <StatCard icon={Target} label="Students at risk" value="6" change="1.4%" negative />
      </div>

      <div className="dashboard-grid">
        <PerformanceCard />
        <AttendanceCard />
      </div>

      <div className="dashboard-grid secondary">
        <StudentsTable />
        <UpcomingExams />
      </div>

      <div className="dashboard-grid secondary">
        <div className="workspace-card insight-workspace">
          <div className="insight-bg" />

          <div className="workspace-card-head">
            <div>
              <span>Intelligent insight</span>
              <strong>Something worth noticing</strong>
            </div>
            <div className="insight-icon">
              <BrainCircuit size={18} />
            </div>
          </div>

          <div className="insight-content">
            <div>
              <Sparkles size={17} />
              <strong>Attendance needs attention</strong>
            </div>

            <p>
              2 students currently have attendance below 80%.
              Zayan Ahmed has 73% attendance and a 51% academic average.
            </p>

            <button onClick={() => onNavigate("ai")}>
              Investigate with AI
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <RecentActivity />
      </div>
    </AppShell>
  );
}

function StudentsPage({ onNavigate, onBack }) {
  const [search, setSearch] = useState("");

  const filtered = students.filter(student =>
    `${student.name} ${student.className}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <AppShell active="students" onNavigate={onNavigate} onBack={onBack}>
      <div className="workspace-header">
        <div>
          <div className="workspace-eyebrow"><span /> STUDENT MANAGEMENT</div>
          <h1>Students</h1>
          <p>Manage student profiles and academic performance.</p>
        </div>

        <button className="workspace-ai-button">
          <Plus size={16} />
          Add student
        </button>
      </div>

      <div className="student-summary-grid">
        <div><Users size={19} /><span>Total students</span><strong>248</strong></div>
        <div><GraduationCap size={19} /><span>Classes</span><strong>12</strong></div>
        <div><Award size={19} /><span>Excellent</span><strong>86</strong></div>
        <div><Target size={19} /><span>Needs attention</span><strong>6</strong></div>
      </div>

      <div className="workspace-card full-table-card">
        <div className="workspace-card-head">
          <div>
            <span>All students</span>
            <strong>Academic records</strong>
          </div>
        </div>

        <div className="table-toolbar">
          <div className="table-search">
            <Search size={16} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or class..."
            />
          </div>

          <button className="filter-button">
            <Filter size={15} />
            Filters
          </button>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Average</th>
                <th>Attendance</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(student => (
                <tr key={student.name}>
                  <td>
                    <div className="student-cell">
                      <div className="table-avatar">
                        {student.name.split(" ").map(x => x[0]).join("")}
                      </div>
                      <strong>{student.name}</strong>
                    </div>
                  </td>
                  <td>{student.className}</td>
                  <td>{student.average}%</td>
                  <td>{student.attendance}%</td>
                  <td>
                    <span className={`status ${student.status.toLowerCase().replace(" ", "-")}`}>
                      <i />
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function GenericPage({ type, onNavigate, onBack }) {
  const data = {
    academics: {
      eyebrow: "ACADEMIC MANAGEMENT",
      title: "Academics",
      text: "Organize subjects, classes, teachers and academic structures.",
      icon: BookOpen
    },
    exams: {
      eyebrow: "EXAMINATIONS",
      title: "Examinations",
      text: "Plan upcoming assessments and examination workflows.",
      icon: ClipboardCheck
    },
    marks: {
      eyebrow: "MARKS & RESULTS",
      title: "Marks & Results",
      text: "Record assessment marks and monitor academic outcomes.",
      icon: FileText
    },
    attendance: {
      eyebrow: "ATTENDANCE",
      title: "Attendance",
      text: "Track daily presence and identify attendance patterns.",
      icon: UserCheck
    },
    performance: {
      eyebrow: "PERFORMANCE ANALYTICS",
      title: "Performance",
      text: "Understand trends across classes, subjects and students.",
      icon: TrendingUp
    }
  }[type];

  const Icon = data.icon;

  return (
    <AppShell active={type} onNavigate={onNavigate} onBack={onBack}>
      <div className="workspace-header">
        <div>
          <div className="workspace-eyebrow"><span /> {data.eyebrow}</div>
          <h1>{data.title}</h1>
          <p>{data.text}</p>
        </div>

        <button className="workspace-ai-button" onClick={() => onNavigate("ai")}>
          <Sparkles size={16} />
          Ask AI
        </button>
      </div>

      <div className="generic-hero-card">
        <div className="generic-icon">
          <Icon size={25} />
        </div>

        <span>SchoolMarks workspace</span>
        <h2>{data.title} workspace</h2>
        <p>
          This area is ready to connect with your school data and workflows.
          Use the navigation to explore another part of SchoolMarks.
        </p>

        <div className="generic-stats">
          <div><strong>248</strong><span>Students</span></div>
          <div><strong>82.7%</strong><span>Average</span></div>
          <div><strong>94.6%</strong><span>Attendance</span></div>
        </div>
      </div>
    </AppShell>
  );
}

function generateAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("attendance") || q.includes("present") || q.includes("absent")) {
    return {
      title: "Attendance overview",
      text: "Overall attendance is 94.6%. There are 235 students present, 7 marked late and 6 absent. Two students are currently below the 80% attendance threshold.",
      tags: ["94.6% attendance", "6 absent", "2 need attention"]
    };
  }

  if (
    q.includes("attention") ||
    q.includes("risk") ||
    q.includes("struggling") ||
    q.includes("weak")
  ) {
    return {
      title: "Students needing attention",
      text: "The current dataset flags 6 students for additional attention. Zayan Ahmed has the lowest academic average at 51% with 73% attendance, while Rayyan Malik is at 64% with 79% attendance.",
      tags: ["6 flagged", "Zayan · 51%", "Rayyan · 64%"]
    };
  }

  if (
    q.includes("top") ||
    q.includes("best") ||
    q.includes("highest") ||
    q.includes("ranking")
  ) {
    return {
      title: "Top academic performers",
      text: "Areeba Khan currently has the highest recorded average at 91%, followed by Ayaan Khan at 87% and Maham Ali at 82%.",
      tags: ["Areeba · 91%", "Ayaan · 87%", "Maham · 82%"]
    };
  }

  if (q.includes("subject") || q.includes("mathematics") || q.includes("math")) {
    return {
      title: "Subject performance",
      text: "Mathematics is currently showing the weakest overall trend in the available assessment dataset.",
      tags: ["Mathematics", "Assessment trend", "Class breakdown"]
    };
  }

  if (q.includes("exam") || q.includes("test") || q.includes("assessment")) {
    return {
      title: "Upcoming examinations",
      text: "The next scheduled assessment is Mathematics on 21 September for Class 9-A. English follows on 24 September, Computer on 27 September and Science on 30 September.",
      tags: ["21 Sep · Mathematics", "24 Sep · English", "27 Sep · Computer"]
    };
  }

  if (q.includes("class") || q.includes("compare")) {
    return {
      title: "Class performance",
      text: "The current school-wide academic average is 82.7%. Class-level comparison can be explored using marks, attendance and assessment history.",
      tags: ["82.7% average", "Class comparison", "Performance"]
    };
  }

  if (q.includes("mark") || q.includes("result") || q.includes("score")) {
    return {
      title: "Marks & results",
      text: "The available dataset contains 92 assessment records with an overall result average of 78.4%. Performance analytics currently show an upward trend.",
      tags: ["92 records", "78.4% result average", "Positive trend"]
    };
  }

  return {
    title: "School data insight",
    text: "I can analyze attendance, students needing attention, top performers, subjects, examinations, marks, results and class performance.",
    tags: ["Attendance", "Performance", "Results"]
  };
}

function AIMessage({ message }) {
  if (message.role === "user") {
    return (
      <div className="ai-message user-message">
        <div className="ai-avatar user-avatar">FK</div>
        <div className="ai-bubble">
          <span>You</span>
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-message">
      <div className="ai-avatar">
        <Sparkles size={15} />
      </div>

      <div className="ai-bubble">
        <span>SchoolMarks AI</span>
        <strong>{message.title}</strong>
        <p>{message.text}</p>

        {message.tags && (
          <div className="answer-tags">
            {message.tags.map(tag => (
              <b key={tag}>{tag}</b>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AIPage({ onNavigate, onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      title: "Ready when you are",
      text: "Ask me anything about your school data. You can send multiple questions and I’ll keep the conversation here.",
      tags: ["Attendance", "Students", "Performance"]
    }
  ]);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const ask = question => {
    const clean = question.trim();

    if (!clean || thinking) return;

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        text: clean
      }
    ]);

    setInput("");
    setThinking(true);

    setTimeout(() => {
      const answer = generateAnswer(clean);

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          ...answer
        }
      ]);

      setThinking(false);
    }, 650);
  };

  const clear = () => {
    setMessages([
      {
        role: "assistant",
        title: "New conversation",
        text: "Your conversation has been cleared. Ask a new question about your school.",
        tags: ["Ready", "School data"]
      }
    ]);
  };

  return (
    <AppShell active="ai" onNavigate={onNavigate} onBack={onBack}>
      <div className="ai-page-header">
        <div>
          <div className="workspace-eyebrow">
            <span /> SCHOOLMARKS INTELLIGENCE
          </div>
          <h1>Ask your school data.</h1>
          <p>
            Explore performance, attendance, results and student signals
            through one intelligent workspace.
          </p>
        </div>

        <button className="date-button" onClick={clear}>
          <RefreshCcw size={15} />
          Clear chat
        </button>
      </div>

      <div className="ai-layout">
        <section className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-brand">
              <div className="ai-large-icon">
                <BrainCircuit size={21} />
              </div>
              <div>
                <strong>SchoolMarks AI</strong>
                <span><i /> Local Intelligence</span>
              </div>
            </div>

            <MoreHorizontal size={18} />
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <AIMessage message={message} key={index} />
            ))}

            {thinking && (
              <div className="ai-message">
                <div className="ai-avatar">
                  <Sparkles size={15} />
                </div>

                <div className="ai-bubble typing">
                  <span>SchoolMarks AI</span>
                  <div className="typing-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ai-suggestions">
            <span>Try asking</span>

            <div>
              {questions.map(question => (
                <button
                  key={question}
                  onClick={() => ask(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="ai-input-box">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask(input);
                }
              }}
              placeholder="Ask a question about your school..."
              rows={2}
            />

            <div className="ai-input-footer">
              <span>Enter to send · Shift + Enter for new line</span>

              <button
                disabled={!input.trim() || thinking}
                onClick={() => ask(input)}
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </section>

        <aside className="ai-sidebar">
          <div className="ai-side-card ai-intro-card">
            <div className="ai-side-icon">
              <Zap size={17} />
            </div>
            <span>LOCAL INTELLIGENCE</span>
            <h3>Understand your data faster.</h3>
            <p>
              This demo analyzes the SchoolMarks dataset locally in your
              browser.
            </p>
          </div>

          <div className="ai-side-card">
            <div className="side-heading">
              <span>School snapshot</span>
              <Activity size={16} />
            </div>

            <div className="ai-metric">
              <div><Users size={16} /><span>Students</span></div>
              <strong>248</strong>
            </div>

            <div className="ai-metric">
              <div><UserCheck size={16} /><span>Attendance</span></div>
              <strong>94.6%</strong>
            </div>

            <div className="ai-metric">
              <div><TrendingUp size={16} /><span>Performance</span></div>
              <strong>82.7%</strong>
            </div>

            <div className="ai-metric">
              <div><Target size={16} /><span>At risk</span></div>
              <strong>6</strong>
            </div>
          </div>

          <div className="ai-side-card popular-card">
            <div className="side-heading">
              <span>Popular questions</span>
              <MessageSquare size={16} />
            </div>

            {questions.slice(0, 4).map((question, index) => (
              <button key={question} onClick={() => ask(question)}>
                <span>0{index + 1}</span>
                {question}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const navigate = next => {
    setPage(next);
  };

  if (page === "home") {
    return (
      <HomePage
        onOpenDashboard={() => navigate("dashboard")}
        onOpenAI={() => navigate("ai")}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <DashboardPage
        onNavigate={navigate}
        onBack={() => navigate("home")}
      />
    );
  }

  if (page === "students") {
    return (
      <StudentsPage
        onNavigate={navigate}
        onBack={() => navigate("home")}
      />
    );
  }

  if (page === "ai") {
    return (
      <AIPage
        onNavigate={navigate}
        onBack={() => navigate("home")}
      />
    );
  }

  return (
    <GenericPage
      type={page}
      onNavigate={navigate}
      onBack={() => navigate("home")}
    />
  );
}