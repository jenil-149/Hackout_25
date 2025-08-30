import { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../../api/client";

export default function ZonesLayer() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    api.get("/api/zones")
       .then(res => setZones(res.data.features || []))
       .catch(err => console.error("Error loading zones:", err));
  }, []);

  return (
    <>
      {zones.map((f, i) => (
        <Polygon
          key={i}
          positions={
            f.geometry.type === "Polygon"
              ? f.geometry.coordinates[0].map(c => [c[1], c[0]])
              : f.geometry.coordinates.map(poly =>
                  poly[0].map(c => [c[1], c[0]])
                )
          }
          pathOptions={{
            color: f.properties?.kind === "protected" ? "red" : "blue",
            fillOpacity: 0.2,
          }}
        >
          <Popup>
            <strong>{f.properties?.name || "Zone"}</strong><br/>
            Kind: {f.properties?.kind}
          </Popup>
        </Polygon>
      ))}
    </>
  );
}
