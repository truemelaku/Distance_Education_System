"use client"

import { useState } from "react"
import TeacherLayout from "./TeacherLayout"
import { Search, Download, Edit, Save, X } from "lucide-react"

const ManageScores = () => {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState("")
  const [editingStudent, setEditingStudent] = useState(null)
  const [editScore, setEditScore] = useState("")

  // Mock data for courses
  const courses = [
    { id: 1, code: "CS301", name: "Database Systems" },
    { id: 2, code: "CS302", name: "Data Structures" },
    { id: 3, code: "CS401", name: "UI/UX Design" },
  ]

  // Mock data for assignments
  const assignments = [
    { id: 1, title: "ER Diagram Assignment", course: "CS301", totalPoints: 20 },
    { id: 2, title: "SQL Queries Practice", course: "CS301", totalPoints: 30 },
    { id: 3, title: "Database Design Project", course: "CS301", totalPoints: 100 },
    { id: 4, title: "Array Implementation", course: "CS302", totalPoints: 25 },
    { id: 5, title: "Tree Traversal", course: "CS302", totalPoints: 35 },
    { id: 6, title: "UI Mockup", course: "CS401", totalPoints: 50 },
    { id: 7, title: "User Testing", course: "CS401", totalPoints: 40 },
  ]

  // Mock data for student scores
  const [studentScores, setStudentScores] = useState([
    {
      id: 1,
      name: "John Doe",
      studentId: "ST001",
      assignment: 1,
      score: 18,
      status: "graded",
      submissionDate: "15/10/2023",
    },
    {
      id: 2,
      name: "Jane Smith",
      studentId: "ST002",
      assignment: 1,
      score: 20,
      status: "graded",
      submissionDate: "14/10/2023",
    },
    {
      id: 3,
      name: "Michael Johnson",
      studentId: "ST003",
      assignment: 1,
      score: 15,
      status: "graded",
      submissionDate: "15/10/2023",
    },
    {
      id: 4,
      name: "Emily Davis",
      studentId: "ST004",
      assignment: 1,
      score: 19,
      status: "graded",
      submissionDate: "13/10/2023",
    },
    {
      id: 5,
      name: "Robert Wilson",
      studentId: "ST005",
      assignment: 1,
      score: 17,
      status: "graded",
      submissionDate: "16/10/2023",
    },
    {
      id: 6,
      name: "John Doe",
      studentId: "ST001",
      assignment: 2,
      score: 28,
      status: "graded",
      submissionDate: "02/11/2023",
    },
    {
      id: 7,
      name: "Jane Smith",
      studentId: "ST002",
      assignment: 2,
      score: 26,
      status: "graded",
      submissionDate: "01/11/2023",
    },
    {
      id: 8,
      name: "Michael Johnson",
      studentId: "ST003",
      assignment: 2,
      score: null,
      status: "pending",
      submissionDate: "03/11/2023",
    },
    {
      id: 9,
      name: "Emily Davis",
      studentId: "ST004",
      assignment: 2,
      score: 29,
      status: "graded",
      submissionDate: "02/11/2023",
    },
    {
      id: 10,
      name: "Robert Wilson",
      studentId: "ST005",
      assignment: 2,
      score: 25,
      status: "graded",
      submissionDate: "01/11/2023",
    },
  ])

  // Function to get student data for selected assignment
  const getFilteredStudents = () => {
    if (!selectedAssignment) return []
    return studentScores.filter((student) => student.assignment === Number.parseInt(selectedAssignment))
  }

  // Function to get assignment details
  const getAssignmentDetails = () => {
    if (!selectedAssignment) return null
    return assignments.find((a) => a.id === Number.parseInt(selectedAssignment))
  }

  // Function to handle score editing
  const handleSaveScore = (studentId) => {
    setStudentScores((prev) =>
      prev.map((student) => {
        if (student.id === editingStudent) {
          return {
            ...student,
            score: Number.parseFloat(editScore),
            status: "graded",
          }
        }
        return student
      }),
    )
    setEditingStudent(null)
    setEditScore("")
  }

  // Function to handle cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null)
    setEditScore("")
  }

  // Selected assignment details
  const assignmentDetails = getAssignmentDetails()

  // Filtered students for selected assignment
  const filteredStudents = getFilteredStudents()

  // Calculate class average
  const classAverage =
    filteredStudents.length > 0
      ? filteredStudents.filter((s) => s.score !== null).reduce((sum, student) => sum + student.score, 0) /
        filteredStudents.filter((s) => s.score !== null).length
      : 0

  return (
    <TeacherLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Scores</h1>
        <p className="text-gray-500">Review and update student scores</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Select Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value)
                  setSelectedAssignment("")
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.code}>
                    {course.code}: {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="assignment" className="block text-sm font-medium text-gray-700 mb-1">
                Select Assignment
              </label>
              <select
                id="assignment"
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                disabled={!selectedCourse}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select an assignment</option>
                {assignments
                  .filter((a) => a.course === selectedCourse)
                  .map((assignment) => (
                    <option key={assignment.id} value={assignment.id}>
                      {assignment.title} ({assignment.totalPoints} pts)
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Students
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or ID..."
                disabled={!selectedAssignment}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <Search className="absolute left-3 bottom-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {assignmentDetails && (
          <div className="p-4 bg-blue-50 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-semibold text-blue-800">{assignmentDetails.title}</h2>
                <p className="text-sm text-blue-600">Total Points: {assignmentDetails.totalPoints}</p>
              </div>
              <div className="mt-3 md:mt-0 flex items-center gap-4">
                <div>
                  <span className="text-sm text-blue-600">Class Average: </span>
                  <span className="font-semibold text-blue-800">
                    {classAverage.toFixed(1)} / {assignmentDetails.totalPoints}(
                    {((classAverage / assignmentDetails.totalPoints) * 100).toFixed(1)}%)
                  </span>
                </div>
                <button className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900">
                  <Download className="w-4 h-4" /> Export Scores
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.submissionDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === "graded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStudent === student.id ? (
                        <input
                          type="number"
                          value={editScore}
                          onChange={(e) => setEditScore(e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          max={assignmentDetails?.totalPoints || 100}
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {student.score !== null ? `${student.score} / ${assignmentDetails?.totalPoints}` : "-"}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editingStudent === student.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleSaveScore(student.id)}
                            className="p-1 rounded-full hover:bg-green-100 text-green-600"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCancelEdit()}
                            className="p-1 rounded-full hover:bg-red-100 text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingStudent(student.id)
                            setEditScore(student.score !== null ? student.score.toString() : "")
                          }}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            {selectedAssignment ? (
              <p className="text-gray-500">No student submissions found for this assignment.</p>
            ) : (
              <p className="text-gray-500">Please select a course and assignment to view student scores.</p>
            )}
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}

export default ManageScores

