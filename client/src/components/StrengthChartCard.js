import { useMemo, useState } from "react";
import StrengthChart from "./StrengthChart";

function StrengthChartCard({ strengthData }) {
  const exerciseNames = useMemo(
    () => Array.from(new Set(strengthData.map((d) => d.exercise))).sort(),
    [strengthData]
  );

  // "" = show all exercises at once
  const [selectedExercise, setSelectedExercise] = useState("");

  return (
    <div className="card mt-6">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="card-title mb-0">Strength Chart</h2>

        {exerciseNames.length > 0 && (
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200 outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All exercises</option>
            {exerciseNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        )}
      </div>

      <StrengthChart data={strengthData} selectedExercise={selectedExercise} />
    </div>
  );
}

export default StrengthChartCard;