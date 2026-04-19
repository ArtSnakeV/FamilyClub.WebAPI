"use client";

import { useEffect, useState } from "react";

export default function AuthorsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://localhost:7069/api/authors")
      .then(async (res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return await res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Authors API Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}