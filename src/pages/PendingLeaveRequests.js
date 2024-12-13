import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/PendingLeaveRequests.css";

const PendingLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        // Fetch all leave requests
        const leaveRequestsSnapshot = await getDocs(collection(db, "leaveRequests"));
        const leaveRequestsData = leaveRequestsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch all user data
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersData = usersSnapshot.docs.reduce((acc, userDoc) => {
          acc[userDoc.id] = userDoc.data().name || "Unknown";
          return acc;
        }, {});

        // Map user names to leave requests
        const mappedLeaveRequests = leaveRequestsData.map((request) => ({
          ...request,
          userName: usersData[request.userId] || "Unknown User",
        }));

        setLeaveRequests(mappedLeaveRequests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(db, "leaveRequests", id), { status });
      setLeaveRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
      setMessage(`Request marked as ${status}.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating leave request status:", error);
      setMessage("Failed to update request. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="pending-leave-requests-container">
      <h1>Pending Leave Requests</h1>

      {message && <p className="message">{message}</p>}

      <div className="leave-requests-table">
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Date Range</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.userName}</td>
                <td>{`${request.startDate} - ${request.endDate}`}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === "Pending" && (
                    <>
                      <button
                        className="approve-button"
                        onClick={() => handleStatusChange(request.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleStatusChange(request.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingLeaveRequests;
