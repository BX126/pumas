import * as React from 'react';
import { TopBar} from './view/topbar';
import { WelcomePage } from './view/welcomepage';
import { HomePage } from './view/homepage';
import { ResultPage } from './view/resultpage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataPage } from './view/datapage';
import { SAPage } from './view/sapage';
import { MAPage } from './view/mapage';

const theme = createTheme({
  typography: {
    fontFamily: '"Charter", serif'
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <TopBar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/sa" element={<SAPage />} />
            <Route path="/ma" element={<MAPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
