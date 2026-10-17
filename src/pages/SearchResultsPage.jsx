import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Building,
  CheckSquare,
  AlertCircle,
  HelpCircle,
  HeartPulse,
  Landmark,
  GraduationCap,
  Bus,
  BookOpen
} from 'lucide-react';
import { CATEGORIES } from '../data/sampleLocations';
import LocationCard from '../components/LocationCard';

export default function SearchResultsPage({
  locations,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onSelectLocation,
  onOpenReport
}) {
  // Accessibility Needs Filters State
  const [filters, setFilters] = useState({
    requireRamp: false,
    requireLift: false,
    requireToilet: false,
    requireVisualHearing: false,
    onlyVerified: false
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterToggle = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAllFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    setFilters({
      requireRamp: false,
      requireLift: false,
      requireToilet: false,
      requireVisualHearing: false,
      onlyVerified: false
    });
  };

  // Filter locations dynamically
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      // 1. Text Search query (matches name, address, neighborhood, summaryNote)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = loc.name.toLowerCase().includes(query);
        const matchAddr = loc.address.toLowerCase().includes(query);
        const matchNeighbor = loc.neighborhood?.toLowerCase().includes(query);
        const matchNote = loc.summaryNote?.toLowerCase().includes(query);
        const matchCategory = loc.categoryLabel?.toLowerCase().includes(query);

        // Check if any feature details mention the query
        const matchFeatures = Object.values(loc.features || {}).some(
          (f) =>
            f.details?.toLowerCase().includes(query) ||
            f.featureName?.toLowerCase().includes(query)
        );

        if (!matchName && !matchAddr && !matchNeighbor && !matchNote && !matchCategory && !matchFeatures) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory && selectedCategory !== 'all') {
        if (loc.category !== selectedCategory) {
          return false;
        }
      }

      // 3. Accessibility Needs Filters
      const entranceStatus = loc.features?.entrance?.status || 'Unknown';
      const liftStatus = loc.features?.lift?.status || 'Unknown';
      const toiletStatus = loc.features?.toilet?.status || 'Unknown';
      const visualHearingStatus = loc.features?.visualHearing?.status || 'Unknown';

      // Mobility: Step-free entrance / ramp
      if (filters.requireRamp) {
        if (filters.onlyVerified) {
          if (!entranceStatus.toLowerCase().includes('verif')) return false;
        } else {
          if (entranceStatus.toLowerCase().includes('unknown')) return false;
        }
      }

      // Mobility: Lift availability
      if (filters.requireLift) {
        if (filters.onlyVerified) {
          if (!liftStatus.toLowerCase().includes('verif')) return false;
        } else {
          if (liftStatus.toLowerCase().includes('unknown')) return false;
        }
      }

      // Mobility: Accessible Toilet
      if (filters.requireToilet) {
        if (filters.onlyVerified) {
          if (!toiletStatus.toLowerCase().includes('verif')) return false;
        } else {
          if (toiletStatus.toLowerCase().includes('unknown')) return false;
        }
      }

      // Visual & Hearing accessibility
      if (filters.requireVisualHearing) {
        if (filters.onlyVerified) {
          if (!visualHearingStatus.toLowerCase().includes('verif')) return false;
        } else {
          if (visualHearingStatus.toLowerCase().includes('unknown')) return false;
        }
      }

      // Only Verified mode for general check
      if (filters.onlyVerified) {
        const featureArr = Object.values(loc.features || {});
        const hasAtLeastOneVerified = featureArr.some((f) =>
          f.status.toLowerCase().includes('verif')
        );
        if (!hasAtLeastOneVerified) return false;
      }

      return true;
    });
  }, [locations, searchQuery, selectedCategory, filters]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (filters.requireRamp ? 1 : 0) +
    (filters.requireLift ? 1 : 0) +
    (filters.requireToilet ? 1 : 0) +
    (filters.requireVisualHearing ? 1 : 0) +
    (filters.onlyVerified ? 1 : 0);

  return (
    <main id="main-content" className="section-py" tabIndex="-1">
      <div className="container">
        {/* Top Header & Search Controls */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.85rem', marginBottom: '8px' }}>
            Find Public Places &amp; Services
          </h1>
          <p style={{ color: 'var(--text-navy-secondary)' }}>
            Search accessibility profiles across public facilities. Check detailed entrance, elevator, and restroom statuses before visiting.
          </p>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              marginTop: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 2, minWidth: '240px', position: 'relative' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-navy-muted)'
                  }}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '38px', width: '100%' }}
                  placeholder="Filter by name, neighborhood, street, or feature..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search places"
                />
              </div>

              <div style={{ flex: 1, minWidth: '180px' }}>
                <select
                  className="form-control"
                  style={{ width: '100%', cursor: 'pointer' }}
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  aria-label="Filter by public sector category"
                >
                  <option value="all">All Sectors</option>
                  <option value="hospitals">Hospitals &amp; Healthcare</option>
                  <option value="government">Government Offices</option>
                  <option value="education">Educational Institutions</option>
                  <option value="public_facilities">Public Facilities &amp; Transit</option>
                  <option value="community">Libraries &amp; Community</option>
                </select>
              </div>

              {/* Mobile toggle button */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                style={{ display: 'inline-flex' }}
                aria-expanded={mobileFilterOpen}
              >
                <SlidersHorizontal size={16} aria-hidden="true" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={resetAllFilters}
                  title="Clear all active filters"
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Results Grid */}
        <div className="filter-layout">
          {/* Filters Sidebar */}
          <aside
            className="filters-sidebar"
            aria-label="Accessibility filters"
            style={{ display: mobileFilterOpen || window.innerWidth > 860 ? 'block' : 'none' }}
          >
            <div className="filters-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={18} aria-hidden="true" />
                Filter by Needs
              </h3>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--blue-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Mobility Needs Filter Group */}
            <div className="filter-group">
              <div className="filter-group-title">
                Mobility &amp; Physical Access
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={filters.requireRamp}
                  onChange={() => handleFilterToggle('requireRamp')}
                />
                <span>Step-free entrance / ramp required</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={filters.requireLift}
                  onChange={() => handleFilterToggle('requireLift')}
                />
                <span>Lift / elevator required</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={filters.requireToilet}
                  onChange={() => handleFilterToggle('requireToilet')}
                />
                <span>Accessible toilet confirmed</span>
              </label>
            </div>

            {/* Sensory & Hearing Filter Group */}
            <div className="filter-group">
              <div className="filter-group-title">
                Sensory &amp; Hearing Needs
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={filters.requireVisualHearing}
                  onChange={() => handleFilterToggle('requireVisualHearing')}
                />
                <span>Tactile signage or hearing loop reported</span>
              </label>
            </div>

            {/* Verification Standard Filter Group */}
            <div className="filter-group">
              <div className="filter-group-title">
                Verification Rigor
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={filters.onlyVerified}
                  onChange={() => handleFilterToggle('onlyVerified')}
                />
                <span>Show only officially <strong>Verified</strong> records</span>
              </label>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-subtle-blue)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                color: 'var(--text-navy-secondary)',
                lineHeight: 1.4
              }}
            >
              <strong>Transparent standard:</strong> If a facility has an "Unknown" status for a requirement, it is excluded when filtering to prevent misleading travelers.
            </div>
          </aside>

          {/* Results Area */}
          <section aria-label="Search results">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-navy-secondary)' }}>
                Showing <strong>{filteredLocations.length}</strong> of {locations.length} public facility briefs
                {selectedCategory !== 'all' && (
                  <span> in <em>{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</em></span>
                )}
                {searchQuery.trim() && (
                  <span> matching “<strong>{searchQuery}</strong>”</span>
                )}
              </div>

              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#627d98',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                [All 8 items are fictional demo data]
              </span>
            </div>

            {/* Empty State */}
            {filteredLocations.length === 0 ? (
              <div className="empty-state" role="status" aria-live="polite">
                <AlertCircle className="empty-state-icon" aria-hidden="true" />
                <h3>No Public Facilities Found</h3>
                <p>
                  No facilities in our demonstration dataset match all your selected search and accessibility criteria.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={resetAllFilters}
                  >
                    <RotateCcw size={16} aria-hidden="true" />
                    <span>Reset All Filters</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onOpenReport()}
                  >
                    <span>Suggest a Missing Place</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="locations-grid">
                {filteredLocations.map((loc) => (
                  <LocationCard
                    key={loc.id}
                    location={loc}
                    onSelectLocation={onSelectLocation}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
