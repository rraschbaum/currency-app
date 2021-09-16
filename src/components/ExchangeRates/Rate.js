import React from "react";

import styled from 'styled-components';

const TableRowStyled = styled.tr`
color: ${props => props.theme.colors.darkPrimary};  
  border-bottom: 1px ${props => props.theme.colors.secondaryMed} solid;

  td {
    padding: ${props => props.theme.spacing.xxsm} 0;
  }

  .value {
    text-align: right;
  }
`;

const Rate = (props) => {
  return (
    <TableRowStyled>
      <td className="currency">{props.currency}</td>
      <td className="value">{props.value}</td>
    </TableRowStyled>
  );
};

export default Rate;