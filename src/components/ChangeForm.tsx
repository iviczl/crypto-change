import { useState } from "react";
import type { Currency } from "../types/currency";

interface IChangeProps {
  sourceCurrency: Currency;
  targetCurrency: Currency;
  rate: number;
}
function ChangeForm(props: IChangeProps) {
  const [sourceCurrencyAmount, SetSourceCurrencyAmount] = useState(0);
  const [targetCurrencyAmount, SetTargetCurrencyAmount] = useState(0);
  const [actualRate, SetActualRate] = useState(props.rate);
  const change = (
    amount: number,
    rate: number,
    set: Function,
    calculate: Function
  ) => {
    set(amount);
    calculate(amount * rate);
  };
  return (
    <>
      <div className="ms-4 h-75">Chart</div>
      <div className="mt-4 ms-4 h-20">
        <label>
          <input
            className="form-control"
            style={{ display: "inline", width: "auto" }}
            type="number"
            onChange={(e) =>
              change(
                +e.target.value,
                actualRate,
                SetSourceCurrencyAmount,
                SetTargetCurrencyAmount
              )
            }
            value={sourceCurrencyAmount}
          />
          <span className="ms-2">{props.sourceCurrency.code}</span>
        </label>
        <label className="mx-4">=</label>
        <label>
          <input
            className="form-control"
            style={{ display: "inline", width: "auto" }}
            type="number"
            onChange={(e) =>
              change(
                +e.target.value,
                1 / actualRate,
                SetTargetCurrencyAmount,
                SetSourceCurrencyAmount
              )
            }
            value={targetCurrencyAmount}
          />
          <span className="ms-2">{props.targetCurrency.code}</span>
        </label>
      </div>
    </>
  );
}

export default ChangeForm;
