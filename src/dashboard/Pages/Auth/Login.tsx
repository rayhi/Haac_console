import { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppTheme from "../../../shared-theme/AppTheme";
import bgImage from "../../../assets/Group 501.png"
// import api from "../../../hooks/api";
import logo from "../../../assets/Logo.png";

import Grid from "@mui/material/Grid2";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
// import { isAuthenticated } from "../../../hooks/auth";

export default function Login(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const authStatus = isAuthenticated();
  //     if (authStatus.valid) {
  //       Navigate("/dashboard"); // Redirect to dashboard if already logged in
  //     }
  //   }, [Navigate]);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Validate inputs before sending the request
  //   if (!validateInputs()) return;
  //   try {
  //     // Post login credentials to the API
  //     const response = await api.post("/user/login", {
  //       email,
  //       password,
  //     });
  //     console.log("Login successful:", response.data);
  //     // Store the token securely
  //     const token = response.data.token;
  //     localStorage.setItem("authToken", token,);
    
  //     Navigate("/dashboard");
  //   } catch (error: any) {
  //     console.error("Error logging in:", error);

  //     // Optional: display a friendly error message to the user
  //     if (error.response && error.response.status === 401) {
  //       alert("Invalid credentials. Please try again.");
  //     } else {
  //       alert("An error occurred. Please try again later.");
  //     }
  //   }
  // };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };
  console.log(validateInputs);

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
        {/* form side */}
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
              Welcome Back
            </Typography>

            <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                style={{ color: "#F47105", textDecoration: "none" }}
              >
                Create one
              </Link>
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              <Typography sx={{ textAlign: "center" }}>
                Forgot your password? 
                <span>
                  <Link
                    href="/forgotpassword"
                    variant="body2"
                    sx={{ alignSelf: "center", color: "#F47105" }}
                  >
                    Reset
                  </Link>
                </span>
              </Typography>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />

              <CustomButton type="submit">Sign in</CustomButton>
            </Box>
            {/* </Card> */}
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
