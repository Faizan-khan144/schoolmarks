const STORAGE_PREFIX = "schoolmarks_"

const keys = {
  students: `${STORAGE_PREFIX}students`,
  classes: `${STORAGE_PREFIX}classes`,
  subjects: `${STORAGE_PREFIX}subjects`,
  marks: `${STORAGE_PREFIX}marks`,
  attendance: `${STORAGE_PREFIX}attendance`,
  exams: `${STORAGE_PREFIX}exams`,
  settings: `${STORAGE_PREFIX}settings`,
  initialized: `${STORAGE_PREFIX}initialized`
}

const clone = value => JSON.parse(JSON.stringify(value))

const read = (key, fallback = []) => {
  try {
    const value = localStorage.getItem(key)

    if (!value) {
      return clone(fallback)
    }

    return JSON.parse(value)
  } catch {
    return clone(fallback)
  }
}

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

const remove = key => {
  localStorage.removeItem(key)
}

export const storageKeys = keys

export const getStudents = () => read(keys.students, [])
export const saveStudents = students => write(keys.students, students)

export const getClasses = () => read(keys.classes, [])
export const saveClasses = classes => write(keys.classes, classes)

export const getSubjects = () => read(keys.subjects, [])
export const saveSubjects = subjects => write(keys.subjects, subjects)

export const getMarks = () => read(keys.marks, [])
export const saveMarks = marks => write(keys.marks, marks)

export const getAttendance = () => read(keys.attendance, [])
export const saveAttendance = attendance => write(keys.attendance, attendance)

export const getExams = () => read(keys.exams, [])
export const saveExams = exams => write(keys.exams, exams)

export const getSettings = () =>
  read(keys.settings, {
    schoolName: "SchoolMarks",
    academicYear: "2026",
    passingPercentage: 40,
    attendanceThreshold: 75
  })

export const saveSettings = settings => write(keys.settings, settings)

export const generateId = prefix => {
  const random = Math.random().toString(36).slice(2, 9)
  return `${prefix}-${Date.now()}-${random}`
}

export const initializeStorage = ({
  students = [],
  classes = [],
  subjects = []
} = {}) => {
  const initialized = localStorage.getItem(keys.initialized)

  if (!initialized) {
    saveStudents(students)
    saveClasses(classes)
    saveSubjects(subjects)
    saveMarks([])
    saveAttendance([])
    saveExams([])
    saveSettings({
      schoolName: "SchoolMarks",
      academicYear: "2026",
      passingPercentage: 40,
      attendanceThreshold: 75
    })

    localStorage.setItem(keys.initialized, "true")

    return true
  }

  return false
}

export const resetStorage = ({
  students = [],
  classes = [],
  subjects = []
} = {}) => {
  Object.values(keys).forEach(remove)

  initializeStorage({
    students,
    classes,
    subjects
  })
}

export const clearSchoolData = () => {
  Object.values(keys).forEach(remove)
}

export const exportStorageData = () => ({
  version: "1.0",
  exportedAt: new Date().toISOString(),
  students: getStudents(),
  classes: getClasses(),
  subjects: getSubjects(),
  marks: getMarks(),
  attendance: getAttendance(),
  exams: getExams(),
  settings: getSettings()
})

export const importStorageData = data => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid SchoolMarks backup")
  }

  if (Array.isArray(data.students)) saveStudents(data.students)
  if (Array.isArray(data.classes)) saveClasses(data.classes)
  if (Array.isArray(data.subjects)) saveSubjects(data.subjects)
  if (Array.isArray(data.marks)) saveMarks(data.marks)
  if (Array.isArray(data.attendance)) saveAttendance(data.attendance)
  if (Array.isArray(data.exams)) saveExams(data.exams)
  if (data.settings && typeof data.settings === "object") {
    saveSettings(data.settings)
  }

  localStorage.setItem(keys.initialized, "true")

  return true
}

export const getStudentById = id =>
  getStudents().find(student => student.id === id)

export const getClassById = id =>
  getClasses().find(item => item.id === id)

export const getSubjectById = id =>
  getSubjects().find(subject => subject.id === id)

export const addStudent = student => {
  const students = getStudents()

  const newStudent = {
    id: student.id || generateId("student"),
    joinedAt: student.joinedAt || new Date().toISOString().slice(0, 10),
    ...student
  }

  saveStudents([...students, newStudent])

  return newStudent
}

export const updateStudent = (id, updates) => {
  const students = getStudents()

  const updated = students.map(student =>
    student.id === id
      ? {
          ...student,
          ...updates,
          id
        }
      : student
  )

  saveStudents(updated)

  return updated.find(student => student.id === id)
}

export const deleteStudent = id => {
  const students = getStudents().filter(student => student.id !== id)
  const marks = getMarks().filter(mark => mark.studentId !== id)
  const attendance = getAttendance().filter(
    record => record.studentId !== id
  )

  saveStudents(students)
  saveMarks(marks)
  saveAttendance(attendance)

  return true
}

export const addClass = classData => {
  const classes = getClasses()

  const newClass = {
    id: classData.id || generateId("class"),
    ...classData
  }

  saveClasses([...classes, newClass])

  return newClass
}

export const updateClass = (id, updates) => {
  const classes = getClasses()

  const updated = classes.map(item =>
    item.id === id
      ? {
          ...item,
          ...updates,
          id
        }
      : item
  )

  saveClasses(updated)

  return updated.find(item => item.id === id)
}

export const deleteClass = id => {
  const classes = getClasses().filter(item => item.id !== id)

  saveClasses(classes)

  return true
}

export const addSubject = subject => {
  const subjects = getSubjects()

  const newSubject = {
    id: subject.id || generateId("subject"),
    ...subject
  }

  saveSubjects([...subjects, newSubject])

  return newSubject
}

export const updateSubject = (id, updates) => {
  const subjects = getSubjects()

  const updated = subjects.map(subject =>
    subject.id === id
      ? {
          ...subject,
          ...updates,
          id
        }
      : subject
  )

  saveSubjects(updated)

  return updated.find(subject => subject.id === id)
}

export const deleteSubject = id => {
  const subjects = getSubjects().filter(subject => subject.id !== id)

  saveSubjects(subjects)

  return true
}

export const addMark = mark => {
  const marks = getMarks()

  const newMark = {
    id: mark.id || generateId("mark"),
    createdAt: mark.createdAt || new Date().toISOString(),
    ...mark
  }

  saveMarks([...marks, newMark])

  return newMark
}

export const updateMark = (id, updates) => {
  const marks = getMarks()

  const updated = marks.map(mark =>
    mark.id === id
      ? {
          ...mark,
          ...updates,
          id
        }
      : mark
  )

  saveMarks(updated)

  return updated.find(mark => mark.id === id)
}

export const deleteMark = id => {
  saveMarks(getMarks().filter(mark => mark.id !== id))
  return true
}

export const addAttendance = record => {
  const attendance = getAttendance()

  const newRecord = {
    id: record.id || generateId("attendance"),
    createdAt: record.createdAt || new Date().toISOString(),
    ...record
  }

  saveAttendance([...attendance, newRecord])

  return newRecord
}

export const updateAttendance = (id, updates) => {
  const attendance = getAttendance()

  const updated = attendance.map(record =>
    record.id === id
      ? {
          ...record,
          ...updates,
          id
        }
      : record
  )

  saveAttendance(updated)

  return updated.find(record => record.id === id)
}

export const deleteAttendance = id => {
  saveAttendance(getAttendance().filter(record => record.id !== id))
  return true
}

export const addExam = exam => {
  const exams = getExams()

  const newExam = {
    id: exam.id || generateId("exam"),
    createdAt: exam.createdAt || new Date().toISOString(),
    ...exam
  }

  saveExams([...exams, newExam])

  return newExam
}

export const updateExam = (id, updates) => {
  const exams = getExams()

  const updated = exams.map(exam =>
    exam.id === id
      ? {
          ...exam,
          ...updates,
          id
        }
      : exam
  )

  saveExams(updated)

  return updated.find(exam => exam.id === id)
}

export const deleteExam = id => {
  saveExams(getExams().filter(exam => exam.id !== id))
  saveMarks(getMarks().filter(mark => mark.examId !== id))

  return true
}