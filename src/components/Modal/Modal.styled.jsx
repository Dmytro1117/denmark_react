import styled from "styled-components";
import { motion } from "framer-motion";

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.top};

  background-color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.overlayDark
      : theme.colors.overlayStrong};

  backdrop-filter: ${({ theme }) =>
    theme.themeMode === "light" ? "blur(6px)" : "blur(8px)"};

  ${({ theme }) => theme.media.mobileOnly} {
    background-color: ${({ theme }) => theme.colors.bgGlass};
    backdrop-filter: blur(10px);
    align-items: center;
  }
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textMain};
  max-height: calc(85vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-word;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primaryBlue};
    border-radius: 0;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    padding: 30px 20px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form,
    & > div {
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
    }
  }
`;

export const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.bgGlass};
  max-width: ${(props) => (props.$isSmall ? "550px" : "1000px")};
  width: 95%;
  margin: 0 auto;
  position: relative;
  display: block;
  border-radius: ${({ theme }) => theme.radius.sm};

  border: ${({ theme }) =>
    theme.themeMode === "light" ? "none" : `1px solid ${theme.colors.border}`};

  box-shadow: ${({ theme }) =>
    theme.themeMode === "light"
      ? "0 20px 60px rgba(0,0,0,0.18)"
      : `${theme.shadows.medium}, ${theme.shadows.soft}`};

  max-height: 90vh;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    height: ${({ theme }) => (theme.themeMode === "light" ? "5px" : "2px")};

    background: ${({ theme }) => theme.colors.primaryBlue};

    box-shadow: ${({ theme }) =>
      theme.themeMode === "light" ? "0 0 8px rgba(122,5,29,0.25)" : "none"};

    border-radius: ${({ theme }) =>
      `${theme.radius.sm} ${theme.radius.sm} 0 0`};
    z-index: ${({ theme }) => theme.zIndex.content};
  }

  ${({ theme }) => theme.media.tabletOnly} {
    width: ${(props) => (props.$isSmall ? "500px" : "700px")};
    max-height: 80vh;
    margin: 0 auto;
    display: block;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &::before {
      display: none;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: ${({ theme }) => theme.colors.bgSurface};

  border-bottom: 1px solid
    ${({ theme }) =>
      theme.themeMode === "light" ? "rgba(0,0,0,0.08)" : theme.colors.border};
  ${({ theme }) => theme.media.mobileOnly} {
    padding: 20px;
    justify-content: center;
    border-bottom: none;
    background: transparent;
  }
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryBlue};

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 24px;
    text-align: center;
    letter-spacing: 0.15em;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 20px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondaryBordeaux};

    color: ${({ theme }) =>
      theme.themeMode === "dark"
        ? theme.colors.secondaryBordeaux
        : theme.colors.varning};
        
    transform: scale(1.1);

    ;
}
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: absolute;
    top: 40px;
    right: 20px;
    font-size: 28px;
    color: ${({ theme }) => theme.colors.textMain};
  }
`;
