import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Menu,
  PieChart,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Dashboard from "./pages/system/Dashboard";

const navItems = [
  { label: "Platform", id: "platform" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Workflow", id: "workflow" },
  { label: "Insights", id: "insights" },
  { label: "FAQ", id: "faq" },
];

const modules = [
  {
    icon: Users,
    number: "01",
    title: "Student Management",
    text: "Keep every student record organized across classes, sections, profiles, and academic history.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Academic Management",
    text: "Structure classes, subjects, sections and academic sessions from one connected workspace.",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Examinations",
    text: "Create exams, configure subjects and manage the complete examination cycle without scattered files.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Marks & Results",
    text: "Record marks, calculate results automatically and keep academic records consistent.",
  },
  {
    icon: CalendarDays,
    number: "05",
    title: "Attendance Intelligence",
    text: "Track attendance patterns and identify students who may need attention before problems grow.",
  },
  {
    icon: TrendingUp,
    number: "06",
    title: "Performance Analytics",
    text: "Turn marks and attendance into trends, rankings and actionable academic insights.",
  },
];

const capabilities = [
  {
    tier: "T1",
    label: "Core",
    title: "Everything a school needs",
    text: "The operational foundation for managing everyday academic records.",
    items: [
      "Student records",
      "Classes & sections",
      "Subjects",
      "Academic sessions",
      "Examinations",
      "Attendance records",
    ],
  },
  {
    tier: "T2",
    label: "Intelligence",
    title: "Understand what the data says",
    text: "Move beyond storing information and start seeing academic patterns.",
    items: [
      "Performance analysis",
      "Attendance insights",
      "Class rankings",
      "Subject trends",
      "At-risk students",
      "Progress tracking",
    ],
  },
  {
    tier: "T3",
    label: "Advanced",
    title: "Make school operations smarter",
    text: "Connected workflows designed to reduce repetitive administrative work.",
    items: [
      "Automatic result calculation",
      "Smart alerts",
      "Trend analysis",
      "Report generation",
      "Data backup",
      "Custom school settings",
    ],
  },
];

const workflow = [
  {
    number: "01",
    title: "Add your school",
    text: "Set up your school profile, academic session and basic structure.",
    icon: SchoolIcon,
  },
  {
    number: "02",
    title: "Configure academics",
    text: "Create classes, sections and subjects around your school's system.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Manage students",
    text: "Build organized student records that remain connected to academic data.",
    icon: Users,
  },
  {
    number: "04",
    title: "Record marks & attendance",
    text: "Enter examination marks and attendance without maintaining separate sheets.",
    icon: ClipboardCheck,
  },
  {
    number: "05",
    title: "Analyze performance",
    text: "See trends, rankings, attendance patterns and students needing attention.",
    icon: TrendingUp,
  },
  {
    number: "06",
    title: "Generate results & reports",
    text: "Turn your school's data into clear results and useful reports.",
    icon: PieChart,
  },
];

const workflowPreview = [
  {
    kicker: "School setup",
    title: "Your school structure",
    description: "Everything begins with a clean academic foundation.",
    stats: [
      ["Classes", "24"],
      ["Sections", "38"],
      ["Subjects", "46"],
    ],
    accent: "setup",
  },
  {
    kicker: "Academic configuration",
    title: "Connected academics",
    description: "Classes, sections and subjects stay linked.",
    stats: [
      ["Classes", "24"],
      ["Subjects", "46"],
      ["Session", "2026–27"],
    ],
    accent: "academic",
  },
  {
    kicker: "Student records",
    title: "Every student in context",
    description: "Student records connect directly to academic history.",
    stats: [
      ["Students", "1,248"],
      ["Active", "1,221"],
      ["New", "42"],
    ],
    accent: "students",
  },
  {
    kicker: "Daily records",
    title: "Marks & attendance",
    description: "Record everyday academic activity in one workspace.",
    stats: [
      ["Present", "94.8%"],
      ["Marked", "1,183"],
      ["Pending", "12"],
    ],
    accent: "records",
  },
  {
    kicker: "Academic intelligence",
    title: "See the trends",
    description: "Connected data becomes useful academic information.",
    stats: [
      ["Average", "78.6%"],
      ["Improved", "+4.8%"],
      ["Focus", "12"],
    ],
    accent: "insight",
  },
  {
    kicker: "Results & reports",
    title: "Ready to act",
    description: "Turn school data into structured results and reports.",
    stats: [
      ["Results", "08"],
      ["Reports", "24"],
      ["Ready", "100%"],
    ],
    accent: "results",
  },
];

const faqs = [
  [
    "Is SchoolMarks a complete school management system?",
    "SchoolMarks is designed as a connected school management platform covering students, academics, examinations, marks, results, attendance, performance and reporting.",
  ],
  [
    "Does SchoolMarks require a backend?",
    "The current project can work as a frontend-first system using browser LocalStorage. A backend can be connected later for authentication, multi-user access and cloud synchronization.",
  ],
  [
    "Can schools customize the system?",
    "Yes. The planned settings system supports school branding, themes, colors, typography and other school-level preferences.",
  ],
  [
    "Can I backup school data?",
    "The platform architecture is designed to support local export and import so school data can be backed up and restored when needed.",
  ],
];

function SchoolIcon({ size = 18 }) {
  return <GraduationCap size={size} />;
}

function useInView(options = {}) {
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
      {
        threshold: 0.14,
        ...options,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function useCountUp(target, duration = 1300, enabled = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let frame;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled]);

  return value;
}

function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <img
        src="/logo/schoolmarks-logo.png"
        alt="SchoolMarks"
        className="brand-logo"
      />

      {!compact && (
        <div className="brand-copy">
          <strong>SchoolMarks</strong>
          <span>School management, simplified.</span>
        </div>
      )}
    </div>
  );
}

function AnimatedNumber({ value, suffix = "", decimals = 0 }) {
  const [ref, visible] = useInView();
  const count = useCountUp(value, 1300, visible);

  const display =
    decimals > 0
      ? (count / Math.pow(10, decimals)).toFixed(decimals)
      : count.toLocaleString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function MiniLineChart({ animated = false }) {
  return (
    <svg
      className={`mini-line-chart ${animated ? "drawn" : ""}`}
      viewBox="0 0 500 180"
      preserveAspectRatio="none"
    >
      <path
        className="chart-stroke"
        d="M0 135 C45 122 55 128 92 106 C128 85 150 110 184 92 C218 74 236 87 270 70 C305 52 320 70 355 49 C390 28 418 48 450 30 C468 19 486 27 500 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M0 135 C45 122 55 128 92 106 C128 85 150 110 184 92 C218 74 236 87 270 70 C305 52 320 70 355 49 C390 28 418 48 450 30 C468 19 486 27 500 18 L500 180 L0 180 Z"
        fill="currentColor"
        opacity=".07"
      />
    </svg>
  );
}

function ProductDashboardPreview({ compact = false }) {
  const [active, setActive] = useState("Overview");
  const [ref, visible] = useInView();

  const nav = [
    ["Overview", LayoutDashboard],
    ["Students", Users],
    ["Academics", BookOpen],
    ["Examinations", ClipboardCheck],
    ["Marks", BarChart3],
    ["Results", PieChart],
    ["Attendance", CalendarDays],
    ["Performance", TrendingUp],
  ];

  return (
    <div
      ref={ref}
      className={`product-window ${compact ? "product-window-compact" : ""} ${
        visible ? "is-visible" : ""
      }`}
    >
      <div className="window-topbar">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>

        <div className="window-address">
          schoolmarks.local/dashboard
        </div>

        <div className="window-live">
          <span />
          Live
        </div>
      </div>

      <div className="product-body">
        <aside className="product-sidebar">
          <div className="product-side-brand">
            <div className="product-logo-mark">S</div>
            <div>
              <strong>SchoolMarks</strong>
              <span>School Admin</span>
            </div>
          </div>

          <div className="product-nav">
            {nav.map(([label, Icon]) => (
              <button
                key={label}
                className={active === label ? "active" : ""}
                onClick={() => setActive(label)}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="product-side-bottom">
            <button>
              <Settings size={14} />
              Settings
            </button>
          </div>
        </aside>

        <main className="product-main">
          <div className="product-heading">
            <div>
              <span className="product-kicker">School overview</span>
              <h3>Good morning, Admin</h3>
              <p>Here's what's happening across your school.</p>
            </div>

            <div className="product-avatar">FK</div>
          </div>

          <div className="product-stats">
            <div className="product-stat stat-enter">
              <span>Total Students</span>
              <strong>
                <AnimatedNumber value={1248} />
              </strong>
              <small>+42 this session</small>
            </div>

            <div className="product-stat stat-enter">
              <span>Attendance</span>
              <strong>94.8%</strong>
              <small>+2.1% this month</small>
            </div>

            <div className="product-stat stat-enter">
              <span>Average Result</span>
              <strong>78.6%</strong>
              <small>+4.8% vs previous</small>
            </div>

            <div className="product-stat stat-enter">
              <span>Examinations</span>
              <strong>08</strong>
              <small>03 upcoming</small>
            </div>
          </div>

          <div className="product-grid">
            <div className="product-panel chart-panel">
              <div className="panel-heading">
                <div>
                  <span>Performance overview</span>
                  <strong>Academic trend</strong>
                </div>

                <button>
                  2026–27 <ChevronDown size={12} />
                </button>
              </div>

              <div className="chart-area">
                <div className="chart-y">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>

                <div className="chart">
                  <div className="chart-grid-line line-1" />
                  <div className="chart-grid-line line-2" />
                  <div className="chart-grid-line line-3" />
                  <div className="chart-grid-line line-4" />

                  <MiniLineChart animated={visible} />

                  <div className="chart-labels">
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                    <span>Jan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-panel attendance-panel">
              <div className="panel-heading">
                <div>
                  <span>Attendance</span>
                  <strong>Today's overview</strong>
                </div>

                <CalendarDays size={16} />
              </div>

              <div className="attendance-ring">
                <div className="ring">
                  <strong>94.8%</strong>
                  <span>Present</span>
                </div>
              </div>

              <div className="attendance-legend">
                <span>
                  <i /> Present <b>1,183</b>
                </span>
                <span>
                  <i /> Absent <b>65</b>
                </span>
              </div>
            </div>
          </div>

          <div className="product-panel table-panel">
            <div className="panel-heading">
              <div>
                <span>Students</span>
                <strong>Recent academic activity</strong>
              </div>

              <button>
                View all <ArrowRight size={12} />
              </button>
            </div>

            <div className="mini-table">
              <div className="mini-row mini-head">
                <span>Student</span>
                <span>Class</span>
                <span>Average</span>
                <span>Status</span>
              </div>

              {[
                ["Ayesha Khan", "IX-A", "91.4%", "Excellent"],
                ["Ahmed Raza", "IX-B", "86.8%", "Good"],
                ["Hania Noor", "VIII-A", "79.2%", "On track"],
                ["Huzaifa Ali", "IX-A", "68.7%", "Needs focus"],
              ].map((row) => (
                <div className="mini-row" key={row[0]}>
                  <span className="student-cell">
                    <i>{row[0][0]}</i>
                    {row[0]}
                  </span>
                  <span>{row[1]}</span>
                  <span>{row[2]}</span>
                  <span>
                    <em>{row[3]}</em>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function WorkflowPreview({ active }) {
  const item = workflowPreview[active];

  return (
    <div className="workflow-preview-shell">
      <div className="workflow-preview-top">
        <div className="preview-browser-dots">
          <span />
          <span />
          <span />
        </div>

        <span>schoolmarks.local</span>

        <div className="preview-status">
          <i />
          Connected
        </div>
      </div>

      <div className={`workflow-preview ${item.accent}`} key={active}>
        <div className="preview-sidebar">
          <div className="preview-sidebar-logo">S</div>

          <div className="preview-sidebar-lines">
            <span className="active" />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="preview-content">
          <div className="preview-content-header">
            <div>
              <span>{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div className="preview-avatar">FK</div>
          </div>

          <div className="preview-stat-grid">
            {item.stats.map(([label, value], index) => (
              <div key={label} className={`preview-stat preview-stat-${index}`}>
                <span>{label}</span>
                <strong>{value}</strong>
                <i />
              </div>
            ))}
          </div>

          <div className="preview-large-panel">
            <div className="preview-panel-heading">
              <div>
                <span>School intelligence</span>
                <strong>
                  {active < 4 ? "Connected school data" : "Ready for reporting"}
                </strong>
              </div>
              <Activity size={16} />
            </div>

            <div className="preview-graph">
              <div className="preview-graph-grid">
                <span />
                <span />
                <span />
                <span />
              </div>

              <svg viewBox="0 0 500 140" preserveAspectRatio="none">
                <path
                  d="M0 115 C55 110 65 86 110 94 C155 102 172 65 218 74 C263 84 282 49 320 60 C365 71 382 28 420 42 C454 54 474 25 500 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="preview-bottom-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ onOpenDashboard }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [workflowActive, setWorkflowActive] = useState(0);

  const [heroRef, heroVisible] = useInView();
  const [problemRef, problemVisible] = useInView();
  const [solutionRef, solutionVisible] = useInView();
  const [capabilitiesRef, capabilitiesVisible] = useInView();
  const [insightRef, insightVisible] = useInView();
  const [comparisonRef, comparisonVisible] = useInView();

  useEffect(() => {
    const elements = document.querySelectorAll("[data-workflow-step]");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.workflowStep);
            setWorkflowActive(index);
          }
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-15% 0px -35% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        <div className="container announcement-inner">
          <span className="announcement-dot" />
          <span>SchoolMarks · A connected school management platform</span>

          <button onClick={() => scrollTo("platform")}>
            Explore platform <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <Logo />

          <nav className={menuOpen ? "mobile-open" : ""}>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}

            <button className="nav-mobile-cta" onClick={onOpenDashboard}>
              Open platform <ArrowRight size={15} />
            </button>
          </nav>

          <div className="nav-actions">
            <button className="nav-link-button" onClick={() => scrollTo("faq")}>
              Questions?
            </button>

            <button
              className="button button-dark"
              onClick={onOpenDashboard}
            >
              Open platform
              <ArrowRight size={15} />
            </button>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section
          className={`hero ${heroVisible ? "is-visible" : ""}`}
          ref={heroRef}
        >
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-grid-lines" />

          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow hero-reveal">
                <Sparkles size={14} />
                The intelligence layer for modern schools
              </div>

              <h1 className="hero-reveal delay-1">
                Run your school
                <span> from one connected system.</span>
              </h1>

              <p className="hero-description hero-reveal delay-2">
                Students, academics, attendance, examinations, marks,
                results and performance — connected in one school management
                platform built to make school operations clearer.
              </p>

              <div className="hero-actions hero-reveal delay-3">
                <button
                  className="button button-primary"
                  onClick={onOpenDashboard}
                >
                  Open SchoolMarks
                  <ArrowRight size={17} />
                </button>

                <button
                  className="text-button"
                  onClick={() => scrollTo("platform")}
                >
                  Explore the platform
                  <ArrowDownRight size={16} />
                </button>
              </div>

              <div className="hero-proof hero-reveal delay-4">
                <div className="proof-item">
                  <strong>01</strong>
                  <span>Unified records</span>
                </div>

                <div className="proof-item">
                  <strong>02</strong>
                  <span>Academic intelligence</span>
                </div>

                <div className="proof-item">
                  <strong>03</strong>
                  <span>Clear reporting</span>
                </div>
              </div>
            </div>

            <div className="hero-visual hero-reveal delay-2">
              <div className="hero-visual-label">
                <span className="live-dot" />
                Live platform preview
              </div>

              <ProductDashboardPreview />

              <div className="floating-card floating-card-one">
                <div className="floating-icon">
                  <TrendingUp size={16} />
                </div>

                <div>
                  <span>Performance</span>
                  <strong>+12.4%</strong>
                </div>
              </div>

              <div className="floating-card floating-card-two">
                <div className="floating-icon">
                  <UserCheck size={16} />
                </div>

                <div>
                  <span>Attendance today</span>
                  <strong>94.8%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="container hero-bottom hero-reveal delay-4">
            <span>Designed around the complete school workflow</span>

            <div>
              <span>Students</span>
              <span>Academics</span>
              <span>Examinations</span>
              <span>Results</span>
              <span>Attendance</span>
              <span>Analytics</span>
            </div>
          </div>
        </section>

        <section
          className={`problem-section section-light reveal-section ${
            problemVisible ? "is-visible" : ""
          }`}
          ref={problemRef}
        >
          <div className="container">
            <div className="section-heading centered">
              <span className="section-number">01 / THE PROBLEM</span>

              <h2>
                School data shouldn't live
                <span> in six different places.</span>
              </h2>

              <p>
                Paper registers, spreadsheets, manual calculations and
                disconnected records make everyday school management harder
                than it needs to be.
              </p>
            </div>

            <div className="problem-grid">
              {[
                [
                  "01",
                  "Scattered records",
                  "Student information ends up across registers, files, spreadsheets and different systems.",
                  "Paper + spreadsheets",
                ],
                [
                  "02",
                  "Manual calculations",
                  "Marks, percentages, grades and rankings can turn result preparation into repetitive administrative work.",
                  "Repetitive work",
                ],
                [
                  "03",
                  "Limited visibility",
                  "Raw attendance and marks don't automatically explain what is happening with student performance.",
                  "Data without insight",
                ],
                [
                  "04",
                  "Delayed decisions",
                  "When information isn't connected, identifying academic trends or students needing attention takes longer.",
                  "Decisions come late",
                ],
              ].map(([number, title, text, line], index) => (
                <div
                  className="problem-card reveal-card"
                  style={{ "--delay": `${index * 100}ms` }}
                  key={number}
                >
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>

                  <div className="problem-line">
                    <i />
                    {line}
                  </div>
                </div>
              ))}
            </div>

            <div className="problem-conclusion reveal-card">
              <div>
                <span>THE SHIFT</span>
                <strong>
                  From managing records to understanding them.
                </strong>
              </div>

              <ArrowRight size={20} />
            </div>
          </div>
        </section>

        <section
          className={`solution-section reveal-section ${
            solutionVisible ? "is-visible" : ""
          }`}
          ref={solutionRef}
          id="platform"
        >
          <div className="container">
            <div className="section-heading">
              <span className="section-number">02 / THE SOLUTION</span>

              <h2>
                One platform for the
                <span> whole school.</span>
              </h2>

              <p>
                SchoolMarks brings the core academic and administrative
                workflows together so every piece of information has context.
              </p>
            </div>

            <div className="module-grid">
              {modules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <div
                    className="module-card reveal-card"
                    style={{ "--delay": `${index * 90}ms` }}
                    key={module.number}
                  >
                    <div className="module-top">
                      <div className="module-icon">
                        <Icon size={19} />
                      </div>

                      <span>{module.number}</span>
                    </div>

                    <h3>{module.title}</h3>
                    <p>{module.text}</p>

                    <div className="module-link">
                      Explore module
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="platform-showcase">
          <div className="container">
            <div className="showcase-intro">
              <div>
                <span className="section-number">
                  03 / INSIDE THE PLATFORM
                </span>

                <h2>
                  See your school
                  <span> at a glance.</span>
                </h2>
              </div>

              <p>
                A clear operational view for administrators — built around the
                information schools actually need every day.
              </p>
            </div>

            <div className="showcase-window showcase-reveal">
              <ProductDashboardPreview />
            </div>

            <div className="showcase-notes">
              <div>
                <strong>01</strong>
                <span>Live overview</span>
                <p>
                  Key school metrics without digging through records.
                </p>
              </div>

              <div>
                <strong>02</strong>
                <span>Connected records</span>
                <p>
                  Students, exams and results remain part of one system.
                </p>
              </div>

              <div>
                <strong>03</strong>
                <span>Actionable insight</span>
                <p>
                  Performance information becomes easier to understand.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`capabilities-section reveal-section ${
            capabilitiesVisible ? "is-visible" : ""
          }`}
          ref={capabilitiesRef}
          id="capabilities"
        >
          <div className="container">
            <div className="section-heading centered">
              <span className="section-number">04 / CAPABILITY STACK</span>

              <h2>
                From must-haves
                <span> to intelligence.</span>
              </h2>

              <p>
                Every layer builds on the previous one — from reliable school
                records to deeper academic understanding.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability, index) => (
                <div
                  className="capability-card reveal-card"
                  style={{ "--delay": `${index * 140}ms` }}
                  key={capability.tier}
                >
                  <div className="capability-header">
                    <div>
                      <span>{capability.tier}</span>
                      <small>{capability.label}</small>
                    </div>

                    <ArrowDownRight size={18} />
                  </div>

                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>

                  <div className="capability-list">
                    {capability.items.map((item, itemIndex) => (
                      <div
                        key={item}
                        style={{
                          "--item-delay": `${itemIndex * 50}ms`,
                        }}
                      >
                        <Check size={14} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`workflow-section workflow-story ${
            workflowActive >= 0 ? "story-ready" : ""
          }`}
          id="workflow"
        >
          <div className="container">
            <div className="section-heading centered workflow-heading">
              <span className="section-number">05 / THE WORKFLOW</span>

              <h2>
                From daily records to
                <span> school-wide intelligence.</span>
              </h2>

              <p>
                Follow the journey of your school's data from setup to useful
                academic insight.
              </p>
            </div>

            <div className="workflow-story-grid">
              <div className="workflow-steps">
                <div
                  className="workflow-progress"
                  style={{
                    "--progress":
                      `${(workflowActive / (workflow.length - 1)) * 100}%`,
                  }}
                />

                {workflow.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      className={`workflow-story-step ${
                        workflowActive === index ? "active" : ""
                      }`}
                      data-workflow-step={index}
                      key={step.number}
                    >
                      <div className="workflow-story-number">
                        {step.number}
                      </div>

                      <div className="workflow-story-node">
                        <Icon size={16} />
                      </div>

                      <div className="workflow-story-copy">
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>

                      <ArrowRight
                        className="workflow-story-arrow"
                        size={17}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="workflow-sticky-preview">
                <div className="workflow-sticky-inner">
                  <div className="workflow-active-label">
                    <span>
                      Step {String(workflowActive + 1).padStart(2, "0")}
                    </span>

                    <i />
                    Live workflow
                  </div>

                  <WorkflowPreview active={workflowActive} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`intelligence-section reveal-section ${
            insightVisible ? "is-visible" : ""
          }`}
          ref={insightRef}
          id="insights"
        >
          <div className="container intelligence-grid">
            <div className="intelligence-copy">
              <span className="section-number">
                06 / ACADEMIC INTELLIGENCE
              </span>

              <h2>
                Don't just store
                <span> student data.</span>
                Understand it.
              </h2>

              <p>
                SchoolMarks connects marks, attendance and academic history to
                create a clearer picture of student and class performance.
              </p>

              <div className="intelligence-points">
                <div>
                  <div className="point-icon">
                    <TrendingUp size={16} />
                  </div>

                  <div>
                    <strong>Performance trends</strong>
                    <span>
                      See how academic performance changes over time.
                    </span>
                  </div>
                </div>

                <div>
                  <div className="point-icon">
                    <BarChart3 size={16} />
                  </div>

                  <div>
                    <strong>Subject analysis</strong>
                    <span>
                      Understand which subjects need more attention.
                    </span>
                  </div>
                </div>

                <div>
                  <div className="point-icon">
                    <ShieldCheck size={16} />
                  </div>

                  <div>
                    <strong>Early visibility</strong>
                    <span>
                      Spot students whose performance or attendance is
                      changing.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="analytics-board">
              <div className="analytics-top">
                <div>
                  <span>Performance intelligence</span>
                  <strong>Class IX · 2026–27</strong>
                </div>

                <div className="analytics-select">
                  This term <ChevronDown size={13} />
                </div>
              </div>

              <div className="analytics-main">
                <div className="analytics-score">
                  <span>Average performance</span>
                  <strong>78.6%</strong>

                  <small>
                    <TrendingUp size={12} />
                    4.8% from previous term
                  </small>
                </div>

                <div className="analytics-bars">
                  {[
                    ["Math", 88],
                    ["Science", 81],
                    ["English", 76],
                    ["Computer", 92],
                    ["Urdu", 71],
                  ].map(([label, value], index) => (
                    <div
                      className="analytics-bar-row"
                      key={label}
                      style={{ "--bar-delay": `${index * 110}ms` }}
                    >
                      <span>{label}</span>

                      <div>
                        <i
                          className={insightVisible ? "animated" : ""}
                          style={{ "--bar-width": `${value}%` }}
                        />
                      </div>

                      <strong>{value}%</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-bottom">
                <div>
                  <span>Top performers</span>
                  <strong>24 students</strong>
                </div>

                <div>
                  <span>On track</span>
                  <strong>68 students</strong>
                </div>

                <div>
                  <span>Needs attention</span>
                  <strong>12 students</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`comparison-section reveal-section ${
            comparisonVisible ? "is-visible" : ""
          }`}
          ref={comparisonRef}
        >
          <div className="container">
            <div className="section-heading centered">
              <span className="section-number">07 / THE DIFFERENCE</span>

              <h2>
                Traditional management
                <span> vs. the connected way.</span>
              </h2>

              <p>
                SchoolMarks is designed to replace disconnected workflows with
                one clearer operating layer.
              </p>
            </div>

            <div className="comparison">
              <div className="comparison-column traditional">
                <div className="comparison-heading">
                  <span>Traditional</span>
                  <small>Fragmented · Manual · Delayed</small>
                </div>

                {[
                  "Paper registers and spreadsheets",
                  "Manual result calculations",
                  "Separate attendance records",
                  "Scattered student information",
                  "Limited performance visibility",
                  "Reports take additional work",
                ].map((item, index) => (
                  <div
                    className="comparison-row reveal-row"
                    style={{ "--delay": `${index * 80}ms` }}
                    key={item}
                  >
                    <span className="comparison-x">×</span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="comparison-column modern">
                <div className="comparison-heading">
                  <span>SchoolMarks</span>
                  <small>Unified · Connected · Insightful</small>
                </div>

                {[
                  "Digital student records",
                  "Automatic result calculations",
                  "Connected attendance tracking",
                  "One academic workspace",
                  "Performance intelligence",
                  "Structured reports and results",
                ].map((item, index) => (
                  <div
                    className="comparison-row reveal-row"
                    style={{ "--delay": `${index * 100}ms` }}
                    key={item}
                  >
                    <span className="comparison-check">
                      <Check size={12} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="container faq-grid">
            <div className="faq-intro">
              <span className="section-number">08 / QUESTIONS</span>

              <h2>
                Built to be
                <span> straightforward.</span>
              </h2>

              <p>
                A few things you may want to know before opening the platform.
              </p>

              <button
                className="button button-outline"
                onClick={onOpenDashboard}
              >
                Open SchoolMarks
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div
                  className={`faq-item ${
                    openFaq === index ? "open" : ""
                  }`}
                  key={question}
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                  >
                    <span>{question}</span>
                    <ChevronDown size={18} />
                  </button>

                  <div className="faq-answer">
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container">
            <div className="cta-box">
              <div className="cta-grid-pattern" />

              <div className="cta-orb cta-orb-one" />
              <div className="cta-orb cta-orb-two" />

              <div className="cta-content">
                <span className="cta-label">
                  <Sparkles size={14} />
                  SCHOOLMARKS
                </span>

                <h2>
                  Your school already has
                  <span> the data.</span>
                </h2>

                <p>
                  SchoolMarks turns that data into organized records,
                  connected workflows and clearer academic intelligence.
                </p>

                <button
                  className="button button-white"
                  onClick={onOpenDashboard}
                >
                  Open SchoolMarks
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="cta-mini-dashboard">
                <div className="cta-mini-top">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="cta-mini-content">
                  <div className="mini-stat-large">
                    <span>School performance</span>
                    <strong>78.6%</strong>
                  </div>

                  <div className="mini-bars">
                    {[48, 62, 55, 76, 68, 88, 82].map((height, index) => (
                      <i
                        key={index}
                        style={{
                          "--bar-height": `${height}%`,
                          "--bar-delay": `${index * 80}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Logo />

              <p>
                A connected school management platform for modern academic
                operations.
              </p>
            </div>

            <div className="footer-links">
              <div>
                <span>Platform</span>
                <button onClick={() => scrollTo("platform")}>
                  Overview
                </button>
                <button onClick={() => scrollTo("capabilities")}>
                  Capabilities
                </button>
                <button onClick={() => scrollTo("workflow")}>
                  How it works
                </button>
              </div>

              <div>
                <span>Insights</span>
                <button onClick={() => scrollTo("insights")}>
                  Performance
                </button>
                <button onClick={() => scrollTo("insights")}>
                  Analytics
                </button>
                <button onClick={() => scrollTo("faq")}>FAQ</button>
              </div>

              <div>
                <span>System</span>
                <button onClick={onOpenDashboard}>
                  Open platform
                </button>
                <button onClick={onOpenDashboard}>
                  School Admin
                </button>
                <button onClick={onOpenDashboard}>Dashboard</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 SchoolMarks. All rights reserved.</span>
            <span>Built for smarter school management.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AccessModal({ onContinue, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="access-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-icon">
          <LayoutDashboard size={21} />
        </div>

        <span className="modal-kicker">SCHOOLMARKS PLATFORM</span>

        <h2>Open your school workspace.</h2>

        <p>
          Continue into the SchoolMarks management system to manage students,
          academics, examinations, results, attendance and performance.
        </p>

        <div className="access-details">
          <div>
            <span>Workspace</span>
            <strong>School Admin</strong>
          </div>

          <div>
            <span>Academic year</span>
            <strong>2026–27</strong>
          </div>

          <div>
            <span>Storage</span>
            <strong>Local workspace</strong>
          </div>
        </div>

        <button
          className="button button-primary modal-continue"
          onClick={onContinue}
        >
          Continue to platform
          <ArrowRight size={16} />
        </button>

        <button className="modal-back" onClick={onClose}>
          Return to home
        </button>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [access, setAccess] = useState(false);

  const openDashboard = () => {
    setAccess(true);
  };

  const continueDashboard = () => {
    setAccess(false);
    setPage("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {page === "home" ? (
        <Home onOpenDashboard={openDashboard} />
      ) : (
        <div className="app-page">
          <div className="app-navbar">
            <div className="container app-navbar-inner">
              <Logo compact />

              <div className="app-navbar-right">
                <button
                  className="app-home-button"
                  onClick={() => {
                    setPage("home");
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  Back to Home
                </button>

                <div className="app-user">
                  <div className="app-user-avatar">FK</div>

                  <div>
                    <strong>School Admin</strong>
                    <span>SchoolMarks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dashboard />
        </div>
      )}

      {access && (
        <AccessModal
          onContinue={continueDashboard}
          onClose={() => setAccess(false)}
        />
      )}
    </>
  );
}

export default App;