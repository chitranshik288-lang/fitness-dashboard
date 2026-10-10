function InsightsCard({ insights }) {
  return (
    <div className="card mb-6">
      <h2 className="card-title">Insights</h2>

      {Array.isArray(insights) ? (
        insights.map((i, index) => (
          <p key={index} className="muted">- {i}</p>
        ))
      ) : (
        <p className="muted">{insights?.message}</p>
      )}
    </div>
  );
}

export default InsightsCard;
