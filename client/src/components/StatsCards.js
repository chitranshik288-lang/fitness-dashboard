function StatsCards({ weightData }) {
  const hasData = weightData.length > 0;
  const first = weightData[0]?.weight;
  const last = weightData[weightData.length - 1]?.weight;
  const diff = hasData ? last - first : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="card text-center">
        <h3 className="muted">Total Entries</h3>
        <p className="stat-value">{weightData.length}</p>
      </div>

      <div className="card text-center">
        <h3 className="muted">Start Weight</h3>
        <p className="stat-value">{first ?? "--"}{hasData ? " kg" : ""}</p>
      </div>

      <div className="card text-center">
        <h3 className="muted">Latest Weight</h3>
        <p className="stat-value">{last ?? "--"}{hasData ? " kg" : ""}</p>
      </div>

      <div className="card text-center">
        <h3 className="muted">Trend</h3>
        <p className="muted">
          {!hasData
            ? "No weight data yet."
            : diff > 0
              ? "Your weight has increased."
              : diff < 0
                ? "Your weight has decreased."
                : "Your weight is stable."}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;
