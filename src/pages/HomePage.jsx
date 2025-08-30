import FiltersPanel from "./components/Sidebar/FiltersPanel";
import SuggestionList from "../components/Sidebar/SuggestionList";
import SiteDetails from "./components/Sidebar/SiteDetails";
import MapView from "../components/MapView/MapView";

export default function HomePage() {
  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 p-3 space-y-4 overflow-y-auto border-r">
        <FiltersPanel />
        <SuggestionList />
        <SiteDetails />
      </div>

      {/* Main Map */}
      <div className="flex-1">
        <MapView />
      </div>
    </div>
  );
}
