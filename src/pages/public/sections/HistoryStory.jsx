import React from "react"
import {
  ArrowRight,
  Database,
  FileScan,
  History,
  ScanLine,
  ShieldCheck
} from "lucide-react"
import { Reveal } from "../../../components/Reveal"

const records = [
  { name: "Areeba Khan", mark: "92", attendance: "98%" },
  { name: "Hiba Fatima", mark: "87", attendance: "94%" },
  { name: "Ayaan Khan", mark: "82", attendance: "96%" },
  { name: "Rayyan Malik", mark: "64", attendance: "79%" }
]

const history = [
  { label: "Term 1 · 2024", value: "120 records" },
  { label: "Term 2 · 2024", value: "184 records" },
  { label: "Term 1 · 2025", value: "256 records" },
  { label: "Term 2 · 2025", value: "312 records" },
  { label: "Term 1 · 2026", value: "418 records" }
]

export default function HistoryStory() {
  return (
    <section className="section history-story" id="history">
      <div className="section-inner">
        <Reveal>
          <div className="section-head">
            <span className="section-eyebrow">
              <i />
              FROM SCAN TO PERMANENT HISTORY
            </span>
            <h2>
              Paper becomes a record.
              <br />
              A record becomes history.
            </h2>
            <p className="section-lead">
              Registers, mark sheets and attendance lists no longer live in
              drawers. SchoolMarks turns everyday academic activity into a
              permanent, searchable academic history.
            </p>
          </div>
        </Reveal>

        <div className="scan-grid">
          <Reveal className="scan-panel" delay={0}>
            <div className="scan-panel-head">
              <span>
                <FileScan size={15} />
                Scan or enter
              </span>
              <span className="scan-panel-tag">Legacy records</span>
            </div>
            <div className="scan-document">
              <div className="scan-document-ruler" />
              {[...Array(7)].map((_, index) => (
                <div className="scan-line" key={index} style={{ width: `${60 + ((index * 13) % 34)}%` }} />
              ))}
              <div className="scan-beam" />
            </div>
            <div className="scan-panel-foot">
              <ScanLine size={14} />
              Attendance register · September
            </div>
          </Reveal>

          <Reveal className="scan-arrow" delay={100}>
            <ArrowRight size={20} />
          </Reveal>

          <Reveal className="digital-panel" delay={160}>
            <div className="scan-panel-head">
              <span>
                <Database size={15} />
                Structured record
              </span>
              <span className="scan-panel-tag success">Saved</span>
            </div>
            <div className="digital-rows">
              {records.map((record, index) => (
                <div
                  className="digital-row"
                  key={record.name}
                  style={{ "--digital-delay": `${index * 110}ms` }}
                >
                  <span className="digital-row-avatar">
                    {record.name.split(" ").map(part => part[0]).join("")}
                  </span>
                  <strong>{record.name}</strong>
                  <span className="digital-row-mark">{record.mark}</span>
                  <span className="digital-row-attendance">{record.attendance}</span>
                </div>
              ))}
            </div>
            <div className="scan-panel-foot">
              <ShieldCheck size={14} />
              Linked to permanent student history
            </div>
          </Reveal>
        </div>

        <Reveal className="history-rail-wrap" delay={140}>
          <div className="history-rail-head">
            <span>
              <History size={15} />
              Academic history
            </span>
            <strong>1,290 records archived</strong>
          </div>

          <div className="history-rail">
            <div className="history-rail-line" />
            {history.map((item, index) => (
              <div
                className="history-node"
                key={item.label}
                style={{ "--history-delay": `${index * 90}ms` }}
              >
                <span className="history-node-dot" />
                <strong>{item.label}</strong>
                <small>{item.value}</small>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}