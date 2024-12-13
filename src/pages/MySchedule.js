import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/MySchedule.css";

const MySchedule = ({ user }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const q = query(
          collection(db, "schedules"),
          where("employeeId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const scheduleList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchedules(scheduleList);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [user.uid]);

  if (loading) {
    return <p>Loading your schedule...</p>;
  }

  return (
    <div className="my-schedule-container">
      <h1>My Schedule</h1>

      {schedules.length === 0 ? (
        <p>No schedule assigned yet.</p>
      ) : (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.date}</td>
                <td>{schedule.task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MySchedule;
