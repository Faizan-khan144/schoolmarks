import {
  calculateStudentStats,
  calculateSubjectStats,
  getGrade,
  getPerformanceStatus,
  getExamStatus,
  getDaysUntil,
  calculateAverage,
  calculatePercentage
} from "./calculations"

const monthNames = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
]

const monthShort = monthNames.map(name => name.slice(0, 3))

const normalize = value => String(value || "").toLowerCase().trim()

const hasAll = (question, words) => words.every(word => question.includes(word))

const findStudent = (students, question) => {
  const words = normalize(question)
  const firstName = words.split(" ").find(word => word.length > 2)

  return students.find(student => {
    const name = normalize(student.name)
    return name.includes(words) || name.includes(firstName)
  })
}

const findClassName = (students, question) => {
  const level = question.match(/\b(9|10)\b/)
  const section = question.match(/\b([abc])\b/)

  if (!level) return null

  const className = `Class ${level[1]}`

  return students.find(student => {
    if (student.className !== className) return false
    if (!section) return true
    return normalize(student.section) === section[1]
  })
}

const findMonth = question => {
  const full = monthNames.find(month => question.includes(month))
  if (full) return full.slice(0, 3)
  const short = monthShort.find(month => question.includes(month))
  return short || null
}

const toList = items => {
  if (!items.length) return "None."

  return items
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n  ")
}

const advisor = (title, points) => {
  const headline = title

  return {
    answer: headline,
    text: points.length ? points.join("\n") : "",
    points
  }
}

export const analyzeSchoolData = (
  {
    students = [],
    classes = [],
    subjects = [],
    marks = [],
    attendance = [],
    exams = [],
    settings = {}
  },
  question
) => {
  const threshold = Number(settings.attendanceThreshold) || 75
  const passing = Number(settings.passingPercentage) || 40

  const sortedByAverage = [...students].sort((a, b) => b.average - a.average)
  const overallAverage = calculateAverage(students.map(s => s.average))
  const overallAttendance = calculateAverage(students.map(s => s.attendance))

  const atRisk = students
    .filter(s => s.status === "At Risk")
    .sort((a, b) => a.average - b.average)

  const attention = students
    .filter(s => s.status === "Attention")
    .sort((a, b) => a.average - b.average)

  const belowAttendance = students
    .filter(s => Number(s.attendance) < threshold)
    .sort((a, b) => a.attendance - b.attendance)

  const subjectAverages = subjects.map(subject => {
    const stats = calculateSubjectStats(subject.id, marks)
    return { ...subject, average: stats.average, count: stats.count }
  })

  const lowestSubject = [...subjectAverages]
    .filter(s => s.count > 0)
    .sort((a, b) => a.average - b.average)[0]

  const highestSubject = [...subjectAverages]
    .filter(s => s.count > 0)
    .sort((a, b) => b.average - a.average)[0]

  const upcomingExams = exams
    .map(exam => ({ ...exam, status: getExamStatus(exam.date), days: getDaysUntil(exam.date) }))
    .filter(exam => exam.status !== "Completed")
    .sort((a, b) => (a.days ?? 999) - (b.days ?? 999))

  const completions = marks
    .reduce((groups, mark) => {
      const exam = exams.find(item => item.id === mark.examId)
      const key = exam?.date.slice(0, 7) || "unknown"

      if (!groups[key]) groups[key] = []

      groups[key].push(calculatePercentage(mark.marks, mark.totalMarks))

      return groups
    }, {})

  const monthlyAverages = Object.entries(completions)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([month, values]) => ({
      month,
      label: monthNames[Number(month.split("-")[1]) - 1]?.slice(0, 3) || month,
      average: calculateAverage(values),
      count: values.length
    }))

  const recentMonth = monthlyAverages[monthlyAverages.length - 1]
  const previousMonth = monthlyAverages[monthlyAverages.length - 2]

  const trend =
    previousMonth && recentMonth
      ? Number((recentMonth.average - previousMonth.average).toFixed(1))
      : 0

  const q = normalize(question)
  const firstName = q.split(" ")[0]

  const student =
    q.length > 1 && q !== "attention"
      ? findStudent(students, firstName.length > 2 ? firstName : q)
      : null

  if (student) {
    const stats = calculateStudentStats(student.id, marks, attendance)
    const status = getPerformanceStatus(stats.average, stats.attendancePercentage, threshold)

    const studentSubjects = subjectAverages.map(subject => {
      const specific = marks.filter(m => m.studentId === student.id && m.subjectId === subject.id)
      const percentages = specific.map(m => calculatePercentage(m.marks, m.totalMarks))
      return { ...subject, average: calculateAverage(percentages), count: specific.length }
    }).filter(s => s.count > 0)

    const strongest = [...studentSubjects].sort((a, b) => b.average - a.average)[0]
    const weakest = [...studentSubjects].sort((a, b) => a.average - b.average)[0]

    const points = [
      `${student.name} (Roll ${student.rollNumber}, ${student.className} ${student.section}) is currently ${status}.`,
      `Academic average is ${stats.average}% with grade ${getGrade(stats.average)}.`,
      `Attendance stands at ${stats.attendancePercentage}% (${stats.present} present, ${stats.absent} absent, ${stats.late} late).`,
      strongest && `Strongest area: ${strongest.name} at ${strongest.average}%.`,
      weakest && weakest.name !== strongest.name && `Area to improve: ${weakest.name} at ${weakest.average}%.`,
      stats.average < passing && `The student is performing below the ${passing}% passing threshold and needs a review.`,
      stats.attendancePercentage < threshold && `Attendance is below the ${threshold}% threshold and needs attention.`
    ].filter(Boolean)

    return advisor(`${student.name} — academic profile`, points)
  }

  if (hasAll(q, ["attendance"])) {
    const classAttendance = classes
      .map(item => ({
        label: `${item.name} ${item.section}`,
        value: calculateAverage(
          students.filter(s => s.classId === item.id).map(s => s.attendance)
        )
      }))
      .sort((a, b) => b.value - a.value)

    const best = classAttendance[0]
    const points = [
      `Overall attendance is ${overallAttendance}% across ${students.length} students.`,
      best && `Strongest class is ${best.label} at ${best.value}%.`,
      belowAttendance.length
        ? `${belowAttendance.length} student${belowAttendance.length === 1 ? "" : "s"} ${belowAttendance.length === 1 ? "is" : "are"} below the ${threshold}% threshold.`
        : "No student is below the attendance threshold.",
      belowAttendance.length && `  ${toList(belowAttendance.slice(0, 5).map(s => `${s.name} — ${s.attendance}%`))}`
    ].filter(Boolean)

    return advisor("Attendance overview", points)
  }

  if (hasAll(q, ["need", "attention"]) || q.includes("at risk") || hasAll(q, ["struggling"]) || hasAll(q, ["worst"])) {
    const combined = [...atRisk, ...attention]

    const points = [
      combined.length
        ? `${combined.length} student${combined.length === 1 ? "" : "s"} currently ${combined.length === 1 ? "needs" : "need"} attention.`
        : "No students currently need attention.",
      atRisk.length && `  At risk (${atRisk.length}): ${toList(atRisk.slice(0, 6).map(s => `${s.name} — ${s.average}% avg, ${s.attendance}% attendance`))}`,
      atRisk.length && attention.length && `  `,
      attention.length && `  Needs focus (${attention.length}): ${toList(attention.slice(0, 6).map(s => `${s.name} — ${s.average}% avg, ${s.attendance}% attendance`))}`,
      combined.length && `Recommended review: compare recent marks and attendance for these students before the next assessment.`
    ].filter(Boolean)

    return advisor(`Students needing attention`, points)
  }

  if (q.includes("below") && (q.includes("attendance") || q.includes("threshold"))) {
    const points = [
      `${belowAttendance.length} student${belowAttendance.length === 1 ? "" : "s"} ${belowAttendance.length === 1 ? "is" : "are"} below the ${threshold}% attendance threshold.`,
      `  ${toList(belowAttendance.map(s => `${s.name} (${s.className} ${s.section}) — ${s.attendance}%`))}`,
      belowAttendance.length && `Consider a guardian notification and an attendance review for these students.`
    ].filter(Boolean)

    return advisor("Students below the attendance threshold", points)
  }

  if (q.includes("top") || q.includes("best") || q.includes("highest") || q.includes("rank")) {
    const leaderboard = sortedByAverage.slice(0, 5)

    const points = [
      `The highest-performing student is ${leaderboard[0]?.name} with a ${leaderboard[0]?.average}% average.`,
      `  ${toList(leaderboard.map((s, index) => `${index + 1}. ${s.name} — ${s.average}%, ${s.attendance}% attendance`))}`
    ]

    return advisor("Top performers", points)
  }

  if (q.includes("lowest") && (q.includes("subject") || q.includes("average")) ||
      q.includes("weak") || q.includes("hard") || (q.includes("subject") && q.includes("worst"))) {
    const points = [
      lowestSubject
        ? `The subject with the lowest average is ${lowestSubject.name} at ${lowestSubject.average}%.`
        : "There is not enough subject data yet.",
      highestSubject && `The strongest subject is ${highestSubject.name} at ${highestSubject.average}%.`,
      lowestSubject && `  Subject averages: ${toList(subjectAverages.filter(s => s.count).sort((a, b) => a.average - b.average).map(s => `${s.name} — ${s.average}%`))}`
    ].filter(Boolean)

    return advisor("Subject performance", points)
  }

  const namedSubject = subjectAverages.find(subject =>
    q.includes(normalize(subject.name)) || q.includes(normalize(subject.name).split(" ")[0])
  )

  if (namedSubject) {
    const points = [
      `${namedSubject.name} currently has a ${namedSubject.average}% average across ${namedSubject.count} mark${namedSubject.count === 1 ? "" : "s"}.`,
      namedSubject.average < passing && `${namedSubject.name} is below the passing threshold and needs a teaching review.`,
      namedSubject.average >= 80 && `${namedSubject.name} is performing strongly.`,
      `  Want a full breakdown? Open Marks or Performance for subject-level detail.`
    ].filter(Boolean)

    return advisor(`${namedSubject.name} — subject insight`, points)
  }

  const classMatch = findClassName(students, q)

  if (classMatch || q.includes("class")) {
    const className = classMatch?.className || (q.match(/\b(9|10)\b/) ? `Class ${q.match(/\b(9|10)\b/)[1]}` : null)
    const classStudents = className
      ? students.filter(s => s.className === className)
      : []

    const classAverage = calculateAverage(classStudents.map(s => s.average))
    const classAttendance = calculateAverage(classStudents.map(s => s.attendance))

    const month = findMonth(q)

    const points = [
      className ? `${className} has ${classStudents.length} students with an average of ${classAverage}%.` : "",
      className ? `${className} attendance averages ${classAttendance}%.` : "",
      month && recentMonth && recentMonth.label === month.slice(0, 3)
        ? `In ${monthNames.find(m => m.startsWith(month)) || month}, class assessments averaged ${recentMonth.average}% across ${recentMonth.count} marks.`
        : `Latest assessment month averaged ${recentMonth?.average ?? "—"}%${trend !== 0 ? ` (${trend > 0 ? "+" : ""}${trend}% vs the month before).` : ""}`,
      className && `${className} needs attention: ${classStudents.filter(s => s.status === "At Risk").length} at risk, ${classStudents.filter(s => s.status === "Attention").length} under focus.`,
      className && `  Top of ${className}: ${toList([...classStudents].sort((a, b) => b.average - a.average).slice(0, 3).map(s => `${s.name} — ${s.average}%`))}`
    ].filter(Boolean)

    return advisor(className ? `${className} — performance report` : "Class performance", points)
  }

  if (q.includes("exam") || q.includes("schedule") || q.includes("upcoming") || q.includes("assessment")) {
    const next = upcomingExams.slice(0, 5)

    const points = [
      next.length
        ? `${next.length > 1 ? next.length : "The"} upcoming examination${next.length === 1 ? "" : "s"}:`
        : "No upcoming examinations are scheduled.",
      `  ${toList(next.map(exam => `${exam.name} — ${exam.className} — ${getDaysUntil(exam.date)} day${getDaysUntil(exam.date) === 1 ? "" : "s"} (${exam.date})`))}`
    ]

    return advisor("Examination schedule", points)
  }

  if (q.includes("marks") || q.includes("score") || q.includes("result")) {
    const points = [
      `Overall academic average is ${overallAverage}% across ${marks.length} individual marks.`,
      recentMonth && `Latest assessment month (${recentMonth.label}) averaged ${recentMonth.average}% over ${recentMonth.count} marks.`,
      trend !== 0 && `The previous month averaged ${previousMonth.average}% — a ${trend > 0 ? "gain" : "decline"} of ${Math.abs(trend)}%.`,
      `  ${toList(monthlyAverages.slice(-3).map(m => `${m.label} — ${m.average}%`))}`
    ].filter(Boolean)

    return advisor("Marks & assessment summary", points)
  }

  if (q.includes("trend") || q.includes("improve") || q.includes("decline") || q.includes("progress")) {
    const points = [
      monthlyAverages.length > 1
        ? `Class performance has moved from ${monthlyAverages[0].average}% to ${monthlyAverages[monthlyAverages.length - 1].average}% across ${monthlyAverages.length} tracked months.`
        : "Not enough assessment history yet to describe a trend.",
      trend !== 0 && `The most recent month is ${trend > 0 ? "up" : "down"} ${Math.abs(trend)}% versus the prior month.`,
      highestSubject && `Strongest driver: ${highestSubject.name} (${highestSubject.average}%).`,
      lowestSubject && `Improvement area: ${lowestSubject.name} (${lowestSubject.average}%).`
    ].filter(Boolean)

    return advisor("Performance trend", points)
  }

  const points = [
    `SchoolMarks is tracking ${students.length} students, ${classes.length} classes and ${subjects.length} subjects.`,
    `The overall academic average is ${overallAverage}% with ${overallAttendance}% attendance.`,
    `${atRisk.length} students are at risk, ${attention.length} need focus, and ${belowAttendance.length} are below the ${threshold}% attendance threshold.`,
    `${examStatsUpcoming(exams)} examinations are scheduled in the coming weeks.`,
    `Try asking about a student by name, attendance, subject averages, class performance, upcoming exams or at-risk students.`
  ].filter(Boolean)

  return advisor("Academic workspace overview", points)
}

const examStatsUpcoming = exams =>
  exams.filter(exam => getExamStatus(exam.date) !== "Completed").length

export const buildSuggestionQuestions = () => [
  "Which students need attention?",
  "Which subject has the lowest average?",
  "Show students below the attendance threshold.",
  "How did Class 9 perform this month?",
  "What are the upcoming examinations?",
  "Who are the top performers this term?"
]