"use client";
import Image from "next/image";

type Item = {
  key: string;
  label: string;
  emoji: string;
  targetId: string;
  cover: string; // /public 下的图片
};

const ITEMS: Item[] = [
  { key: "reading", label: "Reading",      emoji: "📚", targetId: "reading", cover: "/hobbies/reading.jpg" },
  { key: "coffee",  label: "Coffee",       emoji: "☕", targetId: "coffee",  cover: "/hobbies/coffee.jpg"  },
  { key: "beer",    label: "Beer",         emoji: "🍺", targetId: "beer",    cover: "/hobbies/beer.jpg"    },
  { key: "photo",   label: "Photography",  emoji: "📷", targetId: "photo",   cover: "/hobbies/photo.jpg"   },
  { key: "ai",      label: "AI & Science", emoji: "🤖", targetId: "ai",      cover: "/hobbies/ai.jpg"      },
];

export default function StoryCircles() {
  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      {ITEMS.map((it) => (
        <button
          key={it.key}
          onClick={() => goTo(it.targetId)}
          className="group flex flex-col items-center focus:outline-none"
          aria-label={it.label}
        >
          {/* 外发光圈 + 圆形封面图 */}
          <div className="p-[3px] rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-400 transition-transform group-hover:scale-105">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={it.cover}
                alt={it.label}
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
          </div>
          {/* 文字 + emoji */}
          <div className="mt-2 text-center">
            <div className="text-sm font-medium text-white/90">{it.label}</div>
            <div className="text-lg leading-none">{it.emoji}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
