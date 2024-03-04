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
  Slider,
} from "@mui/material";
import apis from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NumberBlock = ({ setStep, setNumber }) => {
  const [value, setValue] = useState(2);
  const marks = [
    {
      value: 2,
      label: "2",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          How many ancestry group would you like to analyze?
        </Typography>
        <Box sx={{ width: 500 }}>
          <Slider
            aria-labelledby="input-slider"
            value={value}
            onChange={handleChange}
            min={2}
            max={10}
            marks={marks}
            valueLabelDisplay="auto"
            sx={{
              "& .MuiSlider-thumb": {
                color: "grey", // Thumb color
              },
              "& .MuiSlider-track": {
                color: "grey", // Track color
              },
              "& .MuiSlider-rail": {
                color: "#e0e0e0", // Rail color
              },
              "& .MuiSlider-valueLabel": {
                color: "black", // Value label text color
                backgroundColor: "grey", // Value label background color
              },
            }}
          />
        </Box>
        <Typography variant="h5" sx={{ mt: 4, mb:1}}>
          {value} traits will be analyzed.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          **NOTE**: If you wish to analyze one trait, please use the Single-Ancestry Analysis.
        </Typography>
      </Box>
      <Button
        variant="contained"
        type="submit"
        fullWidth
        onClick={() => {setNumber(value); setStep(2)}}
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
