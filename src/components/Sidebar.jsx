import { useTheme } from "./ThemeProvider";

const menu = [
  ["Overview", "dashboard"],
  ["Students", "students"],
  ["Classes", "classes"],
  ["Subjects", "subjects"],
  ["Exams", "exams"],
  ["Marks", "marks"],
  ["Results", "results"],
  ["Attendance", "attendance"],
  ["Performance", "performance"],
  ["Notices", "notices"],
  ["Reports", "reports"],
  ["Settings", "settings"]
];

export default function Sidebar({ active, setActive }) {
  const { colors } = useTheme();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div
          className="brand-mark"
          style={{ background: colors.primary }}
        >
          S
        </div>

        <div>
          <strong>SchoolMarks</strong>
          <span>Management System</span>
        </div>
      </div>

      <div className="sidebar-section-title">MAIN MENU</div>

      <nav className="sidebar-menu">
        {menu.map(([label, id]) => (
          <button
            key={id}
            className={`sidebar-item ${active === id ? "active" : ""}`}
            onClick={() => setActive(id)}
          >
            <span className="sidebar-icon">
              {id === "dashboard" && "⌂"}
              {id === "students" && "◉"}
              {id === "classes" && "▦"}
              {id === "subjects" && "◈"}
              {id === "exams" && "✓"}
              {id === "marks" && "▤"}
              {id === "results" && "◒"}
              {id === "attendance" && "◷"}
              {id === "performance" && "↗"}
              {id === "notices" && "◻"}
              {id === "reports" && "▥"}
              {id === "settings" && "⚙"}
            </span>

            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="school-mini-card">
          <div className="mini-logo">S</div>
          <div>
            <strong>Your School</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}