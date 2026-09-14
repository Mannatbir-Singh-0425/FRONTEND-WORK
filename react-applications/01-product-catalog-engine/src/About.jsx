function About() {
  return (
    <div style={{
      background: "#131b2e",
      border: "1px solid #24324f",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      marginBottom: "2rem",
      color: "#cbd5e1"
    }}>
      <h2 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "0.5rem" }}>Architecture & Conditional Rendering Module</h2>
      <p style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
        This module encapsulates conditional stock determination, immutable prop passing, and component composability in modern React 19.
      </p>
    </div>
  );
}

export default About;