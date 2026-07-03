# PlayStation Hub - System Architecture & Design Document

## Executive Summary
PlayStation Hub is a mobile-first web application designed for managing gaming lounges/stations in Uganda. The system prioritizes real-time session tracking, financial management, and seamless user experience on smartphone browsers.

**Target Device:** Mobile browsers (iOS Safari, Android Chrome)  
**Currency:** Ugandan Shillings (UGX)  
**Primary Use Case:** Gaming station managers tracking active sessions, time, and revenue

---

## Part 1: System Architecture

### Tech Stack Recommendation
- **Frontend:** React + React Router (mobile-optimized)
- **State Management:** Zustand (lightweight, minimal boilerplate)
- **Styling:** Tailwind CSS (mobile-first utility framework)
- **Database:** IndexedDB (client-side persistence) + optional backend sync
- **Real-time Updates:** Web Workers for timer management
- **Audio/Notifications:** Web Audio API + Vibration API
- **Build Tool:** Vite (fast development, optimized builds)

---

## Part 2: Database Schema & Data Structures

### Core Data Models (JSON Format)

```json
{
  "system": {
    "settings": {
      "currencyCode": "UGX",
      "currencySymbol": "Shs.",
      "baseRatePerHour": 2000,
      "halfHourRate": 1000,
      "warningTimes": [300, 60, 0],
      "timezone": "Africa/Kampala"
    }
  },
  "stations": [
    {
      "id": "station_001",
      "name": "PS4 - Station 1",
      "console": "PS4",
      "status": "active",
      "createdAt": "2026-07-01T10:00:00Z",
      "description": "Main gaming console - Station 1",
      "notes": ""
    },
    {
      "id": "station_002",
      "name": "PS5 - Station 2",
      "console": "PS5",
      "status": "inactive",
      "createdAt": "2026-07-01T10:15:00Z",
      "description": "High-end gaming console - Station 2",
      "notes": ""
    }
  ],
  "games": [
    {
      "id": "game_001",
      "name": "FIFA 25",
      "genre": "Sports",
      "popularity": 1,
      "enabled": true
    },
    {
      "id": "game_002",
      "name": "EA Sports FC 25",
      "genre": "Sports",
      "popularity": 2,
      "enabled": true
    },
    {
      "id": "game_003",
      "name": "Mortal Kombat 1",
      "genre": "Fighting",
      "popularity": 3,
      "enabled": true
    },
    {
      "id": "game_004",
      "name": "Injustice 2",
      "genre": "Fighting",
      "popularity": 4,
      "enabled": true
    },
    {
      "id": "game_005",
      "name": "Grand Theft Auto V",
      "genre": "Action",
      "popularity": 5,
      "enabled": true
    },
    {
      "id": "game_006",
      "name": "Need for Speed Unbound",
      "genre": "Racing",
      "popularity": 6,
      "enabled": true
    },
    {
      "id": "game_007",
      "name": "Blur",
      "genre": "Racing",
      "popularity": 7,
      "enabled": true
    }
  ],
  "activeSessions": [
    {
      "id": "session_20260703_001",
      "stationId": "station_001",
      "gameId": "game_001",
      "gameName": "FIFA 25",
      "playerName": "John Doe",
      "startTime": "2026-07-03T14:00:00Z",
      "ratePerMinute": 33.33,
      "totalMinutesPaid": 60,
      "elapsedMinutes": 25,
      "remainingMinutes": 35,
      "amountPaid": 2000,
      "isPaused": false,
      "pausedAt": null,
      "totalPausedDuration": 0,
      "warningsTriggered": [],
      "alarmTriggered": false,
      "notes": ""
    },
    {
      "id": "session_20260703_002",
      "stationId": "station_002",
      "gameId": "game_005",
      "gameName": "Grand Theft Auto V",
      "playerName": "Jane Smith",
      "startTime": "2026-07-03T14:15:00Z",
      "ratePerMinute": 33.33,
      "totalMinutesPaid": 30,
      "elapsedMinutes": 5,
      "remainingMinutes": 25,
      "amountPaid": 1000,
      "isPaused": false,
      "pausedAt": null,
      "totalPausedDuration": 0,
      "warningsTriggered": [],
      "alarmTriggered": false,
      "notes": ""
    }
  ],
  "sessionHistory": [
    {
      "id": "history_20260702_001",
      "stationId": "station_001",
      "gameId": "game_001",
      "gameName": "FIFA 25",
      "playerName": "John Doe",
      "startTime": "2026-07-02T10:00:00Z",
      "endTime": "2026-07-02T11:00:00Z",
      "totalDurationMinutes": 60,
      "ratePerMinute": 33.33,
      "amountPaid": 2000,
      "paymentStatus": "completed",
      "notes": ""
    },
    {
      "id": "history_20260702_002",
      "stationId": "station_002",
      "gameId": "game_005",
      "gameName": "Grand Theft Auto V",
      "playerName": "Jane Smith",
      "startTime": "2026-07-02T14:30:00Z",
      "endTime": "2026-07-02T15:00:00Z",
      "totalDurationMinutes": 30,
      "ratePerMinute": 33.33,
      "amountPaid": 1000,
      "paymentStatus": "completed",
      "notes": ""
    }
  ],
  "dailyRevenue": [
    {
      "id": "revenue_20260703",
      "date": "2026-07-03",
      "totalSessionsCompleted": 8,
      "totalRevenueCollected": 18000,
      "pendingRevenue": 2000,
      "sessionsData": [
        {
          "sessionId": "session_20260703_001",
          "stationId": "station_001",
          "amount": 2000,
          "status": "active"
        }
      ]
    },
    {
      "id": "revenue_20260702",
      "date": "2026-07-02",
      "totalSessionsCompleted": 12,
      "totalRevenueCollected": 24000,
      "pendingRevenue": 0,
      "sessionsData": []
    }
  ]
}
```

### Data Validation Rules

```json
{
  "validations": {
    "station": {
      "nameRequired": true,
      "consoleRequired": true,
      "allowedConsoles": ["PS4", "PS5", "PS3"]
    },
    "session": {
      "playerNameRequired": true,
      "gameRequired": true,
      "minDuration": 30,
      "maxDuration": 480,
      "durationUnit": "minutes"
    },
    "payment": {
      "minimumAmount": 1000,
      "allowedDurations": [30, 60],
      "allowedRates": [1000, 2000]
    }
  }
}
```

---

## Part 3: Mobile UI Wireframe & Design System

### Color Palette (Dark Mode - Ugandan Gaming Aesthetic)
```
Primary Background:    #0F172A (Slate-950) - Deep charcoal
Secondary Background:  #1E293B (Slate-800) - Lighter slate
Accent Color:          #F97316 (Orange-500) - Active timer highlight
Warning Color:         #EF4444 (Red-500) - Time warning
Success Color:         #22C55E (Green-500) - Completed sessions
Text Primary:          #F1F5F9 (Slate-100) - Main text
Text Muted:            #94A3B8 (Slate-400) - Secondary text
```

### Screen Layouts

#### Screen 1: Dashboard (Home/Active Sessions Overview)
```
┌─────────────────────────────────────┐
│ PlayStation Hub                 ☰   │  ← Header with menu
├─────────────────────────────────────┤
│ TODAY'S STATS                       │
│ ┌─────────────────┬─────────────┐   │
│ │ Active Sessions │ Total Today │   │
│ │      2          │  18,000 UGX  │   │
│ └─────────────────┴─────────────┘   │
├─────────────────────────────────────┤
│ ACTIVE SESSIONS                     │
│                                     │
│ ┌──────────────────────────────────┐ │
│ │ PS4 - Station 1                  │ │
│ │ FIFA 25 - John Doe               │ │
│ │ ▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░   │ │
│ │ 25 min / 60 min | 2,000 UGX      │ │
│ │ [PAUSE]  [EXTEND]  [END SESSION] │ │
│ └──────────────────────────────────┘ │
│                                     │
│ ┌──────────────────────────────────┐ │
│ │ PS5 - Station 2                  │ │
│ │ GTA V - Jane Smith               │ │
│ │ ▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░   │ │
│ │ 05 min / 30 min | 1,000 UGX ⚠️   │ │
│ │ [RESUME] [EXTEND] [END SESSION]  │ │
│ └──────────────────────────────────┘ │
│                                     │
│ [+ NEW SESSION]                     │
├─────────────────────────────────────┤
│ [History] [Settings] [Reports]      │ ← Bottom nav
└─────────────────────────────────────┘
```

#### Screen 2: New Session / Timer Detail
```
┌─────────────────────────────────────┐
│ ← PS4 - Station 1 - New Session     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐│
│  │                                 ││
│  │     35:42                       ││  ← Large countdown timer
│  │  (Noto Sans Bold, 72px)         ││
│  │                                 ││
│  │  FIFA 25 | John Doe             ││
│  │                                 ││
│  └─────────────────────────────────┘│
│                                     │
│  Amount Paid: 2,000 UGX             │
│  Duration: 60 minutes               │
│  Rate: 33.33 UGX/min                │
│                                     │
│  Status: [●] RUNNING                │
│                                     │
│  [PAUSE]     [END SESSION]          │
│                                     │
│ ─────────────────────────────────── │
│ Session Warnings & History:         │
│ • 14:00 - Session started           │
│ • 14:15 - Game: FIFA 25 recorded    │
│                                     │
└─────────────────────────────────────┘
```

#### Screen 3: Session History Log
```
┌─────────────────────────────────────┐
│ ← History                           │
├─────────────────────────────────────┤
│ Filter: [All ▼] [Today ▼]           │
├─────────────────────────────────────┤
│ 2026-07-02 | 8 Sessions | 24,000 UGX│
│                                     │
│ ┌──────────────────────────────────┐ │
│ │ 10:00 - 11:00 | PS4 - FIFA 25   │ │
│ │ John Doe | 60 min | 2,000 UGX    │ │
│ └──────────────────────────────────┘ │
│                                     │
│ ┌──────────────────────────────────┐ │
│ │ 14:30 - 15:00 | PS5 - GTA V      │ │
│ │ Jane Smith | 30 min | 1,000 UGX  │ │
│ └──────────────────────────────────┘ │
│                                     │
│ 2026-07-01 | 5 Sessions | 12,000 UGX│
│ [More entries...]                   │
│                                     │
└─────────────────────────────────────┘
```

#### Screen 4: Settings & Configuration
```
┌─────────────────────────────────────┐
│ ← Settings                          │
├─────────────────────────────────────┤
│ STATIONS                            │
│ ┌──────────────────────────────────┐ │
│ │ ✓ PS4 - Station 1      [Edit] [⊗]│ │
│ │ ✓ PS5 - Station 2      [Edit] [⊗]│ │
│ └──────────────────────────────────┘ │
│ [+ Add Station]                     │
│                                     │
│ PRICING                             │
│ ├─ 1 Hour (60 min): 2,000 UGX       │
│ ├─ 30 Minutes: 1,000 UGX            │
│ └─ Rate per minute: 33.33 UGX       │
│                                     │
│ AUDIO & NOTIFICATIONS               │
│ ├─ Sound Alerts: [ON/OFF toggle]    │
│ ├─ Vibration: [ON/OFF toggle]       │
│ └─ Warning at: 5 mins & 1 min       │
│                                     │
│ ABOUT                               │
│ PlayStation Hub v1.0                │
│ Manage your gaming station          │
│                                     │
└─────────────────────────────────────┘
```

### Visual Hierarchy & Component Details

```
Typography:
- Header (H1): 28px, Bold, Slate-100
- Section (H2): 20px, Bold, Slate-100
- Body: 16px, Regular, Slate-100
- Caption: 14px, Regular, Slate-400
- Timer Display: 72px, Bold, Orange-500

Spacing (8px baseline):
- Tight: 8px
- Standard: 16px
- Loose: 24px
- Extra: 32px

Buttons:
- Primary (Active): Orange-500 bg, Slate-950 text, 16px, 44px height (accessible touch)
- Secondary: Slate-700 bg, Slate-100 text, 16px, 44px height
- Danger: Red-500 bg, white text
- Disabled: Slate-600 bg, Slate-500 text

Cards:
- Background: Slate-800
- Border: 1px Slate-700
- Padding: 16px
- Radius: 8px
- Shadow: 0 4px 6px rgba(0,0,0,0.1)
```

### Alert States & Notifications

```
Normal State (Green indicator):
┌────────────────────────────────────┐
│ ● Session Running | 35:42 remaining│
└────────────────────────────────────┘

5-Minute Warning (Yellow/Amber):
┌────────────────────────────────────┐
│ ⚠ 5 Minutes Remaining              │
│ ● Session Running | 05:00 remaining│
│ [EXTEND SESSION] [PAUSE]           │
└────────────────────────────────────┘
  + Audio alert (bell sound)
  + Screen flash (subtle pulse animation)
  + Device vibration (3 pulses)

1-Minute Warning (Red):
┌────────────────────────────────────┐
│ 🔴 URGENT: 1 MINUTE LEFT           │
│ ● Session Running | 01:00 remaining│
│ [EXTEND SESSION IMMEDIATELY]       │
└────────────────────────────────────┘
  + Audio alert (urgent beep x3)
  + Aggressive screen pulse
  + Device vibration (5 rapid pulses)

Time Expired (Red):
┌────────────────────────────────────┐
│ ⏹ SESSION TIME EXPIRED              │
│ Station: PS4 - Station 1             │
│ Player: John Doe | Game: FIFA 25    │
│ Total Paid: 2,000 UGX               │
│                                    │
│ [CLEAR SESSION] [ADD EXTENSION]    │
└────────────────────────────────────┘
  + Persistent audio alarm (until dismissed)
  + Heavy vibration pattern
  + Modal overlay (cannot dismiss without action)
```

---

## Part 4: Development Roadmap (3-4 Passes)

### PASS 1: Foundation & Core UI (Week 1)
**Objective:** Build the skeleton, UI components, and local data structure

**Tasks:**
1. ✅ Initialize Vite + React project with Tailwind CSS
2. ✅ Set up folder structure (`/components`, `/pages`, `/hooks`, `/utils`, `/store`)
3. ✅ Create Zustand store for stations, sessions, games, and revenue
4. ✅ Design and build mobile-responsive base layout (header, footer nav, safe areas)
5. ✅ Build reusable component library:
   - Card component
   - Button variants (primary, secondary, danger)
   - Progress bar / time indicator
   - Modal/Dialog
   - Input fields
6. ✅ Create Dashboard page (static layout, mock data)
7. ✅ Create SessionDetail page (timer display - not ticking yet)
8. ✅ Create History page (static list of past sessions)
9. ✅ Create Settings page (configuration UI)
10. ✅ Implement basic routing (React Router)
11. ✅ IndexedDB setup & persistence layer

**Deliverable:** Static app with mock data, all screens visible, responsive on mobile

---

### PASS 2: Timer Logic & Real-Time Features (Week 2)
**Objective:** Implement live countdown timers, warnings, and alarms

**Tasks:**
1. ✅ Implement countdown timer using `setInterval` with Web Worker
2. ✅ Create hook: `useSessionTimer()` to manage individual session timers
3. ✅ Implement pause/resume functionality
4. ✅ Add warning system at 5 mins, 1 min, and expiration (0 mins)
5. ✅ Integrate Web Audio API for alarm sounds:
   - Soft bell at 5 minutes
   - Urgent beep at 1 minute
   - Persistent alarm at 0 minutes
6. ✅ Add Vibration API integration for haptic feedback
7. ✅ Create visual animations (pulse effect for warnings)
8. ✅ Test timer accuracy and multi-session management
9. ✅ Implement session expiration logic (auto-clear expired sessions)
10. ✅ Add session history logging (move completed sessions to history)

**Deliverable:** Fully functional countdown timers with alarms, warnings, and pause functionality

---

### PASS 3: Session Management & Financial Tracking (Week 3)
**Objective:** Build session creation, extension, payment tracking, and revenue reporting

**Tasks:**
1. ✅ Create "New Session" form modal with:
   - Station selector
   - Game selector
   - Player name input
   - Duration selector (30 min or 60 min)
   - Auto-calculated amount display
2. ✅ Implement "Extend Session" functionality:
   - Calculate additional time and cost
   - Update existing session (don't create new one)
3. ✅ Build "End Session" confirmation & cleanup logic
4. ✅ Implement daily revenue aggregation:
   - Total sessions completed today
   - Total revenue collected
   - Pending revenue (from active sessions)
5. ✅ Build detailed History page with filters:
   - Filter by date range
   - Filter by station
   - Sort by time, amount, player name
6. ✅ Create Daily Revenue Report:
   - Summary card with today's totals
   - Breakdown by station
   - Breakdown by game
7. ✅ Add persistence: save all data to IndexedDB
8. ✅ Create data export feature (JSON or CSV of session history)

**Deliverable:** Fully functional session management with payment tracking and revenue reports

---

### PASS 4: Polish, Optimization & Advanced Features (Week 4)
**Objective:** Refine UX, add advanced features, and prepare for production

**Tasks:**
1. ✅ **Performance Optimization:**
   - Lazy load pages
   - Optimize re-renders (React.memo for timer components)
   - Minimize bundle size
   - Enable PWA (service worker for offline capability)

2. ✅ **Advanced Features:**
   - Multi-language support (English + local languages)
   - Dark/Light mode toggle (currently hardcoded dark)
   - Custom notification sounds
   - Player statistics (most played games, top players)
   - Revenue trends (daily/weekly/monthly charts)

3. ✅ **Data Management:**
   - Backup/restore functionality
   - Cloud sync option (Firebase/Supabase)
   - Session notes/comments

4. ✅ **Testing:**
   - Unit tests (Vitest) for timer logic
   - Integration tests for session flow
   - E2E tests (Cypress) for critical paths

5. ✅ **Accessibility:**
   - ARIA labels on all interactive elements
   - Keyboard navigation support
   - Ensure contrast ratios meet WCAG AA

6. ✅ **Documentation:**
   - User manual (in-app help)
   - Admin guide
   - API documentation (if adding backend)

7. ✅ **Deployment:**
   - Build optimization
   - Deploy to Netlify/Vercel
   - Set up CI/CD pipeline (GitHub Actions)

8. ✅ **Beta Testing:**
   - Real-world usage testing at a gaming lounge
   - Collect feedback
   - Iterate on issues

**Deliverable:** Production-ready application, optimized, accessible, and ready for deployment

---

## Part 5: API Integration Plan (Optional Future Enhancement)

### Suggested Backend Stack (Node.js + Express/Supabase)
```json
{
  "endpoints": {
    "sessions": {
      "POST /api/sessions": "Create new session",
      "GET /api/sessions/:id": "Get session details",
      "PATCH /api/sessions/:id": "Update session (pause/resume/extend)",
      "DELETE /api/sessions/:id": "End session",
      "GET /api/sessions/history": "Fetch session history"
    },
    "revenue": {
      "GET /api/revenue/daily/:date": "Get daily revenue",
      "GET /api/revenue/stats": "Get revenue statistics"
    },
    "stations": {
      "GET /api/stations": "List all stations",
      "POST /api/stations": "Create station",
      "PATCH /api/stations/:id": "Update station",
      "DELETE /api/stations/:id": "Delete station"
    }
  }
}
```

---

## Part 6: Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|----------|
| State Management | Zustand | Lightweight, minimal boilerplate, perfect for mobile |
| Styling | Tailwind CSS | Mobile-first, utility-based, great for dark mode |
| Timer Implementation | Web Worker | Prevents main thread blocking, accurate timers |
| Database | IndexedDB + optional cloud | Works offline, fast, sync-able |
| Deployment | Static hosting (Netlify/Vercel) | Fast, cheap, serverless functions for backend |
| Testing Framework | Vitest + Cypress | Fast, modern, great DX |

---

## Part 7: Project Structure

```
playstation-hub/
├── public/
│   ├── sounds/
│   │   ├── warning-5min.mp3
│   │   ├── warning-1min.mp3
│   │   └── alarm-expired.mp3
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── BottomNav.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── session/
│   │   │   ├── SessionCard.jsx
│   │   │   ├── TimerDisplay.jsx
│   │   │   ├── SessionForm.jsx
│   │   │   └── SessionHistory.jsx
│   │   └── dashboard/
│   │       ├── StatsCard.jsx
│   │       └── RevenueWidget.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── SessionDetail.jsx
│   │   ├── History.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   ├── useSessionTimer.js
│   │   ├── useLocalStorage.js
│   │   └── useNotification.js
│   ├── store/
│   │   ├── sessionStore.js
│   │   ├── stationStore.js
│   │   ├── gameStore.js
│   │   └── revenueStore.js
│   ├── utils/
│   │   ├── db.js (IndexedDB helper)
│   │   ├── audio.js (sound utilities)
│   │   ├── formatting.js (currency, time formatting)
│   │   └── calculations.js (rate calculations)
│   ├── styles/
│   │   └── globals.css (tailwind imports, custom vars)
│   ├── App.jsx
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml
├── vite.config.js
├── tailwind.config.js
├── package.json
├── ARCHITECTURE.md (this file)
└── README.md
```

---

## Part 8: Success Metrics

- ✅ App loads in < 2 seconds on 4G network
- ✅ Timers accurate to within ±1 second over 60 minutes
- ✅ Multi-session management (5+ concurrent sessions without lag)
- ✅ All alarms trigger reliably on time
- ✅ Pause/resume functionality works seamlessly
- ✅ Revenue calculations 100% accurate
- ✅ Mobile responsive on all screen sizes (320px - 768px)
- ✅ PWA capability (works offline with cached data)

---

## Next Steps

**Once approved, we'll proceed with PASS 1:** Creating the Vite project, building the UI components, and establishing the data layer with Zustand + IndexedDB.

Shall we start building? 🎮