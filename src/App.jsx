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
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileBarChart,
  FileText,
  GraduationCap,
  History,
  LayoutDashboard,
  Lightbulb,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  UserPlus,
  Users,
  X,
  Zap
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Exams", icon: CalendarDays },
  { id: "marks", label: "Marks", icon: ClipboardCheck },
  { id: "results", label: "Results", icon: FileBarChart },
  { id: "attendance", label: "Attendance", icon: Clock3 },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "ai", label: "AI Assistant", icon: BrainCircuit }
];

const workflowSteps = [
  {
    title: "Capture",
    text: "Record marks, attendance and academic activity in seconds.",
    icon: ClipboardCheck
  },
  {
    title: "Validate",
    text: "Catch missing values, unusual scores and incomplete records.",
    icon: ShieldCheck
  },
  {
    title: "Analyze",
    text: "Turn raw academic data into useful performance signals.",
    icon: BarChart3
  },
  {
    title: "Understand",
    text: "See where students are improving and where support is needed.",
    icon: BrainCircuit
  },
  {
    title: "Report",
    text: "Generate clear reports for classes, subjects and students.",
    icon: FileText
  },
  {
    title: "Preserve",
    text: "Keep a structured academic history ready for future reference.",
    icon: History
  }
];

const aiQuestions = [
  "Which students need academic attention?",
  "Which subject has the lowest class average?",
  "Show students with attendance below 90%.",
  "Who improved the most this term?",
  "Summarize the current class performance.",
  "Find students with strong marks but weak attendance.",
  "Which subjects should teachers focus on?",
  "Create a quick exam performance summary.",
  "Compare Class 9-A and Class 9-B.",
  "What are the biggest academic trends?",
  "Show students at risk of falling behind.",
  "Give me three practical improvement actions."
];

const studentsSeed = [
  { id: 1, name: "Ayaan Khan", className: "9-A", avg: 91, attendance: 96, status: "Excellent" },
  { id: 2, name: "Maham Ali", className: "9-A", avg: 88, attendance: 94, status: "Strong" },
  { id: 3, name: "Hassan Raza", className: "9-B", avg: 84, attendance: 91, status: "Strong" },
  { id: 4, name: "Zoya Ahmed", className: "9-A", avg: 95, attendance: 98, status: "Excellent" },
  { id: 5, name: "Hamza Noor", className: "9-B", avg: 79, attendance: 87, status: "Needs focus" },
  { id: 6, name: "Maryam Shah", className: "9-B", avg: 93, attendance: 97, status: "Excellent" },
  { id: 7, name: "Rayyan Malik", className: "9-A", avg: 82, attendance: 89, status: "Strong" },
  { id: 8, name: "Hiba Tariq", className: "9-B", avg: 76, attendance: 85, status: "Needs focus" }
];

const subjects = [
  { name: "Mathematics", score: 88, change: 6, icon: Target },
  { name: "English", score: 91, change: 4, icon: BookOpen },
  { name: "Physics", score: 84, change: 8, icon: Zap },
  { name: "Chemistry", score: 86, change: 3, icon: Lightbulb },
  { name: "Computer Science", score: 94, change: 11, icon: BrainCircuit },
  { name: "Urdu", score: 89, change: 5, icon: FileText }
];

const exams = [
  { name: "Mid Term Assessment", date: "22 Sep 2026", subject: "Multiple subjects", status: "Scheduled" },
  { name: "Mathematics Test", date: "27 Sep 2026", subject: "Mathematics", status: "Draft" },
  { name: "Science Assessment", date: "02 Oct 2026", subject: "Physics + Chemistry", status: "Scheduled" }
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function Logo({ compact = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`logo ${compact ? "logo-compact" : ""}`}>
      {!failed ? (
        <img
          src="/logo/schoolmarks-logo.png"
          alt="SchoolMarks"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="logo-fallback">S</span>
      )}
      {!compact && <span>SchoolMarks</span>}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub, light = false }) {
  return (
    <div className={`section-heading ${light ? "heading-light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  );
}

function Avatar({ name, large = false }) {
  const initials = name
    .split(" ")
    .map(item => item[0])
    .slice(0, 2)
    .join("");

  return <span className={`avatar ${large ? "avatar-large" : ""}`}>{initials}</span>;
}

function ProductPreview() {
  const values = [46, 58, 52, 68, 62, 76, 72, 86, 80, 91];

  return (
    <div className="preview-stage">
      <div className="preview-orbit orbit-a" />
      <div className="preview-orbit orbit-b" />
      <div className="preview-window">
        <div className="preview-topbar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="preview-address">schoolmarks.app / overview</div>
          <div className="preview-user">SA</div>
        </div>
        <div className="preview-body">
          <aside className="preview-sidebar">
            <div className="preview-brand">
              <span>S</span>
              <b>SchoolMarks</b>
            </div>
            <div className="preview-nav active">Overview</div>
            <div className="preview-nav">Students</div>
            <div className="preview-nav">Academics</div>
            <div className="preview-nav">Reports</div>
            <div className="preview-nav">AI Assistant</div>
          </aside>
          <div className="preview-main">
            <div className="preview-heading-row">
              <div>
                <small>ACADEMIC OVERVIEW</small>
                <h3>Good morning, Admin</h3>
              </div>
              <div className="preview-action">This term <ChevronDown size={12} /></div>
            </div>
            <div className="preview-kpis">
              <div><small>Students</small><strong>1,248</strong><span>+8.4%</span></div>
              <div><small>Average</small><strong>86.7%</strong><span>+4.2%</span></div>
              <div><small>Attendance</small><strong>94.2%</strong><span>+2.1%</span></div>
            </div>
            <div className="preview-grid">
              <div className="preview-chart-card">
                <div className="preview-card-head">
                  <span>Performance trend</span>
                  <BarChart3 size={15} />
                </div>
                <div className="preview-chart">
                  <div className="preview-chart-lines">
                    <i /><i /><i /><i />
                  </div>
                  <svg viewBox="0 0 500 170" preserveAspectRatio="none">
                    <path d="M0 135 C50 118 70 124 105 103 S165 126 205 85 S270 105 305 70 S365 85 400 42 S455 58 500 20" />
                    <path className="chart-area" d="M0 135 C50 118 70 124 105 103 S165 126 205 85 S270 105 305 70 S365 85 400 42 S455 58 500 20 V170 H0Z" />
                  </svg>
                </div>
              </div>
              <div className="preview-ai">
                <div className="ai-mini-icon"><BrainCircuit size={18} /></div>
                <small>AI SIGNAL</small>
                <strong>3 students need attention</strong>
                <p>Attendance and recent marks show a possible decline.</p>
                <button>Review signals <ArrowRight size={13} /></button>
              </div>
            </div>
            <div className="preview-list">
              {["Zoya Ahmed", "Ayaan Khan", "Maryam Shah"].map((name, index) => (
                <div key={name}>
                  <Avatar name={name} />
                  <span>{name}</span>
                  <b>{[95, 91, 93][index]}%</b>
                  <em>Excellent</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="floating-card floating-one">
        <span><TrendingUp size={14} /></span>
        <div><small>Class average</small><strong>+6.8%</strong></div>
      </div>
      <div className="floating-card floating-two">
        <span><Check size={14} /></span>
        <div><small>Records verified</small><strong>98.4%</strong></div>
      </div>
    </div>
  );
}

function HomeAI() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState(null);

  const ask = value => {
    const question = value || prompt;
    if (!question.trim()) return;

    setPrompt(question);
    setAnswer({
      title: "AI analysis ready",
      text: "Based on the current academic dataset, the strongest signal is a positive overall trend with a small group requiring attendance and subject-level follow-up.",
      points: [
        "Class average is trending upward.",
        "Attendance is strongest among high-performing students.",
        "A small number of students show combined attendance and score risk."
      ]
    });
  };

  return (
    <div className="home-ai-box">
      <div className="home-ai-top">
        <div>
          <span className="eyebrow">SCHOOLMARKS AI</span>
          <h3>Ask your academic data anything.</h3>
        </div>
        <div className="ai-live"><span /> Live analysis</div>
      </div>
      <div className="home-ai-input">
        <BrainCircuit size={18} />
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.key === "Enter" && ask()}
          placeholder="Ask about marks, attendance, students or performance..."
        />
        <button onClick={() => ask()}><ArrowRight size={17} /></button>
      </div>
      <div className="ai-suggestions">
        {aiQuestions.slice(0, 4).map(question => (
          <button key={question} onClick={() => ask(question)}>
            {question}
          </button>
        ))}
      </div>
      {answer && (
        <div className="home-ai-answer">
          <div className="answer-heading"><Sparkles size={16} /><strong>{answer.title}</strong></div>
          <p>{answer.text}</p>
          <div className="answer-points">
            {answer.points.map(point => <span key={point}><Check size={13} />{point}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function Workflow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(value => (value + 1) % workflowSteps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="workflow">
      <div className="workflow-track"><span style={{ width: `${(active / (workflowSteps.length - 1)) * 100}%` }} /></div>
      <div className="workflow-grid">
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              key={step.title}
              className={`workflow-step ${active === index ? "active" : ""}`}
              onClick={() => setActive(index)}
            >
              <span className="workflow-number">0{index + 1}</span>
              <span className="workflow-icon"><Icon size={19} /></span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
              <ChevronRight className="workflow-arrow" size={16} />
            </button>
          );
        })}
      </div>
      <div className="workflow-focus">
        <div className="focus-icon">
          {React.createElement(workflowSteps[active].icon, { size: 24 })}
        </div>
        <div>
          <small>LIVE WORKFLOW</small>
          <strong>{workflowSteps[active].title}</strong>
          <p>{workflowSteps[active].text}</p>
        </div>
        <div className="focus-progress"><span style={{ width: `${((active + 1) / workflowSteps.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}

function LandingPage({ onOpenApp }) {
  useReveal();
  const students = useCountUp(1248);
  const attendance = useCountUp(94);
  const accuracy = useCountUp(98);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="public-site">
      <nav className="public-nav">
        <Logo />
        <div className="public-links">
          <button onClick={() => scrollTo("platform")}>Platform</button>
          <button onClick={() => scrollTo("workflow")}>Workflow</button>
          <button onClick={() => scrollTo("intelligence")}>AI</button>
          <button onClick={() => scrollTo("features")}>Features</button>
        </div>
        <div className="nav-actions">
          <button className="nav-login" onClick={onOpenApp}>Sign in</button>
          <button className="nav-cta" onClick={onOpenApp}>Open dashboard <ArrowUpRight size={15} /></button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="hero-copy">
          <Reveal>
            <span className="hero-label"><span className="pulse-dot" /> Academic intelligence platform</span>
          </Reveal>
          <Reveal delay={80}>
            <h1>Turn school data into <span>clear decisions.</span></h1>
          </Reveal>
          <Reveal delay={150}>
            <p>SchoolMarks brings students, marks, attendance, exams, reports and AI-powered insights into one beautifully organized academic workspace.</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="hero-buttons">
              <button className="primary-button" onClick={onOpenApp}>Explore SchoolMarks <ArrowRight size={17} /></button>
              <button className="secondary-button" onClick={() => scrollTo("workflow")}>See how it works <ChevronRight size={16} /></button>
            </div>
          </Reveal>
          <Reveal delay={290}>
            <div className="hero-proof">
              <div className="proof-avatars">
                {["Admin Team", "Teacher", "Principal", "Coordinator"].map(name => <Avatar key={name} name={name} />)}
              </div>
              <div><strong>One academic workspace</strong><span>Built for modern school operations</span></div>
            </div>
          </Reveal>
        </div>
        <Reveal className="hero-product" delay={180}>
          <ProductPreview />
        </Reveal>
      </section>

      <section className="metrics-strip">
        <div><strong>{students.toLocaleString()}+</strong><span>academic records</span></div>
        <div><strong>{attendance}%</strong><span>average attendance</span></div>
        <div><strong>{accuracy}%</strong><span>verified data</span></div>
        <div><strong>24/7</strong><span>insight availability</span></div>
      </section>

      <section className="marquee-section">
        <div className="marquee-label">BUILT AROUND EVERYDAY SCHOOL WORK</div>
        <div className="marquee">
          <div className="marquee-track">
            {["Students", "Academics", "Marks", "Attendance", "Exams", "Reports", "Performance", "AI Insights", "Students", "Academics", "Marks", "Attendance", "Exams", "Reports", "Performance", "AI Insights"].map((item, index) => (
              <span key={`${item}-${index}`}><i />{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="section problem-section">
        <Reveal><SectionHeading eyebrow="THE CHALLENGE" title="School information should not feel fragmented." sub="Move away from scattered spreadsheets, disconnected records and manual reporting. SchoolMarks creates one continuous academic picture." /></Reveal>
        <div className="problem-layout">
          <Reveal className="problem-main">
            <div className="problem-number">01</div>
            <h3>Less chasing.<br /><span>More clarity.</span></h3>
            <p>Every important academic signal lives in context, so administrators and teachers can spend less time assembling information and more time acting on it.</p>
            <div className="problem-scan">
              <div className="scan-ring"><Activity size={23} /></div>
              <div><small>DATA FLOW</small><strong>Connected across the school</strong></div>
            </div>
          </Reveal>
          <div className="problem-cards">
            {[
              ["01", "Scattered records", "Marks, attendance and exams often live in separate places.", FileText],
              ["02", "Delayed insight", "Important academic patterns can remain hidden until reporting time.", Clock3],
              ["03", "Manual follow-up", "Teachers and admins spend valuable time finding what needs attention.", Search]
            ].map(([number, title, text, Icon], index) => (
              <Reveal key={title} delay={index * 100}>
                <div className="problem-card">
                  <span>{number}</span>
                  <Icon size={20} />
                  <h4>{title}</h4>
                  <p>{text}</p>
                  <ArrowUpRight size={17} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="section workflow-section">
        <Reveal><SectionHeading eyebrow="THE WORKFLOW" title="From scan to permanent history." sub="A continuous academic workflow that turns everyday school activity into structured, useful history." /></Reveal>
        <Reveal delay={100}><Workflow /></Reveal>
      </section>

      <section id="intelligence" className="section intelligence-section">
        <div className="intelligence-glow" />
        <div className="intelligence-layout">
          <Reveal className="intelligence-copy">
            <span className="eyebrow">SCHOOLMARKS AI</span>
            <h2>Your academic data can answer questions.</h2>
            <p>Ask natural questions about students, classes, attendance, marks and trends. SchoolMarks turns your records into practical signals instead of another spreadsheet.</p>
            <div className="ai-capabilities">
              <span><Check size={14} /> Student insights</span>
              <span><Check size={14} /> Risk detection</span>
              <span><Check size={14} /> Performance summaries</span>
              <span><Check size={14} /> Attendance analysis</span>
            </div>
          </Reveal>
          <Reveal delay={130}>
            <HomeAI />
          </Reveal>
        </div>
      </section>

      <section className="section dashboard-section">
        <Reveal><SectionHeading eyebrow="LIVE COMMAND CENTER" title="See the school at a glance." sub="A calm dashboard surface for the numbers that matter most." /></Reveal>
        <Reveal delay={120}>
          <div className="large-dashboard">
            <div className="large-dashboard-top">
              <div>
                <small>ACADEMIC COMMAND CENTER</small>
                <h3>School performance</h3>
              </div>
              <div className="dashboard-date"><CalendarDays size={14} /> September 2026</div>
            </div>
            <div className="large-dashboard-stats">
              {[
                ["Students", "1,248", "+8.4%", Users],
                ["Average score", "86.7%", "+4.2%", Award],
                ["Attendance", "94.2%", "+2.1%", Clock3],
                ["At attention", "18", "-12.5%", BrainCircuit]
              ].map(([label, value, change, Icon]) => (
                <div className="large-stat" key={label}>
                  <span><Icon size={17} /></span>
                  <small>{label}</small>
                  <strong>{value}</strong>
                  <em className={change.startsWith("-") ? "negative" : ""}>{change}</em>
                </div>
              ))}
            </div>
            <div className="large-dashboard-body">
              <div className="analytics-panel">
                <div className="panel-head"><div><small>PERFORMANCE</small><strong>Class average trend</strong></div><span>Last 10 months</span></div>
                <div className="big-chart">
                  <div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                  <div className="chart-area">
                    <div className="chart-grid-lines"><i /><i /><i /><i /></div>
                    <svg viewBox="0 0 900 260" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(34,197,94,.26)" />
                          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
                        </linearGradient>
                      </defs>
                      <path className="main-chart-area" d="M0 210 C80 195 90 182 160 190 S240 168 300 150 S380 176 440 135 S510 118 570 125 S650 88 710 95 S800 60 900 38 V260 H0Z" />
                      <path className="main-chart-line" d="M0 210 C80 195 90 182 160 190 S240 168 300 150 S380 176 440 135 S510 118 570 125 S650 88 710 95 S800 60 900 38" />
                    </svg>
                    <div className="chart-months">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map(month => <span key={month}>{month}</span>)}</div>
                  </div>
                </div>
              </div>
              <div className="signal-panel">
                <div className="panel-head"><div><small>AI SIGNALS</small><strong>What needs attention</strong></div><Sparkles size={17} /></div>
                <div className="signal-item"><span className="signal-icon warning"><ArrowDownRight size={15} /></span><div><strong>Attendance dip</strong><small>8 students below 90%</small></div><ChevronRight size={15} /></div>
                <div className="signal-item"><span className="signal-icon success"><ArrowUpRight size={15} /></span><div><strong>Computer Science</strong><small>Class average +11%</small></div><ChevronRight size={15} /></div>
                <div className="signal-item"><span className="signal-icon neutral"><Target size={15} /></span><div><strong>Exam readiness</strong><small>82% class coverage</small></div><ChevronRight size={15} /></div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="features" className="section features-section">
        <Reveal><SectionHeading eyebrow="ONE PLATFORM" title="Everything connected. Nothing buried." sub="A complete academic operating layer designed to stay simple even as your school grows." /></Reveal>
        <div className="feature-grid">
          {[
            [Users, "Student management", "Keep student profiles, classes and academic information organized."],
            [ClipboardCheck, "Marks & assessments", "Record and review subject marks with less manual work."],
            [CalendarDays, "Exam planning", "Keep assessment schedules visible and easy to manage."],
            [Clock3, "Attendance", "Track attendance patterns and quickly spot unusual changes."],
            [BarChart3, "Performance analytics", "Understand class and subject trends through clear visuals."],
            [BrainCircuit, "AI assistant", "Ask questions and receive contextual academic analysis."],
            [FileBarChart, "Reports", "Turn school data into readable summaries and reporting views."],
            [ShieldCheck, "Structured history", "Keep academic records organized for long-term reference."]
          ].map(([Icon, title, text], index) => (
            <Reveal key={title} delay={(index % 4) * 70}>
              <div className="feature-card">
                <div className="feature-icon"><Icon size={20} /></div>
                <small>0{index + 1}</small>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowUpRight size={17} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section compare-section">
        <Reveal><SectionHeading eyebrow="A BETTER FLOW" title="Designed for the way schools actually work." sub="Bring everyday academic operations into one connected system." /></Reveal>
        <Reveal delay={100}>
          <div className="compare-table">
            <div className="compare-head"><span>Workflow</span><strong>SchoolMarks</strong><span>Traditional process</span></div>
            {[
              ["Student records", "Centralized", "Scattered"],
              ["Performance insight", "Instant", "Manual"],
              ["Attendance patterns", "Visible", "Hard to track"],
              ["Academic questions", "AI assisted", "Manual lookup"],
              ["Reports", "Structured", "Time consuming"],
              ["History", "Connected", "Fragmented"]
            ].map(row => (
              <div className="compare-row" key={row[0]}>
                <span>{row[0]}</span>
                <strong><Check size={14} />{row[1]}</strong>
                <span>{row[2]}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="cta-section">
        <div className="cta-grid" />
        <div className="cta-glow" />
        <Reveal>
          <div className="cta-content">
            <span className="eyebrow">READY WHEN YOU ARE</span>
            <h2>Make academic data feel effortless.</h2>
            <p>Open the SchoolMarks workspace and explore the full academic command center.</p>
            <button className="light-button" onClick={onOpenApp}>Open SchoolMarks <ArrowRight size={17} /></button>
          </div>
        </Reveal>
      </section>

      <footer className="public-footer">
        <Logo />
        <span>Academic management, redesigned.</span>
        <div><button onClick={onOpenApp}>Dashboard</button><button onClick={() => scrollTo("features")}>Features</button><button onClick={() => scrollTo("intelligence")}>AI</button></div>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
      <aside className={`app-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>
        <div className="school-switcher">
          <div className="school-avatar">SA</div>
          <div><strong>School Admin</strong><span>Academic Office</span></div>
          <ChevronDown size={15} />
        </div>
        <span className="sidebar-label">WORKSPACE</span>
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
                {item.id === "ai" && <i className="nav-new">AI</i>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <span className="sidebar-label">SYSTEM</span>
          <button onClick={() => { setPage("profile"); setMobileOpen(false); }}><User size={17} />Profile</button>
          <button onClick={() => { setPage("settings"); setMobileOpen(false); }}><Settings size={17} />Settings</button>
          <div className="profile-mini">
            <Avatar name="School Admin" />
            <div><strong>School Admin</strong><span>Administrator</span></div>
            <MoreHorizontal size={16} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu, onHome, profile, setPage }) {
  const [notifications, setNotifications] = useState(false);

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu}><Menu size={20} /></button>
        <button className="crumb-home" onClick={onHome}>SchoolMarks</button>
        <ChevronRight size={14} />
        <span>Workspace</span>
      </div>
      <div className="topbar-actions">
        <button className="search-button"><Search size={17} /><span>Search</span><kbd>⌘ K</kbd></button>
        <div className="notification-wrap">
          <button className="icon-button" onClick={() => setNotifications(!notifications)}><Bell size={18} /><i /></button>
          {notifications && (
            <div className="notification-pop">
              <div><strong>Notifications</strong><span>3 new signals</span></div>
              <p>8 students are below 90% attendance.</p>
              <p>Mathematics test is scheduled for 27 Sep.</p>
            </div>
          )}
        </div>
        <button className="top-ai" onClick={() => setPage("ai")}><Sparkles size={15} /> Ask AI</button>
        <button className="top-profile" onClick={() => setPage("profile")}><Avatar name={profile.name} /><span>{profile.name}</span><ChevronDown size={14} /></button>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, change, negative = false }) {
  return (
    <div className="dashboard-stat">
      <div className="stat-top"><span className="stat-icon"><Icon size={17} /></span><em className={negative ? "danger-text" : ""}>{change}</em></div>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function DashboardPage({ students, setPage }) {
  const avg = Math.round(students.reduce((sum, student) => sum + student.avg, 0) / students.length);
  const attendance = Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length);

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><span className="page-eyebrow">OVERVIEW</span><h1>Academic command center</h1><p>A live view of what is happening across your school.</p></div>
        <div className="heading-actions"><button className="outline-button" onClick={() => setPage("reports")}><FileBarChart size={16} /> Reports</button><button className="solid-button" onClick={() => setPage("students")}><UserPlus size={16} /> Add student</button></div>
      </div>
      <div className="dashboard-stat-grid">
        <StatCard icon={Users} label="Total students" value={students.length * 156} change="+8.4%" />
        <StatCard icon={Award} label="Average performance" value={`${avg}%`} change="+4.2%" />
        <StatCard icon={Clock3} label="Attendance rate" value={`${attendance}%`} change="+2.1%" />
        <StatCard icon={BrainCircuit} label="AI attention signals" value="18" change="-12.5%" negative />
      </div>
      <div className="dashboard-grid-main">
        <div className="dashboard-chart-card">
          <div className="card-heading"><div><small>PERFORMANCE</small><h3>Academic progress</h3></div><select className="select-field"><option>This year</option><option>This term</option></select></div>
          <div className="dashboard-big-chart">
            <div className="big-chart-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
            <div className="big-chart-area">
              <div className="big-chart-grid"><i /><i /><i /><i /></div>
              <svg viewBox="0 0 800 280" preserveAspectRatio="none">
                <path className="main-chart-area" d="M0 230 C70 215 95 190 150 202 S225 170 280 182 S350 120 410 145 S500 115 550 126 S630 72 690 90 S750 52 800 35 V280 H0Z" />
                <path className="main-chart-line" d="M0 230 C70 215 95 190 150 202 S225 170 280 182 S350 120 410 145 S500 115 550 126 S630 72 690 90 S750 52 800 35" />
              </svg>
              <div className="big-chart-months">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map(item => <span key={item}>{item}</span>)}</div>
            </div>
          </div>
        </div>
        <div className="dashboard-ai-card">
          <div className="ai-card-label"><span><Sparkles size={14} /> SCHOOLMARKS AI</span><span className="ai-live"><i /> Live</span></div>
          <div className="ai-signal"><span className="signal-icon warning"><ArrowDownRight size={16} /></span><div><small>Needs attention</small><strong>Attendance trend</strong></div></div>
          <p>8 students are below the 90% attendance threshold. Three also show a recent performance decline.</p>
          <button onClick={() => setPage("ai")}>Analyze with AI <ArrowRight size={15} /></button>
        </div>
      </div>
      <div className="dashboard-lower-grid">
        <div className="table-card">
          <div className="card-heading"><div><small>STUDENTS</small><h3>Recent performance</h3></div><button className="text-button" onClick={() => setPage("students")}>View all <ArrowRight size={14} /></button></div>
          <div className="data-table">
            <div className="table-row table-header"><span>Student</span><span>Class</span><span>Average</span><span>Attendance</span></div>
            {students.slice(0, 5).map(student => (
              <div className="table-row" key={student.id}>
                <span className="table-student"><Avatar name={student.name} /><strong>{student.name}</strong></span>
                <span>{student.className}</span>
                <span className="score-cell">{student.avg}%</span>
                <span>{student.attendance}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="side-card">
          <div className="card-heading"><div><small>UPCOMING</small><h3>Exams</h3></div><CalendarDays size={17} /></div>
          {exams.map(exam => <div className="exam-mini" key={exam.name}><span>{exam.date.split(" ")[0]}</span><div><strong>{exam.name}</strong><small>{exam.subject}</small></div><em className={exam.status === "Draft" ? "draft" : ""}>{exam.status}</em></div>)}
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ students, setStudents }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", className: "9-A" });

  const filtered = useMemo(
    () => students.filter(student => `${student.name} ${student.className}`.toLowerCase().includes(search.toLowerCase())),
    [students, search]
  );

  const addStudent = e => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    setStudents(items => [...items, {
      id: Date.now(),
      name: newStudent.name,
      className: newStudent.className,
      avg: 0,
      attendance: 0,
      status: "New"
    }]);
    setNewStudent({ name: "", className: "9-A" });
    setModal(false);
  };

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">STUDENT MANAGEMENT</span><h1>Students</h1><p>Manage student records and academic profiles.</p></div><button className="solid-button" onClick={() => setModal(true)}><Plus size={17} /> Add student</button></div>
      <div className="large-table-card">
        <div className="marks-toolbar"><div className="student-search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." /></div><button className="outline-button"><MoreHorizontal size={17} /></button></div>
        <div className="students-table">
          <div className="student-table-row header"><span>Student</span><span>Class</span><span>Average</span><span>Attendance</span><span>Status</span><span /></div>
          {filtered.map(student => (
            <div className="student-table-row" key={student.id}>
              <span className="table-student"><Avatar name={student.name} /><div><strong>{student.name}</strong><small>Student ID · SM-{String(student.id).padStart(4, "0")}</small></div></span>
              <span>{student.className}</span>
              <strong className="score-cell">{student.avg ? `${student.avg}%` : "—"}</strong>
              <span>{student.attendance ? `${student.attendance}%` : "—"}</span>
              <span className={`status-pill ${student.status === "Needs focus" ? "warning" : ""}`}>{student.status}</span>
              <button className="row-more"><MoreHorizontal size={17} /></button>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="student-modal-backdrop" onClick={() => setModal(false)}>
          <form className="add-student-modal" onSubmit={addStudent} onClick={e => e.stopPropagation()}>
            <div className="modal-head"><div><small>STUDENT MANAGEMENT</small><h2>Add student</h2></div><button type="button" onClick={() => setModal(false)}><X size={18} /></button></div>
            <div className="student-form-grid">
              <label>Full name<input value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} placeholder="Student name" autoFocus /></label>
              <label>Class<select value={newStudent.className} onChange={e => setNewStudent({ ...newStudent, className: e.target.value })}><option>9-A</option><option>9-B</option><option>10-A</option><option>10-B</option></select></label>
            </div>
            <div className="modal-foot"><button type="button" className="outline-button" onClick={() => setModal(false)}>Cancel</button><button className="solid-button">Create student</button></div>
          </form>
        </div>
      )}
    </div>
  );
}

function AcademicsPage() {
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">ACADEMIC STRUCTURE</span><h1>Academics</h1><p>Monitor subjects and curriculum performance.</p></div><button className="solid-button"><Plus size={17} /> Add subject</button></div>
      <div className="academic-hero"><div><span>TERM PROGRESS</span><h2>Strong overall momentum</h2><p>Most subjects are tracking above the current target.</p></div><strong>87%</strong></div>
      <div className="subject-grid">
        {subjects.map(subject => {
          const Icon = subject.icon;
          return <div className="subject-card" key={subject.name}><div className="subject-head"><span className="subject-icon"><Icon size={18} /></span><span className="change up"><ArrowUpRight size={13} /> {subject.change}%</span></div><small>SUBJECT</small><h3>{subject.name}</h3><div className="subject-bar"><span style={{ width: `${subject.score}%` }} /></div><div className="subject-foot"><strong>{subject.score}%</strong><span>Class average</span></div></div>;
        })}
      </div>
    </div>
  );
}

function ExamsPage() {
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">ASSESSMENTS</span><h1>Exams</h1><p>Plan, track and review upcoming assessments.</p></div><button className="solid-button"><Plus size={17} /> Create exam</button></div>
      <div className="exam-overview"><div><CalendarDays size={20} /><span>Next assessment</span><strong>22 Sep 2026</strong><small>Mid Term Assessment</small></div><div><ClipboardCheck size={20} /><span>Completed</span><strong>14</strong><small>assessments this year</small></div><div><Target size={20} /><span>Coverage</span><strong>82%</strong><small>class readiness</small></div></div>
      <div className="timeline-card"><div className="card-heading"><div><small>EXAM TIMELINE</small><h3>Upcoming assessments</h3></div></div><div className="exam-timeline">{exams.map((exam, index) => <div className="exam-line" key={exam.name}><div className="exam-date"><strong>{exam.date.split(" ")[0]}</strong><span>{exam.date.split(" ")[1]}</span></div><div className="exam-line-dot"><span /></div><div className="exam-info"><small>{exam.subject}</small><h3>{exam.name}</h3><span><Clock3 size={13} /> 9:00 AM · Main Hall</span></div><em className={exam.status === "Draft" ? "draft" : ""}>{exam.status}</em>{index < exams.length - 1 && <div className="timeline-connector" />}</div>)}</div></div>
    </div>
  );
}

function MarksPage({ students }) {
  const [marks, setMarks] = useState(() => Object.fromEntries(students.map(student => [student.id, student.avg])));

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">ASSESSMENT DATA</span><h1>Marks</h1><p>Review and update subject performance.</p></div><button className="solid-button"><Check size={17} /> Save changes</button></div>
      <div className="marks-card">
        <div className="table-summary-actions"><div><strong>Mathematics · Mid Term</strong><span>9-A · 8 students</span></div><select className="select-field"><option>Mathematics</option><option>English</option><option>Physics</option></select></div>
        <div className="marks-table">
          <div className="marks-row header"><span>Student</span><span>Score</span><span>Grade</span><span>Feedback</span></div>
          {students.map(student => <div className="marks-row" key={student.id}><span className="table-student"><Avatar name={student.name} /><strong>{student.name}</strong></span><input type="number" min="0" max="100" value={marks[student.id] || 0} onChange={e => setMarks({ ...marks, [student.id]: Number(e.target.value) })} /><strong>{marks[student.id] >= 90 ? "A+" : marks[student.id] >= 80 ? "A" : marks[student.id] >= 70 ? "B" : "C"}</strong><span className="feedback-cell">{marks[student.id] >= 90 ? "Excellent progress" : "Keep improving"}</span></div>)}
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ students }) {
  const sorted = [...students].sort((a, b) => b.avg - a.avg);

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">RESULTS</span><h1>Results overview</h1><p>Understand outcomes across students and subjects.</p></div><button className="outline-button"><FileText size={16} /> Export report</button></div>
      <div className="result-stat-grid"><div><small>PASS RATE</small><strong>96.4%</strong><span>+3.8% this term</span></div><div><small>CLASS AVERAGE</small><strong>86.7%</strong><span>+4.2% this term</span></div><div><small>TOP SCORE</small><strong>98%</strong><span>Computer Science</span></div><div><small>IMPROVEMENT</small><strong>+7.1%</strong><span>Average growth</span></div></div>
      <div className="results-grid"><div className="distribution-card"><div className="card-heading"><div><small>GRADE DISTRIBUTION</small><h3>Current results</h3></div><PieChart size={17} /></div><div className="distribution"><div className="distribution-donut"><strong>86.7%</strong><span>Average</span></div><div className="distribution-bars"><div><span>A+</span><i><b style={{ width: "24%" }} /></i><strong>24%</strong></div><div><span>A</span><i><b style={{ width: "38%" }} /></i><strong>38%</strong></div><div><span>B</span><i><b style={{ width: "26%" }} /></i><strong>26%</strong></div><div><span>C</span><i><b style={{ width: "8%" }} /></i><strong>8%</strong></div></div></div></div><div className="top-students-card"><div className="card-heading"><div><small>TOP PERFORMERS</small><h3>Leading students</h3></div><Award size={17} /></div>{sorted.slice(0, 5).map((student, index) => <div className="top-student" key={student.id}><span className="rank">0{index + 1}</span><Avatar name={student.name} /><strong>{student.name}</strong><em>{student.avg}%</em></div>)}</div></div>
    </div>
  );
}

function AttendancePage({ students }) {
  const average = Math.round(students.reduce((sum, item) => sum + item.attendance, 0) / students.length);

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">ATTENDANCE</span><h1>Attendance</h1><p>Track attendance and identify patterns early.</p></div><button className="solid-button"><ClipboardCheck size={16} /> Mark attendance</button></div>
      <div className="attendance-overview"><div className="attendance-ring" style={{ "--value": `${average * 3.6}deg` }}><div><strong>{average}%</strong><span>Average</span></div></div><div className="attendance-copy"><small>SCHOOL-WIDE ATTENDANCE</small><h2>Healthy attendance overall.</h2><p>Most students remain above the 90% target. A smaller group needs follow-up and monitoring.</p><div className="attendance-meta"><span><i />Above target <strong>72%</strong></span><span><i />Needs attention <strong>18%</strong></span></div></div></div>
      <div className="attendance-bars"><div className="card-heading"><div><small>MONTHLY TREND</small><h3>Attendance movement</h3></div><span>2026</span></div>{[["May",88],["Jun",91],["Jul",89],["Aug",93],["Sep",94]].map(item => <div className="attendance-bar-row" key={item[0]}><span>{item[0]}</span><div><i style={{ width: `${item[1]}%` }} /></div><strong>{item[1]}%</strong></div>)}</div>
    </div>
  );
}

function PerformancePage({ students }) {
  const top = [...students].sort((a, b) => b.avg - a.avg)[0];

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">ANALYTICS</span><h1>Performance</h1><p>Track growth across students and subjects.</p></div><button className="outline-button"><BarChart3 size={16} /> Compare classes</button></div>
      <div className="performance-hero"><div className="performance-score"><small>OVERALL SCORE</small><strong>86.7</strong><span>/ 100</span><em><ArrowUpRight size={13} /> 4.2%</em></div><div className="performance-copy"><small>TOP PERFORMER</small><h2>{top.name}</h2><p>{top.avg}% average across current assessments with {top.attendance}% attendance.</p><div className="performance-mini-chart"><span /><span /><span /><span /><span /><span /><span /></div></div></div>
      <div className="performance-subjects">{subjects.map(subject => <div className="performance-subject" key={subject.name}><span className="subject-rank">#{subjects.indexOf(subject) + 1}</span><div className="performance-subject-name"><strong>{subject.name}</strong><small>Class average</small></div><strong className="performance-score-small">{subject.score}%</strong><span className="change up"><ArrowUpRight size={12} />{subject.change}%</span><div className="performance-progress"><i style={{ width: `${subject.score}%` }} /></div></div>)}</div>
    </div>
  );
}

function AIPage({ students }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello. I’m SchoolMarks AI. Ask me anything about your academic data, students, attendance, marks or performance." }
  ]);
  const [input, setInput] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null);

  const generate = question => {
    const q = question.toLowerCase();
    let text = "I found a useful academic pattern in the current dataset. Overall performance is stable, while attendance and subject-level trends provide the clearest areas for follow-up.";

    if (q.includes("attendance")) {
      const low = students.filter(student => student.attendance < 90);
      text = `${low.length} students are currently below 90% attendance. The lowest attendance in the current dataset is ${Math.min(...students.map(student => student.attendance))}%. Consider reviewing attendance history alongside recent performance.`;
    } else if (q.includes("lowest") && q.includes("subject")) {
      const lowest = [...subjects].sort((a, b) => a.score - b.score)[0];
      text = `${lowest.name} currently has the lowest class average at ${lowest.score}%. Its current movement is still positive at +${lowest.change}%, so the useful next step is targeted revision rather than broad intervention.`;
    } else if (q.includes("improved") || q.includes("improvement")) {
      const best = [...subjects].sort((a, b) => b.change - a.change)[0];
      text = `${best.name} has the strongest improvement signal at +${best.change}%. This suggests that recent teaching or revision activity may be producing useful gains.`;
    } else if (q.includes("risk") || q.includes("attention")) {
      const risk = students.filter(student => student.avg < 82 || student.attendance < 90);
      text = `${risk.length} students currently match at least one attention condition based on the demo dataset: average below 82% or attendance below 90%. Review these students individually before making any intervention decisions.`;
    } else if (q.includes("compare")) {
      text = "Class 9-A currently shows a slightly stronger performance profile in this demo dataset, while 9-B has a wider spread between high and lower performers. A subject-level comparison would give a more precise picture.";
    }

    setMessages(current => [...current, { role: "user", text: question }, { role: "assistant", text }]);
    setInput("");
    setActiveQuestion(question);
  };

  return (
    <div className="ai-page">
      <div className="ai-workspace-head"><div><span className="page-eyebrow">INTELLIGENCE</span><h1>SchoolMarks AI</h1><p>Ask questions. Explore patterns. Understand your academic data.</p></div><div className="ai-workspace-status"><span /> AI engine ready</div></div>
      <div className="ai-workspace">
        <div className="ai-chat">
          <div className="chat-header"><div className="chat-agent"><span className="ai-agent-icon"><BrainCircuit size={18} /></span><div><strong>Academic Analyst</strong><small>SchoolMarks AI · Context aware</small></div></div><button><MoreHorizontal size={18} /></button></div>
          <div className="chat-scroll">
            {messages.map((message, index) => <div className={`chat-message ${message.role}`} key={index}><span className="message-avatar">{message.role === "assistant" ? <Sparkles size={13} /> : "SA"}</span><div className="message-bubble">{message.text}</div></div>)}
            {activeQuestion && <div className="typing-bubble"><i /><i /><i /></div>}
          </div>
          <div className="chat-composer"><div className="composer-input"><MessageSquareText size={17} /><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && input.trim() && generate(input)} placeholder="Ask a question..." /><button onClick={() => input.trim() && generate(input)}><ArrowUpRight size={17} /></button></div><div className="ai-tools"><span>AI can analyze your current school dataset</span><kbd>Enter</kbd></div></div>
        </div>
        <aside className="ai-tools-panel"><div className="ai-tools-head"><div><small>QUICK QUESTIONS</small><strong>Explore your data</strong></div><Sparkles size={17} /></div><div className="tool-list">{aiQuestions.map(question => <button className={activeQuestion === question ? "active" : ""} key={question} onClick={() => generate(question)}>{question}<ArrowRight size={14} /></button>)}</div><div className="live-signals"><div><span className="signal-icon warning"><ArrowDownRight size={15} /></span><div><small>Attention signal</small><strong>8 attendance flags</strong></div></div><div><span className="signal-icon success"><ArrowUpRight size={15} /></span><div><small>Growth signal</small><strong>+11% Computer Science</strong></div></div></div></aside>
      </div>
    </div>
  );
}

function ProfilePage({ profile, setProfile }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const save = e => {
    e.preventDefault();
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">ACCOUNT</span><h1>Manage profile</h1><p>Update the administrator profile used across SchoolMarks.</p></div>{saved && <span className="save-success"><Check size={15} /> Profile saved</span>}</div>
      <form className="profile-layout" onSubmit={save}>
        <div className="profile-card">
          <div className="profile-cover" />
          <div className="profile-main"><Avatar name={form.name || "School Admin"} large /><div><h2>{form.name || "School Admin"}</h2><p>{form.role}</p></div><span className="profile-badge"><ShieldCheck size={13} /> Verified admin</span></div>
        </div>
        <div className="profile-form-card">
          <div className="card-heading"><div><small>PROFILE INFORMATION</small><h3>Personal details</h3></div><User size={17} /></div>
          <div className="form-grid">
            <label>Full name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
            <label>Role<input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></label>
            <label>Email<input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
            <label>School<input value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} /></label>
          </div>
          <div className="profile-save"><span>Changes are stored locally in this demo.</span><button className="solid-button"><Check size={16} /> Save profile</button></div>
        </div>
      </form>
    </div>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState({ alerts: true, ai: true, compact: false });

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow">SYSTEM</span><h1>Settings</h1><p>Configure your SchoolMarks workspace.</p></div></div>
      <div className="settings-card">
        <div className="setting-row"><div><strong>Academic alerts</strong><span>Receive notifications when important academic signals appear.</span></div><button className={`toggle ${settings.alerts ? "on" : ""}`} onClick={() => setSettings({ ...settings, alerts: !settings.alerts })}><i /></button></div>
        <div className="setting-row"><div><strong>AI insights</strong><span>Allow SchoolMarks AI to surface contextual academic signals.</span></div><button className={`toggle ${settings.ai ? "on" : ""}`} onClick={() => setSettings({ ...settings, ai: !settings.ai })}><i /></button></div>
        <div className="setting-row"><div><strong>Compact tables</strong><span>Use tighter table spacing across the workspace.</span></div><button className={`toggle ${settings.compact ? "on" : ""}`} onClick={() => setSettings({ ...settings, compact: !settings.compact })}><i /></button></div>
      </div>
    </div>
  );
}

function AppLayout({ page, setPage, students, setStudents, profile, setProfile }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = {
    dashboard: <DashboardPage students={students} setPage={setPage} />,
    students: <StudentsPage students={students} setStudents={setStudents} />,
    academics: <AcademicsPage />,
    exams: <ExamsPage />,
    marks: <MarksPage students={students} />,
    results: <ResultsPage students={students} />,
    attendance: <AttendancePage students={students} />,
    performance: <PerformancePage students={students} />,
    ai: <AIPage students={students} />,
    profile: <ProfilePage profile={profile} setProfile={setProfile} />,
    settings: <SettingsPage />,
    reports: <ResultsPage students={students} />
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="app-main">
        <Topbar onMenu={() => setMobileOpen(true)} onHome={() => setPage("dashboard")} profile={profile} setPage={setPage} />
        <div className="app-content">{content[page] || content.dashboard}</div>
      </main>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [students, setStudents] = useState(studentsSeed);
  const [profile, setProfile] = useState({
    name: "School Admin",
    role: "Academic Administrator",
    email: "admin@schoolmarks.local",
    school: "SchoolMarks Academy"
  });

  useEffect(() => {
    const handleKey = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPage("ai");
      }
      if (event.key === "Escape") setPage("dashboard");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (page === "home") {
    return <LandingPage onOpenApp={() => setPage("dashboard")} />;
  }

  return (
    <AppLayout
      page={page}
      setPage={setPage}
      students={students}
      setStudents={setStudents}
      profile={profile}
      setProfile={setProfile}
    />
  );
}