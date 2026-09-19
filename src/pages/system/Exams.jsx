import { CalendarDays, CheckCircle2, Clock3, Plus } from "lucide-react"
import { useData } from "../../store/DataContext"
import { PageHeader } from "../../components/PageHeader"
import { StatCard } from "../../components/StatCard"
import { EmptyState } from "../../components/EmptyState"

export default function Exams({ navigate }) {
  const { exams, examStats } = useData()

  const stats = [
    {
      eyebrow: "Upcoming",
      value: examStats.upcoming,
      icon: CalendarDays,
      foot: "Exams this term"
    },
    {
      eyebrow: "This week",
      value: examStats.thisWeek,
      icon: Clock3,
      foot: "In the next 7 days"
    },
    {
      eyebrow: "Completed",
      value: examStats.completed,
      icon: CheckCircle2,
      foot: "Finished this term"
    }
  ]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="EXAMS"
        title="Exam schedule"
        text="Keep assessments organized across every class."
        actions={
          <button className="button button-primary button-sm" onClick={() => navigate("exam-form")}>
            <Plus size={14} /> New exam
          </button>
        }
      />

      <div className="kpi-grid">
        {stats.map(stat => (
          <StatCard key={stat.eyebrow} {...stat} />
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Upcoming assessments</h2>
            <p className="muted">The next exams on your calendar</p>
          </div>
        </div>

        {exams.length ? (
          <div className="exam-timeline">
            {exams.map((exam, index) => (
              <div className="exam-line" key={exam.id}>
                <div className="exam-date">
                  <strong>{exam.date?.split("-")[2] || "—"}</strong>
                  <span>{exam.date?.split("-")[1] || "—"}</span>
                </div>
                <div className="exam-line-dot" />
                <div className="exam-info">
                  <strong>{exam.name}</strong>
                  <span>{exam.className} · {exam.totalMarks} marks</span>
                </div>
                {index === 0 ? (
                  <span className="status-pill status-pill-warning">Su tiempo</span>
                ) : (
                  <span className="status-pill">{exam.status || "Upcoming"}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="panel-body">
            <EmptyState
              icon={CalendarDays}
              title="No exams"
              text="Add exams to build your assessment timeline."
            />
          </div>
        )}
      </div>
    </div>
  )
}
