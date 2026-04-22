import {
  FooterContainer,
  FooterLine,
  FooterContent,
  Copyright,
} from "./Footer.styled";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterLine />
      <FooterContent>
        <Copyright>
          © {currentYear} DENMARK. Designed for Travel Experience.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};
