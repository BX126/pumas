import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AlertWindow from "../../component/AlertWindow";
import PromptWindow from "../../component/PromptWindow";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail } from '../../store/reducers/user';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.user.email);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const handleAuth = () => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in:", user);
          dispatch(setUserEmail(email));
        })
        .catch((error) => {
          console.error("Error:", error.message);
          if (
            error.code === "auth/invalid-email" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/invalid-login-credentials"
          ) {
            setAlertMessage("Invalid login credentials. Please try again.");
            setAlertTitle("⚠️ Error");
            setAlertOpen(true);
          }
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user);
          dispatch(setUserEmail(email));
        })
        .catch((error) => {
          console.error("Error:", error.message);
          if (error.code === "auth/email-already-in-use") {
            setAlertTitle("⚠️ Error");
            setAlertMessage(
              "The email address is already in use by another account."
            );
            setAlertOpen(true);
          } else if (error.code === "auth/weak-password") {
            setAlertTitle("⚠️ Error");
            setAlertMessage("Password should be at least 6 characters.");
            setAlertOpen(true);
          }
        });
    }
  };

  const handlePasswordReset = (resetEmail) => {
    if (!resetEmail) {
      setAlertMessage("Please enter your email address.");
      setAlertTitle("⚠️ Error");
      setAlertOpen(true);
      return;
    }
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setAlertMessage(
          "Password reset email sent if you have an account. Check your email to reset your password. "
        );
        setAlertTitle("✅ Sent email");
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        if (error.code === "auth/invalid-email") {
          setAlertMessage("Invalid email address.");
          setAlertTitle("⚠️ Error");
          setAlertOpen(true);
          return;
        }
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User logged in with Google:", user);
        dispatch(setUserEmail(user.email));
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setAlertTitle("⚠️ Error");
        setAlertMessage(error.message);
        setAlertOpen(true);
      });
  };

  useEffect(() => {
    if (userEmail) {
      navigate("/home");
    }
  }
  , [navigate, userEmail]);


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        mt: 10,
      }}
    >
      <Typography variant="h3" component="h2" sx={{ mt: 4, color: '#333', fontWeight: 'bold' }}>
      NAME
      </Typography>

      <Typography variant="h5" component="h5" sx={{ mt: 2, mb: 2, color: '#555' }}>
        👋 Welcome! Please Login or Sign Up to start.
      </Typography>

      <Box
        sx={{
          mt: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px', // Limit width for better readability on larger screens
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Soft shadow for depth
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', color: '#444' }}>
          {isLogin ? "Login" : "Signup"}
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          sx={{ "& .MuiInputBase-root": { borderRadius: '4px' } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ "& .MuiInputBase-root": { borderRadius: '4px' } }}
        />
        <Button
          variant="contained"
          onClick={handleAuth}
          sx={{
            mt: 2,
            mb: 1,
            width: '100%',
            height: '48px',
            backgroundColor: '#1976d2', // Use theme's primary color
            ':hover': {
              backgroundColor: '#115293',
            },
            borderRadius: '4px',
          }}
        >
          {isLogin ? "Login" : "Signup"}
        </Button>
        <Button
          color="secondary"
          sx={{ mt: 1, textTransform: 'none' }}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "New User? Sign up here!" : "Already have an account? Login here!"}
        </Button>
        {isLogin && (
          <Button
            color="secondary"
            sx={{ mt: 1, textTransform: 'none' }}
            onClick={() => {
              setPromptOpen(true);
            }}
          >
            Forgot Password?
          </Button>
        )}
        <Typography variant="h6" sx={{ mt: 3, color: '#666' }}>
        --------------- Or ---------------
      </Typography>
      <Button
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          mt: 2,
          width: 'auto',
          height: '48px',
          padding: '0 30px',
          textTransform: 'none',
          backgroundColor: '#fff',
          color: '#757575',
          ':hover': {
            backgroundColor: '#f5f5f5',
          },
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      >
        Login with Google
      </Button>
      </Box>
    </Box>
  );
};
