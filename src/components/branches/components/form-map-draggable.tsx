"use client";

import { icon } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

type FormMapDraggableProps = {
  draggable: boolean;
  latitude: string;
  longitude: string;
  callbackLatLng: (latLng: { lat: number; lng: number }) => void;
};
export default function FormMapDraggable({
  draggable,
  latitude,
  longitude,
  callbackLatLng,
}: FormMapDraggableProps) {
  // -- Refs
  const markerRef = useRef(null);

  // -- States
  const [center, setCenter] = useState({
    lat: Number(latitude),
    lng: Number(longitude),
  });
  const [position, setPosition] = useState(center);

  // -- Events
  const detectPosition = () => {
    if (
      latitude !== position.lat.toString() &&
      longitude !== position.lng.toString()
    ) {
      setPosition({ lat: Number(latitude), lng: Number(longitude) });
      setCenter({ lat: Number(latitude), lng: Number(longitude) });
    }
  };

  // -- Handlers
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = marker.getLatLng();
          setPosition(latLng);
          callbackLatLng(latLng);
        }
      },
    }),
    []
  );

  // -- Effects latLng
  useEffect(() => {
    detectPosition();
  }, [latitude, longitude]);

  // -- Render
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "200px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={icon({
          iconUrl: markerIconPng as any,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })}
      >
        <Popup minWidth={90}>
          <span>{draggable ? "Marker is draggable" : ""}</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
