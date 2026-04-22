import styled from "styled-components";

export const DocItem = styled.div`
  margin-top: 20px;
`;

export const StatBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
`;

export const DocLabel = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: block;
`;

export const Value = styled.span`
  font-size: 16px;
  font-family: monospace;
  color: ${(p) => p.$color || p.theme.colors.textMuted};
`;

export const ProgressBase = styled.div`
  height: 4px;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) =>
    theme.themeMode === "light" ? "rgba(0, 0, 0, 0.22)" : theme.colors.border};
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${(p) => p.$percent}%;
  background: ${(p) => p.$color};
  transition: width ${({ theme }) => theme.transitions.slow};
`;
