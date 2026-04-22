import styled, { css } from "styled-components";

const baseInputStyles = css`
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
  outline: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  color: ${({ theme }) => theme.colors.textMain};
  background: ${({ theme }) =>
    theme.themeMode === "light" ? "transparent" : theme.colors.bgSurface};

  border: 1px solid
    ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.bgMain
        : theme.colors.border;
    }};

  &::placeholder {
    color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.scrollbarHover
        : theme.colors.textDisabled};

    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1.2px;
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

    border-color: ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.primaryBlue;
    }};

    background-color: ${({ theme }) => theme.colors.bgMain};

    option {
      background: ${({ theme }) => theme.colors.bgMain};
      color: ${({ theme }) => theme.colors.textMain};
    }

    -webkit-tap-highlight-color: transparent;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    border-color: ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.textMain
        : theme.colors.borderStrong;
    }};

    background: ${({ theme }) =>
      theme.themeMode === "light"
        ? "rgba(0,0,0,0.03)"
        : theme.colors.bgSurface};
  }
`;

export const Input = styled.input`
  ${baseInputStyles}
  height: 46px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: ${({ theme }) => (theme.themeMode === "light" ? "600" : "400")};
  text-transform: uppercase;
  letter-spacing: 2px;

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.textMain
      : theme.colors.textMain};

  padding-left: 2px;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

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

export const Select = styled.select`
  ${baseInputStyles}
  height: 46px;
  appearance: none;
  cursor: pointer;
  padding-right: 40px;

  option {
    background: ${({ theme }) => theme.colors.bgMain};
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const InlineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.tabletOnly} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 300px;

  ${({ theme }) => theme.media.tabletOnly} {
    min-height: 250px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    flex-direction: column;
    min-height: auto;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const PhotoBox = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    theme.themeMode === "light" ? "transparent" : theme.colors.bgSurface};

  border: 1px solid
    ${({ theme, $hasError }) => {
      if ($hasError)
        return theme.themeMode === "light"
          ? theme.colors.varning
          : theme.colors.secondaryBordeaux;

      return theme.themeMode === "light"
        ? theme.colors.bgMain
        : theme.colors.border;
    }};
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

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

  ${({ theme }) => theme.media.mobileOnly} {
    height: 220px;
    min-height: 220px;
    border-color: ${({ theme }) =>
      theme.themeMode === "light" ? "#000000" : theme.colors.borderStrong};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) =>
      theme.themeMode === "light"
        ? theme.colors.scrollbarHover
        : theme.colors.textDisabled};
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }
`;

export const Textarea = styled.textarea`
  ${baseInputStyles}
  height: 100%;
  resize: none;

  ${({ theme }) => theme.media.mobileOnly} {
    min-height: 200px;
    height: 200px;
  }
`;

export const ErrorText = styled.p`
  position: absolute;
  top: 100%;
  margin-top: 5px;
  right: 2px;

  color: ${({ theme }) =>
    theme.themeMode === "dark"
      ? theme.colors.secondaryBordeaux
      : theme.colors.varning};

  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 600;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.base};
`;
