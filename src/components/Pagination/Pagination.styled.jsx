import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: 16px;

  ${({ theme }) => theme.media.mobileOnly} {
    order: 4;
    margin-bottom: 20px;
  }
`;

export const PageButton = styled.button`
  min-width: 40px;
  height: 40px;

  background: ${({ theme, $active }) => {
    if ($active)
      return theme.themeMode === "light"
        ? theme.colors.secondaryBordeaux
        : theme.colors.borderActive;

    return theme.themeMode === "light"
      ? theme.colors.bgSurface
      : theme.colors.bgSurface;
  }};

  border: 1px solid
    ${({ theme, $active }) => {
      if ($active)
        return theme.themeMode === "light"
          ? theme.colors.secondaryBordeaux
          : theme.colors.primaryBlue;

      return theme.themeMode === "light"
        ? theme.colors.globalOverlay
        : theme.colors.textDisabled;
    }};

  color: ${({ theme, $active }) => {
    if ($active)
      return theme.themeMode === "light"
        ? theme.colors.bgMain
        : theme.colors.textMain;

    return theme.themeMode === "light"
      ? theme.colors.textMuted
      : theme.colors.textMuted;
  }};

  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.textMain};

    border-color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.primaryBlue};

    background: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.bgMain
        : theme.colors.bgSurface};
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

export const Dots = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 14px;
`;
