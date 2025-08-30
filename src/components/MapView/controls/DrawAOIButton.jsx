import { useMap } from "react-leaflet";
import { useEffect } from "react";

function DrawAOIHelper({ onAOI }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Example: listen for rectangle-draw or bbox logic
    // You can use leaflet-draw or just capture bounds manually
    map.on("boxzoomend", (e) => {
      const bounds = e.boxZoomBounds; // returns leaflet LatLngBounds
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ];
      onAOI(bbox);
    });

    return () => {
      map.off("boxzoomend");
    };
  }, [map, onAOI]);

  return null; // nothing visible inside map
}

export default function DrawAOIButton({ onAOI }) {
  return (
    <>
      {/* Floating button in UI */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        onClick={() => alert("Drag on map to select AOI (box-zoom)!")}
      >
        Draw AOI
      </button>

      {/* Hidden helper inside MapContainer (will be mounted in MapView) */}
      <DrawAOIHelper onAOI={onAOI} />
    </>
  );
}
