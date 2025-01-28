"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Marker as LeafletMarker, Map as LeafletMap } from 'leaflet';

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
  const mapRef = useRef<LeafletMap | null>(null);

  // -- States
  const [isDraggable] = useState(draggable);
  const [center] = useState({
    lat: Number(latitude),
    lng: Number(longitude),
  });
  const position = useMemo(() => ({ lat: Number(latitude), lng: Number(longitude) }), [latitude, longitude]);

  // -- Handlers
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = marker.getLatLng();
          // setPosition(latLng);
          callbackLatLng(latLng);
        }
      },
    }),
    [callbackLatLng]
  );

  // -- Effects
  useEffect(() => {
    // Move map to position
    mapRef.current?.panTo(position);
  }, [position]);

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
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        draggable={isDraggable}
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
