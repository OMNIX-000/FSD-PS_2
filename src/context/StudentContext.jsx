import { createContext, useContext, useState } from "react";

export const StudentContext = createContext(null);

export const useStudent = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used within StudentProvider");
  return ctx;
};

export function StudentProvider({ children }) {
  // Shared student information — now supports multiple students
  const [students, setStudents] = useState([
    {
      id: "STU2025001",
      name: "Aarav Sharma",
      email: "aarav.sharma@college.edu",
      college: "IIT Delhi",
      course: "B.Tech Computer Science",
      semester: 5,
    },
    {
      id: "STU2025002",
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      college: "Mumbai University",
      course: "B.Sc Biotechnology",
      semester: 3,
    },
  ]);

  // For demo purposes the first student is considered the "current" logged-in student
  const [student, setStudent] = useState(students[0]);

  const [enrolledCourses, setEnrolledCourses] = useState(["cs101"]);

  const addStudent = (data) => {
    const newStudent = {
      id: "STU" + Date.now().toString().slice(-6),
      name: data.name.trim(),
      email: data.email.trim(),
      college: data.college.trim(),
      course: data.course.trim(),
      semester: Number(data.semester) || 1,
    };
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStudent = (patch) => setStudent((prev) => ({ ...prev, ...patch }));

  const enroll = (courseId) => {
    setEnrolledCourses((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
  };

  const unenroll = (courseId) => {
    setEnrolledCourses((prev) => prev.filter((id) => id !== courseId));
  };

  const value = {
    student,
    students,
    addStudent,
    removeStudent,
    updateStudent,
    enrolledCourses,
    enroll,
    unenroll,
    isEnrolled: (id) => enrolledCourses.includes(id),
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}
