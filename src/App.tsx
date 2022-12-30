import { useState } from 'react';
import './App.css';
import { Flow } from 'types/flow';
import { ChooseFlow } from 'components/ChooseFlow';
import { MainScene } from 'flows/MainScene';
import { simpleMachine } from 'machines/SimpleMachine';
import { photosMachine } from 'machines/PhotosMachine';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [mode, setMode] = useState<Flow | null>(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        {mode === null && <ChooseFlow onSelect={setMode} />}
        {mode === 'simple' && <MainScene machine={simpleMachine} />}
        {mode === 'photos' && <MainScene machine={photosMachine} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
