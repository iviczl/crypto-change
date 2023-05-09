import { useState } from "react";
import type { Currency } from "../types/currency";

interface IChangeProps {
  sourceCurrency: Currency;
  targetCurrency: Currency;
}
function ChangeForm(props: IChangeProps) {
  const [sourceCurrencyAmount, SetSourceCurrencyAmount] = useState(0);
  const [targetCurrencyAmount, SetTargetCurrencyAmount] = useState(0);
  return (
    <>
      <div className="mt-4 ms-4">
        <label>
          <input
            className="form-control"
            style={{ display: "inline", width: "auto" }}
            type="number"
            onChange={(e) => SetSourceCurrencyAmount(+e.target.value)}
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
            onChange={(e) => SetTargetCurrencyAmount(+e.target.value)}
            value={targetCurrencyAmount}
          />
          <span className="ms-2">{props.targetCurrency.code}</span>
        </label>
      </div>
    </>
  );
}

export default ChangeForm;
