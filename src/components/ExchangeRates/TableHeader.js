import styled from 'styled-components';

const TableHeadStyled = styled.thead`
  color: ${props => props.theme.colors.darkPrimary};
  border-bottom: 1px ${props => props.theme.colors.secondaryMed} solid;
  
  th {
    padding-bottom: ${props => props.theme.spacing.xxsm};
  }

  .amount {
    text-align: right;
  }

`;

const TableHeader = (props) => {
  return (
    <TableHeadStyled>
      <tr>
        <th>{props.base}</th>
        <th className='amount'>{props.amount}</th>
      </tr>
    </TableHeadStyled>
  )
}

export default TableHeader;