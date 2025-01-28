"use client";

import L from "leaflet";
import { Popup, Marker, TileLayer, MapContainer } from "react-leaflet";
import { IBranch } from "app/types/branch";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

type Props = {
  branches: IBranch[];
};
export default function MapView({ branches }: Props) {
  return (
    <MapContainer
      center={[4.65689177649476, -74.09243489455264]}
      zoom={7}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={[Number(branch.latitud), Number(branch.longitud)]}
          icon={L.icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
        >
          <Popup autoPan={false} closeButton={false}>
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-bold">{branch.nombre}</h1>
              <p className="text-sm">{branch.direccion}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
