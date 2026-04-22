import {
  ContainerBar,
  HeaderBar,
  CountryBar,
  PercentBar,
  BarBackground,
  BarFill,
} from "./MiniBarProgress.styled";

export const MiniBarProgress = ({ label, percent, color }) => (
  <ContainerBar>
    <HeaderBar>
      <CountryBar>{label}</CountryBar>
      <PercentBar>{percent}%</PercentBar>
    </HeaderBar>
    <BarBackground>
      <BarFill $color={color} $percent={percent} />
    </BarBackground>
  </ContainerBar>
);
