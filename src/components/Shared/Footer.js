import styled from 'styled-components';

import { Container } from '../Styles/Styles'

const FooterStyled = styled.footer`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.textLg};
  color: ${props => props.theme.colors.darkSecondary};
  padding-top: ${props => props.theme.spacing.xlg};
  padding-bottom: ${props => props.theme.spacing.xlg};

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .credit {
    margin-bottom: ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.textXsm};
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    list-style: none;
    margin-left: 0;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.darkSecondary};
  }

  @media ${props => props.theme.mediaQueries.above700} {
    font-size: ${props => props.theme.fontSizes.textSm};
    padding-top: ${props => props.theme.spacing.lg};

    .wrapper {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .credit {
      margin-bottom: 0;
    }

    ul {
      flex-direction: row;
    }

    li {
      margin-bottom: 0;
    }

    li:not(:first-child) {
      margin-left: ${props => props.theme.spacing.sm};
    }
  }
`

function Footer() {
  return (
    <FooterStyled>
      <Container>
        <div className='wrapper'>
          <p className='credit'>project built by Ryan Raschbaum</p>
          <ul>
            <li><a href="https://github.com/rraschbaum" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/ryan-raschbaum-0903b887/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul> 
        </div>     
      </Container>
    </FooterStyled>
  );
}

export default Footer;