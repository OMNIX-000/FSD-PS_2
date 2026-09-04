import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";
import { courses } from "../data/courses.js";

export default function Home() {
  const { student, students, enrolledCourses, addStudent, removeStudent } = useStudent();
  const enrolled = courses.filter((c) => enrolledCourses.includes(c.id));

  const [form, setForm] = useState({ name: "", email: "", college: "", course: "", semester: "" });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.college || !form.course) {
      setMsg("Please fill all required fields.");
      setIsError(true);
      return;
    }
    const added = addStudent(form);
    setMsg(`Student "${added.name}" added successfully!`);
    setIsError(false);
    setForm({ name: "", email: "", college: "", course: "", semester: "" });
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <p style={{ color: "#64748b", marginTop: -6 }}>
        Welcome, <b>{student.name}</b> — manage students and courses in one place.
      </p>
      <p>
        <Link to="/courses" className="btn">Browse Courses</Link>{" "}
        <Link to="/about" className="btn btn-outline">About</Link>
      </p>

      <div className="card">
        <h3>Current Student (via Context API)</h3>
        <ul className="student-list">
          <li><b>Name:</b> {student.name}</li>
          <li><b>ID:</b> {student.id}</li>
          <li><b>Email:</b> {student.email}</li>
          <li><b>College:</b> {student.college}</li>
          <li><b>Program:</b> {student.course} — Sem {student.semester}</li>
          <li><b>Enrolled Courses:</b> {enrolledCourses.length}</li>
        </ul>
      </div>

      <div className="card">
        <h3>Add New Student</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name* <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahul Verma" /></label>
            <label>Email* <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@college.edu" /></label>
          </div>
          <div className="form-row">
            <label>College* <input name="college" value={form.college} onChange={handleChange} placeholder="IIM Bangalore" /></label>
            <label>Program* <input name="course" value={form.course} onChange={handleChange} placeholder="MBA Finance" /></label>
          </div>
          <div className="form-row">
            <label>Semester <input name="semester" type="number" min="1" max="10" value={form.semester} onChange={handleChange} placeholder="2" /></label>
            <button type="submit" className="btn">Add Student</button>
          </div>
        </form>
        {msg && <p className={isError ? "msg msg-error" : "msg"}>{msg}</p>}
      </div>

      <div className="card">
        <h3>All Students ({students.length})</h3>
        {students.length === 0 ? <p style={{ color: "#64748b" }}>No students yet.</p> : (
          <ul className="student-list">
            {students.map((s) => (
              <li key={s.id}>
                <b>{s.name}</b> — {s.course} ({s.college}) · {s.email} · Sem {s.semester} <code>{s.id}</code>{" "}
                <button className="btn btn-danger" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => removeStudent(s.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>My Enrolled Courses</h3>
        {enrolled.length === 0 ? (
          <p style={{ color: "#64748b" }}>No enrolled courses. <Link to="/courses">Explore courses</Link></p>
        ) : (
          <ul className="student-list">
            {enrolled.map((c) => (
              <li key={c.id}>
                <Link to={`/course/${c.id}`}><b>{c.title}</b></Link> — {c.instructor} · {c.duration} <span className="badge">{c.level}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
