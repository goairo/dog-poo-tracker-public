"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dog, Heart, BookOpen, Camera, Plus } from "lucide-react"

type PooType = {
  id: string
  name: string
  description: string
  healthScore: number
  color: string
}

type PooEntry = {
  id: string
  type: PooType
  timestamp: Date
  notes?: string
}

const pooTypes: PooType[] = [
  { id: "1", name: "Perfect", description: "Firm, well-formed", healthScore: 100, color: "bg-green-500" },
  { id: "2", name: "Slightly Soft", description: "Soft but holds shape", healthScore: 85, color: "bg-yellow-500" },
  { id: "3", name: "Loose", description: "Loses shape quickly", healthScore: 60, color: "bg-orange-500" },
  { id: "4", name: "Watery", description: "Very loose, watery", healthScore: 30, color: "bg-red-500" },
  { id: "5", name: "Hard", description: "Dry, hard pellets", healthScore: 70, color: "bg-amber-600" },
  { id: "6", name: "Mucus", description: "Contains mucus", healthScore: 40, color: "bg-purple-500" },
]

export default function DogPooTracker() {
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "types" | "logbook">("dashboard")
  const [entries, setEntries] = useState<PooEntry[]>([])
  const [dogName, setDogName] = useState("Buddy")

  const addEntry = (type: PooType) => {
    const newEntry: PooEntry = {
      id: Date.now().toString(),
      type,
      timestamp: new Date(),
    }
    setEntries([newEntry, ...entries])
    setCurrentScreen("dashboard")
  }

  const calculateHealthScore = () => {
    if (entries.length === 0) return 85
    const recentEntries = entries.slice(0, 7) // Last 7 entries
    const avgScore = recentEntries.reduce((sum, entry) => sum + entry.type.healthScore, 0) / recentEntries.length
    return Math.round(avgScore)
  }

  const getHealthStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "text-green-600" }
    if (score >= 75) return { text: "Good", color: "text-yellow-600" }
    if (score >= 60) return { text: "Fair", color: "text-orange-600" }
    return { text: "Poor", color: "text-red-600" }
  }

  const healthScore = calculateHealthScore()
  const healthStatus = getHealthStatus(healthScore)

  if (currentScreen === "types") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center mb-2">Select Poo Type</h1>
            <p className="text-gray-600 text-center">Choose the type that best matches what you observed</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {pooTypes.map((type) => (
              <Card
                key={type.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => addEntry(type)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full ${type.color} mx-auto mb-3`}></div>
                  <h3 className="font-semibold mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {type.healthScore}% healthy
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => setCurrentScreen("dashboard")}>
              <Dog className="w-4 h-4 mr-2" />
              Dog
            </Button>
            <Button variant="default">
              <Heart className="w-4 h-4 mr-2" />
              Health
            </Button>
            <Button variant="outline" onClick={() => setCurrentScreen("logbook")}>
              <BookOpen className="w-4 h-4 mr-2" />
              Logbook
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "logbook") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center mb-2">Health Logbook</h1>
            <p className="text-gray-600 text-center">Track {dogName}'s digestive health over time</p>
          </div>

          <div className="space-y-4 mb-6">
            {entries.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No entries yet. Start tracking to see your dog's health history!</p>
                </CardContent>
              </Card>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full ${entry.type.color}`}></div>
                        <div>
                          <h4 className="font-semibold">{entry.type.name}</h4>
                          <p className="text-sm text-gray-600">{entry.type.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{entry.type.healthScore}%</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {entry.timestamp.toLocaleDateString()}{" "}
                          {entry.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => setCurrentScreen("dashboard")}>
              <Dog className="w-4 h-4 mr-2" />
              Dog
            </Button>
            <Button variant="outline" onClick={() => setCurrentScreen("types")}>
              <Heart className="w-4 h-4 mr-2" />
              Health
            </Button>
            <Button variant="default">
              <BookOpen className="w-4 h-4 mr-2" />
              Logbook
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">🐕 Poo Tracker</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={dogName} />
                <AvatarFallback className="text-2xl">🐕</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{dogName}</h2>
                <p className="text-gray-600">Golden Retriever • 3 years old</p>
              </div>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Update Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Health Score
              <span className={`text-2xl font-bold ${healthStatus.color}`}>{healthScore}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={healthScore} className="mb-3" />
            <div className="flex justify-between items-center">
              <span className={`font-semibold ${healthStatus.color}`}>{healthStatus.text}</span>
              <span className="text-sm text-gray-600">
                Based on {entries.length} {entries.length === 1 ? "entry" : "entries"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full mb-6 h-12" onClick={() => setCurrentScreen("types")}>
          <Plus className="w-5 h-5 mr-2" />
          Log New Entry
        </Button>

        {entries.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full ${entry.type.color}`}></div>
                      <span className="font-medium">{entry.type.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{entry.timestamp.toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center space-x-4">
          <Button variant="default">
            <Dog className="w-4 h-4 mr-2" />
            Dog
          </Button>
          <Button variant="outline" onClick={() => setCurrentScreen("types")}>
            <Heart className="w-4 h-4 mr-2" />
            Health
          </Button>
          <Button variant="outline" onClick={() => setCurrentScreen("logbook")}>
            <BookOpen className="w-4 h-4 mr-2" />
            Logbook
          </Button>
        </div>
      </div>
    </div>
  )
}
