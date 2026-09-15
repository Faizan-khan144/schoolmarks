import { useEffect, useMemo, useState } from "react";
import {
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
  NotebookTabs,
  Play,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const imageSets = {
  hero: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=90",
    "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=90",
  ],
  classroom: [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=90",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=90",
  ],
  students: [
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=90",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=90",
  ],
};

function SmartImage({ sources, alt, className = "", eager = false }) {
  const [index, setIndex] = useState(0);

  return (
    <img
      src={sources[index]}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      onError={() => {
        if (index < sources.length - 1) setIndex(index + 1);
      }}
    />
  );
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
          
        </div>
      )}
    </div>
  );
}

const features = [
  {
    icon: Users,
    title: "Student Management",
    text: "Keep student records organized, searchable and easy to manage.",
  },
  {
    icon: ClipboardCheck,
    title: "Marks & Results",
    text: "Enter marks, calculate results and understand academic progress.",
  },
  {
    icon: CalendarDays,
    title: "Attendance",
    text: "Track attendance with a clean workflow built for everyday school use.",
  },
  {
    icon: BarChart3,
    title: "Performance",
    text: "Turn academic data into useful insights with clear performance views.",
  },
  {
    icon: BookOpen,
    title: "Academic Setup",
    text: "Manage grades, classes, subjects and examinations from one place.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Records",
    text: "Keep important school information structured and available when needed.",
  },
];

const grades = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

const process = [
  {
    number: "01",
    title: "Set up your school",
    text: "Add your classes, subjects, students and academic structure.",
  },
  {
    number: "02",
    title: "Manage daily data",
    text: "Record attendance, marks, examinations and important notices.",
  },
  {
    number: "03",
    title: "Understand performance",
    text: "Use organized reports and performance views to spot progress.",
  },
  {
    number: "04",
    title: "Make better decisions",
    text: "Keep your academic operations clear, consistent and accessible.",
  },
];

const faqs = [
  {
    q: "What is SchoolMarks?",
    a: "SchoolMarks is a modern school management platform designed to organize students, classes, subjects, examinations, marks, attendance and academic reporting in one place.",
  },
  {
    q: "Does it support Grade 1 to Grade 10?",
    a: "Yes. SchoolMarks is structured to support Grade 1 through Grade 10 and can organize students and academic information across each grade.",
  },
  {
    q: "Can I manage examination marks?",
    a: "Yes. The platform includes examination, marks and result workflows designed to keep academic records organized.",
  },
  {
    q: "Does SchoolMarks require complicated software?",
    a: "No. The interface is intentionally designed to be simple, clean and easy to understand for everyday school management.",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [access, setAccess] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    document.title =
      page === "dashboard"
        ? "SchoolMarks — Dashboard"
        : "SchoolMarks — School Management";
  }, [page]);

  const go = (target) => {
    setPage(target);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "dashboard") {
    return <Dashboard onExit={() => go("home")} />;
  }

  return (
    <div className="site">
      <header className="site-header">
        <div className="container nav-inner">
          <button className="logo-button" onClick={() => go("home")}>
            <Logo />
          </button>

          <nav className={`main-nav ${mobileOpen ? "nav-open" : ""}`}>
            <button onClick={() => go("home")}>Home</button>
            <a href="#features" onClick={() => setMobileOpen(false)}>
              Features
            </a>
            <a href="#platform" onClick={() => setMobileOpen(false)}>
              Platform
            </a>
            <a href="#process" onClick={() => setMobileOpen(false)}>
              Process
            </a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>
              FAQ
            </a>

            <button
              className="mobile-dashboard"
              onClick={() => setAccess(true)}
            >
              Open Platform
            </button>
          </nav>

          <button className="nav-cta" onClick={() => setAccess(true)}>
            Open Platform
            <ArrowRight size={16} />
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <Sparkles size={15} />
                Modern school management
              </div>

              <h1>
                Run your school with
                <span> clarity.</span>
              </h1>

              <p>
                SchoolMarks brings students, academics, examinations,
                attendance and performance together in one beautifully
                organized platform.
              </p>

              <div className="hero-actions">
                <button className="primary-btn" onClick={() => setAccess(true)}>
                  Explore SchoolMarks
                  <ArrowRight size={18} />
                </button>

                <a className="secondary-btn" href="#platform">
                  <Play size={15} />
                  See how it works
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-avatars">
                  <span>SM</span>
                  <span>10</span>
                  <span>+</span>
                </div>

                <div>
                  <strong>Built for everyday school operations</strong>
                  <small>Simple workflows. Clear information.</small>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrap">
                <SmartImage
                  sources={imageSets.hero}
                  alt="Modern school campus"
                  className="hero-image"
                  eager
                />

                <div className="hero-image-overlay" />

                <div className="floating-card floating-top">
                  <div className="floating-icon">
                    <Users size={18} />
                  </div>
                  <div>
                    <strong>1,248</strong>
                    <span>Students managed</span>
                  </div>
                </div>

                <div className="floating-card floating-bottom">
                  <div className="mini-progress">
                    <span />
                  </div>
                  <div>
                    <strong>Academic overview</strong>
                    <span>Performance is on track</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-grid">
            <div>
              <span className="section-kicker">ONE PLATFORM</span>
              <h2>Everything your school needs, without the clutter.</h2>
            </div>

            <p>
              Replace scattered spreadsheets and disconnected records with a
              focused workspace designed around the way schools actually work.
            </p>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">WHAT YOU CAN DO</span>
                <h2>Built around your school.</h2>
              </div>

              <p>
                From student records to results, SchoolMarks keeps the
                important pieces connected.
              </p>
            </div>

            <div className="feature-grid">
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="feature-card" key={item.title}>
                    <div className="feature-icon">
                      <Icon size={22} />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>

                    <span className="feature-arrow">
                      <ArrowRight size={16} />
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section platform-section" id="platform">
          <div className="container split-layout">
            <div className="split-image">
              <SmartImage
                sources={imageSets.classroom}
                alt="Students in a modern classroom"
              />

              <div className="image-label">
                <span />
                Organized academic operations
              </div>
            </div>

            <div className="split-content">
              <span className="section-kicker">THE PLATFORM</span>

              <h2>
                Less time organizing data.
                <span> More time understanding it.</span>
              </h2>

              <p>
                SchoolMarks gives school teams a central place to manage
                academic information while keeping the experience clean and
                approachable.
              </p>

              <div className="check-list">
                <div>
                  <Check size={17} />
                  <span>Student and class records</span>
                </div>

                <div>
                  <Check size={17} />
                  <span>Examinations and marks</span>
                </div>

                <div>
                  <Check size={17} />
                  <span>Attendance tracking</span>
                </div>

                <div>
                  <Check size={17} />
                  <span>Reports and performance insights</span>
                </div>
              </div>

              <button className="text-btn" onClick={() => setAccess(true)}>
                Explore the platform
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <section className="section grades-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">ACADEMIC STRUCTURE</span>
              <h2>From Grade 1 to Grade 10.</h2>
              <p>
                Keep every grade organized inside one consistent academic
                structure.
              </p>
            </div>

            <div className="grades-grid">
              {grades.map((grade, index) => (
                <div className="grade-card" key={grade}>
                  <span>0{index + 1}</span>
                  <strong>{grade}</strong>
                  <ArrowRight size={17} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section image-section">
          <div className="container image-banner">
            <SmartImage
              sources={imageSets.students}
              alt="Students studying together"
            />

            <div className="image-banner-content">
              <span className="section-kicker light">SCHOOLMARKS</span>
              <h2>
                Designed for schools that want
                <span> better clarity.</span>
              </h2>
              <p>
                A clean digital foundation for managing everyday academic
                operations.
              </p>
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">HOW IT WORKS</span>
                <h2>A simpler school workflow.</h2>
              </div>

              <p>
                Start with your academic structure and build from there. No
                unnecessary complexity.
              </p>
            </div>

            <div className="process-grid">
              {process.map((item) => (
                <article className="process-card" key={item.number}>
                  <span className="process-number">{item.number}</span>
                  <div className="process-line" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section dashboard-preview">
          <div className="container">
            <div className="preview-shell">
              <div className="preview-top">
                <div>
                  <span className="section-kicker">A QUICK LOOK</span>
                  <h2>Your school, at a glance.</h2>
                </div>

                <button onClick={() => setAccess(true)}>
                  Open dashboard
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="fake-dashboard">
                <aside>
                  <Logo compact />

                  <div className="fake-nav">
                    <span className="active">
                      <LayoutDashboard size={16} />
                      Overview
                    </span>
                    <span>
                      <Users size={16} />
                      Students
                    </span>
                    <span>
                      <BookOpen size={16} />
                      Academics
                    </span>
                    <span>
                      <BarChart3 size={16} />
                      Performance
                    </span>
                  </div>
                </aside>

                <div className="fake-main">
                  <div className="fake-head">
                    <div>
                      <small>School overview</small>
                      <h3>Academic dashboard</h3>
                    </div>

                    <div className="fake-search">
                      <Search size={15} />
                      Search
                    </div>
                  </div>

                  <div className="fake-stats">
                    <div>
                      <small>Total students</small>
                      <strong>1,248</strong>
                      <span>+8.2%</span>
                    </div>

                    <div>
                      <small>Attendance</small>
                      <strong>94.6%</strong>
                      <span>+2.4%</span>
                    </div>

                    <div>
                      <small>Average score</small>
                      <strong>82.4%</strong>
                      <span>+5.1%</span>
                    </div>
                  </div>

                  <div className="fake-chart">
                    <div className="chart-heading">
                      <strong>Academic performance</strong>
                      <span>2026</span>
                    </div>

                    <div className="bars">
                      {[48, 62, 56, 76, 68, 84, 72, 92].map(
                        (height, index) => (
                          <span
                            key={index}
                            style={{ height: `${height}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro">
              <span className="section-kicker">FAQ</span>
              <h2>Questions, answered.</h2>
              <p>
                Everything you need to know before bringing your school into a
                more organized workflow.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((item, index) => (
                <div
                  className={`faq-item ${faq === index ? "open" : ""}`}
                  key={item.q}
                >
                  <button
                    onClick={() => setFaq(faq === index ? null : index)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={19} />
                  </button>

                  {faq === index && <p>{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <div>
                <span className="section-kicker light">READY WHEN YOU ARE</span>
                <h2>Bring your school management together.</h2>
                <p>
                  Start exploring SchoolMarks and build a clearer academic
                  workflow.
                </p>
              </div>

              <button onClick={() => setAccess(true)}>
                Open SchoolMarks
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>
              A modern school management experience built around clarity,
              organization and better academic workflows.
            </p>
          </div>

          <div className="footer-links">
            <strong>Platform</strong>
            <a href="#features">Features</a>
            <a href="#platform">Platform</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-links">
            <strong>Grades</strong>
            <span>Grade 1 — 5</span>
            <span>Grade 6 — 8</span>
            <span>Grade 9 — 10</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 SchoolMarks. All rights reserved.</span>
          <span>Built for better school management.</span>
        </div>
      </footer>

      {access && (
        <AccessModal
          onClose={() => setAccess(false)}
          onContinue={() => {
            setAccess(false);
            setPage("dashboard");
            window.scrollTo({ top: 0 });
          }}
        />
      )}
    </div>
  );
}

function AccessModal({ onClose, onContinue }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="access-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={19} />
        </button>

        <div className="access-icon">
          <GraduationCap size={28} />
        </div>

        <span className="section-kicker">SCHOOLMARKS PLATFORM</span>

        <h2>Welcome to your school workspace.</h2>

        <p>
          This is a demo access screen. No email or password is required.
        </p>

        <button className="primary-btn full" onClick={onContinue}>
          Continue to Dashboard
          <ArrowRight size={18} />
        </button>

        <small>Your data is stored locally in this browser.</small>
      </div>
    </div>
  );
}

function Dashboard({ onExit }) {
  const [active, setActive] = useState("Overview");

  const menu = [
    ["Overview", LayoutDashboard],
    ["Students", Users],
    ["Classes", NotebookTabs],
    ["Subjects", BookOpen],
    ["Examinations", ClipboardCheck],
    ["Marks", BarChart3],
    ["Results", GraduationCap],
    ["Attendance", CalendarDays],
    ["Performance", BarChart3],
    ["Reports", NotebookTabs],
    ["Notices", ClipboardCheck],
    ["Settings", Settings],
  ];

  return (
    <div className="app-dashboard">
      <header className="dashboard-header">
        <button className="logo-button" onClick={onExit}>
          <Logo compact />
        </button>

        <div className="dashboard-header-right">
          <div className="dashboard-school">
            <span>SchoolMarks</span>
            <small>Academic Workspace</small>
          </div>

          <button className="dashboard-exit" onClick={onExit}>
            Website
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <div className="sidebar-label">Workspace</div>

          {menu.map(([name, Icon]) => (
            <button
              key={name}
              className={active === name ? "active" : ""}
              onClick={() => setActive(name)}
            >
              <Icon size={17} />
              <span>{name}</span>
            </button>
          ))}
        </aside>

        <main className="dashboard-content">
          <div className="dashboard-title">
            <div>
              <span className="section-kicker">SCHOOL OVERVIEW</span>
              <h1>{active}</h1>
              <p>Manage your school information from one workspace.</p>
            </div>

            <button className="primary-btn">
              Add new
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="dashboard-cards">
            <div>
              <span>Total students</span>
              <strong>1,248</strong>
              <small>Across Grade 1–10</small>
            </div>

            <div>
              <span>Average attendance</span>
              <strong>94.6%</strong>
              <small>+2.4% this month</small>
            </div>

            <div>
              <span>Average performance</span>
              <strong>82.4%</strong>
              <small>+5.1% this term</small>
            </div>

            <div>
              <span>Active classes</span>
              <strong>36</strong>
              <small>10 grade levels</small>
            </div>
          </div>

          <div className="dashboard-main-grid">
            <section className="dashboard-panel large">
              <div className="panel-heading">
                <div>
                  <span>Academic performance</span>
                  <strong>Overall student performance</strong>
                </div>
                <button>2026</button>
              </div>

              <div className="large-chart">
                {[42, 57, 51, 67, 63, 78, 71, 88, 82, 94].map(
                  (height, index) => (
                    <div className="chart-column" key={index}>
                      <span style={{ height: `${height}%` }} />
                      <small>{index + 1}</small>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="dashboard-panel">
              <div className="panel-heading">
                <div>
                  <span>Attendance</span>
                  <strong>This month</strong>
                </div>
              </div>

              <div className="attendance-circle">
                <div>
                  <strong>94.6%</strong>
                  <span>Present</span>
                </div>
              </div>

              <div className="attendance-legend">
                <span>
                  <i />
                  Present
                </span>
                <span>
                  <i />
                  Absent
                </span>
              </div>
            </section>
          </div>

          <section className="dashboard-panel table-panel">
            <div className="panel-heading">
              <div>
                <span>Recent students</span>
                <strong>Student overview</strong>
              </div>

              <button>View all</button>
            </div>

            <div className="student-table">
              <div className="table-row table-head">
                <span>Student</span>
                <span>Grade</span>
                <span>Performance</span>
                <span>Status</span>
              </div>

              {[
                ["Ayesha Khan", "Grade 9", "91%", "Excellent"],
                ["Hamza Ahmed", "Grade 8", "86%", "Good"],
                ["Zara Ali", "Grade 10", "94%", "Excellent"],
                ["Rayyan Malik", "Grade 7", "79%", "Good"],
              ].map((student) => (
                <div className="table-row" key={student[0]}>
                  <span>
                    <b>{student[0].charAt(0)}</b>
                    {student[0]}
                  </span>
                  <span>{student[1]}</span>
                  <span>{student[2]}</span>
                  <span className="status">{student[3]}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;