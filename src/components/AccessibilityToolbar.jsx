import React, { useEffect, useState } from 'react';
import { Type, Eye } from 'lucide-react';

export default function AccessibilityToolbar() {
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Update body classes
    const body = document.body;
    body.classList.remove('font-large', 'font-xlarge');
    if (fontSize === 'large') {
      body.classList.add('font-large');
    } else if (fontSize === 'xlarge') {
      body.classList.add('font-xlarge');
    }

    if (highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  return (
    <div className="a11y-toolbar" role="region" aria-label="Accessibility options">
      <div className="container a11y-toolbar-inner">
        <div className="a11y-group">
          <span className="a11y-label">
            <Type size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Text size:
          </span>
          <button
            type="button"
            className={`a11y-btn ${fontSize === 'normal' ? 'active' : ''}`}
            onClick={() => setFontSize('normal')}
            aria-pressed={fontSize === 'normal'}
            title="Standard text size"
          >
            Default
          </button>
          <button
            type="button"
            className={`a11y-btn ${fontSize === 'large' ? 'active' : ''}`}
            onClick={() => setFontSize('large')}
            aria-pressed={fontSize === 'large'}
            title="Large text size"
          >
            A+
          </button>
          <button
            type="button"
            className={`a11y-btn ${fontSize === 'xlarge' ? 'active' : ''}`}
            onClick={() => setFontSize('xlarge')}
            aria-pressed={fontSize === 'xlarge'}
            title="Extra large text size"
          >
            A++
          </button>
        </div>

        <div className="a11y-group">
          <span className="a11y-label">
            <Eye size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Contrast:
          </span>
          <button
            type="button"
            className={`a11y-btn ${highContrast ? 'active' : ''}`}
            onClick={() => setHighContrast(!highContrast)}
            aria-pressed={highContrast}
            title="Toggle high contrast display"
          >
            {highContrast ? 'High contrast ON' : 'High contrast'}
          </button>
        </div>
      </div>
    </div>
  );
}
