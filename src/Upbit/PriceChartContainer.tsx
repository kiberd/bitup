import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import PriceChart from "./PriceChart";

import { initialData } from "../data";

import { getAuthToken } from "../api/request";

import { useRecoilState } from "recoil";
import { selectedCoin } from "../recoil/coin/atom";

import moment from "moment";

import {
  getCandleInfoByMin,
  getCandleInfoByDay,
  getCandleInfoByMonth,
  getCandleInfoByWeek,
} from "../api/api";
import { off } from "process";

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

  const [candleData, setCandleData] = useState<CandlePriceInfo[]>();

  const [targetCoin, setTargetCoin] = useRecoilState(selectedCoin);

  

  const [paramsString, setParamsString] = useState(
    'market="KRW-BTC"&count=100'
  );

  
  const [params, setParams] = useState({
    // market: "KRW-ETH",
    market: targetCoin.name,
    count: 200,
    to: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  const [offset, setOffset] = useState(moment());

  const handleLoadBefore = () => {
    setOffset(moment(offset).subtract(200, "days"));
  };

  useEffect(() => {
    const newParams = { ...params };
    newParams.to = offset.format("YYYY-MM-DD HH:mm:ss");
    setParams(newParams);
  }, [offset]);

  useEffect(() => {
    const newParams = { ...params };
    newParams.market = targetCoin.name;
    setParams(newParams);
    
  } ,[targetCoin])

  useEffect(() => {
    console.log(params);
    setTimeout(() => fetchDayCandleData(), 2000);
    
  }, [params]);

  const {
    isLoading,
    isError,
    data: dayCandleData,
    refetch: fetchDayCandleData,
  } = useQuery(
    ["getDayCandle", params],
    () => getCandleInfoByDay(getAuthToken(paramsString), params),
    {
      enabled: true,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (dayCandleData) {

      console.log(dayCandleData)
      // 기존 꺼 복사
      let newCandleData: CandlePriceInfo[];
      candleData ? (newCandleData = [...candleData]) : (newCandleData = []);

      // 새로운 값 추가
      dayCandleData.map((data: any) => {
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
  }, [dayCandleData]);

  const Contents = () => {
    if (candleData)
      return (
        <>
          {/* <button onClick={handleLoadBefore}>load</button> */}
          <PriceChart
            candleData={candleData}
            onHandleLoadBefore={handleLoadBefore}
          />
        </>
      );
    return null;
  };

  return Contents();
};

export default PriceChartContainer;
