import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import api from "../../../hooks/api";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: (newUser: any) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onUserAdded,
}) => {
  const [firstname, setFirstname] = useState("");
  const [othernames, setOthernames] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const verifyUserToken = async (token: string) => {
    try {
      const response = await api.get(`/user/signup/verify/${token}`);

      if (response.status === 200) {
        console.log("Verification successful:", response.data);
        return response.data;
      } else {
        console.error("Verification failed:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  };


const handleAddUser = async () => {
  setLoading(true);

  // Retrieve the auth token from local storage
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found. Please log in.");
    setLoading(false);
    return;
  }
  const newUserData = { firstname, othernames, email, role, password };
  try {
    const response = await api.post("/user/create", newUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      id,
      firstname,
      othernames,
      role,
      email,
      token: userToken,
    } = response.data.result.record;
    // Verify the user token
    const verificationResult = await verifyUserToken(userToken);
    if (verificationResult && verificationResult.status === "success") {
      console.log("User verification successful.");
      //add New row
      onUserAdded({
        id,
        name: `${firstname} ${othernames}`,
        role,
        email,
      });
      onClose();
    } else {
      console.error("User verification failed.");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Other Names"
          fullWidth
          margin="normal"
          value={othernames}
          onChange={(e) => setOthernames(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mt: 2 }} // Add margin for consistent spacing
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleAddUser}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
