import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import PriceChartSetting from "./PriceChartSetting";
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

interface PriceChartContainerProps {
  targetCoin: string;
}

const PriceChartContainer: React.FC<PriceChartContainerProps> = ({
  targetCoin,
}) => {
  const [init, setInit] = useState<Boolean>(true);
  const [candleData, setCandleData] = useState<CandlePriceInfo[]>();
  const [params, setParams] = useState<any>();
  const [offset, setOffset] = useState<any>();

  const {
    isLoading,
    isError,
    data: dayCandleData,
    refetch: fetchDayCandleData,
  } = useQuery(
    ["getDayCandle", params],
    () => getCandleInfoByDay(getAuthToken("paramsString"), params),
    {
      enabled: true,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    const initParams = {
      market: targetCoin,
      count: 200,
      to: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    setInit(true);
    setParams(initParams);
    setOffset(moment().subtract(200, "days"));
  }, [targetCoin]);

  const handleLoadBefore = () => {
    const newParams = {
      market: targetCoin,
      count: 50,
      to: moment(offset).format("YYYY-MM-DD HH:mm:ss"),
    };

    setInit(false);
    setParams(newParams);
    setOffset(moment(offset).subtract(50, "days"));
  };

  useEffect(() => {
    if (dayCandleData) {
      // 기존 꺼 복사
      let newCandleData: CandlePriceInfo[] = [];

      if (init) {
        newCandleData = [];
      } else {
        if (candleData) newCandleData = [...candleData];
      }

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

  if (isError) return <div>error</div>;
  if (isLoading) return <div>loading</div>;

  if (candleData)
    return (
      <>

        <PriceChartSetting />
        <PriceChart
          candleData={candleData}
          onHandleLoadBefore={handleLoadBefore}
        />
      </>
    );

  return null;
};

export default PriceChartContainer;
