import { Link } from "react-router-dom";
import { courses } from "../data/courses.js";
import { useStudent } from "../context/StudentContext.jsx";

export default function Courses() {
  const { isEnrolled } = useStudent();

  return (
    <div className="container">
      <h1>Courses</h1>
      <p style={{ color: "#64748b" }}>Click any course to open its dynamic detail page at <code>/course/:id</code></p>
      <div className="grid">
        {courses.map((c) => (
          <div key={c.id} className="card">
            <span className="badge">{c.level}</span>
            {isEnrolled(c.id) && <span className="badge badge-green" style={{ marginLeft: 6 }}>Enrolled</span>}
            <h3 style={{ margin: "8px 0 6px" }}>{c.title}</h3>
            <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>{c.description}</p>
            <p style={{ fontSize: 12, color: "#64748b" }}>{c.instructor} · {c.duration}</p>
            <Link to={`/course/${c.id}`} className="btn">View Details</Link>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 8 }}><code>/course/{c.id}</code></div>
          </div>
        ))}
      </div>
    </div>
  );
}
