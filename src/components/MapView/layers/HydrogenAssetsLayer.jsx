import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { api } from "../../../api/client";

export default function HydrogenAssetsLayer() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    api.get("/api/assets", { params: { type: "plant" } })
       .then(res => setPlants(res.data.features || []))
       .catch(err => console.error("Error loading plants:", err));
  }, []);

  return (
    <>
      {plants.map((f, i) => (
        <Marker
          key={i}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
        >
          <Popup>
            <strong>{f.properties?.name || "Hydrogen Plant"}</strong><br/>
            Type: Plant
          </Popup>
        </Marker>
      ))}
    </>
  );
}
