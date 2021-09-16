import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { Container } from '../Styles/Styles';

const HeaderStyled = styled.header`
  width: 100%;
  height: 7.75rem;
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.blue};
  
  nav {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    font-weight: 800;
    margin-bottom: 1rem;
    font-size: ${props => props.theme.fontSizes.textXxl};
    color: ${props => props.theme.colors.white};
  }

  .logo a {
      color: white;
    }

  ul {
    font-weight: 600;
    display: flex;
    padding-left: 0;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.lightSecondary};
  }

  li {
    list-style: none;
  }

  li > a {
    border-radius: .25rem;
    padding: ${props => props.theme.spacing.xxsm} ${props => props.theme.spacing.xsm};
  }

  li:not(:last-child) {
    margin-right: 1rem;
  }

  li:hover > a {
    color: ${props => props.theme.colors.lightPrimary};
    background-color: ${props => props.theme.colors.darkBlue};
  }

  .current {
    color: ${props => props.theme.colors.lightPrimary};
    background-color: ${props => props.theme.colors.darkBlue};
  }

  @media (min-width: 700px) {
    height: 5rem;

    nav {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      margin-bottom: 0;
    }

    li {
      margin-left: ${props => props.theme.spacing.xsm};
    }

    li:not(:last-child) {
      margin-right: 0;
    }
  }
`;

const Header = () => {
  return( 
    <HeaderStyled>
      <Container>
        <nav>
          <span className="logo"><NavLink exact to='/'>Current</NavLink></span>
          <ul>
            <li><NavLink exact activeClassName='current' to='/'>Currency Converter</NavLink></li>
            <li><NavLink activeClassName='current' to='/exchange-rate'>Exchange Rate</NavLink></li>
          </ul>
        </nav>
      </Container>
    </HeaderStyled>
  ); 
}

export default Header;