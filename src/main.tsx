import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Global } from "recharts"
import "./index.css"
import App from "./App.tsx"

Global.devToolsEnabled = false

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
