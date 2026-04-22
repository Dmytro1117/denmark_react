import styled from "styled-components";

export const FileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  margin-top: -5px;
  margin-bottom: 20px;

  ${({ theme }) => theme.media.mobileOnly} {
    align-items: center;
    margin-bottom: 15px;
  }
`;

export const FileName = styled.span`
  font-size: 11px;
  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.textMain
      : theme.colors.primaryBlue};
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 600;
  padding-left: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 10px;
    max-width: 100%;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;
