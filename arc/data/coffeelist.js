// App.jsx
import React from "react";
import { tokyoCoffeeList } from "./data/tokyoCoffeeList";

function App() {
  const list = tokyoCoffeeList;

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>{list.title}</h1>
        <p style={styles.subtitle}>{list.shortDescription}</p>
      </header>

      <main style={styles.main}>
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

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Coffee Shops</h2>
          <div style={styles.cardGrid}>
            {list.places.map((place) => (
              <CoffeeCard key={place.id} place={place} />
            ))}
          </div>
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
      <h3 style={styles.cardTitle}>{place.name}</h3>
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
  paragraph: {
    lineHeight: 1.6,
    color: "#d1d5db",
    whiteSpace: "pre-line",
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
  cardTitle: {
    fontSize: "1.2rem",
    marginBottom: "8px",
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
