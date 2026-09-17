import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDownRight,
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
  MessageCircle,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  Send,
  Settings,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap
} from "lucide-react";

const students = [
  { name: "Ayaan Khan", initials: "AK", className: "9-A", avg: 87, attendance: 96, status: "Excellent" },
  { name: "Zayan Ahmed", initials: "ZA", className: "9-B", avg: 51, attendance: 73, status: "At Risk" },
  { name: "Maham Ali", initials: "MA", className: "9-A", avg: 82, attendance: 91, status: "Good" },
  { name: "Hassan Raza", initials: "HR", className: "9-C", avg: 76, attendance: 88, status: "Good" },
  { name: "Areeba Khan", initials: "AK", className: "9-B", avg: 91, attendance: 98, status: "Excellent" },
  { name: "Rayyan Malik", initials: "RM", className: "9-C", avg: 64, attendance: 79, status: "Attention" }
];

const modules = [
  {
    number: "01",
    title: "Student Intelligence",
    text: "Keep student records, academic performance, attendance and progress connected in one place.",
    icon: Users
  },
  {
    number: "02",
    title: "Academic Management",
    text: "Organize classes, subjects, teachers and academic structures without scattered spreadsheets.",
    icon: BookOpenCheck
  },
  {
    number: "03",
    title: "Examinations",
    text: "Plan exams, subjects and schedules with a clear academic timeline for everyone.",
    icon: CalendarDays
  },
  {
    number: "04",
    title: "Marks & Results",
    text: "Enter marks, calculate performance and turn raw scores into meaningful academic signals.",
    icon: ClipboardCheck
  },
  {
    number: "05",
    title: "Attendance Intelligence",
    text: "Track attendance patterns and quickly identify students who need attention.",
    icon: UserCheck
  },
  {
    number: "06",
    title: "Performance Analytics",
    text: "See class trends, subject performance and student growth through visual analytics.",
    icon: LineChart
  }
];

const workflow = [
  ["01", "Set up your school", "Create the academic structure and get your workspace ready."],
  ["02", "Add students", "Bring student records into one centralized academic system."],
  ["03", "Track attendance", "Record daily attendance and automatically surface patterns."],
  ["04", "Enter marks", "Capture assessments, tests and examination results."],
  ["05", "Understand performance", "Turn academic data into clear signals and trends."],
  ["06", "Ask the AI", "Explore student data with natural-language questions."]
];

const activity = [
  { title: "Areeba Khan scored 94% in Mathematics", time: "12 min ago", type: "positive" },
  { title: "Attendance alert for 9-B", time: "34 min ago", type: "warning" },
  { title: "Mid-Term results published", time: "1 hr ago", type: "info" },
  { title: "New student added to 9-A", time: "2 hrs ago", type: "neutral" }
];

const exams = [
  { subject: "Computer Science", date: "12 Oct", className: "9-A", type: "Theory" },
  { subject: "English", date: "14 Oct", className: "9-A", type: "Written" },
  { subject: "Mathematics", date: "16 Oct", className: "9-B", type: "Theory" },
  { subject: "Science", date: "19 Oct", className: "9-C", type: "Practical" }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: CalendarDays },
  { id: "marks", label: "Marks", icon: ClipboardCheck },
  { id: "results", label: "Results", icon: Award },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "ai", label: "AI Assistant", icon: BrainCircuit }
];

const subjects = [
  { name: "Mathematics", score: 84, trend: "+8.2%" },
  { name: "Computer Science", score: 91, trend: "+12.4%" },
  { name: "English", score: 79, trend: "+4.1%" },
  { name: "Science", score: 86, trend: "+6.8%" },
  { name: "Urdu", score: 82, trend: "+3.9%" }
];

function Logo({ light = false }) {
  return (
    <div className={`brand ${light ? "brand-light" : ""}`}>
      <div className="brand-mark">
        <span>SM</span>
        <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" />
      </div>
      <div className="brand-copy">
        <strong>SchoolMarks</strong>
        <small>Academic Intelligence</small>
      </div>
    </div>
  );
}

function MiniChart({ id = "chart", height = 150 }) {
  const gradientId = useId().replace(/:/g, "");
  const points = "0,116 34,105 68,110 102,82 136,88 170,65 204,72 238,43 272,51 306,30 340,38 374,16";
  const area = `${points} 374,150 0,150`;

  return (
    <svg className="mini-chart" viewBox="0 0 374 150" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(31,185,117,.25)" />
          <stop offset="100%" stopColor="rgba(31,185,117,0)" />
        </linearGradient>
      </defs>
      <path d={`M${area}`} fill={`url(#${gradientId})`} />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="340" cy="38" r="5" fill="currentColor" />
    </svg>
  );
}

function ProgressRing({ value, label, small = false }) {
  return (
    <div className={`progress-ring ${small ? "progress-ring-small" : ""}`} style={{ "--progress": `${value * 3.6}deg` }}>
      <div className="ring-inner">
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function LandingPreview() {
  return (
    <div className="hero-product">
      <div className="product-window">
        <div className="browser-bar">
          <div className="browser-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="browser-url">
            <span className="secure-dot" />
            app.schoolmarks.local/dashboard
          </div>
          <div className="browser-actions">
            <span />
            <span />
          </div>
        </div>

        <div className="product-body">
          <aside className="product-sidebar">
            <div className="preview-logo">
              <div>SM</div>
              <span>SchoolMarks</span>
            </div>

            <div className="preview-nav">
              <span className="active"><LayoutDashboard size={14} /> Overview</span>
              <span><Users size={14} /> Students</span>
              <span><BookOpen size={14} /> Academics</span>
              <span><CalendarDays size={14} /> Exams</span>
              <span><BarChart3 size={14} /> Analytics</span>
            </div>

            <div className="preview-ai">
              <BrainCircuit size={16} />
              <div>
                <strong>Ask School AI</strong>
                <small>Explore your data</small>
              </div>
            </div>
          </aside>

          <main className="product-main">
            <div className="preview-heading">
              <div>
                <span>OVERVIEW</span>
                <h3>Good morning, Faizan</h3>
              </div>
              <button><Bell size={15} /></button>
            </div>

            <div className="preview-stats">
              <div className="preview-stat">
                <span>Total Students</span>
                <strong>1,284</strong>
                <small><ArrowUpRight size={11} /> 8.4% this term</small>
              </div>
              <div className="preview-stat">
                <span>Avg. Performance</span>
                <strong>82.6%</strong>
                <small><ArrowUpRight size={11} /> 4.8% this month</small>
              </div>
              <div className="preview-stat">
                <span>Attendance</span>
                <strong>93.2%</strong>
                <small><ArrowUpRight size={11} /> 1.6% this week</small>
              </div>
            </div>

            <div className="product-grid">
              <div className="dashboard-card chart-card">
                <div className="card-head">
                  <div>
                    <span>ACADEMIC PERFORMANCE</span>
                    <strong>Class performance trend</strong>
                  </div>
                  <button>6 months <ChevronDown size={12} /></button>
                </div>
                <div className="chart-area">
                  <div className="chart-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <MiniChart id="hero-chart" />
                </div>
                <div className="chart-labels">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              <div className="dashboard-card attendance-card">
                <div className="card-head">
                  <div>
                    <span>ATTENDANCE</span>
                    <strong>Today's overview</strong>
                  </div>
                  <MoreHorizontal size={15} />
                </div>
                <div className="attendance-center">
                  <ProgressRing value={93} label="Present" />
                </div>
                <div className="attendance-meta">
                  <span><i className="dot present" /> Present <strong>1,196</strong></span>
                  <span><i className="dot absent" /> Absent <strong>88</strong></span>
                </div>
              </div>

              <div className="dashboard-card table-card">
                <div className="card-head">
                  <div>
                    <span>STUDENTS</span>
                    <strong>Recent performance</strong>
                  </div>
                  <button className="card-link">View all <ArrowRight size={12} /></button>
                </div>

                <div className="preview-student">
                  <div className="student-avatar">AK</div>
                  <div>
                    <strong>Ayaan Khan</strong>
                    <span>Class 9-A</span>
                  </div>
                  <b>87%</b>
                  <span className="status-mini good">Excellent</span>
                </div>

                <div className="preview-student">
                  <div className="student-avatar alt">MA</div>
                  <div>
                    <strong>Maham Ali</strong>
                    <span>Class 9-A</span>
                  </div>
                  <b>82%</b>
                  <span className="status-mini good">Good</span>
                </div>

                <div className="preview-student">
                  <div className="student-avatar third">HR</div>
                  <div>
                    <strong>Hassan Raza</strong>
                    <span>Class 9-C</span>
                  </div>
                  <b>76%</b>
                  <span className="status-mini neutral">Good</span>
                </div>
              </div>

              <div className="dashboard-card intelligence-card">
                <div className="ai-heading">
                  <div className="ai-icon"><Sparkles size={16} /></div>
                  <div>
                    <span>AI INSIGHT</span>
                    <strong>One thing worth knowing</strong>
                  </div>
                </div>
                <p>9-B attendance dropped 4.2% this week. The change is concentrated across 7 students.</p>
                <div className="ai-tags">
                  <span>Attendance</span>
                  <span>9-B</span>
                  <button>Explore <ArrowUpRight size={11} /></button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="hero-float-card hero-float-one">
        <div className="float-icon"><TrendingUp size={15} /></div>
        <div>
          <strong>+12.4%</strong>
          <span>Class performance</span>
        </div>
      </div>

      <div className="hero-float-card hero-float-two">
        <div className="float-icon purple"><BrainCircuit size={15} /></div>
        <div>
          <strong>AI Insight</strong>
          <span>3 new signals found</span>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigate, onAccess }) {
  return (
    <div className="public-site">
      <nav className="public-nav">
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#workflow">How it works</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#modules">Modules</a>
          </div>
          <div className="nav-actions">
            <button className="nav-ai" onClick={() => onNavigate("ai")}><BrainCircuit size={15} /> School AI</button>
            <button className="nav-button" onClick={onAccess}>Open Platform <ArrowRight size={15} /></button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-grid-bg" />

          <div className="container hero-content">
            <Reveal className="hero-copy">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                A modern academic intelligence platform
              </div>

              <h1>
                Run your school
                <em>with clarity.</em>
              </h1>

              <p>
                SchoolMarks connects students, academics, attendance, examinations,
                results and AI-powered insights into one calm, intelligent workspace.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={() => onNavigate("dashboard")}>
                  Explore the platform <ArrowRight size={17} />
                </button>
                <a className="secondary-button" href="#platform">
                  See how it works <ArrowDownRight size={16} />
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <Check size={13} />
                  <span>Student-first</span>
                </div>
                <div className="trust-item">
                  <Check size={13} />
                  <span>Data-driven</span>
                </div>
                <div className="trust-item">
                  <Check size={13} />
                  <span>AI-assisted</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="hero-visual">
              <LandingPreview />
            </Reveal>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-strip-inner">
            <span>ONE PLATFORM</span>
            <div />
            <strong>Students</strong>
            <strong>Academics</strong>
            <strong>Examinations</strong>
            <strong>Attendance</strong>
            <strong>Analytics</strong>
            <strong>AI Intelligence</strong>
          </div>
        </section>

        <section className="problem-section section-pad" id="platform">
          <div className="container problem-layout">
            <Reveal className="problem-copy">
              <span className="eyebrow">THE PROBLEM</span>
              <h2>School data is everywhere.<br /><em>Clarity isn't.</em></h2>
              <p>
                Marks live in spreadsheets. Attendance sits in registers.
                Student progress gets discussed in meetings. SchoolMarks brings
                the pieces together so decisions can happen from one source of truth.
              </p>

              <div className="problem-list">
                <div><span>01</span><strong>Scattered records</strong><small>Student information lives across disconnected places.</small></div>
                <div><span>02</span><strong>Delayed insight</strong><small>Problems become visible only after performance drops.</small></div>
                <div><span>03</span><strong>Manual reporting</strong><small>Hours disappear into repetitive academic work.</small></div>
              </div>
            </Reveal>

            <Reveal className="problem-visual">
              <div className="scattered-card card-one">
                <FileText size={18} />
                <strong>Excel</strong>
                <span>Marks.xlsx</span>
              </div>
              <div className="scattered-card card-two">
                <ClipboardCheck size={18} />
                <strong>Register</strong>
                <span>Attendance</span>
              </div>
              <div className="scattered-card card-three">
                <MessageCircle size={18} />
                <strong>Messages</strong>
                <span>Student updates</span>
              </div>
              <div className="convergence">
                <div className="convergence-lines" />
                <div className="convergence-core"><GraduationCap size={30} /></div>
                <strong>One academic source of truth</strong>
                <span>SchoolMarks</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="solution-section section-pad">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">THE PLATFORM</span>
              <h2>Everything your school needs.<br /><em>Nothing it doesn't.</em></h2>
              <p>One connected workspace designed around the information schools actually use every day.</p>
            </Reveal>

            <div className="module-grid" id="modules">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Reveal key={module.number}>
                    <div className={`module-card module-card-${index + 1}`}>
                      <div className="module-top">
                        <span className="module-number">{module.number}</span>
                        <div className="module-icon"><Icon size={20} /></div>
                      </div>
                      <h3>{module.title}</h3>
                      <p>{module.text}</p>
                      <div className="module-card-arrow"><ArrowUpRight size={17} /></div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="workflow-section section-pad" id="workflow">
          <div className="container">
            <Reveal className="section-heading">
              <span className="eyebrow">THE WORKFLOW</span>
              <h2>From school data to<br /><em>better decisions.</em></h2>
              <p>Every part of the academic workflow connects to the next, so information keeps moving instead of getting lost.</p>
            </Reveal>

            <div className="workflow-stage">
              <div className="workflow-steps">
                {workflow.map((item, index) => (
                  <Reveal key={item[0]}>
                    <div className={`workflow-step ${index === 0 ? "active" : ""}`}>
                      <span>{item[0]}</span>
                      <div>
                        <strong>{item[1]}</strong>
                        <p>{item[2]}</p>
                      </div>
                      <ArrowRight size={17} />
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal className="workflow-product">
                <div className="workflow-product-top">
                  <span>LIVE WORKSPACE</span>
                  <div><i /> All systems operational</div>
                </div>
                <div className="workflow-product-title">
                  <div>
                    <small>STEP 05 / 06</small>
                    <h3>Understand performance</h3>
                  </div>
                  <div className="workflow-score">82.6%</div>
                </div>
                <div className="workflow-bars">
                  {subjects.map((subject, index) => (
                    <div key={subject.name} className="workflow-bar-row">
                      <span>{subject.name}</span>
                      <div><i style={{ width: `${subject.score}%` }} /></div>
                      <strong>{subject.score}%</strong>
                    </div>
                  ))}
                </div>
                <div className="workflow-bottom">
                  <span><TrendingUp size={15} /> Performance improving</span>
                  <span>Updated 2 min ago</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="intelligence-section section-pad" id="intelligence">
          <div className="container">
            <Reveal className="intelligence-header">
              <div>
                <span className="eyebrow">SCHOOL AI</span>
                <h2>Ask your data.<br /><em>Get a useful answer.</em></h2>
              </div>
              <p>
                School AI turns your academic data into natural-language answers,
                summaries and signals. It helps you explore — it doesn't replace your judgment.
              </p>
            </Reveal>

            <Reveal className="intelligence-demo">
              <div className="assistant-top">
                <div className="assistant-brand">
                  <div className="assistant-icon"><BrainCircuit size={18} /></div>
                  <div>
                    <strong>School AI</strong>
                    <span>Academic Intelligence</span>
                  </div>
                </div>
                <div className="assistant-status"><i /> Ready</div>
              </div>

              <div className="assistant-content">
                <div className="assistant-copy">
                  <span className="mini-label">ASK ANYTHING</span>
                  <h3>“Which students need attention this week?”</h3>
                  <p>
                    School AI connects performance, attendance and recent activity
                    to create a focused response instead of making you search through records.
                  </p>

                  <div className="suggestion-row">
                    <span>Attendance trends</span>
                    <span>Low performers</span>
                    <span>Class comparison</span>
                  </div>
                </div>

                <div className="assistant-panel">
                  <div className="assistant-messages">
                    <div className="assistant-message user-message">
                      <div className="message-avatar user-avatar">FK</div>
                      <div>
                        <span>You</span>
                        <p>Which students need attention this week?</p>
                      </div>
                    </div>

                    <div className="assistant-message result-message">
                      <div className="message-avatar"><Sparkles size={14} /></div>
                      <div>
                        <span>School AI</span>
                        <p>
                          I found <strong>7 students</strong> showing a combined
                          attendance and performance signal this week.
                        </p>
                        <div className="answer-tags">
                          <span>Zayan Ahmed · 51%</span>
                          <span>Rayyan Malik · 64%</span>
                          <span>5 more</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="assistant-input">
                    <span>Ask School AI anything...</span>
                    <button><Send size={14} /></button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="analytics-section section-pad">
          <div className="container analytics-layout">
            <Reveal className="analytics-copy">
              <span className="eyebrow">INTELLIGENCE AT A GLANCE</span>
              <h2>See the signal<br /><em>before the problem.</em></h2>
              <p>
                SchoolMarks doesn't just store academic information. It helps
                you see changes in performance, attendance and student progress
                while they are still actionable.
              </p>

              <div className="signal-list">
                <div>
                  <div className="signal-icon"><TrendingUp size={15} /></div>
                  <div><strong>Performance signals</strong><span>Find rising and falling trends across classes.</span></div>
                </div>
                <div>
                  <div className="signal-icon"><Target size={15} /></div>
                  <div><strong>Focused attention</strong><span>Identify students who need support sooner.</span></div>
                </div>
                <div>
                  <div className="signal-icon"><Activity size={15} /></div>
                  <div><strong>Live academic pulse</strong><span>Understand what changed today, this week and this term.</span></div>
                </div>
              </div>
            </Reveal>

            <Reveal className="analytics-visual">
              <div className="analytics-main-card">
                <div className="analytics-card-head">
                  <div>
                    <span>ACADEMIC HEALTH</span>
                    <strong>School performance</strong>
                  </div>
                  <span className="period">This term <ChevronDown size={13} /></span>
                </div>
                <div className="analytics-score-row">
                  <div>
                    <strong>82.6%</strong>
                    <span><ArrowUpRight size={13} /> 4.8% from last term</span>
                  </div>
                  <ProgressRing value={83} label="Health" small />
                </div>
                <div className="analytics-chart">
                  <MiniChart id="analytics-chart" height={190} />
                </div>
                <div className="analytics-axis"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
              </div>

              <div className="analytics-float float-top">
                <div className="float-icon"><Award size={15} /></div>
                <div><strong>91%</strong><span>Top class average</span></div>
              </div>

              <div className="analytics-float float-bottom">
                <div className="float-icon purple"><UserCheck size={15} /></div>
                <div><strong>96.2%</strong><span>Attendance health</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="compare-section section-pad">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">THE DIFFERENCE</span>
              <h2>From scattered information<br /><em>to connected intelligence.</em></h2>
            </Reveal>

            <Reveal className="comparison">
              <div className="comparison-column traditional">
                <span className="comparison-label">THE OLD WAY</span>
                <h3>Manual academic management</h3>
                <p>Information exists, but it is difficult to connect.</p>
                {[
                  "Paper registers and spreadsheets",
                  "Manual result calculations",
                  "Attendance checked separately",
                  "Reports created after the fact",
                  "No central performance picture",
                  "Problems discovered late"
                ].map(item => (
                  <div className="comparison-row" key={item}><X size={15} /> {item}</div>
                ))}
              </div>

              <div className="comparison-center">
                <div>VS</div>
              </div>

              <div className="comparison-column modern">
                <span className="comparison-label">SCHOOLMARKS</span>
                <h3>Connected academic intelligence</h3>
                <p>One system turns everyday records into useful signals.</p>
                {[
                  "Centralized student records",
                  "Automated performance insights",
                  "Connected attendance intelligence",
                  "Live dashboards and analytics",
                  "AI-powered academic questions",
                  "Early attention signals"
                ].map(item => (
                  <div className="comparison-row" key={item}><Check size={15} /> {item}</div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="roadmap-section section-pad">
          <div className="container">
            <Reveal className="section-heading">
              <span className="eyebrow">ONE CONNECTED SYSTEM</span>
              <h2>Every stage of the<br /><em>academic journey.</em></h2>
            </Reveal>

            <div className="roadmap-grid">
              <div className="roadmap-line" />
              {[
                ["01", "Student", "Create a complete academic identity."],
                ["02", "Academics", "Connect classes, subjects and teachers."],
                ["03", "Assessment", "Record tests, exams and marks."],
                ["04", "Attendance", "Track presence and patterns."],
                ["05", "Results", "Understand academic outcomes."],
                ["06", "Intelligence", "Ask questions and discover signals."]
              ].map((item, index) => (
                <Reveal key={item[0]}>
                  <div className={`roadmap-card ${index === 5 ? "roadmap-highlight" : ""}`}>
                    <span>{item[0]}</span>
                    <div className="roadmap-dot" />
                    <h3>{item[1]}</h3>
                    <p>{item[2]}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <Reveal className="cta-box">
              <div className="cta-glow" />
              <div className="cta-content">
                <span className="eyebrow">READY TO EXPLORE?</span>
                <h2>Make your school's data<br /><em>work harder.</em></h2>
                <p>Explore the SchoolMarks workspace and see what connected academic management feels like.</p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => onNavigate("dashboard")}>Open SchoolMarks <ArrowRight size={17} /></button>
                  <button className="secondary-button light-button" onClick={() => onNavigate("ai")}><BrainCircuit size={16} /> Try School AI</button>
                </div>
              </div>

              <div className="cta-product">
                <div className="cta-mini-card">
                  <span>ACADEMIC HEALTH</span>
                  <strong>82.6%</strong>
                  <small><ArrowUpRight size={11} /> Improving</small>
                </div>
                <div className="cta-mini-card offset">
                  <span>STUDENTS</span>
                  <strong>1,284</strong>
                  <small>Across 32 classes</small>
                </div>
                <div className="cta-mini-card">
                  <span>ATTENDANCE</span>
                  <strong>93.2%</strong>
                  <small>Today</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <span>Academic intelligence for modern schools.</span>
          <div>
            <button onClick={() => onNavigate("dashboard")}>Platform</button>
            <a href="#modules">Modules</a>
            <a href="#intelligence">School AI</a>
          </div>
          <small>© 2026 SchoolMarks</small>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? "show" : ""}`} onClick={() => setMobileOpen(false)} />

      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <Logo />
          <button className="sidebar-close" onClick={() => setMobileOpen(false)}><X size={17} /></button>
        </div>

        <div className="sidebar-school">
          <div className="school-avatar">SM</div>
          <div>
            <strong>JEB School</strong>
            <span>Academic Workspace</span>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="sidebar-section">
          <span>WORKSPACE</span>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-link ${page === item.id ? "active" : ""}`}
                onClick={() => {
                  setPage(item.id);
                  setMobileOpen(false);
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === "ai" && <b className="new-badge">NEW</b>}
              </button>
            );
          })}
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-link"><Settings size={17} /><span>Settings</span></button>
          <div className="sidebar-user">
            <div className="profile-avatar">FK</div>
            <div><strong>Faizan Khan</strong><span>Administrator</span></div>
            <MoreHorizontal size={16} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ page, setMobileOpen, onHome }) {
  const current = navItems.find(item => item.id === page);

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
        <div className="breadcrumb">
          <button onClick={onHome}>SchoolMarks</button>
          <span>/</span>
          <strong>{current?.label || "Overview"}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search"><Search size={15} /><span>Search anything</span><kbd>⌘ K</kbd></div>
        <button className="icon-button notification"><Bell size={18} /><i /></button>
        <div className="topbar-profile">
          <div className="profile-avatar">FK</div>
          <div><strong>Faizan</strong><span>Admin</span></div>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, change, icon: Icon, negative = false, description }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <div className="stat-icon"><Icon size={17} /></div>
      </div>
      <div className="stat-value-row">
        <strong>{value}</strong>
        <span className={negative ? "negative" : ""}>{negative ? <TrendingDown size={13} /> : <TrendingUp size={13} />} {change}</span>
      </div>
      <small>{description}</small>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">MONDAY · 21 SEPTEMBER 2026</span>
          <h1>Good morning, Faizan.</h1>
          <p>Here's what's happening across your school today.</p>
        </div>
        <div className="workspace-actions">
          <button className="workspace-secondary"><RefreshCcw size={15} /> Refresh</button>
          <button className="workspace-primary"><Plus size={16} /> Add student</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total students" value="1,284" change="+8.4%" icon={Users} description="32 active classes" />
        <StatCard label="Average performance" value="82.6%" change="+4.8%" icon={TrendingUp} description="Compared with last term" />
        <StatCard label="Attendance" value="93.2%" change="+1.6%" icon={UserCheck} description="Today's school attendance" />
        <StatCard label="Attention needed" value="17" change="-12.5%" icon={Target} negative description="Students with active signals" />
      </div>

      <div className="dashboard-main-grid">
        <div className="workspace-card large performance-card">
          <div className="workspace-card-head">
            <div>
              <span>ACADEMIC PERFORMANCE</span>
              <h3>Performance trend</h3>
            </div>
            <button className="chart-filter">Last 6 months <ChevronDown size={13} /></button>
          </div>
          <div className="performance-summary">
            <div><strong>82.6%</strong><span><ArrowUpRight size={13} /> 4.8% increase</span></div>
            <div className="performance-legend"><i /> Average score</div>
          </div>
          <div className="big-chart">
            <div className="big-chart-grid"><i /><i /><i /><i /><i /></div>
            <MiniChart id="dashboard-main-chart" height={220} />
          </div>
          <div className="big-chart-labels"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
        </div>

        <div className="workspace-card attendance-workspace">
          <div className="workspace-card-head">
            <div>
              <span>ATTENDANCE</span>
              <h3>Today's overview</h3>
            </div>
            <MoreHorizontal size={17} />
          </div>
          <div className="attendance-main">
            <ProgressRing value={93} label="Present" />
          </div>
          <div className="attendance-breakdown">
            <div><span><i className="legend-dot present" /> Present</span><strong>1,196</strong></div>
            <div><span><i className="legend-dot absent" /> Absent</span><strong>88</strong></div>
            <div><span><i className="legend-dot late" /> Late</span><strong>34</strong></div>
          </div>
          <button className="text-button">View attendance <ArrowRight size={14} /></button>
        </div>
      </div>

      <div className="dashboard-secondary-grid">
        <div className="workspace-card students-card">
          <div className="workspace-card-head">
            <div>
              <span>STUDENTS</span>
              <h3>Performance overview</h3>
            </div>
            <button className="card-more">View all <ArrowRight size={13} /></button>
          </div>
          <div className="table-toolbar">
            <div className="table-search"><Search size={14} /><span>Search students</span></div>
            <button className="filter-button"><Filter size={14} /> Filter</button>
          </div>
          <div className="students-table-wrap">
            <table className="students-table">
              <thead>
                <tr><th>Student</th><th>Class</th><th>Average</th><th>Attendance</th><th>Status</th><th /></tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map(student => (
                  <tr key={student.name}>
                    <td><div className="table-student"><div className="table-avatar">{student.initials}</div><div><strong>{student.name}</strong><span>Student ID · SM-{student.initials}24</span></div></div></td>
                    <td>{student.className}</td>
                    <td><strong className="score-cell">{student.avg}%</strong></td>
                    <td>{student.attendance}%</td>
                    <td><span className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</span></td>
                    <td><button className="row-more"><MoreHorizontal size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="workspace-card upcoming-card">
          <div className="workspace-card-head">
            <div>
              <span>UPCOMING</span>
              <h3>Next examinations</h3>
            </div>
            <CalendarDays size={17} />
          </div>

          <div className="exam-list">
            {exams.map(exam => (
              <div className="exam-item" key={exam.subject}>
                <div className="exam-icon"><FileText size={16} /></div>
                <div className="exam-info">
                  <strong>{exam.subject}</strong>
                  <span>{exam.className} · {exam.type}</span>
                </div>
                <div className="exam-date"><strong>{exam.date.split(" ")[0]}</strong><span>{exam.date.split(" ")[1]}</span></div>
              </div>
            ))}
          </div>

          <button className="text-button">View exam calendar <ArrowRight size={14} /></button>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="ai-insight-workspace">
          <div className="insight-glow" />
          <div className="insight-ai-icon"><Sparkles size={19} /></div>
          <div className="insight-content">
            <span>AI INSIGHT</span>
            <h3>7 students may need attention this week.</h3>
            <p>School AI found a combined attendance and performance signal across 9-B.</p>
            <button>Explore insight <ArrowRight size={14} /></button>
          </div>
        </div>

        <div className="workspace-card activity-card">
          <div className="workspace-card-head">
            <div><span>ACTIVITY</span><h3>Recent updates</h3></div>
            <MoreHorizontal size={17} />
          </div>
          <div className="activity-list">
            {activity.map((item, index) => (
              <div className="activity-item" key={item.title}>
                <div className={`activity-dot activity-${index}`} />
                <div><strong>{item.title}</strong><span>{item.time}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => students.filter(student => `${student.name} ${student.className}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">STUDENT MANAGEMENT</span>
          <h1>Students</h1>
          <p>Manage student records and monitor academic signals.</p>
        </div>
        <div className="workspace-actions"><button className="workspace-primary"><Plus size={16} /> Add student</button></div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total students" value="1,284" change="+8.4%" icon={Users} description="Across all classes" />
        <StatCard label="Excellent" value="384" change="+6.2%" icon={Award} description="Above 85% average" />
        <StatCard label="Need attention" value="17" change="-12.5%" icon={Target} description="Active academic signals" />
        <StatCard label="New this month" value="42" change="+18.4%" icon={Plus} description="Recently enrolled" />
      </div>

      <div className="workspace-card full-table-card">
        <div className="workspace-card-head">
          <div><span>ALL STUDENTS</span><h3>Student directory</h3></div>
          <div className="table-toolbar-inline">
            <div className="table-search active-search"><Search size={14} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students..." /></div>
            <button className="filter-button"><Filter size={14} /> Filter</button>
          </div>
        </div>
        <div className="students-table-wrap">
          <table className="students-table">
            <thead><tr><th>Student</th><th>Class</th><th>Average</th><th>Attendance</th><th>Status</th><th>Trend</th><th /></tr></thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.name}>
                  <td><div className="table-student"><div className="table-avatar">{student.initials}</div><div><strong>{student.name}</strong><span>Student record · 2026</span></div></div></td>
                  <td>{student.className}</td>
                  <td><strong className="score-cell">{student.avg}%</strong></td>
                  <td>{student.attendance}%</td>
                  <td><span className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</span></td>
                  <td><span className="table-trend"><TrendingUp size={13} /> +4.2%</span></td>
                  <td><button className="row-more"><MoreHorizontal size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AcademicsPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">ACADEMIC MANAGEMENT</span>
          <h1>Academic structure</h1>
          <p>Everything that defines how your school teaches and organizes learning.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Add subject</button>
      </div>

      <div className="academic-grid">
        {[
          ["Classes", "32", "Across grades 6–10", Users],
          ["Subjects", "18", "Active subjects", BookOpen],
          ["Teachers", "74", "Teaching staff", GraduationCap],
          ["Sections", "58", "Active sections", LayoutDashboard]
        ].map(([label, value, text, Icon]) => (
          <div className="academic-summary" key={label}>
            <div className="academic-icon"><Icon size={18} /></div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{text}</small>
          </div>
        ))}
      </div>

      <div className="content-grid-2">
        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>SUBJECTS</span><h3>Academic subjects</h3></div><MoreHorizontal size={17} /></div>
          <div className="subject-list">
            {subjects.map((subject, index) => (
              <div className="subject-row" key={subject.name}>
                <div className="subject-number">0{index + 1}</div>
                <div className="subject-main"><strong>{subject.name}</strong><span>Grades 9 · 10</span></div>
                <div className="subject-progress"><div><i style={{ width: `${subject.score}%` }} /></div></div>
                <strong>{subject.score}%</strong>
                <span className="table-trend"><TrendingUp size={12} /> {subject.trend}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>CLASSES</span><h3>Active classes</h3></div><button className="card-more">View all <ArrowRight size={13} /></button></div>
          <div className="class-list">
            {["9-A", "9-B", "9-C", "10-A", "10-B"].map((item, index) => (
              <div className="class-row" key={item}>
                <div className="class-badge">{item}</div>
                <div><strong>Grade {item.split("-")[0]} · Section {item.split("-")[1]}</strong><span>{index + 3} subjects active</span></div>
                <strong>{[91, 76, 84, 88, 81][index]}%</strong>
                <ArrowRight size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamsPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">EXAMINATIONS</span>
          <h1>Exam calendar</h1>
          <p>Keep every assessment, subject and class on one academic timeline.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Create exam</button>
      </div>

      <div className="exam-hero-card">
        <div>
          <span>NEXT EXAMINATION</span>
          <strong>Computer Science</strong>
          <p>Grade 9 · Monday, 12 October 2026 · Theory</p>
        </div>
        <div className="exam-countdown"><small>STARTS IN</small><strong>21</strong><span>days</span></div>
      </div>

      <div className="workspace-card">
        <div className="workspace-card-head"><div><span>UPCOMING EXAMS</span><h3>October examination schedule</h3></div><button className="filter-button"><Filter size={14} /> Filter</button></div>
        <div className="calendar-list">
          {[...exams, { subject: "Urdu", date: "21 Oct", className: "9-A", type: "Written" }, { subject: "Islamiat", date: "23 Oct", className: "9-B", type: "Written" }].map((exam, index) => (
            <div className="calendar-row" key={`${exam.subject}-${index}`}>
              <div className="calendar-date"><strong>{exam.date.split(" ")[0]}</strong><span>{exam.date.split(" ")[1]}</span></div>
              <div className="calendar-info"><strong>{exam.subject}</strong><span>{exam.className} · {exam.type} examination</span></div>
              <span className="calendar-status">Scheduled</span>
              <button className="row-more"><MoreHorizontal size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarksPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">MARKS MANAGEMENT</span>
          <h1>Assessment marks</h1>
          <p>Capture academic scores and keep every assessment connected to performance.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> New assessment</button>
      </div>

      <div className="marks-overview">
        <div className="marks-main">
          <div className="workspace-card-head"><div><span>MATHEMATICS · MID TERM</span><h3>Grade 9 assessment</h3></div><span className="marks-complete">78% entered</span></div>
          <div className="marks-progress"><i style={{ width: "78%" }} /></div>
          <div className="marks-meta"><span>248 of 318 marks entered</span><strong>70 remaining</strong></div>
        </div>
        <div className="marks-side"><span>AVERAGE</span><strong>84.2%</strong><small><TrendingUp size={12} /> 6.1% this term</small></div>
      </div>

      <div className="workspace-card">
        <div className="workspace-card-head"><div><span>RECENT ASSESSMENTS</span><h3>Assessment performance</h3></div><button className="card-more">View all <ArrowRight size={13} /></button></div>
        <div className="assessment-list">
          {[
            ["Mathematics", "Mid Term", "84.2%", "+6.1%", "Completed"],
            ["Computer Science", "Quiz 04", "91.6%", "+12.4%", "Completed"],
            ["English", "Unit Test", "79.4%", "+4.1%", "Completed"],
            ["Science", "Chapter Test", "86.1%", "+6.8%", "In progress"]
          ].map(item => (
            <div className="assessment-row" key={`${item[0]}-${item[1]}`}>
              <div className="assessment-icon"><ClipboardCheck size={16} /></div>
              <div><strong>{item[0]}</strong><span>{item[1]}</span></div>
              <strong>{item[2]}</strong>
              <span className="table-trend"><TrendingUp size={12} /> {item[3]}</span>
              <span className={`status-pill ${item[4] === "Completed" ? "excellent" : "good"}`}>{item[4]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">RESULTS & REPORTING</span>
          <h1>Academic results</h1>
          <p>Turn assessment data into clear results for classes, subjects and students.</p>
        </div>
        <button className="workspace-secondary"><FileText size={15} /> Generate report</button>
      </div>

      <div className="results-hero">
        <div className="results-grade">
          <span>OVERALL SCHOOL AVERAGE</span>
          <strong>82.6%</strong>
          <small><ArrowUpRight size={13} /> 4.8% improvement from last term</small>
        </div>
        <div className="result-stat"><span>Pass rate</span><strong>94.8%</strong><small>+2.8%</small></div>
        <div className="result-stat"><span>Top class</span><strong>9-A</strong><small>91.2% average</small></div>
        <div className="result-stat"><span>Top subject</span><strong>Computer</strong><small>91.6% average</small></div>
      </div>

      <div className="content-grid-2">
        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>CLASS RESULTS</span><h3>Performance by class</h3></div></div>
          <div className="result-bars">
            {[["9-A", 91], ["10-A", 88], ["9-C", 84], ["10-B", 81], ["9-B", 76]].map(item => (
              <div className="result-bar" key={item[0]}>
                <div><strong>{item[0]}</strong><span>{item[1]}%</span></div>
                <div><i style={{ width: `${item[1]}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>GRADE DISTRIBUTION</span><h3>Current term</h3></div></div>
          <div className="grade-distribution">
            <div><span>A</span><i style={{ width: "72%" }} /><strong>32%</strong></div>
            <div><span>B</span><i style={{ width: "88%" }} /><strong>41%</strong></div>
            <div><span>C</span><i style={{ width: "49%" }} /><strong>18%</strong></div>
            <div><span>D</span><i style={{ width: "21%" }} /><strong>6%</strong></div>
            <div><span>F</span><i style={{ width: "10%" }} /><strong>3%</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendancePage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">ATTENDANCE INTELLIGENCE</span>
          <h1>Attendance</h1>
          <p>Understand presence, absence and attendance patterns across your school.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Record attendance</button>
      </div>

      <div className="stat-grid">
        <StatCard label="Present today" value="1,196" change="+1.6%" icon={UserCheck} description="93.2% of students" />
        <StatCard label="Absent" value="88" change="-8.2%" icon={Clock3} negative description="Across all classes" />
        <StatCard label="Late arrivals" value="34" change="+3.1%" icon={Activity} description="Recorded today" />
        <StatCard label="At-risk attendance" value="24" change="-14.8%" icon={Target} description="Below 80% attendance" />
      </div>

      <div className="content-grid-2">
        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>ATTENDANCE TREND</span><h3>Last 30 days</h3></div><button className="chart-filter">30 days <ChevronDown size={13} /></button></div>
          <div className="big-chart attendance-chart"><div className="big-chart-grid"><i /><i /><i /><i /><i /></div><MiniChart id="attendance-chart" height={210} /></div>
        </div>

        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>ATTENTION</span><h3>Attendance signals</h3></div><Target size={17} /></div>
          <div className="attendance-alert-list">
            {[
              ["9-B", "73.4%", "7 students below 80%"],
              ["9-C", "79.2%", "4 students below 80%"],
              ["10-B", "81.8%", "3 students below 80%"]
            ].map(item => (
              <div key={item[0]} className="attendance-alert">
                <div className="class-badge warning">{item[0]}</div>
                <div><strong>{item[1]} attendance</strong><span>{item[2]}</span></div>
                <ArrowRight size={15} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">PERFORMANCE ANALYTICS</span>
          <h1>Performance intelligence</h1>
          <p>See how students, subjects and classes are moving over time.</p>
        </div>
        <button className="workspace-secondary"><Filter size={15} /> Filters</button>
      </div>

      <div className="performance-hero">
        <div className="performance-big">
          <span>ACADEMIC HEALTH SCORE</span>
          <strong>82.6</strong>
          <small>out of 100</small>
          <div><ArrowUpRight size={13} /> 4.8% improvement</div>
        </div>
        <div className="performance-ring-wrap"><ProgressRing value={83} label="Health" /></div>
        <div className="performance-insight"><Sparkles size={18} /><div><span>AI SIGNAL</span><strong>Computer Science is the fastest-growing subject.</strong><small>+12.4% this term</small></div></div>
      </div>

      <div className="content-grid-2">
        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>SUBJECT PERFORMANCE</span><h3>Average score by subject</h3></div></div>
          <div className="subject-list">
            {subjects.map((subject, index) => (
              <div className="subject-row" key={subject.name}>
                <div className="subject-number">0{index + 1}</div>
                <div className="subject-main"><strong>{subject.name}</strong><span>Current term</span></div>
                <div className="subject-progress"><div><i style={{ width: `${subject.score}%` }} /></div></div>
                <strong>{subject.score}%</strong>
                <span className="table-trend"><TrendingUp size={12} /> {subject.trend}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>PERFORMANCE SIGNALS</span><h3>What changed?</h3></div></div>
          <div className="signal-card-list">
            <div><div className="signal-card-icon"><TrendingUp size={15} /></div><div><strong>Computer Science</strong><span>Average increased from 79.2% to 91.6%.</span></div></div>
            <div><div className="signal-card-icon"><UserCheck size={15} /></div><div><strong>9-A attendance</strong><span>Attendance remains above 95% for 4 consecutive weeks.</span></div></div>
            <div><div className="signal-card-icon warning"><Target size={15} /></div><div><strong>9-B needs attention</strong><span>Performance and attendance are both below school average.</span></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateAIAnswer(question) {
  const text = question.toLowerCase();

  if (text.includes("attendance") || text.includes("absent")) {
    return {
      title: "Attendance overview",
      body: "The school is currently at 93.2% attendance today. The strongest signal is in 9-B, where attendance is around 73%. Seven students in that class currently combine low attendance with weaker academic performance.",
      tags: ["93.2% today", "9-B signal", "7 students"]
    };
  }

  if (text.includes("performance") || text.includes("score") || text.includes("subject")) {
    return {
      title: "Performance overview",
      body: "The current school average is 82.6%. Computer Science is the fastest-growing subject at 91.6%, while English is currently the lowest of the tracked subjects at 79.4%.",
      tags: ["82.6% average", "Computer 91.6%", "English 79.4%"]
    };
  }

  if (text.includes("student") || text.includes("attention") || text.includes("risk")) {
    return {
      title: "Students needing attention",
      body: "I found 7 students showing a combined academic and attendance signal. Zayan Ahmed is the strongest attention signal with a 51% average and 73% attendance. Rayyan Malik is another student worth reviewing at 64% average and 79% attendance.",
      tags: ["7 students", "Zayan Ahmed", "Rayyan Malik"]
    };
  }

  if (text.includes("class") || text.includes("9-a") || text.includes("9-b")) {
    return {
      title: "Class comparison",
      body: "9-A currently leads with a 91% average, while 9-B is at 76%. The largest difference is not only academic performance — 9-B also has the strongest attendance signal requiring attention.",
      tags: ["9-A · 91%", "9-B · 76%", "Compare attendance"]
    };
  }

  return {
    title: "SchoolMarks insight",
    body: "Based on the current academic workspace, the school is averaging 82.6% performance and 93.2% attendance. Computer Science is showing the strongest growth, while 9-B has the clearest combined performance and attendance signal.",
    tags: ["82.6% performance", "93.2% attendance", "9-B signal"]
  };
}

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      title: "Welcome to School AI",
      body: "Ask me about students, attendance, performance, classes, subjects or academic trends.",
      tags: ["Try: Which students need attention?", "Try: Compare classes", "Try: Attendance this week"]
    }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const ask = question => {
    const clean = question.trim();
    if (!clean || thinking) return;

    setMessages(current => [...current, { role: "user", body: clean }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const answer = generateAIAnswer(clean);
      setMessages(current => [...current, { role: "assistant", ...answer }]);
      setThinking(false);
    }, 650);
  };

  return (
    <div className="route-page ai-route">
      <div className="ai-page-header">
        <div>
          <span className="workspace-eyebrow">SCHOOL AI</span>
          <h1>Ask your academic data.</h1>
          <p>Explore your school's information through natural-language questions.</p>
        </div>
        <div className="ai-page-actions">
          <button className="workspace-secondary" onClick={() => setMessages([])}><RefreshCcw size={15} /> Clear chat</button>
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-large-icon"><BrainCircuit size={21} /></div>
              <div><strong>School AI</strong><span>Academic Intelligence</span></div>
            </div>
            <div className="assistant-status"><i /> Online</div>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div className={`ai-chat-message ${message.role}`} key={`${message.role}-${index}`}>
                <div className={`ai-chat-avatar ${message.role === "user" ? "user-chat-avatar" : ""}`}>
                  {message.role === "user" ? "FK" : <Sparkles size={14} />}
                </div>
                <div className="ai-chat-content">
                  <span>{message.role === "user" ? "You" : "School AI"}</span>
                  {message.title && <strong className="ai-answer-title">{message.title}</strong>}
                  <p>{message.body}</p>
                  {message.tags && (
                    <div className="answer-tags">
                      {message.tags.map(tag => <button key={tag} onClick={() => ask(tag.replace("Try: ", ""))}>{tag}</button>)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="ai-chat-message assistant">
                <div className="ai-chat-avatar"><Sparkles size={14} /></div>
                <div className="typing-bubble"><i /><i /><i /></div>
              </div>
            )}
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
              placeholder="Ask School AI anything about your academic data..."
              rows={2}
            />
            <div className="ai-input-footer">
              <span><Sparkles size={13} /> AI responses are based on the current demo dataset.</span>
              <button onClick={() => ask(input)} disabled={!input.trim() || thinking}><Send size={15} /></button>
            </div>
          </div>
        </div>

        <aside className="ai-side-panel">
          <div className="ai-side-card ai-side-intro">
            <div className="ai-side-icon"><Zap size={17} /></div>
            <span>QUICK INTELLIGENCE</span>
            <h3>Start with a question.</h3>
            <p>School AI is designed to help you explore patterns instead of manually searching through records.</p>
          </div>

          <div className="ai-side-card">
            <span className="side-card-heading">TODAY'S SIGNALS</span>
            <div className="ai-metric"><strong>7</strong><span>students need attention</span><ArrowRight size={14} /></div>
            <div className="ai-metric"><strong>9-B</strong><span>attendance signal</span><ArrowRight size={14} /></div>
            <div className="ai-metric"><strong>+12.4%</strong><span>Computer Science growth</span><ArrowRight size={14} /></div>
          </div>

          <div className="ai-side-card popular-questions">
            <span className="side-card-heading">POPULAR QUESTIONS</span>
            {[
              "Which students need attention?",
              "What changed this week?",
              "Which class is performing best?",
              "Show attendance trends"
            ].map(question => (
              <button key={question} onClick={() => ask(question)}>{question}<ArrowUpRight size={13} /></button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function AccessModal({ onClose, onOpenDashboard }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="access-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        <div className="modal-icon"><GraduationCap size={22} /></div>
        <span className="eyebrow">SCHOOLMARKS PLATFORM</span>
        <h2>Welcome to your academic workspace.</h2>
        <p>This demo opens the SchoolMarks workspace with dashboard, student records, analytics and School AI.</p>
        <button className="primary-button modal-button" onClick={onOpenDashboard}>Open dashboard <ArrowRight size={16} /></button>
        <small>Frontend demonstration · No account required</small>
      </div>
    </div>
  );
}

function AppLayout({ page, setPage, onHome }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const content = {
    dashboard: <DashboardPage />,
    students: <StudentsPage />,
    academics: <AcademicsPage />,
    exams: <ExamsPage />,
    marks: <MarksPage />,
    results: <ResultsPage />,
    attendance: <AttendancePage />,
    performance: <PerformancePage />,
    ai: <AIPage />
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="app-main">
        <Topbar page={page} setMobileOpen={setMobileOpen} onHome={onHome} />
        <main className="app-content">{content[page] || <DashboardPage />}</main>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigate = nextPage => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "home") {
    return (
      <>
        <HomePage onNavigate={navigate} onAccess={() => setModalOpen(true)} />
        {modalOpen && (
          <AccessModal
            onClose={() => setModalOpen(false)}
            onOpenDashboard={() => {
              setModalOpen(false);
              navigate("dashboard");
            }}
          />
        )}
      </>
    );
  }

  return <AppLayout page={page} setPage={setPage} onHome={() => navigate("home")} />;
}