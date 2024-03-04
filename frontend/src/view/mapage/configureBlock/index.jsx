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
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

export const ConfigureBlock = ({ setStep }) => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.email);

  const [emailop, setEmailOp] = useState("Yes");

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
              Job Name:
            </Typography>
          </Grid>
          <Grid item xs={4} sx={gridItemStyle}>
            <TextField
              variant="outlined"
              label="Job Name"
              fullWidth
              sx={{ mb: 2 }}
            />
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
                       Please provide a name for your job.
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
              Email Notification:
            </Typography>
          </Grid>

          <Grid item xs={4} sx={gridItemStyle}>
          <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="version"
                  name="version"
                  value={emailop}
                  onChange={(e) => setEmailOp(e.target.value)}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
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
                        Please select whether you want to receive email notification for your job status.
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
              onClick={() => setStep(5)}
              sx={{
                color: "white",
                backgroundColor: "grey",
                mb: 2,
                mt: -1,
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Submit the job
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
