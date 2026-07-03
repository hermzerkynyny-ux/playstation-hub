import { useState } from 'react';
import useSessionStore from '../store/sessionStore';
import useRevenueStore from '../store/revenueStore';
import Card from '../components/common/Card';
import StatsCard from '../components/common/StatsCard';
import { formatCurrency, formatDateTime } from '../utils/formatting';

function History() {
  const sessionHistory = useSessionStore((state) => state.sessionHistory);

  const totalRevenue = sessionHistory.reduce((sum, s) => sum + s.amountPaid, 0);
  const avgSessionCost =
    sessionHistory.length > 0
      ? Math.round(totalRevenue / sessionHistory.length)
      : 0;

  return (
    <div className="pb-4">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
        />
        <StatsCard
          title="Sessions Completed"
          value={sessionHistory.length}
        />
        <StatsCard
          title="Average Session Cost"
          value={formatCurrency(avgSessionCost)}
          subtitle="per session"
        />
      </div>

      {/* Session History List */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4">Session History</h2>

        {sessionHistory.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-slate-400">No session history</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {sessionHistory.map((session) => (
              <Card key={session.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-100">
                      {session.gameName}
                    </h3>
                    <p className="text-sm text-slate-400">{session.playerName}</p>
                  </div>
                  <p className="text-lg font-bold text-orange-500">
                    {formatCurrency(session.amountPaid)}
                  </p>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>
                    {session.totalMinutesPaid}
                    m paid
                  </span>
                  <span>{formatDateTime(session.endTime)}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
