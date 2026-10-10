import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";

function App() {
  const token = localStorage.getItem("token");
  const [showRegister, setShowRegister] = useState(false);

  if(token) return <Dashboard />;

  return showRegister ? (
    <Register setShowRegister={setShowRegister} />
  ) : (
    <Login setShowRegister={setShowRegister}   />
  );
}

export default App;