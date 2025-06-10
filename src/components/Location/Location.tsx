"use client";

import { Transition } from "../Transition";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const MarkerHouse = dynamic(
  () => import("./MarkerHouse").then((mod) => mod.MarkerHouse),
  { ssr: false }
);
export function Location() {
  const coordinatePoint = { lat: 40.463667, lng: -3.74922 };
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("leaflet/dist/leaflet.css"); // ✅ Alternativa con require()
    }
  }, []);

  const centerMarker = (position: { lat: number; lng: number }, fnMap: any) => {
    if (fnMap?.flyTo) {
      fnMap.flyTo(position, 12);
    }
  };

  return (
    <Transition className="px-4 py-8 md:py-44 md:px-36">
      <h4 className="text-center text-secondary" id="location">
        Localización
      </h4>
      <h2 className="max-w-2xl mx-auto my-4 mb-8 text-3xl font-semibold text-center">
        Disponibles en todo Puerto Varas
      </h2>
      {leaflet && (
        <MapContainer
          center={coordinatePoint}
          zoom={6}
          scrollWheelZoom={false}
          className="h-[700px]"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png" />
          <MarkerHouse selectMarker={centerMarker} />
        </MapContainer>
      )}
    </Transition>
  );
}
