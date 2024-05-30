import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ThemeToogle } from "@/components/ui/theme-toggle";
import UserProfile from "@/components/user-profile";

export default function Home() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r  lg:block ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Mundobee</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="ml-auto h-8 w-8"
                  size="icon"
                  variant="outline"
                >
                  <BellIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <TriangleAlertIcon className="h-4 w-4 text-red-500" />
                    <div>
                      <div className="font-medium">Device Offline</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Device `Smart Thermostat` is offline.
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <ZapIcon className="h-4 w-4 text-yellow-500" />
                    <div>
                      <div className="font-medium">High Temperature</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Device `Greenhouse Sensor` has high temperature.
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="font-medium">Device Online</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Device `Smart Plug` is now online.
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <PackageIcon className="h-4 w-4" />
                Devices
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Users
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[70px] items-center gap-4 border-b px-6 bg-card">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Minhas Colmeias</h1>
          </div>
          <UserProfile />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h2 className="font-semibold text-lg md:text-2xl">All Devices</h2>
            <Button className="ml-auto" size="sm">
              Add Device
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Smart Thermostat</div>
                  <Badge className="px-2 py-1" variant="secondary">
                    Online
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Living Room
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Temperature
                    </div>
                    <div className="text-2xl font-semibold">22°C</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Humidity
                    </div>
                    <div className="text-2xl font-semibold">45%</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Outside Temp
                    </div>
                    <div className="text-2xl font-semibold">18°C</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Outside Humidity
                    </div>
                    <div className="text-2xl font-semibold">60%</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      In-Count
                    </div>
                    <div className="text-2xl font-semibold">125</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Out-Count
                    </div>
                    <div className="text-2xl font-semibold">78</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Greenhouse Sensor</div>
                  <Badge className="px-2 py-1" variant="secondary">
                    Online
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Greenhouse 1
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Temperature
                    </div>
                    <div className="text-2xl font-semibold">28°C</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Humidity
                    </div>
                    <div className="text-2xl font-semibold">65%</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Outside Temp
                    </div>
                    <div className="text-2xl font-semibold">22°C</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Outside Humidity
                    </div>
                    <div className="text-2xl font-semibold">50%</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      In-Count
                    </div>
                    <div className="text-2xl font-semibold">45</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Out-Count
                    </div>
                    <div className="text-2xl font-semibold">22</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Smart Plug</div>
                  <Badge className="px-2 py-1" variant="secondary">
                    Online
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Kitchen
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Temperature
                    </div>
                    <div className="text-2xl font-semibold">24°C</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Humidity
                    </div>
                    <div className="text-2xl font-semibold">55%</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Outside Temp
                    </div>
                    <div className="text-2xl font-semibold">20°C</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Outside Humidity
                    </div>
                    <div className="text-2xl font-semibold">45%</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      In-Count
                    </div>
                    <div className="text-2xl font-semibold">85</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Out-Count
                    </div>
                    <div className="text-2xl font-semibold">42</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Outdoor Camera</div>
                  <Badge className="px-2 py-1" variant="secondary">
                    Offline
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Backyard
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Temperature
                    </div>
                    <div className="text-2xl font-semibold">15°C</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TriangleAlertIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ZapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}
