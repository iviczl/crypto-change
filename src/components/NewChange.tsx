import { useState } from "react";
import { Currency } from "../types/currency";
import { useAppDispatch } from "../hooks/useTypeSelector";
import { addCurrency } from "../userReducer";

interface INewChange {
  currencies: Currency[];
}
function NewChange(props: INewChange) {
  const availableCurrencies = props.currencies;
  const currencyOption = (currency: Currency) => {
    return (
      <option value={currency.code} key={currency.code}>
        {currency.name}
      </option>
    );
  };
  const dispatch = useAppDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const addCryptoCurrency = async () => {
    const currency = availableCurrencies.find(
      (c) => c.code === selectedCurrency
    );
    if (currency) {
      await dispatch(addCurrency(currency));
    }
  };
  return (
    <>
      <div className="container-sm mx-4 my-4 row g-3">
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="" key="">
              Choose a currency
            </option>
            {availableCurrencies.map((c) => currencyOption(c))}
          </select>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => addCryptoCurrency()}
          >
            Add Currency
          </button>
        </div>
      </div>
    </>
  );
}

export default NewChange;
