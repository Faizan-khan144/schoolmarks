const STORAGE_PREFIX = "schoolmarks_"
const STORAGE_VERSION = "v2"

const keys = {
  students: `${STORAGE_PREFIX}${STORAGE_VERSION}_students`,
  classes: `${STORAGE_PREFIX}${STORAGE_VERSION}_classes`,
  subjects: `${STORAGE_PREFIX}${STORAGE_VERSION}_subjects`,
  marks: `${STORAGE_PREFIX}${STORAGE_VERSION}_marks`,
  attendance: `${STORAGE_PREFIX}${STORAGE_VERSION}_attendance`,
  exams: `${STORAGE_PREFIX}${STORAGE_VERSION}_exams`,
  notices: `${STORAGE_PREFIX}${STORAGE_VERSION}_notices`,
  profile: `${STORAGE_PREFIX}${STORAGE_VERSION}_profile`,
  settings: `${STORAGE_PREFIX}${STORAGE_VERSION}_settings`,
  initialized: `${STORAGE_PREFIX}${STORAGE_VERSION}_initialized`
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

export const getNotices = () => read(keys.notices, [])
export const saveNotices = notices => write(keys.notices, notices)

export const getProfile = () =>
  read(keys.profile, {
    name: "School Admin",
    role: "Academic Administrator",
    email: "admin@schoolmarks.edu",
    phone: "+92 300 000 0000",
    school: "Greenfield Academy",
    bio: "Managing academic performance, attendance and student records.",
    joinedAt: "2024-09-01"
  })

export const saveProfile = profile => write(keys.profile, profile)

export const getSettings = () =>
  read(keys.settings, {
    schoolName: "Greenfield Academy",
    academicYear: "2026",
    term: "Mid-Term 2026",
    passingPercentage: 40,
    attendanceThreshold: 75,
    weekStartsOn: "monday"
  })

export const saveSettings = settings => write(keys.settings, settings)

export const getStorageVersion = () =>
  localStorage.getItem(`${STORAGE_PREFIX}${STORAGE_VERSION}_initialized`) === "true"

export const generateId = prefix => {
  const random = Math.random().toString(36).slice(2, 9)
  return `${prefix}-${Date.now()}-${random}`
}

export const initializeStorage = (seed = {}) => {
  const {
    students = [],
    classes = [],
    subjects = [],
    exams = [],
    marks = [],
    attendance = [],
    notices = [],
    profile = {},
    settings = {}
  } = seed

  const initialized = localStorage.getItem(keys.initialized)

  if (!initialized) {
    saveStudents(students)
    saveClasses(classes)
    saveSubjects(subjects)
    saveExams(exams)
    saveMarks(marks)
    saveAttendance(attendance)
    saveNotices(notices)
    saveProfile(profile)
    saveSettings(settings)

    localStorage.setItem(keys.initialized, "true")

    return true
  }

  return false
}

export const resetStorage = (seed = {}) => {
  Object.values(keys).forEach(remove)
  initializeStorage(seed)
}

export const clearSchoolData = () => {
  Object.values(keys).forEach(remove)
}

export const exportStorageData = () => ({
  version: STORAGE_VERSION,
  exportedAt: new Date().toISOString(),
  students: getStudents(),
  classes: getClasses(),
  subjects: getSubjects(),
  marks: getMarks(),
  attendance: getAttendance(),
  exams: getExams(),
  notices: getNotices(),
  profile: getProfile(),
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
  if (Array.isArray(data.notices)) saveNotices(data.notices)
  if (data.profile && typeof data.profile === "object") saveProfile(data.profile)
  if (data.settings && typeof data.settings === "object") {
    saveSettings(data.settings)
  }

  localStorage.setItem(keys.initialized, "true")

  return true
}

export const getStudentById = id => getStudents().find(student => student.id === id)
export const getClassById = id => getClasses().find(item => item.id === id)
export const getSubjectById = id => getSubjects().find(subject => subject.id === id)
export const getExamById = id => getExams().find(exam => exam.id === id)

const withId = (item, prefix, extra = {}) => ({
  id: item.id || generateId(prefix),
  ...extra,
  ...item
})

export const addStudent = student => {
  const newStudent = withId(student, "student", {
    joinedAt: new Date().toISOString().slice(0, 10)
  })
  saveStudents([...getStudents(), newStudent])
  return newStudent
}

export const updateStudent = (id, updates) => {
  const updated = getStudents().map(student =>
    student.id === id ? { ...student, ...updates, id } : student
  )
  saveStudents(updated)
  return updated.find(student => student.id === id)
}

export const deleteStudent = id => {
  saveStudents(getStudents().filter(student => student.id !== id))
  saveMarks(getMarks().filter(mark => mark.studentId !== id))
  saveAttendance(getAttendance().filter(record => record.studentId !== id))
  return true
}

export const addClass = classData => {
  const newClass = withId(classData, "class", { studentCount: 0 })
  saveClasses([...getClasses(), newClass])
  return newClass
}

export const updateClass = (id, updates) => {
  const updated = getClasses().map(item =>
    item.id === id ? { ...item, ...updates, id } : item
  )
  saveClasses(updated)
  return updated.find(item => item.id === id)
}

export const deleteClass = id => {
  saveClasses(getClasses().filter(item => item.id !== id))
  return true
}

export const addSubject = subject => {
  const newSubject = withId(subject, "subject")
  saveSubjects([...getSubjects(), newSubject])
  return newSubject
}

export const updateSubject = (id, updates) => {
  const updated = getSubjects().map(subject =>
    subject.id === id ? { ...subject, ...updates, id } : subject
  )
  saveSubjects(updated)
  return updated.find(subject => subject.id === id)
}

export const deleteSubject = id => {
  saveSubjects(getSubjects().filter(subject => subject.id !== id))
  saveMarks(getMarks().filter(mark => mark.subjectId !== id))
  saveExams(getExams().filter(exam => exam.subjectId !== id))
  return true
}

export const addMark = mark => {
  const newMark = withId(mark, "mark", {
    createdAt: new Date().toISOString()
  })
  saveMarks([...getMarks(), newMark])
  return newMark
}

export const updateMark = (id, updates) => {
  const updated = getMarks().map(mark =>
    mark.id === id ? { ...mark, ...updates, id } : mark
  )
  saveMarks(updated)
  return updated.find(mark => mark.id === id)
}

export const deleteMark = id => {
  saveMarks(getMarks().filter(mark => mark.id !== id))
  return true
}

export const addAttendance = record => {
  const newRecord = withId(record, "attendance", {
    createdAt: new Date().toISOString()
  })
  saveAttendance([...getAttendance(), newRecord])
  return newRecord
}

export const updateAttendance = (id, updates) => {
  const updated = getAttendance().map(record =>
    record.id === id ? { ...record, ...updates, id } : record
  )
  saveAttendance(updated)
  return updated.find(record => record.id === id)
}

export const deleteAttendance = id => {
  saveAttendance(getAttendance().filter(record => record.id !== id))
  return true
}

export const addExam = exam => {
  const newExam = withId(exam, "exam", {
    createdAt: new Date().toISOString()
  })
  saveExams([...getExams(), newExam])
  return newExam
}

export const updateExam = (id, updates) => {
  const updated = getExams().map(exam =>
    exam.id === id ? { ...exam, ...updates, id } : exam
  )
  saveExams(updated)
  return updated.find(exam => exam.id === id)
}

export const deleteExam = id => {
  saveExams(getExams().filter(exam => exam.id !== id))
  saveMarks(getMarks().filter(mark => mark.examId !== id))
  return true
}

export const addNotice = notice => {
  const newNotice = withId(notice, "notice", {
    createdAt: new Date().toISOString()
  })
  saveNotices([...getNotices(), newNotice])
  return newNotice
}

export const updateNotice = (id, updates) => {
  const updated = getNotices().map(notice =>
    notice.id === id ? { ...notice, ...updates, id } : notice
  )
  saveNotices(updated)
  return updated.find(notice => notice.id === id)
}

export const deleteNotice = id => {
  saveNotices(getNotices().filter(notice => notice.id !== id))
  return true
}