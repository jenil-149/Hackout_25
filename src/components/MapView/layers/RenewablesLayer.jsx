import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { api } from "../../../api/client";

export default function RenewablesLayer() {
  const [renewables, setRenewables] = useState([]);

  useEffect(() => {
    api.get("/api/assets", { params: { type: "renewable" } })
       .then(res => setRenewables(res.data.features || []))
       .catch(err => console.error("Error loading renewables:", err));
  }, []);

  return (
    <>
      {renewables.map((f, i) => (
        <Marker
          key={i}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
        >
          <Popup>
            <strong>{f.properties?.name || "Renewable Source"}</strong><br/>
            Type: Renewable
          </Popup>
        </Marker>
      ))}
    </>
  );
}
