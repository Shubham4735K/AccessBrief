import React, { useState } from 'react';
import {
  Search,
  Building2,
  HeartPulse,
  Landmark,
  GraduationCap,
  Bus,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  UserCheck,
  CalendarCheck,
  PhoneCall,
  SlidersHorizontal
} from 'lucide-react';
import { CATEGORIES } from '../data/sampleLocations';
import LocationCard from '../components/LocationCard';
import StatusBadge from '../components/StatusBadge';

export default function HomePage({
  locations,
  onSearch,
  onSelectCategory,
  onSelectLocation,
  onNavigate
}) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput, selectedCategory);
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    onSelectCategory(catId);
    onNavigate('search');
  };

  // Preview 3 diverse locations on the homepage
  const featuredLocations = locations.slice(0, 3);

  return (
    <main id="main-content" tabIndex="-1">
      {/* Immersive Cinematic Hero Section */}
      <section className="home-hero-section" aria-labelledby="hero-heading">
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="container home-hero-container">
          <div className="home-hero-content">
            <h1 id="hero-heading" className="home-hero-title">
              A more accessible world<br className="hero-headline-break" />starts with knowing where to go.
            </h1>

            <p className="home-hero-subtitle">
              Discover accessibility information before you visit hospitals, public offices, and everyday places.
            </p>

            <div className="home-hero-actions">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => onNavigate('search')}
                aria-label="Explore places in Pune"
              >
                <span>Explore places</span>
              </button>

              <button
                type="button"
                className="hero-secondary-link"
                onClick={() => onNavigate('how-it-works')}
                aria-label="Learn how AccessBrief works"
              >
                <span>How it works</span>
                <span className="hero-link-arrow" aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Search & Quick Categories Bar Section */}
      <section className="home-search-section" aria-label="Search and filter public facilities">
        <div className="container">
          <div className="search-box-card">
            <form className="search-box-form" onSubmit={handleSearchSubmit} role="search" aria-label="Find public places">
              <div className="search-input-wrap">
                <Search size={22} aria-hidden="true" />
                <label htmlFor="home-search-input" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
                  Search facility name, address, or service
                </label>
                <input
                  id="home-search-input"
                  type="text"
                  className="search-input"
                  placeholder="Search by facility name, address, or service (e.g. Hospital, Library, Metro)..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <div className="search-select-wrap">
                <label htmlFor="home-category-select" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
                  Filter by category
                </label>
                <select
                  id="home-category-select"
                  className="search-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Category filter"
                >
                  <option value="all">All Public Categories</option>
                  <option value="hospitals">Hospitals &amp; Healthcare</option>
                  <option value="government">Government Offices</option>
                  <option value="education">Educational Institutions</option>
                  <option value="public_facilities">Public Facilities &amp; Transit</option>
                  <option value="community">Libraries &amp; Community</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                aria-label="Submit search"
              >
                <Search size={18} aria-hidden="true" />
                <span>Search Places</span>
              </button>
            </form>
          </div>

          {/* Quick Categories */}
          <div className="quick-categories" role="group" aria-label="Quick category filters">
            <span className="quick-cat-label">Explore by category:</span>

            <button
              type="button"
              className="quick-cat-pill"
              onClick={() => handleCategoryClick('hospitals')}
            >
              <HeartPulse size={16} color="#1d4ed8" aria-hidden="true" />
              <span>Hospitals &amp; Clinics</span>
            </button>

            <button
              type="button"
              className="quick-cat-pill"
              onClick={() => handleCategoryClick('government')}
            >
              <Landmark size={16} color="#1d4ed8" aria-hidden="true" />
              <span>Government Offices</span>
            </button>

            <button
              type="button"
              className="quick-cat-pill"
              onClick={() => handleCategoryClick('education')}
            >
              <GraduationCap size={16} color="#1d4ed8" aria-hidden="true" />
              <span>Educational Institutions</span>
            </button>

            <button
              type="button"
              className="quick-cat-pill"
              onClick={() => handleCategoryClick('public_facilities')}
            >
              <Bus size={16} color="#1d4ed8" aria-hidden="true" />
              <span>Transit &amp; Public Venues</span>
            </button>

            <button
              type="button"
              className="quick-cat-pill"
              onClick={() => handleCategoryClick('community')}
            >
              <BookOpen size={16} color="#1d4ed8" aria-hidden="true" />
              <span>Libraries &amp; Community</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }} aria-labelledby="how-it-works-title">
        <div className="container">
          <div className="section-header text-center">
            <h2 id="how-it-works-title" className="section-title">
              How AccessBrief Works
            </h2>
            <p className="section-subtitle">
              Built on transparency: we never provide vague "accessible" labels when vital details remain unverified.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number" aria-hidden="true">1</div>
              <h3>Find Your Destination</h3>
              <p>
                Search public facilities, hospitals, administrative buildings, or stations by name, sector, or accessibility requirement.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number" aria-hidden="true">2</div>
              <h3>Inspect Feature by Feature</h3>
              <p>
                Review itemized records for ramps, door widths, elevator availability, accessible toilets, and audio/tactile wayfinding with explicit audit dates.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number" aria-hidden="true">3</div>
              <h3>Confirm Before You Travel</h3>
              <p>
                Use facility contact numbers and our pre-travel checklist to verify real-time conditions (such as lift maintenance) before heading out.
              </p>
            </div>
          </div>

          {/* Status Legend Box */}
          <div className="status-legend-box" role="region" aria-label="Status definition guide">
            <div className="status-legend-title">
              <ShieldCheck size={22} color="#1d4ed8" aria-hidden="true" />
              <span>Our Transparent Four-Status Verification Framework</span>
            </div>
            <p className="status-legend-desc">
              Every single accessibility dimension is individually rated using one of these four explicit criteria. If an element has not been surveyed, we state <strong>Unknown</strong> rather than making assumptions.
            </p>

            <div className="legend-items-grid">
              <div className="legend-item">
                <div className="legend-item-header">
                  <StatusBadge status="Verified" />
                </div>
                <p>
                  Confirmed by an official municipal access audit or facility inspection within the last 12 months.
                </p>
              </div>

              <div className="legend-item">
                <div className="legend-item-header">
                  <StatusBadge status="User-reported" />
                </div>
                <p>
                  Submitted by visitors or community members with lived experience; pending official audit validation.
                </p>
              </div>

              <div className="legend-item">
                <div className="legend-item-header">
                  <StatusBadge status="Needs rechecking" />
                </div>
                <p>
                  Previously functional, but flagged for maintenance, alteration, or conflicting visitor feedback.
                </p>
              </div>

              <div className="legend-item">
                <div className="legend-item-header">
                  <StatusBadge status="Unknown" />
                </div>
                <p>
                  No audited survey on file. We never mark an unknown feature as accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Places Preview */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-surface)' }} aria-labelledby="featured-places-title">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 id="featured-places-title" className="section-title">
                Sample Public Facilities
              </h2>
              <p className="section-subtitle">
                Inspect prototype briefs across hospitals, government services, transit, and education.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('search')}
            >
              <span>View All {locations.length} Locations</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="locations-grid">
            {featuredLocations.map((loc) => (
              <LocationCard
                key={loc.id}
                location={loc}
                onSelectLocation={onSelectLocation}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('search')}
            >
              <Search size={18} aria-hidden="true" />
              <span>Explore All Verified &amp; Surveyed Locations</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
