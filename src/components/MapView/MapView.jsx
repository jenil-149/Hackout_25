import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import HydrogenAssetsLayer from "./layers/HydrogenAssetsLayer";
import RenewablesLayer from "./layers/RenewablesLayer";
import DemandCentersLayer from "./layers/DemandCentersLayer";
import PipelinesLayer from "./layers/PipelinesLayer";
import ZonesLayer from "./layers/ZonesLayer";
import LayerToggles from "./controls/LayerToggles";
import DrawAOIButton from "./controls/DrawAOIButton";
import { api } from "../../api/client";
import { useMapSelection } from "../../hooks/useMapSelection";
import { useAppStore } from "../../store/appStore";

function MapView() {
  const { selectedPoint, bbox, ClickCatcher, selectBBox } = useMapSelection();
  const filters = useAppStore((s) => s.filters);
  const setSuggestions = useAppStore((s) => s.setSuggestions);

  // Fetch suggestions when user selects a point or AOI
  useEffect(() => {
    async function fetchSuggestions() {
      try {
        let params = {};
        if (selectedPoint) {
          params = { lng: selectedPoint.lng, lat: selectedPoint.lat };
        } else if (bbox) {
          params = { bbox: bbox.join(",") };
        } else {
          return;
        }

        if (filters) {
          params = { ...params, ...filters };
        }

        const res = await api.get("/api/suggest", { params });
        setSuggestions(res.data.top);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }
    fetchSuggestions();
  }, [selectedPoint, bbox, filters, setSuggestions]);

  return (
    <div className="w-full h-full relative">
      <MapContainer center={[20.59, 78.96]} zoom={5} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickCatcher />

        {/* Map Layers */}
        <HydrogenAssetsLayer />
        <RenewablesLayer />
        <DemandCentersLayer />
        <PipelinesLayer />
        <ZonesLayer />

        {/* Controls inside map */}
        <DrawAOIButton onAOI={selectBBox} />
      </MapContainer>

      {/* Controls outside map */}
      <LayerToggles className="absolute top-3 left-3" />
    </div>
  );
}

export default MapView;   // ✅ this line is critical
