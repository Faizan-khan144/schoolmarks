import React from "react"
import { Activity, Target, TrendingDown, TrendingUp } from "lucide-react"
import { Reveal, CountUp } from "../../../components/Reveal"
import { LineChart, ProgressBar } from "../../../components/Charts"

const trend = [
  { label: "Apr", value: 71 },
  { label: "May", value: 75 },
  { label: "Jun", value: 73 },
  { label: "Jul", value: 81 },
  { label: "Aug", value: 84 },
  { label: "Sep", value: 88 }
]

const subjects = [
  { name: "Computer Science", value: 94 },
  { name: "English", value: 90 },
  { name: "Physics", value: 84 },
  { name: "Chemistry", value: 83 },
  { name: "Mathematics", value: 78 }
]

const correlation = [
  { label: "A", attendance: 96, performance: 88 },
  { label: "B", attendance: 92, performance: 82 },
  { label: "C", attendance: 86, performance: 74 },
  { label: "D", attendance: 79, performance: 66 },
  { label: "E", attendance: 73, performance: 58 }
]

export default function AnalyticsShowcase() {
  return (
    <section className="section analytics-showcase" id="analytics">
      <div className="section-inner">
        <Reveal>
          <div className="section-head">
            <span className="section-eyebrow">
              <i />
              PERFORMANCE ANALYTICS
            </span>
            <h2>
              Understand the term
              <br />
              while it is happening.
            </h2>
            <p className="section-lead">
              Trends, subject averages, progress and attendance correlation —
              advanced analytics that stay readable.
            </p>
          </div>
        </Reveal>

        <div className="analytics-bento">
          <Reveal className="analytics-hero-card" delay={0}>
            <div className="analytics-hero-head">
              <div>
                <small>OVERALL PERFORMANCE</small>
                <strong>School average</strong>
              </div>
              <span className="analytics-trend-badge">
                <TrendingUp size={13} />
                +8.4% this term
              </span>
            </div>
            <div className="analytics-hero-value">
              <CountUp value={87.4} decimals={1} suffix="%" />
            </div>
            <LineChart data={trend} height={172} color="var(--green-600)" />
          </Reveal>

          <Reveal className="analytics-subject-card" delay={90}>
            <div className="analytics-card-head">
              <small>SUBJECT AVERAGES</small>
              <strong>By subject</strong>
            </div>
            <div className="analytics-subjects">
              {subjects.map(subject => (
                <div className="analytics-subject" key={subject.name}>
                  <div className="analytics-subject-top">
                    <span>{subject.name}</span>
                    <strong>{subject.value}%</strong>
                  </div>
                  <ProgressBar value={subject.value} showLabel={false} />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="analytics-focus-card" delay={150}>
            <div className="analytics-card-head">
              <small>FOCUS AREAS</small>
              <strong>Strongest &amp; weakest</strong>
            </div>
            <div className="analytics-focus">
              <div className="analytics-focus-item up">
                <span className="analytics-focus-icon">
                  <Target size={15} />
                </span>
                <div>
                  <span>Strongest</span>
                  <strong>Computer Science · 94%</strong>
                </div>
              </div>
              <div className="analytics-focus-item down">
                <span className="analytics-focus-icon">
                  <TrendingDown size={15} />
                </span>
                <div>
                  <span>Needs focus</span>
                  <strong>Mathematics · 78%</strong>
                </div>
              </div>
              <div className="analytics-focus-note">
                <Activity size={14} />
                18 students tracked in the latest assessment cycle.
              </div>
            </div>
          </Reveal>

          <Reveal className="analytics-correlation-card" delay={210}>
            <div className="analytics-card-head">
              <small>ATTENDANCE CORRELATION</small>
              <strong>Attendance vs performance</strong>
            </div>
            <div className="correlation-chart">
              {correlation.map(item => (
                <div className="correlation-column" key={item.label}>
                  <div className="correlation-pair">
                    <i
                      className="correlation-attendance"
                      style={{ height: `${item.attendance}%` }}
                    />
                    <i
                      className="correlation-performance"
                      style={{ height: `${item.performance}%` }}
                    />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="correlation-legend">
              <span>
                <i className="legend-attendance" /> Attendance
              </span>
              <span>
                <i className="legend-performance" /> Performance
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}