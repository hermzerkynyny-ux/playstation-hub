import { useState } from 'react';
import useRevenueStore from '../store/revenueStore';
import useSessionStore from '../store/sessionStore';
import useStationStore from '../store/stationStore';
import useGameStore from '../store/gameStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import { Plus, Trash2 } from 'lucide-react';

function Settings() {
  const revenueSettings = useRevenueStore((state) => state.settings);
  const clearAllSessions = useSessionStore((state) => state.clearAllSessions);
  const stations = useStationStore((state) => state.stations);
  const games = useGameStore((state) => state.games);
  
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);

  const handleClearAllData = async () => {
    if (confirm('Are you sure you want to clear all session data? This cannot be undone!')) {
      await clearAllSessions();
      setIsWarningOpen(false);
      setSettingsUpdated(true);
      setTimeout(() => setSettingsUpdated(false), 3000);
    }
  };

  return (
    <div className="pb-4 space-y-6">
      {settingsUpdated && (
        <Alert
          type="success"
          title="Success"
          message="Settings updated successfully"
          onClose={() => setSettingsUpdated(false)}
        />
      )}

      {/* Pricing Settings */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4">💰 Pricing</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400">Currency</p>
              <p className="text-lg font-semibold text-slate-100">
                {revenueSettings.currencyCode} ({revenueSettings.currencySymbol})
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Base Rate (per hour)</p>
              <p className="text-lg font-semibold text-orange-500">
                {revenueSettings.currencySymbol}
                {revenueSettings.baseRatePerHour.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Half-Hour Rate</p>
              <p className="text-lg font-semibold text-orange-500">
                {revenueSettings.currencySymbol}
                {revenueSettings.halfHourRate.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Timezone</p>
              <p className="text-lg font-semibold text-slate-100">
                {revenueSettings.timezone}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Stations */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4">🎮 Gaming Stations</h2>
        <Card>
          <div className="space-y-3">
            {stations.map((station) => (
              <div
                key={station.id}
                className="flex justify-between items-center p-3 bg-slate-700 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-slate-100">{station.name}</p>
                  <p className="text-xs text-slate-400">{station.description}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    station.status === 'active'
                      ? 'bg-green-900 text-green-100'
                      : 'bg-red-900 text-red-100'
                  }`}
                >
                  {station.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Games Library */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4">🎯 Games Library</h2>
        <Card>
          <div className="space-y-2">
            {games.map((game) => (
              <div key={game.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-semibold text-slate-100">{game.name}</p>
                  <p className="text-xs text-slate-400">{game.genre}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    game.enabled
                      ? 'bg-green-900 text-green-100'
                      : 'bg-red-900 text-red-100'
                  }`}
                >
                  {game.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Danger Zone */}
      <div>
        <h2 className="text-xl font-bold text-red-500 mb-4">⚠️ Danger Zone</h2>
        <Card className="border-red-600 bg-red-950 bg-opacity-20">
          <p className="text-sm text-slate-300 mb-4">
            Clear all session data and start fresh. This action cannot be undone.
          </p>
          <Button variant="danger" onClick={() => setIsWarningOpen(true)}>
            <Trash2 size={16} className="inline mr-2" />
            Clear All Data
          </Button>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        title="Clear All Data?"
      >
        <div className="space-y-4">
          <Alert
            type="error"
            title="Warning"
            message="This will permanently delete all session history and active sessions. This action cannot be undone!"
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsWarningOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleClearAllData}
              className="flex-1"
            >
              Clear All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;
