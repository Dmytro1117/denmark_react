// 1. Libraries
import { useState } from "react";
import { useTheme } from "styled-components";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";

// 2. Components & UI
import { SocialBar } from "../SocialBar/SocialBar";

// 3. Styled Components
import {
  Nav,
  Logo,
  MenuList,
  MenuLink,
  LogoLink,
  BurgerButton,
  MobileSocials,
  ThemeToggle,
} from "./Navigation.styled";

export const Navigation = () => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <Nav>
      <Logo>
        <LogoLink to="/" onClick={closeMenu}>
          <img src={theme.images.logo} alt="Site Logo" />
        </LogoLink>
      </Logo>

      <BurgerButton onClick={toggleMenu} $isOpen={isOpen}>
        <span />
        <span />
        <span />
      </BurgerButton>

      <MenuList $isOpen={isOpen}>
        <li>
          <MenuLink to="/" onClick={closeMenu}>
            Home
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/about" onClick={closeMenu}>
            About
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/map" onClick={closeMenu}>
            Map
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/gallery" onClick={closeMenu}>
            Gallery
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/documents" onClick={closeMenu}>
            Documents
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/study" onClick={closeMenu}>
            Study
          </MenuLink>
        </li>

        <ThemeToggle
          onClick={theme.toggleTheme}
          title={
            theme.themeMode === "dark" ? "Switch to Light" : "Switch to Dark"
          }
        >
          {theme.themeMode === "dark" ? <BsSunFill /> : <BsFillMoonStarsFill />}
        </ThemeToggle>

        <MobileSocials>
          <SocialBar isMobileMenu={true} />
        </MobileSocials>
      </MenuList>
    </Nav>
  );
};
