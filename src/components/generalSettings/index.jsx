import React, { useState } from "react";

export default function GeneralSettings() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    language: "English",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving General Settings:", form);
    // Add Axios request here
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl">
      <h3 className="text-xl font-semibold mb-4">General Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">Language</label>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
