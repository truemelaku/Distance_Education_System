"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ChevronDown, ChevronRight } from "lucide-react"

const CourseTable = ({ courses }) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Course Code</th>
            <th className="py-3 px-4 text-left">Course Title</th>
            <th className="py-3 px-4 text-left">Credit Hours</th>
            <th className="py-3 px-4 text-left">Prerequisites</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.code} className="border-t">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{course.code}</td>
              <td className="py-3 px-4">{course.title}</td>
              <td className="py-3 px-4">{course.creditHours}</td>
              <td className="py-3 px-4">{course.prerequisites || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ProgramDetail = () => {
  const { programCode } = useParams()
  const [expandedYear, setExpandedYear] = useState(null)
  const [expandedSemester, setExpandedSemester] = useState(null)
  const [programData, setProgramData] = useState(null)

  // Program titles mapping
  const programTitles = {
    ce: "Computer Engineering",
    ee: "Electrical Engineering",
    se: "Software Engineering",
    cs: "Computer Science",
    cyber: "Cyber Security",
  }

  // Generate program data based on program code
  useEffect(() => {
    // Common courses for all programs
    const commonCourses = {
      math: [
        { code: "MATH101", title: "Calculus I", creditHours: 3, prerequisites: null },
        { code: "MATH102", title: "Calculus II", creditHours: 3, prerequisites: "MATH101" },
        { code: "MATH201", title: "Linear Algebra", creditHours: 3, prerequisites: "MATH102" },
        { code: "MATH202", title: "Differential Equations", creditHours: 3, prerequisites: "MATH102" },
        { code: "MATH301", title: "Probability & Statistics", creditHours: 3, prerequisites: "MATH201" },
      ],
      physics: [
        { code: "PHYS101", title: "Physics I", creditHours: 4, prerequisites: null },
        { code: "PHYS102", title: "Physics II", creditHours: 4, prerequisites: "PHYS101" },
      ],
      general: [
        { code: "ENG101", title: "English Composition", creditHours: 3, prerequisites: null },
        { code: "ENG102", title: "Technical Writing", creditHours: 3, prerequisites: "ENG101" },
        { code: "ECON101", title: "Economics for Engineers", creditHours: 3, prerequisites: null },
        { code: "MGMT101", title: "Engineering Management", creditHours: 3, prerequisites: null },
      ],
    }

    // Program-specific courses
    const programSpecificCourses = {
      ce: {
        core: [
          { code: "CE101", title: "Introduction to Computer Engineering", creditHours: 3, prerequisites: null },
          { code: "CE201", title: "Digital Logic Design", creditHours: 4, prerequisites: "CE101" },
          { code: "CE202", title: "Computer Architecture", creditHours: 4, prerequisites: "CE201" },
          { code: "CE301", title: "Microprocessors", creditHours: 4, prerequisites: "CE202" },
          { code: "CE302", title: "Embedded Systems", creditHours: 4, prerequisites: "CE301" },
          { code: "CE401", title: "VLSI Design", creditHours: 4, prerequisites: "CE302" },
          { code: "CE402", title: "Computer Networks", creditHours: 3, prerequisites: "CE301" },
          { code: "CE403", title: "Digital Signal Processing", creditHours: 3, prerequisites: "CE301" },
          { code: "CE501", title: "Advanced Computer Architecture", creditHours: 3, prerequisites: "CE302" },
          { code: "CE502", title: "Hardware Security", creditHours: 3, prerequisites: "CE401" },
        ],
        electives: [
          { code: "CE-E401", title: "IoT Systems", creditHours: 3, prerequisites: "CE302" },
          { code: "CE-E402", title: "Robotics", creditHours: 3, prerequisites: "CE302" },
          { code: "CE-E501", title: "Advanced Embedded Systems", creditHours: 3, prerequisites: "CE302" },
          { code: "CE-E502", title: "Hardware Verification", creditHours: 3, prerequisites: "CE401" },
        ],
      },
      ee: {
        core: [
          { code: "EE101", title: "Introduction to Electrical Engineering", creditHours: 3, prerequisites: null },
          { code: "EE201", title: "Circuit Analysis", creditHours: 4, prerequisites: "EE101" },
          { code: "EE202", title: "Electronics I", creditHours: 4, prerequisites: "EE201" },
          { code: "EE301", title: "Electronics II", creditHours: 4, prerequisites: "EE202" },
          { code: "EE302", title: "Signals and Systems", creditHours: 3, prerequisites: "EE201" },
          { code: "EE401", title: "Control Systems", creditHours: 3, prerequisites: "EE302" },
          { code: "EE402", title: "Power Systems", creditHours: 4, prerequisites: "EE301" },
          { code: "EE403", title: "Communication Systems", creditHours: 3, prerequisites: "EE302" },
          { code: "EE501", title: "Advanced Control Systems", creditHours: 3, prerequisites: "EE401" },
          { code: "EE502", title: "Power Electronics", creditHours: 3, prerequisites: "EE402" },
        ],
        electives: [
          { code: "EE-E401", title: "Renewable Energy Systems", creditHours: 3, prerequisites: "EE302" },
          { code: "EE-E402", title: "Electric Machines", creditHours: 3, prerequisites: "EE302" },
          { code: "EE-E501", title: "Smart Grid Technology", creditHours: 3, prerequisites: "EE402" },
          { code: "EE-E502", title: "Wireless Communications", creditHours: 3, prerequisites: "EE403" },
        ],
      },
      se: {
        core: [
          { code: "SE101", title: "Introduction to Software Engineering", creditHours: 3, prerequisites: null },
          { code: "SE201", title: "Object-Oriented Programming", creditHours: 4, prerequisites: "SE101" },
          { code: "SE202", title: "Data Structures and Algorithms", creditHours: 4, prerequisites: "SE201" },
          { code: "SE301", title: "Software Design & Architecture", creditHours: 3, prerequisites: "SE202" },
          { code: "SE302", title: "Database Systems", creditHours: 3, prerequisites: "SE202" },
          { code: "SE401", title: "Software Testing & QA", creditHours: 3, prerequisites: "SE301" },
          { code: "SE402", title: "Web Development", creditHours: 3, prerequisites: "SE302" },
          { code: "SE403", title: "Mobile Application Development", creditHours: 3, prerequisites: "SE302" },
          { code: "SE501", title: "Software Project Management", creditHours: 3, prerequisites: "SE401" },
          { code: "SE502", title: "Cloud Computing", creditHours: 3, prerequisites: "SE402" },
        ],
        electives: [
          { code: "SE-E401", title: "UI/UX Design", creditHours: 3, prerequisites: "SE301" },
          { code: "SE-E402", title: "DevOps", creditHours: 3, prerequisites: "SE301" },
          { code: "SE-E501", title: "Blockchain Development", creditHours: 3, prerequisites: "SE402" },
          { code: "SE-E502", title: "Machine Learning for Software Engineers", creditHours: 3, prerequisites: "SE302" },
        ],
      },
      cs: {
        core: [
          { code: "CS101", title: "Introduction to Computer Science", creditHours: 3, prerequisites: null },
          { code: "CS201", title: "Programming Fundamentals", creditHours: 4, prerequisites: "CS101" },
          { code: "CS202", title: "Data Structures", creditHours: 4, prerequisites: "CS201" },
          { code: "CS301", title: "Algorithms", creditHours: 3, prerequisites: "CS202" },
          { code: "CS302", title: "Operating Systems", creditHours: 4, prerequisites: "CS202" },
          { code: "CS401", title: "Database Management Systems", creditHours: 3, prerequisites: "CS302" },
          { code: "CS402", title: "Computer Networks", creditHours: 3, prerequisites: "CS302" },
          { code: "CS403", title: "Artificial Intelligence", creditHours: 3, prerequisites: "CS301" },
          { code: "CS501", title: "Machine Learning", creditHours: 3, prerequisites: "CS403" },
          { code: "CS502", title: "Big Data Analytics", creditHours: 3, prerequisites: "CS401" },
        ],
        electives: [
          { code: "CS-E401", title: "Computer Graphics", creditHours: 3, prerequisites: "CS301" },
          { code: "CS-E402", title: "Natural Language Processing", creditHours: 3, prerequisites: "CS403" },
          { code: "CS-E501", title: "Deep Learning", creditHours: 3, prerequisites: "CS501" },
          { code: "CS-E502", title: "Quantum Computing", creditHours: 3, prerequisites: "CS302" },
        ],
      },
      cyber: {
        core: [
          { code: "CYB101", title: "Introduction to Cybersecurity", creditHours: 3, prerequisites: null },
          { code: "CYB201", title: "Network Security", creditHours: 4, prerequisites: "CYB101" },
          { code: "CYB202", title: "Cryptography", creditHours: 3, prerequisites: "CYB101" },
          { code: "CYB301", title: "Ethical Hacking", creditHours: 4, prerequisites: "CYB201" },
          { code: "CYB302", title: "Security Operations", creditHours: 3, prerequisites: "CYB201" },
          { code: "CYB401", title: "Digital Forensics", creditHours: 4, prerequisites: "CYB301" },
          { code: "CYB402", title: "Malware Analysis", creditHours: 3, prerequisites: "CYB301" },
          { code: "CYB403", title: "Secure Software Development", creditHours: 3, prerequisites: "CYB202" },
          { code: "CYB501", title: "Advanced Network Security", creditHours: 3, prerequisites: "CYB301" },
          { code: "CYB502", title: "Security Governance & Compliance", creditHours: 3, prerequisites: "CYB302" },
        ],
        electives: [
          { code: "CYB-E401", title: "Cloud Security", creditHours: 3, prerequisites: "CYB201" },
          { code: "CYB-E402", title: "IoT Security", creditHours: 3, prerequisites: "CYB201" },
          { code: "CYB-E501", title: "Threat Intelligence", creditHours: 3, prerequisites: "CYB302" },
          { code: "CYB-E502", title: "Security Architecture", creditHours: 3, prerequisites: "CYB302" },
        ],
      },
    }

    // Create a 5-year program structure with courses distributed across semesters
    const createProgramStructure = (programSpecific) => {
      const years = []

      // Year 1
      years.push({
        year: 1,
        semesters: [
          {
            semester: 1,
            courses: [
              programSpecific.core[0],
              commonCourses.math[0],
              commonCourses.physics[0],
              commonCourses.general[0],
            ],
          },
          {
            semester: 2,
            courses: [
              programSpecific.core[1],
              commonCourses.math[1],
              commonCourses.physics[1],
              commonCourses.general[1],
            ],
          },
        ],
      })

      // Year 2
      years.push({
        year: 2,
        semesters: [
          {
            semester: 1,
            courses: [
              programSpecific.core[2],
              commonCourses.math[2],
              commonCourses.general[2],
              { code: "PROJ201", title: "Project I", creditHours: 2, prerequisites: programSpecific.core[0].code },
            ],
          },
          {
            semester: 2,
            courses: [
              programSpecific.core[3],
              commonCourses.math[3],
              commonCourses.general[3],
              { code: "PROJ202", title: "Project II", creditHours: 2, prerequisites: "PROJ201" },
            ],
          },
        ],
      })

      // Year 3
      years.push({
        year: 3,
        semesters: [
          {
            semester: 1,
            courses: [
              programSpecific.core[4],
              programSpecific.core[5],
              commonCourses.math[4],
              { code: "PROJ301", title: "Project III", creditHours: 2, prerequisites: "PROJ202" },
            ],
          },
          {
            semester: 2,
            courses: [
              programSpecific.core[6],
              programSpecific.core[7],
              { code: "PROJ302", title: "Project IV", creditHours: 2, prerequisites: "PROJ301" },
              { code: "INTERN301", title: "Internship I", creditHours: 3, prerequisites: null },
            ],
          },
        ],
      })

      // Year 4
      years.push({
        year: 4,
        semesters: [
          {
            semester: 1,
            courses: [
              programSpecific.core[8],
              programSpecific.electives[0],
              programSpecific.electives[1],
              { code: "PROJ401", title: "Senior Project I", creditHours: 3, prerequisites: "PROJ302" },
            ],
          },
          {
            semester: 2,
            courses: [
              programSpecific.core[9],
              programSpecific.electives[2],
              { code: "PROJ402", title: "Senior Project II", creditHours: 3, prerequisites: "PROJ401" },
              { code: "INTERN401", title: "Internship II", creditHours: 3, prerequisites: "INTERN301" },
            ],
          },
        ],
      })

      // Year 5
      years.push({
        year: 5,
        semesters: [
          {
            semester: 1,
            courses: [
              {
                code: `${programCode.toUpperCase()}501`,
                title: "Advanced Topics I",
                creditHours: 3,
                prerequisites: programSpecific.core[9].code,
              },
              {
                code: `${programCode.toUpperCase()}502`,
                title: "Research Methods",
                creditHours: 3,
                prerequisites: null,
              },
              programSpecific.electives[3],
              { code: "THESIS501", title: "Thesis I", creditHours: 4, prerequisites: "PROJ402" },
            ],
          },
          {
            semester: 2,
            courses: [
              {
                code: `${programCode.toUpperCase()}503`,
                title: "Advanced Topics II",
                creditHours: 3,
                prerequisites: `${programCode.toUpperCase()}501`,
              },
              {
                code: `${programCode.toUpperCase()}504`,
                title: "Professional Practice",
                creditHours: 3,
                prerequisites: null,
              },
              { code: "THESIS502", title: "Thesis II", creditHours: 6, prerequisites: "THESIS501" },
            ],
          },
        ],
      })

      return years
    }

    // Set program data based on program code
    if (programCode && programSpecificCourses[programCode]) {
      setProgramData(createProgramStructure(programSpecificCourses[programCode]))
      // Automatically expand the first year
      setExpandedYear(1)
    }
  }, [programCode])

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year)
    setExpandedSemester(null)
  }

  const toggleSemester = (year, semester) => {
    if (expandedYear === year) {
      setExpandedSemester(expandedSemester === semester ? null : semester)
    }
  }

  if (!programData) {
    return (
      <div className="container mx-auto">
        <div className="bg-gray-200 p-3 mb-4 rounded">
          <span className="text-gray-700">Program Details</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Loading program data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">Program Details</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">{programTitles[programCode]} - Course Structure</h2>

        <div className="space-y-4">
          {programData.map((yearData) => (
            <div key={yearData.year} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleYear(yearData.year)}
                className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100"
              >
                <span className="font-medium">Year {yearData.year}</span>
                {expandedYear === yearData.year ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>

              {expandedYear === yearData.year && (
                <div className="p-4 space-y-4">
                  {yearData.semesters.map((semesterData) => (
                    <div key={semesterData.semester} className="border rounded-lg">
                      <button
                        onClick={() => toggleSemester(yearData.year, semesterData.semester)}
                        className="w-full px-4 py-3 bg-blue-50 flex items-center justify-between hover:bg-blue-100"
                      >
                        <span className="font-medium">Semester {semesterData.semester}</span>
                        {expandedSemester === semesterData.semester ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>

                      {expandedSemester === semesterData.semester && (
                        <div className="p-4">
                          <CourseTable courses={semesterData.courses} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgramDetail

