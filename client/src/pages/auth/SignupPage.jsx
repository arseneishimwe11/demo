import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../../components/auth/AuthLayout";
import FormInput from "../../components/auth/FormInput";
import AuthButton from "../../components/auth/AuthButton";
import ErrorMessage from "../../components/auth/ErrorMessage";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.acceptTerms) {
      setError("You must accept the Terms and Conditions");
      return;
    }

    setLoading(true);

    try {
      // Update to match the route in user.routes.ts
      const response = await axios.post("/api/users/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        // Default role is 'driver' as per the schema
      });

      // If registration is successful, redirect to login
      navigate("/login", {
        state: {
          message:
            "Registration successful! Please log in with your new account.",
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to get started with ParkEase"
      illustrationTitle="Seamless Parking Experience"
      illustrationDescription="Join ParkEase and enjoy a 30-day free trial of our premium parking management features"
    >
      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit}>
        <FormInput
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          required
          autoComplete="given-name"
        />

        <FormInput
          id="lastName"
          name="lastName"
          type="text"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
          autoComplete="family-name"
        />

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

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••••••"
          required
          autoComplete="new-password"
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••••••"
          required
          autoComplete="new-password"
        />

        <div className="flex items-center mb-8 mt-2">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 bg-dark-800 border-dark-600 rounded text-lime-400 focus:ring-lime-400"
          />
          <label
            htmlFor="acceptTerms"
            className="ml-2 block text-sm text-gray-300"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-lime-400 hover:text-lime-300">
              Terms and Conditions
            </Link>
          </label>
        </div>

        <AuthButton
          onClick={() => {}}
          type="submit"
          disabled={loading}
          isLoading={loading}
        >
          Create Account
        </AuthButton>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-lime-400 hover:text-lime-300 transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
