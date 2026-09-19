export default function PerformancePage() {
  const subjects = [
    ["Mathematics", 82, "+4.2%", "up"],
    ["Physics", 88, "+2.8%", "up"],
    ["English", 91, "+5.1%", "up"],
    ["Computer Science", 94, "+7.2%", "up"],
    ["Chemistry", 86, "-1.4%", "down"],
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">PERFORMANCE</div>
          <h1>Student performance</h1>
          <p>Find trends across subjects, classes and assessments.</p>
        </div>
      </div>

      <div className="performance-hero">
        <div className="performance-score">
          <span>87.4</span>
          <small>Average score</small>
        </div>
        <div className="performance-copy">
          <small>ACADEMIC SIGNAL</small>
          <h2>Overall performance is improving.</h2>
          <p>
            The strongest improvement is currently coming from Computer
            Science and English.
          </p>
          <div className="performance-mini-chart">
            <i style={{ height: "35%" }} />
            <i style={{ height: "46%" }} />
            <i style={{ height: "41%" }} />
            <i style={{ height: "58%" }} />
            <i style={{ height: "64%" }} />
            <i style={{ height: "78%" }} />
            <i style={{ height: "88%" }} />
          </div>
        </div>
      </div>

      <div className="performance-subjects">
        {subjects.map(([name, score, change, direction], index) => (
          <div className="performance-subject" key={name}>
            <div className="subject-rank">0{index + 1}</div>
            <div className="performance-subject-name">
              <strong>{name}</strong>
              <span>Class average</span>
            </div>
            <strong className="performance-score-small">{score}%</strong>
            <span className={`change ${direction}`}>{change}</span>
            <div className="performance-progress">
              <span style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
