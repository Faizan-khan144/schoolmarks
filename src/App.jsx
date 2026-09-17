import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  FileText,
  Filter,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
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
  { id: 1, name: "Ayaan Khan", className: "9-A", roll: "09-021", average: 87, attendance: 96, status: "Excellent" },
  { id: 2, name: "Hania Ahmed", className: "9-A", roll: "09-022", average: 82, attendance: 93, status: "Good" },
  { id: 3, name: "Rayyan Ali", className: "9-B", roll: "09-034", average: 74, attendance: 88, status: "Good" },
  { id: 4, name: "Maham Noor", className: "9-B", roll: "09-035", average: 69, attendance: 84, status: "Average" },
  { id: 5, name: "Zayan Sheikh", className: "9-A", roll: "09-026", average: 51, attendance: 73, status: "Attention" },
  { id: 6, name: "Areeba Khan", className: "9-B", roll: "09-039", average: 58, attendance: 78, status: "Attention" },
  { id: 7, name: "Hamza Raza", className: "9-A", roll: "09-028", average: 91, attendance: 98, status: "Excellent" },
  { id: 8, name: "Minal Fatima", className: "9-C", roll: "09-041", average: 79, attendance: 91, status: "Good" },
  { id: 9, name: "Daniyal Ahmed", className: "9-C", roll: "09-043", average: 64, attendance: 86, status: "Average" },
  { id: 10, name: "Eman Noor", className: "9-B", roll: "09-037", average: 88, attendance: 95, status: "Excellent" }
];

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: ClipboardCheck },
  { id: "marks", label: "Marks", icon: BarChart3 },
  { id: "results", label: "Results", icon: Award },
  { id: "attendance", label: "Attendance", icon: CalendarDays },
  { id: "performance", label: "Performance", icon: LineChart },
  { id: "ai", label: "AI Intelligence", icon: BrainCircuit }
];

const quickActions = [
  { label: "Add student", icon: Plus, page: "students" },
  { label: "Record attendance", icon: CalendarDays, page: "attendance" },
  { label: "Enter marks", icon: ClipboardCheck, page: "marks" },
  { label: "Ask AI", icon: Sparkles, page: "ai" }
];

const subjects = [
  { name: "Mathematics", average: 67, change: -2.4 },
  { name: "Computer Science", average: 91, change: 8.6 },
  { name: "English", average: 78, change: 3.1 },
  { name: "Science", average: 74, change: 1.8 },
  { name: "Urdu", average: 82, change: 4.2 }
];

const attendanceData = [
  { day: "Mon", value: 94 },
  { day: "Tue", value: 91 },
  { day: "Wed", value: 96 },
  { day: "Thu", value: 89 },
  { day: "Fri", value: 93 },
  { day: "Sat", value: 97 }
];

function useCountUp(target, duration = 1000, active = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame;
    let start = null;

    const animate = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);

  return value;
}

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" />
      </div>
      <div>
        <strong>SchoolMarks</strong>
        <span>School Management</span>
      </div>
    </div>
  );
}

function MiniChart({ large = false }) {
  return (
    <div className={`chart-wrapper ${large ? "chart-large" : ""}`}>
      <div className="chart-labels">
        <span>100%</span>
        <span>75%</span>
        <span>50%</span>
        <span>25%</span>
        <span>0%</span>
      </div>

      <svg className="analytics-chart" viewBox="0 0 700 250" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(47,125,80,.22)" />
            <stop offset="100%" stopColor="rgba(47,125,80,0)" />
          </linearGradient>
        </defs>

        <path
          className="chart-background-line"
          d="M0 30H700 M0 80H700 M0 130H700 M0 180H700 M0 230H700"
        />

        <path
          className="chart-area-fill"
          d="M0 180 C70 175 75 155 130 160 C185 165 195 135 245 142 C295 149 305 125 350 132 C400 139 420 102 465 112 C515 122 535 85 580 94 C620 102 650 62 700 70 L700 250 L0 250 Z"
        />

        <path
          className="chart-main-line"
          d="M0 180 C70 175 75 155 130 160 C185 165 195 135 245 142 C295 149 305 125 350 132 C400 139 420 102 465 112 C515 122 535 85 580 94 C620 102 650 62 700 70"
        />

        <circle className="chart-point" cx="700" cy="70" r="6" />
      </svg>

      <div className="chart-bottom-labels">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
    </div>
  );
}

function ProgressRing({ value = 94, size = "normal" }) {
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={`progress-ring ${size === "large" ? "ring-large" : ""}`}>
      <svg viewBox="0 0 100 100">
        <circle className="ring-bg" cx="50" cy="50" r={radius} />
        <circle
          className="ring-value"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-label">
        <strong>{value}%</strong>
        <span>Attendance</span>
      </div>
    </div>
  );
}

function Avatar({ name, index = 0 }) {
  return (
    <div className={`student-avatar avatar-${index % 6}`}>
      {name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)}
    </div>
  );
}

function StatusBadge({ status }) {
  const type =
    status === "Excellent"
      ? "success"
      : status === "Attention"
      ? "danger"
      : status === "Good"
      ? "info"
      : "warning";

  return <span className={`status-badge ${type}`}>{status}</span>;
}

function DashboardCard({ children, className = "" }) {
  return <div className={`dash-card ${className}`}>{children}</div>;
}

function PageHeader({ eyebrow, title, text, action }) {
  return (
    <div className="page-header">
      <div>
        <span className="page-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </div>
  );
}

function DashboardHome({ navigate }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const totalStudents = useCountUp(248, 1100, loaded);
  const attendance = useCountUp(94, 1000, loaded);
  const performance = useCountUp(83, 1100, loaded);
  const classes = useCountUp(12, 900, loaded);

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="SCHOOL OVERVIEW"
        title="Good evening, School Admin."
        text="Here's what's happening across your school today."
        action={
          <button className="dashboard-primary" onClick={() => navigate("ai")}>
            <Sparkles size={16} />
            Ask SchoolMarks AI
          </button>
        }
      />

      <div className="stat-grid">
        <DashboardCard className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon green"><Users size={18} /></div>
            <span className="stat-change positive"><ArrowUpRight size={13} /> 8.2%</span>
          </div>
          <span className="stat-label">Total Students</span>
          <strong>{totalStudents}</strong>
          <p>+18 this academic year</p>
        </DashboardCard>

        <DashboardCard className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon blue"><CalendarDays size={18} /></div>
            <span className="stat-change positive"><ArrowUpRight size={13} /> 2.1%</span>
          </div>
          <span className="stat-label">Attendance</span>
          <strong>{attendance}%</strong>
          <p>Overall school attendance</p>
        </DashboardCard>

        <DashboardCard className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon purple"><TrendingUp size={18} /></div>
            <span className="stat-change positive"><ArrowUpRight size={13} /> 6.4%</span>
          </div>
          <span className="stat-label">Performance</span>
          <strong>{performance}%</strong>
          <p>Average academic score</p>
        </DashboardCard>

        <DashboardCard className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon orange"><GraduationCap size={18} /></div>
            <span className="stat-change neutral">2026–27</span>
          </div>
          <span className="stat-label">Academic Groups</span>
          <strong>{classes}</strong>
          <p>Classes and sections</p>
        </DashboardCard>
      </div>

      <div className="quick-actions">
        {quickActions.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} onClick={() => navigate(item.page)}>
              <div><Icon size={17} /></div>
              <span>{item.label}</span>
              <ArrowRight size={14} />
            </button>
          );
        })}
      </div>

      <div className="dashboard-main-grid">
        <DashboardCard className="chart-dashboard-card">
          <div className="card-title-row">
            <div>
              <span className="card-eyebrow">PERFORMANCE</span>
              <h3>Academic performance</h3>
            </div>
            <button className="select-button">Last 7 months <ChevronDown size={13} /></button>
          </div>

          <div className="big-chart-value">
            <strong>82.7%</strong>
            <span><TrendingUp size={13} /> +6.4% from previous period</span>
          </div>

          <MiniChart large />
        </DashboardCard>

        <DashboardCard className="attendance-dashboard-card">
          <div className="card-title-row">
            <div>
              <span className="card-eyebrow">ATTENDANCE</span>
              <h3>Attendance health</h3>
            </div>
            <MoreHorizontal size={18} />
          </div>

          <ProgressRing value={94} size="large" />

          <div className="attendance-breakdown">
            <div><span className="green-dot" /><span>Present</span><strong>91.2%</strong></div>
            <div><span className="yellow-dot" /><span>Late</span><strong>2.8%</strong></div>
            <div><span className="red-dot" /><span>Absent</span><strong>6.0%</strong></div>
          </div>
        </DashboardCard>
      </div>

      <div className="dashboard-lower-grid">
        <DashboardCard className="student-performance-card">
          <div className="card-title-row">
            <div>
              <span className="card-eyebrow">STUDENTS</span>
              <h3>Recent performance</h3>
            </div>
            <button className="text-button" onClick={() => navigate("students")}>View all <ArrowRight size={14} /></button>
          </div>

          <div className="student-list">
            {students.slice(0, 5).map((student, index) => (
              <div className="student-list-row" key={student.id}>
                <div className="student-list-person">
                  <Avatar name={student.name} index={index} />
                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.className} · Roll {student.roll}</span>
                  </div>
                </div>

                <div className="student-mini-score">
                  <strong>{student.average}%</strong>
                  <div className="mini-progress">
                    <span style={{ width: `${student.average}%` }} />
                  </div>
                </div>

                <StatusBadge status={student.status} />
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard className="insights-card">
          <div className="ai-card-heading">
            <div className="ai-small-icon"><Sparkles size={17} /></div>
            <div>
              <span>AI INSIGHT</span>
              <h3>SchoolMarks Intelligence</h3>
            </div>
            <span className="ai-live"><i /> Live</span>
          </div>

          <div className="insight-highlight">
            <Target size={18} />
            <div>
              <strong>6 students need attention</strong>
              <p>Zayan Sheikh and 5 other students are below the defined performance threshold.</p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon"><TrendingDown size={15} /></div>
            <div>
              <strong>Mathematics performance dropped</strong>
              <span>Class average changed by 2.4% this period.</span>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon"><CheckCircle2 size={15} /></div>
            <div>
              <strong>Attendance remains healthy</strong>
              <span>Overall attendance is above the 90% target.</span>
            </div>
          </div>

          <button className="ai-open-button" onClick={() => navigate("ai")}>
            Open Intelligence
            <ArrowRight size={15} />
          </button>
        </DashboardCard>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.className.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || student.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="STUDENT MANAGEMENT"
        title="Students"
        text="Manage student profiles, classes and academic records."
        action={
          <button className="dashboard-primary">
            <Plus size={16} />
            Add student
          </button>
        }
      />

      <div className="page-stats-row">
        <div><span>Total students</span><strong>248</strong></div>
        <div><span>Excellent</span><strong>64</strong></div>
        <div><span>Need attention</span><strong>18</strong></div>
        <div><span>New this year</span><strong>18</strong></div>
      </div>

      <DashboardCard className="table-container">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
            />
          </div>

          <div className="toolbar-actions">
            {["All", "Excellent", "Good", "Average", "Attention"].map((item) => (
              <button
                key={item}
                className={filter === item ? "filter-active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
            <button className="filter-button"><Filter size={15} /> Filter</button>
          </div>
        </div>

        <div className="data-table">
          <div className="table-head">
            <span>Student</span>
            <span>Class</span>
            <span>Roll number</span>
            <span>Average</span>
            <span>Attendance</span>
            <span>Status</span>
            <span />
          </div>

          {filtered.map((student, index) => (
            <div className="table-row" key={student.id}>
              <div className="table-student">
                <Avatar name={student.name} index={index} />
                <strong>{student.name}</strong>
              </div>
              <span>{student.className}</span>
              <span>{student.roll}</span>
              <strong>{student.average}%</strong>
              <span>{student.attendance}%</span>
              <StatusBadge status={student.status} />
              <button className="row-more"><MoreHorizontal size={17} /></button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <strong>No students found</strong>
              <span>Try another search or filter.</span>
            </div>
          )}
        </div>
      </DashboardCard>
    </div>
  );
}

function AttendancePage() {
  const [selectedDay, setSelectedDay] = useState("Today");

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="ATTENDANCE MANAGEMENT"
        title="Attendance"
        text="Track daily attendance and identify students who need follow-up."
        action={
          <button className="dashboard-primary">
            <CalendarDays size={16} />
            Record attendance
          </button>
        }
      />

      <div className="stat-grid">
        <DashboardCard className="stat-card">
          <div className="stat-card-top"><div className="stat-icon green"><UserCheck size={18} /></div><span className="stat-change positive">Healthy</span></div>
          <span className="stat-label">Present today</span>
          <strong>231</strong>
          <p>93.1% of students</p>
        </DashboardCard>

        <DashboardCard className="stat-card">
          <div className="stat-card-top"><div className="stat-icon orange"><Clock3 size={18} /></div><span className="stat-change neutral">+3</span></div>
          <span className="stat-label">Late arrivals</span>
          <strong>9</strong>
          <p>3.6% of students</p>
        </DashboardCard>

        <DashboardCard className="stat-card">
          <div className="stat-card-top"><div className="stat-icon purple"><AlertCircle size={18} /></div><span className="stat-change negative">Needs review</span></div>
          <span className="stat-label">Absent</span>
          <strong>8</strong>
          <p>3.2% of students</p>
        </DashboardCard>

        <DashboardCard className="stat-card">
          <div className="stat-card-top"><div className="stat-icon blue"><TrendingUp size={18} /></div><span className="stat-change positive">+2.1%</span></div>
          <span className="stat-label">Monthly average</span>
          <strong>94.2%</strong>
          <p>Compared with last month</p>
        </DashboardCard>
      </div>

      <div className="dashboard-main-grid attendance-grid">
        <DashboardCard className="attendance-chart-card">
          <div className="card-title-row">
            <div>
              <span className="card-eyebrow">WEEKLY TREND</span>
              <h3>Attendance activity</h3>
            </div>
            <div className="period-switch">
              {["Today", "Week", "Month"].map((item) => (
                <button
                  key={item}
                  className={selectedDay === item ? "active" : ""}
                  onClick={() => setSelectedDay(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="attendance-bars">
            {attendanceData.map((item) => (
              <div className="attendance-bar-column" key={item.day}>
                <div className="attendance-bar-value">{item.value}%</div>
                <div className="attendance-bar-track">
                  <span style={{ height: `${item.value}%` }} />
                </div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard className="attendance-risk-card">
          <div className="card-title-row">
            <div>
              <span className="card-eyebrow">ATTENTION</span>
              <h3>Attendance risk</h3>
            </div>
            <Target size={18} />
          </div>

          {students.filter((s) => s.attendance < 85).slice(0, 4).map((student, index) => (
            <div className="risk-student" key={student.id}>
              <Avatar name={student.name} index={index} />
              <div>
                <strong>{student.name}</strong>
                <span>{student.className}</span>
              </div>
              <b>{student.attendance}%</b>
            </div>
          ))}

          <button className="full-width-button">View attendance report <ArrowRight size={14} /></button>
        </DashboardCard>
      </div>
    </div>
  );
}

function MarksPage() {
  const marks = [
    ["Ayaan Khan", "9-A", 92, 88, 91, 86],
    ["Hania Ahmed", "9-A", 87, 84, 82, 89],
    ["Rayyan Ali", "9-B", 76, 71, 78, 73],
    ["Maham Noor", "9-B", 69, 72, 66, 70],
    ["Zayan Sheikh", "9-A", 48, 52, 54, 49]
  ];

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="ASSESSMENTS"
        title="Marks"
        text="Enter, review and analyze assessment marks."
        action={
          <button className="dashboard-primary">
            <Plus size={16} />
            New assessment
          </button>
        }
      />

      <div className="assessment-summary">
        <div><span>Assessments</span><strong>92</strong><small>6 this month</small></div>
        <div><span>Processed</span><strong>86</strong><small>93.4% complete</small></div>
        <div><span>Class average</span><strong>78.4%</strong><small>+4.2% trend</small></div>
        <div><span>Pending</span><strong>6</strong><small>Requires entry</small></div>
      </div>

      <DashboardCard className="table-container">
        <div className="table-toolbar">
          <div>
            <span className="card-eyebrow">RECENT ASSESSMENT</span>
            <h3>Class 9 performance</h3>
          </div>
          <div className="toolbar-actions">
            <button className="filter-button"><Download size={15} /> Export</button>
          </div>
        </div>

        <div className="marks-table">
          <div className="marks-head">
            <span>Student</span>
            <span>Class</span>
            <span>Math</span>
            <span>Science</span>
            <span>Computer</span>
            <span>English</span>
            <span>Average</span>
          </div>

          {marks.map((row) => {
            const avg = Math.round((row[2] + row[3] + row[4] + row[5]) / 4);
            return (
              <div className="marks-row" key={row[0]}>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
                <span>{row[2]}%</span>
                <span>{row[3]}%</span>
                <span>{row[4]}%</span>
                <span>{row[5]}%</span>
                <b className={avg < 60 ? "danger-text" : ""}>{avg}%</b>
              </div>
            );
          })}
        </div>
      </DashboardCard>
    </div>
  );
}

function ResultsPage() {
  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="ACADEMIC RESULTS"
        title="Results"
        text="Review calculated results, rankings and academic summaries."
        action={
          <button className="dashboard-primary">
            <FileText size={16} />
            Generate report
          </button>
        }
      />

      <div className="result-hero">
        <div>
          <span className="card-eyebrow">CURRENT TERM</span>
          <h2>Annual Assessment 2026</h2>
          <p>Results processing is 93% complete across 12 academic groups.</p>
        </div>
        <div className="result-hero-score">
          <strong>78.4%</strong>
          <span>Overall average</span>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <DashboardCard>
          <div className="card-title-row">
            <div><span className="card-eyebrow">RANKINGS</span><h3>Top performers</h3></div>
            <Award size={18} />
          </div>

          {students.slice().sort((a, b) => b.average - a.average).slice(0, 5).map((student, index) => (
            <div className="ranking-row" key={student.id}>
              <div className="rank-number">{index + 1}</div>
              <Avatar name={student.name} index={index} />
              <div className="rank-person">
                <strong>{student.name}</strong>
                <span>{student.className}</span>
              </div>
              <strong>{student.average}%</strong>
            </div>
          ))}
        </DashboardCard>

        <DashboardCard>
          <div className="card-title-row">
            <div><span className="card-eyebrow">RESULT DISTRIBUTION</span><h3>Grade overview</h3></div>
          </div>

          {[
            ["A+", 18, "91–100"],
            ["A", 37, "81–90"],
            ["B", 64, "71–80"],
            ["C", 73, "61–70"],
            ["D", 38, "51–60"],
            ["F", 18, "0–50"]
          ].map(([grade, count, range]) => (
            <div className="grade-row" key={grade}>
              <strong>{grade}</strong>
              <div><span style={{ width: `${(count / 73) * 100}%` }} /></div>
              <span>{count}</span>
              <small>{range}</small>
            </div>
          ))}
        </DashboardCard>
      </div>
    </div>
  );
}

function PerformancePage() {
  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="ACADEMIC ANALYTICS"
        title="Performance"
        text="Understand trends across classes, subjects and assessments."
        action={
          <button className="dashboard-primary">
            <Download size={16} />
            Export analytics
          </button>
        }
      />

      <DashboardCard className="full-chart-card">
        <div className="card-title-row">
          <div>
            <span className="card-eyebrow">SCHOOL PERFORMANCE</span>
            <h3>Performance trend</h3>
          </div>
          <button className="select-button">Academic year 2026–27 <ChevronDown size={13} /></button>
        </div>
        <div className="big-chart-value">
          <strong>82.7%</strong>
          <span><TrendingUp size={13} /> +6.4% this academic year</span>
        </div>
        <MiniChart large />
      </DashboardCard>

      <div className="dashboard-main-grid performance-bottom">
        <DashboardCard>
          <div className="card-title-row">
            <div><span className="card-eyebrow">SUBJECTS</span><h3>Subject performance</h3></div>
          </div>

          {subjects.map((subject) => (
            <div className="subject-performance" key={subject.name}>
              <div className="subject-info">
                <strong>{subject.name}</strong>
                <span>{subject.average}% average</span>
              </div>
              <div className="subject-progress"><span style={{ width: `${subject.average}%` }} /></div>
              <span className={subject.change >= 0 ? "trend-up" : "trend-down"}>
                {subject.change >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {Math.abs(subject.change)}%
              </span>
            </div>
          ))}
        </DashboardCard>

        <DashboardCard>
          <div className="card-title-row">
            <div><span className="card-eyebrow">SIGNALS</span><h3>Academic signals</h3></div>
            <BrainCircuit size={18} />
          </div>

          <div className="signal-card">
            <div className="signal-card-icon danger"><TrendingDown size={16} /></div>
            <div><strong>Mathematics</strong><span>Performance needs review</span></div>
            <b>-2.4%</b>
          </div>

          <div className="signal-card">
            <div className="signal-card-icon success"><TrendingUp size={16} /></div>
            <div><strong>Computer Science</strong><span>Strong improvement</span></div>
            <b>+8.6%</b>
          </div>

          <div className="signal-card">
            <div className="signal-card-icon info"><Target size={16} /></div>
            <div><strong>6 students</strong><span>Below academic threshold</span></div>
            <b>Review</b>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

function AcademicsPage() {
  const academicCards = [
    ["Classes", "12", "Across 3 sections", GraduationCap],
    ["Subjects", "24", "Active subjects", BookOpen],
    ["Teachers", "38", "Faculty members", Users],
    ["Academic year", "2026–27", "Current session", CalendarDays]
  ];

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="ACADEMIC MANAGEMENT"
        title="Academics"
        text="Organize your school's academic structure."
        action={
          <button className="dashboard-primary"><Plus size={16} /> Add academic group</button>
        }
      />

      <div className="stat-grid">
        {academicCards.map(([label, value, text, Icon], index) => (
          <DashboardCard className="stat-card" key={label}>
            <div className="stat-card-top">
              <div className={`stat-icon ${["green", "blue", "purple", "orange"][index]}`}><Icon size={18} /></div>
            </div>
            <span className="stat-label">{label}</span>
            <strong className="small-value">{value}</strong>
            <p>{text}</p>
          </DashboardCard>
        ))}
      </div>

      <div className="academic-grid">
        {["9-A", "9-B", "9-C", "8-A", "8-B", "8-C"].map((className, index) => (
          <DashboardCard className="academic-class-card" key={className}>
            <div className="class-card-top">
              <div className="class-icon"><GraduationCap size={19} /></div>
              <MoreHorizontal size={18} />
            </div>
            <span>SECTION {index + 1}</span>
            <h3>{className}</h3>
            <p>{32 + index * 3} students · 8 subjects</p>
            <div className="class-card-footer">
              <span>Average performance</span>
              <strong>{72 + index * 2}%</strong>
            </div>
            <div className="mini-progress"><span style={{ width: `${72 + index * 2}%` }} /></div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}

function ExamsPage() {
  const exams = [
    ["Mid Term Examination", "15 Oct 2026", "9-A · 9-B · 9-C", "Scheduled"],
    ["Computer Science Test", "19 Oct 2026", "9-A", "Draft"],
    ["Mathematics Assessment", "22 Oct 2026", "9-B", "Scheduled"],
    ["Final Examination", "10 Dec 2026", "All classes", "Planning"]
  ];

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="EXAMINATIONS"
        title="Examinations"
        text="Create examination schedules and assessment structures."
        action={<button className="dashboard-primary"><Plus size={16} /> Create examination</button>}
      />

      <DashboardCard className="table-container">
        <div className="table-toolbar">
          <div><span className="card-eyebrow">EXAM SCHEDULE</span><h3>Upcoming examinations</h3></div>
          <button className="filter-button"><CalendarDays size={15} /> Calendar</button>
        </div>

        <div className="exam-list">
          {exams.map((exam, index) => (
            <div className="exam-row" key={exam[0]}>
              <div className="exam-date">
                <strong>{String(15 + index * 4).padStart(2, "0")}</strong>
                <span>OCT</span>
              </div>
              <div className="exam-info">
                <strong>{exam[0]}</strong>
                <span>{exam[1]} · {exam[2]}</span>
              </div>
              <span className={`exam-status ${exam[3].toLowerCase().replace(" ", "-")}`}>{exam[3]}</span>
              <button className="row-more"><MoreHorizontal size={17} /></button>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}

function ReportsPage() {
  const reports = [
    ["Student Performance Report", "Academic", "Generated today"],
    ["Monthly Attendance Report", "Attendance", "Generated yesterday"],
    ["Class 9 Results Summary", "Results", "Generated 2 days ago"],
    ["Academic Progress Report", "Analytics", "Generated 5 days ago"]
  ];

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="REPORTING"
        title="Reports"
        text="Generate and manage school academic reports."
        action={<button className="dashboard-primary"><FileText size={16} /> Create report</button>}
      />

      <div className="report-grid">
        {reports.map((report, index) => (
          <DashboardCard className="report-card" key={report[0]}>
            <div className="report-icon"><FileText size={19} /></div>
            <span>{report[1]}</span>
            <h3>{report[0]}</h3>
            <p>{report[2]}</p>
            <button>Open report <ArrowRight size={14} /></button>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm SchoolMarks Intelligence. Ask me anything about students, attendance, marks, results or academic performance."
    }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const analyze = (question) => {
    const q = question.toLowerCase();

    if (q.includes("attendance") && (q.includes("who") || q.includes("student") || q.includes("low"))) {
      return "I found 14 students below the 80% attendance threshold. The lowest attendance in this demo dataset is Zayan Sheikh at 73%.";
    }

    if (q.includes("attendance")) {
      return "Overall school attendance is 94.2%. Today's attendance is 93.1%, with 231 students present, 9 late and 8 absent.";
    }

    if (q.includes("attention") || q.includes("risk") || q.includes("struggling")) {
      return "6 students currently need academic attention. Zayan Sheikh has a 51% average, while Areeba Khan has a 58% average.";
    }

    if (q.includes("top") || q.includes("best") || q.includes("ranking")) {
      return "Based on the demo data, Hamza Raza has a 91% average, followed by Eman Noor at 88% and Ayaan Khan at 87%.";
    }

    if (q.includes("math") || q.includes("subject") || q.includes("weak")) {
      return "Mathematics currently has the lowest subject average in this demo at 67%, down 2.4% from the previous period.";
    }

    if (q.includes("computer")) {
      return "Computer Science is currently the strongest subject in the demo dataset with a 91% average and an 8.6% improvement.";
    }

    if (q.includes("class")) {
      return "The demo covers 12 academic groups. Class 9-A currently shows strong performance and 93%+ attendance.";
    }

    if (q.includes("result") || q.includes("marks")) {
      return "92 assessment records have been processed. The overall assessment average is 78.4%, with 6 records still pending.";
    }

    if (q.includes("student") || q.includes("total")) {
      return "SchoolMarks currently has 248 student records in the demo workspace across 12 academic groups.";
    }

    return "I can help analyze attendance, students, marks, results, rankings, subjects, classes and performance trends. Try asking a specific question.";
  };

  const ask = () => {
    if (!input.trim() || thinking) return;

    const question = input.trim();

    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { role: "ai", text: analyze(question) }
      ]);
      setThinking(false);
    }, 700);
  };

  const suggestions = [
    "Who needs attention?",
    "Show attendance issues",
    "Who is ranking first?",
    "Which subject is weakest?",
    "How are the results?"
  ];

  return (
    <div className="ai-page page-enter">
      <div className="ai-page-header">
        <div>
          <span className="page-eyebrow">SCHOOLMARKS INTELLIGENCE</span>
          <h1>Ask your school data.</h1>
          <p>Explore academic signals through a conversational intelligence layer.</p>
        </div>

        <div className="ai-status">
          <span><i /> Intelligence online</span>
          <small>Local demo engine</small>
        </div>
      </div>

      <div className="ai-workspace">
        <aside className="ai-sidebar">
          <div className="ai-sidebar-heading">
            <span>CONVERSATIONS</span>
            <button><Plus size={15} /></button>
          </div>

          <div className="ai-conversation active">
            <BrainCircuit size={15} />
            <div>
              <strong>Academic analysis</strong>
              <span>Current conversation</span>
            </div>
          </div>

          <div className="ai-conversation">
            <BarChart3 size={15} />
            <div>
              <strong>Performance review</strong>
              <span>Yesterday</span>
            </div>
          </div>

          <div className="ai-conversation">
            <CalendarDays size={15} />
            <div>
              <strong>Attendance analysis</strong>
              <span>Sep 15</span>
            </div>
          </div>

          <div className="ai-sidebar-bottom">
            <ShieldCheck size={15} />
            <span>Your demo data stays in this browser.</span>
          </div>
        </aside>

        <section className="ai-chat">
          <div className="ai-chat-top">
            <div className="ai-chat-brand">
              <div><BrainCircuit size={18} /></div>
              <div>
                <strong>SchoolMarks Intelligence</strong>
                <span>Academic analysis engine</span>
              </div>
            </div>
            <button><MoreHorizontal size={18} /></button>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={index}>
                {message.role === "ai" && (
                  <div className="chat-avatar"><Sparkles size={14} /></div>
                )}

                <div className="chat-bubble">
                  {message.text}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="chat-message ai">
                <div className="chat-avatar"><Sparkles size={14} /></div>
                <div className="chat-bubble thinking-bubble">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          <div className="ai-bottom">
            <div className="ai-suggestions">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setInput(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="ai-input-wrap">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") ask();
                }}
                placeholder="Ask a question about your school..."
              />
              <button onClick={ask} disabled={!input.trim() || thinking}>
                <ArrowRight size={17} />
              </button>
            </div>

            <span className="ai-disclaimer">
              SchoolMarks Intelligence is using demo browser-side data. Connect a secure AI backend for production use.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);

  return (
    <div className="dashboard-page page-enter">
      <PageHeader
        eyebrow="SYSTEM"
        title="Settings"
        text="Configure your SchoolMarks workspace."
      />

      <div className="settings-layout">
        <DashboardCard className="settings-card">
          <div className="settings-heading">
            <Settings size={18} />
            <div><h3>Workspace settings</h3><span>General school configuration</span></div>
          </div>

          <div className="settings-field">
            <label>School name</label>
            <input value="SchoolMarks Demo School" readOnly />
          </div>

          <div className="settings-field">
            <label>Academic year</label>
            <select defaultValue="2026-27">
              <option value="2026-27">2026–27</option>
              <option value="2025-26">2025–26</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Default performance threshold</label>
            <input value="60%" readOnly />
          </div>
        </DashboardCard>

        <DashboardCard className="settings-card">
          <div className="settings-heading">
            <Bell size={18} />
            <div><h3>Notifications</h3><span>Manage workspace alerts</span></div>
          </div>

          <ToggleRow
            title="Academic alerts"
            text="Receive alerts when student performance drops."
            value={aiInsights}
            onChange={() => setAiInsights(!aiInsights)}
          />

          <ToggleRow
            title="Attendance alerts"
            text="Get notified about attendance issues."
            value={notifications}
            onChange={() => setNotifications(!notifications)}
          />

          <ToggleRow
            title="Weekly summary"
            text="Receive a weekly academic summary."
            value={true}
            onChange={() => {}}
          />
        </DashboardCard>
      </div>
    </div>
  );
}

function ToggleRow({ title, text, value, onChange }) {
  return (
    <div className="toggle-row">
      <div><strong>{title}</strong><span>{text}</span></div>
      <button className={`toggle ${value ? "on" : ""}`} onClick={onChange}>
        <i />
      </button>
    </div>
  );
}

function DashboardShell({ page, setPage, onBack }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "students":
        return <StudentsPage />;
      case "academics":
        return <AcademicsPage />;
      case "exams":
        return <ExamsPage />;
      case "marks":
        return <MarksPage />;
      case "results":
        return <ResultsPage />;
      case "attendance":
        return <AttendancePage />;
      case "performance":
        return <PerformancePage />;
      case "ai":
        return <AIPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardHome navigate={setPage} />;
    }
  };

  return (
    <div className="app-shell">
      <aside className={`app-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <Logo />

          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={19} />
          </button>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="app-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={page === item.id ? "active" : ""}
                onClick={() => setPage(item.id)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === "ai" && <i className="nav-ai-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-label">SYSTEM</div>

        <nav className="app-nav">
          <button className={page === "reports" ? "active" : ""} onClick={() => setPage("reports")}>
            <FileText size={17} />
            <span>Reports</span>
          </button>
          <button className={page === "settings" ? "active" : ""} onClick={() => setPage("settings")}>
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-profile">
          <div className="profile-avatar">SA</div>
          <div>
            <strong>School Admin</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={15} />
        </div>
      </aside>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="app-content">
        <header className="app-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-button" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>

            <button className="back-home" onClick={onBack}>
              <ChevronLeft size={15} />
              Home
            </button>

            <div className="breadcrumb">
              <span>SchoolMarks</span>
              <ChevronRight size={13} />
              <strong>
                {navItems.find((item) => item.id === page)?.label ||
                  (page === "reports" ? "Reports" : page === "settings" ? "Settings" : "Overview")}
              </strong>
            </div>
          </div>

          <div className="topbar-right">
            <div className="global-search">
              <Search size={15} />
              <input placeholder="Search..." />
              <kbd>⌘ K</kbd>
            </div>

            <div className="notification-wrap">
              <button
                className="topbar-icon"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={18} />
                <i />
              </button>

              {notificationsOpen && (
                <div className="notification-panel">
                  <div className="notification-head">
                    <strong>Notifications</strong>
                    <span>3 new</span>
                  </div>
                  <div className="notification-item">
                    <div><AlertCircle size={15} /></div>
                    <p><strong>6 students</strong> need academic attention.</p>
                  </div>
                  <div className="notification-item">
                    <div><CalendarDays size={15} /></div>
                    <p>Attendance has been updated for <strong>9-A</strong>.</p>
                  </div>
                  <div className="notification-item">
                    <div><Sparkles size={15} /></div>
                    <p>New AI performance insight is available.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="topbar-user">
              <div className="topbar-avatar">SA</div>
              <div>
                <strong>School Admin</strong>
                <span>Admin</span>
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <main className="app-main">
          {renderPage()}
        </main>

        <footer className="app-footer">
          <span>SchoolMarks · Academic Year 2026–27</span>
          <span>Local demo workspace</span>
        </footer>
      </div>
    </div>
  );
}

function useInView() {
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
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function LandingDashboardPreview() {
  return (
    <div className="product-window landing-preview">
      <div className="window-top">
        <div className="window-dots"><i /><i /><i /></div>
        <div className="window-url">app.schoolmarks.local/dashboard</div>
        <div className="live-status is-live"><span /> Live</div>
      </div>

      <div className="landing-preview-body">
        <aside>
          <div className="preview-logo"><span>S</span> SchoolMarks</div>
          {["Overview", "Students", "Academics", "Exams", "Marks", "Results", "Attendance", "Performance"].map((item, index) => (
            <div className={`preview-nav ${index === 0 ? "active" : ""}`} key={item}>
              <span />
              {item}
            </div>
          ))}
        </aside>

        <div className="preview-main">
          <div className="preview-header">
            <div><span>School overview</span><strong>Good evening, Admin.</strong></div>
            <div className="preview-user">SA</div>
          </div>

          <div className="preview-stat-grid">
            <div><span>Students</span><strong>248</strong><small>+8.2%</small></div>
            <div><span>Attendance</span><strong>94.2%</strong><small>Healthy</small></div>
            <div><span>Performance</span><strong>82.7%</strong><small>+6.4%</small></div>
          </div>

          <div className="preview-content-grid">
            <div className="preview-chart">
              <span>Performance trend</span>
              <strong>82.7%</strong>
              <MiniChart />
            </div>
            <div className="preview-ring-card">
              <span>Attendance health</span>
              <ProgressRing value={94} />
            </div>
          </div>

          <div className="preview-ai">
            <div><Sparkles size={13} /><span>SchoolMarks Intelligence</span></div>
            <strong>6 students need additional attention.</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ onOpenDashboard }) {
  const [heroRef, heroVisible] = useInView();
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const studentsCount = useCountUp(248, 1200, heroVisible);
  const groupsCount = useCountUp(12, 1000, heroVisible);
  const performanceCount = useCountUp(83, 1100, heroVisible);

  return (
    <div className="site">
      <nav className="public-nav">
        <div className="container nav-inner">
          <Logo />

          <div className={`nav-links ${mobileMenu ? "mobile-open" : ""}`}>
            <button onClick={() => scrollTo("features")}>Platform</button>
            <button onClick={() => scrollTo("workflow")}>How it works</button>
            <button onClick={() => scrollTo("intelligence")}>Intelligence</button>
            <button onClick={() => scrollTo("about")}>Why SchoolMarks</button>
          </div>

          <div className="nav-actions">
            <button className="nav-login" onClick={onOpenDashboard}>
              Open platform
            </button>
            <button className="nav-menu" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" ref={heroRef}>
          <div className="hero-grid" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="container hero-container">
            <div className={`hero-copy ${heroVisible ? "visible" : ""}`}>
              <div className="hero-eyebrow">
                <span className="status-dot" />
                Built for modern schools
              </div>

              <h1>
                The intelligence layer
                <span> for modern schools.</span>
              </h1>

              <p>
                Students, academics, attendance, examinations and performance —
                connected in one school management platform.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={onOpenDashboard}>
                  Open SchoolMarks
                  <ArrowRight size={17} />
                </button>

                <button className="secondary-button" onClick={() => scrollTo("workflow")}>
                  Explore the platform
                </button>
              </div>

              <div className="hero-trust">
                <div>
                  <strong>{studentsCount}+</strong>
                  <span>Student records</span>
                </div>
                <div>
                  <strong>{groupsCount}</strong>
                  <span>Academic groups</span>
                </div>
                <div>
                  <strong>{performanceCount}%</strong>
                  <span>Demo performance</span>
                </div>
              </div>
            </div>

            <div className={`hero-product ${heroVisible ? "visible" : ""}`}>
              <div className="hero-product-glow" />
              <div className="floating-pill pill-top">
                <Sparkles size={14} />
                <span>Live intelligence</span>
              </div>

              <LandingDashboardPreview />

              <div className="floating-pill pill-bottom">
                <TrendingUp size={14} />
                <span>Performance +6.4%</span>
              </div>
            </div>
          </div>

          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="scroll-line"><i /></div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <span>ONE PLATFORM FOR</span>
            <div>
              <span>Schools</span>
              <span>Academics</span>
              <span>Examinations</span>
              <span>Attendance</span>
              <span>Performance</span>
              <span>Results</span>
            </div>
          </div>
        </section>

        <section className="problem-section section">
          <div className="container">
            <div className="problem-layout visible">
              <div className="section-copy">
                <span className="section-kicker">THE PROBLEM</span>
                <h2>
                  School data shouldn't
                  <span> live everywhere.</span>
                </h2>
                <p>
                  Paper registers, scattered spreadsheets, manual calculations
                  and disconnected attendance records make simple academic
                  decisions harder than they should be.
                </p>

                <div className="problem-list">
                  {[
                    ["01", "Paper registers", "Information gets trapped in physical records."],
                    ["02", "Scattered spreadsheets", "Different files create different versions of the truth."],
                    ["03", "Manual calculations", "Results take unnecessary time to prepare."],
                    ["04", "No performance visibility", "Important student signals stay hidden."]
                  ].map(([number, title, text]) => (
                    <div className="problem-item" key={number}>
                      <span>{number}</span>
                      <div>
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="problem-visual">
                <div className="scattered-card card-paper"><FileText size={18} /><span>Attendance Register</span><small>38 pages</small></div>
                <div className="scattered-card card-sheet"><BarChart3 size={18} /><span>Marks.xlsx</span><small>Last edited yesterday</small></div>
                <div className="scattered-card card-notice"><Bell size={18} /><span>Teacher message</span><small>“Which students are below 60%?”</small></div>
                <div className="convergence">
                  <div className="convergence-ring"><div><Sparkles size={22} /></div></div>
                  <span>SchoolMarks</span>
                  <strong>One connected system</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="solution-section section" id="features">
          <div className="container">
            <div className="section-heading visible">
              <div>
                <span className="section-kicker">THE SOLUTION</span>
                <h2>
                  One platform.
                  <span> Every school workflow.</span>
                </h2>
              </div>
              <p>
                SchoolMarks connects the everyday operations of a school so
                your team can spend less time managing data and more time using it.
              </p>
            </div>

            <div className="module-grid visible">
              {[
                [Users, "Student Management", "Keep student profiles, classes, sections and academic records connected."],
                [BookOpen, "Academic Management", "Organize subjects, classes and academic structures from one place."],
                [ClipboardCheck, "Examinations", "Create examinations, schedules and assessment structures without spreadsheets."],
                [BarChart3, "Marks & Results", "Enter marks once and turn them into calculated results automatically."],
                [UserCheck, "Attendance Intelligence", "Track attendance patterns and quickly identify students needing attention."],
                [LineChart, "Performance Analytics", "See class trends, subject performance, rankings and academic signals."]
              ].map(([Icon, title, text], index) => (
                <div className="module-card" key={title}>
                  <div className="module-number">0{index + 1}</div>
                  <div className="module-icon"><Icon size={20} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="module-arrow"><ArrowRight size={15} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow-section section" id="workflow">
          <div className="container workflow-container">
            <div className="workflow-intro">
              <span className="section-kicker">THE SCHOOLMARKS FLOW</span>
              <h2>Your school data should <span>move with you.</span></h2>
              <p>
                Every academic workflow connects inside one system — from setup
                to attendance, marks and intelligence.
              </p>
            </div>

            <div className="workflow-simple-grid">
              {[
                ["01", "Add your school", GraduationCap],
                ["02", "Configure academics", BookOpen],
                ["03", "Manage students", Users],
                ["04", "Record attendance", CalendarDays],
                ["05", "Enter marks", ClipboardCheck],
                ["06", "Generate intelligence", BrainCircuit]
              ].map(([number, title, Icon]) => (
                <div className="workflow-simple-card" key={number}>
                  <span>{number}</span>
                  <div><Icon size={19} /></div>
                  <h3>{title}</h3>
                  <ArrowRight size={15} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intelligence-section section" id="intelligence">
          <div className="container">
            <div className="intelligence-header visible">
              <span className="section-kicker">SCHOOLMARKS INTELLIGENCE</span>
              <h2>Your data already knows <span>more than you think.</span></h2>
              <p>
                Ask questions about students, attendance, marks and performance
                through the built-in intelligence layer.
              </p>
            </div>

            <div className="landing-ai-preview">
              <div className="landing-ai-left">
                <div className="ai-small-icon"><BrainCircuit size={20} /></div>
                <span>SchoolMarks Intelligence</span>
                <h3>Ask your school data a question.</h3>
                <p>
                  Get useful academic signals from structured school data in seconds.
                </p>
                <button className="primary-button" onClick={onOpenDashboard}>
                  Open AI Intelligence
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="landing-ai-chat">
                <div className="chat-demo-row user">Who needs attention?</div>
                <div className="chat-demo-row ai"><Sparkles size={14} /> 6 students need academic attention.</div>
                <div className="chat-demo-row user">Which subject is weakest?</div>
                <div className="chat-demo-row ai"><Sparkles size={14} /> Mathematics currently has a 67% average.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="compare-section section" id="about">
          <div className="container">
            <div className="compare-heading visible">
              <span className="section-kicker">THE DIFFERENCE</span>
              <h2>Stop managing school data. <span>Start using it.</span></h2>
            </div>

            <div className="comparison visible">
              <div className="comparison-column traditional">
                <div className="comparison-header"><span>Traditional</span><small>Fragmented</small></div>
                {["Paper registers and spreadsheets", "Manual calculations", "Separate attendance records", "Delayed result preparation", "Limited performance visibility", "Data scattered across files"].map((item) => (
                  <div className="comparison-row" key={item}><X size={15} /><span>{item}</span></div>
                ))}
              </div>

              <div className="comparison-center">
                <div className="comparison-logo"><img src="/logo/schoolmarks-logo.png" alt="" /></div>
                <span>vs</span>
              </div>

              <div className="comparison-column modern">
                <div className="comparison-header"><span>SchoolMarks</span><small>Connected</small></div>
                {["Digital student records", "Automatic calculations", "Unified attendance intelligence", "Instant result preparation", "Performance analytics", "One connected academic system"].map((item) => (
                  <div className="comparison-row" key={item}><Check size={15} /><span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-grid" />
              <div className="cta-copy">
                <span className="section-kicker">READY WHEN YOU ARE</span>
                <h2>Your school already has <span>the data.</span></h2>
                <p>SchoolMarks turns that data into a connected academic experience.</p>
                <button className="primary-button light-button" onClick={onOpenDashboard}>
                  Open SchoolMarks
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="cta-product">
                <div className="cta-mini-card"><BrainCircuit size={18} /><div><span>Intelligence</span><strong>6 students need attention</strong></div></div>
                <div className="cta-mini-card"><TrendingUp size={18} /><div><span>Performance</span><strong>+6.4% this term</strong></div></div>
                <div className="cta-mini-card"><ClipboardCheck size={18} /><div><span>Results</span><strong>92 assessments processed</strong></div></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <div className="footer-copy">
            <span>SchoolMarks</span>
            <p>Connected school management for modern academic teams.</p>
          </div>
          <span className="footer-year">© 2026 SchoolMarks</span>
        </div>
      </footer>
    </div>
  );
}

function AccessModal({ onClose, onEnter }) {
  const [loading, setLoading] = useState(false);

  const enter = () => {
    setLoading(true);

    setTimeout(() => {
      onEnter();
    }, 550);
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="access-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>

        <div className="modal-icon"><LayoutDashboard size={22} /></div>

        <span className="section-kicker">SCHOOLMARKS PLATFORM</span>
        <h2>Open your school workspace.</h2>
        <p>Continue into the management platform and explore your academic dashboard.</p>

        <div className="access-preview">
          <div><span>Workspace</span><strong>School Admin</strong></div>
          <div><span>Academic year</span><strong>2026–27</strong></div>
          <Check size={17} />
        </div>

        <button className="primary-button modal-button" onClick={enter}>
          {loading ? "Opening workspace..." : "Continue to platform"}
          {!loading && <ArrowRight size={17} />}
        </button>

        <span className="modal-note">Your demo data remains stored locally in this browser.</span>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [access, setAccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  if (page === "dashboard") {
    return (
      <DashboardShell
        page="dashboard"
        setPage={setPage}
        onBack={() => setPage("home")}
      />
    );
  }

  if (
    [
      "students",
      "academics",
      "exams",
      "marks",
      "results",
      "attendance",
      "performance",
      "ai",
      "reports",
      "settings"
    ].includes(page)
  ) {
    return (
      <DashboardShell
        page={page}
        setPage={setPage}
        onBack={() => setPage("home")}
      />
    );
  }

  return (
    <>
      <Home onOpenDashboard={() => setAccess(true)} />

      {access && (
        <AccessModal
          onClose={() => setAccess(false)}
          onEnter={() => {
            setAccess(false);
            setPage("dashboard");
          }}
        />
      )}
    </>
  );
}