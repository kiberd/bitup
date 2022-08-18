import React, { useState, useRef, useEffect } from "react";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
  LineSeriesProps,
} from "react-financial-charts";

import { initialData } from "../../data";

interface PriceChartProps {
  candleData: CandlePriceInfo[];
  onHandleLoadBefore: any;
}

interface CandlePriceInfo {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ candleData, onHandleLoadBefore }) => {

  const [size, setSize] = useState<any>();

  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d) => new Date(d.date)
    );

  //   const height = 750;
  //   const width = 900;
  const margin = { left: 0, right: 48, top: 0, bottom: -10 };

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: any, c: any) => {
      d.ema12 = c;
    })
    .accessor((d: any) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: any, c: any) => {
      d.ema26 = c;
    })
    .accessor((d: any) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(candleData)));

  // console.log(calculatedData);

  
  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(calculatedData);

  const pricesDisplayFormat = format("d");


  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 2500)]);

  const xExtents = [min, max + 5];
  const gridHeight = size?.height - margin.top - margin.bottom;

  const elderRayHeight = 100;
  const elderRayOrigin = (_: any, h: any) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: any, h: any) => [
    0,
    h - barChartHeight - elderRayHeight,
  ];
  const chartHeight = gridHeight - elderRayHeight;
  const yExtents = (data: any) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const barChartExtents = (data: any) => {
    return data.volume;
  };

  const candleChartExtents = (data: any) => {
    return [data.low, data.high];
  };

  const yEdgeIndicator = (data: any) => {
    return data.close;
  };

  const volumeColor = (data: any) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data: any) => {
    return data.volume;
  };

  const candle = (data: any) => {
    return {
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    };
  };

  const openCloseColor = (data: any) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  const contanerRef: any = useRef(null);

  useEffect(() => {
    if (contanerRef && contanerRef.current) {
      const sizeObj = {
        width: contanerRef.current.offsetWidth * 0.95,
        height: contanerRef.current.offsetHeight * 1,
      };

      setSize(sizeObj);
    }
  }, [contanerRef]);

  const handleLoadBefore = () => {
    onHandleLoadBefore();
  };

  return (
    <div
      ref={contanerRef}
      className="flex items-center justify-center w-full h-[75%] mt-8 p-2"
    >
      {size ? (
        <ChartCanvas
          height={size.height}
          ratio={3}
          width={size.width}
          margin={margin}
          data={data}
          // displayXAccessor={displayXAccessor}
          seriesName="Data"
          xScale={xScale}
          xAccessor={xAccessor}
          // xExtents={xExtents}
          // zoomAnchor={lastVisibleItemBasedZoomAnchor}
          onLoadBefore={handleLoadBefore}
        >
          <Chart
            id={2}
            height={barChartHeight}
            origin={barChartOrigin}
            yExtents={barChartExtents}
          >
            <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
          </Chart>

          <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
            <XAxis showGridLines showTickLabel={false} />
            <YAxis showGridLines tickFormat={pricesDisplayFormat} />
            <CandlestickSeries yAccessor={candle} />

            {/* <LineSeries
              yAccessor={ema26.accessor()}
              strokeStyle={ema26.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema26.accessor()}
              fillStyle={ema26.stroke()}
            />
            <LineSeries
              yAccessor={ema12.accessor()}
              strokeStyle={ema12.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema12.accessor()}
              fillStyle={ema12.stroke()}
            /> */}
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />
            <EdgeIndicator
              itemType="last"
              rectWidth={margin.right}
              fill={openCloseColor}
              lineStroke={openCloseColor}
              displayFormat={pricesDisplayFormat}
              yAccessor={yEdgeIndicator}
            />
            <MovingAverageTooltip
              origin={[8, 24]}
              options={[
                {
                  yAccessor: ema26.accessor(),
                  type: "EMA",
                  stroke: ema26.stroke(),
                  windowSize: ema26.options().windowSize,
                },
                {
                  yAccessor: ema12.accessor(),
                  type: "EMA",
                  stroke: ema12.stroke(),
                  windowSize: ema12.options().windowSize,
                },
              ]}
            />
            <XAxis
              showGridLines
              gridLinesStrokeStyle="#e0e3eb"
              showDomain={true}
            />
            <MouseCoordinateX displayFormat={timeDisplayFormat} />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />

            <ZoomButtons />
            <OHLCTooltip origin={[8, 16]} />
          </Chart>

          {/* <Chart
            id={4}
            height={elderRayHeight}
            yExtents={[0, elder.accessor()]}
            origin={elderRayOrigin}
            padding={{ top: 8, bottom: 8 }}
          >
            <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
            <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

            <MouseCoordinateX displayFormat={timeDisplayFormat} />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />

            <ElderRaySeries yAccessor={elder.accessor()} />

            <SingleValueTooltip
              yAccessor={elder.accessor()}
              yLabel="Elder Ray"
              yDisplayFormat={(d: any) =>
                `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                  d.bearPower
                )}`
              }
              origin={[8, 16]}
            />
          </Chart> */}

          {/* <CrossHairCursor /> */}
        </ChartCanvas>
      ) : null}
    </div>
  );
};

export default PriceChart;
