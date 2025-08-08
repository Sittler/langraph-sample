"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Menu, User, Settings, LogOut } from "lucide-react"

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
  }
  title?: string
  showSidebarTrigger?: boolean
}

export function Header({ 
  user, 
  title = "Welcome back!", 
  showSidebarTrigger = true 
}: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showSidebarTrigger && (
            <SidebarTrigger>
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SidebarTrigger>
          )}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
