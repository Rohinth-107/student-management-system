import React, { useState } from "react";
import axios from "../api/axios";

const AddStudent = ({ onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("students/", formData);
      alert("✅ Student Added Successfully");
      setFormData({ name: "", email: "", age: "", course: "" });
      // Refresh the student list
      if (onStudentAdded) onStudentAdded();
    } catch (error) {
      console.error("❌ Error adding student:", error.response?.data);
      alert("Failed to add student. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["name", "email", "age", "course"].map((field, index) => (
        <div key={index}>
          <label className="block mb-1 font-semibold">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={
              field === "age" ? "number" : field === "email" ? "email" : "text"
            }
            name={field}
            placeholder={`Enter ${field}`}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add Student
      </button>
    </form>
  );
};

export default AddStudent;
