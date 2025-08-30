import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { api } from "../../../api/client";

export default function DemandCentersLayer() {
  const [demandCenters, setDemandCenters] = useState([]);

  useEffect(() => {
    api.get("/api/assets", { params: { type: "demand" } })
       .then(res => setDemandCenters(res.data.features || []))
       .catch(err => console.error("Error loading demand centers:", err));
  }, []);

  return (
    <>
      {demandCenters.map((f, i) => (
        <Marker
          key={i}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
        >
          <Popup>
            <strong>{f.properties?.name || "Demand Center"}</strong><br/>
            Type: Demand
          </Popup>
        </Marker>
      ))}
    </>
  );
}
