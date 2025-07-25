import {  useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppTheme from "../../../shared-theme/AppTheme";
import logo from "../../../assets/Logo.png";
import Grid from "@mui/material/Grid2";
// import { useNavigate } from "react-router-dom";
import bgImage from "../../../assets/Group 501.png"
import CustomButton from "../../components/CustomButton";


export default function Signup(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
//   const Navigate = useNavigate();

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
  console.log(validateInputs)

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Grid
        container
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        {/* Left Side */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "flex" } }}
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

        {/* Right Side */}
        <Grid
          size={{ xs: 12, md: 6 }}
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
              Create an account
            </Typography>

            <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
              Already have an account?{" "}
              <Link
                href="/"
                style={{ color: "#F47105", textDecoration: "none" }}
              >
                Log in
              </Link>
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: 8,
                    color: "#fff",
                  },
                }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                autoFocus
                InputProps={{
                  style: {
                    borderRadius: 8,
                    color: "#fff",
                  },
                }}
              />
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                autoFocus
                InputProps={{
                  style: {
                    borderRadius: 8,
                    color: "#fff",
                  },
                }}
              />
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                label="Password"
                type="password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: 8,
                    color: "#fff",
                  },
                }}
              />

              <FormControlLabel
                control={<Checkbox sx={{ color: "#fff" }} />}
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <Link href="#" style={{ color: "#F47105" }}>
                      Terms & Conditions
                    </Link>
                  </Typography>
                }
              />
              <CustomButton>Create Account</CustomButton>

              <Typography
                variant="body2"
                sx={{ textAlign: "center", my: 2, color: "#aaa" }}
              >
                Or register with
              </Typography>

              <Box display="flex" justifyContent="space-between" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: 8, borderColor: "#555" }}
                >
                  Google
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ borderRadius: 8, borderColor: "#555" }}
                >
                  Apple
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
