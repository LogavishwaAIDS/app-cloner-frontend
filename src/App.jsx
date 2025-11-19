import React, { useState } from "react";
import { startClone } from "./api";

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState(null);
  const [summary, setSummary] = useState(null);
  const [maxPages, setMaxPages] = useState(3);

  async function handleClone() {
    if (!url) return alert("Enter a URL");
    setLoading(true);
    setMsg(null);
    setPreview(null);
    setSummary(null);

    try {
      const res = await startClone(url, Number(maxPages));

      if (res.success) {
        setPreview(res.previewUrl);
        setMsg(`Generated ${res.details.pages} page(s).`);

        // save AI summary from backend
        setSummary(res.summary);
      } else {
        setMsg("Clone failed: " + (res.error || "unknown"));
      }
    } catch (e) {
      setMsg("Request failed: " + (e.message || e.toString()));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Web App Cloner — MVP</h1>

      <div className="card">
        <label>Website URL</label>
        <input
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label style={{ marginTop: 8 }}>Max Pages</label>
        <input
          type="number"
          min="1"
          max="10"
          value={maxPages}
          onChange={(e) => setMaxPages(e.target.value)}
        />

        <div className="row" style={{ marginTop: 12 }}>
          <button onClick={handleClone} disabled={loading}>
            {loading ? "Cloning..." : "Start Clone"}
          </button>

          <button onClick={() => setUrl("https://example.com")}>Example</button>
        </div>

        {msg && <div style={{ marginTop: 12 }}>{msg}</div>}

        {preview && (
          <div style={{ marginTop: 12 }}>
            <strong>Preview:</strong>
            <div style={{ marginTop: 8 }}>
              <a href={preview} target="_blank" rel="noreferrer">
                {preview}
              </a>
            </div>

            <div style={{ marginTop: 8 }}>
              <button onClick={() => window.open(preview, "_blank")}>
                Open Preview
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Summary Block */}
      {summary && (
        <div
          className="summary-box"
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f
