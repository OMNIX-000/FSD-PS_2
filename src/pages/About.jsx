import { useStudent } from "../context/StudentContext.jsx";

export default function About() {
  const { student } = useStudent();
  return (
    <div className="container">
      <h1>About</h1>
      <p style={{ color: "#475569" }}>
        Student Course Management Application built with React functional components and JSX,
        React Router DOM for navigation, and Context API for shared state.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Features</h3>
          <ul style={{ fontSize: 13, lineHeight: 1.8 }}>
            <li>Home, Courses, About pages with React Router</li>
            <li>Dynamic course routes — each at <code>/course/:id</code></li>
            <li>Context API for student profile & enrollments</li>
            <li>Student Add System on Home (adds to Context)</li>
            <li>Enroll / Unenroll updates instantly</li>
            <li>Functional components & JSX throughout</li>
          </ul>
        </div>
        <div className="card">
          <h3>Tech Stack</h3>
          <ul style={{ fontSize: 13, lineHeight: 1.8 }}>
            <li>React 18 + Vite</li>
            <li>react-router-dom — BrowserRouter, Routes, Route, NavLink, useParams</li>
            <li>Context API — createContext, useContext, Provider</li>
          </ul>
        </div>
        <div className="card">
          <h3>Current Student (Context)</h3>
          <ul className="student-list">
            <li><b>{student.name}</b> — {student.course}</li>
            <li>{student.college} — Sem {student.semester}</li>
            <li>{student.email}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
