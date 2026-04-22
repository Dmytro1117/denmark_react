import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledBg = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image: url(${(props) => props.$desktopBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${({ theme }) => theme.media.mobileOnly} {
    background-image: url(${(props) => props.$mobileBg});
  }
`;
