import React, { useRef, useState } from "react"
import {
  ArrowUp,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  ClipboardCheck,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react"
import { Reveal } from "../../../components/Reveal"
import { useData } from "../../../store/DataContext"
import { analyzeSchoolData, buildSuggestionQuestions } from "../../../utils/aiEngine"

const tools = [
  { id: "students", label: "Student analysis", icon: Users, question: "Which students need attention?" },
  { id: "attendance", label: "Attendance analysis", icon: CalendarDays, question: "Show students below the attendance threshold." },
  { id: "marks", label: "Marks analysis", icon: ClipboardCheck, question: "Which subject has the lowest average?" },
  { id: "exams", label: "Exam analysis", icon: BrainCircuit, question: "What are the upcoming examinations?" },
  { id: "performance", label: "Performance analysis", icon: TrendingUp, question: "How did Class 9 perform this month?" }
]

const suggestions = buildSuggestionQuestions()

export default function AIWorkspace() {
  const data = useData()
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      title: "Academic intelligence ready",
      points: [
        "I can analyse the students, marks, attendance and examinations in this workspace.",
        "Ask a question, or choose an analysis on the right to begin."
      ]
    }
  ])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef(null)

  const ask = question => {
    const value = String(question || "").trim()
    if (!value || thinking) return

    setMessages(current => [...current, { role: "user", title: value }])
    setInput("")
    setThinking(true)

    window.setTimeout(() => {
      const response = analyzeSchoolData(data, value)
      setMessages(current => [
        ...current,
        {
          role: "assistant",
          title: response.answer,
          points: response.points.length ? response.points : [response.text]
        }
      ])
      setThinking(false)

      window.requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth"
        })
      })
    }, 620)

    window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    })
  }

  return (
    <section className="section ai-showcase" id="ai">
      <div className="section-inner">
        <Reveal>
          <div className="section-head is-light">
            <span className="section-eyebrow">
              <i />
              SCHOOLMARKS AI
            </span>
            <h2>
              Academic intelligence,
              <br />
              grounded in your own data.
            </h2>
            <p className="section-lead">
              Not a chat window bolted onto a dashboard. SchoolMarks AI reads the
              actual students, marks, attendance and exams in your workspace.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="ai-workspace">
          <div className="ai-chat">
            <div className="ai-chat-head">
              <div className="ai-orb">
                <span />
                <BrainCircuit size={17} />
              </div>
              <div>
                <strong>SchoolMarks Intelligence</strong>
                <small>Connected to your academic records</small>
              </div>
              <span className="ai-chat-status">
                <i />
                Online
              </span>
            </div>

            <div className="ai-chat-scroll" ref={scrollRef}>
              {messages.map((message, index) => (
                <div className={`ai-message ${message.role}`} key={index}>
                  {message.role === "assistant" && (
                    <span className="ai-message-avatar">
                      <Sparkles size={14} />
                    </span>
                  )}
                  <div className="ai-message-bubble">
                    <strong>{message.title}</strong>
                    {message.points && (
                      <ul>
                        {message.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="ai-message assistant">
                  <span className="ai-message-avatar">
                    <Sparkles size={14} />
                  </span>
                  <div className="ai-message-bubble ai-typing">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              )}
            </div>

            <div className="ai-suggestions">
              {suggestions.slice(0, 4).map(suggestion => (
                <button key={suggestion} onClick={() => ask(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              className="ai-composer"
              onSubmit={event => {
                event.preventDefault()
                ask(input)
              }}
            >
              <input
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder="Ask about students, attendance, marks or exams..."
                aria-label="Ask SchoolMarks AI"
              />
              <button type="submit" aria-label="Send">
                <ArrowUp size={17} />
              </button>
            </form>
          </div>

          <aside className="ai-tools">
            <div className="ai-tools-head">
              <small>ANALYSIS TOOLS</small>
              <strong>Ask by module</strong>
            </div>

            <div className="ai-tool-list">
              {tools.map(tool => (
                <button key={tool.id} onClick={() => ask(tool.question)}>
                  <span>
                    <tool.icon size={15} />
                  </span>
                  <em>{tool.label}</em>
                </button>
              ))}
            </div>

            <div className="ai-tools-foot">
              <BarChart3 size={14} />
              Answers calculated from stored academic records
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}