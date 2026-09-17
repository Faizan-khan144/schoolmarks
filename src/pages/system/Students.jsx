
import { useMemo, useState } from "react"
import {
  ArrowDownUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Users,
  X
} from "lucide-react"
import "./Students.css"

const initialStudents = [
  {
    id: 1,
    name: "Ayaan Khan",
    roll: "901",
    className: "9-A",
    email: "ayaan@example.com",
    phone: "+92 300 1234567",
    attendance: 96,
    average: 87,
    status: "Excellent",
    joined: "01 Aug 2026"
  },
  {
    id: 2,
    name: "Areeba Khan",
    roll: "905",
    className: "9-B",
    email: "areeba@example.com",
    phone: "+92 301 4567890",
    attendance: 98,
    average: 91,
    status: "Excellent",
    joined: "01 Aug 2026"
  },
  {
    id: 3,
    name: "Maham Ali",
    roll: "903",
    className: "9-A",
    email: "maham@example.com",
    phone: "+92 302 2345678",
    attendance: 91,
    average: 82,
    status: "Good",
    joined: "03 Aug 2026"
  },
  {
    id: 4,
    name: "Hassan Raza",
    roll: "904",
    className: "9-C",
    email: "hassan@example.com",
    phone: "+92 303 3456789",
    attendance: 88,
    average: 76,
    status: "Good",
    joined: "04 Aug 2026"
  },
  {
    id: 5,
    name: "Rayyan Malik",
    roll: "906",
    className: "9-C",
    email: "rayyan@example.com",
    phone: "+92 304 4567890",
    attendance: 79,
    average: 64,
    status: "Attention",
    joined: "06 Aug 2026"
  },
  {
    id: 6,
    name: "Zayan Ahmed",
    roll: "902",
    className: "9-B",
    email: "zayan@example.com",
    phone: "+92 305 5678901",
    attendance: 73,
    average: 51,
    status: "At Risk",
    joined: "07 Aug 2026"
  },
  {
    id: 7,
    name: "Hiba Fatima",
    roll: "907",
    className: "9-A",
    email: "hiba@example.com",
    phone: "+92 306 6789012",
    attendance: 94,
    average: 89,
    status: "Excellent",
    joined: "08 Aug 2026"
  },
  {
    id: 8,
    name: "Hamza Saeed",
    roll: "908",
    className: "9-B",
    email: "hamza@example.com",
    phone: "+92 307 7890123",
    attendance: 86,
    average: 73,
    status: "Good",
    joined: "10 Aug 2026"
  },
  {
    id: 9,
    name: "Alina Noor",
    roll: "909",
    className: "9-C",
    email: "alina@example.com",
    phone: "+92 308 8901234",
    attendance: 97,
    average: 94,
    status: "Excellent",
    joined: "11 Aug 2026"
  }
]

const classes = ["All classes", "9-A", "9-B", "9-C", "10-A", "10-B"]

const getInitials = name =>
  name
    .trim()
    .split(/\s+/)
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

const getAvatarClass = id => {
  const styles = ["sage", "sand", "lavender", "blue", "rose"]
  return styles[Math.abs(Number(id)) % styles.length]
}

const getStudentStatus = average => {
  if (average >= 85) return "Excellent"
  if (average >= 70) return "Good"
  if (average >= 50) return "Attention"
  return "At Risk"
}

function SummaryCard({ label, value, detail, icon: Icon, index }) {
  return (
    <article
      className="students-summary-card"
      style={{ "--student-delay": `${index * 65}ms` }}
    >
      <div className="students-summary-top">
        <span>{label}</span>

        <i>
          <Icon size={17} />
        </i>
      </div>

      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  )
}

function StudentAvatar({ student, large = false }) {
  return (
    <span
      className={`student-page-avatar ${getAvatarClass(student.id)} ${
        large ? "large" : ""
      }`}
    >
      {getInitials(student.name)}
    </span>
  )
}

function StudentDetails({ student, onClose }) {
  return (
    <div className="student-drawer-backdrop" onClick={onClose}>
      <aside
        className="student-drawer"
        onClick={event => event.stopPropagation()}
      >
        <div className="student-drawer-top">
          <span>STUDENT PROFILE</span>

          <button type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="student-profile-header">
          <StudentAvatar student={student} large />

          <div>
            <h2>{student.name}</h2>

            <p>
              Roll {student.roll} · Class {student.className}
            </p>
          </div>

          <span className={`student-status ${getStatusClass(student.status)}`}>
            {student.status}
          </span>
        </div>

        <div className="student-profile-stats">
          <div>
            <span>Average</span>
            <strong>{student.average}%</strong>
            <small>academic performance</small>
          </div>

          <div>
            <span>Attendance</span>
            <strong>{student.attendance}%</strong>
            <small>current attendance</small>
          </div>
        </div>

        <div className="drawer-section">
          <span className="drawer-label">CONTACT</span>

          <div className="drawer-info">
            <div>
              <span>Email</span>
              <strong>{student.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{student.phone}</strong>
            </div>

            <div>
              <span>Joined</span>
              <strong>{student.joined}</strong>
            </div>
          </div>
        </div>

        <div className="drawer-section">
          <span className="drawer-label">PERFORMANCE SIGNAL</span>

          <div className="student-signal">
            <div className="signal-icon">
              <Sparkles size={16} />
            </div>

            <div>
              <strong>
                {student.status === "Excellent"
                  ? "Consistently performing above target"
                  : student.status === "At Risk"
                    ? "Academic intervention recommended"
                    : "Performance should be monitored"}
              </strong>

              <p>
                SchoolMarks can use this profile for performance,
                attendance and result analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="drawer-actions">
          <button type="button" className="drawer-primary">
            View full profile
            <ArrowUpRight size={15} />
          </button>

          <button type="button" className="drawer-secondary">
            Record marks
          </button>
        </div>
      </aside>
    </div>
  )
}

function AddStudentModal({ students, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    className: "9-A",
    email: "",
    phone: ""
  })

  const [error, setError] = useState("")

  const update = (field, value) => {
    setError("")

    setForm(current => ({
      ...current,
      [field]: value
    }))
  }

  const createStudent = () => {
    const name = form.name.trim()
    const roll = form.roll.trim()
    const className = form.className
    const email = form.email.trim()
    const phone = form.phone.trim()

    if (!name) {
      setError("Please enter the student's full name.")
      return
    }

    if (!roll) {
      setError("Please enter a roll number.")
      return
    }

    const duplicateRoll = students.some(
      student => String(student.roll).trim() === roll
    )

    if (duplicateRoll) {
      setError(`Roll number ${roll} is already assigned.`)
      return
    }

    const newStudent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      roll,
      className,
      email: email || "Not provided",
      phone: phone || "Not provided",
      attendance: 100,
      average: 0,
      status: "Attention",
      joined: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    }

    onAdd(newStudent)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createStudent()
  }

  return (
    <div className="student-modal-backdrop" onClick={onClose}>
      <div
        className="add-student-modal"
        onClick={event => event.stopPropagation()}
      >
        <div className="add-modal-header">
          <div>
            <span>STUDENT DIRECTORY</span>
            <h2>Add a student</h2>
            <p>Create a new student record in SchoolMarks.</p>
          </div>

          <button type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="student-form-grid">
            <label>
              <span>Full name</span>

              <input
                type="text"
                value={form.name}
                onChange={event => update("name", event.target.value)}
                placeholder="e.g. Ahmed Khan"
                autoFocus
              />
            </label>

            <label>
              <span>Roll number</span>

              <input
                type="text"
                inputMode="numeric"
                value={form.roll}
                onChange={event => update("roll", event.target.value)}
                placeholder="e.g. 910"
              />
            </label>

            <label>
              <span>Class</span>

              <div className="select-field">
                <select
                  value={form.className}
                  onChange={event =>
                    update("className", event.target.value)
                  }
                >
                  <option value="9-A">9-A</option>
                  <option value="9-B">9-B</option>
                  <option value="9-C">9-C</option>
                  <option value="10-A">10-A</option>
                  <option value="10-B">10-B</option>
                </select>

                <ChevronDown size={15} />
              </div>
            </label>

            <label>
              <span>Email</span>

              <input
                type="text"
                value={form.email}
                onChange={event => update("email", event.target.value)}
                placeholder="student@example.com"
              />
            </label>

            <label className="full">
              <span>Phone</span>

              <input
                type="text"
                value={form.phone}
                onChange={event => update("phone", event.target.value)}
                placeholder="+92 300 0000000"
              />
            </label>
          </div>

          {error && (
            <div
              style={{
                marginTop: "13px",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid #efd9d7",
                background: "#fff8f7",
                color: "#a34f47",
                fontSize: "9px",
                fontWeight: 700
              }}
            >
              {error}
            </div>
          )}

          <div className="add-modal-footer">
            <button
              type="button"
              className="cancel-student"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-student"
              onClick={createStudent}
            >
              <Check size={15} />
              Create student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Students() {
  const [students, setStudents] = useState(initialStudents)
  const [search, setSearch] = useState("")
  const [selectedClass, setSelectedClass] = useState("All classes")
  const [statusFilter, setStatusFilter] = useState("All status")
  const [sortBy, setSortBy] = useState("name")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = students.filter(student => {
      const matchesSearch =
        !query ||
        `${student.name} ${student.roll} ${student.className} ${student.email}`
          .toLowerCase()
          .includes(query)

      const matchesClass =
        selectedClass === "All classes" ||
        student.className === selectedClass

      const matchesStatus =
        statusFilter === "All status" ||
        student.status === statusFilter

      return matchesSearch && matchesClass && matchesStatus
    })

    return [...result].sort((a, b) => {
      if (sortBy === "performance") {
        return Number(b.average) - Number(a.average)
      }

      if (sortBy === "attendance") {
        return Number(b.attendance) - Number(a.attendance)
      }

      if (sortBy === "roll") {
        return Number(a.roll) - Number(b.roll)
      }

      return a.name.localeCompare(b.name)
    })
  }, [students, search, selectedClass, statusFilter, sortBy])

  const stats = useMemo(() => {
    const average =
      students.reduce(
        (sum, student) => sum + Number(student.average || 0),
        0
      ) / (students.length || 1)

    const attendance =
      students.reduce(
        (sum, student) => sum + Number(student.attendance || 0),
        0
      ) / (students.length || 1)

    const atRisk = students.filter(
      student => student.status === "At Risk"
    ).length

    return {
      total: students.length,
      average: average.toFixed(1),
      attendance: attendance.toFixed(1),
      atRisk
    }
  }, [students])

  const allVisibleSelected =
    filteredStudents.length > 0 &&
    filteredStudents.every(student => selectedIds.includes(student.id))

  const toggleStudent = id => {
    setSelectedIds(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    )
  }

  const toggleAll = () => {
    const visibleIds = filteredStudents.map(student => student.id)

    if (allVisibleSelected) {
      setSelectedIds(current =>
        current.filter(id => !visibleIds.includes(id))
      )
    } else {
      setSelectedIds(current => [
        ...new Set([...current, ...visibleIds])
      ])
    }
  }

  const addStudent = student => {
    setStudents(current => [...current, student])
    setSelectedClass("All classes")
    setStatusFilter("All status")
    setSearch("")
    setSortBy("name")
    setSelectedIds([])
    setShowAdd(false)
  }

  const deleteSelected = () => {
    if (!selectedIds.length) return

    setStudents(current =>
      current.filter(student => !selectedIds.includes(student.id))
    )

    setSelectedIds([])
  }

  return (
    <div className="students-page">
      <div className="students-page-glow" />

      <header className="students-page-header">
        <div>
          <div className="students-page-kicker">
            <span />
            SCHOOLMARKS · DIRECTORY
          </div>

          <h1>
            Students
            <em> directory.</em>
          </h1>

          <p>
            Keep every student record organized, searchable and ready for
            action.
          </p>
        </div>

        <button
          type="button"
          className="students-add-button"
          onClick={() => setShowAdd(true)}
        >
          <Plus size={17} />
          Add student
        </button>
      </header>

      <section className="students-summary-grid">
        <SummaryCard
          index={0}
          label="TOTAL STUDENTS"
          value={stats.total}
          detail="active records"
          icon={Users}
        />

        <SummaryCard
          index={1}
          label="AVG. PERFORMANCE"
          value={`${stats.average}%`}
          detail="across all students"
          icon={Sparkles}
        />

        <SummaryCard
          index={2}
          label="AVG. ATTENDANCE"
          value={`${stats.attendance}%`}
          detail="current school average"
          icon={Check}
        />

        <SummaryCard
          index={3}
          label="AT RISK"
          value={stats.atRisk}
          detail="requires attention"
          icon={SlidersHorizontal}
        />
      </section>

      <section className="students-directory-card">
        <div className="students-directory-header">
          <div>
            <span className="students-section-label">ALL RECORDS</span>
            <h2>Student directory</h2>
          </div>

          <div className="students-directory-meta">
            <span>{filteredStudents.length} visible</span>

            {selectedIds.length > 0 && (
              <button
                type="button"
                className="selected-delete"
                onClick={deleteSelected}
              >
                <Trash2 size={14} />
                Delete {selectedIds.length}
              </button>
            )}
          </div>
        </div>

        <div className="students-toolbar">
          <div className="students-search-box">
            <Search size={16} />

            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search by name, roll number or class..."
            />

            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="students-toolbar-actions">
            <div className="student-select-wrap">
              <select
                value={selectedClass}
                onChange={event => setSelectedClass(event.target.value)}
              >
                {classes.map(item => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <ChevronDown size={14} />
            </div>

            <button
              type="button"
              className={`filter-button ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(current => !current)}
            >
              <Filter size={15} />
              Filters
            </button>

            <div className="student-sort-wrap">
              <ArrowDownUp size={14} />

              <select
                value={sortBy}
                onChange={event => setSortBy(event.target.value)}
              >
                <option value="name">Name</option>
                <option value="roll">Roll number</option>
                <option value="performance">Performance</option>
                <option value="attendance">Attendance</option>
              </select>
            </div>

            <button type="button" className="more-directory">
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="advanced-filters">
            <div>
              <span>Status</span>

              <div className="filter-chips">
                {[
                  "All status",
                  "Excellent",
                  "Good",
                  "Attention",
                  "At Risk"
                ].map(status => (
                  <button
                    type="button"
                    key={status}
                    className={
                      statusFilter === status ? "active" : ""
                    }
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="clear-filters"
              onClick={() => {
                setStatusFilter("All status")
                setSelectedClass("All classes")
                setSearch("")
              }}
            >
              Clear all
            </button>
          </div>
        )}

        <div className="student-table">
          <div className="student-table-header">
            <label className="student-checkbox">
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={toggleAll}
              />
              <span />
            </label>

            <span>STUDENT</span>
            <span>CLASS</span>
            <span>PERFORMANCE</span>
            <span>ATTENDANCE</span>
            <span>STATUS</span>
            <span />
          </div>

          <div className="student-table-body">
            {filteredStudents.map((student, index) => {
              const selected = selectedIds.includes(student.id)

              return (
                <div
                  className={`student-table-row ${selected ? "selected" : ""}`}
                  key={student.id}
                  style={{ "--row-delay": `${index * 35}ms` }}
                >
                  <label className="student-checkbox">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleStudent(student.id)}
                    />
                    <span />
                  </label>

                  <button
                    type="button"
                    className="student-identity"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <StudentAvatar student={student} />

                    <span>
                      <strong>{student.name}</strong>

                      <small>
                        Roll {student.roll} · {student.email}
                      </small>
                    </span>
                  </button>

                  <div className="student-class-cell">
                    <strong>{student.className}</strong>
                    <small>2026</small>
                  </div>

                  <div className="student-performance-cell">
                    <strong>{student.average}%</strong>

                    <div>
                      <span
                        style={{
                          width: `${student.average}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="student-attendance-cell">
                    <strong>{student.attendance}%</strong>

                    <div>
                      <span
                        style={{
                          width: `${student.attendance}%`
                        }}
                      />
                    </div>
                  </div>

                  <span
                    className={`student-status ${getStatusClass(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>

                  <button
                    type="button"
                    className="student-row-arrow"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )
            })}

            {!filteredStudents.length && (
              <div className="students-empty">
                <div>
                  <Search size={22} />
                </div>

                <strong>No students found</strong>

                <p>
                  Try another search term or clear your filters.
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="students-directory-footer">
          <span>
            Showing <strong>{filteredStudents.length}</strong> of{" "}
            <strong>{students.length}</strong> students
          </span>

          <div className="directory-pagination">
            <button type="button" disabled>
              Previous
            </button>

            <span>1</span>

            <button type="button">Next</button>
          </div>
        </footer>
      </section>

      <section className="students-insight">
        <div className="students-insight-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <span>STUDENT INTELLIGENCE</span>

          <h3>
            Everything important starts with a clean student record.
          </h3>

          <p>
            Performance, attendance, marks and results can all be connected
            to these profiles as the SchoolMarks system grows.
          </p>
        </div>

        <button type="button">
          Explore insights
          <ArrowUpRight size={15} />
        </button>
      </section>

      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {showAdd && (
        <AddStudentModal
          students={students}
          onClose={() => setShowAdd(false)}
          onAdd={addStudent}
        />
      )}
    </div>
  )
}

