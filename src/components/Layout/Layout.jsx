// 1. Libraries
import { Suspense } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// 2. Components & UI
import { Navigation } from "../Navigation/Navigation";
import { SocialBar } from "../SocialBar/SocialBar";
import { AnimatedPage } from "../AnimatedPage/AnimatedPage";
import { Footer } from "../Footer/Footer";
import { Loader } from "../Loader/Loader";

// 3. Styled Components
import { Content, Container, GlobalOverlay } from "./Layout.styled";

export const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <Container>
      <GlobalOverlay />
      <Navigation />
      <SocialBar />

      <Content>
        <Suspense fallback={<Loader fullscreen={false} />}>
          <AnimatePresence mode="popLayout">
            {outlet && (
              <AnimatedPage key={location.pathname}>{outlet}</AnimatedPage>
            )}
          </AnimatePresence>
        </Suspense>
        <Footer />
      </Content>
    </Container>
  );
};
