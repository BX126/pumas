import React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../store/reducers/user";
import { useNavigate, useLocation } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userEmail = useSelector((state) => state.user.email);

  const isActive = (path) => location.pathname === path;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyJobs = () => {
    handleClose();
    navigate("/result");
  };

  const handleUploadNewData = () => {
    handleClose();
    navigate("/home");
  };

  const handleLogOut = () => {
    dispatch(setUserEmail(null));
    handleClose();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      style={{ backgroundColor: "lightgrey" }}
      elevation={0}
    >
      <Toolbar>
        <Typography variant="h6" style={{ marginRight: "16px" }}>
          NAME
        </Typography>
        <Box display="flex" flexGrow={1}></Box>

        <Button
          color="inherit"
          style={{ marginRight: "16px", fontSize: 18, fontWeight: isActive('/home') ? 'bold' : 'normal', textTransform: 'none' }}
          onClick={() => navigate("/home")}
          variant="text"
        >
          Home
        </Button>

        <Button
          color="inherit"
          style={{ marginRight: "16px", fontSize: 18 , textTransform: 'none'}}
          onClick={() => navigate("/tutorial")}
          variant="text"
        >
          Tutorial
        </Button>

        <Button
          color="inherit"
          style={{ marginRight: "16px", fontSize: 18, fontWeight: isActive('/sa') ? 'bold' : 'normal',  textTransform: 'none'}}
          onClick={() => navigate("/sa")}
          variant="text"
          
        >
          Single-Ancestry Analysis
        </Button>

        <Button
          color="inherit"
          style={{ marginRight: "16px", fontSize: 18, textTransform: 'none', fontWeight: isActive('/ma') ? 'bold' : 'normal'}}
          onClick={() => navigate("/ma")}
          variant="text"
          
        >
          Multi-Ancestry Analysis
        </Button>

        {userEmail && (
          <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
            <AccountBoxIcon style={{ fontSize: 35 }} />
          </IconButton>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Typography variant="h6" style={{ padding: "16px" }}>
            {userEmail}
          </Typography>
          <MenuItem onClick={handleMyJobs}>Job Submissions</MenuItem>
          <MenuItem onClick={handleUploadNewData}>Results</MenuItem>
        </Menu>

        {userEmail && (
          <Button color="inherit" onClick={handleLogOut} variant="outlined">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
