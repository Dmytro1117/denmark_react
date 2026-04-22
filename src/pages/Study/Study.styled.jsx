import styled from "styled-components";
import { motion } from "framer-motion";

export const StudyTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  gap: ${({ theme }) => theme.spacing.md};
  position: static;
  min-height: 115px;

  & > div {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    justify-content: space-around;
  }

  & > button {
    margin: 0 auto;
    position: relative;
    z-index: 10;
  }

  ${({ theme }) => theme.media.tabletOnly} {
    order: 1;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};

    & > div {
      max-width: 716px;
    }

    & > button {
      margin: 0 auto;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    order: 1;
    margin: 20px 0;
    gap: ${({ theme }) => theme.spacing.lg};

    & > div {
      max-width: 400px;
    }

    & > button {
      width: 100% !important;
    }
  }
`;

export const DataGrid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  position: relative;

  & > * {
    flex: 0 0 320px;
  }

  ${({ theme }) => theme.media.tabletOnly} {
    gap: ${({ theme }) => theme.spacing.md};
    max-width: 800px;
    margin: 8px auto 0;

    & > * {
      flex: 0 0 calc((100% - ${({ theme }) => theme.spacing.md}) / 2);
      max-width: 350px;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    flex-direction: column;
    align-items: center;
    order: 2;

    & > * {
      flex: 0 0 auto;
      width: 100%;
      max-width: 400px;
    }
  }
`;

export const DataItem = styled(motion.div)`
  position: relative;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.bgGlass};

  border: 1px solid
    ${({ theme }) =>
      theme.themeMode === "light" ? theme.colors.bgBar : theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  transition:
    background ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurface};

    border-color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.borderStrong};

    box-shadow: ${({ theme }) => theme.shadows.soft};

    border-right: ${({ theme, $activeColor }) =>
      theme.themeMode === "light"
        ? `3px solid ${$activeColor}`
        : `2px solid ${$activeColor}`};
  }

  span {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;

    color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.overlayDark
        : theme.colors.textMuted};

    font-weight: 600;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    padding: 20px;
    align-items: center;
    text-align: center;
  }
`;

export const TopicText = styled.strong`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textMain};
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }

  transition: color ${({ theme }) => theme.transitions.normal};

  ${DataItem}:hover & {
    color: ${({ theme }) => theme.colors.textMain};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 20px;
  }
`;

export const TopicNote = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: 14px;
  letter-spacing: 1px;

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.overlayDark
      : theme.colors.textDisabled};
`;
