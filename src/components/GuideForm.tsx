import { useState, useRef } from 'react';
import './GuideForm.css';
import { TOOLS } from '../data/tools';
import { generateTutorial, isGeminiConfigured, getGeminiErrorMessage } from '../services/gemini';
import { DEMO_TUTORIAL } from '../data/tutorialData';
import type { GuideFormData, Tutorial, ExperienceLevel, LearningMode, OS, ProjectStatus } from '../types';

interface GuideFormProps {
  onTutorialReady: (tutorial: Tutorial) => void;
  onDemoClick: () => void;
}

const EXPERIENCE_OPTIONS: { id: ExperienceLevel; title: string; desc: string; icon: string }[] = [
  { id: 'beginner', title: 'Complete Beginner', desc: 'Explain basic concepts, where to click, and what each action means.', icon: '🌱' },
  { id: 'some', title: 'Some Experience', desc: 'Explain the workflow with practical instructions and important concepts.', icon: '🌿' },
  { id: 'experienced', title: 'Experienced', desc: 'Concise technical steps, commands, and troubleshooting.', icon: '🌳' },
];

const MODE_OPTIONS: { id: LearningMode; title: string; desc: string; icon: string }[] = [
  { id: 'quick', title: 'Quick Mode', desc: 'Essential steps, minimal explanation, fastest path.', icon: '⚡' },
  { id: 'guided', title: 'Guided Mode', desc: 'Step-by-step with reasons, expected results, and verification.', icon: '🧭' },
  { id: 'deep', title: 'Deep Learning Mode', desc: 'Detailed explanations, concepts, examples, and troubleshooting.', icon: '🔬' },
];

const DEFAULT_FORM: GuideFormData = {
  goal: '',
  selectedTools: [],
  experienceLevel: 'beginner',
  learningMode: 'guided',
  os: 'unsure',
  projectStatus: 'new',
  timeAvailable: '',
  budget: 'free',
  additionalRequirements: '',
};

export default function GuideForm({ onTutorialReady, onDemoClick }: GuideFormProps) {
  const [form, setForm] = useState<GuideFormData>(DEFAULT_FORM);
  const [customTool, setCustomTool] = useState('');
  const [customTools, setCustomTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [goalError, setGoalError] = useState('');
  const geminiAvailable = isGeminiConfigured();
  const formRef = useRef<HTMLDivElement>(null);

  const toggleTool = (id: string) => {
    setForm(f => ({
      ...f,
      selectedTools: f.selectedTools.includes(id)
        ? f.selectedTools.filter(t => t !== id)
        : [...f.selectedTools, id],
    }));
  };

  const addCustomTool = () => {
    const val = customTool.trim();
    if (!val || customTools.includes(val)) return;
    setCustomTools(prev => [...prev, val]);
    setForm(f => ({ ...f, selectedTools: [...f.selectedTools, val] }));
    setCustomTool('');
  };

  const removeCustomTool = (t: string) => {
    setCustomTools(prev => prev.filter(x => x !== t));
    setForm(f => ({ ...f, selectedTools: f.selectedTools.filter(x => x !== t) }));
  };

  const validate = (): boolean => {
    if (!form.goal.trim() || form.goal.trim().length < 10) {
      setGoalError('Please describe your goal in at least 10 characters.');
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    setGoalError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setErrorMsg('');

    if (!geminiAvailable) {
      // Fall back to demo tutorial with a custom title
      const customDemo: Tutorial = {
        ...DEMO_TUTORIAL,
        id: 'custom-demo',
        title: `Your Guide: ${form.goal.slice(0, 60)}${form.goal.length > 60 ? '…' : ''}`,
        goal: form.goal,
        isDemo: false,
        generatedByAI: false,
      };
      onTutorialReady(customDemo);
      return;
    }

    setLoading(true);
    try {
      const tutorial = await generateTutorial(form);
      onTutorialReady(tutorial);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(getGeminiErrorMessage(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guide-form-view">
      <div className="guide-form-header">
        <div className="section-tag">Create Your Guide</div>
        <h1>Tell us what you <span className="gradient-text">want to learn</span></h1>
        <p>Fill in the details below and we'll build you a personalized, step-by-step guide.</p>
        {!geminiAvailable && (
          <div style={{
            marginTop: 16,
            padding: '10px 16px',
            background: 'rgba(251,191,36,0.08)',
            border: '1px solid rgba(251,191,36,0.25)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.825rem',
            color: '#fcd34d',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}>
            ⚠️ Gemini AI not configured — will use built-in tutorial template.
            <button
              className="btn-ghost"
              style={{ fontSize: '0.75rem', padding: '2px 8px' }}
              onClick={onDemoClick}
            >
              Try Demo instead
            </button>
          </div>
        )}
      </div>

      <div className="form-card" ref={formRef}>
        {errorMsg && (
          <div className="form-error-banner" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Goal */}
        <div className="form-section">
          <label className="form-label" htmlFor="goal-input">
            What do you want to accomplish?
            <span className="form-hint">Be specific for the best results</span>
          </label>
          <textarea
            id="goal-input"
            className={`form-textarea ${goalError ? 'error' : ''}`}
            placeholder="Example: Build an AI-powered website and deploy it online."
            value={form.goal}
            onChange={e => { setForm(f => ({ ...f, goal: e.target.value })); setGoalError(''); }}
            rows={3}
            maxLength={500}
            aria-required="true"
            aria-describedby={goalError ? 'goal-error' : undefined}
          />
          {goalError && <div className="form-error" id="goal-error" role="alert">⚠ {goalError}</div>}
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, textAlign: 'right' }}>
            {form.goal.length}/500
          </div>
        </div>

        {/* Tools */}
        <div className="form-section">
          <label className="form-label">
            Which tools do you have?
            <span className="form-hint">Select all that apply — or none if you're unsure</span>
          </label>
          <div className="tool-selector-grid" role="group" aria-label="Tool selection">
            {TOOLS.map(tool => (
              <button
                key={tool.id}
                className={`tool-selector-item ${form.selectedTools.includes(tool.id) ? 'selected' : ''}`}
                onClick={() => toggleTool(tool.id)}
                type="button"
                aria-pressed={form.selectedTools.includes(tool.id)}
                aria-label={`${tool.name}`}
              >
                <span className="tool-sel-icon" aria-hidden="true">{tool.icon}</span>
                <span className="tool-sel-name">{tool.name}</span>
              </button>
            ))}
          </div>

          {/* Custom tool input */}
          <div className="custom-tool-input">
            <input
              type="text"
              className="form-input"
              placeholder="Add another tool..."
              value={customTool}
              onChange={e => setCustomTool(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCustomTool()}
              aria-label="Add custom tool"
            />
            <button className="btn-ghost" onClick={addCustomTool} type="button">+ Add</button>
          </div>
          {customTools.length > 0 && (
            <div className="tags-row" role="list" aria-label="Custom tools added">
              {customTools.map(t => (
                <div key={t} className="tag-item" role="listitem">
                  {t}
                  <button className="tag-remove" onClick={() => removeCustomTool(t)} aria-label={`Remove ${t}`}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-divider" aria-hidden="true" />

        {/* Experience */}
        <div className="form-section">
          <label className="form-label">What is your experience level?</label>
          <div className="options-grid" role="group" aria-label="Experience level">
            {EXPERIENCE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`option-card ${form.experienceLevel === opt.id ? 'selected' : ''}`}
                onClick={() => setForm(f => ({ ...f, experienceLevel: opt.id }))}
                type="button"
                aria-pressed={form.experienceLevel === opt.id}
              >
                <div className="option-card-title">{opt.icon} {opt.title}</div>
                <div className="option-card-desc">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Mode */}
        <div className="form-section">
          <label className="form-label">How deeply do you want to learn?</label>
          <div className="options-grid" role="group" aria-label="Learning mode">
            {MODE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`option-card ${form.learningMode === opt.id ? 'selected' : ''}`}
                onClick={() => setForm(f => ({ ...f, learningMode: opt.id }))}
                type="button"
                aria-pressed={form.learningMode === opt.id}
              >
                <div className="option-card-title">{opt.icon} {opt.title}</div>
                <div className="option-card-desc">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="form-divider" aria-hidden="true" />

        {/* Optional */}
        <div className="form-section">
          <label className="form-label">
            Environment & constraints
            <span className="form-hint">Optional — helps us tailor the guide</span>
          </label>
          <div className="optional-grid">
            <div>
              <label className="form-label" htmlFor="os-select" style={{ fontSize: '0.8rem' }}>Operating System</label>
              <select
                id="os-select"
                className="form-select"
                value={form.os}
                onChange={e => setForm(f => ({ ...f, os: e.target.value as OS }))}
              >
                <option value="unsure">Not sure / Any</option>
                <option value="windows">Windows</option>
                <option value="macos">macOS</option>
                <option value="linux">Linux</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="status-select" style={{ fontSize: '0.8rem' }}>Project Status</label>
              <select
                id="status-select"
                className="form-select"
                value={form.projectStatus}
                onChange={e => setForm(f => ({ ...f, projectStatus: e.target.value as ProjectStatus }))}
              >
                <option value="new">Starting fresh</option>
                <option value="partial">Partially built</option>
                <option value="existing-errors">Existing project with errors</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="budget-select" style={{ fontSize: '0.8rem' }}>Budget</label>
              <select
                id="budget-select"
                className="form-select"
                value={form.budget}
                onChange={e => setForm(f => ({ ...f, budget: e.target.value as 'free' | 'flexible' }))}
              >
                <option value="free">Free tools only</option>
                <option value="flexible">Flexible / Paid OK</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="time-input" style={{ fontSize: '0.8rem' }}>Time Available</label>
              <input
                id="time-input"
                type="text"
                className="form-input"
                placeholder="e.g. 2 hours, 1 week"
                value={form.timeAvailable}
                onChange={e => setForm(f => ({ ...f, timeAvailable: e.target.value }))}
              />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label className="form-label" htmlFor="extra-input" style={{ fontSize: '0.8rem' }}>Additional requirements</label>
            <textarea
              id="extra-input"
              className="form-textarea"
              placeholder="Any specific constraints, technologies, or preferences..."
              rows={2}
              value={form.additionalRequirements}
              onChange={e => setForm(f => ({ ...f, additionalRequirements: e.target.value }))}
              maxLength={300}
            />
          </div>
        </div>

        <div className="form-submit-area">
          <div className="form-submit-note">
            {geminiAvailable
              ? <span>✦ <strong>Gemini AI</strong> will generate a personalized tutorial based on your inputs.</span>
              : <span>📋 A <strong>template guide</strong> will be created — add a Gemini API key for AI-generated content.</span>
            }
          </div>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            aria-label="Generate my step-by-step guide"
          >
            {loading ? (
              <>
                <span className="spinner" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} aria-hidden="true" />
                Generating…
              </>
            ) : (
              '✦ Create My Step-by-Step Guide'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
