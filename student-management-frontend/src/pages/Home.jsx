import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Header from "../components/Header";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null); // ✅ For Edit functionality
  const navigate = useNavigate();

  // Fetch students from the Django backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get("students/");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    // localStorage.removeItem('token'); // Optional: remove auth token
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <Header />

      {/* Logout */}
      <div className="flex justify-end p-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <aside className="col-span-1 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {editStudent ? "✏️ Update Student" : "➕ Add New Student"}
            </h2>
            <AddStudent
              onStudentAdded={fetchStudents}
              editStudent={editStudent}
              setEditStudent={setEditStudent}
            />
          </aside>

          {/* Student List Section */}
          <main className="col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              📋 Student List
            </h2>
            
            <StudentList
              students={students}
              setStudents={setStudents}
              setEditStudent={setEditStudent}
            />
          </main>
        </div>
      </div>

      {/* Footer (Optional) */}
      <footer className="text-center text-gray-600 py-6">
        © 2025 Student Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
