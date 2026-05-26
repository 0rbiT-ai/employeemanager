import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function StatsCard({ isLoadingHistory, last7, total7, avg7, fmtHours }) {
  return (
    <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-xl text-white">
      <CardHeader>
        <CardTitle className="text-white">Last 7 days</CardTitle>
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
              <span className="text-zinc-400 text-sm">Total hours</span>
              <span className="text-white font-semibold text-lg">{fmtHours(total7)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Daily average</span>
              <span className="text-white font-semibold text-lg">{fmtHours(avg7)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Days logged</span>
              <span className="text-white font-semibold text-lg">{last7.length}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}