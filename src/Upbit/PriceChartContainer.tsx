import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import PriceChart from "./PriceChart";

import { initialData } from "../data";

import { getAuthToken } from "../api/request";

import {
  getCandleInfoByMin,
  getCandleInfoByDay,
  getCandleInfoByMonth,
  getCandleInfoByWeek,
} from "../api/api";

const parmas = `market="KRW-BTC"&count=1`;

const authToken = getAuthToken(parmas);

// getCandleInfoByMin(authToken);
// getCandleInfoByDay();

interface CandlePriceInfo {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

const PriceChartContainer = () => {
  // const [data, setData] = useState();

  const [candleData, setCandleData] = useState<CandlePriceInfo[]>();

  const [paramsString, setParamsString] = useState(
    'market="KRW-BTC"&count=100'
  );
  const [params, setParams] = useState({ market: "KRW-ETH", count: 5000 });

  const {
    isLoading,
    isError,
    data: dayCandleData,
    refetch: fetchDayCandleData,
  } = useQuery(
    ["getDayCandle", params],
    () => getCandleInfoByDay(getAuthToken(paramsString), params),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    fetchDayCandleData();
  }, []);

  useEffect(() => {
    if (dayCandleData) {
      const candleData: CandlePriceInfo[] = [];

      console.log(dayCandleData);

      dayCandleData.map((data: any) => {
        const filterCandleDataObj: CandlePriceInfo = {
          date: data.candle_date_time_utc,
          open: data.opening_price,
          low: data.low_price,
          high: data.high_price,
          close: data.trade_price,
          volume: data.candle_acc_trade_volume,
        };

        candleData.push(filterCandleDataObj);
        
      });

      
      candleData.reverse();

      setCandleData(candleData);
    }
  }, [dayCandleData]);

  const Contents = () => {
    if (candleData) return <PriceChart candleData={candleData} />;
    return null;
  };

  return Contents();
};

export default PriceChartContainer;
