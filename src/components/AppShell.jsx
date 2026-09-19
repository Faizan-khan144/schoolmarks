import React, { useEffect, useMemo, useState } from "react"
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Menu,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  User,
  Users,
  X
} from "lucide-react"
import { useData } from "../store/DataContext"
import { Avatar } from "./Avatar"
import { Logo } from "./Logo"

export const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }]
  },
  {
    label: "Manage",
    items: [
      { id: "students", label: "Students", icon: Users },
      { id: "classes", label: "Classes", icon: GraduationCap },
      { id: "subjects", label: "Subjects", icon: BookOpen }
    ]
  },
  {
    label: "Academics",
    items: [
      { id: "marks", label: "Marks", icon: ClipboardCheck },
      { id: "attendance", label: "Attendance", icon: CalendarDays },
      { id: "exams", label: "Exams", icon: FileText },
      { id: "results", label: "Results", icon: BarChart3 }
    ]
  },
  {
    label: "Analyze",
    items: [
      { id: "performance", label: "Performance", icon: TrendingUp },
      { id: "reports", label: "Reports", icon: FileText }
    ]
  },
  {
    label: "Communicate",
    items: [
      { id: "notices", label: "Notices", icon: Megaphone },
      { id: "ai", label: "AI Assistant", icon: BrainCircuit }
    ]
  },
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "settings", label: "Settings", icon: Settings }
    ]
  }
]

const flatNav = NAV_GROUPS.flatMap(group => group.items)

const pageTitles = flatNav.reduce(
  (map, item) => {
    map[item.id] = item.label
    return map
  },
  { "student-profile": "Student Profile" }
)

function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("")
  const { students, examStats } = useData()

  const results = useMemo(() => {
    const term = query.toLowerCase().trim()

    return {
      pages: flatNav
        .filter(item => item.label.toLowerCase().includes(term))
        .slice(0, 6),
      people: students
        .filter(student => student.name.toLowerCase().includes(term))
        .slice(0, 5)
    }
  }, [query, students])

  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  if (!open) return null

  const pick = (type, id) => {
    onClose()
    onNavigate(type, id)
  }

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div
        className="command-palette"
        onMouseDown={event => event.stopPropagation()}
        role="dialog"
        aria-label="Command and search palette"
      >
        <div className="palette-input">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Jump to a page or student..."
            aria-label="Search"
          />
          <kbd>ESC</kbd>
        </div>

        <div className="palette-results">
          {!query ? (
            <>
              <div className="palette-section-label">Quick navigation</div>
              <div className="palette-list">
                <button onClick={() => pick("page", "dashboard")}>
                  <LayoutDashboard size={16} /> Dashboard
                </button>
                <button onClick={() => pick("page", "students")}>
                  <Users size={16} /> Students
                </button>
                <button onClick={() => pick("page", "attendance")}>
                  <CalendarDays size={16} /> Attendance
                </button>
                <button onClick={() => pick("page", "results")}>
                  <BarChart3 size={16} /> Results
                </button>
                <button onClick={() => pick("page", "ai")}>
                  <Sparkles size={16} /> AI Assistant
                </button>
              </div>
            </>
          ) : (
            <>
              {results.pages.length > 0 && (
                <div className="palette-section-label">Pages</div>
              )}
              <div className="palette-list">
                {results.pages.map(item => (
                  <button key={item.id} onClick={() => pick("page", item.id)}>
                    <item.icon size={16} /> {item.label}
                    <kbd>↵</kbd>
                  </button>
                ))}
              </div>

              {results.people.length > 0 && (
                <div className="palette-section-label">Students</div>
              )}
              <div className="palette-list">
                {results.people.map(student => (
                  <button key={student.id} onClick={() => pick("student", student.id)}>
                    <Avatar name={student.name} size={22} />
                    <span className="palette-person">
                      {student.name}
                      <em>
                        {student.className} {student.section}
                      </em>
                    </span>
                  </button>
                ))}
              </div>

              {results.pages.length === 0 && results.people.length === 0 && (
                <div className="palette-empty">No results for “{query}”.</div>
              )}
            </>
          )}
        </div>

        <div className="palette-foot">
          <span>{examStats.upcoming} upcoming exams</span>
          <span>{students.length} students tracked</span>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ page, setPage, open, setOpen, onHome }) {
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`app-sidebar ${open ? "open" : ""}`} aria-label="Primary navigation">
        <div className="sidebar-head">
          <button className="sidebar-logo" onClick={onHome} aria-label="Go to SchoolMarks homepage">
            <Logo />
          </button>
          <button className="sidebar-close-mobile" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_GROUPS.map(group => (
            <div className="sidebar-group" key={group.label}>
              <span className="sidebar-group-label">{group.label}</span>
              {group.items.map(item => {
                const active = page === item.id

                return (
                  <button
                    key={item.id}
                    className={`sidebar-item ${active ? "active" : ""}`}
                    onClick={() => {
                      setPage(item.id)
                      setOpen(false)
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    <item.icon size={17} strokeWidth={active ? 2.1 : 1.8} />
                    <span>{item.label}</span>
                    {item.id === "ai" && <em className="sidebar-ai-tag">AI</em>}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="sidebar-presence">
            <i />
            <span>Records active &amp; saved locally</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export function AppShell({ page, setPage, onHome, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { profile, students } = useData()

  const navigate = (type, id) => {
    if (type === "page") setPage(id)
    if (type === "student") setPage("student-profile", id)
  }

  useEffect(() => {
    const onKeyDown = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen(true)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const node = document.getElementById("app-content")
    if (node) node.scrollTop = 0
    window.scrollTo({ top: 0 })
  }, [page])

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={nextPage => {
          setPage(nextPage)
          setSidebarOpen(false)
        }}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onHome={onHome}
      />

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              className="topbar-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <button className="topbar-home" onClick={onHome}>
              SchoolMarks
            </button>
            <span className="topbar-sep">/</span>
            <span className="topbar-page">{pageTitles[page] || "Workspace"}</span>
          </div>

          <div className="topbar-actions">
            <button className="topbar-search-button" onClick={() => setPaletteOpen(true)}>
              <Search size={16} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>

            <button className="topbar-ai-button" onClick={() => setPage("ai")}>
              <Sparkles size={15} />
              AI
            </button>

            <button className="topbar-profile" onClick={() => setPage("profile")} aria-label="Open profile">
              <Avatar name={profile.name} color={profile.avatarColor} size={30} />
            </button>
          </div>
        </header>

        <main className="app-content">{children}</main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
      />
    </div>
  )
}

export default AppShell