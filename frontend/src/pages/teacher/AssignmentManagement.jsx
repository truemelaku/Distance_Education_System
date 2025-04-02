"use client"

import { useState } from "react"
import TeacherLayout from "./TeacherLayout"
import { Search, Filter, Plus, Edit, Trash, Eye, Download, CheckCircle, Clock } from "lucide-react"

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Database Design Project",
      course: "CS301",
      dueDate: "15/11/2023",
      status: "active",
      totalPoints: 100,
      submissions: 18,
      totalStudents: 28,
    },
    {
      id: 2,
      title: "Algorithm Analysis",
      course: "CS302",
      dueDate: "18/11/2023",
      status: "active",
      totalPoints: 50,
      submissions: 20,
      totalStudents: 35,
    },
    {
      id: 3,
      title: "UI/UX Case Study",
      course: "CS401",
      dueDate: "22/11/2023",
      status: "active",
      totalPoints: 75,
      submissions: 5,
      totalStudents: 22,
    },
    {
      id: 4,
      title: "Database Normalization Quiz",
      course: "CS301",
      dueDate: "05/11/2023",
      status: "completed",
      totalPoints: 25,
      submissions: 26,
      totalStudents: 28,
    },
    {
      id: 5,
      title: "Data Structures Implementation",
      course: "CS302",
      dueDate: "08/11/2023",
      status: "completed",
      totalPoints: 80,
      submissions: 32,
      totalStudents: 35,
    },
  ])

  return (
    <TeacherLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Assignment Management</h1>
        <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search assignments..."
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
              <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submissions
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
                    <div className="text-sm text-gray-900">{assignment.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{assignment.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        assignment.status === "active"
                          ? "bg-green-100 text-green-800"
                          : assignment.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
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
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100" title="View Assignment">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Assignment">
                        <Edit className="w-5 h-5 text-yellow-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Delete Assignment">
                        <Trash className="w-5 h-5 text-red-600" />
                      </button>
                      {assignment.status === "completed" && (
                        <button className="p-1 rounded-full hover:bg-gray-100" title="Download Submissions">
                          <Download className="w-5 h-5 text-green-600" />
                        </button>
                      )}
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
              <span className="font-medium">5</span> assignments
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Recent Submissions</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              View All
            </a>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              <SubmissionItem
                name="John Doe"
                assignment="Database Design Project"
                course="CS301"
                time="2 hours ago"
                status="new"
              />
              <SubmissionItem
                name="Jane Smith"
                assignment="Algorithm Analysis"
                course="CS302"
                time="5 hours ago"
                status="new"
              />
              <SubmissionItem
                name="Michael Johnson"
                assignment="Database Design Project"
                course="CS301"
                time="Yesterday"
                status="graded"
                grade="92/100"
              />
              <SubmissionItem
                name="Emily Davis"
                assignment="Algorithm Analysis"
                course="CS302"
                time="Yesterday"
                status="graded"
                grade="88/100"
              />
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Upcoming Deadlines</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              View Calendar
            </a>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              <DeadlineItem
                title="Database Design Project"
                course="CS301"
                dueDate="15/11/2023"
                daysLeft={3}
                submissions={18}
                totalStudents={28}
              />
              <DeadlineItem
                title="Algorithm Analysis"
                course="CS302"
                dueDate="18/11/2023"
                daysLeft={6}
                submissions={20}
                totalStudents={35}
              />
              <DeadlineItem
                title="UI/UX Case Study"
                course="CS401"
                dueDate="22/11/2023"
                daysLeft={10}
                submissions={5}
                totalStudents={22}
              />
            </ul>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}
const SubmissionItem = ({ name, assignment, course, time, status, grade }) => {
  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">
            {assignment} • {course}
          </p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <div>
          {status === "new" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Clock className="w-3 h-3 mr-1" />
              New
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              {grade}
            </span>
          )}
        </div>
      </div>
    </li>
  )
}

const DeadlineItem = ({ title, course, dueDate, daysLeft, submissions, totalStudents }) => {
  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">
            {course} • Due: {dueDate}
          </p>
          <div className="mt-1 flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
              <div
                className="h-1.5 bg-blue-500 rounded-full"
                style={{ width: `${(submissions / totalStudents) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">
              {submissions}/{totalStudents} submitted
            </span>
          </div>
        </div>
        <div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              daysLeft <= 3
                ? "bg-red-100 text-red-800"
                : daysLeft <= 7
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
            }`}
          >
            {daysLeft} days left
          </span>
        </div>
      </div>
    </li>
  )
}

export default AssignmentManagement

