// src/components/GoogleMapView.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const mapLoaders = new Map();

function loadGoogleMaps(apiKey) {
  if (!apiKey) {
    return Promise.reject(new Error("Missing Google Maps API key"));
  }

  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (!mapLoaders.has(apiKey)) {
    mapLoaders.set(
      apiKey,
      new Promise((resolve, reject) => {
        const existingScript = document.getElementById("google-maps-script");
        if (existingScript) {
          existingScript.addEventListener("load", () => {
            window.google && window.google.maps
              ? resolve(window.google.maps)
              : reject(new Error("Google Maps failed to initialize"));
          });
          existingScript.addEventListener("error", () =>
            reject(new Error("Google Maps failed to load"))
          );
          return;
        }

        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (window.google && window.google.maps) {
            resolve(window.google.maps);
          } else {
            reject(new Error("Google Maps failed to initialize"));
          }
        };
        script.onerror = () => reject(new Error("Google Maps failed to load"));
        document.head.appendChild(script);
      })
    );
  }

  return mapLoaders.get(apiKey);
}

const frameBaseStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #1f2937",
};

function GoogleMapView({ places, apiKey, headerContent, frameStyle, title = "Map" }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [status, setStatus] = useState(apiKey ? "loading" : "missing-key");
  const [errorMessage, setErrorMessage] = useState("");

  const placesWithCoords = useMemo(
    () => places.filter((p) => typeof p.lat === "number" && typeof p.lng === "number"),
    [places]
  );

  const center = useMemo(() => {
    const defaultCenter = { lat: 35.68, lng: 139.76 };
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

  useEffect(() => {
    let isCancelled = false;

    if (!apiKey) {
      setStatus("missing-key");
      return undefined;
    }

    setStatus("loading");
    loadGoogleMaps(apiKey)
      .then(() => {
        if (isCancelled) return;
        setStatus("ready");
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
          disableDefaultUI: true,
          zoomControl: true,
        });
      })
      .catch((err) => {
        if (isCancelled) return;
        setStatus("error");
        setErrorMessage(err.message);
      });

    return () => {
      isCancelled = true;
    };
  }, [apiKey, center]);

  useEffect(() => {
    const mapInstance = mapInstanceRef.current;
    if (status !== "ready" || !mapInstance) return undefined;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = placesWithCoords.map((place) => {
      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: mapInstance,
        title: place.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${place.name}</strong><br/>${
          place.neighborhood || "Tokyo"
        }${place.category ? `<br/><em>${place.category}</em>` : ""}</div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open({ anchor: marker, map: mapInstance });
      });

      return marker;
    });

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [placesWithCoords, status]);

  useEffect(() => {
    const mapInstance = mapInstanceRef.current;
    if (status !== "ready" || !mapInstance || !placesWithCoords.length) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    placesWithCoords.forEach((place) =>
      bounds.extend(new window.google.maps.LatLng(place.lat, place.lng))
    );

    mapInstance.fitBounds(bounds, { padding: 24 });
  }, [placesWithCoords, status]);

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
        {status === "missing-key" && (
          <PlaceholderMessage>
            Add a <code>VITE_GOOGLE_MAPS_API_KEY</code> to enable the Google map.
          </PlaceholderMessage>
        )}

        {status === "loading" && (
          <PlaceholderMessage>Loading Google Maps…</PlaceholderMessage>
        )}

        {status === "error" && (
          <PlaceholderMessage>
            Unable to load Google Maps{errorMessage ? `: ${errorMessage}` : "."}
          </PlaceholderMessage>
        )}

        <div
          ref={mapRef}
          style={{ height: "100%", width: "100%", display: status === "ready" ? "block" : "none" }}
        />
      </div>
    </div>
  );
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

export default GoogleMapView;
