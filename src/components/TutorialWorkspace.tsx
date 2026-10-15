import { useState, useCallback } from 'react';
import './TutorialWorkspace.css';
import type { Tutorial, TutorialStep } from '../types';
import { getTroubleshootingResult } from '../data/tutorialData';
import { TOOLS } from '../data/tools';

interface TutorialWorkspaceProps {
  tutorial: Tutorial;
  onBack: () => void;
  onTroubleshoot: () => void;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      className={`copy-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : `Copy command: ${text}`}
    >
      {copied ? '✓ Copied' : '⎘ Copy'}
    </button>
  );
}

interface StuckModalProps {
  currentStep: TutorialStep;
  onClose: () => void;
}

function StuckModal({ currentStep, onClose }: StuckModalProps) {
  const [errorText, setErrorText] = useState('');
  const [selectedTool, setSelectedTool] = useState(currentStep.tool);
  const result = getTroubleshootingResult({ errorMessage: errorText, selectedTool });

  return (
    <div
      className="stuck-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Get unstuck — troubleshooting helper"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="stuck-modal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3>🆘 Let's get you unstuck</h3>
          <button className="btn-ghost" onClick={onClose} aria-label="Close troubleshooting panel">✕</button>
        </div>
        <p>Paste your error message below and we'll diagnose it.</p>

        <div style={{ marginBottom: 12 }}>
          <label className="form-label" htmlFor="error-input" style={{ fontSize: '0.8rem' }}>Error message or describe the problem</label>
          <textarea
            id="error-input"
            className="form-textarea"
            style={{ minHeight: 80 }}
            placeholder="e.g. npm is not recognized as a command"
            value={errorText}
            onChange={e => setErrorText(e.target.value)}
            autoFocus
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="form-label" style={{ fontSize: '0.8rem' }}>Relevant tool</label>
          <select
            className="form-select"
            value={selectedTool}
            onChange={e => setSelectedTool(e.target.value)}
          >
            {TOOLS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>

        {errorText.length > 5 && (
          result ? (
            <div className="troubleshoot-result" role="region" aria-label="Troubleshooting result">
              <div className="trouble-item">
                <div className="trouble-label">What this means</div>
                <div className="trouble-value">{result.meaning}</div>
              </div>
              <div className="trouble-item">
                <div className="trouble-label">Likely causes</div>
                <ul className="trouble-causes">
                  {result.likelyCauses.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
              <div className="trouble-item">
                <div className="trouble-label">First safe check</div>
                <div className="trouble-value">{result.firstCheck}</div>
              </div>
              <div className="trouble-item" style={{ borderColor: 'rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.05)' }}>
                <div className="trouble-label">Recommended fix</div>
                <div className="trouble-value">{result.recommendedFix}</div>
              </div>
              <div className="trouble-item">
                <div className="trouble-label">How to verify the fix</div>
                <div className="trouble-value">{result.verifyFix}</div>
              </div>
              <div className="trouble-item">
                <div className="trouble-label">If it still fails</div>
                <div className="trouble-value">{result.ifStillFailing}</div>
              </div>
            </div>
          ) : (
            <div style={{
              padding: '16px',
              background: 'rgba(99,102,241,0.05)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}>
              <strong style={{ color: 'var(--text-primary)' }}>No exact match found.</strong>
              <br />
              Try to include the full error text (e.g. copy it from your terminal). For complex or unusual errors,
              paste the message into Google Antigravity for a tailored fix. Check that the error matches the current step's tool and action.
            </div>
          )
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <button className="btn-primary" onClick={onClose}>Done — back to tutorial</button>
        </div>
      </div>
    </div>
  );
}

export default function TutorialWorkspace({ tutorial, onBack, onTroubleshoot }: TutorialWorkspaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showStuck, setShowStuck] = useState(false);
  const [tutorialDone, setTutorialDone] = useState(false);

  const steps = tutorial.steps;
  const totalSteps = steps.length;
  const currentStep = steps[currentIndex];
  const progress = Math.round((completedSteps.size / totalSteps) * 100);

  const markComplete = useCallback(() => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.add(currentStep.id);
      return next;
    });
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setTutorialDone(true);
    }
  }, [currentIndex, currentStep.id, totalSteps]);

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
    setTutorialDone(false);
  };

  const goToNext = () => {
    if (currentIndex < totalSteps - 1) setCurrentIndex(i => i + 1);
  };

  const restart = () => {
    setCurrentIndex(0);
    setCompletedSteps(new Set());
    setTutorialDone(false);
  };

  if (tutorialDone) {
    return (
      <div className="tutorial-view">
        <div className="container">
          <div className="step-card-main completion-screen">
            <span className="completion-icon" aria-hidden="true">🎉</span>
            <h2 className="completion-title">
              <span className="gradient-text">Tutorial Complete!</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '1rem' }}>
              You've worked through all {totalSteps} steps of <strong>{tutorial.title}</strong>.
            </p>

            {tutorial.finalChecklist.length > 0 && (
              <>
                <h3 style={{ fontSize: '1rem', marginBottom: 8, color: 'var(--text-secondary)' }}>Final Verification Checklist</h3>
                <ul className="checklist" aria-label="Final checklist">
                  {tutorial.finalChecklist.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
              <button className="btn-ghost" onClick={restart}>↺ Restart Tutorial</button>
              <button className="btn-ghost" onClick={onTroubleshoot}>🆘 Troubleshoot an issue</button>
              <button className="btn-primary" onClick={onBack}>← Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tutorial-view">
      {/* Sticky header */}
      <div className="tutorial-header">
        <div className="container">
          <div className="tutorial-header-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="btn-ghost" onClick={onBack} aria-label="Back to home">← Back</button>
              <div className="tutorial-title-group">
                <div className="tutorial-title-label">
                  {tutorial.isDemo ? '📋 Demo Tutorial' : tutorial.generatedByAI ? '✦ AI-Generated' : '📋 Guide'}
                </div>
                <div className="tutorial-title-text">{tutorial.title}</div>
              </div>
            </div>
            <div className="tutorial-progress-group">
              <span className="tutorial-progress-text">{completedSteps.size}/{totalSteps} done</span>
              <div className="tutorial-progress-bar progress-bar" aria-label={`Progress: ${progress}%`}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tutorial-layout">
          {/* Sidebar */}
          <aside className="tutorial-sidebar" aria-label="Tutorial step list">
            <div className="sidebar-card">
              <div className="sidebar-header">Steps</div>
              <div className="sidebar-steps">
                {steps.map((step, i) => (
                  <button
                    key={step.id}
                    className={`sidebar-step ${i === currentIndex ? 'active' : ''} ${completedSteps.has(step.id) ? 'completed' : ''}`}
                    onClick={() => { setCurrentIndex(i); setTutorialDone(false); }}
                    aria-current={i === currentIndex ? 'step' : undefined}
                    aria-label={`Step ${step.id}: ${step.title}${completedSteps.has(step.id) ? ' (completed)' : ''}`}
                  >
                    <span className="step-num" aria-hidden="true">
                      {completedSteps.has(step.id) ? '✓' : step.id}
                    </span>
                    <span className="step-label">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal card */}
            <div style={{ marginTop: 12, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Goal</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tutorial.goal}</div>
            </div>

            {/* Tools */}
            <div style={{ marginTop: 8, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Tools Used</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {tutorial.requiredTools.map(t => (
                  <span key={t} className="badge badge-violet" style={{ fontSize: '0.7rem' }}>{t}</span>
                ))}
                {tutorial.optionalTools?.map(t => (
                  <span key={t} className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{t}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="tutorial-main" aria-label="Current step">
            <div className="step-card-main" key={currentStep.id}>
              <div className="step-header">
                <div className="step-badge">
                  <div className="step-number-badge" aria-hidden="true">{currentStep.id}</div>
                  <div className="step-tool-badge">{currentStep.tool.split(' ')[0]}</div>
                </div>
                <div className="step-title-group">
                  <h2 className="step-title">{currentStep.title}</h2>
                  <span className="step-tool-name">🛠 {currentStep.tool}</span>
                </div>
              </div>

              {/* Where */}
              <div className="step-section">
                <div className="step-section-label">📍 Where to go</div>
                <div className="step-section-content">{currentStep.where}</div>
              </div>

              {/* Action */}
              <div className="step-section">
                <div className="step-section-label">▶ Action</div>
                <div className="step-action-text">{currentStep.action}</div>
              </div>

              {/* Why */}
              <div className="step-section">
                <div className="step-section-label">💡 Why this matters</div>
                <div className="step-section-content">{currentStep.why}</div>
              </div>

              {/* Commands */}
              {currentStep.commands && currentStep.commands.length > 0 && (
                <div className="step-section">
                  <div className="step-section-label">⌨ Commands</div>
                  <div className="commands-list">
                    {currentStep.commands.map((cmd, i) => (
                      <div className="command-block" key={i}>
                        <div className="command-bar">
                          <div className="command-text">
                            <span className="cmd-prompt" aria-hidden="true">$</span>
                            {cmd}
                          </div>
                          <CopyButton text={cmd} />
                        </div>
                        {currentStep.commandExplanations?.[i] && (
                          <div className="command-explanation">
                            {currentStep.commandExplanations[i]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expected result */}
              <div className="step-section">
                <div className="step-section-label">✅ Expected result</div>
                <div className="result-card step-section-content">{currentStep.expectedResult}</div>
              </div>

              {/* Verify */}
              <div className="step-section">
                <div className="step-section-label">🔍 How to verify success</div>
                <div className="verify-card step-section-content">{currentStep.verifySuccess}</div>
              </div>

              {/* Common mistakes */}
              {currentStep.commonMistakes?.length > 0 && (
                <div className="step-section">
                  <div className="step-section-label">⚠ Common mistakes</div>
                  <ul className="mistakes-list">
                    {currentStep.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>
              )}

              {/* Recovery */}
              <div className="step-section">
                <div className="step-section-label">🔧 Recovery instructions</div>
                <div className="step-section-content">{currentStep.recovery}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="step-navigation">
              <div className="nav-group">
                <button
                  className="btn-secondary"
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous step"
                >
                  ← Previous
                </button>
              </div>

              <div className="nav-group" style={{ flex: 1, justifyContent: 'center' }}>
                <button
                  className={`mark-complete-btn ${completedSteps.has(currentStep.id) ? 'done' : ''}`}
                  onClick={markComplete}
                  aria-label={completedSteps.has(currentStep.id) ? 'Step already marked complete' : 'Mark this step as complete'}
                >
                  {completedSteps.has(currentStep.id) ? '✓ Completed' : '✓ Mark Complete'}
                </button>
                <button
                  className="stuck-btn"
                  onClick={() => setShowStuck(true)}
                  aria-label="I'm stuck — get help"
                >
                  🆘 I'm stuck
                </button>
              </div>

              <div className="nav-group">
                <button
                  className="btn-ghost"
                  onClick={restart}
                  aria-label="Restart tutorial"
                  title="Restart from step 1"
                >
                  ↺
                </button>
                <button
                  className="btn-primary"
                  onClick={goToNext}
                  disabled={currentIndex === totalSteps - 1}
                  aria-label="Next step"
                >
                  Next →
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showStuck && (
        <StuckModal
          currentStep={currentStep}
          onClose={() => setShowStuck(false)}
        />
      )}
    </div>
  );
}
