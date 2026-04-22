// 1. Libraries
import { AnimatePresence } from "framer-motion";

// 2. Helpers, Hooks & API
import { containerPercentVariants } from "../../helpers/animations";
import { countryOptions } from "../../helpers/constant";

// 3. Styled Components
import {
  PercentValue,
  ProgressLine,
  ProgressFill,
  ProgressContainer,
} from "./ProgressBar.styled";

export const ProgressBar = ({ percent, country, customColor }) => {
  const currentCountry = countryOptions.find((opt) => opt.value === country);
  const activeColor =
    customColor || currentCountry?.color || countryOptions[0].color;

  return (
    <ProgressContainer>
      <AnimatePresence mode="popLayout">
        <PercentValue
          key={percent}
          $color={activeColor}
          initial="hidden"
          animate="visible"
          variants={containerPercentVariants}
        >
          {percent}%
        </PercentValue>
      </AnimatePresence>
      <ProgressLine>
        <ProgressFill $width={percent} $color={activeColor} />
      </ProgressLine>
    </ProgressContainer>
  );
};
