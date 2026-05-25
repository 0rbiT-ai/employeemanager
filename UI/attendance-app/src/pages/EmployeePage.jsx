import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Timer from '../components/Timer'
import { checkIn, checkOut, getMyAttendanceToday, getAttendanceHistory } from '../api'
import { useAuth } from '../context/Authcontext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

function EmployeePage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const queryClient = useQueryClient()

  // Queries
  const { data: todayRecord, isLoading: isLoadingToday } = useQuery({
    queryKey: ['attendance', 'today'],
    queryFn: getMyAttendanceToday,
  })

  const { data: historyLogs = [], isLoading: isLoadingHistory } = useQuery({
    queryKey: ['attendance', 'history'],
    queryFn: getAttendanceHistory,
  })

  // Mutations
  const checkInMutation = useMutation({
    mutationFn: checkIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] })
      queryClient.invalidateQueries({ queryKey: ['attendance', 'history'] })
    },
  })

  const checkOutMutation = useMutation({
    mutationFn: checkOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] })
      queryClient.invalidateQueries({ queryKey: ['attendance', 'history'] })
    },
  })

  // Parse today's active session
  const activeSession = todayRecord?.attendanceSessions?.find((s) => !s.checkOut)
  const isCheckedIn = !!activeSession

  // Get employee name
  const employeeName = todayRecord?.employee?.name || localStorage.getItem('role') || 'Employee'

  // Format Helper functions
  function getTodayWorkedTimeMs() {
    if (!todayRecord?.attendanceSessions) return 0
    let totalMs = 0
    todayRecord.attendanceSessions.forEach((session) => {
      if (session.checkIn && session.checkOut) {
        const cin = new Date(`${todayRecord.date}T${session.checkIn}`)
        const cout = new Date(`${todayRecord.date}T${session.checkOut}`)
        totalMs += cout - cin
      }
    })
    return totalMs
  }

  function fmtHours(h) {
    if (h === null || h === undefined) return '—'
    return `${Math.floor(h)}h ${Math.round((h % 1) * 60)}m`
  }

  function getSessionDurationHours(session, date) {
    if (!session.checkIn || !session.checkOut) return 0
    const cin = new Date(`${date}T${session.checkIn}`)
    const cout = new Date(`${date}T${session.checkOut}`)
    return (cout - cin) / 3600000
  }

  function getAttendanceTotalHours(attendance) {
    if (!attendance.attendanceSessions) return 0
    return attendance.attendanceSessions.reduce(
      (sum, s) => sum + getSessionDurationHours(s, attendance.date),
      0
    )
  }

  // Last 7 days stats
  const now = new Date()
  const last7 = historyLogs.filter((r) => {
    if (!r.date) return false
    const logDate = new Date(r.date)
    return (now - logDate) / 86400000 <= 7
  })

  const total7 = last7.reduce((sum, r) => sum + getAttendanceTotalHours(r), 0)
  const avg7 = last7.length > 0 ? total7 / last7.length : 0

  const todayWorkedTimeMs = getTodayWorkedTimeMs()
  const todayHoursFormatted = fmtHours(todayWorkedTimeMs / 3600000)

  // Combined Check-in Time Date Object for Timer
  const timerCheckinTime = activeSession
    ? new Date(`${todayRecord.date}T${activeSession.checkIn}`).toISOString()
    : null

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full top-[-100px] left-[-100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome, {employeeName}</h1>
            <p className="text-zinc-400">Manage your attendance and track your working hours</p>
          </div>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action Card */}
          <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-xl text-white md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Clock In/Out</CardTitle>
              <CardDescription className="text-zinc-400">
                Start or end your daily working session
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6 space-y-4">
              {isLoadingToday ? (
                <p className="text-zinc-400">Loading today's status...</p>
              ) : isCheckedIn ? (
                <div className="text-center space-y-4">
                  <p className="text-zinc-400 text-sm">Active Session Duration</p>
                  <Timer checkinTime={timerCheckinTime} />
                  <Button
                    onClick={() => checkOutMutation.mutate()}
                    disabled={checkOutMutation.isPending}
                    className="w-48 bg-red-600 hover:bg-red-700 text-white font-medium"
                  >
                    {checkOutMutation.isPending ? 'Clocking Out...' : 'Clock Out'}
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-mono tracking-wider text-zinc-500">00 : 00 : 00</h2>
                  <p className="text-zinc-400 text-sm">You haven't clocked in yet today</p>
                  <Button
                    onClick={() => checkInMutation.mutate()}
                    disabled={checkInMutation.isPending}
                    className="w-48 bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    {checkInMutation.isPending ? 'Clocking In...' : 'Clock In'}
                  </Button>
                </div>
              )}

              {todayWorkedTimeMs > 0 && (
                <div className="pt-4 border-t border-zinc-800 w-full text-center">
                  <p className="text-zinc-400 text-xs">Total completed time today: {todayHoursFormatted}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-xl text-white">
            <CardHeader>
              <CardTitle className="text-white">Last 7 Days Stats</CardTitle>
              <CardDescription className="text-zinc-400">
                Summary of your working hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingHistory ? (
                <p className="text-zinc-400">Loading stats...</p>
              ) : last7.length < 3 ? (
                <p className="text-zinc-500 text-sm py-4">
                  Need more data ({last7.length} active day{last7.length !== 1 ? 's' : ''} recorded, need at least 3)
                </p>
              ) : (
                <div className="space-y-4 py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Total Hours:</span>
                    <span className="text-white font-semibold text-lg">{fmtHours(total7)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Daily Average:</span>
                    <span className="text-white font-semibold text-lg">{fmtHours(avg7)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Days Logged:</span>
                    <span className="text-white font-semibold text-lg">{last7.length}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* History Logs */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-xl text-white">
          <CardHeader>
            <CardTitle className="text-white">Attendance History</CardTitle>
            <CardDescription className="text-zinc-400">
              Your recent attendance logs (showing up to 10 entries)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingHistory ? (
              <p className="text-zinc-400 py-4">Loading history...</p>
            ) : historyLogs.length === 0 ? (
              <p className="text-zinc-500 py-4 text-center">No attendance logs found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-zinc-300 text-sm">
                  <thead className="border-b border-zinc-800 text-zinc-400 font-medium">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Check-in Sessions</th>
                      <th className="py-3 px-4">Total Daily Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {historyLogs.slice(0, 10).map((r) => {
                      const dailyTotalHours = getAttendanceTotalHours(r)
                      return (
                        <tr key={r.id} className="hover:bg-zinc-900/20">
                          <td className="py-3 px-4 text-white font-medium">
                            {new Date(r.date).toLocaleDateString(undefined, {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              {r.attendanceSessions && r.attendanceSessions.length > 0 ? (
                                r.attendanceSessions.map((session, sIdx) => (
                                  <div key={session.id} className="text-xs text-zinc-400">
                                    Session {sIdx + 1}: {session.checkIn.substring(0, 5)} -{' '}
                                    {session.checkOut ? session.checkOut.substring(0, 5) : 'Active'}
                                  </div>
                                ))
                              ) : (
                                <span className="text-zinc-500">—</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-white font-medium">
                            {fmtHours(dailyTotalHours)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EmployeePage