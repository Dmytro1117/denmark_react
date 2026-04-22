import styled from "styled-components";

export const BarContainer = styled.div`
  position: ${({ $isMobileMenu }) => ($isMobileMenu ? "relative" : "fixed")};
  left: ${({ $isMobileMenu, theme }) =>
    $isMobileMenu ? "0" : theme.spacing.xl};
  top: ${({ $isMobileMenu }) => ($isMobileMenu ? "0" : "50%")};
  transform: ${({ $isMobileMenu }) =>
    $isMobileMenu ? "none" : "translateY(-50%)"};
  display: flex;
  flex-direction: ${({ $isMobileMenu }) => ($isMobileMenu ? "row" : "column")};
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.content};

  ${({ theme }) => theme.media.tabletOnly} {
    left: ${({ $isMobileMenu, theme }) =>
      $isMobileMenu ? "0" : theme.spacing.lg};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: ${({ $isMobileMenu }) => ($isMobileMenu ? "flex" : "none")};
  }
`;

export const Line = styled.div`
  display: ${({ $isMobileMenu }) => ($isMobileMenu ? "none" : "block")};
  width: 2px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.borderStrong};

  ${({ theme }) => theme.media.tabletOnly} {
    height: 25px;
  }
`;

export const IconWrapper = styled.a`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.textMain};
  background-color: ${({ theme }) => theme.colors.bgSurface};
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.textMain};
    color: ${({ theme }) => theme.colors.bgMain};
    transform: scale(1.1);
  }

  ${({ theme }) => theme.media.tabletOnly} {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
`;
