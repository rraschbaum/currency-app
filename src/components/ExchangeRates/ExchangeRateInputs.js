import styled from 'styled-components';

import AmountInput from '../Shared/AmountInput';
import CurrencySelect from '../Shared/CurrencySelect';

const Container = styled.div`
  @media ${props => props.theme.mediaQueries.above700} {
    width: 100%;
  }
`;

const ExchangeRateInputs = (props) => {

  const handleBaseChangeData = (baseChangeData) => {
    const baseData = baseChangeData;
    props.onBaseChange(baseData);
  }

  const handleAmountChangeData = (amount) => {
    props.onAmountChange(amount);
  }

  return(
    <Container> 
      <AmountInput 
        label="Amount"
        onAmountChange={handleAmountChangeData}
        amount={props.amount}
      /> <br />
      <CurrencySelect
        label="From"
        value={props.base}
        onChangeData={handleBaseChangeData}
        currencies={props.currencies}
      />
    </Container>
  )
}

export default ExchangeRateInputs;