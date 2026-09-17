import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
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
  MessageCircle,
  MoreHorizontal,
  Plus,
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
  { name: "Ayaan Khan", className: "9-A", avg: 87, attendance: 96, status: "Excellent", initials: "AK" },
  { name: "Zayan Ahmed", className: "9-B", avg: 51, attendance: 73, status: "At Risk", initials: "ZA" },
  { name: "Maham Ali", className: "9-A", avg: 82, attendance: 91, status: "Good", initials: "MA" },
  { name: "Hassan Raza", className: "9-C", avg: 76, attendance: 88, status: "Good", initials: "HR" },
  { name: "Areeba Khan", className: "9-B", avg: 91, attendance: 98, status: "Excellent", initials: "AK" },
  { name: "Rayyan Malik", className: "9-C", avg: 64, attendance: 79, status: "Attention", initials: "RM" }
];

const subjects = [
  { name: "Mathematics", score: 88, color: "green" },
  { name: "Computer Science", score: 94, color: "dark" },
  { name: "English", score: 82, color: "light" },
  { name: "Physics", score: 79, color: "green" },
  { name: "Chemistry", score: 85, color: "dark" }
];

const exams = [
  { title: "Computer Science", date: "18 Oct", room: "Lab 02", type: "Mid Term" },
  { title: "Mathematics", date: "21 Oct", room: "Room 14", type: "Mid Term" },
  { title: "English", date: "24 Oct", room: "Room 09", type: "Written" },
  { title: "Physics", date: "28 Oct", room: "Lab 01", type: "Practical" }
];

const activity = [
  { text: "Areeba Khan scored 96% in Mathematics", time: "8 min ago", type: "success" },
  { text: "Attendance recorded for Class 9-B", time: "24 min ago", type: "attendance" },
  { text: "Physics assessment uploaded", time: "42 min ago", type: "exam" },
  { text: "AI detected 4 students needing attention", time: "1 hr ago", type: "ai" }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: FileText },
  { id: "marks", label: "Marks", icon: ClipboardCheck },
  { id: "results", label: "Results", icon: Award },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: LineChart },
  { id: "ai", label: "AI Intelligence", icon: BrainCircuit }
];

const modules = [
  {
    number: "01",
    icon: Users,
    title: "Student Management",
    text: "Keep every student record organized, searchable and ready when you need it."
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Academic Management",
    text: "Structure classes, subjects and academic information from one clean workspace."
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Marks & Results",
    text: "Enter marks, calculate performance and turn raw scores into useful information."
  },
  {
    number: "04",
    icon: CalendarDays,
    title: "Attendance",
    text: "Track attendance patterns and instantly spot students who need attention."
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Performance Analytics",
    text: "Understand class trends, subject performance and individual progress."
  },
  {
    number: "06",
    icon: BrainCircuit,
    title: "AI Intelligence",
    text: "Ask questions about your academic data and get instant, contextual insights."
  }
];

function Logo({ dark = false }) {
  return (
    <div className={`brand ${dark ? "brand-dark" : ""}`}>
      <div className="brand-mark">
        <span>SM</span>
        <img src="/logo/schoolmarks-logo.png" alt="" />
      </div>
      <div>
        <strong>SchoolMarks</strong>
        <small>Academic Intelligence</small>
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function MiniChart({ height = 130 }) {
  const points = "0,92 28,76 56,82 84,55 112,66 140,38 168,48 196,20 224,32 252,10";
  return (
    <div className="mini-chart" style={{ height }}>
      <div className="chart-grid">
        <span />
        <span />
        <span />
        <span />
      </div>
      <svg viewBox="0 0 252 105" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity=".22" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,105 ${points} 252,105`}
          fill="url(#chartGradient)"
          className="chart-fill"
        />
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="chart-labels">
        <span>Sep 01</span>
        <span>Sep 08</span>
        <span>Sep 15</span>
        <span>Sep 22</span>
        <span>Sep 30</span>
      </div>
    </div>
  );
}

function ProgressRing({ value }) {
  return (
    <div className="progress-ring" style={{ "--progress": `${value * 3.6}deg` }}>
      <div className="ring-inner">
        <strong>{value}%</strong>
        <span>Attendance</span>
      </div>
    </div>
  );
}

function LandingPreview({ onNavigate }) {
  return (
    <div className="hero-product">
      <div className="product-glow" />
      <div className="product-window">
        <div className="browser-bar">
          <div className="browser-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="browser-url">app.schoolmarks.local / overview</div>
          <div className="browser-status">
            <span />
            Live
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
              Overview
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
              AI
            </div>

            <div className="preview-sidebar-bottom">
              <div className="preview-user">FK</div>
              <span>Admin Workspace</span>
            </div>
          </aside>

          <div className="product-main">
            <div className="preview-heading">
              <div>
                <span>MONDAY, 12 OCTOBER</span>
                <h3>Good morning, Faizan.</h3>
              </div>
              <button onClick={() => onNavigate("ai")} className="preview-ai-button">
                <Sparkles size={12} />
                Ask AI
              </button>
            </div>

            <div className="preview-stats">
              <div className="preview-stat">
                <span>Total Students</span>
                <strong>1,284</strong>
                <small><TrendingUp size={10} /> 8.4%</small>
              </div>
              <div className="preview-stat">
                <span>Average Score</span>
                <strong>82.6%</strong>
                <small><TrendingUp size={10} /> 4.2%</small>
              </div>
              <div className="preview-stat">
                <span>Attendance</span>
                <strong>93.8%</strong>
                <small><TrendingUp size={10} /> 2.1%</small>
              </div>
            </div>

            <div className="preview-grid">
              <div className="dashboard-card chart-card">
                <div className="card-head">
                  <div>
                    <span>Academic performance</span>
                    <strong>Class average</strong>
                  </div>
                  <button><MoreHorizontal size={15} /></button>
                </div>
                <div className="chart-number">
                  <strong>82.6%</strong>
                  <span>+6.8% this term</span>
                </div>
                <MiniChart />
              </div>

              <div className="dashboard-card attendance-card">
                <div className="card-head">
                  <div>
                    <span>Attendance overview</span>
                    <strong>This month</strong>
                  </div>
                  <button><MoreHorizontal size={15} /></button>
                </div>
                <div className="attendance-content">
                  <ProgressRing value={93} />
                  <div className="attendance-meta">
                    <div><i className="dot green-dot" /> Present <strong>1,196</strong></div>
                    <div><i className="dot orange-dot" /> Late <strong>54</strong></div>
                    <div><i className="dot gray-dot" /> Absent <strong>34</strong></div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card table-card">
                <div className="card-head">
                  <div>
                    <span>Student performance</span>
                    <strong>Recently updated</strong>
                  </div>
                  <button onClick={() => onNavigate("students")}>View all <ArrowUpRight size={13} /></button>
                </div>

                <div className="preview-student-list">
                  {students.slice(0, 4).map(student => (
                    <div className="preview-student" key={student.name}>
                      <div className="student-avatar">{student.initials}</div>
                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.className}</span>
                      </div>
                      <b>{student.avg}%</b>
                      <span className={`mini-status ${student.status === "At Risk" ? "danger" : ""}`}>
                        {student.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-card intelligence-card">
                <div className="ai-card-orb"><BrainCircuit size={20} /></div>
                <div className="ai-heading">
                  <span>SchoolMarks AI</span>
                  <strong>One question away from an insight.</strong>
                </div>
                <p>“Which students have declining performance?”</p>
                <button onClick={() => onNavigate("ai")}>
                  Explore intelligence <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <div className="site">
      <header className="public-nav">
        <div className="container nav-inner">
          <Logo />
          <nav className="nav-links">
            <a href="#product">Product</a>
            <a href="#modules">Modules</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#workflow">How it works</a>
          </nav>
          <div className="nav-actions">
            <button className="nav-ai" onClick={() => onNavigate("ai")}>
              <BrainCircuit size={15} />
              AI Workspace
            </button>
            <button className="nav-button" onClick={() => onNavigate("dashboard")}>
              Open workspace <ArrowRight size={15} />
            </button>
          </div>
          <button className="mobile-public-menu">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <span className="eyebrow-pulse" />
                A smarter academic workspace
                <ArrowUpRight size={13} />
              </div>

              <h1>
                Turn school data into
                <span> better decisions.</span>
              </h1>

              <p>
                SchoolMarks brings students, academics, attendance, examinations,
                results and AI-powered intelligence into one beautifully simple workspace.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={() => onNavigate("dashboard")}>
                  Explore SchoolMarks <ArrowRight size={17} />
                </button>
                <a className="secondary-button" href="#product">
                  See how it works <ChevronRight size={16} />
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <Check size={14} />
                  No setup complexity
                </div>
                <div className="trust-item">
                  <Check size={14} />
                  Built for schools
                </div>
                <div className="trust-item">
                  <Check size={14} />
                  AI-ready insights
                </div>
              </div>
            </div>

            <LandingPreview onNavigate={onNavigate} />
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-strip-inner">
            <span>ONE WORKSPACE FOR THE WHOLE ACADEMIC JOURNEY</span>
            <div className="trust-marquee">
              <strong>Students</strong>
              <i>•</i>
              <strong>Academics</strong>
              <i>•</i>
              <strong>Attendance</strong>
              <i>•</i>
              <strong>Examinations</strong>
              <i>•</i>
              <strong>Results</strong>
              <i>•</i>
              <strong>Intelligence</strong>
            </div>
          </div>
        </section>

        <section className="problem-section section">
          <div className="container problem-layout">
            <Reveal className="problem-copy">
              <div className="eyebrow">THE PROBLEM</div>
              <h2>
                Your school's data
                <span> shouldn't be scattered.</span>
              </h2>
              <p>
                Attendance in one place. Marks somewhere else. Student records in
                spreadsheets. Insights stuck inside someone's head.
              </p>
              <p>
                SchoolMarks connects those pieces so your team can focus on the
                students — not the paperwork.
              </p>
              <button className="text-link" onClick={() => onNavigate("dashboard")}>
                See the workspace <ArrowRight size={15} />
              </button>
            </Reveal>

            <Reveal className="problem-visual">
              <div className="scattered-card card-a">
                <div className="scatter-icon"><FileText size={17} /></div>
                <div>
                  <strong>Marks.xlsx</strong>
                  <span>Updated 2 hours ago</span>
                </div>
                <MoreHorizontal size={15} />
              </div>
              <div className="scattered-card card-b">
                <div className="scatter-icon"><CalendarDays size={17} /></div>
                <div>
                  <strong>Attendance</strong>
                  <span>93.8% average</span>
                </div>
                <MoreHorizontal size={15} />
              </div>
              <div className="scattered-card card-c">
                <div className="scatter-icon"><Users size={17} /></div>
                <div>
                  <strong>Student Records</strong>
                  <span>1,284 students</span>
                </div>
                <MoreHorizontal size={15} />
              </div>
              <div className="convergence">
                <div className="convergence-line line-one" />
                <div className="convergence-line line-two" />
                <div className="convergence-line line-three" />
                <div className="convergence-core">
                  <div>SM</div>
                  <span>One source<br />of truth</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="product" className="solution-section section">
          <div className="container">
            <Reveal className="section-heading center">
              <div className="eyebrow">THE SCHOOLMARKS WORKSPACE</div>
              <h2>Everything important.<br /><span>One calm workspace.</span></h2>
              <p>
                Designed to feel simple even when the data behind it is complex.
              </p>
            </Reveal>

            <Reveal className="dashboard-showcase">
              <div className="showcase-top">
                <div>
                  <span>ACADEMIC COMMAND CENTER</span>
                  <strong>A clear view of what is happening today.</strong>
                </div>
                <button onClick={() => onNavigate("dashboard")}>
                  Open dashboard <ArrowUpRight size={15} />
                </button>
              </div>
              <div className="showcase-content">
                <div className="showcase-sidebar">
                  <div className="showcase-sidebar-logo">SM</div>
                  {["Overview", "Students", "Academics", "Results", "Analytics", "AI"].map((item, index) => (
                    <div key={item} className={`showcase-sidebar-item ${index === 0 ? "active" : ""}`}>
                      <span />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="showcase-dashboard">
                  <div className="showcase-welcome">
                    <div>
                      <small>MONDAY · 08:42 AM</small>
                      <h3>Your school at a glance.</h3>
                    </div>
                    <div className="showcase-avatar">FK</div>
                  </div>
                  <div className="showcase-kpis">
                    <div><span>Students</span><strong>1,284</strong><em>+8.4%</em></div>
                    <div><span>Avg. Score</span><strong>82.6%</strong><em>+4.2%</em></div>
                    <div><span>Attendance</span><strong>93.8%</strong><em>+2.1%</em></div>
                    <div><span>At Risk</span><strong>24</strong><em className="red">−6</em></div>
                  </div>
                  <div className="showcase-lower">
                    <div className="showcase-chart">
                      <div className="showcase-card-title">
                        <span>Performance trend</span>
                        <b>Last 30 days</b>
                      </div>
                      <MiniChart height={170} />
                    </div>
                    <div className="showcase-ai">
                      <div className="ai-orbit">
                        <BrainCircuit size={22} />
                      </div>
                      <span>AI SIGNAL</span>
                      <strong>4 students may need support.</strong>
                      <p>Performance dropped more than 10% over the last three assessments.</p>
                      <button onClick={() => onNavigate("ai")}>Investigate signal <ArrowRight size={13} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="modules" className="modules-section section">
          <div className="container">
            <Reveal className="section-heading">
              <div className="eyebrow">ONE SYSTEM. SIX CORE AREAS.</div>
              <h2>Built around how schools<br /><span>actually work.</span></h2>
            </Reveal>

            <div className="module-grid">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Reveal key={module.number} className="module-card" style={{ "--delay": `${index * 60}ms` }}>
                    <div className="module-number">{module.number}</div>
                    <div className="module-icon"><Icon size={20} /></div>
                    <h3>{module.title}</h3>
                    <p>{module.text}</p>
                    <button onClick={() => onNavigate(module.title === "AI Intelligence" ? "ai" : "dashboard")}>
                      Explore <ArrowUpRight size={14} />
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="workflow" className="workflow-section section">
          <div className="container">
            <div className="workflow-stage">
              <Reveal className="workflow-copy">
                <div className="eyebrow">A SIMPLE WORKFLOW</div>
                <h2>From raw data to<br /><span>real insight.</span></h2>
                <p>
                  SchoolMarks connects every stage of the academic workflow so
                  information doesn't disappear between departments.
                </p>
                <div className="workflow-steps">
                  {[
                    ["01", "Capture", "Students, marks and attendance."],
                    ["02", "Understand", "Analytics reveal patterns."],
                    ["03", "Act", "AI helps you decide what to look at next."]
                  ].map(item => (
                    <div className="workflow-step" key={item[0]}>
                      <div>{item[0]}</div>
                      <span><strong>{item[1]}</strong>{item[2]}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="workflow-product">
                <div className="workflow-floating-card floating-one">
                  <TrendingUp size={15} />
                  <div><strong>+12.4%</strong><span>Class performance</span></div>
                </div>
                <div className="workflow-floating-card floating-two">
                  <BrainCircuit size={15} />
                  <div><strong>AI Signal</strong><span>3 patterns detected</span></div>
                </div>
                <div className="workflow-dashboard">
                  <div className="workflow-header">
                    <span>Performance intelligence</span>
                    <span className="live-dot">LIVE</span>
                  </div>
                  <div className="workflow-big-number">82.6%</div>
                  <div className="workflow-label">Overall academic performance</div>
                  <MiniChart height={150} />
                  <div className="workflow-bars">
                    {subjects.slice(0, 4).map(subject => (
                      <div key={subject.name}>
                        <span>{subject.name}</span>
                        <div><i style={{ width: `${subject.score}%` }} /></div>
                        <b>{subject.score}%</b>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="intelligence" className="intelligence-section section">
          <div className="container">
            <Reveal className="intelligence-header">
              <div>
                <div className="eyebrow">SCHOOLMARKS AI</div>
                <h2>Don't just store data.<br /><span>Talk to it.</span></h2>
              </div>
              <button className="primary-button compact" onClick={() => onNavigate("ai")}>
                Open AI workspace <ArrowRight size={15} />
              </button>
            </Reveal>

            <Reveal className="intelligence-demo">
              <div className="assistant-top">
                <div className="assistant-brand">
                  <div className="assistant-icon"><BrainCircuit size={19} /></div>
                  <div>
                    <strong>SchoolMarks Intelligence</strong>
                    <span>Academic data assistant</span>
                  </div>
                </div>
                <div className="assistant-status"><i /> Ready</div>
              </div>

              <div className="assistant-content">
                <div className="assistant-copy">
                  <span>ASK ANYTHING</span>
                  <h3>Your data can answer<br />more than reports can.</h3>
                  <p>
                    Ask questions in normal language. Explore attendance,
                    performance, marks and student patterns.
                  </p>
                  <div className="ai-tags">
                    <span>Performance</span>
                    <span>Attendance</span>
                    <span>Results</span>
                    <span>Students</span>
                  </div>
                </div>

                <div className="assistant-panel">
                  <div className="assistant-messages">
                    <div className="assistant-message user-message">
                      <div className="message-avatar user-avatar">FK</div>
                      <div>
                        <span>YOU</span>
                        <p>Which students have declining performance?</p>
                      </div>
                    </div>
                    <div className="assistant-message result-message">
                      <div className="message-avatar"><BrainCircuit size={14} /></div>
                      <div>
                        <span>SCHOOLMARKS AI</span>
                        <p>I found <b>4 students</b> whose average score has declined by more than 10% across their last three assessments.</p>
                        <div className="result-stats">
                          <div><strong>4</strong><span>Students</span></div>
                          <div><strong>−12.8%</strong><span>Avg decline</span></div>
                          <div><strong>3</strong><span>Subjects</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="assistant-input">
                    <span>Ask SchoolMarks anything...</span>
                    <button onClick={() => onNavigate("ai")}><Send size={14} /></button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="analytics-section section">
          <div className="container analytics-layout">
            <Reveal className="analytics-copy">
              <div className="eyebrow">EARLY SIGNALS</div>
              <h2>See what needs<br /><span>attention sooner.</span></h2>
              <p>
                SchoolMarks doesn't wait for the end of the term to tell you
                what happened. Trends and signals help you notice changes while
                there's still time to act.
              </p>

              <div className="signal-list">
                <div>
                  <div className="signal-icon"><TrendingDown size={15} /></div>
                  <span><strong>Performance drops</strong> identify students whose results are slipping.</span>
                </div>
                <div>
                  <div className="signal-icon"><Clock3 size={15} /></div>
                  <span><strong>Attendance patterns</strong> highlight repeated absences and lateness.</span>
                </div>
                <div>
                  <div className="signal-icon"><Target size={15} /></div>
                  <span><strong>Subject gaps</strong> show where classes need more support.</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="analytics-visual">
              <div className="analytics-main-card">
                <div className="analytics-card-head">
                  <div><span>CLASS PERFORMANCE</span><strong>9th Grade</strong></div>
                  <div className="analytics-period">This term <ChevronRight size={13} /></div>
                </div>
                <div className="analytics-number">
                  <strong>82.6%</strong>
                  <span><TrendingUp size={14} /> 6.8%</span>
                </div>
                <MiniChart height={190} />
                <div className="analytics-subjects">
                  {subjects.map(subject => (
                    <div key={subject.name}>
                      <span>{subject.name}</span>
                      <div><i style={{ width: `${subject.score}%` }} /></div>
                      <b>{subject.score}%</b>
                    </div>
                  ))}
                </div>
              </div>
              <div className="analytics-float float-top">
                <span>AI SIGNAL</span>
                <strong>Performance improving</strong>
                <small>3 consecutive weeks</small>
              </div>
              <div className="analytics-float float-bottom">
                <Award size={15} />
                <div><strong>Top performer</strong><span>Areeba Khan · 91%</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="roadmap-section section">
          <div className="container">
            <Reveal className="section-heading center">
              <div className="eyebrow">THE ACADEMIC JOURNEY</div>
              <h2>One flow. <span>Every stage connected.</span></h2>
            </Reveal>

            <div className="roadmap-grid">
              {[
                ["01", "Students", Users, "Know who is in your school."],
                ["02", "Academics", BookOpen, "Organize classes and subjects."],
                ["03", "Assessment", ClipboardCheck, "Capture marks and results."],
                ["04", "Intelligence", BrainCircuit, "Understand what the data means."]
              ].map(([num, title, Icon, text], index) => (
                <Reveal className="roadmap-card" key={title}>
                  <div className="roadmap-line">
                    <span>{num}</span>
                    {index !== 3 && <i />}
                  </div>
                  <Icon size={22} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <Reveal className="cta-box">
              <div className="cta-copy">
                <div className="eyebrow">READY WHEN YOU ARE</div>
                <h2>Make academic data<br /><span>work harder.</span></h2>
                <p>
                  Explore the SchoolMarks workspace and see how a modern
                  academic system can feel.
                </p>
                <button className="primary-button" onClick={() => onNavigate("dashboard")}>
                  Enter the workspace <ArrowRight size={16} />
                </button>
              </div>
              <div className="cta-product">
                <div className="cta-mini-card">
                  <div className="cta-mini-icon"><BrainCircuit size={16} /></div>
                  <span>AI insight</span>
                  <strong>4 students need attention</strong>
                  <small>Detected from recent performance changes</small>
                </div>
                <div className="cta-mini-line" />
                <div className="cta-mini-card second">
                  <div className="cta-mini-icon"><TrendingUp size={16} /></div>
                  <span>Performance</span>
                  <strong>82.6% class average</strong>
                  <small>+6.8% compared with last month</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo dark />
          <div className="footer-links">
            <a href="#product">Product</a>
            <a href="#modules">Modules</a>
            <a href="#intelligence">AI</a>
            <a href="#workflow">Workflow</a>
          </div>
          <span>Academic intelligence, simplified.</span>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, open }) {
  return (
    <>
      <div className={`sidebar-overlay ${open ? "show" : ""}`} />
      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand">
          <Logo />
        </div>

        <div className="sidebar-school">
          <div className="school-avatar">JS</div>
          <div>
            <strong>JEB School</strong>
            <span>Academic Workspace</span>
          </div>
          <ChevronRight size={14} />
        </div>

        <div className="sidebar-section">
          <span>WORKSPACE</span>
          {navItems.slice(0, 8).map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-link ${page === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === "performance" && <em>NEW</em>}
              </button>
            );
          })}
        </div>

        <div className="sidebar-section ai-section">
          <span>INTELLIGENCE</span>
          <button
            className={`sidebar-link ai-link ${page === "ai" ? "active" : ""}`}
            onClick={() => setPage("ai")}
          >
            <div className="ai-sidebar-icon"><BrainCircuit size={17} /></div>
            <span>SchoolMarks AI</span>
            <Sparkles size={13} />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-link">
            <Settings size={17} />
            <span>Workspace settings</span>
          </button>
          <div className="sidebar-user">
            <div className="profile-avatar">FK</div>
            <div>
              <strong>Faizan Khan</strong>
              <span>Administrator</span>
            </div>
            <MoreHorizontal size={16} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ page, setPage, onMenu }) {
  const title = navItems.find(item => item.id === page)?.label || "Overview";

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu}><Menu size={21} /></button>
        <div className="breadcrumb">
          <span>SchoolMarks</span>
          <ChevronRight size={13} />
          <strong>{title}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <Search size={15} />
          <span>Search anything</span>
          <kbd>⌘ K</kbd>
        </div>
        <button className="icon-button">
          <Bell size={17} />
          <i className="notification" />
        </button>
        <button className="topbar-ai" onClick={() => setPage("ai")}>
          <BrainCircuit size={15} />
          Ask AI
        </button>
      </div>
    </header>
  );
}

function StatCard({ label, value, change, icon: Icon, negative = false, meta }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon"><Icon size={18} /></div>
        <button><MoreHorizontal size={15} /></button>
      </div>
      <span>{label}</span>
      <div className="stat-value-row">
        <strong>{value}</strong>
        <small className={negative ? "negative" : ""}>
          {negative ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
          {change}
        </small>
      </div>
      <p>{meta}</p>
    </div>
  );
}

function DashboardPage({ setPage }) {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">MONDAY · 12 OCTOBER 2026</span>
          <h1>Good morning, Faizan.</h1>
          <p>Here's what is happening across your academic workspace today.</p>
        </div>
        <div className="workspace-actions">
          <button className="workspace-secondary"><RefreshCcw size={15} /> Refresh</button>
          <button className="workspace-primary" onClick={() => setPage("ai")}><Sparkles size={15} /> Ask SchoolMarks AI</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Students" value="1,284" change="+8.4%" icon={Users} meta="Compared with last term" />
        <StatCard label="Average Score" value="82.6%" change="+4.2%" icon={BarChart3} meta="Across all active classes" />
        <StatCard label="Attendance" value="93.8%" change="+2.1%" icon={UserCheck} meta="Current monthly average" />
        <StatCard label="Students at Risk" value="24" change="−6" icon={Target} negative meta="Needs review this week" />
      </div>

      <div className="dashboard-main-grid">
        <div className="workspace-card performance-card">
          <div className="workspace-card-head">
            <div>
              <span>ACADEMIC PERFORMANCE</span>
              <h3>Performance trend</h3>
            </div>
            <div className="chart-filter">Last 30 days <ChevronRight size={13} /></div>
          </div>
          <div className="performance-summary">
            <div><strong>82.6%</strong><span><TrendingUp size={13} /> 6.8% vs previous period</span></div>
            <div className="performance-legend"><i /> Class average</div>
          </div>
          <MiniChart height={255} />
        </div>

        <div className="workspace-card attendance-workspace">
          <div className="workspace-card-head">
            <div>
              <span>ATTENDANCE</span>
              <h3>Today's attendance</h3>
            </div>
            <button className="card-more"><MoreHorizontal size={16} /></button>
          </div>
          <div className="attendance-layout">
            <ProgressRing value={93} />
            <div className="attendance-breakdown">
              <div><span><i className="legend-dot present" /> Present</span><strong>1,196</strong></div>
              <div><span><i className="legend-dot late" /> Late</span><strong>54</strong></div>
              <div><span><i className="legend-dot absent" /> Absent</span><strong>34</strong></div>
            </div>
          </div>
          <button className="outline-button" onClick={() => setPage("attendance")}>View attendance <ArrowUpRight size={14} /></button>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="workspace-card students-card">
          <div className="workspace-card-head">
            <div>
              <span>STUDENT PERFORMANCE</span>
              <h3>Recently updated</h3>
            </div>
            <button className="text-button" onClick={() => setPage("students")}>View all <ArrowRight size={14} /></button>
          </div>
          <div className="student-table">
            {students.slice(0, 5).map(student => (
              <div className="student-row" key={student.name}>
                <div className="table-student">
                  <div className="table-avatar">{student.initials}</div>
                  <div><strong>{student.name}</strong><span>{student.className}</span></div>
                </div>
                <div className="score-cell"><strong>{student.avg}%</strong><span>Average</span></div>
                <div className="score-cell"><strong>{student.attendance}%</strong><span>Attendance</span></div>
                <span className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</span>
                <button className="row-more"><MoreHorizontal size={15} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="workspace-card upcoming-card">
          <div className="workspace-card-head">
            <div>
              <span>UPCOMING</span>
              <h3>Examinations</h3>
            </div>
            <button className="card-more"><MoreHorizontal size={16} /></button>
          </div>
          <div className="exam-list">
            {exams.slice(0, 3).map(exam => (
              <div className="exam-item" key={exam.title}>
                <div className="exam-icon"><FileText size={16} /></div>
                <div className="exam-info">
                  <strong>{exam.title}</strong>
                  <span>{exam.type} · {exam.room}</span>
                </div>
                <div className="exam-date">{exam.date}</div>
              </div>
            ))}
          </div>
          <button className="outline-button" onClick={() => setPage("exams")}>View schedule <ArrowUpRight size={14} /></button>
        </div>
      </div>

      <div className="ai-insight-workspace">
        <div className="insight-glow" />
        <div className="insight-ai-icon"><BrainCircuit size={23} /></div>
        <div className="insight-content">
          <span>AI SIGNAL · UPDATED 8 MIN AGO</span>
          <strong>4 students may need academic support.</strong>
          <p>SchoolMarks detected a decline of more than 10% across recent assessments.</p>
        </div>
        <button onClick={() => setPage("ai")}>Investigate signal <ArrowRight size={15} /></button>
      </div>

      <div className="workspace-card activity-card">
        <div className="workspace-card-head">
          <div>
            <span>ACTIVITY</span>
            <h3>Recent activity</h3>
          </div>
          <button className="card-more"><MoreHorizontal size={16} /></button>
        </div>
        <div className="activity-list">
          {activity.map(item => (
            <div className="activity-item" key={item.text}>
              <div className={`activity-dot activity-${item.type}`} />
              <div><strong>{item.text}</strong><span>{item.time}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return students.filter(student => {
      const matchSearch = student.name.toLowerCase().includes(search.toLowerCase()) || student.className.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || student.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">STUDENT DIRECTORY</span>
          <h1>Students</h1>
          <p>Manage and explore every student record from one place.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Add student</button>
      </div>

      <div className="page-kpis">
        <div><span>Total students</span><strong>1,284</strong><small>Across 24 classes</small></div>
        <div><span>Excellent</span><strong>418</strong><small>32.5% of students</small></div>
        <div><span>Need attention</span><strong>24</strong><small>Review recommended</small></div>
        <div><span>Attendance</span><strong>93.8%</strong><small>School average</small></div>
      </div>

      <div className="workspace-card full-card">
        <div className="table-toolbar">
          <div className="table-search">
            <Search size={15} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." />
          </div>
          <div className="table-filters">
            {["All", "Excellent", "Good", "Attention", "At Risk"].map(item => (
              <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
            ))}
            <button><Filter size={14} /> Filters</button>
          </div>
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
                  <td><div className="table-student"><div className="table-avatar">{student.initials}</div><div><strong>{student.name}</strong><span>Student ID · SM-20{student.avg}</span></div></div></td>
                  <td>{student.className}</td>
                  <td><strong>{student.avg}%</strong></td>
                  <td>{student.attendance}%</td>
                  <td><span className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</span></td>
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
          <span className="workspace-eyebrow">ACADEMIC STRUCTURE</span>
          <h1>Academics</h1>
          <p>Classes, subjects and academic structure at a glance.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Add subject</button>
      </div>

      <div className="academic-grid">
        {[
          ["Mathematics", "12 classes", "88% average", BarChart3],
          ["Computer Science", "8 classes", "94% average", BrainCircuit],
          ["English", "12 classes", "82% average", BookOpen],
          ["Physics", "9 classes", "79% average", Activity],
          ["Chemistry", "9 classes", "85% average", Zap],
          ["Urdu", "10 classes", "86% average", FileText]
        ].map(([name, classes, score, Icon]) => (
          <div className="academic-card" key={name}>
            <div className="academic-icon"><Icon size={19} /></div>
            <div className="academic-title"><strong>{name}</strong><MoreHorizontal size={16} /></div>
            <span>{classes}</span>
            <div className="academic-score"><strong>{score.split(" ")[0]}</strong><small>{score.split(" ").slice(1).join(" ")}</small></div>
            <div className="progress-bar"><i style={{ width: score.split("%")[0].split(" ").pop() + "%" }} /></div>
          </div>
        ))}
      </div>

      <div className="workspace-card full-card">
        <div className="workspace-card-head">
          <div><span>CLASS STRUCTURE</span><h3>Active classes</h3></div>
          <button className="text-button">Manage classes <ArrowRight size={14} /></button>
        </div>
        <div className="class-grid">
          {["9-A", "9-B", "9-C", "8-A", "8-B", "10-A"].map((item, index) => (
            <div className="class-card" key={item}>
              <div className="class-badge">{item}</div>
              <strong>{index % 2 === 0 ? 42 : 38} students</strong>
              <span>{index % 2 === 0 ? "91.2%" : "87.6%"} attendance</span>
              <ArrowUpRight size={15} />
            </div>
          ))}
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
          <span className="workspace-eyebrow">ASSESSMENTS</span>
          <h1>Examinations</h1>
          <p>Keep every assessment, date and room organized.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Create examination</button>
      </div>

      <div className="exam-summary-grid">
        <div><CalendarDays size={18} /><span>Upcoming</span><strong>12</strong></div>
        <div><ClipboardCheck size={18} /><span>Completed</span><strong>28</strong></div>
        <div><Clock3 size={18} /><span>Next exam</span><strong>3 days</strong></div>
        <div><Award size={18} /><span>Results ready</span><strong>8</strong></div>
      </div>

      <div className="workspace-card full-card">
        <div className="workspace-card-head"><div><span>EXAMINATION CALENDAR</span><h3>Upcoming assessments</h3></div><button className="card-more"><MoreHorizontal size={16} /></button></div>
        <div className="large-exam-list">
          {exams.map((exam, index) => (
            <div className="large-exam-item" key={exam.title}>
              <div className="large-exam-date"><strong>{exam.date.split(" ")[0]}</strong><span>OCT</span></div>
              <div className="large-exam-info"><strong>{exam.title}</strong><span>{exam.type} · {exam.room} · Class 9</span></div>
              <div className="exam-progress"><span>Preparation</span><div><i style={{ width: `${72 + index * 6}%` }} /></div></div>
              <span className="exam-ready">{index === 0 ? "Tomorrow" : "Scheduled"}</span>
              <MoreHorizontal size={16} />
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
          <span className="workspace-eyebrow">ASSESSMENT DATA</span>
          <h1>Marks</h1>
          <p>Enter, review and understand assessment scores.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Enter marks</button>
      </div>

      <div className="marks-overview">
        <div className="marks-main">
          <span>Class 9 average</span>
          <strong>82.6%</strong>
          <small><TrendingUp size={13} /> 4.2% improvement</small>
        </div>
        <div className="marks-mini">
          <span>Highest subject</span>
          <strong>Computer Science</strong>
          <b>94%</b>
        </div>
        <div className="marks-mini">
          <span>Needs review</span>
          <strong>24 students</strong>
          <b>−6 this month</b>
        </div>
      </div>

      <div className="workspace-card full-card">
        <div className="workspace-card-head"><div><span>SUBJECT PERFORMANCE</span><h3>Current assessment averages</h3></div></div>
        <div className="subject-performance-list">
          {subjects.map(subject => (
            <div className="subject-performance" key={subject.name}>
              <div className="subject-label"><div className="subject-dot" /><strong>{subject.name}</strong></div>
              <div className="subject-track"><i style={{ width: `${subject.score}%` }} /></div>
              <strong>{subject.score}%</strong>
              <span>{subject.score > 90 ? "Excellent" : subject.score > 80 ? "Healthy" : "Review"}</span>
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
          <span className="workspace-eyebrow">RESULTS CENTER</span>
          <h1>Results</h1>
          <p>A clear picture of academic outcomes across your school.</p>
        </div>
        <button className="workspace-primary"><FileText size={16} /> Generate report</button>
      </div>

      <div className="results-hero">
        <div>
          <span>OVERALL PERFORMANCE</span>
          <strong>82.6%</strong>
          <p>Class 9 · Mid Term 2026</p>
        </div>
        <div className="result-ring">
          <div><strong>91%</strong><span>Pass rate</span></div>
        </div>
        <div className="result-side">
          <div><TrendingUp size={17} /><span>Performance is up <strong>6.8%</strong> from the previous assessment.</span></div>
          <div><Award size={17} /><span><strong>184 students</strong> achieved 80% or above.</span></div>
        </div>
      </div>

      <div className="results-grid">
        {[
          ["Excellent", "418", "32.5%", "Above 90%"],
          ["Good", "562", "43.8%", "80–89%"],
          ["Attention", "280", "21.8%", "60–79%"],
          ["At Risk", "24", "1.9%", "Below 60%"]
        ].map(item => (
          <div className="result-card" key={item[0]}>
            <span>{item[0]}</span>
            <strong>{item[1]}</strong>
            <small>{item[2]} of students</small>
            <em>{item[3]}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendancePage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">DAILY PRESENCE</span>
          <h1>Attendance</h1>
          <p>Monitor attendance patterns before they become problems.</p>
        </div>
        <button className="workspace-primary"><Check size={16} /> Record attendance</button>
      </div>

      <div className="attendance-hero">
        <ProgressRing value={93} />
        <div>
          <span>SCHOOL ATTENDANCE</span>
          <strong>93.8%</strong>
          <p>Current monthly average · <b>+2.1%</b> compared with last month</p>
        </div>
        <div className="attendance-hero-stats">
          <div><strong>1,196</strong><span>Present</span></div>
          <div><strong>54</strong><span>Late</span></div>
          <div><strong>34</strong><span>Absent</span></div>
        </div>
      </div>

      <div className="workspace-card full-card">
        <div className="workspace-card-head"><div><span>STUDENT ATTENDANCE</span><h3>Today's overview</h3></div><button className="card-more"><MoreHorizontal size={16} /></button></div>
        <div className="attendance-table">
          {students.map(student => (
            <div className="attendance-row" key={student.name}>
              <div className="table-student"><div className="table-avatar">{student.initials}</div><div><strong>{student.name}</strong><span>{student.className}</span></div></div>
              <div className="attendance-bar"><span>Attendance</span><div><i style={{ width: `${student.attendance}%` }} /></div></div>
              <strong>{student.attendance}%</strong>
              <span className={`attendance-state ${student.attendance < 80 ? "warning" : ""}`}>{student.attendance < 80 ? "Needs attention" : "On track"}</span>
            </div>
          ))}
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
          <span className="workspace-eyebrow">ANALYTICS</span>
          <h1>Performance</h1>
          <p>Understand how students and classes are progressing.</p>
        </div>
        <button className="workspace-secondary"><CalendarDays size={15} /> This term</button>
      </div>

      <div className="performance-overview">
        <div className="performance-overview-main">
          <span>ACADEMIC PERFORMANCE</span>
          <strong>82.6%</strong>
          <small><TrendingUp size={13} /> 6.8% improvement</small>
          <MiniChart height={220} />
        </div>
        <div className="performance-overview-side">
          <div><span>Top class</span><strong>9-A</strong><b>87.4%</b></div>
          <div><span>Top subject</span><strong>Computer Science</strong><b>94%</b></div>
          <div><span>Improving</span><strong>184 students</strong><b>+12.6%</b></div>
        </div>
      </div>

      <div className="workspace-card full-card">
        <div className="workspace-card-head"><div><span>SUBJECT ANALYSIS</span><h3>Performance by subject</h3></div></div>
        <div className="analytics-subject-table">
          {subjects.map(subject => (
            <div key={subject.name}>
              <div><strong>{subject.name}</strong><span>Current average</span></div>
              <div className="wide-progress"><i style={{ width: `${subject.score}%` }} /></div>
              <strong>{subject.score}%</strong>
              <span className="up-label"><TrendingUp size={12} /> +{Math.round(subject.score / 10)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function generateAIAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("attendance") || q.includes("absent") || q.includes("late")) {
    return {
      title: "Attendance overview",
      text: "The current school attendance average is 93.8%. I found 34 absent students and 54 late records in the current period. Rayyan Malik and Zayan Ahmed are among the students below the 80% attendance mark.",
      tags: ["93.8% attendance", "34 absent", "54 late"]
    };
  }

  if (q.includes("top") || q.includes("best") || q.includes("perform")) {
    return {
      title: "Performance highlights",
      text: "Areeba Khan currently has the highest average in the visible student dataset at 91%, followed by Ayaan Khan at 87%. Computer Science is the strongest subject with a 94% average.",
      tags: ["Areeba · 91%", "Ayaan · 87%", "CS · 94%"]
    };
  }

  if (q.includes("risk") || q.includes("weak") || q.includes("declin") || q.includes("attention")) {
    return {
      title: "Students needing attention",
      text: "There are 24 students currently marked as needing review. In the visible records, Zayan Ahmed has the lowest average at 51% and 73% attendance, while Rayyan Malik is at 64% with 79% attendance.",
      tags: ["24 school-wide", "Zayan · 51%", "Rayyan · 64%"]
    };
  }

  if (q.includes("math") || q.includes("subject")) {
    return {
      title: "Subject performance",
      text: "Computer Science leads the current subject averages at 94%, followed by Mathematics at 88%, Chemistry at 85%, English at 82%, and Physics at 79%.",
      tags: ["CS · 94%", "Math · 88%", "Physics · 79%"]
    };
  }

  if (q.includes("student") || q.includes("how many")) {
    return {
      title: "Student overview",
      text: "The workspace currently tracks 1,284 students across 24 classes. The visible dataset includes students from classes 9-A, 9-B and 9-C with different performance and attendance patterns.",
      tags: ["1,284 students", "24 classes", "3 active classes"]
    };
  }

  return {
    title: "SchoolMarks overview",
    text: "I can help you explore student performance, attendance, subjects, examinations and results. Try asking which students need attention, what the strongest subject is, or how attendance is looking.",
    tags: ["Performance", "Attendance", "Results"]
  };
}

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      title: "Welcome to SchoolMarks AI",
      text: "Ask me anything about your academic workspace. I can help you explore performance, attendance, students, subjects and results.",
      tags: ["Try a question", "Explore data"]
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = [
    "Which students need attention?",
    "What is our attendance like?",
    "Which subject is performing best?",
    "Show me the top students"
  ];

  const sendMessage = question => {
    const value = (question || input).trim();
    if (!value || typing) return;

    setMessages(prev => [...prev, { role: "user", text: value }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const answer = generateAIAnswer(value);
      setMessages(prev => [...prev, { role: "ai", ...answer }]);
      setTyping(false);
    }, 650);
  };

  return (
    <div className="route-page ai-route">
      <div className="ai-page-header">
        <div>
          <div className="workspace-eyebrow">SCHOOLMARKS INTELLIGENCE</div>
          <h1>Ask your academic data.</h1>
          <p>Explore your school using natural language. No complicated reports required.</p>
        </div>
        <div className="ai-page-actions">
          <button onClick={() => setMessages([])}>Clear chat</button>
          <div className="ai-ready"><i /> AI ready</div>
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-large-icon"><BrainCircuit size={21} /></div>
              <div><strong>SchoolMarks AI</strong><span>Academic intelligence assistant</span></div>
            </div>
            <div className="ai-chat-status"><i /> Online</div>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div className={`ai-chat-message ${message.role}`} key={index}>
                <div className={`ai-chat-avatar ${message.role === "user" ? "user-chat-avatar" : ""}`}>
                  {message.role === "user" ? "FK" : <BrainCircuit size={15} />}
                </div>
                <div className="ai-chat-bubble">
                  {message.role === "ai" ? (
                    <>
                      <span className="chat-label">SCHOOLMARKS AI</span>
                      {message.title && <h3>{message.title}</h3>}
                      <p>{message.text}</p>
                      {message.tags && (
                        <div className="answer-tags">
                          {message.tags.map(tag => <span key={tag}>{tag}</span>)}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="chat-label">YOU</span>
                      <p>{message.text}</p>
                    </>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="ai-chat-message ai">
                <div className="ai-chat-avatar"><BrainCircuit size={15} /></div>
                <div className="typing-bubble">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          <div className="ai-suggestions">
            <span>QUICK QUESTIONS</span>
            <div>
              {suggestions.map(item => (
                <button key={item} onClick={() => sendMessage(item)}>{item}<ArrowUpRight size={12} /></button>
              ))}
            </div>
          </div>

          <div className="ai-input-area">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask SchoolMarks anything..."
              rows={1}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || typing}>
              <Send size={16} />
            </button>
          </div>
          <div className="ai-input-footer">
            <span>Press Enter to ask · Shift + Enter for a new line</span>
            <span><Sparkles size={12} /> Demo intelligence</span>
          </div>
        </div>

        <aside className="ai-side-panel">
          <div className="ai-side-card ai-side-intro">
            <div className="ai-side-icon"><Sparkles size={18} /></div>
            <span>INTELLIGENCE</span>
            <h3>What can I ask?</h3>
            <p>SchoolMarks AI is designed around the information inside your academic workspace.</p>
          </div>

          <div className="ai-side-card">
            <span>AVAILABLE AREAS</span>
            {[
              [Users, "Students", "Records & groups"],
              [BarChart3, "Performance", "Scores & trends"],
              [UserCheck, "Attendance", "Presence patterns"],
              [Award, "Results", "Academic outcomes"]
            ].map(([Icon, title, text]) => (
              <div className="ai-metric" key={title}>
                <div><Icon size={15} /></div>
                <span><strong>{title}</strong><small>{text}</small></span>
                <ChevronRight size={14} />
              </div>
            ))}
          </div>

          <div className="ai-side-card popular-questions">
            <span>POPULAR QUESTIONS</span>
            <button onClick={() => sendMessage("Which students need attention?")}>Students needing attention <ArrowUpRight size={12} /></button>
            <button onClick={() => sendMessage("What is our attendance like?")}>Attendance overview <ArrowUpRight size={12} /></button>
            <button onClick={() => sendMessage("Which subject is performing best?")}>Best performing subject <ArrowUpRight size={12} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AppLayout({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const content = {
    dashboard: <DashboardPage setPage={setPage} />,
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
      <Sidebar page={page} setPage={setPage} open={menuOpen} />
      <div className="app-main">
        <Topbar page={page} setPage={setPage} onMenu={() => setMenuOpen(true)} />
        <main className="app-content">{content[page]}</main>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");

  return page === "home" ? (
    <HomePage onNavigate={setPage} />
  ) : (
    <AppLayout page={page} setPage={setPage} />
  );
}

export default App;