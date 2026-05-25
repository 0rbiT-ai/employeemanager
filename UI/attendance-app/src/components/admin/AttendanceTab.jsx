import { useState } from 'react';
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
  if (!sessions || sessions.length === 0) return '0.00';
  let totalMinutes = 0;
  for (const session of sessions) {
    if (session.checkIn && session.checkOut) {
      const [inH, inM] = session.checkIn.split(':').map(Number);
      const [outH, outM] = session.checkOut.split(':').map(Number);
      totalMinutes += (outH * 60 + outM) - (inH * 60 + inM);
    }
  }
  const hours = totalMinutes / 60;
  return hours.toFixed(2);
}

function getStatus(sessions) {
  if (!sessions || sessions.length === 0) return 'active';
  return sessions.every((s) => s.checkOut) ? 'completed' : 'active';
}

export default function AttendanceTab() {
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

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
    <Card className="bg-zinc-950/40 backdrop-blur-xl border-zinc-800">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-white text-lg">Attendance Logs</CardTitle>
            <CardDescription className="text-zinc-400">
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
            className="sm:w-64 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="sm:w-48 bg-zinc-900 border-zinc-700 text-white focus:border-zinc-500"
          />
          {(nameFilter || dateFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <p className="text-zinc-400 text-sm py-4">Loading attendance logs...</p>
        )}

        {isError && (
          <p className="text-red-400 text-sm py-4">Failed to load attendance logs.</p>
        )}

        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-zinc-300 text-sm">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4 font-medium text-zinc-400">Employee</th>
                  <th className="py-3 px-4 font-medium text-zinc-400">Date</th>
                  <th className="py-3 px-4 font-medium text-zinc-400">Sessions</th>
                  <th className="py-3 px-4 font-medium text-zinc-400">Total Hours</th>
                  <th className="py-3 px-4 font-medium text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 px-4 text-center text-zinc-500">
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
                      <tr key={log.id} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-white">
                          {log.employee?.name || '—'}
                        </td>
                        <td className="py-3 px-4">{log.date}</td>
                        <td className="py-3 px-4">
                          {sessions.length === 0 ? (
                            <span className="text-zinc-500">No sessions</span>
                          ) : (
                            <div className="space-y-1">
                              {sessions.map((session) => (
                                <div key={session.id} className="text-xs">
                                  <span className="text-zinc-300">
                                    {formatTime(session.checkIn)}
                                  </span>
                                  <span className="text-zinc-500 mx-1">–</span>
                                  <span className="text-zinc-300">
                                    {session.checkOut ? formatTime(session.checkOut) : '...'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {calculateTotalHours(sessions)}h
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
