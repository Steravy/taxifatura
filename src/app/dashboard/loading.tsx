import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header Skeleton */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-full xl:max-w-[1600px]">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Main stat card - blue gradient */}
          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-blue-200/30" />
                  <Skeleton className="h-8 w-16 bg-blue-200/30" />
                </div>
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20" />
              </div>
            </CardContent>
          </Card>

          {/* Other stat cards */}
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16" />
                    {i === 3 && <Skeleton className="h-3 w-24" />}
                    {i === 2 && <Skeleton className="h-3 w-8" />}
                  </div>
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Skeleton className="h-12 sm:h-14 w-full sm:w-36" />
          <Skeleton className="h-12 sm:h-14 w-full sm:w-40" />
          <Skeleton className="h-12 sm:h-14 w-full sm:w-32" />
        </div>

        {/* Receipts Table Skeleton */}
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-4 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Skeleton className="h-10 w-full sm:w-56 lg:w-64" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="sm:overflow-x-auto sm:p-0 p-4">
              <div className="sm:border-0 border rounded-lg sm:shadow-none shadow-sm bg-white">
                {/* Table Header Skeleton */}
                <div className="bg-slate-50/50 border-b">
                  <div className="grid grid-cols-9 gap-4 p-4">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                
                {/* Table Rows Skeleton */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-b last:border-b-0">
                    <div className="grid grid-cols-9 gap-4 p-4 items-center">
                      <Skeleton className="h-4 w-16" />
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-3 rounded" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <div className="flex items-center justify-end space-x-1">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}