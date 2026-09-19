const mulberry32 = a => {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hashSeed = value => {
  let hash = 2166136261
  for (let index = 0; index < String(value).length; index += 1) {
    hash ^= String(value).charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const defaultClasses = [
  { id: "class-9-a", name: "Class 9", section: "A", academicYear: "2026", teacher: "Muhammad Ahmed", room: "101" },
  { id: "class-9-b", name: "Class 9", section: "B", academicYear: "2026", teacher: "Ayesha Khan", room: "102" },
  { id: "class-9-c", name: "Class 9", section: "C", academicYear: "2026", teacher: "Usman Raza", room: "103" },
  { id: "class-10-a", name: "Class 10", section: "A", academicYear: "2026", teacher: "Sana Malik", room: "201" },
  { id: "class-10-b", name: "Class 10", section: "B", academicYear: "2026", teacher: "Hassan Ali", room: "202" }
]

export const defaultSubjects = [
  { id: "subject-001", name: "Mathematics", code: "MATH", color: "#1A6345" },
  { id: "subject-002", name: "English", code: "ENG", color: "#B4552D" },
  { id: "subject-003", name: "Computer Science", code: "CS", color: "#6B6A54" },
  { id: "subject-004", name: "Physics", code: "PHY", color: "#2E5E54" },
  { id: "subject-005", name: "Chemistry", code: "CHEM", color: "#7A5A4A" },
  { id: "subject-006", name: "Urdu", code: "URD", color: "#5C5A3C" },
  { id: "subject-007", name: "Islamiat", code: "ISL", color: "#40483B" },
  { id: "subject-008", name: "Social Studies", code: "SST", color: "#8A6A3C" }
]

export const defaultStudents = [
  {
    id: "student-001", rollNumber: "901", name: "Ayaan Khan", classId: "class-9-a", className: "Class 9", section: "A",
    email: "ayaan.khan@schoolmarks.edu", phone: "+92 300 901 0011", guardian: "Imran Khan", address: "Street 12, Model Town", joinedAt: "2026-08-01"
  },
  {
    id: "student-002", rollNumber: "902", name: "Zayan Ahmed", classId: "class-9-b", className: "Class 9", section: "B",
    email: "zayan.ahmed@schoolmarks.edu", phone: "+92 300 901 0022", guardian: "Rashid Ahmed", address: "Street 4, Green City", joinedAt: "2026-08-01"
  },
  {
    id: "student-003", rollNumber: "903", name: "Maham Ali", classId: "class-9-a", className: "Class 9", section: "A",
    email: "maham.ali@schoolmarks.edu", phone: "+92 300 901 0033", guardian: "Sohail Ali", address: "House 8, Gulberg", joinedAt: "2026-08-01"
  },
  {
    id: "student-004", rollNumber: "904", name: "Hassan Raza", classId: "class-9-c", className: "Class 9", section: "C",
    email: "hassan.raza@schoolmarks.edu", phone: "+92 300 901 0044", guardian: "Nadeem Raza", address: "Street 21, Satellite Town", joinedAt: "2026-08-01"
  },
  {
    id: "student-005", rollNumber: "905", name: "Areeba Khan", classId: "class-9-b", className: "Class 9", section: "B",
    email: "areeba.khan@schoolmarks.edu", phone: "+92 300 901 0055", guardian: "Salman Khan", address: "House 3, Faisal Town", joinedAt: "2026-08-01"
  },
  {
    id: "student-006", rollNumber: "906", name: "Rayyan Malik", classId: "class-9-c", className: "Class 9", section: "C",
    email: "rayyan.malik@schoolmarks.edu", phone: "+92 300 901 0066", guardian: "Asif Malik", address: "Street 9, Iqbal Road", joinedAt: "2026-08-01"
  },
  {
    id: "student-007", rollNumber: "907", name: "Hiba Fatima", classId: "class-9-a", className: "Class 9", section: "A",
    email: "hiba.fatima@schoolmarks.edu", phone: "+92 300 901 0077", guardian: "Tariq Mehmood", address: "House 15, Garden Colony", joinedAt: "2026-08-01"
  },
  {
    id: "student-008", rollNumber: "908", name: "Usman Tariq", classId: "class-10-a", className: "Class 10", section: "A",
    email: "usman.tariq@schoolmarks.edu", phone: "+92 300 901 0088", guardian: "Javed Tariq", address: "Street 5, Askari Estate", joinedAt: "2026-08-01"
  },
  {
    id: "student-009", rollNumber: "909", name: "Alina Noor", classId: "class-10-b", className: "Class 10", section: "B",
    email: "alina.noor@schoolmarks.edu", phone: "+92 300 901 0099", guardian: "Kamran Noor", address: "House 22, Lake View", joinedAt: "2026-08-01"
  },
  {
    id: "student-010", rollNumber: "910", name: "Bilal Ahmed", classId: "class-10-a", className: "Class 10", section: "A",
    email: "bilal.ahmed@schoolmarks.edu", phone: "+92 300 901 0100", guardian: "Faisal Ahmed", address: "Street 3, Johar", joinedAt: "2026-08-01"
  }
]

export const defaultExams = [
  { id: "exam-001", name: "Quiz 1 – Mathematics", subjectId: "subject-001", className: "Class 9", section: "All", date: "2026-08-25", totalMarks: 50, durationMinutes: 60, room: "Hall A" },
  { id: "exam-002", name: "Quiz 1 – English", subjectId: "subject-002", className: "Class 9", section: "All", date: "2026-08-28", totalMarks: 50, durationMinutes: 60, room: "Hall A" },
  { id: "exam-003", name: "Quiz 1 – Physics", subjectId: "subject-004", className: "Class 9", section: "All", date: "2026-09-02", totalMarks: 50, durationMinutes: 60, room: "Hall A" },
  { id: "exam-004", name: "Assignment 1 – Computer Science", subjectId: "subject-003", className: "Class 9", section: "All", date: "2026-09-04", totalMarks: 40, durationMinutes: 45, room: "Lab 1" },
  { id: "exam-005", name: "Group Test – Urdu", subjectId: "subject-006", className: "Class 9", section: "All", date: "2026-09-06", totalMarks: 50, durationMinutes: 90, room: "Hall A" },
  { id: "exam-006", name: "Quiz 1 – Mathematics", subjectId: "subject-001", className: "Class 10", section: "All", date: "2026-08-26", totalMarks: 50, durationMinutes: 60, room: "Hall B" },
  { id: "exam-007", name: "Quiz 1 – English", subjectId: "subject-002", className: "Class 10", section: "All", date: "2026-08-30", totalMarks: 50, durationMinutes: 60, room: "Hall B" },
  { id: "exam-008", name: "Unit Test – Chemistry", subjectId: "subject-005", className: "Class 10", section: "All", date: "2026-09-03", totalMarks: 50, durationMinutes: 60, room: "Hall B" },
  { id: "exam-009", name: "Unit Test 2 – Mathematics", subjectId: "subject-001", className: "Class 10", section: "All", date: "2026-09-10", totalMarks: 80, durationMinutes: 90, room: "Hall B" },
  { id: "exam-010", name: "Mid-Term 2026 – Mathematics", subjectId: "subject-001", className: "Class 10", section: "All", date: "2026-09-21", totalMarks: 100, durationMinutes: 180, room: "Hall B" },
  { id: "exam-011", name: "Mid-Term 2026 – Mathematics", subjectId: "subject-001", className: "Class 9", section: "All", date: "2026-09-22", totalMarks: 100, durationMinutes: 180, room: "Hall A" },
  { id: "exam-012", name: "Mid-Term 2026 – Physics", subjectId: "subject-004", className: "Class 9", section: "All", date: "2026-09-24", totalMarks: 100, durationMinutes: 180, room: "Hall A" },
  { id: "exam-013", name: "Mid-Term 2026 – Physics", subjectId: "subject-004", className: "Class 10", section: "All", date: "2026-09-25", totalMarks: 100, durationMinutes: 180, room: "Hall B" },
  { id: "exam-014", name: "Mid-Term 2026 – English", subjectId: "subject-002", className: "Class 9", section: "All", date: "2026-09-26", totalMarks: 100, durationMinutes: 180, room: "Hall A" },
  { id: "exam-015", name: "Mid-Term 2026 – English", subjectId: "subject-002", className: "Class 10", section: "All", date: "2026-09-27", totalMarks: 100, durationMinutes: 180, room: "Hall B" },
  { id: "exam-016", name: "Mid-Term 2026 – Urdu", subjectId: "subject-006", className: "Class 9", section: "All", date: "2026-09-28", totalMarks: 100, durationMinutes: 180, room: "Hall A" },
  { id: "exam-017", name: "Mid-Term 2026 – Computer Science", subjectId: "subject-003", className: "Class 9", section: "All", date: "2026-09-29", totalMarks: 100, durationMinutes: 150, room: "Lab 1" },
  { id: "exam-018", name: "Quiz 2 – Mathematics", subjectId: "subject-001", className: "Class 9", section: "All", date: "2026-10-08", totalMarks: 50, durationMinutes: 60, room: "Hall A" },
  { id: "exam-019", name: "Quiz 2 – English", subjectId: "subject-002", className: "Class 10", section: "All", date: "2026-10-10", totalMarks: 50, durationMinutes: 60, room: "Hall B" },
  { id: "exam-020", name: "Assignment – Chemistry", subjectId: "subject-005", className: "Class 10", section: "All", date: "2026-10-12", totalMarks: 40, durationMinutes: 45, room: "Lab 2" }
]

export const generateMarks = ({ students, subjects, exams }) => {
  const completed = exams.filter(exam => exam.date <= "2026-09-18")
  const marks = []

  students.forEach(student => {
    const ability = {
      "student-001": 0.82,
      "student-002": 0.47,
      "student-003": 0.74,
      "student-004": 0.67,
      "student-005": 0.93,
      "student-006": 0.57,
      "student-007": 0.87,
      "student-008": 0.71,
      "student-009": 0.9,
      "student-010": 0.61
    }[student.id] || 0.7

    completed
      .filter(exam => exam.className === student.className)
      .forEach(exam => {
        const random = mulberry32(hashSeed(student.id + exam.id))
        const noise = (random() - 0.45) * 0.16
        const ratio = clamp(ability + noise, 0.3, 0.99)
        const obtained = Math.round(exam.totalMarks * ratio)

        marks.push({
          id: `mark-${student.id}-${exam.id}`,
          studentId: student.id,
          subjectId: exam.subjectId,
          examId: exam.id,
          className: student.className,
          section: student.section,
          marks: obtained,
          totalMarks: exam.totalMarks,
          date: exam.date,
          createdAt: `${exam.date}T10:00:00`
        })
      })
  })

  return marks
}

export const generateAttendance = ({ students }) => {
  const schoolDays = []
  const start = new Date("2026-08-24T00:00:00")
  const end = new Date("2026-09-18T00:00:00")

  for (
    let day = new Date(start);
    day <= end;
    day.setDate(day.getDate() + 1)
  ) {
    const weekday = day.getDay()
    if (weekday !== 0 && weekday !== 6) {
      schoolDays.push(day.toISOString().slice(0, 10))
    }
  }

  const records = []

  students.forEach(student => {
    const ability = {
      "student-001": 0.82,
      "student-002": 0.47,
      "student-003": 0.74,
      "student-004": 0.67,
      "student-005": 0.93,
      "student-006": 0.57,
      "student-007": 0.87,
      "student-008": 0.71,
      "student-009": 0.9,
      "student-010": 0.61
    }[student.id] || 0.7

    schoolDays.forEach(date => {
      const random = mulberry32(hashSeed(student.id + date))
      const roll = random()
      const absentRate = clamp(0.68 - ability * 0.55, 0.03, 0.4)
      const lateRate = clamp(0.3 - ability * 0.18, 0.04, 0.2)
      let status = "present"

      if (roll < absentRate) status = "absent"
      else if (roll < absentRate + lateRate) status = "late"

      records.push({
        id: `att-${student.id}-${date}`,
        studentId: student.id,
        className: student.className,
        section: student.section,
        date,
        status,
        createdAt: `${date}T08:30:00`
      })
    })
  })

  return records
}

export const defaultNotices = [
  {
    id: "notice-001",
    title: "Mid-Term 2026 examination schedule",
    body: "The Mid-Term examination timetable for Classes 9 and 10 is now available in the Examinations module. Teachers are requested to begin question paper preparation.",
    audience: "Teachers",
    date: "2026-09-15",
    pinned: true
  },
  {
    id: "notice-002",
    title: "Parent–teacher meeting announced",
    body: "The first parent–teacher meeting of the term will take place in October. Confirmations will be shared closer to the date.",
    audience: "All",
    date: "2026-09-12",
    pinned: false
  },
  {
    id: "notice-003",
    title: "Attendance threshold reminder",
    body: "Students below the 75% attendance threshold will receive a formal notification this week. Guardians are encouraged to review attendance records.",
    audience: "Students",
    date: "2026-09-10",
    pinned: false
  },
  {
    id: "notice-004",
    title: "New academic records workflow",
    body: "Marks and attendance entered this term now feed directly into the permanent academic history of every student.",
    audience: "Staff",
    date: "2026-09-08",
    pinned: false
  }
]

export const defaultProfile = {
  name: "School Admin",
  role: "Academic Administrator",
  email: "admin@greenfield.edu",
  phone: "+92 300 000 0000",
  school: "Greenfield Academy",
  bio: "Managing academic performance, attendance and student records across the campus.",
  address: "Greenfield Academy, Main Boulevard, Lahore",
  joinedAt: "2024-09-01",
  avatarColor: "#1A6345",
  accentColor: "#123A2C"
}

export const defaultSettings = {
  schoolName: "Greenfield Academy",
  academicYear: "2026",
  term: "Mid-Term 2026",
  passingPercentage: 40,
  attendanceThreshold: 75,
  weekStartsOn: "monday",
  lowAttendanceWarning: true,
  autoGrade: true
}

export const buildSampleSeed = () => {
  const marks = generateMarks({
    students: defaultStudents,
    subjects: defaultSubjects,
    exams: defaultExams
  })

  const attendance = generateAttendance({ students: defaultStudents })

  return {
    students: defaultStudents,
    classes: defaultClasses,
    subjects: defaultSubjects,
    exams: defaultExams,
    marks,
    attendance,
    notices: defaultNotices,
    profile: defaultProfile,
    settings: defaultSettings
  }
}