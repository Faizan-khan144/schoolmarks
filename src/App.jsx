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
  { name: "Ayaan Khan", className: "9-A", average: 87, attendance: 96, status: "On track" },
  { name: "Hania Ahmed", className: "9-A", average: 82, attendance: 93, status: "On track" },
  { name: "Rayyan Ali", className: "9-B", average: 74, attendance: 88, status: "Stable" },
  { name: "Maham Noor", className: "9-B", average: 69, attendance: 84, status: "Stable" },
  { name: "Zayan Sheikh", className: "9-A", average: 51, attendance: 73, status: "Attention" },
  { name: "Areeba Khan", className: "9-B", average: 58, attendance: 78, status: "Attention" },
  { name: "Hamza Ahmed", className: "9-A", average: 91, attendance: 97, status: "Excellent" },
  { name: "Eman Fatima", className: "9-B", average: 79, attendance: 91, status: "Stable" }
];

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "exams", label: "Examinations", icon: ClipboardCheck },
  { id: "attendance", label: "Attendance", icon: CalendarDays },
  { id: "marks", label: "Marks & Results", icon: Award },
  { id: "performance", label: "Performance", icon: LineChart },
  { id: "reports", label: "Reports", icon: FileText }
];

const subjects = [
  { name: "Mathematics", average: 68, trend: -4 },
  { name: "Computer Science", average: 91, trend: 8 },
  { name: "English", average: 82, trend: 5 },
  { name: "Science", average: 76, trend: 2 },
  { name: "Urdu", average: 79, trend: 3 }
];

const exams = [
  { name: "Mid Term Examination", date: "14 Oct 2026", classes: "9-A, 9-B", status: "Upcoming" },
  { name: "Computer Science Quiz", date: "18 Oct 2026", classes: "9-A", status: "Scheduled" },
  { name: "Monthly Assessment", date: "24 Oct 2026", classes: "9-A, 9-B", status: "Draft" },
  { name: "Final Term Examination", date: "12 Dec 2026", classes: "All Classes", status: "Planned" }
];

const attendanceData = [
  { day: "Mon", value: 91 },
  { day: "Tue", value: 95 },
  { day: "Wed", value: 89 },
  { day: "Thu", value: 94 },
  { day: "Fri", value: 96 },
  { day: "Sat", value: 88 }
];

const aiAnswers = {
  attention:
    "6 students need attention. Zayan Sheikh has a 51% academic average with 73% attendance, while Areeba Khan is currently at 58% with 78% attendance.",
  attendance:
    "Overall attendance in the demo dataset is 86.9%. Two students are below the 80% attention threshold.",
  ranking:
    "Hamza Ahmed currently has the highest demo academic average at 91%, followed by Ayaan Khan at 87% and Hania Ahmed at 82%.",
  mathematics:
    "Mathematics currently has the lowest subject average at 68%. The trend is down 4% compared with the previous assessment period.",
  performance:
    "The overall demo performance is 78.4%. Computer Science is the strongest subject at 91%, while Mathematics needs additional attention.",
  results:
    "92 assessment records have been processed. The current assessment average is 78.4%, with performance improving across several recent assessments.",
  students:
    "There are 248 students across 12 academic groups in this demo workspace.",
  default:
    "I can analyze students, attendance, marks, performance, rankings, subjects and results. Try asking a specific question."
};

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
      { threshold: 0.12, ...options }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function useCountUp(target, duration = 1200, active = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start;
    let frame;

    const animate = (timestamp) => {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
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

function Logo({ dark = false }) {
  return (
    <div className={`brand ${dark ? "brand-dark" : ""}`}>
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

function MiniChart({ height = 180 }) {
  return (
    <div className="dashboard-chart" style={{ minHeight: height }}>
      <svg viewBox="0 0 700 240" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(47,125,80,.25)" />
            <stop offset="100%" stopColor="rgba(47,125,80,0)" />
          </linearGradient>
        </defs>
        {[45, 90, 135, 180, 225].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="700"
            y2={y}
            stroke="rgba(23,44,34,.08)"
            strokeDasharray="4 6"
          />
        ))}
        <path
          d="M0 190 C50 184 65 161 105 170 C150 180 165 137 215 147 C255 155 280 120 325 129 C370 139 385 102 430 110 C475 118 500 78 545 91 C590 104 615 58 650 70 C670 76 685 55 700 48 L700 240 L0 240 Z"
          fill="url(#chartFill)"
        />
        <path
          d="M0 190 C50 184 65 161 105 170 C150 180 165 137 215 147 C255 155 280 120 325 129 C370 139 385 102 430 110 C475 118 500 78 545 91 C590 104 615 58 650 70 C670 76 685 55 700 48"
          fill="none"
          stroke="#2f7d50"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="700" cy="48" r="6" fill="#2f7d50" />
      </svg>

      <div className="chart-labels">
        {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProgressRing({ value = 94 }) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-ring">
      <svg viewBox="0 0 100 100">
        <circle className="ring-bg" cx="50" cy="50" r="42" />
        <circle
          className="ring-value"
          cx="50"
          cy="50"
          r="42"
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

function DashboardStat({ icon: Icon, label, value, change, negative = false }) {
  return (
    <div className="dash-stat">
      <div className="dash-stat-top">
        <div className="dash-stat-icon">
          <Icon size={18} />
        </div>
        <span className={negative ? "stat-down" : "stat-up"}>
          {negative ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
          {change}
        </span>
      </div>
      <span className="dash-stat-label">{label}</span>
      <strong>{value}</strong>
      <small>vs previous period</small>
    </div>
  );
}

function Panel({ title, eyebrow, action, children, className = "" }) {
  return (
    <div className={`dash-panel ${className}`}>
      <div className="panel-header">
        <div>
          {eyebrow && <span>{eyebrow}</span>}
          <h3>{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function DashboardOverview({ onNavigate }) {
  const studentsCount = useCountUp(248, 1100, true);
  const attendanceCount = useCountUp(94, 1000, true);
  const performanceCount = useCountUp(82, 1000, true);

  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">SCHOOL OVERVIEW</span>
          <h1>Good evening, Faizan.</h1>
          <p>Here’s what’s happening across your school today.</p>
        </div>
        <div className="heading-actions">
          <button className="ghost-button">
            <CalendarDays size={16} />
            Academic Year 2026–27
            <ChevronDown size={14} />
          </button>
          <button className="green-button">
            <Plus size={16} />
            Add record
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <DashboardStat icon={Users} label="Total Students" value={`${studentsCount}`} change="+8.2%" />
        <DashboardStat icon={CalendarDays} label="Attendance" value={`${attendanceCount}%`} change="+2.4%" />
        <DashboardStat icon={TrendingUp} label="Performance" value={`${performanceCount}.7%`} change="+6.4%" />
        <DashboardStat icon={ClipboardCheck} label="Assessments" value="92" change="+12.8%" />
      </div>

      <div className="dashboard-main-grid">
        <Panel
          title="Academic performance"
          eyebrow="PERFORMANCE TREND"
          className="performance-panel"
          action={
            <button className="panel-action">
              Last 6 exams <ChevronDown size={13} />
            </button>
          }
        >
          <div className="big-chart-value">
            <strong>82.7%</strong>
            <span><TrendingUp size={14} /> 6.4% increase</span>
          </div>
          <MiniChart />
        </Panel>

        <Panel title="Attendance health" eyebrow="LIVE SNAPSHOT">
          <div className="attendance-center">
            <ProgressRing value={94} />
            <div className="attendance-breakdown">
              <div><span className="status-dot-green" /><strong>Present</strong><b>234</b></div>
              <div><span className="status-dot-yellow" /><strong>Late</strong><b>8</b></div>
              <div><span className="status-dot-red" /><strong>Absent</strong><b>6</b></div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="dashboard-bottom-grid">
        <Panel
          title="Recent students"
          eyebrow="STUDENT PERFORMANCE"
          className="students-panel"
          action={
            <button className="text-action" onClick={() => onNavigate("students")}>
              View all <ArrowRight size={14} />
            </button>
          }
        >
          <div className="student-list">
            {students.slice(0, 5).map((student) => (
              <div className="student-list-row" key={student.name}>
                <div className="student-avatar-large">
                  {student.name.charAt(0)}
                </div>
                <div className="student-list-name">
                  <strong>{student.name}</strong>
                  <span>{student.className}</span>
                </div>
                <div className="student-progress">
                  <div><span style={{ width: `${student.average}%` }} /></div>
                </div>
                <strong className="student-average">{student.average}%</strong>
                <span className={`student-status ${student.average < 60 ? "risk" : ""}`}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="SchoolMarks Intelligence"
          eyebrow="AI SIGNAL"
          className="insight-panel"
          action={<div className="ai-live"><span /> Live</div>}
        >
          <div className="insight-main">
            <div className="insight-orb">
              <BrainCircuit size={25} />
            </div>
            <h4>6 students may need additional attention.</h4>
            <p>
              Performance and attendance patterns indicate students that could
              benefit from follow-up.
            </p>
            <button onClick={() => onNavigate("ai")}>
              Ask Intelligence <ArrowRight size={15} />
            </button>
          </div>
          <div className="insight-tags">
            <span>Performance</span>
            <span>Attendance</span>
            <span>Risk signals</span>
          </div>
        </Panel>
      </div>

      <div className="quick-actions">
        <button onClick={() => onNavigate("students")}><Users size={17} /> Manage students</button>
        <button onClick={() => onNavigate("attendance")}><CalendarDays size={17} /> Record attendance</button>
        <button onClick={() => onNavigate("marks")}><Award size={17} /> Enter marks</button>
        <button onClick={() => onNavigate("ai")}><Sparkles size={17} /> Ask AI</button>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  const filtered = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === "All" || student.className === classFilter;
      return matchesSearch && matchesClass;
    });
  }, [search, classFilter]);

  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">STUDENT MANAGEMENT</span>
          <h1>Students</h1>
          <p>Manage student profiles, academic groups and performance records.</p>
        </div>
        <button className="green-button"><Plus size={16} /> Add student</button>
      </div>

      <div className="mini-stat-row">
        <div><Users size={17} /><span>Total students</span><strong>248</strong></div>
        <div><GraduationCap size={17} /><span>Academic groups</span><strong>12</strong></div>
        <div><Target size={17} /><span>Need attention</span><strong>6</strong></div>
        <div><ShieldCheck size={17} /><span>Active records</span><strong>248</strong></div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." />
        </div>
        <div className="filter-buttons">
          {["All", "9-A", "9-B"].map((item) => (
            <button
              key={item}
              className={classFilter === item ? "active" : ""}
              onClick={() => setClassFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="ghost-button"><Download size={15} /> Export</button>
      </div>

      <div className="data-table-panel">
        <div className="data-table-head">
          <span>Student</span>
          <span>Class</span>
          <span>Average</span>
          <span>Attendance</span>
          <span>Status</span>
          <span />
        </div>

        {filtered.map((student, index) => (
          <div className="data-table-row" key={student.name}>
            <div className="table-student">
              <div className="student-avatar-large">{student.name.charAt(0)}</div>
              <div><strong>{student.name}</strong><span>STU-2026-{String(index + 1).padStart(3, "0")}</span></div>
            </div>
            <span>{student.className}</span>
            <strong>{student.average}%</strong>
            <div className="table-progress">
              <span>{student.attendance}%</span>
              <div><i style={{ width: `${student.attendance}%` }} /></div>
            </div>
            <span className={`table-status ${student.average < 60 ? "warning" : "success"}`}>
              {student.status}
            </span>
            <button className="icon-button"><MoreHorizontal size={17} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AcademicsPage() {
  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">ACADEMIC MANAGEMENT</span>
          <h1>Academics</h1>
          <p>Organize classes, sections and subjects from one connected workspace.</p>
        </div>
        <button className="green-button"><Plus size={16} /> Add subject</button>
      </div>

      <div className="academic-overview">
        <div className="academic-card large">
          <div className="academic-card-icon"><GraduationCap size={20} /></div>
          <span>Active classes</span>
          <strong>12</strong>
          <small>Across current academic year</small>
        </div>
        <div className="academic-card">
          <div className="academic-card-icon"><BookOpen size={20} /></div>
          <span>Subjects</span>
          <strong>24</strong>
          <small>Configured subjects</small>
        </div>
        <div className="academic-card">
          <div className="academic-card-icon"><Users size={20} /></div>
          <span>Sections</span>
          <strong>18</strong>
          <small>Active sections</small>
        </div>
      </div>

      <Panel title="Subject performance" eyebrow="ACADEMIC SIGNALS">
        <div className="subject-list">
          {subjects.map((subject) => (
            <div className="subject-row" key={subject.name}>
              <div className="subject-name">
                <div>{subject.name.charAt(0)}</div>
                <strong>{subject.name}</strong>
              </div>
              <div className="subject-bar">
                <span style={{ width: `${subject.average}%` }} />
              </div>
              <strong>{subject.average}%</strong>
              <span className={subject.trend < 0 ? "trend-negative" : "trend-positive"}>
                {subject.trend > 0 ? "+" : ""}{subject.trend}%
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="class-grid">
        {["9-A", "9-B", "8-A", "8-B", "7-A", "7-B"].map((item, index) => (
          <div className="class-card" key={item}>
            <div className="class-card-top">
              <div className="class-symbol">{item.replace("-", "")}</div>
              <MoreHorizontal size={17} />
            </div>
            <span>Class {item}</span>
            <strong>{index % 2 === 0 ? 42 : 39} students</strong>
            <small>{index % 2 === 0 ? 5 : 4} subjects configured</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsPage() {
  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">ASSESSMENTS</span>
          <h1>Examinations</h1>
          <p>Create, schedule and monitor academic assessments.</p>
        </div>
        <button className="green-button"><Plus size={16} /> Create examination</button>
      </div>

      <div className="exam-summary">
        <div><ClipboardCheck size={18} /><span>Upcoming</span><strong>3</strong></div>
        <div><Clock3 size={18} /><span>Scheduled</span><strong>7</strong></div>
        <div><CheckCircle2 size={18} /><span>Completed</span><strong>18</strong></div>
        <div><FileText size={18} /><span>Drafts</span><strong>2</strong></div>
      </div>

      <Panel title="Examination schedule" eyebrow="2026–27 ACADEMIC YEAR">
        <div className="exam-list">
          {exams.map((exam) => (
            <div className="exam-row" key={exam.name}>
              <div className="exam-icon"><ClipboardCheck size={18} /></div>
              <div className="exam-info">
                <strong>{exam.name}</strong>
                <span>{exam.classes}</span>
              </div>
              <div className="exam-date"><CalendarDays size={14} />{exam.date}</div>
              <span className={`exam-status ${exam.status.toLowerCase()}`}>{exam.status}</span>
              <button className="icon-button"><MoreHorizontal size={17} /></button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function AttendancePage() {
  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">ATTENDANCE INTELLIGENCE</span>
          <h1>Attendance</h1>
          <p>Track attendance patterns and identify students needing follow-up.</p>
        </div>
        <button className="green-button"><Plus size={16} /> Record attendance</button>
      </div>

      <div className="attendance-page-grid">
        <Panel title="Overall attendance" eyebrow="CURRENT PERIOD">
          <div className="attendance-page-ring">
            <ProgressRing value={94} />
            <div>
              <strong>Healthy attendance</strong>
              <p>Attendance is above the school attention threshold.</p>
              <span><TrendingUp size={14} /> +2.4% this month</span>
            </div>
          </div>
        </Panel>

        <Panel title="Weekly trend" eyebrow="LAST 6 DAYS">
          <div className="attendance-bars">
            {attendanceData.map((item) => (
              <div key={item.day}>
                <div className="attendance-bar-track">
                  <span style={{ height: `${item.value}%` }} />
                </div>
                <strong>{item.value}%</strong>
                <small>{item.day}</small>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Attendance attention list" eyebrow="FOLLOW-UP REQUIRED">
        <div className="attention-list">
          {students.filter((student) => student.attendance < 80).map((student) => (
            <div key={student.name}>
              <div className="student-avatar-large">{student.name.charAt(0)}</div>
              <div className="attention-person"><strong>{student.name}</strong><span>{student.className}</span></div>
              <div className="attention-value"><strong>{student.attendance}%</strong><span>Attendance</span></div>
              <span className="attention-badge"><AlertCircle size={13} /> Follow up</span>
              <button className="text-action">View profile <ArrowRight size={14} /></button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function MarksPage() {
  const [selectedClass, setSelectedClass] = useState("9-A");

  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">MARKS & RESULTS</span>
          <h1>Results workspace</h1>
          <p>Enter marks and turn assessment data into calculated results.</p>
        </div>
        <button className="green-button"><Download size={16} /> Export results</button>
      </div>

      <div className="result-controls">
        <button className="select-control">{selectedClass}<ChevronDown size={14} /></button>
        <button className="select-control">Mid Term Examination <ChevronDown size={14} /></button>
        <button className="select-control">All Subjects <ChevronDown size={14} /></button>
      </div>

      <div className="result-stat-grid">
        <div><span>Class average</span><strong>78.4%</strong><small><TrendingUp size={13} /> +5.8%</small></div>
        <div><span>Highest score</span><strong>96%</strong><small>Hamza Ahmed</small></div>
        <div><span>Pass rate</span><strong>91%</strong><small>38 of 42 students</small></div>
        <div><span>Records processed</span><strong>92</strong><small>Updated today</small></div>
      </div>

      <Panel title="Assessment results" eyebrow={`${selectedClass} · MID TERM`}>
        <div className="marks-table">
          <div className="marks-head"><span>Student</span><span>Math</span><span>Science</span><span>English</span><span>Computer</span><span>Average</span></div>
          {students.slice(0, 6).map((student) => {
            const values = [
              Math.max(40, student.average - 4),
              Math.min(98, student.average + 2),
              Math.min(98, student.average + 1),
              Math.min(100, student.average + 7)
            ];
            const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

            return (
              <div className="marks-row" key={student.name}>
                <div className="marks-person"><div className="student-avatar-large">{student.name.charAt(0)}</div><strong>{student.name}</strong></div>
                {values.map((value, i) => <span key={i}>{value}%</span>)}
                <strong>{avg}%</strong>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function PerformancePage() {
  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">PERFORMANCE ANALYTICS</span>
          <h1>Performance</h1>
          <p>See class trends, subject signals and academic movement over time.</p>
        </div>
        <button className="ghost-button"><Download size={15} /> Download report</button>
      </div>

      <div className="performance-stat-grid">
        <div><TrendingUp size={18} /><span>Overall average</span><strong>82.7%</strong><small>+6.4% from previous period</small></div>
        <div><Award size={18} /><span>Top performer</span><strong>Hamza Ahmed</strong><small>91% academic average</small></div>
        <div><Target size={18} /><span>Attention group</span><strong>6 students</strong><small>Below defined threshold</small></div>
      </div>

      <Panel title="Performance trend" eyebrow="ACADEMIC YEAR 2026–27">
        <MiniChart height={300} />
      </Panel>

      <div className="performance-bottom">
        <Panel title="Subject signals" eyebrow="CURRENT PERFORMANCE">
          <div className="signal-subjects">
            {subjects.map((subject) => (
              <div key={subject.name}>
                <div><strong>{subject.name}</strong><span>{subject.average}%</span></div>
                <div className="signal-track"><i style={{ width: `${subject.average}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Performance distribution" eyebrow="STUDENT GROUPS">
          <div className="distribution">
            <div><span>90–100</span><i style={{ width: "28%" }} /><strong>28%</strong></div>
            <div><span>80–89</span><i style={{ width: "31%" }} /><strong>31%</strong></div>
            <div><span>70–79</span><i style={{ width: "22%" }} /><strong>22%</strong></div>
            <div><span>60–69</span><i style={{ width: "13%" }} /><strong>13%</strong></div>
            <div><span>Below 60</span><i style={{ width: "6%" }} /><strong>6%</strong></div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ReportsPage() {
  const reports = [
    ["Student Performance Report", "Academic performance across classes and subjects", "Updated today"],
    ["Attendance Summary", "Monthly attendance and follow-up signals", "Updated yesterday"],
    ["Examination Results", "Assessment results and class averages", "Updated 2 days ago"],
    ["Academic Progress", "Longitudinal performance trends", "Updated this week"]
  ];

  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-kicker">REPORTING</span>
          <h1>Reports</h1>
          <p>Generate clean academic reports from connected school data.</p>
        </div>
        <button className="green-button"><Plus size={16} /> Create report</button>
      </div>

      <div className="report-grid">
        {reports.map(([title, text, date], index) => (
          <div className="report-card" key={title}>
            <div className="report-card-icon">
              {[BarChart3, CalendarDays, Award, LineChart][index]({ size: 20 })}
            </div>
            <span>REPORT 0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="report-card-bottom">
              <small>{date}</small>
              <button><Download size={14} /> Export</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPage() {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Hello. I'm SchoolMarks Intelligence. Ask me anything about students, attendance, marks, performance or results."
    }
  ]);

  const getAnswer = (question) => {
    const q = question.toLowerCase();

    if (q.includes("attention") || q.includes("risk") || q.includes("struggling")) return aiAnswers.attention;
    if (q.includes("attendance") || q.includes("absent") || q.includes("present")) return aiAnswers.attendance;
    if (q.includes("ranking") || q.includes("rank") || q.includes("top") || q.includes("best")) return aiAnswers.ranking;
    if (q.includes("math") || q.includes("weak subject")) return aiAnswers.mathematics;
    if (q.includes("performance") || q.includes("average")) return aiAnswers.performance;
    if (q.includes("result") || q.includes("marks") || q.includes("exam")) return aiAnswers.results;
    if (q.includes("student") || q.includes("how many")) return aiAnswers.students;

    return aiAnswers.default;
  };

  const ask = (question = input) => {
    if (!question.trim() || thinking) return;

    setMessages((current) => [
      ...current,
      { type: "user", text: question }
    ]);

    setInput("");
    setThinking(true);

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { type: "assistant", text: getAnswer(question) }
      ]);
      setThinking(false);
    }, 700);
  };

  const suggestions = [
    "Who needs attention?",
    "Show attendance",
    "Who is ranking first?",
    "Which subject is weakest?",
    "How is performance?",
    "Show latest results"
  ];

  return (
    <div className="workspace-page ai-workspace">
      <div className="page-heading ai-page-heading">
        <div>
          <span className="page-kicker">SCHOOLMARKS INTELLIGENCE</span>
          <h1>Ask your school data.</h1>
          <p>Explore academic signals through a conversational intelligence layer.</p>
        </div>
        <div className="ai-status">
          <span />
          Intelligence online
        </div>
      </div>

      <div className="ai-layout">
        <aside className="ai-sidebar">
          <div className="ai-sidebar-title">
            <Sparkles size={16} />
            <span>Suggested questions</span>
          </div>

          {suggestions.map((item) => (
            <button key={item} onClick={() => ask(item)}>
              <ArrowRight size={14} />
              {item}
            </button>
          ))}

          <div className="ai-data-card">
            <div><BrainCircuit size={17} /></div>
            <strong>Connected data</strong>
            <span>248 students · 12 groups · 92 assessments</span>
          </div>
        </aside>

        <section className="ai-chat">
          <div className="ai-chat-header">
            <div className="ai-avatar">
              <BrainCircuit size={19} />
            </div>
            <div>
              <strong>SchoolMarks Intelligence</strong>
              <span>Academic analysis engine</span>
            </div>
            <button className="icon-button"><MoreHorizontal size={17} /></button>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div className={`ai-message-row ${message.type}`} key={`${message.text}-${index}`}>
                {message.type === "assistant" && (
                  <div className="message-ai-icon"><Sparkles size={14} /></div>
                )}
                <div className="ai-bubble">
                  <p>{message.text}</p>
                  <span>{message.type === "assistant" ? "SchoolMarks Intelligence" : "You"} · now</span>
                </div>
              </div>
            ))}

            {thinking && (
              <div className="ai-message-row assistant">
                <div className="message-ai-icon"><Sparkles size={14} /></div>
                <div className="ai-bubble thinking-bubble">
                  <span className="thinking-dots"><i /><i /><i /></span>
                  <small>Analyzing academic data...</small>
                </div>
              </div>
            )}
          </div>

          <div className="ai-input-area">
            <div className="ai-suggestion-pills">
              {suggestions.slice(0, 3).map((item) => (
                <button key={item} onClick={() => ask(item)}>{item}</button>
              ))}
            </div>

            <div className="ai-input">
              <Sparkles size={17} />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") ask();
                }}
                placeholder="Ask a question about your school..."
              />
              <button onClick={() => ask()}>
                <ArrowRight size={17} />
              </button>
            </div>

            <span className="ai-disclaimer">
              Demo intelligence runs locally in your browser.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

function DashboardSidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <aside className={`workspace-sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="workspace-logo">
        <Logo />
        <button className="sidebar-close" onClick={() => setMobileOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="workspace-school">
        <div className="school-avatar">SM</div>
        <div>
          <strong>SchoolMarks Demo</strong>
          <span>Academic Year 2026–27</span>
        </div>
        <ChevronDown size={14} />
      </div>

      <nav className="workspace-nav">
        <span className="nav-section-label">WORKSPACE</span>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => {
                setPage(item.id);
                setMobileOpen(false);
              }}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {item.id === "attendance" && <i className="nav-alert">2</i>}
            </button>
          );
        })}

        <span className="nav-section-label intelligence-label">INTELLIGENCE</span>

        <button
          className={`ai-nav ${page === "ai" ? "active" : ""}`}
          onClick={() => {
            setPage("ai");
            setMobileOpen(false);
          }}
        >
          <div className="ai-nav-icon"><BrainCircuit size={17} /></div>
          <span>SchoolMarks AI</span>
          <Sparkles size={13} />
        </button>
      </nav>

      <div className="sidebar-bottom">
        <button onClick={() => setPage("settings")}><Settings size={17} /><span>Settings</span></button>
        <button onClick={() => setPage("reports")}><FileText size={17} /><span>Help & reports</span></button>

        <div className="workspace-user">
          <div className="workspace-user-avatar">FK</div>
          <div>
            <strong>Faizan Khan</strong>
            <span>School Admin</span>
          </div>
          <MoreHorizontal size={16} />
        </div>
      </div>
    </aside>
  );
}

function WorkspaceTopbar({ onBack, onMenu, page }) {
  const title = {
    overview: "Overview",
    students: "Students",
    academics: "Academics",
    exams: "Examinations",
    attendance: "Attendance",
    marks: "Marks & Results",
    performance: "Performance",
    reports: "Reports",
    ai: "SchoolMarks AI",
    settings: "Settings"
  }[page] || "Overview";

  return (
    <header className="workspace-topbar">
      <div className="topbar-left">
        <button className="mobile-menu-button" onClick={onMenu}><Menu size={20} /></button>
        <div className="breadcrumbs">
          <span>SchoolMarks</span>
          <ChevronRight size={13} />
          <strong>{title}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="global-search">
          <Search size={15} />
          <span>Search anything...</span>
          <kbd>⌘ K</kbd>
        </div>
        <button className="topbar-icon">
          <Bell size={17} />
          <i />
        </button>
        <button className="topbar-back" onClick={onBack}>
          ← Home
        </button>
      </div>
    </header>
  );
}

function Workspace({ onBack }) {
  const [page, setPage] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const content = {
    overview: <DashboardOverview onNavigate={setPage} />,
    students: <StudentsPage />,
    academics: <AcademicsPage />,
    exams: <ExamsPage />,
    attendance: <AttendancePage />,
    marks: <MarksPage />,
    performance: <PerformancePage />,
    reports: <ReportsPage />,
    ai: <AIPage />,
    settings: (
      <div className="workspace-page">
        <div className="page-heading">
          <div>
            <span className="page-kicker">SYSTEM</span>
            <h1>Settings</h1>
            <p>Workspace preferences and school configuration.</p>
          </div>
        </div>
        <div className="settings-grid">
          {[
            ["School profile", "School name, logo and academic information"],
            ["Academic year", "Manage current academic year and terms"],
            ["Notifications", "Configure alerts and academic signals"],
            ["Security", "Workspace access and account controls"]
          ].map(([title, text]) => (
            <div className="settings-card" key={title}>
              <Settings size={19} />
              <strong>{title}</strong>
              <p>{text}</p>
              <button>Configure <ArrowRight size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="workspace-shell">
      <DashboardSidebar
        page={page}
        setPage={setPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <div className="workspace-content">
        <WorkspaceTopbar
          onBack={onBack}
          onMenu={() => setMobileOpen(true)}
          page={page}
        />
        {content[page] || content.overview}
      </div>
    </div>
  );
}

function MiniProductPreview() {
  return (
    <div className="hero-preview">
      <div className="hero-preview-top">
        <div className="hero-window-dots"><i /><i /><i /></div>
        <span>app.schoolmarks.local</span>
        <div className="hero-live"><i /> Live</div>
      </div>

      <div className="hero-preview-body">
        <aside>
          <div className="hero-side-brand"><b>S</b><span>SchoolMarks</span></div>
          {[
            [LayoutDashboard, "Overview"],
            [Users, "Students"],
            [BookOpen, "Academics"],
            [ClipboardCheck, "Exams"],
            [Award, "Results"],
            [CalendarDays, "Attendance"],
            [LineChart, "Performance"]
          ].map(([Icon, label], index) => (
            <div className={index === 0 ? "active" : ""} key={label}>
              <Icon size={12} />
              <span>{label}</span>
            </div>
          ))}
        </aside>

        <main>
          <div className="hero-preview-heading">
            <div>
              <span>SCHOOL OVERVIEW</span>
              <strong>Academic intelligence</strong>
              <small>Academic Year 2026–27</small>
            </div>
            <div className="hero-avatar">FK</div>
          </div>

          <div className="hero-preview-stats">
            <div><span>Students</span><strong>248</strong><small>+8.2%</small></div>
            <div><span>Attendance</span><strong>94%</strong><small>Healthy</small></div>
            <div><span>Performance</span><strong>82.7%</strong><small>+6.4%</small></div>
          </div>

          <div className="hero-preview-grid">
            <div className="hero-chart-card">
              <div><span>Performance trend</span><strong>Class average</strong></div>
              <MiniChart height={125} />
            </div>
            <div className="hero-ring-card">
              <span>Attendance health</span>
              <ProgressRing value={94} />
            </div>
            <div className="hero-student-card">
              <span>Recent students</span>
              {students.slice(0, 3).map((student) => (
                <div key={student.name}>
                  <b>{student.name.charAt(0)}</b>
                  <span>{student.name}</span>
                  <strong>{student.average}%</strong>
                </div>
              ))}
            </div>
            <div className="hero-ai-card">
              <div><Sparkles size={13} /><span>SchoolMarks Intelligence</span></div>
              <strong>6 students need attention.</strong>
              <small>Performance + attendance signal detected</small>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Home({ onOpenDashboard }) {
  const [heroRef, heroVisible] = useInView();
  const [modulesRef, modulesVisible] = useInView();
  const [intelRef, intelVisible] = useInView();
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
                <div><strong>248+</strong><span>Student records</span></div>
                <div><strong>12</strong><span>Academic groups</span></div>
                <div><strong>82%</strong><span>Demo performance</span></div>
              </div>
            </div>

            <div className={`hero-product ${heroVisible ? "visible" : ""}`}>
              <div className="hero-product-glow" />
              <div className="floating-pill pill-top">
                <Sparkles size={14} />
                <span>Live intelligence</span>
              </div>

              <MiniProductPreview />

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
                <h2>School data shouldn't <span>live everywhere.</span></h2>
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
                      <div><strong>{title}</strong><p>{text}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="problem-visual">
                <div className="scattered-card card-paper"><FileText size={18} /><span>Attendance Register</span><small>38 pages</small></div>
                <div className="scattered-card card-sheet"><BarChart3 size={18} /><span>Marks.xlsx</span><small>Last edited yesterday</small></div>
                <div className="scattered-card card-notice"><Bell size={18} /><span>Teacher message</span><small>Which students are below 60%?</small></div>

                <div className="convergence">
                  <div className="convergence-ring"><div><Sparkles size={22} /></div></div>
                  <span>SchoolMarks</span>
                  <strong>One connected system</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="solution-section section" id="features" ref={modulesRef}>
          <div className="container">
            <div className={`section-heading ${modulesVisible ? "visible" : ""}`}>
              <div>
                <span className="section-kicker">THE SOLUTION</span>
                <h2>One platform. <span>Every school workflow.</span></h2>
              </div>
              <p>
                SchoolMarks connects the everyday operations of a school so
                your team can spend less time managing data and more time using it.
              </p>
            </div>

            <div className={`module-grid ${modulesVisible ? "visible" : ""}`}>
              {[
                [Users, "Student Management", "Keep student profiles, classes, sections and academic records connected."],
                [BookOpen, "Academic Management", "Organize subjects, classes and academic structures from one place."],
                [ClipboardCheck, "Examinations", "Create examinations, schedules and assessment structures."],
                [BarChart3, "Marks & Results", "Enter marks once and turn them into calculated results automatically."],
                [UserCheck, "Attendance Intelligence", "Track attendance patterns and identify students needing attention."],
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
          <div className="container">
            <div className="workflow-intro">
              <span className="section-kicker">THE SCHOOLMARKS FLOW</span>
              <h2>Your school data should <span>move with you.</span></h2>
              <p>
                Every academic workflow connects inside one system — from
                student records to performance intelligence.
              </p>
            </div>

            <div className="workflow-simple-grid">
              {[
                [GraduationCap, "01", "Add your school"],
                [BookOpen, "02", "Configure academics"],
                [Users, "03", "Manage students"],
                [CalendarDays, "04", "Record attendance"],
                [ClipboardCheck, "05", "Enter marks"],
                [BrainCircuit, "06", "Generate intelligence"]
              ].map(([Icon, number, title]) => (
                <div className="workflow-simple-card" key={number}>
                  <span>{number}</span>
                  <div><Icon size={19} /></div>
                  <strong>{title}</strong>
                  <ArrowRight size={15} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intelligence-section section" id="intelligence" ref={intelRef}>
          <div className="container">
            <div className={`intelligence-header ${intelVisible ? "visible" : ""}`}>
              <span className="section-kicker">SCHOOLMARKS INTELLIGENCE</span>
              <h2>Your data already knows <span>more than you think.</span></h2>
              <p>
                Ask questions about attendance, marks, rankings and performance
                through the SchoolMarks intelligence layer.
              </p>
            </div>

            <div className="landing-ai-demo">
              <div className="landing-ai-left">
                <div className="landing-ai-icon"><BrainCircuit size={24} /></div>
                <span>ACADEMIC ANALYSIS ENGINE</span>
                <h3>Ask. Analyze. Understand.</h3>
                <p>
                  Move from raw academic records to useful signals with a
                  conversational interface designed around school data.
                </p>
                <button onClick={onOpenDashboard}>
                  Open AI workspace <ArrowRight size={16} />
                </button>
              </div>

              <div className="landing-ai-chat">
                <div className="landing-ai-chat-head"><span><i /> Intelligence online</span><Sparkles size={15} /></div>
                <div className="landing-ai-bubble user">Which students need attention?</div>
                <div className="landing-ai-bubble assistant">
                  <Sparkles size={14} />
                  <span>6 students currently need attention based on performance and attendance signals.</span>
                </div>
                <div className="landing-ai-bubble user">Which subject is weakest?</div>
                <div className="landing-ai-bubble assistant">
                  <Sparkles size={14} />
                  <span>Mathematics is currently at a 68% average in the demo dataset.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="analytics-section section">
          <div className="container">
            <div className="analytics-layout">
              <div className="analytics-copy">
                <span className="section-kicker">SEE THE SIGNAL</span>
                <h2>From raw marks <span>to academic decisions.</span></h2>
                <p>
                  SchoolMarks doesn't stop at storing marks. The platform can
                  surface trends, rankings and students who may need support.
                </p>

                <div className="signal-list">
                  <div><div className="signal-icon"><TrendingUp size={17} /></div><div><strong>Performance trends</strong><span>Compare assessment performance over time.</span></div></div>
                  <div><div className="signal-icon"><Target size={17} /></div><div><strong>At-risk detection</strong><span>Find students below defined academic thresholds.</span></div></div>
                  <div><div className="signal-icon"><Award size={17} /></div><div><strong>Rankings & results</strong><span>Generate consistent academic calculations.</span></div></div>
                </div>
              </div>

              <div className="analytics-visual">
                <MiniProductPreview />
                <div className="analytics-float">
                  <div className="analytics-float-icon"><BrainCircuit size={15} /></div>
                  <div><span>Insight detected</span><strong>Mathematics needs attention</strong></div>
                </div>
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
                {["Paper registers and spreadsheets","Manual calculations","Separate attendance records","Delayed result preparation","Limited performance visibility","Data scattered across files"].map((item) => (
                  <div className="comparison-row" key={item}><X size={15} /><span>{item}</span></div>
                ))}
              </div>

              <div className="comparison-center">
                <div className="comparison-logo"><img src="/logo/schoolmarks-logo.png" alt="" /></div>
                <span>vs</span>
              </div>

              <div className="comparison-column modern">
                <div className="comparison-header"><span>SchoolMarks</span><small>Connected</small></div>
                {["Digital student records","Automatic calculations","Unified attendance intelligence","Instant result preparation","Performance analytics","One connected academic system"].map((item) => (
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
                  Open SchoolMarks <ArrowRight size={17} />
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
          <Logo dark />
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
      onClose();
      onEnter();
    }, 600);
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

        <span className="modal-note">
          Demo data is stored locally in this browser.
        </span>
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

  if (page === "workspace") {
    return <Workspace onBack={() => setPage("home")} />;
  }

  return (
    <>
      <Home onOpenDashboard={() => setAccess(true)} />

      {access && (
        <AccessModal
          onClose={() => setAccess(false)}
          onEnter={() => setPage("workspace")}
        />
      )}
    </>
  );
}