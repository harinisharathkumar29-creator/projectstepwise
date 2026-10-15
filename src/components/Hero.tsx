import './Hero.css';
import type { AppView } from '../types';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const WORKFLOW_TOOLS = [
  { icon: '🚀', name: 'Antigravity', label: 'Build' },
  { icon: '🐙', name: 'GitHub', label: 'Store' },
  { icon: '▲', name: 'Vercel', label: 'Deploy' },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero" id="home" aria-label="Hero section">
      <div className="hero-content">
        <div className="hero-badge" aria-hidden="true">
          <span className="hero-badge-dot" />
          AI-powered learning for developers
        </div>

        <h1 className="hero-headline">
          Turn any goal into a{' '}
          <span className="gradient-text">step-by-step journey</span>
        </h1>

        <p className="hero-tagline">
          Describe what you want to build, choose the tools you have, and receive a
          personalized guide that teaches you <strong>what to do</strong>,{' '}
          <strong>where to do it</strong>, <strong>why it matters</strong>, and{' '}
          how to fix common errors.
        </p>

        <div className="hero-cta-group">
          <button
            className="btn-primary"
            onClick={() => onNavigate('form')}
            aria-label="Create my personalized step-by-step guide"
          >
            ✦ Create My Step-by-Step Guide
          </button>
          <button
            className="btn-secondary"
            onClick={() => onNavigate('demo')}
            aria-label="Explore the built-in demo tutorial"
          >
            ▶ Explore Demo
          </button>
        </div>

        {/* Workflow illustration */}
        <div className="hero-workflow" role="img" aria-label="Tool workflow: Antigravity to GitHub to Vercel">
          {WORKFLOW_TOOLS.map((tool, i) => (
            <span key={tool.name} style={{ display: 'contents' }}>
              <div className="hero-tool-card">
                <span className="hero-tool-icon" aria-hidden="true">{tool.icon}</span>
                <span className="hero-tool-name">{tool.name}</span>
                <span className="badge badge-violet" style={{ fontSize: '0.65rem' }}>{tool.label}</span>
              </div>
              {i < WORKFLOW_TOOLS.length - 1 && (
                <div className="hero-connector" aria-hidden="true">
                  <div className="connector-line" />
                  <span className="connector-arrow">›</span>
                </div>
              )}
            </span>
          ))}
        </div>

        <div className="hero-stats" aria-label="Key statistics">
          <div className="hero-stat">
            <span className="hero-stat-value">13+</span>
            <span className="hero-stat-label">Demo Steps</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">16</span>
            <span className="hero-stat-label">Supported Tools</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">3</span>
            <span className="hero-stat-label">Learning Modes</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">0</span>
            <span className="hero-stat-label">Account Needed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
