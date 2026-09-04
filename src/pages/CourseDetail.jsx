import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses.js";
import { useStudent } from "../context/StudentContext.jsx";

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const { student, isEnrolled, enroll, unenroll } = useStudent();

  if (!course) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: "center" }}>
          <h2>Course not found</h2>
          <p>No course with id <code>{id}</code> exists.</p>
          <Link to="/courses" className="btn">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  return (
    <div className="container">
      <Link to="/courses">← Back to Courses</Link>

      <div className="card" style={{ marginTop: 12 }}>
        <span className="badge">{course.level} · {course.duration}</span>
        <h1 style={{ margin: "8px 0 6px", fontSize: 22 }}>{course.title}</h1>
        <p style={{ color: "#475569" }}>{course.description}</p>
        <p style={{ fontSize: 13 }}>Instructor: <b>{course.instructor}</b></p>
        <p style={{ fontSize: 13, color: "#64748b" }}>Logged in as: {student.name} ({student.email})</p>
        <p>
          {enrolled ? (
            <button className="btn btn-danger" onClick={() => unenroll(course.id)}>Unenroll</button>
          ) : (
            <button className="btn" onClick={() => enroll(course.id)}>Enroll Now</button>
          )}
          {enrolled && <span className="badge badge-green" style={{ marginLeft: 8 }}>You are enrolled</span>}
        </p>
        <p style={{ fontSize: 12, color: "#94a3b8" }}>Dynamic route: <code>/course/{course.id}</code></p>
      </div>

      <div className="card">
        <h3>Syllabus</h3>
        <ol style={{ color: "#334155", lineHeight: 2, fontSize: 13 }}>
          {course.syllabus.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </div>

      <div className="card">
        <h4 style={{ marginTop: 0 }}>Other courses</h4>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {courses.filter((c) => c.id !== course.id).map((c) => (
            <Link key={c.id} to={`/course/${c.id}`} className="btn btn-outline">{c.title}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
