import { useState } from "react"
import { Check } from "lucide-react"
import { useAuthStore } from "@/stores/authStore"
import { useThemeStore } from "@/stores/themeStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const { theme, setTheme } = useThemeStore()
  const [profileSaved, setProfileSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "+1 (555) 123-4567",
    company: "FinAdmin Inc.",
    bio: "Finance administrator managing company accounts and transactions.",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true,
    reports: false,
    security: true,
    marketing: false,
  })

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordSaved(true)
    setPasswords({ current: "", new: "", confirm: "" })
    setTimeout(() => setPasswordSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="settingsName">Full Name</Label>
                  <Input id="settingsName" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="settingsEmail">Email</Label>
                  <Input id="settingsEmail" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="settingsPhone">Phone</Label>
                  <Input id="settingsPhone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="settingsCompany">Company</Label>
                  <Input id="settingsCompany" value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="settingsBio">Bio</Label>
                  <textarea
                    id="settingsBio"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
                <Button type="submit">
                  {profileSaved ? <><Check className="mr-2 h-4 w-4" /> Saved</> : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Ensure your account stays secure by updating your password regularly</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSave} className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="currentPass">Current Password</Label>
                  <Input id="currentPass" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPass">New Password</Label>
                  <Input id="newPass" type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPass">Confirm New Password</Label>
                  <Input id="confirmPass" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} required />
                </div>
                <Button type="submit">
                  {passwordSaved ? <><Check className="mr-2 h-4 w-4" /> Updated</> : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base">Theme</Label>
                <p className="text-sm text-muted-foreground mb-4">Select your preferred theme for the dashboard</p>
                <div className="grid grid-cols-3 gap-4 max-w-lg">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors cursor-pointer ${
                        theme === t ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`h-16 w-full rounded-md ${
                        t === "light" ? "bg-white border" : t === "dark" ? "bg-slate-900" : "bg-gradient-to-r from-white to-slate-900"
                      }`} />
                      <span className="text-sm font-medium capitalize">{t}</span>
                      {theme === t && <Badge variant="default" className="text-xs">Active</Badge>}
                    </button>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-base">Interface Density</Label>
                <p className="text-sm text-muted-foreground mb-4">Control the spacing and density of the interface</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">Compact</Button>
                  <Button variant="default" size="sm">Default</Button>
                  <Button variant="outline" size="sm">Comfortable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 max-w-lg">
              {[
                { key: "email" as const, label: "Email Notifications", desc: "Receive notifications via email" },
                { key: "push" as const, label: "Push Notifications", desc: "Receive push notifications in browser" },
                { key: "transactions" as const, label: "Transaction Alerts", desc: "Get notified about new transactions" },
                { key: "reports" as const, label: "Report Notifications", desc: "Get notified when reports are ready" },
                { key: "security" as const, label: "Security Alerts", desc: "Important security-related notifications" },
                { key: "marketing" as const, label: "Marketing Updates", desc: "Product updates and announcements" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
                      notifications[item.key] ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        notifications[item.key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
