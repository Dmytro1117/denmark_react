import { useTheme } from "styled-components";
import { backgroundVariants } from "../../helpers/animations";
import { StyledBg } from "./PageBackground.styled";

export const PageBackground = ({ desktopBg, mobileBg }) => {
  const theme = useTheme();

  const desktopBackground = desktopBg || theme.images.background;
  const mobileBackground = mobileBg || theme.images.backgroundMobile;

  return (
    <StyledBg
      $desktopBg={desktopBackground}
      $mobileBg={mobileBackground}
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
  );
};
