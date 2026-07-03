import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useSessionStore from './store/sessionStore';
import useStationStore from './store/stationStore';
import useGameStore from './store/gameStore';
import useRevenueStore from './store/revenueStore';
import { useEffect } from 'react';

// Pages
import Dashboard from './pages/Dashboard';
import SessionDetail from './pages/SessionDetail';
import History from './pages/History';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Layouts
import MainLayout from './layouts/MainLayout';

function App() {
  // Initialize all stores on app load
  useEffect(() => {
    const initializeApp = async () => {
      await useSessionStore.getState().initializeSessions();
      await useStationStore.getState().initializeStations();
      await useGameStore.getState().initializeGames();
      await useRevenueStore.getState().initializeRevenue();
    };

    initializeApp().catch((error) => {
      console.error('App initialization error:', error);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/session/:sessionId" element={<SessionDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
