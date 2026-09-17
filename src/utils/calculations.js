export const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(Number(value) || 0, min), max)

export const calculatePercentage = (obtained, total) => {
  const obtainedNumber = Number(obtained) || 0
  const totalNumber = Number(total) || 0

  if (totalNumber <= 0) return 0

  return Number(((obtainedNumber / totalNumber) * 100).toFixed(2))
}

export const calculateAverage = values => {
  const numbers = values
    .map(Number)
    .filter(value => Number.isFinite(value))

  if (!numbers.length) return 0

  return Number(
    (numbers.reduce((sum, value) => sum + value, 0) / numbers.length).toFixed(2)
  )
}

export const getGrade = percentage => {
  const value = Number(percentage) || 0

  if (value >= 90) return "A+"
  if (value >= 80) return "A"
  if (value >= 70) return "B"
  if (value >= 60) return "C"
  if (value >= 50) return "D"
  if (value >= 40) return "E"

  return "F"
}

export const getGradePoint = percentage => {
  const value = Number(percentage) || 0

  if (value >= 90) return 4
  if (value >= 80) return 3.7
  if (value >= 70) return 3
  if (value >= 60) return 2
  if (value >= 50) return 1
  if (value >= 40) return 0.5

  return 0
}

export const getPerformanceStatus = (
  percentage,
  attendance = 100,
  attendanceThreshold = 75
) => {
  const score = Number(percentage) || 0
  const attendanceValue = Number(attendance) || 0

  if (score >= 85 && attendanceValue >= 90) return "Excellent"
  if (score >= 75 && attendanceValue >= attendanceThreshold) return "Good"
  if (score < 40 || attendanceValue < 60) return "At Risk"
  if (score < 60 || attendanceValue < attendanceThreshold) return "Attention"

  return "Good"
}

export const calculateAttendancePercentage = records => {
  if (!records?.length) return 0

  const present = records.filter(
    record =>
      record.status === "present" ||
      record.status === "late"
  ).length

  return Number(((present / records.length) * 100).toFixed(2))
}

export const calculateAttendanceStats = records => {
  const total = records?.length || 0
  const present = records?.filter(record => record.status === "present").length || 0
  const absent = records?.filter(record => record.status === "absent").length || 0
  const late = records?.filter(record => record.status === "late").length || 0

  return {
    total,
    present,
    absent,
    late,
    percentage: calculateAttendancePercentage(records || [])
  }
}

export const calculateStudentAverage = (studentId, marks) => {
  const studentMarks = marks.filter(mark => mark.studentId === studentId)

  if (!studentMarks.length) return 0

  const percentages = studentMarks.map(mark =>
    calculatePercentage(mark.marks, mark.totalMarks)
  )

  return calculateAverage(percentages)
}

export const calculateClassAverage = (classId, students) => {
  const classStudents = students.filter(student => student.classId === classId)

  return calculateAverage(classStudents.map(student => student.average))
}

export const getAtRiskStudents = (
  students,
  attendanceThreshold = 75,
  performanceThreshold = 60
) =>
  students.filter(
    student =>
      Number(student.average) < performanceThreshold ||
      Number(student.attendance) < attendanceThreshold
  )

export const getTopStudents = (students, limit = 5) =>
  [...students]
    .sort((a, b) => Number(b.average) - Number(a.average))
    .slice(0, limit)

export const getClassStats = (classId, students) => {
  const classStudents = students.filter(student => student.classId === classId)

  const averages = classStudents.map(student => Number(student.average) || 0)
  const attendance = classStudents.map(student => Number(student.attendance) || 0)

  return {
    studentCount: classStudents.length,
    averagePerformance: calculateAverage(averages),
    averageAttendance: calculateAverage(attendance),
    highestScore: classStudents.length
      ? Math.max(...averages)
      : 0,
    lowestScore: classStudents.length
      ? Math.min(...averages)
      : 0,
    atRisk: classStudents.filter(student =>
      ["At Risk", "Attention"].includes(student.status)
    ).length
  }
}

export const buildResult = ({
  student,
  marks = [],
  subjects = []
}) => {
  const studentMarks = marks.filter(mark => mark.studentId === student.id)

  const subjectResults = subjects
    .map(subject => {
      const subjectMarks = studentMarks.filter(
        mark => mark.subjectId === subject.id
      )

      if (!subjectMarks.length) return null

      const obtained = subjectMarks.reduce(
        (sum, mark) => sum + (Number(mark.marks) || 0),
        0
      )

      const total = subjectMarks.reduce(
        (sum, mark) => sum + (Number(mark.totalMarks) || 0),
        0
      )

      const percentage = calculatePercentage(obtained, total)

      return {
        subjectId: subject.id,
        subjectName: subject.name,
        obtained,
        total,
        percentage,
        grade: getGrade(percentage)
      }
    })
    .filter(Boolean)

  const totalObtained = subjectResults.reduce(
    (sum, result) => sum + result.obtained,
    0
  )

  const totalMarks = subjectResults.reduce(
    (sum, result) => sum + result.total,
    0
  )

  const percentage = calculatePercentage(totalObtained, totalMarks)

  return {
    studentId: student.id,
    studentName: student.name,
    rollNumber: student.rollNumber,
    className: student.className,
    section: student.section,
    subjects: subjectResults,
    totalObtained,
    totalMarks,
    percentage,
    grade: getGrade(percentage),
    gradePoint: getGradePoint(percentage),
    attendance: student.attendance,
    status: getPerformanceStatus(percentage, student.attendance)
  }
}

export const calculateDashboardStats = ({
  students = [],
  attendance = []
}) => {
  const averagePerformance = calculateAverage(
    students.map(student => student.average)
  )

  const averageAttendance = calculateAverage(
    students.map(student => student.attendance)
  )

  const atRisk = students.filter(
    student =>
      Number(student.average) < 60 ||
      Number(student.attendance) < 75
  ).length

  const attendancePercentage = calculateAttendancePercentage(attendance)

  return {
    students: students.length,
    averagePerformance,
    averageAttendance,
    attendanceRecords: attendance.length,
    attendancePercentage,
    atRisk
  }
}

export const formatPercentage = value =>
  `${Number(value || 0).toFixed(1)}%`

export const getStatusClass = status => {
  const normalized = String(status || "").toLowerCase()

  if (normalized === "excellent") return "excellent"
  if (normalized === "good") return "good"
  if (normalized === "attention") return "attention"
  if (normalized === "at risk") return "risk"

  return "neutral"
}