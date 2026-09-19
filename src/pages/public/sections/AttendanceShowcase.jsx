import React from "react"
import { CalendarCheck, CircleAlert, Clock3, UserRoundCheck } from "lucide-react"
import { Reveal, CountUp } from "../../../components/Reveal"
import { Bars, Ring } from "../../../components/Charts"

const monthly = [
  { label: "W1", value: 92 },
  { label: "W2", value: 95 },
  { label: "W3", value: 89 },
  { label: "W4", value: 97 }
]

export default function AttendanceShowcase() {
  return (
    <section className="section attendance-showcase" id="attendance">
      <div className="section-inner attendance-grid">
        <Reveal className="attendance-copy">
          <span className="section-eyebrow">
            <i />
            ATTENDANCE
          </span>
          <h2>
            Attendance you can
            <br />
            actually act on.
          </h2>
          <p className="section-lead">
            Daily records become clear percentages, trends and early warnings —
            so students at risk are visible long before they fall behind.
          </p>

          <div className="attendance-highlights">
            <div>
              <span className="attendance-highlight-icon present">
                <UserRoundCheck size={15} />
              </span>
              <div>
                <strong>Present tracking</strong>
                <small>Present, late and absent in one record</small>
              </div>
            </div>
            <div>
              <span className="attendance-highlight-icon warning">
                <CircleAlert size={15} />
              </span>
              <div>
                <strong>Threshold alerts</strong>
                <small>Automatic flags below the school target</small>
              </div>
            </div>
            <div>
              <span className="attendance-highlight-icon trend">
                <Clock3 size={15} />
              </span>
              <div>
                <strong>Trend over time</strong>
                <small>Weekly and monthly attendance patterns</small>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="attendance-card">
          <div className="attendance-card-head">
            <div>
              <small>SCHOOL ATTENDANCE</small>
              <strong>Current term</strong>
            </div>
            <span className="attendance-live">
              <CalendarCheck size={13} />
              Live
            </span>
          </div>

          <div className="attendance-ring-row">
            <Ring value={94.8} size={168} stroke={13} label="94.8%" sub="Overall" />

            <div className="attendance-stat-list">
              <div>
                <span className="stat-dot present" />
                <span>Present</span>
                <strong>
                  <CountUp value={92.4} decimals={1} suffix="%" />
                </strong>
              </div>
              <div>
                <span className="stat-dot late" />
                <span>Late</span>
                <strong>
                  <CountUp value={2.4} decimals={1} suffix="%" />
                </strong>
              </div>
              <div>
                <span className="stat-dot absent" />
                <span>Absent</span>
                <strong>
                  <CountUp value={5.2} decimals={1} suffix="%" />
                </strong>
              </div>
            </div>
          </div>

          <div className="attendance-trend">
            <div className="attendance-trend-head">
              <span>Weekly attendance</span>
              <span className="attendance-trend-badge">+3.1%</span>
            </div>
            <Bars data={monthly} height={110} />
          </div>

          <div className="attendance-warning">
            <CircleAlert size={15} />
            <div>
              <strong>2 students below threshold</strong>
              <span>Flagged for guardian follow-up this week</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}