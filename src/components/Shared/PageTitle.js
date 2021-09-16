import styled from 'styled-components';
import { Container } from '../Styles/Styles';

import { FadeIn } from '../Styles/Styles'

const StyledPageTitle = styled.div`
  padding-top: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.jumboMobile};
  background-color: ${props => props.theme.colors.darkBlue};
  text-align: center;
  border-bottom: 1px ${props => props.theme.colors.secondaryMed} solid;
  border-bottom-right-radius: 32px;

  h1 {
    font-size: ${props => props.theme.fontSizes.titleSm};
    font-weight: 500;
    color: ${props => props.theme.colors.lightPrimary};
    margin-bottom: ${props => props.theme.spacing.xsm};
    animation: .5s ${FadeIn} ease-in;
  }

  h2 {
    font-size: ${props => props.theme.fontSizes.textXl};
    color: ${props => props.theme.colors.lightSecondary};
    padding-bottom: ${props => props.theme.spacing.lg};
    animation: .5s ${FadeIn} ease-in;
  }

  @media ${props => props.theme.mediaQueries.above700} {
    padding-bottom: ${props => props.theme.spacing.jumboDesktop};
    border-bottom-right-radius: 96px;
    
    h1 {
      font-size: 4rem;
      margin-bottom: ${props => props.theme.spacing.xsm};
    }
    h2 {
      font-size: ${props => props.theme.fontSizes.textXxl};
    }
  }
`;

const PageTitle = (props) => {
  return (
    <StyledPageTitle>
      <Container>
        <h1>{props.title}</h1>
        <h2>{props.children}</h2>
      </Container>
    </StyledPageTitle>
  )
}

export default PageTitle;