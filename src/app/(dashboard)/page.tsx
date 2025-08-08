"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Activity, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "+20.1% from last month",
      icon: Users,
    },
    {
      title: "Active Sessions",
      value: "573",
      description: "+180.1% from last month",
      icon: Activity,
    },
    {
      title: "Revenue",
      value: "$45,231.89",
      description: "+19% from last month",
      icon: TrendingUp,
    },
    {
      title: "Analytics",
      value: "12,234",
      description: "+201 since last hour",
      icon: BarChart3,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent activity and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Account created successfully
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Welcome to your new dashboard
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Just now
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Profile setup completed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your profile is ready to use
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  2 minutes ago
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Security settings updated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your account security has been enhanced
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  1 hour ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              System Status
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Tips to help you get the most out of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Complete your profile</h4>
              <p className="text-sm text-muted-foreground">
                Add more information to your profile to personalize your experience.
              </p>
              <Button size="sm" variant="outline">
                Update Profile
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Explore features</h4>
              <p className="text-sm text-muted-foreground">
                Discover all the powerful features available in your dashboard.
              </p>
              <Button size="sm" variant="outline">
                Take Tour
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system status and information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Status</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Login</span>
              <span className="text-sm text-muted-foreground">Just now</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Account Type</span>
              <span className="text-sm text-muted-foreground">Standard</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Session ID</span>
              <span className="text-sm text-muted-foreground font-mono">
                {session?.user?.email?.slice(0, 8)}...
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

