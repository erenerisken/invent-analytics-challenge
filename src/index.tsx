import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <CacheProvider value={muiCache}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={createTheme()}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </CacheProvider>,
);
