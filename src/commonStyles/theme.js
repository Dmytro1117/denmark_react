const sharedStyles = {
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "40px",
  },
  radius: { sm: "4px", md: "8px", lg: "12px" },
  transitions: { fast: "0.3s ease", normal: "0.4s ease", slow: "0.5s ease" },
  zIndex: { base: 1, content: 5, overlay: 20, modal: 50, top: 100 },
  media: {
    desktopOnly: `@media screen and (min-width: 1200px)`,
    tabletOnly: `@media screen and (min-width: 768px) and (max-width: 1199px)`,
    mobileOnly: `@media screen and (max-width: 767px)`,
  },
  shadows: {
    soft: "0 2px 10px rgba(0,0,0,0.3)",
    medium: "0 10px 30px rgba(0,0,0,0.5)",
    glow: "0 0 15px rgba(19,116,206,0.5)",
  },
};

export const darkTheme = {
  ...sharedStyles,
  themeMode: "dark",
  colors: {
    primaryBlue: "#1374ceb6",
    secondaryBordeaux: "#5e111fec",
    globalOverlay: "rgba(0, 0, 0, 0.1)",
    bgMain: "#1a1c1e",
    bgSurface: "rgba(0, 0, 0, 0.4)",
    bgGlass: "rgba(0, 0, 0, 0.7)",
    textMain: "#ffffff",
    textSecondary: "rgba(255,255,255,0.72)",
    textMuted: "rgba(255,255,255,0.4)",
    textDisabled: "rgba(255,255,255,0.25)",
    border: "rgba(255,255,255,0.1)",
    borderStrong: "rgba(255,255,255,0.4)",
    borderActive: "#1374ce21",
    overlayDark: "rgba(0,0,0,0.45)",
    overlayStrong: "rgba(0,0,0,0.7)",
    scrollbar: "#d1d1d1",
    scrollbarHover: "#5a5a5a",
  },

  images: {
    logo: "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776872388/Denmark/logo/logoDark_c8xf3y.png",
    home: "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793410/Denmark/background/homeDark_aqrwo3.png",
    homeMobile:
      "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793411/Denmark/background/homeMobileDark_nxlbqq.png",
    background:
      "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793409/Denmark/background/backgroundDark_dqeykc.png",
    backgroundMobile:
      "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793409/Denmark/background/backgroundMobileDark_tyyjx2.png",
  },
};

export const lightTheme = {
  ...sharedStyles,
  themeMode: "light",

  colors: {
    primaryBlue: "#0b457ce1",
    secondaryBordeaux: "#5e111fec",
    globalOverlay: "rgba(0, 0, 0, 0.15)",
    bgMain: "#ffffff",
    bgSurface: "rgba(255, 255, 255, 0.55)",
    bgGlass: "rgba(255, 255, 255, 0.7)",
    textMain: "#000000",
    textSecondary: "rgb(0, 0, 0)",
    textMuted: "rgb(0, 0, 0)",
    textDisabled: "rgba(255, 255, 255, 0.35)",
    border: "rgba(32, 31, 31, 0.45)",
    borderStrong: "rgba(255, 255, 255, 0.8)",
    borderActive: "#1374ce",
    bgBar: "rgba(0, 0, 0, 0.2)",
    varning: "#c50c2e",
    overlayDark: "rgba(0, 0, 0, 0.5)",
    overlayStrong: "rgba(0,0,0,0.7)",
    scrollbar: "#0b457ce1",
    scrollbarHover: "#5a5a5a",
  },
  images: {
    logo: "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776840621/Denmark/logo/logolight_sf1drf.png",
    home: "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793409/Denmark/background/homeLight_zvzr41.png",
    homeMobile:
      "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793411/Denmark/background/homeMobileLight_lgfarc.png",
    background:
      "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793409/Denmark/background/backgroundLight_y6068g.png",
    backgroundMobile:
      "https://res.cloudinary.com/dpvqbbgkd/image/upload/v1776793410/Denmark/background/backgroundMobileLight_wejaq5.png",
  },
};
