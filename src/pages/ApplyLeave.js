import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import "../styles/ApplyLeave.css";

const ApplyLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "leaveRequests"));
        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeaveRequests(requests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleSubmit = async () => {
    if (!startDate || !endDate || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "leaveRequests"), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "Unknown User",
        startDate,
        endDate,
        reason,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("Leave request submitted successfully.");
      setShowPopup(false);
      setStartDate("");
      setEndDate("");
      setReason("");
      navigate("/employee-dashboard");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request. Please try again.");
    }
  };

  return (
    <div className="apply-leave-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>Leave Requests</h1>

      {/* Leave Requests Table */}
      <div className="leave-requests-table">
        <table>
          <thead>
            <tr>
              <th>Date Range</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Requested On</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{`${request.startDate} - ${request.endDate}`}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
                <td>
                  {request.createdAt?.toDate
                    ? request.createdAt.toDate().toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Request Leave Button */}
      <button className="request-leave-button" onClick={() => setShowPopup(true)}>
        Request Leave
      </button>

      {/* Popup for Leave Request */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Request Leave</h2>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label>
              Reason:
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for your leave"
              />
            </label>
            <div className="popup-buttons">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLeave;
