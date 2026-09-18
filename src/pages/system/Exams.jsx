import { useEffect, useMemo, useState } from "react"
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X
} from "lucide-react"
import "./exams.css"

const defaultExams = [
  {
    id: 1,
    name: "Mid-Term Examination",
    className: "9-A",
    subject: "Mathematics",
    date: "2026-09-25",
    totalMarks: 100
  },
  {
    id: 2,
    name: "Science Assessment",
    className: "9-B",
    subject: "Physics",
    date: "2026-09-28",
    totalMarks: 75
  },
  {
    id: 3,
    name: "English Monthly Test",
    className: "9-C",
    subject: "English",
    date: "2026-10-02",
    totalMarks: 50
  }
]

const emptyForm = {
  name: "",
  className: "9-A",
  subject: "Mathematics",
  date: "",
  totalMarks: ""
}

const formatDate = date => {
  if (!date) return "No date"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

const getExamStatus = date => {
  if (!date) return "No date"

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const examDate = new Date(`${date}T00:00:00`)
  const difference = Math.ceil(
    (examDate.getTime() - today.getTime()) / 86400000
  )

  if (difference < 0) return "Completed"
  if (difference === 0) return "Today"
  if (difference <= 7) return "This week"
  return "Upcoming"
}

function ExamModal({
  open,
  editingExam,
  form,
  setForm,
  onClose,
  onSubmit
}) {
  if (!open) return null

  const updateField = (field, value) => {
    setForm(current => ({
      ...current,
      [field]: value
    }))
  }

  return (
    <div className="exam-modal-backdrop" onClick={onClose}>
      <div
        className="exam-modal"
        onClick={event => event.stopPropagation()}
      >
        <div className="exam-modal-top">
          <div>
            <span className="exam-modal-label">
              {editingExam ? "EDIT EXAM" : "NEW EXAM"}
            </span>
            <h2>{editingExam ? "Update examination" : "Create an examination"}</h2>
            <p>
              {editingExam
                ? "Update the examination details below."
                : "Add a new examination to your academic schedule."}
            </p>
          </div>

          <button className="exam-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="exam-form-grid">
            <label className="exam-field exam-field-full">
              <span>Exam name</span>
              <input
                value={form.name}
                onChange={event => updateField("name", event.target.value)}
                placeholder="e.g. Mid-Term Examination"
                required
              />
            </label>

            <label className="exam-field">
              <span>Class</span>
              <div className="exam-select-wrap">
                <select
                  value={form.className}
                  onChange={event =>
                    updateField("className", event.target.value)
                  }
                >
                  <option>9-A</option>
                  <option>9-B</option>
                  <option>9-C</option>
                  <option>10-A</option>
                  <option>10-B</option>
                  <option>10-C</option>
                </select>
                <ChevronDown size={16} />
              </div>
            </label>

            <label className="exam-field">
              <span>Subject</span>
              <div className="exam-select-wrap">
                <select
                  value={form.subject}
                  onChange={event =>
                    updateField("subject", event.target.value)
                  }
                >
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>English</option>
                  <option>Computer Science</option>
                  <option>Urdu</option>
                  <option>Islamiat</option>
                  <option>Pakistan Studies</option>
                </select>
                <ChevronDown size={16} />
              </div>
            </label>

            <label className="exam-field">
              <span>Exam date</span>
              <input
                type="date"
                value={form.date}
                onChange={event => updateField("date", event.target.value)}
                required
              />
            </label>

            <label className="exam-field">
              <span>Total marks</span>
              <input
                type="number"
                min="1"
                value={form.totalMarks}
                onChange={event =>
                  updateField("totalMarks", event.target.value)
                }
                placeholder="100"
                required
              />
            </label>
          </div>

          <div className="exam-modal-actions">
            <button
              type="button"
              className="exam-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="exam-save">
              <Check size={16} />
              {editingExam ? "Save changes" : "Add exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ExamCard({ exam, onEdit, onDelete }) {
  const status = getExamStatus(exam.date)

  return (
    <article className="exam-card">
      <div className="exam-card-top">
        <div className="exam-card-icon">
          <FileText size={19} />
        </div>

        <div className="exam-card-actions">
          <button onClick={() => onEdit(exam)} title="Edit exam">
            <Edit3 size={16} />
          </button>

          <button
            className="delete-action"
            onClick={() => onDelete(exam.id)}
            title="Delete exam"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="exam-card-content">
        <span className="exam-subject">{exam.subject}</span>

        <h3>{exam.name}</h3>

        <div className="exam-meta">
          <span>
            <CalendarDays size={14} />
            {formatDate(exam.date)}
          </span>

          <span>
            <FileText size={14} />
            {exam.totalMarks} marks
          </span>
        </div>
      </div>

      <div className="exam-card-bottom">
        <span className="exam-class">{exam.className}</span>

        <span
          className={`exam-status ${status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <span />
          {status}
        </span>
      </div>
    </article>
  )
}

export default function Exams() {
  const [exams, setExams] = useState(() => {
    try {
      const saved = localStorage.getItem("schoolmarks-exams")
      return saved ? JSON.parse(saved) : defaultExams
    } catch {
      return defaultExams
    }
  })

  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [subjectFilter, setSubjectFilter] = useState("All")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState("")

  useEffect(() => {
    localStorage.setItem("schoolmarks-exams", JSON.stringify(exams))
  }, [exams])

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      setToast("")
    }, 2800)

    return () => clearTimeout(timer)
  }, [toast])

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase()

    return exams
      .filter(exam => {
        const matchesSearch =
          !query ||
          `${exam.name} ${exam.subject} ${exam.className}`
            .toLowerCase()
            .includes(query)

        const matchesClass =
          classFilter === "All" || exam.className === classFilter

        const matchesSubject =
          subjectFilter === "All" || exam.subject === subjectFilter

        return matchesSearch && matchesClass && matchesSubject
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [exams, search, classFilter, subjectFilter])

  const upcomingCount = exams.filter(exam => {
    const status = getExamStatus(exam.date)
    return status === "Upcoming" || status === "Today" || status === "This week"
  }).length

  const completedCount = exams.filter(
    exam => getExamStatus(exam.date) === "Completed"
  ).length

  const totalMarks = exams.reduce(
    (sum, exam) => sum + Number(exam.totalMarks || 0),
    0
  )

  const openCreateModal = () => {
    setEditingExam(null)
    setForm({
      ...emptyForm,
      date: new Date().toISOString().split("T")[0]
    })
    setModalOpen(true)
  }

  const openEditModal = exam => {
    setEditingExam(exam)
    setForm({
      name: exam.name,
      className: exam.className,
      subject: exam.subject,
      date: exam.date,
      totalMarks: exam.totalMarks
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingExam(null)
    setForm(emptyForm)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const examData = {
      name: form.name.trim(),
      className: form.className,
      subject: form.subject,
      date: form.date,
      totalMarks: Number(form.totalMarks)
    }

    if (!examData.name || !examData.date || !examData.totalMarks) {
      return
    }

    if (editingExam) {
      setExams(current =>
        current.map(exam =>
          exam.id === editingExam.id
            ? {
                ...exam,
                ...examData
              }
            : exam
        )
      )

      setToast("Exam updated successfully")
    } else {
      setExams(current => [
        ...current,
        {
          id: Date.now(),
          ...examData
        }
      ])

      setToast("Exam added successfully")
    }

    closeModal()
  }

  const handleDelete = id => {
    const exam = exams.find(item => item.id === id)

    if (!exam) return

    const confirmed = window.confirm(
      `Delete "${exam.name}"? This action cannot be undone.`
    )

    if (!confirmed) return

    setExams(current => current.filter(item => item.id !== id))
    setToast("Exam deleted")
  }

  return (
    <div className="exams-page">
      <div className="exams-background" />

      <header className="exams-header">
        <div>
          <div className="exams-kicker">
            <span />
            SCHOOLMARKS · EXAM CENTER
          </div>

          <h1>
            Examination
            <em> schedule.</em>
          </h1>

          <p>
            Create, manage and organize examinations across your classes.
          </p>
        </div>

        <button className="add-exam-button" onClick={openCreateModal}>
          <Plus size={18} />
          Add exam
        </button>
      </header>

      <section className="exam-stats">
        <div className="exam-stat">
          <div className="exam-stat-icon">
            <FileText size={18} />
          </div>

          <div>
            <span>Total exams</span>
            <strong>{exams.length}</strong>
          </div>
        </div>

        <div className="exam-stat">
          <div className="exam-stat-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <span>Upcoming</span>
            <strong>{upcomingCount}</strong>
          </div>
        </div>

        <div className="exam-stat">
          <div className="exam-stat-icon">
            <Check size={18} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>

        <div className="exam-stat">
          <div className="exam-stat-icon">
            <MoreHorizontal size={18} />
          </div>

          <div>
            <span>Total marks</span>
            <strong>{totalMarks}</strong>
          </div>
        </div>
      </section>

      <section className="exam-toolbar">
        <div className="exam-search">
          <Search size={17} />

          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search exams, subjects or classes..."
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="exam-filters">
          <div className="exam-filter">
            <select
              value={classFilter}
              onChange={event => setClassFilter(event.target.value)}
            >
              <option>All</option>
              <option>9-A</option>
              <option>9-B</option>
              <option>9-C</option>
              <option>10-A</option>
              <option>10-B</option>
              <option>10-C</option>
            </select>
            <ChevronDown size={14} />
          </div>

          <div className="exam-filter">
            <select
              value={subjectFilter}
              onChange={event => setSubjectFilter(event.target.value)}
            >
              <option>All</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
              <option>English</option>
              <option>Computer Science</option>
              <option>Urdu</option>
              <option>Islamiat</option>
              <option>Pakistan Studies</option>
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </section>

      <section className="exams-section">
        <div className="exams-section-heading">
          <div>
            <span>EXAMINATION RECORDS</span>
            <h2>
              {filteredExams.length}{" "}
              {filteredExams.length === 1 ? "examination" : "examinations"}
            </h2>
          </div>

          <span className="exam-live-indicator">
            <i />
            Live records
          </span>
        </div>

        {filteredExams.length > 0 ? (
          <div className="exam-grid">
            {filteredExams.map((exam, index) => (
              <div
                key={exam.id}
                className="exam-card-wrapper"
                style={{ "--exam-delay": `${index * 60}ms` }}
              >
                <ExamCard
                  exam={exam}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="exam-empty">
            <div className="exam-empty-icon">
              <FileText size={25} />
            </div>

            <h3>No examinations found</h3>

            <p>
              {exams.length === 0
                ? "Create your first examination to start building the academic schedule."
                : "Try changing your search or filters."}
            </p>

            {exams.length === 0 && (
              <button onClick={openCreateModal}>
                <Plus size={16} />
                Create first exam
              </button>
            )}
          </div>
        )}
      </section>

      <ExamModal
        open={modalOpen}
        editingExam={editingExam}
        form={form}
        setForm={setForm}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      {toast && (
        <div className="exam-toast">
          <span>
            <Check size={15} />
          </span>
          {toast}
        </div>
      )}
    </div>
  )
}