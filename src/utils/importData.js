import { importStorageData } from "./storage"

export const importJSONFile = file =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No backup file selected"))
      return
    }

    const reader = new FileReader()

    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result)

        importStorageData(data)

        resolve(data)
      } catch {
        reject(
          new Error(
            "This file is not a valid SchoolMarks backup."
          )
        )
      }
    }

    reader.onerror = () =>
      reject(new Error("Unable to read backup file."))

    reader.readAsText(file)
  })

export const validateBackup = data => {
  if (!data || typeof data !== "object") return false

  const validCollections = [
    "students",
    "classes",
    "subjects",
    "marks",
    "attendance",
    "exams"
  ]

  return validCollections.some(key => Array.isArray(data[key]))
}

export const readJSONFile = file =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected"))
      return
    }

    const reader = new FileReader()

    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result)
        resolve(data)
      } catch {
        reject(new Error("Invalid JSON file."))
      }
    }

    reader.onerror = () =>
      reject(new Error("Unable to read file."))

    reader.readAsText(file)
  })