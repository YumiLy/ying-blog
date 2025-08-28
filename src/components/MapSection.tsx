"use client";
import dynamic from "next/dynamic";
const MapGallery = dynamic(() => import("@/components/MapGallery"), { ssr: false });
export default function MapSection() {
  return <MapGallery />;
}
