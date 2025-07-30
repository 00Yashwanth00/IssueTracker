// pages/UserProfile.js
import { useContext, useState } from "react";
import { AuthContext } from "../context";
import authService from "../services/authService";
import "../styles/components/profile.css";

export default function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: "",
    newPassword: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await authService.updateProfile(formData);
      alert("Profile updated!");
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>My Profile</h1>
      
      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
        />

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={logout}>Logout</button>
    </div>
  );
}