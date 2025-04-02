"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import TeacherLayout from ".../components/layout/TeacherLayout"
import { ArrowLeft, Video, FileText, FileQuestion, Upload, Users, MessageCircle, Plus, Edit } from "lucide-react"

const CourseDetails = () => {
  const { courseId } = useParams()

  // Mock data for course details
  const course = {
    code: "CS301",
    name: "Database Systems",
    program: "Computer Science",
    semester: "Fall 2023",
    students: 28,
    description:
      "This course covers the principles of database design and management systems. Topics include data models, database design, data definition and manipulation languages, storage and indexing techniques, query processing, and transaction management.",
  }

  // Mock data for course content
  const [courseContent, setCourseContent] = useState([
    {
      id: 1,
      title: "Introduction to Databases",
      type: "video",
      week: 1,
      uploadDate: "05/10/2023",
      duration: "45 min",
      size: "250 MB",
      views: 26,
    },
    {
      id: 2,
      title: "Entity-Relationship Model",
      type: "video",
      week: 2,
      uploadDate: "12/10/2023",
      duration: "50 min",
      size: "280 MB",
      views: 22,
    },
    {
      id: 3,
      title: "Relational Model",
      type: "video",
      week: 3,
      uploadDate: "19/10/2023",
      duration: "40 min",
      size: "230 MB",
      views: 20,
    },
    {
      id: 4,
      title: "SQL Basics",
      type: "document",
      week: 3,
      uploadDate: "19/10/2023",
      size: "1.5 MB",
      downloads: 25,
    },
    {
      id: 5,
      title: "Week 3 Quiz",
      type: "quiz",
      week: 3,
      uploadDate: "20/10/2023",
      questions: 10,
      attempts: 26,
    },
  ])

  // Mock data for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "ER Diagram Assignment",
      dueDate: "25/10/2023",
      totalPoints: 20,
      submissions: 24,
      totalStudents: 28,
      status: "completed",
    },
    {
      id: 2,
      title: "SQL Queries Practice",
      dueDate: "08/11/2023",
      totalPoints: 30,
      submissions: 18,
      totalStudents: 28,
      status: "active",
    },
    {
      id: 3,
      title: "Database Design Project",
      dueDate: "15/11/2023",
      totalPoints: 100,
      submissions: 5,
      totalStudents: 28,
      status: "active",
    },
  ])

  // Tab state
  const [activeTab, setActiveTab] = useState("content")

  return (
    <TeacherLayout>
      <div className="mb-6">
        <a href="/teacher/courses" className="inline-flex items-center text-blue-600 hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Courses
        </a>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {course.code}: {course.name}
            </h1>
            <p className="text-gray-500">
              {course.program} • {course.semester}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
              <Users className="w-4 h-4 mr-1" /> {course.students} Students
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <MessageCircle className="w-4 h-4 mr-2 inline-block" /> Message Students
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Course Description</h2>
        <p className="text-gray-700">{course.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === "content" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("content")}
          >
            Course Content
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === "assignments" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("assignments")}
          >
            Assignments & Exams
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === "students" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === "scores" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("scores")}
          >
            Manage Scores
          </button>
        </div>

        <div className="p-4">
          {activeTab === "content" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Course Materials</h3>
                <button className="flex items-center text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                  <Upload className="w-4 h-4 mr-1" /> Upload Content
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Week
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courseContent.map((content) => (
                      <tr key={content.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-md mr-3 ${
                                content.type === "video"
                                  ? "bg-blue-100 text-blue-600"
                                  : content.type === "quiz"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {content.type === "video" ? (
                                <Video className="w-4 h-4" />
                              ) : content.type === "quiz" ? (
                                <FileQuestion className="w-4 h-4" />
                              ) : (
                                <FileText className="w-4 h-4" />
                              )}
                            </div>
                            <div className="text-sm font-medium text-gray-900">{content.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{content.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Week {content.week}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{content.uploadDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {content.type === "video"
                              ? `${content.duration} • ${content.views} views`
                              : content.type === "quiz"
                                ? `${content.questions} questions • ${content.attempts} attempts`
                                : `${content.size} • ${content.downloads} downloads`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <Edit className="w-4 h-4 text-yellow-600" />
                            </button>
                            <button className="p-1 rounded-full hover:bg-gray-100 text-green-600">View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Assignments & Exams</h3>
                <button className="flex items-center text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                  <Plus className="w-4 h-4 mr-1" /> Create Assignment
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submissions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{assignment.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{assignment.totalPoints} pts</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className="h-2.5 bg-blue-500 rounded-full"
                                style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">
                              {assignment.submissions}/{assignment.totalStudents}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              assignment.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {assignment.status === "active" ? "Active" : "Completed"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <Edit className="w-4 h-4 text-yellow-600" />
                            </button>
                            <button className="p-1 rounded-full hover:bg-gray-100 text-green-600">View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <h3 className="font-semibold mb-4">Enrolled Students</h3>
              <p className="text-gray-500 italic">Student list would be displayed here</p>
            </div>
          )}

          {activeTab === "scores" && (
            <div>
              <h3 className="font-semibold mb-4">Manage Student Scores</h3>
              <p className="text-gray-500 italic">Score management interface would be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
  )
}

export default CourseDetails

