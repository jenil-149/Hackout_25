import { useState } from "react";
import { useAppStore } from "../../store/appStore";

export default function FiltersPanel() {
  const setFilters = useAppStore(s => s.setFilters);
  const [localFilters, setLocalFilters] = useState({
    maxDistanceRenew: 200,
    maxDistanceDemand: 200,
    excludeZones: true,
  });

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number(value),
    }));
  }

  function applyFilters() {
    setFilters(localFilters);
  }

  return (
    <div className="bg-white rounded-xl shadow p-3 space-y-3">
      <h3 className="font-semibold text-sm">Filters</h3>

      <div className="flex flex-col gap-1">
        <label className="text-xs">Max Distance to Renewables (km)</label>
        <input
          type="number"
          name="maxDistanceRenew"
          value={localFilters.maxDistanceRenew}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs">Max Distance to Demand Centers (km)</label>
        <input
          type="number"
          name="maxDistanceDemand"
          value={localFilters.maxDistanceDemand}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="excludeZones"
          checked={localFilters.excludeZones}
          onChange={handleChange}
        />
        Exclude Protected Zones
      </label>

      <button
        onClick={applyFilters}
        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
      >
        Apply
      </button>
    </div>
  );
}
