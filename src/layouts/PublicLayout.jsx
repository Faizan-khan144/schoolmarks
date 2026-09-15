import Navbar from "../components/Navbar";
import { useTheme } from "../components/ThemeProvider";

export default function PublicLayout({ onGetStarted }) {
  const { colors } = useTheme();

  return (
    <div className="public-layout" id="home">
      <Navbar onGetStarted={onGetStarted} />

      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow">
                <span
                  style={{ background: colors.primary }}
                />
                Modern School Management
              </div>

              <h1>
                Everything your school needs,
                <span style={{ color: colors.primary }}>
                  {" "}in one place.
                </span>
              </h1>

              <p>
                SchoolMarks helps schools manage students, classes,
                subjects, examinations, marks, attendance, results and
                performance from one simple platform.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button large"
                  onClick={onGetStarted}
                >
                  Open School System
                </button>

                <a href="#features" className="secondary-button large">
                  Explore Features
                </a>
              </div>

              <div className="hero-trust">
                <div>
                  <strong>100%</strong>
                  <span>Local Data</span>
                </div>

                <div>
                  <strong>12+</strong>
                  <span>Management Tools</span>
                </div>

                <div>
                  <strong>Easy</strong>
                  <span>To Use</span>
                </div>
              </div>
            </div>

            <div className="hero-preview">
              <div className="preview-window">
                <div className="preview-topbar">
                  <div className="window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>SchoolMarks Dashboard</span>
                </div>

                <div className="preview-body">
                  <div className="preview-sidebar">
                    <div className="preview-logo">S</div>
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="preview-content">
                    <div className="preview-heading">
                      <div>
                        <small>Good morning</small>
                        <h3>School Overview</h3>
                      </div>
                      <div className="preview-avatar">FK</div>
                    </div>

                    <div className="preview-stats">
                      <div>
                        <small>Students</small>
                        <strong>1,248</strong>
                        <span>+8.4%</span>
                      </div>

                      <div>
                        <small>Classes</small>
                        <strong>32</strong>
                        <span>+3.2%</span>
                      </div>

                      <div>
                        <small>Attendance</small>
                        <strong>94.8%</strong>
                        <span>+2.1%</span>
                      </div>
                    </div>

                    <div className="preview-chart">
                      <div className="chart-header">
                        <strong>Academic Performance</strong>
                        <span>2026</span>
                      </div>

                      <div className="chart-bars">
                        {[45, 68, 52, 82, 64, 91, 76, 96].map(
                          (height, index) => (
                            <div key={index}>
                              <span
                                style={{
                                  height: `${height}%`,
                                  background: colors.primary
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">POWERFUL FEATURES</span>
              <h2>Built for modern schools</h2>
              <p>
                A complete foundation for managing everyday academic
                operations with less complexity.
              </p>
            </div>

            <div className="feature-grid">
              {[
                ["Students", "Manage student profiles, history and academic records."],
                ["Marks & Results", "Record marks and generate clear academic results."],
                ["Attendance", "Track attendance and monitor student presence."],
                ["Performance", "Understand class and student performance over time."],
                ["Reports", "Create useful academic and management reports."],
                ["Local & Private", "Your school data stays inside your browser."],
              ].map(([title, text]) => (
                <div className="feature-card" key={title}>
                  <div
                    className="feature-icon"
                    style={{
                      color: colors.primary,
                      background: `${colors.primary}14`
                    }}
                  >
                    ✓
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="info-section" id="how-it-works">
          <div className="container info-grid">
            <div>
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>Simple enough for everyday school operations.</h2>
              <p>
                Set up your school, add classes and subjects, manage
                students, enter marks and instantly view academic
                performance.
              </p>
            </div>

            <div className="steps">
              {[
                ["01", "Set Up Your School"],
                ["02", "Add Classes & Students"],
                ["03", "Manage Marks & Attendance"],
                ["04", "View Results & Reports"]
              ].map(([number, title]) => (
                <div className="step" key={number}>
                  <span
                    style={{
                      color: colors.primary,
                      background: `${colors.primary}12`
                    }}
                  >
                    {number}
                  </span>
                  <strong>{title}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="footer-section" id="contact">
          <div className="container footer-content">
            <div>
              <div className="brand">
                <div
                  className="brand-mark"
                  style={{ background: colors.primary }}
                >
                  S
                </div>
                <div>
                  <div className="brand-name">SchoolMarks</div>
                  <div className="brand-subtitle">
                    School Management System
                  </div>
                </div>
              </div>
              <p>
                A modern local-first platform for managing school
                academic operations.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={onGetStarted}
            >
              Get Started
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}