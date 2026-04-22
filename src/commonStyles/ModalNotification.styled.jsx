import styled from "styled-components";

export const ModalContentWrapper = styled.div`
  text-align: center;
  min-height: 100px;
  position: relative;
`;

export const ModalText = styled.p`
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 16px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.5;

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 20px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const ModalHint = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 18px;
  }
`;
