import styled from "styled-components";
import { motion } from "framer-motion";

export const GridItem = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderActive};

    img {
      transform: scale(1.03);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: ${({ theme }) => theme.zIndex.content};
    width: 32px;
    height: 32px;
    background: ${({ theme }) => theme.colors.bgGlass};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover:not(:disabled) {
      background: ${({ theme }) =>
        theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux};

      border-color: ${({ theme }) => theme.colors.secondaryBordeaux};
      color: ${({ theme }) => theme.colors.textMain};
      box-shadow: ${({ theme }) => theme.shadows.soft};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const CardSpinnerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  background: ${({ theme }) => theme.colors.overlayStrong};
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
