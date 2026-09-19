import { createContext, useContext, useMemo, useState } from "react"
import {
  getStudents,
  getClasses,
  getSubjects,
  getMarks,
  getAttendance,
  getExams,
  getNotices,
  getProfile,
  getSettings,
  saveStudents,
  saveClasses,
  saveSubjects,
  saveMarks,
  saveAttendance,
  saveExams,
  saveNotices,
  saveProfile,
  saveSettings,
  addStudent,
  updateStudent,
  deleteStudent,
  addClass,
  updateClass,
  deleteClass,
  addSubject,
  updateSubject,
  deleteSubject,
  addMark,
  updateMark,
  deleteMark,
  addAttendance,
  updateAttendance,
  deleteAttendance,
  addExam,
  updateExam,
  deleteExam,
  addNotice,
  updateNotice,
  deleteNotice,
  resetStorage,
  importStorageData,
  exportStorageData
} from "../utils/storage"
import {
  calculateStudentStats,
  calculateSubjectStats,
  calculateAverage,
  getPerformanceStatus,
  buildExamResult,
  buildResult,
  getExamStatus
} from "../utils/calculations"
import { buildSampleSeed } from "../data/sample"

const DataContext = createContext(null)

const readAll = () => ({
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

export function DataProvider({ children }) {
  const [state, setState] = useState(readAll)

  const refresh = () => setState(readAll())

  const updateCollection = (key, save) => {
    return value => {
      save(value)
      refresh()
    }
  }

  const setStudents = updateCollection("students", saveStudents)
  const setClasses = updateCollection("classes", saveClasses)
  const setSubjects = updateCollection("subjects", saveSubjects)
  const setMarks = updateCollection("marks", saveMarks)
  const setAttendance = updateCollection("attendance", saveAttendance)
  const setExams = updateCollection("exams", saveExams)
  const setNotices = updateCollection("notices", saveNotices)
  const setProfile = updateCollection("profile", saveProfile)
  const setSettings = updateCollection("settings", saveSettings)

  const createStudent = student => {
    addStudent(student)
    refresh()
  }
  const saveStudent = (id, updates) => {
    updateStudent(id, updates)
    refresh()
  }
  const removeStudent = id => {
    deleteStudent(id)
    refresh()
  }

  const createClass = item => {
    addClass(item)
    refresh()
  }
  const saveClass = (id, updates) => {
    updateClass(id, updates)
    refresh()
  }
  const removeClass = id => {
    deleteClass(id)
    refresh()
  }

  const createSubject = item => {
    addSubject(item)
    refresh()
  }
  const saveSubject = (id, updates) => {
    updateSubject(id, updates)
    refresh()
  }
  const removeSubject = id => {
    deleteSubject(id)
    refresh()
  }

  const createMark = item => {
    addMark(item)
    refresh()
  }
  const saveMark = (id, updates) => {
    updateMark(id, updates)
    refresh()
  }
  const removeMark = id => {
    deleteMark(id)
    refresh()
  }

  const createAttendance = item => {
    addAttendance(item)
    refresh()
  }
  const saveAttendanceRecord = (id, updates) => {
    updateAttendance(id, updates)
    refresh()
  }
  const removeAttendanceRecord = id => {
    deleteAttendance(id)
    refresh()
  }

  const createExam = item => {
    addExam(item)
    refresh()
  }
  const saveExam = (id, updates) => {
    updateExam(id, updates)
    refresh()
  }
  const removeExam = id => {
    deleteExam(id)
    refresh()
  }

  const createNotice = item => {
    addNotice(item)
    refresh()
  }
  const saveNotice = (id, updates) => {
    updateNotice(id, updates)
    refresh()
  }
  const removeNotice = id => {
    deleteNotice(id)
    refresh()
  }

  const importData = data => {
    importStorageData(data)
    refresh()
  }

  const exportData = () => exportStorageData()

  const resetAll = () => {
    resetStorage(buildSampleSeed())
    refresh()
  }

  const enrichedStudents = useMemo(
    () =>
      state.students.map(student => {
        const stats = calculateStudentStats(
          student.id,
          state.marks,
          state.attendance
        )

        return {
          ...student,
          average: stats.average,
          attendance: stats.attendancePercentage,
          marksCount: stats.marksCount,
          present: stats.present,
          absent: stats.absent,
          late: stats.late,
          attendanceRecords: stats.attendanceRecords,
          status: getPerformanceStatus(
            stats.average,
            stats.attendancePercentage,
            state.settings.attendanceThreshold
          )
        }
      }),
    [state.students, state.marks, state.attendance, state.settings.attendanceThreshold]
  )

  const enrichedClasses = useMemo(
    () =>
      state.classes.map(classItem => {
        const classStudents = enrichedStudents.filter(
          student => student.classId === classItem.id
        )

        return {
          ...classItem,
          studentCount: classStudents.length,
          average: calculateAverage(classStudents.map(s => s.average)),
          attendance: calculateAverage(classStudents.map(s => s.attendance)),
          atRisk: classStudents.filter(s => s.status === "At Risk").length,
          attention: classStudents.filter(s => s.status === "Attention").length
        }
      }),
    [state.classes, enrichedStudents]
  )

  const subjectStats = useMemo(
    () =>
      state.subjects.map(subject => ({
        ...subject,
        ...calculateSubjectStats(subject.id, state.marks),
        examCount: state.exams.filter(exam => exam.subjectId === subject.id).length
      })),
    [state.subjects, state.marks, state.exams]
  )

  const examStats = useMemo(() => {
    const list = state.exams.map(exam => ({
      ...exam,
      status: getExamStatus(exam.date)
    }))

    return {
      list,
      upcoming: list.filter(exam => exam.status === "Upcoming" || exam.status === "This week").length,
      thisWeek: list.filter(exam => exam.status === "This week").length,
      today: list.filter(exam => exam.status === "Today").length,
      completed: list.filter(exam => exam.status === "Completed").length
    }
  }, [state.exams])

  const studentById = id => enrichedStudents.find(student => student.id === id)
  const classById = id => enrichedClasses.find(item => item.id === id)

  const buildExamResults = examId =>
    buildExamResult({
      exam: state.exams.find(exam => exam.id === examId),
      students: enrichedStudents,
      marks: state.marks,
      subjects: state.subjects
    })

  const buildStudentResult = studentId => {
    const student = studentById(studentId)
    if (!student) return null

    return buildResult({
      student,
      marks: state.marks,
      subjects: state.subjects
    })
  }

  const value = useMemo(
    () => ({
      ...state,
      students: enrichedStudents,
      classes: enrichedClasses,
      subjects: subjectStats,
      examStats,
      studentById,
      classById,
      setStudents,
      setClasses,
      setSubjects,
      setMarks,
      setAttendance,
      setExams,
      setNotices,
      setProfile,
      setSettings,
      createStudent,
      saveStudent,
      removeStudent,
      createClass,
      saveClass,
      removeClass,
      createSubject,
      saveSubject,
      removeSubject,
      createMark,
      saveMark,
      removeMark,
      createAttendance,
      saveAttendanceRecord,
      removeAttendanceRecord,
      createExam,
      saveExam,
      removeExam,
      createNotice,
      saveNotice,
      removeNotice,
      importData,
      exportData,
      resetAll,
      buildExamResults,
      buildStudentResult
    }),
    [
      state,
      enrichedStudents,
      enrichedClasses,
      subjectStats,
      examStats
    ]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)