import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import AppTheme from "../../../shared-theme/AppTheme";
import api from "../../../hooks/api";
import logo from "../../../assets/Logo.png";
import bgImage from "../../../assets/Group 501.png";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import CustomButton from "../../components/CustomButton";

export default function ResetPassword(props: { disableCustomTheme?: boolean }) {
  // const [passwordError, setPasswordError] = useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [new_password, setNew_password] = useState("");
  const [repeat_new_password, setRepeat_new_password] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get(`/user/forgot_password/verify/${token}`);
        if (response?.status === 200) {
          setVerified(true);
          setMessage("");
        } else {
          setVerified(false);
          setMessage(
            "Invalid or expired token. Please request a new reset link."
          );
        }
      } catch (error) {
        setVerified(false);
        setMessage(
          "Token verification error. Please request a new reset link."
        );
      }
    };

    if (token) {
      verifyToken();
    } else {
      setMessage("Invalid or missing token. Please request a new reset link.");
    }
  }, [token]);

  const handleResetPassword = async (event: any) => {
    event.preventDefault();

    if (new_password !== repeat_new_password) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/user/reset_password", {
        token,
        new_password,
        repeat_new_password,
      });
      console.log(response);
      setMessage("Password reset successful. You can now log in.");
      navigate("/");
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Grid container sx={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Grid
          size={{ md: 6, xs: 12 }}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: "16px",
              color: "#fff",
              p: 4,
            }}
          >
            {/*           
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
              HAAC is committed to delivering exceptional value
              <br /> and fostering long-term security for both individual
              <br /> and corporate clients throughout Africa.
            </Typography> */}
          </Box>
        </Grid>
        <Grid
          size={{ md: 6, xs: 12 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 480,

              borderRadius: 4,
              p: 5,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              //   color: "#fff",
            }}
          >
            <Box display="flex" justifyContent="center" mb={3}>
              <img src={logo} alt="Logo" width="140" />
            </Box>

            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: 600, mb: 1 }}
            >
              Reset Password
            </Typography>

            {verified ? (
              <Box
                component="form"
                onSubmit={handleResetPassword}
                noValidate
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <FormControl fullWidth>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    id="password"
                    type="password"
                    name="new_password"
                    value={new_password}
                    onChange={(e) => setNew_password(e.target.value)}
                    placeholder="••••••"
                    required
                    fullWidth
                    variant="outlined"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="Confirmpassword">
                    Confirm Password
                  </FormLabel>
                  <TextField
                    id="Confirmpassword"
                    type="password"
                    name="Confirmpassword"
                    value={repeat_new_password}
                    onChange={(e) => setRepeat_new_password(e.target.value)}
                    placeholder="••••••"
                    required
                    fullWidth
                    variant="outlined"
                  />
                </FormControl>

                <CustomButton>Reset Password</CustomButton>
              </Box>
            ) : (
              <Typography textAlign="center" color="error" mt={3}>
                {message}{" "}
                <Link href="/forgotpassword" style={{ color: "#F47105" }}>
                  Go to Forgot Password
                </Link>
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
