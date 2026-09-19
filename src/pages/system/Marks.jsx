import { useMemo, useState } from "react"
import { ClipboardCheck, Plus, Search, TrendingUp } from "lucide-react"
import { useData } from "../../store/DataContext"
import { PageHeader } from "../../components/PageHeader"
import { StatCard } from "../../components/StatCard"
import { EmptyState } from "../../components/EmptyState"
import {  } from "../../utils/subjects"

export default function Marks({ navigate }) {
  const { students, marks, subjects } = useData()
  const [query, setQuery] = useState("")
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || "")

  const subjectMarks = marks.filter(mark => mark.subjectId === subjectId)

  const rows = useMemo(() => {
    let list = subjectMarks

    if (query.trim()) {
      const term = query.toLowerCase()
      list = list.filter(mark => {
        const student = students.find(item => item.id === mark.studentId)
        return (student?.name || "").toLowerCase().includes(term)
      })
    }

    return list.map(mark => {
      const student = students.find(item => item.id === mark.studentId)
      const percent = Math.round(
        (Number(mark.obtained || 0) / Math.max(Number(mark.totalMarks || 1), 1)) * 100
      )
      return {
        id: mark.id,
        name: student?.name || "Unknown",
        className: student?.className || "—",
        percent,
        obtained: mark.obtained,
        totalMarks: mark.totalMarks
      }
    })
  }, [subjectMarks, students, query])

  const available = marks.length
    ? Math.round(
        marks.reduce((sum, mark) => sum + Number(mark.obtained || 0), 0) /
          marks.reduce((sum, mark) => sum + Number(mark.totalMarks || 1), 1) *
          100
      )
    : 0

  const bestSubject = subjects.reduce(
    (best, item) => (Number(item.average || 0) > Number(best.average || 0) ? item : best),
    subjects[0]
  )

  const stats = [
    {
      eyebrow: "Overall average",
      value: available,
      suffix: "%",
      icon: TrendingUp,
      detail: "Across all assessments"
    },
    {
      eyebrow: "Top subject",
      value: bestSubject?.code || "—",
      icon: ClipboardCheck,
      detail: `${Math.round(Number(bestSubject?.average || 0))}% average`
    },
    {
      eyebrow: "Assessments",
      value: marks.length,
      icon: ClipboardCheck,
      detail: "Records tracked"
    }
  ]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="MARKS"
        title="Marks management"
        description="Enter, review and understand assessment results."
        actions={
          <button className="button button-primary button-sm" onClick={() => navigate("enter-marks")}>
            <Plus size={14} />
            Enter marks
          </button>
        }
      />

      <div className="kpi-grid">
        {stats.map(stat => (
          <StatCard {...stat} key={stat.eyebrow} />
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Assessment record</h2>
            <p className="muted">Every entry connected to the student record</p>
          </div>
        </div>
        <div className="panel-body stack-sm">
          <div className="row row-between">
            <div className="search-field">
              <Search size={16} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search students..."
              />
            </div>

            <select className="input select-sm" value={subjectId} onChange={event => setSubjectId(event.target.value)}>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {rows.length ? (
            <div className="marks-table">
              <div className="marks-table-head">
                <span>Student</span>
                <span>Class</span>
                <span>Obtained</span>
                <span>Total</span>
                <strong>Percent</strong>
              </div>
              {rows.map(row => (
                <div className="marks-row" key={row.id}>
                  <strong className="block">{row.name}</strong>
                  <span className="muted block">{row.className}</span>
                  <span>{row.obtained}</span>
                  <span>{row.totalMarks}</span>
                  <strong className="num">{row.percent}%</strong>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ClipboardCheck}
              title="No marks entered"
              text="Enter marks for a subject and class to see the record here."
            />
          )}
        </div>
      </div>
    </div>
  )
}
