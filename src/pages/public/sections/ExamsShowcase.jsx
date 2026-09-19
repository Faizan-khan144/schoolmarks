import React from "react"
import { CalendarDays, CheckCircle2, Clock3, FileText, MapPin } from "lucide-react"
import { Reveal } from "../../../components/Reveal"

const upcoming = [
  { day: "22", month: "SEP", title: "Mathematics", detail: "Class 9 · Mid-Term", time: "09:00 AM", room: "Hall A", status: "This week" },
  { day: "24", month: "SEP", title: "Physics", detail: "Class 9 · Mid-Term", time: "09:00 AM", room: "Hall A", status: "Upcoming" },
  { day: "26", month: "SEP", title: "English", detail: "Class 9 · Mid-Term", time: "10:00 AM", room: "Hall A", status: "Upcoming" },
  { day: "29", month: "SEP", title: "Computer Science", detail: "Class 9 · Mid-Term", time: "09:30 AM", room: "Lab 1", status: "Upcoming" }
]

const completed = [
  { day: "04", month: "SEP", title: "Computer Science", detail: "Class 9 · Assignment 1", score: "Avg 88%" },
  { day: "02", month: "SEP", title: "Physics", detail: "Class 9 · Quiz 1", score: "Avg 74%" },
  { day: "28", month: "AUG", title: "English", detail: "Class 9 · Quiz 1", score: "Avg 86%" }
]

export default function ExamsShowcase() {
  return (
    <section className="section exams-showcase" id="exams">
      <div className="section-inner exams-grid">
        <Reveal className="exams-copy">
          <span className="section-eyebrow">
            <i />
            EXAMINATIONS
          </span>
          <h2>
            A timetable that keeps
            <br />
            the whole term on track.
          </h2>
          <p className="section-lead">
            Plan assessments, track what is coming next and review what has
            already been completed — all in one clear examination timeline.
          </p>

          <div className="exams-summary">
            <div>
              <strong>11</strong>
              <span>Upcoming</span>
            </div>
            <div>
              <strong>9</strong>
              <span>Completed</span>
            </div>
            <div>
              <strong>5</strong>
              <span>This week</span>
            </div>
          </div>
        </Reveal>

        <div className="exams-timeline">
          <div className="exams-timeline-group">
            <span className="exams-timeline-label">
              <CalendarDays size={14} />
              Upcoming
            </span>
            {upcoming.map((exam, index) => (
              <Reveal
                key={exam.title}
                delay={index * 90}
                className="exam-card"
              >
                <div className="exam-date">
                  <strong>{exam.day}</strong>
                  <span>{exam.month}</span>
                </div>
                <div className="exam-card-body">
                  <strong>{exam.title}</strong>
                  <span>{exam.detail}</span>
                </div>
                <div className="exam-card-meta">
                  <span>
                    <Clock3 size={12} />
                    {exam.time}
                  </span>
                  <span>
                    <MapPin size={12} />
                    {exam.room}
                  </span>
                </div>
                <span className={`exam-status ${exam.status.toLowerCase().replace(" ", "-")}`}>
                  {exam.status}
                </span>
              </Reveal>
            ))}
          </div>

          <div className="exams-timeline-group completed">
            <span className="exams-timeline-label">
              <FileText size={14} />
              Completed
            </span>
            {completed.map((exam, index) => (
              <Reveal key={exam.title} delay={index * 80} className="exam-card is-completed">
                <span className="exam-check">
                  <CheckCircle2 size={18} />
                </span>
                <div className="exam-card-body">
                  <strong>{exam.title}</strong>
                  <span>{exam.detail}</span>
                </div>
                <span className="exam-score">{exam.score}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}