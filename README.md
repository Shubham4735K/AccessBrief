# AccessBrief &mdash; “Know before you go.”

> A clean, modern, user-friendly frontend prototype helping people with disabilities, mobility-aid users, and caregivers check verified accessibility information about public places and citizen services before visiting.

---

## 🌟 Overview & Core Philosophy

Traditional travel and map apps frequently apply vague, binary "Accessible" badges to public venues. This can be dangerous: a public building might have ramped access at an administrative wing, but require stairs to reach courtrooms or public counters; or an elevator might be temporarily undergoing hydraulic maintenance.

**AccessBrief** replaces blanket labels with **feature-by-feature verification**:
- **Zero Guesswork:** If an accessibility dimension has not been evaluated, it is labeled **Unknown**, never assumed accessible.
- **Transparent 4-Status Framework:** Every physical and sensory feature is categorized as **Verified**, **User-reported**, **Needs rechecking**, or **Unknown**.
- **Audit Traceability:** Each verified feature documents the audit date and surveying authority (e.g. municipal health audit, transit inspection).
- **Pre-Travel Confirmation Advice:** Prominent call-ahead reminders, contact phone numbers with one-click copy, and an interactive personal checklist.

---

## 🚀 Key Features

### 1. Home Page
- **Brand & Tagline:** AccessBrief &bull; *"Know before you go."*
- **Prominent Search Bar:** Find public facilities by name, neighborhood, street, or sector.
- **Quick Sector Categories:** Quick-filter pills for Hospitals & Healthcare, Government Offices, Educational Institutions, Public Facilities & Transit, and Libraries & Community Hubs.
- **How It Works (3 Steps):** Clear workflow explanation for first-time visitors.
- **Verification Framework Legend:** Educational overview of the 4 verification statuses.
- **Sample Locations Showcase:** Direct cards to inspect prototype briefs.

### 2. Search & Results
- **Keyword & Sector Filtering:** Live search matching venue titles, addresses, and individual feature specifications.
- **Accessibility Needs Filters:**
  - *Mobility:* Step-free entrance / ramp required, Lift / elevator required, Accessible toilet confirmed.
  - *Sensory:* Tactile indicators, Braille signage, or Hearing loops reported.
  - *Verification Rigor:* Option to show only officially audited **Verified** records.
- **Resilient Empty State:** Clear empty state with instant one-click reset and "Suggest a Place" call-to-action.

### 3. Location Details Page
- **Itemized Feature Breakdown:** Separate rows for:
  - Step-free entrance / ramp (slope gradient, door clearance, automatic push pads)
  - Lift availability (cabin dimensions, braille buttons, voice prompts)
  - Accessible toilet (door swing, grab rails, emergency pull cord height)
  - Internal accessibility and routes (corridor widths, threshold transitions)
  - Relevant service information (wheelchair loans, guide services, sensory hours)
  - Visual & hearing accessibility (hearing loops, tactile paving, alarm chimes)
- **Honest Status Breakdown:** Notice detailing exact feature counts (e.g. *3 verified, 1 user-reported, 1 unknown*).
- **Pre-Travel Advisory & Contact Card:** Facility phone with direct call and copy buttons, liaison name, email, portal link, and a 4-point interactive traveler checklist.
- **Community Updates Log:** Real-time log of field updates submitted by visitors.

### 4. Feedback & Correction Modal
- Simple, accessible dialog allowing users to suggest updates or report inaccuracies for any specific feature.
- Explicit disclosure that submissions in this prototype are simulated in local React state.
- Newly submitted reports immediately update the location's status and appear in the community log.

### 5. Built-in Accessibility Toolbar
- **Text Scaling:** Standard, Large (`A+`), and Extra-Large (`A++`).
- **High Contrast Toggle:** High contrast borders, reinforced text contrast, and WCAG AA/AAA compliance.
- **Keyboard Navigation:** Skip link, visible 3px focus rings, accessible modal dialogs with `Escape` key listeners.

---

## 🏢 Sample Demonstration Data

8 realistic fictional public facilities are preloaded:
1. **Metro Central General Hospital (Outpatient Wing)** &mdash; Hospitals & Healthcare
2. **Civic Administration & Citizen Services Centre** &mdash; Government Offices
3. **Westlake City Central Library & Community Hub** &mdash; Libraries & Community
4. **State University Tech Campus - Science & Arts Hall** &mdash; Educational Institutions
5. **Riverside Intermodal Transit Terminal & Rail Station** &mdash; Public Facilities & Transit
6. **Eastside Municipal Court & Deeds Registry** &mdash; Government Offices
7. **Oakridge Community Health & Therapy Clinic** &mdash; Hospitals & Healthcare
8. **Harborview Public Sports & Aquatic Complex** &mdash; Public Facilities & Transit

*All records are clearly marked `[Demo Data]` for testing and demonstration purposes.*

---

## 🛠️ Project Structure

```
Accessbrief/
├── public/
│   └── favicon.svg               # Accessible SVG brand icon
├── src/
│   ├── components/
│   │   ├── AccessibilityToolbar.jsx # Text size and high-contrast toggles
│   │   ├── DemoBanner.jsx           # Fictional prototype disclaimer banner
│   │   ├── Footer.jsx               # Quick links & hackathon notices
│   │   ├── LocationCard.jsx         # Card with status dots & summary pills
│   │   ├── Navbar.jsx               # Brand logo, tagline & navigation links
│   │   ├── ReportUpdateModal.jsx    # Modal for simulated feedback submission
│   │   └── StatusBadge.jsx          # Color-coded accessible status badge
│   ├── data/
│   │   └── sampleLocations.js       # 8 fictional public venue records
│   ├── pages/
│   │   ├── AboutPage.jsx            # Digital WCAG & physical access standards
│   │   ├── HomePage.jsx             # Hero, search, categories, steps, legend
│   │   ├── HowItWorksPage.jsx       # Verification philosophy & architecture
│   │   ├── LocationDetailPage.jsx   # Itemized rows, contacts & call-ahead card
│   │   └── SearchResultsPage.jsx    # Live search, filters sidebar, empty states
│   ├── styles/
│   │   └── index.css                # CSS design system (Navy, light-blue, green)
│   ├── App.jsx                      # App root, local state & routing
│   └── main.jsx                     # Entry mount
├── package.json
└── vite.config.js
```

---

## 💻 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 🔌 Connecting to a Future Backend

When ready to connect to a production backend (Node.js/Express, Python/FastAPI, Go, or Supabase), the frontend is already pre-structured for these standard REST endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/locations` | `GET` | Retrieve locations with query params (`category`, `needs`, `search`) |
| `/api/v1/locations/:id` | `GET` | Retrieve full facility detail with feature audits |
| `/api/v1/reports` | `POST` | Submit community corrections and suggestions |
| `/api/v1/audits` | `POST` | Municipal inspector audit validation route |
