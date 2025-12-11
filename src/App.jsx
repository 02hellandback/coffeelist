// src/App.jsx
import React from "react";
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
        <CoffeeMap places={list.places} />
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
@@ -108,50 +157,75 @@ const styles = {
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
