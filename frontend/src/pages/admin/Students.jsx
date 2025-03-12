import { useState, useEffect } from "react";

const StudentTable = () => {
  const [students, setStudents] = useState([]); // State to hold the student list
  const [loading, setLoading] = useState(true); // State to manage loading state

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

  // Use useEffect to fetch data when the component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto p-4">
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
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {students.map((student) => (
                <tr
                  key={student.studentId}
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
                  <td className="border border-gray-300 px-4 py-2">{student.certificate ? (
          <a
            href={`http://localhost:5000${student.certificate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Certificate
          </a>
        ) : (
          'No Certificate'
        )}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
