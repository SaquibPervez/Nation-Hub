'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColorModeContext } from './ThemeRegistry';
import { HiMiniMoon } from "react-icons/hi2";
import { FiSun } from "react-icons/fi";

export default function ThemeToggleButton() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';

  // Check if screen is small (mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
      onClick={colorMode.toggleColorMode}
      disableElevation
      sx={{
        textTransform: 'none',
        fontSize: isMobile ? '20px' : '16px',
        minWidth: isMobile ? 40 : 'auto',
        padding: isMobile ? '8px' : '6px 12px',
        borderRadius: 2,
      }}
    >
      {isDark ? <HiMiniMoon /> : <FiSun />}
      {!isMobile && (
        <span style={{ marginLeft: 8 }}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </Button>
  );
}