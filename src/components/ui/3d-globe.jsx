import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

/**
 * Globe3D Component
 * 
 * Supports:
 * - markers: Array of { lat, lng, label, size, color }
 * - config: {
 *     atmosphereColor,
 *     atmosphereIntensity,
 *     bumpScale,
 *     autoRotateSpeed,
 *     radius,
 *     globeColor,
 *     showAtmosphere,
 *     enableZoom
 *   }
 * - Imperative controls via ref:
 *     flyTo({ lat, lng, altitude, duration })
 *     setRotation({ x, y })
 *     setAutoRotate(boolean)
 */

export const Globe3D = forwardRef(function Globe3D(
  {
    markers = [],
    config = {},
    activeMarkerId = null,
    onMarkerClick = null,
    className = '',
    style = {}
  },
  ref
) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    globeGroup: null,
    atmosphereMesh: null,
    markerObjects: [],
    animating: true,
    autoRotate: true,
    autoRotateSpeed: config.autoRotateSpeed ?? 0.35,
    currentRotation: { x: 0.25, y: 0 },
    targetRotation: { x: 0.25, y: 0 },
    cameraDistance: 3.8,
    targetDistance: 3.8,
    isTransitioning: false,
    transitionStart: 0,
    transitionDuration: 1000,
    startRotation: { x: 0, y: 0 },
    startDistance: 3.8,
    reqId: null
  });

  // Expose imperative API for camera travel
  useImperativeHandle(ref, () => ({
    flyTo: ({ lat, lng, distance = 2.2, duration = 2000 }) => {
      const state = stateRef.current;
      if (!state.globeGroup) return;

      state.autoRotate = false;
      state.isTransitioning = true;
      state.transitionStart = performance.now();
      state.transitionDuration = duration;

      state.startRotation = {
        x: state.currentRotation.x,
        y: state.currentRotation.y
      };
      state.startDistance = state.cameraDistance;
      state.targetDistance = distance;

      // Calculate globe rotation needed to bring (lat, lng) to face the camera
      // Latitude rotates around X axis, Longitude rotates around Y axis
      const radLat = (lat * Math.PI) / 180;
      const radLng = (lng * Math.PI) / 180;

      // Bring target latitude to center
      const targetX = radLat * 0.85;
      
      // Bring target longitude to front (facing -Z or +Z depending on camera setup)
      // We normalize longitude rotation to take the shortest angular path
      let targetY = -radLng - Math.PI / 2;
      const currentY = state.currentRotation.y;
      
      // Calculate shortest angle path
      const twoPi = Math.PI * 2;
      const diff = ((targetY - currentY) % twoPi + twoPi * 1.5) % twoPi - Math.PI;
      targetY = currentY + diff;

      state.targetRotation = {
        x: targetX,
        y: targetY
      };
    },
    setAutoRotate: (val, speed) => {
      const state = stateRef.current;
      state.autoRotate = val;
      if (speed !== undefined) state.autoRotateSpeed = speed;
    },
    resetToOrbit: (distance = 3.8, duration = 1500) => {
      const state = stateRef.current;
      state.isTransitioning = true;
      state.transitionStart = performance.now();
      state.transitionDuration = duration;
      state.startDistance = state.cameraDistance;
      state.targetDistance = distance;
      state.startRotation = { ...state.currentRotation };
      state.targetRotation = { x: 0.3, y: state.currentRotation.y + 1.2 };
      setTimeout(() => {
        state.autoRotate = true;
      }, duration);
    }
  }));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, stateRef.current.cameraDistance);

    // 3. WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed:', e);
      return;
    }

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xdce8d7, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf7f3e8, 2.2);
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8ea795, 1.4);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 5. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 6. Procedural Landmass & Grid Texture Canvas
    // Using palette: Ocean = #0e1b17, Land = #183d32 & #245143, Grids = #8ea795
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 2048;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext('2d');

    // Ocean deep forest charcoal
    ctx.fillStyle = config.globeColor || '#0c1814';
    ctx.fillRect(0, 0, 2048, 1024);

    // Draw subtle latitude/longitude grid graticules
    ctx.strokeStyle = 'rgba(142, 167, 149, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 2048; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Draw continental landmass shapes using vector curves
    ctx.fillStyle = '#183d32'; // Forest green
    ctx.strokeStyle = '#2d5e50';
    ctx.lineWidth = 1.5;

    // Helper to map lon/lat to canvas
    const toXY = (lon, lat) => [
      ((lon + 180) / 360) * 2048,
      ((90 - lat) / 180) * 1024
    ];

    const drawPoly = (coords, fill = true, stroke = true) => {
      if (coords.length === 0) return;
      ctx.beginPath();
      const [startLon, startLat] = coords[0];
      const [sx, sy] = toXY(startLon, startLat);
      ctx.moveTo(sx, sy);
      for (let i = 1; i < coords.length; i++) {
        const [lon, lat] = coords[i];
        const [x, y] = toXY(lon, lat);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    };

    // Major World Continents (Approximate high-clarity stylized shapes)
    // 1. Eurasia & Africa
    drawPoly([
      [-10, 36], [0, 42], [10, 45], [25, 40], [30, 32], [32, 28], [35, 30],
      [45, 12], [50, 14], [58, 25], [60, 23], [68, 24], [72, 20], [78, 8],
      [82, 10], [86, 22], [90, 22], [98, 10], [104, 1], [108, 15], [120, 22],
      [122, 30], [130, 42], [140, 50], [170, 65], [180, 70], [170, 72],
      [100, 75], [60, 70], [30, 70], [15, 60], [5, 52], [-5, 48], [-10, 36]
    ]);

    // Africa
    drawPoly([
      [-17, 15], [-17, 28], [-5, 36], [10, 37], [25, 32], [32, 30], [42, 12],
      [51, 10], [40, -10], [35, -20], [28, -34], [18, -34], [12, -18], [8, 4],
      [-5, 5], [-17, 15]
    ]);

    // North America
    drawPoly([
      [-168, 65], [-140, 60], [-125, 50], [-122, 38], [-115, 30], [-105, 20],
      [-97, 18], [-80, 25], [-80, 32], [-70, 42], [-60, 48], [-65, 58],
      [-80, 62], [-95, 70], [-125, 72], [-168, 65]
    ]);

    // South America
    drawPoly([
      [-80, 10], [-75, 0], [-80, -10], [-72, -35], [-68, -54], [-62, -40],
      [-48, -28], [-35, -6], [-50, 4], [-75, 12], [-80, 10]
    ]);

    // Australia
    drawPoly([
      [114, -22], [115, -34], [132, -32], [140, -38], [150, -35], [152, -24],
      [145, -15], [135, -12], [122, -16], [114, -22]
    ]);

    // Highlight: Detailed Indian Subcontinent polygon
    // Lat range: 8°N to 36°N, Long range: 68°E to 90°E
    ctx.fillStyle = '#235344'; // Slightly brighter emerald for India
    ctx.strokeStyle = '#dce8d7'; // Soft sage contour
    ctx.lineWidth = 2.5;
    drawPoly([
      [68.5, 23.5], [70.5, 21.0], [72.8, 19.0], [73.8, 15.5], [75.0, 13.0],
      [77.5, 8.1], // Kanyakumari
      [79.8, 10.5], [80.3, 13.0], [82.5, 17.0], [85.0, 19.5], [87.0, 21.5],
      [89.0, 22.0], [92.5, 21.0], [95.0, 26.0], [91.5, 28.0], [88.5, 27.5],
      [85.5, 27.0], [80.5, 30.5], [77.0, 35.5], [74.0, 36.5], [72.0, 33.0],
      [70.0, 28.5], [68.5, 23.5]
    ], true, true);

    // Subtle star dust overlay on continent canvas
    ctx.fillStyle = 'rgba(247, 243, 232, 0.4)';
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * 2048;
      const ry = Math.random() * 1024;
      ctx.fillRect(rx, ry, 1.2, 1.2);
    }

    const globeTexture = new THREE.CanvasTexture(textureCanvas);
    globeTexture.colorSpace = THREE.SRGBColorSpace;

    // 7. Globe Sphere Mesh
    const sphereRadius = 1.0;
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      map: globeTexture,
      roughness: 0.75,
      metalness: 0.15,
      bumpScale: config.bumpScale ?? 0.05
    });

    const globeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(globeMesh);

    // 8. Thin Atmospheric Glow Outer Sphere (Custom Shader)
    const atmoColor = new THREE.Color(config.atmosphereColor || '#4d7a68');
    const atmosphereGeometry = new THREE.SphereGeometry(sphereRadius * 1.06, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 color;
        uniform float intensity;
        void main() {
          float glow = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          gl_FragColor = vec4(color, glow * intensity);
        }
      `,
      uniforms: {
        color: { value: atmoColor },
        intensity: { value: config.atmosphereIntensity ?? 0.8 }
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });

    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // 9. Coordinate to 3D Sphere conversion
    const latLngToVector3 = (lat, lng, radiusOffset = 0.015) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const r = sphereRadius + radiusOffset;
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 10. Markers (e.g. Pune beacon)
    const markerGroup = new THREE.Group();
    globeGroup.add(markerGroup);

    markers.forEach((m) => {
      const pos = latLngToVector3(m.lat, m.lng, 0.01);

      // Core luminous dot (warm ivory)
      const pinGeo = new THREE.SphereGeometry(0.024, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xf7f3e8 });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      markerGroup.add(pinMesh);

      // Pulsing outer beacon ring (coral)
      const ringGeo = new THREE.RingGeometry(0.03, 0.046, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(m.color || '#e87961'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      markerGroup.add(ringMesh);

      // Secondary wider radar ripple ring
      const rippleGeo = new THREE.RingGeometry(0.05, 0.062, 32);
      const rippleMat = new THREE.MeshBasicMaterial({
        color: 0xdce8d7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
      rippleMesh.position.copy(pos);
      rippleMesh.lookAt(pos.clone().multiplyScalar(2));
      markerGroup.add(rippleMesh);

      stateRef.current.markerObjects.push({
        pinMesh,
        ringMesh,
        rippleMesh,
        baseScale: 1
      });
    });

    // 11. Subtle Starfield Particles in background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 300;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 40;
      starCoords[i + 1] = (Math.random() - 0.5) * 40;
      starCoords[i + 2] = -5 - Math.random() * 25;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0x8ea795,
      size: 0.08,
      transparent: true,
      opacity: 0.45
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Save references to state
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.renderer = renderer;
    stateRef.current.globeGroup = globeGroup;
    stateRef.current.atmosphereMesh = atmosphereMesh;

    // Initial globe orientation
    globeGroup.rotation.x = stateRef.current.currentRotation.x;
    globeGroup.rotation.y = stateRef.current.currentRotation.y;

    // 12. Animation Loop with smooth cubic easing interpolation
    let lastTime = performance.now();

    const animate = (time) => {
      stateRef.current.reqId = requestAnimationFrame(animate);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const state = stateRef.current;

      // Handle programmed flight transition
      if (state.isTransitioning) {
        const elapsed = time - state.transitionStart;
        const progress = Math.min(elapsed / state.transitionDuration, 1);

        // Smooth cubic in-out easing
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        state.currentRotation.x = state.startRotation.x + (state.targetRotation.x - state.startRotation.x) * ease;
        state.currentRotation.y = state.startRotation.y + (state.targetRotation.y - state.startRotation.y) * ease;
        state.cameraDistance = state.startDistance + (state.targetDistance - state.startDistance) * ease;

        if (progress >= 1) {
          state.isTransitioning = false;
        }
      } else if (state.autoRotate) {
        // Slow natural orbital rotation
        state.currentRotation.y += delta * (state.autoRotateSpeed * 0.4);
      }

      // Apply rotation to globe
      if (globeGroup) {
        globeGroup.rotation.x = state.currentRotation.x;
        globeGroup.rotation.y = state.currentRotation.y;
      }

      // Apply camera zoom distance
      if (camera) {
        camera.position.z = state.cameraDistance;
      }

      // Animate pulsing radar marker rings
      const pulseTime = time * 0.003;
      state.markerObjects.forEach((mObj, idx) => {
        const s1 = 1 + 0.25 * Math.sin(pulseTime * 2 + idx);
        mObj.ringMesh.scale.set(s1, s1, s1);

        const s2 = 1 + 0.4 * Math.sin(pulseTime * 2 + Math.PI / 2);
        mObj.rippleMesh.scale.set(s2, s2, s2);
        mObj.rippleMesh.material.opacity = 0.3 + 0.3 * Math.cos(pulseTime * 2);
      });

      renderer.render(scene, camera);
    };

    stateRef.current.reqId = requestAnimationFrame(animate);

    // 13. Window resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const nw = container.clientWidth || window.innerWidth;
      const nh = container.clientHeight || window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (stateRef.current.reqId) {
        cancelAnimationFrame(stateRef.current.reqId);
      }
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      globeTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starsGeo.dispose();
      starsMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`globe-3d-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style
      }}
      aria-hidden="true"
    />
  );
});

export default Globe3D;
