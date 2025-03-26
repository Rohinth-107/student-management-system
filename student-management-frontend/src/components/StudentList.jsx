import React from "react";
import axios from "../api/axios";

const StudentList = ({ students, setStudents }) => {
  // ✅ Delete Student Function
  const handleDelete = (id) => {
    axios
      .delete(`students/${id}/`)
      .then(() => {
        alert("Student deleted successfully ✅");
        // ✅ Remove student from the local state without re-fetch
        setStudents((prevStudents) => prevStudents.filter((s) => s.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete student ❌");
      });
  };

  return (
    <div>
      {students.length === 0 ? (
        <p className="text-gray-600">No students available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-blue-600">
                  {student.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(student.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {student.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Age:</span> {student.age}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Course:</span> {student.course}
              </p>
              {/* ✅ Delete Button */}
              <button
                onClick={() => handleDelete(student.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
