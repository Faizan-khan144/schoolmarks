import { CalendarDays, Clock3, Users } from "lucide-react"
import { useData } from "../../store/DataContext"
import { PageHeader } from "../../components/PageHeader"
import { StatCard } from "../../components/StatCard"
import { EmptyState } from "../../components/EmptyState"

export default function Attendance() {
  const { students, classes } = useData()

  const classAverageAttendance = classId => {
    const classStudents = students.filter(student => student.classId === classId)
    return classStudents.length
      ? Math.round(
          classStudents.reduce(
            (sum, student) => sum + Number(student.attendance || 0),
            0
          ) / classStudents.length
        )
      : 0
  }

  const overall =
    students.length &&
    Math.round(
      students.reduce((sum, student) => sum + Number(student.attendance || 0), 0) /
        students.length
    )

  const weeklyAverage =
    students.length &&
    Math.round(
      students.reduce((sum, student) => sum + Number(student.weeklyAttendance || 0), 0) /
        students.length
    )

  const atRiskCount = students.filter(student => student.status === "At Risk").length

  const stats = [
    {
      eyebrow: "Overall attendance",
      value: overall || 0,
      suffix: "%",
      icon: Users,
      foot: "Across every student"
    },
    {
      eyebrow: "This week",
      value: weeklyAverage || 0,
      suffix: "%",
      icon: CalendarDays,
      foot: "Rolling 7-day average"
    },
    {
      eyebrow: "Below attention",
      value: atRiskCount,
      icon: Clock3,
      foot: "Students need a conversation"
    }
  ]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="ATTENDANCE"
        title="Attendance overview"
        text="Spot patterns before they become problems."
      />

      <div className="kpi-grid">
        {stats.map(stat => (
          <StatCard key={stat.eyebrow} {...stat} />
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Attendance by class</h2>
            <p className="muted">This month average per class</p>
          </div>
        </div>
        <div className="panel-body stack-sm">
          {classes.length ? (
            classes.map(classItem => {
              const percent = classAverageAttendance(classItem.id)
              return (
                <div className="row row-between" key={classItem.id}>
                  <div className="row" style={{ gap: 12 }}>
                    <div className="avatar">
                      <Users size={16} />
                    </div>
                    <div>
                      <strong className="block">
                        {classItem.name} {classItem.section}
                      </strong>
                      <span className="muted block">{classItem.studentCount} students</span>
                    </div>
                  </div>
                  <div className="row" style={{ gap: 12, flex: 1 }}>
                    <div className="progress" style={{ flex: 1 }}>
                      <div className="progress-track">
                        <i style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <strong className="num">{percent}%</strong>
                  </div>
                </div>
              )
            })
          ) : (
            <EmptyState icon={Users} title="No classes" text="Add classes to see attendance trends here." />
          )}
        </div>
      </div>
    </div>
  )
}
