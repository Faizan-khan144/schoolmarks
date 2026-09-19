import React, { useState } from "react"
import {
  ArrowRight,
  BarChart3,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  Sparkles
} from "lucide-react"
import { Reveal, CountUp } from "../../../components/Reveal"

const datasets = {
  Mathematics: [88, 92, 79, 95],
  Physics: [72, 68, 81, 74],
  English: [94, 89, 91, 96],
  "Computer Science": [97, 93, 95, 90]
}

const gradeFor = average => {
  if (average >= 90) return "A+"
  if (average >= 80) return "A"
  if (average >= 70) return "B"
  if (average >= 60) return "C"
  return "D"
}

const labelFor = average =>
  average >= 90 ? "Outstanding" : average >= 80 ? "Strong" : average >= 70 ? "Steady" : "Needs focus"

export default function MarksShowcase() {
  const subjects = Object.keys(datasets)
  const [subject, setSubject] = useState(subjects[0])

  const marks = datasets[subject]
  const average = Number(
    (marks.reduce((sum, mark) => sum + mark, 0) / marks.length).toFixed(1)
  )
  const grade = gradeFor(average)

  return (
    <section className="section marks-showcase" id="marks">
      <div className="section-inner">
        <Reveal>
          <div className="section-head">
            <span className="section-eyebrow">
              <i />
              MARKS
            </span>
            <h2>
              Entered once.
              <br />
              Understood instantly.
            </h2>
            <p className="section-lead">
              Marks are never just numbers. SchoolMarks turns them into averages,
              grades and clear performance signals the moment they are recorded.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="marks-subject-tabs">
            {subjects.map(item => (
              <button
                key={item}
                className={`chip ${item === subject ? "active" : ""}`}
                onClick={() => setSubject(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="marks-flow">
          <Reveal className="marks-stage" delay={0}>
            <div className="marks-stage-head">
              <span className="marks-stage-icon">
                <ClipboardCheck size={16} />
              </span>
              <span>Marks entered</span>
            </div>
            <div className="marks-stage-marks">
              {marks.map((mark, index) => (
                <span
                  key={index}
                  className="marks-chip"
                  style={{ "--mark-delay": `${index * 90}ms` }}
                >
                  {mark}
                </span>
              ))}
            </div>
            <small>{subject} · latest assessments</small>
          </Reveal>

          <span className="marks-flow-arrow">
            <ArrowRight size={16} />
          </span>

          <Reveal className="marks-stage" delay={120}>
            <div className="marks-stage-head">
              <span className="marks-stage-icon">
                <Calculator size={16} />
              </span>
              <span>Average calculated</span>
            </div>
            <div className="marks-stage-value">
              <CountUp key={subject} value={average} decimals={1} suffix="%" />
            </div>
            <small>Automatic, no spreadsheets</small>
          </Reveal>

          <span className="marks-flow-arrow">
            <ArrowRight size={16} />
          </span>

          <Reveal className="marks-stage" delay={240}>
            <div className="marks-stage-head">
              <span className="marks-stage-icon">
                <GraduationCap size={16} />
              </span>
              <span>Grade generated</span>
            </div>
            <div className="marks-grade" key={`${subject}-grade`}>
              {grade}
            </div>
            <small>{labelFor(average)} performance</small>
          </Reveal>

          <span className="marks-flow-arrow">
            <ArrowRight size={16} />
          </span>

          <Reveal className="marks-stage" delay={360}>
            <div className="marks-stage-head">
              <span className="marks-stage-icon">
                <BarChart3 size={16} />
              </span>
              <span>Performance analysed</span>
            </div>
            <div className="marks-bars">
              {marks.map((mark, index) => (
                <i key={index}>
                  <b
                    style={{
                      height: `${mark}%`,
                      transitionDelay: `${index * 60}ms`
                    }}
                  />
                </i>
              ))}
            </div>
            <small>Weak and strong signals detected</small>
          </Reveal>

          <span className="marks-flow-arrow">
            <ArrowRight size={16} />
          </span>

          <Reveal className="marks-stage marks-stage-result" delay={480}>
            <div className="marks-result">
              <span className="marks-result-label">
                <Sparkles size={13} />
                Result ready
              </span>
              <strong>
                {grade} · {average}%
              </strong>
              <small>{subject} · Mid-term preview</small>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}