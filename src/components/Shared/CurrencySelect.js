import React, { Component } from "react";
// import Select from 'react-select';

import styled from 'styled-components';

const SelectStyled = styled.div`
  width: 100%;

  label {
      font-weight: 600;
      display: block;
      margin-bottom: ${props => props.theme.spacing.xxsm};
    }

  select {
    font-size: ${props => props.theme.fontSizes.textMd};
    background-color: ${props => props.theme.colors.lightPrimary};
    box-shadow: 0px 5px 9px -1px rgba(55, 62, 104, 0.2);
    border: none;
    outline: none;
    border-radius: .25rem;
    padding: ${props => props.theme.spacing.xxsm};
    width: 100%;
    
  }
`;

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.props.onChangeData(e.target.value);
  }

  render() {

    const currencyOptionsList = this.props.currencies.map((currency) => {
      return <option key={currency.code} value={currency.code}>{currency.code} – {currency.name}</option>
    })

    return (
      <SelectStyled>
        <label>
          {this.props.label}
        </label>
        <select 
          value={this.props.value}
          onChange={this.handleSelectChange}
        >
          {currencyOptionsList}
        </select>
      </SelectStyled>
    )
  }
}

export default CurrencySelect;