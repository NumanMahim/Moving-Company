import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "../styles/Scheduling.css";

const Scheduling = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [schedule, setSchedule] = useState({ date: "", task: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const employeeList = querySnapshot.docs
          .filter((doc) => doc.data().role === "Employee")
          .map((doc) => ({
            id: doc.id,
            name: doc.data().name || "Unknown",
            email: doc.data().email || "N/A",
          }));
        setEmployees(employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !schedule.date || !schedule.task) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "schedules"), {
        employeeId: selectedEmployee,
        date: schedule.date,
        task: schedule.task,
        createdAt: new Date(),
      });

      setMessage("Schedule added successfully!");
      setTimeout(() => setMessage(""), 3000);
      setSchedule({ date: "", task: "" });
      setSelectedEmployee("");
    } catch (error) {
      console.error("Error adding schedule:", error);
      setMessage("Failed to add schedule. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="scheduling-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>Schedule Employee Tasks</h1>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleScheduleSubmit} className="schedule-form">
        <div className="form-group">
          <label htmlFor="employee">Select Employee</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Schedule Date</label>
          <input
            type="date"
            id="date"
            value={schedule.date}
            onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task">Task</label>
          <textarea
            id="task"
            value={schedule.task}
            onChange={(e) => setSchedule({ ...schedule, task: e.target.value })}
            placeholder="Enter the task details"
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit Schedule</button>
      </form>
    </div>
  );
};

export default Scheduling;
