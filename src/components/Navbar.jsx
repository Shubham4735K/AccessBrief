import React, { useState } from 'react';
import { ShieldCheck, Search, Info, HelpCircle, Menu, X, PlusCircle, Globe } from 'lucide-react';

export default function Navbar({ currentView, onNavigate, onOpenGeneralReport, onReplayIntro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewId) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <a
          href="#home"
          className="brand-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          aria-label="AccessBrief - Return to homepage"
        >
          <div className="brand-logo-icon" aria-hidden="true">
            <ShieldCheck size={26} strokeWidth={2.4} />
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title">AccessBrief</span>
            <span className="brand-tagline">Know before you go.</span>
          </div>
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Navigation links */}
        <nav
          role="navigation"
          aria-label="Main menu"
          style={{ display: mobileMenuOpen ? 'flex' : undefined }}
        >
          <ul className="nav-links">
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
                aria-current={currentView === 'home' ? 'page' : undefined}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'search' ? 'active' : ''}`}
                onClick={() => handleNavClick('search')}
                aria-current={currentView === 'search' ? 'page' : undefined}
              >
                <Search size={16} aria-hidden="true" />
                Find Places
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'how-it-works' ? 'active' : ''}`}
                onClick={() => handleNavClick('how-it-works')}
                aria-current={currentView === 'how-it-works' ? 'page' : undefined}
              >
                <HelpCircle size={16} aria-hidden="true" />
                How It Works
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
                aria-current={currentView === 'about' ? 'page' : undefined}
              >
                <Info size={16} aria-hidden="true" />
                Accessibility Standards
              </button>
            </li>
            {onReplayIntro && (
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  title="Replay cinematic 3D journey to Pune"
                >
                  <Globe size={16} aria-hidden="true" />
                  3D Intro
                </button>
              </li>
            )}
            <li>
              <button
                type="button"
                className="btn-nav-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGeneralReport();
                }}
                style={{ marginLeft: '6px' }}
              >
                <PlusCircle size={15} aria-hidden="true" />
                <span>Suggest an Update</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
