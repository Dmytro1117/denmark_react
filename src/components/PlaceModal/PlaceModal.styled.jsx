import styled from "styled-components";

export const ModalGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 100%;

  ${({ theme }) => theme.media.mobileOnly} {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: stretch;

  ${({ theme }) => theme.media.tabletOnly} {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  h3 {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    display: block;
    border: none;
    padding: 0;

    ${({ theme }) => theme.media.tabletOnly} {
      margin-bottom: ${({ theme }) => theme.spacing.md};
      font-size: 12px;
      letter-spacing: 2px;
    }

    ${({ theme }) => theme.media.mobileOnly} {
      color: ${({ theme }) => theme.colors.primaryBlue};
      border-bottom: 1px solid ${({ theme }) => theme.colors.primaryBlue};
      font-size: 11px;
    }
  }
`;

export const PosterImage = styled.div`
  flex: 1;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  overflow: hidden;
  position: relative;
  min-height: 304px;

  ${({ theme }) => theme.media.tabletOnly} {
    min-height: 240px;
    height: 100%;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    min-height: 200px;
    aspect-ratio: 16 / 9;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.4) contrast(1.1);
    opacity: 0.85;
  }
`;

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 300;
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  word-break: break-word;
  white-space: normal;
  text-align: justify;

  ${({ theme }) => theme.media.mobileOnly} {
    border-top: none;
    font-size: 14px;
    line-height: 1.6;
    padding-top: 0;
    text-align: justify;
  }
`;
