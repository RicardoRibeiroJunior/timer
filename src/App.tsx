import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/defaultTheme";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CycleContextProvider } from "./contexts/CycleContext";

export function App() {
  

  return (
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <CycleContextProvider>
            <Router/>
          </CycleContextProvider>
        </BrowserRouter>
        <GlobalStyle/>
      </ThemeProvider>
  )
}

