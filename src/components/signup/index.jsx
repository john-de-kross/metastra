import { CircleAlert, CircleHelp } from "lucide-react";
import React, { useEffect, useState } from "react";
import validate from "validate.js";
import constraints from "./Constraints"
import { Link } from "react-router-dom";

const SignUp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [err, setErr] = useState({
    firstname: "",
    surname: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    day: "",
    month: "",
    year: "",
    gender: "Female",
    email: "",
    password: "",
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const genders = ["Female", "Male", "Custom"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const validationFields = [
      "firstname",
      "surname",
      "day",
      "month",
      "year",
      "email",
      "password",
    ];
    validationFields.forEach((field) => {
      const validation = validate(
        { [field]: formData[field] },
        { [field]: constraints[field] }
      );
      setErr((prev) => ({
        ...prev,
        [field]: validation ? validation[field] : "",
      }));
    });
  }, [formData]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = validate(
      { [name]: value },
      { [name]: constraints[name] }
    );
    setErr((prev) => ({
      ...prev,
      [name]: validation ? validation[name] : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateConstraints = validate(formData, constraints);
    if (validateConstraints) {
      setErr((prev) => ({ ...prev, ...validateConstraints }));
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full md:min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo and Description Section */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-0">
          <h1 className="text-3xl font-bold text-[#0866FF] mb-3">Metastra</h1>
          <p className="text-sm md:text-xl text-gray-700">
            Connect with friends and the world around you on Metastra.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md bg-white md:shadow-lg md:rounded-lg p-4 md:p-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Name Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  className={`w-full h-10 px-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] ${
                    err.firstname ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  name="firstname"
                  onChange={handleFormData}
                  onBlur={handleBlur}
                  value={formData.firstname}
                  placeholder="First name"
                />
                {err.firstname && (
                  <CircleAlert className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                )}
                {err.firstname && (
                  <p className="text-xs text-red-500 mt-1">
                    {err.firstname[0]}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  className={`w-full h-10 px-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] ${
                    err.surname ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  name="surname"
                  onChange={handleFormData}
                  onBlur={handleBlur}
                  value={formData.surname}
                  placeholder="Surname"
                />
                {err.surname && (
                  <CircleAlert className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                )}
                {err.surname && (
                  <p className="text-xs text-red-500 mt-1">{err.surname[0]}</p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <div className="flex items-center gap-1 mb-1">
                <label className="text-xs text-gray-700">Date of birth</label>
                <CircleHelp className="h-3 w-3 text-gray-500" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleFormData}
                  className={`w-full h-10 px-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] ${
                    err.day ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleFormData}
                  className={`w-full h-10 px-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] ${
                    err.month ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleFormData}
                  className={`w-full h-10 px-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] ${
                    err.year ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {(err.day || err.month || err.year) && (
                <p className="text-xs text-red-500 mt-1">
                  {err.day?.[0] || err.month?.[0] || err.year?.[0]}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <div className="flex items-center gap-1 mb-1">
                <label className="text-xs text-gray-700">Gender</label>
                <CircleHelp className="h-3 w-3 text-gray-500" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {genders.map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center justify-between w-full h-10 px-3 border border-gray-300 rounded-md text-sm hover:border-[#0866FF]"
                  >
                    <span className="text-gray-700">{gender}</span>
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleFormData}
                      className="h-4 w-4 text-[#0866FF] focus:ring-[#0866FF]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Email and Password */}
            <div className="space-y-3">
              <input
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF]"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleFormData}
                placeholder="Mobile number or email address"
              />
              <input
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF]"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
                placeholder="New password"
              />
              <p className="text-xs text-gray-600 leading-tight">
                By signing up, you agree to our{" "}
                <a href="#" className="text-[#0866FF] hover:underline">
                  Terms
                </a>
                ,{" "}
                <a href="#" className="text-[#0866FF] hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#0866FF] hover:underline">
                  Cookies Policy
                </a>
                .
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-10 bg-[#0866FF] text-white font-semibold rounded-md text-sm hover:bg-[#0054cc] transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-lg text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-[#0866FF] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
