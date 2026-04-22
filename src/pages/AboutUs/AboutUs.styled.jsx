import styled from "styled-components";
import { motion } from "framer-motion";

export const AnimatedLisWrapper = styled(motion.div)`
  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    flex-direction: column;
    order: 1;
    width: 100%;
    display: contents;
    padding-top: 20px;
  }
`;

export const SearchWrapper = styled.div`
  position: absolute;
  top: 100px;
  right: 40px;
  z-index: ${({ theme }) => theme.zIndex.modal};

  ${({ theme }) => theme.media.tabletOnly} {
    top: 80px;
    right: 70px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: relative;
    top: 0;
    right: 0;
    order: 2;
    width: 100%;
    max-width: 300px;
    margin: 20px auto;
  }
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMain};
  background: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.textDisabled
      : theme.colors.bgSurface};

  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.radius.sm};
  border-right: ${({ theme }) =>
    theme.themeMode === "light"
      ? `1px solid ${theme.colors.textMain}`
      : `2px solid ${theme.colors.primaryBlue}`};

  border: 1px solid
    ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.border;
    }};

  outline: none;

  transition: ${({ theme }) => theme.transitions.normal};

  box-shadow: ${({ theme }) =>
    theme.themeMode === "light" ? "0 2px 8px rgba(0,0,0,0.08)" : "none"};

  &:hover {
    border-color: ${({ $hasError, theme }) =>
      $hasError
        ? theme.colors.secondaryBordeaux
        : theme.themeMode === "light"
          ? theme.colors.borderActive
          : theme.colors.borderStrong};
  }

  &:focus {
    outline: none;
    width: 330px;

    background: ${({ theme }) =>
      theme.themeMode === "light" ? theme.colors.bgMain : theme.colors.bgGlass};

    border-color: ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.borderActive
        : theme.colors.primaryBlue;
    }};
  }

  &::placeholder {
    font-size: 12px;

    color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.textMuted};
  }

  ${({ theme }) => theme.media.tabletOnly} {
    width: 260px;
    font-size: 14px;

    &:focus {
      width: 280px;
    }

    &::placeholder {
      text-align: center;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    width: 100%;
    font-size: 16px;
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.sm};

    border-radius: 2px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    &:focus {
      width: 100%;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
      font-size: 12px;
      text-align: center;
    }
  }
`;

export const ErrorMessage = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.varning
      : theme.colors.secondaryBordeaux};
`;

export const DataItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};

  span {
    font-size: 12px;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: right;
    padding-right: 100px;
  }

  strong {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: left;
    padding-left: 100px;
    text-shadow: ${({ theme }) => theme.shadows.soft};
  }

  ${({ theme }) => theme.media.tabletOnly} {
    padding: 10px 0;
    span {
      padding-right: 40px;
    }
    strong {
      padding-left: 40px;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    order: 3;

    span {
      padding: 0;
      text-align: center;
      font-size: 12px;
      letter-spacing: 1px;
    }

    strong {
      padding: 0;
      text-align: center;
      font-size: 18px;
    }
  }
`;

export const CoatOfArmsContainer = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndex.base};
  pointer-events: none;
  will-change: opacity, transform;

  img {
    width: 380px;
    height: auto;

    opacity: ${({ theme }) => (theme.themeMode === "light" ? "0.25" : "0.15")};

    mix-blend-mode: ${({ theme }) =>
      theme.themeMode === "light" ? "multiply" : "normal"};

    filter: ${({ theme }) =>
      theme.themeMode === "light"
        ? "saturate(1.5) brightness(0.7) contrast(1.1)"
        : "saturate(1.2) brightness(0.8)"};

    mask-image: radial-gradient(circle, black 40%, transparent 90%);
    -webkit-mask-image: radial-gradient(circle, black 40%, transparent 90%);
  }

  ${({ theme }) => theme.media.tabletOnly} {
    top: 45%;
    img {
      width: 260px;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    top: 280px;
    transform: translate(-50%, 0);

    img {
      width: 220px;
    }
  }
`;
