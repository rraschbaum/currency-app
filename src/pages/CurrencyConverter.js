import React, { Component } from 'react';

import CurrencyConverterInputs from "../components/CurrencyConverter/CurrencyConverterInputs";
import ConversionResults from "../components/CurrencyConverter/ConversionResults";
import PageTitle from "../components/Shared/PageTitle";
import backgroundEllipseRight from '../images/ellipse-desktop-right.png';

import { checkStatus, json } from '../utils/utils'

import styled from 'styled-components';
import { Container, FadeIn } from '../components/Styles/Styles';

import Chart from 'chart.js/auto';

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

  .chart {
    margin-top: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing.md};
    border-radius: 8px;
    box-shadow: 0px 4px 22px 10px rgba(55, 62, 104, 0.03);
  }
`;

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();

    this.handleBaseChangeData = this.handleBaseChangeData.bind(this);
    this.handleCompareChangeData = this.handleCompareChangeData.bind(this);
    this.handleSwapValuesChangeData = this.handleSwapValuesChangeData.bind(this);
    this.handleAmountChangeData = this.handleAmountChangeData.bind(this);
  }

  getHistoricalRates(base, compare) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${compare}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[compare]);
        const chartLabel = `${base}/${compare}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }

  buildChart(labels, data, label) {
    // const chartRef = this.chartRef.current.getContext('2d');

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }

  componentDidMount() {
    this.getHistoricalRates(this.props.base, this.props.compare);
  }

  handleBaseChangeData(baseChangeData) {
    const baseData = baseChangeData;
    this.props.onBaseChange(baseData);
    this.getHistoricalRates(baseChangeData, this.props.compare);
  }

  handleCompareChangeData(compareChangeData) {
    const compareData = compareChangeData;
    this.props.onCompareChange(compareData);
    this.getHistoricalRates(this.props.base, compareData);
  }

  handleSwapValuesChangeData(swapedValues) {
    this.props.onClickSwap(swapedValues);
    console.log(swapedValues.base);
    console.log(swapedValues.compare);
    this.getHistoricalRates(swapedValues.base, swapedValues.compare);
  }

  handleAmountChangeData(amount) {
    this.props.onAmountChange(amount);
  }

  render() {
    return (
      <Main>
      <PageTitle title="Currency Converter">
        {this.props.base} {this.props.currency} to {this.props.compare}
      </PageTitle>
      <Container>
        <div className='card'>
          <CurrencyConverterInputs
            currencies={this.props.currencies}
            base={this.props.base}
            compare={this.props.compare}
            amount={this.props.amount}
            rate={this.props.rate}
            reverseRate={this.props.reverseRate}
            onBaseChange={this.handleBaseChangeData}
            onCompareChange={this.handleCompareChangeData}
            onClickSwap={this.handleSwapValuesChangeData}
            onAmountChange={this.handleAmountChangeData}
          />
          <ConversionResults
            amount={this.props.amount}
            base={this.props.base}
            compare={this.props.compare}
            currencies={this.props.currencies}
            rate={this.props.rate}
            reverseRate={this.props.reverseRate}
          />
        </div>
        <div className='chart'>
          <canvas ref={this.chartRef} />
        </div>
      </Container>
    </Main>
    );
  }
}

export default CurrencyConverter;
