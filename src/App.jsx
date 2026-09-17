
import React, { useEffect, useMemo, useState } from "react";
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
  CircleHelp,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageCircle,
  MoreHorizontal,
  PieChart,
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
  Zap,
  Lightbulb,
  WandSparkles,
  Trophy,
  Calculator,
  Bot,
  MessageSquareText
} from "lucide-react";

const studentsSeed = [
  { name: "Ayaan Khan", className: "9-A", avg: 87, attendance: 96, status: "Excellent" },
  { name: "Zayan Ahmed", className: "9-B", avg: 51, attendance: 73, status: "At Risk" },
  { name: "Maham Ali", className: "9-A", avg: 82, attendance: 91, status: "Good" },
  { name: "Hassan Raza", className: "9-C", avg: 76, attendance: 88, status: "Good" },
  { name: "Areeba Khan", className: "9-B", avg: 91, attendance: 98, status: "Excellent" },
  { name: "Rayyan Malik", className: "9-C", avg: 64, attendance: 79, status: "Attention" }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: ClipboardCheck },
  { id: "marks", label: "Marks & Results", icon: FileText },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "performance", label: "Performance", icon: LineChart },
  { id: "ai", label: "AI Workspace", icon: BrainCircuit }
];

const modules = [
  {
    number: "01",
    title: "Student Management",
    description: "Keep every student profile, class assignment and academic record connected in one place.",
    icon: Users
  },
  {
    number: "02",
    title: "Academic Management",
    description: "Organize subjects, classes, curriculum progress and academic structures without spreadsheets.",
    icon: BookOpen
  },
  {
    number: "03",
    title: "Examinations",
    description: "Plan exams, manage schedules and keep assessment workflows structured from start to finish.",
    icon: ClipboardCheck
  },
  {
    number: "04",
    title: "Marks & Results",
    description: "Enter marks, calculate results and understand performance with clear visual reporting.",
    icon: Award
  },
  {
    number: "05",
    title: "Attendance Intelligence",
    description: "Track attendance patterns and identify students who need attention before it becomes a problem.",
    icon: UserCheck
  },
  {
    number: "06",
    title: "Performance Analytics",
    description: "Turn academic records into signals that help teachers and administrators act faster.",
    icon: BarChart3
  }
];

function generateAIAnswer(prompt, mode = "Ask") {
  const text = prompt.toLowerCase();

  if (mode === "Quiz" || text.includes("quiz")) {
    return {
      title: "Quick assessment generated",
      body: "Here is a short classroom-ready quiz based on your request.",
      bullets: [
        "Q1. What is the main concept you want students to understand?",
        "Q2. Which example best demonstrates that concept?",
        "Q3. How would you apply it to a real-world situation?"
      ],
      tag: "QUIZ BUILDER"
    };
  }

  if (mode === "Plan" || text.includes("study") || text.includes("revision") || text.includes("plan")) {
    return {
      title: "7-day revision plan",
      body: "A balanced plan should prioritize weak subjects while keeping strong subjects active.",
      bullets: [
        "Day 1–2: Mathematics — algebra and problem solving",
        "Day 3–4: Science — concepts + past-paper questions",
        "Day 5: English/Urdu — writing and comprehension",
        "Day 6: Mixed practice — timed questions",
        "Day 7: Full revision + error review"
      ],
      tag: "REVISION PLANNER"
    };
  }

  if (text.includes("attendance")) {
    return {
      title: "Attendance signal detected",
      body: "The current sample data shows a small group that deserves early intervention.",
      bullets: [
        "Zayan Ahmed is at 73% attendance.",
        "Rayyan Malik is at 79% attendance.",
        "Prioritize follow-up before attendance falls further.",
        "Compare attendance with academic performance for stronger context."
      ],
      tag: "ATTENDANCE INSIGHT"
    };
  }

  if (text.includes("mark") || text.includes("grade") || text.includes("performance") || mode === "Analyze") {
    return {
      title: "Performance analysis",
      body: "The sample school data shows a healthy high-performing group alongside a smaller intervention group.",
      bullets: [
        "Areeba Khan leads the sample at 91% average.",
        "Ayaan Khan is also performing strongly at 87%.",
        "Zayan Ahmed needs academic support at 51%.",
        "Rayyan Malik sits in the attention range at 64%."
      ],
      tag: "ACADEMIC ANALYSIS"
    };
  }

  if (text.includes("math") || text.includes("science") || text.includes("english") || text.includes("explain")) {
    return {
      title: "Concept explanation",
      body: "Break the topic into three layers: definition, simple example and practice.",
      bullets: [
        "Start with the core definition in one sentence.",
        "Show one simple real-world example.",
        "Give the learner a small practice question.",
        "Finish by asking them to explain the idea in their own words."
      ],
      tag: "LEARNING ASSISTANT"
    };
  }

  if (text.includes("parent")) {
    return {
      title: "Parent communication draft",
      body: "A useful message should be factual, respectful and focused on the next action.",
      bullets: [
        "Mention the student's current academic position.",
        "Reference attendance or marks only where relevant.",
        "Explain the specific area requiring attention.",
        "End with a clear next step for school and family."
      ],
      tag: "COMMUNICATION"
    };
  }

  return {
    title: "SchoolMarks AI is ready",
    body: "I can help turn academic data into practical next steps for teachers and administrators.",
    bullets: [
      "Analyze student or class performance",
      "Identify attendance risks",
      "Build revision and study plans",
      "Generate quizzes and practice questions",
      "Explain difficult academic concepts"
    ],
    tag: "SCHOOLMARKS AI"
  };
}

function Logo({ dark = false }) {
  return (
    <div className={`logo ${dark ? "logo-dark" : ""}`}>
      <div className="logo-mark">
        <span>SM</span>
        <img
          src="/logo/schoolmarks-logo.png"
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div>
        <strong>SchoolMarks</strong>
        <small>Academic Intelligence</small>
      </div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

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
      { threshold: 0.08 }
    );

    observer.observe(node);
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

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`section-heading align-${align}`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function DashboardPreview() {
  const bars = [54, 68, 61, 77, 72, 89, 82, 96, 88, 100, 91, 97];

  return (
    <div className="product-stage">
      <div className="stage-glow" />
      <div className="preview-window">
        <div className="preview-topbar">
          <div className="preview-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-address">app.schoolmarks.io / overview</div>
          <div className="preview-avatar">FK</div>
        </div>

        <div className="preview-layout">
          <aside className="preview-sidebar">
            <div className="preview-mini-logo">SM</div>
            <div className="preview-side-line active" />
            <div className="preview-side-line" />
            <div className="preview-side-line" />
            <div className="preview-side-line" />
            <div className="preview-side-line" />
            <div className="preview-side-line short" />
          </aside>

          <div className="preview-content">
            <div className="preview-heading">
              <div>
                <span>MONDAY, 17 SEPTEMBER</span>
                <h3>Good morning, Faizan.</h3>
              </div>
              <button>+ Add record</button>
            </div>

            <div className="preview-kpis">
              <div>
                <span>Students</span>
                <strong>1,248</strong>
                <small>+8.4%</small>
              </div>
              <div>
                <span>Performance</span>
                <strong>82.4%</strong>
                <small>+3.1%</small>
              </div>
              <div>
                <span>Attendance</span>
                <strong>93.8%</strong>
                <small>+1.8%</small>
              </div>
            </div>

            <div className="preview-grid">
              <div className="preview-chart-card">
                <div className="preview-card-title">
                  <span>Academic performance</span>
                  <MoreHorizontal size={16} />
                </div>
                <div className="preview-chart">
                  <div className="chart-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="chart-bars">
                    {bars.map((height, index) => (
                      <span key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="preview-ai-card">
                <div className="ai-orb-small">
                  <Sparkles size={17} />
                </div>
                <span>AI INSIGHT</span>
                <strong>3 students may need attention.</strong>
                <p>Attendance and marks indicate early intervention opportunities.</p>
                <div className="preview-ai-link">Review signals <ArrowRight size={13} /></div>
              </div>
            </div>

            <div className="preview-table">
              <div className="preview-card-title">
                <span>Student performance</span>
                <span className="preview-view">View all</span>
              </div>
              {studentsSeed.slice(0, 3).map((student) => (
                <div className="preview-row" key={student.name}>
                  <div className="student-mini">
                    <span>{student.name.slice(0, 2)}</span>
                    <div>
                      <strong>{student.name}</strong>
                      <small>{student.className}</small>
                    </div>
                  </div>
                  <strong>{student.avg}%</strong>
                  <div className="preview-progress">
                    <span style={{ width: `${student.avg}%` }} />
                  </div>
                  <span className={`mini-status ${student.status === "At Risk" ? "risk" : ""}`}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="floating-stat stat-one">
        <TrendingUp size={15} />
        <div>
          <strong>+12.8%</strong>
          <span>Class growth</span>
        </div>
      </div>

      <div className="floating-stat stat-two">
        <UserCheck size={15} />
        <div>
          <strong>93.8%</strong>
          <span>Attendance</span>
        </div>
      </div>

      <div className="floating-stat stat-three">
        <BrainCircuit size={15} />
        <div>
          <strong>AI ready</strong>
          <span>24 insights today</span>
        </div>
      </div>
    </div>
  );
}

function HomeAI() {
  const [mode, setMode] = useState("Ask");
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(generateAIAnswer("hello"));

  const run = (value = input) => {
    if (!value.trim()) return;
    setAnswer(generateAIAnswer(value, mode));
    setInput("");
  };

  return (
    <div className="home-ai-box">
      <div className="home-ai-header">
        <div>
          <div className="ai-title-row">
            <div className="ai-icon"><Sparkles size={18} /></div>
            <span>SchoolMarks AI</span>
            <em>LIVE</em>
          </div>
          <h3>Ask your academic data anything.</h3>
        </div>
        <Bot className="home-ai-bot" size={42} />
      </div>

      <div className="ai-mode-row">
        {["Ask", "Analyze", "Plan", "Quiz"].map((item) => (
          <button
            key={item}
            className={mode === item ? "active" : ""}
            onClick={() => setMode(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="home-ai-input">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") run();
          }}
          placeholder={
            mode === "Quiz"
              ? "Generate a quiz about..."
              : mode === "Plan"
                ? "Build a revision plan for..."
                : mode === "Analyze"
                  ? "Analyze class performance..."
                  : "Ask SchoolMarks AI..."
          }
        />
        <button onClick={() => run()}>
          <Send size={17} />
        </button>
      </div>

      <div className="home-ai-suggestions">
        {[
          "Analyze class performance",
          "Find attendance risks",
          "Build a revision plan",
          "Generate a quiz"
        ].map((item) => (
          <button key={item} onClick={() => run(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="home-ai-answer">
        <div className="answer-tag">{answer.tag}</div>
        <h4>{answer.title}</h4>
        <p>{answer.body}</p>
        <div className="answer-list">
          {answer.bullets.map((bullet, index) => (
            <div key={index}>
              <Check size={14} />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage({ openApp }) {
  const marqueeItems = ["STUDENT RECORDS", "ACADEMIC INTELLIGENCE", "SMART ATTENDANCE", "RESULTS", "EXAM MANAGEMENT", "AI INSIGHTS"];

  return (
    <div className="site">
      <header className="public-nav">
        <Logo />
        <nav>
          <a href="#platform">Platform</a>
          <a href="#workflow">Workflow</a>
          <a href="#intelligence">AI Intelligence</a>
          <a href="#features">Features</a>
        </nav>
        <div className="nav-actions">
          <button className="nav-ai" onClick={() => openApp("ai")}>
            <Sparkles size={15} />
            Try AI
          </button>
          <button className="nav-cta" onClick={() => openApp("dashboard")}>
            Open SchoolMarks <ArrowUpRight size={16} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <Reveal className="hero-copy">
            <div className="hero-label">
              <span className="pulse-dot" />
              ACADEMIC INTELLIGENCE PLATFORM
            </div>
            <h1>
              Every student.
              <br />
              <span>Every mark.</span>
              <br />
              One clear system.
            </h1>
            <p>
              SchoolMarks brings students, academics, examinations, marks,
              attendance and performance intelligence into one beautifully
              connected workspace.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => openApp("dashboard")}>
                Explore the dashboard <ArrowRight size={17} />
              </button>
              <a href="#platform" className="secondary-button">
                See how it works <ChevronRight size={16} />
              </a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars">
                <span>AK</span>
                <span>MA</span>
                <span>HR</span>
                <span>+</span>
              </div>
              <div>
                <strong>Built around academic clarity.</strong>
                <small>One connected source of truth for your school.</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-product" delay={140}>
            <DashboardPreview />
          </Reveal>

          <div className="hero-bottom-stats">
            <div><strong>1,248</strong><span>Students tracked</span></div>
            <div><strong>93.8%</strong><span>Attendance visibility</span></div>
            <div><strong>82.4%</strong><span>Average performance</span></div>
            <div><strong>24/7</strong><span>Academic intelligence</span></div>
          </div>
        </section>

        <div className="marquee-wrap">
          <div className="marquee">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index}>
                <i />
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="section problem-section" id="platform">
          <Reveal>
            <SectionHeading
              eyebrow="THE PROBLEM"
              title="Academic data should not live in ten different places."
              description="Spreadsheets, registers, scattered files and disconnected workflows make it harder to see what is actually happening inside a classroom."
            />
          </Reveal>

          <div className="problem-layout">
            <Reveal className="problem-copy">
              <div className="big-number">01</div>
              <h3>Scattered information creates hidden gaps.</h3>
              <p>
                A student's marks tell one story. Attendance tells another.
                Exams, subjects and historical performance often sit somewhere
                else. SchoolMarks connects the full picture.
              </p>
              <div className="problem-points">
                <div><span>01</span><strong>Disconnected records</strong></div>
                <div><span>02</span><strong>Manual reporting</strong></div>
                <div><span>03</span><strong>Late intervention</strong></div>
              </div>
            </Reveal>

            <Reveal className="signal-board" delay={120}>
              <div className="signal-top">
                <span>ACADEMIC SIGNALS</span>
                <Activity size={16} />
              </div>
              <div className="signal-main">
                <div className="signal-circle">
                  <strong>82</strong>
                  <span>overall</span>
                </div>
                <div className="signal-details">
                  <div><span>Marks</span><strong>86%</strong></div>
                  <div><span>Attendance</span><strong>93.8%</strong></div>
                  <div><span>Engagement</span><strong>79%</strong></div>
                </div>
              </div>
              <div className="signal-warning">
                <div><span className="warning-dot" /><strong>3 students need attention</strong></div>
                <ArrowUpRight size={15} />
              </div>
              <div className="signal-wave">
                {[30, 44, 36, 58, 47, 74, 60, 88, 69, 82, 76, 96].map((height, i) => (
                  <span key={i} style={{ height: `${height}%` }} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <Reveal>
            <SectionHeading
              eyebrow="ONE CONNECTED WORKFLOW"
              title="From student records to meaningful action."
              description="SchoolMarks keeps the academic lifecycle connected, so every step has context."
              align="center"
            />
          </Reveal>

          <div className="workflow-line">
            {[
              ["01", "Enroll", "Create complete student records.", Users],
              ["02", "Track", "Capture attendance and academics.", UserCheck],
              ["03", "Assess", "Manage exams and marks.", ClipboardCheck],
              ["04", "Analyze", "Understand performance signals.", LineChart],
              ["05", "Improve", "Act on clear recommendations.", Target]
            ].map(([number, title, text, Icon], index) => (
              <Reveal className="workflow-step" delay={index * 90} key={number}>
                <div className="workflow-number">{number}</div>
                <div className="workflow-icon"><Icon size={21} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                {index !== 4 && <div className="workflow-arrow"><ArrowRight size={16} /></div>}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section modules-section" id="features">
          <Reveal>
            <SectionHeading
              eyebrow="THE PLATFORM"
              title="Everything academic. Connected by design."
              description="A complete operational layer for the information schools manage every day."
            />
          </Reveal>

          <div className="module-grid">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Reveal className="module-card" delay={index * 60} key={module.number}>
                  <div className="module-number">{module.number}</div>
                  <div className="module-icon"><Icon size={22} /></div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <button onClick={() => openApp(module.number === "06" ? "performance" : "dashboard")}>
                    Explore module <ArrowUpRight size={15} />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section intelligence-section" id="intelligence">
          <div className="intelligence-layout">
            <Reveal className="intelligence-copy">
              <div className="eyebrow">SCHOOLMARKS AI</div>
              <h2>Academic intelligence that actually helps you act.</h2>
              <p>
                Ask questions in plain language. Analyze performance. Generate
                quizzes. Build revision plans. Turn school data into practical
                next steps without digging through reports.
              </p>

              <div className="ai-capabilities">
                {[
                  [BrainCircuit, "Ask anything", "Natural language academic assistant."],
                  [BarChart3, "Analyze data", "Spot patterns across students and classes."],
                  [WandSparkles, "Create", "Generate quizzes, plans and reports."],
                  [Lightbulb, "Recommend", "Turn signals into suggested actions."]
                ].map(([Icon, title, text]) => (
                  <div key={title}>
                    <div><Icon size={17} /></div>
                    <span><strong>{title}</strong><small>{text}</small></span>
                  </div>
                ))}
              </div>

              <button className="primary-button" onClick={() => openApp("ai")}>
                Open AI Workspace <ArrowRight size={16} />
              </button>
            </Reveal>

            <Reveal className="intelligence-demo" delay={130}>
              <HomeAI />
            </Reveal>
          </div>
        </section>

        <section className="section analytics-section">
          <Reveal>
            <SectionHeading
              eyebrow="SEE THE FULL PICTURE"
              title="Numbers become useful when they tell a story."
              description="SchoolMarks turns raw academic records into visual signals that are easier to understand and act on."
            />
          </Reveal>

          <div className="analytics-layout">
            <Reveal className="analytics-main">
              <div className="analytics-header">
                <div>
                  <span>AVERAGE PERFORMANCE</span>
                  <strong>82.4%</strong>
                </div>
                <div className="growth-badge"><TrendingUp size={14} /> +3.1%</div>
              </div>
              <div className="large-chart">
                <div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                <div className="large-chart-area">
                  <div className="large-grid-lines">
                    <i /><i /><i /><i /><i />
                  </div>
                  <svg viewBox="0 0 700 260" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0b6041" stopOpacity=".22" />
                        <stop offset="100%" stopColor="#0b6041" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 210 C55 190 65 170 120 184 S190 130 240 150 S310 112 360 128 S430 84 480 102 S550 58 600 78 S660 45 700 50 L700 260 L0 260 Z"
                      fill="url(#areaGradient)"
                    />
                    <path
                      d="M0 210 C55 190 65 170 120 184 S190 130 240 150 S310 112 360 128 S430 84 480 102 S550 58 600 78 S660 45 700 50"
                      fill="none"
                      stroke="#0b6041"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="chart-months">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="analytics-side">
              <Reveal className="metric-card">
                <div className="metric-icon"><UserCheck size={18} /></div>
                <span>Attendance</span>
                <strong>93.8%</strong>
                <div className="metric-bar"><i style={{ width: "93.8%" }} /></div>
                <small>+1.8% from last month</small>
              </Reveal>
              <Reveal className="metric-card" delay={90}>
                <div className="metric-icon"><Trophy size={18} /></div>
                <span>Top performers</span>
                <strong>18.6%</strong>
                <div className="metric-bar"><i style={{ width: "68%" }} /></div>
                <small>Above 90% average</small>
              </Reveal>
              <Reveal className="metric-card" delay={180}>
                <div className="metric-icon"><CircleHelp size={18} /></div>
                <span>Attention group</span>
                <strong>18</strong>
                <div className="metric-bar warning"><i style={{ width: "31%" }} /></div>
                <small>Requires teacher review</small>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section compare-section">
          <Reveal>
            <SectionHeading
              eyebrow="A DIFFERENT WAY TO WORK"
              title="Less administration. More academic visibility."
              description="Move from fragmented academic operations to one connected workspace."
              align="center"
            />
          </Reveal>

          <Reveal className="compare-table">
            <div className="compare-head">
              <span>WORKFLOW</span>
              <strong>TRADITIONAL</strong>
              <strong className="schoolmarks-col">SCHOOLMARKS</strong>
            </div>
            {[
              ["Student records", "Scattered files", "Connected profiles"],
              ["Attendance", "Manual registers", "Live visibility"],
              ["Marks", "Separate sheets", "Centralized records"],
              ["Performance", "Manual analysis", "Visual intelligence"],
              ["Intervention", "After the problem", "Early signals"],
              ["AI assistance", "—", "Built into workflow"]
            ].map(([label, old, current]) => (
              <div className="compare-row" key={label}>
                <strong>{label}</strong>
                <span>{old}</span>
                <span className="schoolmarks-col"><Check size={15} /> {current}</span>
              </div>
            ))}
          </Reveal>
        </section>

        <section className="section cta-section">
          <div className="cta-glow" />
          <Reveal className="cta-content">
            <div className="eyebrow light">READY WHEN YOU ARE</div>
            <h2>Give your school a clearer view of what matters.</h2>
            <p>Explore the SchoolMarks workspace and see the entire academic picture in one place.</p>
            <button className="light-button" onClick={() => openApp("dashboard")}>
              Open SchoolMarks <ArrowRight size={17} />
            </button>
          </Reveal>
        </section>
      </main>

      <footer className="public-footer">
        <Logo />
        <span>Academic operations, connected.</span>
        <div>© 2026 SchoolMarks</div>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button className="mobile-close" onClick={() => setOpen(false)}><X size={19} /></button>
        </div>

        <div className="school-switcher">
          <div className="school-avatar">JM</div>
          <div>
            <strong>JEB School</strong>
            <span>Karachi Campus</span>
          </div>
          <ChevronRight size={15} />
        </div>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={page === item.id ? "active" : ""}
                onClick={() => {
                  setPage(item.id);
                  setOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === "ai" && <em>NEW</em>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button><Settings size={17} /> Settings</button>
          <div className="profile-mini">
            <div>FK</div>
            <span><strong>Faizan Khan</strong><small>Administrator</small></span>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ page, setPage, setSidebarOpen }) {
  const current = navItems.find((item) => item.id === page);

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button>
        <div>
          <span>SchoolMarks / Workspace</span>
          <strong>{current?.label || "Overview"}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="search-button"><Search size={18} /><span>Search</span><kbd>⌘ K</kbd></button>
        <button className="icon-button"><Bell size={18} /><i /></button>
        <button className="top-ai" onClick={() => setPage("ai")}><Sparkles size={15} /> AI Assistant</button>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, trend, negative = false }) {
  return (
    <div className="dashboard-stat">
      <div className="stat-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <div className={`stat-trend ${negative ? "negative" : ""}`}>
        {negative ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
        {trend}
      </div>
    </div>
  );
}

function DashboardPage({ setPage }) {
  const [range, setRange] = useState("8 months");

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">MONDAY · 17 SEPTEMBER 2026</div>
          <h1>Good morning, Faizan.</h1>
          <p>Here is what is happening across your school today.</p>
        </div>
        <div className="heading-actions">
          <button className="outline-button"><RefreshCcw size={16} /> Refresh</button>
          <button className="dark-button" onClick={() => setPage("ai")}><Sparkles size={16} /> Ask AI</button>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <StatCard icon={Users} label="Total students" value="1,248" trend="+8.4%" />
        <StatCard icon={BarChart3} label="Average performance" value="82.4%" trend="+3.1%" />
        <StatCard icon={UserCheck} label="Attendance rate" value="93.8%" trend="+1.8%" />
        <StatCard icon={CircleHelp} label="Students at risk" value="18" trend="-12.2%" negative />
      </div>

      <div className="dashboard-grid-main">
        <div className="dashboard-chart-card">
          <div className="card-heading">
            <div>
              <span>PERFORMANCE OVERVIEW</span>
              <h2>Academic performance</h2>
            </div>
            <select value={range} onChange={(event) => setRange(event.target.value)}>
              <option>8 months</option>
              <option>6 months</option>
              <option>3 months</option>
            </select>
          </div>
          <div className="dashboard-big-chart">
            <div className="big-chart-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
            <div className="big-chart-area">
              {[1, 2, 3, 4, 5].map((item) => <i key={item} />)}
              <svg viewBox="0 0 760 260" preserveAspectRatio="none">
                <path
                  d="M0 214 C60 205 70 174 132 187 S190 148 250 159 S320 116 380 137 S450 92 510 112 S580 68 630 82 S700 48 760 57"
                  fill="none"
                  stroke="#0a5b3e"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M0 214 C60 205 70 174 132 187 S190 148 250 159 S320 116 380 137 S450 92 510 112 S580 68 630 82 S700 48 760 57 L760 260 L0 260 Z"
                  fill="#e7f6ef"
                />
              </svg>
              <div className="big-chart-months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
            </div>
          </div>
        </div>

        <div className="dashboard-ai-card">
          <div className="dashboard-ai-orb"><Sparkles size={19} /></div>
          <div className="ai-card-label">AI ACADEMIC PULSE</div>
          <h2>3 signals worth reviewing today.</h2>
          <div className="ai-signal">
            <span className="signal-icon warning"><CircleHelp size={15} /></span>
            <div><strong>Attendance risk</strong><small>2 students below 80%</small></div>
            <ChevronRight size={15} />
          </div>
          <div className="ai-signal">
            <span className="signal-icon success"><TrendingUp size={15} /></span>
            <div><strong>Class 9-A improved</strong><small>+6.4% this month</small></div>
            <ChevronRight size={15} />
          </div>
          <div className="ai-signal">
            <span className="signal-icon neutral"><Lightbulb size={15} /></span>
            <div><strong>Math needs focus</strong><small>Lowest subject average</small></div>
            <ChevronRight size={15} />
          </div>
          <button onClick={() => setPage("ai")}>Explore with AI <ArrowRight size={15} /></button>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="table-card">
          <div className="card-heading">
            <div>
              <span>STUDENTS</span>
              <h2>Performance snapshot</h2>
            </div>
            <button className="text-button" onClick={() => setPage("students")}>View all <ArrowRight size={14} /></button>
          </div>
          <div className="data-table">
            <div className="table-row table-header">
              <span>Student</span><span>Class</span><span>Average</span><span>Attendance</span><span>Status</span>
            </div>
            {studentsSeed.map((student) => (
              <div className="table-row" key={student.name}>
                <div className="table-student"><span>{student.name.split(" ").map((x) => x[0]).join("")}</span><strong>{student.name}</strong></div>
                <span>{student.className}</span>
                <strong>{student.avg}%</strong>
                <span>{student.attendance}%</span>
                <em className={`status-pill ${student.status === "At Risk" ? "risk" : student.status === "Attention" ? "attention" : ""}`}>{student.status}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="side-card">
          <div className="card-heading">
            <div><span>UPCOMING</span><h2>Examinations</h2></div>
            <CalendarDays size={18} />
          </div>
          {[
            ["18", "Sep", "Mathematics", "09:00 AM"],
            ["20", "Sep", "Computer Science", "10:30 AM"],
            ["23", "Sep", "Physics", "09:00 AM"],
            ["26", "Sep", "English", "11:00 AM"]
          ].map(([day, month, subject, time]) => (
            <div className="exam-mini" key={subject}>
              <div><strong>{day}</strong><span>{month}</span></div>
              <span><strong>{subject}</strong><small>{time}</small></span>
              <ChevronRight size={15} />
            </div>
          ))}
        </div>
      </div>

      <div className="pulse-grid">
        <div className="pulse-card">
          <div className="pulse-card-icon"><Clock3 size={18} /></div>
          <div><span>Today's attendance</span><strong>1,171 present</strong></div>
          <small>93.8%</small>
        </div>
        <div className="pulse-card">
          <div className="pulse-card-icon"><FileText size={18} /></div>
          <div><span>Marks entered</span><strong>84% complete</strong></div>
          <small>+12 today</small>
        </div>
        <div className="pulse-card">
          <div className="pulse-card-icon"><MessageSquareText size={18} /></div>
          <div><span>AI conversations</span><strong>126 this week</strong></div>
          <small>+24%</small>
        </div>
        <div className="pulse-card">
          <div className="pulse-card-icon"><Target size={18} /></div>
          <div><span>Academic goals</span><strong>72% on track</strong></div>
          <small>18 remaining</small>
        </div>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return studentsSeed.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || student.className.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || student.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">STUDENT MANAGEMENT</div>
          <h1>Students</h1>
          <p>Manage student profiles and monitor academic signals.</p>
        </div>
        <button className="dark-button"><Plus size={16} /> Add student</button>
      </div>

      <div className="toolbar">
        <div className="search-field"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students or classes..." /></div>
        <div className="filter-group">
          {["All", "Excellent", "Good", "Attention", "At Risk"].map((item) => (
            <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>
          ))}
        </div>
      </div>

      <div className="large-table-card">
        <div className="table-summary"><span>{filtered.length} students shown</span><button><MoreHorizontal size={18} /></button></div>
        <div className="data-table students-table">
          <div className="table-row table-header">
            <span>Student</span><span>Class</span><span>Average</span><span>Attendance</span><span>Status</span><span>Action</span>
          </div>
          {filtered.map((student) => (
            <div className="table-row" key={student.name}>
              <div className="table-student"><span>{student.name.split(" ").map((x) => x[0]).join("")}</span><strong>{student.name}</strong></div>
              <span>{student.className}</span>
              <div className="score-cell"><strong>{student.avg}%</strong><div><i style={{ width: `${student.avg}%` }} /></div></div>
              <span>{student.attendance}%</span>
              <em className={`status-pill ${student.status === "At Risk" ? "risk" : student.status === "Attention" ? "attention" : ""}`}>{student.status}</em>
              <button className="row-action"><MoreHorizontal size={17} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AcademicsPage() {
  const subjects = [
    ["Mathematics", "86%", 86, "Strong"],
    ["Computer Science", "92%", 92, "Excellent"],
    ["English", "81%", 81, "Good"],
    ["Physics", "78%", 78, "Good"],
    ["Chemistry", "74%", 74, "Attention"],
    ["Urdu", "88%", 88, "Strong"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><div className="page-eyebrow">ACADEMIC MANAGEMENT</div><h1>Academics</h1><p>Keep classes, subjects and curriculum progress aligned.</p></div>
        <button className="dark-button"><Plus size={16} /> Add subject</button>
      </div>

      <div className="academic-hero">
        <div><span>CURRICULUM PROGRESS</span><strong>76%</strong><p>Across all active subjects and classes</p></div>
        <div className="academic-progress"><i /></div>
        <div className="academic-meta"><span>Completed <strong>61 units</strong></span><span>Remaining <strong>19 units</strong></span></div>
      </div>

      <div className="subject-grid">
        {subjects.map(([name, score, value, status]) => (
          <div className="subject-card" key={name}>
            <div className="subject-icon"><BookOpen size={18} /></div>
            <div className="subject-head"><span>{name}</span><strong>{score}</strong></div>
            <div className="subject-bar"><i style={{ width: `${value}%` }} /></div>
            <div className="subject-foot"><span>Class average</span><em>{status}</em></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsPage() {
  const exams = [
    ["18", "SEP", "Mathematics", "9-A · 9-B · 9-C", "09:00 AM", "Ready"],
    ["20", "SEP", "Computer Science", "9-A · 9-B", "10:30 AM", "Ready"],
    ["23", "SEP", "Physics", "9-A · 9-C", "09:00 AM", "Draft"],
    ["26", "SEP", "English", "9-A · 9-B · 9-C", "11:00 AM", "Ready"],
    ["29", "SEP", "Chemistry", "9-A · 9-B · 9-C", "09:00 AM", "Draft"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><div className="page-eyebrow">EXAMINATIONS</div><h1>Examination center</h1><p>Plan assessments and keep every exam detail visible.</p></div>
        <button className="dark-button"><Plus size={16} /> Create exam</button>
      </div>

      <div className="exam-overview">
        <div><CalendarDays size={20} /><span><strong>12</strong> upcoming exams</span></div>
        <div><ClipboardCheck size={20} /><span><strong>8</strong> ready for assessment</span></div>
        <div><Clock3 size={20} /><span><strong>34h</strong> scheduled this month</span></div>
      </div>

      <div className="timeline-card">
        <div className="card-heading"><div><span>EXAM CALENDAR</span><h2>Upcoming assessments</h2></div><button className="outline-button">Calendar view</button></div>
        <div className="exam-timeline">
          {exams.map(([day, month, subject, classes, time, status]) => (
            <div className="exam-line" key={subject}>
              <div className="exam-date"><strong>{day}</strong><span>{month}</span></div>
              <div className="exam-line-dot" />
              <div className="exam-info"><strong>{subject}</strong><span>{classes}</span></div>
              <div className="exam-time"><Clock3 size={14} /> {time}</div>
              <em className={status === "Draft" ? "draft" : ""}>{status}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarksPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><div className="page-eyebrow">MARKS MANAGEMENT</div><h1>Marks & results</h1><p>Enter, review and publish academic results.</p></div>
        <button className="dark-button" onClick={() => setSaved(true)}><Check size={16} /> {saved ? "Saved" : "Save changes"}</button>
      </div>

      <div className="marks-toolbar">
        <div><span>EXAMINATION</span><strong>Mid Term Assessment · 2026</strong></div>
        <div><span>CLASS</span><strong>Grade 9 · All sections</strong></div>
        <div><span>SUBJECT</span><strong>Computer Science</strong></div>
      </div>

      <div className="marks-card">
        <div className="data-table marks-table">
          <div className="table-row table-header"><span>Student</span><span>Quiz</span><span>Midterm</span><span>Assignment</span><span>Total</span><span>Grade</span></div>
          {[
            ["Ayaan Khan", 18, 44, 18, 80, "A"],
            ["Areeba Khan", 20, 48, 20, 88, "A+"],
            ["Maham Ali", 17, 42, 17, 76, "A"],
            ["Hassan Raza", 15, 39, 16, 70, "B+"],
            ["Rayyan Malik", 13, 31, 15, 59, "C"],
            ["Zayan Ahmed", 11, 27, 13, 51, "D"]
          ].map(([name, quiz, mid, assignment, total, grade]) => (
            <div className="table-row" key={name}>
              <div className="table-student"><span>{name.split(" ").map((x) => x[0]).join("")}</span><strong>{name}</strong></div>
              <input defaultValue={quiz} />
              <input defaultValue={mid} />
              <input defaultValue={assignment} />
              <strong>{total}/100</strong>
              <em className={`grade-badge ${grade === "D" ? "bad" : ""}`}>{grade}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  const distribution = [
    ["A+", 18, "24%"],
    ["A", 32, "42%"],
    ["B", 18, "24%"],
    ["C", 6, "8%"],
    ["D", 2, "2%"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><div className="page-eyebrow">RESULTS INTELLIGENCE</div><h1>Results</h1><p>Understand achievement across your school at a glance.</p></div>
        <button className="outline-button"><FileText size={16} /> Export report</button>
      </div>

      <div className="result-stat-grid">
        <div><span>Overall average</span><strong>82.4%</strong><small><TrendingUp size={13} /> +3.1%</small></div>
        <div><span>Pass rate</span><strong>96.8%</strong><small><TrendingUp size={13} /> +2.4%</small></div>
        <div><span>Top grade</span><strong>A+</strong><small>18 students</small></div>
        <div><span>Need support</span><strong>8</strong><small>Immediate review</small></div>
      </div>

      <div className="results-grid">
        <div className="distribution-card">
          <div className="card-heading"><div><span>GRADE DISTRIBUTION</span><h2>Class results</h2></div><PieChart size={19} /></div>
          <div className="distribution">
            {distribution.map(([grade, count, percent]) => (
              <div key={grade}>
                <div className="distribution-label"><strong>{grade}</strong><span>{count} students</span><em>{percent}</em></div>
                <div><i style={{ width: percent }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="top-students-card">
          <div className="card-heading"><div><span>LEADING STUDENTS</span><h2>Top performers</h2></div><Trophy size={19} /></div>
          {studentsSeed.filter((x) => x.avg >= 80).sort((a, b) => b.avg - a.avg).map((student, index) => (
            <div className="top-student" key={student.name}>
              <span className="rank">{String(index + 1).padStart(2, "0")}</span>
              <div className="table-student"><span>{student.name.slice(0, 2)}</span><strong>{student.name}</strong></div>
              <strong>{student.avg}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendancePage() {
  const attendance = [
    ["Areeba Khan", "9-B", 98, "Excellent"],
    ["Ayaan Khan", "9-A", 96, "Excellent"],
    ["Maham Ali", "9-A", 91, "Good"],
    ["Hassan Raza", "9-C", 88, "Good"],
    ["Rayyan Malik", "9-C", 79, "Attention"],
    ["Zayan Ahmed", "9-B", 73, "At Risk"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><div className="page-eyebrow">ATTENDANCE INTELLIGENCE</div><h1>Attendance</h1><p>See attendance trends before they become academic problems.</p></div>
        <button className="dark-button"><Plus size={16} /> Record attendance</button>
      </div>

      <div className="attendance-overview">
        <div className="attendance-ring">
          <div><strong>93.8%</strong><span>overall</span></div>
        </div>
        <div className="attendance-copy"><span>SCHOOL ATTENDANCE</span><h2>Strong overall attendance with a small intervention group.</h2><p>Two students are currently below the 80% threshold and should be reviewed.</p></div>
        <div className="attendance-bars">
          <div><span>Present</span><strong>93.8%</strong><i><b style={{ width: "93.8%" }} /></i></div>
          <div><span>Absent</span><strong>4.2%</strong><i><b style={{ width: "4.2%" }} /></i></div>
          <div><span>Leave</span><strong>2%</strong><i><b style={{ width: "2%" }} /></i></div>
        </div>
      </div>

      <div className="large-table-card">
        <div className="table-summary"><span>Student attendance</span><button><Filter size={16} /></button></div>
        <div className="data-table">
          <div className="table-row table-header"><span>Student</span><span>Class</span><span>Attendance</span><span>Monthly trend</span><span>Status</span></div>
          {attendance.map(([name, className, percentage, status]) => (
            <div className="table-row" key={name}>
              <div className="table-student"><span>{name.slice(0, 2)}</span><strong>{name}</strong></div>
              <span>{className}</span>
              <strong>{percentage}%</strong>
              <div className="trend-line"><i style={{ width: `${percentage}%` }} /></div>
              <em className={`status-pill ${percentage < 80 ? "risk" : percentage < 90 ? "attention" : ""}`}>{status}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  const subjects = [
    ["Computer Science", 92, "+6.2%", "up"],
    ["Mathematics", 86, "+3.8%", "up"],
    ["Urdu", 88, "+2.9%", "up"],
    ["English", 81, "+1.2%", "up"],
    ["Physics", 78, "-1.4%", "down"],
    ["Chemistry", 74, "-2.8%", "down"]
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><div className="page-eyebrow">PERFORMANCE ANALYTICS</div><h1>Performance</h1><p>Understand where students are improving and where support is needed.</p></div>
        <button className="outline-button"><BarChart3 size={16} /> Generate report</button>
      </div>

      <div className="performance-hero">
        <div className="performance-score"><span>OVERALL SCORE</span><strong>82.4</strong><small>/ 100</small></div>
        <div className="performance-copy"><h2>Academic momentum is positive.</h2><p>Four of six tracked subjects are moving upward this term.</p><div><TrendingUp size={15} /> +3.1% overall growth</div></div>
        <div className="performance-mini-chart">
          {[42, 50, 47, 62, 58, 70, 67, 78, 74, 88, 82, 94].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
        </div>
      </div>

      <div className="performance-subjects">
        {subjects.map(([subject, score, change, direction], index) => (
          <Reveal className="performance-subject" delay={index * 50} key={subject}>
            <div className="subject-rank">{String(index + 1).padStart(2, "0")}</div>
            <div className="performance-subject-name"><strong>{subject}</strong><span>School average</span></div>
            <strong className="performance-score-small">{score}%</strong>
            <div className="performance-progress"><i style={{ width: `${score}%` }} /></div>
            <span className={`change ${direction}`} >{direction === "up" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{change}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function AIPage() {
  const [mode, setMode] = useState("Ask");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      answer: generateAIAnswer("hello"),
      time: "Now"
    }
  ]);

  const sendMessage = (value = input) => {
    if (!value.trim() || typing) return;

    const prompt = value.trim();
    setInput("");
    setMessages((current) => [...current, { role: "user", text: prompt, time: "Now" }]);
    setTyping(true);

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          answer: generateAIAnswer(prompt, mode),
          time: "Now"
        }
      ]);
      setTyping(false);
    }, 550);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        answer: generateAIAnswer("hello"),
        time: "Now"
      }
    ]);
  };

  const tools = [
    [BarChart3, "Analyze performance", "Find patterns in class results", "Analyze class performance"],
    [CalendarDays, "Build a study plan", "Create a focused revision schedule", "Build a revision plan for Grade 9"],
    [UserCheck, "Attendance risks", "Find students below threshold", "Find attendance risks"],
    [Calculator, "Generate a quiz", "Create classroom questions", "Generate a quiz about computer science"],
    [Lightbulb, "Explain a topic", "Break down a difficult concept", "Explain a difficult science topic"],
    [MessageSquareText, "Parent message", "Draft a professional update", "Draft a parent message"]
  ];

  return (
    <div className="ai-page">
      <div className="ai-workspace-head">
        <div>
          <div className="page-eyebrow">SCHOOLMARKS INTELLIGENCE</div>
          <h1>AI Workspace</h1>
          <p>Your academic copilot for analysis, planning and everyday school decisions.</p>
        </div>
        <button className="outline-button" onClick={clearChat}><RefreshCcw size={15} /> Clear conversation</button>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat">
          <div className="chat-header">
            <div className="chat-agent">
              <div className="chat-agent-icon"><Sparkles size={18} /></div>
              <div><strong>SchoolMarks AI</strong><span><i /> Online · Academic assistant</span></div>
            </div>
            <div className="chat-modes">
              {["Ask", "Analyze", "Plan", "Quiz"].map((item) => (
                <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="chat-scroll">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={index}>
                {message.role === "assistant" && <div className="message-avatar"><Sparkles size={14} /></div>}
                <div className="message-bubble">
                  {message.role === "user" ? (
                    <p>{message.text}</p>
                  ) : (
                    <>
                      <span className="answer-tag">{message.answer.tag}</span>
                      <h3>{message.answer.title}</h3>
                      <p>{message.answer.body}</p>
                      <div className="chat-answer-list">
                        {message.answer.bullets.map((bullet, bulletIndex) => (
                          <div key={bulletIndex}><Check size={14} /><span>{bullet}</span></div>
                        ))}
                      </div>
                    </>
                  )}
                  <small>{message.time}</small>
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat-message assistant">
                <div className="message-avatar"><Sparkles size={14} /></div>
                <div className="typing-bubble"><span /><span /><span /></div>
              </div>
            )}
          </div>

          <div className="chat-composer">
            <div className="composer-input">
              <Sparkles size={16} />
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                placeholder={
                  mode === "Quiz"
                    ? "What should I make a quiz about?"
                    : mode === "Plan"
                      ? "What should I build a plan for?"
                      : "Ask anything about your academic data..."
                }
              />
              <button onClick={() => sendMessage()} disabled={!input.trim() || typing}><Send size={17} /></button>
            </div>
            <small>SchoolMarks AI uses the academic context available in your workspace.</small>
          </div>
        </div>

        <aside className="ai-tools">
          <div className="ai-tools-head"><span>AI TOOLS</span><Zap size={16} /></div>
          <h2>What do you want to do?</h2>
          <div className="tool-list">
            {tools.map(([Icon, title, description, prompt]) => (
              <button className="tool-item" key={title} onClick={() => sendMessage(prompt)}>
                <div><Icon size={17} /></div>
                <span><strong>{title}</strong><small>{description}</small></span>
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>

          <div className="live-signals">
            <div><span>LIVE SCHOOL SIGNALS</span><Activity size={15} /></div>
            <div><i /><span>93.8% attendance</span><strong>Healthy</strong></div>
            <div><i /><span>82.4% performance</span><strong>Growing</strong></div>
            <div><i className="warning" /><span>18 at-risk students</span><strong>Review</strong></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AppLayout({ page, setPage, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="app-main">
        <Topbar page={page} setPage={setPage} setSidebarOpen={setSidebarOpen} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const openApp = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "home") {
    return <HomePage openApp={openApp} />;
  }

  let content = <DashboardPage setPage={setPage} />;

  if (page === "students") content = <StudentsPage />;
  if (page === "academics") content = <AcademicsPage />;
  if (page === "exams") content = <ExamsPage />;
  if (page === "marks") content = <MarksPage />;
  if (page === "results") content = <ResultsPage />;
  if (page === "attendance") content = <AttendancePage />;
  if (page === "performance") content = <PerformancePage />;
  if (page === "ai") content = <AIPage />;

  return (
    <AppLayout page={page} setPage={setPage}>
      {content}
    </AppLayout>
  );
}

