import * as echarts from "echarts/core"
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components"
import { LineChart, LineSeriesOption } from "echarts/charts"
import { UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"
// import { EChartsOption } from "echarts"
import { ECBasicOption } from "echarts/types/dist/shared"
import { useEffect, useRef, useState } from "react"
// import React from "react"

// export type EChartsOption = echarts.ComposeOption<
// | TitleComponentOption
// | ToolboxComponentOption
// | TooltipComponentOption
// | GridComponentOption
// | LegendComponentOption
// | LineSeriesOption
// >
// function stackedLineChart() {
export default function RateChart({ options }: { options: ECBasicOption }) {
  // const [chart, setChart] = useState(null)
  let chartRef = useRef(null)

  const resizeObserver = new window.ResizeObserver((entries) => {
    entries.map(({ target }) => {
      const instance = echarts.getInstanceByDom(target)
      if (instance) {
        instance.resize()
      }
    })
  })
  useEffect(() => {
    echarts.use([
      TitleComponent,
      ToolboxComponent,
      TooltipComponent,
      GridComponent,
      LegendComponent,
      LineChart,
      CanvasRenderer,
      UniversalTransition,
    ])
    //document.getElementById("main")!
    let myChart = echarts.init(chartRef.current)
    options && myChart.setOption(options, true)
    // setChart(myChart)
    if (resizeObserver) resizeObserver.observe(chartRef.current)
  }, [options])

  // useEffect(() => {
  //   if (!chart) {
  //     return;
  //   }
  //   if (loading) {
  //     chart.showLoading();
  //     return;
  //   }

  //   chart.hideLoading();
  // }, [chart, loading]);
  const newStyle = {
    height: 350,
    // ...style
  }
  return (
    <div className="echarts-parent position-relative">
      <div ref={chartRef} style={newStyle}></div>
    </div>
  )
}

// export default function RateChart() {
//   return React.memo(stackedLineChart)
// }
