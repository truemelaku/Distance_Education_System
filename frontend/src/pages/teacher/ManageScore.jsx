"use client"

import { useState } from "react"
import { Check, FileText, PenSquare } from "lucide-react"

const ManageScore = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedAssessment, setSelectedAssessment] = useState("")

  // Course data with codes and names
  const courses = [
    { id: "CS101", name: "Introduction to Computer Science" },
    { id: "CS201", name: "Data Structures and Algorithms" },
    { id: "CS301", name: "Database Systems" },
    { id: "CSE1101", name: "Python Programming" },
  ]

  // Sample student data with expanded score information
  const [students, setStudents] = useState([
    {
      id: "S12345",
      name: "John Smith",
      quizScore: 18,
      midExamScore: 25,
      finalExamScore: 42,
      totalScore: 85,
      maxScore: 100,
      grade: "A",
      status: "Pass",
    },
    {
      id: "S12346",
      name: "Sarah Johnson",
      quizScore: 20,
      midExamScore: 28,
      finalExamScore: 44,
      totalScore: 92,
      maxScore: 100,
      grade: "A+",
      status: "Pass",
    },
    {
      id: "S12347",
      name: "Michael Brown",
      quizScore: 15,
      midExamScore: 22,
      finalExamScore: 41,
      totalScore: 78,
      maxScore: 100,
      grade: "B+",
      status: "Pass",
    },
    {
      id: "S12348",
      name: "Emily Davis",
      quizScore: 10,
      midExamScore: 15,
      finalExamScore: 25,
      totalScore: 50,
      maxScore: 100,
      grade: "F",
      status: "Fail",
    },
  ])

  // Get the selected course details
  const getSelectedCourseDetails = () => {
    const course = courses.find((c) => c.id === selectedCourse)
    return course ? `${course.name} (${course.id})` : "Select a course"
  }

  // Calculate total score based on component scores
  const calculateTotal = (quiz, midExam, finalExam) => {
    return Number.parseInt(quiz) + Number.parseInt(midExam) + Number.parseInt(finalExam)
  }

  // Determine grade based on total score
  const determineGrade = (total, max) => {
    const percentage = (total / max) * 100
    if (percentage >= 90) return "A+"
    if (percentage >= 85) return "A"
    if (percentage >= 80) return "A-"
    if (percentage >= 75) return "B+"
    if (percentage >= 70) return "B"
    if (percentage >= 65) return "B-"
    if (percentage >= 60) return "C+"
    if (percentage >= 55) return "C"
    if (percentage >= 50) return "C-"
    return "F"
  }

  // Determine pass/fail status
  const determineStatus = (total, max) => {
    const percentage = (total / max) * 100
    return percentage >= 50 ? "Pass" : "Fail"
  }

  // Handle save button click
  const handleSave = () => {
    if (!selectedCourse) {
      alert("Please select a course first")
      return
    }

    // Recalculate totals and grades for all students
    const updatedStudents = students.map((student) => {
      const total = calculateTotal(student.quizScore, student.midExamScore, student.finalExamScore)
      return {
        ...student,
        totalScore: total,
        grade: determineGrade(total, student.maxScore),
        status: determineStatus(total, student.maxScore),
      }
    })

    setStudents(updatedStudents)
    setShowSuccessMessage(true)
    setIsEditing(false)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  // Handle edit button click
  const handleEdit = () => {
    if (!selectedCourse) {
      alert("Please select a course first")
      return
    }

    setIsEditing(true)
    setShowSuccessMessage(false)
  }

  // Handle generate PDF button click
  const handleGeneratePDF = () => {
    if (!selectedCourse) {
      alert("Please select a course first")
      return
    }

    // Simulate PDF generation
    alert(`Generating PDF for ${getSelectedCourseDetails()}`)
  }

  // Handle score change for any component
  const handleScoreChange = (id, field, value) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          const updatedStudent = { ...student, [field]: value }

          // Automatically update total if editing component scores
          if (field === "quizScore" || field === "midExamScore" || field === "finalExamScore") {
            const total = calculateTotal(
              field === "quizScore" ? value : student.quizScore,
              field === "midExamScore" ? value : student.midExamScore,
              field === "finalExamScore" ? value : student.finalExamScore,
            )
            updatedStudent.totalScore = total
            updatedStudent.grade = determineGrade(total, student.maxScore)
            updatedStudent.status = determineStatus(total, student.maxScore)
          }

          return updatedStudent
        }
        return student
      }),
    )
  }

  // Handle course selection change
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value)
    // Reset editing state when course changes
    setIsEditing(false)
    setShowSuccessMessage(false)
  }

  // Handle delete student
  const handleDeleteStudent = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}'s record?`)) {
      setStudents(students.filter((s) => s.id !== id))
    }
  }

  // Render editable cell
  const renderEditableCell = (student, field, label) => {
    return isEditing ? (
      <input
        type="number"
        value={student[field]}
        onChange={(e) => handleScoreChange(student.id, field, e.target.value)}
        className="w-16 border border-gray-300 rounded px-2 py-1"
        min="0"
        max={
          field === "totalScore" ? student.maxScore : field === "quizScore" ? 20 : field === "midExamScore" ? 30 : 50
        }
      />
    ) : (
      <span>{student[field]}</span>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">Manage Score</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-700 text-center">
            {selectedCourse
              ? `SUBMIT SCORE FOR ${getSelectedCourseDetails()} STUDENTS`
              : "SELECT A COURSE TO SUBMIT SCORES"}
          </h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto mt-2"></div>
        </div>

        {/* Success Message - only shown when showSuccessMessage is true */}
        {showSuccessMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <p>Successfully Recorded!</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleEdit}
            className={`px-6 py-2 ${isEditing ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"} text-white rounded transition-colors flex items-center`}
            disabled={isEditing}
          >
            <PenSquare className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={handleGeneratePDF}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate PDF
          </button>
        </div>

        {/* Semester Header */}
        <div className="mb-6 flex items-center">
          <h3 className="text-xl font-medium text-gray-700">First Semester</h3>
          <span className="ml-2 px-2 py-1 bg-red-500 text-white text-sm rounded">2020</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.id} - {course.name}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
            >
              <option value="">Select Assessment</option>
              <option value="midterm">Midterm Exam</option>
              <option value="final">Final Exam</option>
              <option value="assignment1">Assignment 1</option>
              <option value="quiz1">Quiz 1</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Student ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-center">
                  Quiz
                  <br />
                  (20)
                </th>
                <th className="py-3 px-4 text-center">
                  Mid Exam
                  <br />
                  (30)
                </th>
                <th className="py-3 px-4 text-center">
                  Final Exam
                  <br />
                  (50)
                </th>
                <th className="py-3 px-4 text-center">
                  Total Score
                  <br />
                  (100)
                </th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4 text-center">{renderEditableCell(student, "quizScore")}</td>
                  <td className="py-3 px-4 text-center">{renderEditableCell(student, "midExamScore")}</td>
                  <td className="py-3 px-4 text-center">{renderEditableCell(student, "finalExamScore")}</td>
                  <td className="py-3 px-4 text-center font-medium">
                    {student.totalScore}/{student.maxScore}
                  </td>
                  <td className="py-3 px-4 text-center font-medium">{student.grade}</td>
                  <td
                    className={`py-3 px-4 text-center font-medium ${student.status === "Pass" ? "text-green-600" : "text-red-600"}`}
                  >
                    {student.status}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-blue-500 hover:underline mr-2" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteStudent(student.id, student.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageScore