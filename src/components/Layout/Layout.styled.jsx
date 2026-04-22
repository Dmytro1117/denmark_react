import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

export const Content = styled.main`
  width: 100%;
  position: relative;
  z-index: 0;
  min-height: 100vh;
`;

export const GlobalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.globalOverlay};
  z-index: 1;
  pointer-events: none;
`;
