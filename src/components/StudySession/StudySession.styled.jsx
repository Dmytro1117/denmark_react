import styled from "styled-components";
import { motion } from "framer-motion";

export const WordMain = styled(motion.h2)`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 800;
  letter-spacing: 2px;
  text-align: center;
`;

export const SummaryTitle = styled.h3`
  font-size: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.overlayStrong
      : theme.colors.textMuted};

  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SummaryScore = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  font-weight: 300;
`;

export const TranslationBox = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  margin-inline: auto;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryBlue}10;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
  }

  .label {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;

    color: ${(props) =>
      props.$active
        ? props.theme.colors.primaryBlue
        : props.theme.colors.textMuted};

    font-weight: 700;
    transition: color ${({ theme }) => theme.transitions.normal};
  }

  .value {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textMain};
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transform: scale(${(props) => (props.$active ? 1 : 0.95)});
    filter: ${(props) => (props.$active ? "none" : "blur(8px)")};
    transition: ${({ theme }) => theme.transitions.normal};
    min-height: 24px;
    display: inline-block;
  }
`;
