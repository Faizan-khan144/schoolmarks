import { useMemo, useState } from "react"
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Clock3,
  Flame,
  Sparkles,
  Users
} from "lucide-react"
import { useData } from "../../store/DataContext"
import { PageHeader } from "../../components/PageHeader"
import { StatCard } from "../../components/StatCard"
import { Avatar } from "../../components/Avatar"
import { StatusPill } from "../../components/Badge"
import { EmptyState } from "../../components/EmptyState"
import { Bars } from "../../components/Charts"

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export default function Dashboard({ navigate }) {
  const { students, classes, subjects, exams, profile, classes: enrichedClasses } = useData()

  const firstName = (profile?.name || "Admin").split(" ")[0]
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || "")

  const classStudents = students.filter(student => student.classId === selectedClass)
  const classAverage = classStudents.length
    ? Math.round(
        classStudents.reduce((sum, student) => sum + Number(student.average || 0), 0) /
          classStudents.length
      )
    : 0
  const classAttendance = classStudents.length
    ? Math.round(
        classStudents.reduce(
          (sum, student) => sum + Number(student.attendance || 0),
          0
        ) / classStudents.length
      )
    : 0

  const statusCounts = useMemo(() => {
    const counts = { Brilliant: 0, "On Track": 0, Attention: 0, "At Risk": 0 }
    students.forEach(student => {
      const status = student.status || "On Track"
      counts[status] = counts[status] || 0
      counts[status] += 1
    })
    return counts
  }, [students])

  const kpiStats = [
    {
      eyebrow: "Total students",
      value: students.length,
      icon: Users,
      foot: `${classes.length} classes tracked`
    },
    {
      eyebrow: "Class average",
      value: classAverage,
      suffix: "%",
      icon: BarChart3,
      foot: "Across selected class"
    },
    {
      eyebrow: "Class attendance",
      value: classAttendance,
      suffix: "%",
      icon: Clock3,
      foot: "Across selected class"
    },
    {
      eyebrow: "Upcoming exams",
      value: exams.filter(exam => exam.status === "Upcoming" || exam.status === "This week").length,
      icon: CalendarDays,
      foot: "This term"
    }
  ]

  const topStudents = [...students]
    .sort((a, b) => Number(b.average || 0) - Number(a.average || 0))
    .slice(0, 5)

  const riskStudents = students.filter(student => student.status === "At Risk")

  const subjectRecent = (subjects || []).slice(0, 3).map(subject => ({
    label: subject.code,
    value: Math.round(Number(subject.average || 0))
  }))

  const attendanceSpark = students.slice(0, 8).map(student => ({
    label: student.name.split(" ")[0],
    value: Math.round(Number(student.attendance || 0))
  }))

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Workspace"
        title={`${greeting()}, ${firstName}`}
        text="Here is how your school is performing today."
        actions={
          <button className="button button-primary button-sm" onClick={() => navigate("ai-insights")}>
            <Sparkles size={14} /> AI insights
          </button>
        }
      />

      <div className="kpi-grid">
        {kpiStats.map(stat => (
          <StatCard key={stat.eyebrow} {...stat} />
        ))}
      </div>

      <div className="layout-side-main">
        <Panel title="Top students" muted="Highest current averages">
          <div className="stack-sm">
            {topStudents.length ? (
              topStudents.map((student, index) => (
                <button
                  key={student.id}
                  className="row row-between panel-hover"
                  style={{ padding: 6, borderRadius: 12, width: "100%", textAlign: "left" }}
                  onClick={() => navigate("student-profile", student.id)}
                >
                  <div className="row" style={{ gap: 10 }}>
                    <span className="num muted">{index + 1}</span>
                    <Avatar name={student.name} size={34} />
                    <div>
                      <strong className="block">{student.name}</strong>
                      <span className="muted block">
                        {student.className} {student.section}
                      </span>
                    </div>
                  </div>
                  <strong className="num">{Math.round(student.average || 0)}%</strong>
                </button>
              ))
            ) : (
              <EmptyState
                icon={Users}
                title="No students"
                text="Add students to see top performers."
              />
            )}
          </div>
        </Panel>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Needs attention</h2>
              <p className="muted">Students currently at risk</p>
            </div>
            {statusCounts["At Risk"] > 0 && (
              <span className="status-pill status-pill-danger">{statusCounts["At Risk"]} at risk</span>
            )}
          </div>
          <div className="panel-body">
            {riskStudents.length ? (
              <div className="stack-sm">
                {riskStudents.slice(0, 4).map(student => (
                  <button
                    key={student.id}
                    className="row row-between panel-hover"
                    style={{ padding: 6, borderRadius: 12, width: "100%", textAlign: "left" }}
                    onClick={() => navigate("student-profile", student.id)}
                  >
                    <div className="row" style={{ gap: 10 }}>
                      <Avatar name={student.name} size={32} />
                      <div>
                        <strong className="block">{student.name}</strong>
                        <span className="muted block">{Math.round(student.average || 0)}% avg</span>
                      </div>
                    </div>
                    <StatusPill status={student.status} />
                  </button>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Flame}
                title="All clear"
                text="No students are currently at risk."
              />
            )}
          </div>
        </div>
      </div>

      <div className="layout-main-side">
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Subject performance</h2>
              <p className="muted">Average marks per subject this term</p>
            </div>
            <select
              className="input select-input select-sm"
              value={selectedClass}
              onChange={event => setSelectedClass(event.target.value)}
            >
              {enrichedClasses.map(classItem => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name} {classItem.section}
                </option>
              ))}
            </select>
          </div>
          <div className="panel-body">
            {subjectRecent.length ? (
              <Bars data={subjectRecent} height={180} color="var(--green-600)" />
            ) : (
              <EmptyState
                icon={BarChart3}
                title="No subject data"
                text="Add subjects and marks to see class performance here."
              />
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Attendance trend</h2>
              <p className="muted">Last 8 students</p>
            </div>
          </div>
          <div className="panel-body stack-sm">
            {attendanceSpark.length ? (
              attendanceSpark.map(item => (
                <div className="row row-between" key={item.label}>
                  <span>{item.label}</span>
                  <div className="row" style={{ gap: 8, flex: 1 }}>
                    <div className="progress" style={{ flex: 1 }}>
                      <div className="progress-track">
                        <i style={{ width: `${item.value}%`, background: "var(--green-600)" }} />
                      </div>
                    </div>
                    <span className="num muted">{item.value}%</span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={Clock3}
                title="No attendance"
                text="Record attendance to see trends here."
              />
            )}
          </div>
        </div>
      </div>

      <div className="panel panel-accent">
        <div className="panel-body row row-between">
          <div className="row" style={{ gap: 12 }}>
            <div className="avatar">
              <Sparkles size={16} />
            </div>
            <div>
              <strong className="block">AI assistant</strong>
              <span className="muted block">Ask anything about your academic data</span>
            </div>
          </div>
          <button className="button button-light button-sm" onClick={() => navigate("ai-insights")}>
            Open AI <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function Panel({ title, muted, children }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>{title}</h2>
          <p className="muted">{muted}</p>
        </div>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  )
}
