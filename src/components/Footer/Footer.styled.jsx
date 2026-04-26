import styled from "styled-components";

export const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.content};
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${({ theme }) =>
    theme.themeMode === "light"
      ? `linear-gradient(
          to right,
          transparent 0%,
          rgba(255, 255, 255, 0.45) 45%, 
          rgba(255, 255, 255, 0.45) 65%, 
          transparent 100%
        )`
      : "transparent"};

  ${({ theme }) => theme.media.tabletOnly} {
    padding: 10px 20px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    padding: 20px 0 14px;
  }
`;

export const FooterLine = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 1px;
  background-color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.textMain
      : theme.colors.borderStrong};
  margin-bottom: 14px;

  ${({ theme }) => theme.media.tabletOnly} {
    width: 100%;
    max-width: 800px;
    margin-bottom: 10px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

export const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  pointer-events: auto;
`;

export const Copyright = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 12px;

  font-weight: ${({ theme }) => (theme.themeMode === "light" ? "500" : "400")};

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.textMain
      : theme.colors.textSecondary};

  letter-spacing: ${({ theme }) =>
    theme.themeMode === "light" ? "1.5px" : "1px"};
  text-transform: uppercase;

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 10px;
    max-width: 320px;
    line-height: 1.5;
    text-align: center;
    opacity: 0.7;
  }
`;
