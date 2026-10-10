function groupByExercise(strengthData) {
  const groups = new Map();

  strengthData.forEach((item) => {
    if (!item?.exercise) {
      return;
    }

    if (!groups.has(item.exercise)) {
      groups.set(item.exercise, []);
    }

    groups.get(item.exercise).push(item);
  });

  return Array.from(groups.entries())
    .map(([exercise, entries]) => {
      const sorted = [...entries].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      if (sorted.length === 0) {
        return null;
      }

      const best = sorted.reduce((max, entry) =>
        entry.maxWeight > max.maxWeight ? entry : max,
        sorted[0]
      );
      const latest = sorted[sorted.length - 1];

      return { exercise, entries: sorted, best, latest };
    })
    .filter(Boolean);
}

function StrengthCard({ strengthData }) {
  const grouped = groupByExercise(strengthData);

  return (
    <div className="card mt-6">
      <h2 className="card-title">Strength Progress</h2>

      {grouped.length === 0 ? (
        <p className="muted">No strength data yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {grouped.map(({ exercise, entries, best, latest }) => (
            <div
              key={exercise}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-baseline justify-between mb-2 gap-3">
                <h3 className="font-semibold text-sm">{exercise}</h3>
                <span className="text-xs text-indigo-300">
                  PR: {best.maxWeight} kg
                </span>
              </div>

              <p className="muted text-sm mb-2">
                Latest: {latest.maxWeight} kg on{" "}
                {new Date(latest.date).toLocaleDateString()}
              </p>

              <details className="text-xs">
                <summary className="cursor-pointer text-gray-400">
                  History ({entries.length})
                </summary>
                <div className="mt-2 space-y-1">
                  {entries.map((item, index) => (
                    <p key={index} className="muted">
                      {new Date(item.date).toLocaleDateString()} {'->'} {item.maxWeight} kg
                    </p>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StrengthCard;
