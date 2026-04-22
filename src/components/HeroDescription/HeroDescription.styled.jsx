import styled from "styled-components";

export const DescWrapper = styled.div`
  position: absolute;
  left: 6vw;
  bottom: 10vh;
  z-index: ${({ theme }) => theme.zIndex.content};
  max-width: 600px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.lg};

  background: ${({ theme }) =>
    theme.themeMode === "light"
      ? "rgba(255, 255, 255, 0.7)"
      : `linear-gradient(
          to right,
          ${theme.colors.overlayStrong} 0%,
          ${theme.colors.overlayDark} 60%,
          transparent 100%
        )`};

  border-radius: ${({ theme }) => theme.radius.md};

  ${({ theme }) => theme.media.tabletOnly} {
    padding: ${({ theme }) => theme.spacing.md};
    left: 55px;
    bottom: 65px;
    max-width: 550px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: relative;
    order: 3;
    left: auto;
    bottom: auto;
    width: 90%;
    max-width: 400px;
    margin: 20px auto;
    background: ${({ theme }) => theme.colors.bgGlass};
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;

export const Title = styled.h2`
  font-size: 3rem;
  line-height: 1.1;
  text-align: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textMain};
  text-shadow: ${({ theme }) => theme.shadows.medium};

  ${({ theme }) => theme.media.tabletOnly} {
    font-size: 42px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  font-weight: ${({ theme }) => (theme.themeMode === "light" ? 600 : 400)};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-shadow: ${({ theme }) => theme.shadows.soft};
  opacity: 0.95;
  text-align: left;
  text-align: justify;
  letter-spacing: 0.5px;

  ${({ theme }) => theme.media.tabletOnly} {
    font-size: 1.1rem;
    line-height: 1.5;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
