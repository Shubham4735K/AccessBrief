import React from 'react';
import { MapPin, Phone, ArrowRight, Building, CheckCircle2, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function LocationCard({ location, onSelectLocation }) {
  const { id, name, categoryLabel, address, neighborhood, phone, features, summaryNote, lastUpdated } = location;

  // Calculate quick feature summary counts
  const featureList = Object.values(features || {});
  const verifiedCount = featureList.filter(f => f.status.toLowerCase().includes('verif')).length;
  const unknownCount = featureList.filter(f => f.status.toLowerCase().includes('unknown')).length;
  const recheckCount = featureList.filter(f => f.status.toLowerCase().includes('recheck')).length;

  return (
    <article className="location-card" aria-labelledby={`loc-title-${id}`}>
      <div className="location-card-top">
        <span className="category-badge">
          <Building size={13} aria-hidden="true" />
          {categoryLabel}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#b45309',
            backgroundColor: '#fef3c7',
            padding: '2px 6px',
            borderRadius: '4px'
          }}
          title="Fictional entry for UI testing"
        >
          [Demo]
        </span>
      </div>

      <h3 className="location-card-title" id={`loc-title-${id}`}>
        {name}
      </h3>

      <div className="location-card-address">
        <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px', color: '#627d98' }} />
        <span>{address} &bull; <em>{neighborhood}</em></span>
      </div>

      {/* Feature summary indicators */}
      <div className="location-feature-badges" aria-label="Accessibility summary">
        {features?.entrance && (
          <span className="feature-summary-pill" title={`Entrance: ${features.entrance.status}`}>
            <span
              className={`dot ${
                features.entrance.status.toLowerCase().includes('verif')
                  ? 'dot-verified'
                  : features.entrance.status.toLowerCase().includes('recheck')
                  ? 'dot-recheck'
                  : 'dot-unknown'
              }`}
            />
            Entrance: <strong>{features.entrance.status}</strong>
          </span>
        )}

        {features?.lift && (
          <span className="feature-summary-pill" title={`Lift: ${features.lift.status}`}>
            <span
              className={`dot ${
                features.lift.status.toLowerCase().includes('verif')
                  ? 'dot-verified'
                  : features.lift.status.toLowerCase().includes('recheck')
                  ? 'dot-recheck'
                  : 'dot-unknown'
              }`}
            />
            Lift: <strong>{features.lift.status}</strong>
          </span>
        )}

        {features?.toilet && (
          <span className="feature-summary-pill" title={`Accessible Toilet: ${features.toilet.status}`}>
            <span
              className={`dot ${
                features.toilet.status.toLowerCase().includes('verif')
                  ? 'dot-verified'
                  : features.toilet.status.toLowerCase().includes('recheck')
                  ? 'dot-recheck'
                  : 'dot-unknown'
              }`}
            />
            Toilet: <strong>{features.toilet.status}</strong>
          </span>
        )}
      </div>

      {summaryNote && (
        <div className="location-card-note">
          <p style={{ margin: 0 }}>{summaryNote}</p>
        </div>
      )}

      <div className="location-card-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#627d98' }}>
          <Clock size={13} aria-hidden="true" />
          <span>Checked {lastUpdated}</span>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onSelectLocation(location)}
          aria-label={`View full accessibility brief for ${name}`}
        >
          <span>View Brief</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
