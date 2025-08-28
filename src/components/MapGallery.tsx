"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import Image from "next/image";

const emojiIcon = (emoji: string) =>
  L.divIcon({
    className: "text-2xl",
    html: `<div style="transform: translate(-50%,-50%);">${emoji}</div>`,
    iconSize: [24, 24],
  });

type City = {
  id: string;
  name: string;
  emoji: string;
  position: LatLngExpression;
  photos: string[];
  blurb?: string;
};

const CITIES: City[] = [
  {
    id: "paris",
    name: "Paris, France",
    emoji: "📍",
    position: [48.8566, 2.3522],
    photos: [], // 还没放图可以先留空
    blurb: "Home base. Cafés, libraries, and long walks by the Seine.",
  },
  {
    id: "zurich",
    name: "Zurich, Switzerland",
    emoji: "📍",
    position: [47.3769, 8.5417],
    photos: [
      "/Zurich/IMG_1924.JPG",
      "/Zurich/IMG_2000.JPG",
      "/Zurich/IMG_1951.JPG",
      "/Zurich/IMG_1813.JPG",
      "/Zurich/IMG_1811.JPG",
      "/Zurich/IMG_1820.JPG",
    ],
    blurb: "Sea of blue hours and quiet work spots by the lake.",
  },
  {
    id: "nyc",
    name: "New York City, USA",
    emoji: "📍",
    position: [40.7128, -74.0060],
    photos: [
      "/NYC/IMG_4168.JPG",
      "/NYC/IMG_4179.JPG",
      "/NYC/IMG_4190.JPG",
      "/NYC/IMG_4206.JPG",
      "/NYC/IMG_4271.JPG",
      "/NYC/IMG_4335.JPG",
      "/NYC/IMG_4474.JPG",
    ],
    blurb: "Skyscrapers, bridges, and late-night coffee runs.",
  },
];

export default function MapGallery() {
  const [selected, setSelected] = useState<City | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const mapRef = useRef<L.Map | null>(null);
  const center = useMemo<LatLngExpression>(() => [48.86, 2.35], []);

  // 自动框住全部城市
  useEffect(() => {
    if (!mapRef.current) return;
    const bounds = L.latLngBounds(CITIES.map(c => c.position as [number, number]));
    mapRef.current.fitBounds(bounds, { padding: [40, 40] });
  }, []);

  // 轻量键盘控制 Lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen || !selected) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % selected.photos.length);
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + selected.photos.length) % selected.photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, selected]);

  const openCity = (c: City) => {
    setSelected(c);
    if (c.photos.length) {
      setIdx(0);
      setLightboxOpen(true); // 点击📍直接以“中间展开”的方式看第一张
    }
  };

  return (
    <section id="map" className="mx-auto max-w-6xl grid md:grid-cols-[1fr_380px] gap-4">
      <div className="h-[70vh] rounded-xl overflow-hidden border relative z-0">
        <MapContainer
          whenCreated={(m) => (mapRef.current = m)}
          center={center}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {CITIES.map((c) => (
            <Marker
              key={c.id}
              position={c.position}
              icon={emojiIcon(c.emoji)}
              eventHandlers={{ click: () => openCity(c) }}
            >
              <Popup>{c.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <aside className="border rounded-xl p-4 space-y-3">
        {selected ? (
          <>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>{selected.emoji}</span> {selected.name}
            </h3>
            {selected.blurb && <p className="text-gray-700">{selected.blurb}</p>}
            {selected.photos.length ? (
              <div className="grid grid-cols-2 gap-2">
                {selected.photos.map((p, i) => (
                  <button key={p} onClick={() => { setIdx(i); setLightboxOpen(true); }}>
                    <Image
                      src={p}
                      alt={`${selected.name} ${i+1}`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 50vw, 180px"
                    />
                  </button>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500">No photos yet.</p>}
          </>
        ) : (
          <p className="text-gray-600">Click a 📍 to view my photos and notes.</p>
        )}
      </aside>

      {/* Lightbox：从中间展开 */}
      {lightboxOpen && selected && (
        <div
          className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 text-white">
              <div className="font-medium">{selected.name}</div>
              <button className="opacity-80 hover:opacity-100" onClick={() => setLightboxOpen(false)}>✕</button>
            </div>
            <div className="relative w-full h-[70vh] bg-black">
              <Image
                src={selected.photos[idx]}
                alt={`${selected.name} ${idx+1}`}
                fill // 关键：让 Image 填充容器
                className="object-contain" // 关键：等比完整展示（不裁切）
                sizes="(max-width: 1024px) 100vw, 960px"
                priority
              />
              {/* 左右切换 */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-2"
                onClick={() => setIdx(i => (i - 1 + selected.photos.length) % selected.photos.length)}
              >
                ‹
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-2"
                onClick={() => setIdx(i => (i + 1) % selected.photos.length)}
              >
                ›
              </button>
            </div>
            {/* 缩略图条 */}
            <div className="p-3 bg-black">
              <div className="flex gap-2 overflow-x-auto">
                {selected.photos.map((p, i) => (
                  <button key={p} onClick={() => setIdx(i)} className="shrink-0">
                    <div className={`relative w-40 aspect-[4/3] rounded ${i===idx ? "ring-2 ring-white" : ""}`}>
                        <Image
                         src={p}
                         alt={`thumb ${i+1}`}
                         fill
                         className="object-cover rounded"
                         sizes="160px"
                        />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
