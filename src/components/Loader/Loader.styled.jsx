import styled from "styled-components";
import { spinLoading } from "../../helpers/animations";

export const FullscreenWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlayDark};
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InlineWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: transparent;
  pointer-events: none;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;

  /* Основне кільце */
  border: 4px solid
    ${({ theme }) =>
      theme.themeMode === "dark"
        ? theme.colors.textDisabled
        : theme.colors.primaryBlue};

  /* Кружляюча частина */
  border-top-color: ${({ theme }) =>
    theme.themeMode === "dark"
      ? theme.colors.primaryBlue
      : theme.colors.bgMain};
  border-radius: 50%;

  animation: ${spinLoading} 0.8s linear infinite;
`;
