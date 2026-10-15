import { useState, useEffect, useCallback } from 'react';
import './AnimatedWalkthrough.css';
import { DEMO_TUTORIAL } from '../data/tutorialData';
import { TOOLS } from '../data/tools';
import type { AppView } from '../types';

interface AnimatedWalkthroughProps {
  onNavigate: (view: AppView) => void;
}

const WALKTHROUGH_STEPS = DEMO_TUTORIAL.steps.slice(0, 6); // Use first 6 steps for the preview

// Map tool names to tool IDs for icon lookup
function getToolIcon(toolName: string): string {
  const found = TOOLS.find(t =>
    toolName.toLowerCase().includes(t.id) ||
    toolName.toLowerCase().includes(t.name.toLowerCase().split(' ')[0].toLowerCase())
  );
  return found?.icon ?? '🛠';
}

const WORKFLOW_NODES = [
  { id: 'antigravity', icon: '🚀', name: 'Antigravity' },
  { id: 'terminal', icon: '⬛', name: 'Terminal' },
  { id: 'github', icon: '🐙', name: 'GitHub' },
  { id: 'vercel', icon: '▲', name: 'Vercel' },
];

function getActiveNode(stepIndex: number): string {
  if (stepIndex <= 1) return 'antigravity';
  if (stepIndex <= 4) return 'terminal';
  if (stepIndex <= 7) return 'github';
  return 'vercel';
}

export default function AnimatedWalkthrough({ onNavigate }: AnimatedWalkthroughProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const total = WALKTHROUGH_STEPS.length;
  const currentStep = WALKTHROUGH_STEPS[currentIndex];
  const activeNode = getActiveNode(currentIndex);

  const goNext = useCallback(() => {
    setCurrentIndex(i => {
      if (i >= total - 1) {
        setIsPlaying(false);
        return i;
      }
      return i + 1;
    });
  }, [total]);

  const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1));
  const restart = () => { setCurrentIndex(0); setIsPlaying(false); };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, goNext]);

  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <section className="walkthrough section" id="walkthrough" aria-label="Animated tutorial walkthrough">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Walkthrough Preview</div>
          <h2>See how a <span className="gradient-text">tutorial flows</span></h2>
          <p>Press play to watch how Stepwise AI guides you through each step.</p>
        </div>

        <div className="walkthrough-player" role="region" aria-label="Tutorial player">
          {/* Player header */}
          <div className="player-header">
            <div className="player-controls">
              <button
                className="player-btn"
                onClick={restart}
                aria-label="Restart walkthrough"
                title="Restart"
              >
                ⟲
              </button>
              <button
                className="player-btn"
                onClick={goPrev}
                disabled={currentIndex === 0}
                aria-label="Previous step"
              >
                ‹
              </button>
              <button
                className="player-btn play-pause"
                onClick={() => setIsPlaying(p => !p)}
                aria-label={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                className="player-btn"
                onClick={goNext}
                disabled={currentIndex === total - 1}
                aria-label="Next step"
              >
                ›
              </button>
            </div>

            <div className="player-step-info" aria-live="polite" aria-atomic="true">
              Step {currentIndex + 1} of {total}
            </div>
          </div>

          {/* Progress */}
          <div
            className="player-progress"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Walkthrough progress: ${Math.round(progress)}%`}
          >
            <div className="player-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Slide content */}
          <div className="player-slide" aria-live="polite" aria-atomic="true" key={currentIndex}>
            <div className="slide-step-num">
              <span className="badge badge-violet">Step {currentStep.id}</span>
            </div>

            <div className="slide-tool-highlight">
              <span className="slide-tool-icon" aria-hidden="true">{getToolIcon(currentStep.tool)}</span>
              <span className="slide-tool-name">{currentStep.tool}</span>
            </div>

            <h3 className="slide-title">{currentStep.title}</h3>
            <p className="slide-action">{currentStep.action}</p>

            {currentStep.commands && currentStep.commands[0] && (
              <div className="slide-command">
                <span className="slide-command-text">
                  <span className="slide-cmd-prompt" aria-hidden="true">$ </span>
                  {currentStep.commands[0]}
                </span>
              </div>
            )}

            {/* Workflow nodes */}
            <div className="workflow-nodes" aria-hidden="true">
              {WORKFLOW_NODES.map((node, i) => (
                <span key={node.id} style={{ display: 'contents' }}>
                  <div className={`workflow-node ${activeNode === node.id ? 'active' : ''}`}>
                    <span className="workflow-node-icon">{node.icon}</span>
                    <span className="workflow-node-name">{node.name}</span>
                  </div>
                  {i < WORKFLOW_NODES.length - 1 && (
                    <div className={`workflow-edge ${
                      WORKFLOW_NODES.findIndex(n => n.id === activeNode) > i ? 'active' : ''
                    }`} />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            className="btn-primary"
            onClick={() => onNavigate('demo')}
            aria-label="Open full interactive demo"
          >
            Open Full Interactive Tutorial →
          </button>
        </div>
      </div>
    </section>
  );
}
