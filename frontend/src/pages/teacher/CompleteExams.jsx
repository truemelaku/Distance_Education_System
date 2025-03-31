"use client"

import { useState, useEffect } from "react"
import { api } from "../services/api"
import LoadingSpinner from "./LoadingSpinner"

const CompleteExams = () => {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await api.getExams()
        setExams(data)
      } catch (err) {
        setError("Failed to load exams")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchExams()
  }, [])

  const handleViewResults = (examId) => {
    // In a real app, this would navigate to a detailed results page
    alert(`Viewing results for exam ID: ${examId}`)
  }

  const handlePrepareExam = (examId) => {
    // In a real app, this would navigate to an exam preparation page
    alert(`Preparing exam ID: ${examId}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 p-3 mb-4 rounded">
          <span className="text-gray-700">Complete Exams</span>
        </div>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 p-3 mb-4 rounded">
          <span className="text-gray-700">Complete Exams</span>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">Complete Exams</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Exam Management</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Exam Title</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Submissions</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {exams.map((exam) => (
                <tr key={exam.id} className="border-b">
                  <td className="py-3 px-4">{exam.title}</td>
                  <td className="py-3 px-4">{exam.courseName}</td>
                  <td className="py-3 px-4">{exam.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`${
                        exam.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      } px-2 py-1 rounded text-xs`}
                    >
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {exam.submitted}/{exam.totalStudents}
                  </td>
                  <td className="py-3 px-4">
                    {exam.status === "completed" ? (
                      <button onClick={() => handleViewResults(exam.id)} className="text-blue-500 hover:underline">
                        View Results
                      </button>
                    ) : (
                      <button onClick={() => handlePrepareExam(exam.id)} className="text-blue-500 hover:underline">
                        Prepare
                      </button>
                    )}
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

export default CompleteExams

