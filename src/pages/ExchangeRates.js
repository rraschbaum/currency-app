import styled from 'styled-components';

import ExchangeRateInputs from "../components/ExchangeRates/ExchangeRateInputs";
import Table from "../components/ExchangeRates/Table";
import PageTitle from "../components/Shared/PageTitle";
import backgroundEllipseRight from '../images/ellipse-desktop-right.png';

import { Container, FadeIn } from '../components/Styles/Styles';

const Main = styled.main`
  background-color: ${props => props.theme.colors.lightPrimary};
  padding-bottom: ${props => props.theme.spacing.xxlg};
  background-image: url(${backgroundEllipseRight});
  background-position: top -20% left 400px;

  .flexContainer {
    display: flex;
    flex-direction: column;
    margin-top: -10rem;
    gap: ${props => props.theme.spacing.sm};
  }

  .card {
    background-color: ${props => props.theme.colors.white};  
    padding: ${props => props.theme.spacing.md};
    border-radius: 8px;
    box-shadow: 0px 4px 22px 10px rgba(55, 62, 104, 0.03);
    animation: .5s ${FadeIn} ease-in;
  }

  #inputs {
      margin-bottom: ${props => props.theme.spacing.sm};
    }
  
  @media ${props => props.theme.mediaQueries.above700} {

    .flexContainer {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }

    #inputs {
      width: 50%;
    }

    #table {
      width: 50%;
    }
  }

  @media ${props => props.theme.mediaQueries.above1000} {
    #inputs {
      width: 40%;
    }

    #table {
      width: 60%;
    }
  }
`;

const ExchangeRates = (props) => {

  const handleBaseChangeData = (baseChangeData) => {
    const baseData = baseChangeData;
    props.onRateChange(baseData);
  }

  const handleAmountChangeData = (amount) => {
    props.onAmountChange(amount);
  }

  return(
    <Main>
      <PageTitle title="Exchange Rates" >
        {props.amount} {props.base}
      </PageTitle>
      <Container>
        <div className='flexContainer'>
          <div className='card' id='inputs'>
            <ExchangeRateInputs
              value={props.amount} 
              onBaseChange={handleBaseChangeData}
              currencies={props.currencies}
              base={props.base}
              selectValue={props.base}
              onAmountChange={handleAmountChangeData}
              amount={props.amount}
            />
          </div>
          <div className='card' id='table'>
            <Table 
              rates={props.rates}
              currencies={props.currencies}
              base={props.base}
              amount={props.amount}
            />
          </div>
        </div>
      </Container>
    </Main>
  )
}

export default ExchangeRates;