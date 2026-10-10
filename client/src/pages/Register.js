import {useState} from 'react';
import API from '../services/api';
import BG from '../assets/loginBG.jpg';

function Register({setShowRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try{
      await API.post("/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");
      window.location.reload();
    } catch(err) {
      alert("Registration failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="w-80 p-8">
        <h2 className="text-white text-center text-lg mb-6">
          Create Account
        </h2>
        <input
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 rounded-full bg-white/10 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-full bg-white/10 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 px-4 py-2 rounded-full bg-white/10 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full py-2 rounded-full bg-orange-200 text-black"
        >
          REGISTER
        </button>
        <p className="text-center text-white text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => setShowRegister(false)}
            className="text-orange-200 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
