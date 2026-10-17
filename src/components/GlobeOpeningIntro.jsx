import React, { useState, useEffect, useRef } from 'react';
import { Globe3D } from '@/components/ui/3d-globe';
import { MapPin, Navigation, ArrowRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export default function GlobeOpeningIntro({ onComplete }) {
  const [currentScene, setCurrentScene] = useState(1); // 1 = Earth, 2 = India, 3 = Pune
  const [isFadingOut, setIsFadingOut] = useState(false);
  const globeRef = useRef(null);
  const timerRef = useRef([]);

  const PUNE_COORDS = { lat: 18.5204, lng: 73.8567 };
  const INDIA_CENTER = { lat: 21.5, lng: 79.0 };

  const markers = [
    {
      id: 'pune-pin',
      lat: PUNE_COORDS.lat,
      lng: PUNE_COORDS.lng,
      label: 'Pune, Maharashtra',
      color: '#e87961',
      size: 0.08
    }
  ];

  const globeConfig = {
    atmosphereColor: '#4d7a68',
    atmosphereIntensity: 0.75,
    bumpScale: 0.06,
    autoRotateSpeed: 0.25,
    globeColor: '#0a1411',
    radius: 1
  };

  const handleSkipOrComplete = () => {
    setIsFadingOut(true);
    // Persist completed state for current browser session
    try {
      sessionStorage.setItem('accessbrief_intro_completed', 'true');
    } catch (e) {
      // sessionStorage might be restricted in some iframe contexts
    }
    setTimeout(() => {
      onComplete();
    }, 600); // 600ms smooth dissolve fade-out
  };

  // Keyboard navigation: Escape key skips intro
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkipOrComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleSkipOrComplete();
      return;
    }

    // Choreographed cinematic timeline
    // Scene 1: Earth view (0 - 3.2s)
    const t1 = setTimeout(() => {
      setCurrentScene(2);
      // Smoothly travel to India
      if (globeRef.current) {
        globeRef.current.flyTo({
          lat: INDIA_CENTER.lat,
          lng: INDIA_CENTER.lng,
          distance: 2.7,
          duration: 2600
        });
      }
    }, 3200);

    // Scene 2: India approach -> Scene 3: Pune focus (6.8s)
    const t2 = setTimeout(() => {
      setCurrentScene(3);
      // Precision zoom directly to Pune coordinates (lat: 18.5204, lng: 73.8567)
      if (globeRef.current) {
        globeRef.current.flyTo({
          lat: PUNE_COORDS.lat,
          lng: PUNE_COORDS.lng,
          distance: 1.88,
          duration: 2400
        });
      }
    }, 6800);

    timerRef.current = [t1, t2];

    return () => {
      timerRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      className={`cinematic-intro-overlay ${isFadingOut ? 'fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic journey from Earth to Pune"
    >
      {/* Accessible live announcements for screen readers */}
      <div className="sr-only" aria-live="polite">
        {currentScene === 1 && 'Opening sequence scene 1 of 3: Orbital view of Earth. Every journey starts somewhere.'}
        {currentScene === 2 && 'Scene 2 of 3: Traveling across continents toward India.'}
        {currentScene === 3 && 'Scene 3 of 3: Arrived at Pune, Maharashtra. Your city, your access.'}
      </div>

      {/* Top Header Bar with Skip Control */}
      <header className="cinematic-top-bar">
        <div className="cinematic-brand">
          <div className="cinematic-logo-badge" aria-hidden="true">
            <ShieldCheck size={20} color="#e87961" />
          </div>
          <span className="cinematic-brand-text">AccessBrief</span>
        </div>

        <button
          type="button"
          className="btn-skip-intro"
          onClick={handleSkipOrComplete}
          aria-label="Skip introduction and proceed directly to AccessBrief homepage"
        >
          <span>Skip Intro</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </header>

      {/* 3D WebGL Globe Viewport */}
      <div className="cinematic-globe-viewport">
        <Globe3D
          ref={globeRef}
          markers={markers}
          config={globeConfig}
        />
        {/* Soft vignette gradient overlay */}
        <div className="cinematic-vignette" aria-hidden="true" />
      </div>

      {/* Dynamic Narrative Content Overlay */}
      <div className="cinematic-narrative-container">
        {/* Scene 1: Earth */}
        {currentScene === 1 && (
          <div className="cinematic-text-card scene-enter">
            <div className="cinematic-pill-tag">
              <Compass size={14} aria-hidden="true" />
              <span>Global Perspective</span>
            </div>
            <h1 className="cinematic-headline">
              Every journey starts somewhere.
            </h1>
            <p className="cinematic-subline">
              Across the globe, public spaces belong to everyone &mdash; when accessibility information is transparent and verifiable.
            </p>
          </div>
        )}

        {/* Scene 2: India */}
        {currentScene === 2 && (
          <div className="cinematic-text-card scene-enter">
            <div className="cinematic-pill-tag">
              <Navigation size={14} aria-hidden="true" />
              <span>Approaching Destination</span>
            </div>
            <h1 className="cinematic-headline">
              India
            </h1>
            <p className="cinematic-subline">
              Navigating healthcare facilities, civic institutions, and transit hubs across our diverse communities.
            </p>
          </div>
        )}

        {/* Scene 3: Pune */}
        {currentScene === 3 && (
          <div className="cinematic-text-card scene-enter highlight-pune">
            <div className="cinematic-pill-tag tag-coral">
              <MapPin size={15} aria-hidden="true" />
              <span>Pune, Maharashtra &bull; 18.5204&deg; N, 73.8567&deg; E</span>
            </div>
            <h1 className="cinematic-headline text-accent">
              Your city. Your access.
            </h1>
            <p className="cinematic-subline">
              Know before you go. Verified ramps, elevator statuses, tactile paths, and pre-travel checklists for public places in Pune.
            </p>

            <div className="cinematic-cta-wrap">
              <button
                type="button"
                className="btn-explore-pune"
                onClick={handleSkipOrComplete}
                autoFocus
              >
                <span>Explore accessible places</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Scene Stage Dots */}
        <div className="cinematic-dots-progress" role="tablist" aria-label="Intro progression steps">
          <div
            className={`cinematic-dot ${currentScene === 1 ? 'active' : 'completed'}`}
            title="Step 1: Earth"
          />
          <div
            className={`cinematic-dot ${currentScene === 2 ? 'active' : currentScene > 2 ? 'completed' : ''}`}
            title="Step 2: India"
          />
          <div
            className={`cinematic-dot ${currentScene === 3 ? 'active' : ''}`}
            title="Step 3: Pune"
          />
        </div>
      </div>
    </div>
  );
}
