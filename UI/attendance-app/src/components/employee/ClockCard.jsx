import Timer from '../Timer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ClockCard({ isLoadingToday, isCheckedIn, timerCheckinTime, todayHoursFormatted, todayWorkedTimeMs, checkInMutation, checkOutMutation }) {
  return (
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
            <p className="text-zinc-400 text-sm">Active session duration</p>
            <Timer checkinTime={timerCheckinTime} />
            <Button
              onClick={() => checkOutMutation.mutate()}
              disabled={checkOutMutation.isPending}
              className="w-48 bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              {checkOutMutation.isPending ? 'Clocking out...' : 'Clock out'}
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
              {checkInMutation.isPending ? 'Clocking in...' : 'Clock in'}
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
  )
}