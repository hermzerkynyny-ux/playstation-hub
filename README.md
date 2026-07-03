# 🎮 PlayStation Hub

A **mobile-first web application** for managing gaming lounges and PlayStation station setups in Uganda. Track active gaming sessions, manage timers with real-time alerts, and monitor revenue in Ugandan Shillings (UGX).

## 📱 Key Features

### ⏱️ Real-Time Session Management
- Live countdown timers for multiple active gaming stations
- Automatic warnings at 5 minutes, 1 minute, and time expiration
- Pause/resume functionality to hold sessions without losing paid time
- Multi-station concurrent session tracking

### 💰 Financial Tracking
- **Pricing:** 1 Hour = 2,000 UGX | 30 Minutes = 1,000 UGX
- Track daily revenue collected vs. pending payments
- Complete session history with player names, games, and amounts
- Export session data for accounting

### 🎯 Game Library
Pre-loaded with popular Ugandan gaming titles:
- FIFA 25 & EA Sports FC 25
- Mortal Kombat 1
- Injustice 2
- Grand Theft Auto V
- Need for Speed Unbound
- Blur

### 🔔 Smart Notifications
- Audio alarms (configurable)
- Device vibration feedback
- Visual countdown indicators
- Critical alerts at time expiration

### 📊 Dashboard & Reports
- At-a-glance stats (active sessions, today's revenue)
- Session history log with filters
- Station management
- Revenue reporting

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React + React Router |
| **State** | Zustand |
| **Styling** | Tailwind CSS (Mobile-first Dark Mode) |
| **Database** | IndexedDB (offline-first) |
| **Timers** | Web Workers |
| **Audio** | Web Audio API |
| **Build** | Vite |

## 📐 Architecture

For detailed architecture, database schema, and design specs, see [ARCHITECTURE.md](./ARCHITECTURE.md)

### Quick Schema Overview

```json
{
  "stations": [...],          // PS4/PS5 consoles
  "games": [...],             // Game library
  "activeSessions": [...],    // Running timers
  "sessionHistory": [...],    // Completed sessions
  "dailyRevenue": [...]       // Financial tracking
}
```

## 🚀 Development Roadmap

### PASS 1: Foundation & Core UI
- Initialize Vite + React + Tailwind
- Build responsive mobile UI
- Create Zustand data stores
- Set up IndexedDB persistence
- **Output:** Static app with mock data

### PASS 2: Timer Logic & Alarms
- Implement live countdown timers
- Add warning system & alarms
- Integrate Web Audio API
- Add vibration feedback
- **Output:** Fully functional timers

### PASS 3: Session Management & Revenue
- Create/extend session forms
- Build payment tracking
- Implement financial reporting
- Add data export
- **Output:** Session management + revenue tracking

### PASS 4: Polish, Testing & Deployment
- Performance optimization & PWA
- Unit/integration/E2E testing
- Accessibility compliance (WCAG AA)
- Deploy to production
- **Output:** Production-ready application

## 📱 Mobile-First Design

The app is optimized for smartphone browsers with:
- **Dark Mode Theme:** Slate-950 background with Orange-500 accents
- **Touch-Friendly:** 44px+ button heights
- **Safe Areas:** Respects notches and status bars
- **Fast Loading:** < 2 seconds on 4G networks

## 🌍 Localization

- **Currency:** Ugandan Shillings (UGX)
- **Timezone:** Africa/Kampala
- **Future:** Multi-language support

## 📦 Project Structure

```
playstation-hub/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page routes
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state stores
│   ├── utils/           # Helper functions
│   ├── styles/          # Global styles
│   └── App.jsx
├── public/
│   └── sounds/          # Audio alerts
├── ARCHITECTURE.md      # System design & schema
└── package.json
```

## 🎯 Success Metrics

- ✅ App loads in < 2 seconds on 4G
- ✅ Timers accurate to ±1 second
- ✅ Multi-session management (5+ concurrent)
- ✅ 100% accurate revenue calculations
- ✅ Mobile responsive (320px - 768px)
- ✅ PWA offline capability

## 🔧 Installation & Setup

```bash
# Clone repository
git clone https://github.com/hermzerkynyny-ux/playstation-hub.git
cd playstation-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system design, database schema, UI wireframes, and development roadmap
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guidelines (coming in PASS 1)
- **In-app Help** - Built-in user guide (coming in PASS 4)

## 👤 Author

**Hermzer Kynyny**  
Full-Stack Engineer & UI/UX Designer  
GitHub: [@hermzerkynyny-ux](https://github.com/hermzerkynyny-ux)

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Support

For issues, feature requests, or questions:
- Open an [Issue](https://github.com/hermzerkynyny-ux/playstation-hub/issues)
- Start a [Discussion](https://github.com/hermzerkynyny-ux/playstation-hub/discussions)

---

**Status:** 🚧 In Development (PASS 1: Foundation Phase)

*Built with ❤️ for Uganda's gaming community*