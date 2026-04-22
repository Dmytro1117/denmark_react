import styled from "styled-components";
import { motion } from "framer-motion";

export const AddModeHint = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.top};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.bgGlass};
  border: 1px solid ${({ theme }) => theme.colors.borderActive};
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  pointer-events: none;

  span {
    display: block;
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: none;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  ${({ theme }) => theme.media.tabletOnly} {
    top: 80px;
    padding: ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: none;
  }
`;
