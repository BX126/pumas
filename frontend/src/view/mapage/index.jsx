import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IntroductionBlock } from "./introductionBlock";
import { NumberBlock } from "./numberBlock";
import { DataBlock } from "./dataBlock";
import { MethodBlock } from "./methodBlock";
import { ConfigureBlock } from "./configureBlock";
import { ResultBlock } from "./resultBlock";

export const MAPage = () => {
  // Assuming 'step' tracks the current step and corresponds to the selected list item
  const [step, setStep] = useState(0);
  const [number, setNumber] = useState(2);

  const handleChangeStep = (newStep) => {
    setStep(newStep);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }
  , [])

  // List of steps for display
  const steps = [
    "Introduction",
    "Number of Traits",
    "Build Input Data",
    "Select Methods",
    "Configure Job",
    "View Results",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        mt: 8,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "20%",
          minHeight: "100vh",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, mt: 5 }}>
          Multi-Ancestry Analysis
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Workflow Steps
        </Typography>

        <List>
          {steps.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={step === index} // Highlight based on selection
                onClick={() => handleChangeStep(index)} // Update selected item on click
                sx={{
                  backgroundColor:
                    step === index ? "rgba(0, 0, 0, 0.04)" : "transparent", // Conditional styling
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)", // Hover effect
                  },
                }}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <Typography variant="h6" sx={{ mr: 2 }}></Typography>
                  ) : (
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      Step {index}.
                    </Typography>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Content area */}
      <Box sx={{ width: "80%", backgroundColor: "#f5f5f5" }}>
        {step === 0 && <IntroductionBlock setStep={setStep} />}
        {step === 1 && <NumberBlock setStep={setStep} setNumber={setNumber} />}
        {step === 2 && <DataBlock setStep={setStep} number={number} />}
        {step === 3 && <MethodBlock setStep={setStep} />}
        {step === 4 && <ConfigureBlock setStep={setStep} />}
        {step === 5 && <ResultBlock setStep={setStep} />}
      </Box>
    </Box>
  );
};
