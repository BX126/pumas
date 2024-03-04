import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MethodCard from "../../component/MethodCard";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [more, setMore] = useState(false);

  

  const scrollToContent = () => {
    setMore(true);
    const distanceToBottom =
      document.body.scrollHeight - window.scrollY - window.innerHeight;
    window.scrollBy({ top: distanceToBottom, behavior: "smooth" });
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{ mt: 15, color: "#333", fontWeight: "bold" }}
        >
          NAME
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            flexDirection: "row",
            p: 3,
            mt: 3,
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #ddd",
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{ mt: 2, mb: 2, ml: 5, color: "#555" }}
            >
              Introduction
            </Typography>
            <Box
              sx={{
                ml: 5,
                width: "80%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ddd",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{ mt: 2, mb: 2, ml: 10, color: "#555" }}
            >
              updates
            </Typography>
            <Box
              sx={{
                ml: 10,
                width: "80%",
                height: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ddd",
              }}
            ></Box>

            <Typography
              variant="h5"
              component="h5"
              sx={{ mt: 2, mb: 2, ml: 10, color: "#555" }}
            >
              citation
            </Typography>
            <Box
              sx={{
                ml: 10,
                width: "80%",
                height: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ddd",
              }}
            ></Box>
          </Box>
        </Box>

        {!more && (
          <Box
            sx={{
              position: "fixed",
              bottom: 40,
              textAlign: "center",
              width: "100%",
            }}
          >
            {/* <Typography  variant="h6" sx={{ mb: 1 }}>
            Get Started!
          </Typography> */}
            <IconButton
              onClick={scrollToContent}
              sx={{
                animation: "jump 0.8s infinite",
                "@keyframes jump": {
                  "0%, 100%": {
                    transform: "translateY(0)",
                  },
                  "50%": {
                    transform: "translateY(-10px)",
                  },
                },
                ":hover": {
                  animation: "none",
                },
              }}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Box>
        )}
        {more && (
          <Typography variant="h5" fontWeight="bold" mt={7}>
            🚩 Select one of following options to start!
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: "100vw",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
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
            name="📊 Single-Ancestry Analysis"
            introduction="Run PRS models using summary statistics with a single ancestry."
            onClick={() => navigate("/sa")}
          />
          <MethodCard
            name=" 📊 Multi-Ancestry Analysis"
            introduction="Run PRS using summary statistics with multiple ancestries."
            onClick={() => navigate("/ma")}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#f5f5f5",
            mt: 3,
          }}
        >
          <MethodCard
            name="📃 Tutorial"
            introduction="View the tutorial to learn how to use the platform."
            onClick={() => navigate("/tutorial")}
          />
          <MethodCard
            name="📤 FAQs"
            introduction="View the frequently asked questions."
            onClick={() => navigate("/faq")}
          />
        </Box>
      </Box>
    </div>
  );
};
