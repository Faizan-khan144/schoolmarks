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
  { name: "Rayyan Malik", initials: "RM", className: "9-C", avg: 64, attendance: 79, status: "Attention" },
  { name: "Hiba Noor", initials: "HN", className: "9-A", avg: 84, attendance: 94, status: "Good" },
  { name: "Hamza Tariq", initials: "HT", className: "9-B", avg: 72, attendance: 86, status: "Good" }
];

const modules = [
  { title: "Student Management", description: "Profiles, enrollment, classes and student records in one place.", icon: Users },
  { title: "Academic Management", description: "Organize subjects, classes, teachers and academic structures.", icon: BookOpen },
  { title: "Examinations", description: "Plan exams, schedules and assessments without spreadsheet chaos.", icon: ClipboardCheck },
  { title: "Marks & Results", description: "Enter marks and generate clean academic results instantly.", icon: FileText },
  { title: "Attendance Intelligence", description: "Track attendance patterns and identify students needing attention.", icon: UserCheck },
  { title: "Performance Analytics", description: "Turn academic data into clear and actionable insights.", icon: LineChart }
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: ClipboardCheck },
  { id: "marks", label: "Marks", icon: FileText },
  { id: "results", label: "Results", icon: Award },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "ai", label: "AI Intelligence", icon: BrainCircuit }
];

const activities = [
  { title: "Areeba Khan scored 94% in Mathematics", time: "8 min ago", icon: TrendingUp },
  { title: "Attendance recorded for Class 9-A", time: "24 min ago", icon: UserCheck },
  { title: "Physics examination schedule updated", time: "1 hr ago", icon: CalendarDays },
  { title: "3 students flagged for performance review", time: "2 hrs ago", icon: Target }
];

const exams = [
  { subject: "Mathematics", className: "Class 9-A", date: "18 Oct", days: "21 days" },
  { subject: "Computer Science", className: "Class 9-B", date: "21 Oct", days: "24 days" },
  { subject: "Physics", className: "Class 9-C", date: "24 Oct", days: "27 days" }
];

function Logo({ light = false }) {
  return (
    <div className={`brand ${light ? "brand-light" : ""}`}>
      <div className="brand-mark">
        <span>SM</span>
        <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" />
      </div>
      <div>
        <strong>SchoolMarks</strong>
        <small>Academic Intelligence</small>
      </div>
    </div>
  );
}

function MiniChart({ large = false }) {
  const points = large
    ? "0,108 45,96 90,100 135,72 180,80 225,48 270,56 315,29 360,38 405,17 450,25"
    : "0,67 35,60 70,64 105,45 140,51 175,31 210,38 245,20 280,28 315,12";

  return (
    <div className={`mini-chart ${large ? "mini-chart-large" : ""}`}>
      <div className="chart-grid">
        <span />
        <span />
        <span />
        <span />
      </div>
      <svg viewBox={large ? "0 0 450 125" : "0 0 315 80"} preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ProgressRing({ value, label }) {
  return (
    <div className="progress-ring-wrap">
      <div className="progress-ring" style={{ "--progress": `${value * 3.6}deg` }}>
        <div className="ring-inner">
          <strong>{value}%</strong>
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {
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
  }, [node]);

  return (
    <div ref={setNode} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function LandingPreview() {
  return (
    <div className="product-window">
      <div className="browser-bar">
        <div className="browser-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-url">app.schoolmarks.local/dashboard</div>
        <div className="browser-secure">Secure</div>
      </div>

      <div className="product-body">
        <aside className="product-sidebar">
          <div className="preview-logo">SM</div>
          <div className="preview-nav active"><LayoutDashboard size={15} /> Overview</div>
          <div className="preview-nav"><Users size={15} /> Students</div>
          <div className="preview-nav"><BookOpen size={15} /> Academics</div>
          <div className="preview-nav"><BarChart3 size={15} /> Analytics</div>
          <div className="preview-nav"><BrainCircuit size={15} /> AI</div>
        </aside>

        <div className="product-main">
          <div className="preview-heading">
            <div>
              <span>MONDAY, 17 SEPTEMBER</span>
              <h3>Good morning, Admin</h3>
            </div>
            <div className="preview-avatar">FK</div>
          </div>

          <div className="preview-stats">
            <div className="preview-stat">
              <span>Students</span>
              <strong>1,248</strong>
              <small>+12.4%</small>
            </div>
            <div className="preview-stat">
              <span>Attendance</span>
              <strong>94.6%</strong>
              <small>+2.1%</small>
            </div>
            <div className="preview-stat">
              <span>Avg. Result</span>
              <strong>82.8%</strong>
              <small>+4.8%</small>
            </div>
          </div>

          <div className="product-grid">
            <div className="dashboard-card chart-card">
              <div className="card-head">
                <div>
                  <span>Performance trend</span>
                  <strong>Academic overview</strong>
                </div>
                <button><MoreHorizontal size={16} /></button>
              </div>
              <MiniChart />
              <div className="chart-labels">
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>
            </div>

            <div className="dashboard-card attendance-card">
              <div className="card-head">
                <div>
                  <span>Attendance</span>
                  <strong>Today's pulse</strong>
                </div>
                <Activity size={17} />
              </div>
              <div className="attendance-preview">
                <ProgressRing value={94} label="Present" />
                <div>
                  <div><i className="dot present" /> 1,180 Present</div>
                  <div><i className="dot absent" /> 42 Absent</div>
                  <div><i className="dot late" /> 26 Late</div>
                </div>
              </div>
            </div>

            <div className="dashboard-card table-card">
              <div className="card-head">
                <div>
                  <span>Students</span>
                  <strong>Performance signals</strong>
                </div>
                <button><ArrowUpRight size={16} /></button>
              </div>
              {students.slice(0, 3).map(student => (
                <div className="preview-student" key={student.name}>
                  <div className="student-avatar">{student.initials}</div>
                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.className}</span>
                  </div>
                  <b>{student.avg}%</b>
                </div>
              ))}
            </div>

            <div className="dashboard-card intelligence-card">
              <div className="ai-icon"><Sparkles size={17} /></div>
              <div className="ai-heading">
                <span>AI Insight</span>
                <strong>3 students may need attention</strong>
              </div>
              <p>Performance dropped below their previous average.</p>
              <div className="ai-tags">
                <span>Performance</span>
                <span>Attendance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigate, onAccess }) {
  return (
    <div className="site">
      <header className="public-nav">
        <div className="container nav-inner">
          <Logo />
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#workflow">How it works</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#analytics">Analytics</a>
          </nav>
          <div className="nav-actions">
            <button className="nav-ai" onClick={() => onNavigate("ai")}>
              <BrainCircuit size={16} />
              AI
            </button>
            <button className="nav-button" onClick={() => onAccess("login")}>Sign in</button>
            <button className="primary-button nav-primary" onClick={() => onAccess("demo")}>
              Get started <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="container hero-inner">
            <Reveal className="hero-copy">
              <div className="hero-eyebrow">
                <span className="eyebrow-pulse" />
                Modern academic management
              </div>

              <h1>
                Your school's data.
                <span>Finally working together.</span>
              </h1>

              <p>
                SchoolMarks brings students, academics, examinations, attendance,
                results and intelligent insights into one beautifully simple workspace.
              </p>

              <div className="hero-actions">
                <button className="primary-button large" onClick={() => onAccess("demo")}>
                  Explore SchoolMarks <ArrowRight size={18} />
                </button>
                <a className="secondary-button large" href="#features">
                  See how it works
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-item"><Check size={15} /> Built for modern schools</div>
                <div className="trust-item"><Check size={15} /> Simple by design</div>
                <div className="trust-item"><Check size={15} /> Intelligence included</div>
              </div>
            </Reveal>

            <Reveal className="hero-product">
              <div className="floating-badge badge-one">
                <span className="floating-icon"><TrendingUp size={15} /></span>
                <div><strong>+8.4%</strong><small>Performance</small></div>
              </div>

              <div className="floating-badge badge-two">
                <span className="floating-icon purple"><BrainCircuit size={15} /></span>
                <div><strong>AI Insight</strong><small>Ready for review</small></div>
              </div>

              <LandingPreview />
            </Reveal>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-strip-inner">
            <span>ONE WORKSPACE FOR</span>
            <div><GraduationCap size={17} /> Schools</div>
            <div><Users size={17} /> Teachers</div>
            <div><BookOpenCheck size={17} /> Academics</div>
            <div><BarChart3 size={17} /> Performance</div>
            <div><BrainCircuit size={17} /> Intelligence</div>
          </div>
        </section>

        <section className="problem-section section">
          <div className="container problem-layout">
            <Reveal className="problem-copy">
              <span className="eyebrow">THE OLD WAY</span>
              <h2>Academic data shouldn't feel like detective work.</h2>
              <p>
                Spreadsheets here. Attendance somewhere else. Results in another file.
                Important signals get buried between disconnected systems.
              </p>
              <div className="problem-list">
                <div><span>01</span> Scattered student records</div>
                <div><span>02</span> Manual performance tracking</div>
                <div><span>03</span> Slow result preparation</div>
                <div><span>04</span> Insights hidden in raw data</div>
              </div>
            </Reveal>

            <Reveal className="problem-visual">
              <div className="scattered-card card-a">
                <FileText size={19} />
                <strong>Marks.xlsx</strong>
                <span>Last edited 3 days ago</span>
              </div>
              <div className="scattered-card card-b">
                <ClipboardCheck size={19} />
                <strong>Attendance.csv</strong>
                <span>426 records</span>
              </div>
              <div className="scattered-card card-c">
                <Users size={19} />
                <strong>Students.docx</strong>
                <span>9-A / 9-B / 9-C</span>
              </div>
              <div className="convergence">
                <div className="convergence-icon"><Sparkles size={22} /></div>
                <strong>SchoolMarks</strong>
                <span>Everything connected.</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="solution-section section" id="features">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">ONE PLATFORM</span>
              <h2>Everything your academic team needs.</h2>
              <p>Designed around the way schools actually work.</p>
            </Reveal>

            <div className="module-grid">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Reveal className="module-card" key={module.title}>
                    <div className="module-number">0{index + 1}</div>
                    <div className="module-icon"><Icon size={22} /></div>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                    <button onClick={() => onAccess("demo")}>
                      Explore module <ArrowUpRight size={16} />
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="workflow-section section" id="workflow">
          <div className="container">
            <Reveal className="section-heading">
              <span className="eyebrow">SIMPLE WORKFLOW</span>
              <h2>From school setup to useful insight.</h2>
              <p>No complicated implementation story. Just a workspace that gets better as your data grows.</p>
            </Reveal>

            <div className="workflow-stage">
              <div className="workflow-steps">
                {[
                  ["01", "Set up", "Create your academic structure."],
                  ["02", "Connect", "Add students, classes and subjects."],
                  ["03", "Track", "Record attendance and marks."],
                  ["04", "Understand", "Use analytics and AI insights."]
                ].map((step, index) => (
                  <Reveal className={`workflow-step ${index === 3 ? "active" : ""}`} key={step[0]}>
                    <span>{step[0]}</span>
                    <div>
                      <strong>{step[1]}</strong>
                      <p>{step[2]}</p>
                    </div>
                    {index < 3 && <ArrowRight size={17} />}
                  </Reveal>
                ))}
              </div>

              <div className="workflow-product">
                <div className="workflow-top">
                  <div>
                    <span>ACADEMIC OVERVIEW</span>
                    <strong>School performance</strong>
                  </div>
                  <div className="live-pill"><i /> Live</div>
                </div>
                <div className="workflow-chart">
                  <div className="chart-score">
                    <span>Average performance</span>
                    <strong>82.8%</strong>
                    <small><TrendingUp size={13} /> 4.8% this term</small>
                  </div>
                  <MiniChart large />
                </div>
                <div className="workflow-bottom">
                  <div><span>Students</span><strong>1,248</strong></div>
                  <div><span>Attendance</span><strong>94.6%</strong></div>
                  <div><span>At risk</span><strong>18</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intelligence-section section" id="intelligence">
          <div className="container">
            <Reveal className="intelligence-header">
              <div>
                <span className="eyebrow">SCHOOLMARKS INTELLIGENCE</span>
                <h2>Data is useful.<br /><span>Understanding it is better.</span></h2>
              </div>
              <p>
                Ask questions about your academic data in natural language and get
                clear, contextual answers from the information already inside your workspace.
              </p>
            </Reveal>

            <Reveal className="intelligence-demo">
              <div className="assistant-top">
                <div className="assistant-status">
                  <div className="assistant-avatar"><BrainCircuit size={20} /></div>
                  <div><strong>SchoolMarks Intelligence</strong><span><i /> Ready</span></div>
                </div>
                <span className="assistant-secure">Private workspace</span>
              </div>

              <div className="assistant-content">
                <div className="assistant-copy">
                  <span className="eyebrow">ASK YOUR DATA</span>
                  <h3>Questions shouldn't need a report.</h3>
                  <p>Go from “what happened?” to “what should I look at?” in seconds.</p>
                  <div className="suggestion-row">
                    <span>Which students need attention?</span>
                    <span>How is Class 9 performing?</span>
                    <span>Attendance this month?</span>
                  </div>
                </div>

                <div className="assistant-panel">
                  <div className="assistant-messages">
                    <div className="assistant-message">
                      <div className="message-avatar"><BrainCircuit size={14} /></div>
                      <div>
                        <span>SchoolMarks Intelligence</span>
                        <p>What would you like to understand?</p>
                      </div>
                    </div>
                    <div className="assistant-message user-message">
                      <div className="message-avatar user-avatar">FK</div>
                      <div>
                        <span>You</span>
                        <p>Which students have both low attendance and performance?</p>
                      </div>
                    </div>
                    <div className="assistant-message result-message">
                      <div className="message-avatar"><Sparkles size={14} /></div>
                      <div>
                        <span>Analysis</span>
                        <p>Zayan Ahmed and Rayyan Malik are the clearest signals to review.</p>
                        <div className="result-tags"><b>Attendance</b><b>Performance</b><b>2 students</b></div>
                      </div>
                    </div>
                  </div>
                  <div className="assistant-input">Ask anything about your school data <Send size={15} /></div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="analytics-section section" id="analytics">
          <div className="container analytics-layout">
            <Reveal className="analytics-copy">
              <span className="eyebrow">PERFORMANCE ANALYTICS</span>
              <h2>See the signal before it becomes a problem.</h2>
              <p>
                SchoolMarks transforms marks and attendance into visual trends,
                comparisons and performance signals that are easier to act on.
              </p>

              <div className="signal-list">
                <div><span className="signal-icon"><TrendingUp size={17} /></span><div><strong>Performance trends</strong><small>Track movement across terms.</small></div></div>
                <div><span className="signal-icon"><Target size={17} /></span><div><strong>Risk signals</strong><small>Identify students needing review.</small></div></div>
                <div><span className="signal-icon"><BarChart3 size={17} /></span><div><strong>Class comparisons</strong><small>Understand academic differences.</small></div></div>
              </div>
            </Reveal>

            <Reveal className="analytics-visual">
              <div className="analytics-main-card">
                <div className="analytics-card-head">
                  <div><span>AVERAGE PERFORMANCE</span><strong>82.8%</strong></div>
                  <div className="trend-up"><TrendingUp size={15} /> +4.8%</div>
                </div>
                <MiniChart large />
                <div className="analytics-axis"><span>Term 1</span><span>Term 2</span><span>Term 3</span><span>Current</span></div>
              </div>
              <div className="analytics-float float-top">
                <span>Top subject</span>
                <strong>Computer Science</strong>
                <b>91%</b>
              </div>
              <div className="analytics-float float-bottom">
                <span>Improving students</span>
                <strong>+126</strong>
                <small>this term</small>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="compare-section section">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">A BETTER WORKSPACE</span>
              <h2>Less switching. More understanding.</h2>
            </Reveal>

            <Reveal className="comparison">
              <div className="comparison-column old">
                <span className="comparison-label">WITHOUT SCHOOLMARKS</span>
                <div className="comparison-row"><X size={16} /> Separate spreadsheets</div>
                <div className="comparison-row"><X size={16} /> Manual calculations</div>
                <div className="comparison-row"><X size={16} /> Scattered student records</div>
                <div className="comparison-row"><X size={16} /> Reports after the fact</div>
              </div>

              <div className="comparison-center"><Sparkles size={20} /></div>

              <div className="comparison-column new">
                <span className="comparison-label">WITH SCHOOLMARKS</span>
                <div className="comparison-row"><Check size={16} /> One connected workspace</div>
                <div className="comparison-row"><Check size={16} /> Automated calculations</div>
                <div className="comparison-row"><Check size={16} /> Unified academic records</div>
                <div className="comparison-row"><Check size={16} /> Insights while you work</div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="roadmap-section section">
          <div className="container">
            <Reveal className="section-heading">
              <span className="eyebrow">BUILT TO GROW</span>
              <h2>A foundation for modern academic operations.</h2>
            </Reveal>

            <div className="roadmap-grid">
              <Reveal className="roadmap-card current">
                <span>NOW</span>
                <div className="roadmap-icon"><LayoutDashboard size={20} /></div>
                <h3>Academic foundation</h3>
                <p>Students, academics, examinations, marks, results and attendance.</p>
                <b>Available</b>
              </Reveal>
              <Reveal className="roadmap-card">
                <span>NEXT</span>
                <div className="roadmap-icon"><BrainCircuit size={20} /></div>
                <h3>Deeper intelligence</h3>
                <p>More contextual insights, recommendations and academic signals.</p>
                <b>In progress</b>
              </Reveal>
              <Reveal className="roadmap-card">
                <span>FUTURE</span>
                <div className="roadmap-icon"><Zap size={20} /></div>
                <h3>Connected ecosystem</h3>
                <p>Expand school workflows without adding unnecessary complexity.</p>
                <b>Exploring</b>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <Reveal className="cta-box">
              <div className="cta-copy">
                <span className="eyebrow">READY WHEN YOU ARE</span>
                <h2>Make your school's data work harder.</h2>
                <p>Explore the SchoolMarks workspace and see what a connected academic system feels like.</p>
                <button className="primary-button large" onClick={() => onAccess("demo")}>
                  Open SchoolMarks <ArrowRight size={18} />
                </button>
              </div>
              <div className="cta-product">
                <div className="cta-mini-card one"><TrendingUp size={16} /><span>Performance</span><strong>82.8%</strong></div>
                <div className="cta-mini-card two"><UserCheck size={16} /><span>Attendance</span><strong>94.6%</strong></div>
                <div className="cta-mini-card three"><BrainCircuit size={16} /><span>AI signals</span><strong>18</strong></div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#intelligence">Intelligence</a>
            <button onClick={() => onAccess("demo")}>Demo</button>
          </div>
          <span>© 2026 SchoolMarks</span>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ page, onNavigate, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
      <aside className={`app-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <Logo />
        </div>

        <div className="sidebar-school">
          <div className="school-avatar">SM</div>
          <div><strong>JEB School</strong><span>Academic workspace</span></div>
          <ChevronDown size={15} />
        </div>

        <div className="sidebar-section">
          <span>WORKSPACE</span>
          {navItems.slice(0, 8).map(item => {
            const Icon = item.icon;
            return (
              <button
                className={`sidebar-link ${page === item.id ? "active" : ""}`}
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === "performance" && <b className="new-badge">NEW</b>}
              </button>
            );
          })}
        </div>

        <div className="sidebar-section ai-sidebar">
          <span>INTELLIGENCE</span>
          <button
            className={`sidebar-link ai-link ${page === "ai" ? "active" : ""}`}
            onClick={() => {
              onNavigate("ai");
              setMobileOpen(false);
            }}
          >
            <BrainCircuit size={17} />
            <span>AI Assistant</span>
            <i />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-link"><Settings size={17} /><span>Settings</span></button>
          <div className="sidebar-profile">
            <div className="profile-avatar">FK</div>
            <div><strong>Admin</strong><span>School administrator</span></div>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ page, onBack, onMenu }) {
  const current = navItems.find(item => item.id === page);

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu}><Menu size={21} /></button>
        <div className="breadcrumb">
          <button onClick={onBack}>SchoolMarks</button>
          <span>/</span>
          <strong>{current?.label || "Dashboard"}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="icon-button"><Search size={18} /></button>
        <button className="icon-button notification"><Bell size={18} /><i /></button>
        <div className="topbar-profile"><div className="profile-avatar">FK</div><ChevronDown size={14} /></div>
      </div>
    </header>
  );
}

function AppLayout({ page, onNavigate, onBack, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={onNavigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="app-main">
        <Topbar page={page} onBack={onBack} onMenu={() => setMobileOpen(true)} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="workspace-header">
      <div>
        <span className="workspace-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="workspace-actions">{actions}</div>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, positive = true, description }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon"><Icon size={18} /></div>
        <span className={positive ? "positive" : "negative"}>{positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{change}</span>
      </div>
      <div className="stat-value-row"><strong>{value}</strong></div>
      <span className="stat-label">{label}</span>
      {description && <small>{description}</small>}
    </div>
  );
}

function DashboardPage({ onNavigate }) {
  return (
    <div className="route-page">
      <PageHeader
        eyebrow="OVERVIEW"
        title="Good evening, Admin."
        description="Here's what's happening across your school today."
        actions={
          <>
            <button className="workspace-secondary"><RefreshCcw size={16} /> Refresh</button>
            <button className="workspace-primary" onClick={() => onNavigate("students")}><Plus size={17} /> Add student</button>
          </>
        }
      />

      <div className="stat-grid">
        <StatCard icon={Users} label="Total students" value="1,248" change="+12.4%" description="vs. last month" />
        <StatCard icon={UserCheck} label="Attendance today" value="94.6%" change="+2.1%" description="1,180 present" />
        <StatCard icon={Award} label="Average performance" value="82.8%" change="+4.8%" description="across all classes" />
        <StatCard icon={Target} label="Students to review" value="18" change="-14.2%" positive={true} description="down from last week" />
      </div>

      <div className="dashboard-main-grid">
        <div className="workspace-card performance-card">
          <div className="workspace-card-head">
            <div><span>ACADEMIC PERFORMANCE</span><h3>Performance overview</h3></div>
            <button className="chart-filter">This term <ChevronDown size={14} /></button>
          </div>
          <div className="performance-overview">
            <div className="performance-number"><strong>82.8%</strong><span><TrendingUp size={13} /> 4.8% increase</span><small>Compared with previous term</small></div>
            <MiniChart large />
          </div>
          <div className="performance-axis"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
        </div>

        <div className="workspace-card attendance-workspace">
          <div className="workspace-card-head">
            <div><span>ATTENDANCE</span><h3>Today's pulse</h3></div>
            <button className="card-more"><MoreHorizontal size={18} /></button>
          </div>
          <div className="attendance-layout">
            <ProgressRing value={94} label="Present" />
            <div className="attendance-breakdown">
              <div><i className="legend-dot present" /><span>Present</span><strong>1,180</strong></div>
              <div><i className="legend-dot absent" /><span>Absent</span><strong>42</strong></div>
              <div><i className="legend-dot late" /><span>Late</span><strong>26</strong></div>
            </div>
          </div>
          <button className="text-button" onClick={() => onNavigate("attendance")}>View attendance <ArrowRight size={15} /></button>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="workspace-card students-card">
          <div className="workspace-card-head">
            <div><span>STUDENT PERFORMANCE</span><h3>Students needing attention</h3></div>
            <button className="text-button" onClick={() => onNavigate("students")}>View all <ArrowRight size={15} /></button>
          </div>
          <div className="student-list">
            {students.filter(s => s.status === "At Risk" || s.status === "Attention").map(student => (
              <div className="student-row" key={student.name}>
                <div className="table-student"><div className="table-avatar">{student.initials}</div><div><strong>{student.name}</strong><span>{student.className}</span></div></div>
                <div className="score-cell"><span>Average</span><strong>{student.avg}%</strong></div>
                <div className="score-cell"><span>Attendance</span><strong>{student.attendance}%</strong></div>
                <span className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</span>
                <button className="row-more"><MoreHorizontal size={17} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="workspace-card upcoming-card">
          <div className="workspace-card-head">
            <div><span>UPCOMING</span><h3>Examinations</h3></div>
            <button className="text-button" onClick={() => onNavigate("exams")}>Calendar <ArrowUpRight size={15} /></button>
          </div>
          <div className="exam-list">
            {exams.map(exam => (
              <div className="exam-item" key={exam.subject}>
                <div className="exam-icon"><BookOpenCheck size={17} /></div>
                <div className="exam-info"><strong>{exam.subject}</strong><span>{exam.className}</span></div>
                <div className="exam-date"><strong>{exam.date}</strong><span>{exam.days}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="workspace-card ai-insight-workspace">
          <div className="insight-glow" />
          <div className="insight-ai-icon"><BrainCircuit size={22} /></div>
          <div className="insight-content">
            <span>AI INTELLIGENCE</span>
            <h3>Today's academic signal</h3>
            <p>Class 9-B has a noticeable attendance-performance correlation worth reviewing.</p>
            <button onClick={() => onNavigate("ai")}>Ask SchoolMarks AI <ArrowRight size={15} /></button>
          </div>
        </div>

        <div className="workspace-card activity-card">
          <div className="workspace-card-head">
            <div><span>RECENT ACTIVITY</span><h3>Latest updates</h3></div>
            <button className="card-more"><MoreHorizontal size={18} /></button>
          </div>
          <div className="activity-list">
            {activities.slice(0, 3).map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div className="activity-item" key={activity.title}>
                  <div className={`activity-dot activity-${index}`}><Icon size={13} /></div>
                  <div><strong>{activity.title}</strong><span>{activity.time}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return students.filter(student => {
      const matchesQuery = student.name.toLowerCase().includes(query.toLowerCase()) || student.className.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || student.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="route-page">
      <PageHeader
        eyebrow="STUDENT MANAGEMENT"
        title="Students"
        description="Manage student records and monitor academic health."
        actions={<button className="workspace-primary"><Plus size={17} /> Add student</button>}
      />

      <div className="stat-grid compact">
        <StatCard icon={Users} label="Total students" value="1,248" change="+12.4%" />
        <StatCard icon={GraduationCap} label="Classes" value="36" change="+3" />
        <StatCard icon={UserCheck} label="Avg attendance" value="94.6%" change="+2.1%" />
        <StatCard icon={Target} label="Needs attention" value="18" change="-14.2%" />
      </div>

      <div className="workspace-card students-table-card">
        <div className="table-toolbar">
          <div className="table-search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students or classes..." /></div>
          <div className="toolbar-actions">
            <div className="filter-select">
              <Filter size={15} />
              <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option>All</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Attention</option>
                <option>At Risk</option>
              </select>
            </div>
            <button className="outline-button">Export <ArrowUpRight size={15} /></button>
          </div>
        </div>

        <div className="students-table-wrap">
          <table className="students-table">
            <thead><tr><th>Student</th><th>Class</th><th>Average</th><th>Attendance</th><th>Status</th><th /></tr></thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.name}>
                  <td><div className="table-student"><div className="table-avatar">{student.initials}</div><div><strong>{student.name}</strong><span>Student ID · SM-{student.initials}29</span></div></div></td>
                  <td>{student.className}</td>
                  <td><strong>{student.avg}%</strong></td>
                  <td><strong>{student.attendance}%</strong></td>
                  <td><span className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</span></td>
                  <td><button className="row-more"><MoreHorizontal size={18} /></button></td>
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
  const subjects = [
    ["Mathematics", "9 classes", "88%", "M. Ahmed"],
    ["Computer Science", "8 classes", "91%", "S. Khan"],
    ["Physics", "7 classes", "79%", "A. Raza"],
    ["English", "9 classes", "84%", "N. Fatima"],
    ["Urdu", "8 classes", "81%", "H. Ali"],
    ["Chemistry", "6 classes", "78%", "R. Hassan"]
  ];

  return (
    <div className="route-page">
      <PageHeader eyebrow="ACADEMIC MANAGEMENT" title="Academics" description="Your academic structure, organized and connected." actions={<button className="workspace-primary"><Plus size={17} /> Add subject</button>} />
      <div className="academic-grid">
        {subjects.map((subject, index) => (
          <div className="academic-card" key={subject[0]}>
            <div className="academic-card-top"><div className="academic-icon">{["∑", "⌘", "Φ", "A", "ا", "⚗"][index]}</div><button><MoreHorizontal size={17} /></button></div>
            <span>{subject[1]}</span>
            <h3>{subject[0]}</h3>
            <div className="academic-score"><strong>{subject[2]}</strong><small>average result</small></div>
            <div className="academic-teacher"><div>{subject[3].split(" ").map(x => x[0]).join("")}</div><span>{subject[3]}</span></div>
          </div>
        ))}
      </div>
      <div className="workspace-card">
        <div className="workspace-card-head"><div><span>ACADEMIC HEALTH</span><h3>Subject performance</h3></div></div>
        <div className="subject-bars">
          {subjects.map(subject => <div className="subject-bar-row" key={subject[0]}><span>{subject[0]}</span><div><i style={{ width: subject[2] }} /></div><strong>{subject[2]}</strong></div>)}
        </div>
      </div>
    </div>
  );
}

function ExamsPage() {
  return (
    <div className="route-page">
      <PageHeader eyebrow="EXAMINATIONS" title="Examination schedule" description="Plan, monitor and manage upcoming assessments." actions={<button className="workspace-primary"><Plus size={17} /> Create exam</button>} />
      <div className="exam-summary-grid">
        <StatCard icon={ClipboardCheck} label="Upcoming exams" value="12" change="+4" />
        <StatCard icon={CalendarDays} label="This month" value="8" change="+2" />
        <StatCard icon={Clock3} label="Completed" value="24" change="+18%" />
        <StatCard icon={Award} label="Results published" value="19" change="+22%" />
      </div>
      <div className="workspace-card">
        <div className="workspace-card-head"><div><span>EXAM CALENDAR</span><h3>Upcoming examinations</h3></div><button className="outline-button">Month <ChevronDown size={14} /></button></div>
        <div className="exam-timeline">
          {[
            ["18", "OCT", "Mathematics", "Class 9-A", "09:00 AM", "Hall A"],
            ["21", "OCT", "Computer Science", "Class 9-B", "10:30 AM", "Lab 02"],
            ["24", "OCT", "Physics", "Class 9-C", "09:00 AM", "Science Lab"],
            ["27", "OCT", "English", "Class 9-A", "11:00 AM", "Hall B"]
          ].map(item => (
            <div className="timeline-item" key={item[2]}>
              <div className="timeline-date"><strong>{item[0]}</strong><span>{item[1]}</span></div>
              <div className="timeline-line" />
              <div className="timeline-content"><div><strong>{item[2]}</strong><span>{item[3]}</span></div><span><Clock3 size={14} /> {item[4]}</span><span><Home size={14} /> {item[5]}</span><button><MoreHorizontal size={17} /></button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarksPage() {
  const markRows = [
    ["Ayaan Khan", "AK", "Mathematics", 92, 100, 92],
    ["Areeba Khan", "AK", "Computer Science", 96, 100, 96],
    ["Maham Ali", "MA", "English", 84, 100, 84],
    ["Hassan Raza", "HR", "Physics", 78, 100, 78],
    ["Rayyan Malik", "RM", "Mathematics", 64, 100, 64]
  ];

  return (
    <div className="route-page">
      <PageHeader eyebrow="MARKS & ASSESSMENTS" title="Marks" description="Enter, review and manage assessment marks." actions={<button className="workspace-primary"><Plus size={17} /> Enter marks</button>} />
      <div className="marks-hero">
        <div><span>CURRENT ASSESSMENT</span><h2>Mid Term Assessment · Class 9</h2><p>245 marks entered across 6 subjects.</p></div>
        <div className="marks-progress"><strong>86%</strong><span>completion</span><div><i /></div></div>
      </div>
      <div className="workspace-card students-table-card">
        <div className="table-toolbar"><div><span className="workspace-eyebrow">RECENT ENTRIES</span><h3>Assessment marks</h3></div><button className="outline-button"><Filter size={15} /> Filter</button></div>
        <div className="students-table-wrap"><table className="students-table"><thead><tr><th>Student</th><th>Subject</th><th>Marks</th><th>Out of</th><th>Percentage</th><th>Status</th></tr></thead><tbody>{markRows.map(row => <tr key={`${row[0]}-${row[2]}`}><td><div className="table-student"><div className="table-avatar">{row[1]}</div><strong>{row[0]}</strong></div></td><td>{row[2]}</td><td><strong>{row[3]}</strong></td><td>{row[4]}</td><td><strong>{row[5]}%</strong></td><td><span className="status-pill good">Verified</span></td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}

function ResultsPage() {
  return (
    <div className="route-page">
      <PageHeader eyebrow="RESULTS" title="Academic results" description="A clear view of how your school is performing." actions={<button className="workspace-primary"><FileText size={17} /> Generate report</button>} />
      <div className="results-hero">
        <div className="result-main-score"><span>OVERALL SCHOOL AVERAGE</span><strong>82.8%</strong><small><TrendingUp size={14} /> 4.8% improvement this term</small></div>
        <div className="result-rings"><ProgressRing value={83} label="Average" /><ProgressRing value={95} label="Pass rate" /></div>
      </div>
      <div className="results-grid">
        {[
          ["Class 9-A", "87.4%", "Excellent", "+6.2%"],
          ["Class 9-B", "76.8%", "Good", "+3.8%"],
          ["Class 9-C", "80.1%", "Good", "+4.1%"]
        ].map(item => <div className="result-class-card" key={item[0]}><div><span>{item[0]}</span><strong>{item[1]}</strong></div><div><b>{item[2]}</b><small>{item[3]} this term</small></div><div className="result-bar"><i style={{ width: item[1] }} /></div></div>)}
      </div>
    </div>
  );
}

function AttendancePage() {
  return (
    <div className="route-page">
      <PageHeader eyebrow="ATTENDANCE" title="Attendance intelligence" description="Monitor presence, patterns and students needing follow-up." actions={<button className="workspace-primary"><Check size={17} /> Record attendance</button>} />
      <div className="stat-grid">
        <StatCard icon={UserCheck} label="Present today" value="1,180" change="+2.1%" />
        <StatCard icon={Activity} label="Attendance rate" value="94.6%" change="+2.1%" />
        <StatCard icon={Clock3} label="Late arrivals" value="26" change="-8.4%" />
        <StatCard icon={Target} label="Below 80%" value="18" change="-14.2%" />
      </div>
      <div className="attendance-grid-page">
        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>DAILY BREAKDOWN</span><h3>Today's attendance</h3></div></div>
          <div className="big-attendance"><ProgressRing value={95} label="Present" /><div className="attendance-stats"><div><strong>1,180</strong><span>Present</span></div><div><strong>42</strong><span>Absent</span></div><div><strong>26</strong><span>Late</span></div></div></div>
        </div>
        <div className="workspace-card">
          <div className="workspace-card-head"><div><span>ATTENDANCE SIGNAL</span><h3>Classes to review</h3></div></div>
          <div className="class-attendance-list">{[["9-A", "97%", "Excellent"], ["9-B", "81%", "Attention"], ["9-C", "93%", "Good"]].map(item => <div className="class-attendance" key={item[0]}><div><strong>{item[0]}</strong><span>{item[2]}</span></div><div><strong>{item[1]}</strong><div className="small-progress"><i style={{ width: item[1] }} /></div></div></div>)}</div>
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  return (
    <div className="route-page">
      <PageHeader eyebrow="PERFORMANCE ANALYTICS" title="Performance" description="Understand trends across students, classes and subjects." actions={<button className="workspace-secondary"><RefreshCcw size={16} /> Recalculate</button>} />
      <div className="stat-grid">
        <StatCard icon={TrendingUp} label="Average score" value="82.8%" change="+4.8%" />
        <StatCard icon={Award} label="Top subject" value="91%" change="+7.2%" />
        <StatCard icon={Target} label="Improving" value="126" change="+18.4%" />
        <StatCard icon={TrendingDown} label="Declining" value="24" change="-11.6%" />
      </div>
      <div className="workspace-card large-performance">
        <div className="workspace-card-head"><div><span>ACADEMIC TREND</span><h3>School-wide performance</h3></div><button className="chart-filter">Last 6 months <ChevronDown size={14} /></button></div>
        <div className="large-chart"><MiniChart large /></div>
        <div className="performance-axis"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
      </div>
      <div className="workspace-card">
        <div className="workspace-card-head"><div><span>SUBJECT ANALYSIS</span><h3>Performance by subject</h3></div></div>
        <div className="subject-bars">{[["Computer Science", "91%"], ["Mathematics", "88%"], ["English", "84%"], ["Urdu", "81%"], ["Physics", "79%"], ["Chemistry", "78%"]].map(item => <div className="subject-bar-row" key={item[0]}><span>{item[0]}</span><div><i style={{ width: item[1] }} /></div><strong>{item[1]}</strong></div>)}</div>
      </div>
    </div>
  );
}

function generateAIAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("attendance") && q.includes("performance")) {
    return {
      title: "Attendance + performance signal",
      text: "The clearest students to review are Zayan Ahmed and Rayyan Malik. Both combine below-average performance with attendance below the school-wide level.",
      tags: ["2 students", "Attendance", "Performance"]
    };
  }

  if (q.includes("class 9") || q.includes("class 9-a") || q.includes("9-a")) {
    return {
      title: "Class 9 overview",
      text: "Class 9-A is currently averaging around 87%, with attendance at roughly 96%. The class is performing above the overall school average.",
      tags: ["87% average", "96% attendance", "9-A"]
    };
  }

  if (q.includes("top") || q.includes("best") || q.includes("highest")) {
    return {
      title: "Top performance signals",
      text: "Areeba Khan currently has the highest student average at 91%, followed by Ayaan Khan at 87%. Computer Science is the strongest subject at around 91%.",
      tags: ["Areeba · 91%", "Ayaan · 87%", "CS · 91%"]
    };
  }

  if (q.includes("risk") || q.includes("attention") || q.includes("weak")) {
    return {
      title: "Students needing review",
      text: "18 students are currently marked for review. Zayan Ahmed is the strongest immediate signal because both attendance and academic performance are below the school average.",
      tags: ["18 students", "Priority review", "Zayan Ahmed"]
    };
  }

  if (q.includes("exam") || q.includes("examination")) {
    return {
      title: "Upcoming examinations",
      text: "The next scheduled assessment is Mathematics for Class 9-A on 18 October. Computer Science follows on 21 October, then Physics on 24 October.",
      tags: ["18 Oct", "21 Oct", "24 Oct"]
    };
  }

  return {
    title: "SchoolMarks analysis",
    text: "Based on the current academic workspace, overall performance is 82.8%, attendance is 94.6%, and 18 students have been flagged for review. Try asking about a class, subject, attendance or students at risk.",
    tags: ["82.8% performance", "94.6% attendance", "18 flagged"]
  };
}

function AIMessage({ type, children }) {
  return (
    <div className={`ai-chat-message ${type}`}>
      <div className={`ai-chat-avatar ${type === "user" ? "user-chat-avatar" : ""}`}>
        {type === "user" ? "FK" : <BrainCircuit size={16} />}
      </div>
      <div className="ai-chat-bubble">{children}</div>
    </div>
  );
}

function AIPage() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      title: "Welcome to SchoolMarks Intelligence",
      text: "Ask me anything about your academic workspace. I can help you explore students, attendance, marks, results and performance.",
      tags: ["Students", "Attendance", "Performance"]
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = [
    "Which students need attention?",
    "How is Class 9-A performing?",
    "What are the upcoming exams?",
    "Which subject is performing best?"
  ];

  const sendMessage = question => {
    const text = question.trim();
    if (!text || typing) return;

    setMessages(prev => [...prev, { type: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const answer = generateAIAnswer(text);
      setMessages(prev => [...prev, { type: "ai", ...answer }]);
      setTyping(false);
    }, 650);
  };

  const clearChat = () => {
    setMessages([
      {
        type: "ai",
        title: "Fresh conversation",
        text: "Ready. Ask me a question about your school data.",
        tags: ["Ready", "Academic data"]
      }
    ]);
  };

  return (
    <div className="route-page ai-route">
      <div className="ai-page-header">
        <div>
          <span className="workspace-eyebrow">SCHOOLMARKS INTELLIGENCE</span>
          <h1>Ask your academic data.</h1>
          <p>Explore your school through natural language questions.</p>
        </div>
        <div className="ai-page-actions">
          <button className="workspace-secondary" onClick={clearChat}><RefreshCcw size={16} /> New chat</button>
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-large-icon"><BrainCircuit size={22} /></div>
              <div><strong>SchoolMarks AI</strong><span><i /> Connected to workspace</span></div>
            </div>
            <button className="icon-button"><MoreHorizontal size={18} /></button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              message.type === "user" ? (
                <AIMessage type="user" key={index}><p>{message.text}</p></AIMessage>
              ) : (
                <AIMessage type="ai" key={index}>
                  <span className="ai-answer-title">{message.title}</span>
                  <p>{message.text}</p>
                  <div className="answer-tags">{message.tags?.map(tag => <span key={tag}>{tag}</span>)}</div>
                </AIMessage>
              )
            ))}

            {typing && (
              <AIMessage type="ai">
                <div className="typing-bubble"><i /><i /><i /></div>
              </AIMessage>
            )}
          </div>

          <div className="ai-suggestions">
            {suggestions.map(suggestion => <button key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}<ArrowUpRight size={14} /></button>)}
          </div>

          <div className="ai-input-area">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask about students, marks, attendance or performance..."
              rows="1"
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing}><Send size={18} /></button>
          </div>
          <div className="ai-input-footer"><span>Press Enter to send</span><span>SchoolMarks Intelligence · Frontend demo</span></div>
        </div>

        <aside className="ai-side-panel">
          <div className="ai-side-card ai-side-intro">
            <div className="ai-side-icon"><Sparkles size={19} /></div>
            <span>SMART EXPLORATION</span>
            <h3>Ask better questions.</h3>
            <p>You can ask follow-up questions and keep the whole conversation in one place.</p>
          </div>

          <div className="ai-side-card">
            <span className="side-card-label">LIVE METRICS</span>
            <div className="ai-metric"><span>Students</span><strong>1,248</strong></div>
            <div className="ai-metric"><span>Attendance</span><strong>94.6%</strong></div>
            <div className="ai-metric"><span>Performance</span><strong>82.8%</strong></div>
            <div className="ai-metric"><span>Review signals</span><strong>18</strong></div>
          </div>

          <div className="ai-side-card popular-questions">
            <span className="side-card-label">TRY ASKING</span>
            <button onClick={() => sendMessage("Which students have low attendance?")}>Students with low attendance <ArrowRight size={14} /></button>
            <button onClick={() => sendMessage("Which subject is performing best?")}>Best performing subject <ArrowRight size={14} /></button>
            <button onClick={() => sendMessage("How is Class 9-A performing?")}>Class 9-A overview <ArrowRight size={14} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AccessModal({ mode, onClose, onEnter }) {
  if (!mode) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="access-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={19} /></button>
        <div className="modal-logo"><Sparkles size={20} /></div>
        <span className="eyebrow">SCHOOLMARKS</span>
        <h2>{mode === "login" ? "Welcome back." : "Explore the workspace."}</h2>
        <p>{mode === "login" ? "Enter the demo workspace and explore your academic dashboard." : "This frontend demo lets you explore the full SchoolMarks experience."}</p>
        <button className="primary-button large modal-button" onClick={onEnter}>
          Open dashboard <ArrowRight size={17} />
        </button>
        <small>No account required for this demo.</small>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(null);

  const navigate = nextPage => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const enterDashboard = () => {
    setModal(null);
    navigate("dashboard");
  };

  if (page === "home") {
    return (
      <>
        <HomePage onNavigate={navigate} onAccess={setModal} />
        <AccessModal mode={modal} onClose={() => setModal(null)} onEnter={enterDashboard} />
      </>
    );
  }

  let content = <DashboardPage onNavigate={navigate} />;

  if (page === "students") content = <StudentsPage />;
  if (page === "academics") content = <AcademicsPage />;
  if (page === "exams") content = <ExamsPage />;
  if (page === "marks") content = <MarksPage />;
  if (page === "results") content = <ResultsPage />;
  if (page === "attendance") content = <AttendancePage />;
  if (page === "performance") content = <PerformancePage />;
  if (page === "ai") content = <AIPage />;

  return (
    <AppLayout page={page} onNavigate={navigate} onBack={() => navigate("home")}>
      {content}
    </AppLayout>
  );
}