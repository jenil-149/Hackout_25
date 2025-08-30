import { useAppStore } from "../../store/appStore";
import ScoreBreakdownChart from "../charts/ScoreBreakdownChart";

export default function SiteDetails() {
  const site = useAppStore(s => s.selectedSite);
  const clearSelectedSite = useAppStore(s => s.clearSelectedSite);

  if (!site) {
    return (
      <div className="p-3 bg-white rounded-xl shadow text-sm">
        Select a site to see details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-3 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Site Details</h3>
        <button
          onClick={clearSelectedSite}
          className="text-xs text-red-500 hover:underline"
        >
          Close
        </button>
      </div>

      <div className="text-sm">
        <p><strong>Coordinates:</strong> {site.lat.toFixed(4)}, {site.lng.toFixed(4)}</p>
        <p><strong>Score:</strong> {(site.score * 100).toFixed(1)}%</p>
      </div>

      <div>
        <h4 className="text-xs font-semibold mb-1">Score Breakdown</h4>
        <ScoreBreakdownChart breakdown={site.breakdown} />
      </div>

      {site.metadata && (
        <div className="text-xs space-y-1">
          <h4 className="font-semibold">Nearby Assets</h4>
          {site.metadata.renewables && <p>Renewables: {site.metadata.renewables.length}</p>}
          {site.metadata.demand && <p>Demand Centers: {site.metadata.demand.length}</p>}
          {site.metadata.pipelines && <p>Pipelines: {site.metadata.pipelines.length}</p>}
          {site.metadata.zones && <p>Zones: {site.metadata.zones.length}</p>}
        </div>
      )}
    </div>
  );
}
