import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function StatsCard({ isLoadingHistory, last7, total7, avg7, fmtHours }) {
  return (
    <Card className="border-border bg-card/40 backdrop-blur-xl text-foreground">
      <CardHeader>
        <CardTitle className="text-foreground">Last 7 days</CardTitle>
        <CardDescription className="text-muted-foreground">
          Summary of your working hours
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoadingHistory ? (
          <p className="text-muted-foreground">Loading stats...</p>
        ) : last7.length < 3 ? (
          <p className="text-muted-foreground text-sm py-4">
            Need more data ({last7.length} active day{last7.length !== 1 ? 's' : ''} recorded, need at least 3)
          </p>
        ) : (
          <div className="space-y-4 py-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Total hours</span>
              <span className="text-foreground font-semibold text-lg">{fmtHours(total7)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Daily average</span>
              <span className="text-foreground font-semibold text-lg">{fmtHours(avg7)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Days logged</span>
              <span className="text-foreground font-semibold text-lg">{last7.length}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}