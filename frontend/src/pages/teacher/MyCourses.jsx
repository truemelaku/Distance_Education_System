"use client"

import { Users, Clock, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

const CourseCard = ({ id, title, code, students, hours, startDate, image }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/manage-score?course=${code}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow overflow-hidden cursor-pointer transition-transform hover:scale-105"
    >
      <div className="h-40 bg-gray-300 relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">Course Code: {code}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{students} Students</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{hours} Hours</span>
          </div>
          <div className="flex items-center text-gray-600 col-span-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Started: {startDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      code: "CS101",
      students: 45,
      hours: 48,
      startDate: "Sep 1, 2023",
      image: "/placeholder.svg?height=160&width=320",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      code: "CS201",
      students: 38,
      hours: 48,
      startDate: "Sep 5, 2023",
      image: "/placeholder.svg?height=160&width=320",
    },
    {
      id: 3,
      title: "Database Systems",
      code: "CS301",
      students: 42,
      hours: 48,
      startDate: "Sep 10, 2023",
      image: "/placeholder.svg?height=160&width=320",
    },
    {
      id: 4,
      title: "Object Oriented Programming",
      code: "CSE1103",
      students: 35,
      hours: 48,
      startDate: "Sep 15, 2023",
      image: "/placeholder.svg?height=160&width=320",
    },
  ]

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">My Courses</span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Current Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              code={course.code}
              students={course.students}
              hours={course.hours}
              startDate={course.startDate}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyCourses

