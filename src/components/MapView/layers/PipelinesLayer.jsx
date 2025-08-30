import { useEffect, useState } from "react";
import { Polyline, Popup } from "react-leaflet";
import { api } from "../../../api/client";

export default function PipelinesLayer() {
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    api.get("/api/assets", { params: { type: "pipeline" } })
       .then(res => setPipelines(res.data.features || []))
       .catch(err => console.error("Error loading pipelines:", err));
  }, []);

  return (
    <>
      {pipelines.map((f, i) => (
        <Polyline
          key={i}
          positions={f.geometry.coordinates.map(c => [c[1], c[0]])}
          pathOptions={{ color: "orange", weight: 3 }}
        >
          <Popup>
            <strong>{f.properties?.name || "Pipeline"}</strong><br/>
            Type: Pipeline
          </Popup>
        </Polyline>
      ))}
    </>
  );
}
