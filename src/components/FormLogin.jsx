import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/api-auth";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    // Remove token from local storage before attempting a new login
    localStorage.removeItem("token");

    try {
      const response = await authAPI(username, password);
      localStorage.setItem("token", response.token); // Save token to local storage
      console.log("Login successful:", response);
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError("Login failed. Please check your username and password.");
      console.error(err);
    }
  };
  return (
    <div className="hero  min-h-screen">
      {/* <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  className="input input-bordered"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Access your account to start exploring exlusive deals and manage
            your orders effortlessly. Log in now to experiences seamless
            shopping!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-yellow-200">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
