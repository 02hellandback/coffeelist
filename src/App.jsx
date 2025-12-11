// src/App.jsx
import React, { useMemo, useState } from "react";
import { tokyoCoffeeList } from "./data/tokyoCoffeeList";
import CoffeeMap from "./components/CoffeeMap";
import GoogleMapView from "./components/GoogleMapView";
import "leaflet/dist/leaflet.css";

function App() {
  const list = tokyoCoffeeList;
  const categories = ["Specialty", "Kissa / Classic / Vibes"];
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [mapProvider, setMapProvider] = useState(
    googleMapsApiKey ? "google" : "leaflet"
  );

  const mapOptions = useMemo(
    () => [
      { id: "leaflet", label: "OpenStreetMap" },
      { id: "google", label: "Google Maps", disabled: !googleMapsApiKey },
    ],
    [googleMapsApiKey]
  );

  const renderMapToggle = () => (
    <div style={styles.toggleGroup}>
      {mapOptions.map((option) => {
        const isActive = mapProvider === option.id;
        return (
          <button
            key={option.id}
            type="button"
            style={{
              ...styles.toggleButton,
              ...(isActive ? styles.toggleButtonActive : {}),
              ...(option.disabled ? styles.toggleButtonDisabled : {}),
            }}
            onClick={() => !option.disabled && setMapProvider(option.id)}
            disabled={option.disabled}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>{list.title}</h1>
        <p style={styles.subtitle}>{list.shortDescription}</p>
      </header>

      <main style={styles.main}>
        {/* Map section */}
        {mapProvider === "google" ? (
          <GoogleMapView
            places={list.places}
            apiKey={googleMapsApiKey}
            headerContent={renderMapToggle()}
            frameStyle={styles.mapFrame}
          />
        ) : (
          <CoffeeMap
            places={list.places}
            headerContent={renderMapToggle()}
            frameStyle={styles.mapFrame}
          />
        )}

        {/* Overview */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Overview / Write-Up</h2>
          <p style={styles.paragraph}>
            {list.longDescription.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </section>

        {/* Coffee spots grouped by category */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Coffee Spots</h2>

          {categories.map((category) => {
            const places = list.places.filter(
              (place) => place.category === category
            );
            if (!places.length) return null;

            return (
              <div key={category} style={styles.categoryBlock}>
                <h3 style={styles.categoryTitle}>{category}</h3>
                <div style={styles.cardGrid}>
                  {places.map((place) => (
                    <CoffeeCard key={place.id} place={place} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

function CoffeeCard({ place }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapsQuery || place.address || place.name
  )}`;

  return (
    <article style={styles.card}>
      <div style={styles.cardHeaderRow}>
        <h3 style={styles.cardTitle}>{place.name}</h3>
        {place.category && (
          <span style={styles.categoryPill}>{place.category}</span>
        )}
      </div>

      <p style={styles.cardMeta}>
        <strong>Area:</strong> {place.neighborhood || "Tokyo"}
      </p>

      {place.address && (
        <p style={styles.cardMeta}>
          <strong>Address:</strong> {place.address}
        </p>
      )}

      {place.notes && <p style={styles.cardBody}>{place.notes}</p>}

      <div style={styles.cardActions}>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.mapButton}
        >
          Open in Google Maps
        </a>
      </div>
    </article>
  );
}

const styles = {
  app: {
    fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    backgroundColor: "#0b1120",
    color: "#e5e7eb",
    minHeight: "100vh",
    padding: "24px",
  },
  header: {
    maxWidth: "960px",
    margin: "0 auto 24px auto",
  },
  title: {
    fontSize: "2.4rem",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#9ca3af",
  },
  main: {
    maxWidth: "960px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    marginBottom: "12px",
  },
  mapFrame: {
    backgroundColor: "#0b1226",
  },
  toggleGroup: {
    display: "inline-flex",
    gap: "8px",
  },
  toggleButton: {
    borderRadius: "999px",
    border: "1px solid #1f2937",
    backgroundColor: "#0f172a",
    color: "#e5e7eb",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  toggleButtonActive: {
    borderColor: "#38bdf8",
    color: "#e0f2fe",
    boxShadow: "0 0 0 1px rgba(56, 189, 248, 0.35)",
  },
  toggleButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  paragraph: {
    lineHeight: 1.6,
    color: "#d1d5db",
    whiteSpace: "pre-line",
  },
  categoryBlock: {
    marginBottom: "24px",
  },
  categoryTitle: {
    fontSize: "1.2rem",
    marginBottom: "8px",
    color: "#facc15",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: "16px",
    padding: "16px",
    border: "1px solid #1f2937",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
  },
  cardHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "8px",
    marginBottom: "4px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    margin: 0,
  },
  categoryPill: {
    fontSize: "0.7rem",
    padding: "4px 8px",
    borderRadius: "999px",
    border: "1px solid #38bdf8",
    whiteSpace: "nowrap",
  },
  cardMeta: {
    fontSize: "0.9rem",
    color: "#9ca3af",
    marginBottom: "4px",
  },
  cardBody: {
    fontSize: "0.95rem",
    color: "#d1d5db",
    margin: "8px 0 12px 0",
  },
  cardActions: {
    marginTop: "8px",
  },
  mapButton: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    border: "1px solid #38bdf8",
    color: "#e0f2fe",
    fontSize: "0.9rem",
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default App;

