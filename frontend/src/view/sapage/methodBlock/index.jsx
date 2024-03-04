import React, { useState, useEffect} from "react";
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
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

export const MethodBlock = ({ setStep }) => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.email);

  const [version, setVersion] = useState("GRch37");
  const [selectedModels, setSelectedModels] = useState(["Lassosum2"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }
  , [])

  const gridItemStyle = {
    paddingBottom: 2, // For spacing between rows
    paddingLeft: 2,
    paddingRight: 2,
    border: "1px solid #ddd",
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          borderRadius: "5px",
          pt: 2,
          pl: 2,
          overflow: "auto",
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          <Grid item xs={4} sx={gridItemStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Method:
            </Typography>
          </Grid>
          <Grid item xs={4} sx={gridItemStyle}>
            <FormControl variant="outlined" fullWidth>
              <Select
                multiple
                value={selectedModels}
                onChange={(e) => setSelectedModels(e.target.value)}
                renderValue={(selected) => selected.join(", ")}
              >
                <MenuItem value={"Lassosum2"}>Lassosum2</MenuItem>
                <MenuItem value={"LDpred2"}>LDpred2</MenuItem>
                <MenuItem value={"PRS-CS"}>PRS-CS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sx={gridItemStyle}>
          <Box
                sx={{
                  width: " 60%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  ml:2,
                  pl: 4,
                  pr: 4,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  backgroundColor: "#add8e6",
                  overflow: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <Tooltip
                    title={
                      <Typography color="inherit">
                       You can select one or multiple methods to run the analysis.
                      </Typography>
                    }
                    placement="top"
                    arrow
                    sx={{
                      tooltip: {
                        backgroundColor: "#333", 
                        color: "white", 
                        fontSize: "0.875rem",
                        borderRadius: "4px", 
                      },
                      arrow: {
                        color: "#333", 
                      },
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#333", // Tooltip background color
                          color: "white", // Tooltip text color
                          fontSize: "0.875rem", // Tooltip font size
                          borderRadius: "4px", // Tooltip border radius
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#333", // Arrow color
                        },
                      },
                    }}
                  >
                    <InfoIcon />
                  </Tooltip>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{ fontWeight: "bold" }}
                  >
                    Mandatory
                  </Typography>
                </Box>
              </Box>
          </Grid>

          <Grid item xs={4} sx={gridItemStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tuning Parameters:
            </Typography>
          </Grid>

          <Grid item xs={4} sx={gridItemStyle}>
            <Box
              sx={{ width: "80%", display: "flex", flexDirection: "column" }}
            >
              {selectedModels.includes("Lassosum2") && (
                <Typography variant="h6" sx={{ mb: 2, mt: -2 }}>
                  Lassosum2 Parameters
                </Typography>
              )}

              {selectedModels.includes("Lassosum2") && (
                <TextField
                  variant="outlined"
                  label="Lambda"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}

              {selectedModels.includes("LDpred2") && (
                <Typography variant="h6" sx={{ mb: 2 }}>
                  LDpred2 Parameters
                </Typography>
              )}

              {selectedModels.includes("LDpred2") && (
                <TextField
                  variant="outlined"
                  label="alpha"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              {selectedModels.includes("LDpred2") && (
                <TextField
                  variant="outlined"
                  label="P-seq"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              {selectedModels.includes("LDpred2") && (
                <TextField
                  variant="outlined"
                  label="Sparse"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={4} sx={gridItemStyle}>
          <Box
                sx={{
                  width: " 60%",
                  height: "85%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: 2,
                  mt:-1,
                  pl: 4,
                  pr: 4,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  backgroundColor: "#9FE2BF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <Tooltip
                    title={
                      <Typography color="inherit">
                       If you want to use the default parameters, you can skip this step.
                       </Typography>
                    }
                    placement="top"
                    arrow
                    sx={{
                      tooltip: {
                        backgroundColor: "#333", 
                        color: "white", 
                        fontSize: "0.875rem",
                        borderRadius: "4px", 
                      },
                      arrow: {
                        color: "#333", 
                      },
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#333", // Tooltip background color
                          color: "white", // Tooltip text color
                          fontSize: "0.875rem", // Tooltip font size
                          borderRadius: "4px", // Tooltip border radius
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#333", // Arrow color
                        },
                      },
                    }}
                  >
                    <InfoIcon />
                  </Tooltip>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{ fontWeight: "bold" }}
                  >
                    Optional
                  </Typography>
                </Box>
              </Box>
          </Grid>

          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              onClick={() => setStep(3)}
              sx={{
                color: "white",
                backgroundColor: "grey",
                mb: 2,
                mt: -1,
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Save and Continue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
