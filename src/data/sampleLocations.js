/**
 * AccessBrief Sample Demonstration Data
 * 
 * IMPORTANT: All records and accessibility entries in this file are FICTIONAL DEMONSTRATION DATA
 * created solely for user-interface prototyping, student presentations, and judging evaluations.
 * They do not reflect real-world verification or surveyed facility conditions.
 */

export const DEMO_NOTICE = {
  isDemo: true,
  title: "Fictional Demonstration Prototype",
  message: "All locations and accessibility data shown here are simulated for prototype evaluation. In a real-world scenario, always call the venue directly before travelling to confirm current access conditions."
};

export const CATEGORIES = [
  { id: "all", label: "All Categories", icon: "Building2" },
  { id: "hospitals", label: "Hospitals & Healthcare", icon: "HeartPulse" },
  { id: "government", label: "Government Offices", icon: "Landmark" },
  { id: "education", label: "Educational Institutions", icon: "GraduationCap" },
  { id: "public_facilities", label: "Public Facilities & Transit", icon: "Bus" },
  { id: "community", label: "Libraries & Community", icon: "BookOpen" }
];

export const STATUS_TYPES = {
  VERIFIED: {
    key: "Verified",
    label: "Verified",
    badgeClass: "status-verified",
    description: "Audited or confirmed by municipal inspection or verified facility audit within the last 12 months.",
    color: "#15803d",
    bg: "#dcfce7"
  },
  USER_REPORTED: {
    key: "User-reported",
    label: "User-reported",
    badgeClass: "status-user-reported",
    description: "Contributed by visitors or community members; waiting for official verification.",
    color: "#0369a1",
    bg: "#e0f2fe"
  },
  NEEDS_RECHECKING: {
    key: "Needs rechecking",
    label: "Needs rechecking",
    badgeClass: "status-needs-recheck",
    description: "Previously recorded, but reported under maintenance, alteration, or pending recent review.",
    color: "#b45309",
    bg: "#fef3c7"
  },
  UNKNOWN: {
    key: "Unknown",
    label: "Unknown",
    badgeClass: "status-unknown",
    description: "No current surveyed data available. We do not assume accessibility.",
    color: "#475569",
    bg: "#f1f5f9"
  }
};

export const INITIAL_LOCATIONS = [
  {
    id: "loc-01",
    isDemo: true,
    name: "Sassoon General Hospital (New Outpatient Wing)",
    category: "hospitals",
    categoryLabel: "Hospitals & Healthcare",
    address: "Near Pune Railway Station, Sassoon Road, Pune 411001",
    neighborhood: "Pune Station / Sangamwadi",
    phone: "+91 (020) 2612-8000",
    email: "outpatients@sassoon-demo.pune.gov.in",
    website: "https://pune.gov.in/sassoon-hospital",
    accessibilityContact: "Patient Access Helpdesk (Counter 1)",
    openingHours: "Mon – Fri: 08:00 – 17:00 | Sat: 08:00 – 13:00 | Emergency: 24/7",
    summaryNote: "Primary entrance and outpatient clinics are fully step-free with automated doors. Elevator access to upper consultation floors is verified.",
    preTravelAdvice: "If arriving for physiotherapy or dialysis, enter via Gate 2 on Sassoon Road for direct flat ramp access to outpatient registration.",
    lastUpdated: "2026-01-12",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Verified",
        lastChecked: "2026-01-12",
        source: "Municipal Healthcare Access Audit 2026",
        details: "Main outpatient entrance is completely step-free with automatic sliding double doors (clear width 940mm). Gentle approach ramp with non-slip grooved stone and dual handrails."
      },
      lift: {
        featureName: "Lift availability",
        status: "Verified",
        lastChecked: "2026-01-12",
        source: "Municipal Healthcare Access Audit 2026",
        details: "4 high-capacity passenger lifts serving all outpatient floors. Features voice announcement of floors, braille/raised buttons at 1000mm height, and visual doorway sensors."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "Verified",
        lastChecked: "2026-01-12",
        source: "Municipal Healthcare Access Audit 2026",
        details: "Unisex accessible toilets on Ground, 1st, and 2nd floors. Outward opening door (890mm width), transfer space on right, dual horizontal and drop-down grab rails, red emergency pull cord hanging 100mm from floor."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "Verified",
        lastChecked: "2026-01-12",
        source: "Municipal Healthcare Access Audit 2026",
        details: "Corridors are 1.9m wide with low-friction hospital grade vinyl flooring. Zero threshold transitions between consultation suites. Rest seating benches spaced every 25 meters."
      },
      services: {
        featureName: "Relevant service information",
        status: "Verified",
        lastChecked: "2026-01-12",
        source: "Hospital Patient Services Desk",
        details: "Free transit wheelchairs available at main reception without pre-booking. Volunteer guides available Mon–Fri 08:30–16:00. Quiet sensory waiting room located adjacent to Room 104."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "User-reported",
        lastChecked: "2026-02-04",
        source: "Community Review #102 (Visitor with Hearing Aid)",
        details: "Fixed telecoil induction loop installed at Admissions Counters 1 and 2. High contrast signage throughout hallways, though digital appointment call screens are slightly high on wall."
      }
    },
    communityUpdates: [
      {
        id: "rep-01-1",
        date: "2026-02-04",
        userRole: "Visitor",
        featureKey: "visualHearing",
        featureName: "Visual & hearing accessibility",
        statusClaim: "User-reported",
        note: "Reception staff switched on hearing loop promptly when asked. Queue call display also has clear audio chimes."
      }
    ]
  },
  {
    id: "loc-02",
    isDemo: true,
    name: "Pune Municipal Corporation (PMC) Citizen Facilitation Centre",
    category: "government",
    categoryLabel: "Government Offices",
    address: "PMC Main Building, Shivajinagar, Pune 411005",
    neighborhood: "Shivajinagar",
    phone: "+91 (020) 2550-1000",
    email: "cfc@punecorporation-demo.org",
    website: "https://pmc.gov.in/en/accessibility",
    accessibilityContact: "City Accessibility Liaison Officer",
    openingHours: "Mon – Fri: 09:30 – 17:30 | Closed 2nd & 4th Saturdays",
    summaryNote: "Level access to the main service concourse and public records. Note: Lift 2 is currently undergoing scheduled overhaul.",
    preTravelAdvice: "Citizen service counters on Ground Floor are accessible. If visiting upper floor committee rooms, verify Lift 1 availability with security on arrival.",
    lastUpdated: "2026-02-02",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Verified",
        lastChecked: "2025-11-15",
        source: "City Compliance Engineering Inspection",
        details: "Primary plaza entrance offers zero-threshold flush entry with automated push-pad activation. Wide automatic revolving door plus adjacent wide sliding door for mobility aids."
      },
      lift: {
        featureName: "Lift availability",
        status: "Needs rechecking",
        lastChecked: "2026-02-02",
        source: "Visitor Maintenance Report #411",
        details: "North lift undergoing scheduled cable maintenance until late February. South lift is operational but button contrast is somewhat faded; audio announcement operates normally."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "Verified",
        lastChecked: "2025-11-15",
        source: "City Compliance Engineering Inspection",
        details: "Ground floor dedicated accessible restroom with sensor taps, lever flush, transfer space on left side, and high-visibility contrasting toilet seat."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "User-reported",
        lastChecked: "2026-01-18",
        source: "Community Contributor #89",
        details: "Ground floor hall is completely open with smooth terrazzo tiles. The secondary connector corridor to the Annex has two fire doors that require manual pull pressure."
      },
      services: {
        featureName: "Relevant service information",
        status: "Verified",
        lastChecked: "2025-11-15",
        source: "Department of Citizen Services",
        details: "Lowered transaction counters (height 760mm with knee clearance) at Windows 4 and 5. Priority ticketing system allows visitors with mobility needs to be called without standing."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "Unknown",
        lastChecked: "2025-11-15",
        source: "Not surveyed",
        details: "No verified test on hearing loops in council chambers. Braille room signage is installed on primary department doors but not on temporary partition cubicles."
      }
    },
    communityUpdates: []
  },
  {
    id: "loc-03",
    isDemo: true,
    name: "Pune City Central Library & Learning Hub",
    category: "community",
    categoryLabel: "Libraries & Community",
    address: "Near Deccan Gymkhana, F.C. Road, Pune 411004",
    neighborhood: "Deccan / F.C. Road",
    phone: "+91 (020) 2567-4411",
    email: "info@punecentrallibrary-demo.org",
    website: "https://punelibrary-demo.org",
    accessibilityContact: "Library Inclusion Coordinator",
    openingHours: "Mon – Thu: 09:00 – 20:00 | Fri – Sat: 09:00 – 17:00 | Sun: 12:00 – 16:00",
    summaryNote: "Comprehensive physical accessibility across all public floors. Assistive tech workstations and sensory quiet room available on 2nd floor.",
    preTravelAdvice: "Designated accessible parking is located at the rear on Library Lane with ramp direct to the secondary ground entrance.",
    lastUpdated: "2026-01-20",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Verified",
        lastChecked: "2025-08-20",
        source: "Public Facilities Accessibility Survey 2025",
        details: "Front entrance ramp has 1:15 gradient with continuous smooth stainless-steel handrails on both sides and non-slip textured stone finish."
      },
      lift: {
        featureName: "Lift availability",
        status: "Verified",
        lastChecked: "2025-08-20",
        source: "Public Facilities Accessibility Survey 2025",
        details: "Spacious central glass elevator connecting Ground, Mezzanine, and Level 2. Mirror on back wall, auditory floor announcements, and tactile floor indicators."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "Needs rechecking",
        lastChecked: "2026-01-10",
        source: "User Submission #204",
        details: "Ground floor accessible restroom was temporarily locked for plumbing fixtures maintenance in January. Library staff indicated alternate accessible facility in child wing."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "Verified",
        lastChecked: "2025-08-20",
        source: "Public Facilities Accessibility Survey 2025",
        details: "Book stacks spaced at minimum 1.25m clearance. Low-pile industrial carpeting allows effortless wheelchair roll. Motorized height-adjustable research desks available."
      },
      services: {
        featureName: "Relevant service information",
        status: "Verified",
        lastChecked: "2025-08-20",
        source: "Westlake Library Management",
        details: "Dedicated Assistive Technology suite with screen reading software (NVDA/JAWS), electronic video magnifiers, high-contrast keyboards, and tactile printer. Quiet sensory hour Wednesdays 9-10 AM."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "User-reported",
        lastChecked: "2026-02-14",
        source: "Community Contributor #14",
        details: "Audio induction loop is functional in the community hall auditorium. Clear high-contrast directional signage on end-of-stack markers."
      }
    },
    communityUpdates: []
  },
  {
    id: "loc-04",
    isDemo: true,
    name: "Savitribai Phule Pune University - Technology & Science Complex",
    category: "education",
    categoryLabel: "Educational Institutions",
    address: "Ganeshkhind Road, University Campus, Pune 411007",
    neighborhood: "Ganeshkhind",
    phone: "+91 (020) 2562-1100",
    email: "disabilitycell@unipune-demo.ac.in",
    website: "https://unipune.ac.in/access",
    accessibilityContact: "University Equal Opportunity Cell",
    openingHours: "Mon – Fri: 08:00 – 20:00 | Sat: 09:00 – 17:00 | Closed Sun",
    summaryNote: "Modern educational facility with dedicated lecture theatre wheelchair spaces and step-free south access. North steps lack ramp.",
    preTravelAdvice: "Do not use the historic North portico entrance (18 stone steps). Use South Quad entrance via paved level walkway.",
    lastUpdated: "2026-01-22",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Verified",
        lastChecked: "2025-10-05",
        source: "Campus Facilities Annual Review",
        details: "South Quad entrance provides gentle ramp approach (1:16) with push-pad automated door opening and wide threshold clearance (960mm)."
      },
      lift: {
        featureName: "Lift availability",
        status: "Verified",
        lastChecked: "2025-10-05",
        source: "Campus Facilities Annual Review",
        details: "Centrally located passenger elevator serves basement laboratories through to 4th floor seminar rooms. Features voice synthesizer and embossed button numerals."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "User-reported",
        lastChecked: "2025-11-19",
        source: "Student Union Access Officer",
        details: "Accessible single-cubicle washroom on ground floor opposite Lecture Hall 101. Features drop-down rail, but lock lever requires firm twist."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "Needs rechecking",
        lastChecked: "2026-01-22",
        source: "Department Facilities Memo",
        details: "Temporary electrical cabling covers and scaffolding near the East corridor entrance may create a localized 850mm pinch point until end of term."
      },
      services: {
        featureName: "Relevant service information",
        status: "Verified",
        lastChecked: "2025-10-05",
        source: "University Facilities Access Guide",
        details: "Wheelchair spaces with power outlets integrated into Lecture Theatres 101 & 102. Adjustable height laboratory benches in Chem Lab 3. Service animals welcome with indoor relief water bowls."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "Unknown",
        lastChecked: "2025-10-05",
        source: "Not surveyed",
        details: "Hearing loop compatibility in smaller tutorial rooms is not formally documented. Tactile paving present at top of main stairwell only."
      }
    },
    communityUpdates: []
  },
  {
    id: "loc-05",
    isDemo: true,
    name: "Pune Metro Intermodal Transit Terminal (Civil Court Station)",
    category: "public_facilities",
    categoryLabel: "Public Facilities & Transit",
    address: "Old Pune-Mumbai Highway, Shivajinagar, Pune 411005",
    neighborhood: "Civil Court Interchange",
    phone: "+91 (020) 2605-8811",
    email: "accessibility@punemetro-demo.gov.in",
    website: "https://punemetrorail.org/accessibility",
    accessibilityContact: "Station Duty Passenger Assistance Staff",
    openingHours: "Daily: 06:00 – 23:00 (Staffed throughout operational hours)",
    summaryNote: "Key multimodal interchange hub. All metro platforms connected by dual high-capacity lifts and tactile guidance paths.",
    preTravelAdvice: "For manual wheelchair ramp boarding onto suburban trains or metro coaches, notify staff at the Customer Information Desk 10 minutes prior.",
    lastUpdated: "2026-02-05",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Verified",
        lastChecked: "2025-12-01",
        source: "Maharashtra Metro Rail Corporation Audit",
        details: "Completely flush level access from passenger drop-off taxi rank and adjacent bus bays straight onto ticketing concourse."
      },
      lift: {
        featureName: "Lift availability",
        status: "Verified",
        lastChecked: "2025-12-01",
        source: "Maharashtra Metro Rail Corporation Audit",
        details: "Two independent elevator shafts connecting concourse bridge to Line 1 and Line 2 platforms. Glass cabin design, illuminated buttons with braille, and audible arrival announcements."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "Needs rechecking",
        lastChecked: "2026-02-05",
        source: "Commuter Feedback #883",
        details: "Public accessible restroom requires a key or staff buzzer from customer service desk; latch reported loose on 5 Feb. Maintenance ticket issued."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "Verified",
        lastChecked: "2025-12-01",
        source: "Maharashtra Metro Rail Corporation Audit",
        details: "Wide automated ticket barrier (1020mm clear width) always staffed. Smooth granite concourse with non-slip treatment. Tactile ground surface indicator (TGSI) strips lead from entrance to ticket gates."
      },
      services: {
        featureName: "Relevant service information",
        status: "Verified",
        lastChecked: "2025-12-01",
        source: "Station Operations Manual",
        details: "Dedicated Passenger Assist Help Points on every platform. Staff trained in manual boarding ramp deployment and assistance for blind/low-vision commuters."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "Verified",
        lastChecked: "2025-12-01",
        source: "Maharashtra Metro Rail Corporation Audit",
        details: "Full visual departure screens accompanied by synchronized audio public address. Bright yellow tactile warning blisters along all platform edges (600mm from rail edge)."
      }
    },
    communityUpdates: []
  },
  {
    id: "loc-06",
    isDemo: true,
    name: "Shivajinagar District & Sessions Court",
    category: "government",
    categoryLabel: "Government Offices",
    address: "Court Road, Shivajinagar, Pune 411005",
    neighborhood: "Shivajinagar Judicial Quarter",
    phone: "+91 (020) 2553-6740",
    email: "clerksoffice@punecourt-demo.gov.in",
    website: "https://districts.ecourts.gov.in/pune",
    accessibilityContact: "District Court Clerk & Accessibility Officer",
    openingHours: "Mon – Fri: 10:00 – 17:30 | Closed 2nd & 4th Saturdays",
    summaryNote: "Historic building with partial modern accessibility adaptations. Accessible entrance is via the East Gate, not the monumental front portico.",
    preTravelAdvice: "The historic monumental front steps do not have a ramp. Ring the security buzzer at the East Gate side entrance for level ramp access and security screening.",
    lastUpdated: "2026-01-12",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Needs rechecking",
        lastChecked: "2026-01-12",
        source: "Legal Aid Visitor Submission",
        details: "Accessible entrance on East Gate requires buzzing security intercom which is positioned at 1350mm height (slightly high for seated users). Ramp has 1:12 gradient."
      },
      lift: {
        featureName: "Lift availability",
        status: "User-reported",
        lastChecked: "2025-12-08",
        source: "Pune Bar Association Accessibility Committee",
        details: "Retrofit lift operates to 2nd-floor courtrooms. Cabin size is compact (1150mm x 1400mm) which allows standard wheelchair turning with care. Buttons have raised numbers."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "Unknown",
        lastChecked: "2025-12-08",
        source: "Not surveyed",
        details: "No verified survey on file for public restrooms in the basement or 2nd floor court wing. Users report a ground floor facility exists behind Registry Counter B."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "User-reported",
        lastChecked: "2025-12-08",
        source: "Pune Bar Association Accessibility Committee",
        details: "Heavy solid oak doors leading into Courtrooms 1 and 2 require approximately 35N opening force; security officers assist visitors on request."
      },
      services: {
        featureName: "Relevant service information",
        status: "Verified",
        lastChecked: "2025-09-14",
        source: "Court Administrative Rules",
        details: "Computer Assisted Real-Time Transcription (CART) and certified sign language interpreter services available for all proceedings with 48 hours prior notice to the clerk."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "Needs rechecking",
        lastChecked: "2026-01-12",
        source: "Legal Aid Visitor Submission",
        details: "Courtroom 2 has an installed assistive listening system. Courtrooms 1 and 3 rely on portable radio frequency receivers which must be requested at clerk reception."
      }
    },
    communityUpdates: []
  },
  {
    id: "loc-07",
    isDemo: true,
    name: "Aundh District Community Health & Therapy Centre",
    category: "hospitals",
    categoryLabel: "Hospitals & Healthcare",
    address: "Old DP Road, Near Medipoint, Aundh, Pune 411027",
    neighborhood: "Aundh",
    phone: "+91 (020) 2729-3456",
    email: "reception@aundhhealth-demo.org",
    website: "https://aundhhealth-demo.org",
    accessibilityContact: "Centre Practice Manager",
    openingHours: "Mon – Fri: 08:30 – 18:30 | Sat: 09:00 – 13:00",
    summaryNote: "Modern single-story primary care facility. Zero steps throughout with dedicated accessible exam rooms and ceiling tracking hoist.",
    preTravelAdvice: "Step-free throughout. 4 designated wide accessible parking bays right in front of the automatic entrance sliding glass doors.",
    lastUpdated: "2026-01-18",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Verified",
        lastChecked: "2026-01-18",
        source: "Primary Care Quality Inspection 2026",
        details: "Completely flat zero-threshold entrance with overhead infrared sensor sliding glass doors (clear width 1000mm). Sheltered canopy covering drop-off area."
      },
      lift: {
        featureName: "Lift availability",
        status: "Verified",
        lastChecked: "2026-01-18",
        source: "Primary Care Quality Inspection 2026",
        details: "Facility is built entirely on a single ground floor level. No stairs or lifts are required to access any clinical, consultation, or reception areas."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "Verified",
        lastChecked: "2026-01-18",
        source: "Primary Care Quality Inspection 2026",
        details: "Spacious accessible restroom equipped with both fixed and folding support rails, hands-free sensor basin, emergency alarm cord, and baby changing bench."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "Verified",
        lastChecked: "2026-01-18",
        source: "Primary Care Quality Inspection 2026",
        details: "Corridors are 2.0m wide with seamless slip-resistant resilient flooring. All clinic room doors have lever handles and clear opening widths of 900mm."
      },
      services: {
        featureName: "Relevant service information",
        status: "Verified",
        lastChecked: "2026-01-18",
        source: "Clinic Practice Manager",
        details: "Treatment Room 3 features an overhead electric ceiling track hoist (safe working load 200kg) and motorized height-adjustable examination couch. Bariatric seating in waiting lounge."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "User-reported",
        lastChecked: "2026-02-02",
        source: "Patient Feedback Form",
        details: "Hearing loop active at reception window. Large print intake forms provided upon request. Low-glare LED lighting designed for sensory comfort."
      }
    },
    communityUpdates: []
  },
  {
    id: "loc-08",
    isDemo: true,
    name: "Shree Shiv Chhatrapati Sports Complex & Aquatic Centre",
    category: "public_facilities",
    categoryLabel: "Public Facilities & Transit",
    address: "Balewadi Stadium Road, Mahalunge, Pune 411045",
    neighborhood: "Balewadi",
    phone: "+91 (020) 2737-7722",
    email: "aquatics@balewadisports-demo.org",
    website: "https://balewadisports-demo.org",
    accessibilityContact: "Sports Complex Duty Manager & Inclusive Sports Officer",
    openingHours: "Mon – Fri: 06:00 – 21:30 | Sat – Sun: 07:00 – 19:00",
    summaryNote: "Public recreation facility with hydraulic pool hoist, Changing Places certified accessible changing room, and elevator to gym.",
    preTravelAdvice: "If using the pool hoist or Changing Places facility, call the duty lifeguard in advance so equipment is checked and positioned for your arrival.",
    lastUpdated: "2026-01-24",
    features: {
      entrance: {
        featureName: "Step-free entrance / ramp",
        status: "Verified",
        lastChecked: "2025-10-30",
        source: "Municipal Parks & Recreation Access Review",
        details: "Wide gently sloping entrance path from accessible car park bays. Double automated sliding doors with visual safety contrast markings at two heights."
      },
      lift: {
        featureName: "Lift availability",
        status: "Verified",
        lastChecked: "2025-10-30",
        source: "Municipal Parks & Recreation Access Review",
        details: "Passenger elevator provides direct access to upper gym, dance studio, and spectator viewing balcony. Braille call buttons and audible chimes."
      },
      toilet: {
        featureName: "Accessible toilet",
        status: "Verified",
        lastChecked: "2025-10-30",
        source: "Municipal Parks & Recreation Access Review",
        details: "Includes a certified Changing Places facility featuring a height-adjustable adult changing bench, full-room ceiling hoist, privacy screen, and accessible shower."
      },
      internalRoutes: {
        featureName: "Internal accessibility and routes",
        status: "User-reported",
        lastChecked: "2026-01-24",
        source: "Inclusive Swimming Club Review",
        details: "Wide wet-area corridors with anti-slip textured tiles. Ramped entry into 25m training pool; main leisure pool has a portable hydraulic pool lift chair."
      },
      services: {
        featureName: "Relevant service information",
        status: "Needs rechecking",
        lastChecked: "2026-02-15",
        source: "Community Member Report",
        details: "Fitness suite has 2 wheelchair-accessible upper body ergometers, but one was flagged for pedal tension calibration in mid-February."
      },
      visualHearing: {
        featureName: "Visual & hearing accessibility",
        status: "Unknown",
        lastChecked: "2025-10-30",
        source: "Not surveyed",
        details: "Main sports arena acoustic echo levels are high; public address audibility has not been formally tested for assistive listening reception."
      }
    },
    communityUpdates: []
  }
];
