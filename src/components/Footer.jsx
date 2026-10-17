import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Globe } from 'lucide-react';

export default function Footer({ onNavigate, onSelectCategory, onReplayIntro }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: '#1d4ed8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <h4 style={{ margin: 0 }}>AccessBrief</h4>
            </div>
            <p>
              Empowering people with disabilities, caregivers, and mobility-device users to check audited and community-sourced accessibility information before traveling to public places and government facilities.
            </p>
            <p style={{ marginTop: '10px', fontSize: '0.85rem', color: '#94a3b8' }}>
              “Know before you go.”
            </p>
          </div>

          <div className="footer-col">
            <h5>Browse by Sector</h5>
            <ul>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem' }}
                  onClick={() => {
                    onSelectCategory('hospitals');
                    onNavigate('search');
                  }}
                >
                  Hospitals & Healthcare
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem' }}
                  onClick={() => {
                    onSelectCategory('government');
                    onNavigate('search');
                  }}
                >
                  Government Offices
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem' }}
                  onClick={() => {
                    onSelectCategory('education');
                    onNavigate('search');
                  }}
                >
                  Educational Institutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem' }}
                  onClick={() => {
                    onSelectCategory('public_facilities');
                    onNavigate('search');
                  }}
                >
                  Public Facilities & Transit
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Quick Reference</h5>
            <ul>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem' }}
                  onClick={() => onNavigate('how-it-works')}
                >
                  How Verification Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem' }}
                  onClick={() => onNavigate('about')}
                >
                  Accessibility Guidelines
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem' }}
                  onClick={() => onNavigate('search')}
                >
                  Search All 8 Demo Locations
                </button>
              </li>
              {onReplayIntro && (
                <li>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', padding: 0, color: '#93c5fd', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onClick={onReplayIntro}
                    title="Watch the 3D cinematic journey from Earth to Pune"
                  >
                    <Globe size={14} aria-hidden="true" />
                    <span>Watch 3D Opening Journey</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} AccessBrief Prototype &bull; Student Hackathon Edition.
          </div>
          <div>
            Built with React &amp; Vite &bull; Designed to WCAG AA Contrast Standards
          </div>
        </div>
      </div>
    </footer>
  );
}
