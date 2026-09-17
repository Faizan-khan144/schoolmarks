import React, { useEffect, useMemo, useState, useId } from "react";
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
  { name: "Rayyan Malik", initials: "RM", className: "9-C", avg: 64, attendance: 79, status: "Attention" }
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: ClipboardCheck },
  { id: "marks", label: "Marks", icon: FileText },
  { id: "results", label: "Results", icon: Award },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: LineChart },
  { id: "ai", label: "AI Assistant", icon: BrainCircuit }
];

const modules = [
  {
    number: "01",
    title: "Student Management",
    description: "Keep every student record organized, searchable and instantly accessible.",
    icon: Users
  },
  {
    number: "02",
    title: "Academic Management",
    description: "Manage classes, subjects, teachers and academic structures from one place.",
    icon: BookOpenCheck
  },
  {
    number: "03",
    title: "Examinations",
    description: "Plan examinations, schedules and assessments without spreadsheet chaos.",
    icon: ClipboardCheck
  },
  {
    number: "04",
    title: "Marks & Results",
    description: "Turn raw marks into clear, structured results and academic reports.",
    icon: Award
  },
  {
    number: "05",
    title: "Attendance Intelligence",
    description: "Spot attendance patterns before they become academic problems.",
    icon: UserCheck
  },
  {
    number: "06",
    title: "Performance Analytics",
    description: "Understand trends, strengths and areas that need attention.",
    icon: BarChart3
  }
];

const activities = [
  { title: "Areeba Khan's marks updated", meta: "Mathematics · 96 marks", time: "12 min ago" },
  { title: "New examination scheduled", meta: "Computer Science · 18 Oct", time: "35 min ago" },
  { title: "Attendance report generated", meta: "Class 9-B · September", time: "1 hr ago" },
  { title: "Student profile added", meta: "Hamza Saeed · 9-A", time: "2 hrs ago" }
];

const exams = [
  { subject: "Mathematics", className: "Grade 9 · All sections", date: "18 Oct", icon: "M" },
  { subject: "Computer Science", className: "Grade 9 · Section A", date: "21 Oct", icon: "C" },
  { subject: "English", className: "Grade 9 · All sections", date: "24 Oct", icon: "E" },
  { subject: "Physics", className: "Grade 9 · Section B", date: "28 Oct", icon: "P" }
];

const subjects = [
  { name: "Mathematics", teacher: "Sarah Ahmed", classes: "9-A · 9-B · 9-C", progress: 88 },
  { name: "Computer Science", teacher: "Usman Tariq", classes: "9-A · 9-B", progress: 94 },
  { name: "English", teacher: "Mariam Noor", classes: "9-A · 9-B · 9-C", progress: 81 },
  { name: "Physics", teacher: "Hamza Rauf", classes: "9-B · 9-C", progress: 76 },
  { name: "Chemistry", teacher: "Ayesha Khan", classes: "9-A · 9-C", progress: 84 },
  { name: "Urdu", teacher: "Nadia Aslam", classes: "9-A · 9-B · 9-C", progress: 90 }
];

const marks = [
  { student: "Areeba Khan", subject: "Mathematics", score: 96, total: 100, grade: "A+" },
  { student: "Ayaan Khan", subject: "Computer Science", score: 91, total: 100, grade: "A+" },
  { student: "Maham Ali", subject: "English", score: 87, total: 100, grade: "A" },
  { student: "Hassan Raza", subject: "Physics", score: 82, total: 100, grade: "A" },
  { student: "Rayyan Malik", subject: "Chemistry", score: 68, total: 100, grade: "B" },
  { student: "Zayan Ahmed", subject: "Mathematics", score: 51, total: 100, grade: "C" }
];

function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <div className="brand-mark">
        <span>SM</span>
        <img
          src="/logo/schoolmarks-logo.png"
          alt="SchoolMarks"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
      {!compact && (
        <div className="brand-copy">
          <strong>SchoolMarks</strong>
          <span>Academic Intelligence</span>
        </div>
      )}
    </div>
  );
}

function MiniChart({ values = [42, 54, 47, 68, 62, 78, 72, 91] }) {
  const id = useId().replace(/:/g, "");
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 88 - ((value - min) / (max - min || 1)) * 66;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg className="mini-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`chart-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopOpacity="0.28" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#chart-${id})`} />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
      {values.map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = 88 - ((value - min) / (max - min || 1)) * 66;
        return <circle key={index} cx={x} cy={y} r="1.6" fill="currentColor" />;
      })}
    </svg>
  );
}

function ProgressRing({ value, size = 104 }) {
  return (
    <div
      className="progress-ring"
      style={{
        width: size,
        height: size,
        "--progress": `${value * 3.6}deg`
      }}
    >
      <div className="ring-inner">
        <strong>{value}%</strong>
        <span>Average</span>
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

function LandingPreview() {
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
          <div className="browser-url">app.schoolmarks.local/dashboard</div>
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
              <Award size={13} />
              Results
            </div>
            <div className="preview-nav">
              <BrainCircuit size={13} />
              AI Assistant
            </div>
          </aside>

          <div className="product-main">
            <div className="preview-heading">
              <div>
                <span>Monday, 12 October</span>
                <h3>Good morning, Admin.</h3>
              </div>
              <div className="preview-avatar">FK</div>
            </div>

            <div className="preview-stats">
              <div className="preview-stat">
                <span>Students</span>
                <strong>1,248</strong>
                <small>+8.4% this month</small>
              </div>
              <div className="preview-stat">
                <span>Attendance</span>
                <strong>94.2%</strong>
                <small>+2.1% this month</small>
              </div>
              <div className="preview-stat">
                <span>Avg. Result</span>
                <strong>82.6%</strong>
                <small>+4.7% this term</small>
              </div>
            </div>

            <div className="product-grid">
              <div className="dashboard-card chart-card">
                <div className="card-head">
                  <div>
                    <span>Academic performance</span>
                    <strong>82.6%</strong>
                  </div>
                  <span className="tiny-select">This term <ChevronDown size={11} /></span>
                </div>
                <div className="chart-grid">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                </div>
                <div className="chart-area">
                  <MiniChart values={[48, 56, 51, 65, 62, 74, 70, 82, 79, 89]} />
                </div>
                <div className="chart-labels">
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>
              </div>

              <div className="dashboard-card attendance-card">
                <div className="card-head">
                  <div>
                    <span>Attendance health</span>
                    <strong>94.2%</strong>
                  </div>
                  <Activity size={14} />
                </div>
                <div className="attendance-center">
                  <ProgressRing value={94} size={88} />
                  <div className="attendance-breakdown">
                    <div><i className="dot present" /> Present <b>1,176</b></div>
                    <div><i className="dot absent" /> Absent <b>72</b></div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card table-card">
                <div className="card-head">
                  <div>
                    <span>Students requiring attention</span>
                    <strong>6 students</strong>
                  </div>
                  <ArrowUpRight size={14} />
                </div>
                {students.slice(0, 3).map((student) => (
                  <div className="preview-student" key={student.name}>
                    <div className="student-avatar">{student.initials}</div>
                    <div>
                      <b>{student.name}</b>
                      <span>{student.className}</span>
                    </div>
                    <strong>{student.avg}%</strong>
                  </div>
                ))}
              </div>

              <div className="dashboard-card intelligence-card">
                <div className="ai-heading">
                  <div className="ai-icon"><Sparkles size={14} /></div>
                  <div>
                    <span>AI Insight</span>
                    <strong>3 performance signals</strong>
                  </div>
                </div>
                <p>Grade 9-B attendance dropped 4.2% this week.</p>
                <div className="ai-tags">
                  <span>Attendance</span>
                  <span>Grade 9-B</span>
                </div>
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
    <div className="public-site">
      <nav className="public-nav">
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#modules">Modules</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#workflow">How it works</a>
          </div>
          <div className="nav-actions">
            <button className="nav-ai" onClick={() => onNavigate("ai")}>
              <BrainCircuit size={16} />
              AI Assistant
            </button>
            <button className="nav-button" onClick={onAccess}>
              Open platform <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" id="platform">
          <div className="hero-grid-bg" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="container hero-inner">
            <Reveal className="hero-copy">
              <div className="hero-eyebrow">
                <span className="eyebrow-pulse" />
                A smarter school operating layer
              </div>

              <h1>
                Run your school
                <span> with clarity.</span>
              </h1>

              <p>
                SchoolMarks brings students, academics, examinations,
                attendance, results and performance intelligence into one
                beautifully connected workspace.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={() => onNavigate("dashboard")}>
                  Explore dashboard
                  <ArrowUpRight size={17} />
                </button>
                <a className="secondary-button" href="#modules">
                  Explore platform
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <Check size={14} />
                  Centralized records
                </div>
                <div className="trust-item">
                  <Check size={14} />
                  Actionable insights
                </div>
                <div className="trust-item">
                  <Check size={14} />
                  Built for educators
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
            <span>ONE CONNECTED ACADEMIC WORKSPACE</span>
            <div className="trust-line" />
            <span>STUDENTS</span>
            <span>ACADEMICS</span>
            <span>ASSESSMENTS</span>
            <span>INTELLIGENCE</span>
          </div>
        </section>

        <section className="problem-section section-pad">
          <div className="container problem-layout">
            <Reveal className="problem-copy">
              <span className="eyebrow">THE PROBLEM</span>
              <h2>School data shouldn't feel like a puzzle.</h2>
              <p>
                When information lives across notebooks, spreadsheets and
                disconnected systems, important signals disappear between
                them.
              </p>
              <div className="problem-list">
                <div><span>01</span><b>Scattered student records</b></div>
                <div><span>02</span><b>Manual academic reporting</b></div>
                <div><span>03</span><b>Hidden performance patterns</b></div>
              </div>
            </Reveal>

            <Reveal className="problem-visual">
              <div className="scattered-card card-a">
                <FileText size={19} />
                <span>Marks.xlsx</span>
                <small>Last edited 2 days ago</small>
              </div>
              <div className="scattered-card card-b">
                <CalendarDays size={19} />
                <span>Attendance Sheet</span>
                <small>43 records pending</small>
              </div>
              <div className="scattered-card card-c">
                <Users size={19} />
                <span>Student Register</span>
                <small>1,248 entries</small>
              </div>
              <div className="scattered-card card-d">
                <BarChart3 size={19} />
                <span>Result Report</span>
                <small>September 2026</small>
              </div>
              <div className="convergence">
                <div className="convergence-ring ring-1" />
                <div className="convergence-ring ring-2" />
                <div className="convergence-core">
                  <span>SM</span>
                  <small>One system</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="solution-section section-pad" id="modules">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">THE PLATFORM</span>
              <h2>Everything connected.<br />Nothing overlooked.</h2>
              <p>
                A complete academic workspace designed around the way schools
                actually operate.
              </p>
            </Reveal>

            <div className="module-grid">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Reveal key={module.number} className="module-card-wrap">
                    <article className="module-card" style={{ "--delay": `${index * 70}ms` }}>
                      <div className="module-top">
                        <span className="module-number">{module.number}</span>
                        <div className="module-icon"><Icon size={19} /></div>
                      </div>
                      <h3>{module.title}</h3>
                      <p>{module.description}</p>
                      <div className="module-card-arrow">
                        Explore module <ArrowUpRight size={14} />
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="workflow-section section-pad" id="workflow">
          <div className="container">
            <div className="workflow-stage">
              <Reveal className="workflow-copy">
                <span className="eyebrow">A SIMPLE FLOW</span>
                <h2>From school setup to useful intelligence.</h2>
                <p>
                  SchoolMarks turns daily academic operations into a connected
                  flow where every action contributes to a clearer picture.
                </p>
              </Reveal>

              <div className="workflow-steps">
                {[
                  ["01", "Configure", "Set up classes, subjects and academic structure."],
                  ["02", "Manage", "Add students and keep records organized."],
                  ["03", "Measure", "Track attendance, marks and examinations."],
                  ["04", "Understand", "Use analytics and AI-powered insights."]
                ].map(([number, title, description], index) => (
                  <Reveal key={number}>
                    <div className="workflow-step">
                      <div className="workflow-step-number">{number}</div>
                      <div>
                        <strong>{title}</strong>
                        <span>{description}</span>
                      </div>
                      {index < 3 && <ArrowRight size={16} />}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="capabilities-section section-pad">
          <div className="container">
            <Reveal className="section-heading">
              <span className="eyebrow">WHY IT FEELS DIFFERENT</span>
              <h2>Built to turn information<br />into decisions.</h2>
            </Reveal>

            <div className="capability-grid">
              <Reveal>
                <div className="capability-card large">
                  <div className="capability-icon"><Activity size={20} /></div>
                  <span>01 · CONNECTED DATA</span>
                  <h3>One academic picture.</h3>
                  <p>
                    Student information, marks, attendance and assessments
                    work together instead of living in isolated places.
                  </p>
                  <div className="capability-lines">
                    <span><Users size={14} /> Students</span>
                    <span><Award size={14} /> Results</span>
                    <span><UserCheck size={14} /> Attendance</span>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="capability-card">
                  <div className="capability-icon"><Target size={20} /></div>
                  <span>02 · SIGNALS</span>
                  <h3>See what needs attention.</h3>
                  <p>Identify changes before they become bigger academic issues.</p>
                  <div className="signal-demo">
                    <div><i /> Attendance <b>−4.2%</b></div>
                    <div><i /> Mathematics <b>+8.7%</b></div>
                    <div><i /> Grade 9-B <b>Watch</b></div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="capability-card">
                  <div className="capability-icon"><Zap size={20} /></div>
                  <span>03 · SPEED</span>
                  <h3>Less admin. More insight.</h3>
                  <p>Replace repetitive reporting with a focused academic workflow.</p>
                  <div className="speed-meter">
                    <span>Daily operations</span>
                    <div><i style={{ width: "86%" }} /></div>
                    <b>86% organized</b>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="intelligence-section section-pad" id="intelligence">
          <div className="container">
            <Reveal className="intelligence-header">
              <div>
                <span className="eyebrow">ACADEMIC INTELLIGENCE</span>
                <h2>Your data can tell you more.</h2>
              </div>
              <p>
                Ask questions, discover patterns and turn raw school data into
                useful context.
              </p>
            </Reveal>

            <Reveal className="intelligence-demo">
              <div className="assistant-top">
                <div className="assistant-brand">
                  <div className="assistant-logo"><Sparkles size={17} /></div>
                  <div>
                    <strong>SchoolMarks Intelligence</strong>
                    <span>Academic analysis assistant</span>
                  </div>
                </div>
                <div className="assistant-status"><i /> Online</div>
              </div>

              <div className="assistant-content">
                <div className="assistant-copy">
                  <span>ASK YOUR SCHOOL DATA</span>
                  <h3>What changed this week?</h3>
                  <p>
                    AI can surface patterns across attendance, performance,
                    classes and results.
                  </p>
                  <div className="suggestion-row">
                    <span>Show students at risk</span>
                    <span>Compare classes</span>
                    <span>Analyze attendance</span>
                  </div>
                </div>

                <div className="assistant-panel">
                  <div className="assistant-messages">
                    <div className="assistant-message user-message">
                      <div className="message-avatar user-avatar">A</div>
                      <p>Which class needs attention right now?</p>
                    </div>
                    <div className="assistant-message result-message">
                      <div className="message-avatar"><Sparkles size={13} /></div>
                      <div>
                        <strong>Grade 9-B</strong>
                        <p>
                          Attendance decreased by 4.2% this week, while the
                          average Mathematics score is 9 points below the
                          school average.
                        </p>
                        <div className="answer-tags">
                          <span>Attendance</span>
                          <span>Mathematics</span>
                          <span>9-B</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="assistant-input">
                    <span>Ask anything about your academic data...</span>
                    <Send size={14} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="analytics-section section-pad">
          <div className="container analytics-layout">
            <Reveal className="analytics-copy">
              <span className="eyebrow">PERFORMANCE ANALYTICS</span>
              <h2>Don't just store results.<br /><span>Understand them.</span></h2>
              <p>
                Follow academic movement over time and quickly identify the
                students, classes and subjects that deserve attention.
              </p>

              <div className="signal-list">
                <div>
                  <span className="signal-icon positive"><TrendingUp size={15} /></span>
                  <div><strong>Performance trends</strong><small>Track progress across terms.</small></div>
                </div>
                <div>
                  <span className="signal-icon"><Target size={15} /></span>
                  <div><strong>Student signals</strong><small>Find unusual changes early.</small></div>
                </div>
                <div>
                  <span className="signal-icon"><BarChart3 size={15} /></span>
                  <div><strong>Class comparisons</strong><small>See where performance differs.</small></div>
                </div>
              </div>
            </Reveal>

            <Reveal className="analytics-visual">
              <div className="analytics-main-card">
                <div className="analytics-card-top">
                  <div>
                    <span>Average performance</span>
                    <strong>82.6%</strong>
                  </div>
                  <div className="analytics-change"><TrendingUp size={13} /> 4.7%</div>
                </div>
                <div className="large-chart">
                  <div className="large-chart-grid">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                  </div>
                  <MiniChart values={[51, 58, 54, 61, 67, 63, 75, 72, 82, 79, 89]} />
                  <div className="large-chart-labels">
                    <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                  </div>
                </div>
              </div>

              <div className="analytics-float float-top">
                <span>Top subject</span>
                <strong>Computer Science</strong>
                <b>94%</b>
              </div>

              <div className="analytics-float float-bottom">
                <span>Improvement</span>
                <strong>+12.4%</strong>
                <small>vs. previous term</small>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="compare-section section-pad">
          <div className="container">
            <Reveal className="section-heading centered">
              <span className="eyebrow">THE SHIFT</span>
              <h2>Move from managing data<br />to understanding it.</h2>
            </Reveal>

            <Reveal className="comparison">
              <div className="comparison-column old-column">
                <span>WITHOUT SCHOOLMARKS</span>
                <div className="comparison-row"><X size={15} /> Separate spreadsheets</div>
                <div className="comparison-row"><X size={15} /> Manual reports</div>
                <div className="comparison-row"><X size={15} /> Delayed insights</div>
                <div className="comparison-row"><X size={15} /> Scattered records</div>
              </div>

              <div className="comparison-center">
                <div>→</div>
              </div>

              <div className="comparison-column new-column">
                <span>WITH SCHOOLMARKS</span>
                <div className="comparison-row"><Check size={15} /> Connected workspace</div>
                <div className="comparison-row"><Check size={15} /> Structured intelligence</div>
                <div className="comparison-row"><Check size={15} /> Real-time visibility</div>
                <div className="comparison-row"><Check size={15} /> One academic picture</div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="roadmap-section section-pad">
          <div className="container">
            <Reveal className="section-heading">
              <span className="eyebrow">THE EXPERIENCE</span>
              <h2>Designed around the<br />school's daily rhythm.</h2>
            </Reveal>

            <div className="roadmap-grid">
              {[
                ["Morning", "Daily pulse", "Attendance, alerts and today's academic activity.", Clock3],
                ["Midday", "Academic flow", "Classes, students, examinations and marks.", BookOpen],
                ["Afternoon", "Performance", "Analyze movement and identify signals.", BarChart3],
                ["Anytime", "Ask AI", "Get answers from your connected academic data.", BrainCircuit]
              ].map(([time, title, description, Icon], index) => (
                <Reveal key={time}>
                  <div className="roadmap-card">
                    <div className="roadmap-time">{time}</div>
                    <div className="roadmap-icon"><Icon size={19} /></div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span>0{index + 1}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <Reveal>
              <div className="cta-box">
                <div className="cta-content">
                  <span className="eyebrow">READY WHEN YOU ARE</span>
                  <h2>Make school data<br /><span>work for you.</span></h2>
                  <p>Explore the SchoolMarks workspace and see the complete experience.</p>
                  <button className="primary-button" onClick={() => onNavigate("dashboard")}>
                    Enter SchoolMarks <ArrowUpRight size={17} />
                  </button>
                </div>

                <div className="cta-product">
                  <div className="cta-orb" />
                  <div className="cta-mini-card">
                    <div><Sparkles size={14} /><span>AI insight</span></div>
                    <strong>3 signals detected</strong>
                    <small>Updated just now</small>
                  </div>
                  <div className="cta-mini-card second">
                    <div><TrendingUp size={14} /><span>Performance</span></div>
                    <strong>82.6%</strong>
                    <small>+4.7% this term</small>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <div className="footer-links">
            <a href="#platform">Platform</a>
            <a href="#modules">Modules</a>
            <a href="#intelligence">Intelligence</a>
            <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
          </div>
          <span>SchoolMarks · Academic Intelligence</span>
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
          <button className="sidebar-close" onClick={() => setMobileOpen(false)}>
            <X size={17} />
          </button>
        </div>

        <div className="sidebar-school">
          <div className="school-avatar">FK</div>
          <div>
            <strong>Faizan Academy</strong>
            <span>Academic workspace</span>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">WORKSPACE</span>
          {navItems.slice(0, 8).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-link ${page === item.id ? "active" : ""}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === "dashboard" && <i className="new-badge">Live</i>}
              </button>
            );
          })}
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">INTELLIGENCE</span>
          <button
            className={`sidebar-link ai-link ${page === "ai" ? "active" : ""}`}
            onClick={() => {
              onNavigate("ai");
              setMobileOpen(false);
            }}
          >
            <BrainCircuit size={17} />
            <span>AI Assistant</span>
            <Sparkles size={12} />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-link">
            <Settings size={17} />
            <span>Settings</span>
          </button>
          <div className="sidebar-profile">
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

function Topbar({ page, onMenu, onHome }) {
  const current = navItems.find((item) => item.id === page);

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu}>
          <Menu size={20} />
        </button>
        <div className="breadcrumb">
          <button onClick={onHome}>SchoolMarks</button>
          <span>/</span>
          <strong>{current?.label || "Dashboard"}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="topbar-search">
          <Search size={16} />
          <span>Search anything</span>
          <kbd>⌘ K</kbd>
        </button>
        <button className="icon-button notification">
          <Bell size={17} />
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
  );
}

function StatCard({ icon: Icon, label, value, change, trend = "up", note }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon"><Icon size={18} /></div>
        <button><MoreHorizontal size={16} /></button>
      </div>
      <span className="stat-label">{label}</span>
      <div className="stat-value-row">
        <strong>{value}</strong>
        {change && (
          <span className={trend === "down" ? "negative" : ""}>
            {trend === "down" ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
            {change}
          </span>
        )}
      </div>
      {note && <small>{note}</small>}
    </div>
  );
}

function DashboardPage({ onNavigate }) {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">OVERVIEW · OCTOBER 2026</span>
          <h1>Good morning, Faizan.</h1>
          <p>Here's what is happening across your academic workspace today.</p>
        </div>
        <div className="workspace-actions">
          <button className="workspace-secondary"><RefreshCcw size={15} /> Refresh</button>
          <button className="workspace-primary"><Plus size={16} /> Add student</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={Users} label="Total students" value="1,248" change="+8.4%" note="vs. previous month" />
        <StatCard icon={UserCheck} label="Attendance" value="94.2%" change="+2.1%" note="this month" />
        <StatCard icon={Award} label="Average result" value="82.6%" change="+4.7%" note="this term" />
        <StatCard icon={Activity} label="Active signals" value="12" change="3 new" note="need review" trend="up" />
      </div>

      <div className="dashboard-main-grid">
        <section className="workspace-card performance-card">
          <div className="workspace-card-head">
            <div>
              <span>Academic performance</span>
              <h2>82.6%</h2>
            </div>
            <button className="chart-filter">This term <ChevronDown size={13} /></button>
          </div>
          <div className="performance-chart">
            <div className="y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="chart-wrapper">
              <div className="chart-lines">
                <i /><i /><i /><i /><i />
              </div>
              <MiniChart values={[54, 61, 58, 66, 64, 72, 69, 78, 76, 84, 82, 89]} />
              <div className="chart-bottom">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Oct</span>
              </div>
            </div>
          </div>
        </section>

        <section className="workspace-card attendance-workspace">
          <div className="workspace-card-head">
            <div>
              <span>Attendance health</span>
              <h2>Excellent</h2>
            </div>
            <Activity size={17} />
          </div>
          <div className="attendance-layout">
            <ProgressRing value={94} size={118} />
            <div className="attendance-meta">
              <div><i className="legend-dot present" /><span>Present</span><strong>1,176</strong></div>
              <div><i className="legend-dot absent" /><span>Absent</span><strong>72</strong></div>
              <div><i className="legend-dot late" /><span>Late</span><strong>31</strong></div>
            </div>
          </div>
          <div className="attendance-footer">
            <span>Compared with September</span>
            <b>+2.1%</b>
          </div>
        </section>

        <section className="workspace-card students-card">
          <div className="workspace-card-head">
            <div>
              <span>Students requiring attention</span>
              <h2>6 students</h2>
            </div>
            <button className="text-button" onClick={() => onNavigate("students")}>View all <ArrowRight size={14} /></button>
          </div>
          <div className="student-list">
            {students.slice(0, 4).map((student) => (
              <div className="student-row" key={student.name}>
                <div className="table-student">
                  <div className="table-avatar">{student.initials}</div>
                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.className}</span>
                  </div>
                </div>
                <div className="student-score">
                  <strong>{student.avg}%</strong>
                  <span>Average</span>
                </div>
                <div className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>
                  {student.status}
                </div>
                <button className="row-more"><MoreHorizontal size={15} /></button>
              </div>
            ))}
          </div>
        </section>

        <section className="workspace-card upcoming-card">
          <div className="workspace-card-head">
            <div>
              <span>Upcoming examinations</span>
              <h2>Next 30 days</h2>
            </div>
            <button className="text-button" onClick={() => onNavigate("exams")}>Calendar <ArrowUpRight size={14} /></button>
          </div>
          <div className="exam-list">
            {exams.slice(0, 3).map((exam) => (
              <div className="exam-item" key={exam.subject}>
                <div className="exam-icon">{exam.icon}</div>
                <div className="exam-info">
                  <strong>{exam.subject}</strong>
                  <span>{exam.className}</span>
                </div>
                <div className="exam-date">
                  <small>OCT</small>
                  <strong>{exam.date.split(" ")[0]}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bottom-grid">
        <section className="ai-insight-workspace">
          <div className="insight-glow" />
          <div className="insight-ai-icon"><Sparkles size={20} /></div>
          <div className="insight-content">
            <span>AI INSIGHT · UPDATED 4 MIN AGO</span>
            <h3>Grade 9-B attendance needs attention.</h3>
            <p>
              Attendance dropped 4.2% this week. Mathematics performance is
              also below the school average.
            </p>
            <button onClick={() => onNavigate("ai")}>Ask AI about this <ArrowRight size={14} /></button>
          </div>
          <div className="insight-score">
            <strong>4.2%</strong>
            <span>drop this week</span>
          </div>
        </section>

        <section className="workspace-card activity-card">
          <div className="workspace-card-head">
            <div>
              <span>Recent activity</span>
              <h2>Today</h2>
            </div>
            <MoreHorizontal size={17} />
          </div>
          <div className="activity-list">
            {activities.map((activity, index) => (
              <div className="activity-item" key={activity.title}>
                <div className={`activity-dot activity-${index}`} />
                <div>
                  <strong>{activity.title}</strong>
                  <span>{activity.meta}</span>
                </div>
                <small>{activity.time}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => students.filter((student) => student.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">WORKSPACE · STUDENTS</span>
          <h1>Student management.</h1>
          <p>Manage profiles, academic standing and attendance from one place.</p>
        </div>
        <div className="workspace-actions">
          <button className="workspace-secondary"><Filter size={15} /> Filters</button>
          <button className="workspace-primary"><Plus size={16} /> Add student</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={Users} label="Total students" value="1,248" change="+8.4%" />
        <StatCard icon={GraduationCap} label="Classes" value="36" note="Across all grades" />
        <StatCard icon={UserCheck} label="Attendance" value="94.2%" change="+2.1%" />
        <StatCard icon={Target} label="Need attention" value="12" change="3 new" />
      </div>

      <section className="workspace-card full-card">
        <div className="workspace-card-head">
          <div>
            <span>All students</span>
            <h2>{students.length} visible records</h2>
          </div>
          <div className="table-toolbar">
            <div className="table-search">
              <Search size={15} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search students..."
              />
            </div>
            <button className="outline-button"><Filter size={14} /> Filter</button>
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
              {filtered.map((student) => (
                <tr key={student.name}>
                  <td>
                    <div className="table-student">
                      <div className="table-avatar">{student.initials}</div>
                      <div>
                        <strong>{student.name}</strong>
                        <span>Student ID · SM-{student.initials}24</span>
                      </div>
                    </div>
                  </td>
                  <td>{student.className}</td>
                  <td><strong className="score-cell">{student.avg}%</strong></td>
                  <td>
                    <div className="table-progress">
                      <span>{student.attendance}%</span>
                      <div><i style={{ width: `${student.attendance}%` }} /></div>
                    </div>
                  </td>
                  <td>
                    <div className={`status-pill ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</div>
                  </td>
                  <td><button className="row-more"><MoreHorizontal size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AcademicsPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">WORKSPACE · ACADEMICS</span>
          <h1>Academic structure.</h1>
          <p>Keep subjects, teachers and classes aligned with the academic plan.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Add subject</button>
      </div>

      <div className="stat-grid">
        <StatCard icon={BookOpen} label="Subjects" value="24" note="Active this term" />
        <StatCard icon={Users} label="Classes" value="36" note="Across all grades" />
        <StatCard icon={GraduationCap} label="Teachers" value="68" change="+4" />
        <StatCard icon={Target} label="Curriculum" value="91%" change="+6.2%" />
      </div>

      <section className="subject-grid">
        {subjects.map((subject) => (
          <div className="workspace-card subject-card" key={subject.name}>
            <div className="subject-card-top">
              <div className="subject-icon">{subject.name.charAt(0)}</div>
              <button className="row-more"><MoreHorizontal size={16} /></button>
            </div>
            <h3>{subject.name}</h3>
            <p>{subject.teacher}</p>
            <span>{subject.classes}</span>
            <div className="subject-progress">
              <div><span>Curriculum progress</span><b>{subject.progress}%</b></div>
              <i><em style={{ width: `${subject.progress}%` }} /></i>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function ExamsPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">WORKSPACE · EXAMINATIONS</span>
          <h1>Examination center.</h1>
          <p>Plan assessments, monitor schedules and keep every exam on track.</p>
        </div>
        <div className="workspace-actions">
          <button className="workspace-secondary"><CalendarDays size={15} /> Calendar</button>
          <button className="workspace-primary"><Plus size={16} /> New examination</button>
        </div>
      </div>

      <div className="exam-timeline">
        {exams.map((exam, index) => (
          <div className="timeline-card" key={exam.subject}>
            <div className="timeline-line"><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className="workspace-card exam-detail-card">
              <div className="exam-detail-icon">{exam.icon}</div>
              <div className="exam-detail-content">
                <span>UPCOMING EXAMINATION</span>
                <h3>{exam.subject}</h3>
                <p>{exam.className}</p>
              </div>
              <div className="exam-detail-date">
                <small>OCTOBER</small>
                <strong>{exam.date.split(" ")[0]}</strong>
                <span>2026</span>
              </div>
              <div className="exam-state">Scheduled</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarksPage() {
  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">WORKSPACE · MARKS</span>
          <h1>Marks management.</h1>
          <p>Enter, review and analyze academic scores without the spreadsheet mess.</p>
        </div>
        <button className="workspace-primary"><Plus size={16} /> Enter marks</button>
      </div>

      <div className="stat-grid">
        <StatCard icon={FileText} label="Entries this term" value="8,492" change="+12.8%" />
        <StatCard icon={Award} label="Average score" value="82.6%" change="+4.7%" />
        <StatCard icon={TrendingUp} label="Highest grade" value="A+" note="18% of students" />
        <StatCard icon={Target} label="Pending review" value="24" trend="down" />
      </div>

      <section className="workspace-card full-card">
        <div className="workspace-card-head">
          <div>
            <span>Recent marks</span>
            <h2>Latest academic entries</h2>
          </div>
          <button className="outline-button"><Filter size={14} /> Filter</button>
        </div>
        <div className="students-table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr key={`${mark.student}-${mark.subject}`}>
                  <td><div className="table-student"><div className="table-avatar">{mark.student.split(" ").map((x) => x[0]).join("")}</div><div><strong>{mark.student}</strong><span>Grade 9</span></div></div></td>
                  <td>{mark.subject}</td>
                  <td><strong>{mark.score} / {mark.total}</strong></td>
                  <td><strong className="score-cell">{mark.score}%</strong></td>
                  <td><div className="status-pill excellent">{mark.grade}</div></td>
                  <td><button className="row-more"><MoreHorizontal size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ResultsPage() {
  const resultCards = [
    ["Grade 9-A", "86.4%", "+6.8%", "124 students"],
    ["Grade 9-B", "74.8%", "+1.9%", "118 students"],
    ["Grade 9-C", "81.2%", "+4.2%", "121 students"]
  ];

  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">WORKSPACE · RESULTS</span>
          <h1>Results intelligence.</h1>
          <p>Turn examination marks into clear academic performance snapshots.</p>
        </div>
        <div className="workspace-actions">
          <button className="workspace-secondary"><FileText size={15} /> Reports</button>
          <button className="workspace-primary"><ArrowUpRight size={15} /> Generate results</button>
        </div>
      </div>

      <div className="result-overview">
        <div className="workspace-card result-main">
          <span>School average</span>
          <strong>82.6%</strong>
          <div className="result-trend"><TrendingUp size={14} /> +4.7% compared with previous term</div>
          <div className="result-bars">
            <div><span>Grade 9-A</span><i><em style={{ width: "86%" }} /></i><b>86%</b></div>
            <div><span>Grade 9-B</span><i><em style={{ width: "75%" }} /></i><b>75%</b></div>
            <div><span>Grade 9-C</span><i><em style={{ width: "81%" }} /></i><b>81%</b></div>
          </div>
        </div>

        <div className="result-side">
          <div className="workspace-card result-mini"><span>Students above 80%</span><strong>68%</strong><small>+8.3% this term</small></div>
          <div className="workspace-card result-mini"><span>Students at risk</span><strong>7%</strong><small>−2.1% this term</small></div>
        </div>
      </div>

      <div className="result-class-grid">
        {resultCards.map(([name, score, change, count]) => (
          <div className="workspace-card class-result" key={name}>
            <span>{name}</span>
            <strong>{score}</strong>
            <div><TrendingUp size={13} /> {change}</div>
            <small>{count}</small>
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
          <span className="workspace-eyebrow">WORKSPACE · ATTENDANCE</span>
          <h1>Attendance intelligence.</h1>
          <p>Monitor attendance health and spot patterns across your school.</p>
        </div>
        <button className="workspace-primary"><ClipboardCheck size={16} /> Record attendance</button>
      </div>

      <div className="stat-grid">
        <StatCard icon={UserCheck} label="Present today" value="1,176" change="+2.1%" />
        <StatCard icon={Activity} label="Attendance rate" value="94.2%" change="+2.1%" />
        <StatCard icon={Clock3} label="Late arrivals" value="31" trend="down" change="−8.4%" />
        <StatCard icon={Target} label="At risk" value="18" trend="down" change="−3" />
      </div>

      <div className="attendance-page-grid">
        <section className="workspace-card attendance-big">
          <div className="workspace-card-head">
            <div><span>Monthly attendance</span><h2>94.2%</h2></div>
            <button className="chart-filter">October <ChevronDown size={13} /></button>
          </div>
          <div className="attendance-chart">
            <div className="attendance-days">
              {[91, 94, 96, 92, 95, 97, 94, 93, 96, 98, 95, 94, 96, 97, 94, 92, 95, 96].map((value, index) => (
                <div key={index} className="attendance-day">
                  <span>{value}%</span>
                  <i><em style={{ height: `${value}%` }} /></i>
                  <small>{index + 1}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="workspace-card attendance-alerts">
          <div className="workspace-card-head">
            <div><span>Attendance alerts</span><h2>Needs attention</h2></div>
            <Bell size={16} />
          </div>
          {students.filter((student) => student.attendance < 90).map((student) => (
            <div className="attendance-alert" key={student.name}>
              <div className="table-avatar">{student.initials}</div>
              <div><strong>{student.name}</strong><span>{student.className} · {student.attendance}% attendance</span></div>
              <ArrowUpRight size={14} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function PerformancePage() {
  const subjectsPerformance = [
    ["Computer Science", 94],
    ["Mathematics", 88],
    ["English", 83],
    ["Urdu", 81],
    ["Chemistry", 78],
    ["Physics", 76]
  ];

  return (
    <div className="route-page">
      <div className="workspace-header">
        <div>
          <span className="workspace-eyebrow">WORKSPACE · PERFORMANCE</span>
          <h1>Performance analytics.</h1>
          <p>See how academic performance is moving across classes and subjects.</p>
        </div>
        <button className="workspace-secondary"><RefreshCcw size={15} /> Refresh analytics</button>
      </div>

      <div className="stat-grid">
        <StatCard icon={TrendingUp} label="Average performance" value="82.6%" change="+4.7%" />
        <StatCard icon={Award} label="Top subject" value="94%" note="Computer Science" />
        <StatCard icon={Target} label="Improvement" value="+12.4%" note="Highest student growth" />
        <StatCard icon={Activity} label="Signals detected" value="12" change="3 new" />
      </div>

      <div className="performance-page-grid">
        <section className="workspace-card large-performance">
          <div className="workspace-card-head">
            <div><span>Performance movement</span><h2>Academic average</h2></div>
            <button className="chart-filter">6 months <ChevronDown size={13} /></button>
          </div>
          <div className="performance-chart tall">
            <div className="y-axis"><span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div>
            <div className="chart-wrapper">
              <div className="chart-lines"><i /><i /><i /><i /><i /><i /></div>
              <MiniChart values={[58, 62, 61, 69, 66, 74, 72, 79, 77, 84, 82, 89]} />
              <div className="chart-bottom"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div>
            </div>
          </div>
        </section>

        <section className="workspace-card subject-performance">
          <div className="workspace-card-head"><div><span>Subject performance</span><h2>Current term</h2></div></div>
          <div className="subject-bars">
            {subjectsPerformance.map(([name, value]) => (
              <div key={name}>
                <div><span>{name}</span><strong>{value}%</strong></div>
                <i><em style={{ width: `${value}%` }} /></i>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function generateAIAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("attendance")) {
    return {
      title: "Attendance overview",
      text: "School attendance is currently 94.2%. Grade 9-B is the main area requiring attention, with attendance down 4.2% this week.",
      tags: ["94.2% overall", "Grade 9-B", "−4.2%"]
    };
  }

  if (q.includes("risk") || q.includes("attention") || q.includes("weak")) {
    return {
      title: "Students requiring attention",
      text: "There are 6 students currently flagged for attention. Zayan Ahmed has the lowest average at 51% and attendance at 73%, making this profile the most urgent signal in the current dataset.",
      tags: ["6 students", "Zayan Ahmed", "51% average"]
    };
  }

  if (q.includes("class") || q.includes("grade")) {
    return {
      title: "Class comparison",
      text: "Grade 9-A currently has the strongest average at 86.4%. Grade 9-C is at 81.2%, while Grade 9-B is at 74.8% and has the most visible attendance signal.",
      tags: ["9-A · 86.4%", "9-C · 81.2%", "9-B · 74.8%"]
    };
  }

  if (q.includes("subject") || q.includes("math") || q.includes("computer")) {
    return {
      title: "Subject performance",
      text: "Computer Science is currently the strongest subject at 94%. Mathematics follows at 88%, while Physics is at 76%.",
      tags: ["Computer Science · 94%", "Mathematics · 88%", "Physics · 76%"]
    };
  }

  if (q.includes("result") || q.includes("performance") || q.includes("average")) {
    return {
      title: "Academic performance",
      text: "The current school average is 82.6%, representing a 4.7% improvement compared with the previous term. Grade 9-A currently leads the class averages.",
      tags: ["82.6% average", "+4.7%", "9-A leading"]
    };
  }

  return {
    title: "Academic overview",
    text: "SchoolMarks currently shows an 82.6% academic average, 94.2% attendance and 12 active performance signals. You can ask me about students, classes, marks, attendance, results or subjects.",
    tags: ["82.6% average", "94.2% attendance", "12 signals"]
  };
}

function AIPage() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      title: "Welcome to SchoolMarks Intelligence",
      text: "Ask me anything about your students, attendance, results, marks, classes or academic performance.",
      tags: ["Students", "Attendance", "Results"]
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = [
    "Which students need attention?",
    "How is attendance this month?",
    "Compare Grade 9 classes",
    "Which subject is performing best?"
  ];

  const sendQuestion = (question = input) => {
    const clean = question.trim();
    if (!clean || typing) return;

    setMessages((current) => [...current, { type: "user", text: clean }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const answer = generateAIAnswer(clean);
      setMessages((current) => [...current, { type: "ai", ...answer }]);
      setTyping(false);
    }, 650);
  };

  return (
    <div className="route-page ai-page">
      <div className="ai-page-header">
        <div>
          <span className="workspace-eyebrow">SCHOOLMARKS INTELLIGENCE</span>
          <h1>Ask your academic data.</h1>
          <p>Explore patterns, performance and school signals through a conversational workspace.</p>
        </div>
        <div className="ai-page-actions">
          <button className="workspace-secondary" onClick={() => setMessages([{ type: "ai", title: "Fresh conversation", text: "What would you like to understand about your academic data?", tags: ["Students", "Results", "Attendance"] }])}>
            <RefreshCcw size={15} /> New conversation
          </button>
        </div>
      </div>

      <div className="ai-workspace">
        <section className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-large-icon"><Sparkles size={19} /></div>
              <div>
                <strong>SchoolMarks AI</strong>
                <span><i /> Connected to academic workspace</span>
              </div>
            </div>
            <button className="icon-button"><MoreHorizontal size={17} /></button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div className={`ai-chat-message ${message.type}`} key={index}>
                <div className={`ai-chat-avatar ${message.type === "user" ? "user-chat-avatar" : ""}`}>
                  {message.type === "user" ? "FK" : <Sparkles size={14} />}
                </div>
                <div className="ai-chat-bubble">
                  {message.title && <strong className="ai-answer-title">{message.title}</strong>}
                  <p>{message.text}</p>
                  {message.tags && (
                    <div className="answer-tags">
                      {message.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="ai-chat-message ai">
                <div className="ai-chat-avatar"><Sparkles size={14} /></div>
                <div className="typing-bubble">
                  <i /><i /><i />
                </div>
              </div>
            )}
          </div>

          <div className="ai-suggestions">
            <span>Try asking</span>
            <div>
              {suggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => sendQuestion(suggestion)}>{suggestion}</button>
              ))}
            </div>
          </div>

          <div className="ai-input-area">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendQuestion();
                }
              }}
              placeholder="Ask about students, results, attendance..."
              rows="1"
            />
            <button onClick={() => sendQuestion()} disabled={!input.trim() || typing}>
              <Send size={17} />
            </button>
          </div>
          <div className="ai-input-footer">
            <span>AI responses are based on the connected demo academic dataset.</span>
            <kbd>Enter ↵</kbd>
          </div>
        </section>

        <aside className="ai-side-panel">
          <div className="ai-side-card ai-side-intro">
            <div className="ai-side-icon"><BrainCircuit size={18} /></div>
            <span>INTELLIGENCE</span>
            <h3>What can I analyze?</h3>
            <p>Ask natural questions and explore the signals already visible in your workspace.</p>
          </div>

          <div className="ai-side-card">
            <span className="side-card-label">LIVE SNAPSHOT</span>
            <div className="ai-metric"><span>Students</span><strong>1,248</strong></div>
            <div className="ai-metric"><span>Attendance</span><strong>94.2%</strong></div>
            <div className="ai-metric"><span>Average</span><strong>82.6%</strong></div>
            <div className="ai-metric"><span>Signals</span><strong>12</strong></div>
          </div>

          <div className="ai-side-card popular-questions">
            <span className="side-card-label">POPULAR QUESTIONS</span>
            <button onClick={() => sendQuestion("Which students need attention?")}>Students at risk <ArrowUpRight size={14} /></button>
            <button onClick={() => sendQuestion("How is attendance this month?")}>Attendance trends <ArrowUpRight size={14} /></button>
            <button onClick={() => sendQuestion("Compare Grade 9 classes")}>Class comparison <ArrowUpRight size={14} /></button>
            <button onClick={() => sendQuestion("Which subject is performing best?")}>Subject performance <ArrowUpRight size={14} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AccessModal({ onClose, onOpen }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="access-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={17} /></button>
        <div className="modal-icon"><Sparkles size={21} /></div>
        <span className="eyebrow">SCHOOLMARKS WORKSPACE</span>
        <h2>Welcome back.</h2>
        <p>Open the interactive academic workspace and explore the complete SchoolMarks experience.</p>
        <button className="primary-button modal-button" onClick={onOpen}>
          Open dashboard <ArrowRight size={16} />
        </button>
        <small>Frontend demonstration · No account required</small>
      </div>
    </div>
  );
}

function AppLayout({ page, onNavigate, onHome }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  let content;

  if (page === "dashboard") content = <DashboardPage onNavigate={onNavigate} />;
  if (page === "students") content = <StudentsPage />;
  if (page === "academics") content = <AcademicsPage />;
  if (page === "exams") content = <ExamsPage />;
  if (page === "marks") content = <MarksPage />;
  if (page === "results") content = <ResultsPage />;
  if (page === "attendance") content = <AttendancePage />;
  if (page === "performance") content = <PerformancePage />;
  if (page === "ai") content = <AIPage />;

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="app-main">
        <Topbar page={page} onMenu={() => setMobileOpen(true)} onHome={onHome} />
        <main className="app-content">{content}</main>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [accessOpen, setAccessOpen] = useState(false);

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = page === "home" ? "SchoolMarks — Academic Intelligence" : `SchoolMarks — ${page}`;
  }, [page]);

  if (page === "home") {
    return (
      <>
        <HomePage onNavigate={navigate} onAccess={() => setAccessOpen(true)} />
        {accessOpen && (
          <AccessModal
            onClose={() => setAccessOpen(false)}
            onOpen={() => {
              setAccessOpen(false);
              navigate("dashboard");
            }}
          />
        )}
      </>
    );
  }

  return <AppLayout page={page} onNavigate={navigate} onHome={() => navigate("home")} />;
}