import { pageVariants } from "../../helpers/animations";
import { AnimatedPageContainer } from "./AnimatedPage.styled";

export const AnimatedPage = ({ children, ...rest }) => (
  <AnimatedPageContainer
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    {...rest}
  >
    {children}
  </AnimatedPageContainer>
);
