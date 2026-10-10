import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function WeightChart({ data }) {
  if (data.length === 0) {
    return <p className="muted">No weight data to chart yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
        <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} unit=" kg" />
        <Tooltip
          contentStyle={{ background: "#0f1724", border: "1px solid #1e293b", borderRadius: 8 }}
          labelStyle={{ color: "#e6eef8" }}
        />
        <Line type="monotone" dataKey="weight" stroke="#818cf8" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeightChart;
