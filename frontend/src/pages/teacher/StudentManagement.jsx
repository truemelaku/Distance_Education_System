"use client"

import { useState } from "react"
import TeacherLayout from "./TeacherLayout"
import { Search, Filter, Download, Mail, Eye, BarChart2 } from "lucide-react"

const StudentManagement = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      studentId: "ST001",
      course: "CS301",
      attendance: 85,
      grade: "A-",
      lastActive: "2 days ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      studentId: "ST002",
      course: "CS301",
      attendance: 92,
      grade: "A",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.j@example.com",
      studentId: "ST003",
      course: "CS302",
      attendance: 78,
      grade: "B+",
      lastActive: "Today",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      studentId: "ST004",
      course: "CS302",
      attendance: 95,
      grade: "A",
      lastActive: "Today",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert.w@example.com",
      studentId: "ST005",
      course: "CS401",
      attendance: 65,
      grade: "C+",
      lastActive: "3 days ago",
    },
  ])

  return (
    <TeacherLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Student Management</h1>
        <div className="flex gap-2">
          <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            <Mail className="w-4 h-4 mr-2" />
            Message All
          </button>
          <button className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center px-3 py-2 border rounded-md hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Courses</option>
                <option value="CS301">CS301: Database Systems</option>
                <option value="CS302">CS302: Data Structures</option>
                <option value="CS401">CS401: UI/UX Design</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className={`h-2.5 rounded-full ${
                            student.attendance >= 90
                              ? "bg-green-500"
                              : student.attendance >= 75
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.grade.startsWith("A")
                          ? "bg-green-100 text-green-800"
                          : student.grade.startsWith("B")
                            ? "bg-blue-100 text-blue-800"
                            : student.grade.startsWith("C")
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100" title="View Student Profile">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Message Student">
                        <Mail className="w-5 h-5 text-green-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="View Performance">
                        <BarChart2 className="w-5 h-5 text-purple-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
              <span className="font-medium">5</span> students
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400 cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}

export default StudentManagement

