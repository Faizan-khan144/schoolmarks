import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";

const initialStudents = [
  {
    id: "SM-1001",
    name: "Ayaan Ahmed",
    className: "Class 9",
    section: "A",
    gender: "Male",
    guardian: "Ahmed Khan",
    phone: "+92 300 1234567",
    attendance: 94,
    status: "Active",
  },
  {
    id: "SM-1002",
    name: "Hania Noor",
    className: "Class 9",
    section: "A",
    gender: "Female",
    guardian: "Noman Noor",
    phone: "+92 301 7654321",
    attendance: 97,
    status: "Active",
  },
  {
    id: "SM-1003",
    name: "Rayyan Malik",
    className: "Class 8",
    section: "B",
    gender: "Male",
    guardian: "Usman Malik",
    phone: "+92 302 9876543",
    attendance: 91,
    status: "Active",
  },
  {
    id: "SM-1004",
    name: "Maira Siddiqui",
    className: "Class 8",
    section: "A",
    gender: "Female",
    guardian: "Farhan Siddiqui",
    phone: "+92 303 4567890",
    attendance: 96,
    status: "Active",
  },
  {
    id: "SM-1005",
    name: "Hamza Raza",
    className: "Class 7",
    section: "A",
    gender: "Male",
    guardian: "Raza Ahmed",
    phone: "+92 304 2345678",
    attendance: 88,
    status: "Active",
  },
  {
    id: "SM-1006",
    name: "Areeba Khan",
    className: "Class 9",
    section: "B",
    gender: "Female",
    guardian: "Bilal Khan",
    phone: "+92 305 8765432",
    attendance: 92,
    status: "Active",
  },
];

const navigation = [
  {
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "students", label: "Students", icon: Users },
      { id: "classes", label: "Classes", icon: GraduationCap },
      { id: "subjects", label: "Subjects", icon: BookOpen },
    ],
  },
  {
    title: "Academic",
    items: [
      { id: "exams", label: "Examinations", icon: ClipboardList },
      { id: "marks", label: "Marks", icon: FileText },
      { id: "results", label: "Results", icon: BarChart3 },
      { id: "attendance", label: "Attendance", icon: CalendarDays },
      { id: "performance", label: "Performance", icon: BarChart3 },
    ],
  },
  {
    title: "Management",
    items: [
      { id: "reports", label: "Reports", icon: FileText },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <span>S</span>
      </div>

      <div className="brand-copy">
        <strong>SchoolMarks</strong>
        <span>School management</span>
      </div>
    </div>
  );
}

function Avatar({ name, size = "normal" }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={`avatar avatar-${size}`}>
      {initials}
    </div>
  );
}

function PublicHome({ onOpen }) {
  return (
    <div className="public-site">
      <header className="public-header">
        <Logo />

        <nav>
          <a href="#features">Features</a>
          <a href="#workflow">How it works</a>
          <a href="#about">About</a>
        </nav>

        <button className="outline-button" onClick={onOpen}>
          Open workspace
          <ArrowRight size={16} />
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="eyebrow">
              <span></span>
              A calmer way to manage your school
            </div>

            <h1>
              Everything your school needs,
              <em> beautifully organised.</em>
            </h1>

            <p>
              SchoolMarks brings students, classes, examinations, marks,
              attendance and reports together in one simple workspace.
            </p>

            <div className="hero-actions">
              <button className="primary-button" onClick={onOpen}>
                Explore workspace
                <ArrowRight size={17} />
              </button>

              <a className="text-button" href="#features">
                See what it does
              </a>
            </div>

            <div className="hero-note">
              <ShieldCheck size={17} />
              Designed for simple, organised school administration
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-decoration decoration-one"></div>
            <div className="visual-decoration decoration-two"></div>

            <div className="mini-window">
              <div className="mini-window-top">
                <div>
                  <span className="mini-label">School overview</span>
                  <strong>Academic pulse</strong>
                </div>

                <div className="mini-avatar">SM</div>
              </div>

              <div className="mini-stats">
                <div>
                  <span>Students</span>
                  <strong>1,248</strong>
                  <small>+8.4%</small>
                </div>

                <div>
                  <span>Attendance</span>
                  <strong>94.2%</strong>
                  <small>Healthy</small>
                </div>
              </div>

              <div className="mini-chart">
                <div className="chart-heading">
                  <span>Academic performance</span>
                  <span>2026</span>
                </div>

                <div className="bars">
                  <i style={{ height: "42%" }}></i>
                  <i style={{ height: "58%" }}></i>
                  <i style={{ height: "49%" }}></i>
                  <i style={{ height: "72%" }}></i>
                  <i style={{ height: "64%" }}></i>
                  <i style={{ height: "84%" }}></i>
                  <i style={{ height: "77%" }}></i>
                  <i style={{ height: "92%" }}></i>
                </div>
              </div>

              <div className="mini-row">
                <div>
                  <span className="mini-dot green"></span>
                  Attendance
                </div>
                <strong>94%</strong>
              </div>

              <div className="mini-row">
                <div>
                  <span className="mini-dot amber"></span>
                  Pending assessments
                </div>
                <strong>06</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <span>Built around the everyday work of schools</span>
          <div>
            <strong>Students</strong>
            <strong>Academics</strong>
            <strong>Attendance</strong>
            <strong>Results</strong>
            <strong>Reports</strong>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="section-kicker">THE PLATFORM</span>
            <h2>Less administration. More clarity.</h2>
            <p>
              Keep the important parts of your school connected without making
              the system complicated.
            </p>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon={Users}
              number="01"
              title="Student management"
              text="Maintain student records, class assignments, guardians and attendance in one place."
            />

            <FeatureCard
              icon={ClipboardList}
              number="02"
              title="Academic management"
              text="Organise subjects, examinations, marks and results with a consistent workflow."
            />

            <FeatureCard
              icon={BarChart3}
              number="03"
              title="Performance insights"
              text="Understand attendance and academic performance through clean, readable summaries."
            />

            <FeatureCard
              icon={FileText}
              number="04"
              title="Reports"
              text="Turn your school data into useful reports whenever you need them."
            />
          </div>
        </section>

        <section className="workflow-section" id="workflow">
          <div className="workflow-copy">
            <span className="section-kicker">HOW IT WORKS</span>
            <h2>A workspace that grows with your school.</h2>
            <p>
              Start with your students. Add classes, subjects and assessments.
              SchoolMarks keeps the information connected as your school grows.
            </p>
          </div>

          <div className="workflow-list">
            <WorkflowStep
              number="01"
              title="Set up your school"
              text="Add classes, subjects and your basic school information."
            />

            <WorkflowStep
              number="02"
              title="Manage daily work"
              text="Record students, attendance, examinations and marks."
            />

            <WorkflowStep
              number="03"
              title="Understand the results"
              text="Review performance, rankings and reports from one place."
            />
          </div>
        </section>

        <section className="cta-section" id="about">
          <div>
            <span className="section-kicker">SCHOOLMARKS</span>
            <h2>Make school management feel simpler.</h2>
            <p>
              A focused workspace for the information your school works with
              every day.
            </p>
          </div>

          <button className="primary-button light-button" onClick={onOpen}>
            Open SchoolMarks
            <ArrowRight size={17} />
          </button>
        </section>
      </main>

      <footer className="public-footer">
        <Logo />
        <span>© 2026 SchoolMarks. Built for modern school management.</span>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, number, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-top">
        <div className="feature-icon">
          <Icon size={21} strokeWidth={1.7} />
        </div>
        <span>{number}</span>
      </div>

      <h3>{title}</h3>
      <p>{text}</p>

      <div className="feature-arrow">
        <ArrowUpRight size={17} />
      </div>
    </div>
  );
}

function WorkflowStep({ number, title, text }) {
  return (
    <div className="workflow-step">
      <span>{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <ArrowRight size={18} />
    </div>
  );
}

function AccessScreen({ onContinue, onBack }) {
  return (
    <div className="access-screen">
      <div className="access-card">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to website
        </button>

        <div className="access-logo">
          <Logo />
        </div>

        <div className="access-icon">
          <LayoutDashboard size={25} strokeWidth={1.7} />
        </div>

        <span className="section-kicker">WORKSPACE ACCESS</span>

        <h1>Welcome to your school workspace.</h1>

        <p>
          This demo workspace doesn't require an email or password. Continue
          to explore the SchoolMarks management system.
        </p>

        <button className="primary-button access-button" onClick={onContinue}>
          Continue to dashboard
          <ArrowRight size={17} />
        </button>

        <div className="access-safe">
          <ShieldCheck size={16} />
          Demo access · No credentials required
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activePage, setActivePage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <Logo />

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <div className="sidebar-scroll">
          {navigation.map((group) => (
            <div className="nav-group" key={group.title}>
              <span className="nav-title">{group.title}</span>

              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    className={`nav-item ${active ? "active" : ""}`}
                    onClick={() => {
                      setActivePage(item.id);
                      setMobileOpen(false);
                    }}
                  >
                    <Icon size={18} strokeWidth={active ? 2 : 1.7} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="school-mini-card">
            <div className="school-mini-icon">
              <GraduationCap size={18} />
            </div>

            <div>
              <strong>Greenfield School</strong>
              <span>Academic year 2026</span>
            </div>
          </div>

          <button
            className={`nav-item ${
              activePage === "settings" ? "active" : ""
            }`}
            onClick={() => {
              setActivePage("settings");
              setMobileOpen(false);
            }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu, activePage, students }) {
  const pageName =
    navigation
      .flatMap((group) => group.items)
      .find((item) => item.id === activePage)?.label || "Overview";

  return (
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu}>
          <Menu size={20} />
        </button>

        <div>
          <span className="breadcrumb">SchoolMarks /</span>
          <strong>{pageName}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="top-search">
          <Search size={17} />
          <input placeholder="Search..." />
          <kbd>⌘ K</kbd>
        </div>

        <button className="notification-button">
          <Bell size={18} />
          <span></span>
        </button>

        <div className="top-user">
          <Avatar name="School Admin" />
          <div>
            <strong>School Admin</strong>
            <span>{students.length} students</span>
          </div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, detail, icon: Icon, tone }) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-card-top">
        <span>{label}</span>
        <div className="stat-icon">
          <Icon size={18} strokeWidth={1.7} />
        </div>
      </div>

      <strong>{value}</strong>
      <p>{detail}</p>
    </div>
  );
}

function Overview({ students, setActivePage }) {
  const averageAttendance =
    students.length > 0
      ? Math.round(
          students.reduce((sum, student) => sum + student.attendance, 0) /
            students.length
        )
      : 0;

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <span className="section-kicker">OVERVIEW</span>
          <h1>School at a glance.</h1>
          <p>
            A clear view of what is happening across your school today.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setActivePage("students")}
        >
          <Plus size={17} />
          Add student
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total students"
          value={students.length}
          detail="Currently registered"
          icon={Users}
          tone="sage"
        />

        <StatCard
          label="Average attendance"
          value={`${averageAttendance}%`}
          detail="Across all students"
          icon={CalendarDays}
          tone="cream"
        />

        <StatCard
          label="Active classes"
          value="18"
          detail="Across all sections"
          icon={GraduationCap}
          tone="blue"
        />

        <StatCard
          label="Upcoming exams"
          value="06"
          detail="Next 30 days"
          icon={ClipboardList}
          tone="rose"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel performance-panel">
          <div className="panel-heading">
            <div>
              <span>ACADEMIC SNAPSHOT</span>
              <h2>Performance overview</h2>
            </div>

            <button className="small-select">
              2026
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="large-chart">
            <div className="chart-y">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="chart-main">
              <div className="chart-lines">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>

              <svg
                className="chart-line"
                viewBox="0 0 700 220"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 175 C70 160 85 150 135 160 C190 171 200 128 260 135 C320 142 350 96 405 111 C455 125 490 76 540 88 C590 100 620 52 700 62"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M0 175 C70 160 85 150 135 160 C190 171 200 128 260 135 C320 142 350 96 405 111 C455 125 490 76 540 88 C590 100 620 52 700 62 L700 220 L0 220 Z"
                  fill="currentColor"
                  opacity=".08"
                />
              </svg>

              <div className="chart-labels">
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
        </section>

        <section className="panel attendance-panel">
          <div className="panel-heading">
            <div>
              <span>ATTENDANCE</span>
              <h2>Today</h2>
            </div>

            <CalendarDays size={18} />
          </div>

          <div className="attendance-ring">
            <div>
              <strong>{averageAttendance}%</strong>
              <span>Present</span>
            </div>
          </div>

          <div className="attendance-list">
            <div>
              <span>
                <i className="dot present"></i>
                Present
              </span>
              <strong>{Math.round(students.length * 0.91)}</strong>
            </div>

            <div>
              <span>
                <i className="dot absent"></i>
                Absent
              </span>
              <strong>{Math.max(0, students.length - Math.round(students.length * 0.91))}</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="dashboard-grid bottom-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span>UPCOMING</span>
              <h2>Examinations</h2>
            </div>

            <button
              className="link-button"
              onClick={() => setActivePage("exams")}
            >
              View all
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="exam-list">
            <ExamRow date="18" month="SEP" title="Mathematics" className="Class 9" />
            <ExamRow date="22" month="SEP" title="English Language" className="Class 8" />
            <ExamRow date="26" month="SEP" title="Physics" className="Class 9" />
            <ExamRow date="30" month="SEP" title="Computer Science" className="Class 7" />
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <span>RECENT ACTIVITY</span>
              <h2>Latest updates</h2>
            </div>
          </div>

          <div className="activity-list">
            <ActivityRow
              name="Areeba Khan"
              text="Student record updated"
              time="12 min ago"
            />

            <ActivityRow
              name="Hamza Raza"
              text="Attendance marked"
              time="28 min ago"
            />

            <ActivityRow
              name="Maira Siddiqui"
              text="Result published"
              time="1 hr ago"
            />

            <ActivityRow
              name="Rayyan Malik"
              text="Class changed to 8-B"
              time="2 hrs ago"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ExamRow({ date, month, title, className }) {
  return (
    <div className="exam-row">
      <div className="exam-date">
        <strong>{date}</strong>
        <span>{month}</span>
      </div>

      <div>
        <strong>{title}</strong>
        <span>{className}</span>
      </div>

      <ArrowRight size={16} />
    </div>
  );
}

function ActivityRow({ name, text, time }) {
  return (
    <div className="activity-row">
      <Avatar name={name} />

      <div>
        <strong>{name}</strong>
        <span>{text}</span>
      </div>

      <small>{time}</small>
    </div>
  );
}

function Students({ students, setStudents }) {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const classes = ["All classes", ...new Set(students.map((s) => s.className))];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.id.toLowerCase().includes(search.toLowerCase()) ||
        student.guardian.toLowerCase().includes(search.toLowerCase());

      const matchesClass =
        classFilter === "All classes" || student.className === classFilter;

      return matchesSearch && matchesClass;
    });
  }, [students, search, classFilter]);

  function openAdd() {
    setEditingStudent(null);
    setModalOpen(true);
  }

  function openEdit(student) {
    setEditingStudent(student);
    setModalOpen(true);
  }

  function removeStudent(id) {
    const student = students.find((item) => item.id === id);

    if (!student) return;

    const confirmed = window.confirm(
      `Delete ${student.name} from the student list?`
    );

    if (!confirmed) return;

    setStudents((current) => current.filter((item) => item.id !== id));
  }

  function saveStudent(data) {
    if (editingStudent) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingStudent.id
            ? { ...student, ...data }
            : student
        )
      );
    } else {
      const newStudent = {
        ...data,
        id: `SM-${1000 + students.length + 1}`,
        status: "Active",
      };

      setStudents((current) => [newStudent, ...current]);
    }

    setModalOpen(false);
  }

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <span className="section-kicker">STUDENT DIRECTORY</span>
          <h1>Students</h1>
          <p>
            Manage student records, classes, guardians and attendance from one
            place.
          </p>
        </div>

        <button className="primary-button" onClick={openAdd}>
          <Plus size={17} />
          Add student
        </button>
      </div>

      <div className="student-summary">
        <div>
          <strong>{students.length}</strong>
          <span>Total students</span>
        </div>

        <div>
          <strong>
            {students.filter((student) => student.status === "Active").length}
          </strong>
          <span>Active</span>
        </div>

        <div>
          <strong>{classes.length - 1}</strong>
          <span>Classes</span>
        </div>

        <div>
          <strong>
            {students.length
              ? Math.round(
                  students.reduce(
                    (total, student) => total + student.attendance,
                    0
                  ) / students.length
                )
              : 0}
            %
          </strong>
          <span>Average attendance</span>
        </div>
      </div>

      <section className="students-panel">
        <div className="students-toolbar">
          <div className="student-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search students, ID or guardian..."
            />
          </div>

          <div className="filter-wrap">
            <select
              value={classFilter}
              onChange={(event) => setClassFilter(event.target.value)}
            >
              {classes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={15} />
          </div>
        </div>

        <div className="student-table-wrap">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>ID</th>
                <th>Class</th>
                <th>Guardian</th>
                <th>Attendance</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="table-student">
                      <Avatar name={student.name} />
                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.gender}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="student-id">{student.id}</span>
                  </td>

                  <td>
                    <div className="class-cell">
                      <strong>{student.className}</strong>
                      <span>Section {student.section}</span>
                    </div>
                  </td>

                  <td>
                    <div className="guardian-cell">
                      <strong>{student.guardian}</strong>
                      <span>{student.phone}</span>
                    </div>
                  </td>

                  <td>
                    <div className="attendance-cell">
                      <div className="attendance-progress">
                        <span
                          style={{
                            width: `${student.attendance}%`,
                          }}
                        ></span>
                      </div>
                      <strong>{student.attendance}%</strong>
                    </div>
                  </td>

                  <td>
                    <span className="status-badge">
                      <i></i>
                      {student.status}
                    </span>
                  </td>

                  <td>
                    <div className="row-actions">
                      <button
                        title="Edit student"
                        onClick={() => openEdit(student)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        title="Delete student"
                        className="danger"
                        onClick={() => removeStudent(student.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="empty-students">
              <div>
                <Search size={22} />
              </div>
              <h3>No students found</h3>
              <p>Try another search or add a new student.</p>
            </div>
          )}
        </div>

        <div className="table-footer">
          <span>
            Showing <strong>{filteredStudents.length}</strong> of{" "}
            <strong>{students.length}</strong> students
          </span>

          <div className="pagination">
            <button disabled>
              <ArrowLeft size={15} />
            </button>
            <span>1</span>
            <button disabled>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {modalOpen && (
        <StudentModal
          student={editingStudent}
          onClose={() => setModalOpen(false)}
          onSave={saveStudent}
        />
      )}
    </div>
  );
}

function StudentModal({ student, onClose, onSave }) {
  const [form, setForm] = useState({
    name: student?.name || "",
    className: student?.className || "Class 9",
    section: student?.section || "A",
    gender: student?.gender || "Male",
    guardian: student?.guardian || "",
    phone: student?.phone || "",
    attendance: student?.attendance || 100,
  });

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function submit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.guardian.trim()) {
      return;
    }

    onSave({
      ...form,
      attendance: Number(form.attendance),
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="student-modal">
        <div className="modal-header">
          <div>
            <span className="section-kicker">
              {student ? "EDIT RECORD" : "NEW RECORD"}
            </span>
            <h2>{student ? "Edit student" : "Add student"}</h2>
            <p>Enter the student's basic information below.</p>
          </div>

          <button onClick={onClose}>
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="form-grid">
            <label className="full">
              Student name
              <input
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="e.g. Muhammad Ali"
                required
              />
            </label>

            <label>
              Class
              <select
                value={form.className}
                onChange={(event) =>
                  update("className", event.target.value)
                }
              >
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </select>
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

            <label>
              Gender
              <select
                value={form.gender}
                onChange={(event) => update("gender", event.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>

            <label>
              Attendance
              <input
                type="number"
                min="0"
                max="100"
                value={form.attendance}
                onChange={(event) =>
                  update("attendance", event.target.value)
                }
              />
            </label>

            <label className="full">
              Guardian name
              <input
                value={form.guardian}
                onChange={(event) => update("guardian", event.target.value)}
                placeholder="Parent or guardian name"
                required
              />
            </label>

            <label className="full">
              Guardian phone
              <input
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                placeholder="+92 300 0000000"
              />
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primary-button">
              <Check size={16} />
              {student ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GenericPage({ page }) {
  const info = {
    classes: {
      kicker: "ACADEMIC STRUCTURE",
      title: "Classes",
      text: "Organise classes, sections and student groups.",
      icon: GraduationCap,
      items: ["Class 10 — 3 sections", "Class 9 — 4 sections", "Class 8 — 4 sections"],
    },
    subjects: {
      kicker: "ACADEMIC STRUCTURE",
      title: "Subjects",
      text: "Manage subjects used across your academic programme.",
      icon: BookOpen,
      items: ["Mathematics", "English Language", "Physics", "Computer Science"],
    },
    exams: {
      kicker: "ASSESSMENTS",
      title: "Examinations",
      text: "Plan upcoming assessments and keep examination schedules organised.",
      icon: ClipboardList,
      items: ["Mid Term Examination", "Monthly Assessment", "Final Examination"],
    },
    marks: {
      kicker: "ASSESSMENTS",
      title: "Marks",
      text: "Enter and review student marks by examination and subject.",
      icon: FileText,
      items: ["Mathematics — Class 9", "English — Class 8", "Physics — Class 9"],
    },
    results: {
      kicker: "ACADEMIC RESULTS",
      title: "Results",
      text: "Review grades, percentages and academic outcomes.",
      icon: BarChart3,
      items: ["Class 9 results", "Class 8 results", "Monthly assessment results"],
    },
    attendance: {
      kicker: "DAILY MANAGEMENT",
      title: "Attendance",
      text: "Record and monitor student attendance.",
      icon: CalendarDays,
      items: ["Today's attendance", "Monthly attendance", "Attendance summary"],
    },
    performance: {
      kicker: "INSIGHTS",
      title: "Performance",
      text: "Understand academic progress across students and classes.",
      icon: BarChart3,
      items: ["Top performers", "Subject performance", "Class comparison"],
    },
    reports: {
      kicker: "REPORTING",
      title: "Reports",
      text: "Generate useful summaries from your school data.",
      icon: FileText,
      items: ["Student report", "Class report", "Academic report"],
    },
    settings: {
      kicker: "SYSTEM",
      title: "Settings",
      text: "Configure your school workspace and preferences.",
      icon: Settings,
      items: ["School information", "Workspace preferences", "Data management"],
    },
  };

  const current = info[page] || info.classes;
  const Icon = current.icon;

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <span className="section-kicker">{current.kicker}</span>
          <h1>{current.title}</h1>
          <p>{current.text}</p>
        </div>

        <button className="primary-button">
          <Plus size={17} />
          Add new
        </button>
      </div>

      <div className="coming-layout">
        <section className="coming-main">
          <div className="coming-icon">
            <Icon size={25} strokeWidth={1.6} />
          </div>

          <span className="section-kicker">MODULE</span>
          <h2>{current.title} workspace</h2>
          <p>
            This section is ready for the next management module. The same
            SchoolMarks design system will be used throughout the platform.
          </p>

          <div className="coming-list">
            {current.items.map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
                <ArrowRight size={16} />
              </div>
            ))}
          </div>
        </section>

        <aside className="coming-side">
          <div className="side-number">0{current.items.length}</div>
          <span>WORKSPACE MODULE</span>
          <h3>Clean. Connected. Simple.</h3>
          <p>
            Your data will eventually flow between this module and the rest of
            the SchoolMarks system.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Dashboard({
  activePage,
  setActivePage,
  students,
  setStudents,
  onBack,
}) {
  return (
    <div className="dashboard-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={false}
        setMobileOpen={() => {}}
      />

      <DashboardContent
        activePage={activePage}
        setActivePage={setActivePage}
        students={students}
        setStudents={setStudents}
        onBack={onBack}
      />
    </div>
  );
}

function DashboardContent({
  activePage,
  setActivePage,
  students,
  setStudents,
  onBack,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="dashboard-main">
        <Topbar
          onMenu={() => setMobileOpen(true)}
          activePage={activePage}
          students={students}
        />

        {activePage === "overview" && (
          <Overview
            students={students}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "students" && (
          <Students students={students} setStudents={setStudents} />
        )}

        {!["overview", "students"].includes(activePage) && (
          <GenericPage page={activePage} />
        )}

        <button className="back-site-button" onClick={onBack}>
          <ArrowLeft size={15} />
          Website
        </button>
      </div>
    </>
  );
}

function App() {
  const [screen, setScreen] = useState("website");
  const [activePage, setActivePage] = useState("overview");

  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("schoolmarks-students");

      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  useEffect(() => {
    localStorage.setItem("schoolmarks-students", JSON.stringify(students));
  }, [students]);

  function openWorkspace() {
    setScreen("access");
  }

  function enterDashboard() {
    setScreen("dashboard");
  }

  function goWebsite() {
    setScreen("website");
    setActivePage("overview");
  }

  if (screen === "website") {
    return <PublicHome onOpen={openWorkspace} />;
  }

  if (screen === "access") {
    return (
      <AccessScreen
        onContinue={enterDashboard}
        onBack={() => setScreen("website")}
      />
    );
  }

  return (
    <DashboardContent
      activePage={activePage}
      setActivePage={setActivePage}
      students={students}
      setStudents={setStudents}
      onBack={goWebsite}
    />
  );
}

export default App;