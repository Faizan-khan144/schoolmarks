import React from "react"
import { Award, FileCheck2, Sparkles } from "lucide-react"
import { Reveal, CountUp } from "../../../components/Reveal"
import { Ring } from "../../../components/Charts"

const breakdown = [
  { subject: "Mathematics", obtained: 88, total: 100, grade: "A" },
  { subject: "Physics", obtained: 79, total: 100, grade: "B" },
  { subject: "English", obtained: 92, total: 100, grade: "A+" },
  { subject: "Computer Science", obtained: 95, total: 100, grade: "A+" },
  { subject: "Chemistry", obtained: 83, total: 100, grade: "A" }
]

const total = breakdown.reduce((sum, item) => sum + item.obtained, 0)
const max = breakdown.reduce((sum, item) => sum + item.total, 0)
const percentage = Number(((total / max) * 100).toFixed(1))

export default function ResultsShowcase() {
  return (
    <section className="section results-showcase" id="results">
      <div className="section-inner results-grid">
        <Reveal className="results-copy">
          <span className="section-eyebrow">
            <i />
            RESULTS
          </span>
          <h2>
            Results that explain
            <br />
            themselves.
          </h2>
          <p className="section-lead">
            Totals, percentages, grades and subject breakdowns are calculated
            from real marks — presented clearly enough to act on immediately.
          </p>

          <div className="results-notes">
            <span>
              <FileCheck2 size={15} />
              Totals calculated from every recorded mark
            </span>
            <span>
              <Award size={15} />
              Grades applied automatically
            </span>
            <span>
              <Sparkles size={15} />
              Performance summary written for you
            </span>
          </div>
        </Reveal>

        <Reveal delay={140} className="result-card">
          <div className="result-card-head">
            <div>
              <small>ACADEMIC RESULT</small>
              <strong>Areeba Khan</strong>
              <span>Class 9 · B · Roll 905 · Mid-Term 2026</span>
            </div>
            <span className="result-grade">A+</span>
          </div>

          <div className="result-card-main">
            <Ring value={percentage} size={150} stroke={12} label={`${percentage}%`} sub="Percentage" />
            <div className="result-summary">
              <div>
                <span>Total obtained</span>
                <strong>
                  <CountUp value={total} />
                  <small> / {max}</small>
                </strong>
              </div>
              <div>
                <span>Grade point</span>
                <strong>4.0</strong>
              </div>
              <div className="result-summary-note">
                Ranked 2nd in Class 9-B for this assessment.
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            {breakdown.map((item, index) => (
              <div className="result-subject" key={item.subject} style={{ "--subject-delay": `${index * 60}ms` }}>
                <span className="result-subject-name">{item.subject}</span>
                <div className="result-subject-bar">
                  <i style={{ width: `${item.obtained}%` }} />
                </div>
                <span className="result-subject-marks">
                  {item.obtained}
                  <small>/{item.total}</small>
                </span>
                <span className="result-subject-grade">{item.grade}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}