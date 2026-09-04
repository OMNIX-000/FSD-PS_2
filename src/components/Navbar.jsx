import { NavLink } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";

export default function Navbar() {
  return (
    <nav>
      <span className="nav-brand">🎓 Student Course Management</span>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""}>Courses</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
      </div>
      <StudentCount />
    </nav>
  );
}

function StudentCount() {
  const { students, enrolledCourses } = useStudent();
  return <span className="nav-meta">Students: {students.length} · Enrolled: {enrolledCourses.length}</span>;
}
