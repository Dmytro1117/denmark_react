import styled from "styled-components";

export const DetailedContainer = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  min-height: 450px;

  ${({ theme }) => theme.media.tabletOnly} {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
    padding: 0;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
`;

export const AvatarBox = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgSurface};
  position: relative;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    width: 280px;
    height: 280px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    margin: 0 auto;
    border: 2px solid ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${({ theme }) => theme.media.mobileOnly} {
    width: 100%;
    gap: 24px;
  }
`;

export const HeaderInfo = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 20px;

  border-bottom: ${({ theme }) =>
    theme.themeMode === "light"
      ? "1.5px solid rgba(0,0,0,0.08)"
      : `1px solid ${theme.colors.border}`};

  ${({ theme }) => theme.media.mobileOnly} {
    text-align: center;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const UserName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMain};

  ${({ theme }) => theme.media.tabletOnly} {
    font-size: 16px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const UserEmail = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-family: monospace;
  margin: 8px 0 0;
  font-weight: 600;

  ${({ theme }) => theme.media.tabletOnly} {
    font-size: 16px;
    margin: 8px 0 8px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 16px 0 0;
    font-size: 16px;
    opacity: 0.8;
    word-break: break-all;
  }
`;

export const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const StatBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 4px 0;

  ${({ theme }) => theme.media.mobileOnly} {
    background: ${({ theme }) => theme.colors.bgSurface};
    padding: 16px 20px;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Label = styled.span`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: table;
  padding-bottom: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryBlue};

  color: ${({ theme }) =>
    theme.themeMode === "light"
      ? theme.colors.textMain
      : theme.colors.textMuted};

  border-bottom: ${({ theme }) =>
    theme.themeMode === "light"
      ? `2px solid ${theme.colors.secondaryBordeaux}`
      : `1px solid ${theme.colors.primaryBlue}`};

  ${({ theme }) => theme.media.mobileOnly} {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 12px;
  }
`;

export const DocumentationSection = styled.div`
  ${({ theme }) => theme.media.mobileOnly} {
    & > ${Label} {
      display: block;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Value = styled.span`
  font-size: 16px;
  font-family: monospace;
  color: ${(p) => p.$color || p.theme.colors.textMuted};

  ${({ theme }) => theme.media.mobileOnly} {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ControlPanel = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: 20px;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.tabletOnly} {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 8px;
    padding-top: 20px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    button:nth-child(5) {
      display: none;
    }

    button {
      font-size: 13px;
      padding: 12px 0;
      width: 100%;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  ${({ theme }) => theme.media.mobileOnly} {
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-top: none;
    gap: 12px;
    padding-top: 0;
    padding-bottom: 20px;

    button {
      margin: 0 auto;
    }
  }
`;
