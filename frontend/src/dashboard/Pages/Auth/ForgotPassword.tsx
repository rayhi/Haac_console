import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/Logo.png";
import Grid from "@mui/material/Grid2";
import AppTheme from "../../../shared-theme/AppTheme";
import api from "../../../hooks/api";
import bgImage from "../../../assets/Group 501.png";
import CustomButton from "../../components/CustomButton";

export default function ForgotPassword(props: {
  disableCustomTheme?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (event: any) => {
    event.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    try {
      const response = await api.post("/user/forgot_password", { email });
      if (response.data.status === "success") {
        setMessage("Reset link sent to your email.");
        console.log(response.data);
        // Navigate to another page if needed
        navigate("/reset");
      } else {
        setMessage("Error sending reset link. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  // const validateInputs = () => {
  //   if (!email || !/\S+@\S+\.\S+/.test(email)) {
  //     setEmailError(true);
  //     setEmailErrorMessage("Please enter a valid email address.");
  //     return false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage("");
  //     return true;
  //   }
  // };

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
              Trouble Logging in?{" "}
            </Typography>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mb: 3, color: "#F47105" }}
            >
              Enter your email and we will send you a link to get back to your
              account{" "}
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  // color={emailError ? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                />
              </FormControl>

              <CustomButton
                type="submit"
                fullWidth
                onClick={handleForgotPassword}
              >
                Reset Password
              </CustomButton>

              <Typography sx={{ textAlign: "center" }}>
                Remember your password?
                <span>
                  <Link
                    href="/"
                    variant="body2"
                    sx={{ alignSelf: "center", color: "#F47105" }}
                  >
                    Login
                  </Link>
                </span>
              </Typography>
              {message && (
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  {message}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
