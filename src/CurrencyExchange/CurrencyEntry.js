import React from "react";
import "./index.css";
import { numberWithCommas, currencies } from "./helper.js";
import { number, string, func } from "prop-types";

/**
 * A React Component to render added Currency Entries
 * @param props React props
 * @param props.value value of input, used for calculating converted value
 * @param props.rate rate of this currency
 * @param props.curType currency Code to display
 * @param props.onDeleteClick Event handler to be called when delete button is clicked
 * @param props.index index of this currency entry
 * @author Nickson Dalimarta
 */
const CurrencyEntry = props => {
  const { value, rate, curType, onDeleteClick, index } = props;
  var newValue = Number(value) * Number(rate);

  return (
    <div className="entry">
      <div className="entry__info-box">
        <div className="entry__info-first">
          <div>{curType}</div>
          <div className="entry__new-value">{numberWithCommas(newValue)}</div>
        </div>
        <div className="entry__info-second">
          {`${curType} - ${currencies[curType]}`}
        </div>
        <div className="entry__info-third">{`1 USD = ${curType} ${rate}`}</div>
      </div>
      <div className="entry__delete-box" onClick={() => onDeleteClick(index)}>
        <div>(-)</div>
      </div>
    </div>
  );
};

CurrencyEntry.propTypes = {
  curType: string.isRequired,
  index: number.isRequired,
  onDeleteClick: func.isRequired,
  rate: number.isRequired,
  value: number.isRequired,
};

export default CurrencyEntry;
