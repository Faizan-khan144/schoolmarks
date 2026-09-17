import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  Search,
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
  { name: "Ayaan Khan", className: "9-A", average: 87, attendance: 96 },
  { name: "Hania Ahmed", className: "9-A", average: 82, attendance: 93 },
  { name: "Rayyan Ali", className: "9-B", average: 74, attendance: 88 },
  { name: "Maham Noor", className: "9-B", average: 69, attendance: 84 },
  { name: "Zayan Sheikh", className: "9-A", average: 51, attendance: 73 },
  { name: "Areeba Khan", className: "9-B", average: 58, attendance: 78 }
];

const modules = [
  {
    icon: Users,
    title: "Student Management",
    text: "Keep student profiles, classes, sections and academic records connected."
  },
  {
    icon: BookOpen,
    title: "Academic Management",
    text: "Organize subjects, classes and academic structures from one place."
  },
  {
    icon: ClipboardCheck,
    title: "Examinations",
    text: "Create examinations, schedules and assessment structures without spreadsheets."
  },
  {
    icon: BarChart3,
    title: "Marks & Results",
    text: "Enter marks once and turn them into calculated results automatically."
  },
  {
    icon: UserCheck,
    title: "Attendance Intelligence",
    text: "Track attendance patterns and quickly identify students needing attention."
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    text: "See class trends, subject performance, rankings and academic signals."
  }
];

const capabilities = [
  {
    type: "CORE",
    title: "Everything your school needs",
    items: ["Student records", "Classes & sections", "Subjects", "Examinations"]
  },
  {
    type: "INTELLIGENCE",
    title: "Turn data into signals",
    items: ["Performance analysis", "Attendance insights", "Rankings", "At-risk detection"]
  },
  {
    type: "ADVANCED",
    title: "Move beyond spreadsheets",
    items: ["Automatic calculations", "Smart alerts", "Trend analysis", "Report generation"]
  }
];

const workflow = [
  {
    number: "01",
    title: "Add your school",
    text: "Set up your school structure and create the academic foundation.",
    icon: GraduationCap
  },
  {
    number: "02",
    title: "Configure academics",
    text: "Add classes, sections and subjects so everything has a clear structure.",
    icon: BookOpen
  },
  {
    number: "03",
    title: "Manage students",
    text: "Create student records and connect them to their academic groups.",
    icon: Users
  },
  {
    number: "04",
    title: "Record attendance",
    text: "Track attendance and surface patterns that deserve attention.",
    icon: CalendarDays
  },
  {
    number: "05",
    title: "Enter marks",
    text: "Record assessment marks without calculating everything manually.",
    icon: ClipboardCheck
  },
  {
    number: "06",
    title: "Generate intelligence",
    text: "Turn academic data into performance insights, rankings and results.",
    icon: BrainCircuit
  }
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, ...options }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function useCountUp(target, duration = 1400, active = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start;
    let frame;

    const animate = (timestamp) => {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);

  return value;
}

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport * 0.75;

      if (total <= 0) return;

      const raw = (viewport * 0.25 - rect.top) / total;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

function Logo({ dark = false }) {
  return (
    <div className={`brand ${dark ? "brand-dark" : ""}`}>
      <div className="brand-mark">
        <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" />
      </div>
      <div>
        <strong>SchoolMarks</strong>
        <span>School Management</span>
      </div>
    </div>
  );
}

function MiniChart({ active = false }) {
  return (
    <svg className={`mini-chart ${active ? "chart-active" : ""}`} viewBox="0 0 420 150">
      <path
        className="chart-grid"
        d="M0 125 H420 M0 90 H420 M0 55 H420 M0 20 H420"
      />
      <path
        className="chart-area"
        d="M0 121 C35 116 50 104 78 108 C106 112 118 88 147 93 C174 98 188 72 216 79 C244 86 256 58 283 63 C312 69 328 40 351 47 C378 54 393 26 420 31 L420 150 L0 150 Z"
      />
      <path
        className="chart-line"
        d="M0 121 C35 116 50 104 78 108 C106 112 118 88 147 93 C174 98 188 72 216 79 C244 86 256 58 283 63 C312 69 328 40 351 47 C378 54 393 26 420 31"
      />
      <circle className="chart-dot" cx="420" cy="31" r="5" />
    </svg>
  );
}

function ProgressRing({ value = 94 }) {
  const circumference = 2 * Math.PI * 43;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-ring">
      <svg viewBox="0 0 100 100">
        <circle className="ring-bg" cx="50" cy="50" r="43" />
        <circle
          className="ring-value"
          cx="50"
          cy="50"
          r="43"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-label">
        <strong>{value}%</strong>
        <span>Attendance</span>
      </div>
    </div>
  );
}

function DashboardPreview({ mode = 5, compact = false }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLive(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const modeData = {
    0: {
      title: "School setup",
      stat1: "1",
      stat2: "9",
      stat3: "12",
      insight: "Your academic workspace is ready."
    },
    1: {
      title: "Academic structure",
      stat1: "9",
      stat2: "12",
      stat3: "24",
      insight: "Classes, subjects and sections connected."
    },
    2: {
      title: "Student management",
      stat1: "248",
      stat2: "9",
      stat3: "96%",
      insight: "248 student profiles are connected."
    },
    3: {
      title: "Attendance",
      stat1: "94.6%",
      stat2: "234",
      stat3: "14",
      insight: "14 students may need attendance follow-up."
    },
    4: {
      title: "Marks & assessments",
      stat1: "78.4%",
      stat2: "6",
      stat3: "92",
      insight: "Assessment data has been processed."
    },
    5: {
      title: "Academic intelligence",
      stat1: "82.7%",
      stat2: "12",
      stat3: "06",
      insight: "6 students need additional attention."
    }
  };

  const data = modeData[mode] || modeData[5];

  return (
    <div className={`product-window ${compact ? "product-compact" : ""}`}>
      <div className="window-top">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="window-url">app.schoolmarks.local/dashboard</div>
        <div className={`live-status ${live ? "is-live" : ""}`}>
          <span />
          Live
        </div>
      </div>

      <div className="product-body">
        <aside className="product-sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">S</div>
            <span>SchoolMarks</span>
          </div>

          {[
            [LayoutDashboard, "Overview"],
            [Users, "Students"],
            [BookOpen, "Academics"],
            [ClipboardCheck, "Exams"],
            [BarChart3, "Marks"],
            [Award, "Results"],
            [CalendarDays, "Attendance"],
            [LineChart, "Performance"],
            [FileText, "Reports"]
          ].map(([Icon, label], index) => (
            <div
              className={`sidebar-item ${index === 0 ? "active" : ""}`}
              key={label}
            >
              <Icon size={15} />
              <span>{label}</span>
            </div>
          ))}

          <div className="sidebar-bottom">
            <Settings size={15} />
            <span>Settings</span>
          </div>
        </aside>

        <main className="product-main">
          <div className="product-header">
            <div>
              <span className="eyebrow-small">SCHOOL OVERVIEW</span>
              <h3>{data.title}</h3>
              <p>Academic Year 2026–27</p>
            </div>

            <div className="product-user">
              <div className="notification">
                <Bell size={15} />
                <span />
              </div>
              <div className="avatar">FK</div>
            </div>
          </div>

          <div className="product-stats">
            <div className="product-stat">
              <span>Total Students</span>
              <strong>{data.stat1}</strong>
              <small>
                <TrendingUp size={11} /> +8.2%
              </small>
            </div>

            <div className="product-stat">
              <span>Attendance</span>
              <strong>{data.stat2}</strong>
              <small>
                <TrendingUp size={11} /> Healthy
              </small>
            </div>

            <div className="product-stat">
              <span>Performance</span>
              <strong>{data.stat3}</strong>
              <small>
                <Activity size={11} /> Updated
              </small>
            </div>
          </div>

          <div className="product-grid">
            <div className="dashboard-card chart-card">
              <div className="card-heading">
                <div>
                  <span>Performance trend</span>
                  <strong>Class average</strong>
                </div>
                <button>Last 6 exams <ChevronDown size={12} /></button>
              </div>
              <MiniChart active={live} />
              <div className="chart-footer">
                <strong>82.7%</strong>
                <span>+6.4% from previous period</span>
              </div>
            </div>

            <div className="dashboard-card attendance-card">
              <div className="card-heading">
                <div>
                  <span>Attendance health</span>
                  <strong>Overall attendance</strong>
                </div>
              </div>
              <ProgressRing value={mode === 3 ? 94 : 91} />
              <div className="attendance-meta">
                <span><i className="dot-green" /> Present</span>
                <span><i className="dot-yellow" /> Late</span>
                <span><i className="dot-red" /> Absent</span>
              </div>
            </div>

            <div className="dashboard-card table-card">
              <div className="card-heading">
                <div>
                  <span>Recent students</span>
                  <strong>Academic performance</strong>
                </div>
                <button>View all <ArrowRight size={12} /></button>
              </div>

              <div className="student-table">
                {students.slice(0, 4).map((student, index) => (
                  <div className="student-row" key={student.name}>
                    <div className="student-person">
                      <div className={`student-avatar avatar-${index}`}>{student.name.charAt(0)}</div>
                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.className}</span>
                      </div>
                    </div>
                    <div className="student-score">
                      <strong>{student.average}%</strong>
                      <span className={student.average < 60 ? "score-risk" : ""}>
                        {student.average < 60 ? "Attention" : "On track"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card intelligence-card">
              <div className="ai-heading">
                <div className="ai-icon">
                  <Sparkles size={16} />
                </div>
                <div>
                  <span>SchoolMarks Intelligence</span>
                  <strong>Smart insight</strong>
                </div>
              </div>

              <div className="ai-insight">
                <Target size={15} />
                <p>{data.insight}</p>
              </div>

              <div className="ai-tags">
                <span>Performance</span>
                <span>Attendance</span>
                <span>Results</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function IntelligenceDemo() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(
    "Ask about students, attendance, marks, performance or results."
  );
  const [thinking, setThinking] = useState(false);

  const analyze = (value) => {
    const q = value.toLowerCase();

    if (q.includes("attendance")) {
      return "Overall attendance is 86.9%. 2 students are below the 80% attention threshold.";
    }

    if (
      q.includes("struggling") ||
      q.includes("attention") ||
      q.includes("risk")
    ) {
      return "6 students need attention. Zayan Sheikh has 51% average and 73% attendance.";
    }

    if (q.includes("top") || q.includes("best") || q.includes("ranking")) {
      return "Ayaan Khan currently leads the demo ranking with an 87% academic average.";
    }

    if (q.includes("subject") || q.includes("weak")) {
      return "Mathematics is currently the weakest subject area in this demo dataset.";
    }

    if (q.includes("class") || q.includes("performance")) {
      return "The overall demo class average is 70.3%, with a positive trend across recent assessments.";
    }

    if (q.includes("result") || q.includes("marks")) {
      return "92 assessment records have been processed. The current average is 78.4%.";
    }

    return "I can analyze students, attendance, marks, performance, rankings and results.";
  };

  const ask = (preset = query) => {
    if (!preset.trim()) return;

    setThinking(true);

    setTimeout(() => {
      setAnswer(analyze(preset));
      setThinking(false);
    }, 500);
  };

  return (
    <div className="intelligence-demo">
      <div className="assistant-top">
        <div className="assistant-brand">
          <div className="assistant-icon">
            <BrainCircuit size={20} />
          </div>
          <div>
            <span>SchoolMarks Intelligence</span>
            <strong>Academic analysis engine</strong>
          </div>
        </div>
        <span className="local-badge">Runs locally</span>
      </div>

      <div className="assistant-content">
        <div className="assistant-copy">
          <span className="section-kicker">INTELLIGENCE LAYER</span>
          <h3>Ask your school data a question.</h3>
          <p>
            A frontend-only intelligence engine can already turn marks,
            attendance and student data into useful signals.
          </p>

          <div className="suggestion-row">
            {[
              "Who needs attention?",
              "Show attendance",
              "Who is ranking first?"
            ].map((item) => (
              <button key={item} onClick={() => {
                setQuery(item);
                ask(item);
              }}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="assistant-panel">
          <div className="assistant-messages">
            <div className="assistant-message system-message">
              <Sparkles size={14} />
              <span>SchoolMarks Intelligence</span>
            </div>

            <div className="assistant-message user-message">
              {query || "Who needs attention?"}
            </div>

            <div className={`assistant-message result-message ${thinking ? "thinking" : ""}`}>
              <div className="result-icon">
                <BrainCircuit size={15} />
              </div>
              <p>
                {thinking ? "Analyzing academic data..." : answer}
              </p>
            </div>
          </div>

          <div className="assistant-input">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") ask();
              }}
              placeholder="Ask something about your school..."
            />
            <button onClick={() => ask()}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowExperience() {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const active = Math.min(
    workflow.length - 1,
    Math.floor(progress * workflow.length)
  );

  const activeData = workflow[active];

  return (
    <section className="workflow-section" ref={sectionRef}>
      <div className="container workflow-container">
        <div className="workflow-intro reveal">
          <span className="section-kicker">THE SCHOOLMARKS FLOW</span>
          <h2>
            Your school data should
            <span> move with you.</span>
          </h2>
          <p>
            Instead of jumping between registers, spreadsheets and separate
            calculations, every academic workflow connects inside one system.
          </p>
        </div>

        <div className="workflow-stage">
          <div className="workflow-steps">
            {workflow.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  className={`workflow-step ${index === active ? "active" : ""} ${index < active ? "complete" : ""}`}
                  key={item.number}
                >
                  <div className="workflow-number">{item.number}</div>
                  <div className="workflow-step-content">
                    <div className="workflow-icon">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                  <div className="workflow-line" />
                </div>
              );
            })}
          </div>

          <div className="workflow-product">
            <div className="workflow-product-sticky">
              <div className="workflow-label">
                <span className="live-dot" />
                LIVE PRODUCT EXPERIENCE
              </div>

              <div className="workflow-product-title">
                <div>
                  <span>Step {active + 1} / {workflow.length}</span>
                  <h3>{activeData.title}</h3>
                </div>
                <div className="workflow-progress">
                  <span style={{ width: `${progress * 100}%` }} />
                </div>
              </div>

              <DashboardPreview mode={active} compact />

              <div className="workflow-floating-note">
                <Sparkles size={14} />
                <span>Product state updates as you scroll</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home({ onOpenDashboard }) {
  const [heroRef, heroVisible] = useInView();
  const [problemRef, problemVisible] = useInView();
  const [modulesRef, modulesVisible] = useInView();
  const [capabilitiesRef, capabilitiesVisible] = useInView();
  const [intelRef, intelVisible] = useInView();
  const [compareRef, compareVisible] = useInView();

  const studentsCount = useCountUp(248, 1300, heroVisible);
  const classesCount = useCountUp(12, 1000, heroVisible);
  const performanceCount = useCountUp(82, 1200, heroVisible);

  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site">
      <nav className="public-nav">
        <div className="container nav-inner">
          <Logo />

          <div className={`nav-links ${mobileMenu ? "mobile-open" : ""}`}>
            <button onClick={() => scrollTo("features")}>Platform</button>
            <button onClick={() => scrollTo("workflow")}>How it works</button>
            <button onClick={() => scrollTo("intelligence")}>Intelligence</button>
            <button onClick={() => scrollTo("about")}>Why SchoolMarks</button>
          </div>

          <div className="nav-actions">
            <button className="nav-login" onClick={onOpenDashboard}>
              Open platform
            </button>
            <button className="nav-menu" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" ref={heroRef}>
          <div className="hero-grid" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="container hero-container">
            <div className={`hero-copy ${heroVisible ? "visible" : ""}`}>
              <div className="hero-eyebrow">
                <span className="status-dot" />
                Built for modern schools
              </div>

              <h1>
                The intelligence layer
                <span> for modern schools.</span>
              </h1>

              <p>
                Students, academics, attendance, examinations and performance —
                connected in one school management platform.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={onOpenDashboard}>
                  Open SchoolMarks
                  <ArrowRight size={17} />
                </button>

                <button className="secondary-button" onClick={() => scrollTo("workflow")}>
                  Explore the platform
                </button>
              </div>

              <div className="hero-trust">
                <div>
                  <strong>{studentsCount}+</strong>
                  <span>Student records</span>
                </div>
                <div>
                  <strong>{classesCount}</strong>
                  <span>Academic groups</span>
                </div>
                <div>
                  <strong>{performanceCount}%</strong>
                  <span>Demo performance</span>
                </div>
              </div>
            </div>

            <div className={`hero-product ${heroVisible ? "visible" : ""}`}>
              <div className="hero-product-glow" />
              <div className="floating-pill pill-top">
                <Sparkles size={14} />
                <span>Live intelligence</span>
              </div>

              <DashboardPreview />

              <div className="floating-pill pill-bottom">
                <TrendingUp size={14} />
                <span>Performance +6.4%</span>
              </div>
            </div>
          </div>

          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="scroll-line"><i /></div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <span>ONE PLATFORM FOR</span>
            <div>
              <span>Schools</span>
              <span>Academics</span>
              <span>Examinations</span>
              <span>Attendance</span>
              <span>Performance</span>
              <span>Results</span>
            </div>
          </div>
        </section>

        <section className="problem-section section" ref={problemRef}>
          <div className="container">
            <div className={`problem-layout ${problemVisible ? "visible" : ""}`}>
              <div className="section-copy">
                <span className="section-kicker">THE PROBLEM</span>
                <h2>
                  School data shouldn't
                  <span> live everywhere.</span>
                </h2>
                <p>
                  Paper registers, scattered spreadsheets, manual calculations
                  and disconnected attendance records make simple academic
                  decisions harder than they should be.
                </p>

                <div className="problem-list">
                  {[
                    ["01", "Paper registers", "Information gets trapped in physical records."],
                    ["02", "Scattered spreadsheets", "Different files create different versions of the truth."],
                    ["03", "Manual calculations", "Results take unnecessary time to prepare."],
                    ["04", "No performance visibility", "Important student signals stay hidden."]
                  ].map(([number, title, text]) => (
                    <div className="problem-item" key={number}>
                      <span>{number}</span>
                      <div>
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="problem-visual">
                <div className="scattered-card card-paper">
                  <FileText size={18} />
                  <span>Attendance Register</span>
                  <small>38 pages</small>
                </div>

                <div className="scattered-card card-sheet">
                  <BarChart3 size={18} />
                  <span>Marks.xlsx</span>
                  <small>Last edited yesterday</small>
                </div>

                <div className="scattered-card card-notice">
                  <Bell size={18} />
                  <span>Teacher message</span>
                  <small>“Which students are below 60%?”</small>
                </div>

                <div className="convergence">
                  <div className="convergence-ring">
                    <div>
                      <Sparkles size={22} />
                    </div>
                  </div>
                  <span>SchoolMarks</span>
                  <strong>One connected system</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="solution-section section" id="features" ref={modulesRef}>
          <div className="container">
            <div className={`section-heading ${modulesVisible ? "visible" : ""}`}>
              <div>
                <span className="section-kicker">THE SOLUTION</span>
                <h2>
                  One platform.
                  <span> Every school workflow.</span>
                </h2>
              </div>
              <p>
                SchoolMarks connects the everyday operations of a school so
                your team can spend less time managing data and more time using it.
              </p>
            </div>

            <div className={`module-grid ${modulesVisible ? "visible" : ""}`}>
              {modules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <div className="module-card" key={module.title}>
                    <div className="module-number">0{index + 1}</div>
                    <div className="module-icon">
                      <Icon size={20} />
                    </div>
                    <h3>{module.title}</h3>
                    <p>{module.text}</p>
                    <div className="module-arrow">
                      <ArrowRight size={15} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <WorkflowExperience />

        <section className="capabilities-section section" ref={capabilitiesRef}>
          <div className="container">
            <div className={`section-heading ${capabilitiesVisible ? "visible" : ""}`}>
              <div>
                <span className="section-kicker">CAPABILITY STACK</span>
                <h2>
                  Start simple.
                  <span> Grow into intelligence.</span>
                </h2>
              </div>
              <p>
                The foundation handles school operations. The intelligence layer
                helps you understand what the data is saying.
              </p>
            </div>

            <div className={`capability-grid ${capabilitiesVisible ? "visible" : ""}`}>
              {capabilities.map((capability, index) => (
                <div className={`capability-card capability-${index}`} key={capability.type}>
                  <span className="capability-type">{capability.type}</span>
                  <div className="capability-line" />
                  <h3>{capability.title}</h3>
                  <ul>
                    {capability.items.map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intelligence-section section" id="intelligence" ref={intelRef}>
          <div className="container">
            <div className={`intelligence-header ${intelVisible ? "visible" : ""}`}>
              <span className="section-kicker">SCHOOLMARKS INTELLIGENCE</span>
              <h2>
                Your data already knows
                <span> more than you think.</span>
              </h2>
              <p>
                Frontend intelligence can analyze structured school data and
                turn it into useful academic signals — without a backend.
              </p>
            </div>

            <IntelligenceDemo />

            <div className="intelligence-note">
              <Zap size={15} />
              <span>
                This demo uses local browser-side analysis. A secure AI API can
                be added later through a serverless backend.
              </span>
            </div>
          </div>
        </section>

        <section className="analytics-section section">
          <div className="container">
            <div className="analytics-layout">
              <div className="analytics-copy">
                <span className="section-kicker">SEE THE SIGNAL</span>
                <h2>
                  From raw marks
                  <span> to academic decisions.</span>
                </h2>
                <p>
                  SchoolMarks doesn't stop at storing marks. The platform can
                  surface trends, rankings and students who may need support.
                </p>

                <div className="signal-list">
                  <div>
                    <div className="signal-icon"><TrendingUp size={17} /></div>
                    <div>
                      <strong>Performance trends</strong>
                      <span>Compare assessment performance over time.</span>
                    </div>
                  </div>
                  <div>
                    <div className="signal-icon"><Target size={17} /></div>
                    <div>
                      <strong>At-risk detection</strong>
                      <span>Find students below defined academic thresholds.</span>
                    </div>
                  </div>
                  <div>
                    <div className="signal-icon"><Award size={17} /></div>
                    <div>
                      <strong>Rankings & results</strong>
                      <span>Generate consistent academic calculations.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="analytics-visual">
                <DashboardPreview mode={5} />
                <div className="analytics-float">
                  <div className="analytics-float-icon">
                    <BrainCircuit size={15} />
                  </div>
                  <div>
                    <span>Insight detected</span>
                    <strong>Mathematics needs attention</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="compare-section section" id="about" ref={compareRef}>
          <div className="container">
            <div className={`compare-heading ${compareVisible ? "visible" : ""}`}>
              <span className="section-kicker">THE DIFFERENCE</span>
              <h2>
                Stop managing school data.
                <span> Start using it.</span>
              </h2>
            </div>

            <div className={`comparison ${compareVisible ? "visible" : ""}`}>
              <div className="comparison-column traditional">
                <div className="comparison-header">
                  <span>Traditional</span>
                  <small>Fragmented</small>
                </div>
                {[
                  "Paper registers and spreadsheets",
                  "Manual calculations",
                  "Separate attendance records",
                  "Delayed result preparation",
                  "Limited performance visibility",
                  "Data scattered across files"
                ].map((item) => (
                  <div className="comparison-row" key={item}>
                    <X size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="comparison-center">
                <div className="comparison-logo">
                  <img src="/logo/schoolmarks-logo.png" alt="" />
                </div>
                <span>vs</span>
              </div>

              <div className="comparison-column modern">
                <div className="comparison-header">
                  <span>SchoolMarks</span>
                  <small>Connected</small>
                </div>
                {[
                  "Digital student records",
                  "Automatic calculations",
                  "Unified attendance intelligence",
                  "Instant result preparation",
                  "Performance analytics",
                  "One connected academic system"
                ].map((item) => (
                  <div className="comparison-row" key={item}>
                    <Check size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-grid" />
              <div className="cta-copy">
                <span className="section-kicker">READY WHEN YOU ARE</span>
                <h2>
                  Your school already has
                  <span> the data.</span>
                </h2>
                <p>
                  SchoolMarks turns that data into a connected academic
                  experience.
                </p>

                <button className="primary-button light-button" onClick={onOpenDashboard}>
                  Open SchoolMarks
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="cta-product">
                <div className="cta-mini-card">
                  <BrainCircuit size={18} />
                  <div>
                    <span>Intelligence</span>
                    <strong>6 students need attention</strong>
                  </div>
                </div>
                <div className="cta-mini-card">
                  <TrendingUp size={18} />
                  <div>
                    <span>Performance</span>
                    <strong>+6.4% this term</strong>
                  </div>
                </div>
                <div className="cta-mini-card">
                  <ClipboardCheck size={18} />
                  <div>
                    <span>Results</span>
                    <strong>92 assessments processed</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo dark />
          <div className="footer-copy">
            <span>SchoolMarks</span>
            <p>Connected school management for modern academic teams.</p>
          </div>
          <span className="footer-year">© 2026 SchoolMarks</span>
        </div>
      </footer>
    </div>
  );
}

function AccessModal({ onClose }) {
  const [loading, setLoading] = useState(false);

  const enter = () => {
    setLoading(true);

    setTimeout(() => {
      onClose();
    }, 650);
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="access-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-icon">
          <LayoutDashboard size={22} />
        </div>

        <span className="section-kicker">SCHOOLMARKS PLATFORM</span>
        <h2>Open your school workspace.</h2>
        <p>
          Continue into the management platform and explore your academic
          dashboard.
        </p>

        <div className="access-preview">
          <div>
            <span>Workspace</span>
            <strong>School Admin</strong>
          </div>
          <div>
            <span>Academic year</span>
            <strong>2026–27</strong>
          </div>
          <Check size={17} />
        </div>

        <button className="primary-button modal-button" onClick={enter}>
          {loading ? "Opening workspace..." : "Continue to platform"}
          {!loading && <ArrowRight size={17} />}
        </button>

        <span className="modal-note">
          Your data remains stored locally in this browser.
        </span>
      </div>
    </div>
  );
}

function Dashboard({ onBack }) {
  return (
    <div className="app-shell">
      <header className="app-topbar">
        <Logo />
        <button className="back-home" onClick={onBack}>
          ← Back to Home
        </button>
      </header>

      <div className="dashboard-placeholder">
        <div className="dashboard-placeholder-card">
          <div className="placeholder-icon">
            <LayoutDashboard size={26} />
          </div>
          <span className="section-kicker">SCHOOLMARKS PLATFORM</span>
          <h1>Dashboard workspace</h1>
          <p>
            Your existing SchoolMarks dashboard can continue here. The new
            homepage is now ready to connect to your actual management modules.
          </p>
          <div className="placeholder-stats">
            <div>
              <strong>248</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Classes</span>
            </div>
            <div>
              <strong>82%</strong>
              <span>Performance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [access, setAccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  if (page === "dashboard") {
    return <Dashboard onBack={() => setPage("home")} />;
  }

  return (
    <>
      <Home onOpenDashboard={() => setAccess(true)} />

      {access && (
        <AccessModal
          onClose={() => {
            setAccess(false);
            setPage("dashboard");
          }}
        />
      )}
    </>
  );
}