// import React, { useState } from "react";
// import { api } from "../../api/api";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setpassword] = useState("");
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await api.post("/api/auth/register", {
//         name,
//         email,
//         password,
//       });
//       console.log(data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <>
//       <div>
//         <form onSubmit={handleRegister}>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           />
//           <label htmlFor="email">email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <label htmlFor="password">password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => {
//               setpassword(e.target.value);
//             }}
//           />
//           <button>register</button>
//         </form>
//         <p>Already have an account try logging in <Link to={"/login"}>Login</Link> </p>
//       </div>
//     </>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, UserCircle, EyeOff, Copyright } from "lucide-react";
import Toast from "./Toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", { name, email, password });
      showToast("Account created! Redirecting to login...", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";
      showToast(message, "error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-brand-dark bg-mesh flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Mobile Wave Header */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[320px] bg-wave-header z-0" />

      <div className="w-full max-w-6xl z-10 grid lg:grid-cols-[1.2fr_1fr] gap-4 items-center">

        {/* Left: Desktop Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-4 p-8">
          <h1 className="text-6xl xl:text-7xl font-extrabold text-white tracking-tighter whitespace-nowrap flex justify-center">
            Join the <span className="text-brand-accent ml-3">Team!</span>
          </h1>
          <p className="text-xl text-gray-400 font-light flex justify-center">
            Create an account to get{" "}
            <span className="text-brand-accent ml-1">Started!</span>
          </p>
        </div>

        {/* Right: Register Form */}
        <div className="w-full max-w-md mx-auto z-10">
          <div className="bg-black/40 backdrop-blur-2xl border border-brand-accent/20 rounded-[40px] p-10 lg:p-14 shadow-2xl">

            <div className="text-left mb-10">
              <h2 className="text-5xl font-extrabold text-white mb-3 lg:hidden tracking-tight">
                Register
              </h2>
              <p className="text-gray-300 text-base lg:hidden font-light">
                Enter your details to create an account
              </p>
              <h2 className="text-2xl font-black text-white hidden lg:block text-center uppercase tracking-[0.2em] opacity-80">
                Sign Up
              </h2>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold ml-4 uppercase hidden lg:block">
                  Full Name
                </label>
                <div className="relative">
                  <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="w-full bg-brand-surface border border-brand-accent/30 rounded-full py-4 pl-14 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all"
                  />
                </div>
              </div>

              {/* Username / Email */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold ml-4 uppercase hidden lg:block">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username"
                    required
                    className="w-full bg-brand-surface border border-brand-accent/30 rounded-full py-4 pl-14 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold ml-4 uppercase hidden lg:block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full bg-brand-surface border border-brand-accent/30 rounded-full py-4 pl-14 pr-14 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-accent transition-colors"
                  >
                    <EyeOff className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-brand-accent hover:brightness-110 text-black font-black py-4 rounded-full transition-all transform active:scale-[0.98] text-lg shadow-lg shadow-brand-accent/20 mt-4"
              >
                register
              </button>

              {/* Login Link */}
              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="block w-full border border-brand-accent/10 py-3 rounded-full text-sm text-gray-400 hover:text-white hover:border-brand-accent/40 transition-all"
                >
                  Already have an account?{" "}
                  <span className="text-brand-accent font-bold">Login</span>
                </Link>
              </div>
            </form>

            {/* Copyright */}
            <div className="mt-10 flex flex-col items-center space-y-2 opacity-40">
              <div className="flex items-center space-x-2 text-[10px] text-white uppercase tracking-widest">
                <Copyright className="w-3 h-3" />
                <span>Taskora All Rights Reserved 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;