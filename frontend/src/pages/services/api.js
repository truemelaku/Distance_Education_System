// Simulated API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API service
export const api = {
  // Auth
  login: async (credentials) => {
    await delay(800)
    if (credentials.email === "amir.mohammed@example.com" && credentials.password === "password") {
      return {
        success: true,
        user: mockData.currentUser,
      }
    }
    throw new Error("Invalid credentials")
  },

  // Profile
  getProfile: async () => {
    await delay(600)
    return mockData.currentUser
  },
  updateProfile: async (data) => {
    await delay(800)
    mockData.currentUser = { ...mockData.currentUser, ...data }
    return mockData.currentUser
  },

  // Courses
  getCourses: async () => {
    await delay(700)
    return mockData.courses
  },
  getCourseById: async (id) => {
    await delay(500)
    return mockData.courses.find((course) => course.id === Number.parseInt(id))
  },

  // Programs
  getPrograms: async () => {
    await delay(600)
    return mockData.programs
  },

  // Exams
  getExams: async () => {
    await delay(800)
    return mockData.exams
  },
  updateExam: async (id, data) => {
    await delay(700)
    const index = mockData.exams.findIndex((exam) => exam.id === Number.parseInt(id))
    if (index !== -1) {
      mockData.exams[index] = { ...mockData.exams[index], ...data }
      return mockData.exams[index]
    }
    throw new Error("Exam not found")
  },

  // Scores
  getScores: async (courseId, assessmentId) => {
    await delay(900)
    let scores = [...mockData.scores]

    if (courseId) {
      scores = scores.filter((score) => score.courseId === Number.parseInt(courseId))
    }

    if (assessmentId) {
      scores = scores.filter((score) => score.assessmentId === Number.parseInt(assessmentId))
    }

    return scores
  },
  updateScore: async (id, data) => {
    await delay(600)
    const index = mockData.scores.findIndex((score) => score.id === Number.parseInt(id))
    if (index !== -1) {
      mockData.scores[index] = { ...mockData.scores[index], ...data }
      return mockData.scores[index]
    }
    throw new Error("Score not found")
  },
  deleteScore: async (id) => {
    await delay(500)
    const index = mockData.scores.findIndex((score) => score.id === Number.parseInt(id))
    if (index !== -1) {
      mockData.scores.splice(index, 1)
      return { success: true }
    }
    throw new Error("Score not found")
  },

  // News & Events
  getNewsAndEvents: async () => {
    await delay(700)
    return mockData.events
  },

  // Chat
  getChats: async () => {
    await delay(600)
    return mockData.chats
  },
  getChatById: async (id) => {
    await delay(400)
    return mockData.chats.find((chat) => chat.id === Number.parseInt(id))
  },
  sendMessage: async (chatId, message) => {
    await delay(300)
    const chat = mockData.chats.find((chat) => chat.id === Number.parseInt(chatId))
    if (chat) {
      const newMessage = {
        id: chat.messages.length + 1,
        sender: "me",
        text: message,
        time: "Just now",
      }
      chat.messages.push(newMessage)
      return newMessage
    }
    throw new Error("Chat not found")
  },

  // Courses by Lecturer ID
  getCoursesByLecturerId: async (lecturerId) => {
    await delay(700)
    return mockData.courses.filter((course) => course.lecturerId === lecturerId)
  },
}

// Mock data
export const mockData = {
  currentUser: {
    id: 1,
    firstName: "Amir",
    lastName: "Mohammed",
    email: "amir.mohammed@example.com",
    phone: "+1 234 567 890",
    role: "Senior Lecturer",
    department: "Department of Computer Science",
    office: "Room 302, Building A",
    officeHours: "Mon, Wed 10:00 - 12:00",
    specialization: "Machine Learning",
    experience: "8 years",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },

  courses: [
    {
      id: 1,
      title: "Introduction to Computer Science",
      code: "CS101",
      students: 45,
      hours: 48,
      startDate: "Sep 1, 2023",
      image: "/placeholder.svg?height=160&width=320",
      description:
        "An introduction to the basic concepts of computer science, including algorithms, data structures, and problem-solving techniques.",
      lecturerId: 1, // Current user is assigned to this course
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      code: "CS201",
      students: 38,
      hours: 48,
      startDate: "Sep 5, 2023",
      image: "/placeholder.svg?height=160&width=320",
      description:
        "A comprehensive study of data structures and algorithms, including their design, analysis, and implementation.",
      lecturerId: 1, // Current user is assigned to this course
    },
    {
      id: 3,
      title: "Database Systems",
      code: "CS301",
      students: 42,
      hours: 48,
      startDate: "Sep 10, 2023",
      image: "/placeholder.svg?height=160&width=320",
      description:
        "An introduction to database systems, including relational database design, SQL, and database management systems.",
      lecturerId: 2, // Assigned to another lecturer
    },
    {
      id: 4,
      title: "Machine Learning",
      code: "CS401",
      students: 35,
      hours: 48,
      startDate: "Sep 15, 2023",
      image: "/placeholder.svg?height=160&width=320",
      description: "An introduction to machine learning concepts, algorithms, and applications.",
      lecturerId: 1, // Current user is assigned to this course
    },
  ],

  programs: [
    {
      id: 1,
      name: "Computer Science",
      degree: "Bachelor of Science",
      duration: "4 years",
      courses: [1, 2, 3],
    },
    {
      id: 2,
      name: "Data Science",
      degree: "Master of Science",
      duration: "2 years",
      courses: [2, 3, 4],
    },
    {
      id: 3,
      name: "Artificial Intelligence",
      degree: "Master of Science",
      duration: "2 years",
      courses: [4],
    },
  ],

  exams: [
    {
      id: 1,
      title: "Midterm Exam",
      courseId: 1,
      courseName: "CS101",
      date: "Oct 15, 2023",
      status: "completed",
      totalStudents: 45,
      submitted: 45,
    },
    {
      id: 2,
      title: "Final Exam",
      courseId: 2,
      courseName: "CS201",
      date: "Dec 10, 2023",
      status: "pending",
      totalStudents: 38,
      submitted: 0,
    },
    {
      id: 3,
      title: "Quiz 3",
      courseId: 3,
      courseName: "CS301",
      date: "Nov 5, 2023",
      status: "completed",
      totalStudents: 42,
      submitted: 40,
    },
  ],

  assessments: [
    { id: 1, name: "Midterm Exam", courseId: 1 },
    { id: 2, name: "Final Exam", courseId: 1 },
    { id: 3, name: "Assignment 1", courseId: 1 },
    { id: 4, name: "Quiz 1", courseId: 1 },
    { id: 5, name: "Midterm Exam", courseId: 2 },
    { id: 6, name: "Final Exam", courseId: 2 },
  ],

  scores: [
    {
      id: 1,
      studentId: "S12345",
      studentName: "John Smith",
      score: "85/100",
      grade: "A",
      courseId: 1,
      assessmentId: 1,
    },
    {
      id: 2,
      studentId: "S12346",
      studentName: "Sarah Johnson",
      score: "92/100",
      grade: "A+",
      courseId: 1,
      assessmentId: 1,
    },
    {
      id: 3,
      studentId: "S12347",
      studentName: "Michael Brown",
      score: "78/100",
      grade: "B+",
      courseId: 1,
      assessmentId: 1,
    },
    {
      id: 4,
      studentId: "S12345",
      studentName: "John Smith",
      score: "90/100",
      grade: "A",
      courseId: 1,
      assessmentId: 2,
    },
    {
      id: 5,
      studentId: "S12346",
      studentName: "Sarah Johnson",
      score: "95/100",
      grade: "A+",
      courseId: 1,
      assessmentId: 2,
    },
    {
      id: 6,
      studentId: "S12347",
      studentName: "Michael Brown",
      score: "82/100",
      grade: "A-",
      courseId: 1,
      assessmentId: 2,
    },
    {
      id: 7,
      studentId: "S12348",
      studentName: "Emily Davis",
      score: "88/100",
      grade: "A",
      courseId: 2,
      assessmentId: 5,
    },
    {
      id: 8,
      studentId: "S12349",
      studentName: "David Wilson",
      score: "75/100",
      grade: "B",
      courseId: 2,
      assessmentId: 5,
    },
  ],

  events: [
    {
      id: 1,
      type: "News",
      title: "Example Event",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a",
      time: "19 minutes ago",
      date: "2023-03-15",
    },
    {
      id: 2,
      type: "Event",
      title: "Example Event Updated",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a",
      time: "3 hours, 48 minutes ago",
      date: "2023-03-15",
    },
    {
      id: 3,
      type: "Event",
      title: "Example 3",
      description:
        "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.",
      time: "3 months, 4 weeks ago",
      date: "2022-11-20",
    },
    {
      id: 4,
      type: "Event",
      title: "Final Exam Schedule",
      description:
        "final exam for all student will be at : August 2, 2020, 2:30 pm, you must be there at the above date and time, otherwise you may lose your final exam and that make you incomplete.",
      time: "4 months, 2 weeks ago",
      date: "2022-11-01",
    },
    {
      id: 5,
      type: "News",
      title: "Example News",
      description: "the description or summary of this post is goes here...",
      time: "4 months, 2 weeks ago",
      date: "2022-11-01",
    },
    {
      id: 6,
      type: "Event",
      title: "Example Event",
      description:
        "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.",
      time: "4 months, 2 weeks ago",
      date: "2022-11-01",
    },
  ],

  chats: [
    {
      id: 1,
      name: "John Smith",
      role: "Student",
      unread: 2,
      messages: [
        { id: 1, sender: "them", text: "Hello professor, I have a question about the assignment", time: "10:30 AM" },
        { id: 2, sender: "them", text: "When is the deadline?", time: "10:31 AM" },
        { id: 3, sender: "me", text: "Hello John, the deadline is next Friday at 11:59 PM", time: "10:45 AM" },
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Student",
      unread: 0,
      messages: [
        { id: 1, sender: "them", text: "Good morning professor", time: "Yesterday" },
        { id: 2, sender: "me", text: "Good morning Sarah, how can I help you?", time: "Yesterday" },
        { id: 3, sender: "them", text: "I wanted to discuss my project proposal", time: "Yesterday" },
      ],
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Student",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "them",
          text: "Professor, will there be a review session before the exam?",
          time: "2 days ago",
        },
        { id: 2, sender: "me", text: "Yes, we will have a review session on Wednesday at 3 PM", time: "2 days ago" },
        { id: 3, sender: "them", text: "Thank you! Will it be recorded?", time: "Yesterday" },
      ],
    },
  ],
}

