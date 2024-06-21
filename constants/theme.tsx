export const appThemeFont = {
  family: "'Roboto', 'sans-serif' !important",
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  size: {
    base: '14px',
    lg: '16px',
    sm: '12px',
    xl: '18px',
  },
};

export const appThemeBreakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export const appThemeSizes = {
  line: {
    base: 1.35,
  },
  borderRadius: {
    base: '10px',
    circle: '50%',
  },
};

export const appThemeBorder = {
  baseColor: '#DEE6EE',
  baseStyle: 'solid',
  baseWidth: '1px',
};
export const appThemeCommon = {
  bodyBackground: '#FFFFFF',
  headerBackground: '#FFFFFF',
  background: '#FFFFFF',
  paper: '#FFFFFF',
  orange: 'orange',
  white: '#FFFFFF',
  black: '#333333',
  lightBlue: '#4b8ae8',
  teal: '#324dd7',
  green: '#03A300',
  uploadDragColor: '#FAFBFD',
  greyColor: '#C4C4C4',
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  purple: '#AF50AF',
};
export const appDarkThemeBorder = {
  baseColor: '#245a94',
  baseStyle: 'solid',
  baseWidth: '1px',
};

export const appDarkThemeCommon = {
  bodyBackground: '#001E3C',
  headerBackground: '#05305B',
  background: '#0A1929',
  paper: '#001E3C',
  orange: 'orange',
  white: '#333333',
  black: '#FFFFFF',
  lightBlue: '#4b8ae8',
  teal: '#324dd7',
  green: '#03A300',
  uploadDragColor: '#FAFBFD',
  greyColor: '#C4C4C4',
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  purple: '#AF50AF',
};

export const appThemeElements = {
  grid: {
    gutter: 24,
  },
  table: {
    headBackground: '#D3DAF8',
    rowHover: '#F2F4FD',
  },
  card: {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    headerBgColor: '#F4F7FA',
  },
  tabs: {
    bgColor: '#F4F7FA',
    hoverBgColor: '#cbd7e3',
  },
  checkbox: {
    borderRadius: '4px',
  },
};

export const appDarkThemeElements = {
  grid: {
    gutter: 24,
  },
  table: {
    headBackground: '#D3DAF8',
    rowHover: '#F2F4FD',
  },
  card: {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    headerBgColor: '#1E4976',
  },
  tabs: {
    bgColor: '#F4F7FA',
    hoverBgColor: '#cbd7e3',
  },
  checkbox: {
    borderRadius: '4px',
  },
};

export const appThemePalette = {
  primary: '#182A88',
  secondary: '#FAA000',
  body: '#FAFAFA',
  success: '#67AA49',
  error: '#CF2A27',
  warning: '#EC9B13',
  info: '#2B78E4',
  successLight: '#F6FFED',
  errorLight: '#FFF1F0',
  warningLight: '#e680091c',
  infoLight: '#E6F7FF',
  lightInfo: '#FDB81E',
  darkSuccess: '#28860c',
};
export const appDarkThemePalette = {
  primary: '#007FFF',
  secondary: '#FAA000',
  body: '#FAFAFA',
  success: '#67AA49',
  error: '#CF2A27',
  warning: '#EC9B13',
  info: '#2B78E4',
  successLight: '#F6FFED',
  errorLight: '#FFF1F0',
  warningLight: '#e680091c',
  infoLight: '#E6F7FF',
  lightInfo: '#FDB81E',
  darkSuccess: '#28860c',
};

export const appThemeText = {
  heading: '#1F1F1F',
  primary: '#595959',
  secondary: '#8D8C8C',
  hint: '#BCBABA',
  disabled: '#bcbaba',
  placeholder: '#8D8C8C',
};

export const appDarkThemeText = {
  heading: '#e0e0e0',
  primary: '#a6a6a6',
  secondary: '#727373',
  hint: '#434545',
  disabled: '#434545',
  placeholder: 'rgba(255, 255, 255, 0.6)',
};

export const appThemeSidebar = {
  sidebarBgColor: appThemeCommon.paper,
  sidebarSubmenuColor: appThemeCommon.bodyBackground,
  sidebarTextColor: '#1F1F1F',
  sidebarTextColorHover: '#182A88',
};

export const appDarkThemeSidebar = {
  sidebarBgColor: '#05305B',
  sidebarSubmenuColor: appDarkThemeCommon.bodyBackground,
  sidebarTextColor: '#1F1F1F',
  sidebarTextColorHover: '#182A88',
};

export const appTable = {
  textColor: 'rgba(0, 0, 0, 0.88)',
  headerBgColor: '#FAFAFA',
  borderColor: '#F0F0F0',
  borderHoverColor: '#F0F0F0',
  headerIconColor: 'rgba(0, 0, 0, 0.29)',
  selectedHover: '#99A3BA',
};

export const appDarkTable = {
  textColor: 'rgba(255, 255, 255, 0.85)',
  headerBgColor: '#0A2744',
  borderColor: '#1D4977',
  borderHoverColor: '#1F3953',
  headerIconColor: 'rgba(255, 255, 255, 0.29)',
  selectedHover: '#0F2845',
};

export const lightTheme = {
  palette: {
    ...appThemePalette,
    lightPrimary: '#F4F7FA',
  },
  text: {
    ...appThemeText,
  },
  sidebar: {
    ...appThemeSidebar,
  },
  font: {
    ...appThemeFont,
  },
  common: {
    ...appThemeCommon,
  },
  table: {
    ...appTable,
  },
  breakpoints: {
    ...appThemeBreakpoints,
  },
  sizes: {
    ...appThemeSizes,
  },
  border: {
    ...appThemeBorder,
  },
  elements: {
    ...appThemeElements,
  },
};

export const darkTheme = {
  palette: {
    ...appDarkThemePalette,
    lightPrimary: '#1E4976',
  },
  text: {
    ...appDarkThemeText,
  },
  sidebar: {
    ...appDarkThemeSidebar,
  },
  common: {
    ...appDarkThemeCommon,
  },
  table: {
    ...appDarkTable,
  },
  font: {
    ...appThemeFont,
  },
  breakpoints: {
    ...appThemeBreakpoints,
  },
  sizes: {
    ...appThemeSizes,
  },
  border: {
    ...appDarkThemeBorder,
  },
  elements: {
    ...appDarkThemeElements,
  },
};
