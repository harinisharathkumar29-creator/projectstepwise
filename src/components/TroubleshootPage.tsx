import { useState } from 'react';
import './TroubleshootPage.css';
import { getTroubleshootingResult, COMMON_ERROR_EXAMPLES } from '../data/tutorialData';
import { TOOLS } from '../data/tools';

export default function TroubleshootPage() {
  const [errorText, setErrorText] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCheck = () => setSubmitted(true);
  const result = submitted && errorText.trim().length > 5
    ? getTroubleshootingResult({ errorMessage: errorText, selectedTool })
    : null;

  const loadExample = (sample: string) => {
    setErrorText(sample);
    setSubmitted(false);
  };

  return (
    <div className="troubleshoot-view">
      <div className="troubleshoot-header">
        <div className="section-tag">Troubleshooting</div>
        <h1>Let's fix that <span className="gradient-text">error</span></h1>
        <p>Paste your error message below. We'll diagnose it and give you a targeted fix — no generic advice.</p>
      </div>

      <div className="troubleshoot-layout">
        {/* Input form */}
        <div className="troubleshoot-form">
          <div className="form-section">
            <label className="form-label" htmlFor="ts-error">
              Paste your error message
            </label>
            <textarea
              id="ts-error"
              className="form-textarea"
              rows={5}
              placeholder="e.g. 'npm' is not recognized as an internal or external command..."
              value={errorText}
              onChange={e => { setErrorText(e.target.value); setSubmitted(false); }}
            />
          </div>

          <div className="form-section">
            <label className="form-label" htmlFor="ts-tool">Which tool is involved?</label>
            <select
              id="ts-tool"
              className="form-select"
              value={selectedTool}
              onChange={e => setSelectedTool(e.target.value)}
            >
              <option value="">Not sure</option>
              {TOOLS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%' }}
            onClick={handleCheck}
            disabled={!errorText.trim() || errorText.trim().length < 5}
          >
            🔍 Diagnose Error
          </button>

          {/* Common error examples */}
          <div className="common-errors">
            <div className="common-errors-title">Try a common example:</div>
            {COMMON_ERROR_EXAMPLES.slice(0, 6).map(ex => (
              <button
                key={ex.key}
                className="error-example-btn"
                onClick={() => loadExample(ex.sample)}
                aria-label={`Load example: ${ex.sample}`}
              >
                {ex.sample}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div>
          {submitted && errorText.trim().length > 5 ? (
            result ? (
              <div className="troubleshoot-result-panel">
                <h3>🔍 Diagnosis</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                  <div className="trouble-item" style={{ borderColor: 'rgba(52,211,153,0.25)', background: 'rgba(52,211,153,0.05)' }}>
                    <div className="trouble-label">Recommended fix</div>
                    <div className="trouble-value">{result.recommendedFix}</div>
                  </div>
                  <div className="trouble-item">
                    <div className="trouble-label">How to verify</div>
                    <div className="trouble-value">{result.verifyFix}</div>
                  </div>
                  <div className="trouble-item">
                    <div className="trouble-label">If still failing</div>
                    <div className="trouble-value">{result.ifStillFailing}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="troubleshoot-result-panel">
                <h3>🔍 Diagnosis</h3>
                <div className="no-result">
                  <p style={{ marginBottom: 8 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>No exact match found.</strong>
                  </p>
                  <p>
                    For best results, paste the <strong>full error text</strong> from your terminal — including
                    the error code if shown (e.g. <code style={{ fontSize: '0.8rem', color: 'var(--text-accent)' }}>npm ERR!</code> or
                    <code style={{ fontSize: '0.8rem', color: 'var(--text-accent)' }}> error TS2345</code>).
                  </p>
                  <p style={{ marginTop: 8 }}>
                    You can also paste the error directly into Google Antigravity for a tailored answer based on your exact project setup.
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="troubleshoot-result-panel" style={{ border: '1px solid var(--border-subtle)', boxShadow: 'none' }}>
              <h3>💡 Tips for good error diagnosis</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['Copy the exact error', 'Select all the text in your terminal and paste it. The more detail, the better the diagnosis.'],
                  ['Include error codes', 'Error codes like TS2345, ENOENT, or EADDRINUSE narrow down the exact problem instantly.'],
                  ['Note what you were doing', 'Were you running npm install? Starting the dev server? Pushing to GitHub?'],
                  ['Check the tool', 'Selecting the relevant tool (npm, Git, Vercel) helps narrow down the cause.'],
                ].map(([title, desc]) => (
                  <div key={title} style={{
                    display: 'flex', gap: 10, padding: '10px 12px',
                    background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ color: 'var(--violet)', flexShrink: 0 }}>✦</span>
                    <div>
                      <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
