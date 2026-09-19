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
    record => record.status === "present" || record.status === "late"
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

export const calculateStudentStats = (studentId, marks = [], attendance = []) => {
  const studentMarks = marks.filter(mark => mark.studentId === studentId)

  const percentages = studentMarks.map(mark =>
    calculatePercentage(mark.marks, mark.totalMarks)
  )

  const studentAttendance = attendance.filter(
    record => record.studentId === studentId
  )

  const attendanceStats = calculateAttendanceStats(studentAttendance)

  const average = calculateAverage(percentages)

  return {
    average,
    averageOfLatest: percentages.length
      ? percentages.slice(-3)
      : [],
    attendancePercentage: attendanceStats.percentage,
    present: attendanceStats.present,
    absent: attendanceStats.absent,
    late: attendanceStats.late,
    attendanceRecords: attendanceStats.total,
    marksCount: studentMarks.length
  }
}

export const calculateSubjectStats = (subjectId, marks = []) => {
  const subjectMarks = marks.filter(mark => mark.subjectId === subjectId)

  if (!subjectMarks.length) return { average: 0, count: 0, best: 0 }

  const percentages = subjectMarks.map(mark =>
    calculatePercentage(mark.marks, mark.totalMarks)
  )

  return {
    average: calculateAverage(percentages),
    count: subjectMarks.length,
    best: Math.max(...percentages)
  }
}

export const calculateClassAverage = (students = [], averageGetter = () => 0) =>
  calculateAverage(students.map(averageGetter))

export const buildResultEntry = ({ student, marks = [] }) => {
  const studentMarks = marks.filter(mark => mark.studentId === student.id)

  const subjectMarks = Object.values(
    studentMarks.reduce((groups, mark) => {
      const subjectId = mark.subjectId || "unknown"

      if (!groups[subjectId]) {
        groups[subjectId] = { obtained: 0, total: 0, count: 0 }
      }

      groups[subjectId].obtained += Number(mark.marks) || 0
      groups[subjectId].total += Number(mark.totalMarks) || 0
      groups[subjectId].count += 1

      return groups
    }, {})
  )

  return {
    studentId: student.id,
    studentName: student.name,
    rollNumber: student.rollNumber,
    className: student.className,
    section: student.section,
    subjects: subjectMarks.map(subject => ({
      ...subject,
      percentage: calculatePercentage(subject.obtained, subject.total),
      grade: getGrade(calculatePercentage(subject.obtained, subject.total))
    })),
    totalObtained: subjectMarks.reduce((sum, subject) => sum + subject.obtained, 0),
    totalMarks: subjectMarks.reduce((sum, subject) => sum + subject.total, 0),
    percentage: 0
  }
}

export const buildResult = ({ student, marks = [], subjects = [] }) => {
  const entry = buildResultEntry({ student, marks })

  const withNames = entry.subjects.map(subject => {
    const subjectInfo = subjects.find(item => item.id === subject.subjectId)

    return {
      ...subject,
      subjectId: subject.subjectId,
      subjectName: subjectInfo?.name || "Subject",
      subjectCode: subjectInfo?.code || "",
      averagePerAssessment: calculatePercentage(
        subject.obtained,
        subject.total / Math.max(subject.count, 1)
      )
    }
  })

  const percentage = calculatePercentage(entry.totalObtained, entry.totalMarks)

  return {
    ...entry,
    subjects: withNames,
    percentage,
    grade: getGrade(percentage),
    gradePoint: getGradePoint(percentage),
    attendance: student.attendance ?? 100,
    status: getPerformanceStatus(percentage, student.attendance ?? 100)
  }
}

export const buildExamResult = ({ exam, students = [], marks = [], subjects = [] }) => {
  const filtered = marks.filter(mark => mark.examId === exam?.id)
  const studentIds = [...new Set(filtered.map(mark => mark.studentId))]

  return students
    .filter(student => studentIds.includes(student.id))
    .map(student => {
      const subjectMarks = filtered.filter(mark => mark.studentId === student.id)

      const results = subjectMarks.map(mark => {
        const subject = subjects.find(item => item.id === mark.subjectId)
        const percentage = calculatePercentage(mark.marks, mark.totalMarks)

        return {
          subjectId: mark.subjectId,
          subjectName: subject?.name || "Subject",
          obtained: Number(mark.marks) || 0,
          total: Number(mark.totalMarks) || 0,
          percentage,
          grade: getGrade(percentage)
        }
      })

      const totalObtained = results.reduce((sum, result) => sum + result.obtained, 0)
      const totalMarks = results.reduce((sum, result) => sum + result.total, 0)
      const percentage = calculatePercentage(totalObtained, totalMarks)

      return {
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        className: student.className,
        section: student.section,
        subjects: results,
        totalObtained,
        totalMarks,
        percentage,
        grade: getGrade(percentage),
        gradePoint: getGradePoint(percentage),
        status: getPerformanceStatus(
          percentage,
          student.attendance ?? 100
        )
      }
    })
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

  return {
    studentCount: classStudents.length,
    averagePerformance: calculateAverage(classStudents.map(s => s.average)),
    averageAttendance: calculateAverage(classStudents.map(s => s.attendance)),
    highestScore: classStudents.length ? Math.max(...classStudents.map(s => s.average)) : 0,
    lowestScore: classStudents.length ? Math.min(...classStudents.map(s => s.average)) : 0,
    atRisk: classStudents.filter(s =>
      ["At Risk", "Attention"].includes(s.status)
    ).length
  }
}

export const getExamStatus = (date, today = new Date()) => {
  if (!date) return "Upcoming"

  const target = new Date(`${date}T00:00:00`)
  const start = new Date(today)
  start.setHours(0, 0, 0, 0)

  const difference = Math.ceil(
    (target.getTime() - start.getTime()) / 86400000
  )

  if (difference < 0) return "Completed"
  if (difference === 0) return "Today"
  if (difference <= 7) return "This week"

  return "Upcoming"
}

export const getDaysUntil = date => {
  if (!date) return null

  const target = new Date(`${date}T00:00:00`)
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  return Math.ceil((target.getTime() - start.getTime()) / 86400000)
}

export const formatPercentage = value => `${Number(value || 0).toFixed(1)}%`

export const formatNumber = value => {
  const number = Number(value) || 0
  return number.toLocaleString("en-US")
}

export const formatDate = (date, style = {}) => {
  if (!date) return "—"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...style
  })
}

export const gradeTone = grade =>
  grade === "F" ? 0 : grade === "E" || grade === "D" ? 1 : grade === "C" ? 2 : 3

export const getStatusClass = status => {
  const normalized = String(status || "").toLowerCase()

  if (normalized === "excellent") return "excellent"
  if (normalized === "good") return "good"
  if (normalized === "attention") return "attention"
  if (normalized === "at risk") return "risk"

  return "neutral"
}