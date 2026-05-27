import Timer from '../Timer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ClockCard({ isLoadingToday, isCheckedIn, timerCheckinTime, todayHoursFormatted, todayWorkedTimeMs, checkInMutation, checkOutMutation }) {
  return (
    <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-xl text-white h-full flex flex-col relative">
      <CardHeader className="pb-0">
        <CardTitle className="text-white">Clock In/Out</CardTitle>
        <CardDescription className="text-zinc-400">
          Start or end your daily working session
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
        {isLoadingToday ? (
          <p className="text-zinc-400">Loading today's status...</p>
        ) : isCheckedIn ? (
          <div className="text-center space-y-4">
            <p className="text-zinc-400 text-sm">Active session duration</p>
            <Timer checkinTime={timerCheckinTime} />
            <Button
              onClick={() => checkOutMutation.mutate()}
              disabled={checkOutMutation.isPending}
              className="w-72 bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              {checkOutMutation.isPending ? 'Clocking out...' : 'Clock out'}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-mono tracking-wider">00 : 00 : 00</h2>
            <Button
              onClick={() => checkInMutation.mutate()}
              disabled={checkInMutation.isPending}
              className="w-72 bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              {checkInMutation.isPending ? 'Clocking in...' : 'Clock in'}
            </Button>
          </div>
        )}

        {todayWorkedTimeMs > 0 && (
          <div className="pt-20 border-t border-zinc-800 w-full text-center">
            <p className="text-zinc-500 text-xs">Total completed time today: {todayHoursFormatted}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}