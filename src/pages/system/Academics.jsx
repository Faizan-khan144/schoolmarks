import { BookOpen, GraduationCap, TrendingUp } from "lucide-react"
import { useData } from "../../store/DataContext"
import { PageHeader } from "../../components/PageHeader"
import { StatCard } from "../../components/StatCard"
import { ProgressBar } from "../../components/ProgressBar"
import { EmptyState } from "../../components/EmptyState"

export default function Academics() {
  const { subjects, subjectStats } = useData()

  const average =
    subjects.length &&
    Math.round(
      subjects.reduce((sum, subject) => sum + Number(subject.average || 0), 0) /
        subjects.length
    )

  const stats = [
    {
      eyebrow: "Subjects",
      value: subjects.length,
      icon: BookOpen,
      foot: "Across the school"
    },
    {
      eyebrow: "School average",
      value: average || 0,
      suffix: "%",
      icon: TrendingUp,
      foot: "All subjects combined"
    },
    {
      eyebrow: "Topics mastered",
      value: subjectStats?.mastered || 0,
      icon: GraduationCap,
      foot: "At or above 80%"
    }
  ]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="ACADEMICS"
        title="Academic overview"
        text="Understand how every subject is performing across your classes."
      />

      <div className="kpi-grid">
        {stats.map(stat => (
          <StatCard key={stat.eyebrow} {...stat} />
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Subject performance</h2>
            <p className="muted">Current average per subject</p>
          </div>
        </div>
        <div className="panel-body stack-sm">
          {subjects.length ? (
            subjects.map(subject => (
              <div className="row row-between" key={subject.id}>
                <div className="row" style={{ gap: 12 }}>
                  <div className="avatar avatar-sm">
                    <BookOpen size={15} />
                  </div>
                  <div>
                    <strong className="block">{subject.name}</strong>
                    <span className="muted block">{subject.code}</span>
                  </div>
                </div>
                <div className="row" style={{ gap: 12, flex: 1 }}>
                  <ProgressBar value={Number(subject.average || 0)} width="100%" />
                  <strong className="num">{Math.round(Number(subject.average || 0))}%</strong>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No subjects"
              text="Add subjects and marks to see academic performance."
            />
          )}
        </div>
      </div>
    </div>
  )
}