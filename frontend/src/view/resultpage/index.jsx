import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

export const ResultPage = () => {
  const [jobs, setJobs] = useState([
    { id: "Loading", name: "Loading", status: "Loading" },
  ]);

  const determinStatus = (job) => {
    if (job.status === "completed") {
      const downloadLink = `http://127.0.0.1:5000/api/download/${job.id}`;
      return (
        <div>
          {job.status} <a href={downloadLink} download>Download Result</a>
        </div>
      );
    }
    return job.status;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("http://127.0.0.1:5000/api/get_jobs")
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box mt={15}>
      <Container>
        <Typography variant="h4" align="center" mb={5} gutterBottom>
          Job Submissions
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{determinStatus(job)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};
