import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@emotion/react';

import { PaletteMode, createTheme } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProviderProps } from './theme-context-provider.types';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeContextProvider = ({
  children,
  themeOptions,
}: ThemeContextProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
