import  {React, useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeProvider, createTheme } from "@mui/material/styles";
export default function ToggleTheme({setTheme}) {
    const [view, setView] = useState('dark');
    const lightTheme = createTheme({
      palette: {
        mode: "light",
      },
    });
    const darkTheme = createTheme({
      palette: {
        mode: "dark",
      },
    });
    const handleTheme = (event) => {
      if (event.currentTarget.value === "light") {
        setTheme(lightTheme);
        setView("light");
      } else {
        setTheme(darkTheme);
        setView("dark");
      }
    };
   
    return (
      <ToggleButtonGroup
        value = {view}
        color="primary"
        exclusive
        onChange={handleTheme}
        aria-label="platform"
      >
        <ToggleButton value="dark">Dark Mode</ToggleButton>
        <ToggleButton value="light">Light Mode</ToggleButton>
      </ToggleButtonGroup>
    );
   }
   