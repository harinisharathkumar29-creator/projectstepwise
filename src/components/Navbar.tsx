import './Navbar.css';
import type { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container">
        <button
          className="navbar-logo"
          onClick={() => onNavigate('landing')}
          aria-label="Go to home page"
        >
          <div className="logo-icon" aria-hidden="true">🚀</div>
          <span className="logo-text">
            <span>Stepwise</span> AI
          </span>
        </button>

        <div className="navbar-actions">
          <button
            className={`navbar-link ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => onNavigate('landing')}
          >
            Home
          </button>
          <button
            className={`navbar-link ${currentView === 'demo' ? 'active' : ''}`}
            onClick={() => onNavigate('demo')}
          >
            Demo
          </button>
          <button
            className={`navbar-link ${currentView === 'troubleshoot' ? 'active' : ''}`}
            onClick={() => onNavigate('troubleshoot')}
          >
            Help
          </button>
          <button
            className="btn-primary"
            onClick={() => onNavigate('form')}
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            Create Guide
          </button>
        </div>
      </div>
    </nav>
  );
}
