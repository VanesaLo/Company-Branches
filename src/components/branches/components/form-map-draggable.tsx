"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Marker as LeafletMarker } from 'leaflet';

{/* Markers */}
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import 'leaflet-defaulticon-compatibility';

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
  const markerRef = useRef<LeafletMarker | null>(null);

  // -- States
  const [center, setCenter] = useState({
    lat: Number(latitude),
    lng: Number(longitude),
  });
  const [position, setPosition] = useState(center);

  // -- Events
  const detectPosition = useCallback(() => {
    if (
      latitude !== position.lat.toString() &&
      longitude !== position.lng.toString()
    ) {
      setPosition({ lat: Number(latitude), lng: Number(longitude) });
      setCenter({ lat: Number(latitude), lng: Number(longitude) });
    }
  }, [latitude, longitude, position]);

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
    [callbackLatLng]
  );

  // -- Effects
  // Detect position on mount
  useEffect(() => {
    detectPosition();
  }, [detectPosition]);

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
      >
        <Popup minWidth={90}>
          <span>{draggable ? "Marker is draggable" : ""}</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
