import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'


export function fmtHours(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
}

export function getSessionDurationSeconds(session, date) {
  if (!session.checkIn || !session.checkOut) return 0;
  const cin = new Date(`${date}T${session.checkIn}`);
  const cout = new Date(`${date}T${session.checkOut}`);
  return (cout - cin) / 1000;
}

export function getAttendanceTotalSeconds(attendance) {
  if (!attendance.attendanceSessions) return 0;
  return attendance.attendanceSessions.reduce(
    (sum, s) => sum + getSessionDurationSeconds(s, attendance.date),
    0
  );
}
export default function HistoryTable({ isLoadingHistory, historyLogs }) {
  return (
    <Card className="border-border bg-card/40 backdrop-blur-xl text-foreground">
      <CardHeader>
        <CardTitle className="text-foreground">Attendance history</CardTitle>
        <CardDescription className="text-muted-foreground">
          Your recent attendance logs (showing up to 10 entries)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingHistory ? (
          <p className="text-muted-foreground py-4">Loading history...</p>
        ) : historyLogs.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center">No attendance logs found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-foreground text-sm">
              <thead className="border-b border-border text-muted-foreground font-medium">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Sessions</th>
                  <th className="py-3 px-4">Total hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {historyLogs.slice(0, 10).map((r) => (
                  <tr key={r.id} className="hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground font-medium">
                      {new Date(r.date).toLocaleDateString(undefined, {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {r.attendanceSessions?.length > 0 ? (
                          r.attendanceSessions.map((session, sIdx) => (
                            <div key={session.id} className="text-xs text-muted-foreground">
                              Session {sIdx + 1}: {session.checkIn.substring(0, 5)} —{' '}
                              {session.checkOut ? session.checkOut.substring(0, 5) : 'Active'}
                            </div>
                          ))
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground font-medium">
                      {fmtHours(getAttendanceTotalSeconds(r))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}