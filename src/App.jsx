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
  ChevronRight,
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
  { name: "Areeba Khan", className: "9-B", average: 91, attendance: 98, status: "Excellent" },
  { name: "Ayaan Khan", className: "9-A", average: 87, attendance: 96, status: "Excellent" },
  { name: "Maham Ali", className: "9-A", average: 82, attendance: 91, status: "Good" },
  { name: "Hassan Raza", className: "9-C", average: 76, attendance: 88, status: "Good" },
  { name: "Rayyan Malik", className: "9-C", average: 64, attendance: 79, status: "Attention" },
  { name: "Zayan Ahmed", className: "9-B", average: 51, attendance: 73, status: "At Risk" }
];

const modules = [
  [Users, "Student Management", "Manage profiles, enrollment, classes and complete academic records."],
  [BookOpen, "Academic Management", "Organize subjects, teachers, classes and academic structures."],
  [ClipboardCheck, "Examinations", "Plan schedules, assessments and examination workflows."],
  [Award, "Marks & Results", "Capture marks, calculate results and track academic progress."],
  [UserCheck, "Attendance", "Monitor daily presence and identify attendance patterns."],
  [LineChart, "Performance Analytics", "Transform academic records into meaningful visual insights."]
];

const navigation = [
  ["overview", "Overview", LayoutDashboard],
  ["students", "Students", Users],
  ["academics", "Academics", BookOpen],
  ["exams", "Examinations", ClipboardCheck],
  ["marks", "Marks", FileText],
  ["results", "Results", Award],
  ["attendance", "Attendance", UserCheck],
  ["performance", "Performance", TrendingUp],
  ["ai", "AI Assistant", BrainCircuit]
];

const questions = [
  "Who needs attention?",
  "Show attendance",
  "Top students",
  "Weakest subject",
  "Upcoming exams",
  "Compare classes"
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

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
    <div className="progress-ring" style={{ "--progress": `${value * 3.6}deg` }}>
      <div className="ring-inner">
        <strong>{value}%</strong>
        <span>Present</span>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="product-window floating-window">
      <div className="browser-bar">
        <div className="browser-dots"><i /><i /><i /></div>
        <div className="browser-url">app.schoolmarks.local/dashboard</div>
        <MoreHorizontal size={16} />
      </div>

      <div className="product-body">
        <aside className="product-sidebar">
          <div className="preview-logo">
            <div>SM</div>
            <span>SchoolMarks</span>
          </div>
          {[
            [LayoutDashboard, "Dashboard"],
            [Users, "Students"],
            [BookOpen, "Academics"],
            [BarChart3, "Analytics"],
            [BrainCircuit, "Intelligence"]
          ].map(([Icon, text], index) => (
            <div className={`preview-nav ${index === 0 ? "active" : ""}`} key={text}>
              <Icon size={13} />
              {text}
            </div>
          ))}
        </aside>

        <main className="product-main">
          <div className="preview-heading">
            <div>
              <small>SCHOOL OVERVIEW</small>
              <h3>Good morning, Faizan</h3>
            </div>
            <div className="preview-avatar">FK</div>
          </div>

          <div className="product-stats">
            {[
              ["248", "Students"],
              ["94.6%", "Attendance"],
              ["82.7%", "Average"],
              ["6", "At risk"]
            ].map(([value, label]) => (
              <div className="preview-stat" key={label}>
                <strong>{value}</strong>
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
              <ProgressRing />
            </div>

            <div className="dashboard-card table-card">
              <div className="card-head">
                <span>Top students</span>
                <small>View all</small>
              </div>
              {students.slice(0, 3).map(student => (
                <div className="preview-student" key={student.name}>
                  <div className="student-avatar">
                    {student.name.split(" ").map(x => x[0]).join("")}
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
                <div className="ai-icon"><Sparkles size={14} /></div>
                <div>
                  <span>SchoolMarks AI</span>
                  <small>Live intelligence</small>
                </div>
              </div>
              <p>6 students may need additional academic attention.</p>
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

function IntelligenceDemo({ onOpenAI }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a question about your school data.");
  const [loading, setLoading] = useState(false);

  const analyze = value => {
    if (!value.trim()) return;
    setQuestion(value);
    setLoading(true);
    setTimeout(() => {
      const q = value.toLowerCase();
      if (q.includes("attendance")) {
        setAnswer("Overall attendance is 94.6%. Two students are currently below the 80% attendance threshold.");
      } else if (q.includes("top") || q.includes("best")) {
        setAnswer("Areeba Khan currently has the highest average at 91%, followed by Ayaan Khan at 87%.");
      } else if (q.includes("risk") || q.includes("attention")) {
        setAnswer("6 students are flagged for attention. Zayan Ahmed has the lowest average at 51%.");
      } else if (q.includes("subject") || q.includes("weak")) {
        setAnswer("Mathematics is currently showing the weakest trend in the available assessment data.");
      } else {
        setAnswer("I can analyze attendance, performance, students, marks, results and examinations.");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="intelligence-demo">
      <div className="assistant-top">
        <div className="assistant-status"><span /> SchoolMarks Intelligence</div>
        <small>Local analysis</small>
      </div>

      <div className="assistant-content">
        <div className="assistant-copy">
          <span className="eyebrow">ASK YOUR SCHOOL DATA</span>
          <h3>Answers without digging through spreadsheets.</h3>
          <p>Ask natural questions and turn your school data into understandable insights.</p>
          <button className="text-link" onClick={onOpenAI}>
            Open full AI Assistant <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="assistant-panel">
          <div className="assistant-messages">
            <div className="assistant-message">
              <div className="message-avatar"><BrainCircuit size={15} /></div>
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
              <div className="message-avatar"><Sparkles size={15} /></div>
              <div>
                <span>Insight</span>
                <p>{loading ? "Analyzing your school data..." : answer}</p>
              </div>
            </div>
          </div>

          <div className="suggestion-row">
            {["Who needs attention?", "Show attendance", "Top students"].map(item => (
              <button key={item} onClick={() => analyze(item)}>{item}</button>
            ))}
          </div>

          <div className="assistant-input">
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === "Enter" && analyze(question)}
              placeholder="Ask about your school..."
            />
            <button onClick={() => analyze(question)}><ArrowRight size={17} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ onDashboard, onAI }) {
  useReveal();

  const [faq, setFaq] = useState(null);

  return (
    <div className="site">
      <nav className="public-nav">
        <div className="container nav-inner">
          <Logo />

          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#workflow">Workflow</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#analytics">Analytics</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            <button className="nav-ai" onClick={onAI}>
              <BrainCircuit size={15} /> AI Lab
            </button>
            <button className="nav-button" onClick={onDashboard}>
              Open platform <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-grid-lines" />

          <div className="container hero-container">
            <div className="hero-grid">
              <div className="hero-copy reveal">
                <div className="hero-eyebrow">
                  <span><Sparkles size={14} /> SCHOOL MANAGEMENT, REIMAGINED</span>
                </div>

                <h1>
                  Run your school with
                  <em> clarity.</em>
                </h1>

                <p>
                  SchoolMarks connects students, academics, attendance,
                  examinations, results and intelligence in one modern workspace.
                </p>

                <div className="hero-actions">
                  <button className="primary-button" onClick={onDashboard}>
                    Explore SchoolMarks <ArrowRight size={17} />
                  </button>
                  <a href="#intelligence" className="secondary-button">
                    See intelligence <Sparkles size={16} />
                  </a>
                </div>

                <div className="hero-trust">
                  <div><strong>248+</strong><span>Students</span></div>
                  <div><strong>94.6%</strong><span>Attendance</span></div>
                  <div><strong>82.7%</strong><span>Performance</span></div>
                </div>
              </div>

              <div className="hero-product reveal">
                <DashboardPreview />
                <div className="floating-stat floating-stat-one">
                  <TrendingUp size={17} />
                  <div><strong>+12.8%</strong><span>Performance trend</span></div>
                </div>
                <div className="floating-stat floating-stat-two">
                  <BrainCircuit size={17} />
                  <div><strong>AI Ready</strong><span>School intelligence</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics-section">
          <div className="container metrics-grid">
            <div><strong>248</strong><span>Students managed</span></div>
            <div><strong>94.6%</strong><span>Attendance visibility</span></div>
            <div><strong>82.7%</strong><span>Academic average</span></div>
            <div><strong>92+</strong><span>Assessment records</span></div>
          </div>
        </section>

        <section className="problem-section reveal">
          <div className="container split-section">
            <div className="section-copy">
              <span className="eyebrow">THE OLD WAY</span>
              <h2>School data should not live in ten different places.</h2>
              <p>
                Spreadsheets, attendance sheets, result records and reports
                become difficult to connect when every process is isolated.
              </p>
              <div className="feature-list">
                <div><X size={16} /> Scattered information</div>
                <div><X size={16} /> Manual calculations</div>
                <div><X size={16} /> Delayed insights</div>
                <div><X size={16} /> Difficult reporting</div>
              </div>
            </div>

            <div className="problem-visual">
              <div className="scattered-card card-one"><FileText size={18} /><strong>Result Sheets</strong><span>Updated manually</span></div>
              <div className="scattered-card card-two"><CalendarDays size={18} /><strong>Attendance</strong><span>Multiple records</span></div>
              <div className="scattered-card card-three"><BarChart3 size={18} /><strong>Analytics</strong><span>Hard to connect</span></div>
              <div className="convergence"><Sparkles size={25} /><strong>SchoolMarks</strong><span>One connected system</span></div>
            </div>
          </div>
        </section>

        <section className="platform-section reveal" id="platform">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">THE PLATFORM</span>
              <h2>Everything important. Connected.</h2>
              <p>Six core areas working together inside one intelligent workspace.</p>
            </div>

            <div className="module-grid">
              {modules.map(([Icon, title, text], index) => (
                <div className="module-card" key={title}>
                  <div className="module-number">0{index + 1}</div>
                  <div className="module-icon"><Icon size={21} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ArrowUpRight className="module-arrow" size={17} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow-section reveal" id="workflow">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>One workflow. Every academic process.</h2>
              <p>Move from setup to intelligence without switching between disconnected tools.</p>
            </div>

            <div className="workflow-grid">
              {[
                ["01", "Set up", "Create your school and academic structure."],
                ["02", "Add students", "Organize profiles and class information."],
                ["03", "Track attendance", "Record daily presence and patterns."],
                ["04", "Record marks", "Capture assessments and results."],
                ["05", "Analyze", "Understand performance through visual data."],
                ["06", "Ask AI", "Get answers from your school dataset."]
              ].map(([number, title, text]) => (
                <div className="workflow-card" key={number}>
                  <span>{number}</span>
                  <div className="workflow-line" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intelligence-section reveal" id="intelligence">
          <div className="container">
            <div className="intelligence-header">
              <div>
                <span className="eyebrow">SCHOOLMARKS INTELLIGENCE</span>
                <h2>Your data can answer questions.</h2>
              </div>
              <button onClick={onAI}>Open AI Assistant <ArrowUpRight size={16} /></button>
            </div>
            <IntelligenceDemo onOpenAI={onAI} />
          </div>
        </section>

        <section className="analytics-section reveal" id="analytics">
          <div className="container analytics-layout">
            <div className="analytics-copy">
              <span className="eyebrow">PERFORMANCE ANALYTICS</span>
              <h2>See the signals hiding inside your data.</h2>
              <p>
                Turn raw academic records into trends, patterns and student-level
                signals that are easier to understand.
              </p>

              <div className="signal-list">
                <div><Check size={16} /> Class performance trends</div>
                <div><Check size={16} /> Attendance risk signals</div>
                <div><Check size={16} /> Student performance tracking</div>
                <div><Check size={16} /> Assessment insights</div>
              </div>
            </div>

            <div className="analytics-visual">
              <div className="analytics-main-card">
                <div className="card-head">
                  <div><span>Class performance</span><strong>82.7%</strong></div>
                  <span className="trend-positive">+8.4%</span>
                </div>
                <MiniChart large />
              </div>

              <div className="analytics-float analytics-float-top">
                <TrendingUp size={17} />
                <div><strong>+12.8%</strong><span>Trend</span></div>
              </div>

              <div className="analytics-float analytics-float-bottom">
                <UserCheck size={17} />
                <div><strong>94.6%</strong><span>Attendance</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="insights-section reveal">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">INTELLIGENT SIGNALS</span>
              <h2>Know what deserves attention.</h2>
              <p>SchoolMarks turns numbers into signals you can act on.</p>
            </div>

            <div className="insight-grid">
              <div className="insight-card insight-large">
                <div className="insight-card-top"><span>01</span><BrainCircuit size={20} /></div>
                <span className="insight-label">RISK DETECTION</span>
                <h3>Find students who may need support.</h3>
                <p>Combine attendance and academic performance to surface students requiring closer attention.</p>
                <div className="insight-meter"><span style={{ width: "72%" }} /></div>
              </div>

              <div className="insight-card">
                <div className="insight-card-top"><span>02</span><TrendingUp size={20} /></div>
                <span className="insight-label">TREND ANALYSIS</span>
                <h3>Understand performance movement.</h3>
                <p>See whether academic performance is moving upward or downward over time.</p>
              </div>

              <div className="insight-card">
                <div className="insight-card-top"><span>03</span><Target size={20} /></div>
                <span className="insight-label">FOCUS AREAS</span>
                <h3>Discover where improvement matters.</h3>
                <p>Identify subjects, classes and patterns that deserve deeper analysis.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="timeline-section reveal">
          <div className="container timeline-layout">
            <div className="timeline-intro">
              <span className="eyebrow">FROM DATA TO DECISION</span>
              <h2>A clearer path from information to action.</h2>
              <p>Every layer of SchoolMarks builds on the previous one.</p>
            </div>

            <div className="timeline">
              {[
                ["01", "Collect", "Bring students, marks and attendance together."],
                ["02", "Connect", "Organize academic information in one structure."],
                ["03", "Understand", "Visualize trends and performance signals."],
                ["04", "Act", "Use insights to focus attention where it matters."]
              ].map(([num, title, text]) => (
                <div className="timeline-item" key={num}>
                  <span>{num}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <ChevronRight size={18} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="compare-section reveal">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">THE DIFFERENCE</span>
              <h2>From scattered information to connected intelligence.</h2>
            </div>

            <div className="comparison">
              <div className="comparison-column">
                <span>TRADITIONAL WORKFLOW</span>
                <div><X size={16} /> Separate spreadsheets</div>
                <div><X size={16} /> Manual calculations</div>
                <div><X size={16} /> Delayed insights</div>
                <div><X size={16} /> Difficult reporting</div>
              </div>

              <div className="comparison-center"><Sparkles size={20} /></div>

              <div className="comparison-column comparison-new">
                <span>SCHOOLMARKS</span>
                <div><Check size={16} /> Connected records</div>
                <div><Check size={16} /> Automated analysis</div>
                <div><Check size={16} /> Actionable signals</div>
                <div><Check size={16} /> Clear reporting</div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section reveal" id="faq">
          <div className="container faq-layout">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2>Questions, answered.</h2>
              <p>A quick look at the SchoolMarks experience.</p>
            </div>

            <div className="faq-list">
              {[
                ["What is SchoolMarks?", "SchoolMarks is a modern academic management interface designed to connect students, academics, attendance, examinations, results and intelligence."],
                ["Does the AI use real data?", "This frontend demonstration uses a local dataset inside the browser to demonstrate the intelligence experience."],
                ["Can I ask multiple questions?", "Yes. The AI workspace keeps multiple messages in the conversation so you can continue asking questions."],
                ["Is an account required?", "No account is required for this frontend demonstration."]
              ].map(([q, a], index) => (
                <div className={`faq-item ${faq === index ? "open" : ""}`} key={q}>
                  <button onClick={() => setFaq(faq === index ? null : index)}>
                    <span>{q}</span>
                    <Plus size={18} />
                  </button>
                  <div className="faq-answer"><p>{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section reveal">
          <div className="container">
            <div className="cta-box">
              <div className="cta-copy">
                <span className="eyebrow">READY TO EXPLORE?</span>
                <h2>Make your school data work harder.</h2>
                <p>Explore the SchoolMarks workspace and intelligence layer.</p>
                <button className="primary-button" onClick={onDashboard}>
                  Open SchoolMarks <ArrowRight size={17} />
                </button>
              </div>

              <div className="cta-orbit">
                <div className="orbit-ring orbit-ring-one" />
                <div className="orbit-ring orbit-ring-two" />
                <div className="cta-core"><Sparkles size={28} /></div>
                <div className="orbit-node node-one"><Users size={17} /></div>
                <div className="orbit-node node-two"><TrendingUp size={17} /></div>
                <div className="orbit-node node-three"><BrainCircuit size={17} /></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <div className="footer-links">
            <a href="#platform">Platform</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#analytics">Analytics</a>
            <a href="#faq">FAQ</a>
          </div>
          <span>SchoolMarks — Academic Intelligence Platform</span>
        </div>
      </footer>
    </div>
  );
}

function AppShell({ active, navigate, onBack, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`app-sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand"><Logo dark /></div>

        <div className="sidebar-school">
          <div className="school-avatar">SM</div>
          <div><strong>SchoolMarks Academy</strong><span>Administrator</span></div>
          <ChevronDown size={14} />
        </div>

        <div className="sidebar-section">
          <span>WORKSPACE</span>
          <nav>
            {navigation.map(([id, label, Icon]) => (
              <button
                key={id}
                className={active === id ? "sidebar-link active" : "sidebar-link"}
                onClick={() => {
                  navigate(id);
                  setOpen(false);
                }}
              >
                <Icon size={17} />
                <span>{label}</span>
                {id === "ai" && <i className="new-badge">AI</i>}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <span>SYSTEM</span>
          <button className="sidebar-link"><Settings size={17} /><span>Settings</span></button>
          <button className="sidebar-link" onClick={onBack}><Home size={17} /><span>Back to website</span></button>
        </div>
      </aside>

      {open && <button className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            <button className="mobile-menu" onClick={() => setOpen(true)}><Menu size={20} /></button>
            <div className="breadcrumb">
              <span>SchoolMarks</span>
              <ArrowRight size={13} />
              <strong>{navigation.find(x => x[0] === active)?.[1]}</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-button"><Search size={18} /></button>
            <button className="icon-button notification"><Bell size={18} /><i /></button>
            <div className="topbar-profile">
              <div className="profile-avatar">FK</div>
              <div><strong>Faizan Khan</strong><span>Admin</span></div>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}

function StatCard({ Icon, label, value, change, negative }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon"><Icon size={19} /></div>
        <MoreHorizontal size={17} />
      </div>
      <span>{label}</span>
      <div className="stat-value-row">
        <strong>{value}</strong>
        <small className={negative ? "negative" : ""}>{negative ? "−" : "+"}{change}</small>
      </div>
    </div>
  );
}

function Dashboard({ navigate, onBack }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => students.filter(s => `${s.name} ${s.className}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <AppShell active="overview" navigate={navigate} onBack={onBack}>
      <div className="workspace-header">
        <div>
          <div className="workspace-eyebrow"><span /> SCHOOL OVERVIEW</div>
          <h1>Good evening, Faizan.</h1>
          <p>Here’s what’s happening across your school today.</p>
        </div>
        <div className="workspace-actions">
          <button className="workspace-secondary"><CalendarDays size={16} /> 17 Sep 2026</button>
          <button className="workspace-primary" onClick={() => navigate("ai")}><Sparkles size={16} /> Ask AI</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard Icon={Users} label="Total students" value="248" change="8.2%" />
        <StatCard Icon={UserCheck} label="Attendance" value="94.6%" change="2.1%" />
        <StatCard Icon={TrendingUp} label="Average performance" value="82.7%" change="8.4%" />
        <StatCard Icon={Target} label="Students at risk" value="6" change="1.4%" negative />
      </div>

      <div className="dashboard-main-grid">
        <div className="workspace-card performance-card">
          <div className="workspace-card-head">
            <div><span>Performance trend</span><strong>Academic average</strong></div>
            <div className="chart-filter">Last 6 months <ChevronDown size={13} /></div>
          </div>
          <div className="performance-number"><strong>82.7%</strong><span><TrendingUp size={14} /> 8.4% vs previous period</span></div>
          <MiniChart large />
        </div>

        <div className="workspace-card attendance-workspace-card">
          <div className="workspace-card-head">
            <div><span>Attendance overview</span><strong>Daily presence</strong></div>
            <MoreHorizontal size={17} />
          </div>
          <div className="attendance-layout">
            <ProgressRing />
            <div className="attendance-breakdown">
              <div><span><i className="legend-dot present" /> Present</span><strong>235</strong></div>
              <div><span><i className="legend-dot late" /> Late</span><strong>7</strong></div>
              <div><span><i className="legend-dot absent" /> Absent</span><strong>6</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-secondary-grid">
        <div className="workspace-card students-card">
          <div className="workspace-card-head">
            <div><span>Student performance</span><strong>Recent academic overview</strong></div>
            <button className="outline-button"><Plus size={15} /> Add student</button>
          </div>

          <div className="table-toolbar">
            <div className="table-search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." /></div>
            <button className="filter-button"><Filter size={15} /> Filter</button>
          </div>

          <div className="students-table-wrap">
            <table className="students-table">
              <thead>
                <tr><th>Student</th><th>Class</th><th>Average</th><th>Attendance</th><th>Status</th><th /></tr>
              </thead>
              <tbody>
                {filtered.map(student => (
                  <tr key={student.name}>
                    <td><div className="table-student"><div className="table-avatar">{student.name.split(" ").map(x => x[0]).join("")}</div><strong>{student.name}</strong></div></td>
                    <td>{student.className}</td>
                    <td><div className="score-cell"><strong>{student.average}%</strong><div><i style={{ width: `${student.average}%` }} /></div></div></td>
                    <td>{student.attendance}%</td>
                    <td><span className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}><i />{student.status}</span></td>
                    <td><MoreHorizontal size={17} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="workspace-card upcoming-card">
          <div className="workspace-card-head">
            <div><span>Upcoming examinations</span><strong>Next assessments</strong></div>
            <button className="text-button">View all <ArrowUpRight size={14} /></button>
          </div>
          <div className="exam-list">
            {[
              ["Mathematics", "21 Sep", "9-A", "Written"],
              ["English", "24 Sep", "9-B", "Assessment"],
              ["Computer", "27 Sep", "9-C", "Practical"],
              ["Science", "30 Sep", "9-A", "Written"]
            ].map(([subject, date, cls, type]) => (
              <div className="exam-item" key={subject}>
                <div className="exam-icon"><BookOpenCheck size={17} /></div>
                <div className="exam-info"><strong>{subject}</strong><span>{cls} · {type}</span></div>
                <div className="exam-date"><strong>{date}</strong><span>2026</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-secondary-grid bottom-grid">
        <div className="workspace-card ai-insight-workspace">
          <div className="insight-glow" />
          <div className="workspace-card-head">
            <div><span>Intelligent insight</span><strong>Something worth noticing</strong></div>
            <div className="insight-ai-icon"><BrainCircuit size={18} /></div>
          </div>
          <div className="insight-content">
            <div className="insight-title"><Sparkles size={17} /><strong>Attendance needs attention</strong></div>
            <p>2 students currently have attendance below 80%. Zayan Ahmed has 73% attendance and a 51% academic average.</p>
            <button onClick={() => navigate("ai")}>Investigate with AI <ArrowRight size={15} /></button>
          </div>
        </div>

        <div className="workspace-card activity-card">
          <div className="workspace-card-head">
            <div><span>Recent activity</span><strong>Latest updates</strong></div>
            <RefreshCcw size={16} />
          </div>
          <div className="activity-list">
            {[
              ["Areeba Khan", "received 91% in Mathematics", "8 min ago"],
              ["Admin", "updated Class 9-B attendance", "24 min ago"],
              ["Hassan Raza", "completed Computer assessment", "42 min ago"],
              ["Admin", "published September exam schedule", "1 hr ago"]
            ].map(([name, action, time], index) => (
              <div className="activity-item" key={time}>
                <div className={`activity-dot activity-${index}`} />
                <div><p><strong>{name}</strong> {action}</p><span><Clock3 size={12} /> {time}</span></div>
              </div>
            ))}
          </div>
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
      text: "Overall attendance is currently 94.6%. There are 235 students present, 7 marked late and 6 absent. Two students are below the 80% threshold.",
      tags: ["94.6% attendance", "235 present", "2 need attention"]
    };
  }

  if (q.includes("attention") || q.includes("risk") || q.includes("struggling")) {
    return {
      title: "Students needing attention",
      text: "The current dataset flags 6 students for additional attention. Zayan Ahmed has the lowest academic average at 51% with 73% attendance.",
      tags: ["6 flagged", "Zayan · 51%", "73% attendance"]
    };
  }

  if (q.includes("top") || q.includes("best") || q.includes("ranking") || q.includes("highest")) {
    return {
      title: "Top academic performers",
      text: "Areeba Khan currently has the highest recorded average at 91%, followed by Ayaan Khan at 87% and Maham Ali at 82%.",
      tags: ["Areeba · 91%", "Ayaan · 87%", "Maham · 82%"]
    };
  }

  if (q.includes("subject") || q.includes("weak") || q.includes("math")) {
    return {
      title: "Subject performance",
      text: "Mathematics is currently showing the weakest overall trend in the available assessment dataset.",
      tags: ["Mathematics", "Assessment trend", "Class breakdown"]
    };
  }

  if (q.includes("exam") || q.includes("test") || q.includes("assessment")) {
    return {
      title: "Upcoming examinations",
      text: "The next assessment is Mathematics on 21 September for Class 9-A. English follows on 24 September, Computer on 27 September and Science on 30 September.",
      tags: ["21 Sep · Mathematics", "24 Sep · English", "27 Sep · Computer"]
    };
  }

  if (q.includes("class") || q.includes("compare")) {
    return {
      title: "Class performance",
      text: "The current school-wide academic average is 82.7%. Class-level comparison can be expanded using marks, attendance and assessment history.",
      tags: ["82.7% average", "Class comparison", "Performance"]
    };
  }

  if (q.includes("mark") || q.includes("result") || q.includes("score")) {
    return {
      title: "Marks & results",
      text: "The available dataset contains 92 assessment records with an overall result average of 78.4%. Performance analytics show an upward trend.",
      tags: ["92 records", "78.4% result average", "Positive trend"]
    };
  }

  return {
    title: "School data insight",
    text: "I can help analyze attendance, students needing attention, top performers, subjects, examinations, marks, results and class performance.",
    tags: ["Attendance", "Performance", "Results"]
  };
}

function AIPage({ navigate, onBack }) {
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

  const ask = value => {
    const clean = value.trim();
    if (!clean || thinking) return;

    setMessages(prev => [...prev, { role: "user", text: clean }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", ...generateAnswer(clean) }]);
      setThinking(false);
    }, 700);
  };

  const clear = () => {
    setMessages([
      {
        role: "assistant",
        title: "New conversation",
        text: "Your conversation has been cleared. Ask me a new question about your school.",
        tags: ["Ready", "School data"]
      }
    ]);
  };

  return (
    <AppShell active="ai" navigate={navigate} onBack={onBack}>
      <div className="ai-page-header">
        <div>
          <div className="workspace-eyebrow"><span /> SCHOOLMARKS INTELLIGENCE</div>
          <h1>Ask your school data.</h1>
          <p>Explore performance, attendance, results and student signals through one intelligent workspace.</p>
        </div>
        <button className="workspace-secondary" onClick={clear}><RefreshCcw size={15} /> Clear chat</button>
      </div>

      <div className="ai-workspace">
        <section className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-large-icon"><BrainCircuit size={21} /></div>
              <div><strong>SchoolMarks AI</strong><span><i /> Local Intelligence</span></div>
            </div>
            <MoreHorizontal size={18} />
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div className={`ai-chat-message ${message.role}`} key={index}>
                <div className={`ai-chat-avatar ${message.role === "user" ? "user-chat-avatar" : ""}`}>
                  {message.role === "user" ? "FK" : <Sparkles size={16} />}
                </div>
                <div className="ai-chat-bubble">
                  <span>{message.role === "user" ? "You" : "SchoolMarks AI"}</span>
                  {message.role === "assistant" && <strong className="ai-answer-title">{message.title}</strong>}
                  <p>{message.text}</p>
                  {message.tags && <div className="answer-tags">{message.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="ai-chat-message assistant">
                <div className="ai-chat-avatar"><Sparkles size={16} /></div>
                <div className="ai-chat-bubble typing-bubble">
                  <span>SchoolMarks AI</span>
                  <div className="typing-dots"><i /><i /><i /></div>
                </div>
              </div>
            )}
          </div>

          <div className="ai-suggestions">
            <span>Try asking</span>
            <div>{questions.map(q => <button key={q} onClick={() => ask(q)}>{q}</button>)}</div>
          </div>

          <div className="ai-input-area">
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
              <button disabled={!input.trim() || thinking} onClick={() => ask(input)}><Send size={17} /></button>
            </div>
          </div>
        </section>

        <aside className="ai-side-panel">
          <div className="ai-side-card ai-side-intro">
            <div className="ai-side-icon"><Zap size={17} /></div>
            <span>LOCAL INTELLIGENCE</span>
            <h3>Understand your data faster.</h3>
            <p>This demo analyzes the SchoolMarks dataset locally in the browser.</p>
          </div>

          <div className="ai-side-card">
            <div className="side-card-heading"><span>School snapshot</span><Activity size={16} /></div>
            {[
              [Users, "Students", "248"],
              [UserCheck, "Attendance", "94.6%"],
              [TrendingUp, "Performance", "82.7%"],
              [Target, "At risk", "6"]
            ].map(([Icon, label, value]) => (
              <div className="ai-metric" key={label}><div><Icon size={16} /><span>{label}</span></div><strong>{value}</strong></div>
            ))}
          </div>

          <div className="ai-side-card popular-questions">
            <div className="side-card-heading"><span>Popular questions</span><MessageSquare size={16} /></div>
            {questions.slice(0, 4).map((q, index) => (
              <button key={q} onClick={() => ask(q)}><span>0{index + 1}</span>{q}<ArrowUpRight size={14} /></button>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function AccessModal({ close, continueApp }) {
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="access-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close}><X size={18} /></button>
        <div className="modal-icon"><Sparkles size={22} /></div>
        <span className="eyebrow">SCHOOLMARKS PLATFORM</span>
        <h2>Welcome to the workspace.</h2>
        <p>Explore the SchoolMarks dashboard, academic overview and intelligence layer.</p>

        <div className="access-preview">
          <div><LayoutDashboard size={16} /><span>Dashboard</span><Check size={15} /></div>
          <div><BrainCircuit size={16} /><span>AI Assistant</span><Check size={15} /></div>
          <div><BarChart3 size={16} /><span>Analytics</span><Check size={15} /></div>
        </div>

        <button className="modal-button" onClick={continueApp}>Continue to platform <ArrowRight size={17} /></button>
        <span className="modal-note">Frontend demonstration · No account required</span>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  if (page === "dashboard") {
    return <Dashboard navigate={setPage} onBack={() => setPage("home")} />;
  }

  if (page === "ai") {
    return <AIPage navigate={setPage} onBack={() => setPage("home")} />;
  }

  return (
    <>
      <Home onDashboard={() => setModal(true)} onAI={() => setPage("ai")} />
      {modal && (
        <AccessModal
          close={() => setModal(false)}
          continueApp={() => {
            setModal(false);
            setPage("dashboard");
          }}
        />
      )}
    </>
  );
}