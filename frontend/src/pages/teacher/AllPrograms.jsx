"use client";
import TeacherLayout from "./TeacherLayout";
import { useState } from "react";
import { Search, Book, ChevronRight } from "lucide-react";
const ProgramManagement = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      code: "CS",
      name: "Computer Science",
      department: "Engineering",
      courses: 12,
      students: 345,
      coordinator: "Dr. Johnson",
    },
    {
      id: 2,
      code: "EE",
      name: "Electrical Engineering",
      department: "Engineering",
      courses: 10,
      students: 280,
      coordinator: "Dr. Williams",
    },
    {
      id: 3,
      code: "BUS",
      name: "Business Administration",
      department: "Business",
      courses: 15,
      students: 420,
      coordinator: "Dr. Martinez",
    },
    {
      id: 4,
      code: "MED",
      name: "Medical Sciences",
      department: "Medicine",
      courses: 20,
      students: 210,
      coordinator: "Dr. Thompson",
    },
  ]);

  return (
    <TeacherLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">All Programs</h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search programs..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            code={program.code}
            name={program.name}
            department={program.department}
            courses={program.courses}
            students={program.students}
            coordinator={program.coordinator}
          />
        ))}
      </div>
    </TeacherLayout>
  );
};

const ProgramCard = ({
  code,
  name,
  department,
  courses,
  students,
  coordinator,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <Book size={24} />
          </div>
          <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm font-medium">
            {code}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-500 mb-4">{department}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Courses</span>
            <span className="font-semibold">{courses}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Students</span>
            <span className="font-semibold">{students}</span>
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <span className="text-gray-500 text-sm">Program Coordinator</span>
          <span className="font-semibold">{coordinator}</span>
        </div>

        <a
          href={`/teacher/programs/${code}`}
          className="inline-flex items-center justify-center w-full bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition-colors"
        >
          View Program Details <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default ProgramManagement;
