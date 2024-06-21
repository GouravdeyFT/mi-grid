import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../../../constants/theme';

type MiThemeProviderProps = {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  direction?: 'rtl' | 'ltr';
};

export const MiThemeProvider = ({
  children,
  theme = 'light',
  direction = 'rtl',
}: MiThemeProviderProps) => {
  const appTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={{ ...appTheme, direction }}>{children}</ThemeProvider>
  );
};
export default MiThemeProvider;

MiThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node,
};
