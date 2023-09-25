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
import {
  CSSProperties,
  StyleHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react"
import React from "react"

// export type EChartsOption = echarts.ComposeOption<
// | TitleComponentOption
// | ToolboxComponentOption
// | TooltipComponentOption
// | GridComponentOption
// | LegendComponentOption
// | LineSeriesOption
// >
// function stackedLineChart() {
export default function RateChart({
  options,
  style,
}: {
  options: ECBasicOption
  style: CSSProperties
}) {
  const defaultOptions: ECBasicOption = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [],
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
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [],
  }

  // const [chart, setChart] = useState(null)
  let chartRef = useRef({} as null | HTMLDivElement)
  const resizeObserver = new window.ResizeObserver((entries) => {
    entries.map(({ target }) => {
      const instance = echarts.getInstanceByDom(target as HTMLElement)
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
    options && myChart.setOption({ ...defaultOptions, ...options }, true)
    // setChart(myChart)
    if (resizeObserver) resizeObserver.observe(chartRef.current as Element)
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
  const newStyle: CSSProperties = {
    height: 350,
    width: 600,
    ...style,
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
