// src/components/CoffeeMap.jsx
import React from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function CoffeeMap({ places }) {
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
      <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Map</h2>
      <div
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #1f2937",
        }}
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
