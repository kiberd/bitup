import axios from "axios";

// https://docs.upbit.com/reference/분minute-캔들-1

// export const getCandleData = async (token: string, endPoint: string, params: any) => {

//   const { data } = await axios.get(process.env.REACT_APP_UPBIT_URL + endPoint, {
//     headers: { Authorization: token },
//     params: params,
//   });

//   return data;
  
// }

export const getCandleData = async (token: string, endPoint: string, params: any) => {

  const { data } = await axios.get("/api/getCandleData", {
    headers: { Authorization: token },
    params: {
      apiParams: params,
      endPoint: endPoint
    },
  });

  return data;
  
}



