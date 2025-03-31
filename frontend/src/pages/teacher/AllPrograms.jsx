"use client"

import { useNavigate } from "react-router-dom"
import { BookOpen } from "lucide-react"

const ProgramButton = ({ title, code, description }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/program/${code}`)}
      className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </button>
  )
}

const AllPrograms = () => {
  const programs = [
    {
      code: "ce",
      title: "Computer Engineering",
      description: "Bachelor of Science in Computer Engineering",
    },
    {
      code: "ee",
      title: "Electrical Engineering",
      description: "Bachelor of Science in Electrical Engineering",
    },
    {
      code: "se",
      title: "Software Engineering",
      description: "Bachelor of Science in Software Engineering",
    },
    {
      code: "cs",
      title: "Computer Science",
      description: "Bachelor of Science in Computer Science",
    },
    {
      code: "cyber",
      title: "Cyber Security",
      description: "Bachelor of Science in Cyber Security",
    },
  ]

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">All Programs & Courses</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Available Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <ProgramButton
              key={program.code}
              title={program.title}
              code={program.code}
              description={program.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllPrograms

