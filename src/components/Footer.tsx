import './Footer.css';
import type { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-icon" aria-hidden="true">🚀</div>
            <div>
              <div className="footer-logo-text">
                <span className="gradient-text">Stepwise</span> AI
              </div>
              <div className="footer-tagline">Don't just tell me what to do. Teach me how.</div>
            </div>
          </div>

          <div className="footer-links" role="navigation" aria-label="Footer navigation">
            <button className="footer-link" onClick={() => onNavigate('landing')}>Home</button>
            <button className="footer-link" onClick={() => onNavigate('form')}>Create Guide</button>
            <button className="footer-link" onClick={() => onNavigate('demo')}>Demo</button>
            <button className="footer-link" onClick={() => onNavigate('troubleshoot')}>Help</button>
          </div>
        </div>
        <div className="footer-copy">
          Built for hackathon participants, beginners, and first-time developers.
          No account required. Your data stays in your browser.
        </div>
      </div>
    </footer>
  );
}
