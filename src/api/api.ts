import axios from "axios";

// https://docs.upbit.com/reference/분minute-캔들-1

export const getAllMarketInfo = async () => {
  const { data } = await axios.get(
    "/v1/market/all"
  );

  console.log(data);

  // return data;
};

export const getCandleInfoByMin = async (token: any) => {

  console.log(token);
  
  const { data } = await axios.get("v1/candles/minutes/1", {
    headers: { Authorization: token },
    params: { market: "KRW-BTC", count: 100 },
  });

  console.log(data);

  //   return data.item;
};

export const getCandleInfoByDay = async (token: any, params: any) => {


  const { data } = await axios.get("v1/candles/days", {
    // headers: { Authorization: token },
    params: params,
  });

  // console.log(data);

  return data;
};

export const getCandleInfoByWeek = async (token: any) => {
  
  const { data } = await axios.get("v1/candles/weeks", {
    headers: { Authorization: token },
    params: { market: "KRW-BTC", count: 1 },
  });

  console.log(data);


  // return data.item;
};

export const getCandleInfoByMonth = async (token: any) => {
  
  const { data } = await axios.get("v1/candles/months", {
    headers: { Authorization: token },
    params: { market: "KRW-BTC", count: 1 },
  });

  console.log(data);


  // return data.item;
};
