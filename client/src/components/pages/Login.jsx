// // import React, { useState } from "react";
// // import { api } from "../../api/api";
// // import { Link } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await api.post("/api/auth/login", {
// //         email,
// //         password,
// //       });
// //       navigate("/dashboard")
// //       console.log(response.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
// //   return (
// //     <div>
// //       <form onSubmit={handleLogin}>
// //         <label htmlFor="Email">Email</label>
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => {
// //             setEmail(e.target.value);
// //           }}
// //         />
// //         <label htmlFor="password">Password</label>
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => {
// //             setPassword(e.target.value);
// //           }}
// //         />
// //         <button>login</button>
// //       </form>
// //       <p className="text-red-500 text-3xl">
// //         Don't have an account yet Register now{" "}
// //         <Link to={"/register"}>Register</Link>{" "}
// //       </p>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState } from "react";
// import {api} from "../../api/api.js";
// import { Link, useNavigate } from "react-router-dom";
// import { Lock, User, EyeOff, Copyright, Chrome } from "lucide-react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/api/auth/login", {
//         email,
//         password,
//       });
//       navigate("/dashboard");
//       console.log(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-brand-dark bg-mesh flex items-center justify-center p-4 relative overflow-hidden">

//       {/* Mobile-only Wave Header Background */}
//       <div className="lg:hidden absolute top-0 left-0 w-full h-48 bg-brand-accent rounded-b-[50px] -translate-y-4" />

//       <div className="w-full max-w-6xl z-10 grid lg:grid-cols-2 gap-12 items-center">

//         {/* Left Section: Desktop Branding */}
//         <div className="hidden lg:flex flex-col space-y-4 p-8">
//           <h1 className="text-7xl font-extrabold text-white tracking-tighter w-full">
//             Welcome <span className="text-brand-accent">Back!</span>
//           </h1>
//           <p className="text-xl text-gray-400 font-light">Log in to Access your Tasks</p>
//         </div>

//         {/* Right Section: The Login Form */}
//         <div className="w-full max-w-md mx-auto">
//           <div className="bg-black/40 backdrop-blur-2xl border border-brand-accent/20 rounded-[40px] p-10 lg:p-14 shadow-2xl">

//             <div className="text-center lg:text-left mb-10">
//               <h2 className="text-4xl font-bold text-white mb-2 lg:hidden">Welcome!</h2>
//               <p className="text-gray-400 text-sm lg:hidden">Log into your Account To Access ACT Faculty</p>
//               <h2 className="text-2xl font-black text-white hidden lg:block text-center uppercase tracking-[0.2em] opacity-80">Log In</h2>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-6">
//               {/* Email Input */}
//               <div className="space-y-1">
//                 <label className="text-gray-400 text-xs font-semibold ml-4 uppercase hidden lg:block">Email Address</label>
//                 <div className="relative group">
//                   <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent w-5 h-5" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                     className="w-full bg-brand-surface border border-brand-accent/30 rounded-full py-4 pl-14 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Password Input */}
//               <div className="space-y-1">
//                 <label className="text-gray-400 text-xs font-semibold ml-4 uppercase hidden lg:block">Password</label>
//                 <div className="relative group">
//                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent w-5 h-5" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                     className="w-full bg-brand-surface border border-brand-accent/30 rounded-full py-4 pl-14 pr-14 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-accent"
//                   >
//                     <EyeOff className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-brand-accent hover:brightness-110 text-black font-black py-4 rounded-full transition-all transform active:scale-[0.98] text-lg"
//               >
//                 Log in!
//               </button>

//               {/* Google Social Option (Mobile View) */}
//               <button type="button" className="w-full lg:hidden border border-brand-accent/20 py-4 rounded-full flex items-center justify-center space-x-3 text-white">
//                 <Chrome className="w-5 h-5" />
//                 <span className="font-medium">Continue with Google</span>
//               </button>

//               {/* Link to Register */}
//               <div className="text-center pt-2">
//                 <Link to="/register" className="block w-full border border-brand-accent/10 py-3 rounded-full text-sm text-gray-400 hover:text-white hover:border-brand-accent/40 transition-all">
//                   Don't have an account? <span className="text-brand-accent font-bold">Register Now</span>
//                 </Link>
//               </div>
//             </form>

//             {/* Copyright Branding */}
//             <div className="mt-12 flex flex-col items-center space-y-2 opacity-40">
//                <div className="flex items-center space-x-2 text-[10px] text-white uppercase tracking-widest">
//                 <Copyright className="w-3 h-3" />
//                 <span>ACT All Rights Reserved 2025</span>
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Lock, User, EyeOff, Copyright } from "lucide-react";
import { api } from "../../api/api.js";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/login", { email, password });
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";
      showToast(message, "error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-brand-dark bg-mesh flex items-center justify-center p-4 relative overflow-hidden">

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

      <div className="w-full max-w-6xl z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Desktop Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-4 p-8">
          <h1 className="text-6xl xl:text-7xl font-extrabold text-white tracking-tighter whitespace-nowrap">
            Welcome <span className="text-brand-accent">Back!</span>
          </h1>
          <p className="text-xl text-gray-400 font-light flex justify-center">
            Log in to Access your <span className="text-brand-accent ml-1">Tasks!</span>
          </p>
        </div>

        {/* Right: Login Form */}
        <div className="w-full max-w-md mx-auto z-10">
          <div className="bg-black/40 backdrop-blur-2xl border border-brand-accent/20 rounded-[40px] p-10 lg:p-14 shadow-2xl">

            <div className="text-left mb-10">
              <h2 className="text-5xl font-extrabold text-white mb-3 lg:hidden tracking-tight">
                Welcome!
              </h2>
              <p className="text-gray-300 text-base lg:hidden font-light max-w-xs">
                Log into your Account to Access your Tasks
              </p>
              <h2 className="text-2xl font-black text-white hidden lg:block text-center uppercase tracking-[0.2em] opacity-80">
                Log In
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold ml-4 uppercase hidden lg:block">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                    onChange={(e) => setPassword(e.target.value)}
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
                className="w-full bg-brand-accent hover:brightness-110 text-black font-black py-4 rounded-full transition-all transform active:scale-[0.98] text-lg shadow-lg shadow-brand-accent/20"
              >
                Log in!
              </button>

              {/* Register Link */}
              <div className="text-center pt-2">
                <Link
                  to="/register"
                  className="block w-full border border-brand-accent/10 py-3 rounded-full text-sm text-gray-400 hover:text-white hover:border-brand-accent/40 transition-all"
                >
                  Don't have an account?{" "}
                  <span className="text-brand-accent font-bold">Register Now</span>
                </Link>
              </div>
            </form>

            {/* Copyright */}
            <div className="mt-12 flex flex-col items-center space-y-2 opacity-40 hover:opacity-100 transition-opacity">
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

export default Login;