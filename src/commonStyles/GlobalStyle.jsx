import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-gutter: stable;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bgMain};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-family: "Inter", sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    font-size: 16px;
    ${({ theme }) => theme.media.mobileOnly} {
      font-size: 12px;
      scrollbar-gutter: auto; 
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Lora", serif;
    font-weight: 700;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.textMain};
  }

  a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
  }

  button {
    font-family: inherit;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    color: ${({ theme }) => theme.colors.textMain};
  }

  /* СТИЛІ СКРОЛБАРА (Webkit) */
  ::-webkit-scrollbar {
    width: 4px !important;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgMain} !important;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollbar} !important;
    border-radius: 1px !important;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scrollbarHover} !important;
  }

  /* СТИЛІ СКРОЛБАРА (Firefox) */
  @supports (-moz-appearance: none) {
    * {
      scrollbar-width: thin;
      scrollbar-color: ${({ theme }) =>
        `${theme.colors.scrollbar} ${theme.colors.bgMain}`};
    }
  }
`;
