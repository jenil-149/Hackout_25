import { useAppStore } from "../../store/appStore";
import ScoreBreakdownChart from "../charts/ScoreBreakdownChart";

export default function SuggestionList() {
  const suggestions = useAppStore(s => s.suggestions);
  const setSelectedSite = useAppStore(s => s.setSelectedSite);

  if (!suggestions?.length) {
    return (
      <div className="p-3 bg-white rounded-xl shadow">
        Click on the map or draw an AOI to get suggestions.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((s, i) => (
        <div
          key={i}
          className="p-3 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedSite(s)}
        >
          <div className="font-semibold">#{i + 1} Score: {(s.score * 100).toFixed(1)}</div>
          <div className="text-xs">Lng: {s.lng.toFixed(3)} Lat: {s.lat.toFixed(3)}</div>
          <ScoreBreakdownChart breakdown={s.breakdown} />
        </div>
      ))}
    </div>
  );
}
