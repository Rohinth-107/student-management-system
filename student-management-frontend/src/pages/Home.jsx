import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Header from "../components/Header";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";

const Home = () => {
  const [students, setStudents] = useState([]);

  // Function to fetch students from the Django backend
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="p-6">
        <div className="flex gap-6">
          {/* Sidebar: Add Student Form */}
          <aside className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Add New Student
            </h2>
            <AddStudent onStudentAdded={fetchStudents} />
          </aside>

          {/* Main: Student List */}
          <main className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Student List
            </h2>
            {/* ✅ Pass setStudents here */}
            <StudentList students={students} setStudents={setStudents} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
