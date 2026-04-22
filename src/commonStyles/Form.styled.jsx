import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { errorMessage } from "../helpers/animations";

export const commonInputStyles = css`
  width: 100%;
  font-size: 15px;
  padding: 14px 16px;
  background: transparent;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border: 1px solid
    ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.bgGlass
        : theme.colors.textDisabled;
    }};

  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.textMain};
  outline: none;
  font-family: inherit;
  transition: all ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) =>
      theme.themeMode === "dark"
        ? theme.colors.textSecondary
        : theme.colors.textMuted};

    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 12px;
  }

  &:hover {
    border-color: ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.borderStrong;
    }};
  }

  &:focus {
    outline: none;

    background: ${({ theme }) =>
      theme.themeMode === "dark"
        ? theme.colors.bgSurface
        : theme.colors.bgSurface};

    border-color: ${({ theme, $hasError }) => {
      if ($hasError) return theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.primaryBlue;
    }};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    padding: 12px 14px;
    font-size: 18px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.secondaryBordeaux : theme.colors.border};
  }
`;

export const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SharedInput = styled.input`
  ${commonInputStyles}
`;

export const SharedTextarea = styled.textarea`
  ${commonInputStyles}
  height: 100%;
  resize: none;
  min-height: 90px;

  ${({ theme }) => theme.media.mobileOnly} {
    min-height: 140px;
  }
`;

export const SharedSelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &::after {
    content: "▼";
    font-size: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    position: absolute;
    right: ${({ theme }) => theme.spacing.lg};
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const SharedSelect = styled.select`
  ${commonInputStyles}

  appearance: none;
  cursor: pointer;
  padding-right: 40px;
  margin-bottom: 0;

  option {
    background: ${({ theme }) => theme.colors.bgMain};
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const SharedErrorText = styled.p`
  position: absolute;
  bottom: 5px;
  right: 2px;

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.varning
      : theme.colors.secondaryBordeaux};

  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 600;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.base};
  animation: ${errorMessage} ${({ theme }) => theme.transitions.slow} backwards;

  ${({ theme }) => theme.media.mobileOnly} {
    position: relative;
    bottom: auto;
    right: auto;
    text-align: right;
    margin-top: -14px;
    margin-bottom: 16px;
    font-size: 11px;
  }
`;

export const GlobalErrorBox = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.secondaryBordeaux};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) =>
    theme.themeMode === "light" ? theme.colors.bgMain : theme.colors.textMain};
  font-size: 12px;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${({ theme }) => theme.media.mobileOnly} {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ErrorOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  background: ${({ theme }) => theme.colors.overlayDark};
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const GlobalErrorOverlay = styled(motion.div)`
  width: 100%;
`;

export const SharedForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SharedActions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.mobileOnly} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: center;
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`;

export const RemindtWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -5px;
  margin-bottom: 20px;

  ${({ theme }) => theme.media.mobileOnly} {
    justify-content: center;
    margin-bottom: 15px;
  }
`;

export const RemaindtLink = styled.button`
  font-size: 11px;
  color: ${({ theme }) =>
    theme.themeMode === "light" ? "#000000" : theme.colors.primaryBlue};
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 500;
  padding-left: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.borderActive
        : theme.colors.textMain};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 10px;
    white-space: normal;
    text-align: center;
  }
`;
