import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularProgressBar: React.FC = () => {
  return (
    <Box sx={{ display: "flex", margin: "auto" }}>
      <CircularProgress color="inherit"/>
    </Box>
  );
}

export default CircularProgressBar;
