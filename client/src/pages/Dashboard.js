import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

import StatsCards from "../components/StatsCards";
import InsightsCard from "../components/InsightsCard";
import WeightChartCard from "../components/WeightChartCard";
import StrengthCard from "../components/StrengthCard";
import StrengthChartCard from "../components/StrengthChartCard";

const initialMetricForm = {
  date: "",
  weight: "",
  height: "",
  bodyFat: "",
  calories: "",
};

const initialWorkoutForm = {
  date: "",
  exercise: "",
  reps: "",
  weight: "",
};

function Dashboard() {
  const [weightData, setWeightData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [strengthData, setStrengthData] = useState([]);
  const [metricForm, setMetricForm] = useState(initialMetricForm);
  const [workoutForm, setWorkoutForm] = useState(initialWorkoutForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metricStatus, setMetricStatus] = useState("");
  const [workoutStatus, setWorkoutStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const dashboardStats = useMemo(() => {
    const latestWeight = weightData[weightData.length - 1]?.weight ?? "--";
    const uniqueExercises = new Set(strengthData.map((item) => item.exercise));
    const uniqueSessions = new Set(
      strengthData.map((item) => new Date(item.date).toDateString())
    );

    return {
      latestWeight,
      exerciseCount: uniqueExercises.size,
      sessionCount: uniqueSessions.size,
    };
  }, [strengthData, weightData]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [weightRes, insightRes, strengthRes] = await Promise.all([
        API.get("/analytics/weight"),
        API.get("/analytics/insights"),
        API.get("/analytics/strength"),
      ]);

      setWeightData(weightRes.data);
      setInsights(insightRes.data);
      setStrengthData(strengthRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleMetricChange = (event) => {
    const { name, value } = event.target;
    setMetricForm((current) => ({ ...current, [name]: value }));
  };

  const handleWorkoutChange = (event) => {
    const { name, value } = event.target;
    setWorkoutForm((current) => ({ ...current, [name]: value }));
  };

  const handleMetricSubmit = async (event) => {
    event.preventDefault();
    setMetricStatus("");

    try {
      await API.post("/metrics/add", {
        date: metricForm.date || undefined,
        weight: Number(metricForm.weight),
        height: Number(metricForm.height),
        bodyFat: metricForm.bodyFat === "" ? undefined : Number(metricForm.bodyFat),
        calories: metricForm.calories === "" ? undefined : Number(metricForm.calories),
      });

      setMetricForm(initialMetricForm);
      setMetricStatus("Metrics saved.");
      fetchData();
    } catch (err) {
      setMetricStatus(err.response?.data?.message || "Could not save metrics.");
    }
  };

  const handleWorkoutSubmit = async (event) => {
    event.preventDefault();
    setWorkoutStatus("");

    try {
      await API.post("/workouts/add", {
        date: workoutForm.date || undefined,
        exercises: [
          {
            name: workoutForm.exercise,
            sets: [
              {
                reps: Number(workoutForm.reps),
                weight: Number(workoutForm.weight),
              },
            ],
          },
        ],
      });

      setWorkoutForm(initialWorkoutForm);
      setWorkoutStatus("Workout saved.");
      fetchData();
    } catch (err) {
      setWorkoutStatus(err.response?.data?.message || "Could not save workout.");
    }
  };

  return (
    <div className="min-h-screen dashboard-bg px-4 py-6 md:px-8">
      <div className="dashboard-orb dashboard-orb--one"></div>
      <div className="dashboard-orb dashboard-orb--two"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <section className="dashboard-hero mb-6">
          <div>
            <p className="dashboard-kicker">Fitness Analytics Hub</p>
            <h1 className="dashboard-title">Train, track, and review from one dashboard.</h1>
            <p className="muted max-w-2xl">
              Your overview, analytics, and workout logging now live in one place,
              so the screen after login feels like a real command center.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={fetchData} className="dashboard-chip">
              Refresh data
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="dashboard-chip dashboard-chip--danger"
            >
              Logout
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-6 mb-6">
          <div className="space-y-6">
            <div className="dashboard-panel">
              <div className="section-heading">
                <div>
                  <p className="dashboard-kicker">Overview</p>
                  <h2 className="card-title mb-1">Your current snapshot</h2>
                </div>
                <div className="dashboard-mini-stats">
                  <div>
                    <span className="dashboard-mini-label">Latest Weight</span>
                    <strong>{dashboardStats.latestWeight}{dashboardStats.latestWeight === "--" ? "" : " kg"}</strong>
                  </div>
                  <div>
                    <span className="dashboard-mini-label">Exercises</span>
                    <strong>{dashboardStats.exerciseCount}</strong>
                  </div>
                  <div>
                    <span className="dashboard-mini-label">Sessions</span>
                    <strong>{dashboardStats.sessionCount}</strong>
                  </div>
                </div>
              </div>

              <StatsCards weightData={weightData} />
            </div>

            <div className="dashboard-panel">
              <div className="section-heading">
                <div>
                  <p className="dashboard-kicker">Analytics</p>
                  <h2 className="card-title mb-1">Weight and strength trends</h2>
                </div>
              </div>

              {loading ? (
                <p className="muted">Loading dashboard...</p>
              ) : error ? (
                <p className="muted">{error}</p>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <InsightsCard insights={insights} />
                    <WeightChartCard weightData={weightData} />
                  </div>
                  <div className="space-y-6">
                    <StrengthChartCard strengthData={strengthData} />
                    <StrengthCard strengthData={strengthData} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="dashboard-panel">
              <p className="dashboard-kicker">Quick Actions</p>
              <h2 className="card-title">What do you want to log today?</h2>
              <p className="muted mb-4">
                Add fresh body metrics or record an exercise set without leaving the dashboard.
              </p>

              <div className="dashboard-action-grid">
                <div className="dashboard-action-card">
                  <span className="dashboard-action-tag">Metrics</span>
                  <h3>Update body stats</h3>
                  <p className="muted">Track weight, height, body fat, and calories for trend analysis.</p>
                </div>
                <div className="dashboard-action-card">
                  <span className="dashboard-action-tag">Workout</span>
                  <h3>Add an exercise</h3>
                  <p className="muted">Capture a workout set so your strength progress updates right away.</p>
                </div>
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="section-heading">
                <div>
                  <p className="dashboard-kicker">Add Metrics</p>
                  <h2 className="card-title mb-1">Log a body measurement</h2>
                </div>
              </div>

              <form onSubmit={handleMetricSubmit} className="dashboard-form">
                <input
                  type="date"
                  name="date"
                  value={metricForm.date}
                  onChange={handleMetricChange}
                  className="fancy-input"
                />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={metricForm.weight}
                  onChange={handleMetricChange}
                  className="fancy-input"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  name="height"
                  placeholder="Height (cm)"
                  value={metricForm.height}
                  onChange={handleMetricChange}
                  className="fancy-input"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  name="bodyFat"
                  placeholder="Body fat %"
                  value={metricForm.bodyFat}
                  onChange={handleMetricChange}
                  className="fancy-input"
                />
                <input
                  type="number"
                  step="1"
                  min="0"
                  name="calories"
                  placeholder="Calories"
                  value={metricForm.calories}
                  onChange={handleMetricChange}
                  className="fancy-input"
                />

                <button type="submit" className="accent-btn w-full">
                  Save metrics
                </button>
                {metricStatus && <p className="muted text-sm">{metricStatus}</p>}
              </form>
            </div>

            <div className="dashboard-panel">
              <div className="section-heading">
                <div>
                  <p className="dashboard-kicker">Add Exercise</p>
                  <h2 className="card-title mb-1">Log a workout set</h2>
                </div>
              </div>

              <form onSubmit={handleWorkoutSubmit} className="dashboard-form">
                <input
                  type="date"
                  name="date"
                  value={workoutForm.date}
                  onChange={handleWorkoutChange}
                  className="fancy-input"
                />
                <input
                  type="text"
                  name="exercise"
                  placeholder="Exercise name"
                  value={workoutForm.exercise}
                  onChange={handleWorkoutChange}
                  className="fancy-input"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    name="reps"
                    placeholder="Reps"
                    value={workoutForm.reps}
                    onChange={handleWorkoutChange}
                    className="fancy-input"
                    required
                  />
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={workoutForm.weight}
                    onChange={handleWorkoutChange}
                    className="fancy-input"
                    required
                  />
                </div>

                <button type="submit" className="accent-btn w-full">
                  Save exercise
                </button>
                {workoutStatus && <p className="muted text-sm">{workoutStatus}</p>}
              </form>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
