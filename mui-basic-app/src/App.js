import { data } from "./data/mock_data.js";
import React, { useState, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "./components/NavBar.js";
import MultipleCard from "./components/MultipleCard.js";
import ToggleTheme from "./components/ToggleTheme.js";

function App() {
  // Handle PAGINATION
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState(data.slice(0, 5));
  const handlePage = (event) => {
    setPage(event.target.innerText);
    console.log(`Change to page ${event.target.innerText}`);
  };
  useEffect(() => {
    setDisplayData(data.slice((page - 1) * 5, page * 5));
  }, [page]);

  // Handle Theme
  const darkTheme = createTheme({palette: {mode: "dark"},});
  const [theme, setTheme] = useState(darkTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <NavBar />
      <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
        <ToggleTheme setTheme = {setTheme}/>
      </Box> 
      <Box sx={{ m: "20px 100px 0px 100px" }}>
        <MultipleCard meta_data={displayData} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
        <Pagination
          count={Math.floor(data.length / 5)}
          color="primary"
          onClick={handlePage}
        />
      </Box>

    </ThemeProvider>
  );
}

export default App;
