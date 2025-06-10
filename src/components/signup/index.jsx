import { CircleAlert, CircleHelp } from "lucide-react";
import React, { useState, useEffect } from "react";
import validate from "validate.js";
import constraints from "./Constraints";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/userContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [err, setErr] = useState({
    firstname: [],
    surname: [],
    day: [],
    month: [],
    year: [],
    gender: [],
    phone: [],
    email: [],
    password: [],
    server: [],
  });

  const { formData, setFormData, isAuthenticated, setIsAuthenticated } =
    useUserContext();
  const [loading, setLoading] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + +1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
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
    console.log("is auth?:", isAuthenticated);
  }, []);
  
  useEffect(() => {
    const validationFields = [
      "firstname",
      "surname",
      "day",
      "month",
      "year",
      "phone",
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
        [field]: validation ? validation[field] || [] : [],
      }));
    });
  }, [formData]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = validate(
      { [name]: value },
      { [name]: constraints[name] }
    );
    setErr((prev) => ({
      ...prev,
      [name]: validation ? validation[name] || [] : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr({ ...err, server: [] });
    setLoading(true);

    // Validate all fields
    const validateConstraints = validate(formData, constraints);
    if (validateConstraints) {
      console.log("Validation errors:", validateConstraints);
      setErr(validateConstraints);
      setLoading(false);
      return;
    }

    // Format dob as YYYY-MM-DD
    const monthIndex = months.indexOf(formData.month) + 1;
    const dob = `${formData.year}-${monthIndex
      .toString()
      .padStart(2, "0")}-${formData.day.toString().padStart(2, "0")}`;

    const payload = {
      firstname: formData.firstname,
      surname: formData.surname,
      gender: formData.gender,
      dob,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    };

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/register",
        payload,
        { timeout: 60000 }
      );
      console.log("User registered:", response.data);
      setErr({ server: ["Registration successful!"] });
      setIsAuthenticated(true);
      navigate("/verify");
    } catch (error) {
      console.log("Full error:", error);

      if (error.code === "ECONNABORTED") {
        setErr({
          server: [
            "Server took too long to respond. Please try again or check server status.",
          ],
        });
      } else if (error.response?.data?.message) {
        setErr({ server: [error.response.data.message] });
      } else if (error.response?.data?.errors) {
        const mappedErrors = {};
        if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach(({ field, message }) => {
            const clientField =
              field === "firstName"
                ? "firstname"
                : field === "lastName"
                ? "surname"
                : field === "dateOfBirth"
                ? "dob"
                : field;
            mappedErrors[clientField] = [message];
          });
        } else {
          Object.keys(error.response.data.errors).forEach((field) => {
            const clientField =
              field === "firstName"
                ? "firstname"
                : field === "lastName"
                ? "surname"
                : field === "dateOfBirth"
                ? "dob"
                : field;
            mappedErrors[clientField] = [error.response.data.errors[field]];
          });
        }
        setErr({ ...mappedErrors, server: [] });
      } else if (error.response?.data?.error) {
        setErr({ server: [error.response.data.error] });
      } else {
        setErr({
          server: [
            "Failed to connect to the server. Please check your network or try again later.",
          ],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Prevent form submission on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && step < 5) {
      e.preventDefault();
      setStep(step + 1); // Move to next step on Enter
    }
  };

  const renderInput = (name, placeholder, type = "text") => (
    <div className="relative">
      <input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleFormData}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full h-10 px-3 border border-[#DADDE1] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0866FF] ${
          err[name]?.length ? "border-red-500" : "border-[#DADDE1]"
        }`}
      />
      {err[name]?.length > 0 && (
        <p className="text-xs text-red-500 mt-1">{err[name][0]}</p>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo and Tagline Section */}
        <div className="hidden md:flex flex-col justify-center items-start text-left px-4">
          <div>
            <h1 className="text-4xl font-bold text-[#0866FF] mb-4">Metastra</h1>
            <p className="text-2xl text-[#606770]">
              Connect with friends and the world around you on Metastra.
            </p>
          </div>
        </div>
        {/* Form Section */}
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center text-[#0866FF] mb-4 md:hidden">
            Metastra
          </h1>
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="space-y-4"
          >
            {err.server?.length > 0 && (
              <p
                className={`text-xs mt-2 ${
                  err.server[0].includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {err.server[0]}
              </p>
            )}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-3">
                {renderInput("firstname", "First name")}
                {renderInput("surname", "Surname")}
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs text-[#606770]">
                    Date of birth
                  </label>
                  <CircleHelp
                    className="h-3 w-3 text-[#606770] cursor-pointer"
                    title="Why do I need to provide my birthday?"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleFormData}
                    className={`w-full h-10 px-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0866FF] ${
                      err.day?.length || err.dob?.length
                        ? "border-red-500"
                        : "border-[#DADDE1]"
                    }`}
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleFormData}
                    className={`w-full h-10 px-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0866FF] ${
                      err.month?.length || err.dob?.length
                        ? "border-red-500"
                        : "border-[#DADDE1]"
                    }`}
                  >
                    <option value="">Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleFormData}
                    className={`w-full h-10 px-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0866FF] ${
                      err.year?.length || err.dob?.length
                        ? "border-red-500"
                        : "border-[#DADDE1]"
                    }`}
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                {(err.day?.length > 0 ||
                  err.month?.length > 0 ||
                  err.year?.length > 0 ||
                  err.dob?.length > 0) && (
                  <p className="text-xs text-red-500 mt-1">
                    {err.day?.[0] ||
                      err.month?.[0] ||
                      err.year?.[0] ||
                      err.dob?.[0] ||
                      "Invalid date of birth"}
                  </p>
                )}
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs text-[#606770]">Gender</label>
                  <CircleHelp
                    className="h-3 w-3 text-[#606770] cursor-pointer"
                    title="You can select one gender option."
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {genders.map((g) => (
                    <label
                      key={g}
                      className={`flex items-center justify-between px-3 py-2 border rounded-md text-sm ${
                        err.gender?.length
                          ? "border-red-500"
                          : "border-[#DADDE1]"
                      }`}
                    >
                      <span className="text-[#606770]">{g}</span>
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleFormData}
                        className="h-4 w-4 text-[#0866FF] focus:ring-[#0866FF]"
                      />
                    </label>
                  ))}
                </div>
                {err.gender?.length > 0 && (
                  <p className="text-xs text-red-500 mt-1">{err.gender[0]}</p>
                )}
              </div>
            )}
            {step === 4 && (
              <>
                {renderInput("phone", "Phone number")}
                {renderInput("email", "Email")}
              </>
            )}
            {step === 5 && renderInput("password", "New password", "password")}
            <div className="text-xs text-[#606770] mt-2">
              By clicking Sign Up, you agree to our{" "}
              <a href="#" className="text-[#0866FF] hover:underline">
                Terms
              </a>
              ,{" "}
              <a href="#" className="text-[#0866FF] hover:underline">
                Privacy Policy
              </a>
              , and{" "}
              <a href="#" className="text-[#0866FF] hover:underline">
                Cookies Policy
              </a>
              .
            </div>
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(step - 1);
                  }}
                  className="px-4 py-2 bg-[#E4E6EB] text-[#606770] rounded-md hover:bg-[#D8DADE]"
                >
                  Back
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(step + 1);
                  }}
                  className="px-4 py-2 bg-[#0866FF] text-white rounded-md hover:bg-[#0054CC]"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={`w-[50%] py-2 bg-[#0866FF] text-white rounded-md hover:bg-[#0054CC] ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              )}
            </div>
          </form>
          <p className="text-sm text-center text-[#606770] mt-4">
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
