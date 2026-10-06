
import React, { useState,useEffect } from "react";
import { Lock, User, EyeOff, Copyright } from "lucide-react";
import { api } from "../../api/api.js";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("expired")) {
      setToast({ message: "Session expired. Please log in again.", type: "error" });
      // Clean up the URL
      window.history.replaceState({}, document.title, "/login");
    }
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/login", { email, password });
      console.log(response.data);
      localStorage.setItem("username", response.data.name); // 👈 add this
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative font-sans">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="w-full max-w-6xl z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Desktop Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-4 p-8">
          <h1 className="text-6xl xl:text-7xl font-semibold text-white tracking-tight whitespace-nowrap">
            Welcome <span className="text-neutral-500">Back.</span>
          </h1>
          <p className="text-xl text-neutral-400 font-light">
            Log in to access your tasks.
          </p>
        </div>

        {/* Right: Login Form */}
        <div className="w-full max-w-md mx-auto z-10">
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-10 lg:p-14">
            <div className="text-left mb-10">
              <h2 className="text-4xl font-semibold text-white mb-3 lg:hidden tracking-tight">
                Welcome.
              </h2>
              <p className="text-neutral-400 text-base lg:hidden font-light max-w-xs">
                Log into your account to access your tasks.
              </p>
              <h2 className="text-sm font-semibold text-neutral-500 hidden lg:block uppercase tracking-widest mb-2">
                Log In
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full bg-transparent border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full bg-transparent border border-neutral-800 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  >
                    <EyeOff className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-semibold py-4 rounded-xl transition-all active:scale-[0.98] mt-4 flex justify-center items-center hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Log In"
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-2">
                <Link
                  to="/register"
                  className="block w-full border border-neutral-800 py-3 rounded-xl text-sm text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  Don't have an account? <span className="font-semibold text-white">Register</span>
                </Link>
              </div>
            </form>

            {/* Copyright */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2 text-[10px] text-neutral-600 uppercase tracking-widest">
                <Copyright className="w-3 h-3" />
                <span>Taskora {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
