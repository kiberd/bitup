import axios from "axios";

// https://docs.upbit.com/reference/분minute-캔들-1

export const getAllMarketInfo = async () => {
  const { data } = await axios.get(
    // "https://api.upbit.com/v1/candles/minutes",
    "/v1/market/all"
  );

  console.log(data);

  return data;
};

export const getCandleInfoByMin = async (token: any) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.get(
    // "https://api.upbit.com/v1/candles/minutes",
    "v1/market/all",
    config
  );

  //   return data.item;
};

export const getCandleInfoByDay = async (token: any) => {


  const { data } = await axios.get("v1/candles/days", {
    headers: { Authorization: token },
    params: { market: "KRW-BTC", count: 1 },
  });

  console.log(data);

  // return data.item;
};

export const getCandleInfoByWeek = async () => {
  const { data } = await axios.get("v1/candles/weeks");

  // return data.item;
};

export const getCandleInfoByMonth = async () => {
  const { data } = await axios.get("v1/candles/months");

  // return data.item;
};
