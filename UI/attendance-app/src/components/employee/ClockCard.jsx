import Timer from '../Timer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

function formatms(ms){
  const totalseconds = Math.floor(ms/1000)
  const hours = Math.floor(totalseconds / 3600)
  const minutes = Math.floor((totalseconds % 3600) / 60)
  const seconds = totalseconds % 60
  const pad =(n) => String(n).padStart(2,'0')
  return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`
}

export default function ClockCard({ isLoadingToday, isCheckedIn, timerCheckinTime, todayHoursFormatted, todayWorkedTimeMs, checkInMutation, checkOutMutation }) {
  
  return (
    <Card className="border-border bg-card/40 backdrop-blur-xl text-foreground h-full flex flex-col relative">
      <CardHeader className="pb-0">
        <CardTitle className="text-foreground">Clock In/Out</CardTitle>
        <CardDescription className="text-muted-foreground">
          Start or end your daily working session
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col items-center justify-start pt-16 space-y-6">
        {isLoadingToday ? (
          <p className="text-muted-foreground">Loading today's status...</p>
        ) : isCheckedIn ? (
          <div className="text-center space-y-4">
              <Timer checkinTime={timerCheckinTime} 
              initialMs={todayWorkedTimeMs}
              />
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
            <h2 className="text-4xl font-mono tracking-wider">{formatms(todayWorkedTimeMs)}</h2>
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
          <div className="pt-25 border-t border-border w-full text-center">
            <p className="text-muted-foreground text-xs">Total completed time today: {todayHoursFormatted}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}