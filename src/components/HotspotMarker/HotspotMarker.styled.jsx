import styled from "styled-components";
import { motion } from "framer-motion";
import { hotspotPulse } from "../../helpers/animations";

export const MarkerPos = styled(motion.div)`
  position: absolute;
  left: ${(p) => p.$x}%;
  top: ${(p) => p.$y}%;

  /* контейнер нульового розміру точно в точці кліку */
  width: 0;
  height: 0;

  /* Центруємо  маркер відносно  точки */
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: ${(p) =>
    p.$isActive ? p.theme.zIndex.top : p.theme.zIndex.content};
  pointer-events: none;
`;

export const PulseCircle = styled.div`
  position: absolute;
  inset: 0;

  border: 1px solid
    ${(p) =>
      p.$mapType === "dk"
        ? p.theme.colors.secondaryBordeaux
        : p.theme.colors.primaryBlue};

  border-radius: 50%;
  animation: ${hotspotPulse} 3s ease-out infinite;

  &:nth-child(2) {
    animation-delay: 1.5s;
  }
`;

export const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: 75px;
  left: 50%;
  background: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.bgGlass
      : theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.textMain};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 12px;
  white-space: nowrap;
  will-change: transform, opacity;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  ${({ theme }) => theme.media.mobileOnly} {
    bottom: 50px;
    font-size: 10px;
    padding: 4px 8px;
  }
`;

export const EditPinButton = styled.button`
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgGlass};
  color: ${({ theme }) => theme.colors.textMain};
  display: grid;
  place-items: center;
  font-size: 14px;
  cursor: pointer;

  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.08);

    background: ${({ theme }) =>
      theme.themeMode === "dark"
        ? theme.colors.primaryBlue
        : theme.colors.borderActive};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    width: 32px;
    height: 32px;
  }
`;

export const HotspotMarkerDiv = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0; /* Щоб маркер не стискався флексом */
  opacity: ${(p) =>
    p.$anyHovered && !p.$isActive ? "0.25 !important" : "1 !important"};
  cursor: pointer;
  display: grid;
  place-items: center;
  z-index: ${(p) => (p.$isActive ? 10 : 1)};
  overflow: visible;
  pointer-events: auto;
  appearance: none;
  border: none;
  padding: 0;
  outline: none;
  background: none;
  will-change: transform, opacity;

  ${({ theme }) => theme.media.mobileOnly} {
    width: 40px;
    height: 40px;

    /* невидимий відступ, щоб пальцем було легше влучити */
    &::before {
      content: "";
      position: absolute;
      inset: -10px;
    }
  }
`;

export const DeletePinButton = styled.button`
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgGlass};
  color: ${({ theme }) => theme.colors.textMain};
  display: grid;
  place-items: center;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;

  transition:
    transform ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.03);

    background: ${({ theme }) =>
      theme.themeMode === "dark"
        ? theme.colors.secondaryBordeaux
        : theme.colors.varning};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    filter: none;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    width: 32px;
    height: 32px;
  }
`;

export const PulseWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: ${(props) => (props.$hide ? "none" : "block")};
`;

export const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;

  border: 1px solid
    ${(p) =>
      p.$isActive ? p.theme.colors.borderStrong : p.theme.colors.border};

  background: ${({ theme }) => theme.colors.bgGlass};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
    transform: scale(${(p) => (p.$isActive ? 1.2 : 1)});
    transition: transform ${({ theme }) => theme.transitions.normal};
  }
`;
