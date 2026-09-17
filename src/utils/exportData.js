import { exportStorageData } from "./storage"

const downloadBlob = (content, filename, type) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")

  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  URL.revokeObjectURL(url)
}

export const exportJSON = () => {
  const data = exportStorageData()

  const filename = `schoolmarks-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`

  downloadBlob(
    JSON.stringify(data, null, 2),
    filename,
    "application/json"
  )
}

const escapeCSV = value => {
  const stringValue = String(value ?? "")

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

export const exportStudentsCSV = students => {
  const headers = [
    "Roll Number",
    "Name",
    "Class",
    "Section",
    "Email",
    "Attendance",
    "Average",
    "Status"
  ]

  const rows = students.map(student => [
    student.rollNumber,
    student.name,
    student.className,
    student.section,
    student.email,
    `${student.attendance}%`,
    `${student.average}%`,
    student.status
  ])

  const csv = [
    headers,
    ...rows
  ]
    .map(row => row.map(escapeCSV).join(","))
    .join("\n")

  downloadBlob(
    csv,
    `schoolmarks-students-${new Date().toISOString().slice(0, 10)}.csv`,
    "text/csv;charset=utf-8"
  )
}

export const exportMarksCSV = ({
  marks = [],
  students = [],
  subjects = [],
  exams = []
}) => {
  const studentMap = new Map(
    students.map(student => [student.id, student])
  )

  const subjectMap = new Map(
    subjects.map(subject => [subject.id, subject])
  )

  const examMap = new Map(
    exams.map(exam => [exam.id, exam])
  )

  const headers = [
    "Student",
    "Roll Number",
    "Subject",
    "Exam",
    "Marks",
    "Total Marks",
    "Percentage"
  ]

  const rows = marks.map(mark => {
    const student = studentMap.get(mark.studentId)
    const subject = subjectMap.get(mark.subjectId)
    const exam = examMap.get(mark.examId)

    const percentage =
      Number(mark.totalMarks) > 0
        ? ((Number(mark.marks) / Number(mark.totalMarks)) * 100).toFixed(2)
        : "0"

    return [
      student?.name || "",
      student?.rollNumber || "",
      subject?.name || "",
      exam?.name || "",
      mark.marks,
      mark.totalMarks,
      `${percentage}%`
    ]
  })

  const csv = [
    headers,
    ...rows
  ]
    .map(row => row.map(escapeCSV).join(","))
    .join("\n")

  downloadBlob(
    csv,
    `schoolmarks-marks-${new Date().toISOString().slice(0, 10)}.csv`,
    "text/csv;charset=utf-8"
  )
}

export const exportResultsCSV = results => {
  const headers = [
    "Student",
    "Roll Number",
    "Class",
    "Section",
    "Percentage",
    "Grade",
    "Attendance",
    "Status"
  ]

  const rows = results.map(result => [
    result.studentName,
    result.rollNumber,
    result.className,
    result.section,
    `${result.percentage}%`,
    result.grade,
    `${result.attendance}%`,
    result.status
  ])

  const csv = [
    headers,
    ...rows
  ]
    .map(row => row.map(escapeCSV).join(","))
    .join("\n")

  downloadBlob(
    csv,
    `schoolmarks-results-${new Date().toISOString().slice(0, 10)}.csv`,
    "text/csv;charset=utf-8"
  )
}