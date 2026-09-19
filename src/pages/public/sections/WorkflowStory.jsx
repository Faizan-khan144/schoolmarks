import React, { useEffect, useRef, useState } from "react"
import {
  BarChart3,
  CalendarCheck,
  ClipboardCheck,
  FileSpreadsheet,
  GraduationCap,
  ShieldCheck,
  UserPlus
} from "lucide-react"
import { Reveal } from "../../../components/Reveal"

const stages = [
  {
    title: "Student enrolled",
    text: "A profile is created with class, section, roll number and guardian details.",
    icon: UserPlus,
    meta: "Profile created"
  },
  {
    title: "Assessment recorded",
    text: "Teachers add an assessment — quiz, assignment or examination — to the class.",
    icon: FileSpreadsheet,
    meta: "Assessment added"
  },
  {
    title: "Marks entered",
    text: "Every mark is linked to the student, subject and examination automatically.",
    icon: ClipboardCheck,
    meta: "Marks linked"
  },
  {
    title: "Attendance tracked",
    text: "Daily attendance builds a continuous presence record for every student.",
    icon: CalendarCheck,
    meta: "Attendance synced"
  },
  {
    title: "Result generated",
    text: "Totals, percentages and grades are calculated from real marks.",
    icon: GraduationCap,
    meta: "Result calculated"
  },
  {
    title: "Performance analysed",
    text: "Averages, trends and weak areas surface across classes and subjects.",
    icon: BarChart3,
    meta: "Insights ready"
  },
  {
    title: "Academic history secured",
    text: "Everything is stored as a permanent, searchable academic record.",
    icon: ShieldCheck,
    meta: "History saved"
  }
]

function useActiveStage(count) {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index))
          }
        })
      },
      { threshold: 0.55, rootMargin: "-18% 0px -30% 0px" }
    )

    refs.current.forEach(node => node && observer.observe(node))
    return () => observer.disconnect()
  }, [count])

  return { active, refs }
}

export default function WorkflowStory() {
  const { active, refs } = useActiveStage(stages.length)
  const progress = ((active + 1) / stages.length) * 100

  return (
    <section className="section workflow-story" id="workflow">
      <div className="section-inner workflow-story-grid">
        <div className="workflow-copy">
          <Reveal>
            <span className="section-eyebrow">
              <i />
              ACADEMIC WORKFLOW
            </span>
            <h2>
              From a single entry to a
              <br />
              complete academic history.
            </h2>
            <p className="section-lead">
              SchoolMarks follows the natural flow of a school term. Each step
              connects to the next, so nothing is duplicated and nothing is lost.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="workflow-progress">
              <div className="workflow-progress-bar">
                <i style={{ height: `${progress}%` }} />
                <span
                  className="workflow-progress-dot"
                  style={{ top: `${progress}%` }}
                />
              </div>
              <div className="workflow-progress-meta">
                <strong>
                  Step {active + 1} of {stages.length}
                </strong>
                <span>{stages[active].meta}</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="workflow-timeline">
          {stages.map((stage, index) => {
            const Icon = stage.icon
            const isActive = index <= active

            return (
              <div
                key={stage.title}
                ref={node => {
                  refs.current[index] = node
                }}
                data-index={index}
                className={`workflow-node ${isActive ? "active" : ""} ${index === active ? "current" : ""}`}
                style={{ "--node-delay": `${index * 40}ms` }}
              >
                <span className="workflow-node-dot">
                  <Icon size={16} />
                </span>
                <div className="workflow-node-body">
                  <span className="workflow-node-step">0{index + 1}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}