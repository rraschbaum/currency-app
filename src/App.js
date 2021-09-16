import  React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Header from './components/Shared/Header';
import CurrencyConverter from './pages/CurrencyConverter';
import ExchangeRates from './pages/ExchangeRates';
import Footer from './components/Shared/Footer';
import { checkStatus, json } from "./utils/utils";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: '',
      compare: '',
      amount: '',
      rate: '',
      reverseRate: '',
      currencies: [
        {
          code: '',
          name: ''
        }
      ],
      rates: [
        {
          currency: '',
          rate: ''
        }
      ]
    }

    this.handleBaseChange = this.handleBaseChange.bind(this);
    this.handleCompareChange = this.handleCompareChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleSwapedValues = this.handleSwapedValues.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  // Set intial state data
  componentDidMount() {
    Promise.all([
      // get latest rates from default base, USD
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=USD`),
      // get list of currencies for select options
      fetch('https://altexchangerateapi.herokuapp.com/currencies'),
      // get rates for default conversion pair, USD => EUR
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=USD&to=EUR`),
      // get rates for default reverse conversion pair, EUR => USD
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=EUR&to=USD`)
    ])
      .then(function(responses) {
        return Promise.all(responses.map(json));
      })
      .then(([ratesData, currenciesData, conversionData, reverseConversionData]) => {

        const rates = [];
        const currencies = [];
        const amount = conversionData.amount;
        const base = conversionData.base;
        const [compare] = Object.keys(conversionData.rates);
        const [rate] = Object.values(conversionData.rates);
        const [reverseRate] = Object.values(reverseConversionData.rates);
        
        // Get and display latest rate data for table
        Object.entries(ratesData.rates).forEach(([key, value]) => {
          rates.push({
            currency: key,
            rate: value
          });
        })
        
        // Get and display currencies for select inputs
        Object.entries(currenciesData).forEach(([key, value]) => {
          currencies.push({
            code: key,
            name: value
          });
        })

        this.setState({ 
          rates, 
          currencies, 
          amount, 
          base, 
          rate, 
          reverseRate, 
          compare 
        });
      })
  }

  // Update after selecting new base currency
  handleBaseChange(base) {
    this.setState({base})
    fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${this.state.amount}&from=${base}&to=${this.state.compare}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        const [rate] = Object.values(data.rates);
        this.setState({rate});
      })
  }

  // Update after selecting new comparison currency
  handleCompareChange(compare) {
    this.setState({compare})
    fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${this.state.amount}&from=${this.state.base}&to=${compare}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        const [rate] = Object.values(data.rates);
        this.setState({rate});
      })
  }

  // Update after clicking swap button on convertor page
  handleSwapedValues(swapedValues) {

    const {
      base, 
      compare, 
      rate, 
      reverseRate
    } = swapedValues;

    this.setState({
      base, 
      compare, 
      rate, 
      reverseRate
    });
  }

  // Update after changing amount in inputs
  handleAmountChange(amount) {

    // Make sure user has entered an amount that is not null or 0
    if (amount > 0 && amount !== '') {
      this.setState({amount});
      Promise.all([
        fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${amount === '' ? this.state.amount : amount}&from=${this.state.base}`),
        fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${amount === '' ? this.state.amount : amount}&from=${this.state.base}&to=${this.state.compare}`)
      ])
        .then(function(responses) {
          return Promise.all(responses.map(json));
        })
        .then(([rateData, convertData]) => {
          
          // rateData variable
          const rates = [];

          // convertData variables
          const rateValue = convertData.rates;
          const key = Object.keys(rateValue)[0];
          const rate = rateValue[key];
          
          // Update rates based on amount input
          Object.entries(rateData.rates).forEach(([key, value]) => {
            rates.push( {
              currency: key,
              rate: value
            });
          })
          this.setState({ rates, rate })
        })
    }
  }

  // Update rates table after changing base currency
  handleRateChange(base) {
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        const rates = [];
        Object.entries(data.rates).forEach(([key, value]) => {
          rates.push( {
            currency: key,
            rate: value
          } );
        })
        this.setState({ base, rates })
        console.log(rates);
      })
  }

  render() {

    const { 
      currencies, 
      base, 
      compare, 
      amount, 
      rates,
      rate,
      reverseRate 
    } = this.state;

    return(
      <React.Fragment>
        <Header />
          <Switch>
            <Route path="/" exact>
              <CurrencyConverter
                currencies={currencies}
                base={base}
                compare={compare}
                onBaseChange={this.handleBaseChange}
                onCompareChange={this.handleCompareChange}
                amount={amount}
                onClickSwap={this.handleSwapedValues}
                onAmountChange={this.handleAmountChange}
                rate={rate}
                reverseRate={reverseRate}
              />
            </Route>
            <Route path="/exchange-rate">
              <ExchangeRates
                currencies={currencies}
                base={base}
                compare={compare}
                amount={amount}
                rates={rates}
                onRateChange={this.handleRateChange}
                onAmountChange={this.handleAmountChange}
              />
            </Route>  
          </Switch>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App;
