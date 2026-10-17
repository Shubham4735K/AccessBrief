import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Eye,
  Sliders,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <main id="main-content" className="section-py" tabIndex="-1">
      <div className="container container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="hero-tag" style={{ display: 'inline-flex' }}>
            <BookOpen size={16} aria-hidden="true" />
            <span>Inclusive Design Guide</span>
          </span>
          <h1 style={{ fontSize: '2rem', marginTop: '12px', marginBottom: '8px' }}>
            Accessibility Standards &amp; Commitments
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-navy-secondary)' }}>
            How AccessBrief adheres to accessibility guidelines in both our software interface and physical audit criteria.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Digital Accessibility Commitment */}
          <section
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h2 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--text-navy-primary)' }}>
              1. Web Accessibility Compliance (WCAG 2.1 AA)
            </h2>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--text-navy-secondary)', marginBottom: '14px' }}>
              Because this tool is built specifically for people with disabilities, digital accessibility is paramount:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.8, fontSize: '0.95rem', color: 'var(--text-navy-secondary)' }}>
              <li><strong>High Contrast Ratio:</strong> Navy-blue text on white backgrounds maintains a contrast ratio exceeding 7:1, surpassing WCAG AAA for body text.</li>
              <li><strong>Focus Indicators:</strong> Highly visible 3px focus rings ensure keyboard-only navigation without mouse dependence.</li>
              <li><strong>Generous Clickable Targets:</strong> All buttons and interactive controls satisfy the 44 &times; 44 pixel minimum touch target criterion.</li>
              <li><strong>Dynamic Font Scaling &amp; High Contrast:</strong> Built-in toolbar toggles allow users to instantly scale typography up to 125% and activate enhanced borders.</li>
              <li><strong>Semantic HTML &amp; ARIA:</strong> Full support for screen readers with explicit status announcements and form labeling.</li>
            </ul>
          </section>

          {/* Physical Accessibility Measurement Framework */}
          <section
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h2 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--text-navy-primary)' }}>
              2. Physical Facility Benchmark Criteria
            </h2>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--text-navy-secondary)', marginBottom: '14px' }}>
              When public venues are evaluated for our database, inspectors and community members verify against these universal standards:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <strong style={{ display: 'block', color: 'var(--blue-primary)', marginBottom: '4px' }}>Entrances &amp; Ramps</strong>
                <p style={{ fontSize: '0.88rem', margin: 0, color: 'var(--text-navy-secondary)' }}>
                  Minimum 850mm clear opening width, ramp gradient 1:12 or shallower, double continuous handrails, and level turning landings.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <strong style={{ display: 'block', color: 'var(--blue-primary)', marginBottom: '4px' }}>Elevators &amp; Vertical Access</strong>
                <p style={{ fontSize: '0.88rem', margin: 0, color: 'var(--text-navy-secondary)' }}>
                  Internal cabin dimensions &ge; 1100 &times; 1400mm, raised braille call buttons between 900-1100mm, voice floor prompts, and visual door status.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <strong style={{ display: 'block', color: 'var(--blue-primary)', marginBottom: '4px' }}>Restrooms &amp; Changing</strong>
                <p style={{ fontSize: '0.88rem', margin: 0, color: 'var(--text-navy-secondary)' }}>
                  Unisex accessible cubicles with outward opening doors, dual transfer grab bars, sensor taps, and red emergency pull cords hanging to within 100mm of floor.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                <strong style={{ display: 'block', color: 'var(--blue-primary)', marginBottom: '4px' }}>Sensory &amp; Assistive Tech</strong>
                <p style={{ fontSize: '0.88rem', margin: 0, color: 'var(--text-navy-secondary)' }}>
                  Telecoil hearing loops at service desks, high-contrast tactile ground indicators, and quiet hours for neurodivergent visitors.
                </p>
              </div>
            </div>
          </section>

          {/* Prototype Disclosure */}
          <section
            style={{
              backgroundColor: '#fffbeb',
              border: '2px solid #fde68a',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}
          >
            <strong style={{ color: '#92400e', fontSize: '1.05rem', display: 'block', marginBottom: '6px' }}>
              Academic &amp; Student Hackathon Prototype Disclaimer
            </strong>
            <p style={{ fontSize: '0.92rem', color: '#78350f', lineHeight: 1.5, margin: 0 }}>
              AccessBrief is a student engineering initiative developed for accessibility innovation hackathons. All sample location records, contact phone numbers, and simulated updates presented in this build are illustrative test records.
            </p>
          </section>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('search')}
            >
              <span>Explore Public Place Profiles</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
