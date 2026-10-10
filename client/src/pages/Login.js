import { useState } from "react";
import API from "../services/api";

function Login({setShowRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen login-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob--one"></div>
        <div className="blob blob--two"></div>
        <div className="blob blob--three"></div>
      </div>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative max-w-4xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl login-card">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full p-8 md:p-10 bg-gradient-to-b from-[#0b1220]/90 to-[#0f1724]/80 text-white">
            <h2 className="text-2xl font-semibold mb-3">Login to system</h2>
            <p className="text-sm text-gray-300 mb-6">Please enter your login information or <span onClick={() => setShowRegister(true)} className="text-indigo-300 underline cursor-pointer">click here</span> to registration</p>

            <label className="block text-xs text-gray-300 mb-2">Username</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block text-xs text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between mb-6 text-sm text-gray-300">
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-indigo-400"/> Remember me</label>
              <span className="cursor-pointer">Forgot Password</span>
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-95 transition"
            >
              Log In
            </button>
          </div>

          <div className="md:w-1/2 w-full login-visual hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" >
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9"/>
                  <stop offset="50%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="#0b1220" />
              <g opacity="0.95">
                <path d="M0 300 C150 200 350 400 800 300 L800 600 L0 600 Z" fill="url(#g1)" opacity="0.9" />
                <path d="M0 360 C180 260 380 460 800 360 L800 600 L0 600 Z" fill="#6ee7b7" opacity="0.12" />
                <path d="M0 200 C200 100 400 300 800 200 L800 0 L0 0 Z" fill="#60a5fa" opacity="0.08" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
