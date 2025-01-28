"use client"

import { useState } from "react"
import { Toggle } from "app/components/ui/toggle"
import { List, Map } from "lucide-react"

interface ViewToggleProps {
  onViewChange: (view: "list" | "map") => void
}

export function ViewToggle({ onViewChange }: ViewToggleProps) {
  const [view, setView] = useState<"list" | "map">("list")

  const handleToggle = () => {
    const newView = view === "list" ? "map" : "list"
    setView(newView)
    onViewChange(newView)
  }

  return (
    <Toggle
      aria-label="Toggle view"
      pressed={view === "map"}
      onPressedChange={handleToggle}
      className="fixed top-4 right-4 z-10"
    >
      {view === "list" ? <Map className="h-4 w-4" /> : <List className="h-4 w-4" />}
      <span className="sr-only">{view === "list" ? "Switch to map view" : "Switch to list view"}</span>
    </Toggle>
  )
}

