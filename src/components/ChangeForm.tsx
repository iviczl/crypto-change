import { MutableRefObject, useEffect, useRef, useState } from "react"
import type { Currency } from "../types/currency"
import { useAppDispatch } from "../hooks/useTypeSelector"
import { removeUserCurrency } from "../stores/userSlice"
import RateChart from "./RateChart"
// import { EChartsOption } from "echarts"
import { ECBasicOption } from "echarts/types/dist/shared"
import store from "../stores/store"
import { getLastRates } from "../services/rateServerHandler"

interface IChangeProps {
  sourceCurrency: Currency
  targetCurrency: Currency
  rate: number
}

function ChangeForm(props: IChangeProps) {
  const deleteDialog: MutableRefObject<HTMLDialogElement | null> = useRef(null)
  const [sourceCurrencyAmount, setSourceCurrencyAmount] = useState(0)
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState(0)
  const dispatch = useAppDispatch()

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [""], //["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    series: [
      {
        name: "",
        type: "line",
        stack: "Total",
        data: [0], // [120, 132, 101, 134, 90, 230, 210]
      },
    ],
  }) // ECBasicOption

  useEffect(() => {
    setSourceCurrencyAmount(sourceCurrencyAmount)
    setTargetCurrencyAmount(sourceCurrencyAmount * props.rate)
    const now = Date.now()
    const chartData = getLastRates(
      store.getState().currency.rates,
      props.targetCurrency,
      now - 60000 * 60 * 24 * 7,
      now
    )
    setChartOptions((options) => ({
      title: { text: props.targetCurrency.name + " exchange rates" },
      xAxis: {
        ...options.xAxis,
        data: [
          ...chartData.map((item) => new Date(item.time).toLocaleTimeString()),
        ],
      },
      series: [
        {
          name: props.targetCurrency.code,
          type: "line",
          stack: "Total",
          data: [...chartData.map((item) => item.exchangeValue)],
        },
      ],
    }))
  }, [props.rate])

  const deleteCurrency = async () => {
    await dispatch(removeUserCurrency(props.targetCurrency.code))
  }

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
              await deleteCurrency()
              deleteDialog.current?.close()
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
      <div className="m-4 h-75 col-12">
        <RateChart
          options={chartOptions}
          style={{ width: "500px", height: "250px" }}
        />
      </div>
      <div className="mt-4 ms-4 h-20">
        <label>
          <input
            className="form-control"
            style={{ display: "inline", width: "auto" }}
            type="number"
            onChange={(e) => {
              setSourceCurrencyAmount(+e.target.value)
              setTargetCurrencyAmount(+e.target.value * props.rate)
            }}
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
            onChange={(e) => {
              setTargetCurrencyAmount(+e.target.value)
              setSourceCurrencyAmount(1 / (+e.target.value * props.rate))
            }}
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
  )
}

export default ChangeForm
