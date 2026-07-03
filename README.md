# PlayStation Hub 🎮

A modern, mobile-friendly gaming cafe management system built with React, Zustand, and Tailwind CSS. Perfect for managing PlayStation gaming sessions in Uganda and beyond.

## Features ✨

- **Session Management**
  - Create, pause, resume, and end gaming sessions
  - Real-time timer with visual warnings
  - Automatic audio and vibration alerts
  - Session history and revenue tracking

- **Game Library**
  - Pre-loaded Ugandan gaming favorites (FIFA, MK1, GTA V, etc.)
  - Game popularity ranking
  - Enable/disable games

- **Station Management**
  - Track multiple gaming stations (PS4, PS5, etc.)
  - Station status monitoring
  - Customizable station descriptions

- **Revenue Analytics**
  - Real-time earnings dashboard
  - Daily revenue tracking
  - Session cost calculations
  - Historical data analysis

- **Data Persistence**
  - Local IndexedDB storage
  - No server required
  - Complete data backup

## Tech Stack 🛠️

- **Frontend**: React 18+
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Database**: IndexedDB (Local)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## Installation 📦

```bash
# Clone the repository
git clone https://github.com/hermzerkynyny-ux/playstation-hub.git

# Navigate to project directory
cd playstation-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Card, Modal, etc.)
│   └── session/        # Session-specific components
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── History.jsx
│   ├── Settings.jsx
│   ├── SessionDetail.jsx
│   └── NotFound.jsx
├── store/              # Zustand stores
│   ├── sessionStore.js
│   ├── stationStore.js
│   ├── gameStore.js
│   └── revenueStore.js
├── hooks/              # Custom React hooks
│   ├── useSessionTimer.js
│   ├── useVisibility.js
│   └── useKeyboardShortcuts.js
├── utils/              # Utility functions
│   ├── db.js          # IndexedDB operations
│   ├── formatting.js  # Currency, time formatting
│   ├── calculations.js # Cost calculations
│   ├── audio.js       # Sound & vibration
│   └── validation.js  # Input validation
├── layouts/            # Layout components
│   └── MainLayout.jsx
└── App.jsx            # Main app component
```

## Default Settings 🎮

### Pricing (Uganda)
- **Currency**: UGX (Ugandan Shilling)
- **Base Rate**: 2,000 Shs/hour
- **Half-Hour Rate**: 1,000 Shs/30min
- **Minimum Duration**: 30 minutes
- **Maximum Duration**: 8 hours

### Default Games
1. FIFA 25 (Sports)
2. EA Sports FC 25 (Sports)
3. Mortal Kombat 1 (Fighting)
4. Injustice 2 (Fighting)
5. Grand Theft Auto V (Action)
6. Need for Speed Unbound (Racing)
7. Blur (Racing)

### Default Stations
- PS4 - Station 1
- PS5 - Station 2

## Usage 🚀

### Create a Session
1. Click the **+ New** button on the dashboard
2. Enter player name
3. Select a game
4. Choose session duration (30 min - 8 hours)
5. Review estimated cost
6. Click **Create Session**

### Manage Sessions
- **Pause**: Stop the timer temporarily
- **Resume**: Continue a paused session
- **Extend**: Add 30 more minutes
- **End**: Complete the session and move to history

### View History
- Access session history from the bottom navigation
- View completed sessions with revenue info
- Track daily earnings

## Features in Detail 📋

### Real-time Alerts
- 🔔 **5-minute warning**: Soft bell sound
- 🚨 **1-minute warning**: Urgent beep pattern
- ⏰ **Time expired**: Loud alarm with vibration

### Session States
- Active (Green)
- Paused (Blue)
- Warning (Yellow) - < 5 minutes remaining
- Expired (Red) - Time's up

### Data Management
- All data stored locally in IndexedDB
- No internet required
- Automatic persistence
- Manual reset available in Settings

## Keyboard Shortcuts ⌨️

- `N` - New session
- `H` - View history
- `S` - Settings
- `Ctrl+R` - Reset all data (with confirmation)

## Browser Support 🌐

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## LocalStorage & IndexedDB

The app uses IndexedDB for persistent storage of:
- Active gaming sessions
- Session history
- Gaming stations
- Game library
- Daily revenue records

## Performance Optimizations ⚡

- Lazy-loaded components
- Memoized re-renders
- Efficient state management with Zustand
- Optimized IndexedDB queries
- CSS-in-JS with Tailwind purging

## Customization 🎨

### Change Pricing
Edit `src/store/revenueStore.js`:
```javascript
settings: {
  baseRatePerHour: 2000,  // Change this
  halfHourRate: 1000,     // Change this
  currencyCode: 'UGX',
  currencySymbol: 'Shs.',
}
```

### Add Games
Edit `src/store/gameStore.js` default games array.

### Add Stations
Edit `src/store/stationStore.js` default stations array.

## Troubleshooting 🔧

**Sessions not saving?**
- Check browser IndexedDB support
- Verify private/incognito mode is not enabled
- Clear browser cache and try again

**Audio not working?**
- Enable browser audio permissions
- Check system volume
- Verify AudioContext support

**Timer stuck?**
- Refresh the page
- Check browser console for errors
- Restart the app

## License 📄

MIT License - feel free to use and modify

## Contributing 🤝

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Support 💬

For issues, questions, or suggestions, please open a GitHub issue.

## Future Enhancements 🚀

- [ ] Cloud sync with Firebase
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Receipt printing
- [ ] Member profiles with loyalty points
- [ ] Promo codes and discounts
- [ ] Staff management
- [ ] WhatsApp/SMS notifications
- [ ] Payment integration
- [ ] Mobile app (React Native)

---

**Made with ❤️ for gaming cafes in Uganda and beyond**
