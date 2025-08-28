"use client";
import { useState } from "react";

type Hobby = { key: string; label: string; emoji: string; color: string; targetId: string };

const HOBBIES: Hobby[] = [
  { key: "reading", label: "Reading", emoji: "📚", color: "bg-amber-100", targetId: "reading" },
  { key: "coffee",  label: "Coffee",  emoji: "☕",  color: "bg-rose-100",  targetId: "coffee"  },
  { key: "beer",    label: "Beer",    emoji: "🍺",  color: "bg-lime-100",  targetId: "beer"    },
  { key: "photo",   label: "Photography", emoji: "📷", color: "bg-sky-100", targetId: "photo"   },
  { key: "ai",      label: "AI & Science", emoji: "🤖", color: "bg-violet-100", targetId: "ai"  },
];

export default function HobbyBubbles() {
  const [hover, setHover] = useState<string | null>(null);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {HOBBIES.map(h => (
        <button
          key={h.key}
          onMouseEnter={() => setHover(h.key)}
          onMouseLeave={() => setHover(null)}
          onClick={() => goTo(h.targetId)}
          className={`rounded-full px-5 py-3 shadow-sm border ${h.color}
                      transition transform ${hover===h.key ? "scale-105" : "scale-100"}`}
          aria-label={h.label}
        >
          <span className="text-lg">{h.emoji}</span>
          <span className="ml-2 font-medium">{h.label}</span>
        </button>
      ))}
    </div>
  );
}
