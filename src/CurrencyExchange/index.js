import React, { Component, Fragment } from "react";
import "./index.css";
import CurrencyEntry from "./CurrencyEntry";
import { numberWithCommas, currencies } from "./helper";

/**
 * A React Component to render Currency Exchange App that calculates a converted foreign exchange currency
 * @author Nickson Dalimarta
 * @state props.index index of this currency entry
 */
class CurrencyExhange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      rates: [],
      isAddingNewCurrency: false,
      isEditingInput: false,
      curList: [],
      inputValue: 10,
      handledCurrencies: Object.keys(currencies)
    };

    this.selectRef = React.createRef();
  }

  /* LIFE CYCLE METHODS */

  /** Fetches data of currencies */
  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=USD")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            rates: result.rates
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  /* ACTION HANDLER METHODS */

  /** Sets to edit mode when user click on value */
  onCurValClick = () => {
    this.setState({ isEditingInput: true });
  };

   /** Removes select entry, releases this currency back to the pool of currencies */
  onRemoveEntry = index => {
    const { curList, handledCurrencies } = this.state;

    const removedCur = curList.splice(index, 1);
    handledCurrencies.push(removedCur);
    this.setState({ curList });
  };

  /** Confirms user input when user presses enter on edit mode. If input is invalid, sets to default value, 10 */
  onInputKeyPress = e => {
    if (e.key === "Enter") {
      const newInput = parseInt(e.target.value, 10);
      if (newInput) {
        this.setState({ inputValue: newInput, isEditingInput: false });
      } else {
        this.setState({ inputValue: 10, isEditingInput: false });
      }
    }
  };

  /** Adds select currency entry, removes select currency from the pool of currencies */
  onSubmitClick = () => {
    const { curList, handledCurrencies } = this.state;

    const curNode = this.selectRef.current;
    const deletedCurType = curNode.options[curNode.selectedIndex].value;
    handledCurrencies.splice(handledCurrencies.indexOf(deletedCurType), 1);
    curList.push(deletedCurType);
    this.setState({ curList, isAddingNewCurrency: false });
  };

  /** Changes to add mode when user clicks on 'add currencies' button */
  onAddNewCurrencyClick = () => {
    this.setState({ isAddingNewCurrency: true });
  };

  onInputChange = val => {
    return val;
  };

  /* SUB-RENDER METHODS */

  /** Generates added currency entries */
  renderCurrencyEntries = () => {
    const { curList, inputValue, rates } = this.state;

    return (
      <Fragment>
        {curList.map((curType, index) => (
          <CurrencyEntry
            key={`${curType}-${index}`}
            curType={curType}
            rate={rates[curType]}
            value={inputValue}
            index={index}
            onDeleteClick={this.onRemoveEntry}
          />
        ))}
      </Fragment>
    );
  };

  /** Generates available options of currencies for user to pick from */
  renderCurrencyOption = () => {
    const { handledCurrencies } = this.state;

    return (
      <div className="add-new-btn">
        <select ref={this.selectRef} className="currency-list">
          {handledCurrencies.map((key, index) => (
            <option key={`${key}-${index}`}>{key}</option>
          ))}
        </select>
        <div className="submit-btn" onClick={this.onSubmitClick}>
          Submit
        </div>
      </div>
    );
  };

  /* RENDER METHOD */

  render() {
    const {
      error,
      isAddingNewCurrency,
      isEditingInput,
      inputValue,
      handledCurrencies
    } = this.state;

    return (
      <Fragment>
        {!error ? (
          <div className="container">
            <div className="header">
              <div className="header__title">USD - United States Dollars</div>
              <div className="header__input">
                <div className="inline-top">USD</div>
                <div className="input">
                  {!isEditingInput ? (
                    <div
                      className="input__display"
                      onClick={this.onCurValClick}
                    >
                      {numberWithCommas(inputValue)}
                    </div>
                  ) : (
                    <input
                      className="input__input"
                      defaultValue={inputValue}
                      onKeyPress={this.onInputKeyPress}
                      onChange={() => {
                        this.onInputChange(inputValue);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="header__help">
                (Click on value to edit, then press enter to confirm your desired
                new value)
              </div>
            </div>

            <div className="content">
              {this.renderCurrencyEntries()}
              {!isAddingNewCurrency ? (
                handledCurrencies.length > 0 &&
                <div className="add-new-btn" onClick={this.onAddNewCurrencyClick}>
                  (+) Add More Currencies
                </div>                
              ) : (
                this.renderCurrencyOption()
              )}
            </div>
          </div>
        ) : (
          <div>API Failed to fetch data!</div>
        )}
      </Fragment>
    );
  }
}

export default CurrencyExhange;
