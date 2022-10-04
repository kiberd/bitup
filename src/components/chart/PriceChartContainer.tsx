import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";

import PriceChartSetting from "./PriceChartSetting";
import PriceChart from "./PriceChart";

import { getAuthToken } from "../../api/request";
import { useRecoilState } from "recoil";
import { paramsState } from "../../recoil/coin/atom";

import { getCandleData } from "../../api/api";


interface CandlePriceInfo {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

interface PriceChartContainerProps {
  targetCoin: string;
}

const PriceChartContainer: React.FC<PriceChartContainerProps> = ({
  targetCoin,
}) => {
  const [init, setInit] = useState<Boolean>(true);
  const [candleData, setCandleData] = useState<CandlePriceInfo[]>();
  const [offset, setOffset] = useState<any>();

  const [period, setPeriod] = useState<any>("days");
  const [endPoint, setEndPoint] = useState("v1/candles/days");
  const [apiParams, setApiParams] = useRecoilState(paramsState);

  const handleEndPoint = (value: any) => {
    setInit(true);
    setPeriod(value);
    // moment().subtract(200, value);
    let unit;
    if (value === "days") setOffset(moment().subtract(200, "days"));
    if (value === "weeks") setOffset(moment().subtract(200, "weeks"));
    if (value === "months") setOffset(moment().subtract(200, "months"));

    typeof value === "string"
      ? setEndPoint("v1/candles/" + value)
      : setEndPoint("v1/candles/minutes/" + value);
  };

  const {
    isLoading,
    isError,
    data: fetchCandleData,
  } = useQuery(
    [targetCoin + " " + endPoint, apiParams, endPoint],
    () => getCandleData(getAuthToken("paramsString"), endPoint, apiParams),
    {
      enabled: true,
      cacheTime: 1000,
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    const initParams = {
      market: targetCoin,
      count: 200,
      to: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    setInit(true);
    setApiParams(initParams);
    setOffset(moment().subtract(200, "days"));
  }, [targetCoin]);

  // 기간에 따른 handling 필요
  const handleLoadBefore = () => {
    const newParams = {
      market: targetCoin,
      count: 50,
      to: moment(offset).format("YYYY-MM-DD HH:mm:ss"),
    };

    setInit(false);
    setApiParams(newParams);

    if (period && typeof period === "string") {
      if (period === "days") setOffset(moment(offset).subtract(50, "days"));
      if (period === "weeks") setOffset(moment(offset).subtract(50, "weeks"));
      if (period === "months") setOffset(moment(offset).subtract(50, "months"));
    } else {
      const unit = 50 * period;
      setOffset(moment(offset).subtract(unit, "minutes"));
    }
  };

  useEffect(() => {
    if (fetchCandleData) {
      
      let newCandleData: CandlePriceInfo[] = [];

      if (init) {
        newCandleData = [];
      } else {
        if (candleData) newCandleData = [...candleData];
      }

      fetchCandleData.map((data: any) => {
        const filterCandleDataObj: CandlePriceInfo = {
          date: data.candle_date_time_utc,
          open: data.opening_price,
          low: data.low_price,
          high: data.high_price,
          close: data.trade_price,
          volume: data.candle_acc_trade_volume,
        };

        newCandleData.unshift(filterCandleDataObj);
      });

      setCandleData(newCandleData);
    }
  }, [fetchCandleData]);

  if (isError) return <div className="flex items-center justify-center w-full h-full">error</div>;
  if (isLoading) return <div className="flex items-center justify-center w-full h-full">loading</div>;

  if (candleData)
    return (
      <>
        <PriceChartSetting onHandleEndPoint={handleEndPoint} />
        {isLoading ? (
          <div>loading</div>
        ) : (
          <PriceChart
            candleData={candleData}
            onHandleLoadBefore={handleLoadBefore}
          />
        )}
      </>
    );

  return null;
};

export default PriceChartContainer;
