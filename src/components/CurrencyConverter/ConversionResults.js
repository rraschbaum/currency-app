import styled from 'styled-components';

const ResultsStyled = styled.div`

  h3 {
    font-size: ${props => props.theme.fontSizes.textMd};
    color: ${props => props.theme.colors.darkSecondary};
  }

  h2 {
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.textXxl};
    color: ${props => props.theme.colors.darkPrimary};
  }

  .currency {
    font-weight: 600;
    margin-bottom: ${props => props.theme.spacing.xxsm};
  }

  .reverseRate {
    font-weight: 400;
  }

`;

const ConversionResults = (props) => {
  
  return(
    <ResultsStyled>
      <h3 className='currency'>{props.amount} {props.base} =</h3>
      <h2>{props.rate} {props.compare}</h2>
      <h3 className='reverseRate'>{props.amount} {props.compare} = {props.reverseRate} {props.base}</h3>
    </ResultsStyled>
  )
}

export default ConversionResults;