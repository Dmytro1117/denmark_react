import { Weather } from "../Weather/Weather";
import {
  ModalGrid,
  TopRow,
  ModalSection,
  PosterImage,
  Description,
} from "./PlaceModal.styled";

export const PlaceModal = ({ city, mapType }) => {
  const briefingImage = city.imageUrl || null;
  const weatherPoint = city.weatherQuery || city.name || null;

  return (
    <ModalGrid>
      <TopRow>
        <ModalSection>
          <h3>Poster:</h3>
          {briefingImage && (
            <PosterImage>
              <img src={briefingImage} alt={city.name} />
            </PosterImage>
          )}
        </ModalSection>

        <ModalSection>
          <h3>Telemetry:</h3>
          <Weather city={weatherPoint} mapType={mapType} />
        </ModalSection>
      </TopRow>

      <ModalSection>
        <h3>Description:</h3>
        <Description>{city.description}</Description>
      </ModalSection>
    </ModalGrid>
  );
};
