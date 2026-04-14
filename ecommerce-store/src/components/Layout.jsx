import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import Header from './Header';
const theme = createTheme({
  palette: {
    mode: "light",
    primary:{
      main:"#0679ed"
    },
    secondary:{
      main:"#fff"
    },
    text:{
      primary:"#1a1a1a",
      secondary:"#9f8f8f"
    }
  },
});

export default function Layout() {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    <main>
      <Outlet />
    </main>
    <footer>

    </footer>
  </ThemeProvider>;
}
