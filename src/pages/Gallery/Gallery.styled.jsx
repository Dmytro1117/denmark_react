import styled from "styled-components";
import { motion } from "framer-motion";

export const GridContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.lg};

  & > * {
    flex: 0 0 280px;
    height: 200px;
  }

  ${({ theme }) => theme.media.tabletOnly} {
    gap: ${({ theme }) => theme.spacing.md};
    max-width: 800px;
    margin: 0 auto;

    & > * {
      flex: 0 0 calc((100% - ${({ theme }) => theme.spacing.md}) / 2);
      max-width: 350px;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};

    & > * {
      flex: 0 0 auto;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 1 / 1;
      height: auto;
    }
  }
`;

export const GalleryTabsWrapper = styled.div`
  position: absolute;
  right: 40px;
  top: 100px;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.lg};

  button {
    border-right: none !important;
  }

  ${({ theme }) => theme.media.tabletOnly} {
    flex-direction: row;
    right: 70px;
    top: 80px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: static;
    order: 2;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin: 24px auto;
    gap: 4px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 200px;
      padding: 0 20px;
    }
  }
`;

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 220px);
  justify-content: space-between;

  ${({ theme }) => theme.media.mobileOnly} {
    order: 3;
    min-height: auto;
    width: 100%;
    gap: 20px;
    flex-grow: 1;
  }
`;
