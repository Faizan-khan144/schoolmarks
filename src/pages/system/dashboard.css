.dashboard-page {
  --ink: #172019;
  --muted: #758078;
  --soft: #a4ada7;
  --line: #e7ebe7;
  --surface: #ffffff;
  --paper: #f6f7f4;
  --green: #174b32;
  --green-2: #226743;
  --green-soft: #e7f0ea;
  --cream: #f0f1e9;
  position: relative;
  min-height: 100%;
  padding: 34px 38px 56px;
  color: var(--ink);
  background:
    radial-gradient(circle at 88% 0%, rgba(23, 75, 50, 0.055), transparent 25%),
    var(--paper);
  overflow: hidden;
}

.dashboard-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}

.dashboard-header,
.dash-stat-grid,
.dashboard-main-grid,
.dashboard-lower-grid,
.dashboard-bottom-banner {
  position: relative;
  z-index: 1;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  margin-bottom: 30px;
  animation: dashboardEnter 0.65s ease both;
}

.dashboard-kicker {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--green);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  margin-bottom: 13px;
}

.dashboard-kicker span {
  width: 22px;
  height: 1px;
  background: var(--green);
}

.dashboard-header h1 {
  margin: 0;
  font-size: clamp(31px, 3vw, 45px);
  line-height: 1;
  letter-spacing: -0.055em;
  font-weight: 700;
}

.dashboard-header h1 em {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -0.045em;
}

.dashboard-header p {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.dashboard-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dashboard-date {
  height: 43px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.68);
  border-radius: 13px;
  color: var(--muted);
  font-size: 12px;
}

.dashboard-primary-action {
  height: 43px;
  border: 0;
  padding: 0 17px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 13px;
  color: #fff;
  background: var(--green);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(23, 75, 50, 0.13);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-primary-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(23, 75, 50, 0.18);
}

.dash-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 14px;
}

.dash-stat-card {
  min-height: 155px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  animation: dashboardEnter 0.65s ease var(--delay) both;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.dash-stat-card:hover {
  transform: translateY(-4px);
  border-color: #d7ded8;
  box-shadow: 0 18px 40px rgba(25, 45, 34, 0.055);
}

.dash-stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dash-stat-eyebrow,
.panel-label {
  color: #87918a;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.dash-stat-icon {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: var(--green);
  background: var(--green-soft);
}

.dash-stat-value {
  margin-top: 17px;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.055em;
}

.dash-stat-value small {
  margin-left: 2px;
  color: var(--muted);
  font-size: 16px;
  font-weight: 500;
}

.dash-stat-bottom {
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--soft);
  font-size: 10px;
}

.dash-trend {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 700;
}

.dash-trend.up {
  color: #27734b;
}

.dash-trend.down {
  color: #a34e46;
}

.dashboard-main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.8fr);
  gap: 14px;
  margin-bottom: 14px;
}

.dashboard-lower-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.75fr);
  gap: 14px;
}

.dashboard-panel {
  border: 1px solid var(--line);
  border-radius: 21px;
  background: rgba(255, 255, 255, 0.88);
  overflow: hidden;
  animation: dashboardEnter 0.7s ease 0.18s both;
}

.performance-panel {
  min-height: 385px;
  padding: 24px 25px 18px;
}

.attendance-panel,
.risk-panel,
.activity-panel {
  padding: 24px;
}

.panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.panel-heading h2 {
  margin: 7px 0 0;
  font-size: 19px;
  letter-spacing: -0.035em;
}

.panel-menu {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 10px;
  color: var(--muted);
  cursor: pointer;
}

.performance-summary {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.performance-summary > div:first-child {
  display: flex;
  align-items: center;
  gap: 12px;
}

.performance-summary strong {
  font-size: 26px;
  letter-spacing: -0.05em;
}

.performance-summary span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #27734b;
  font-size: 10px;
  font-weight: 700;
}

.period-switcher {
  display: flex;
  padding: 3px;
  border-radius: 9px;
  background: #f1f3ef;
}

.period-switcher button {
  border: 0;
  background: transparent;
  padding: 6px 9px;
  border-radius: 7px;
  color: #8a938d;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.period-switcher button.active {
  color: var(--ink);
  background: #fff;
  box-shadow: 0 2px 8px rgba(20, 30, 24, 0.06);
}

.performance-chart {
  height: 218px;
  margin-top: 20px;
  display: flex;
}

.chart-y-axis {
  width: 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3px 0 22px;
  color: #a4aca6;
  font-size: 9px;
}

.chart-area {
  position: relative;
  flex: 1;
  min-width: 0;
}

.chart-grid {
  position: absolute;
  inset: 0 0 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-grid i {
  width: 100%;
  height: 1px;
  background: #edf0ed;
}

.chart-bars {
  position: absolute;
  inset: 0 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 12px;
  padding: 0 6px;
}

.chart-column {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 9px;
}

.chart-bar {
  width: min(36px, 62%);
  position: relative;
  min-height: 35px;
  border-radius: 8px 8px 3px 3px;
  background: linear-gradient(to top, #174b32, #3f8060);
  animation: barRise 0.7s cubic-bezier(0.2, 0.75, 0.25, 1) var(--bar-delay) both;
  transition: filter 0.2s ease, transform 0.2s ease;
}

.chart-bar:hover {
  filter: brightness(1.1);
  transform: translateY(-4px);
}

.chart-bar span {
  position: absolute;
  left: 50%;
  top: -21px;
  transform: translateX(-50%);
  opacity: 0;
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  transition: opacity 0.2s ease;
}

.chart-bar:hover span {
  opacity: 1;
}

.chart-column small {
  color: #9aa29c;
  font-size: 9px;
}

.attendance-content {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 27px;
}

.attendance-ring {
  width: 165px;
  height: 165px;
  position: relative;
  flex: 0 0 auto;
}

.attendance-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-track,
.ring-value {
  fill: none;
  stroke-width: 10;
}

.ring-track {
  stroke: #edf1ed;
}

.ring-value {
  stroke: var(--green);
  stroke-linecap: round;
  animation: ringDraw 1s ease 0.25s both;
}

.ring-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ring-content strong {
  font-size: 28px;
  letter-spacing: -0.06em;
}

.ring-content span {
  margin-top: 2px;
  color: var(--muted);
  font-size: 10px;
}

.attendance-breakdown {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.attendance-breakdown > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.attendance-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.attendance-dot.present {
  background: #27734b;
}

.attendance-dot.absent {
  background: #b95e55;
}

.attendance-dot.late {
  background: #b2873e;
}

.attendance-breakdown strong {
  display: block;
  font-size: 14px;
}

.attendance-breakdown small {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 9px;
}

.panel-link,
.panel-footer-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-top: 1px solid var(--line);
  padding: 14px 0 0;
  background: transparent;
  color: var(--green);
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.students-panel {
  min-width: 0;
}

.students-heading {
  padding: 24px 24px 18px;
}

.student-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}

.student-search {
  width: 190px;
  height: 34px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #fff;
  color: #9ba39d;
}

.student-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ink);
  font-size: 10px;
}

.student-search input::placeholder {
  color: #a5aca7;
}

.student-search button {
  display: grid;
  place-items: center;
  border: 0;
  padding: 0;
  background: transparent;
  color: #9aa29d;
  cursor: pointer;
}

.mini-add {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #fff;
  color: var(--green);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mini-add:hover {
  color: #fff;
  background: var(--green);
  border-color: var(--green);
}

.student-table-head {
  display: grid;
  grid-template-columns: minmax(180px, 1.5fr) 0.6fr 0.75fr 0.65fr 18px;
  gap: 14px;
  padding: 10px 24px;
  background: #f7f8f6;
  color: #9aa29c;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.student-list {
  padding: 3px 10px;
}

.student-row {
  width: 100%;
  min-height: 66px;
  display: grid;
  grid-template-columns: 34px minmax(145px, 1.5fr) 0.6fr 0.75fr 0.65fr 18px;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border: 0;
  border-bottom: 1px solid #eef1ee;
  background: transparent;
  text-align: left;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.student-row:hover {
  background: #f7f9f6;
}

.student-avatar,
.risk-avatar,
.modal-avatar {
  display: grid;
  place-items: center;
  color: var(--green);
  background: var(--green-soft);
  font-size: 9px;
  font-weight: 800;
}

.student-avatar {
  width: 34px;
  height: 34px;
  border-radius: 11px;
}

.student-main strong,
.student-main small {
  display: block;
}

.student-main strong {
  font-size: 11px;
}

.student-main small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 8px;
}

.student-performance strong {
  display: block;
  font-size: 11px;
}

.student-performance small {
  display: block;
  margin-top: 3px;
  color: var(--muted);
  font-size: 8px;
}

.student-attendance {
  display: flex;
  align-items: center;
  gap: 7px;
}

.attendance-progress {
  width: 38px;
  height: 4px;
  position: relative;
  overflow: hidden;
  border-radius: 99px;
  background: #e8ece8;
}

.attendance-progress::after {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--progress);
  border-radius: inherit;
  background: var(--green);
}

.student-attendance small {
  color: var(--muted);
  font-size: 8px;
}

.status-pill {
  width: fit-content;
  padding: 5px 8px;
  border-radius: 99px;
  font-size: 7px;
  font-weight: 800;
}

.status-pill.excellent {
  color: #246b46;
  background: #e6f1e9;
}

.status-pill.good {
  color: #416d58;
  background: #edf3ef;
}

.status-pill.attention {
  color: #916f35;
  background: #f5efdf;
}

.status-pill.risk {
  color: #a34f47;
  background: #f7e9e7;
}

.student-row > svg {
  color: #a4aca6;
}

.panel-footer-link {
  margin: 0 24px;
  width: calc(100% - 48px);
  padding-bottom: 2px;
}

.dashboard-side-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.risk-count {
  min-width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #9d4f47;
  background: #f7e9e7;
  font-size: 10px;
  font-weight: 800;
}

.risk-list {
  margin: 20px -6px 17px;
}

.risk-row {
  width: 100%;
  min-height: 57px;
  display: grid;
  grid-template-columns: 32px 1fr 15px;
  align-items: center;
  gap: 10px;
  padding: 7px 6px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.risk-row:hover {
  background: #f7f8f5;
}

.risk-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  color: #9d4f47;
  background: #f7e9e7;
}

.risk-row strong,
.risk-row small {
  display: block;
}

.risk-row strong {
  font-size: 10px;
}

.risk-row small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 8px;
}

.risk-row > svg {
  color: #a4aca6;
}

.activity-panel {
  flex: 1;
}

.activity-panel .panel-heading > svg {
  color: #8e9891;
}

.activity-list {
  margin-top: 17px;
}

.activity-item {
  min-height: 54px;
  display: grid;
  grid-template-columns: 29px 1fr auto;
  align-items: center;
  gap: 9px;
  border-bottom: 1px solid #edf0ed;
}

.activity-item:last-child {
  border-bottom: 0;
}

.activity-icon {
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  border-radius: 9px;
}

.activity-icon.marks {
  color: #245f43;
  background: #e8f1eb;
}

.activity-icon.attendance {
  color: #5b6685;
  background: #eef0f6;
}

.activity-icon.result {
  color: #805f35;
  background: #f4eee2;
}

.activity-icon.student {
  color: #795b82;
  background: #f1eaf3;
}

.activity-item strong,
.activity-item small {
  display: block;
}

.activity-item strong {
  font-size: 9px;
}

.activity-item small {
  margin-top: 3px;
  color: var(--muted);
  font-size: 7px;
}

.activity-item time {
  color: #a1a9a3;
  font-size: 7px;
}

.dashboard-bottom-banner {
  margin-top: 14px;
  min-height: 94px;
  display: grid;
  grid-template-columns: 45px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px 21px;
  border: 1px solid #dfe7e0;
  border-radius: 19px;
  background: #eaf2ec;
  animation: dashboardEnter 0.7s ease 0.28s both;
}

.banner-icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  color: #fff;
  background: var(--green);
}

.dashboard-bottom-banner span {
  color: #60816e;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.dashboard-bottom-banner h3 {
  margin: 4px 0 3px;
  font-size: 14px;
  letter-spacing: -0.02em;
}

.dashboard-bottom-banner p {
  margin: 0;
  color: #718078;
  font-size: 9px;
}

.dashboard-bottom-banner button {
  height: 37px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 13px;
  border: 1px solid #d2dfd5;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.empty-search {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  gap: 7px;
}

.empty-search svg {
  color: #9da69f;
  margin-bottom: 3px;
}

.empty-search strong {
  color: var(--ink);
  font-size: 11px;
}

.empty-search span {
  font-size: 9px;
}

.student-modal-backdrop,
.quick-action-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(17, 25, 20, 0.35);
  backdrop-filter: blur(12px);
  animation: fadeIn 0.2s ease both;
}

.student-modal,
.quick-action-modal {
  width: min(480px, 100%);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 35px 90px rgba(15, 35, 24, 0.2);
  animation: modalEnter 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.student-modal {
  padding: 28px;
}

.modal-close {
  position: absolute;
  top: 17px;
  right: 17px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #fff;
  color: var(--muted);
  cursor: pointer;
}

.modal-profile {
  display: flex;
  align-items: center;
  gap: 14px;
}

.modal-avatar {
  width: 57px;
  height: 57px;
  border-radius: 17px;
  font-size: 13px;
}

.modal-profile h2 {
  margin: 6px 0 4px;
  font-size: 21px;
  letter-spacing: -0.04em;
}

.modal-profile p {
  margin: 0;
  color: var(--muted);
  font-size: 10px;
}

.modal-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 26px;
}

.modal-metrics div {
  padding: 14px;
  border-radius: 13px;
  background: #f6f8f5;
}

.modal-metrics span,
.modal-metrics strong {
  display: block;
}

.modal-metrics span {
  color: var(--muted);
  font-size: 8px;
}

.modal-metrics strong {
  margin-top: 7px;
  font-size: 14px;
}

.modal-note {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 13px;
  border-radius: 12px;
  color: #587162;
  background: #eaf2ec;
  font-size: 9px;
  line-height: 1.5;
}

.modal-note svg {
  flex: 0 0 auto;
  margin-top: 1px;
}

.quick-action-modal {
  padding: 25px;
}

.quick-action-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
}

.quick-action-header h2 {
  margin: 7px 0 0;
  font-size: 21px;
  letter-spacing: -0.04em;
}

.quick-action-header button {
  width: 33px;
  height: 33px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #fff;
  color: var(--muted);
  cursor: pointer;
}

.quick-action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-top: 22px;
}

.quick-action-card {
  min-height: 110px;
  display: grid;
  grid-template-columns: 35px 1fr 15px;
  align-items: center;
  gap: 10px;
  padding: 13px;
  border: 1px solid var(--line);
  border-radius: 15px;
  background: #fafbfa;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-action-card:hover {
  border-color: #cad8ce;
  background: #f2f7f3;
  transform: translateY(-2px);
}

.quick-action-card > span {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: var(--green);
  background: var(--green-soft);
}

.quick-action-card strong,
.quick-action-card small {
  display: block;
}

.quick-action-card strong {
  color: var(--ink);
  font-size: 10px;
}

.quick-action-card small {
  margin-top: 5px;
  color: var(--muted);
  font-size: 8px;
  line-height: 1.4;
}

.quick-action-card > svg {
  color: #9da69f;
}

@keyframes dashboardEnter {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes barRise {
  from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: bottom;
  }

  to {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

@keyframes ringDraw {
  from {
    stroke-dashoffset: 345;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 1180px) {
  .dash-stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-main-grid,
  .dashboard-lower-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-side-stack {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 820px) {
  .dashboard-page {
    padding: 25px 20px 45px;
  }

  .dashboard-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .dashboard-header-actions {
    width: 100%;
  }

  .dashboard-date {
    flex: 1;
  }

  .dashboard-primary-action {
    flex: 0 0 auto;
  }

  .student-table-head {
    display: none;
  }

  .student-row {
    grid-template-columns: 34px 1fr auto 18px;
  }

  .student-performance,
  .student-attendance {
    display: none;
  }

  .dashboard-side-stack {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .dashboard-page {
    padding: 20px 13px 35px;
  }

  .dashboard-header h1 {
    font-size: 31px;
  }

  .dashboard-header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .dashboard-date,
  .dashboard-primary-action {
    justify-content: center;
  }

  .dash-stat-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .dash-stat-card {
    min-height: 135px;
    padding: 15px;
    border-radius: 16px;
  }

  .dash-stat-value {
    font-size: 26px;
  }

  .dash-stat-bottom {
    display: block;
  }

  .dash-stat-bottom > span:last-child {
    display: block;
    margin-top: 4px;
  }

  .performance-panel,
  .attendance-panel,
  .risk-panel,
  .activity-panel {
    padding: 18px;
  }

  .performance-summary {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .attendance-content {
    min-height: 220px;
    flex-direction: column;
    gap: 15px;
  }

  .attendance-breakdown {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }

  .student-tools {
    width: 100%;
  }

  .students-heading {
    align-items: stretch;
    flex-direction: column;
  }

  .student-search {
    flex: 1;
    width: auto;
  }

  .student-row {
    padding: 8px 6px;
  }

  .status-pill {
    display: none;
  }

  .dashboard-bottom-banner {
    grid-template-columns: 40px 1fr;
  }

  .dashboard-bottom-banner button {
    grid-column: 1 / -1;
    justify-content: center;
  }

  .quick-action-grid {
    grid-template-columns: 1fr;
  }

  .modal-metrics {
    grid-template-columns: 1fr;
  }
}