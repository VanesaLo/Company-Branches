"use client";

import { useState } from "react";
import { List, Map } from "lucide-react";
import { Button } from "../ui/button";

interface ViewToggleProps {
  onViewChange: (view: "list" | "map") => void;
}

export function ViewToggle({ onViewChange }: ViewToggleProps) {
  const [view, setView] = useState<"list" | "map">("list");

  const handleToggle = (newView: "list" | "map") => {
    setView(newView);
    onViewChange(newView);
  };

  return (
    <div className="flex space-x-2 ">
      <Button
        variant={view === "list" ? "outline" : "ghost"}
        onClick={() => handleToggle("list")}
        aria-label="View as list"
      >
        <List className="h-4 w-4 mr-2" />
        Lista
      </Button>
      <Button
        variant={view === "map" ? "outline" : "ghost"}
        onClick={() => handleToggle("map")}
        aria-label="View as map"
      >
        <Map className="h-4 w-4 mr-2" />
        Mapa
      </Button>
    </div>
  );
}
