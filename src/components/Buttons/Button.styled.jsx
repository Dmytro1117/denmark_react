import styled from "styled-components";
import { fadeInButton } from "../../helpers/animations";

export const Button = styled.button`
  animation: ${fadeInButton} ${({ theme }) => theme.transitions.slow} backwards;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;

  color: ${({ theme, $active, $variant }) => {
    if (theme.themeMode === "light" && $variant === "danger")
      return theme.colors.bgMain;

    if (theme.themeMode === "dark") {
      return $active ? theme.colors.primaryBlue : theme.colors.textSecondary;
    }
    if ($active) return "#ffffff";
    return "#2b2b2b";
  }};

  cursor: pointer;
  white-space: nowrap;
  outline: none;
  margin: 0 8px;
  transition: color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: ${({ theme }) => theme.radius.sm};
    box-shadow: ${({ theme }) => theme.shadows.medium};

    background: ${({ theme, $active, $variant }) => {
      if ($variant === "danger" && theme.themeMode === "light") {
        return theme.colors.secondaryBordeaux;
      }

      if (theme.themeMode === "dark") {
        return $active ? theme.colors.overlayStrong : theme.colors.bgGlass;
      }
      if ($active) return theme.colors.primaryBlue;
      return "#f8f9fb";
    }};

    border: ${({ theme, $active, $borderColor, $variant }) => {
      if ($borderColor) return `1px solid ${$borderColor}`;

      if ($variant === "danger") {
        return theme.themeMode === "dark"
          ? `1px solid ${theme.colors.secondaryBordeaux}`
          : `1px solid ${theme.colors.bgMain}`;
      }

      if (theme.themeMode === "dark") {
        return $active
          ? `1px solid ${theme.colors.primaryBlue}`
          : `1px solid ${theme.colors.borderStrong}`;
      }
      return "1px solid #ffffff";
    }};

    transform: skewX(-20deg);
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme }) =>
      theme.themeMode === "dark" ? theme.colors.primaryBlue : "#ffffff"};

    ${({ $active }) =>
      $active &&
      `
      transform: scale(1.03); 
    `}

    transition: all ${({ theme }) => theme.transitions.fast};

    &::before {
      background: ${({ theme }) =>
        theme.themeMode === "dark"
          ? theme.colors.overlayStrong
          : theme.colors.primaryBlue};

      border-color: ${({ theme }) =>
        theme.themeMode === "dark"
          ? theme.colors.primaryBlue
          : theme.colors.bgMain};
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    color: ${({ theme }) =>
      theme.themeMode === "dark" ? theme.colors.textMain : theme.colors.bgMain};

    &::before {
      border-color: ${({ theme }) => theme.colors.borderActive};
      box-shadow: ${({ theme }) => theme.shadows.medium};
      background: ${({ theme, $active }) =>
        theme.themeMode === "dark"
          ? $active
            ? theme.colors.textMuted
            : theme.colors.border
          : theme.colors.secondaryBordeaux};
    }
  }

  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.media.mobileOnly} {
    height: 44px;
    width: 100%;
    max-width: 280px;
    font-size: 16px;

    &::before {
      transform: skewX(-15deg);
    }
  }
`;
