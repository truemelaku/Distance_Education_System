import { useState, useEffect } from "react";

const StudentTable = () => {
  const [students, setStudents] = useState([]); // State to hold the student list
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [editStudent, setEditStudent] = useState(null); // State for the student being edited
  const [updatedStudent, setUpdatedStudent] = useState({
    _id: '', // Use _id for update operations
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    gender: ''
  }); // State to manage the updated student data

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data); // Update student state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // Delete student
  const deleteStudent = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStudents(students.filter((student) => student._id !== _id)); // Remove the deleted student from the list
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Update student
  const updateStudent = async (updatedStudent) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${updatedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === updatedData._id ? updatedData : student
          )
        );
        setEditStudent(null); // Close the edit modal
      } else {
        const errorData = await response.json();
        console.error("Failed to update student:", errorData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating student:", error.message);
    }
  };

  // Handle input change for the updated student
  const handleInputChange = (e) => {
    setUpdatedStudent({
      ...updatedStudent,
      [e.target.name]: e.target.value,
    });
  };

  // Use useEffect to fetch data when the component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold text-center mb-6">Registered Students</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Middle Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">Certificate</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="bg-white border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">{student.studentId}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.middleName}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.phoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.department}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.gender}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.certificate ? (
                      <a
                      href={`http://localhost:5000/${student.certificate.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Certificate
                    </a>
                    
                    ) : (
                      "No Certificate"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => setEditStudent(student)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateStudent(updatedStudent);
              }}
            >
              <input
                type="text"
                name="firstName"
                value={updatedStudent.firstName || editStudent.firstName}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2"
                placeholder="First Name"
              />
              <input
                type="text"
                name="middleName"
                value={updatedStudent.middleName || editStudent.middleName}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2"
                placeholder="Middle Name"
              />
              <input
                type="text"
                name="lastName"
                value={updatedStudent.lastName || editStudent.lastName}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2"
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={updatedStudent.email || editStudent.email}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2"
                placeholder="Email"
              />
              <input
                type="text"
                name="phoneNumber"
                value={updatedStudent.phoneNumber || editStudent.phoneNumber}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2"
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="department"
                value={updatedStudent.department || editStudent.department}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2"
                placeholder="Department"
              />
              <input
                type="text"
                name="gender"
                value={updatedStudent.gender || editStudent.gender}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2"
                placeholder="Gender"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditStudent(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
