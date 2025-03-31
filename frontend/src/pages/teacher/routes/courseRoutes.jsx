import { Routes, Route } from "react-router-dom"
import MyCourses from "../pages/lecturer/courses/MyCourses"
import CourseDetail from "../pages/lecturer/courses/CourseDetail"
import QuizList from "../pages/lecturer/courses/QuizList"
import AddQuiz from "../pages/lecturer/courses/AddQuiz"

export const CourseRoutes = () => {
  return (
    <Routes>
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/course/:courseId" element={<CourseDetail />} />
      <Route path="/course/:courseId/quizzes" element={<QuizList />} />
      <Route path="/course/:courseId/quizzes/add" element={<AddQuiz />} />
    </Routes>
  )
}

