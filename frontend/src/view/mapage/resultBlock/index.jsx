import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import apis from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MethodCard from "../../../component/MethodCard";

export const ResultBlock = ({ setStep }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 5,
        mb: 5,
      }}
    >
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          mt:5,
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          You have successfully submitted the job!
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          The result will appear here once the job is completed.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          You can come back to this page later to check or download the result.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          All avaliable results will be listed in the "Results" page of your account profile menu. 
        </Typography>

        <Typography variant="h6" sx={{ mb: 6 }}>
          You can also check the status of the job in the "Job Submissions" page of your account profile menu.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          While waiting, you may want to:
        </Typography>
      </Box>

      <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#f5f5f5",
          }}
        >
          <MethodCard
            name="🌍 Back to the Home Page"
            introduction="Go back to the home page to start a new job or view toutorial."
            onClick={() => navigate("/")}
          />
          <MethodCard
            name=" 🚧 View Submissions"
            introduction="Check the status of your job submissions."
            onClick={() => navigate("/result")}
          />
        </Box>

    </Box>
  );
};
