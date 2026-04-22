import { useDocuments } from "../../helpers/hooks";
import {
  DocItem,
  StatBlock,
  DocLabel,
  Value,
  ProgressBase,
  ProgressFill,
} from "./UserProfileDocItem.styled";

export const UserProfileDocItem = ({ doc }) => {
  const { percentProgress } = useDocuments(doc.value);
  return (
    <DocItem>
      <StatBlock style={{ border: "none", padding: 0 }}>
        <DocLabel>{doc.label}</DocLabel>
        <Value $color={doc.color}>{percentProgress}%</Value>
      </StatBlock>
      <ProgressBase>
        <ProgressFill $percent={percentProgress} $color={doc.color} />
      </ProgressBase>
    </DocItem>
  );
};
