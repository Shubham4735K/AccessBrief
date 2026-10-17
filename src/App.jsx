import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoBanner from './components/DemoBanner';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import ReportUpdateModal from './components/ReportUpdateModal';
import GlobeOpeningIntro from './components/GlobeOpeningIntro';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import { INITIAL_LOCATIONS } from './data/sampleLocations';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'search' | 'detail' | 'how-it-works' | 'about'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Cinematic 3D Opening Intro state (session-persisted)
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('accessbrief_intro_completed');
    } catch (e) {
      return false;
    }
  });

  // Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalLocation, setReportModalLocation] = useState(null);
  const [reportModalFeature, setReportModalFeature] = useState(null);

  // Toast confirmation message
  const [toastMessage, setToastMessage] = useState(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedLocation]);

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    if (viewId !== 'detail') {
      setSelectedLocation(null);
    }
  };

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setCurrentView('detail');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedLocation(null);
  };

  const handleHomeSearch = (query, category) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setCurrentView('search');
  };

  const handleOpenReport = (loc = null, featureKey = null) => {
    setReportModalLocation(loc);
    setReportModalFeature(featureKey);
    setIsReportModalOpen(true);
  };

  const handleCloseReport = () => {
    setIsReportModalOpen(false);
    setReportModalLocation(null);
    setReportModalFeature(null);
  };

  const handleSubmitReport = (newReport) => {
    // Dynamically update location in React state so user immediately sees simulation
    setLocations((prevLocations) =>
      prevLocations.map((loc) => {
        if (loc.id === newReport.locationId) {
          const updatedUpdates = [newReport, ...(loc.communityUpdates || [])];

          // If updating an existing known feature, set its status to User-reported or Needs rechecking
          const existingFeature = loc.features?.[newReport.featureKey];
          let updatedFeatures = { ...loc.features };

          if (existingFeature) {
            updatedFeatures[newReport.featureKey] = {
              ...existingFeature,
              status: newReport.statusClaim.includes('Verified') ? 'User-reported' : 'Needs rechecking',
              lastChecked: newReport.date,
              source: `Simulated User Submission (${newReport.userRole})`
            };
          }

          const updatedLoc = {
            ...loc,
            features: updatedFeatures,
            communityUpdates: updatedUpdates
          };

          // If this is the active detail view, keep it synced
          if (selectedLocation && selectedLocation.id === loc.id) {
            setSelectedLocation(updatedLoc);
          }

          return updatedLoc;
        }
        return loc;
      })
    );

    setToastMessage(`Simulated submission successful! Your report for "${newReport.featureName}" has been logged in this session.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <>
      {/* Accessible skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Cinematic 3D Opening Animation (Earth -> India -> Pune) */}
      {showIntro && (
        <GlobeOpeningIntro
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Persistent Demo Prototype Warning Banner */}
      <DemoBanner />

      {/* Accessibility Toolbar: Text Scaling and High Contrast */}
      <AccessibilityToolbar />

      {/* Main Header / Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenGeneralReport={() => handleOpenReport(null, null)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Global Success Notification Toast */}
      {toastMessage && (
        <div className="container" style={{ marginTop: '16px' }}>
          <aside className="alert-toast" role="status" aria-live="polite">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={20} color="#15803d" aria-hidden="true" />
              <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#15803d',
                padding: '4px'
              }}
              aria-label="Dismiss message"
            >
              <X size={18} />
            </button>
          </aside>
        </div>
      )}

      {/* Active View Container */}
      {currentView === 'home' && (
        <HomePage
          locations={locations}
          onSearch={handleHomeSearch}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          onSelectLocation={handleSelectLocation}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'search' && (
        <SearchResultsPage
          locations={locations}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onSelectLocation={handleSelectLocation}
          onOpenReport={handleOpenReport}
        />
      )}

      {currentView === 'detail' && selectedLocation && (
        <LocationDetailPage
          location={selectedLocation}
          onBack={handleBackToSearch}
          onOpenReport={handleOpenReport}
        />
      )}

      {currentView === 'how-it-works' && (
        <HowItWorksPage onNavigate={handleNavigate} />
      )}

      {currentView === 'about' && (
        <AboutPage onNavigate={handleNavigate} />
      )}

      {/* Report & Suggest Update Modal */}
      <ReportUpdateModal
        isOpen={isReportModalOpen}
        onClose={handleCloseReport}
        location={reportModalLocation}
        allLocations={locations}
        preselectedFeature={reportModalFeature}
        onSubmitReport={handleSubmitReport}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onReplayIntro={() => setShowIntro(true)}
      />
    </>
  );
}
