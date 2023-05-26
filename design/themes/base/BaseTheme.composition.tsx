import React from 'react';
import { Typography as MuiTypography, Paper } from '@mui/material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { Box, styled } from '@mui/material';
import { baseThemeOptions } from './BaseTheme';

const PaperItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const Typography = () => (
  <CompositionViewer themeOptions={baseThemeOptions}>
    <MuiTypography variant="h1">H1 Heading</MuiTypography>
    <MuiTypography variant="h2">H2 Heading</MuiTypography>
    <MuiTypography variant="h3">H3 Heading</MuiTypography>
    <MuiTypography variant="h4">H4 Heading</MuiTypography>
    <MuiTypography variant="h5">H5 Heading</MuiTypography>
    <MuiTypography variant="h6">H6 Heading</MuiTypography>
    <MuiTypography variant="subtitle1">Subtitle 1</MuiTypography>
    <MuiTypography variant="subtitle2">Subtitle 2</MuiTypography>
    <MuiTypography variant="overline">Overline</MuiTypography>
    <MuiTypography variant="body1">Body 1</MuiTypography>
    <MuiTypography variant="body2">Body 2</MuiTypography>
    <MuiTypography variant="caption">Caption</MuiTypography>
  </CompositionViewer>
);

export const Palette = () => (
  <PaletteThemeViewer themeOptions={baseThemeOptions} />
);

export const Elevations = () => (
  <CompositionViewer themeOptions={baseThemeOptions}>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.default',
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
      }}
    >
      {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
        <PaperItem key={elevation} elevation={elevation}>
          {`elevation=${elevation}`}
        </PaperItem>
      ))}
    </Box>
  </CompositionViewer>
);