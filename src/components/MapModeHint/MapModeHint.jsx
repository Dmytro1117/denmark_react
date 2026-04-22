import { hintMapVariants } from "../../helpers/animations";
import { AddModeHint } from "./MapModelHint.styled";

const HINTS = {
  add: {
    text: "Click on the map to place a hotspot",
    sub: "Esc — exit",
  },
  edit: {
    text: "Click to edit",
    sub: "Esc — exit",
  },
  delete: {
    text: "Select a hotspot to delete",
    sub: "Esc — exit",
  },
};

export const MapModeHint = ({ mode }) => {
  const hint = HINTS[mode];

  if (!hint) return null;

  return (
    <AddModeHint
      key={mode}
      variants={hintMapVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {hint.text}
      <span>{hint.sub}</span>
    </AddModeHint>
  );
};
