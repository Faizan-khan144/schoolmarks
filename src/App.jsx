import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  FileBarChart2,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  UserRound,
  Users,
  X
} from "lucide-react";

const studentsSeed = [
  { id: "SM-1024", name: "Areeba Ahmed", className: "Grade 9", section: "A", average: 91, attendance: 96, status: "Excellent" },
  { id: "SM-1025", name: "Hamza Khan", className: "Grade 9", section: "A", average: 86, attendance: 93, status: "Good" },
  { id: "SM-1026", name: "Maham Ali", className: "Grade 8", section: "B", average: 88, attendance: 97, status: "Excellent" },
  { id: "SM-1027", name: "Usman Tariq", className: "Grade 10", section: "A", average: 79, attendance: 89, status: "Good" },
  { id: "SM-1028", name: "Hiba Noor", className: "Grade 8", section: "A", average: 94, attendance: 98, status: "Excellent" },
  { id: "SM-1029", name: "Rayyan Ahmed", className: "Grade 10", section: "B", average: 74, attendance: 86, status: "Needs review" }
];

const navGroups = [
  {
    label: "Workspace",
    items: [
      ["Overview", LayoutDashboard],
      ["Students", Users],
      ["Classes", GraduationCap],
      ["Subjects", BookOpen]
    ]
  },
  {
    label: "Academics",
    items: [
      ["Examinations", ClipboardList],
      ["Marks", BarChart3],
      ["Results", FileBarChart2]
    ]
  },
  {
    label: "School",
    items: [
      ["Attendance", CalendarDays],
      ["Performance", BarChart3],
      ["Reports", FileBarChart2]
    ]
  }
];

const imageUrls = {
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85",
  classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85",
  library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=85",
  students: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85",
  teacher: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=85"
};

function Logo({ dark = false }) {
  return (
    <div className={`brand ${dark ? "brand-dark" : ""}`}>
      <span className="brand-mark">S</span>
      <span>
        <strong>SchoolMarks</strong>
        <small>ACADEMIC MANAGEMENT</small>
      </span>
    </div>
  );
}

function PublicHome({ onDashboard }) {
  return (
    <div className="site">
      <header className="public-header">
        <Logo />
        <nav>
          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#workflow">How it works</a>
          <a href="#about">About</a>
        </nav>
        <button className="header-button" onClick={onDashboard}>
          Open dashboard <ArrowUpRight size={16} />
        </button>
        <button className="mobile-menu"><Menu size={21} /></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">A MODERN SCHOOL MANAGEMENT SYSTEM</span>
            <h1>The simpler way to run a <em>better school.</em></h1>
            <p>
              SchoolMarks brings student records, academics, examinations,
              attendance and results together in one calm, organised workspace.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={onDashboard}>
                Explore SchoolMarks <ArrowRight size={17} />
              </button>
              <a className="text-button" href="#platform">
                See the platform <ArrowDownIcon />
              </a>
            </div>
            <div className="hero-note">
              <span><Check size={14} /> Built for everyday school operations</span>
              <span><Check size={14} /> Simple to learn</span>
            </div>
          </div>

          <div className="hero-visual">
            <img src={imageUrls.hero} alt="Students at a university campus" />
            <div className="hero-caption">
              <span>01 / SCHOOL EXPERIENCE</span>
              <strong>Everything important, organised.</strong>
            </div>
          </div>
        </section>

        <section className="trust-row">
          <span>STUDENTS</span>
          <span>ACADEMICS</span>
          <span>EXAMINATIONS</span>
          <span>ATTENDANCE</span>
          <span>RESULTS</span>
          <span>REPORTS</span>
        </section>

        <section className="intro-section" id="about">
          <div className="section-index">01</div>
          <div className="intro-content">
            <p className="kicker">ONE SYSTEM FOR THE WHOLE SCHOOL</p>
            <h2>Designed around how schools actually work.</h2>
            <p className="large-copy">
              School administration involves hundreds of small tasks every
              day. Student information, classes, marks, attendance and reports
              should not live in disconnected places.
            </p>
            <p>
              SchoolMarks gives your team a clear place to manage the academic
              side of school life — without unnecessary complexity.
            </p>
          </div>
          <div className="intro-image">
            <img src={imageUrls.classroom} alt="Modern classroom" />
          </div>
        </section>

        <section className="statement-section">
          <div className="statement-image">
            <img src={imageUrls.students} alt="Students learning together" />
          </div>
          <div className="statement-copy">
            <span className="eyebrow light">LESS ADMINISTRATION. MORE EDUCATION.</span>
            <h2>Give teachers and administrators more room to focus.</h2>
            <p>
              From maintaining student records to preparing examination
              results, SchoolMarks turns repetitive school administration into
              a structured workflow.
            </p>
            <button className="light-button" onClick={onDashboard}>
              View the workspace <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="platform-section" id="platform">
          <div className="section-heading">
            <div>
              <span className="kicker">02 — THE PLATFORM</span>
              <h2>Everything your school needs.</h2>
            </div>
            <p>
              A focused collection of tools for managing academic records,
              daily operations and school performance.
            </p>
          </div>

          <div className="feature-grid" id="features">
            <Feature number="01" title="Student records" text="Keep student profiles, guardians, classes and academic information organised." icon={Users} />
            <Feature number="02" title="Academic structure" text="Manage classes and subjects from one central academic workspace." icon={BookOpen} />
            <Feature number="03" title="Examinations" text="Plan examinations and keep assessment information easy to access." icon={ClipboardList} />
            <Feature number="04" title="Marks & results" text="Record marks and turn assessment data into clear academic results." icon={BarChart3} />
            <Feature number="05" title="Attendance" text="Track attendance patterns and identify students who need attention." icon={CalendarDays} />
            <Feature number="06" title="Reports" text="Bring important academic information together for quick reporting." icon={FileBarChart2} />
          </div>
        </section>

        <section className="split-showcase">
          <div className="showcase-copy">
            <span className="kicker">03 — ACADEMIC CLARITY</span>
            <h2>See what is happening across your school.</h2>
            <p>
              A good management system should make important information easier
              to understand, not bury it behind endless menus.
            </p>
            <div className="mini-list">
              <div><span>01</span><strong>Student overview</strong><small>Records and profiles</small></div>
              <div><span>02</span><strong>Academic progress</strong><small>Marks and performance</small></div>
              <div><span>03</span><strong>Daily attendance</strong><small>Patterns and records</small></div>
            </div>
          </div>
          <div className="product-frame">
            <div className="product-top">
              <span>School overview</span>
              <span>September 2026</span>
            </div>
            <div className="product-stat-row">
              <div><small>STUDENTS</small><strong>1,284</strong><span>+8.4%</span></div>
              <div><small>AVERAGE</small><strong>84.6%</strong><span>+3.1%</span></div>
              <div><small>ATTENDANCE</small><strong>94.2%</strong><span>+1.8%</span></div>
            </div>
            <div className="fake-chart">
              <span>Performance trend</span>
              <svg viewBox="0 0 600 190" preserveAspectRatio="none">
                <path d="M0 150 C80 140 95 110 150 125 S220 100 270 115 S340 75 390 95 S460 55 520 70 S570 35 600 42" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </section>

        <section className="image-story">
          <div className="story-image large">
            <img src={imageUrls.library} alt="School library" />
          </div>
          <div className="story-copy">
            <span className="kicker">04 — THE EVERYDAY WORKSPACE</span>
            <h2>Quietly powerful. Easy to understand.</h2>
            <p>
              SchoolMarks is designed to stay out of the way. Clear navigation,
              readable tables and purposeful information make everyday tasks
              faster without making the interface feel complicated.
            </p>
            <div className="story-number">01</div>
            <strong>Clarity over clutter.</strong>
          </div>
        </section>

        <section className="workflow-section" id="workflow">
          <div className="section-heading">
            <div>
              <span className="kicker">05 — HOW IT WORKS</span>
              <h2>From setup to school-wide clarity.</h2>
            </div>
          </div>

          <div className="workflow">
            <Workflow number="01" title="Set up your school" text="Create your academic structure and establish the information your school works with." />
            <Workflow number="02" title="Organise academics" text="Add classes, subjects, examinations and student records in a structured workspace." />
            <Workflow number="03" title="Manage daily records" text="Keep attendance, marks and academic activity updated throughout the term." />
            <Workflow number="04" title="Understand performance" text="Use results, reports and performance views to understand progress." />
          </div>
        </section>

        <section className="teacher-section">
          <div className="teacher-copy">
            <span className="kicker">06 — MADE FOR PEOPLE</span>
            <h2>Technology should make school administration feel human.</h2>
            <p>
              SchoolMarks focuses on the people using it every day — teachers,
              administrators and school teams who need information quickly and
              clearly.
            </p>
            <div className="quote">
              “A better system does not add more work. It removes unnecessary work.”
            </div>
          </div>
          <div className="teacher-image">
            <img src={imageUrls.teacher} alt="Teacher in a classroom" />
          </div>
        </section>

        <section className="numbers-section">
          <div className="number-intro">
            <span className="kicker">07 — AT A GLANCE</span>
            <h2>Built for the details that matter.</h2>
          </div>
          <div className="numbers">
            <div><strong>1,284</strong><span>Student records</span></div>
            <div><strong>42</strong><span>Active classes</span></div>
            <div><strong>94.2%</strong><span>Attendance view</span></div>
            <div><strong>18</strong><span>Academic subjects</span></div>
          </div>
        </section>

        <section className="final-cta">
          <div>
            <span className="eyebrow light">READY WHEN YOU ARE</span>
            <h2>Your school deserves a better system.</h2>
            <p>Bring your academic operations into one organised workspace.</p>
          </div>
          <button className="light-button large" onClick={onDashboard}>
            Open SchoolMarks <ArrowUpRight size={18} />
          </button>
        </section>
      </main>

      <footer className="public-footer">
        <Logo dark />
        <div>
          <span>SchoolMarks</span>
          <small>Academic management, thoughtfully organised.</small>
        </div>
        <span>© 2026 SchoolMarks</span>
      </footer>
    </div>
  );
}

function ArrowDownIcon() {
  return <span className="arrow-down">↓</span>;
}

function Feature({ number, title, text, icon: Icon }) {
  return (
    <article className="feature">
      <div className="feature-top">
        <span>{number}</span>
        <Icon size={21} strokeWidth={1.7} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ArrowUpRight className="feature-arrow" size={18} />
    </article>
  );
}

function Workflow({ number, title, text }) {
  return (
    <article className="workflow-item">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ArrowRight size={18} />
    </article>
  );
}

function AccessScreen({ onContinue, onBack }) {
  return (
    <div className="access-page">
      <div className="access-background"></div>
      <div className="access-box">
        <Logo />
        <div className="access-line"></div>
        <span className="kicker">ACADEMIC WORKSPACE</span>
        <h1>Welcome to your school workspace.</h1>
        <p>
          Your SchoolMarks dashboard is ready. Continue to access the academic
          management workspace.
        </p>
        <button className="primary-button access-button" onClick={onContinue}>
          Continue to dashboard <ArrowRight size={17} />
        </button>
        <button className="back-link" onClick={onBack}>Return to SchoolMarks</button>
      </div>
    </div>
  );
}

function Dashboard({ onExit }) {
  const [active, setActive] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("schoolmarks-students")) || studentsSeed;
    } catch {
      return studentsSeed;
    }
  });
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    localStorage.setItem("schoolmarks-students", JSON.stringify(students));
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesQuery =
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.id.toLowerCase().includes(query.toLowerCase());
      const matchesClass = classFilter === "All" || student.className === classFilter;
      return matchesQuery && matchesClass;
    });
  }, [students, query, classFilter]);

  function selectPage(page) {
    setActive(page);
    setSidebarOpen(false);
  }

  function addStudent(data) {
    const next = {
      ...data,
      id: `SM-${1030 + students.length}`,
      average: Number(data.average || 0),
      attendance: Number(data.attendance || 0),
      status: Number(data.average || 0) >= 90 ? "Excellent" : Number(data.average || 0) >= 75 ? "Good" : "Needs review"
    };
    setStudents((current) => [...current, next]);
    setModal(null);
  }

  function deleteStudent(id) {
    setStudents((current) => current.filter((student) => student.id !== id));
  }

  return (
    <div className="dashboard-app">
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="dashboard-brand">
          <Logo />
          <button onClick={() => setSidebarOpen(false)}><X size={19} /></button>
        </div>

        <div className="school-switcher">
          <div className="school-symbol">JM</div>
          <div>
            <strong>JEB School</strong>
            <span>Academic year 2026</span>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="dashboard-nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <span className="nav-label">{group.label}</span>
              {group.items.map(([label, Icon]) => (
                <button
                  className={active === label ? "active" : ""}
                  key={label}
                  onClick={() => selectPage(label)}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <button onClick={() => selectPage("Settings")}><Settings size={17} /> Settings</button>
          <button onClick={onExit}><ArrowLeftIcon /> Back to site</button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="mobile-sidebar-button" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button>
          <div className="breadcrumb">
            <span>SchoolMarks</span>
            <b>/</b>
            <strong>{active}</strong>
          </div>
          <div className="topbar-actions">
            <button className="search-trigger"><Search size={17} /><span>Search</span><kbd>⌘ K</kbd></button>
            <button className="icon-button"><Bell size={18} /><i></i></button>
            <div className="profile-mini">
              <span>FK</span>
              <div><strong>School Admin</strong><small>Administrator</small></div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {active === "Overview" && <Overview onAdd={() => setModal("student")} onStudents={() => selectPage("Students")} />}
          {active === "Students" && (
            <StudentsPage
              students={filteredStudents}
              query={query}
              setQuery={setQuery}
              classFilter={classFilter}
              setClassFilter={setClassFilter}
              onAdd={() => setModal("student")}
              onDelete={deleteStudent}
            />
          )}
          {active !== "Overview" && active !== "Students" && <ModulePage title={active} />}
        </div>
      </div>

      {modal === "student" && <StudentModal onClose={() => setModal(null)} onSave={addStudent} />}
    </div>
  );
}

function ArrowLeftIcon() {
  return <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} />;
}

function Overview({ onAdd, onStudents }) {
  return (
    <div className="overview-page">
      <div className="page-heading">
        <div>
          <span className="kicker">SEPTEMBER 2026 · SCHOOL OVERVIEW</span>
          <h1>Academic overview.</h1>
          <p>A clear view of what is happening across the school.</p>
        </div>
        <button className="dark-button" onClick={onAdd}><Plus size={17} /> Add student</button>
      </div>

      <div className="overview-grid">
        <section className="main-panel performance-panel">
          <div className="panel-header">
            <div><span>ACADEMIC PERFORMANCE</span><h2>School average</h2></div>
            <div className="panel-value"><strong>84.6%</strong><small>+3.1% this term</small></div>
          </div>
          <div className="large-chart">
            <div className="chart-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span></div>
            <svg viewBox="0 0 760 300" preserveAspectRatio="none">
              <line x1="0" y1="40" x2="760" y2="40" />
              <line x1="0" y1="120" x2="760" y2="120" />
              <line x1="0" y1="200" x2="760" y2="200" />
              <line x1="0" y1="280" x2="760" y2="280" />
              <path d="M0 218 C65 212 85 175 145 190 S225 150 285 168 S365 116 420 138 S500 102 555 116 S630 60 680 80 S730 50 760 56" />
            </svg>
            <div className="chart-months"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
          </div>
        </section>

        <section className="side-panel attendance-panel">
          <div className="panel-header simple"><span>ATTENDANCE</span><ArrowUpRight size={17} /></div>
          <div className="attendance-ring">
            <div><strong>94.2</strong><span>%</span><small>Present</small></div>
          </div>
          <div className="attendance-meta">
            <span><i className="dot present"></i>Present <b>1,209</b></span>
            <span><i className="dot absent"></i>Absent <b>75</b></span>
          </div>
        </section>

        <section className="main-panel schedule-panel">
          <div className="panel-header">
            <div><span>TODAY</span><h2>School schedule</h2></div>
            <button className="plain-link">View calendar <ArrowRight size={15} /></button>
          </div>
          <div className="schedule-list">
            <Schedule time="09:00" subject="Mathematics" room="Grade 9 — Room 204" />
            <Schedule time="10:30" subject="Physics" room="Grade 10 — Lab 2" />
            <Schedule time="12:00" subject="English Literature" room="Grade 8 — Room 107" />
          </div>
        </section>

        <section className="side-panel term-panel">
          <span>TERM PROGRESS</span>
          <strong>62%</strong>
          <p>Academic year progress</p>
          <div className="progress-line"><i></i></div>
          <small>18 weeks completed · 11 remaining</small>
        </section>

        <section className="main-panel activity-panel">
          <div className="panel-header">
            <div><span>RECENT ACTIVITY</span><h2>Latest updates</h2></div>
            <button className="plain-link" onClick={onStudents}>Student directory <ArrowRight size={15} /></button>
          </div>
          <div className="activity-list">
            <Activity initials="AA" title="Areeba Ahmed" action="marks were updated" time="8 min ago" />
            <Activity initials="HM" title="Hamza Khan" action="attendance was recorded" time="24 min ago" />
            <Activity initials="MN" title="Maham Ali" action="result was published" time="1 hr ago" />
            <Activity initials="UT" title="Usman Tariq" action="profile information changed" time="2 hrs ago" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Schedule({ time, subject, room }) {
  return (
    <div className="schedule-row">
      <span>{time}</span>
      <div><strong>{subject}</strong><small>{room}</small></div>
      <Clock3 size={16} />
    </div>
  );
}

function Activity({ initials, title, action, time }) {
  return (
    <div className="activity-row">
      <span className="activity-avatar">{initials}</span>
      <div><strong>{title}</strong><span>{action}</span></div>
      <small>{time}</small>
    </div>
  );
}

function StudentsPage({ students, query, setQuery, classFilter, setClassFilter, onAdd, onDelete }) {
  return (
    <div className="students-page">
      <div className="page-heading">
        <div>
          <span className="kicker">ACADEMIC DIRECTORY</span>
          <h1>Students.</h1>
          <p>Manage student records from one organised directory.</p>
        </div>
        <button className="dark-button" onClick={onAdd}><Plus size={17} /> Add student</button>
      </div>

      <div className="directory-stats">
        <div><span>TOTAL STUDENTS</span><strong>1,284</strong></div>
        <div><span>AVERAGE ATTENDANCE</span><strong>94.2%</strong></div>
        <div><span>ACADEMIC AVERAGE</span><strong>84.6%</strong></div>
        <div><span>NEEDS REVIEW</span><strong>48</strong></div>
      </div>

      <div className="directory">
        <div className="directory-toolbar">
          <div className="directory-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students..." /></div>
          <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            <option>All</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
          </select>
        </div>

        <div className="student-table">
          <div className="table-head">
            <span>STUDENT</span><span>CLASS</span><span>AVERAGE</span><span>ATTENDANCE</span><span>STATUS</span><span></span>
          </div>
          {students.map((student) => (
            <div className="table-row" key={student.id}>
              <div className="student-cell">
                <span>{student.name.slice(0, 2).toUpperCase()}</span>
                <div><strong>{student.name}</strong><small>{student.id}</small></div>
              </div>
              <span>{student.className} — {student.section}</span>
              <strong>{student.average}%</strong>
              <span>{student.attendance}%</span>
              <span className={`status ${student.status === "Excellent" ? "excellent" : student.status === "Good" ? "good" : "review"}`}>{student.status}</span>
              <button className="delete-button" onClick={() => onDelete(student.id)}><X size={15} /></button>
            </div>
          ))}
          {students.length === 0 && <div className="empty-table">No students found.</div>}
        </div>
      </div>
    </div>
  );
}

function ModulePage({ title }) {
  const data = {
    Classes: ["42", "Active classes", "8", "Sections"],
    Subjects: ["18", "Subjects", "6", "Departments"],
    Examinations: ["06", "Upcoming exams", "14", "Completed"],
    Marks: ["84.6%", "School average", "91%", "Highest average"],
    Results: ["06", "Published results", "48", "Needs review"],
    Attendance: ["94.2%", "Present today", "75", "Absent"],
    Performance: ["84.6%", "Academic average", "+3.1%", "This term"],
    Reports: ["18", "Available reports", "04", "Generated this week"],
    Settings: ["School", "Profile & branding", "2026", "Academic year"]
  };

  const values = data[title] || ["—", "Workspace", "—", "Information"];

  return (
    <div className="module-page">
      <div className="page-heading">
        <div>
          <span className="kicker">SCHOOLMARKS / {title.toUpperCase()}</span>
          <h1>{title}.</h1>
          <p>This workspace is ready for the next stage of your school management system.</p>
        </div>
        <button className="dark-button"><Plus size={17} /> Add record</button>
      </div>

      <div className="module-feature">
        <div>
          <span className="kicker">WORKSPACE</span>
          <h2>{title === "Classes" ? "Your academic structure, clearly organised." : `A focused workspace for ${title.toLowerCase()}.`}</h2>
          <p>SchoolMarks keeps the information you need close at hand, with a clean foundation ready for full functionality.</p>
        </div>
        <div className="module-icon"><BookOpen size={34} strokeWidth={1.4} /></div>
      </div>

      <div className="module-stats">
        <div><span>{values[1]}</span><strong>{values[0]}</strong></div>
        <div><span>{values[3]}</span><strong>{values[2]}</strong></div>
        <div><span>Last updated</span><strong>Today</strong></div>
      </div>
    </div>
  );
}

function StudentModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    className: "Grade 9",
    section: "A",
    average: "85",
    attendance: "95"
  });

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="student-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-heading">
          <div><span className="kicker">STUDENT RECORD</span><h2>Add student</h2></div>
          <button onClick={onClose}><X size={19} /></button>
        </div>
        <label>Student name<input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter full name" /></label>
        <div className="form-grid">
          <label>Class<select value={form.className} onChange={(e) => update("className", e.target.value)}><option>Grade 8</option><option>Grade 9</option><option>Grade 10</option></select></label>
          <label>Section<select value={form.section} onChange={(e) => update("section", e.target.value)}><option>A</option><option>B</option><option>C</option></select></label>
          <label>Average<input type="number" value={form.average} onChange={(e) => update("average", e.target.value)} /></label>
          <label>Attendance<input type="number" value={form.attendance} onChange={(e) => update("attendance", e.target.value)} /></label>
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="dark-button" disabled={!form.name.trim()} onClick={() => onSave(form)}>Create student <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");

  if (view === "home") {
    return <PublicHome onDashboard={() => setView("access")} />;
  }

  if (view === "access") {
    return <AccessScreen onContinue={() => setView("dashboard")} onBack={() => setView("home")} />;
  }

  return <Dashboard onExit={() => setView("home")} />;
}