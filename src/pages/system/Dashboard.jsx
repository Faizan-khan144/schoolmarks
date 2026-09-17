import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Download,
  GraduationCap,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import "./dashboard.css";

const STORAGE_KEY = "schoolmarks-platform-v1";

const seedData = {
  students: [
    {
      id: "ST001",
      name: "Ayaan Ahmed",
      rollNo: "01",
      grade: "9",
      section: "A",
      gender: "Male",
      parent: "Ahmed Khan",
      phone: "03001234567",
      attendance: 96,
      status: "Active",
    },
    {
      id: "ST002",
      name: "Hania Khan",
      rollNo: "02",
      grade: "9",
      section: "A",
      gender: "Female",
      parent: "Usman Khan",
      phone: "03111234567",
      attendance: 94,
      status: "Active",
    },
    {
      id: "ST003",
      name: "Ahmed Raza",
      rollNo: "03",
      grade: "9",
      section: "A",
      gender: "Male",
      parent: "Raza Ahmed",
      phone: "03221234567",
      attendance: 87,
      status: "Active",
    },
    {
      id: "ST004",
      name: "Areeba Noor",
      rollNo: "04",
      grade: "9",
      section: "A",
      gender: "Female",
      parent: "Noor Ahmed",
      phone: "03331234567",
      attendance: 91,
      status: "Active",
    },
    {
      id: "ST005",
      name: "Hamza Ali",
      rollNo: "05",
      grade: "10",
      section: "A",
      gender: "Male",
      parent: "Ali Hassan",
      phone: "03441234567",
      attendance: 72,
      status: "Active",
    },
    {
      id: "ST006",
      name: "Maham Fatima",
      rollNo: "06",
      grade: "10",
      section: "A",
      gender: "Female",
      parent: "Farhan Ahmed",
      phone: "03551234567",
      attendance: 89,
      status: "Active",
    },
    {
      id: "ST007",
      name: "Saad Hassan",
      rollNo: "07",
      grade: "8",
      section: "B",
      gender: "Male",
      parent: "Hassan Ali",
      phone: "03661234567",
      attendance: 78,
      status: "Active",
    },
    {
      id: "ST008",
      name: "Eman Zahra",
      rollNo: "08",
      grade: "8",
      section: "B",
      gender: "Female",
      parent: "Zahra Ahmed",
      phone: "03771234567",
      attendance: 97,
      status: "Active",
    },
  ],
  classes: [
    { id: "CL001", grade: "8", section: "A", teacher: "Muhammad Usman", room: "101" },
    { id: "CL002", grade: "8", section: "B", teacher: "Sana Ahmed", room: "102" },
    { id: "CL003", grade: "9", section: "A", teacher: "Ali Hassan", room: "201" },
    { id: "CL004", grade: "9", section: "B", teacher: "Ayesha Khan", room: "202" },
    { id: "CL005", grade: "10", section: "A", teacher: "Faisal Ahmed", room: "301" },
    { id: "CL006", grade: "10", section: "B", teacher: "Maryam Raza", room: "302" },
  ],
  subjects: [
    { id: "SUB001", name: "Mathematics", code: "MATH", total: 100, passing: 40 },
    { id: "SUB002", name: "English", code: "ENG", total: 100, passing: 40 },
    { id: "SUB003", name: "Computer Science", code: "CS", total: 100, passing: 40 },
    { id: "SUB004", name: "Physics", code: "PHY", total: 100, passing: 40 },
    { id: "SUB005", name: "Chemistry", code: "CHEM", total: 100, passing: 40 },
    { id: "SUB006", name: "Urdu", code: "URD", total: 100, passing: 40 },
  ],
  exams: [
    {
      id: "EX001",
      name: "Mid Term Examination",
      grade: "9",
      date: "2026-09-24",
      status: "Upcoming",
    },
    {
      id: "EX002",
      name: "Mathematics Assessment",
      grade: "10",
      date: "2026-09-27",
      status: "Upcoming",
    },
    {
      id: "EX003",
      name: "Science Examination",
      grade: "8",
      date: "2026-09-30",
      status: "Upcoming",
    },
  ],
  marks: [
    { studentId: "ST001", subject: "Mathematics", exam: "Mid Term Examination", marks: 91 },
    { studentId: "ST001", subject: "English", exam: "Mid Term Examination", marks: 86 },
    { studentId: "ST001", subject: "Computer Science", exam: "Mid Term Examination", marks: 95 },
    { studentId: "ST002", subject: "Mathematics", exam: "Mid Term Examination", marks: 94 },
    { studentId: "ST002", subject: "English", exam: "Mid Term Examination", marks: 91 },
    { studentId: "ST002", subject: "Computer Science", exam: "Mid Term Examination", marks: 96 },
    { studentId: "ST003", subject: "Mathematics", exam: "Mid Term Examination", marks: 76 },
    { studentId: "ST003", subject: "English", exam: "Mid Term Examination", marks: 73 },
    { studentId: "ST003", subject: "Computer Science", exam: "Mid Term Examination", marks: 81 },
    { studentId: "ST004", subject: "Mathematics", exam: "Mid Term Examination", marks: 88 },
    { studentId: "ST004", subject: "English", exam: "Mid Term Examination", marks: 90 },
    { studentId: "ST004", subject: "Computer Science", exam: "Mid Term Examination", marks: 87 },
    { studentId: "ST005", subject: "Mathematics", exam: "Mid Term Examination", marks: 62 },
    { studentId: "ST005", subject: "English", exam: "Mid Term Examination", marks: 68 },
  ],
  attendance: [],
  notices: [
    {
      id: "N001",
      title: "Mid Term Examination Schedule",
      audience: "Grade 9",
      date: "2026-09-18",
      priority: "High",
      message: "The Mid Term Examination schedule has been published.",
    },
    {
      id: "N002",
      title: "Parent Teacher Meeting",
      audience: "All Parents",
      date: "2026-09-20",
      priority: "Normal",
      message: "Parent teacher meeting will be held this weekend.",
    },
  ],
  settings: {
    schoolName: "SchoolMarks Academy",
    academicYear: "2026–27",
  },
};

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : seedData;
  } catch {
    return seedData;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

function getStudentPercentage(studentId, marks) {
  const rows = marks.filter((item) => item.studentId === studentId);

  if (!rows.length) return 0;

  const total = rows.reduce((sum, item) => sum + Number(item.marks || 0), 0);

  return Math.round((total / (rows.length * 100)) * 100);
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function StatCard({ icon: Icon, label, value, change, positive = true, note }) {
  return (
    <div className="sm-stat-card">
      <div className="sm-stat-top">
        <div className="sm-stat-icon">
          <Icon size={18} />
        </div>

        {change && (
          <span className={`sm-stat-change ${positive ? "positive" : "negative"}`}>
            {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </span>
        )}
      </div>

      <strong>{value}</strong>
      <span className="sm-stat-label">{label}</span>

      {note && <small>{note}</small>}
    </div>
  );
}

function Modal({ title, children, onClose, wide = false }) {
  return (
    <div className="sm-modal-backdrop" onMouseDown={onClose}>
      <div
        className={`sm-modal ${wide ? "wide" : ""}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sm-modal-header">
          <div>
            <span className="sm-modal-eyebrow">SchoolMarks</span>
            <h3>{title}</h3>
          </div>

          <button className="sm-icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="sm-modal-body">{children}</div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon = Search, title, text }) {
  return (
    <div className="sm-empty">
      <div className="sm-empty-icon">
        <Icon size={20} />
      </div>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(loadData);
  const [activePage, setActivePage] = useState("overview");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const updateData = (changes) => {
    setData((current) => ({
      ...current,
      ...changes,
    }));
  };

  const students = data.students;
  const marks = data.marks;

  const performance = useMemo(() => {
    if (!marks.length) return 0;

    const total = marks.reduce((sum, item) => sum + Number(item.marks || 0), 0);

    return Math.round(total / marks.length);
  }, [marks]);

  const attendance = useMemo(() => {
    if (!students.length) return 0;

    return (
      Math.round(
        (students.reduce((sum, student) => sum + Number(student.attendance || 0), 0) /
          students.length) *
          10
      ) / 10
    );
  }, [students]);

  const pendingMarks = Math.max(students.length * 3 - marks.length, 0);

  const lowAttendance = students.filter((student) => student.attendance < 75);

  const rankedStudents = useMemo(() => {
    return [...students]
      .map((student) => ({
        ...student,
        percentage: getStudentPercentage(student.id, marks),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [students, marks]);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  };

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: `ST${Date.now()}`,
      attendance: 100,
      status: "Active",
    };

    updateData({
      students: [...students, newStudent],
    });

    setModal(null);
    showNotice("Student added successfully");
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Delete this student?")) return;

    updateData({
      students: students.filter((student) => student.id !== id),
      marks: marks.filter((mark) => mark.studentId !== id),
    });

    showNotice("Student removed");
  };

  const addExam = (exam) => {
    updateData({
      exams: [
        ...data.exams,
        {
          ...exam,
          id: `EX${Date.now()}`,
          status: "Upcoming",
        },
      ],
    });

    setModal(null);
    showNotice("Exam created successfully");
  };

  const addNotice = (item) => {
    updateData({
      notices: [
        {
          ...item,
          id: `N${Date.now()}`,
        },
        ...data.notices,
      ],
    });

    setModal(null);
    showNotice("Notice published");
  };

  const addClass = (item) => {
    updateData({
      classes: [
        ...data.classes,
        {
          ...item,
          id: `CL${Date.now()}`,
        },
      ],
    });

    setModal(null);
    showNotice("Class created successfully");
  };

  const addSubject = (item) => {
    updateData({
      subjects: [
        ...data.subjects,
        {
          ...item,
          id: `SUB${Date.now()}`,
        },
      ],
    });

    setModal(null);
    showNotice("Subject added successfully");
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "schoolmarks-backup.json";
    anchor.click();

    URL.revokeObjectURL(url);
    showNotice("Backup downloaded");
  };

  const resetData = () => {
    if (!window.confirm("Reset SchoolMarks to demo data?")) return;

    setData(seedData);
    showNotice("Demo data restored");
  };

  const navigation = [
    {
      group: "Workspace",
      items: [
        ["overview", "Overview", LayoutDashboard],
        ["students", "Students", Users],
        ["academics", "Academics", BookOpen],
      ],
    },
    {
      group: "Academic Operations",
      items: [
        ["exams", "Examinations", CalendarDays],
        ["marks", "Marks", ClipboardCheck],
        ["results", "Results", BarChart3],
        ["attendance", "Attendance", UserCheck],
        ["performance", "Performance", TrendingUp],
      ],
    },
    {
      group: "Management",
      items: [
        ["notices", "Notices", Bell],
        ["reports", "Reports", Download],
        ["settings", "Settings", Settings],
      ],
    },
  ];

  const pageTitle = {
    overview: "Overview",
    students: "Students",
    academics: "Academic Management",
    exams: "Examinations",
    marks: "Marks",
    results: "Results",
    attendance: "Attendance",
    performance: "Performance Intelligence",
    notices: "Notices",
    reports: "Reports",
    settings: "Settings",
  };

  return (
    <div className="sm-platform">
      <aside className="sm-sidebar">
        <div className="sm-brand">
          <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" />
          <div>
            <strong>SchoolMarks</strong>
            <span>School intelligence</span>
          </div>
        </div>

        <div className="sm-school-switcher">
          <div className="sm-school-avatar">SM</div>
          <div>
            <strong>{data.settings.schoolName}</strong>
            <span>{data.settings.academicYear}</span>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="sm-navigation">
          {navigation.map((section) => (
            <div className="sm-nav-group" key={section.group}>
              <span className="sm-nav-label">{section.group}</span>

              {section.items.map(([key, label, Icon]) => (
                <button
                  key={key}
                  className={`sm-nav-item ${activePage === key ? "active" : ""}`}
                  onClick={() => {
                    setActivePage(key);
                    setSearch("");
                  }}
                >
                  <Icon size={17} />
                  <span>{label}</span>

                  {key === "marks" && pendingMarks > 0 && (
                    <b>{pendingMarks}</b>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sm-sidebar-bottom">
          <div className="sm-system-status">
            <span className="sm-status-dot" />
            <div>
              <strong>System operational</strong>
              <span>Local data active</span>
            </div>
          </div>

          <button
            className="sm-sidebar-settings"
            onClick={() => setActivePage("settings")}
          >
            <Settings size={17} />
            Settings
          </button>
        </div>
      </aside>

      <main className="sm-main">
        <header className="sm-topbar">
          <div className="sm-breadcrumb">
            <span>SchoolMarks</span>
            <span>/</span>
            <strong>{pageTitle[activePage]}</strong>
          </div>

          <div className="sm-topbar-actions">
            <div className="sm-global-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students..."
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              className="sm-top-icon"
              onClick={() => setActivePage("notices")}
            >
              <Bell size={18} />
              <i />
            </button>

            <div className="sm-user">
              <div className="sm-user-avatar">FK</div>
              <div>
                <strong>School Admin</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <div className="sm-content">
          {activePage === "overview" && (
            <OverviewPage
              data={data}
              students={students}
              performance={performance}
              attendance={attendance}
              lowAttendance={lowAttendance}
              pendingMarks={pendingMarks}
              rankedStudents={rankedStudents}
              setActivePage={setActivePage}
              setSelectedStudent={setSelectedStudent}
              setModal={setModal}
            />
          )}

          {activePage === "students" && (
            <StudentsPage
              students={students}
              marks={marks}
              search={search}
              setModal={setModal}
              setSelectedStudent={setSelectedStudent}
              deleteStudent={deleteStudent}
            />
          )}

          {activePage === "academics" && (
            <AcademicsPage
              data={data}
              setModal={setModal}
              updateData={updateData}
              showNotice={showNotice}
            />
          )}

          {activePage === "exams" && (
            <ExamsPage
              exams={data.exams}
              search={search}
              setModal={setModal}
            />
          )}

          {activePage === "marks" && (
            <MarksPage
              data={data}
              updateData={updateData}
              search={search}
              showNotice={showNotice}
            />
          )}

          {activePage === "results" && (
            <ResultsPage
              students={students}
              marks={marks}
              rankedStudents={rankedStudents}
            />
          )}

          {activePage === "attendance" && (
            <AttendancePage
              students={students}
              updateData={updateData}
              showNotice={showNotice}
            />
          )}

          {activePage === "performance" && (
            <PerformancePage
              students={students}
              marks={marks}
              performance={performance}
              attendance={attendance}
            />
          )}

          {activePage === "notices" && (
            <NoticesPage
              notices={data.notices}
              setModal={setModal}
              updateData={updateData}
              showNotice={showNotice}
            />
          )}

          {activePage === "reports" && (
            <ReportsPage
              data={data}
              rankedStudents={rankedStudents}
              exportData={exportData}
            />
          )}

          {activePage === "settings" && (
            <SettingsPage
              data={data}
              updateData={updateData}
              exportData={exportData}
              resetData={resetData}
              showNotice={showNotice}
            />
          )}
        </div>
      </main>

      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          marks={marks}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {modal === "student" && (
        <StudentForm onClose={() => setModal(null)} onSave={addStudent} />
      )}

      {modal === "exam" && (
        <ExamForm onClose={() => setModal(null)} onSave={addExam} />
      )}

      {modal === "class" && (
        <ClassForm onClose={() => setModal(null)} onSave={addClass} />
      )}

      {modal === "subject" && (
        <SubjectForm onClose={() => setModal(null)} onSave={addSubject} />
      )}

      {modal === "notice" && (
        <NoticeForm onClose={() => setModal(null)} onSave={addNotice} />
      )}

      {notice && (
        <div className="sm-toast">
          <CheckCircle2 size={18} />
          <span>{notice}</span>
        </div>
      )}
    </div>
  );
}

function PageHeader({ eyebrow, title, description, action, children }) {
  return (
    <div className="sm-page-header">
      <div>
        {eyebrow && <span className="sm-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="sm-page-actions">
        {children}
        {action}
      </div>
    </div>
  );
}

function OverviewPage({
  data,
  students,
  performance,
  attendance,
  lowAttendance,
  pendingMarks,
  rankedStudents,
  setActivePage,
  setSelectedStudent,
  setModal,
}) {
  const bars = [68, 72, 70, 77, 74, 82, 79, 85, 83, 89, 87, performance];

  return (
    <>
      <PageHeader
        eyebrow="School intelligence"
        title="Good evening, School Admin"
        description="Here's what's happening across your school."
        action={
          <button className="sm-primary-button" onClick={() => setModal("student")}>
            <Plus size={17} />
            Add student
          </button>
        }
      />

      <div className="sm-stat-grid">
        <StatCard
          icon={Users}
          label="Total Students"
          value={students.length.toLocaleString()}
          change="+8.2%"
          note="vs previous month"
        />

        <StatCard
          icon={GraduationCap}
          label="Active Classes"
          value={data.classes.length}
          change="+2"
          note="this academic year"
        />

        <StatCard
          icon={UserCheck}
          label="Attendance"
          value={`${attendance}%`}
          change="+2.4%"
          note="school average"
        />

        <StatCard
          icon={ClipboardCheck}
          label="Pending Marks"
          value={pendingMarks}
          change={pendingMarks ? `${pendingMarks}` : "0"}
          positive={!pendingMarks}
          note="entries remaining"
        />
      </div>

      <div className="sm-dashboard-grid">
        <section className="sm-panel sm-performance-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Academic analytics</span>
              <h2>Performance trend</h2>
            </div>

            <span className="sm-panel-filter">Last 12 months</span>
          </div>

          <div className="sm-chart-summary">
            <strong>{performance}%</strong>
            <span>
              <ArrowUpRight size={14} />
              Current average
            </span>
          </div>

          <div className="sm-line-chart">
            <div className="sm-chart-grid">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="sm-chart-bars">
              {bars.map((value, index) => (
                <div className="sm-chart-column" key={index}>
                  <div
                    className="sm-chart-bar"
                    style={{ height: `${Math.max(value - 45, 8) * 2.2}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="sm-chart-labels">
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </section>

        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Attendance health</span>
              <h2>School attendance</h2>
            </div>

            <UserCheck size={18} />
          </div>

          <div className="sm-attendance-circle">
            <svg viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="64" className="sm-circle-bg" />
              <circle
                cx="80"
                cy="80"
                r="64"
                className="sm-circle-value"
                strokeDasharray={`${attendance * 4.02} 402`}
              />
            </svg>

            <div>
              <strong>{attendance}%</strong>
              <span>Present</span>
            </div>
          </div>

          <div className="sm-attendance-legend">
            <span>
              <i className="present" />
              Present
              <b>{Math.round(attendance)}%</b>
            </span>

            <span>
              <i className="absent" />
              Attention
              <b>{100 - Math.round(attendance)}%</b>
            </span>
          </div>

          <button
            className="sm-text-button"
            onClick={() => setActivePage("attendance")}
          >
            View attendance analytics
            <ArrowUpRight size={15} />
          </button>
        </section>
      </div>

      <div className="sm-dashboard-grid lower">
        <section className="sm-panel sm-alert-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Intelligence</span>
              <h2>Smart alerts</h2>
            </div>

            <ShieldAlert size={18} />
          </div>

          <div className="sm-alert-list">
            <button onClick={() => setActivePage("attendance")}>
              <div className="sm-alert-icon danger">
                <AlertTriangle size={17} />
              </div>
              <div>
                <strong>{lowAttendance.length} students</strong>
                <span>Attendance is below 75%</span>
              </div>
              <ChevronDown size={16} />
            </button>

            <button onClick={() => setActivePage("marks")}>
              <div className="sm-alert-icon warning">
                <ClipboardCheck size={17} />
              </div>
              <div>
                <strong>{pendingMarks} entries</strong>
                <span>Marks still need to be completed</span>
              </div>
              <ChevronDown size={16} />
            </button>

            <button onClick={() => setActivePage("performance")}>
              <div className="sm-alert-icon success">
                <TrendingUp size={17} />
              </div>
              <div>
                <strong>Academic average</strong>
                <span>Currently at {performance}% across recorded marks</span>
              </div>
              <ChevronDown size={16} />
            </button>
          </div>
        </section>

        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Students</span>
              <h2>Top performers</h2>
            </div>

            <button
              className="sm-panel-link"
              onClick={() => setActivePage("results")}
            >
              View all
            </button>
          </div>

          <div className="sm-ranking-list">
            {rankedStudents.slice(0, 5).map((student, index) => (
              <button
                className="sm-ranking-row"
                key={student.id}
                onClick={() => setSelectedStudent(student)}
              >
                <span className="sm-rank-number">{index + 1}</span>
                <div className="sm-avatar">
                  {initials(student.name)}
                </div>
                <div className="sm-ranking-info">
                  <strong>{student.name}</strong>
                  <span>
                    Grade {student.grade} · Section {student.section}
                  </span>
                </div>
                <b>{student.percentage}%</b>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="sm-dashboard-grid lower">
        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Students</span>
              <h2>Recent students</h2>
            </div>

            <button
              className="sm-panel-link"
              onClick={() => setActivePage("students")}
            >
              View all
            </button>
          </div>

          <div className="sm-mini-table">
            {students.slice(-5).reverse().map((student) => (
              <button
                key={student.id}
                className="sm-mini-row"
                onClick={() => setSelectedStudent(student)}
              >
                <div className="sm-avatar">{initials(student.name)}</div>

                <div>
                  <strong>{student.name}</strong>
                  <span>
                    Grade {student.grade} · {student.section}
                  </span>
                </div>

                <span className="sm-status active">{student.status}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Examinations</span>
              <h2>Upcoming exams</h2>
            </div>

            <button
              className="sm-panel-link"
              onClick={() => setActivePage("exams")}
            >
              Schedule
            </button>
          </div>

          <div className="sm-exam-list">
            {data.exams.map((exam) => (
              <div className="sm-exam-row" key={exam.id}>
                <div className="sm-exam-date">
                  <span>
                    {new Date(`${exam.date}T00:00:00`).toLocaleDateString(
                      "en-US",
                      { month: "short" }
                    )}
                  </span>
                  <strong>
                    {new Date(`${exam.date}T00:00:00`).getDate()}
                  </strong>
                </div>

                <div>
                  <strong>{exam.name}</strong>
                  <span>Grade {exam.grade}</span>
                </div>

                <span className="sm-status upcoming">{exam.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function StudentsPage({
  students,
  marks,
  search,
  setModal,
  setSelectedStudent,
  deleteStudent,
}) {
  const filtered = students.filter((student) =>
    `${student.name} ${student.rollNo} ${student.grade} ${student.section}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow="Student management"
        title="Students"
        description="Manage student records, academic profiles and attendance."
        action={
          <button className="sm-primary-button" onClick={() => setModal("student")}>
            <Plus size={17} />
            Add student
          </button>
        }
      />

      <div className="sm-stat-grid compact">
        <StatCard icon={Users} label="Total students" value={students.length} />
        <StatCard
          icon={UserCheck}
          label="Active students"
          value={students.filter((item) => item.status === "Active").length}
        />
        <StatCard
          icon={AlertTriangle}
          label="Low attendance"
          value={students.filter((item) => item.attendance < 75).length}
        />
        <StatCard
          icon={BarChart3}
          label="Average performance"
          value={`${Math.round(
            students.reduce(
              (sum, student) => sum + getStudentPercentage(student.id, marks),
              0
            ) / Math.max(students.length, 1)
          )}%`}
        />
      </div>

      <section className="sm-panel">
        <div className="sm-panel-header">
          <div>
            <span className="sm-panel-eyebrow">Directory</span>
            <h2>All students</h2>
          </div>
        </div>

        {filtered.length ? (
          <div className="sm-data-table-wrap">
            <table className="sm-data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No.</th>
                  <th>Class</th>
                  <th>Attendance</th>
                  <th>Performance</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {filtered.map((student) => {
                  const percentage = getStudentPercentage(student.id, marks);

                  return (
                    <tr key={student.id}>
                      <td>
                        <button
                          className="sm-table-person"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <div className="sm-avatar">
                            {initials(student.name)}
                          </div>
                          <span>
                            <strong>{student.name}</strong>
                            <small>{student.parent}</small>
                          </span>
                        </button>
                      </td>

                      <td>{student.rollNo}</td>
                      <td>
                        Grade {student.grade} · {student.section}
                      </td>

                      <td>
                        <span
                          className={
                            student.attendance < 75
                              ? "sm-number danger"
                              : "sm-number"
                          }
                        >
                          {student.attendance}%
                        </span>
                      </td>

                      <td>
                        <span className="sm-number">{percentage}%</span>
                        <small className="sm-grade">
                          {getGrade(percentage)}
                        </small>
                      </td>

                      <td>
                        <span className="sm-status active">
                          {student.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="sm-row-action danger"
                          onClick={() => deleteStudent(student.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No students found"
            text="Try another search term."
          />
        )}
      </section>
    </>
  );
}

function AcademicsPage({ data, setModal, updateData, showNotice }) {
  return (
    <>
      <PageHeader
        eyebrow="Academic structure"
        title="Academic management"
        description="Configure classes, sections and subjects for the academic year."
      />

      <div className="sm-module-grid">
        <ModulePanel
          title="Classes & Sections"
          eyebrow={`${data.classes.length} classes`}
          icon={GraduationCap}
          action={() => setModal("class")}
        >
          {data.classes.map((item) => (
            <div className="sm-module-row" key={item.id}>
              <div className="sm-module-icon">
                <GraduationCap size={17} />
              </div>
              <div>
                <strong>
                  Grade {item.grade} · {item.section}
                </strong>
                <span>
                  {item.teacher} · Room {item.room}
                </span>
              </div>
            </div>
          ))}
        </ModulePanel>

        <ModulePanel
          title="Subjects"
          eyebrow={`${data.subjects.length} subjects`}
          icon={BookOpen}
          action={() => setModal("subject")}
        >
          {data.subjects.map((item) => (
            <div className="sm-module-row" key={item.id}>
              <div className="sm-module-icon">
                <BookOpen size={17} />
              </div>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.code} · Passing {item.passing}/{item.total}
                </span>
              </div>
            </div>
          ))}
        </ModulePanel>
      </div>

      <section className="sm-panel sm-academic-overview">
        <div className="sm-panel-header">
          <div>
            <span className="sm-panel-eyebrow">Academic year</span>
            <h2>{data.settings.academicYear}</h2>
          </div>
        </div>

        <div className="sm-academic-flow">
          <div>
            <span>Classes</span>
            <strong>{data.classes.length}</strong>
          </div>
          <ArrowUpRight size={18} />
          <div>
            <span>Subjects</span>
            <strong>{data.subjects.length}</strong>
          </div>
          <ArrowUpRight size={18} />
          <div>
            <span>Examinations</span>
            <strong>{data.exams.length}</strong>
          </div>
        </div>
      </section>
    </>
  );
}

function ModulePanel({ title, eyebrow, icon: Icon, action, children }) {
  return (
    <section className="sm-panel">
      <div className="sm-panel-header">
        <div>
          <span className="sm-panel-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>

        <button className="sm-icon-button soft" onClick={action}>
          <Plus size={17} />
        </button>
      </div>

      <div className="sm-module-list">{children}</div>
    </section>
  );
}

function ExamsPage({ exams, search, setModal }) {
  const filtered = exams.filter((exam) =>
    `${exam.name} ${exam.grade} ${exam.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow="Academic operations"
        title="Examinations"
        description="Plan, schedule and monitor upcoming school examinations."
        action={
          <button className="sm-primary-button" onClick={() => setModal("exam")}>
            <Plus size={17} />
            Create exam
          </button>
        }
      />

      <div className="sm-exam-grid">
        {filtered.map((exam) => (
          <div className="sm-exam-card" key={exam.id}>
            <div className="sm-exam-card-top">
              <div className="sm-exam-date large">
                <span>
                  {new Date(`${exam.date}T00:00:00`).toLocaleDateString(
                    "en-US",
                    { month: "short" }
                  )}
                </span>
                <strong>
                  {new Date(`${exam.date}T00:00:00`).getDate()}
                </strong>
              </div>

              <span className="sm-status upcoming">{exam.status}</span>
            </div>

            <h3>{exam.name}</h3>
            <p>Grade {exam.grade}</p>

            <div className="sm-exam-card-footer">
              <span>{formatDate(exam.date)}</span>
              <CalendarDays size={15} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MarksPage({ data, updateData, search, showNotice }) {
  const [exam, setExam] = useState(data.exams[0]?.name || "");
  const [subject, setSubject] = useState(data.subjects[0]?.name || "");

  const visibleStudents = data.students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const getValue = (studentId) => {
    const row = data.marks.find(
      (item) =>
        item.studentId === studentId &&
        item.exam === exam &&
        item.subject === subject
    );

    return row ? row.marks : "";
  };

  const setValue = (studentId, value) => {
    const numeric = value === "" ? "" : Math.min(100, Math.max(0, Number(value)));

    const existing = data.marks.findIndex(
      (item) =>
        item.studentId === studentId &&
        item.exam === exam &&
        item.subject === subject
    );

    let nextMarks = [...data.marks];

    if (existing >= 0) {
      if (numeric === "") {
        nextMarks.splice(existing, 1);
      } else {
        nextMarks[existing] = {
          ...nextMarks[existing],
          marks: numeric,
        };
      }
    } else if (numeric !== "") {
      nextMarks.push({
        studentId,
        subject,
        exam,
        marks: numeric,
      });
    }

    updateData({ marks: nextMarks });
  };

  return (
    <>
      <PageHeader
        eyebrow="Assessment"
        title="Enter marks"
        description="Record marks and let SchoolMarks calculate results automatically."
      />

      <section className="sm-panel">
        <div className="sm-mark-toolbar">
          <div className="sm-field">
            <label>Examination</label>
            <select value={exam} onChange={(event) => setExam(event.target.value)}>
              {data.exams.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="sm-field">
            <label>Subject</label>
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              {data.subjects.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="sm-mark-status">
            <CheckCircle2 size={17} />
            Auto-save enabled
          </div>
        </div>

        <div className="sm-data-table-wrap">
          <table className="sm-data-table marks">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Marks / 100</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {visibleStudents.map((student) => {
                const value = getValue(student.id);
                const percentage = Number(value || 0);
                const grade = value === "" ? "—" : getGrade(percentage);

                return (
                  <tr key={student.id}>
                    <td>
                      <div className="sm-table-person">
                        <div className="sm-avatar">
                          {initials(student.name)}
                        </div>
                        <span>
                          <strong>{student.name}</strong>
                          <small>Roll {student.rollNo}</small>
                        </span>
                      </div>
                    </td>

                    <td>
                      Grade {student.grade} · {student.section}
                    </td>

                    <td>
                      <input
                        className="sm-mark-input"
                        type="number"
                        min="0"
                        max="100"
                        value={value}
                        placeholder="—"
                        onChange={(event) =>
                          setValue(student.id, event.target.value)
                        }
                        onBlur={() => showNotice("Marks saved")}
                      />
                    </td>

                    <td>
                      <span className="sm-grade-pill">{grade}</span>
                    </td>

                    <td>
                      {value === "" ? (
                        <span className="sm-status pending">Pending</span>
                      ) : (
                        <span className="sm-status active">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function ResultsPage({ students, marks, rankedStudents }) {
  const average = Math.round(
    students.reduce(
      (sum, student) => sum + getStudentPercentage(student.id, marks),
      0
    ) / Math.max(students.length, 1)
  );

  const passCount = students.filter(
    (student) => getStudentPercentage(student.id, marks) >= 40
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="Results intelligence"
        title="Results & rankings"
        description="Automatically calculated academic results from recorded marks."
      />

      <div className="sm-stat-grid compact">
        <StatCard icon={BarChart3} label="Class average" value={`${average}%`} />
        <StatCard
          icon={CheckCircle2}
          label="Pass rate"
          value={`${Math.round((passCount / Math.max(students.length, 1)) * 100)}%`}
        />
        <StatCard
          icon={TrendingUp}
          label="Highest"
          value={`${rankedStudents[0]?.percentage || 0}%`}
        />
        <StatCard
          icon={ArrowDownRight}
          label="Lowest"
          value={`${rankedStudents[rankedStudents.length - 1]?.percentage || 0}%`}
        />
      </div>

      <section className="sm-panel">
        <div className="sm-panel-header">
          <div>
            <span className="sm-panel-eyebrow">Automatic ranking</span>
            <h2>Student rankings</h2>
          </div>
        </div>

        <div className="sm-ranking-full">
          {rankedStudents.map((student, index) => (
            <div className="sm-ranking-full-row" key={student.id}>
              <span className="sm-rank-number">{index + 1}</span>

              <div className="sm-avatar">{initials(student.name)}</div>

              <div className="sm-ranking-info">
                <strong>{student.name}</strong>
                <span>
                  Grade {student.grade} · Section {student.section}
                </span>
              </div>

              <div className="sm-result-progress">
                <div>
                  <span style={{ width: `${student.percentage}%` }} />
                </div>
                <b>{student.percentage}%</b>
              </div>

              <span className="sm-grade-pill">
                {getGrade(student.percentage)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AttendancePage({ students, updateData, showNotice }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const mark = (studentId, status) => {
    const attendance = [...(updateData.attendance || [])];
    const index = attendance.findIndex(
      (item) => item.studentId === studentId && item.date === date
    );

    const item = {
      studentId,
      date,
      status,
    };

    if (index >= 0) {
      attendance[index] = item;
    } else {
      attendance.push(item);
    }

    updateData({ attendance });

    const student = students.find((item) => item.id === studentId);

    if (student) {
      const nextAttendance =
        status === "Present"
          ? Math.min(100, student.attendance + 0.1)
          : Math.max(0, student.attendance - 0.3);

      updateData({
        students: students.map((item) =>
          item.id === studentId
            ? { ...item, attendance: Number(nextAttendance.toFixed(1)) }
            : item
        ),
      });
    }

    showNotice("Attendance updated");
  };

  return (
    <>
      <PageHeader
        eyebrow="Attendance"
        title="Attendance management"
        description="Mark attendance and monitor student presence."
      >
        <div className="sm-date-input">
          <CalendarDays size={16} />
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
      </PageHeader>

      <section className="sm-panel">
        <div className="sm-panel-header">
          <div>
            <span className="sm-panel-eyebrow">Daily register</span>
            <h2>{formatDate(date)}</h2>
          </div>
        </div>

        <div className="sm-attendance-list">
          {students.map((student) => (
            <div className="sm-attendance-row" key={student.id}>
              <div className="sm-table-person">
                <div className="sm-avatar">{initials(student.name)}</div>
                <span>
                  <strong>{student.name}</strong>
                  <small>
                    Grade {student.grade} · {student.section}
                  </small>
                </span>
              </div>

              <span
                className={
                  student.attendance < 75
                    ? "sm-number danger"
                    : "sm-number"
                }
              >
                {student.attendance}%
              </span>

              <div className="sm-attendance-actions">
                <button onClick={() => mark(student.id, "Present")}>
                  <Check size={15} />
                  Present
                </button>
                <button onClick={() => mark(student.id, "Absent")}>
                  <X size={15} />
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function PerformancePage({ students, marks, performance, attendance }) {
  const subjectData = {};

  marks.forEach((mark) => {
    if (!subjectData[mark.subject]) {
      subjectData[mark.subject] = [];
    }

    subjectData[mark.subject].push(Number(mark.marks));
  });

  const subjects = Object.entries(subjectData).map(([name, values]) => ({
    name,
    average: Math.round(
      values.reduce((sum, value) => sum + value, 0) / values.length
    ),
  }));

  const attentionStudents = students
    .map((student) => ({
      ...student,
      percentage: getStudentPercentage(student.id, marks),
    }))
    .filter((student) => student.percentage < 60 || student.attendance < 75)
    .sort((a, b) => a.percentage - b.percentage);

  return (
    <>
      <PageHeader
        eyebrow="Performance intelligence"
        title="Performance intelligence"
        description="Turn marks and attendance into actionable academic insights."
      />

      <div className="sm-stat-grid compact">
        <StatCard icon={TrendingUp} label="Academic average" value={`${performance}%`} />
        <StatCard icon={UserCheck} label="Attendance average" value={`${attendance}%`} />
        <StatCard icon={ShieldAlert} label="Students needing attention" value={attentionStudents.length} />
        <StatCard icon={BookOpen} label="Tracked subjects" value={subjects.length} />
      </div>

      <div className="sm-dashboard-grid">
        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Subject intelligence</span>
              <h2>Subject averages</h2>
            </div>
          </div>

          <div className="sm-subject-performance">
            {subjects.map((subject) => (
              <div key={subject.name}>
                <div>
                  <strong>{subject.name}</strong>
                  <span>{subject.average}%</span>
                </div>

                <div className="sm-progress">
                  <span style={{ width: `${subject.average}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Intervention</span>
              <h2>Needs attention</h2>
            </div>
          </div>

          <div className="sm-risk-list">
            {attentionStudents.length ? (
              attentionStudents.map((student) => (
                <div className="sm-risk-row" key={student.id}>
                  <div className="sm-avatar">{initials(student.name)}</div>
                  <div>
                    <strong>{student.name}</strong>
                    <span>
                      {student.percentage}% academic · {student.attendance}% attendance
                    </span>
                  </div>
                  <AlertTriangle size={17} />
                </div>
              ))
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="No students at risk"
                text="Current recorded data looks healthy."
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function NoticesPage({ notices, setModal, updateData, showNotice }) {
  const removeNotice = (id) => {
    updateData({
      notices: notices.filter((notice) => notice.id !== id),
    });

    showNotice("Notice removed");
  };

  return (
    <>
      <PageHeader
        eyebrow="Communication"
        title="Notices"
        description="Publish school announcements and important academic updates."
        action={
          <button className="sm-primary-button" onClick={() => setModal("notice")}>
            <Plus size={17} />
            New notice
          </button>
        }
      />

      <div className="sm-notice-list">
        {notices.map((item) => (
          <article className="sm-notice-card" key={item.id}>
            <div className={`sm-notice-priority ${item.priority.toLowerCase()}`} />

            <div className="sm-notice-main">
              <div className="sm-notice-meta">
                <span>{item.audience}</span>
                <span>{formatDate(item.date)}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.message}</p>
            </div>

            <button
              className="sm-row-action danger"
              onClick={() => removeNotice(item.id)}
            >
              <Trash2 size={16} />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

function ReportsPage({ data, rankedStudents, exportData }) {
  const reports = [
    ["Student performance report", "Academic results, grades and ranking", BarChart3],
    ["Attendance report", "Daily, monthly and student attendance", UserCheck],
    ["Examination report", "Exam schedule and marks completion", CalendarDays],
    ["Class report", "Class-level academic performance", GraduationCap],
    ["Ranking report", "Automatic student rankings", TrendingUp],
    ["School data backup", "Complete SchoolMarks JSON backup", Download],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Reporting"
        title="Reports"
        description="Generate useful views from your school data."
      />

      <div className="sm-report-grid">
        {reports.map(([title, description, Icon], index) => (
          <button
            className="sm-report-card"
            key={title}
            onClick={index === reports.length - 1 ? exportData : undefined}
          >
            <div className="sm-report-icon">
              <Icon size={19} />
            </div>

            <div>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>

            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>

      <section className="sm-panel">
        <div className="sm-panel-header">
          <div>
            <span className="sm-panel-eyebrow">School snapshot</span>
            <h2>Current report data</h2>
          </div>
        </div>

        <div className="sm-report-summary">
          <div>
            <span>Students</span>
            <strong>{data.students.length}</strong>
          </div>
          <div>
            <span>Classes</span>
            <strong>{data.classes.length}</strong>
          </div>
          <div>
            <span>Subjects</span>
            <strong>{data.subjects.length}</strong>
          </div>
          <div>
            <span>Exams</span>
            <strong>{data.exams.length}</strong>
          </div>
          <div>
            <span>Top student</span>
            <strong>{rankedStudents[0]?.name || "—"}</strong>
          </div>
        </div>
      </section>
    </>
  );
}

function SettingsPage({
  data,
  updateData,
  exportData,
  resetData,
  showNotice,
}) {
  const [schoolName, setSchoolName] = useState(data.settings.schoolName);
  const [academicYear, setAcademicYear] = useState(data.settings.academicYear);

  const saveSettings = () => {
    updateData({
      settings: {
        ...data.settings,
        schoolName,
        academicYear,
      },
    });

    showNotice("Settings saved");
  };

  return (
    <>
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Manage school identity, academic settings and data."
      />

      <div className="sm-settings-grid">
        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">School profile</span>
              <h2>School information</h2>
            </div>
          </div>

          <div className="sm-settings-form">
            <div className="sm-field">
              <label>School name</label>
              <input
                value={schoolName}
                onChange={(event) => setSchoolName(event.target.value)}
              />
            </div>

            <div className="sm-field">
              <label>Academic year</label>
              <input
                value={academicYear}
                onChange={(event) => setAcademicYear(event.target.value)}
              />
            </div>

            <button className="sm-primary-button" onClick={saveSettings}>
              <Check size={16} />
              Save changes
            </button>
          </div>
        </section>

        <section className="sm-panel">
          <div className="sm-panel-header">
            <div>
              <span className="sm-panel-eyebrow">Data management</span>
              <h2>Backup & restore</h2>
            </div>
          </div>

          <div className="sm-settings-actions">
            <button onClick={exportData}>
              <Download size={17} />
              Export complete backup
            </button>

            <button onClick={resetData}>
              <RefreshCw size={17} />
              Restore demo data
            </button>
          </div>

          <div className="sm-local-note">
            <ShieldAlert size={17} />
            <div>
              <strong>Local-first storage</strong>
              <span>
                Your current SchoolMarks data is stored in this browser using
                LocalStorage.
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function StudentModal({ student, marks, onClose }) {
  const percentage = getStudentPercentage(student.id, marks);

  return (
    <Modal title="Student profile" onClose={onClose} wide>
      <div className="sm-profile-header">
        <div className="sm-profile-avatar">{initials(student.name)}</div>
        <div>
          <span className="sm-eyebrow">Student</span>
          <h2>{student.name}</h2>
          <p>
            Grade {student.grade} · Section {student.section} · Roll{" "}
            {student.rollNo}
          </p>
        </div>
      </div>

      <div className="sm-profile-grid">
        <div>
          <span>Attendance</span>
          <strong>{student.attendance}%</strong>
        </div>

        <div>
          <span>Performance</span>
          <strong>{percentage}%</strong>
        </div>

        <div>
          <span>Grade</span>
          <strong>{getGrade(percentage)}</strong>
        </div>

        <div>
          <span>Status</span>
          <strong>{student.status}</strong>
        </div>
      </div>

      <div className="sm-profile-details">
        <div>
          <span>Parent / Guardian</span>
          <strong>{student.parent}</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>{student.phone}</strong>
        </div>
        <div>
          <span>Gender</span>
          <strong>{student.gender}</strong>
        </div>
      </div>
    </Modal>
  );
}

function StudentForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    grade: "9",
    section: "A",
    gender: "Male",
    parent: "",
    phone: "",
  });

  const change = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <Modal title="Add student" onClose={onClose}>
      <div className="sm-form-grid">
        <Field
          label="Student name"
          value={form.name}
          onChange={(value) => change("name", value)}
        />
        <Field
          label="Roll number"
          value={form.rollNo}
          onChange={(value) => change("rollNo", value)}
        />
        <Field
          label="Grade"
          value={form.grade}
          onChange={(value) => change("grade", value)}
        />
        <Field
          label="Section"
          value={form.section}
          onChange={(value) => change("section", value)}
        />
        <Field
          label="Parent / Guardian"
          value={form.parent}
          onChange={(value) => change("parent", value)}
        />
        <Field
          label="Phone"
          value={form.phone}
          onChange={(value) => change("phone", value)}
        />
      </div>

      <button
        className="sm-primary-button full"
        onClick={() => form.name.trim() && onSave(form)}
      >
        <Check size={16} />
        Create student
      </button>
    </Modal>
  );
}

function ExamForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    grade: "9",
    date: "",
  });

  return (
    <Modal title="Create examination" onClose={onClose}>
      <div className="sm-form-grid">
        <Field
          label="Exam name"
          value={form.name}
          onChange={(value) => setForm({ ...form, name: value })}
        />
        <Field
          label="Grade"
          value={form.grade}
          onChange={(value) => setForm({ ...form, grade: value })}
        />
        <Field
          label="Exam date"
          type="date"
          value={form.date}
          onChange={(value) => setForm({ ...form, date: value })}
        />
      </div>

      <button
        className="sm-primary-button full"
        onClick={() => form.name && form.date && onSave(form)}
      >
        <Check size={16} />
        Create exam
      </button>
    </Modal>
  );
}

function ClassForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    grade: "9",
    section: "A",
    teacher: "",
    room: "",
  });

  return (
    <Modal title="Create class" onClose={onClose}>
      <div className="sm-form-grid">
        <Field
          label="Grade"
          value={form.grade}
          onChange={(value) => setForm({ ...form, grade: value })}
        />
        <Field
          label="Section"
          value={form.section}
          onChange={(value) => setForm({ ...form, section: value })}
        />
        <Field
          label="Class teacher"
          value={form.teacher}
          onChange={(value) => setForm({ ...form, teacher: value })}
        />
        <Field
          label="Room"
          value={form.room}
          onChange={(value) => setForm({ ...form, room: value })}
        />
      </div>

      <button
        className="sm-primary-button full"
        onClick={() => form.teacher && onSave(form)}
      >
        <Check size={16} />
        Create class
      </button>
    </Modal>
  );
}

function SubjectForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    total: 100,
    passing: 40,
  });

  return (
    <Modal title="Add subject" onClose={onClose}>
      <div className="sm-form-grid">
        <Field
          label="Subject name"
          value={form.name}
          onChange={(value) => setForm({ ...form, name: value })}
        />
        <Field
          label="Subject code"
          value={form.code}
          onChange={(value) => setForm({ ...form, code: value })}
        />
        <Field
          label="Total marks"
          type="number"
          value={form.total}
          onChange={(value) => setForm({ ...form, total: Number(value) })}
        />
        <Field
          label="Passing marks"
          type="number"
          value={form.passing}
          onChange={(value) => setForm({ ...form, passing: Number(value) })}
        />
      </div>

      <button
        className="sm-primary-button full"
        onClick={() => form.name && onSave(form)}
      >
        <Check size={16} />
        Add subject
      </button>
    </Modal>
  );
}

function NoticeForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    audience: "All Students",
    date: new Date().toISOString().slice(0, 10),
    priority: "Normal",
    message: "",
  });

  return (
    <Modal title="Publish notice" onClose={onClose}>
      <div className="sm-form-grid">
        <Field
          label="Title"
          value={form.title}
          onChange={(value) => setForm({ ...form, title: value })}
        />
        <Field
          label="Audience"
          value={form.audience}
          onChange={(value) => setForm({ ...form, audience: value })}
        />
        <Field
          label="Date"
          type="date"
          value={form.date}
          onChange={(value) => setForm({ ...form, date: value })}
        />
      </div>

      <div className="sm-field">
        <label>Message</label>
        <textarea
          value={form.message}
          onChange={(event) =>
            setForm({ ...form, message: event.target.value })
          }
          rows="4"
        />
      </div>

      <button
        className="sm-primary-button full"
        onClick={() => form.title && form.message && onSave(form)}
      >
        <Check size={16} />
        Publish notice
      </button>
    </Modal>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className="sm-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default Dashboard;