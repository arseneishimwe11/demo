import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userServiceApi } from "../../services/api";
import AuthLayout from "../../components/auth/AuthLayout";
import FormInput from "../../components/auth/FormInput";
import AuthButton from "../../components/auth/AuthButton";
import ErrorMessage from "../../components/auth/ErrorMessage";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await userServiceApi.post("/users/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Store token and user data
      const userData = response.data.data.user;
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on user role
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userData.role === "attendant") {
        navigate("/attendant/dashboard");
      } else {
        navigate("/dashboard"); // Default for drivers
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your ParkEase account"
      illustrationTitle="Smart Parking Solution"
      illustrationDescription="Access your parking management dashboard to monitor and control your parking spaces efficiently"
    >
      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          autoComplete="email"
        />

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label
              htmlFor="password"
              className="text-gray-300 font-medium text-sm"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-lime-400 text-sm hover:text-lime-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <FormInput
            id="password"
            name="password"
            type="password"
            label=""
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center mb-8">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 bg-dark-800 border-dark-600 rounded text-lime-400 focus:ring-lime-400"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 block text-sm text-gray-300"
          >
            Remember me
          </label>
        </div>

        <AuthButton
          onClick={() => {}}
          type="submit"
          disabled={loading}
          isLoading={loading}
        >
          Sign In
        </AuthButton>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-lime-400 hover:text-lime-300 transition-colors font-medium"
            >
              Create account
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
