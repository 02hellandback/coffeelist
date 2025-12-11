// src/components/CoffeeMap.jsx
import React from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function CoffeeMap({ places, headerContent, title = "Map", frameStyle }) {
  const placesWithCoords = places.filter(
    (p) => typeof p.lat === "number" && typeof p.lng === "number"
  );

  const defaultCenter = { lat: 35.68, lng: 139.76 }; // central-ish Tokyo

  const center =
    placesWithCoords.length > 0
      ? {
          lat:
            placesWithCoords.reduce((sum, p) => sum + p.lat, 0) /
            placesWithCoords.length,
          lng:
            placesWithCoords.reduce((sum, p) => sum + p.lng, 0) /
            placesWithCoords.length,
        }
      : defaultCenter;

  return (
    <div style={{ marginBottom: "32px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <h2 style={{ fontSize: "1.4rem", margin: 0 }}>{title}</h2>
        {headerContent}
      </div>
      <div
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #1f2937",
          ...(frameStyle || {}),
        }}
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          />
          {placesWithCoords.map((place) => (
            <CircleMarker
              key={place.id}
              center={[place.lat, place.lng]}
              radius={6}
              pathOptions={{ weight: 1 }}
            >
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.neighborhood && <span>{place.neighborhood}</span>}
                {place.category && (
                  <>
                    <br />
                    <em>{place.category}</em>
                  </>
                )}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default CoffeeMap;
