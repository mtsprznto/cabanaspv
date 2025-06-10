import { Marker, Popup, useMap } from "react-leaflet";
import { MarkerHouseProps } from "./MarkerHouse.types";
import { housesData } from "./MarkerHouse.data";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";



export function MarkerHouse(props: MarkerHouseProps) {
  const { selectMarker } = props;
  const fnMap = useMap();
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => setLeaflet(L)); // ✅ Importar Leaflet solo en cliente
  }, []);

  if (!leaflet) return null; // ✅ Esperar a que Leaflet se cargue antes de renderizar

  const customIcon = leaflet.icon({
    iconUrl: "/assets/marker.svg",
    iconSize: [40, 40],
  });

  return housesData.map(({ id, name, position, image }) => (
    <Marker
      key={id}
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          selectMarker(position, fnMap);
        },
      }}
    >
      <Popup>
        <div className="flex items-center mb-2">
          <span className="mr-4 text-secondary">
            <FaMapMarkerAlt />
          </span>
          <h5 className="text-md text-secondary">{name}</h5>
        </div>
        <Image src={`/assets/houses/${image}`} alt={name} width={100} height={100} className="w-full h-auto" />
        <button className="px-3 py-2 mt-2 text-white rounded-lg bg-secondary">Ver propiedad</button>
      </Popup>
    </Marker>
  ));
}