import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertCircle,
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
  Database,
  FileBarChart,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  UserCog,
  Users,
  X,
  Zap
} from "lucide-react";

const logoPath = "/logo/schoolmarks-logo.png";

const seedStudents = [
  { id: 1, name: "Ayaan Khan", className: "9-A", avg: 91, attendance: 96, status: "Excellent" },
  { id: 2, name: "Maham Ali", className: "9-A", avg: 88, attendance: 94, status: "Strong" },
  { id: 3, name: "Hassan Raza", className: "9-B", avg: 84, attendance: 91, status: "Strong" },
  { id: 4, name: "Zoya Ahmed", className: "9-A", avg: 95, attendance: 98, status: "Excellent" },
  { id: 5, name: "Hamza Noor", className: "9-B", avg: 79, attendance: 87, status: "Needs Focus" },
  { id: 6, name: "Maryam Shah", className: "9-B", avg: 93, attendance: 97, status: "Excellent" },
  { id: 7, name: "Rayyan Ahmed", className: "9-C", avg: 86, attendance: 92, status: "Strong" },
  { id: 8, name: "Hiba Tariq", className: "9-C", avg: 90, attendance: 95, status: "Excellent" }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Exams", icon: CalendarDays },
  { id: "marks", label: "Marks", icon: ClipboardCheck },
  { id: "results", label: "Results", icon: FileBarChart },
  { id: "attendance", label: "Attendance", icon: Clock3 },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "ai", label: "AI Workspace", icon: Brain }
];

const workflowSteps = [
  {
    number: "01",
    title: "Capture",
    text: "Record marks, attendance and academic activity in seconds.",
    icon: ClipboardCheck
  },
  {
    number: "02",
    title: "Organize",
    text: "SchoolMarks automatically structures everything by class and subject.",
    icon: Database
  },
  {
    number: "03",
    title: "Review",
    text: "Spot missing data, unusual scores and attendance signals instantly.",
    icon: Search
  },
  {
    number: "04",
    title: "Verify",
    text: "Review records before they become part of the official history.",
    icon: ShieldCheck
  },
  {
    number: "05",
    title: "Analyze",
    text: "Turn academic records into clear performance insights.",
    icon: BarChart3
  },
  {
    number: "06",
    title: "Report",
    text: "Generate clean reports for teachers, administrators and parents.",
    icon: FileText
  },
  {
    number: "07",
    title: "Improve",
    text: "Use trends to identify where students need more support.",
    icon: Target
  },
  {
    number: "08",
    title: "Remember",
    text: "Every verified record becomes part of a permanent academic history.",
    icon: Award
  }
];

const aiQuestions = [
  "Which students need academic attention?",
  "Show me the strongest performing class.",
  "Who has attendance below 90%?",
  "Which subjects need improvement?",
  "Summarize this month's academic performance.",
  "Find students whose marks are declining.",
  "Who are the top 5 students?",
  "Compare attendance with academic performance.",
  "Give me a teacher-friendly performance summary.",
  "What should the school focus on this month?",
  "Which students have excellent attendance?",
  "Generate a quick principal briefing."
];

const subjects = [
  { name: "Mathematics", score: 89, color: "green" },
  { name: "English", score: 86, color: "green" },
  { name: "Physics", score: 82, color: "green" },
  { name: "Computer Science", score: 94, color: "green" },
  { name: "Chemistry", score: 79, color: "green" },
  { name: "Biology", score: 88, color: "green" }
];

function useCountUp(target, duration = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start;
    let frame;

    const animate = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) frame = requestAnimationFrame(animate);
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
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Logo({ compact = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      {!failed ? (
        <div className="brand-logo-wrap">
          <img
            src={logoPath}
            alt="SchoolMarks"
            className="brand-image"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div className="brand-fallback">SM</div>
      )}

      {!compact && (
        <div className="brand-copy">
          <strong>SchoolMarks</strong>
          <span>Academic Intelligence</span>
        </div>
      )}
    </div>
  );
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast">
      <div className="toast-icon">
        <CheckCircle2 size={18} />
      </div>
      <div>
        <strong>{toast.title}</strong>
        <span>{toast.message}</span>
      </div>
      <button onClick={onClose}>
        <X size={15} />
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(current => (current + 1) % 4);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-product-wrap">
      <div className="hero-product-glow" />
      <div className="product-floating floating-one">
        <Activity size={15} />
        <span>Performance</span>
        <strong>+12.8%</strong>
      </div>

      <div className="product-floating floating-two">
        <CheckCircle2 size={15} />
        <span>Records verified</span>
        <strong>98%</strong>
      </div>

      <div className="product-window">
        <div className="window-top">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="window-address">
            <ShieldCheck size={12} />
            schoolmarks.app
          </div>
          <div className="window-user">SA</div>
        </div>

        <div className="window-body">
          <aside className="mini-sidebar">
            <Logo compact />
            {navItems.slice(0, 7).map((item, index) => {
              const Icon = item.icon;
              return (
                <div className={`mini-nav ${active === index % 4 ? "active" : ""}`} key={item.id}>
                  <Icon size={14} />
                </div>
              );
            })}
          </aside>

          <div className="mini-content">
            <div className="mini-head">
              <div>
                <span>School overview</span>
                <h3>Good morning, Admin</h3>
              </div>
              <div className="mini-date">
                <CalendarDays size={13} />
                September 2026
              </div>
            </div>

            <div className="mini-stats">
              <div>
                <span>Total Students</span>
                <strong>842</strong>
                <small>+4.6%</small>
              </div>
              <div>
                <span>Average Score</span>
                <strong>87.4%</strong>
                <small>+3.2%</small>
              </div>
              <div>
                <span>Attendance</span>
                <strong>94.8%</strong>
                <small>+1.8%</small>
              </div>
            </div>

            <div className="mini-grid">
              <div className="mini-chart-card">
                <div className="mini-card-head">
                  <span>Academic Growth</span>
                  <TrendingUp size={14} />
                </div>
                <div className="mini-chart">
                  <svg viewBox="0 0 500 170" preserveAspectRatio="none">
                    <path d="M0 138 C55 125 75 130 105 112 S160 120 190 93 S235 107 270 82 S315 88 350 63 S410 76 450 40 S480 48 500 25" />
                  </svg>
                </div>
                <div className="mini-months">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                </div>
              </div>

              <div className="mini-ai-card">
                <div className="mini-ai-orb">
                  <Sparkles size={16} />
                </div>
                <span>SchoolMarks AI</span>
                <strong>3 signals need review</strong>
                <button>
                  Open insights
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>

            <div className="mini-table">
              <div className="mini-table-head">
                <span>Student</span>
                <span>Class</span>
                <span>Average</span>
                <span>Status</span>
              </div>
              {seedStudents.slice(0, 4).map(student => (
                <div className="mini-row" key={student.id}>
                  <span className="mini-student">
                    <i>{student.name.charAt(0)}</i>
                    {student.name}
                  </span>
                  <span>{student.className}</span>
                  <strong>{student.avg}%</strong>
                  <span className="mini-status">
                    <i />
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Workflow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(current => (current + 1) % workflowSteps.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const current = workflowSteps[active];
  const Icon = current.icon;

  return (
    <section className="section workflow-section" id="workflow">
      <div className="container">
        <Reveal className="section-heading centered">
          <span className="eyebrow">
            <Zap size={14} />
            The SchoolMarks Flow
          </span>
          <h2>From scan to permanent history.</h2>
          <p>
            Every academic action moves through one connected workflow, so records
            stay clean, traceable and useful.
          </p>
        </Reveal>

        <Reveal className="workflow-shell" delay={100}>
          <div className="workflow-line">
            <span style={{ width: `${((active + 1) / workflowSteps.length) * 100}%` }} />
          </div>

          <div className="workflow-steps">
            {workflowSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <button
                  className={`workflow-step ${active === index ? "active" : ""}`}
                  key={step.number}
                  onClick={() => setActive(index)}
                >
                  <span className="workflow-node">
                    <StepIcon size={18} />
                  </span>
                  <small>{step.number}</small>
                  <strong>{step.title}</strong>
                </button>
              );
            })}
          </div>

          <div className="workflow-detail">
            <div className="workflow-detail-icon">
              <Icon size={27} />
            </div>
            <div>
              <span>Step {current.number}</span>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
            </div>
            <div className="workflow-progress">
              <strong>{String(active + 1).padStart(2, "0")}</strong>
              <span>/08</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomeAI({ onOpenAI }) {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = question => {
    const q = question || prompt;
    if (!q.trim()) return;

    setAnswer(
      q.toLowerCase().includes("attendance")
        ? "12 students are currently below 90% attendance. Three students have attendance below 85% and should be reviewed first."
        : q.toLowerCase().includes("strongest")
          ? "Class 9-A currently has the strongest overall academic average at 91.3%, followed by 9-B at 86.8%."
          : q.toLowerCase().includes("top")
            ? "The current top performers are Zoya Ahmed, Maryam Shah, Ayaan Khan, Hiba Tariq and Maham Ali."
            : "SchoolMarks AI found a positive academic trend this month. Average performance is up, while attendance remains above the school target."
    );
    setPrompt(q);
  };

  return (
    <div className="home-ai-box">
      <div className="home-ai-header">
        <div className="ai-title-row">
          <div className="ai-icon">
            <Sparkles size={19} />
          </div>
          <div>
            <span>SchoolMarks Intelligence</span>
            <h3>Ask your school data.</h3>
          </div>
        </div>
        <button className="ai-open-button" onClick={onOpenAI}>
          Full workspace
          <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="home-ai-body">
        <div className="home-ai-input">
          <MessageSquare size={18} />
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === "Enter" && ask()}
            placeholder="Ask something about your school..."
          />
          <button onClick={() => ask()}>
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="home-ai-suggestions">
          {aiQuestions.slice(0, 5).map(question => (
            <button key={question} onClick={() => ask(question)}>
              {question}
            </button>
          ))}
        </div>

        {answer && (
          <div className="home-ai-answer">
            <div className="answer-head">
              <Sparkles size={15} />
              AI insight
            </div>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage({ navigate }) {
  const [problemRef, problemVisible] = useReveal();
  const heroStudents = useCountUp(842);
  const heroAccuracy = useCountUp(98);
  const heroAttendance = useCountUp(95);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="public-site">
      <header className="public-nav">
        <div className="container nav-inner">
          <Logo />

          <nav className="desktop-nav">
            <button onClick={() => scrollTo("product")}>Product</button>
            <button onClick={() => scrollTo("workflow")}>Workflow</button>
            <button onClick={() => scrollTo("intelligence")}>Intelligence</button>
            <button onClick={() => scrollTo("features")}>Features</button>
          </nav>

          <div className="nav-actions">
            <button className="nav-login" onClick={() => navigate("dashboard")}>
              Sign in
            </button>
            <button className="nav-cta" onClick={() => navigate("dashboard")}>
              Open SchoolMarks
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid-bg" />
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />

          <div className="container hero-layout">
            <Reveal className="hero-copy">
              <span className="hero-label">
                <i />
                Intelligent academic management
              </span>

              <h1>
                The operating system for
                <span> better schools.</span>
              </h1>

              <p>
                SchoolMarks brings students, marks, attendance, exams,
                performance and AI-powered insights into one calm workspace.
              </p>

              <div className="hero-buttons">
                <button className="primary-button" onClick={() => navigate("dashboard")}>
                  Explore SchoolMarks
                  <ArrowRight size={17} />
                </button>
                <button className="secondary-button" onClick={() => scrollTo("workflow")}>
                  See how it works
                  <ChevronRight size={17} />
                </button>
              </div>

              <div className="hero-proof">
                <div className="proof-stack">
                  <span>SA</span>
                  <span>TA</span>
                  <span>MA</span>
                  <span>RK</span>
                </div>
                <div>
                  <strong>Built for modern school teams</strong>
                  <small>Simple enough for everyday work. Powerful enough for school-wide decisions.</small>
                </div>
              </div>
            </Reveal>

            <Reveal className="hero-product" delay={160}>
              <ProductPreview />
            </Reveal>
          </div>

          <div className="container hero-metrics">
            <CountMetric value={heroStudents} label="student records" />
            <CountMetric value={heroAccuracy} suffix="%" label="verified records" />
            <CountMetric value={heroAttendance} suffix="%" label="attendance visibility" />
            <div className="metric-live">
              <span />
              <strong>System status</strong>
              <small>Operational</small>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container">
            <span>ONE WORKSPACE FOR</span>
            <div className="marquee">
              <div className="marquee-track">
                {["Students", "Academics", "Exams", "Marks", "Attendance", "Performance", "Reports", "AI Insights", "Students", "Academics", "Exams", "Marks"].map(
                  item => (
                    <strong key={`${item}-${Math.random()}`}>{item}</strong>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section problem-section" id="product" ref={problemRef}>
          <div className="container problem-layout">
            <Reveal className="problem-intro">
              <span className="eyebrow">
                <Activity size={14} />
                The problem
              </span>
              <h2>
                School data should feel
                <span> connected.</span>
              </h2>
              <p>
                Instead of jumping between spreadsheets, notebooks and disconnected
                reports, SchoolMarks creates one continuous academic picture.
              </p>

              <div className="problem-stat">
                <strong>01</strong>
                <span>source of truth</span>
              </div>
            </Reveal>

            <div className={`problem-cards ${problemVisible ? "ready" : ""}`}>
              {[
                ["Scattered records", "Information lives across too many places.", Database],
                ["Slow reporting", "Manual work makes simple answers take too long.", Clock3],
                ["Hidden patterns", "Important academic signals can stay unnoticed.", BarChart3],
                ["No continuity", "Student history gets harder to understand over time.", HistoryIcon]
              ].map(([title, text, Icon], index) => (
                <Reveal key={title} delay={index * 90}>
                  <div className="problem-card">
                    <div className="problem-card-top">
                      <div className="problem-icon">
                        <Icon size={19} />
                      </div>
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <div className="problem-line">
                      <span />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Workflow />

        <section className="section intelligence-section" id="intelligence">
          <div className="container">
            <div className="intelligence-layout">
              <Reveal className="intelligence-copy">
                <span className="eyebrow light">
                  <Sparkles size={14} />
                  SchoolMarks AI
                </span>
                <h2>
                  Ask the data.
                  <span> Get the signal.</span>
                </h2>
                <p>
                  Your school already has the answers. SchoolMarks AI helps you
                  find them without digging through rows and reports.
                </p>

                <div className="ai-capability-list">
                  {[
                    "Academic performance summaries",
                    "Attendance risk detection",
                    "Class comparisons",
                    "Student trend analysis",
                    "Principal-ready briefings"
                  ].map(item => (
                    <div key={item}>
                      <Check size={15} />
                      {item}
                    </div>
                  ))}
                </div>

                <button className="light-button" onClick={() => navigate("ai")}>
                  Open AI Workspace
                  <ArrowUpRight size={16} />
                </button>
              </Reveal>

              <Reveal className="intelligence-visual" delay={150}>
                <div className="ai-visual-glow" />
                <div className="ai-command">
                  <div className="ai-command-top">
                    <span>
                      <i />
                      SchoolMarks AI
                    </span>
                    <Sparkles size={15} />
                  </div>

                  <div className="ai-question">
                    Which students need academic attention this month?
                  </div>

                  <div className="ai-thinking">
                    <span />
                    <span />
                    <span />
                    <small>Analyzing 842 records</small>
                  </div>

                  <div className="ai-result">
                    <div className="result-heading">
                      <CheckCircle2 size={16} />
                      Analysis complete
                    </div>
                    <p>12 students show signals worth reviewing.</p>

                    {["Hamza Noor", "Student 104", "Student 227"].map((name, index) => (
                      <div className="ai-result-row" key={name}>
                        <span>{index + 1}</span>
                        <strong>{name}</strong>
                        <small>{index === 0 ? "79% avg" : "Trend detected"}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section dashboard-showcase">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">
                <LayoutDashboard size={14} />
                One clear view
              </span>
              <h2>Everything your school needs, without the noise.</h2>
              <p>
                A live command center for the people responsible for keeping
                academic operations moving.
              </p>
            </Reveal>

            <Reveal className="showcase-window" delay={120}>
              <div className="showcase-header">
                <div>
                  <span>School overview</span>
                  <strong>September 2026</strong>
                </div>
                <div className="showcase-actions">
                  <button><Search size={14} /></button>
                  <button><Bell size={14} /></button>
                  <button className="showcase-avatar">SA</button>
                </div>
              </div>

              <div className="showcase-stats">
                {[
                  ["Students", "842", "+4.6%", Users],
                  ["Avg. score", "87.4%", "+3.2%", Award],
                  ["Attendance", "94.8%", "+1.8%", Clock3],
                  ["Assessments", "126", "+8.1%", ClipboardCheck]
                ].map(([label, value, change, Icon]) => (
                  <div key={label} className="showcase-stat">
                    <div className="showcase-stat-icon"><Icon size={16} /></div>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small><ArrowUpRight size={11} /> {change}</small>
                  </div>
                ))}
              </div>

              <div className="showcase-content">
                <div className="showcase-chart">
                  <div className="showcase-card-title">
                    <div>
                      <span>Academic growth</span>
                      <strong>Performance trend</strong>
                    </div>
                    <button>
                      This year
                      <ChevronDown size={13} />
                    </button>
                  </div>

                  <div className="showcase-graph">
                    <div className="graph-y">
                      <span>100</span>
                      <span>75</span>
                      <span>50</span>
                      <span>25</span>
                      <span>0</span>
                    </div>
                    <div className="graph-area">
                      <div className="graph-lines">
                        <i /><i /><i /><i /><i />
                      </div>
                      <svg viewBox="0 0 800 300" preserveAspectRatio="none">
                        <path d="M0 245 C70 228 90 235 145 206 S220 214 270 180 S350 194 405 150 S480 165 525 120 S610 142 660 85 S730 102 800 50" />
                        <path className="graph-area-fill" d="M0 245 C70 228 90 235 145 206 S220 214 270 180 S350 194 405 150 S480 165 525 120 S610 142 660 85 S730 102 800 50 L800 300 L0 300 Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="graph-months">
                    {["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map(month => <span key={month}>{month}</span>)}
                  </div>
                </div>

                <div className="showcase-side">
                  <div className="showcase-ai">
                    <div className="showcase-ai-orb"><Sparkles size={18} /></div>
                    <span>AI signal</span>
                    <strong>Performance is trending upward.</strong>
                    <p>Average score improved 3.2% compared with the previous period.</p>
                    <button>View analysis <ArrowUpRight size={13} /></button>
                  </div>

                  <div className="showcase-mini-list">
                    <div className="showcase-card-title">
                      <div>
                        <span>Top students</span>
                        <strong>Current ranking</strong>
                      </div>
                      <Award size={16} />
                    </div>

                    {seedStudents.slice(0, 3).map((student, index) => (
                      <div className="rank-row" key={student.id}>
                        <span>{index + 1}</span>
                        <div className="rank-avatar">{student.name.charAt(0)}</div>
                        <strong>{student.name}</strong>
                        <b>{student.avg}%</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="container">
            <Reveal className="section-heading">
              <span className="eyebrow">
                <Zap size={14} />
                Built into the system
              </span>
              <h2>Small details. Serious difference.</h2>
              <p>
                Every part of SchoolMarks is designed to reduce friction and
                make academic work easier to understand.
              </p>
            </Reveal>

            <div className="feature-grid">
              {[
                [Users, "Student management", "Profiles, classes, academic records and quick search."],
                [ClipboardCheck, "Marks & assessments", "Record, review and manage marks without messy spreadsheets."],
                [Clock3, "Attendance intelligence", "See attendance patterns and identify students needing attention."],
                [FileBarChart, "Reports", "Turn live academic data into clean, useful reporting."],
                [Brain, "AI workspace", "Ask questions about your school's data in natural language."],
                [ShieldCheck, "Verified history", "Keep a reliable academic trail for every student."]
              ].map(([Icon, title, text], index) => (
                <Reveal key={title} delay={index * 70}>
                  <div className="feature-card">
                    <div className="feature-icon"><Icon size={19} /></div>
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <ArrowUpRight size={16} className="feature-arrow" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section numbers-section">
          <div className="container numbers-grid">
            <Reveal>
              <CountMetric value={842} label="students managed" />
            </Reveal>
            <Reveal delay={100}>
              <CountMetric value={126} label="assessments tracked" />
            </Reveal>
            <Reveal delay={200}>
              <CountMetric value={98} suffix="%" label="records verified" />
            </Reveal>
            <Reveal delay={300}>
              <CountMetric value={24} label="academic signals" />
            </Reveal>
          </div>
        </section>

        <section className="section compare-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">
                <ArrowRight size={14} />
                The shift
              </span>
              <h2>Move from fragmented work to connected operations.</h2>
            </Reveal>

            <Reveal className="compare-card" delay={100}>
              <div className="compare-column traditional">
                <span className="compare-label">Traditional workflow</span>
                <h3>Data gets spread out.</h3>
                {[
                  "Multiple spreadsheets",
                  "Manual reporting",
                  "Scattered student history",
                  "Delayed insights",
                  "Hard-to-track changes"
                ].map(item => (
                  <div key={item}>
                    <X size={15} />
                    {item}
                  </div>
                ))}
              </div>

              <div className="compare-divider">
                <span>VS</span>
              </div>

              <div className="compare-column modern">
                <span className="compare-label">SchoolMarks</span>
                <h3>Everything connects.</h3>
                {[
                  "One academic workspace",
                  "Live reporting",
                  "Permanent student history",
                  "AI-powered insights",
                  "Connected academic operations"
                ].map(item => (
                  <div key={item}>
                    <Check size={15} />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-grid" />
          <div className="cta-orb" />
          <div className="container cta-content">
            <Reveal>
              <span className="eyebrow light">
                <Sparkles size={14} />
                Ready when you are
              </span>
              <h2>Make school data work harder.</h2>
              <p>
                Bring your academic operations into one intelligent workspace.
              </p>
              <button className="light-button" onClick={() => navigate("dashboard")}>
                Enter SchoolMarks
                <ArrowUpRight size={16} />
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="public-footer">
        <div className="container footer-inner">
          <Logo />
          <div>
            <span>Academic intelligence for modern schools.</span>
            <small>© 2026 SchoolMarks</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <button className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`app-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="school-switcher">
          <div className="school-avatar">SA</div>
          <div>
            <strong>School Admin</strong>
            <span>Main Campus</span>
          </div>
          <ChevronDown size={15} />
        </div>

        <span className="sidebar-label">Workspace</span>

        <nav className="sidebar-nav">
          {navItems.map(item => {
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
                {item.id === "ai" && <i className="nav-new">NEW</i>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <span className="sidebar-label">Account</span>
          <button
            className={page === "profile" ? "active" : ""}
            onClick={() => {
              setPage("profile");
              setMobileOpen(false);
            }}
          >
            <UserCog size={17} />
            <span>Profile Manager</span>
          </button>

          <button
            className={page === "settings" ? "active" : ""}
            onClick={() => {
              setPage("settings");
              setMobileOpen(false);
            }}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <div className="profile-mini">
            <div>SA</div>
            <span>
              <strong>School Admin</strong>
              <small>Administrator</small>
            </span>
            <MoreHorizontal size={16} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ page, setMobileOpen, navigate }) {
  const current = [...navItems, { id: "profile", label: "Profile Manager" }, { id: "settings", label: "Settings" }].find(
    item => item.id === page
  );

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <div>
          <span>Workspace</span>
          <strong>{current?.label || "Overview"}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="search-button">
          <Search size={17} />
          <span>Search anything</span>
          <kbd>⌘ K</kbd>
        </button>

        <button className="icon-button">
          <Bell size={17} />
          <i />
        </button>

        <button className="top-ai" onClick={() => navigate("ai")}>
          <Sparkles size={15} />
          Ask AI
        </button>

        <button className="top-profile" onClick={() => navigate("profile")}>
          <span>SA</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, change, negative = false }) {
  return (
    <div className="dashboard-stat">
      <div className="stat-top">
        <div className="stat-icon"><Icon size={18} /></div>
        <span className={negative ? "danger-text" : ""}>
          {negative ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
          {change}
        </span>
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DashboardPage({ navigate, students }) {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Overview / September 2026</span>
          <h1>School at a glance.</h1>
          <p>Everything important, in one place.</p>
        </div>
        <div className="heading-actions">
          <button className="outline-button" onClick={() => navigate("reports")}>
            <FileBarChart size={16} />
            Reports
          </button>
          <button className="solid-button" onClick={() => navigate("students")}>
            <Plus size={16} />
            Add student
          </button>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <StatCard icon={Users} label="Total students" value="842" change="4.6%" />
        <StatCard icon={Award} label="Average score" value="87.4%" change="3.2%" />
        <StatCard icon={Clock3} label="Attendance" value="94.8%" change="1.8%" />
        <StatCard icon={ClipboardCheck} label="Assessments" value="126" change="8.1%" />
      </div>

      <div className="dashboard-grid-main">
        <div className="dashboard-chart-card">
          <div className="card-heading">
            <div>
              <span>Academic growth</span>
              <h3>Performance trend</h3>
            </div>
            <select>
              <option>This year</option>
              <option>This term</option>
              <option>This month</option>
            </select>
          </div>

          <div className="dashboard-big-chart">
            <div className="big-chart-labels">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
            <div className="big-chart-area">
              <div className="big-chart-grid">
                <i /><i /><i /><i /><i />
              </div>
              <svg viewBox="0 0 900 300" preserveAspectRatio="none">
                <path d="M0 245 C60 230 90 238 140 205 S220 215 280 180 S350 195 410 145 S490 165 545 120 S620 135 680 90 S770 115 900 42" />
                <path className="chart-fill" d="M0 245 C60 230 90 238 140 205 S220 215 280 180 S350 195 410 145 S490 165 545 120 S620 135 680 90 S770 115 900 42 L900 300 L0 300 Z" />
              </svg>
              <div className="big-chart-months">
                {["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-ai-card">
          <div className="ai-card-label">
            <Sparkles size={14} />
            SchoolMarks AI
          </div>
          <div className="ai-signal">
            <div className="signal-icon success"><TrendingUp size={18} /></div>
            <div>
              <strong>Positive trend detected</strong>
              <span>Average performance increased 3.2%.</span>
            </div>
          </div>
          <div className="ai-signal">
            <div className="signal-icon warning"><AlertCircle size={18} /></div>
            <div>
              <strong>12 students need review</strong>
              <span>Performance signals changed this month.</span>
            </div>
          </div>
          <button onClick={() => navigate("ai")}>
            Open AI analysis
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="table-card">
          <div className="card-heading">
            <div>
              <span>Students</span>
              <h3>Recent academic activity</h3>
            </div>
            <button className="text-button" onClick={() => navigate("students")}>View all</button>
          </div>

          <div className="data-table">
            <div className="table-row table-header">
              <span>Student</span>
              <span>Class</span>
              <span>Average</span>
              <span>Attendance</span>
            </div>

            {students.slice(0, 5).map(student => (
              <div className="table-row" key={student.id}>
                <span className="table-student">
                  <i>{student.name.charAt(0)}</i>
                  <strong>{student.name}</strong>
                </span>
                <span>{student.className}</span>
                <b>{student.avg}%</b>
                <span className="attendance-cell">
                  <i style={{ width: `${student.attendance}%` }} />
                  {student.attendance}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="side-card">
          <div className="card-heading">
            <div>
              <span>Upcoming</span>
              <h3>Exam timeline</h3>
            </div>
            <CalendarDays size={17} />
          </div>

          {[
            ["18", "Mathematics", "09:00 AM"],
            ["21", "Physics", "10:30 AM"],
            ["24", "English", "09:30 AM"]
          ].map(([date, subject, time]) => (
            <div className="exam-mini" key={subject}>
              <strong>{date}</strong>
              <span>
                <b>{subject}</b>
                {time}
              </span>
              <ChevronRight size={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ students, setStudents, notify }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("9-A");
  const [menu, setMenu] = useState(null);

  const filtered = useMemo(
    () =>
      students.filter(student =>
        `${student.name} ${student.className}`.toLowerCase().includes(search.toLowerCase())
      ),
    [students, search]
  );

  const addStudent = () => {
    if (!name.trim()) return;

    setStudents(current => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        className,
        avg: 0,
        attendance: 100,
        status: "New"
      }
    ]);

    setName("");
    setClassName("9-A");
    setModal(false);
    notify("Student added", `${name.trim()} has been added to the student directory.`);
  };

  const removeStudent = id => {
    setStudents(current => current.filter(student => student.id !== id));
    setMenu(null);
    notify("Student removed", "The student record was removed from this workspace.");
  };

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Directory / Students</span>
          <h1>Student directory.</h1>
          <p>Manage academic identities and records from one place.</p>
        </div>
        <button className="solid-button" onClick={() => setModal(true)}>
          <Plus size={16} />
          Add student
        </button>
      </div>

      <div className="large-table-card">
        <div className="marks-toolbar">
          <div className="student-search">
            <Search size={17} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search students or classes..."
            />
          </div>
          <div className="toolbar-count">
            {filtered.length} students
          </div>
        </div>

        <div className="students-table">
          <div className="students-head">
            <span>Student</span>
            <span>Class</span>
            <span>Average</span>
            <span>Attendance</span>
            <span>Status</span>
            <span />
          </div>

          {filtered.map(student => (
            <div className="students-row" key={student.id}>
              <span className="student-profile-cell">
                <i>{student.name.charAt(0)}</i>
                <strong>{student.name}</strong>
              </span>
              <span>{student.className}</span>
              <strong>{student.avg ? `${student.avg}%` : "—"}</strong>
              <span>{student.attendance}%</span>
              <span className={`status-pill ${student.status.toLowerCase().replaceAll(" ", "-")}`}>
                {student.status}
              </span>
              <div className="row-menu-wrap">
                <button onClick={() => setMenu(menu === student.id ? null : student.id)}>
                  <MoreHorizontal size={17} />
                </button>

                {menu === student.id && (
                  <div className="row-menu">
                    <button onClick={() => notify("Student opened", `${student.name}'s profile is ready to review.`)}>
                      <User size={14} />
                      View profile
                    </button>
                    <button onClick={() => notify("Edit mode", `Editing tools for ${student.name} are ready.`)}>
                      <Pencil size={14} />
                      Edit record
                    </button>
                    <button className="danger" onClick={() => removeStudent(student.id)}>
                      <X size={14} />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="add-student-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span>Add record</span>
                <h2>New student</h2>
              </div>
              <button onClick={() => setModal(false)}><X size={18} /></button>
            </div>

            <div className="student-form-grid">
              <label>
                Student name
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter full name" />
              </label>
              <label>
                Class
                <select value={className} onChange={e => setClassName(e.target.value)}>
                  <option>9-A</option>
                  <option>9-B</option>
                  <option>9-C</option>
                  <option>10-A</option>
                  <option>10-B</option>
                </select>
              </label>
            </div>

            <div className="modal-foot">
              <button className="outline-button" onClick={() => setModal(false)}>Cancel</button>
              <button className="solid-button" onClick={addStudent}>
                <Check size={15} />
                Create student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AcademicsPage() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Academics / Subjects</span>
          <h1>Academic health.</h1>
          <p>See how each subject is performing across the school.</p>
        </div>
      </div>

      <div className="academic-hero">
        <div>
          <span>School academic index</span>
          <strong>87.4%</strong>
          <p>Overall performance across active subjects.</p>
        </div>
        <div className="academic-progress">
          <span />
        </div>
        <div className="academic-meta">
          <div><TrendingUp size={15} /> +3.2% this term</div>
          <div><CheckCircle2 size={15} /> Above school target</div>
        </div>
      </div>

      <div className="subject-grid">
        {subjects.map((subject, index) => (
          <div className="subject-card" key={subject.name}>
            <div className="subject-head">
              <div className="subject-icon"><BookOpen size={17} /></div>
              <span>0{index + 1}</span>
            </div>
            <h3>{subject.name}</h3>
            <strong>{subject.score}%</strong>
            <div className="subject-bar">
              <span style={{ width: `${subject.score}%` }} />
            </div>
            <div className="subject-foot">
              <span>Current average</span>
              <small><ArrowUpRight size={11} /> 4.1%</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsPage({ notify }) {
  const exams = [
    ["18", "Mathematics", "09:00 AM", "Class 9-A"],
    ["21", "Physics", "10:30 AM", "Class 9-B"],
    ["24", "English", "09:30 AM", "Class 9-A"],
    ["27", "Computer Science", "11:00 AM", "Class 9-C"],
    ["30", "Chemistry", "09:00 AM", "Class 9-B"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Academics / Exams</span>
          <h1>Exam calendar.</h1>
          <p>Keep upcoming assessments visible and organized.</p>
        </div>
        <button className="solid-button" onClick={() => notify("Exam creator", "The exam creation workflow is ready.")}>
          <Plus size={16} />
          New exam
        </button>
      </div>

      <div className="exam-overview">
        <div><span>Upcoming exams</span><strong>18</strong></div>
        <div><span>Classes covered</span><strong>12</strong></div>
        <div><span>Published</span><strong>14</strong></div>
        <div><span>Drafts</span><strong>4</strong></div>
      </div>

      <div className="timeline-card">
        <div className="card-heading">
          <div>
            <span>September 2026</span>
            <h3>Assessment timeline</h3>
          </div>
          <CalendarDays size={17} />
        </div>

        <div className="exam-timeline">
          {exams.map(([date, subject, time, className], index) => (
            <div className="exam-line" key={subject}>
              <div className="exam-date">{date}</div>
              <div className="exam-line-dot" />
              <div className="exam-info">
                <span>{className}</span>
                <h3>{subject}</h3>
                <small>{time}</small>
              </div>
              <button onClick={() => notify("Exam selected", `${subject} for ${className} selected.`)}>
                Open
                <ArrowUpRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarksPage({ notify }) {
  const [scores, setScores] = useState(
    seedStudents.slice(0, 6).map(student => ({
      ...student,
      math: Math.min(100, student.avg + 2),
      english: Math.max(0, student.avg - 3),
      science: Math.min(100, student.avg + 1)
    }))
  );

  const update = (id, field, value) => {
    setScores(current =>
      current.map(student =>
        student.id === id ? { ...student, [field]: Number(value) } : student
      )
    );
  };

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Academics / Marks</span>
          <h1>Marks workspace.</h1>
          <p>Review and update assessment scores directly.</p>
        </div>
        <button className="solid-button" onClick={() => notify("Marks saved", "All current changes have been saved locally.")}>
          <Check size={16} />
          Save changes
        </button>
      </div>

      <div className="marks-card">
        <div className="marks-toolbar">
          <div>
            <strong>Mid-term assessment</strong>
            <span>Class 9 · September 2026</span>
          </div>
          <div className="table-summary-actions">
            <span>6 students</span>
            <select>
              <option>All subjects</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Science</option>
            </select>
          </div>
        </div>

        <div className="marks-table">
          <div className="marks-head">
            <span>Student</span>
            <span>Mathematics</span>
            <span>English</span>
            <span>Science</span>
            <span>Average</span>
          </div>

          {scores.map(student => {
            const average = Math.round((student.math + student.english + student.science) / 3);

            return (
              <div className="marks-row" key={student.id}>
                <strong>{student.name}</strong>
                <input type="number" value={student.math} onChange={e => update(student.id, "math", e.target.value)} />
                <input type="number" value={student.english} onChange={e => update(student.id, "english", e.target.value)} />
                <input type="number" value={student.science} onChange={e => update(student.id, "science", e.target.value)} />
                <b>{average}%</b>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  const distribution = [
    ["90–100", 31],
    ["80–89", 38],
    ["70–79", 18],
    ["60–69", 9],
    ["Below 60", 4]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Academics / Results</span>
          <h1>Results intelligence.</h1>
          <p>Turn assessment data into a clear academic picture.</p>
        </div>
      </div>

      <div className="result-stat-grid">
        <StatCard icon={Award} label="School average" value="87.4%" change="3.2%" />
        <StatCard icon={TrendingUp} label="Improvement" value="+8.6%" change="2.4%" />
        <StatCard icon={CheckCircle2} label="Pass rate" value="96.2%" change="1.9%" />
      </div>

      <div className="results-grid">
        <div className="distribution-card">
          <div className="card-heading">
            <div>
              <span>Score distribution</span>
              <h3>Current assessment</h3>
            </div>
            <BarChart3 size={17} />
          </div>

          <div className="distribution">
            {distribution.map(([label, value]) => (
              <div className="distribution-row" key={label}>
                <span>{label}</span>
                <div><i style={{ width: `${value * 2.2}%` }} /></div>
                <strong>{value}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="top-students-card">
          <div className="card-heading">
            <div>
              <span>Top performers</span>
              <h3>Current ranking</h3>
            </div>
            <Award size={17} />
          </div>

          {seedStudents.slice(0, 5).map((student, index) => (
            <div className="top-student" key={student.id}>
              <span className="rank">{index + 1}</span>
              <div>{student.name.charAt(0)}</div>
              <strong>{student.name}</strong>
              <b>{student.avg}%</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendancePage({ notify }) {
  const attendance = [
    ["Monday", 96],
    ["Tuesday", 94],
    ["Wednesday", 95],
    ["Thursday", 92],
    ["Friday", 97]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Operations / Attendance</span>
          <h1>Attendance pulse.</h1>
          <p>Know where attendance is strong and where action is needed.</p>
        </div>
        <button className="solid-button" onClick={() => notify("Attendance opened", "Today's attendance register is ready.")}>
          <ClipboardCheck size={16} />
          Take attendance
        </button>
      </div>

      <div className="attendance-overview">
        <div className="attendance-ring">
          <div>
            <strong>94.8%</strong>
            <span>overall</span>
          </div>
        </div>

        <div className="attendance-copy">
          <span>School attendance</span>
          <h2>Above the 92% target.</h2>
          <p>
            Attendance has improved steadily across the last five school days.
            Twelve students are currently below the review threshold.
          </p>
          <div className="attendance-tags">
            <span><Check size={13} /> 794 present</span>
            <span><AlertCircle size={13} /> 48 absent</span>
          </div>
        </div>
      </div>

      <div className="attendance-bars">
        {attendance.map(([day, value]) => (
          <div key={day}>
            <div>
              <span>{day}</span>
              <strong>{value}%</strong>
            </div>
            <div className="attendance-track">
              <i style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformancePage() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Insights / Performance</span>
          <h1>Performance trends.</h1>
          <p>Understand progress beyond a single score.</p>
        </div>
      </div>

      <div className="performance-hero">
        <div className="performance-score">
          <span>School performance index</span>
          <strong>87.4</strong>
          <small>/ 100</small>
          <div><ArrowUpRight size={13} /> 3.2% this term</div>
        </div>

        <div className="performance-copy">
          <span>Current trajectory</span>
          <h2>Performance is moving upward.</h2>
          <p>
            Four of six core subjects improved compared with the previous
            assessment period.
          </p>
        </div>

        <div className="performance-mini-chart">
          <svg viewBox="0 0 420 150" preserveAspectRatio="none">
            <path d="M0 125 C45 118 65 124 100 105 S150 115 180 88 S230 96 270 67 S320 75 350 46 S390 52 420 20" />
          </svg>
        </div>
      </div>

      <div className="performance-subjects">
        {subjects.map(subject => (
          <div className="performance-subject" key={subject.name}>
            <span className="subject-rank">#</span>
            <strong>{subject.name}</strong>
            <b>{subject.score}%</b>
            <small className="change up"><ArrowUpRight size={11} /> 4.1%</small>
            <div className="performance-progress">
              <i style={{ width: `${subject.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPage({ notify }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello. I’m SchoolMarks AI. Ask me anything about students, attendance, marks, exams or academic performance."
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const answer = question => {
    const q = question.toLowerCase();

    if (q.includes("attendance")) {
      return "12 students are below 90% attendance. The highest-priority group includes 3 students below 85%.";
    }

    if (q.includes("strongest") || q.includes("best class")) {
      return "Class 9-A currently has the strongest average at 91.3%, with 9-B at 86.8% and 9-C at 84.9%.";
    }

    if (q.includes("top")) {
      return "The current top five are Zoya Ahmed (95%), Maryam Shah (93%), Ayaan Khan (91%), Hiba Tariq (90%) and Maham Ali (88%).";
    }

    if (q.includes("subject")) {
      return "Computer Science leads at 94%. Mathematics is at 89%, Biology 88%, English 86%, Physics 82% and Chemistry 79%.";
    }

    if (q.includes("declining")) {
      return "I found 12 students with declining trends. Most changes are concentrated in Mathematics and Chemistry.";
    }

    if (q.includes("briefing") || q.includes("principal")) {
      return "Principal briefing: school average is 87.4%, attendance is 94.8%, performance improved 3.2%, and 12 students require academic review.";
    }

    return "The current school picture is positive: average performance is 87.4%, attendance is 94.8%, and overall academic performance has improved this term.";
  };

  const ask = question => {
    const text = (question || input).trim();
    if (!text || typing) return;

    setMessages(current => [...current, { role: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages(current => [...current, { role: "assistant", text: answer(text) }]);
      setTyping(false);
    }, 850);
  };

  return (
    <div className="ai-page">
      <div className="ai-workspace-head">
        <div>
          <span className="page-eyebrow">Intelligence / AI</span>
          <h1>Your school, conversational.</h1>
          <p>Ask questions and turn academic records into useful decisions.</p>
        </div>
        <div className="ai-status">
          <i />
          AI system ready
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat">
          <div className="chat-header">
            <div className="chat-agent">
              <div className="chat-agent-icon"><Sparkles size={17} /></div>
              <div>
                <strong>SchoolMarks AI</strong>
                <span>Academic intelligence</span>
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
              <div className={`chat-message ${message.role}`} key={`${message.text}-${index}`}>
                <div className="message-avatar">
                  {message.role === "assistant" ? <Sparkles size={13} /> : "SA"}
                </div>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  {message.role === "assistant" && index > 0 && (
                    <div className="chat-answer-list">
                      <span><Check size={11} /> Data analyzed</span>
                      <span><Clock3 size={11} /> Live workspace</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat-message assistant">
                <div className="message-avatar"><Sparkles size={13} /></div>
                <div className="typing-bubble">
                  <i /><i /><i />
                </div>
              </div>
            )}
          </div>

          <div className="chat-composer">
            <div className="composer-input">
              <MessageSquare size={16} />
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && ask()}
                placeholder="Ask SchoolMarks AI..."
              />
              <button onClick={() => ask()}>
                <ArrowUpRight size={16} />
              </button>
            </div>
            <small>AI responses are generated from the current SchoolMarks workspace.</small>
          </div>
        </div>

        <aside className="ai-tools">
          <div className="ai-tools-head">
            <div>
              <span>Quick questions</span>
              <strong>Ask anything</strong>
            </div>
            <Sparkles size={17} />
          </div>

          <div className="tool-list">
            {aiQuestions.map((question, index) => (
              <button className="tool-item" key={question} onClick={() => ask(question)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{question}</strong>
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>

          <div className="live-signals">
            <div>
              <span>Live signals</span>
              <strong>3</strong>
            </div>
            <p>Positive performance trend detected across core subjects.</p>
            <button onClick={() => notify("Signal saved", "This AI signal has been added to your review list.")}>
              Save signal
              <Check size={14} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProfilePage({ profile, setProfile, notify }) {
  const [draft, setDraft] = useState(profile);

  const save = () => {
    setProfile(draft);
    localStorage.setItem("schoolmarks-profile", JSON.stringify(draft));
    notify("Profile updated", "Your profile changes have been saved.");
  };

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Account / Profile</span>
          <h1>Profile manager.</h1>
          <p>Control the identity used across your SchoolMarks workspace.</p>
        </div>
        <button className="solid-button" onClick={save}>
          <Check size={16} />
          Save profile
        </button>
      </div>

      <div className="profile-layout">
        <div className="profile-preview-card">
          <div className="profile-cover">
            <div className="profile-orb" />
          </div>

          <div className="profile-avatar-large">
            {draft.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map(part => part.charAt(0).toUpperCase())
              .join("") || "SA"}
          </div>

          <div className="profile-preview-info">
            <h2>{draft.name || "School Admin"}</h2>
            <span>{draft.role}</span>
            <small>{draft.email}</small>
          </div>

          <div className="profile-preview-stats">
            <div><strong>842</strong><span>Students</span></div>
            <div><strong>12</strong><span>Signals</span></div>
            <div><strong>98%</strong><span>Verified</span></div>
          </div>
        </div>

        <div className="profile-form-card">
          <div className="profile-form-head">
            <div>
              <span>Personal details</span>
              <h3>Profile information</h3>
            </div>
            <UserCog size={18} />
          </div>

          <div className="profile-form-grid">
            <label>
              Full name
              <input
                value={draft.name}
                onChange={e => setDraft({ ...draft, name: e.target.value })}
                placeholder="School Admin"
              />
            </label>

            <label>
              Role
              <input
                value={draft.role}
                onChange={e => setDraft({ ...draft, role: e.target.value })}
                placeholder="Administrator"
              />
            </label>

            <label className="full">
              Email
              <input
                type="email"
                value={draft.email}
                onChange={e => setDraft({ ...draft, email: e.target.value })}
                placeholder="admin@school.edu"
              />
            </label>

            <label>
              Campus
              <select value={draft.campus} onChange={e => setDraft({ ...draft, campus: e.target.value })}>
                <option>Main Campus</option>
                <option>North Campus</option>
                <option>South Campus</option>
              </select>
            </label>

            <label>
              Interface
              <select value={draft.interface} onChange={e => setDraft({ ...draft, interface: e.target.value })}>
                <option>English</option>
                <option>Roman Urdu</option>
              </select>
            </label>
          </div>

          <div className="profile-security">
            <ShieldCheck size={18} />
            <div>
              <strong>Profile protected</strong>
              <span>Your workspace identity is stored locally on this device.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ notify }) {
  const [toggles, setToggles] = useState({
    notifications: true,
    ai: true,
    activity: false
  });

  const toggle = key => {
    setToggles(current => ({ ...current, [key]: !current[key] }));
    notify("Setting updated", "Your preference has been changed.");
  };

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">Account / Settings</span>
          <h1>Workspace settings.</h1>
          <p>Customize how SchoolMarks behaves for your team.</p>
        </div>
      </div>

      <div className="settings-card">
        {[
          ["notifications", "Notifications", "Receive important academic and system alerts.", Bell],
          ["ai", "AI insights", "Allow SchoolMarks AI signals to appear in your workspace.", Sparkles],
          ["activity", "Activity reminders", "Show reminders for incomplete academic tasks.", Activity]
        ].map(([key, title, text, Icon]) => (
          <div className="setting-row" key={key}>
            <div className="setting-icon"><Icon size={17} /></div>
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
            <button
              className={`toggle ${toggles[key] ? "on" : ""}`}
              onClick={() => toggle(key)}
            >
              <i />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryIcon({ size = 20 }) {
  return <Database size={size} />;
}

function AppLayout({ page, setPage, children, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="app-main">
        <Topbar page={page} setMobileOpen={setMobileOpen} navigate={setPage} />
        <main className="app-content">{children}</main>
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
      const saved = localStorage.getItem("schoolmarks-profile");
      return saved
        ? JSON.parse(saved)
        : {
            name: "School Admin",
            role: "Administrator",
            email: "admin@schoolmarks.local",
            campus: "Main Campus",
            interface: "English"
          };
    } catch {
      return {
        name: "School Admin",
        role: "Administrator",
        email: "admin@schoolmarks.local",
        campus: "Main Campus",
        interface: "English"
      };
    }
  });

  const notify = (title, message) => {
    setToast({ title, message });
  };

  useEffect(() => {
    document.title = page === "home" ? "SchoolMarks — Academic Intelligence" : `SchoolMarks — ${page}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (page === "home") {
    return (
      <>
        <HomePage navigate={setPage} />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  let content;

  switch (page) {
    case "dashboard":
      content = <DashboardPage navigate={setPage} students={students} />;
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
      content = <ExamsPage notify={notify} />;
      break;
    case "marks":
      content = <MarksPage notify={notify} />;
      break;
    case "results":
      content = <ResultsPage />;
      break;
    case "attendance":
      content = <AttendancePage notify={notify} />;
      break;
    case "performance":
      content = <PerformancePage />;
      break;
    case "ai":
      content = <AIPage notify={notify} />;
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
      content = <DashboardPage navigate={setPage} students={students} />;
  }

  return (
    <>
      <AppLayout page={page} setPage={setPage} profile={profile}>
        {content}
      </AppLayout>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}