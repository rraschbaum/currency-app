import styled from 'styled-components';
import AmountInput from '../Shared/AmountInput'
import CurrencySelect from '../Shared/CurrencySelect';

import { IoSwapHorizontalSharp, IoSwapVerticalSharp } from 'react-icons/io5';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: ${props => props.theme.spacing.xsm};
  margin-bottom: ${props => props.theme.spacing.sm};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: ${props => props.theme.colors.rule} 1px solid;
  
  button {
    background-color: ${props => props.theme.colors.blue};
    font-size: 1.25rem;
    color: white;
    padding: .45rem .45rem;
    border: none;
    border-radius: .25rem;
    box-shadow: 0px 5px 9px -1px rgba(55, 62, 104, 0.2);
    cursor: pointer;
  }

  .mobileIcon {
    display: block;
  }

  .desktopIcon {
    display: none;
  }

  @media ${props => props.theme.mediaQueries.above700} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${props => props.theme.spacing.md};
    padding-bottom: ${props => props.theme.spacing.md};

    .mobileIcon {
      display: none;
    }

    .desktopIcon {
      display: block;
    }
  }

`;

const CurrencyConverterInputs = (props) => {

  const handleBaseChangeData = (baseChangeData) => {
    const baseData = baseChangeData;
    props.onBaseChange(baseData);
  }

  const handleCompareChangeData = (compareChangeData) => {
    const compareData = compareChangeData;
    props.onCompareChange(compareData);
  }

  const handleSwapValuesData = () => {
    const swapedValues = {
      base: props.compare,
      compare: props.base,
      rate: props.reverseRate,
      reverseRate: props.rate
    }
    props.onClickSwap(swapedValues);
  }

  const handleAmountChange = (amount) => {
    props.onAmountChange(amount);
  }
  
  return(
    <Wrapper>
      <AmountInput 
        label="Amount"
        amount={props.amount}
        onAmountChange={handleAmountChange}
      />
      <CurrencySelect
        currencies={props.currencies}
        label="from"
        value={props.base}
        onChangeData={handleBaseChangeData}
      />
      <div className='buttonWrapper'>
        <button
          onClick={handleSwapValuesData}
        >
          <IoSwapHorizontalSharp className='desktopIcon' />
          <IoSwapVerticalSharp className='mobileIcon' />
        </button>
      </div>
      <CurrencySelect
        currencies={props.currencies} 
        label="to"
        value={props.compare}
        onChangeData={handleCompareChangeData}
      />
    </Wrapper>
  );
}

export default CurrencyConverterInputs;