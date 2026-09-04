import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import About from "./pages/About.jsx";

function NotFound() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h2>404 — Page Not Found</h2>
        <a href="/" className="btn">Go Home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer>Student Course Management Application — React Router + Context API — Functional Components & JSX</footer>
      </BrowserRouter>
    </StudentProvider>
  );
}
