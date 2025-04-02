"use client"

import { useState } from "react"
import TeacherLayout from "./TeacherLayout"
import { Video, FileText, FileQuestion, Upload, Clock, BookOpen } from "lucide-react"

const UploadContent = () => {
  const [contentType, setContentType] = useState("video")
  const [selectedCourse, setSelectedCourse] = useState("")

  // Mock data for courses
  const courses = [
    { id: 1, code: "CS301", name: "Database Systems" },
    { id: 2, code: "CS302", name: "Data Structures" },
    { id: 3, code: "CS401", name: "UI/UX Design" },
  ]

  return (
    <TeacherLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload Course Content</h1>
        <p className="text-gray-500">Add new content to your courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ContentTypeButton
                    type="video"
                    icon={<Video className="w-5 h-5" />}
                    title="Video Lecture"
                    description="Upload video lectures and presentations"
                    selected={contentType === "video"}
                    onClick={() => setContentType("video")}
                  />
                  <ContentTypeButton
                    type="document"
                    icon={<FileText className="w-5 h-5" />}
                    title="Document"
                    description="Upload PDF, Word, or PowerPoint files"
                    selected={contentType === "document"}
                    onClick={() => setContentType("document")}
                  />
                  <ContentTypeButton
                    type="quiz"
                    icon={<FileQuestion className="w-5 h-5" />}
                    title="Quiz/Exam"
                    description="Create online quizzes and exams"
                    selected={contentType === "quiz"}
                    onClick={() => setContentType("quiz")}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Course
                </label>
                <select
                  id="course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
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

              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Content Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  placeholder="Enter description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="week" className="block text-sm font-medium text-gray-700 mb-2">
                  Week Number
                </label>
                <select
                  id="week"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select week</option>
                  {[...Array(16)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      Week {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {contentType === "video" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">MP4, MOV, or WebM up to 500MB</p>
                    </div>
                  </div>
                </div>
              )}

              {contentType === "document" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOCX, PPTX up to 50MB</p>
                    </div>
                  </div>
                </div>
              )}

              {contentType === "quiz" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Settings</label>
                  <div className="space-y-4 border rounded-md p-4">
                    <div>
                      <label htmlFor="time-limit" className="block text-sm font-medium text-gray-700 mb-1">
                        Time Limit (minutes)
                      </label>
                      <input
                        type="number"
                        id="time-limit"
                        placeholder="Enter time limit"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        id="due-date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="total-points" className="block text-sm font-medium text-gray-700 mb-1">
                        Total Points
                      </label>
                      <input
                        type="number"
                        id="total-points"
                        placeholder="Enter total points"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <p className="text-sm text-blue-600">
                      Note: After creating the quiz, you will be able to add questions.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Upload Content
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Upload Tips</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full text-blue-600 mr-3 mt-0.5">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Video lectures</span> should be clear and concise,
                    ideally 10-15 minutes per topic.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full text-blue-600 mr-3 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Documents</span> should be properly formatted and
                    include all necessary information for students.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full text-blue-600 mr-3 mt-0.5">
                    <FileQuestion className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Quizzes and exams</span> should have clear instructions
                    and fair time limits.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full text-blue-600 mr-3 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Organize content</span> by weeks to help students follow
                    the course structure.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full text-blue-600 mr-3 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Regular updates</span> keep students engaged. Try to
                    upload new content weekly.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}

const ContentTypeButton = ({ type, icon, title, description, selected, onClick }) => {
  return (
    <button
      type="button"
      className={`border rounded-lg p-4 text-left transition-colors ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
          selected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </button>
  )
}

export default UploadContent

