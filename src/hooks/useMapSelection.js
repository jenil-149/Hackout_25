import { useState, useCallback } from "react";
import { useMapEvents } from "react-leaflet";

/**
 * Custom hook for selecting points or areas on a Leaflet map
 * - Supports clicking on the map to pick a point
 * - Can later be extended to support bounding box (AOI)
 */
export function useMapSelection() {
  const [selectedPoint, setSelectedPoint] = useState(null);   // { lng, lat }
  const [bbox, setBbox] = useState(null);                     // [west, south, east, north]

  // Handle click events to select a point
  function ClickCatcher() {
    useMapEvents({
      click(e) {
        const lng = e.latlng.lng;
        const lat = e.latlng.lat;
        setSelectedPoint({ lng, lat });
        setBbox(null); // clear AOI if point selected
      },
    });
    return null;
  }

  // Manually set a bounding box (used with DrawAOIButton)
  const selectBBox = useCallback(coords => {
    // coords = [w, s, e, n]
    setBbox(coords);
    setSelectedPoint(null); // clear point if AOI selected
  }, []);

  // Reset selection
  const resetSelection = useCallback(() => {
    setSelectedPoint(null);
    setBbox(null);
  }, []);

  return {
    selectedPoint,
    bbox,
    ClickCatcher,   // JSX component → <ClickCatcher/> inside MapContainer
    selectBBox,     // function to set AOI programmatically
    resetSelection, // clear selection
  };
}
