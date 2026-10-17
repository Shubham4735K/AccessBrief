import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  UserCheck,
  Building,
  CalendarCheck,
  PhoneCall,
  CheckSquare,
  Square,
  Share2,
  Copy,
  PlusCircle,
  FileText,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function LocationDetailPage({
  location,
  onBack,
  onOpenReport
}) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [checklist, setChecklist] = useState({
    calledAhead: false,
    liftConfirmed: false,
    parkingChecked: false,
    routePlanned: false
  });

  if (!location) return null;

  const {
    id,
    name,
    categoryLabel,
    address,
    neighborhood,
    phone,
    email,
    website,
    accessibilityContact,
    openingHours,
    summaryNote,
    preTravelAdvice,
    lastUpdated,
    features,
    communityUpdates = []
  } = location;

  const featureList = Object.entries(features || {}).map(([key, val]) => ({
    key,
    ...val
  }));

  // Calculate status summary stats
  const verifiedCount = featureList.filter((f) => f.status.toLowerCase().includes('verif')).length;
  const userReportedCount = featureList.filter((f) => f.status.toLowerCase().includes('user') || f.status.toLowerCase().includes('report')).length;
  const needsRecheckCount = featureList.filter((f) => f.status.toLowerCase().includes('recheck') || f.status.toLowerCase().includes('need')).length;
  const unknownCount = featureList.filter((f) => f.status.toLowerCase().includes('unknown')).length;
  const totalCount = featureList.length;

  const handleCopyPhone = () => {
    if (navigator.clipboard && phone) {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const toggleChecklistItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main id="main-content" className="section-py" tabIndex="-1">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="detail-top-nav">
          <button
            type="button"
            className="back-btn"
            onClick={onBack}
            aria-label="Back to previous search results"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>&larr; Back to search results</span>
          </button>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#b45309',
                backgroundColor: '#fef3c7',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              Fictional Demo Location
            </span>
          </div>
        </div>

        {/* Location Header Overview */}
        <article className="detail-header-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="category-badge">
              <Building size={14} aria-hidden="true" />
              {categoryLabel}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-navy-muted)' }}>
              Record ID: <code>{id}</code>
            </span>
          </div>

          <h1 className="detail-title">{name}</h1>

          <div className="detail-meta-row">
            <span className="detail-meta-item">
              <MapPin size={16} aria-hidden="true" style={{ color: 'var(--blue-primary)' }} />
              <span>{address} ({neighborhood})</span>
            </span>

            {openingHours && (
              <span className="detail-meta-item">
                <Clock size={16} aria-hidden="true" style={{ color: 'var(--text-navy-muted)' }} />
                <span>{openingHours}</span>
              </span>
            )}
          </div>

          {summaryNote && (
            <div className="location-card-note" style={{ margin: '14px 0', fontSize: '0.98rem', lineHeight: 1.5 }}>
              <strong>Overview Summary:</strong> {summaryNote}
            </div>
          )}

          {/* Transparent Status Summary Banner */}
          <div className="status-summary-callout" role="status" aria-label="Accessibility verification breakdown">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--blue-primary)" aria-hidden="true" />
              <strong>Rigorous Status Transparency Breakdown:</strong>
            </div>
            <p>
              In accordance with our core principle, AccessBrief <strong>never</strong> labels an entire public venue simply “accessible” when any critical dimension remains unverified. Inspect each row below for exact dates and dimensions.
            </p>

            <div className="status-counts-row">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <StatusBadge status="Verified" size="small" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{verifiedCount} of {totalCount} features</span>
              </span>

              {userReportedCount > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <StatusBadge status="User-reported" size="small" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{userReportedCount} feature{userReportedCount > 1 ? 's' : ''}</span>
                </span>
              )}

              {needsRecheckCount > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <StatusBadge status="Needs rechecking" size="small" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{needsRecheckCount} feature{needsRecheckCount > 1 ? 's' : ''}</span>
                </span>
              )}

              {unknownCount > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <StatusBadge status="Unknown" size="small" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{unknownCount} feature{unknownCount > 1 ? 's' : ''}</span>
                </span>
              )}
            </div>
          </div>
        </article>

        {/* Pre-Travel Call Ahead & Direct Confirmation Notice */}
        <section className="pre-travel-card" aria-labelledby="pre-travel-heading">
          <div className="pre-travel-title" id="pre-travel-heading">
            <AlertTriangle size={22} aria-hidden="true" />
            <span>Pre-Travel Confirmation Notice: Always Call Ahead</span>
          </div>

          <p className="pre-travel-body">
            Public facilities frequently undergo temporary maintenance, elevator repairs, or route alterations. We strongly advise confirming urgent accommodations with facility staff before travelling.
            {preTravelAdvice && <span> Specific note: <em>"{preTravelAdvice}"</em></span>}
          </p>

          {/* Contact Details Grid */}
          <div className="contact-grid">
            {phone && (
              <div className="contact-item">
                <span className="contact-label">Facility Telephone</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="contact-val" style={{ textDecoration: 'none' }}>
                    <Phone size={15} color="#1d4ed8" aria-hidden="true" />
                    <span>{phone}</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleCopyPhone}
                    style={{ padding: '2px 8px', minHeight: '28px', fontSize: '0.78rem' }}
                    aria-label="Copy phone number"
                  >
                    <Copy size={12} aria-hidden="true" />
                    <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {accessibilityContact && (
              <div className="contact-item">
                <span className="contact-label">Accessibility Liaison / Desk</span>
                <span className="contact-val">
                  <UserCheck size={15} color="#1d4ed8" aria-hidden="true" />
                  {accessibilityContact}
                </span>
              </div>
            )}

            {email && (
              <div className="contact-item">
                <span className="contact-label">Inquiries Email</span>
                <a href={`mailto:${email}`} className="contact-val">
                  <Mail size={15} color="#1d4ed8" aria-hidden="true" />
                  {email}
                </a>
              </div>
            )}

            {website && (
              <div className="contact-item">
                <span className="contact-label">Official Portal</span>
                <a href={website} target="_blank" rel="noopener noreferrer" className="contact-val">
                  <Globe size={15} color="#1d4ed8" aria-hidden="true" />
                  Visit Portal
                </a>
              </div>
            )}
          </div>

          {/* Interactive Traveler Checklist */}
          <div
            style={{
              marginTop: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #fde68a',
              borderRadius: '6px',
              padding: '14px'
            }}
          >
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>
              Your Personal Pre-Departure Checklist for this Venue:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  color: checklist.calledAhead ? '#15803d' : '#475569',
                  textDecoration: checklist.calledAhead ? 'line-through' : 'none'
                }}
              >
                <input
                  type="checkbox"
                  checked={checklist.calledAhead}
                  onChange={() => toggleChecklistItem('calledAhead')}
                  className="checkbox-input"
                />
                <span>Called facility to verify door/ramp</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  color: checklist.liftConfirmed ? '#15803d' : '#475569',
                  textDecoration: checklist.liftConfirmed ? 'line-through' : 'none'
                }}
              >
                <input
                  type="checkbox"
                  checked={checklist.liftConfirmed}
                  onChange={() => toggleChecklistItem('liftConfirmed')}
                  className="checkbox-input"
                />
                <span>Confirmed lift is operating today</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  color: checklist.parkingChecked ? '#15803d' : '#475569',
                  textDecoration: checklist.parkingChecked ? 'line-through' : 'none'
                }}
              >
                <input
                  type="checkbox"
                  checked={checklist.parkingChecked}
                  onChange={() => toggleChecklistItem('parkingChecked')}
                  className="checkbox-input"
                />
                <span>Identified accessible parking / transit bay</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  color: checklist.routePlanned ? '#15803d' : '#475569',
                  textDecoration: checklist.routePlanned ? 'line-through' : 'none'
                }}
              >
                <input
                  type="checkbox"
                  checked={checklist.routePlanned}
                  onChange={() => toggleChecklistItem('routePlanned')}
                  className="checkbox-input"
                />
                <span>Noted secondary entrance directions</span>
              </label>
            </div>
          </div>
        </section>

        {/* Feature-by-Feature Detailed Breakdown Table */}
        <section className="features-section" aria-labelledby="features-list-heading">
          <div className="features-section-header">
            <div>
              <h2 id="features-list-heading" style={{ fontSize: '1.25rem', margin: 0 }}>
                Itemized Accessibility Features
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--text-navy-muted)' }}>
                Detailed measurements, fixtures, and audit sources for each physical and sensory area.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => onOpenReport(location)}
            >
              <PlusCircle size={15} aria-hidden="true" />
              <span>Suggest Update for This Place</span>
            </button>
          </div>

          <div className="features-list">
            {featureList.map((f) => (
              <div key={f.key} className="feature-row">
                {/* Column 1: Feature Title */}
                <div className="feature-name-col">
                  <span className="feature-title">{f.featureName}</span>
                  <button
                    type="button"
                    onClick={() => onOpenReport(location, f.key)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--blue-primary)',
                      fontSize: '0.8rem',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      textDecoration: 'underline'
                    }}
                    aria-label={`Report an inaccuracy regarding ${f.featureName}`}
                  >
                    Report correction on this feature
                  </button>
                </div>

                {/* Column 2: Status Badge */}
                <div className="feature-status-col">
                  <StatusBadge status={f.status} />
                </div>

                {/* Column 3: Feature Details & Audit Metadata */}
                <div className="feature-details-col">
                  <p className="feature-description">{f.details}</p>

                  <div className="feature-audit-meta">
                    {f.lastChecked && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarCheck size={14} aria-hidden="true" />
                        <span>Last evaluated: <strong>{f.lastChecked}</strong></span>
                      </span>
                    )}

                    {f.source && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <FileText size={14} aria-hidden="true" />
                        <span>Source: <em>{f.source}</em></span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Reports / Updates Section */}
        <section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
          aria-labelledby="community-reports-heading"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 id="community-reports-heading" style={{ fontSize: '1.2rem', margin: 0 }}>
                Community Feedback &amp; Updates Log ({communityUpdates.length})
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--text-navy-muted)' }}>
                Field reports contributed by travelers, mobility device users, and venue visitors.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenReport(location)}
            >
              <PlusCircle size={15} aria-hidden="true" />
              <span>Report Incorrect Information</span>
            </button>
          </div>

          {communityUpdates.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px dashed var(--border-medium)',
                borderRadius: '6px',
                padding: '20px',
                textAlign: 'center',
                color: 'var(--text-navy-muted)',
                fontSize: '0.92rem'
              }}
            >
              No community reports submitted for this facility yet in this session.
              <br />
              Have you visited recently? Use the “Suggest Update” button above to simulate adding a field note!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {communityUpdates.map((update) => (
                <div
                  key={update.id}
                  style={{
                    backgroundColor: 'var(--bg-subtle-blue)',
                    border: '1px solid var(--blue-light-border)',
                    borderRadius: '6px',
                    padding: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-navy-primary)' }}>
                        {update.featureName}
                      </span>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          backgroundColor: '#e0f2fe',
                          color: '#0369a1',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}
                      >
                        {update.statusClaim || 'Field Update'}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.82rem', color: 'var(--text-navy-muted)' }}>
                      Reported by {update.userRole || 'Visitor'} &bull; {update.date}
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-navy-secondary)', lineHeight: 1.4 }}>
                    “{update.details || update.note}”
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
