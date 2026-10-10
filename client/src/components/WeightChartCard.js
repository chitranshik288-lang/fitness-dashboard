import WeightChart from "./WeightChart";

function WeightChartCard({ weightData }) {
  return (
    <div className="card">
      <h2 className="card-title">Weight Progress</h2>

      <div className="flex justify-center">
        <WeightChart data={weightData} />
      </div>
    </div>
  );
}

export default WeightChartCard;