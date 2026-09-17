import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import {
  initializeStorage
} from "./utils/storage"
import { defaultStudents } from "./data/defaultStudents"
import { defaultClasses } from "./data/defaultClasses"
import { defaultSubjects } from "./data/defaultSubjects"

initializeStorage({
  students: defaultStudents,
  classes: defaultClasses,
  subjects: defaultSubjects
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)