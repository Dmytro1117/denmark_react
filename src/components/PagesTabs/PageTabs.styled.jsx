import styled from "styled-components";
import { fadeInTab } from "../../helpers/animations";

export const TabsContainer = styled.div`
  animation: ${fadeInTab} ${({ theme }) => theme.transitions.slow} backwards;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: 10px 25px;
  background: ${({ theme }) => theme.colors.bgGlass};
  backdrop-filter: blur(12px);

  border: 1px solid
    ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.borderStrong};

  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: border-right-color ${({ theme }) => theme.transitions.normal};

  border-right: ${({ theme, $activeColor }) =>
    theme.themeMode === "light"
      ? `3px solid ${$activeColor}`
      : `2px solid ${$activeColor}`};
`;

export const Tab = styled.button`
  background: transparent;
  border: none;
  padding: 6px 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};

  color: ${(p) =>
    p.$isActive ? p.theme.colors.textMain : p.theme.colors.textMuted};

  text-shadow: ${(p) =>
    p.$isActive && p.theme.themeMode === "light"
      ? "0.5px 0 0 currentcolor"
      : "none"};

  border-bottom: 2px solid
    ${(props) => (props.$isActive ? props.$activeColor : "transparent")};

  &:hover {
    color: ${({ theme }) => theme.colors.textMain};

    border-bottom: ${({ theme, $isActive, $activeColor }) => {
      if ($isActive) return `2px solid ${$activeColor}`;

      return `2px solid ${$activeColor}`;
    }};
  }
`;
