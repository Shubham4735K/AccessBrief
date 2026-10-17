import React, { useState, useEffect } from 'react';
import { X, Send, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function ReportUpdateModal({
  isOpen,
  onClose,
  location,
  allLocations,
  preselectedFeature,
  onSubmitReport
}) {
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [featureKey, setFeatureKey] = useState('entrance');
  const [correctionType, setCorrectionType] = useState('accessible');
  const [userRole, setUserRole] = useState('Visitor');
  const [details, setDetails] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setSubmittedData(null);
      if (location) {
        setSelectedLocationId(location.id);
      } else if (allLocations && allLocations.length > 0) {
        setSelectedLocationId(allLocations[0].id);
      }
      if (preselectedFeature) {
        setFeatureKey(preselectedFeature);
      } else {
        setFeatureKey('entrance');
      }
      setDetails('');
    }
  }, [isOpen, location, preselectedFeature, allLocations]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentLocation = location || allLocations?.find(l => l.id === selectedLocationId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!details.trim()) {
      alert('Please provide a brief description or note for your suggested update.');
      return;
    }

    const featureNames = {
      entrance: 'Step-free entrance / ramp',
      lift: 'Lift availability',
      toilet: 'Accessible toilet',
      internalRoutes: 'Internal accessibility and routes',
      services: 'Relevant service information',
      visualHearing: 'Visual & hearing accessibility',
      other: 'Other accessibility aspect'
    };

    const statusClaims = {
      accessible: 'Verified / Working',
      inaccessible: 'Needs rechecking / Inaccessible',
      inaccurate: 'Needs rechecking / Inaccurate',
      maintenance: 'Needs rechecking / Maintenance underway'
    };

    const newReport = {
      id: `rep-usr-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      locationId: currentLocation?.id || selectedLocationId,
      locationName: currentLocation?.name || 'Public Facility',
      featureKey,
      featureName: featureNames[featureKey] || 'General Feature',
      correctionType,
      statusClaim: statusClaims[correctionType] || 'User-reported',
      userRole,
      details: details.trim(),
      reporterName: reporterName.trim() || 'Anonymous Contributor'
    };

    // Callback to parent state
    onSubmitReport(newReport);
    setSubmittedData(newReport);
    setIsSubmitted(true);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-update-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-header">
          <div>
            <h2 id="modal-update-title" style={{ fontSize: '1.25rem', margin: 0 }}>
              {isSubmitted ? 'Update Submitted (Simulated)' : 'Suggest an Accessibility Update'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#627d98', margin: '4px 0 0 0' }}>
              {currentLocation ? currentLocation.name : 'Report on public facility accessibility'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="modal-body">
            <div
              style={{
                backgroundColor: '#dcfce7',
                border: '2px solid #86efac',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center'
              }}
            >
              <CheckCircle size={44} style={{ color: '#15803d', margin: '0 auto 12px auto' }} />
              <h3 style={{ color: '#14532d', marginBottom: '8px' }}>
                Thank you for your contribution!
              </h3>
              <p style={{ color: '#166534', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Your suggested update regarding <strong>{submittedData?.featureName}</strong> has been received and added to your active browser session.
              </p>
            </div>

            <div className="simulation-disclaimer" style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Frontend Demo Notice:</strong> No backend server is connected in this prototype. This simulated submission has been updated directly into your local React state for demonstration and testing purposes.
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '14px',
                fontSize: '0.88rem'
              }}
            >
              <strong>Summary of your entry:</strong>
              <ul style={{ marginTop: '6px', paddingLeft: '20px', color: '#334e68' }}>
                <li><strong>Target:</strong> {submittedData?.locationName}</li>
                <li><strong>Feature:</strong> {submittedData?.featureName}</li>
                <li><strong>Reported status:</strong> {submittedData?.statusClaim}</li>
                <li><strong>Notes:</strong> “{submittedData?.details}”</li>
              </ul>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* If no location is pinned, let user choose */}
              {!location && allLocations && (
                <div className="form-group">
                  <label htmlFor="select-facility" className="form-label">
                    Select Public Facility *
                  </label>
                  <select
                    id="select-facility"
                    className="form-control"
                    value={selectedLocationId}
                    onChange={(e) => setSelectedLocationId(e.target.value)}
                    required
                  >
                    {allLocations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="feature-select" className="form-label">
                  Which accessibility feature needs an update? *
                </label>
                <select
                  id="feature-select"
                  className="form-control"
                  value={featureKey}
                  onChange={(e) => setFeatureKey(e.target.value)}
                  required
                >
                  <option value="entrance">Step-free entrance / ramp</option>
                  <option value="lift">Lift availability</option>
                  <option value="toilet">Accessible toilet</option>
                  <option value="internalRoutes">Internal accessibility and routes</option>
                  <option value="services">Relevant service information</option>
                  <option value="visualHearing">Visual &amp; hearing accessibility</option>
                  <option value="other">Other / general accessibility</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="correction-type" className="form-label">
                  What is the current actual condition? *
                </label>
                <select
                  id="correction-type"
                  className="form-control"
                  value={correctionType}
                  onChange={(e) => setCorrectionType(e.target.value)}
                  required
                >
                  <option value="accessible">Feature exists and is accessible / operational</option>
                  <option value="inaccessible">Feature is broken, locked, or inaccessible</option>
                  <option value="inaccurate">Existing description is incorrect or missing details</option>
                  <option value="maintenance">Temporary maintenance / construction work</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="correction-details" className="form-label">
                  Suggested correction &amp; specific details *
                </label>
                <textarea
                  id="correction-details"
                  className="form-control"
                  placeholder="E.g., The ramp on the South entrance has a steep threshold, or the lift is currently out of order on Floor 2..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label htmlFor="reporter-role" className="form-label">
                    Your perspective
                  </label>
                  <select
                    id="reporter-role"
                    className="form-control"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option value="Visitor">Visitor / Community member</option>
                    <option value="Wheelchair user">Wheelchair / Mobility device user</option>
                    <option value="Sensory / Neurodivergent visitor">Sensory / Neurodivergent visitor</option>
                    <option value="Carer / Family member">Carer / Family companion</option>
                    <option value="Facility staff">Facility staff / Official</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reporter-name" className="form-label">
                    Your name (optional)
                  </label>
                  <input
                    type="text"
                    id="reporter-name"
                    className="form-control"
                    placeholder="E.g., Alex M."
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                  />
                </div>
              </div>

              <div className="simulation-disclaimer">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    <strong>Prototype Simulation:</strong> Submitting this form records the change immediately in your local session. In the future production app, contributions will be verified by municipal auditors.
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Send size={16} aria-hidden="true" />
                <span>Submit Simulated Update</span>
              </button>
            </div>
          </form>
        )}

        {isSubmitted && (
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              Done &bull; Return to Brief
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
