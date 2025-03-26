import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const AddStudent = ({ onStudentAdded, editStudent, setEditStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  // ✅ Populate form if editStudent changes
  useEffect(() => {
    if (editStudent) {
      setFormData({
        name: editStudent.name,
        email: editStudent.email,
        age: editStudent.age,
        course: editStudent.course,
      });
    } else {
      setFormData({ name: "", email: "", age: "", course: "" });
    }
  }, [editStudent]);

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
      if (editStudent) {
        // ✅ Update student logic
        await axios.put(`students/${editStudent.id}/`, formData);
        alert("✅ Student Updated Successfully");
        setEditStudent(null); // Clear edit mode
      } else {
        // ✅ Add new student
        await axios.post("students/", formData);
        alert("✅ Student Added Successfully");
      }
      setFormData({ name: "", email: "", age: "", course: "" });
      if (onStudentAdded) onStudentAdded(); // Refresh the list
    } catch (error) {
      console.error("❌ Error:", error.response?.data);
      alert("Failed! Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["name", "email", "age", "course"].map((field, index) => (
        <div key={index}>
          <label className="block mb-1 font-semibold capitalize">{field}</label>
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
        {editStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default AddStudent;
