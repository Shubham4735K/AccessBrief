import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  PhoneCall,
  Search,
  ArrowRight,
  Code
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function HowItWorksPage({ onNavigate }) {
  return (
    <main id="main-content" className="section-py" tabIndex="-1">
      <div className="container container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="hero-tag" style={{ display: 'inline-flex' }}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Transparency Framework</span>
          </span>
          <h1 style={{ fontSize: '2rem', marginTop: '12px', marginBottom: '8px' }}>
            How AccessBrief Works
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-navy-secondary)' }}>
            Why we dismantle binary "accessible / not accessible" labels in favor of verified, dimension-specific criteria.
          </p>
        </div>

        {/* Core Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
              1. The Problem with Generic "Accessible" Badges
            </h2>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '14px', color: 'var(--text-navy-secondary)' }}>
              Mainstream navigation and review apps frequently assign a blanket wheelchair icon or "Accessible" badge to an entire public facility. In reality, a hospital might possess a ramp at one specific wing, but require stairs to enter the laboratory; or an administration building might have a lift that is undergoing hydraulic maintenance.
            </p>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--text-navy-secondary)' }}>
              AccessBrief solves this dangerous ambiguity by evaluating each dimension separately: entrance ramps, lift capacities, restroom fixtures, internal passageway widths, and visual/audio assistive accommodations.
            </p>
          </section>

          {/* The 4 Statuses */}
          <section
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h2 style={{ fontSize: '1.35rem', marginBottom: '16px', color: 'var(--text-navy-primary)' }}>
              2. The Four Verification Statuses
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '150px' }}>
                  <StatusBadge status="Verified" />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Officially Audited Record</strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-navy-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Audited on-site by municipal inspectors, licensed accessibility assessors, or certified facility management teams within the last 12 months. Exact measurements (doorway clearances, slope angles) are noted.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '150px' }}>
                  <StatusBadge status="User-reported" />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Community Contributed</strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-navy-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Submitted by visitors, wheelchair users, or caregivers with firsthand lived experience. Marked clearly to alert travelers that an official audit confirmation is still pending.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '150px' }}>
                  <StatusBadge status="Needs rechecking" />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Temporary Maintenance or Discrepancy</strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-navy-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Applied when a previously functional facility has been flagged for construction, broken elevators, or conflicting reports. Reminds users to phone ahead before travelling.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '150px' }}>
                  <StatusBadge status="Unknown" />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Unsurveyed / No Assumption</strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-navy-secondary)', lineHeight: 1.5, margin: 0 }}>
                    If an aspect has not been surveyed, it is designated as Unknown. We believe no information is safer than inaccurate assumptions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Backend Integration Architecture for Hackathons/Judges */}
          <section
            style={{
              backgroundColor: 'var(--bg-subtle-blue)',
              border: '1px solid var(--blue-light-border)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Code size={20} color="var(--blue-primary)" aria-hidden="true" />
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>
                Architecture &amp; Future Backend Integration
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-navy-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
              This frontend prototype was intentionally designed with modular React components and normalized JSON data structures. Student developers can plug this interface directly into any REST or GraphQL backend:
            </p>

            <ul style={{ fontSize: '0.88rem', color: 'var(--text-navy-primary)', paddingLeft: '20px', lineHeight: 1.6 }}>
              <li><code>GET /api/v1/locations?category=...&amp;needs=...</code> &mdash; Fetch filtered public facility briefs</li>
              <li><code>GET /api/v1/locations/:id</code> &mdash; Fetch detailed feature-by-feature audits and sources</li>
              <li><code>POST /api/v1/reports</code> &mdash; Save community corrections and review submissions</li>
              <li><code>POST /api/v1/audits/verify</code> &mdash; Municipal inspector verification workflow</li>
            </ul>
          </section>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('search')}
            >
              <span>Explore Verified Public Facilities</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
