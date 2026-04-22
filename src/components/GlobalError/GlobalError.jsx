import { AnimatePresence } from "framer-motion";
import { fadeVariants } from "../../helpers/animations";
import {
  GlobalErrorOverlay,
  GlobalErrorBox,
} from "../../commonStyles/Form.styled";

export const GlobalError = ({ error }) => {
  return (
    <AnimatePresence>
      {error && (
        <GlobalErrorOverlay
          key="global-error-overlay"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <GlobalErrorBox>
            {typeof error === "string" ? error : error?.message}
          </GlobalErrorBox>
        </GlobalErrorOverlay>
      )}
    </AnimatePresence>
  );
};
