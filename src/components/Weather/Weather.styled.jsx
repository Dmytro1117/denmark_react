import styled from "styled-components";

export const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TempDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 40px;
    height: 40px;
    margin-right: ${({ theme }) => theme.spacing.sm};
    filter: grayscale(0.5) brightness(0.8);
    align-self: center;
  }
`;

export const TempValue = styled.span`
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textMain};
  font-family: monospace;
`;

export const TempUnit = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-family: monospace;
  font-weight: 600;
`;

export const WeatherLabel = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-left: auto;
`;

export const MetricsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const MetricLabel = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MetricValue = styled.span`
  font-size: 16px;
  font-family: monospace;
  color: ${(p) => p.$color || p.theme.colors.textSecondary};
`;
