import styled from "styled-components";
import { motion } from "framer-motion";

export const StaticOverlay = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  ${({ $variant }) =>
    $variant === "overlay"
      ? `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      `
      : `
        position: relative;
        align-items: center;
        padding: 40px 0;
      `}

  ${({ theme }) => theme.media.tabletOnly} {
    padding: 20px 0;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    order: 1;
    padding: 0;
  }
`;

export const EmptyWrapper = styled(motion.div)`
  pointer-events: auto;
  margin: 40px auto;
  width: 100%;
  max-width: 800px;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  border-right: ${({ theme }) =>
    theme.themeMode === "light"
      ? `3px solid ${theme.colors.secondaryBordeaux}`
      : `2px solid ${theme.colors.secondaryBordeaux}`};
  border-radius: ${({ theme }) => theme.radius.sm};

  ${({ theme }) => theme.media.tabletOnly} {
    max-width: 716px;
    padding: 60px 20px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    border-left: ${({ theme }) =>
      theme.themeMode === "light"
        ? `3px solid ${theme.colors.secondaryBordeaux}`
        : `2px solid ${theme.colors.secondaryBordeaux}`};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: relative;
    inset: auto;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
    padding: 15px 55px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 16px;
    letter-spacing: 1.5px;
  }
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 400px;
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 13px;
    max-width: 280px;
  }
`;
