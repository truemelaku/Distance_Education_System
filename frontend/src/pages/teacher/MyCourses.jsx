"use client"

import { useState } from "react"
import TeacherLayout from "./TeacherLayout"
import { Search, Filter, Plus, Edit, Trash, Eye, FileText, Users, BarChart2 } from "lucide-react"

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CS301",
      name: "Database Systems",
      department: "Computer Science",
      semester: "Fall 2023",
      students: 28,
      assignments: 5,
      quizzes: 3,
    },
    {
      id: 2,
      code: "CS302",
      name: "Data Structures",
      department: "Computer Science",
      semester: "Fall 2023",
      students: 35,
      assignments: 4,
      quizzes: 2,
    },
    {
      id: 3,
      code: "CS401",
      name: "UI/UX Design",
      department: "Computer Science",
      semester: "Fall 2023",
      students: 22,
      assignments: 6,
      quizzes: 1,
    },
  ])

  return (
    <TeacherLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Course Management</h1>
        <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add New Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search courses..."
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
                <option value="">All Semesters</option>
                <option value="fall2023">Fall 2023</option>
                <option value="spring2023">Spring 2023</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.semester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="mr-2">{course.assignments} assignments</span>
                      <span>{course.quizzes} quizzes</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100" title="View Course">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Edit Course">
                        <Edit className="w-5 h-5 text-yellow-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Delete Course">
                        <Trash className="w-5 h-5 text-red-600" />
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{" "}
              <span className="font-medium">3</span> courses
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <QuickAccessCard
          title="Assignments"
          icon={<FileText className="w-5 h-5" />}
          description="Create and manage assignments"
          linkText="Manage Assignments"
          linkUrl="/teacher/assignments"
          color="blue"
        />
        <QuickAccessCard
          title="Students"
          icon={<Users className="w-5 h-5" />}
          description="View and manage student enrollments"
          linkText="View Students"
          linkUrl="/teacher/students"
          color="green"
        />
        <QuickAccessCard
          title="Analytics"
          icon={<BarChart2 className="w-5 h-5" />}
          description="View course performance analytics"
          linkText="View Analytics"
          linkUrl="/teacher/analytics"
          color="purple"
        />
      </div>
    </TeacherLayout>
  )
}

const QuickAccessCard = ({ title, icon, description, linkText, linkUrl, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="p-4">
        <div className={`w-10 h-10 rounded-full ${colorClasses[color]} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a href={linkUrl} className="text-sm font-medium hover:underline">
          {linkText} →
        </a>
      </div>
    </div>
  )
}

export default CourseManagement

