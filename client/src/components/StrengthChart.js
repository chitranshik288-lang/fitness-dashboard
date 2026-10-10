import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// A palette so each exercise line gets a distinct, repeatable color.
const COLORS = [
  "#818cf8", // indigo
  "#34d399", // emerald
  "#f472b6", // pink
  "#fbbf24", // amber
  "#60a5fa", // blue
  "#f87171", // red
  "#a78bfa", // violet
  "#4ade80"  // green
];

/**
 * Raw strength data looks like:
 *   [{ exercise: "Bench Press", date: "...", maxWeight: 60 }, ...]
 * Recharts needs one row per date with a key per exercise, e.g.:
 *   [{ date: "...", "Bench Press": 60, "Squat": 100 }, ...]
 * so each exercise renders as its own line instead of one line
 * zigzagging across unrelated exercises.
 */
function pivotByExercise(data) {
  const byDate = new Map();

  data.forEach(({ exercise, date, maxWeight }) => {
    const dateKey = new Date(date).toLocaleDateString();
    if (!byDate.has(dateKey)) {
      byDate.set(dateKey, { date: dateKey });
    }
    byDate.get(dateKey)[exercise] = maxWeight;
  });

  return Array.from(byDate.values()).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

function StrengthChart({ data, selectedExercise }) {
  const filtered = selectedExercise
    ? data.filter((d) => d.exercise === selectedExercise)
    : data;

  const chartData = pivotByExercise(filtered);
  const exerciseNames = Array.from(
    new Set(filtered.map((d) => d.exercise))
  );

  if (chartData.length === 0) {
    return <p className="muted">No strength data to chart yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
        <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} unit=" kg" />
        <Tooltip
          contentStyle={{ background: "#0f1724", border: "1px solid #1e293b", borderRadius: 8 }}
          labelStyle={{ color: "#e6eef8" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {exerciseNames.map((name, i) => (
          <Line
            key={name}
            type="monotone"
            dataKey={name}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StrengthChart;