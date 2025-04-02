"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import TeacherLayout from "./TeacherLayout"
import { BookOpen, Users, Calendar, Award, ArrowLeft, Download, FileText } from "lucide-react"

const ProgramDetails = () => {
  const { programId } = useParams()

  // Mock data for program details
  const program = {
    code: "CS",
    name: "Computer Science",
    department: "Engineering",
    level: "Undergraduate",
    duration: "4 years",
    coordinator: "Dr. Johnson",
    description:
      "The Computer Science program provides students with a comprehensive foundation in computer science principles, programming languages, software development, and emerging technologies. Students will learn problem-solving skills, algorithmic thinking, and practical application development.",
  }

  // Mock data for program courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CS301",
      name: "Database Systems",
      semester: "Fall 2023",
      credits: 3,
      students: 28,
      assigned: true,
    },
    {
      id: 2,
      code: "CS302",
      name: "Data Structures",
      semester: "Fall 2023",
      credits: 4,
      students: 35,
      assigned: true,
    },
    {
      id: 3,
      code: "CS401",
      name: "UI/UX Design",
      semester: "Fall 2023",
      credits: 3,
      students: 22,
      assigned: true,
    },
    {
      id: 4,
      code: "CS303",
      name: "Software Engineering",
      semester: "Fall 2023",
      credits: 4,
      students: 30,
      assigned: false,
    },
    {
      id: 5,
      code: "CS304",
      name: "Computer Networks",
      semester: "Fall 2023",
      credits: 3,
      students: 25,
      assigned: false,
    },
  ])

  return (
    <TeacherLayout>
      <div className="mb-6">
        <a href="/teacher/programs" className="inline-flex items-center text-blue-600 hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Programs
        </a>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{program.name} Program</h1>
            <p className="text-gray-500">
              {program.department} • Program Code: {program.code}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2 inline-block" /> Download Program Outline
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Program Overview</h2>
            <p className="text-gray-700 mb-4">{program.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={<Calendar className="w-5 h-5" />} label="Duration" value={program.duration} />
              <InfoItem icon={<Award className="w-5 h-5" />} label="Level" value={program.level} />
              <InfoItem icon={<Users className="w-5 h-5" />} label="Program Coordinator" value={program.coordinator} />
              <InfoItem icon={<BookOpen className="w-5 h-5" />} label="Department" value={program.department} />
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Program Resources</h2>
            <ul className="space-y-3">
              <ResourceItem
                icon={<FileText className="w-5 h-5" />}
                title="Program Curriculum"
                description="Complete program curriculum and course requirements"
              />
              <ResourceItem
                icon={<FileText className="w-5 h-5" />}
                title="Course Prerequisites"
                description="List of prerequisites for all program courses"
              />
              <ResourceItem
                icon={<FileText className="w-5 h-5" />}
                title="Program Guidelines"
                description="Teaching guidelines and standards for instructors"
              />
              <ResourceItem
                icon={<FileText className="w-5 h-5" />}
                title="Grading Policy"
                description="Program-specific grading policies and scales"
              />
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Program Courses</h2>
          <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Courses</option>
            <option value="assigned">Assigned to Me</option>
            <option value="not-assigned">Not Assigned to Me</option>
          </select>
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
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.assigned ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Assigned
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Not Assigned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <a
                      href={`/teacher/courses/${course.code}`}
                      className={`text-sm font-medium ${course.assigned ? "text-blue-600 hover:underline" : "text-gray-400 cursor-not-allowed"}`}
                    >
                      {course.assigned ? "View Course" : "Not Available"}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  )
}

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center">
      <div className="bg-blue-50 p-2 rounded-full text-blue-600 mr-3">{icon}</div>
      <div>
        <span className="text-gray-500 text-sm">{label}</span>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

const ResourceItem = ({ icon, title, description }) => {
  return (
    <li className="flex items-start">
      <div className="bg-blue-50 p-2 rounded-full text-blue-600 mr-3 mt-1">{icon}</div>
      <div>
        <a href="#" className="font-medium hover:text-blue-600">
          {title}
        </a>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  )
}

export default ProgramDetails

