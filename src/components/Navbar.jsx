import { useTheme } from "./ThemeProvider";

export default function Navbar({ onGetStarted }) {
  const { colors } = useTheme();

  return (
    <header className="public-navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div
            className="brand-mark"
            style={{ background: colors.primary }}
          >
            S
          </div>

          <div>
            <div className="brand-name">SchoolMarks</div>
            <div className="brand-subtitle">School Management</div>
          </div>
        </div>

        <nav className="public-nav">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="primary-button"
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}