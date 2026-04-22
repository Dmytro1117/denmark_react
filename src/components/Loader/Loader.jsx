import { InlineWrapper, Spinner, FullscreenWrapper } from "./Loader.styled";

export const Loader = ({ fullscreen = true }) => {
  if (!fullscreen) {
    return (
      <InlineWrapper>
        <Spinner />
      </InlineWrapper>
    );
  }

  return (
    <FullscreenWrapper>
      <Spinner />
    </FullscreenWrapper>
  );
};
