import styled from 'styled-components';

import Rate from './Rate';
import TableHeader from './TableHeader';

const TableStyled = styled.table`
  border-collapse: collapse;
  width: 100%;
  @media ${props => props.theme.mediaQueries.above700} {
  }
`;

const Table = (props) => {
  const rateList = props.rates.map((rate, index) => (
    <Rate
      key={index}
      currency={rate.currency}
      value={rate.rate}
    />
  ))

  return (
    <TableStyled>
      <TableHeader 
        base={props.base}
        amount={props.amount}
      />
      <tbody>
        {rateList}
      </tbody>
    </TableStyled>
  )
}

export default Table;