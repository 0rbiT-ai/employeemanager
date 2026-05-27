import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { checkIn, checkOut, getMyAttendanceToday, getAttendanceHistory } from '../api'
import { useAuth } from '../context/Authcontext'
import { Button } from '@/components/ui/button'
import ClockCard from '../components/employee/ClockCard'
import StatsCard from '../components/employee/StatsCard'
import HistoryTable from '../components/employee/HistoryTable'

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

export default function EmployeePage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const queryClient = useQueryClient()

  const { data: todayRecord, isLoading: isLoadingToday } = useQuery({
    queryKey: ['attendance', 'today'],
    queryFn: getMyAttendanceToday,
  })

  const { data: historyLogs = [], isLoading: isLoadingHistory } = useQuery({
    queryKey: ['attendance', 'history'],
    queryFn: getAttendanceHistory,
  })

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

  const activeSession = todayRecord?.attendanceSessions?.find((s) => !s.checkOut)
  const isCheckedIn = !!activeSession
  const employeeName = todayRecord?.employee?.name || localStorage.getItem('role') || 'Employee'

  const todayWorkedTimeMs = todayRecord?.attendanceSessions?.reduce((total, session) => {
    if (session.checkIn && session.checkOut) {
      const cin = new Date(`${todayRecord.date}T${session.checkIn}`)
      const cout = new Date(`${todayRecord.date}T${session.checkOut}`)
      return total + (cout - cin)
    }
    return total
  }, 0) ?? 0

  const timerCheckinTime = activeSession
    ? new Date(`${todayRecord.date}T${activeSession.checkIn}`).toISOString()
    : null

  const now = new Date()
  const last7 = historyLogs.filter((r) => {
    if (!r.date) return false
    return (now - new Date(r.date)) / 86400000 <= 7
  })
  const total7 = last7.reduce((sum, r) => sum + getAttendanceTotalHours(r), 0)
  const avg7 = last7.length > 0 ? total7 / last7.length : 0

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full top-[-100px] left-[-100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome, {employeeName}</h1>
            <p className="text-zinc-400">Manage your attendance and track your working hours</p>
          </div>
          <Button onClick={() => { logout(); navigate('/login') }} variant="destructive">
            Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ClockCard
            isLoadingToday={isLoadingToday}
            isCheckedIn={isCheckedIn}
            timerCheckinTime={timerCheckinTime}
            todayHoursFormatted={fmtHours(todayWorkedTimeMs / 3600000)}
            todayWorkedTimeMs={todayWorkedTimeMs}
            checkInMutation={checkInMutation}
            checkOutMutation={checkOutMutation}
          />
          <StatsCard
            isLoadingHistory={isLoadingHistory}
            last7={last7}
            total7={total7}
            avg7={avg7}
            fmtHours={fmtHours}
          />
        </div>

        <HistoryTable
          isLoadingHistory={isLoadingHistory}
          historyLogs={historyLogs}
         
        />
      </div>
    </div>
  )
}