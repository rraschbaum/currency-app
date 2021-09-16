import React, { Component } from 'react';

import styled from 'styled-components';

const InputStyled = styled.div`
  width: 100%;

  label {
    color: ${props => props.theme.colors.darkPrimary};
    font-weight: 600;
    display: block;
    margin-bottom: ${props => props.theme.spacing.xxsm};
  }

  input {
    box-sizing: border-box;
    font-size: ${props => props.theme.fontSizes.textMd};
    background-color: ${props => props.theme.colors.lightPrimary};
    box-shadow: 0px 5px 9px -1px rgba(55, 62, 104, 0.2);
    width: 100%;
    border: none;
    outline: none;
    border-radius: .25rem;
    padding: ${props => props.theme.spacing.xxsm};
  }
`;

class AmountInput extends Component {
  constructor(props) {
    super(props);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleAmountChange(e) {
    this.props.onAmountChange(e.target.value);
  }

  render() {
    return(
      <InputStyled>
        <label>{this.props.label}</label>
        <input
          type="number"
          min="1"
          onChange={this.handleAmountChange}
          value={this.props.amount}
        />
      </InputStyled>
    )
  }
}

export default AmountInput;