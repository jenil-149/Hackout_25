import { useState } from "react";

export default function LayerToggles({ className }) {
  const [layers, setLayers] = useState({
    plants: true,
    renewables: true,
    demand: true,
    pipelines: true,
    zones: true,
  });

  const toggle = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
    // Could dispatch to global store or context if needed
  };

  // Assign colors/icons per layer for clarity
  const layerStyles = {
    plants: "text-green-600",
    renewables: "text-yellow-600",
    demand: "text-blue-600",
    pipelines: "text-purple-600",
    zones: "text-red-600",
  };

  return (
    <div
      className={`${className} bg-white rounded-xl shadow-lg p-4 w-52 space-y-3`}
    >
      <h3 className="font-semibold text-gray-700 text-base border-b pb-2">
        Layers
      </h3>

      {Object.keys(layers).map((k) => (
        <label
          key={k}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 py-1 transition"
        >
          <input
            type="checkbox"
            checked={layers[k]}
            onChange={() => toggle(k)}
            className="h-4 w-4 accent-blue-600"
          />
          <span className={`capitalize ${layerStyles[k]}`}>
            {k}
          </span>
        </label>
      ))}
    </div>
  );
}
