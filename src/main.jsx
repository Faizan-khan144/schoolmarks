import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { initializeStorage } from "./utils/storage"
import { buildSampleSeed } from "./data/sample"
import { DataProvider } from "./store/DataContext"
import { ToastProvider } from "./components/Toast.jsx"

initializeStorage(buildSampleSeed())

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </DataProvider>
  </StrictMode>
)