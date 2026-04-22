import { MiniBarProgress } from "../MiniBarProgress/MiniBarProgress";
import { useDocuments } from "../../helpers/hooks";

export const DocumentMiniBar = ({ option }) => {
  const { percentProgress } = useDocuments(option.value);
  return (
    <MiniBarProgress
      label={option.value}
      percent={percentProgress}
      color={option.color}
    />
  );
};
