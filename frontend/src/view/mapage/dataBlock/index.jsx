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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import apis from "../../../api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

export const DataBlock = ({ setStep, number }) => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.email);
  const numberRange = Array.from({ length: number }, (_, i) => i + 1);

  const [dataSources, setDataSources] = useState("Upload Data");
  const [version, setVersion] = useState("GRch37");
  const [population, setPopulation] = useState("European (EUR)");

  const [formData, setFormData] = useState({
    chromosome: "",
    snp: "",
    a1: "",
    a2: "",
    z: "",
    beta: "",
    se: "",
  });

  const gridItemStyle = {
    paddingRight: 2, // Adjust spacing as needed
    paddingBottom: 2, // For spacing between rows
    paddingLeft: 2,
    border: "1px solid #ddd",
  };

  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const response = await apis.uploadData(file, userEmail);
        setUploadedFileName(file.name);
      } catch (error) {
        console.log("Error while uploading:", error);
      }
      setUploading(false);
    }
  };

  const [scoreType, setScoreType] = useState("z");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleScoreTypeChange = (e) => {
    setScoreType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/process", { state: { formData } });
    console.log("Form submitted:", formData);
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
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
          borderRadius: "5px",
          overflow: "auto",
          pt: 2,
          pl: 2,
        }}
      >
        {numberRange.map((num) => (
          <Accordion
            key={num}
            sx={{ width: "95%", mb: 3, backgroundColor: "lightgrey" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">
                Trait number {num}:</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#f5f5f5" }}>
              <Box sx={{ width: "100%", overflow: "auto" }}>
                <Grid
                  container
                  spacing={{ xs: 3, md: 6 }}
                  columns={{ xs: 12, sm: 12, md: 12 }}
                >
                  <Grid item xs={4} sx={gridItemStyle}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      GWAS Summary Statistics:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={gridItemStyle}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="version"
                        name="version"
                        value={dataSources}
                        onChange={(e) => setDataSources(e.target.value)}
                      >
                        <FormControlLabel
                          value="Upload Data"
                          control={<Radio />}
                          label="Upload Data"
                        />
                        <FormControlLabel
                          value="Previous Data"
                          control={<Radio />}
                          label="Previous Data"
                        />
                        <FormControlLabel
                          value="Qurey Data"
                          control={<Radio />}
                          label="Qurey Data"
                        />
                      </RadioGroup>
                    </FormControl>
                    {dataSources === "Upload Data" && (
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        sx={{ mt: 2 }}
                      />
                    )}
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
                        m: 2,
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
                              Please choose one of the three options for data
                              input: Upload data, Query, Use Previous data.
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
                      Name of the trait:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={gridItemStyle}>
                    <TextField
                      name="trait"
                      id="trait"
                      onChange={handleChange}
                      sx={{ width: "95%" }}
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
                        ml: 2,
                        pl: 4,
                        pr: 4,
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        backgroundColor: "#add8e6",
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
                              Please enter the name of your trait.
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
                      Population:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={gridItemStyle}>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={population}
                        onChange={(e) => setPopulation(e.target.value)}
                      >
                        <MenuItem value={"European (EUR)"}>
                          European(EUR)
                        </MenuItem>
                        <MenuItem value={"African or African American (AFR)"}>
                          African or African American (AFR)
                        </MenuItem>
                        <MenuItem value={"Admixed American (AMR)"}>
                          Admixed American(AMR)
                        </MenuItem>
                        <MenuItem value={"East Asian (EAS)"}>
                          East Asian(EAS)
                        </MenuItem>
                        <MenuItem value={"South Asian (SAS)"}>
                          South Asian(SAS)
                        </MenuItem>
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
                        ml: 2,
                        pl: 4,
                        pr: 4,
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        backgroundColor: "#add8e6",
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
                              Please select the population of your trait.
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
                      Match Column Names:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={gridItemStyle}>
                    <FormControl component="fieldset">
                      <form
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete="off"
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              label="CHROMOSOME"
                              name="chromosome"
                              value={formData.chromosome}
                              onChange={handleChange}
                              margin="normal"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="SNP"
                              name="snp"
                              value={formData.snp}
                              onChange={handleChange}
                              margin="normal"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="A1"
                              name="a1"
                              value={formData.a1}
                              onChange={handleChange}
                              margin="normal"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="A2"
                              name="a2"
                              value={formData.a2}
                              onChange={handleChange}
                              margin="normal"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="MAF"
                              name="maf"
                              value={formData.maf} // Adjusted to correct variable
                              onChange={handleChange}
                              margin="normal"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="P"
                              name="p"
                              value={formData.p} // Adjusted to correct variable
                              onChange={handleChange}
                              margin="normal"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="N"
                              name="n"
                              value={formData.n} // Adjusted to correct variable
                              onChange={handleChange}
                              margin="normal"
                              fullWidth
                            />
                          </Grid>
                          {/* For RadioGroup, since it's a single component, it's okay to span full width or adjust as needed */}
                          <Grid item xs={12}>
                            <FormControl component="fieldset">
                              <RadioGroup
                                row
                                value={scoreType}
                                onChange={handleScoreTypeChange}
                              >
                                <FormControlLabel
                                  value="z"
                                  control={<Radio />}
                                  label="Z-score"
                                />
                                <FormControlLabel
                                  value="beta-se"
                                  control={<Radio />}
                                  label="Beta and SE"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          {scoreType === "z" ? (
                            <Grid item xs={12}>
                              <TextField
                                label="Z"
                                name="z"
                                value={formData.z}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                              />
                            </Grid>
                          ) : (
                            <>
                              <Grid item xs={6}>
                                <TextField
                                  label="Beta"
                                  name="beta"
                                  value={formData.beta}
                                  onChange={handleChange}
                                  margin="normal"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  label="SE"
                                  name="se"
                                  value={formData.se}
                                  onChange={handleChange}
                                  margin="normal"
                                  fullWidth
                                />
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </form>
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
                              Entering the column names of your input data is
                              optional but recommended. If not provided, we will
                              automatically detect the column names of your
                              input data
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

                  <Grid item xs={4} sx={gridItemStyle}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Human Genome Build Version:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={gridItemStyle}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="version"
                        name="version"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                      >
                        <FormControlLabel
                          value="GRch37"
                          control={<Radio />}
                          label="GRch37"
                        />
                        <FormControlLabel
                          value="GRch38"
                          control={<Radio />}
                          label="GRch38"
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
                        mt: -1,
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
                              Please select the human genome build version of
                              your input data.
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
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
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
      </Box>
    </Box>
  );
};
