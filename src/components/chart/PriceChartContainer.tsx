import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import PriceChartSetting from "./PriceChartSetting";
import PriceChart from "./PriceChart";

import { initialData } from "../../data";

import { getAuthToken } from "../../api/request";

import { useRecoilState } from "recoil";
import { selectedCoin, paramsState } from "../../recoil/coin/atom";

import moment from "moment";

import {
  getCandleInfoByMin,
  getCandleInfoByDay,
  getCandleInfoByWeek,
  getCandleInfoByMonth,
  getCandleData,
} from "../../api/api";

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

const periodUnitList = {
  day: {
    unit: "days",
    endpoint: "v1/candles/days",
  },
  week: {
    unit: "weeks",
    endpoint: "v1/candles/weeks",
  },
  month: {
    unit: "months",
    endpoint: "v1/candles/months",
  },
};

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
      // console.log(period);
      if (period === "days") setOffset(moment(offset).subtract(50, "days"));
      if (period === "weeks") setOffset(moment(offset).subtract(50, "weeks"));
      if (period === "months") setOffset(moment(offset).subtract(50, "months"));
    } else {
      const unit = 50 * period;
      setOffset(moment(offset).subtract(unit, "minutes"));
    }
    // setOffset(moment(offset).subtract(50, "days"));
  };

  useEffect(() => {
    if (fetchCandleData) {
      // 기존 꺼 복사
      let newCandleData: CandlePriceInfo[] = [];

      if (init) {
        newCandleData = [];
      } else {
        if (candleData) newCandleData = [...candleData];
      }

      // 새로운 값 추가
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

  // if (isError) return <div>error</div>;
  // if (isLoading) return <div>loading</div>;

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
