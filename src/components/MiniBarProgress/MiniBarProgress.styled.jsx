import styled from "styled-components";

export const ContainerBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  max-width: 250px;

  ${({ theme }) => theme.media.tabletOnly} {
    max-width: 200px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    max-width: 280px;
  }
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CountryBar = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PercentBar = styled.span`
  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.textMain
      : theme.colors.textSecondary};
`;

export const BarBackground = styled.div`
  height: 3px;
  background: ${({ theme }) =>
    theme.themeMode === "light" ? theme.colors.bgBar : theme.colors.border};
  width: 100%;
`;

export const BarFill = styled.div`
  height: 100%;
  background: ${({ theme, $color }) =>
    theme.themeMode === "light"
      ? $color || theme.colors.textMain
      : $color || theme.colors.textMuted};
  width: ${(p) => p.$percent}%;
  transition: width ${({ theme }) => theme.transitions.slow};
`;
