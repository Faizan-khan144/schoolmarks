import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronRight,
  Clock3,
  GraduationCap,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  UserRoundCheck,
  UserRoundX,
  X
} from "lucide-react"
import "./dashboard.css"

const initialStudents = [
  {
    id: 1,
    name: "Ayaan Khan",
    roll: "901",
    className: "9-A",
    average: 87,
    attendance: 96,
    status: "Excellent"
  },
  {
    id: 2,
    name: "Areeba Khan",
    roll: "905",
    className: "9-B",
    average: 91,
    attendance: 98,
    status: "Excellent"
  },
  {
    id: 3,
    name: "Maham Ali",
    roll: "903",
    className: "9-A",
    average: 82,
    attendance: 91,
    status: "Good"
  },
  {
    id: 4,
    name: "Hassan Raza",
    roll: "904",
    className: "9-C",
    average: 76,
    attendance: 88,
    status: "Good"
  },
  {
    id: 5,
    name: "Rayyan Malik",
    roll: "906",
    className: "9-C",
    average: 64,
    attendance: 79,
    status: "Attention"
  },
  {
    id: 6,
    name: "Zayan Ahmed",
    roll: "902",
    className: "9-B",
    average: 51,
    attendance: 73,
    status: "At Risk"
  }
]

const activity = [
  {
    type: "marks",
    title: "Mid-term marks updated",
    detail: "Class 9-A · Mathematics",
    time: "12 min ago"
  },
  {
    type: "attendance",
    title: "Attendance recorded",
    detail: "Class 9-B · 32 students",
    time: "34 min ago"
  },
  {
    type: "result",
    title: "Result generated",
    detail: "Class 9-C · Mid-term assessment",
    time: "1 hr ago"
  },
  {
    type: "student",
    title: "New student added",
    detail: "Areeba Khan · 9-B",
    time: "2 hrs ago"
  }
]

const chartData = [
  { label: "Mon", value: 74 },
  { label: "Tue", value: 81 },
  { label: "Wed", value: 77 },
  { label: "Thu", value: 88 },
  { label: "Fri", value: 84 },
  { label: "Sat", value: 92 },
  { label: "Sun", value: 87 }
]

const quickActions = [
  {
    label: "Add student",
    description: "Create a new student record",
    icon: Plus
  },
  {
    label: "Record marks",
    description: "Enter academic performance",
    icon: BarChart3
  },
  {
    label: "Take attendance",
    description: "Update today's attendance",
    icon: UserRoundCheck
  },
  {
    label: "Generate result",
    description: "Build a student result",
    icon: GraduationCap
  }
]

const getInitials = name =>
  name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

const getStatusClass = status => {
  if (status === "Excellent") return "excellent"
  if (status === "Good") return "good"
  if (status === "Attention") return "attention"
  return "risk"
}

function StatCard({
  eyebrow,
  value,
  suffix,
  detail,
  trend,
  trendType,
  icon: Icon,
  index
}) {
  return (
    <article
      className="dash-stat-card"
      style={{ "--delay": `${index * 70}ms` }}
    >
      <div className="dash-stat-top">
        <span className="dash-stat-eyebrow">{eyebrow}</span>
        <span className="dash-stat-icon">
          <Icon size={18} strokeWidth={1.8} />
        </span>
      </div>

      <div className="dash-stat-value">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>

      <div className="dash-stat-bottom">
        <span className={`dash-trend ${trendType}`}>
          {trendType === "up" ? (
            <TrendingUp size={13} />
          ) : (
            <TrendingDown size={13} />
          )}
          {trend}
        </span>
        <span>{detail}</span>
      </div>
    </article>
  )
}

function AttendanceRing({ value }) {
  const radius = 55
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="attendance-ring">
      <svg viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="ring-track"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="ring-value"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-content">
        <strong>{value}%</strong>
        <span>present</span>
      </div>
    </div>
  )
}

function PerformanceChart() {
  const max = Math.max(...chartData.map(item => item.value))
  const min = Math.min(...chartData.map(item => item.value))

  return (
    <div className="performance-chart">
      <div className="chart-y-axis">
        <span>100</span>
        <span>90</span>
        <span>80</span>
        <span>70</span>
        <span>60</span>
      </div>

      <div className="chart-area">
        <div className="chart-grid">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="chart-bars">
          {chartData.map((item, index) => {
            const height =
              35 + ((item.value - min) / (max - min || 1)) * 50

            return (
              <div className="chart-column" key={item.label}>
                <div
                  className="chart-bar"
                  style={{
                    height: `${height}%`,
                    "--bar-delay": `${index * 80}ms`
                  }}
                >
                  <span>{item.value}%</span>
                </div>
                <small>{item.label}</small>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StudentRow({ student, onSelect }) {
  return (
    <button
      className="student-row"
      onClick={() => onSelect(student)}
    >
      <span className="student-avatar">
        {getInitials(student.name)}
      </span>

      <span className="student-main">
        <strong>{student.name}</strong>
        <small>
          Roll {student.roll} · {student.className}
        </small>
      </span>

      <span className="student-performance">
        <strong>{student.average}%</strong>
        <small>average</small>
      </span>

      <span className="student-attendance">
        <span
          className="attendance-progress"
          style={{ "--progress": `${student.attendance}%` }}
        />
        <small>{student.attendance}%</small>
      </span>

      <span className={`status-pill ${getStatusClass(student.status)}`}>
        {student.status}
      </span>

      <ChevronRight size={16} />
    </button>
  )
}

export default function Dashboard() {
  const [students, setStudents] = useState(initialStudents)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [search, setSearch] = useState("")
  const [showActions, setShowActions] = useState(false)

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return students

    return students.filter(student =>
      `${student.name} ${student.roll} ${student.className} ${student.status}`
        .toLowerCase()
        .includes(query)
    )
  }, [students, search])

  const atRiskStudents = students
    .filter(student => student.status === "At Risk" || student.status === "Attention")
    .sort((a, b) => a.average - b.average)

  const averagePerformance =
    students.reduce((sum, student) => sum + student.average, 0) /
    students.length

  const averageAttendance =
    students.reduce((sum, student) => sum + student.attendance, 0) /
    students.length

  const addDemoStudent = () => {
    const id = Date.now()

    setStudents(current => [
      ...current,
      {
        id,
        name: "New Student",
        roll: String(900 + current.length + 1),
        className: "9-A",
        average: 0,
        attendance: 0,
        status: "Attention"
      }
    ])
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-noise" />

      <header className="dashboard-header">
        <div>
          <div className="dashboard-kicker">
            <span />
            SCHOOLMARKS · OVERVIEW
          </div>

          <h1>
            Good evening,
            <em> Faizan.</em>
          </h1>

          <p>
            Here's what is happening across your school today.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="dashboard-date">
            <CalendarDays size={16} />
            <span>17 September 2026</span>
          </div>

          <button
            className="dashboard-primary-action"
            onClick={() => setShowActions(true)}
          >
            <Plus size={17} />
            Quick action
          </button>
        </div>
      </header>

      <section className="dash-stat-grid">
        <StatCard
          index={0}
          eyebrow="Total students"
          value={students.length}
          detail="active records"
          trend="+8.4%"
          trendType="up"
          icon={Users}
        />

        <StatCard
          index={1}
          eyebrow="Average performance"
          value={averagePerformance.toFixed(1)}
          suffix="%"
          detail="across all classes"
          trend="+3.2%"
          trendType="up"
          icon={Target}
        />

        <StatCard
          index={2}
          eyebrow="Attendance"
          value={averageAttendance.toFixed(1)}
          suffix="%"
          detail="school average"
          trend="+1.8%"
          trendType="up"
          icon={UserRoundCheck}
        />

        <StatCard
          index={3}
          eyebrow="Needs attention"
          value={atRiskStudents.length}
          detail="students flagged"
          trend="-12.5%"
          trendType="up"
          icon={UserRoundX}
        />
      </section>

      <section className="dashboard-main-grid">
        <article className="dashboard-panel performance-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-label">ACADEMIC PULSE</span>
              <h2>Performance overview</h2>
            </div>

            <button className="panel-menu">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="performance-summary">
            <div>
              <strong>84.6%</strong>
              <span>
                <TrendingUp size={14} />
                4.7% this month
              </span>
            </div>

            <div className="period-switcher">
              <button>7D</button>
              <button className="active">30D</button>
              <button>90D</button>
            </div>
          </div>

          <PerformanceChart />
        </article>

        <article className="dashboard-panel attendance-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-label">TODAY</span>
              <h2>Attendance</h2>
            </div>

            <button className="panel-menu">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="attendance-content">
            <AttendanceRing value={94} />

            <div className="attendance-breakdown">
              <div>
                <span className="attendance-dot present" />
                <div>
                  <strong>1,173</strong>
                  <small>Present</small>
                </div>
              </div>

              <div>
                <span className="attendance-dot absent" />
                <div>
                  <strong>43</strong>
                  <small>Absent</small>
                </div>
              </div>

              <div>
                <span className="attendance-dot late" />
                <div>
                  <strong>32</strong>
                  <small>Late</small>
                </div>
              </div>
            </div>
          </div>

          <button className="panel-link">
            View attendance details
            <ArrowUpRight size={15} />
          </button>
        </article>
      </section>

      <section className="dashboard-lower-grid">
        <article className="dashboard-panel students-panel">
          <div className="panel-heading students-heading">
            <div>
              <span className="panel-label">STUDENT DIRECTORY</span>
              <h2>Students</h2>
            </div>

            <div className="student-tools">
              <div className="student-search">
                <Search size={15} />
                <input
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  placeholder="Search students..."
                />
                {search && (
                  <button onClick={() => setSearch("")}>
                    <X size={13} />
                  </button>
                )}
              </div>

              <button
                className="mini-add"
                onClick={addDemoStudent}
                title="Add student"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="student-table-head">
            <span>Student</span>
            <span>Performance</span>
            <span>Attendance</span>
            <span>Status</span>
            <span />
          </div>

          <div className="student-list">
            {filteredStudents.map(student => (
              <StudentRow
                key={student.id}
                student={student}
                onSelect={setSelectedStudent}
              />
            ))}

            {!filteredStudents.length && (
              <div className="empty-search">
                <Search size={22} />
                <strong>No students found</strong>
                <span>Try a different search term.</span>
              </div>
            )}
          </div>

          <button className="panel-footer-link">
            View all students
            <ArrowUpRight size={15} />
          </button>
        </article>

        <div className="dashboard-side-stack">
          <article className="dashboard-panel risk-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-label">EARLY SIGNALS</span>
                <h2>Needs attention</h2>
              </div>

              <span className="risk-count">{atRiskStudents.length}</span>
            </div>

            <div className="risk-list">
              {atRiskStudents.slice(0, 3).map(student => (
                <button
                  className="risk-row"
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                >
                  <span className="risk-avatar">
                    {getInitials(student.name)}
                  </span>

                  <span>
                    <strong>{student.name}</strong>
                    <small>
                      {student.average}% average · {student.attendance}% attendance
                    </small>
                  </span>

                  <ChevronRight size={15} />
                </button>
              ))}
            </div>

            <button className="panel-link">
              Review all signals
              <ArrowUpRight size={15} />
            </button>
          </article>

          <article className="dashboard-panel activity-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-label">LIVE FEED</span>
                <h2>Recent activity</h2>
              </div>

              <Clock3 size={17} />
            </div>

            <div className="activity-list">
              {activity.map((item, index) => (
                <div className="activity-item" key={index}>
                  <span className={`activity-icon ${item.type}`}>
                    {item.type === "marks" && <BarChart3 size={14} />}
                    {item.type === "attendance" && (
                      <UserRoundCheck size={14} />
                    )}
                    {item.type === "result" && (
                      <GraduationCap size={14} />
                    )}
                    {item.type === "student" && <Users size={14} />}
                  </span>

                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>

                  <time>{item.time}</time>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-bottom-banner">
        <div className="banner-icon">
          <Sparkles size={21} />
        </div>

        <div>
          <span>SMART INSIGHTS</span>
          <h3>Your classes are trending upward.</h3>
          <p>
            Overall academic performance increased by 4.7% compared with the
            previous period.
          </p>
        </div>

        <button>
          Open insights
          <ArrowUpRight size={16} />
        </button>
      </section>

      {selectedStudent && (
        <div
          className="student-modal-backdrop"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="student-modal"
            onClick={event => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedStudent(null)}
            >
              <X size={18} />
            </button>

            <div className="modal-profile">
              <span className="modal-avatar">
                {getInitials(selectedStudent.name)}
              </span>

              <div>
                <span className="panel-label">STUDENT PROFILE</span>
                <h2>{selectedStudent.name}</h2>
                <p>
                  Roll {selectedStudent.roll} · {selectedStudent.className}
                </p>
              </div>
            </div>

            <div className="modal-metrics">
              <div>
                <span>Average</span>
                <strong>{selectedStudent.average}%</strong>
              </div>

              <div>
                <span>Attendance</span>
                <strong>{selectedStudent.attendance}%</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedStudent.status}</strong>
              </div>
            </div>

            <div className="modal-note">
              <Sparkles size={16} />
              <span>
                This profile is ready to connect with the SchoolMarks
                performance and AI systems.
              </span>
            </div>
          </div>
        </div>
      )}

      {showActions && (
        <div
          className="quick-action-backdrop"
          onClick={() => setShowActions(false)}
        >
          <div
            className="quick-action-modal"
            onClick={event => event.stopPropagation()}
          >
            <div className="quick-action-header">
              <div>
                <span className="panel-label">SCHOOLMARKS</span>
                <h2>What do you want to do?</h2>
              </div>

              <button onClick={() => setShowActions(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="quick-action-grid">
              {quickActions.map(action => {
                const Icon = action.icon

                return (
                  <button
                    className="quick-action-card"
                    key={action.label}
                    onClick={() => setShowActions(false)}
                  >
                    <span>
                      <Icon size={19} />
                    </span>

                    <div>
                      <strong>{action.label}</strong>
                      <small>{action.description}</small>
                    </div>

                    <ArrowUpRight size={15} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}