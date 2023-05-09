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
      <div>currency</div>
      <article>
        <p>
          <label>
            {props.sourceCurrency.name}
            <input
              type="number"
              onChange={(e) => SetSourceCurrencyAmount(+e.target.value)}
              value={sourceCurrencyAmount}
            />
          </label>
          <label>&lt;=&gt;</label>
          <label>
            {props.targetCurrency.name}
            <input
              type="number"
              onChange={(e) => SetTargetCurrencyAmount(+e.target.value)}
              value={targetCurrencyAmount}
            />
          </label>
        </p>
      </article>
    </>
  );
}

export default ChangeForm;
