import styled from "styled-components";
import { motion } from "framer-motion";

export const DataGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.media.tabletOnly} {
    max-width: 716px;
    margin: 20px auto 0;
    gap: ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    order: 2;
    max-width: 100%;
    gap: 0;
    margin-top: 0;
  }
`;

export const DataItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 160px 1fr 40px;
  padding: 16px 24px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  background: ${({ theme }) => theme.colors.bgGlass};

  border: 1px solid
    ${({ theme }) =>
      theme.themeMode === "light" ? theme.colors.bgBar : theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.sm};

  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.textDisabled : theme.colors.textSecondary};

  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurface};

    border-color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.borderStrong};

    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    grid-template-columns: 50px 1fr 50px;
    grid-template-areas: "category content action";
    padding: 16px 8px;
    background: ${({ theme }) => theme.colors.bgSurface};
    border-radius: ${({ theme }) => theme.radius.sm};
    margin-bottom: 12px;
    gap: 5px;
    align-items: center;
  }
`;

export const DocumentTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 105px;
  align-items: center;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.modal};

  gap: ${({ theme }) => theme.spacing.md};
  position: static;

  & > div:first-child {
    display: flex;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    justify-content: space-around;
  }

  ${({ theme }) => theme.media.tabletOnly} {
    order: 1;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    & > div:first-child {
      max-width: 716px;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    min-height: 215px;
    order: 1;
    margin: 12px 0;
    gap: ${({ theme }) => theme.spacing.lg};
    & > div:first-child {
      max-width: 400px;
    }
  }
`;

export const StatusWrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  min-width: 160px;

  span {
    text-align: center;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: contents;
    span {
      grid-area: category;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      font-size: 9px;
      letter-spacing: 1px;
      white-space: nowrap;
      padding: 4px 0;
      justify-self: center;
    }
  }
`;

export const DocMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;

  ${({ theme }) => theme.media.mobileOnly} {
    text-align: center;
    grid-area: content;
    position: relative;
    &::before {
      display: none;
    }
  }
`;

export const DocText = styled.strong`
  display: block;
  min-width: 0;
  word-break: break-word;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;

  color: ${({ theme, $completed }) => {
    if ($completed) {
      return theme.themeMode === "light"
        ? theme.colors.overlayDark
        : theme.colors.textDisabled;
    }
    return theme.colors.textMain;
  }};

  transition: color ${({ theme }) => theme.transitions.normal};

  ${({ theme }) => theme.media.mobileOnly} {
    white-space: normal;
    word-break: break-word;
    font-size: 16px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const DocNote = styled.p`
  margin: 0;
  font-size: 14px;

  color: ${({ theme, $completed }) => {
    if ($completed) {
      return theme.themeMode === "light"
        ? theme.colors.overlayDark
        : theme.colors.textDisabled;
    }
    return theme.themeMode === "light"
      ? theme.colors.overlayStrong
      : theme.colors.textMuted;
  }};

  transition: color ${({ theme }) => theme.transitions.normal};
  line-height: 1.4;
  text-align: justify;
  word-break: break-word;
  overflow: visible;
  text-overflow: clip;
  hyphens: auto;

  ${({ theme }) => theme.media.mobileOnly} {
    text-align: center;
    font-size: 12px;
    opacity: 0.7;
    font-style: italic;
  }
`;

export const StatusSquare = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.xs};
  cursor: pointer;
  flex-shrink: 0;

  border: 1px solid
    ${({ theme, $completed, $country }) => {
      if ($completed) {
        return $country === "ua"
          ? theme.colors.primaryBlue
          : theme.colors.secondaryBordeaux;
      }

      return theme.themeMode === "light"
        ? theme.colors.bgBar
        : theme.colors.border;
    }};

  transition: all ${({ theme }) => theme.transitions.fast};

  svg {
    color: ${({ theme, $country }) =>
      $country === "ua"
        ? theme.colors.primaryBlue
        : theme.colors.secondaryBordeaux};
    width: 16px;
    height: 16px;
    opacity: ${({ $completed }) => ($completed ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.primaryBlue
        : theme.colors.borderStrong};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    grid-area: action;
    width: 30px;
    height: 30px;
    justify-self: center;
    align-self: center;
    margin: 0;

    ${DataItem}:has([title="Edit"]) &, 
    ${DataItem}:has([title="Delete"]) & {
      display: none !important;
    }
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.mobileOnly} {
    grid-area: action;
    justify-self: center;
    align-self: center;
    width: 30px;
    height: 30px;
    margin: 0;
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.overlayStrong
      : theme.colors.textDisabled};

  transition:
    color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
  margin: 0 8px;

  &:hover {
    color: ${({ theme, $isDelete }) =>
      $isDelete ? theme.colors.secondaryBordeaux : theme.colors.textMain};

    color: ${({ theme, $isDelete }) => {
      if ($isDelete)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.borderActive
        : theme.colors.primaryBlue;
    }};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  ${({ theme }) => theme.media.mobileOnly} {
    margin: 0 auto;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const ModeButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  max-width: 450px;
  transform: translateY(-2px);

  ${({ theme }) => theme.media.tabletOnly} {
    max-width: 716px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    flex-direction: column;

    button {
      width: 100% !important;
      flex: none;
    }
  }
`;
