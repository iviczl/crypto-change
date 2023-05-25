import { MutableRefObject, useRef, useState } from "react";
import type { Currency } from "../types/currency";
import { useAppDispatch } from "../hooks/useTypeSelector";
import { removeUserCurrency } from "../userSlice";

interface IChangeProps {
  sourceCurrency: Currency;
  targetCurrency: Currency;
  rate: number;
}
function ChangeForm(props: IChangeProps) {
  const deleteDialog: MutableRefObject<HTMLDialogElement | null> = useRef(null);
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
  const dispatch = useAppDispatch();

  const deleteCurrency = async () => {
    await dispatch(removeUserCurrency(props.targetCurrency.code));
  };

  return (
    <>
      {/* className="modal-dialog modal-dialog-centered" */}
      <dialog
        ref={deleteDialog}
        style={{
          padding: "1rem",
          border: "1px solid ",
          borderRadius: ".5rem",
          borderColor: "light-grey",
          // display: "flex",
          // flexDirection: "column",
          // rowGap: "1rem",
        }}
      >
        <div className="modal-header" style={{ gap: "1rem" }}>
          <h5 className="modal-title">Delete currency</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => deleteDialog.current?.close()}
          ></button>
        </div>
        <div className="modal-body">
          Do you really want to drop this currency?
        </div>
        <div
          className="modal-footer"
          style={{ gap: ".5rem", marginTop: "1rem" }}
        >
          <button
            className="btn btn-primary"
            onClick={async () => {
              await deleteCurrency();
              deleteDialog.current?.close();
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-primary"
            onClick={() => deleteDialog.current?.close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
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
      <button
        className="btn btn-primary mt-4 me-auto ms-4"
        onClick={() => deleteDialog.current?.showModal()}
      >
        Delete Currency
      </button>
    </>
  );
}

export default ChangeForm;
