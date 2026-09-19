import { useState } from "react"
import { ArrowRight, BrainCircuit, ChevronRight, ClipboardCheck, Clock3, Sparkles, Target, TrendingUp } from "lucide-react"
export default function AIPage(){
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi Faizan. I can help you understand students, marks, attendance and academic performance. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    const question = input.trim();

    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      {
        role: "assistant",
        text: `Based on the current SchoolMarks data, I would review ${question.toLowerCase()} across student performance, attendance and recent assessment trends. The current overall academic average is 87.4%.`,
      },
    ]);

    setInput("");
  };

  return (
    <div className="ai-page">
      <div className="ai-workspace-head">
        <div>
          <div className="page-eyebrow">SCHOOLMARKS INTELLIGENCE</div>
          <h1>Ask your academic data.</h1>
          <p>Natural-language questions for your academic workspace.</p>
        </div>
        <div className="ai-workspace-status">
          <span />
          AI online
        </div>
      </div>

      <div className="ai-workspace">
        <div className="ai-chat">
          <div className="chat-header">
            <div className="chat-agent">
              <div className="chat-agent-icon">
                <BrainCircuit size={18} />
              </div>
              <div>
                <strong>SchoolMarks AI</strong>
                <span>Academic intelligence</span>
              </div>
            </div>

            <div className="chat-modes">
              <button className="active">Ask</button>
              <button>Analyze</button>
              <button>Summarize</button>
            </div>
          </div>

          <div className="chat-scroll">
            {messages.map((message, index) => (
              <div
                className={`chat-message ${message.role}`}
                key={`${message.role}-${index}`}
              >
                <div className="message-avatar">
                  {message.role === "assistant" ? <Sparkles size={14} /> : "FK"}
                </div>
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}

            <div className="chat-message assistant">
              <div className="message-avatar">
                <Sparkles size={14} />
              </div>
              <div className="chat-answer-list">
                <strong>Try asking</strong>
                <button onClick={() => setInput("Which students need attention?")}>
                  Which students need attention?
                </button>
                <button onClick={() => setInput("How is attendance this month?")}>
                  How is attendance this month?
                </button>
                <button onClick={() => setInput("Which subject improved most?")}>
                  Which subject improved most?
                </button>
              </div>
            </div>
          </div>

          <div className="chat-composer">
            <div className="composer-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Ask about your students..."
              />
              <button onClick={send}>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        <aside className="ai-tools">
          <div className="ai-tools-head">
            <div>
              <small>TOOLS</small>
              <strong>Academic signals</strong>
            </div>
            <Sparkles size={17} />
          </div>

          <div className="tool-list">
            {[
              ["At-risk students", "18 students", Target],
              ["Attendance signal", "94.8% average", Clock3],
              ["Class performance", "87.4% average", TrendingUp],
              ["Latest assessments", "126 entries", ClipboardCheck],
            ].map(([title, value, Icon]) => (
              <div className="tool-item" key={title}>
                <div>
                  <Icon size={16} />
                </div>
                <span>
                  <strong>{title}</strong>
                  <small>{value}</small>
                </span>
                <ChevronRight size={15} />
              </div>
            ))}
          </div>

          <div className="live-signals">
            <span />
            Live academic data
          </div>
        </aside>
      </div>
    </div>
  );
}
