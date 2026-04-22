import styled from "styled-components";
import { motion } from "framer-motion";

export const AnimatedPageContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  min-height: 100%;
  position: relative;
  top: 0;
  left: 0;
  will-change: opacity;
  backface-visibility: hidden;
`;
