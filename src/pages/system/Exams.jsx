import { useMemo, useState } from "react"
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  FileText,
  Plus,
  Search,
  Trash2,
  X
} from "lucide-react"
import {
  addExam,
  deleteExam,
  getExams,
  updateExam
} from "../../utils/storage"
import "./exams.css"

const classes = ["9-A", "9-B", "9-C", "10-A", "10-B", "10-C"]

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "Urdu",
  "Islamiat",
  "Pakistan Studies"
]

const emptyForm = {
  name: "",
  className: "9-A",
  subject: "Mathematics",
  date: "",
  totalMarks: ""
}

const getStatus = date => {
  if (!date) return "Upcoming"

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

const formatDate = date => {
  if (!date) return "No date"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
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

  const change = (field, value) => {
    setForm(current => ({
      ...current,
      [field]: value
    }))
  }

  return (
    <div className="exam-modal-overlay" onClick={onClose}>
      <div
        className="exam-modal"
        onClick={event => event.stopPropagation()}
      >
        <div className="exam-modal-header">
          <div>
            <span className="exam-modal-eyebrow">
              {editingExam ? "EDIT EXAM" : "NEW EXAM"}
            </span>

            <h2>
              {editingExam
                ? "Update examination"
                : "Create an examination"}
            </h2>

            <p>
              {editingExam
                ? "Update the details of this examination."
                : "Add a new examination to your school schedule."}
            </p>
          </div>

          <button className="exam-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="exam-form-grid">
            <label className="exam-field exam-field-full">
              <span>Exam name</span>

              <input
                type="text"
                value={form.name}
                onChange={event => change("name", event.target.value)}
                placeholder="e.g. Mid-Term Examination"
                required
              />
            </label>

            <label className="exam-field">
              <span>Class</span>

              <div className="exam-select">
                <select
                  value={form.className}
                  onChange={event =>
                    change("className", event.target.value)
                  }
                >
                  {classes.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <ChevronDown size={15} />
              </div>
            </label>

            <label className="exam-field">
              <span>Subject</span>

              <div className="exam-select">
                <select
                  value={form.subject}
                  onChange={event =>
                    change("subject", event.target.value)
                  }
                >
                  {subjects.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <ChevronDown size={15} />
              </div>
            </label>

            <label className="exam-field">
              <span>Exam date</span>

              <input
                type="date"
                value={form.date}
                onChange={event => change("date", event.target.value)}
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
                  change("totalMarks", event.target.value)
                }
                placeholder="100"
                required
              />
            </label>
          </div>

          <div className="exam-modal-footer">
            <button
              type="button"
              className="exam-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="exam-submit">
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
  const status = getStatus(exam.date)

  return (
    <article className="exam-card">
      <div className="exam-card-top">
        <div className="exam-card-icon">
          <FileText size={19} />
        </div>

        <div className="exam-card-actions">
          <button onClick={() => onEdit(exam)}>
            <Edit3 size={15} />
          </button>

          <button
            className="exam-delete"
            onClick={() => onDelete(exam.id)}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="exam-card-body">
        <span className="exam-subject">{exam.subject}</span>

        <h3>{exam.name}</h3>

        <div className="exam-details">
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

      <div className="exam-card-footer">
        <strong>{exam.className}</strong>

        <span
          className={`exam-status ${status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <i />
          {status}
        </span>
      </div>
    </article>
  )
}

export default function Exams() {
  const [exams, setExams] = useState(() => getExams())
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [subjectFilter, setSubjectFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [editingExam, setEditingExam] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState("")

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase()

    return [...exams]
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
      .sort(
        (a, b) =>
          new Date(a.date || "9999-12-31") -
          new Date(b.date || "9999-12-31")
      )
  }, [exams, search, classFilter, subjectFilter])

  const upcoming = exams.filter(exam => {
    const status = getStatus(exam.date)

    return (
      status === "Upcoming" ||
      status === "Today" ||
      status === "This week"
    )
  }).length

  const completed = exams.filter(
    exam => getStatus(exam.date) === "Completed"
  ).length

  const totalMarks = exams.reduce(
    (sum, exam) => sum + Number(exam.totalMarks || 0),
    0
  )

  const showMessage = text => {
    setMessage(text)

    setTimeout(() => {
      setMessage("")
    }, 2500)
  }

  const openAddModal = () => {
    setEditingExam(null)

    setForm({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10)
    })

    setShowModal(true)
  }

  const openEditModal = exam => {
    setEditingExam(exam)

    setForm({
      name: exam.name || "",
      className: exam.className || "9-A",
      subject: exam.subject || "Mathematics",
      date: exam.date || "",
      totalMarks: exam.totalMarks || ""
    })

    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
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

    if (
      !examData.name ||
      !examData.className ||
      !examData.subject ||
      !examData.date ||
      !examData.totalMarks
    ) {
      showMessage("Please complete all fields")
      return
    }

    if (editingExam) {
      const updated = updateExam(editingExam.id, examData)

      setExams(current =>
        current.map(exam =>
          exam.id === editingExam.id ? updated : exam
        )
      )

      showMessage("Exam updated successfully")
    } else {
      const newExam = addExam(examData)

      setExams(current => [...current, newExam])

      showMessage("Exam added successfully")
    }

    closeModal()
  }

  const handleDelete = id => {
    const exam = exams.find(item => item.id === id)

    if (!exam) return

    const confirmed = window.confirm(
      `Delete "${exam.name}"?`
    )

    if (!confirmed) return

    deleteExam(id)

    setExams(current =>
      current.filter(item => item.id !== id)
    )

    showMessage("Exam deleted successfully")
  }

  return (
    <div className="exams-page">
      <div className="exams-glow exams-glow-one" />
      <div className="exams-glow exams-glow-two" />

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

        <button className="add-exam-button" onClick={openAddModal}>
          <Plus size={17} />
          Add exam
        </button>
      </header>

      <section className="exam-stats">
        <div className="exam-stat">
          <span className="exam-stat-icon">
            <FileText size={18} />
          </span>

          <div>
            <small>Total exams</small>
            <strong>{exams.length}</strong>
          </div>
        </div>

        <div className="exam-stat">
          <span className="exam-stat-icon">
            <Clock3 size={18} />
          </span>

          <div>
            <small>Upcoming</small>
            <strong>{upcoming}</strong>
          </div>
        </div>

        <div className="exam-stat">
          <span className="exam-stat-icon">
            <Check size={18} />
          </span>

          <div>
            <small>Completed</small>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="exam-stat">
          <span className="exam-stat-icon">
            <CalendarDays size={18} />
          </span>

          <div>
            <small>Total marks</small>
            <strong>{totalMarks}</strong>
          </div>
        </div>
      </section>

      <section className="exam-toolbar">
        <div className="exam-search">
          <Search size={16} />

          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search exams..."
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="exam-filters">
          <div>
            <select
              value={classFilter}
              onChange={event => setClassFilter(event.target.value)}
            >
              <option>All</option>
              {classes.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>

          <div>
            <select
              value={subjectFilter}
              onChange={event =>
                setSubjectFilter(event.target.value)
              }
            >
              <option>All</option>
              {subjects.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </section>

      <section className="exams-content">
        <div className="exams-content-heading">
          <div>
            <span>EXAMINATION RECORDS</span>
            <h2>
              {filteredExams.length}{" "}
              {filteredExams.length === 1
                ? "examination"
                : "examinations"}
            </h2>
          </div>

          <span className="exam-live">
            <i />
            Live records
          </span>
        </div>

        {filteredExams.length ? (
          <div className="exam-grid">
            {filteredExams.map((exam, index) => (
              <div
                key={exam.id}
                className="exam-card-wrap"
                style={{
                  "--exam-delay": `${index * 55}ms`
                }}
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
            <div>
              <FileText size={24} />
            </div>

            <h3>No examinations found</h3>

            <p>
              {exams.length
                ? "Try changing your search or filters."
                : "Create your first examination to start managing your exam schedule."}
            </p>

            {!exams.length && (
              <button onClick={openAddModal}>
                <Plus size={16} />
                Create first exam
              </button>
            )}
          </div>
        )}
      </section>

      <ExamModal
        open={showModal}
        editingExam={editingExam}
        form={form}
        setForm={setForm}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      {message && (
        <div className="exam-toast">
          <span>
            <Check size={15} />
          </span>
          {message}
        </div>
      )}
    </div>
  )
}