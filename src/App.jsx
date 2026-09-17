import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BookOpenCheck,
  BrainCircuit,
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
  Zap
} from "lucide-react";

const students = [
  { name: "Ayaan Khan", className: "9-A", average: 87, attendance: 96, status: "Excellent" },
  { name: "Zayan Ahmed", className: "9-B", average: 51, attendance: 73, status: "At Risk" },
  { name: "Maham Ali", className: "9-A", average: 82, attendance: 91, status: "Good" },
  { name: "Hassan Raza", className: "9-C", average: 76, attendance: 88, status: "Good" },
  { name: "Areeba Khan", className: "9-B", average: 91, attendance: 98, status: "Excellent" },
  { name: "Rayyan Malik", className: "9-C", average: 64, attendance: 79, status: "Attention" }
];

const modules = [
  {
    icon: Users,
    title: "Student Management",
    text: "Manage student profiles, classes, enrollment and academic records."
  },
  {
    icon: BookOpen,
    title: "Academic Management",
    text: "Organize subjects, classes, teachers and academic structures."
  },
  {
    icon: ClipboardCheck,
    title: "Examinations",
    text: "Plan assessments, schedules and examination workflows."
  },
  {
    icon: Award,
    title: "Marks & Results",
    text: "Enter marks, calculate results and generate performance records."
  },
  {
    icon: UserCheck,
    title: "Attendance Intelligence",
    text: "Track attendance patterns and identify students needing attention."
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    text: "Turn academic data into useful insights for better decisions."
  }
];

const workflow = [
  ["01", "Add your school", "Set up your institution and academic structure."],
  ["02", "Configure academics", "Create classes, subjects and assessment rules."],
  ["03", "Manage students", "Keep student information organized in one place."],
  ["04", "Record attendance", "Track attendance without scattered spreadsheets."],
  ["05", "Enter marks", "Capture assessment results and academic progress."],
  ["06", "Generate intelligence", "Ask questions and discover meaningful patterns."]
];

const capabilities = [
  ["CORE", "Centralized Records", "One organized workspace for students, academics and results."],
  ["INTELLIGENCE", "Actionable Insights", "Convert school data into understandable answers."],
  ["ADVANCED", "Performance Signals", "Spot trends, risks and opportunities earlier."]
];

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: ClipboardCheck },
  { id: "marks", label: "Marks", icon: FileText },
  { id: "results", label: "Results", icon: Award },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "ai", label: "AI Assistant", icon: BrainCircuit }
];

function useInView() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return visible;
}

function Logo({ dark = false }) {
  return (
    <div className={`brand ${dark ? "brand-dark" : ""}`}>
      <div className="brand-mark">
        <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" />
      </div>
      <div>
        <strong>SchoolMarks</strong>
        <span>Academic Intelligence</span>
      </div>
    </div>
  );
}

function MiniChart({ large = false }) {
  return (
    <div className={`mini-chart ${large ? "mini-chart-large" : ""}`}>
      <div className="chart-grid">
        <span />
        <span />
        <span />
        <span />
      </div>

      <svg viewBox="0 0 600 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3f8f5d" stopOpacity=".22" />
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

function DashboardPreview({ mode = 5, compact = false }) {
  const data = [
    ["248", "Students"],
    ["94.6%", "Attendance"],
    ["82.7%", "Average"],
    ["6", "At risk"]
  ];

  return (
    <div className={`product-window ${compact ? "compact-window" : ""}`}>
      <div className="browser-bar">
        <div className="browser-dots">
          <i />
          <i />
          <i />
        </div>

        <div className="browser-url">
          app.schoolmarks.local/dashboard
        </div>

        <div className="browser-action">
          <MoreHorizontal size={15} />
        </div>
      </div>

      <div className="product-body">
        <aside className="product-sidebar">
          <div className="preview-logo">
            <div>SM</div>
            <span>SchoolMarks</span>
          </div>

          <div className="preview-nav active">
            <LayoutDashboard size={13} />
            Dashboard
          </div>

          <div className="preview-nav">
            <Users size={13} />
            Students
          </div>

          <div className="preview-nav">
            <BookOpen size={13} />
            Academics
          </div>

          <div className="preview-nav">
            <BarChart3 size={13} />
            Analytics
          </div>

          <div className="preview-nav">
            <BrainCircuit size={13} />
            Intelligence
          </div>
        </aside>

        <main className="product-main">
          <div className="preview-heading">
            <div>
              <small>OVERVIEW</small>
              <h3>
                {mode === 1
                  ? "Attendance"
                  : mode === 2
                  ? "Performance"
                  : "School Overview"}
              </h3>
            </div>

            <div className="preview-avatar">FK</div>
          </div>

          <div className="product-stats">
            {data.map(([number, label]) => (
              <div className="preview-stat" key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="product-grid">
            <div className="dashboard-card chart-card">
              <div className="card-head">
                <div>
                  <span>Performance trend</span>
                  <strong>+12.8%</strong>
                </div>
                <small>Last 6 months</small>
              </div>

              <MiniChart />
            </div>

            <div className="dashboard-card attendance-card">
              <div className="card-head">
                <span>Attendance</span>
                <MoreHorizontal size={14} />
              </div>

              <ProgressRing value={94.6} />

              <div className="attendance-meta">
                <span>
                  <i className="dot present" />
                  Present
                </span>
                <span>
                  <i className="dot late" />
                  Late
                </span>
                <span>
                  <i className="dot absent" />
                  Absent
                </span>
              </div>
            </div>

            <div className="dashboard-card table-card">
              <div className="card-head">
                <span>Top students</span>
                <small>View all</small>
              </div>

              {students.slice(0, 3).map(student => (
                <div className="preview-student" key={student.name}>
                  <div className="student-avatar">
                    {student.name
                      .split(" ")
                      .map(x => x[0])
                      .join("")}
                  </div>

                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.className}</span>
                  </div>

                  <b>{student.average}%</b>
                </div>
              ))}
            </div>

            <div className="dashboard-card intelligence-card">
              <div className="ai-heading">
                <div className="ai-icon">
                  <Sparkles size={14} />
                </div>

                <div>
                  <span>SchoolMarks AI</span>
                  <small>Live intelligence</small>
                </div>
              </div>

              <p>
                {mode === 1
                  ? "2 students have attendance below 80%."
                  : mode === 2
                  ? "Performance is trending upward across recent assessments."
                  : "6 students may need additional academic attention."}
              </p>

              <div className="ai-tags">
                <span>Attendance</span>
                <span>Performance</span>
                <span>Risk</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function IntelligenceDemo() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask SchoolMarks a question about students, attendance, performance or results."
  );
  const [thinking, setThinking] = useState(false);

  const analyze = value => {
    const clean = value.trim();

    if (!clean || thinking) return;

    setQuestion(clean);
    setThinking(true);

    setTimeout(() => {
      const q = clean.toLowerCase();

      if (q.includes("attendance")) {
        setAnswer(
          "Overall attendance is 94.6%. Two students are currently below 80% attendance."
        );
      } else if (
        q.includes("attention") ||
        q.includes("risk") ||
        q.includes("struggling")
      ) {
        setAnswer(
          "6 students are currently flagged for additional attention. Zayan Ahmed has the lowest average at 51%."
        );
      } else if (
        q.includes("top") ||
        q.includes("best") ||
        q.includes("ranking")
      ) {
        setAnswer(
          "Areeba Khan currently has the highest average at 91%, followed by Ayaan Khan at 87%."
        );
      } else if (q.includes("subject") || q.includes("weak")) {
        setAnswer(
          "Mathematics is currently the weakest subject based on the available assessment trend."
        );
      } else if (q.includes("result") || q.includes("mark")) {
        setAnswer(
          "The current dataset contains 92 assessment records with an overall result average of 78.4%."
        );
      } else {
        setAnswer(
          "I can analyze attendance, performance, rankings, marks, results and students needing attention."
        );
      }

      setThinking(false);
    }, 650);
  };

  return (
    <div className="intelligence-demo">
      <div className="assistant-top">
        <div className="assistant-status">
          <span />
          SchoolMarks Intelligence
        </div>

        <small>Local analysis</small>
      </div>

      <div className="assistant-content">
        <div className="assistant-copy">
          <span className="eyebrow">ASK YOUR SCHOOL DATA</span>
          <h3>Answers without digging through spreadsheets.</h3>
          <p>
            Ask natural questions and turn your school data into clear,
            useful insights.
          </p>
        </div>

        <div className="assistant-panel">
          <div className="assistant-messages">
            <div className="assistant-message">
              <div className="message-avatar">
                <BrainCircuit size={15} />
              </div>

              <div>
                <span>SchoolMarks AI</span>
                <p>What would you like to understand?</p>
              </div>
            </div>

            {question && (
              <div className="assistant-message user-message">
                <div className="message-avatar user-avatar">FK</div>

                <div>
                  <span>You</span>
                  <p>{question}</p>
                </div>
              </div>
            )}

            <div className="assistant-message result-message">
              <div className="message-avatar">
                <Sparkles size={15} />
              </div>

              <div>
                <span>Insight</span>
                <p>
                  {thinking
                    ? "Analyzing your school data..."
                    : answer}
                </p>
              </div>
            </div>
          </div>

          <div className="suggestion-row">
            {[
              "Who needs attention?",
              "Show attendance",
              "Who is ranking first?"
            ].map(item => (
              <button key={item} onClick={() => analyze(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="assistant-input">
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  analyze(question);
                }
              }}
              placeholder="Ask about your school..."
            />

            <button onClick={() => analyze(question)}>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowExperience() {
  const [active, setActive] = useState(0);

  return (
    <section className="workflow-section reveal" id="workflow">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>
            A workflow built around how schools actually operate.
          </h2>
          <p>
            From setup to intelligence, everything connects inside one system.
          </p>
        </div>

        <div className="workflow-stage">
          <div className="workflow-steps">
            {workflow.map(([number, title, text], index) => (
              <button
                className={`workflow-step ${
                  active === index ? "active" : ""
                }`}
                key={number}
                onClick={() => setActive(index)}
              >
                <span>{number}</span>

                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>

                <ArrowRight size={16} />
              </button>
            ))}
          </div>

          <div className="workflow-product-sticky">
            <DashboardPreview
              mode={active === 4 ? 2 : active === 3 ? 1 : 5}
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ onOpenDashboard, onNavigate }) {
  const visible = useInView();

  return (
    <div className="site">
      <nav className="public-nav">
        <div className="container nav-inner">
          <Logo />

          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#workflow">How it works</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#why">Why SchoolMarks</a>
          </div>

          <div className="nav-actions">
            <button
              className="nav-ai"
              onClick={() => onNavigate("ai")}
            >
              <BrainCircuit size={15} />
              AI Lab
            </button>

            <button
              className="nav-button"
              onClick={onOpenDashboard}
            >
              Open platform
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className={`hero ${visible ? "hero-visible" : ""}`}>
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="container hero-container">
            <div className="hero-grid">
              <div className="hero-copy reveal">
                <div className="hero-eyebrow">
                  <span>
                    <Sparkles size={14} />
                    SCHOOL MANAGEMENT, REIMAGINED
                  </span>
                </div>

                <h1>
                  Run your school with
                  <em> clarity.</em>
                </h1>

                <p>
                  SchoolMarks brings students, academics, attendance,
                  examinations, results and intelligence into one modern
                  workspace.
                </p>

                <div className="hero-actions">
                  <button
                    className="primary-button"
                    onClick={onOpenDashboard}
                  >
                    Explore SchoolMarks
                    <ArrowRight size={17} />
                  </button>

                  <a
                    href="#intelligence"
                    className="secondary-button"
                  >
                    See intelligence
                    <Sparkles size={16} />
                  </a>
                </div>

                <div className="hero-trust">
                  <div>
                    <strong>248+</strong>
                    <span>Students managed</span>
                  </div>

                  <div>
                    <strong>94.6%</strong>
                    <span>Attendance visibility</span>
                  </div>

                  <div>
                    <strong>82.7%</strong>
                    <span>Performance average</span>
                  </div>
                </div>
              </div>

              <div className="hero-product reveal">
                <DashboardPreview />
              </div>
            </div>
          </div>
        </section>

        <div className="trust-strip">
          <div className="container trust-inner">
            <span>ONE PLATFORM</span>
            <i />
            <span>ONE SOURCE OF TRUTH</span>
            <i />
            <span>BETTER SCHOOL DECISIONS</span>
            <i />
            <span>BUILT FOR MODERN EDUCATION</span>
          </div>
        </div>

        <section className="problem-section reveal">
          <div className="container problem-layout">
            <div>
              <span className="eyebrow">THE PROBLEM</span>
              <h2>
                School data should not live in ten different places.
              </h2>

              <p>
                Student records, attendance sheets, marks and performance
                reports become difficult to connect when every process lives
                separately.
              </p>
            </div>

            <div className="problem-visual">
              <div className="scattered-card card-one">
                <FileText size={17} />
                <strong>Result Sheets</strong>
                <span>Updated manually</span>
              </div>

              <div className="scattered-card card-two">
                <CalendarDays size={17} />
                <strong>Attendance</strong>
                <span>Multiple records</span>
              </div>

              <div className="scattered-card card-three">
                <BarChart3 size={17} />
                <strong>Analytics</strong>
                <span>Hard to connect</span>
              </div>

              <div className="convergence">
                <Sparkles size={23} />
                <strong>SchoolMarks</strong>
                <span>One connected system</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="solution-section reveal"
          id="platform"
        >
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">THE PLATFORM</span>
              <h2>Everything important. Connected.</h2>
              <p>
                Six core areas working together instead of six disconnected
                workflows.
              </p>
            </div>

            <div className="module-grid">
              {modules.map(
                ({ icon: Icon, title, text }, index) => (
                  <div className="module-card" key={title}>
                    <div className="module-number">
                      0{index + 1}
                    </div>

                    <div className="module-icon">
                      <Icon size={21} />
                    </div>

                    <h3>{title}</h3>
                    <p>{text}</p>

                    <ArrowUpRight size={17} />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <WorkflowExperience />

        <section
          className="capabilities-section reveal"
          id="why"
        >
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">WHY SCHOOLMARKS</span>
              <h2>Less administration. More understanding.</h2>
            </div>

            <div className="capability-grid">
              {capabilities.map(
                ([label, title, text], index) => (
                  <div
                    className="capability-card"
                    key={label}
                  >
                    <span>{label}</span>

                    <div className="capability-icon">
                      {index === 0 ? (
                        <Target size={19} />
                      ) : index === 1 ? (
                        <BrainCircuit size={19} />
                      ) : (
                        <Activity size={19} />
                      )}
                    </div>

                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section
          className="intelligence-section reveal"
          id="intelligence"
        >
          <div className="container">
            <div className="intelligence-header">
              <div>
                <span className="eyebrow">
                  SCHOOLMARKS INTELLIGENCE
                </span>
                <h2>Your data can answer questions.</h2>
              </div>

              <button onClick={() => onNavigate("ai")}>
                Open AI Assistant
                <ArrowUpRight size={16} />
              </button>
            </div>

            <IntelligenceDemo />
          </div>
        </section>

        <section className="analytics-section reveal">
          <div className="container analytics-layout">
            <div className="analytics-copy">
              <span className="eyebrow">
                PERFORMANCE ANALYTICS
              </span>

              <h2>
                See the signals hiding inside your data.
              </h2>

              <p>
                SchoolMarks turns raw academic records into visual trends,
                attendance patterns and student-level signals.
              </p>

              <div className="signal-list">
                <div>
                  <Check size={16} />
                  <span>Class performance trends</span>
                </div>

                <div>
                  <Check size={16} />
                  <span>Attendance risk signals</span>
                </div>

                <div>
                  <Check size={16} />
                  <span>Student performance tracking</span>
                </div>

                <div>
                  <Check size={16} />
                  <span>Assessment result insights</span>
                </div>
              </div>
            </div>

            <div className="analytics-visual">
              <div className="analytics-main-card">
                <div className="card-head">
                  <div>
                    <span>Class performance</span>
                    <strong>82.7%</strong>
                  </div>

                  <span className="trend-positive">
                    +8.4%
                  </span>
                </div>

                <MiniChart large />
              </div>

              <div className="analytics-float float-top">
                <TrendingUp size={16} />
                <div>
                  <strong>+12.8%</strong>
                  <span>Performance trend</span>
                </div>
              </div>

              <div className="analytics-float float-bottom">
                <UserCheck size={16} />
                <div>
                  <strong>94.6%</strong>
                  <span>Attendance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="compare-section reveal">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">THE DIFFERENCE</span>
              <h2>
                From scattered information to connected intelligence.
              </h2>
            </div>

            <div className="comparison">
              <div className="comparison-column old-column">
                <span>TRADITIONAL WORKFLOW</span>

                <div className="comparison-row">
                  <X size={16} />
                  Separate spreadsheets
                </div>

                <div className="comparison-row">
                  <X size={16} />
                  Manual calculations
                </div>

                <div className="comparison-row">
                  <X size={16} />
                  Delayed insights
                </div>

                <div className="comparison-row">
                  <X size={16} />
                  Difficult reporting
                </div>
              </div>

              <div className="comparison-center">
                <Sparkles size={19} />
              </div>

              <div className="comparison-column new-column">
                <span>SCHOOLMARKS</span>

                <div className="comparison-row">
                  <Check size={16} />
                  Connected records
                </div>

                <div className="comparison-row">
                  <Check size={16} />
                  Automated analysis
                </div>

                <div className="comparison-row">
                  <Check size={16} />
                  Actionable signals
                </div>

                <div className="comparison-row">
                  <Check size={16} />
                  Clear reporting
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section reveal">
          <div className="container">
            <div className="cta-box">
              <div>
                <span className="eyebrow">READY TO EXPLORE?</span>
                <h2>Make your school data work harder.</h2>
                <p>
                  Explore the SchoolMarks workspace and intelligence layer.
                </p>

                <button
                  className="primary-button"
                  onClick={onOpenDashboard}
                >
                  Open SchoolMarks
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="cta-product">
                <div className="cta-mini-card">
                  <Users size={18} />
                  <strong>248</strong>
                  <span>Students</span>
                </div>

                <div className="cta-mini-card">
                  <TrendingUp size={18} />
                  <strong>82.7%</strong>
                  <span>Performance</span>
                </div>

                <div className="cta-mini-card">
                  <BrainCircuit size={18} />
                  <strong>AI</strong>
                  <span>Intelligence</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <span>
            SchoolMarks — Academic Intelligence Platform
          </span>
        </div>
      </footer>
    </div>
  );
}

function AppShell({ active, onNavigate, onBack, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = id => {
    setMobileOpen(false);
    onNavigate(id);
  };

  const current =
    navigation.find(item => item.id === active)?.label ||
    "Overview";

  return (
    <div className="app-shell">
      <aside
        className={`app-sidebar ${
          mobileOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <Logo dark />
        </div>

        <div className="sidebar-school">
          <div className="school-avatar">SM</div>

          <div>
            <strong>SchoolMarks Academy</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={14} />
        </div>

        <div className="sidebar-section">
          <span>WORKSPACE</span>

          <nav>
            {navigation.map(item => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={
                    active === item.id
                      ? "sidebar-link active"
                      : "sidebar-link"
                  }
                  onClick={() => navigate(item.id)}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>

                  {item.id === "ai" && (
                    <i className="new-badge">AI</i>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-section sidebar-bottom">
          <span>SYSTEM</span>

          <button className="sidebar-link">
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <button
            className="sidebar-link"
            onClick={onBack}
          >
            <Home size={17} />
            <span>Back to website</span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="breadcrumb">
              <span>SchoolMarks</span>
              <ArrowRight size={13} />
              <strong>{current}</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-button">
              <Search size={18} />
            </button>

            <button className="icon-button notification">
              <Bell size={18} />
              <i />
            </button>

            <div className="topbar-profile">
              <div className="profile-avatar">FK</div>

              <div>
                <strong>Faizan Khan</strong>
                <span>Admin</span>
              </div>

              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  negative
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>

        <button>
          <MoreHorizontal size={17} />
        </button>
      </div>

      <span>{label}</span>

      <div className="stat-value-row">
        <strong>{value}</strong>

        <small className={negative ? "negative" : ""}>
          {negative ? "−" : "+"}
          {change}
        </small>
      </div>
    </div>
  );
}

function AttendanceCard() {
  return (
    <div className="workspace-card attendance-workspace-card">
      <div className="workspace-card-head">
        <div>
          <span>Attendance overview</span>
          <strong>Daily presence</strong>
        </div>

        <button className="card-more">
          <MoreHorizontal size={17} />
        </button>
      </div>

      <div className="attendance-layout">
        <ProgressRing value={94.6} />

        <div className="attendance-breakdown">
          <div>
            <span>
              <i className="legend-dot present" />
              Present
            </span>
            <strong>235</strong>
          </div>

          <div>
            <span>
              <i className="legend-dot late" />
              Late
            </span>
            <strong>7</strong>
          </div>

          <div>
            <span>
              <i className="legend-dot absent" />
              Absent
            </span>
            <strong>6</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformanceCard() {
  return (
    <div className="workspace-card performance-card">
      <div className="workspace-card-head">
        <div>
          <span>Performance trend</span>
          <strong>Academic average</strong>
        </div>

        <div className="chart-filter">
          Last 6 months
          <ChevronDown size={13} />
        </div>
      </div>

      <div className="performance-number">
        <strong>82.7%</strong>
        <span>
          <TrendingUp size={14} />
          8.4% vs previous period
        </span>
      </div>

      <MiniChart large />
    </div>
  );
}

function StudentTable() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      students.filter(student =>
        `${student.name} ${student.className}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="workspace-card students-card">
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

      <div className="students-table-wrap">
        <table className="students-table">
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
                  <div className="table-student">
                    <div className="table-avatar">
                      {student.name
                        .split(" ")
                        .map(x => x[0])
                        .join("")}
                    </div>

                    <strong>{student.name}</strong>
                  </div>
                </td>

                <td>{student.className}</td>

                <td>
                  <div className="score-cell">
                    <strong>{student.average}%</strong>
                    <div>
                      <i
                        style={{
                          width: `${student.average}%`
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td>{student.attendance}%</td>

                <td>
                  <span
                    className={`status-pill ${student.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    <i />
                    {student.status}
                  </span>
                </td>

                <td>
                  <button className="row-more">
                    <MoreHorizontal size={17} />
                  </button>
                </td>
              </tr>
            ))}

            {!filtered.length && (
              <tr>
                <td colSpan="6">
                  <div className="table-empty">
                    No students found.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UpcomingExams() {
  const exams = [
    ["Mathematics", "21 Sep", "9-A", "Written"],
    ["English", "24 Sep", "9-B", "Assessment"],
    ["Computer", "27 Sep", "9-C", "Practical"],
    ["Science", "30 Sep", "9-A", "Written"]
  ];

  return (
    <div className="workspace-card upcoming-card">
      <div className="workspace-card-head">
        <div>
          <span>Upcoming examinations</span>
          <strong>Next assessments</strong>
        </div>

        <button className="text-button">
          View all
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="exam-list">
        {exams.map(
          ([subject, date, className, type]) => (
            <div className="exam-item" key={subject}>
              <div className="exam-icon">
                <BookOpenCheck size={17} />
              </div>

              <div className="exam-info">
                <strong>{subject}</strong>
                <span>
                  {className} · {type}
                </span>
              </div>

              <div className="exam-date">
                <strong>{date}</strong>
                <span>2026</span>
              </div>
            </div>
          )
        )}
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
    <div className="workspace-card activity-card">
      <div className="workspace-card-head">
        <div>
          <span>Recent activity</span>
          <strong>Latest updates</strong>
        </div>

        <RefreshCcw size={16} />
      </div>

      <div className="activity-list">
        {activities.map(
          ([name, action, time], index) => (
            <div
              className="activity-item"
              key={`${name}-${time}`}
            >
              <div
                className={`activity-dot activity-${index}`}
              />

              <div>
                <p>
                  <strong>{name}</strong> {action}
                </p>

                <span>
                  <Clock3 size={12} />
                  {time}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function DashboardPage({ onNavigate, onBack }) {
  return (
    <AppShell
      active="overview"
      onNavigate={onNavigate}
      onBack={onBack}
    >
      <div className="workspace-header">
        <div>
          <div className="workspace-eyebrow">
            <span />
            SCHOOL OVERVIEW
          </div>

          <h1>Good evening, Faizan.</h1>

          <p>
            Here’s what’s happening across your school today.
          </p>
        </div>

        <div className="workspace-actions">
          <button className="workspace-secondary">
            <CalendarDays size={16} />
            17 Sep 2026
          </button>

          <button
            className="workspace-primary"
            onClick={() => onNavigate("ai")}
          >
            <Sparkles size={16} />
            Ask AI
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={Users}
          label="Total students"
          value="248"
          change="8.2%"
        />

        <StatCard
          icon={UserCheck}
          label="Attendance"
          value="94.6%"
          change="2.1%"
        />

        <StatCard
          icon={TrendingUp}
          label="Average performance"
          value="82.7%"
          change="8.4%"
        />

        <StatCard
          icon={Target}
          label="Students at risk"
          value="6"
          change="1.4%"
          negative
        />
      </div>

      <div className="dashboard-main-grid">
        <PerformanceCard />
        <AttendanceCard />
      </div>

      <div className="dashboard-secondary-grid">
        <StudentTable />
        <UpcomingExams />
      </div>

      <div className="dashboard-secondary-grid bottom-grid">
        <div className="workspace-card ai-insight-workspace">
          <div className="insight-glow" />

          <div className="workspace-card-head">
            <div>
              <span>Intelligent insight</span>
              <strong>Something worth noticing</strong>
            </div>

            <div className="insight-ai-icon">
              <BrainCircuit size={18} />
            </div>
          </div>

          <div className="insight-content">
            <div className="insight-title">
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

function generateAIAnswer(question) {
  const q = question.toLowerCase();

  if (
    q.includes("attendance") ||
    q.includes("present") ||
    q.includes("absent")
  ) {
    return {
      title: "Attendance overview",
      text:
        "Overall attendance is currently 94.6%. There are 235 students present, 7 marked late and 6 absent. Two students are below the 80% attendance threshold.",
      tags: [
        "94.6% attendance",
        "6 absent",
        "2 need attention"
      ]
    };
  }

  if (
    q.includes("attention") ||
    q.includes("risk") ||
    q.includes("struggling")
  ) {
    return {
      title: "Students needing attention",
      text:
        "The current dataset flags 6 students for additional attention. Zayan Ahmed has the lowest academic average at 51% with 73% attendance, while Rayyan Malik is at 64% with 79% attendance.",
      tags: [
        "6 flagged",
        "Zayan · 51%",
        "Rayyan · 64%"
      ]
    };
  }

  if (
    q.includes("top") ||
    q.includes("best") ||
    q.includes("ranking") ||
    q.includes("highest")
  ) {
    return {
      title: "Top academic performers",
      text:
        "Areeba Khan currently has the highest recorded average at 91%, followed by Ayaan Khan at 87% and Maham Ali at 82%.",
      tags: [
        "Areeba · 91%",
        "Ayaan · 87%",
        "Maham · 82%"
      ]
    };
  }

  if (
    q.includes("subject") ||
    q.includes("mathematics") ||
    q.includes("math") ||
    q.includes("weak")
  ) {
    return {
      title: "Subject performance",
      text:
        "Mathematics is currently showing the weakest overall trend in the available assessment dataset. This can be investigated further by class or individual student.",
      tags: [
        "Mathematics",
        "Assessment trend",
        "Class breakdown"
      ]
    };
  }

  if (
    q.includes("exam") ||
    q.includes("test") ||
    q.includes("assessment")
  ) {
    return {
      title: "Upcoming examinations",
      text:
        "The next scheduled assessment is Mathematics on 21 September for Class 9-A. English follows on 24 September, Computer on 27 September and Science on 30 September.",
      tags: [
        "21 Sep · Mathematics",
        "24 Sep · English",
        "27 Sep · Computer"
      ]
    };
  }

  if (q.includes("class") || q.includes("compare")) {
    return {
      title: "Class performance",
      text:
        "The current school-wide academic average is 82.7%. Class-level comparison can be expanded using marks, attendance and assessment history.",
      tags: [
        "82.7% average",
        "Class comparison",
        "Performance"
      ]
    };
  }

  if (
    q.includes("mark") ||
    q.includes("result") ||
    q.includes("score")
  ) {
    return {
      title: "Marks & results",
      text:
        "The available dataset contains 92 assessment records with an overall result average of 78.4%. Performance analytics currently show an upward trend.",
      tags: [
        "92 records",
        "78.4% result average",
        "Positive trend"
      ]
    };
  }

  return {
    title: "School data insight",
    text:
      "I can help you analyze attendance, students needing attention, top performers, subjects, examinations, marks, results and class performance.",
    tags: [
      "Attendance",
      "Performance",
      "Results"
    ]
  };
}

function AIMessage({ message }) {
  if (message.role === "user") {
    return (
      <div className="ai-chat-message user">
        <div className="ai-chat-avatar user-chat-avatar">
          FK
        </div>

        <div className="ai-chat-bubble">
          <span>You</span>
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-chat-message assistant">
      <div className="ai-chat-avatar">
        <Sparkles size={16} />
      </div>

      <div className="ai-chat-bubble">
        <span>SchoolMarks AI</span>

        <div className="ai-answer-title">
          <strong>{message.title}</strong>
        </div>

        <p>{message.text}</p>

        {message.tags && (
          <div className="answer-tags">
            {message.tags.map(tag => (
              <span key={tag}>{tag}</span>
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
      text:
        "Ask me anything about your school data. You can send multiple questions and I’ll keep the conversation here.",
      tags: [
        "Attendance",
        "Students",
        "Performance"
      ]
    }
  ]);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const suggestions = [
    "Who needs attention?",
    "Show attendance",
    "Top students",
    "Weakest subject",
    "Upcoming exams",
    "Compare classes"
  ];

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
      const answer = generateAIAnswer(clean);

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          ...answer
        }
      ]);

      setThinking(false);
    }, 700);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        title: "New conversation",
        text:
          "Your conversation has been cleared. Ask me a new question about your school.",
        tags: [
          "Ready",
          "School data"
        ]
      }
    ]);
  };

  return (
    <AppShell
      active="ai"
      onNavigate={onNavigate}
      onBack={onBack}
    >
      <div className="ai-page-header">
        <div>
          <div className="workspace-eyebrow">
            <span />
            SCHOOLMARKS INTELLIGENCE
          </div>

          <h1>Ask your school data.</h1>

          <p>
            Explore performance, attendance, results and student signals
            through one intelligent workspace.
          </p>
        </div>

        <div className="ai-page-actions">
          <button
            className="workspace-secondary"
            onClick={clearChat}
          >
            <RefreshCcw size={15} />
            Clear chat
          </button>
        </div>
      </div>

      <div className="ai-workspace">
        <section className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-large-icon">
                <BrainCircuit size={21} />
              </div>

              <div>
                <strong>SchoolMarks AI</strong>

                <span>
                  <i />
                  Local Intelligence
                </span>
              </div>
            </div>

            <button>
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <AIMessage
                message={message}
                key={`${message.role}-${index}`}
              />
            ))}

            {thinking && (
              <div className="ai-chat-message assistant">
                <div className="ai-chat-avatar">
                  <Sparkles size={16} />
                </div>

                <div className="ai-chat-bubble typing-bubble">
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
              {suggestions.map(item => (
                <button
                  key={item}
                  onClick={() => ask(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="ai-input-area">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  ask(input);
                }
              }}
              placeholder="Ask a question about your school..."
              rows={2}
            />

            <div className="ai-input-footer">
              <span>
                Enter to send · Shift + Enter for new line
              </span>

              <button
                onClick={() => ask(input)}
                disabled={!input.trim() || thinking}
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </section>

        <aside className="ai-side-panel">
          <div className="ai-side-card ai-side-intro">
            <div className="ai-side-icon">
              <Zap size={17} />
            </div>

            <span>LOCAL INTELLIGENCE</span>

            <h3>
              Understand your data faster.
            </h3>

            <p>
              This demo analyzes the SchoolMarks dataset locally
              in the browser.
            </p>
          </div>

          <div className="ai-side-card">
            <div className="side-card-heading">
              <span>School snapshot</span>
              <Activity size={16} />
            </div>

            <div className="ai-metric">
              <div>
                <Users size={16} />
                <span>Students</span>
              </div>
              <strong>248</strong>
            </div>

            <div className="ai-metric">
              <div>
                <UserCheck size={16} />
                <span>Attendance</span>
              </div>
              <strong>94.6%</strong>
            </div>

            <div className="ai-metric">
              <div>
                <TrendingUp size={16} />
                <span>Performance</span>
              </div>
              <strong>82.7%</strong>
            </div>

            <div className="ai-metric">
              <div>
                <Target size={16} />
                <span>At risk</span>
              </div>
              <strong>6</strong>
            </div>
          </div>

          <div className="ai-side-card popular-questions">
            <div className="side-card-heading">
              <span>Popular questions</span>
              <MessageSquare size={16} />
            </div>

            {suggestions.slice(0, 4).map(
              (item, index) => (
                <button
                  key={item}
                  onClick={() => ask(item)}
                >
                  <span>0{index + 1}</span>
                  {item}
                  <ArrowUpRight size={14} />
                </button>
              )
            )}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function WorkspacePage({
  active,
  onNavigate,
  onBack
}) {
  const item =
    navigation.find(entry => entry.id === active) ||
    navigation[0];

  const Icon = item.icon;

  return (
    <AppShell
      active={active}
      onNavigate={onNavigate}
      onBack={onBack}
    >
      <div className="workspace-header">
        <div>
          <div className="workspace-eyebrow">
            <span />
            SCHOOLMARKS WORKSPACE
          </div>

          <h1>{item.label}</h1>

          <p>
            Manage your {item.label.toLowerCase()} from the
            SchoolMarks workspace.
          </p>
        </div>

        <button
          className="workspace-primary"
          onClick={() => onNavigate("ai")}
        >
          <Sparkles size={16} />
          Ask AI
        </button>
      </div>

      <div className="workspace-empty-layout">
        <div className="workspace-empty-card">
          <div className="workspace-empty-icon">
            <Icon size={28} />
          </div>

          <span>MODULE READY</span>

          <h2>
            {item.label} workspace
          </h2>

          <p>
            This module is connected to the SchoolMarks
            navigation and can be expanded with live records,
            filters, forms and analytics.
          </p>

          <button
            className="workspace-primary"
            onClick={() => onNavigate("ai")}
          >
            Explore with AI
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="workspace-preview-grid">
          <div className="workspace-mini-card">
            <Users size={19} />
            <strong>248</strong>
            <span>Students</span>
          </div>

          <div className="workspace-mini-card">
            <TrendingUp size={19} />
            <strong>82.7%</strong>
            <span>Performance</span>
          </div>

          <div className="workspace-mini-card">
            <UserCheck size={19} />
            <strong>94.6%</strong>
            <span>Attendance</span>
          </div>

          <div className="workspace-mini-card">
            <BrainCircuit size={19} />
            <strong>AI</strong>
            <span>Intelligence</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function AccessModal({ onClose, onContinue }) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="access-modal"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="modal-icon">
          <Sparkles size={22} />
        </div>

        <span className="eyebrow">
          SCHOOLMARKS PLATFORM
        </span>

        <h2>Welcome to the workspace.</h2>

        <p>
          Explore the SchoolMarks dashboard, academic
          overview and intelligence layer.
        </p>

        <div className="access-preview">
          <div>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
            <Check size={15} />
          </div>

          <div>
            <BrainCircuit size={16} />
            <span>AI Assistant</span>
            <Check size={15} />
          </div>

          <div>
            <BarChart3 size={16} />
            <span>Analytics</span>
            <Check size={15} />
          </div>
        </div>

        <button
          className="modal-button"
          onClick={onContinue}
        >
          Continue to platform
          <ArrowRight size={17} />
        </button>

        <span className="modal-note">
          Frontend demonstration · No account required
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [access, setAccess] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [page]);

  const openDashboard = () => {
    setAccess(false);
    setPage("dashboard");
  };

  const navigate = nextPage => {
    setPage(nextPage);
  };

  if (page === "dashboard") {
    return (
      <DashboardPage
        onNavigate={navigate}
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "ai") {
    return (
      <AIPage
        onNavigate={navigate}
        onBack={() => setPage("home")}
      />
    );
  }

  if (
    [
      "students",
      "academics",
      "exams",
      "marks",
      "results",
      "attendance",
      "performance"
    ].includes(page)
  ) {
    return (
      <WorkspacePage
        active={page}
        onNavigate={navigate}
        onBack={() => setPage("home")}
      />
    );
  }

  return (
    <>
      <HomePage
        onOpenDashboard={() => setAccess(true)}
        onNavigate={navigate}
      />

      {access && (
        <AccessModal
          onClose={() => setAccess(false)}
          onContinue={openDashboard}
        />
      )}
    </>
  );
}