import styled from "styled-components";
import { motion } from "framer-motion";
import { PageContainer, PageSection } from "../../commonStyles/Page.styled";

export const HomePageSection = styled(PageSection)`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.overlayDark};
    z-index: ${({ theme }) => theme.zIndex.base};
  }
`;

export const HomeContentContainer = styled(PageContainer)`
  max-width: 100% !important;
  min-height: 100vh;
  padding: 0;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    padding-bottom: 70px;
  }
`;

export const AnimatedDescWrapper = styled(motion.div)`
  position: absolute;
  right: 140px;
  top: 12vh;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: 500px;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.textMain};

  background: ${({ theme }) =>
    theme.themeMode === "light"
      ? "rgba(255, 255, 255, 0.7)"
      : `linear-gradient(
          to left,
          ${theme.colors.overlayStrong} 0%,
          ${theme.colors.overlayDark} 60%,
          transparent 100%
        )`};

  border-radius: ${({ theme }) => theme.radius.md};

  ${({ theme }) => theme.media.tabletOnly} {
    right: 100px;
    top: 85px;
    width: 450px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: relative;
    order: 2;
    right: auto;
    top: auto;
    width: 90%;
    max-width: 400px;
    margin: 0 auto 20px auto;
    background: ${({ theme }) => theme.colors.bgGlass};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;

export const FormMotionWrapper = styled.div`
  width: 100%;
`;

export const MotionContent = styled(motion.div)`
  width: 100%;
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TabItem = styled.div`
  position: relative;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  text-transform: uppercase;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  transition: ${({ theme }) => theme.transitions.normal};

  color: ${({ $active, theme }) => {
    if (!$active) return theme.colors.textMuted;

    return theme.themeMode === "dark"
      ? theme.colors.primaryBlue
      : theme.colors.secondaryBordeaux;
  }};

  &:hover {
    color: ${({ theme }) =>
      theme.themeMode === "dark"
        ? theme.colors.primaryBlue
        : theme.colors.secondaryBordeaux};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const ActiveLine = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 2px;
  background: ${({ theme }) =>
    theme.themeMode === "dark"
      ? theme.colors.primaryBlue
      : theme.colors.secondaryBordeaux};

  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

export const GiantTitle = styled.h1`
  position: absolute;
  right: 1.2vw;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  font-size: 13vh;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textDisabled};
  z-index: ${({ theme }) => theme.zIndex.base};
  text-transform: uppercase;
  writing-mode: vertical-rl;
  letter-spacing: 0.05em;
  pointer-events: none;

  ${({ theme }) => theme.media.tabletOnly} {
    position: absolute;
    top: 50%;
    right: 1vw;
    font-size: 10vh;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: relative;
    order: 1;
    top: 0;
    right: 0;
    transform: none;
    writing-mode: horizontal-tb;
    font-size: 48px;
    text-align: center;
    padding: 80px 20px 20px 20px;
    width: 100%;
    rotate: 0deg;
  }
`;

export const ProfileWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0px 140px 0px 10px;
  min-height: 180px;
  display: flex;
  align-items: stretch;

  ${({ theme }) => theme.media.mobileOnly} {
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xs};
    min-height: auto;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ProfileInfo = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  ${({ theme }) => theme.media.mobileOnly} {
    align-items: center;
    text-align: center;
  }
`;

export const ProfileEmail = styled.p`
  margin: 0;
  font-size: 17px;
  font-family: monospace;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};

  /* за замовчуванням обрізаємо, якщо занадто довгий */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 450px;

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 15px;
    margin-bottom: 10px;
    text-align: center;
    white-space: normal;
    word-break: break-all; /* Розриває довге слово, якщо воно не влазить */
    max-width: 100%;
    overflow: visible;
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  flex: 1;
  align-items: flex-end;

  ${({ theme }) => theme.media.mobileOnly} {
    justify-content: center;
    margin-top: 24px;

    button {
      align-items: center;
      max-width: 200px;
      padding: 0 20px;
    }
  }
`;

export const ProfileAvatarWrap = styled(motion.div)`
  position: absolute;
  top: -12px;
  bottom: -12px;
  right: -12px;
  width: 230px;
  z-index: ${({ theme }) => theme.zIndex.base};
  pointer-events: none;
  mask-image: linear-gradient(to left, black 0%, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    to left,
    black 0%,
    black 60%,
    transparent 100%
  );

  border-radius: 0 8px 8px 0;
  overflow: hidden;

  ${({ theme }) => theme.media.mobileOnly} {
    position: relative;
    inset: auto;
    order: -1;
    width: 250px;
    height: 250px;
    margin: 0 auto ${({ theme }) => theme.spacing.md};
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    mask-image: none;
    -webkit-mask-image: none;
    pointer-events: auto;

    &::after {
      display: none;
    }
  }
`;

export const ProfileAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.4) brightness(0.5);

  ${ProfileAvatarWrap}:hover & {
    filter: grayscale(0) brightness(1);
    transform: scale(1.05);
  }
`;

export const MiniProgressRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.mobileOnly} {
    align-items: center;
    padding: 0 10px;
    width: 100%;
  }
`;
