import styled, {keyframes} from 'styled-components';

export const Container = styled.div`
  width: inherit;
  margin: 0 1.5rem;
  max-width: 1052px;

  @media (min-width: 700px) {
    margin: 0 4rem;
  }

  @media (min-width: 1200px) {
    margin: 0 auto;
  }
`

export const FadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(25px);
  }

  100% {
    opacty: 1;
    transform: translateY(0);
  }
`;