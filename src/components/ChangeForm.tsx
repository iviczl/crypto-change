import { MutableRefObject, useEffect, useRef, useState } from "react"
import type { Currency } from "../types/currency"
import { useAppDispatch } from "../hooks/useTypeSelector"
import { removeUserCurrency } from "../stores/userSlice"
import RateChart from "./RateChart"
// import { EChartsOption } from "echarts"
import { ECBasicOption } from "echarts/types/dist/shared"

interface IChangeProps {
  sourceCurrency: Currency
  targetCurrency: Currency
  rate: number
}

let options: ECBasicOption = {
  title: {
    text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
}

function ChangeForm(props: IChangeProps) {
  const deleteDialog: MutableRefObject<HTMLDialogElement | null> = useRef(null)
  const [sourceCurrencyAmount, setSourceCurrencyAmount] = useState(0)
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setSourceCurrencyAmount(sourceCurrencyAmount)
    setTargetCurrencyAmount(sourceCurrencyAmount * props.rate)
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
        <RateChart options={options} />
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
