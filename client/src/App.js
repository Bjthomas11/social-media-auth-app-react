import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Home from "pages/home/Home";
import Login from "pages/login/Login";
import Profile from "pages/profile/Profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

const App = () => {
  const mode = useSelector((state) => state.mode); // get mode from redux store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // create theme based on mode

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
