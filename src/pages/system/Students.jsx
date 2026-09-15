
import { useEffect, useMemo, useState } from "react";
import {
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  X,
  Save,
  Phone,
  Mail,
  CalendarDays,
  MapPin,
  ShieldCheck,
  ChevronDown,
  UserRound,
  Hash,
} from "lucide-react";

const STORAGE_KEY = "schoolmarks_students";

const initialStudents = [
  {
    id: 1,
    name: "Ahmed Raza",
    rollNumber: "SM-001",
    className: "9",
    section: "A",
    gender: "Male",
    guardian: "Muhammad Raza",
    phone: "+92 300 1234567",
    email: "ahmed.raza@example.com",
    admissionDate: "2026-01-12",
    status: "Active",
    address: "Gulshan-e-Iqbal, Karachi",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    rollNumber: "SM-002",
    className: "9",
    section: "A",
    gender: "Female",
    guardian: "Asad Khan",
    phone: "+92 301 7654321",
    email: "ayesha.khan@example.com",
    admissionDate: "2026-01-14",
    status: "Active",
    address: "North Nazimabad, Karachi",
  },
  {
    id: 3,
    name: "Hassan Ali",
    rollNumber: "SM-003",
    className: "8",
    section: "B",
    gender: "Male",
    guardian: "Ali Ahmed",
    phone: "+92 302 4567890",
    email: "hassan.ali@example.com",
    admissionDate: "2026-01-18",
    status: "Active",
    address: "PECHS, Karachi",
  },
  {
    id: 4,
    name: "Maham Fatima",
    rollNumber: "SM-004",
    className: "10",
    section: "A",
    gender: "Female",
    guardian: "Faisal Ahmed",
    phone: "+92 303 9876543",
    email: "maham.fatima@example.com",
    admissionDate: "2026-01-20",
    status: "Active",
    address: "Clifton, Karachi",
  },
  {
    id: 5,
    name: "Huzaifa Ahmed",
    rollNumber: "SM-005",
    className: "7",
    section: "A",
    gender: "Male",
    guardian: "Ahmed Hassan",
    phone: "+92 304 3456789",
    email: "huzaifa.ahmed@example.com",
    admissionDate: "2026-02-03",
    status: "Inactive",
    address: "Federal B Area, Karachi",
  },
  {
    id: 6,
    name: "Zoya Hassan",
    rollNumber: "SM-006",
    className: "8",
    section: "A",
    gender: "Female",
    guardian: "Hassan Tariq",
    phone: "+92 305 2345678",
    email: "zoya.hassan@example.com",
    admissionDate: "2026-02-06",
    status: "Active",
    address: "Johar, Karachi",
  },
];

const emptyForm = {
  name: "",
  rollNumber: "",
  className: "",
  section: "",
  gender: "",
  guardian: "",
  phone: "",
  email: "",
  admissionDate: "",
  status: "Active",
  address: "",
};

function loadStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
    return initialStudents;
  } catch {
    return initialStudents;
  }
}

function Avatar({ name, large = false }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`student-avatar ${large ? "student-avatar-large" : ""}`}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`student-status ${status.toLowerCase()}`}>
      <span />
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="students-stat-card">
      <div className="students-stat-icon">
        <Icon size={20} />
      </div>
      <div className="students-stat-content">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{description}</small>
      </div>
    </div>
  );
}

function StudentModal({
  open,
  mode,
  form,
  setForm,
  onClose,
  onSubmit,
}) {
  if (!open) return null;

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="student-modal-backdrop" onMouseDown={onClose}>
      <div
        className="student-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="student-modal-header">
          <div>
            <div className="student-modal-icon">
              {mode === "edit" ? <Pencil size={19} /> : <UserPlus size={19} />}
            </div>
            <div>
              <h3>{mode === "edit" ? "Edit Student" : "Add New Student"}</h3>
              <p>
                {mode === "edit"
                  ? "Update the student's information."
                  : "Create a new student profile."}
              </p>
            </div>
          </div>

          <button className="student-close-button" onClick={onClose}>
            <X size={19} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="student-form-section">
            <div className="student-form-section-title">
              <UserRound size={16} />
              <span>Personal Information</span>
            </div>

            <div className="student-form-grid">
              <label>
                <span>Full Name</span>
                <input
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="Enter student name"
                  required
                />
              </label>

              <label>
                <span>Gender</span>
                <div className="student-select-wrap">
                  <select
                    value={form.gender}
                    onChange={(event) =>
                      updateField("gender", event.target.value)
                    }
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                <span>Roll Number</span>
                <input
                  value={form.rollNumber}
                  onChange={(event) =>
                    updateField("rollNumber", event.target.value)
                  }
                  placeholder="e.g. SM-007"
                  required
                />
              </label>

              <label>
                <span>Admission Date</span>
                <input
                  type="date"
                  value={form.admissionDate}
                  onChange={(event) =>
                    updateField("admissionDate", event.target.value)
                  }
                  required
                />
              </label>
            </div>
          </div>

          <div className="student-form-section">
            <div className="student-form-section-title">
              <GraduationCap size={16} />
              <span>Academic Information</span>
            </div>

            <div className="student-form-grid">
              <label>
                <span>Class</span>
                <div className="student-select-wrap">
                  <select
                    value={form.className}
                    onChange={(event) =>
                      updateField("className", event.target.value)
                    }
                    required
                  >
                    <option value="">Select class</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                <span>Section</span>
                <div className="student-select-wrap">
                  <select
                    value={form.section}
                    onChange={(event) =>
                      updateField("section", event.target.value)
                    }
                    required
                  >
                    <option value="">Select section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                <span>Status</span>
                <div className="student-select-wrap">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value)
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>
            </div>
          </div>

          <div className="student-form-section">
            <div className="student-form-section-title">
              <ShieldCheck size={16} />
              <span>Guardian & Contact</span>
            </div>

            <div className="student-form-grid">
              <label>
                <span>Guardian Name</span>
                <input
                  value={form.guardian}
                  onChange={(event) =>
                    updateField("guardian", event.target.value)
                  }
                  placeholder="Parent / guardian name"
                  required
                />
              </label>

              <label>
                <span>Phone Number</span>
                <input
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  placeholder="+92 300 0000000"
                  required
                />
              </label>

              <label>
                <span>Email Address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="student@example.com"
                />
              </label>

              <label>
                <span>Address</span>
                <input
                  value={form.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  placeholder="Student address"
                />
              </label>
            </div>
          </div>

          <div className="student-modal-footer">
            <button type="button" className="student-secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="student-primary-btn">
              <Save size={17} />
              {mode === "edit" ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StudentDetails({ student, onClose, onEdit }) {
  if (!student) return null;

  return (
    <div className="student-modal-backdrop" onMouseDown={onClose}>
      <div
        className="student-details-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="student-details-top">
          <button className="student-close-button" onClick={onClose}>
            <X size={19} />
          </button>

          <div className="student-profile-heading">
            <Avatar name={student.name} large />
            <div>
              <div className="student-profile-name-row">
                <h2>{student.name}</h2>
                <StatusBadge status={student.status} />
              </div>
              <p>
                {student.rollNumber} · Class {student.className} -{" "}
                {student.section}
              </p>
            </div>
          </div>

          <button
            className="student-edit-profile-btn"
            onClick={() => onEdit(student)}
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>

        <div className="student-details-grid">
          <div className="student-detail-card">
            <span>Class</span>
            <strong>
              Class {student.className} - {student.section}
            </strong>
          </div>

          <div className="student-detail-card">
            <span>Roll Number</span>
            <strong>{student.rollNumber}</strong>
          </div>

          <div className="student-detail-card">
            <span>Gender</span>
            <strong>{student.gender || "Not provided"}</strong>
          </div>

          <div className="student-detail-card">
            <span>Admission Date</span>
            <strong>{student.admissionDate || "Not provided"}</strong>
          </div>
        </div>

        <div className="student-contact-section">
          <div className="student-contact-title">
            <ShieldCheck size={17} />
            Guardian & Contact Information
          </div>

          <div className="student-contact-grid">
            <div>
              <div className="student-contact-icon">
                <UserRound size={17} />
              </div>
              <div>
                <span>Guardian</span>
                <strong>{student.guardian}</strong>
              </div>
            </div>

            <div>
              <div className="student-contact-icon">
                <Phone size={17} />
              </div>
              <div>
                <span>Phone</span>
                <strong>{student.phone}</strong>
              </div>
            </div>

            <div>
              <div className="student-contact-icon">
                <Mail size={17} />
              </div>
              <div>
                <span>Email</span>
                <strong>{student.email || "Not provided"}</strong>
              </div>
            </div>

            <div>
              <div className="student-contact-icon">
                <MapPin size={17} />
              </div>
              <div>
                <span>Address</span>
                <strong>{student.address || "Not provided"}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Students() {
  const [students, setStudents] = useState(loadStudents);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [form, setForm] = useState(emptyForm);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [menuId, setMenuId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const classCount = new Set(
    students.map((student) => `${student.className}-${student.section}`)
  ).size;

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query) ||
        student.guardian.toLowerCase().includes(query);

      const matchesClass =
        classFilter === "All Classes" ||
        student.className === classFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        student.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, search, classFilter, statusFilter]);

  const openAddModal = () => {
    setModalMode("add");
    setForm({
      ...emptyForm,
      rollNumber: `SM-${String(students.length + 1).padStart(3, "0")}`,
      admissionDate: new Date().toISOString().split("T")[0],
    });
    setModalOpen(true);
  };

  const openEditModal = (student) => {
    setModalMode("edit");
    setForm({
      ...student,
    });
    setSelectedStudent(null);
    setMenuId(null);
    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modalMode === "edit") {
      setStudents((current) =>
        current.map((student) =>
          student.id === form.id ? { ...form } : student
        )
      );
    } else {
      setStudents((current) => [
        ...current,
        {
          ...form,
          id: Date.now(),
        },
      ]);
    }

    setModalOpen(false);
    setForm(emptyForm);
  };

  const handleDelete = (studentId) => {
    const student = students.find((item) => item.id === studentId);

    if (!student) return;

    const confirmed = window.confirm(
      `Delete ${student.name} from the student records?`
    );

    if (!confirmed) return;

    setStudents((current) =>
      current.filter((item) => item.id !== studentId)
    );

    setMenuId(null);
    setSelectedStudent(null);
  };

  const clearFilters = () => {
    setSearch("");
    setClassFilter("All Classes");
    setStatusFilter("All Status");
  };

  return (
    <div className="students-page">
      <div className="students-page-header">
        <div>
          <div className="students-breadcrumb">
            School Management <span>/</span> Students
          </div>

          <div className="students-title-row">
            <div>
              <h1>Students</h1>
              <p>
                Manage student records, academic information, and contacts.
              </p>
            </div>
          </div>
        </div>

        <button className="student-primary-btn" onClick={openAddModal}>
          <UserPlus size={18} />
          Add Student
        </button>
      </div>

      <div className="students-stat-grid">
        <StatCard
          icon={Users}
          label="Total Students"
          value={students.length}
          description="All student records"
        />

        <StatCard
          icon={UserCheck}
          label="Active Students"
          value={activeStudents}
          description="Currently enrolled"
        />

        <StatCard
          icon={UserX}
          label="Inactive"
          value={inactiveStudents}
          description="Not currently active"
        />

        <StatCard
          icon={GraduationCap}
          label="Class Groups"
          value={classCount}
          description="Active class sections"
        />
      </div>

      <div className="students-main-card">
        <div className="students-toolbar">
          <div className="students-toolbar-title">
            <div className="students-toolbar-icon">
              <Users size={18} />
            </div>
            <div>
              <h2>All Students</h2>
              <span>
                {filteredStudents.length} of {students.length} students
              </span>
            </div>
          </div>

          <div className="students-toolbar-actions">
            <div className="students-search">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students..."
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="students-filter">
              <Filter size={16} />
              <select
                value={classFilter}
                onChange={(event) => setClassFilter(event.target.value)}
              >
                <option>All Classes</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div className="students-filter">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {(search ||
          classFilter !== "All Classes" ||
          statusFilter !== "All Status") && (
          <div className="students-active-filters">
            <span>Active filters:</span>

            {search && (
              <button onClick={() => setSearch("")}>
                Search: {search}
                <X size={13} />
              </button>
            )}

            {classFilter !== "All Classes" && (
              <button onClick={() => setClassFilter("All Classes")}>
                {classFilter === "All Classes"
                  ? classFilter
                  : `Class ${classFilter}`}
                <X size={13} />
              </button>
            )}

            {statusFilter !== "All Status" && (
              <button onClick={() => setStatusFilter("All Status")}>
                {statusFilter}
                <X size={13} />
              </button>
            )}

            <button className="clear-filter-button" onClick={clearFilters}>
              Clear all
            </button>
          </div>
        )}

        <div className="students-table-wrap">
          {filteredStudents.length > 0 ? (
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll Number</th>
                  <th>Class</th>
                  <th>Guardian</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <button
                        className="student-name-cell"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Avatar name={student.name} />
                        <span>
                          <strong>{student.name}</strong>
                          <small>{student.gender || "Student"}</small>
                        </span>
                      </button>
                    </td>

                    <td>
                      <div className="student-roll">
                        <Hash size={14} />
                        {student.rollNumber}
                      </div>
                    </td>

                    <td>
                      <span className="student-class">
                        Class {student.className}
                        <small>Section {student.section}</small>
                      </span>
                    </td>

                    <td>
                      <span className="student-guardian">
                        {student.guardian}
                      </span>
                    </td>

                    <td>
                      <div className="student-contact-cell">
                        <span>{student.phone}</span>
                        <small>{student.email || "No email"}</small>
                      </div>
                    </td>

                    <td>
                      <StatusBadge status={student.status} />
                    </td>

                    <td>
                      <div className="student-row-actions">
                        <button
                          title="View student"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Edit student"
                          onClick={() => openEditModal(student)}
                        >
                          <Pencil size={16} />
                        </button>

                        <div className="student-more-wrap">
                          <button
                            title="More"
                            onClick={() =>
                              setMenuId(
                                menuId === student.id ? null : student.id
                              )
                            }
                          >
                            <MoreHorizontal size={17} />
                          </button>

                          {menuId === student.id && (
                            <div className="student-row-menu">
                              <button
                                onClick={() => setSelectedStudent(student)}
                              >
                                <Eye size={15} />
                                View profile
                              </button>
                              <button
                                onClick={() => openEditModal(student)}
                              >
                                <Pencil size={15} />
                                Edit student
                              </button>
                              <button
                                className="danger"
                                onClick={() => handleDelete(student.id)}
                              >
                                <Trash2 size={15} />
                                Delete student
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="students-empty">
              <div className="students-empty-icon">
                <Users size={28} />
              </div>
              <h3>No students found</h3>
              <p>
                Try changing your search or filters, or add a new student.
              </p>
              <button
                className="student-primary-btn"
                onClick={
                  search ||
                  classFilter !== "All Classes" ||
                  statusFilter !== "All Status"
                    ? clearFilters
                    : openAddModal
                }
              >
                {search ||
                classFilter !== "All Classes" ||
                statusFilter !== "All Status"
                  ? "Clear Filters"
                  : "Add First Student"}
              </button>
            </div>
          )}
        </div>

        {filteredStudents.length > 0 && (
          <div className="students-table-footer">
            <span>
              Showing <strong>{filteredStudents.length}</strong> student
              {filteredStudents.length !== 1 ? "s" : ""}
            </span>

            <span className="students-footer-note">
              <ShieldCheck size={14} />
              Changes are saved automatically
            </span>
          </div>
        )}
      </div>

      <StudentModal
        open={modalOpen}
        mode={modalMode}
        form={form}
        setForm={setForm}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <StudentDetails
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onEdit={openEditModal}
      />
    </div>
  );
}

