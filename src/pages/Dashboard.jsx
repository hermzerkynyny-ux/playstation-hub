import { useState, useEffect } from 'react';
import useSessionStore from '../store/sessionStore';
import useGameStore from '../store/gameStore';
import useRevenueStore from '../store/revenueStore';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import SessionCard from '../components/session/SessionCard';
import StatsCard from '../components/common/StatsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Alert from '../components/common/Alert';
import { formatCurrency } from '../utils/formatting';
import { generateSessionId } from '../utils/calculations';
import { validatePlayerName, validateDuration } from '../utils/validation';
import { Plus } from 'lucide-react';

function Dashboard() {
  const activeSessions = useSessionStore((state) => state.activeSessions);
  const addSession = useSessionStore((state) => state.addSession);
  const updateSession = useSessionStore((state) => state.updateSession);
  const completeSession = useSessionStore((state) => state.completeSession);
  const games = useGameStore((state) => state.games);
  const getTodayRevenue = useRevenueStore((state) => state.getTodayRevenue);
  const calculateCost = useRevenueStore((state) => state.calculateCost);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    playerName: '',
    gameId: '',
    durationMinutes: 30,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const todayRevenue = getTodayRevenue();
  const totalEarnings = activeSessions.reduce((sum, s) => sum + s.amountPaid, 0);

  const handleCreateSession = async () => {
    setError('');

    // Validate
    const nameValidation = validatePlayerName(formData.playerName);
    if (!nameValidation.valid) {
      setError(nameValidation.error);
      return;
    }

    const durationValidation = validateDuration(formData.durationMinutes);
    if (!durationValidation.valid) {
      setError(durationValidation.error);
      return;
    }

    if (!formData.gameId) {
      setError('Please select a game');
      return;
    }

    setLoading(true);

    try {
      const selectedGame = games.find((g) => g.id === formData.gameId);
      const cost = calculateCost(formData.durationMinutes);

      const newSession = {
        id: generateSessionId(),
        playerName: formData.playerName,
        gameId: formData.gameId,
        gameName: selectedGame.name,
        totalMinutesPaid: formData.durationMinutes,
        remainingMinutes: formData.durationMinutes,
        amountPaid: cost,
        startTime: new Date().toISOString(),
        isPaused: false,
      };

      await addSession(newSession);

      // Reset form
      setFormData({
        playerName: '',
        gameId: '',
        durationMinutes: 30,
      });
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to create session: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePauseSession = async (sessionId) => {
    await updateSession(sessionId, { isPaused: true });
  };

  const handleResumeSession = async (sessionId) => {
    await updateSession(sessionId, { isPaused: false });
  };

  const handleExtendSession = async (sessionId) => {
    const session = activeSessions.find((s) => s.id === sessionId);
    if (!session) return;
    await updateSession(sessionId, {
      totalMinutesPaid: session.totalMinutesPaid + 30,
      remainingMinutes: session.remainingMinutes + 30,
    });
  };

  const handleEndSession = async (sessionId) => {
    await completeSession(sessionId);
  };

  return (
    <div className="pb-4">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatsCard title="Active Sessions" value={activeSessions.length} />
        <StatsCard title="Today's Earnings" value={formatCurrency(totalEarnings)} />
      </div>

      {/* Active Sessions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-100">Active Sessions</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} /> New
          </Button>
        </div>

        {activeSessions.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-slate-400">No active sessions</p>
            <p className="text-sm text-slate-500 mt-2">Create a new session to get started</p>
          </Card>
        ) : (
          activeSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onPause={handlePauseSession}
              onResume={handleResumeSession}
              onExtend={handleExtendSession}
              onEnd={handleEndSession}
            />
          ))
        )}
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setError('');
        }}
        title="New Gaming Session"
      >
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError('')}
            className="mb-4"
          />
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Player Name
            </label>
            <input
              type="text"
              value={formData.playerName}
              onChange={(e) =>
                setFormData({ ...formData, playerName: e.target.value })
              }
              placeholder="Enter player name"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Game
            </label>
            <select
              value={formData.gameId}
              onChange={(e) =>
                setFormData({ ...formData, gameId: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-orange-500"
            >
              <option value="">Select a game</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Duration (minutes)
            </label>
            <select
              value={formData.durationMinutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  durationMinutes: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-orange-500"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={180}>3 hours</option>
              <option value={240}>4 hours</option>
            </select>
          </div>

          <div className="bg-slate-700 rounded-lg p-3">
            <p className="text-sm text-slate-400">Estimated Cost</p>
            <p className="text-2xl font-bold text-orange-500">
              {formatCurrency(calculateCost(formData.durationMinutes))}
            </p>
          </div>

          <Button
            onClick={handleCreateSession}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating...' : 'Create Session'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
