import styled from "styled-components";
import { motion } from "framer-motion";

export const ProgressContainer = styled.div`
  width: 100%;
  margin: 24px 0;
  position: relative;

  ${({ theme }) => theme.media.tabletOnly} {
    margin: 20px 0 20px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    order: 1;
    max-width: 400px;
    margin: 20px 0 14px;
  }
`;

export const ProgressLine = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) =>
    theme.themeMode === "light" ? theme.colors.bgBar : theme.colors.border};
  border-radius: 2px;
  position: relative;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${(p) => p.$width}%;
  background: ${(p) => p.$color};
  transition: width ${({ theme }) => theme.transitions.slow};
`;

export const PercentValue = styled(motion.div)`
  position: absolute;
  right: 0;
  bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${(p) => p.$color};
  text-shadow: 0 0 10px ${(p) => p.$color}44;
  font-variant-numeric: tabular-nums;

  ${({ theme }) => theme.media.mobileOnly} {
    bottom: 10px;
  }
`;
