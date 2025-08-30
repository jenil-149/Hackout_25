import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ScoreBreakdownChart({ breakdown }) {
  const data = [
    { k: "Renewables", v: breakdown.renewables },
    { k: "Demand",     v: breakdown.demand },
    { k: "Transport",  v: breakdown.transport },
    { k: "ZonePenalty",v: -breakdown.zonePenalty },
  ];
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="k"/><YAxis domain={[-1, 1]}/><Tooltip/>
          <Bar dataKey="v" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
