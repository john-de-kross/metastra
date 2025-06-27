import React, { useState } from "react";

export default function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Updating Password:", passwords);
    // Add Axios request here
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl">
      <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
          Update Password
        </button>
      </form>
    </div>
  );
}
