import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.media.tabletOnly} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }

  ${({ theme }) => theme.media.mobileOnly} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
    padding: 10px 0;
  }
`;

export const Item = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgSurface};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  cursor: pointer;
  padding: 0;

  transition:
    transform ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderActive};

    img {
      transform: scale(1.01);
    }
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    display: block;
    opacity: 0.95;
    transition: transform ${({ theme }) => theme.transitions.slow};

    ${({ theme }) => theme.media.mobileOnly} {
      height: 110px;
    }
  }
`;
