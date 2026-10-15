import { useState } from 'react';
import './LandingSections.css';
import { TOOLS, TOOL_EXPLAINERS, getToolById } from '../data/tools';
import type { AppView } from '../types';

interface LandingSectionsProps {
  onNavigate: (view: AppView) => void;
}

const HOW_IT_WORKS = [
  { icon: '📝', title: 'Describe your goal', desc: 'Tell us what you want to build or learn in plain English — no technical jargon needed.' },
  { icon: '🛠️', title: 'Select your tools', desc: 'Choose the tools you already have. Only those tools will appear in your guide.' },
  { icon: '🎯', title: 'Pick your level', desc: 'Set your experience level and how deeply you want to understand each step.' },
  { icon: '✨', title: 'Get your guide', desc: 'Receive a personalized, ordered tutorial with step instructions, commands, and troubleshooting.' },
];

const LEARNING_MODES = [
  {
    id: 'quick',
    icon: '⚡',
    name: 'Quick Mode',
    desc: 'Essential steps only, no fluff. For when you need to get something done fast.',
    className: 'mode-quick',
  },
  {
    id: 'guided',
    icon: '🧭',
    name: 'Guided Mode',
    desc: 'Step-by-step instructions with reasons, expected results, and verification.',
    className: 'mode-guided',
  },
  {
    id: 'deep',
    icon: '🔬',
    name: 'Deep Learning Mode',
    desc: 'Detailed explanations, underlying concepts, examples, and troubleshooting.',
    className: 'mode-deep',
  },
];

export function HowItWorks() {
  return (
    <section className="how-it-works section" id="how-it-works" aria-label="How Stepwise AI works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">How It Works</div>
          <h2>From confusion to clarity in <span className="gradient-text">4 steps</span></h2>
          <p>No setup required. No account needed. Just describe your goal and go.</p>
        </div>

        <div className="steps-grid">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} className="step-card" role="article">
              <span className="step-icon" aria-hidden="true">{step.icon}</span>
              <div className="step-number" aria-hidden="true">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ToolMapSection() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tool = selectedTool ? getToolById(selectedTool) : null;
  const explainer = selectedTool ? TOOL_EXPLAINERS[selectedTool] : null;

  return (
    <section className="tool-map section" id="tools" aria-label="Available tools">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Supported Tools</div>
          <h2>Click any tool to <span className="gradient-text">learn what it does</span></h2>
          <p>Every tool in Stepwise AI comes with a plain-English explanation of its purpose, inputs, outputs, and how it connects to others.</p>
        </div>

        <div className="tool-grid" role="list">
          {TOOLS.map(t => (
            <button
              key={t.id}
              className={`tool-card-item ${selectedTool === t.id ? 'selected' : ''}`}
              onClick={() => setSelectedTool(selectedTool === t.id ? null : t.id)}
              role="listitem"
              aria-pressed={selectedTool === t.id}
              aria-label={`${t.name} — ${t.description.slice(0, 60)}`}
            >
              <span className="tool-card-icon" aria-hidden="true">{t.icon}</span>
              <span className="tool-card-name">{t.name}</span>
              <span className="tool-card-category">{t.category}</span>
            </button>
          ))}
        </div>

        {tool && (
          <div className="tool-explainer" role="region" aria-label={`${tool.name} details`}>
            <div className="tool-explainer-header">
              <div className="tool-explainer-icon" aria-hidden="true">{tool.icon}</div>
              <div>
                <div className="tool-explainer-title">{tool.name}</div>
                <div className="tool-explainer-desc">{tool.description}</div>
              </div>
            </div>

            {explainer && (
              <>
                <div className="tool-explainer-grid">
                  <div className="tool-detail-item">
                    <div className="tool-detail-label">Purpose</div>
                    <div className="tool-detail-value">{explainer.purpose}</div>
                  </div>
                  <div className="tool-detail-item">
                    <div className="tool-detail-label">When to Use</div>
                    <div className="tool-detail-value">{explainer.whenToUse}</div>
                  </div>
                  <div className="tool-detail-item">
                    <div className="tool-detail-label">Input</div>
                    <div className="tool-detail-value">{explainer.input}</div>
                  </div>
                  <div className="tool-detail-item">
                    <div className="tool-detail-label">Output</div>
                    <div className="tool-detail-value">{explainer.output}</div>
                  </div>
                  <div className="tool-detail-item">
                    <div className="tool-detail-label">Connects To</div>
                    <div className="tool-detail-value">{explainer.connectsTo}</div>
                  </div>
                  <div className="tool-detail-item">
                    <div className="tool-detail-label">Required?</div>
                    <div className="tool-detail-value">
                      {explainer.required
                        ? <span style={{ color: 'var(--green)' }}>✓ Required for this workflow</span>
                        : <span style={{ color: 'var(--text-muted)' }}>Optional</span>
                      }
                    </div>
                  </div>
                </div>
                <div className="tool-explainer-example">
                  <strong>Beginner Example</strong>
                  <p>{explainer.example}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function LearningModesSection({ onNavigate }: LandingSectionsProps) {
  return (
    <section className="section" id="modes" style={{ background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.03), transparent)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Learning Modes</div>
          <h2>Learn at your <span className="gradient-text">own pace</span></h2>
          <p>Choose how much explanation you want. Switch modes any time.</p>
        </div>
        <div className="modes-grid">
          {LEARNING_MODES.map(mode => (
            <div
              key={mode.id}
              className={`mode-card ${mode.className}`}
              role="article"
            >
              <span className="mode-icon" aria-hidden="true">{mode.icon}</span>
              <div className="mode-name">{mode.name}</div>
              <div className="mode-desc">{mode.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className="btn-primary" onClick={() => onNavigate('form')}>
            ✦ Create My Personalized Guide
          </button>
        </div>
      </div>
    </section>
  );
}
