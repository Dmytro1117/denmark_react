import { useNavigate } from "react-router-dom";
import { StyledButton } from "../Buttons/Button";
import {
  DescWrapper,
  Title,
  Subtitle,
  ButtonWrapper,
} from "./HeroDescription.styled";

export const HeroDescription = () => {
  const navigate = useNavigate();

  return (
    <DescWrapper>
      <Title>Moving to the country</Title>

      <Subtitle>
        Live. Work. Thrive. Start your journey to the world's happiest country.
        Experience the perfect balance of career growth and Scandinavian quality
        of life. The Danish lifestyle emphasizes community and well-being.
      </Subtitle>

      <ButtonWrapper>
        <StyledButton onClick={() => navigate("/documents")}>
          Get Started
        </StyledButton>
      </ButtonWrapper>
    </DescWrapper>
  );
};
