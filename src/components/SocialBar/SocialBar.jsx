import { FaSquareFacebook } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";
import { SiGithub } from "react-icons/si";
import { BarContainer, Line, IconWrapper } from "./SocialBar.styled";

export const SocialBar = ({ isMobileMenu }) => {
  return (
    <BarContainer $isMobileMenu={isMobileMenu}>
      <Line $isMobileMenu={isMobileMenu} />

      <IconWrapper
        href="https://github.com/Dmytro1117"
        target="_blank"
        title="GitHub"
      >
        <SiGithub size={24} />
      </IconWrapper>

      <IconWrapper href="https://youtube.com" target="_blank" title="Youtube">
        <TfiYoutube size={24} />
      </IconWrapper>

      <IconWrapper href="https://facebook.com" target="_blank" title="Facebook">
        <FaSquareFacebook size={20} />
      </IconWrapper>

      <Line $isMobileMenu={isMobileMenu} />
    </BarContainer>
  );
};
