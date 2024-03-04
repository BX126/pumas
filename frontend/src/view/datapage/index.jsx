import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import apis from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DataPage = () => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.email);
  const [formData, setFormData] = useState({
    chromosome: "",
    snp: "",
    a1: "",
    a2: "",
    z: "",
    beta: "",
    se: "",
  });
  const [version, setVersion] = useState("GRch37");
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
        height: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Build Input Data
      </Typography>

      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "45%",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Upload Data
          </Typography>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <Button
              variant="contained"
              color="grey"
              component="label"
              disabled={uploading}
              endIcon={uploading ? <CircularProgress size={20} /> : null}
            >
              {uploadedFileName ? "Re-upload" : "Choose File"}
              <input type="file" hidden onChange={handleFileChange} />
              {uploadedFileName && (
                <Typography color="textSecondary">
                  Uploaded File: {uploadedFileName}
                </Typography>
              )}
            </Button>
          </Box>

          <Typography variant="body1" fontWeight="bold" mt={5}>
            Name of your trait
          </Typography>

          <TextField label="Trait Name" margin="normal" />

          <Typography variant="body1" fontWeight="bold" mt={5}>
            Human Genome Build Version
          </Typography>

          <RadioGroup
            row
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            <FormControlLabel
              value="GRCh37"
              control={<Radio />}
              label="GRCh37"
            />
            <FormControlLabel
              value="GRCh38"
              control={<Radio />}
              label="GRCh38"
            />
          </RadioGroup>
          <Box sx={{mt: 5}}>
            <Button variant="contained" color="grey" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "45%",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" fontWeight="bold" mt={2}>
            Summary statistics file column names
          </Typography>

          <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
        </Box>
      </Box>
    </Box>
  );
};
