import CurrencyConverterInputs from "../components/CurrencyConverter/CurrencyConverterInputs";
import ConversionResults from "../components/CurrencyConverter/ConversionResults";
import PageTitle from "../components/Shared/PageTitle";
import backgroundEllipseRight from '../images/ellipse-desktop-right.png';

import styled from 'styled-components';
import { Container, FadeIn } from '../components/Styles/Styles';

const Main = styled.main`
  background-color: ${props => props.theme.colors.lightPrimary};
  padding-bottom: ${props => props.theme.spacing.xxlg};
  background-image: url(${backgroundEllipseRight});
  background-position: top -20% left 400px;

  .card {
    background-color: ${props => props.theme.colors.white};
    margin-top: -10rem;
    padding: ${props => props.theme.spacing.md};
    border-radius: 8px;
    box-shadow: 0px 4px 22px 10px rgba(55, 62, 104, 0.03);
    animation: .5s ${FadeIn} ease-in;
  }
`;

const CurrencyConverter = (props) => {

  const handleBaseChangeData = (baseChangeData) => {
    const baseData = baseChangeData;
    props.onBaseChange(baseData);
  }

  const handleCompareChangeData = (compareChangeData) => {
    const compareData = compareChangeData;
    props.onCompareChange(compareData);
  }

  const handleSwapValuesChangeData = (swapedValues) => {
    props.onClickSwap(swapedValues);
  }

  const handleAmountChangeData = (amount) => {
    props.onAmountChange(amount);
  }

  return(
    <Main>
      <PageTitle title="Currency Converter">
        {props.base} {props.currency} to {props.compare}
      </PageTitle>
      <Container>
        <div className='card'>
          <CurrencyConverterInputs
            currencies={props.currencies}
            base={props.base}
            compare={props.compare}
            amount={props.amount}
            rate={props.rate}
            reverseRate={props.reverseRate}
            onBaseChange={handleBaseChangeData}
            onCompareChange={handleCompareChangeData}
            onClickSwap={handleSwapValuesChangeData}
            onAmountChange={handleAmountChangeData}
          />
          <ConversionResults
            amount={props.amount}
            base={props.base}
            compare={props.compare}
            currencies={props.currencies}
            rate={props.rate}
            reverseRate={props.reverseRate}
          />
        </div>
      </Container>
    </Main>
  )
}

export default CurrencyConverter;