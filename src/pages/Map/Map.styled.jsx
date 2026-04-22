import styled from "styled-components";
import { motion } from "framer-motion";
import { PageContainer } from "../../commonStyles/Page.styled";

export const MapImage = styled.img`
  height: 100%;
  width: auto;
  max-width: 100%;
  display: block;
  object-fit: contain;

  ${({ theme }) => theme.media.mobileOnly} {
    max-width: 100%;
    height: auto;
    width: 100%;
  }
`;

export const MapContentContainer = styled(PageContainer)`
  padding: 135px 0 60px;
  height: 100vh;
  max-width: 100% !important;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .react-transform-wrapper {
    width: 100%;
    height: 100%;
  }

  ${({ theme }) => theme.media.tabletOnly} {
    padding: 110px 0 50px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 10px 40px;
  }
`;

export const MapTitle = styled.h2`
  position: absolute;
  top: 100px;
  left: calc((100vw - 1200px) / 2 + 40px);
  z-index: ${({ theme }) => theme.zIndex.content};
  font-size: 20px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryBlue};
  border-left: 2px solid ${({ theme }) => theme.colors.primaryBlue};
  padding-left: ${({ theme }) => theme.spacing.md};
  pointer-events: none;

  ${({ theme }) => theme.media.tabletOnly} {
    left: 70px;
    top: 80px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: static;
    order: -1;
    text-align: center;
    line-height: 1.5;
    border: none;
    border-left: none;
    padding: 0;
    margin: 0 0 10px 0;
    font-size: 18px;
    width: 100%;
    max-width: 320px;

    &::after {
      content: "";
      display: block;
      width: 80px;
      height: 1px;
      background: ${({ theme }) => theme.colors.primaryBlue};
      margin: 10px auto 0;
    }
  }
`;

export const DataMap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export const MotionMarkersLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

export const DimOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlayDark};
  opacity: ${(p) => (p.$show ? 1 : 0)};
  transition: ${({ theme }) => theme.transitions.fast};
  pointer-events: none;
`;

export const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.mobileOnly} {
    position: static;
    order: 2;
    height: 270px;
    width: 100%;
    margin-top: 10px;
    background: transparent;
    overflow: hidden;
  }
`;

export const MapFrame = styled.div`
  position: relative;
  height: 100%;
  width: fit-content;
  max-width: 100%;
  cursor: ${(p) => (p.$isAddMode ? "crosshair" : "default")};
  z-index: ${(p) => (p.$isAddMode ? 90 : 1)};
  border-radius: ${({ theme }) => theme.radius.sm};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    transition: ${({ theme }) => theme.transitions.fast};

    ${(p) =>
      p.$isAddMode
        ? `
        box-shadow:
          0 0 0 2px ${p.theme.colors.primaryBlue} inset,
          ${p.theme.shadows.glow},
          ${p.theme.shadows.medium};
      `
        : `box-shadow: none;`}
  }

  ${({ theme }) => theme.media.tabletOnly} {
    &::after {
      display: none;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
  }
`;

export const MapTabsWrapper = styled.div`
  position: absolute;
  top: 100px;
  right: 60px;
  z-index: ${({ theme }) => theme.zIndex.top};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.tabletOnly} {
    top: 80px;
    right: 70px;
    gap: ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: static;
    align-items: center;
    width: 100%;
    margin: 16px 0;
    order: 0;
    gap: ${({ theme }) => theme.spacing.lg};

    & > div:first-child {
      display: flex;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      justify-content: space-around;
    }
  }
`;

export const ModeButtons = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  gap: ${({ theme }) => theme.spacing.xs};
  position: static;

  ${({ theme }) => theme.media.mobileOnly} {
    flex-direction: column;
    margin: 0;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;
