import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { HowItWorks, ToolMapSection, LearningModesSection } from './components/LandingSections';
import AnimatedWalkthrough from './components/AnimatedWalkthrough';
import GuideForm from './components/GuideForm';
import TutorialWorkspace from './components/TutorialWorkspace';
import TroubleshootPage from './components/TroubleshootPage';
import Footer from './components/Footer';
import { DEMO_TUTORIAL } from './data/tutorialData';
import type { AppView, Tutorial } from './types';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);

  const navigate = (target: AppView) => {
    setView(target);
    // Scroll to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTutorialReady = (tutorial: Tutorial) => {
    setActiveTutorial(tutorial);
    navigate('tutorial');
  };

  const handleDemoClick = () => {
    setActiveTutorial(DEMO_TUTORIAL);
    navigate('tutorial');
  };

  const handleBack = () => {
    navigate('landing');
    setActiveTutorial(null);
  };

  return (
    <>
      <Navbar currentView={view} onNavigate={navigate} />

      {view === 'landing' && (
        <main id="main-content">
          <Hero onNavigate={navigate} />
          <div className="divider" />
          <HowItWorks />
          <div className="divider" />
          <ToolMapSection />
          <div className="divider" />
          <LearningModesSection onNavigate={navigate} />
          <div className="divider" />
          <AnimatedWalkthrough onNavigate={navigate} />
          <Footer onNavigate={navigate} />
        </main>
      )}

      {view === 'form' && (
        <main id="main-content">
          <GuideForm onTutorialReady={handleTutorialReady} onDemoClick={handleDemoClick} />
          <Footer onNavigate={navigate} />
        </main>
      )}

      {view === 'demo' && (
        <main id="main-content">
          <TutorialWorkspace
            tutorial={DEMO_TUTORIAL}
            onBack={handleBack}
            onTroubleshoot={() => navigate('troubleshoot')}
          />
          <Footer onNavigate={navigate} />
        </main>
      )}

      {view === 'tutorial' && activeTutorial && (
        <main id="main-content">
          <TutorialWorkspace
            tutorial={activeTutorial}
            onBack={handleBack}
            onTroubleshoot={() => navigate('troubleshoot')}
          />
          <Footer onNavigate={navigate} />
        </main>
      )}

      {view === 'troubleshoot' && (
        <main id="main-content">
          <TroubleshootPage />
          <Footer onNavigate={navigate} />
        </main>
      )}
    </>
  );
}
