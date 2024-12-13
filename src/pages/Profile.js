import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { db, auth } from "../firebase";
import "../styles/Profile.css";

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState({});
  const [editField, setEditField] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        } else {
          alert("No profile data found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data. Please try again.");
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [user.uid]);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = async (field) => {
    if (profileData[field]) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          [field]: profileData[field],
        });
        setEditField(null);
      } catch (error) {
        console.error("Error updating profile data:", error);
        alert("Failed to update profile data. Please try again.");
      }
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h1>Employee Profile</h1>

      {/* Personal Information Section */}
      <section className="profile-section">
        <h2>Personal Information</h2>
        <div className="profile-fields">
          {["Full Name", "Date of Birth", "Gender", "Contact Number", "Email"].map((field) => (
            <div key={field} className="profile-field">
              <label>{field}</label>
              {editField === field ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={profileData[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                  <button onClick={() => handleSave(field)} className="save-button">
                    Save
                  </button>
                </div>
              ) : (
                <div className="view-container">
                  <span>{profileData[field] || "Not provided"}</span>
                  <button onClick={() => handleEdit(field)} className="edit-button">
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Employment Details Section */}
      <section className="profile-section">
        <h2>Employment Details</h2>
        <div className="profile-fields">
          {["Employee ID", "Designation", "Department", "Joining Date", "Manager"].map((field) => (
            <div key={field} className="profile-field">
              <label>{field}</label>
              {editField === field ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={profileData[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                  <button onClick={() => handleSave(field)} className="save-button">
                    Save
                  </button>
                </div>
              ) : (
                <div className="view-container">
                  <span>{profileData[field] || "Not provided"}</span>
                  <button onClick={() => handleEdit(field)} className="edit-button">
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="profile-section">
        <h2>Emergency Contact</h2>
        <div className="profile-fields">
          {["Emergency Contact Name", "Emergency Contact Number", "Relationship"].map((field) => (
            <div key={field} className="profile-field">
              <label>{field}</label>
              {editField === field ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={profileData[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                  <button onClick={() => handleSave(field)} className="save-button">
                    Save
                  </button>
                </div>
              ) : (
                <div className="view-container">
                  <span>{profileData[field] || "Not provided"}</span>
                  <button onClick={() => handleEdit(field)} className="edit-button">
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
