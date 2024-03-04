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

export const IntroductionBlock = ({ setStep }) => {
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
          height: "70vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
      </Box>
      <Button
        variant="contained"
        type="submit"
        fullWidth
        onClick={() => setStep(1)}
        sx={{
          color: "white",
          backgroundColor: "grey",
          width: "20%",
          mt: 2,
          "&:hover": { backgroundColor: "darkgreen" },
        }}
      >
        Next
      </Button>
    </Box>
  );
};
