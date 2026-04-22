import { AnimatePresence } from "framer-motion";
import { fadeVariants } from "../../helpers/animations";
import { ErrorOverlay, GlobalErrorBox } from "../../commonStyles/Form.styled";

export const ServerError = ({ error, isVisible }) => {
  const displayMessage = typeof error === "string" ? error : error?.message;

  return (
    <AnimatePresence>
      {isVisible && error && (
        <ErrorOverlay
          key="server-error-overlay"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <GlobalErrorBox>
            {displayMessage || "Connection error. Please try again later."}
          </GlobalErrorBox>
        </ErrorOverlay>
      )}
    </AnimatePresence>
  );
};
