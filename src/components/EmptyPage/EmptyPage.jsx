import { fadeVariants } from "../../helpers/animations";
import { EmptyWrapper, Title, Text, StaticOverlay } from "./EmptyPage.styled";

export const EmptyPage = ({
  title = "Information",
  text = "The content is currently empty.",
}) => {
  return (
    <StaticOverlay>
      <EmptyWrapper
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Title>{title}</Title>
        <Text>{text}</Text>
      </EmptyWrapper>
    </StaticOverlay>
  );
};
