// src/components/MapCnMapView.jsx
import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const frameBaseStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #1f2937",
};

function MapCnMapView({ places, headerContent, frameStyle, title = "Map" }) {
  const placesWithCoords = useMemo(
    () => places.filter((p) => typeof p.lat === "number" && typeof p.lng === "number"),
    [places]
  );

  const defaultCenter = { lat: 35.68, lng: 139.76 };

  const center = useMemo(() => {
    if (!placesWithCoords.length) return defaultCenter;

    const totals = placesWithCoords.reduce(
      (acc, place) => ({
        lat: acc.lat + place.lat,
        lng: acc.lng + place.lng,
      }),
      { lat: 0, lng: 0 }
    );

    return {
      lat: totals.lat / placesWithCoords.length,
      lng: totals.lng / placesWithCoords.length,
    };
  }, [placesWithCoords]);

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

      <div style={{ ...frameBaseStyle, ...(frameStyle || {}) }}>
        {placesWithCoords.length === 0 ? (
          <PlaceholderMessage>No coordinates available for MapCN view.</PlaceholderMessage>
        ) : (
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://webrd02.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}"
              attribution='&copy; <a href="https://www.amap.com/">MapCN</a>'
            />

            <FitMapToPlaces places={placesWithCoords} />

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
        )}
      </div>
    </div>
  );
}

function FitMapToPlaces({ places }) {
  const map = useMap();

  React.useEffect(() => {
    if (!places.length) return;
    const bounds = new L.LatLngBounds();
    places.forEach((place) => bounds.extend([place.lat, place.lng]));
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, places]);

  return null;
}

function PlaceholderMessage({ children }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af",
        backgroundColor: "#0b1226",
        textAlign: "center",
        padding: "12px",
      }}
    >
      {children}
    </div>
  );
}

export default MapCnMapView;
