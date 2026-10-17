import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside className="demo-banner" aria-label="Demo notice">
      <div className="container demo-banner-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
          <span className="demo-banner-tag">
            <AlertTriangle size={14} aria-hidden="true" /> Demo Prototype
          </span>
          <span className="demo-banner-text">
            <strong>Fictional demonstration data only:</strong> All public facility profiles and accessibility records are simulated for testing and judging evaluation. Please call venues directly before traveling.
          </span>
        </div>
        <button
          type="button"
          className="demo-banner-close"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss demo notice"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <X size={14} aria-hidden="true" /> Dismiss
          </span>
        </button>
      </div>
    </aside>
  );
}
