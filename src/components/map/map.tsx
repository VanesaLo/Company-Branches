"use client";

import { Popup, Marker, TileLayer, MapContainer } from "react-leaflet";
import { IBranch } from "app/types/branch";

{/* Markers */}
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import 'leaflet-defaulticon-compatibility';

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
