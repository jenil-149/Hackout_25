import { useState } from "react";
import { api } from "../../../api/client";

export default function SearchBox({ onResult }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      // Example: call your backend or an external geocoding API
      const res = await api.get("/api/assets", { params: { q: query } });
      onResult?.(res.data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-xl shadow flex items-center gap-2 px-2 py-1"
    >
      <input
        type="text"
        value={query}
        placeholder="Search location or asset..."
        onChange={e => setQuery(e.target.value)}
        className="flex-1 outline-none text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-2 py-1 text-xs bg-green-600 text-white rounded"
      >
        {loading ? "..." : "Go"}
      </button>
    </form>
  );
}
