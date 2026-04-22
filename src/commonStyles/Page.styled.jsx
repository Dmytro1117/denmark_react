import styled from "styled-components";

export const PageSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: ${(props) => props.$maxWidth || "1200px"};
  margin: 0 auto;
  padding: 100px 40px 80px;
  position: relative;
  z-index: 2;

  ${({ theme }) => theme.media.tabletOnly} {
    padding: 80px 70px 60px;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 20px 80px;
    height: auto;
  }
`;

export const PageTitle = styled.h2`
  font-size: 20px;
  letter-spacing: 0.5em;
  color: ${({ theme }) => theme.colors.primaryBlue};
  margin-bottom: 16px;
  border-left: 2px solid ${({ theme }) => theme.colors.primaryBlue};
  padding-left: ${({ theme }) => theme.spacing.lg};
  text-transform: uppercase;

  ${({ theme }) => theme.media.tabletOnly} {
    margin-bottom: 30px;
    font-size: 18px;
    letter-spacing: 0.3em;
  }

  ${({ theme }) => theme.media.mobileOnly} {
    position: static;
    order: 0;
    text-align: center;
    line-height: 1.5;
    border: none;
    border-left: none;
    padding: 0;
    margin: 0 0 10px 0;
    font-size: 18px;
    width: 100%;
    max-width: 320px;

    &::after {
      content: "";
      display: block;
      width: 80px;
      height: 1px;
      background: ${({ theme }) => theme.colors.primaryBlue};
      margin: 10px auto 0;
    }
  }
`;
