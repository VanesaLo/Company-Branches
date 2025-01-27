"use client";

import L from "leaflet";
import { useState } from "react";
// import MarkerClusterGroup from 'react-leaflet-cluster';
import { Popup, Marker, TileLayer, MapContainer } from "react-leaflet";
import IBranche from "app/types/braches";

type Props = {
  branch?: IBranche;
};
export default function MapView({ branch }: Props) {

  return (
    <MapContainer
      center={[4.65689177649476, -74.09243489455264]}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {branch && (
        <Marker
          position={[Number(branch.latitud), Number(branch.longitud)]}
          icon={
            new L.DivIcon({
              className: "marker-text",
              iconSize: [70, 70],
              iconAnchor: [25, 25],
              popupAnchor: [0, -25],
            })
          }
        >
          {/* <Popup autoPan={false} closeButton={false}>
              </Popup> */}
        </Marker>
      )}
    </MapContainer>
  );
}
