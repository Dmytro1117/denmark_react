import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMain};
  transition: ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0;

  &.active {
    opacity: 1;
    cursor: default;

    &::after {
      left: 0;
      right: 0;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    right: 50%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.textMain};
    transition: ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    &:not(.active) {
      &::after {
        left: 0;
        right: 0;
      }
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 28px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    padding: 8px 0;
    transition: all ${({ theme }) => theme.transitions.normal};

    &.active {
      color: ${({ theme }) => theme.colors.primaryBlue};
    }

    &::after {
      background-color: ${({ theme }) => theme.colors.primaryBlue};
    }
  }
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.top};

  background-color: ${({ theme }) =>
    theme.themeMode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(255, 255, 255, 0.4)"};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: -1;
  }

  border-bottom: 1px solid
    ${({ theme }) =>
      theme.themeMode === "light" ? theme.colors.bgMain : theme.colors.border};

  color: ${({ theme }) => theme.colors.textMain};

  ${({ theme }) => theme.media.tabletOnly} {
    padding: 0 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: default;

  img {
    height: 64px;
    width: auto;
    transition: ${({ theme }) => theme.transitions.normal};
    display: block;
    cursor: pointer;
    will-change: transform;
    transform: translateZ(0);

    &:hover {
      transform: scale(1.1) translateZ(0);
    }
  }
`;

export const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.textMain};
  transition: all ${({ theme }) => theme.transitions.fast};

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgGlass};
    backdrop-filter: blur(8px);
    color: ${({ theme }) => theme.colors.primaryBlue};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.9);
  }

  ${({ theme }) => theme.media.mobileOnly} {
    svg {
      width: 40px;
      height: 40px;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
`;

export const MenuList = styled.ul`
  display: flex;
  gap: 35px;
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;

  li {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: ${({ theme }) => (theme.themeMode === "light" ? 700 : 500)};
  }

  ${({ theme }) => theme.media.tabletOnly} {
    gap: 20px;
    li {
      font-size: 10px;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    background: ${({ theme }) => theme.colors.bgGlass};
    backdrop-filter: blur(15px);
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(100%)"};

    gap: 30px;
    li {
      font-size: 20px;
    }
  }
`;

export const BurgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  z-index: ${({ theme }) => theme.zIndex.top + 1};

  span {
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.textMain};
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
    }
    &:last-child {
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
  }
`;

export const MobileSocials = styled.div`
  display: none;

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    gap: 20px;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
