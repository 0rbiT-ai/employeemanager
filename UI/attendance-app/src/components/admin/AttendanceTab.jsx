import { useState,useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllAttendanceLogs } from '../../api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function formatTime(localTimeStr) {
  if (!localTimeStr) return '—';
  const parts = localTimeStr.split(':');
  return `${parts[0]}:${parts[1]}`;
}

function calculateTotalHours(sessions) {

  if (!sessions || sessions.length === 0) {
    return '0h 0m 0s';
  }

  let totalSeconds = 0;

  for (const session of sessions) {

    if (!session.checkIn) continue;

    const [inH, inM, inS = 0] =
      session.checkIn.split(':').map(Number);

    const inSeconds =
      inH * 3600 + inM * 60 + inS;

    let outSeconds = 0;

    if (session.checkOut) {

      const [outH, outM, outS = 0] =
        session.checkOut.split(':').map(Number);

      outSeconds =
        outH * 3600 + outM * 60 + outS;

    } else {

      const now = new Date();

      outSeconds =
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds();
    }

    totalSeconds += outSeconds - inSeconds;
  }

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function getStatus(sessions) {
  if (!sessions || sessions.length === 0) return 'active';
  return sessions.every((s) => s.checkOut) ? 'completed' : 'active';
}

export default function AttendanceTab() {
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [, setTick] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const {
    data: attendanceLogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin-attendance'],
    queryFn: getAllAttendanceLogs,
  });

  const filteredLogs = attendanceLogs.filter((log) => {
    const matchesName = nameFilter
      ? log.employee?.name?.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    const matchesDate = dateFilter ? log.date === dateFilter : true;
    return matchesName && matchesDate;
  });

  const handleClearFilters = () => {
    setNameFilter('');
    setDateFilter('');
  };

  return (
    <Card className="bg-card/40 backdrop-blur-xl border-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-foreground text-lg">Attendance Logs</CardTitle>
            <CardDescription className="text-muted-foreground">
              View all employee attendance records
            </CardDescription>
          </div>
        </div>
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Input
            type="text"
            placeholder="Search by employee name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="sm:w-64 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="sm:w-48 bg-muted border-border text-foreground focus:border-ring"
          />
          {(nameFilter || dateFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <p className="text-muted-foreground text-sm py-4">Loading attendance logs...</p>
        )}

        {isError && (
          <p className="text-red-400 text-sm py-4">Failed to load attendance logs.</p>
        )}

        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-foreground text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="py-3 px-4 font-medium text-muted-foreground">Employee</th>
                  <th className="py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="py-3 px-4 font-medium text-muted-foreground">Sessions</th>
                  <th className="py-3 px-4 font-medium text-muted-foreground">Total Working Time</th>
                  <th className="py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 px-4 text-center text-muted-foreground">
                      {nameFilter || dateFilter
                        ? 'No attendance records match your filters.'
                        : 'No attendance records found.'}
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => {
                    const sessions = log.attendanceSessions || [];
                    const status = getStatus(sessions);
                    return (
                      <tr key={log.id} className="hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-foreground">
                          {log.employee?.name || '—'}
                        </td>
                        <td className="py-3 px-4">{log.date}</td>
                        <td className="py-3 px-4">
                          {sessions.length === 0 ? (
                            <span className="text-muted-foreground">No sessions</span>
                          ) : (
                            <div className="space-y-1">
                              {sessions.map((session) => (
                                <div key={session.id} className="text-xs">
                                  <span className="text-foreground">
                                    {formatTime(session.checkIn)}
                                  </span>
                                  <span className="text-muted-foreground mx-1">–</span>
                                  <span className="text-foreground">
                                    {session.checkOut ? formatTime(session.checkOut) : '...'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {calculateTotalHours(sessions)}
                        </td>
                        <td className="py-3 px-4">
                          {status === 'completed' ? (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Completed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Active
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}