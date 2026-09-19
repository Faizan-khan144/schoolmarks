import { useMemo, useState } from "react"
import { Plus, Search, X } from "lucide-react"
import { useData } from "../../store/DataContext"
import { PageHeader } from "../../components/PageHeader"
import { Avatar } from "../../components/Avatar"
import { StatusPill } from "../../components/Badge"
import { EmptyState } from "../../components/EmptyState"

function gradeStatus(average) {
  if (!Number(average)) return { label: "New", tone: "neutral" }
  if (average >= 90) return { label: "Excellent", tone: "success" }
  if (average >= 80) return { label: "On track", tone: "info" }
  return { label: "Needs attention", tone: "warning" }
}

export default function StudentsPage({ navigate }) {
  const { students, classes, createStudent } = useData()
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({
    name: "",
    className: classes[0]?.id || ""
  })

  const filtered = useMemo(
    () =>
      students.filter(student =>
        student.name.toLowerCase().includes(query.toLowerCase())
      ),
    [students, query]
  )

  const addStudent = event => {
    event.preventDefault()
    if (!form.name.trim()) return
    createStudent({
      name: form.name.trim(),
      classId: form.className
    })
    setForm({ name: "", className: classes[0]?.id || "" })
    setModal(false)
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="STUDENTS"
        title="Student directory"
        description="Manage every student from one connected academic record."
        actions={
          <button className="button button-primary button-sm" onClick={() => setModal(true)}>
            <Plus size={16} /> Add student
          </button>
        }
      />

      <div className="panel">
        <div className="panel-body">
          <div className="toolbar">
            <div className="search-field">
              <Search size={16} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search students..."
              />
            </div>
            <span className="muted">{filtered.length} students</span>
          </div>

          {filtered.length ? (
            <div className="data-table">
              <div className="table-row table-header">
                <span>Student</span>
                <span>Class</span>
                <span>Average</span>
                <span>Attendance</span>
                <span>Status</span>
              </div>

              {filtered.map(student => {
                const { label, tone } = gradeStatus(student.average)
                return (
                  <button
                    className="table-row"
                    key={student.id}
                    onClick={() => navigate("student-profile", student.id)}
                  >
                    <span className="table-student">
                      <Avatar name={student.name} size={28} />
                      {student.name}
                    </span>
                    <span>
                      {student.className} {student.section}
                    </span>
                    <strong>{student.average || "—"}%</strong>
                    <span>{student.attendance || "—"}%</span>
                    <span className="status-cell">
                      <StatusPill tone={tone}>{label}</StatusPill>
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title="No students found"
              text={query ? "Try another search." : "Add your first student to get started."}
            />
          )}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal modal-sm" onClick={event => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="modal-eyebrow">NEW STUDENT</div>
                <h2>Add a student</h2>
              </div>
              <button className="icon-button" onClick={() => setModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="modal-body stack" onSubmit={addStudent}>
              <label>
                <span className="field-label">Full name</span>
                <input
                  className="input"
                  value={form.name}
                  onChange={event => setForm({ ...form, name: event.target.value })}
                  placeholder="e.g. Ahmed Raza"
                  autoFocus
                />
              </label>

              <label>
                <span className="field-label">Class</span>
                <select
                  className="input"
                  value={form.className}
                  onChange={event => setForm({ ...form, className: event.target.value })}
                >
                  {classes.map(classItem => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name} {classItem.section}
                    </option>
                  ))}
                </select>
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="button button-light"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="button button-primary">
                  Add student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
