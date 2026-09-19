import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const studentsSeed = [
  { id: 1, name: "Ahmed Raza", className: "9-A", avg: 91, attendance: 96 },
  { id: 2, name: "Areeba Khan", className: "9-A", avg: 88, attendance: 94 },
  { id: 3, name: "Hamza Ali", className: "9-B", avg: 84, attendance: 91 },
  { id: 4, name: "Maham Noor", className: "9-B", avg: 96, attendance: 98 },
  { id: 5, name: "Usman Tariq", className: "9-C", avg: 79, attendance: 87 },
  { id: 6, name: "Hiba Fatima", className: "9-C", avg: 93, attendance: 95 },
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Exams", icon: CalendarDays },
  { id: "marks", label: "Marks", icon: ClipboardCheck },
  { id: "attendance", label: "Attendance", icon: Clock3 },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "ai", label: "AI Assistant", icon: BrainCircuit },
];

const problems = [
  {
    title: "Paper registers",
    text: "Marks and attendance disappear into notebooks, folders and disconnected files.",
    icon: ClipboardCheck,
  },
  {
    title: "WhatsApp messages",
    text: "Important academic updates get buried inside everyday conversations.",
    icon: MessageSquareText,
  },
  {
    title: "Spreadsheets",
    text: "Teachers spend hours managing rows instead of focusing on students.",
    icon: BarChart3,
  },
  {
    title: "Manual reports",
    text: "Creating meaningful performance reports becomes repetitive every term.",
    icon: Activity,
  },
];

const workflow = [
  {
    title: "Register students",
    text: "Create student profiles with class, subjects, attendance and academic records.",
    icon: Users,
  },
  {
    title: "Record marks",
    text: "Enter assessments once and keep every result connected to the student.",
    icon: ClipboardCheck,
  },
  {
    title: "Track attendance",
    text: "Monitor attendance patterns without maintaining separate registers.",
    icon: Clock3,
  },
  {
    title: "Analyze performance",
    text: "Turn marks and attendance into useful academic insights.",
    icon: BarChart3,
  },
  {
    title: "AI insights",
    text: "Ask questions about students and receive structured academic insights.",
    icon: BrainCircuit,
  },
  {
    title: "Permanent history",
    text: "Keep a continuous academic record from first entry to future results.",
    icon: ShieldCheck,
  },
];

const modules = [
  {
    number: "01",
    title: "Student Management",
    text: "Keep every student profile organized in one place.",
    icon: Users,
  },
  {
    number: "02",
    title: "Marks & Results",
    text: "Record assessments and instantly understand class performance.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Attendance",
    text: "Track attendance trends and identify students who need attention.",
    icon: Clock3,
  },
  {
    number: "04",
    title: "Academic Analytics",
    text: "Turn school data into clear visual performance signals.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "AI Assistant",
    text: "Ask natural-language questions about your academic data.",
    icon: BrainCircuit,
  },
  {
    number: "06",
    title: "Permanent Records",
    text: "Build a reliable academic history for every student.",
    icon: ShieldCheck,
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Reveal({ children, className = "", delay = 0 }) {
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
      { threshold: 0.12 }
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

function Logo({ dark = false }) {
  return (
    <div className={`logo ${dark ? "logo-dark" : ""}`}>
      <div className="logo-image">
        <img src="/logo.png" alt="SchoolMarks" />
        <span>SM</span>
      </div>
      <div className="logo-copy">
        <strong>SchoolMarks</strong>
        <small>Academic intelligence</small>
      </div>
    </div>
  );
}

function ProductDashboard() {
  return (
    <div className="product-stage">
      <div className="stage-glow stage-glow-one" />
      <div className="stage-glow stage-glow-two" />

      <div className="preview-window">
        <div className="preview-topbar">
          <div className="preview-dots">
            <i />
            <i />
            <i />
          </div>

          <div className="preview-address">
            schoolmarks.app/dashboard
          </div>

          <div className="preview-avatar">FK</div>
        </div>

        <div className="preview-layout">
          <aside className="preview-sidebar">
            <div className="preview-brand">
              <div>SM</div>
              <span>SchoolMarks</span>
            </div>

            {["Overview", "Students", "Academics", "Marks", "Attendance"].map(
              (item, index) => (
                <div
                  className={`preview-nav ${index === 0 ? "active" : ""}`}
                  key={item}
                >
                  <span />
                  {item}
                </div>
              )
            )}
          </aside>

          <div className="preview-content">
            <div className="preview-heading">
              <div>
                <small>ACADEMIC OVERVIEW</small>
                <h3>Good morning, Faizan</h3>
              </div>
              <div className="preview-live">
                <span />
                Live
              </div>
            </div>

            <div className="preview-kpis">
              <div>
                <small>Total Students</small>
                <strong>842</strong>
                <em>+24 this month</em>
              </div>
              <div>
                <small>Average Score</small>
                <strong>87.4%</strong>
                <em>+3.2% vs term start</em>
              </div>
              <div>
                <small>Attendance</small>
                <strong>94.8%</strong>
                <em>+1.8% this month</em>
              </div>
              <div>
                <small>At Risk</small>
                <strong>18</strong>
                <em className="negative">Needs attention</em>
              </div>
            </div>

            <div className="preview-grid">
              <div className="preview-chart-card">
                <div className="preview-card-head">
                  <div>
                    <small>CLASS PERFORMANCE</small>
                    <strong>Academic progress</strong>
                  </div>
                  <span>Last 6 months</span>
                </div>

                <div className="preview-chart">
                  <div className="chart-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <svg viewBox="0 0 500 180" preserveAspectRatio="none">
                    <path
                      d="M0 145 C40 130 55 138 90 116 S140 104 170 111 S220 86 255 92 S310 62 340 72 S390 40 425 52 S465 25 500 35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
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
              </div>

              <div className="preview-ai-card">
                <div className="preview-ai-icon">
                  <Sparkles size={15} />
                </div>
                <small>AI INSIGHT</small>
                <strong>Performance signal detected</strong>
                <p>
                  18 students show a drop in Mathematics performance over the
                  last two assessments.
                </p>
                <button>Review students <ArrowUpRight size={14} /></button>
              </div>
            </div>

            <div className="preview-table">
              <div className="preview-table-head">
                <span>Student</span>
                <span>Class</span>
                <span>Average</span>
                <span>Attendance</span>
                <span>Status</span>
              </div>

              {[
                ["Areeba Khan", "9-A", "94%", "97%", "Excellent"],
                ["Maham Noor", "9-B", "91%", "95%", "On track"],
                ["Ahmed Raza", "9-A", "87%", "93%", "On track"],
              ].map((row) => (
                <div className="preview-table-row" key={row[0]}>
                  <span>{row[0]}</span>
                  <span>{row[1]}</span>
                  <span>{row[2]}</span>
                  <span>{row[3]}</span>
                  <span>{row[4]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="floating-stat floating-stat-one">
        <TrendingUp size={16} />
        <div>
          <strong>+12.8%</strong>
          <span>Class progress</span>
        </div>
      </div>

      <div className="floating-stat floating-stat-two">
        <CircleCheck size={16} />
        <div>
          <strong>94.8%</strong>
          <span>Attendance</span>
        </div>
      </div>
    </div>
  );
}

function HomeAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = () => {
    const q = question.toLowerCase();

    if (!question.trim()) {
      setAnswer("Ask me something about your students, marks or attendance.");
      return;
    }

    if (q.includes("attendance")) {
      setAnswer(
        "Class 9-A currently has the strongest attendance at 95.8%. Three students are below the 85% attention threshold."
      );
      return;
    }

    if (q.includes("top") || q.includes("best")) {
      setAnswer(
        "Maham Noor is currently the highest-performing student with a 96% average and 98% attendance."
      );
      return;
    }

    if (q.includes("math")) {
      setAnswer(
        "Mathematics is the main improvement area this term. The class average is 82%, with performance improving across the latest assessment."
      );
      return;
    }

    setAnswer(
      "Based on the current academic records, overall class performance is trending positively with an average score of 87.4%."
    );
  };

  return (
    <div className="home-ai-box">
      <div className="home-ai-header">
        <div className="ai-title-row">
          <div className="ai-icon">
            <BrainCircuit size={18} />
          </div>
          <div>
            <small>SchoolMarks Intelligence</small>
            <strong>Ask your academic data</strong>
          </div>
        </div>
        <div className="home-ai-bot">
          <span />
          Online
        </div>
      </div>

      <div className="ai-mode-row">
        <span>Ask anything about your school</span>
        <Sparkles size={14} />
      </div>

      <div className="home-ai-input">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") ask();
          }}
          placeholder="e.g. Which students need attention?"
        />
        <button onClick={ask}>
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="home-ai-suggestions">
        {["Who has the best attendance?", "Show top students", "How is Maths doing?"].map(
          (item) => (
            <button
              key={item}
              onClick={() => {
                setQuestion(item);
                setTimeout(ask, 0);
              }}
            >
              {item}
            </button>
          )
        )}
      </div>

      {answer && (
        <div className="home-ai-answer">
          <div className="answer-head">
            <Sparkles size={15} />
            <span>AI response</span>
          </div>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

function HomePage({ onOpenApp }) {
  return (
    <div className="public-site">
      <nav className="public-nav">
        <Logo />

        <div className="public-nav-links">
          <a href="#problem">Why SchoolMarks</a>
          <a href="#workflow">Workflow</a>
          <a href="#modules">Platform</a>
          <a href="#ai">AI</a>
        </div>

        <div className="nav-actions">
          <button className="nav-ai" onClick={onOpenApp}>
            Open platform
            <ArrowUpRight size={15} />
          </button>
          <button className="nav-cta" onClick={onOpenApp}>
            Get started
            <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="hero-copy">
            <Reveal>
              <div className="hero-label">
                <span className="pulse-dot" />
                Modern academic management
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h1>
                Every student.
                <br />
                <span>One academic history.</span>
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <p>
                SchoolMarks brings students, marks, attendance, exams,
                performance and AI-powered insights into one intelligent
                academic platform.
              </p>
            </Reveal>

            <Reveal delay={190}>
              <div className="hero-buttons">
                <button className="primary-button" onClick={onOpenApp}>
                  Explore SchoolMarks
                  <ArrowRight size={17} />
                </button>
                <a className="secondary-button" href="#workflow">
                  See how it works
                  <ArrowDown size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="hero-proof">
                <div className="proof-avatars">
                  <span>AK</span>
                  <span>AN</span>
                  <span>MR</span>
                  <span>HN</span>
                </div>
                <div>
                  <strong>Built for modern schools</strong>
                  <small>Students · Teachers · Administrators</small>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="hero-product">
            <ProductDashboard />
          </Reveal>

          <div className="hero-bottom-stats">
            <div>
              <strong>842+</strong>
              <span>Students managed</span>
            </div>
            <div>
              <strong>94.8%</strong>
              <span>Average attendance</span>
            </div>
            <div>
              <strong>87.4%</strong>
              <span>Academic average</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Academic visibility</span>
            </div>
          </div>
        </section>

        <div className="marquee-wrap">
          <div className="marquee">
            {[
              "Schools",
              "Teachers",
              "Students",
              "Administrators",
              "Academic Teams",
              "Coordinators",
              "Modern Classrooms",
              "Schools",
              "Teachers",
              "Students",
              "Administrators",
              "Academic Teams",
            ].map((item, index) => (
              <span key={`${item}-${index}`}>
                <i />
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="section problem-section" id="problem">
          <Reveal>
            <div className="section-eyebrow">THE PROBLEM</div>
            <h2>
              Academic data shouldn't
              <br />
              live in <span>four different places.</span>
            </h2>
            <p className="section-intro">
              Schools still rely on disconnected tools for marks, attendance,
              student records and reports. SchoolMarks brings those signals
              together.
            </p>
          </Reveal>

          <div className="problem-layout">
            <div className="problem-points">
              {problems.map((problem, index) => {
                const Icon = problem.icon;

                return (
                  <Reveal delay={index * 70} key={problem.title}>
                    <div className="problem-point">
                      <div className="problem-icon">
                        <Icon size={18} />
                      </div>
                      <div>
                        <strong>{problem.title}</strong>
                        <p>{problem.text}</p>
                      </div>
                      <ArrowUpRight size={17} />
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="signal-board" delay={150}>
              <div className="signal-main">
                <div className="signal-circle">
                  <span />
                  <strong>1</strong>
                </div>
                <small>SchoolMarks</small>
                <h3>One academic source of truth.</h3>
                <p>
                  Connect the information that teachers already collect and
                  turn it into a continuous academic record.
                </p>
              </div>

              <div className="signal-details">
                <div>
                  <span>Marks</span>
                  <strong>Connected</strong>
                </div>
                <div>
                  <span>Attendance</span>
                  <strong>Connected</strong>
                </div>
                <div>
                  <span>Results</span>
                  <strong>Connected</strong>
                </div>
                <div>
                  <span>Insights</span>
                  <strong>Connected</strong>
                </div>
              </div>

              <div className="signal-warning">
                <Sparkles size={16} />
                <span>Academic intelligence active</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <Reveal>
            <div className="section-eyebrow">THE WORKFLOW</div>
            <h2>
              From first entry to
              <br />
              <span>permanent academic history.</span>
            </h2>
            <p className="section-intro">
              Every important academic event becomes part of the same
              connected student record.
            </p>
          </Reveal>

          <div className="workflow-line">
            {workflow.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal
                  delay={index * 80}
                  className="workflow-step"
                  key={step.title}
                >
                  <div className="workflow-number">0{index + 1}</div>
                  <div className="workflow-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  {index < workflow.length - 1 && (
                    <div className="workflow-arrow">
                      <ArrowRight size={15} />
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section intelligence-section" id="ai">
          <div className="intelligence-layout">
            <Reveal className="intelligence-copy">
              <div className="light-eyebrow">
                <Sparkles size={14} />
                SCHOOLMARKS AI
              </div>
              <h2>
                Your school data can
                <br />
                <span>answer questions.</span>
              </h2>
              <p>
                Instead of searching through spreadsheets, ask SchoolMarks
                what is happening across your students and classes.
              </p>

              <div className="ai-capabilities">
                <div>
                  <Check size={15} />
                  Student performance analysis
                </div>
                <div>
                  <Check size={15} />
                  Attendance signals
                </div>
                <div>
                  <Check size={15} />
                  Class-level insights
                </div>
                <div>
                  <Check size={15} />
                  Natural-language questions
                </div>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <HomeAI />
            </Reveal>
          </div>
        </section>

        <section className="section modules-section" id="modules">
          <Reveal>
            <div className="section-eyebrow">THE PLATFORM</div>
            <h2>
              Everything your school needs.
              <br />
              <span>Nothing scattered.</span>
            </h2>
          </Reveal>

          <div className="module-grid">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <Reveal delay={index * 60} key={module.title}>
                  <div className="module-card">
                    <div className="module-number">{module.number}</div>
                    <div className="module-icon">
                      <Icon size={19} />
                    </div>
                    <h3>{module.title}</h3>
                    <p>{module.text}</p>
                    <ArrowUpRight className="module-arrow" size={17} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section analytics-section">
          <Reveal>
            <div className="section-eyebrow">ACADEMIC ANALYTICS</div>
            <h2>
              See performance
              <br />
              <span>as it changes.</span>
            </h2>
          </Reveal>

          <div className="analytics-layout">
            <Reveal className="analytics-main">
              <div className="analytics-header">
                <div>
                  <small>CLASS PERFORMANCE</small>
                  <strong>Average academic score</strong>
                </div>
                <div className="growth-badge">
                  <TrendingUp size={14} />
                  +8.4%
                </div>
              </div>

              <div className="large-chart">
                <div className="chart-y">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                <div className="large-chart-area">
                  <div className="large-grid-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <svg viewBox="0 0 800 300" preserveAspectRatio="none">
                    <path
                      d="M0 238 C50 220 70 228 120 202 S180 198 230 210 S285 174 330 185 S390 142 440 160 S495 122 545 132 S600 90 650 106 S720 58 800 68"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>

                  <div className="chart-months">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="analytics-side">
              {[
                ["Students", "842", "+24"],
                ["Attendance", "94.8%", "+1.8%"],
                ["Avg. marks", "87.4%", "+3.2%"],
              ].map((item, index) => (
                <Reveal delay={index * 90} key={item[0]}>
                  <div className="metric-card">
                    <div className="metric-icon">
                      {index === 0 ? (
                        <Users size={17} />
                      ) : index === 1 ? (
                        <Clock3 size={17} />
                      ) : (
                        <Target size={17} />
                      )}
                    </div>
                    <div>
                      <small>{item[0]}</small>
                      <strong>{item[1]}</strong>
                    </div>
                    <span>{item[2]}</span>
                    <div className="metric-bar">
                      <i style={{ width: `${72 + index * 8}%` }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section compare-section">
          <Reveal>
            <div className="section-eyebrow">WHY SCHOOLMARKS</div>
            <h2>
              From fragmented records
              <br />
              <span>to one continuous system.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="compare-table">
              <div className="compare-head">
                <span>Traditional school management</span>
                <span className="schoolmarks-col">SchoolMarks</span>
              </div>

              {[
                ["Paper registers", "Digital student records"],
                ["Separate spreadsheets", "Connected academic data"],
                ["Manual calculations", "Automatic performance insights"],
                ["Scattered attendance", "Central attendance history"],
                ["Static reports", "Live analytics"],
                ["Search everything manually", "Ask SchoolMarks AI"],
              ].map((row) => (
                <div className="compare-row" key={row[0]}>
                  <span>
                    <X size={15} />
                    {row[0]}
                  </span>
                  <span className="schoolmarks-col">
                    <Check size={15} />
                    {row[1]}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="cta-section">
          <div className="cta-glow" />
          <Reveal className="cta-content">
            <div className="section-eyebrow">SCHOOLMARKS</div>
            <h2>
              Build a better academic
              <br />
              <span>record for every student.</span>
            </h2>
            <p>
              Bring marks, attendance, performance and academic intelligence
              together in one modern platform.
            </p>

            <div className="cta-buttons">
              <button className="light-button" onClick={onOpenApp}>
                Open SchoolMarks
                <ArrowRight size={16} />
              </button>
              <a className="dark-button" href="#workflow">
                Explore workflow
                <ArrowDown size={15} />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="public-footer">
        <Logo dark />
        <div className="footer-links">
          <a href="#problem">Problem</a>
          <a href="#workflow">Workflow</a>
          <a href="#modules">Platform</a>
          <a href="#ai">AI</a>
        </div>
        <span>© 2026 SchoolMarks</span>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button className="mobile-close" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="school-switcher">
          <div className="school-avatar">JS</div>
          <div>
            <strong>JEB School</strong>
            <span>Secondary Campus</span>
          </div>
          <ChevronRight size={15} />
        </div>

        <div className="sidebar-label">Workspace</div>

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
                {item.id === "ai" && <em>AI</em>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-setting">
            <ShieldCheck size={17} />
            <span>Academic records protected</span>
          </button>

          <div className="profile-mini">
            <div>FK</div>
            <span>
              <strong>Faizan Khan</strong>
              <small>Administrator</small>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ setOpen, onHome }) {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={() => setOpen(true)}>
          <Menu size={20} />
        </button>
        <button className="breadcrumb-home" onClick={onHome}>
          SchoolMarks
        </button>
        <ChevronRight size={14} />
        <span>Academic workspace</span>
      </div>

      <div className="topbar-actions">
        <button className="search-button">
          <Search size={17} />
          <span>Search</span>
          <kbd>⌘ K</kbd>
        </button>

        <button className="icon-button">
          <Activity size={18} />
        </button>

        <button className="top-ai">
          <Sparkles size={16} />
          AI
        </button>

        <div className="top-avatar">FK</div>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, trend, danger }) {
  return (
    <div className="dashboard-stat">
      <div className="stat-icon">
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={danger ? "danger-text" : ""}>{trend}</small>
    </div>
  );
}

function DashboardPage({ students }) {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">OVERVIEW</div>
          <h1>Good morning, Faizan.</h1>
          <p>Here is what is happening across your academic workspace.</p>
        </div>

        <div className="heading-actions">
          <button className="outline-button">
            <CalendarDays size={16} />
            This term
          </button>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <StatCard
          icon={Users}
          label="Total students"
          value="842"
          trend="+24 this month"
        />
        <StatCard
          icon={TrendingUp}
          label="Average score"
          value="87.4%"
          trend="+3.2% vs last term"
        />
        <StatCard
          icon={Clock3}
          label="Attendance"
          value="94.8%"
          trend="+1.8% this month"
        />
        <StatCard
          icon={Target}
          label="Needs attention"
          value="18"
          trend="Students below target"
          danger
        />
      </div>

      <div className="dashboard-grid-main">
        <div className="dashboard-chart-card">
          <div className="card-heading">
            <div>
              <small>ACADEMIC PERFORMANCE</small>
              <h2>Class average trend</h2>
            </div>
            <select className="select-field">
              <option>Last 6 months</option>
              <option>This term</option>
            </select>
          </div>

          <div className="dashboard-big-chart">
            <div className="big-chart-labels">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            <div className="big-chart-area">
              <div className="big-chart-grid">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <svg viewBox="0 0 700 270" preserveAspectRatio="none">
                <path
                  d="M0 215 C55 195 80 202 125 181 S180 165 225 181 S275 142 325 151 S380 124 425 138 S485 88 530 104 S595 62 640 80 S680 48 700 55"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
              <div className="big-chart-months">
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-ai-card">
          <div className="ai-card-label">
            <Sparkles size={14} />
            SCHOOLMARKS AI
          </div>
          <div className="ai-signal">
            <div className="signal-icon warning">
              <TrendingUp size={18} />
            </div>
            <div>
              <strong>Performance signal</strong>
              <span>Needs review</span>
            </div>
          </div>
          <h3>Mathematics performance has changed.</h3>
          <p>
            18 students show a lower average across the latest two
            assessments.
          </p>
          <button>
            Review insight
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="table-card">
          <div className="card-heading">
            <div>
              <small>RECENT STUDENTS</small>
              <h2>Student performance</h2>
            </div>
            <button className="text-button">View all</button>
          </div>

          <div className="data-table">
            <div className="table-row table-header">
              <span>Student</span>
              <span>Class</span>
              <span>Average</span>
              <span>Attendance</span>
            </div>

            {students.slice(0, 5).map((student) => (
              <div className="table-row" key={student.id}>
                <span className="table-student">
                  <i>{getInitials(student.name)}</i>
                  {student.name}
                </span>
                <span>{student.className}</span>
                <strong>{student.avg}%</strong>
                <span>{student.attendance}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="side-card">
          <div className="card-heading">
            <div>
              <small>ACADEMIC PULSE</small>
              <h2>This week</h2>
            </div>
          </div>

          <div className="pulse-grid">
            <div className="pulse-card">
              <div className="pulse-card-icon">
                <ClipboardCheck size={16} />
              </div>
              <strong>126</strong>
              <span>Marks entered</span>
            </div>

            <div className="pulse-card">
              <div className="pulse-card-icon">
                <Clock3 size={16} />
              </div>
              <strong>842</strong>
              <span>Attendance records</span>
            </div>

            <div className="pulse-card">
              <div className="pulse-card-icon">
                <BookOpen size={16} />
              </div>
              <strong>18</strong>
              <span>Classes active</span>
            </div>

            <div className="pulse-card">
              <div className="pulse-card-icon">
                <BrainCircuit size={16} />
              </div>
              <strong>32</strong>
              <span>AI questions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("9-A");

  const submit = () => {
    if (!name.trim()) return;

    onSave({
      id: Date.now(),
      name: name.trim(),
      className,
      avg: 0,
      attendance: 0,
    });
  };

  return (
    <div className="student-modal-backdrop">
      <div className="add-student-modal">
        <div className="modal-head">
          <div>
            <small>STUDENT MANAGEMENT</small>
            <h2>Add student</h2>
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="student-form-grid">
          <label>
            Student name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Muhammad Ali"
            />
          </label>

          <label>
            Class
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option>9-A</option>
              <option>9-B</option>
              <option>9-C</option>
              <option>10-A</option>
              <option>10-B</option>
            </select>
          </label>
        </div>

        <div className="modal-foot">
          <button onClick={onClose}>Cancel</button>
          <button className="save-student" onClick={submit}>
            <Plus size={16} />
            Add student
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ students, setStudents }) {
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  const filtered = useMemo(
    () =>
      students.filter((student) =>
        student.name.toLowerCase().includes(query.toLowerCase())
      ),
    [students, query]
  );

  const addStudent = (student) => {
    setStudents((current) => [student, ...current]);
    setModal(false);
  };

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">STUDENTS</div>
          <h1>Student directory</h1>
          <p>Manage every student from one connected academic record.</p>
        </div>
        <button className="primary-button" onClick={() => setModal(true)}>
          <Plus size={16} />
          Add student
        </button>
      </div>

      <div className="large-table-card">
        <div className="marks-toolbar">
          <div className="student-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students..."
            />
          </div>

          <span>{filtered.length} students</span>
        </div>

        <div className="data-table">
          <div className="table-row table-header">
            <span>Student</span>
            <span>Class</span>
            <span>Average</span>
            <span>Attendance</span>
            <span>Status</span>
          </div>

          {filtered.map((student) => (
            <div className="table-row" key={student.id}>
              <span className="table-student">
                <i>{getInitials(student.name)}</i>
                {student.name}
              </span>
              <span>{student.className}</span>
              <strong className="score-cell">{student.avg || "—"}%</strong>
              <span>{student.attendance || "—"}%</span>
              <span className="status-pill">
                {student.avg >= 90
                  ? "Excellent"
                  : student.avg >= 80
                  ? "On track"
                  : student.avg
                  ? "Needs attention"
                  : "New"}
              </span>
            </div>
          ))}

          {!filtered.length && (
            <div className="empty-state">
              <Search size={22} />
              <strong>No students found</strong>
              <span>Try another search.</span>
            </div>
          )}
        </div>
      </div>

      {modal && (
        <StudentModal
          onClose={() => setModal(false)}
          onSave={addStudent}
        />
      )}
    </div>
  );
}

function AcademicsPage() {
  const subjects = [
    ["Mathematics", 82, 72],
    ["Physics", 88, 84],
    ["English", 91, 89],
    ["Computer Science", 94, 92],
    ["Chemistry", 86, 80],
    ["Urdu", 90, 88],
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">ACADEMICS</div>
          <h1>Academic overview</h1>
          <p>Understand how every subject is performing across your classes.</p>
        </div>
      </div>

      <div className="academic-hero">
        <div>
          <small>TERM PERFORMANCE</small>
          <h2>87.4%</h2>
          <p>Overall academic average</p>
        </div>
        <div className="academic-progress">
          <span style={{ width: "87.4%" }} />
        </div>
        <div className="academic-meta">
          <span>Previous term <strong>84.2%</strong></span>
          <span>Change <strong>+3.2%</strong></span>
        </div>
      </div>

      <div className="subject-grid">
        {subjects.map(([name, score, progress]) => (
          <div className="subject-card" key={name}>
            <div className="subject-icon">
              <BookOpen size={17} />
            </div>
            <div className="subject-head">
              <div>
                <strong>{name}</strong>
                <span>Current average</span>
              </div>
              <b>{score}%</b>
            </div>
            <div className="subject-bar">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="subject-foot">
              <span>Class progress</span>
              <strong>+{score > 88 ? "4.2" : "2.8"}%</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsPage() {
  const exams = [
    ["24", "September", "Mathematics", "09:00 AM", "Scheduled"],
    ["27", "September", "Physics", "09:00 AM", "Scheduled"],
    ["30", "September", "English", "10:00 AM", "Draft"],
    ["03", "October", "Computer Science", "09:30 AM", "Scheduled"],
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">EXAMS</div>
          <h1>Exam schedule</h1>
          <p>Keep assessments organized across every class.</p>
        </div>
        <button className="outline-button">
          <Plus size={16} />
          New exam
        </button>
      </div>

      <div className="exam-overview">
        <div>
          <small>UPCOMING</small>
          <strong>4</strong>
          <span>Exams</span>
        </div>
        <div>
          <small>THIS TERM</small>
          <strong>18</strong>
          <span>Assessments</span>
        </div>
        <div>
          <small>COMPLETED</small>
          <strong>12</strong>
          <span>Assessments</span>
        </div>
      </div>

      <div className="timeline-card">
        <div className="card-heading">
          <div>
            <small>EXAM TIMELINE</small>
            <h2>Upcoming assessments</h2>
          </div>
        </div>

        <div className="exam-timeline">
          {exams.map((exam) => (
            <div className="exam-line" key={exam[2]}>
              <div className="exam-date">
                <strong>{exam[0]}</strong>
                <span>{exam[1]}</span>
              </div>
              <div className="exam-line-dot" />
              <div className="exam-info">
                <strong>{exam[2]}</strong>
                <span>{exam[3]}</span>
              </div>
              <span className={exam[4] === "Draft" ? "draft" : "status-pill"}>
                {exam[4]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarksPage() {
  const rows = [
    ["Ahmed Raza", "9-A", 92, 88, 94],
    ["Areeba Khan", "9-A", 94, 91, 89],
    ["Hamza Ali", "9-B", 82, 84, 86],
    ["Maham Noor", "9-B", 97, 95, 96],
    ["Usman Tariq", "9-C", 78, 81, 79],
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">MARKS</div>
          <h1>Marks management</h1>
          <p>Enter, review and understand assessment results.</p>
        </div>
        <button className="primary-button">
          <Plus size={16} />
          Enter marks
        </button>
      </div>

      <div className="marks-card">
        <div className="table-summary-actions">
          <div>
            <small>MATHEMATICS · MID TERM</small>
            <strong>Class 9</strong>
          </div>
          <span>5 students</span>
        </div>

        <div className="data-table marks-table">
          <div className="table-row table-header">
            <span>Student</span>
            <span>Class</span>
            <span>Quiz</span>
            <span>Mid term</span>
            <span>Final</span>
          </div>

          {rows.map((row) => (
            <div className="table-row" key={row[0]}>
              <span className="table-student">
                <i>{getInitials(row[0])}</i>
                {row[0]}
              </span>
              <span>{row[1]}</span>
              <strong>{row[2]}%</strong>
              <strong>{row[3]}%</strong>
              <strong>{row[4]}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendancePage() {
  const classes = [
    ["9-A", 96],
    ["9-B", 93],
    ["9-C", 91],
    ["10-A", 95],
    ["10-B", 97],
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">ATTENDANCE</div>
          <h1>Attendance overview</h1>
          <p>Track attendance patterns before they become problems.</p>
        </div>
      </div>

      <div className="attendance-overview">
        <div className="attendance-ring" style={{ "--value": "94.8%" }}>
          <div>
            <strong>94.8%</strong>
            <span>Overall</span>
          </div>
        </div>
        <div className="attendance-copy">
          <small>THIS MONTH</small>
          <h2>Attendance is trending positively.</h2>
          <p>
            Most classes remain above the school target. Three students are
            currently below the attention threshold.
          </p>
          <div className="attendance-bars">
            {classes.map(([name, value]) => (
              <div key={name}>
                <span>{name}</span>
                <i>
                  <b style={{ width: `${value}%` }} />
                </i>
                <strong>{value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  const subjects = [
    ["Mathematics", 82, "+4.2%", "up"],
    ["Physics", 88, "+2.8%", "up"],
    ["English", 91, "+5.1%", "up"],
    ["Computer Science", 94, "+7.2%", "up"],
    ["Chemistry", 86, "-1.4%", "down"],
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">PERFORMANCE</div>
          <h1>Student performance</h1>
          <p>Find trends across subjects, classes and assessments.</p>
        </div>
      </div>

      <div className="performance-hero">
        <div className="performance-score">
          <span>87.4</span>
          <small>Average score</small>
        </div>
        <div className="performance-copy">
          <small>ACADEMIC SIGNAL</small>
          <h2>Overall performance is improving.</h2>
          <p>
            The strongest improvement is currently coming from Computer
            Science and English.
          </p>
          <div className="performance-mini-chart">
            <i style={{ height: "35%" }} />
            <i style={{ height: "46%" }} />
            <i style={{ height: "41%" }} />
            <i style={{ height: "58%" }} />
            <i style={{ height: "64%" }} />
            <i style={{ height: "78%" }} />
            <i style={{ height: "88%" }} />
          </div>
        </div>
      </div>

      <div className="performance-subjects">
        {subjects.map(([name, score, change, direction], index) => (
          <div className="performance-subject" key={name}>
            <div className="subject-rank">0{index + 1}</div>
            <div className="performance-subject-name">
              <strong>{name}</strong>
              <span>Class average</span>
            </div>
            <strong className="performance-score-small">{score}%</strong>
            <span className={`change ${direction}`}>{change}</span>
            <div className="performance-progress">
              <span style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi Faizan. I can help you understand students, marks, attendance and academic performance. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    const question = input.trim();

    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      {
        role: "assistant",
        text: `Based on the current SchoolMarks data, I would review ${question.toLowerCase()} across student performance, attendance and recent assessment trends. The current overall academic average is 87.4%.`,
      },
    ]);

    setInput("");
  };

  return (
    <div className="ai-page">
      <div className="ai-workspace-head">
        <div>
          <div className="page-eyebrow">SCHOOLMARKS INTELLIGENCE</div>
          <h1>Ask your academic data.</h1>
          <p>Natural-language questions for your academic workspace.</p>
        </div>
        <div className="ai-workspace-status">
          <span />
          AI online
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat">
          <div className="chat-header">
            <div className="chat-agent">
              <div className="chat-agent-icon">
                <BrainCircuit size={18} />
              </div>
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
              <div
                className={`chat-message ${message.role}`}
                key={`${message.role}-${index}`}
              >
                <div className="message-avatar">
                  {message.role === "assistant" ? <Sparkles size={14} /> : "FK"}
                </div>
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}

            <div className="chat-message assistant">
              <div className="message-avatar">
                <Sparkles size={14} />
              </div>
              <div className="chat-answer-list">
                <strong>Try asking</strong>
                <button onClick={() => setInput("Which students need attention?")}>
                  Which students need attention?
                </button>
                <button onClick={() => setInput("How is attendance this month?")}>
                  How is attendance this month?
                </button>
                <button onClick={() => setInput("Which subject improved most?")}>
                  Which subject improved most?
                </button>
              </div>
            </div>
          </div>

          <div className="chat-composer">
            <div className="composer-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Ask about your students..."
              />
              <button onClick={send}>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        <aside className="ai-tools">
          <div className="ai-tools-head">
            <div>
              <small>TOOLS</small>
              <strong>Academic signals</strong>
            </div>
            <Sparkles size={17} />
          </div>

          <div className="tool-list">
            {[
              ["At-risk students", "18 students", Target],
              ["Attendance signal", "94.8% average", Clock3],
              ["Class performance", "87.4% average", TrendingUp],
              ["Latest assessments", "126 entries", ClipboardCheck],
            ].map(([title, value, Icon]) => (
              <div className="tool-item" key={title}>
                <div>
                  <Icon size={16} />
                </div>
                <span>
                  <strong>{title}</strong>
                  <small>{value}</small>
                </span>
                <ChevronRight size={15} />
              </div>
            ))}
          </div>

          <div className="live-signals">
            <span />
            Live academic data
          </div>
        </aside>
      </div>
    </div>
  );
}

function AppLayout({ page, setPage, students, setStudents, onHome }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let content;

  switch (page) {
    case "students":
      content = <StudentsPage students={students} setStudents={setStudents} />;
      break;
    case "academics":
      content = <AcademicsPage />;
      break;
    case "exams":
      content = <ExamsPage />;
      break;
    case "marks":
      content = <MarksPage />;
      break;
    case "attendance":
      content = <AttendancePage />;
      break;
    case "performance":
      content = <PerformancePage />;
      break;
    case "ai":
      content = <AIPage />;
      break;
    default:
      content = <DashboardPage students={students} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="app-main">
        <Topbar setOpen={setSidebarOpen} onHome={onHome} />
        <div className="app-content">{content}</div>
      </main>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [students, setStudents] = useState(studentsSeed);

  if (page === "home") {
    return <HomePage onOpenApp={() => setPage("dashboard")} />;
  }

  return (
    <AppLayout
      page={page}
      setPage={setPage}
      students={students}
      setStudents={setStudents}
      onHome={() => setPage("home")}
    />
  );
}