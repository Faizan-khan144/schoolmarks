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
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Command,
  Database,
  Download,
  Eye,
  FileBarChart,
  FileText,
  Filter,
  GraduationCap,
  Grid2X2,
  History,
  Home,
  LayoutDashboard,
  LineChart,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap
} from "lucide-react";

const studentsSeed = [
  { id: 1, name: "Ayaan Khan", className: "9-A", avg: 91, attendance: 96, status: "Excellent" },
  { id: 2, name: "Maham Ali", className: "9-A", avg: 88, attendance: 94, status: "Strong" },
  { id: 3, name: "Hassan Raza", className: "9-B", avg: 84, attendance: 91, status: "Strong" },
  { id: 4, name: "Zoya Ahmed", className: "9-A", avg: 95, attendance: 98, status: "Excellent" },
  { id: 5, name: "Hamza Noor", className: "9-B", avg: 79, attendance: 87, status: "Needs attention" },
  { id: 6, name: "Alina Shah", className: "9-C", avg: 93, attendance: 97, status: "Excellent" },
  { id: 7, name: "Rayyan Malik", className: "9-C", avg: 86, attendance: 92, status: "Strong" },
  { id: 8, name: "Hiba Tariq", className: "9-A", avg: 90, attendance: 95, status: "Excellent" }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Exams", icon: CalendarDays },
  { id: "marks", label: "Marks", icon: FileText },
  { id: "results", label: "Results", icon: FileBarChart },
  { id: "attendance", label: "Attendance", icon: CheckCircle2 },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "ai", label: "AI Assistant", icon: Bot }
];

const aiQuestions = [
  "Which students need academic attention?",
  "Summarize class 9-A performance.",
  "Show attendance concerns.",
  "Who are the top performing students?",
  "Which subject needs the most improvement?",
  "Compare 9-A and 9-B.",
  "Create a weekly academic summary.",
  "Find students with attendance below 90%.",
  "Give me exam preparation recommendations.",
  "Explain the latest performance trend.",
  "Which students improved the most?",
  "Generate a principal-ready school report."
];

const workflow = [
  { title: "Capture", text: "Record marks, attendance and academic events in seconds.", icon: FileText },
  { title: "Organize", text: "Keep every student, subject and class connected.", icon: Database },
  { title: "Review", text: "Spot patterns before they become problems.", icon: Eye },
  { title: "Verify", text: "Review changes with clear activity history.", icon: CheckCircle2 },
  { title: "Analyze", text: "Turn raw school data into useful insights.", icon: LineChart },
  { title: "Assist", text: "Ask SchoolMarks AI what the data means.", icon: Bot },
  { title: "Report", text: "Create clear reports for teachers and admins.", icon: FileBarChart },
  { title: "History", text: "Keep a permanent academic record.", icon: History }
];

const features = [
  ["Student Management", "Manage profiles, classes, attendance and academic records from one place.", Users],
  ["Smart Academics", "Keep subjects, assessments and class performance connected.", BookOpen],
  ["Exam Management", "Plan upcoming exams and keep the academic calendar organized.", CalendarDays],
  ["Performance Analytics", "See trends, averages and improvement signals without spreadsheets.", BarChart3],
  ["Attendance Tracking", "Monitor attendance patterns and identify students who need attention.", CheckCircle2],
  ["AI Academic Assistant", "Ask natural questions about your school data and get instant insights.", Bot],
  ["Reports", "Turn school activity into clean, readable reports for decision-making.", FileBarChart],
  ["Secure Records", "Keep important academic information organized with controlled access.", ShieldCheck]
];

function Logo({ dark = false, compact = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`logo ${dark ? "logo-dark" : ""}`}>
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
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

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

function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;

        const start = performance.now();
        const duration = 1300;

        const animate = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionHeading({ eyebrow, title, sub, light = false }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  );
}

function ProductDashboard() {
  return (
    <div className="product-stage">
      <div className="stage-orb stage-orb-one" />
      <div className="stage-orb stage-orb-two" />
      <div className="preview-window">
        <div className="preview-topbar">
          <div className="preview-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-address">app.schoolmarks.local/dashboard</div>
          <div className="preview-user">SA</div>
        </div>

        <div className="preview-body">
          <aside className="preview-sidebar">
            <div className="preview-brand">
              <span className="preview-logo">S</span>
              <span>SchoolMarks</span>
            </div>
            {["Overview", "Students", "Academics", "Attendance", "Reports"].map((item, i) => (
              <div className={`preview-nav ${i === 0 ? "active" : ""}`} key={item}>
                <span className="preview-nav-icon" />
                {item}
              </div>
            ))}
            <div className="preview-sidebar-bottom">
              <div className="mini-profile">
                <span>SA</span>
                <div>
                  <b>School Admin</b>
                  <small>Administrator</small>
                </div>
              </div>
            </div>
          </aside>

          <div className="preview-content">
            <div className="preview-heading">
              <div>
                <small>Monday, September 18</small>
                <h3>Good morning, Admin</h3>
              </div>
              <div className="preview-action">+ Add student</div>
            </div>

            <div className="preview-kpis">
              <div>
                <small>Total students</small>
                <strong>1,248</strong>
                <em>+8.4%</em>
              </div>
              <div>
                <small>Average score</small>
                <strong>86.4%</strong>
                <em>+3.2%</em>
              </div>
              <div>
                <small>Attendance</small>
                <strong>94.8%</strong>
                <em>+1.8%</em>
              </div>
            </div>

            <div className="preview-grid">
              <div className="preview-chart-card">
                <div className="preview-card-head">
                  <div>
                    <small>Academic performance</small>
                    <strong>86.4%</strong>
                  </div>
                  <span>Last 6 months</span>
                </div>
                <div className="preview-chart">
                  <div className="preview-grid-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <svg viewBox="0 0 600 180" preserveAspectRatio="none">
                    <path d="M0 145 C50 138 65 125 100 132 S165 108 200 118 S260 80 300 92 S355 68 390 76 S450 48 490 58 S545 32 600 38" />
                    <path className="preview-area" d="M0 145 C50 138 65 125 100 132 S165 108 200 118 S260 80 300 92 S355 68 390 76 S450 48 490 58 S545 32 600 38 L600 180 L0 180 Z" />
                  </svg>
                </div>
              </div>

              <div className="preview-ai">
                <div className="preview-ai-icon">
                  <Sparkles size={15} />
                </div>
                <small>AI insight</small>
                <h4>Attendance improved 4.8% this month.</h4>
                <p>9-B shows the strongest week-over-week improvement.</p>
                <span>View insight <ArrowRight size={12} /></span>
              </div>
            </div>

            <div className="preview-table">
              <div className="preview-table-head">
                <span>Student</span>
                <span>Class</span>
                <span>Average</span>
                <span>Attendance</span>
              </div>
              {studentsSeed.slice(0, 3).map((student) => (
                <div className="preview-table-row" key={student.id}>
                  <span className="preview-student">
                    <b>{student.name.slice(0, 2)}</b>
                    {student.name}
                  </span>
                  <span>{student.className}</span>
                  <strong>{student.avg}%</strong>
                  <span>{student.attendance}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="floating-card floating-one">
        <span className="floating-icon"><TrendingUp size={15} /></span>
        <div><small>Performance</small><b>+12.6%</b></div>
      </div>

      <div className="floating-card floating-two">
        <span className="floating-icon"><CheckCircle2 size={15} /></span>
        <div><small>Attendance</small><b>94.8%</b></div>
      </div>
    </div>
  );
}

function HomeAI() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState(null);

  const ask = (question) => {
    const q = question || prompt;
    if (!q.trim()) return;

    setPrompt(q);

    let response = {
      title: "Academic snapshot",
      text: "SchoolMarks found a positive overall trend across the current academic data.",
      items: ["Average score is 86.4%", "Attendance is 94.8%", "8 students are currently above 90%", "Overall performance is trending upward"]
    };

    if (q.toLowerCase().includes("attendance")) {
      response = {
        title: "Attendance insight",
        text: "Attendance is currently healthy, with a few students worth reviewing.",
        items: ["School average: 94.8%", "3 students are below 90%", "9-B improved the most recently", "Consider early follow-up for repeated absences"]
      };
    }

    if (q.toLowerCase().includes("top") || q.toLowerCase().includes("perform")) {
      response = {
        title: "Top performance",
        text: "The strongest current academic results are concentrated among a small group of high-performing students.",
        items: ["Zoya Ahmed — 95%", "Alina Shah — 93%", "Ayaan Khan — 91%", "Hiba Tariq — 90%"]
      };
    }

    setAnswer(response);
  };

  return (
    <div className="home-ai-box">
      <div className="home-ai-header">
        <div className="ai-title-row">
          <div className="ai-icon"><Sparkles size={19} /></div>
          <div>
            <span>SchoolMarks AI</span>
            <h3>Ask your school data.</h3>
          </div>
        </div>
        <span className="ai-live"><i /> Live</span>
      </div>

      <div className="home-ai-input">
        <Search size={17} />
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask anything about students, marks or attendance..."
        />
        <button onClick={() => ask()}><ArrowRight size={17} /></button>
      </div>

      <div className="home-ai-suggestions">
        {aiQuestions.slice(0, 4).map((question) => (
          <button key={question} onClick={() => ask(question)}>{question}</button>
        ))}
      </div>

      {answer && (
        <div className="home-ai-answer">
          <div className="answer-head">
            <Sparkles size={15} />
            <strong>{answer.title}</strong>
          </div>
          <p>{answer.text}</p>
          <ul>
            {answer.items.map((item) => <li key={item}><Check size={13} />{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function HomePage({ openApp }) {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflow((current) => (current + 1) % workflow.length);
    }, 2600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="public-site">
      <nav className="public-nav">
        <Logo />
        <div className="public-links">
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#ai">AI</a>
          <a href="#features">Features</a>
          <a href="#security">Security</a>
        </div>
        <div className="nav-actions">
          <button className="nav-login" onClick={openApp}>Sign in</button>
          <button className="nav-cta" onClick={openApp}>Open SchoolMarks <ArrowUpRight size={15} /></button>
        </div>
      </nav>

      <main>
        <section className="hero" id="product">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-orb hero-orb-c" />

          <div className="hero-content">
            <Reveal>
              <div className="hero-label"><span className="pulse-dot" /> Built for modern schools</div>
            </Reveal>

            <Reveal delay={90}>
              <h1>
                One place for
                <span> every academic detail.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p>
                SchoolMarks brings students, marks, attendance, exams,
                analytics and AI-powered insights into one calm workspace.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="hero-buttons">
                <button className="primary-button" onClick={openApp}>
                  Explore dashboard <ArrowRight size={17} />
                </button>
                <a className="secondary-button" href="#workflow">
                  See how it works <ChevronRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="hero-proof">
                <div className="proof-avatars">
                  <span>SA</span><span>TA</span><span>AD</span><span>+8</span>
                </div>
                <div>
                  <strong>Designed for school teams</strong>
                  <small>Admin · Teachers · Academic staff</small>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-product" delay={220}>
            <ProductDashboard />
          </Reveal>

          <div className="hero-bottom-stats">
            <div><strong><CountUp value={1248} /></strong><span>Students managed</span></div>
            <div><strong><CountUp value={94} suffix="%" /></strong><span>Attendance visibility</span></div>
            <div><strong><CountUp value={86} suffix="%" /></strong><span>Average performance</span></div>
            <div><strong><CountUp value={24} suffix="/7" /></strong><span>Data access</span></div>
          </div>
        </section>

        <section className="trust-section">
          <span>ONE WORKSPACE FOR</span>
          <div className="marquee-wrap">
            <div className="marquee">
              {["STUDENTS", "TEACHERS", "ACADEMICS", "EXAMS", "ATTENDANCE", "REPORTS", "INSIGHTS", "ADMINISTRATION", "STUDENTS", "TEACHERS", "ACADEMICS", "EXAMS"].map((item, i) => (
                <span key={`${item}-${i}`}><i />{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section problem-section">
          <div className="section-number">01</div>
          <Reveal>
            <SectionHeading
              eyebrow="The problem"
              title="School data shouldn't feel like detective work."
              sub="Important information often lives across spreadsheets, notebooks, messages and disconnected systems. SchoolMarks turns it into one connected academic workspace."
            />
          </Reveal>

          <div className="problem-layout">
            <Reveal delay={80}>
              <div className="problem-visual">
                <div className="problem-center">
                  <div className="problem-core"><Database size={24} /></div>
                  <strong>School data</strong>
                  <small>One connected record</small>
                </div>
                {["Marks", "Attendance", "Exams", "Students", "Reports", "AI"].map((item, i) => (
                  <div className={`problem-node node-${i + 1}`} key={item}>
                    <span>{item}</span>
                  </div>
                ))}
                <div className="problem-ring ring-one" />
                <div className="problem-ring ring-two" />
              </div>
            </Reveal>

            <div className="problem-points">
              {[
                ["Too many spreadsheets", "Important academic information gets scattered across files."],
                ["Slow reporting", "Turning raw records into useful reports takes unnecessary effort."],
                ["Hidden patterns", "Small performance and attendance signals can be easy to miss."],
                ["Disconnected workflows", "Student data should follow the student through the academic journey."]
              ].map(([title, text], i) => (
                <Reveal delay={i * 90} key={title}>
                  <div className="problem-point">
                    <span>0{i + 1}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                    <ArrowUpRight size={17} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="section-number">02</div>
          <Reveal>
            <SectionHeading
              eyebrow="The workflow"
              title="From scan to permanent history."
              sub="Every academic action becomes part of a connected record, from the first entry to the final report."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="workflow-board">
              <div className="workflow-line">
                <span className="workflow-progress" style={{ width: `${(activeWorkflow / (workflow.length - 1)) * 100}%` }} />
              </div>

              <div className="workflow-steps">
                {workflow.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <button
                      className={`workflow-step ${activeWorkflow === i ? "active" : ""}`}
                      key={step.title}
                      onClick={() => setActiveWorkflow(i)}
                    >
                      <span className="workflow-number">{String(i + 1).padStart(2, "0")}</span>
                      <span className="workflow-icon"><Icon size={19} /></span>
                      <strong>{step.title}</strong>
                      <small>{step.text}</small>
                      {i < workflow.length - 1 && <ChevronRight className="workflow-arrow" size={17} />}
                    </button>
                  );
                })}
              </div>

              <div className="workflow-detail">
                <div className="workflow-detail-icon">
                  {React.createElement(workflow[activeWorkflow].icon, { size: 22 })}
                </div>
                <div>
                  <span>Current workflow stage</span>
                  <h3>{workflow[activeWorkflow].title}</h3>
                  <p>{workflow[activeWorkflow].text}</p>
                </div>
                <div className="workflow-stage-counter">{String(activeWorkflow + 1).padStart(2, "0")} / 08</div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section ai-section" id="ai">
          <div className="section-number">03</div>
          <div className="intelligence-layout">
            <Reveal>
              <div className="intelligence-copy">
                <span className="eyebrow">SchoolMarks intelligence</span>
                <h2>Ask the data. Get the signal.</h2>
                <p>
                  Stop searching through rows to answer simple academic questions.
                  Ask SchoolMarks AI and get a clear starting point.
                </p>
                <div className="ai-capabilities">
                  <div><Sparkles size={16} /><span>Academic insights</span></div>
                  <div><TrendingUp size={16} /><span>Performance trends</span></div>
                  <div><AlertCircle size={16} /><span>Attention signals</span></div>
                  <div><FileBarChart size={16} /><span>Report summaries</span></div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <HomeAI />
            </Reveal>
          </div>
        </section>

        <section className="section analytics-section">
          <div className="section-number">04</div>
          <Reveal>
            <SectionHeading
              eyebrow="Live visibility"
              title="See what is changing before the report arrives."
              sub="SchoolMarks turns everyday records into a visual picture of academic health."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="analytics-dashboard">
              <div className="analytics-main">
                <div className="analytics-header">
                  <div><span>Academic performance</span><h3>86.4%</h3></div>
                  <div className="growth-badge"><ArrowUpRight size={13} /> 12.6%</div>
                </div>
                <div className="large-chart">
                  <div className="large-grid-lines"><i /><i /><i /><i /><i /></div>
                  <svg viewBox="0 0 800 300" preserveAspectRatio="none">
                    <path className="chart-fill" d="M0 250 C55 235 85 218 130 225 S210 185 255 202 S320 150 365 170 S425 135 475 145 S530 112 575 125 S650 78 700 95 S755 58 800 65 L800 300 L0 300 Z" />
                    <path className="chart-line" d="M0 250 C55 235 85 218 130 225 S210 185 255 202 S320 150 365 170 S425 135 475 145 S530 112 575 125 S650 78 700 95 S755 58 800 65" />
                  </svg>
                  <div className="chart-months"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
                </div>
              </div>

              <div className="analytics-side">
                <div className="metric-card">
                  <span className="metric-icon"><Users size={17} /></span>
                  <small>Students</small>
                  <strong>1,248</strong>
                  <div className="metric-bar"><i style={{ width: "84%" }} /></div>
                  <em>+8.4% this term</em>
                </div>
                <div className="metric-card">
                  <span className="metric-icon"><CheckCircle2 size={17} /></span>
                  <small>Attendance</small>
                  <strong>94.8%</strong>
                  <div className="metric-bar"><i style={{ width: "95%" }} /></div>
                  <em>+1.8% this month</em>
                </div>
                <div className="metric-card">
                  <span className="metric-icon"><Award size={17} /></span>
                  <small>High performers</small>
                  <strong>24%</strong>
                  <div className="metric-bar"><i style={{ width: "62%" }} /></div>
                  <em>Above 90% average</em>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section features-section" id="features">
          <div className="section-number">05</div>
          <Reveal>
            <SectionHeading
              eyebrow="Everything connected"
              title="The school operating layer."
              sub="A modular workspace designed to keep academic operations moving without adding complexity."
            />
          </Reveal>

          <div className="feature-grid">
            {features.map(([title, text, Icon], i) => (
              <Reveal delay={(i % 4) * 70} key={title}>
                <div className="feature-card">
                  <span className="feature-index">0{i + 1}</span>
                  <div className="feature-icon"><Icon size={19} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="feature-link">Explore <ArrowUpRight size={14} /></span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section security-section" id="security">
          <div className="security-panel">
            <div className="security-glow" />
            <Reveal>
              <div className="security-copy">
                <span className="eyebrow">Built for trust</span>
                <h2>Your academic records deserve structure.</h2>
                <p>SchoolMarks keeps important information organized, visible to the right people and easy to review.</p>
                <div className="security-points">
                  <span><Lock size={15} /> Controlled access</span>
                  <span><History size={15} /> Activity history</span>
                  <span><ShieldCheck size={15} /> Structured records</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="security-visual">
                <div className="security-shield"><ShieldCheck size={46} /></div>
                <div className="security-orbit orbit-a" />
                <div className="security-orbit orbit-b" />
                <div className="security-orbit orbit-c" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section compare-section">
          <div className="section-number">06</div>
          <Reveal>
            <SectionHeading
              eyebrow="The shift"
              title="Move from scattered records to connected context."
              sub="SchoolMarks is designed around the way academic information actually moves through a school."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="compare-table">
              <div className="compare-head">
                <span>Traditional workflow</span>
                <span>SchoolMarks</span>
              </div>
              {[
                ["Separate spreadsheets", "One connected workspace"],
                ["Manual calculations", "Automatic academic insights"],
                ["Static reports", "Live performance visibility"],
                ["Search through records", "Ask SchoolMarks AI"],
                ["Scattered history", "Permanent student history"]
              ].map(([a, b]) => (
                <div className="compare-row" key={a}>
                  <div><X size={15} />{a}</div>
                  <div><Check size={15} />{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="cta-section">
          <div className="cta-glow" />
          <Reveal>
            <div className="cta-content">
              <span className="eyebrow">Ready when you are</span>
              <h2>Make every academic record more useful.</h2>
              <p>Bring students, academics, analytics and intelligence into one workspace.</p>
              <button className="light-button" onClick={openApp}>Open SchoolMarks <ArrowUpRight size={17} /></button>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="public-footer">
        <Logo dark />
        <span>Academic management, redesigned.</span>
        <div className="footer-links">
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#features">Features</a>
          <a href="#security">Security</a>
        </div>
        <small>© 2026 SchoolMarks</small>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, open, close }) {
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={close} />
      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <Logo dark />
          <button className="mobile-close" onClick={close}><X size={18} /></button>
        </div>

        <div className="school-switcher">
          <div className="school-avatar"><GraduationCap size={19} /></div>
          <div><strong>Green Valley School</strong><span>Academic workspace</span></div>
          <ChevronDown size={15} />
        </div>

        <span className="sidebar-label">Workspace</span>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => {
                setPage(id);
                close();
              }}
            >
              <Icon size={17} />
              <span>{label}</span>
              {id === "ai" && <i>AI</i>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="sidebar-label">Account</span>
          <button className={page === "profile" ? "active" : ""} onClick={() => { setPage("profile"); close(); }}>
            <User size={17} /> <span>Profile & Settings</span>
          </button>
          <button onClick={() => setPage("home")}><LogOut size={17} /> <span>Exit workspace</span></button>

          <div className="profile-mini">
            <div className="profile-avatar">SA</div>
            <div><strong>School Admin</strong><span>Administrator</span></div>
            <MoreHorizontal size={16} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ page, setPage, openMenu }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const title = navItems.find((item) => item.id === page)?.label || "Profile & Settings";

  return (
    <>
      <header className="app-topbar">
        <div className="topbar-left">
          <button className="mobile-menu" onClick={openMenu}><Menu size={20} /></button>
          <div>
            <span>SchoolMarks workspace</span>
            <h1>{title}</h1>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="search-button" onClick={() => setSearchOpen(true)}>
            <Search size={16} /><span>Search</span><kbd>⌘ K</kbd>
          </button>

          <div className="notification-wrap">
            <button className="icon-button" onClick={() => setNotifications((v) => !v)}>
              <Bell size={18} /><i />
            </button>
            {notifications && (
              <div className="notification-panel">
                <div><strong>Notifications</strong><span>3 new</span></div>
                <p><AlertCircle size={15} /> 3 students need attendance review.</p>
                <p><TrendingUp size={15} /> Class 9-B improved this week.</p>
                <p><CalendarDays size={15} /> Mathematics exam is tomorrow.</p>
              </div>
            )}
          </div>

          <button className="top-ai" onClick={() => setPage("ai")}><Sparkles size={15} /> Ask AI</button>
          <button className="top-avatar" onClick={() => setPage("profile")}>SA</button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-input"><Search size={20} /><input autoFocus placeholder="Search students, classes, reports..." /><kbd>ESC</kbd></div>
            <div className="search-results">
              <span>Quick navigation</span>
              {navItems.slice(0, 6).map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => { setPage(id); setSearchOpen(false); }}>
                  <Icon size={17} />{label}<ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StatCard({ icon: Icon, label, value, change, negative }) {
  return (
    <div className="dashboard-stat">
      <div className="stat-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={negative ? "danger-text" : ""}>{negative ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />} {change}</small>
    </div>
  );
}

function DashboardPage({ students, setPage }) {
  const [period, setPeriod] = useState("This term");

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow"><i /> Live overview</span>
          <h2>Everything important, at a glance.</h2>
          <p>Track your school's academic health without jumping between tools.</p>
        </div>
        <div className="heading-actions">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}><option>This term</option><option>This month</option><option>This year</option></select>
          <button className="outline-button" onClick={() => setPage("students")}><Plus size={16} /> Add student</button>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <StatCard icon={Users} label="Total students" value="1,248" change="+8.4% vs last term" />
        <StatCard icon={BarChart3} label="Average score" value="86.4%" change="+3.2% vs last term" />
        <StatCard icon={CheckCircle2} label="Attendance" value="94.8%" change="+1.8% this month" />
        <StatCard icon={Award} label="Top performers" value="24%" change="+6.1% above 90%" />
      </div>

      <div className="dashboard-grid-main">
        <div className="dashboard-chart-card">
          <div className="card-heading">
            <div><span>Academic performance</span><h3>Performance trend</h3></div>
            <button>Last 6 months <ChevronDown size={14} /></button>
          </div>
          <div className="dashboard-big-chart">
            <div className="big-chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
            <div className="big-chart-area">
              <div className="big-chart-grid"><i /><i /><i /><i /></div>
              <svg viewBox="0 0 700 260" preserveAspectRatio="none">
                <path className="chart-fill" d="M0 210 C60 195 90 180 130 190 S200 155 245 170 S310 120 350 140 S420 105 465 118 S530 82 575 95 S640 58 700 72 L700 260 L0 260 Z" />
                <path className="chart-line" d="M0 210 C60 195 90 180 130 190 S200 155 245 170 S310 120 350 140 S420 105 465 118 S530 82 575 95 S640 58 700 72" />
              </svg>
              <div className="big-chart-months"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
            </div>
          </div>
        </div>

        <div className="dashboard-ai-card">
          <div className="ai-card-label"><Sparkles size={14} /> AI insight</div>
          <div className="ai-signal"><span className="signal-icon success"><TrendingUp size={17} /></span><strong>Positive trend detected</strong></div>
          <p>Overall performance increased 3.2% compared with the previous term.</p>
          <div className="ai-mini-row"><span>Performance</span><strong>86.4%</strong></div>
          <div className="ai-mini-bar"><i style={{ width: "86%" }} /></div>
          <div className="ai-mini-row"><span>Attendance</span><strong>94.8%</strong></div>
          <div className="ai-mini-bar"><i style={{ width: "95%" }} /></div>
          <button onClick={() => setPage("ai")}>Ask AI about this <ArrowRight size={14} /></button>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="table-card">
          <div className="card-heading">
            <div><span>Student performance</span><h3>Latest academic snapshot</h3></div>
            <button className="text-button" onClick={() => setPage("students")}>View all <ArrowRight size={14} /></button>
          </div>
          <div className="data-table">
            <div className="table-row table-header"><span>Student</span><span>Class</span><span>Average</span><span>Attendance</span></div>
            {students.slice(0, 5).map((student) => (
              <div className="table-row" key={student.id}>
                <span className="table-student"><b>{student.name.slice(0, 2)}</b>{student.name}</span>
                <span>{student.className}</span>
                <strong>{student.avg}%</strong>
                <span className="table-score">{student.attendance}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="side-card">
          <div className="card-heading"><div><span>Upcoming</span><h3>Exam schedule</h3></div><CalendarDays size={17} /></div>
          {[
            ["Mathematics", "19 Sep", "09:00"],
            ["Physics", "22 Sep", "10:30"],
            ["English", "24 Sep", "09:00"],
            ["Computer Science", "27 Sep", "11:00"]
          ].map(([subject, date, time]) => (
            <div className="exam-mini" key={subject}>
              <div><strong>{subject}</strong><span>{date} · {time}</span></div>
              <ChevronRight size={15} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", className: "9-A", avg: 80, attendance: 90 });

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="student-modal-backdrop" onClick={onClose}>
      <div className="add-student-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div><span className="page-eyebrow">Student record</span><h3>Add a student</h3></div>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <div className="student-form-grid">
          <label>Student name<input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter student name" /></label>
          <label>Class<select value={form.className} onChange={(e) => update("className", e.target.value)}><option>9-A</option><option>9-B</option><option>9-C</option><option>10-A</option></select></label>
          <label>Average score<input type="number" min="0" max="100" value={form.avg} onChange={(e) => update("avg", Number(e.target.value))} /></label>
          <label>Attendance<input type="number" min="0" max="100" value={form.attendance} onChange={(e) => update("attendance", Number(e.target.value))} /></label>
        </div>

        <div className="modal-foot">
          <button className="outline-button" onClick={onClose}>Cancel</button>
          <button className="save-student" onClick={() => form.name.trim() && onSave({ ...form, id: Date.now(), status: form.avg >= 90 ? "Excellent" : form.avg >= 80 ? "Strong" : "Needs attention" })}><Check size={15} /> Save student</button>
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ students, setStudents }) {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    return students.filter((student) => {
      const matchesQuery = student.name.toLowerCase().includes(query.toLowerCase());
      const matchesClass = classFilter === "All" || student.className === classFilter;
      return matchesQuery && matchesClass;
    });
  }, [students, query, classFilter]);

  const removeStudent = (id) => setStudents((current) => current.filter((student) => student.id !== id));

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><span className="page-eyebrow"><i /> Student directory</span><h2>Students</h2><p>Manage profiles and academic records from one place.</p></div>
        <button className="primary-button" onClick={() => setShowModal(true)}><Plus size={16} /> Add student</button>
      </div>

      <div className="large-table-card">
        <div className="marks-toolbar">
          <div className="student-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students..." /></div>
          <div className="toolbar-right">
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}><option>All</option><option>9-A</option><option>9-B</option><option>9-C</option></select>
            <button className="outline-button"><Filter size={15} /> Filters</button>
          </div>
        </div>

        <div className="student-table">
          <div className="student-table-head"><span>Student</span><span>Class</span><span>Average</span><span>Attendance</span><span>Status</span><span /></div>
          {filtered.map((student) => (
            <div className="student-table-row" key={student.id}>
              <div className="table-student"><b>{student.name.slice(0, 2)}</b><span><strong>{student.name}</strong><small>Student ID #{String(student.id).padStart(4, "0")}</small></span></div>
              <span>{student.className}</span>
              <strong>{student.avg}%</strong>
              <strong>{student.attendance}%</strong>
              <span className={`status-pill ${student.avg >= 90 ? "excellent" : student.avg >= 80 ? "strong" : "attention"}`}>{student.status}</span>
              <button className="row-more" onClick={() => removeStudent(student.id)}><MoreHorizontal size={17} /></button>
            </div>
          ))}
          {!filtered.length && <div className="empty-state"><Users size={28} /><h3>No students found</h3><p>Try a different search or filter.</p></div>}
        </div>
      </div>

      {showModal && <StudentModal onClose={() => setShowModal(false)} onSave={(student) => { setStudents((current) => [...current, student]); setShowModal(false); }} />}
    </div>
  );
}

function AcademicsPage() {
  const subjects = [
    ["Mathematics", 91, "+5.2%", TrendingUp],
    ["Physics", 86, "+3.8%", Activity],
    ["English", 88, "+2.1%", BookOpen],
    ["Computer Science", 94, "+7.4%", Zap],
    ["Chemistry", 82, "+1.6%", Target],
    ["Pakistan Studies", 89, "+4.1%", GraduationCap]
  ];

  return (
    <div className="page-stack">
      <div className="academic-hero"><div><span className="page-eyebrow"><i /> Academic intelligence</span><h2>Understand the academic picture.</h2><p>Connect subjects, classes and student performance into one view.</p></div><div className="academic-progress"><strong>86.4%</strong><span>Overall average</span><i><b /></i></div></div>
      <div className="subject-grid">
        {subjects.map(([name, score, change, Icon]) => (
          <div className="subject-card" key={name}>
            <div className="subject-head"><div className="subject-icon"><Icon size={18} /></div><span>{change}</span></div>
            <h3>{name}</h3>
            <strong>{score}%</strong>
            <div className="subject-bar"><i style={{ width: `${score}%` }} /></div>
            <div className="subject-foot"><span>Class average</span><b>{score >= 90 ? "Excellent" : "Strong"}</b></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsPage() {
  const exams = [
    ["19 Sep", "Mathematics", "09:00 AM", "9-A · 9-B"],
    ["22 Sep", "Physics", "10:30 AM", "9-A · 9-C"],
    ["24 Sep", "English", "09:00 AM", "9-A · 9-B · 9-C"],
    ["27 Sep", "Computer Science", "11:00 AM", "9-A · 9-C"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow"><i /> Academic calendar</span><h2>Exams</h2><p>Plan upcoming assessments and keep every class aligned.</p></div><button className="primary-button"><Plus size={16} /> Create exam</button></div>
      <div className="exam-overview"><div><CalendarDays size={18} /><span>Upcoming exams</span><strong>08</strong></div><div><Clock3 size={18} /><span>Hours scheduled</span><strong>24h</strong></div><div><CheckCircle2 size={18} /><span>Published</span><strong>06</strong></div></div>
      <div className="timeline-card"><div className="card-heading"><div><span>September 2026</span><h3>Exam timeline</h3></div><button className="outline-button"><CalendarDays size={15} /> Calendar view</button></div><div className="exam-timeline">{exams.map(([date, subject, time, classes]) => <div className="exam-line" key={subject}><div className="exam-date">{date.split(" ")[0]}<small>{date.split(" ")[1]}</small></div><div className="exam-line-dot" /><div className="exam-info"><span>{time}</span><h3>{subject}</h3><p>{classes}</p></div><button className="exam-view">View details <ArrowRight size={14} /></button></div>)}</div></div>
    </div>
  );
}

function MarksPage({ students }) {
  const [scores, setScores] = useState(() => Object.fromEntries(students.map((s) => [s.id, s.avg])));

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow"><i /> Assessment workspace</span><h2>Marks</h2><p>Enter and review academic scores with a cleaner workflow.</p></div><button className="outline-button"><Download size={15} /> Export</button></div>
      <div className="marks-card">
        <div className="marks-toolbar"><div><strong>Mathematics · Mid Term</strong><span>Class 9-A · 24 students</span></div><div className="table-summary-actions"><span>Saved automatically</span><button className="save-student"><Check size={14} /> Save changes</button></div></div>
        <div className="marks-table">
          <div className="marks-table-row head"><span>Student</span><span>Quiz</span><span>Assignment</span><span>Exam</span><span>Total</span></div>
          {students.slice(0, 6).map((student) => (
            <div className="marks-table-row" key={student.id}>
              <span className="table-student"><b>{student.name.slice(0, 2)}</b>{student.name}</span>
              <input value={Math.round(scores[student.id] * .94)} onChange={(e) => setScores((s) => ({ ...s, [student.id]: Number(e.target.value) }))} />
              <input value={Math.round(scores[student.id] * .91)} onChange={(e) => setScores((s) => ({ ...s, [student.id]: Number(e.target.value) }))} />
              <input value={scores[student.id]} onChange={(e) => setScores((s) => ({ ...s, [student.id]: Number(e.target.value) }))} />
              <strong>{scores[student.id]}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ students }) {
  const distribution = [4, 8, 14, 20, 31, 43, 58, 70, 83, 96];

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow"><i /> Results center</span><h2>Results</h2><p>Turn marks into a clear academic picture.</p></div><button className="outline-button"><Download size={15} /> Export report</button></div>
      <div className="result-stat-grid"><StatCard icon={BarChart3} label="Class average" value="86.4%" change="+3.2%" /><StatCard icon={Award} label="Highest score" value="98%" change="+4.1%" /><StatCard icon={Users} label="Pass rate" value="96.8%" change="+2.6%" /></div>
      <div className="results-grid">
        <div className="distribution-card"><div className="card-heading"><div><span>Score distribution</span><h3>Class performance</h3></div></div><div className="distribution">{distribution.map((height, i) => <div key={i} style={{ height: `${height}%` }}><span>{60 + i * 5}</span></div>)}</div><div className="distribution-label"><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span></div></div>
        <div className="top-students-card"><div className="card-heading"><div><span>Top students</span><h3>Current ranking</h3></div><Award size={17} /></div>{students.slice().sort((a, b) => b.avg - a.avg).slice(0, 5).map((student, i) => <div className="top-student" key={student.id}><span className="rank">{i + 1}</span><div className="table-student"><b>{student.name.slice(0, 2)}</b>{student.name}</div><strong>{student.avg}%</strong></div>)}</div>
      </div>
    </div>
  );
}

function AttendancePage({ students }) {
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow"><i /> Daily presence</span><h2>Attendance</h2><p>Spot attendance patterns before they affect performance.</p></div><button className="primary-button"><Check size={16} /> Record attendance</button></div>
      <div className="attendance-overview">
        <div className="attendance-ring"><div><strong>94.8%</strong><span>School average</span></div></div>
        <div className="attendance-copy"><span className="page-eyebrow">This month</span><h3>Attendance is trending upward.</h3><p>Overall attendance improved by 1.8% compared with the previous month.</p><div className="attendance-mini"><span><b>1,183</b> Present today</span><span><b>65</b> Absent today</span></div></div>
      </div>
      <div className="attendance-bars"><div className="card-heading"><div><span>Class comparison</span><h3>Attendance by class</h3></div></div>{[["9-A", 97], ["9-B", 91], ["9-C", 95], ["10-A", 94]].map(([name, value]) => <div className="attendance-bar-row" key={name}><span>{name}</span><div><i style={{ width: `${value}%` }} /></div><strong>{value}%</strong></div>)}</div>
      <div className="pulse-grid">{students.slice(0, 6).map((student) => <div className="pulse-card" key={student.id}><span className={`pulse-card-icon ${student.attendance < 90 ? "warning" : ""}`}><Activity size={16} /></span><div><strong>{student.name}</strong><small>{student.className}</small></div><b>{student.attendance}%</b></div>)}</div>
    </div>
  );
}

function PerformancePage({ students }) {
  return (
    <div className="page-stack">
      <div className="performance-hero"><div className="performance-score"><span>Overall score</span><strong>86.4</strong><small>/ 100</small><em><ArrowUpRight size={13} /> 3.2% improvement</em></div><div className="performance-copy"><span className="page-eyebrow">Performance intelligence</span><h2>The academic picture is moving in the right direction.</h2><p>Use trends, subject scores and student signals to understand where support matters.</p></div><div className="performance-mini-chart"><svg viewBox="0 0 240 100" preserveAspectRatio="none"><path d="M0 85 C30 78 38 65 65 72 S95 55 120 60 S150 40 175 45 S205 20 240 12" /></svg></div></div>
      <div className="performance-subjects">{["Mathematics", "Physics", "English", "Computer Science", "Chemistry", "Pakistan Studies"].map((subject, i) => { const score = [91, 86, 88, 94, 82, 89][i]; return <div className="performance-subject" key={subject}><span className="subject-rank">0{i + 1}</span><div className="performance-subject-name"><strong>{subject}</strong><div className="performance-progress"><i style={{ width: `${score}%` }} /></div></div><strong className="performance-score-small">{score}%</strong><span className="change up"><ArrowUpRight size={12} /> {i + 2}.4%</span></div> })}</div>
      <div className="performance-insights"><div><Sparkles size={17} /><span>AI insight</span><strong>Computer Science is currently the strongest subject.</strong></div><div><AlertCircle size={17} /><span>Attention</span><strong>Chemistry has the largest improvement opportunity.</strong></div><div><TrendingUp size={17} /><span>Trend</span><strong>{students.length} active student records are being tracked.</strong></div></div>
    </div>
  );
}

function AIPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi. I’m SchoolMarks AI. Ask me about students, attendance, marks, exams or performance." }
  ]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Students", "Performance", "Attendance", "Reports"];

  const filteredQuestions = aiQuestions.filter((q) => {
    if (category === "All") return true;
    if (category === "Students") return /student|students|top/.test(q.toLowerCase());
    if (category === "Performance") return /performance|subject|improved/.test(q.toLowerCase());
    if (category === "Attendance") return /attendance|below 90/.test(q.toLowerCase());
    return /report|summary/.test(q.toLowerCase());
  });

  const answer = (question) => {
    const lower = question.toLowerCase();
    let text = "I reviewed the available SchoolMarks data. The current academic picture is positive, with performance and attendance both showing healthy overall levels.";

    if (lower.includes("attendance")) text = "Attendance is currently 94.8%. Three students are below 90%, while 9-B has shown the strongest recent improvement.";
    if (lower.includes("top") || lower.includes("performing")) text = "The current top performers are Zoya Ahmed at 95%, Alina Shah at 93%, Ayaan Khan at 91% and Hiba Tariq at 90%.";
    if (lower.includes("subject")) text = "Computer Science currently has the highest average at 94%, followed by Mathematics at 91%. Chemistry has the largest improvement opportunity at 82%.";
    if (lower.includes("9-a") && lower.includes("9-b")) text = "Class 9-A currently averages around 91%, while 9-B averages around 82%. Attendance is also stronger in 9-A.";
    if (lower.includes("report")) text = "Current school summary: 1,248 students, 86.4% average score, 94.8% attendance and a 96.8% estimated pass rate.";
    if (lower.includes("improved")) text = "The strongest recent improvements are visible in Computer Science, Mathematics and class 9-B attendance.";

    setMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", text }]);
    setInput("");
  };

  return (
    <div className="ai-page">
      <div className="ai-workspace-head">
        <div><span className="page-eyebrow"><i /> AI workspace</span><h2>Ask better questions about your school.</h2><p>Use natural language to explore academic information.</p></div>
        <div className="ai-status"><span /><strong>AI online</strong><small>Local school insights</small></div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat">
          <div className="chat-header">
            <div className="chat-agent"><span className="chat-agent-icon"><Sparkles size={18} /></span><div><strong>SchoolMarks AI</strong><small>Academic intelligence assistant</small></div></div>
            <div className="chat-modes"><button className="active">Insights</button><button>Reports</button><button>Analysis</button></div>
          </div>

          <div className="chat-scroll">
            {messages.map((message, i) => (
              <div className={`chat-message ${message.role}`} key={i}>
                <span className="message-avatar">{message.role === "assistant" ? <Bot size={14} /> : "SA"}</span>
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-composer">
            <div className="composer-input"><Sparkles size={16} /><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && input.trim() && answer(input)} placeholder="Ask SchoolMarks AI..." /><button onClick={() => input.trim() && answer(input)}><ArrowUpRight size={16} /></button></div>
            <small>AI answers are based on available SchoolMarks workspace data.</small>
          </div>
        </div>

        <aside className="ai-tools">
          <div className="ai-tools-head"><div><span>Question library</span><strong>Ask anything</strong></div><Command size={16} /></div>
          <div className="ai-categories">{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
          <div className="tool-list">
            {filteredQuestions.map((question) => <button className="tool-item" onClick={() => answer(question)} key={question}><Sparkles size={14} /><span>{question}</span><ArrowRight size={14} /></button>)}
          </div>
          <div className="live-signals"><div><Activity size={15} /><span>Live signals</span></div><strong>3 attention signals</strong><p>SchoolMarks detected areas worth reviewing today.</p></div>
        </aside>
      </div>
    </div>
  );
}

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "School Admin",
    role: "Administrator",
    email: "admin@schoolmarks.local",
    school: "Green Valley School",
    phone: "+92 300 0000000"
  });
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="page-eyebrow"><i /> Account</span><h2>Profile & Settings</h2><p>Manage your workspace identity and preferences.</p></div><button className="save-student" onClick={() => setSaved(true)}><Check size={15} /> Save changes</button></div>

      <div className="profile-layout">
        <div className="profile-card-main">
          <div className="profile-cover">
            <div className="profile-large-avatar">SA</div>
            <button className="avatar-edit"><Pencil size={14} /></button>
          </div>

          <div className="profile-fields">
            <div className="profile-section-head"><div><span>Personal information</span><h3>Profile details</h3></div><User size={18} /></div>
            <div className="profile-form-grid">
              <label>Full name<input value={profile.name} onChange={(e) => update("name", e.target.value)} /></label>
              <label>Role<input value={profile.role} onChange={(e) => update("role", e.target.value)} /></label>
              <label>Email<input value={profile.email} onChange={(e) => update("email", e.target.value)} /></label>
              <label>Phone<input value={profile.phone} onChange={(e) => update("phone", e.target.value)} /></label>
              <label className="full">School / Organization<input value={profile.school} onChange={(e) => update("school", e.target.value)} /></label>
            </div>
            {saved && <div className="save-message"><CheckCircle2 size={15} /> Profile changes saved locally.</div>}
          </div>
        </div>

        <div className="profile-side">
          <div className="settings-card"><div className="profile-section-head"><div><span>Workspace</span><h3>Preferences</h3></div><Settings size={18} /></div><button><Bell size={16} /><span>Notifications</span><i className="toggle active" /></button><button><Lock size={16} /><span>Security</span><ChevronRight size={15} /></button><button><Database size={16} /><span>Data & records</span><ChevronRight size={15} /></button></div>
          <div className="settings-card"><div className="profile-section-head"><div><span>Current account</span><h3>Access level</h3></div><ShieldCheck size={18} /></div><div className="access-box"><span>Administrator</span><strong>Full workspace access</strong><small>Students · Academics · Reports · AI</small></div></div>
        </div>
      </div>
    </div>
  );
}

function AppLayout({ page, setPage, students, setStudents }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const content = {
    dashboard: <DashboardPage students={students} setPage={setPage} />,
    students: <StudentsPage students={students} setStudents={setStudents} />,
    academics: <AcademicsPage />,
    exams: <ExamsPage />,
    marks: <MarksPage students={students} />,
    results: <ResultsPage students={students} />,
    attendance: <AttendancePage students={students} />,
    performance: <PerformancePage students={students} />,
    ai: <AIPage />,
    profile: <ProfilePage />
  }[page] || <DashboardPage students={students} setPage={setPage} />;

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} close={() => setSidebarOpen(false)} />
      <main className="app-main">
        <Topbar page={page} setPage={setPage} openMenu={() => setSidebarOpen(true)} />
        <div className="app-content">{content}</div>
      </main>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [students, setStudents] = useState(studentsSeed);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (page === "home") {
    return <HomePage openApp={() => setPage("dashboard")} />;
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