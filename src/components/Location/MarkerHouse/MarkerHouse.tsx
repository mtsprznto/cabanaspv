import { Marker, Popup, useMap } from "react-leaflet";
import { MarkerHouseProps } from "./MarkerHouse.types";
import { housesData } from "./MarkerHouse.data";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { dataProperties } from "@/components/Properties/Properties.data";
import { formatPrice } from "@/utils/formatPrice";

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
        <div className="flex items-center mb-2 max-w-xs w-fit text-sm">
          <span className="mr-4 text-secondary">
            <FaMapMarkerAlt />
          </span>
          <h5 className="text-xs text-secondary">{name}</h5>
        </div>
        <div className="flex flex-wrap gap-4">
          <Image
            src={`/assets/houses/${image}`}
            alt={name}
            width={100}
            height={100}
            className="w-32 h-32 object-cover"
          />
          {dataProperties.map(({ id, price }) => (
            <div key={id} className="text-sm text-secondary">
              {formatPrice(price)}
            </div>
          ))}
        </div>
        <Link
          href={`/properties/${id}`}
          className="shadow-light hover:shadow-xl rounded-2xl transition-all duration-300 cursor-pointer"
          key={id}
        >
          <button className="px-3 py-2 mt-2 text-white rounded-lg bg-secondary text-xs">
            Ver propiedad
          </button>
        </Link>
      </Popup>
    </Marker>
  ));
}
