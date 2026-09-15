import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";

const imageSets = {
  hero: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=90",
    "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=90",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1800&q=90",
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

const defaultStudents = [
  { id: 1, name: "Ayaan Ahmed", roll: "1001", grade: "Grade 9", section: "A", attendance: 94, average: 91 },
  { id: 2, name: "Hania Khan", roll: "1002", grade: "Grade 8", section: "A", attendance: 97, average: 95 },
  { id: 3, name: "Rayyan Ali", roll: "1003", grade: "Grade 10", section: "B", attendance: 91, average: 88 },
  { id: 4, name: "Areeba Fatima", roll: "1004", grade: "Grade 7", section: "A", attendance: 96, average: 93 },
  { id: 5, name: "Hamza Saeed", roll: "1005", grade: "Grade 6", section: "B", attendance: 89, average: 84 },
  { id: 6, name: "Maham Noor", roll: "1006", grade: "Grade 5", section: "A", attendance: 98, average: 96 },
  { id: 7, name: "Daniyal Shah", roll: "1007", grade: "Grade 4", section: "A", attendance: 92, average: 86 },
  { id: 8, name: "Eman Raza", roll: "1008", grade: "Grade 3", section: "B", attendance: 95, average: 90 },
];

const grades = Array.from({ length: 10 }, (_, index) => `Grade ${index + 1}`);

const features = [
  {
    icon: Users,
    title: "Student Records",
    text: "Keep student profiles, classes, sections and academic information organised in one place.",
  },
  {
    icon: ClipboardCheck,
    title: "Marks & Results",
    text: "Enter marks, calculate percentages and prepare clear academic results without spreadsheets.",
  },
  {
    icon: CalendarDays,
    title: "Attendance",
    text: "Track daily attendance and quickly understand attendance patterns across classes.",
  },
  {
    icon: BarChart3,
    title: "Performance",
    text: "Turn academic data into useful insights for teachers, students and school management.",
  },
];

const process = [
  {
    number: "01",
    title: "Set up your school",
    text: "Create classes, sections and subjects for your academic structure.",
  },
  {
    number: "02",
    title: "Add your students",
    text: "Build your student records and organise them by grade and section.",
  },
  {
    number: "03",
    title: "Record academics",
    text: "Manage examinations, marks, attendance and notices from one workspace.",
  },
  {
    number: "04",
    title: "Understand results",
    text: "Review rankings, performance, attendance and reports with clarity.",
  },
];

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "classes", label: "Classes", icon: GraduationCap },
  { id: "subjects", label: "Subjects", icon: BookOpen },
  { id: "examinations", label: "Examinations", icon: ClipboardCheck },
  { id: "marks", label: "Marks", icon: Pencil },
  { id: "results", label: "Results", icon: Trophy },
  { id: "attendance", label: "Attendance", icon: CalendarDays },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

function SmartImage({ sources, alt, className = "", priority = false }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`image-fallback ${className}`}>
        <GraduationCap size={42} />
      </div>
    );
  }

  return (
    <img
      src={sources[index]}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => {
        if (index < sources.length - 1) {
          setIndex((current) => current + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <div className="brand-mark">
        <GraduationCap size={22} strokeWidth={2.4} />
      </div>
      <div>
        <strong>SchoolMarks</strong>
        {!compact && <span>School management, simplified.</span>}
      </div>
    </div>
  );
}

function Button({ children, variant = "primary", onClick, icon = true, type = "button" }) {
  return (
    <button type={type} className={`button button-${variant}`} onClick={onClick}>
      {children}
      {icon && <ArrowRight size={17} />}
    </button>
  );
}

function PublicNavbar({ onEnter }) {
  const [open, setOpen] = useState(false);

  const links = [
    ["Features", "features"],
    ["Platform", "platform"],
    ["Grades", "grades"],
    ["Process", "process"],
    ["FAQ", "faq"],
  ];

  return (
    <header className="public-navbar">
      <div className="container nav-inner">
        <a href="#home" className="nav-logo">
          <Logo />
        </a>

        <nav className={`public-links ${open ? "public-links-open" : ""}`}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="nav-text-button" onClick={onEnter}>
            Open Platform
          </button>
          <button className="nav-main-button" onClick={onEnter}>
            Get Started <ArrowRight size={16} />
          </button>
          <button className="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function LandingPage({ onEnter }) {
  return (
    <div className="site">
      <PublicNavbar onEnter={onEnter} />

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Built for modern schools
              </div>

              <h1>
                Run your school
                <span> with more clarity.</span>
              </h1>

              <p>
                SchoolMarks brings students, academics, attendance, results and
                reporting together in one calm, connected workspace.
              </p>

              <div className="hero-actions">
                <Button onClick={onEnter}>Explore SchoolMarks</Button>
                <a className="secondary-link" href="#platform">
                  See how it works <ChevronRight size={17} />
                </a>
              </div>

              <div className="hero-proof">
                <div className="proof-avatars">
                  <span>AK</span>
                  <span>HN</span>
                  <span>RS</span>
                  <span>+</span>
                </div>
                <div>
                  <strong>Made for everyday school work</strong>
                  <small>Simple enough for teams to use every day.</small>
                </div>
              </div>
            </div>

            <div className="hero-media">
              <SmartImage
                sources={imageSets.hero}
                alt="Modern school campus"
                className="hero-main-image"
                priority
              />

              <div className="hero-floating-card hero-floating-top">
                <div className="mini-icon">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <small>Average performance</small>
                  <strong>91.4%</strong>
                </div>
                <span className="positive">+8.2%</span>
              </div>

              <div className="hero-floating-card hero-floating-bottom">
                <div className="mini-check">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Attendance updated</strong>
                  <small>Grade 9 · Today</small>
                </div>
              </div>

              <div className="hero-image-label">
                <span>SchoolMarks</span>
                <small>One platform. Every classroom.</small>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <span>Everything your school needs to stay organised</span>
            <div className="trust-items">
              <span><ShieldCheck size={17} /> Structured</span>
              <span><Clock3 size={17} /> Efficient</span>
              <span><BarChart3 size={17} /> Insightful</span>
              <span><GraduationCap size={17} /> School-first</span>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">The platform</span>
              <h2>Everything important, connected.</h2>
              <p>
                Replace scattered spreadsheets and disconnected records with
                one clear academic workspace.
              </p>
            </div>

            <div className="feature-grid">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article className="feature-card" key={feature.title}>
                    <div className="feature-icon">
                      <Icon size={22} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                    <a href="#platform">
                      Explore <ArrowRight size={15} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="image-section" id="platform">
          <div className="container image-split">
            <div className="image-panel">
              <SmartImage
                sources={imageSets.classroom}
                alt="Students learning in a classroom"
              />
              <div className="image-stat">
                <span>10</span>
                <small>Grades supported</small>
              </div>
            </div>

            <div className="image-copy">
              <span className="section-kicker">A better daily workflow</span>
              <h2>Less admin. More time for education.</h2>
              <p>
                SchoolMarks is designed around the way schools actually work.
                Create your academic structure, organise students, record
                results and quickly understand what is happening across your
                school.
              </p>

              <div className="check-list">
                <div>
                  <span><Check size={15} /></span>
                  Student records in one place
                </div>
                <div>
                  <span><Check size={15} /></span>
                  Marks and results without manual calculations
                </div>
                <div>
                  <span><Check size={15} /></span>
                  Attendance visibility across grades
                </div>
                <div>
                  <span><Check size={15} /></span>
                  Reports that are easy to understand
                </div>
              </div>

              <Button onClick={onEnter}>Open the workspace</Button>
            </div>
          </div>
        </section>

        <section className="section grades-section" id="grades">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">Academic structure</span>
              <h2>From Grade 1 to Grade 10.</h2>
              <p>
                Build a complete academic structure that grows with your
                students.
              </p>
            </div>

            <div className="grade-grid">
              {grades.map((grade, index) => (
                <div className="grade-card" key={grade}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{grade}</strong>
                  <ChevronRight size={18} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">Simple process</span>
              <h2>Set it up once. Manage it every day.</h2>
              <p>
                A straightforward workflow for school administration and
                academic management.
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

        <section className="preview-section">
          <div className="container preview-layout">
            <div className="preview-copy">
              <span className="section-kicker">The workspace</span>
              <h2>A calm command centre for your school.</h2>
              <p>
                Get the important numbers first, then move directly into the
                part of the school you need to manage.
              </p>

              <div className="preview-points">
                <div>
                  <strong>01</strong>
                  <span>School overview at a glance</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>Quick access to academic records</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Clear performance and attendance insights</span>
                </div>
              </div>

              <Button onClick={onEnter}>Preview Dashboard</Button>
            </div>

            <div className="dashboard-preview">
              <div className="preview-topbar">
                <Logo compact />
                <div className="preview-user">
                  <span>SK</span>
                  <div>
                    <strong>School Admin</strong>
                    <small>Academic Office</small>
                  </div>
                </div>
              </div>

              <div className="preview-body">
                <div className="preview-welcome">
                  <div>
                    <small>Monday, September 15</small>
                    <h3>School overview</h3>
                  </div>
                  <div className="preview-date">
                    <CalendarDays size={16} />
                    Academic Year 2026
                  </div>
                </div>

                <div className="preview-stat-grid">
                  <div>
                    <small>Students</small>
                    <strong>842</strong>
                    <span>+24 this term</span>
                  </div>
                  <div>
                    <small>Attendance</small>
                    <strong>94.8%</strong>
                    <span>+2.4% this month</span>
                  </div>
                  <div>
                    <small>Average result</small>
                    <strong>87.2%</strong>
                    <span>+5.1% this term</span>
                  </div>
                </div>

                <div className="preview-chart">
                  <div className="chart-header">
                    <div>
                      <small>Academic performance</small>
                      <strong>91.4%</strong>
                    </div>
                    <span>Last 6 months</span>
                  </div>
                  <div className="chart-bars">
                    {[48, 60, 53, 72, 66, 84, 78, 94, 88, 100].map((height, i) => (
                      <div key={i} className="chart-bar">
                        <span style={{ height: `${height}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="student-image-section">
          <div className="container student-image-grid">
            <div className="student-image-copy">
              <span className="section-kicker">Built around people</span>
              <h2>Give every student record the attention it deserves.</h2>
              <p>
                Keep academic information structured and accessible, while
                giving teachers and administrators a clearer picture of
                student progress.
              </p>

              <div className="quote-card">
                <Star size={18} />
                <p>
                  “Good school management should feel organised, not
                  complicated.”
                </p>
              </div>
            </div>

            <div className="student-image">
              <SmartImage
                sources={imageSets.students}
                alt="Students collaborating at school"
              />
            </div>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">Designed for schools</span>
              <h2>Clarity where it matters.</h2>
            </div>

            <div className="testimonial-grid">
              <article>
                <div className="stars">★★★★★</div>
                <p>
                  “The whole idea is simple: school data should be easy to
                  understand and easy to manage.”
                </p>
                <strong>Academic Coordinator</strong>
                <span>Secondary School</span>
              </article>

              <article>
                <div className="stars">★★★★★</div>
                <p>
                  “Instead of jumping between different files, the important
                  information can live in one organised workspace.”
                </p>
                <strong>School Administrator</strong>
                <span>Private School</span>
              </article>

              <article>
                <div className="stars">★★★★★</div>
                <p>
                  “A clean interface makes a huge difference when the system
                  is used every day by a busy school team.”
                </p>
                <strong>Principal</strong>
                <span>Education Network</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="section-heading">
              <span className="section-kicker">Questions</span>
              <h2>Everything you need to know.</h2>
              <p>
                A few quick answers about the SchoolMarks platform.
              </p>
            </div>

            <div className="faq-list">
              {[
                ["Does SchoolMarks need a backend?", "This version is designed to work locally in the browser using LocalStorage. A backend can be connected later."],
                ["Which grades are supported?", "SchoolMarks is structured for Grade 1 through Grade 10."],
                ["Can I manage attendance?", "Yes. Attendance is a dedicated part of the management workspace."],
                ["Can I manage examinations and marks?", "Yes. Examinations, marks and results have separate areas for a cleaner academic workflow."],
                ["Can the school branding be changed?", "The application architecture includes a settings area for school branding and theme customisation."],
              ].map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-box">
            <div>
              <span className="section-kicker">Ready when you are</span>
              <h2>Bring your school's daily work together.</h2>
              <p>
                Start with the workspace and build your academic structure
                around the way your school operates.
              </p>
            </div>
            <Button onClick={onEnter}>Enter SchoolMarks</Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>
              A modern school management workspace designed to make academic
              administration clearer.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <strong>Platform</strong>
              <a href="#features">Features</a>
              <a href="#platform">Platform</a>
              <a href="#grades">Grades</a>
            </div>
            <div>
              <strong>Company</strong>
              <a href="#process">How it works</a>
              <a href="#faq">FAQ</a>
              <button onClick={onEnter}>Open platform</button>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 SchoolMarks. All rights reserved.</span>
          <span>Built for better school management.</span>
        </div>
      </footer>
    </div>
  );
}

function AccessScreen({ onContinue, onBack }) {
  return (
    <div className="access-screen">
      <div className="access-background" />

      <div className="access-card">
        <button className="access-back" onClick={onBack}>
          <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
          Back to website
        </button>

        <div className="access-logo">
          <Logo />
        </div>

        <div className="access-icon">
          <Sparkles size={27} />
        </div>

        <span className="section-kicker">School workspace</span>
        <h1>Welcome to SchoolMarks.</h1>
        <p>
          Your school's academic workspace is ready. Continue to manage
          students, academics, attendance and results.
        </p>

        <div className="access-info">
          <div>
            <Check size={17} />
            <span>Student management</span>
          </div>
          <div>
            <Check size={17} />
            <span>Marks and results</span>
          </div>
          <div>
            <Check size={17} />
            <span>Attendance and reports</span>
          </div>
        </div>

        <button className="access-button" onClick={onContinue}>
          Continue to Dashboard
          <ArrowRight size={18} />
        </button>

        <small>No account or password required in this demo.</small>
      </div>
    </div>
  );
}

function DashboardShell({ onExit }) {
  const [active, setActive] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("schoolmarks_students");
    return saved ? JSON.parse(saved) : defaultStudents;
  });

  const [search, setSearch] = useState("");
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    localStorage.setItem("schoolmarks_students", JSON.stringify(students));
  }, [students]);

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase();

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.roll.toLowerCase().includes(query) ||
        student.grade.toLowerCase().includes(query)
    );
  }, [students, search]);

  const currentLabel =
    navItems.find((item) => item.id === active)?.label || "Overview";

  const handleSaveStudent = (student) => {
    if (editingStudent) {
      setStudents((current) =>
        current.map((item) => (item.id === student.id ? student : item))
      );
    } else {
      setStudents((current) => [
        ...current,
        {
          ...student,
          id: Date.now(),
          attendance: Number(student.attendance),
          average: Number(student.average),
        },
      ]);
    }

    setShowStudentModal(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id) => {
    setStudents((current) => current.filter((student) => student.id !== id));
  };

  const selectPage = (id) => {
    setActive(id);
    setMobileNav(false);
  };

  return (
    <div className="dashboard-app">
      <header className="app-header">
        <div className="app-header-left">
          <button
            className="app-mobile-menu"
            onClick={() => setMobileNav(!mobileNav)}
          >
            <Menu size={21} />
          </button>

          <Logo compact />

          <div className="app-location">
            <ChevronRight size={15} />
            <span>{currentLabel}</span>
          </div>
        </div>

        <div className="app-header-right">
          <button className="header-icon-button">
            <Bell size={18} />
            <span />
          </button>

          <div className="admin-profile">
            <div className="admin-avatar">SA</div>
            <div>
              <strong>School Admin</strong>
              <small>Academic Office</small>
            </div>
            <ChevronDown size={15} />
          </div>
        </div>
      </header>

      <div className="app-layout">
        <aside className={`app-sidebar ${mobileNav ? "app-sidebar-open" : ""}`}>
          <div className="sidebar-school">
            <div className="sidebar-school-logo">
              <GraduationCap size={21} />
            </div>
            <div>
              <strong>Greenfield School</strong>
              <span>Academic Year 2026</span>
            </div>
          </div>

          <div className="sidebar-label">Workspace</div>

          <nav className="app-nav">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={active === item.id ? "active" : ""}
                  onClick={() => selectPage(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-help">
              <div>
                <Sparkles size={18} />
              </div>
              <strong>SchoolMarks</strong>
              <span>Keep your school organised.</span>
            </div>

            <button className="exit-button" onClick={onExit}>
              <ArrowRight size={17} style={{ transform: "rotate(180deg)" }} />
              Website
            </button>
          </div>
        </aside>

        <main className="app-content">
          {active === "overview" && (
            <OverviewPage
              students={students}
              onNavigate={selectPage}
            />
          )}

          {active === "students" && (
            <StudentsPage
              students={filteredStudents}
              search={search}
              setSearch={setSearch}
              onAdd={() => {
                setEditingStudent(null);
                setShowStudentModal(true);
              }}
              onEdit={(student) => {
                setEditingStudent(student);
                setShowStudentModal(true);
              }}
              onDelete={handleDeleteStudent}
            />
          )}

          {active === "classes" && <ClassesPage />}
          {active === "subjects" && <SubjectsPage />}
          {active === "examinations" && <ExaminationsPage />}
          {active === "marks" && <MarksPage />}
          {active === "results" && <ResultsPage students={students} />}
          {active === "attendance" && <AttendancePage students={students} />}
          {active === "performance" && <PerformancePage students={students} />}
          {active === "reports" && <ReportsPage />}
          {active === "notices" && <NoticesPage />}
          {active === "settings" && <SettingsPage />}

          <div className="app-footer">
            <span>SchoolMarks · Academic management workspace</span>
            <span>Local workspace</span>
          </div>
        </main>
      </div>

      {showStudentModal && (
        <StudentModal
          student={editingStudent}
          onClose={() => {
            setShowStudentModal(false);
            setEditingStudent(null);
          }}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
}

function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function OverviewPage({ students, onNavigate }) {
  const average =
    students.reduce((sum, student) => sum + student.average, 0) /
    Math.max(students.length, 1);

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="School overview at a glance."
        description="Monitor the important academic signals across your school."
        action={
          <Button onClick={() => onNavigate("students")}>
            Manage Students
          </Button>
        }
      />

      <div className="dashboard-stat-grid">
        <DashboardStat
          label="Total students"
          value="842"
          change="+24"
          icon={Users}
        />
        <DashboardStat
          label="Average attendance"
          value="94.8%"
          change="+2.4%"
          icon={CalendarDays}
        />
        <DashboardStat
          label="Average performance"
          value={`${average.toFixed(1)}%`}
          change="+5.1%"
          icon={TrendingUp}
        />
        <DashboardStat
          label="Active classes"
          value="30"
          change="+3"
          icon={GraduationCap}
        />
      </div>

      <div className="overview-grid">
        <section className="workspace-card performance-card">
          <div className="workspace-card-header">
            <div>
              <span>Academic performance</span>
              <h2>91.4%</h2>
            </div>
            <button className="small-select">
              2026 <ChevronDown size={14} />
            </button>
          </div>

          <div className="large-chart">
            <div className="chart-grid-lines">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="large-bars">
              {[62, 70, 55, 76, 68, 85, 78, 92, 88, 96, 91, 98].map(
                (height, index) => (
                  <div key={index} className="large-bar">
                    <span style={{ height: `${height}%` }} />
                    <small>
                      {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][
                        index
                      ]}
                    </small>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="workspace-card quick-card">
          <div className="workspace-card-header">
            <div>
              <span>Quick actions</span>
              <h2>Move faster</h2>
            </div>
          </div>

          <div className="quick-actions">
            <button onClick={() => onNavigate("students")}>
              <Users size={19} />
              <span>
                <strong>Add student</strong>
                <small>Create a new student record</small>
              </span>
              <ChevronRight size={16} />
            </button>

            <button onClick={() => onNavigate("marks")}>
              <Pencil size={19} />
              <span>
                <strong>Enter marks</strong>
                <small>Record examination marks</small>
              </span>
              <ChevronRight size={16} />
            </button>

            <button onClick={() => onNavigate("attendance")}>
              <CalendarDays size={19} />
              <span>
                <strong>Take attendance</strong>
                <small>Update today's attendance</small>
              </span>
              <ChevronRight size={16} />
            </button>

            <button onClick={() => onNavigate("reports")}>
              <FileText size={19} />
              <span>
                <strong>View reports</strong>
                <small>Generate academic reports</small>
              </span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <div className="overview-grid lower-grid">
        <section className="workspace-card">
          <div className="workspace-card-header">
            <div>
              <span>Top performers</span>
              <h2>This term</h2>
            </div>
            <button className="text-action" onClick={() => onNavigate("performance")}>
              View all <ArrowRight size={15} />
            </button>
          </div>

          <div className="performer-list">
            {students.slice(0, 5).map((student, index) => (
              <div className="performer-row" key={student.id}>
                <span className="rank-number">0{index + 1}</span>
                <div className="performer-avatar">
                  {student.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="performer-info">
                  <strong>{student.name}</strong>
                  <small>
                    {student.grade} · Section {student.section}
                  </small>
                </div>
                <strong className="performer-score">{student.average}%</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="workspace-card">
          <div className="workspace-card-header">
            <div>
              <span>Attendance</span>
              <h2>Today</h2>
            </div>
            <button className="small-select">
              All grades <ChevronDown size={14} />
            </button>
          </div>

          <div className="attendance-ring-wrap">
            <div className="attendance-ring">
              <div>
                <strong>94.8%</strong>
                <span>Present</span>
              </div>
            </div>

            <div className="attendance-details">
              <div>
                <span className="status-dot present" />
                <span>Present</span>
                <strong>798</strong>
              </div>
              <div>
                <span className="status-dot absent" />
                <span>Absent</span>
                <strong>29</strong>
              </div>
              <div>
                <span className="status-dot late" />
                <span>Late</span>
                <strong>15</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function DashboardStat({ label, value, change, icon: Icon }) {
  return (
    <div className="dashboard-stat">
      <div className="stat-top">
        <span>{label}</span>
        <div className="stat-icon">
          <Icon size={18} />
        </div>
      </div>
      <strong>{value}</strong>
      <small>
        <span>{change}</span> from previous period
      </small>
    </div>
  );
}

function StudentsPage({
  students,
  search,
  setSearch,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <PageHeader
        eyebrow="Student management"
        title="Students"
        description="Manage student records, grades, sections and academic information."
        action={<Button onClick={onAdd}>Add Student</Button>}
      />

      <div className="workspace-card table-card">
        <div className="table-toolbar">
          <div className="search-field">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search students..."
            />
          </div>

          <div className="toolbar-actions">
            <button className="outline-button">
              All grades <ChevronDown size={15} />
            </button>
            <button className="outline-button">
              Export <Download size={15} />
            </button>
          </div>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Grade</th>
                <th>Attendance</th>
                <th>Average</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-cell">
                      <div className="student-avatar">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <strong>{student.name}</strong>
                        <small>Section {student.section}</small>
                      </div>
                    </div>
                  </td>
                  <td>{student.roll}</td>
                  <td>{student.grade}</td>
                  <td>
                    <div className="table-progress">
                      <span>
                        <i style={{ width: `${student.attendance}%` }} />
                      </span>
                      {student.attendance}%
                    </div>
                  </td>
                  <td>
                    <strong>{student.average}%</strong>
                  </td>
                  <td>
                    <span className="status-badge">Active</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button onClick={() => onEdit(student)}>
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => onDelete(student.id)}>
                        <X size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <div className="empty-state">
              <Users size={32} />
              <strong>No students found</strong>
              <span>Try another search or add a new student.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ClassesPage() {
  const classData = grades.map((grade, index) => ({
    grade,
    sections: index < 4 ? 2 : 3,
    students: 64 + index * 13,
    teacher: ["Sara Ahmed", "Bilal Khan", "Hina Raza", "Omar Shah"][index % 4],
  }));

  return (
    <>
      <PageHeader
        eyebrow="Academic structure"
        title="Classes"
        description="Organise grades, sections and class capacity."
        action={<Button>New Class</Button>}
      />

      <div className="class-grid">
        {classData.map((item) => (
          <div className="class-card" key={item.grade}>
            <div className="class-card-top">
              <div className="grade-symbol">
                {item.grade.replace("Grade ", "")}
              </div>
              <button className="more-button">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <span>{item.grade}</span>
            <h3>{item.students} students</h3>
            <div className="class-meta">
              <span>{item.sections} sections</span>
              <span>{item.teacher}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SubjectsPage() {
  const subjects = [
    ["English", "Language", "12 classes"],
    ["Mathematics", "Core", "20 classes"],
    ["Science", "Core", "18 classes"],
    ["Computer Science", "Technology", "10 classes"],
    ["Social Studies", "Humanities", "16 classes"],
    ["Urdu", "Language", "14 classes"],
    ["Islamiyat", "Core", "15 classes"],
    ["Art & Design", "Creative", "8 classes"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Academic structure"
        title="Subjects"
        description="Manage the subjects taught across your school."
        action={<Button>Add Subject</Button>}
      />

      <div className="subject-grid">
        {subjects.map(([name, category, classes], index) => (
          <div className="subject-card" key={name}>
            <div className="subject-icon">
              <BookOpen size={20} />
            </div>
            <div className="subject-number">0{index + 1}</div>
            <span>{category}</span>
            <h3>{name}</h3>
            <small>{classes}</small>
          </div>
        ))}
      </div>
    </>
  );
}

function ExaminationsPage() {
  const exams = [
    ["First Term Examination", "15 Sep — 28 Sep", "In progress", "green"],
    ["Mid Term Assessment", "10 Nov — 20 Nov", "Upcoming", "yellow"],
    ["Final Examination", "03 Mar — 18 Mar", "Scheduled", "gray"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Academic calendar"
        title="Examinations"
        description="Plan examination periods and keep assessment schedules organised."
        action={<Button>New Examination</Button>}
      />

      <div className="exam-list">
        {exams.map(([name, date, status, tone], index) => (
          <div className="exam-card" key={name}>
            <div className="exam-number">0{index + 1}</div>
            <div className="exam-main">
              <span>Academic Year 2026</span>
              <h3>{name}</h3>
              <small>
                <CalendarDays size={15} /> {date}
              </small>
            </div>
            <span className={`exam-status ${tone}`}>{status}</span>
            <button className="outline-button">Manage <ArrowRight size={14} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

function MarksPage() {
  const rows = [
    ["Ayaan Ahmed", "Grade 9 A", "Mathematics", "92", "A+"],
    ["Hania Khan", "Grade 8 A", "English", "95", "A+"],
    ["Rayyan Ali", "Grade 10 B", "Science", "88", "A"],
    ["Areeba Fatima", "Grade 7 A", "Mathematics", "93", "A+"],
    ["Hamza Saeed", "Grade 6 B", "Science", "84", "A"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Academic records"
        title="Marks"
        description="Record and review examination marks by student and subject."
        action={<Button>Enter Marks</Button>}
      />

      <div className="workspace-card table-card">
        <div className="table-toolbar">
          <div>
            <strong>First Term Examination</strong>
            <small className="toolbar-subtitle">Mathematics · All grades</small>
          </div>
          <div className="toolbar-actions">
            <button className="outline-button">Grade 1–10 <ChevronDown size={15} /></button>
            <button className="outline-button">Save changes</button>
          </div>
        </div>

        <div className="data-table-wrap">
          <table className="data-table marks-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  <td><strong>{row[0]}</strong></td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td><input className="marks-input" defaultValue={row[3]} /></td>
                  <td><span className="grade-pill">{row[4]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ResultsPage({ students }) {
  const ordered = [...students].sort((a, b) => b.average - a.average);

  return (
    <>
      <PageHeader
        eyebrow="Academic outcomes"
        title="Results"
        description="Review academic results and student rankings."
        action={<Button>Generate Result</Button>}
      />

      <div className="result-summary">
        <div>
          <span>Overall average</span>
          <strong>87.2%</strong>
          <small>+5.1% compared with previous term</small>
        </div>
        <div>
          <span>Pass rate</span>
          <strong>96.4%</strong>
          <small>Across all grades</small>
        </div>
        <div>
          <span>Top grade</span>
          <strong>A+</strong>
          <small>Most common result</small>
        </div>
      </div>

      <div className="workspace-card ranking-card">
        <div className="workspace-card-header">
          <div>
            <span>Student ranking</span>
            <h2>Top performers</h2>
          </div>
          <button className="outline-button">Export <Download size={15} /></button>
        </div>

        <div className="ranking-list">
          {ordered.map((student, index) => (
            <div className="ranking-row" key={student.id}>
              <strong className="ranking-position">{index + 1}</strong>
              <div className="ranking-avatar">
                {student.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="ranking-name">
                <strong>{student.name}</strong>
                <small>{student.grade} · Section {student.section}</small>
              </div>
              <div className="ranking-score">
                <strong>{student.average}%</strong>
                <span>Average</span>
              </div>
              <span className="grade-pill">
                {student.average >= 90 ? "A+" : student.average >= 80 ? "A" : "B"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AttendancePage({ students }) {
  return (
    <>
      <PageHeader
        eyebrow="Daily records"
        title="Attendance"
        description="Monitor attendance across grades and keep daily records updated."
        action={<Button>Mark Attendance</Button>}
      />

      <div className="attendance-overview">
        <div className="attendance-big">
          <div className="attendance-ring large">
            <div>
              <strong>94.8%</strong>
              <span>Present</span>
            </div>
          </div>
          <div>
            <span>Today's attendance</span>
            <h2>798 of 842 students</h2>
            <p>Attendance is higher than last month by 2.4%.</p>
          </div>
        </div>

        <div className="attendance-mini-grid">
          <div><span>Present</span><strong>798</strong></div>
          <div><span>Absent</span><strong>29</strong></div>
          <div><span>Late</span><strong>15</strong></div>
          <div><span>Excused</span><strong>12</strong></div>
        </div>
      </div>

      <div className="workspace-card table-card">
        <div className="workspace-card-header table-heading">
          <div>
            <span>Student attendance</span>
            <h2>Today</h2>
          </div>
          <button className="outline-button">All grades <ChevronDown size={15} /></button>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
                <th>Attendance</th>
                <th>Today</th>
                <th>Term status</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 6).map((student, index) => (
                <tr key={student.id}>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.grade}</td>
                  <td>{student.attendance}%</td>
                  <td>
                    <span className={`attendance-status ${index === 3 ? "late" : "present"}`}>
                      {index === 3 ? "Late" : "Present"}
                    </span>
                  </td>
                  <td>
                    <div className="table-progress">
                      <span><i style={{ width: `${student.attendance}%` }} /></span>
                      {student.attendance}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function PerformancePage({ students }) {
  return (
    <>
      <PageHeader
        eyebrow="Academic insights"
        title="Performance"
        description="Understand how students and grades are progressing."
        action={<Button>Export Report</Button>}
      />

      <div className="performance-top">
        <div className="performance-highlight">
          <span>School average</span>
          <strong>91.4%</strong>
          <div className="performance-change">
            <TrendingUp size={15} /> 5.1% this term
          </div>
        </div>

        <div className="subject-performance">
          {[
            ["Mathematics", 94],
            ["English", 91],
            ["Science", 88],
            ["Computer Science", 96],
          ].map(([name, value]) => (
            <div key={name}>
              <div>
                <span>{name}</span>
                <strong>{value}%</strong>
              </div>
              <div className="performance-progress">
                <i style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="workspace-card">
        <div className="workspace-card-header">
          <div>
            <span>Student performance</span>
            <h2>Academic snapshot</h2>
          </div>
        </div>

        <div className="performance-table">
          {students.map((student) => (
            <div key={student.id}>
              <div className="student-cell">
                <div className="student-avatar">
                  {student.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <strong>{student.name}</strong>
                  <small>{student.grade}</small>
                </div>
              </div>
              <div className="performance-wide-progress">
                <span><i style={{ width: `${student.average}%` }} /></span>
              </div>
              <strong>{student.average}%</strong>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ReportsPage() {
  const reports = [
    ["Student Result Report", "Academic", "Updated today"],
    ["Attendance Summary", "Attendance", "Updated today"],
    ["Grade Performance", "Performance", "Updated yesterday"],
    ["Examination Overview", "Examinations", "Updated 2 days ago"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="School intelligence"
        title="Reports"
        description="Create clear reports for academic and administrative review."
        action={<Button>New Report</Button>}
      />

      <div className="report-grid">
        {reports.map(([title, category, updated], index) => (
          <div className="report-card" key={title}>
            <div className="report-icon">
              <FileText size={21} />
            </div>
            <span>{category}</span>
            <h3>{title}</h3>
            <small>{updated}</small>
            <button>
              Open report <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function NoticesPage() {
  const notices = [
    ["Parent-Teacher Meeting", "18 September 2026", "All parents are requested to attend the scheduled meeting."],
    ["First Term Examination", "15 September 2026", "First term examinations have started according to the published schedule."],
    ["Sports Day", "05 October 2026", "Annual sports activities will be held on the school ground."],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Communication"
        title="Notices"
        description="Create and manage school announcements."
        action={<Button>New Notice</Button>}
      />

      <div className="notice-list">
        {notices.map(([title, date, text]) => (
          <article className="notice-card" key={title}>
            <div className="notice-date">
              <CalendarDays size={18} />
              <span>{date}</span>
            </div>
            <div className="notice-content">
              <span>School announcement</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <button className="more-button">
              <MoreHorizontal size={18} />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

function SettingsPage() {
  const [schoolName, setSchoolName] = useState(
    localStorage.getItem("schoolmarks_school_name") || "Greenfield School"
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("schoolmarks_theme") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("schoolmarks_theme", theme);
    localStorage.setItem("schoolmarks_school_name", schoolName);
  }, [theme, schoolName]);

  return (
    <>
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Customise the school workspace and its appearance."
        action={
          <Button
            icon={false}
            onClick={() => {
              localStorage.setItem("schoolmarks_school_name", schoolName);
              alert("Settings saved.");
            }}
          >
            Save changes
          </Button>
        }
      />

      <div className="settings-grid">
        <section className="workspace-card settings-card">
          <div className="settings-heading">
            <div className="settings-icon"><GraduationCap size={20} /></div>
            <div>
              <h2>School identity</h2>
              <p>Basic information shown throughout the platform.</p>
            </div>
          </div>

          <label>
            School name
            <input
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
            />
          </label>

          <label>
            Academic year
            <input defaultValue="2026" />
          </label>

          <label>
            School motto
            <input defaultValue="Learning today. Building tomorrow." />
          </label>
        </section>

        <section className="workspace-card settings-card">
          <div className="settings-heading">
            <div className="settings-icon"><Sparkles size={20} /></div>
            <div>
              <h2>Appearance</h2>
              <p>Choose how the management workspace looks.</p>
            </div>
          </div>

          <div className="theme-options">
            {[
              ["light", "Light", "Clean green and white"],
              ["soft", "Soft Green", "Softer workspace"],
              ["dark", "Dark", "Low-light workspace"],
            ].map(([value, title, text]) => (
              <button
                key={value}
                className={theme === value ? "selected" : ""}
                onClick={() => setTheme(value)}
              >
                <div className={`theme-preview ${value}`} />
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
                {theme === value && <Check size={17} />}
              </button>
            ))}
          </div>
        </section>

        <section className="workspace-card settings-card">
          <div className="settings-heading">
            <div className="settings-icon"><ShieldCheck size={20} /></div>
            <div>
              <h2>Data & backup</h2>
              <p>Manage your local SchoolMarks data.</p>
            </div>
          </div>

          <div className="settings-actions">
            <button>
              <Download size={18} />
              Export school data
              <ArrowRight size={15} />
            </button>
            <button>
              <FileText size={18} />
              Import school data
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function StudentModal({ student, onClose, onSave }) {
  const [form, setForm] = useState(
    student || {
      name: "",
      roll: "",
      grade: "Grade 1",
      section: "A",
      attendance: 95,
      average: 85,
    }
  );

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="page-eyebrow">
              {student ? "Edit record" : "New record"}
            </span>
            <h2>{student ? "Edit student" : "Add student"}</h2>
          </div>
          <button onClick={onClose}>
            <X size={19} />
          </button>
        </div>

        <div className="modal-form">
          <label>
            Student name
            <input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Enter student name"
            />
          </label>

          <div className="form-row">
            <label>
              Roll number
              <input
                value={form.roll}
                onChange={(event) => update("roll", event.target.value)}
                placeholder="1009"
              />
            </label>

            <label>
              Section
              <select
                value={form.section}
                onChange={(event) => update("section", event.target.value)}
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </label>
          </div>

          <label>
            Grade
            <select
              value={form.grade}
              onChange={(event) => update("grade", event.target.value)}
            >
              {grades.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label>
              Attendance %
              <input
                type="number"
                value={form.attendance}
                onChange={(event) => update("attendance", event.target.value)}
              />
            </label>

            <label>
              Average %
              <input
                type="number"
                value={form.average}
                onChange={(event) => update("average", event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <button className="outline-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="button button-primary"
            onClick={() =>
              onSave({
                ...form,
                attendance: Number(form.attendance),
                average: Number(form.average),
              })
            }
          >
            Save student <Check size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("website");

  useEffect(() => {
    const savedTheme = localStorage.getItem("schoolmarks_theme") || "light";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  if (view === "access") {
    return (
      <AccessScreen
        onBack={() => setView("website")}
        onContinue={() => setView("dashboard")}
      />
    );
  }

  if (view === "dashboard") {
    return <DashboardShell onExit={() => setView("website")} />;
  }

  return <LandingPage onEnter={() => setView("access")} />;
}