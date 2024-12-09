import React, { useState } from "react";
import axios from "axios";

const SendMessage = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await axios.post("http://65.0.229.53:5005/send-message", {
        userQuery: query,
      });
      setResponse(result.data.text);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Send Query</h1>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query..."
        style={{ width: "100%", padding: "10px", fontSize: "16px", marginBottom: "10px" }}
      />
      <button
        onClick={handleSendMessage}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {response && (
          <div>
            <h3>Response:</h3>
            <p style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMessage;
