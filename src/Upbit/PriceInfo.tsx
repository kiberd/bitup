import React, { useState, useEffect, useMemo } from "react";
import { IMessageEvent, w3cwebsocket } from "websocket";

import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { coinListState } from "../recoil/coin/atom";

import CoinPrice from "./CoinPrice";
import CoinInfo from "./CoinInfo";

interface PriceInfo {
  code: string;
  currentPrice: number;
  changeRate: number;
  tradePrice: number;
  tradeVolume: number;
  highPrice: number;
  lowPrice: number;
}

const getName = (code: string) => {
  switch (code) {
    case "KRW-BTC":
      return "비트코인";
    case "KRW-ETH":
      return "이더리움";
    case "KRW-BCH":
      return "비트코인캐시";
    case "KRW-ETC":
      return "이더리움클래식";
    case "KRW-SAND":
      return "샌드박스";
    case "KRW-ZIL":
      return "질리카";
    case "KRW-WAVES":
      return "웨이브";
    case "KRW-IQ":
      return "에브리피디아";
    case "KRW-SAND":
      return "웨이브";
    case "KRW-IOST":
      return "아이오에스티";
    case "KRW-HUM":
      return "휴먼스케이프";
    case "KRW-FCT2":
      return "피르마체인";
    case "KRW-JST":
      return "저스트";
    case "KRW-XRP":
      return "리플";
    case "KRW-STRAX":
      return "스트라티스";
    case "KRW-TRX":
      return "트론";
    case "KRW-POWR":
      return "파워렛져";
    case "KRW-PLA":
      return "플레이댑";
    case "KRW-VET":
      return "비체인";
    case "KRW-SRM":
      return "세럼";
    case "KRW-KNC":
      return "카이버네트워크";
    case "KRW-OMG":
      return "오미세고";
    case "KRW-SC":
      return "시아코인";
    case "KRW-NEAR":
      return "니어프로토콜";
    case "KRW-CRE":
      return "캐리프로토콜";
    case "KRW-MBL":
      return "무비블록";
    case "KRW-MED":
      return "메디블록";
    case "KRW-CBK":
      return "코박토큰";
    case "KRW-RFR":
      return "리퍼리움";
    case "KRW-UPP":
      return "센티넬프로토콜";
    case "KRW-STPT":
      return "에스티피";
    case "KRW-GLM":
      return "골렘";
    case "KRW-ORBS":
      return "옵저버";
    case "KRW-POLY":
      return "폴리메쓰";
    case "KRW-HIVE":
      return "하이브";
    default:
      break;
  }
};

const PriceInfo = () => {
  const targetCoin = useRecoilValue(coinListState).selectedCoin;
  const [socket, setSocket] = useState<w3cwebsocket>();
  const [priceInfo, setPriceInfo] = useState<PriceInfo>();

  let client: w3cwebsocket;

  useEffect(() => {
    openSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.close();
      openSocket();
    }
  }, [targetCoin]);

  const openSocket = () => {
    client = new w3cwebsocket("wss://api.upbit.com/websocket/v1");
    client.binaryType = "arraybuffer";

    client.onopen = () => {
      onOpen();
    };

    client.onmessage = (e: IMessageEvent) => {
      onMessage(e);
    };

    setSocket(client);
  };

  const onOpen = () => {
    const targetCoinArray = [targetCoin];
    const msg = JSON.stringify([
      { ticket: "TEST" },
      { type: "ticker", codes: targetCoinArray },
    ]);
    doSend(msg);
  };

  const doSend = (msg: string) => {
    client.send(msg);
  };

  const onMessage = (e: IMessageEvent) => {
    const enc = new TextDecoder("utf-8");
    const arr = new Uint8Array(e.data as ArrayBuffer);
    const priceData = JSON.parse(enc.decode(arr));

    const priceInfoObj: PriceInfo = {
      code: priceData.code,
      currentPrice: priceData.trade_price,
      changeRate: priceData.signed_change_rate,
      tradePrice: priceData.trade_price,
      tradeVolume: priceData.acc_trade_price_24h,
      highPrice: priceData.high_price,
      lowPrice: priceData.low_price,
    };

    setPriceInfo(priceInfoObj);
  };

  const [isInfo, setIsInfo] = useState(false);

  return (
    <div className="flex w-full h-1/6 justify-center items-center">
      <div className="w-full h-full border border-black-600 rounded-md mr-5 ml-5 mt-8">
        <div className="flex flex-row h-1/3 border-b">
          <div className="ml-4 mr-4 mt-3 mb-3">
            <span
              className="input-group-text flex items-center px-1 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
              id="basic-addon2"
            >
              로고
            </span>
          </div>

          {/* 아이콘 */}
          {priceInfo ? (
            <div className="ml-4 mr-4 mb-3 mt-3.5 text-xl">
              {getName(priceInfo.code)}
            </div>
          ) : null}

          {/* 시세 정보 아이콘 */}
          <div className="flex flex-row ml-auto w-2/6">
            <div
              className={`w-2/5 text-center mt-3.5 cursor-pointer ${
                !isInfo ? "border-b-4 border-indigo-500 text-indigo-500" : null
              }`}
              onClick={() => setIsInfo(!isInfo)}
            >
              시세
            </div>
            <div
              className={`w-2/5 text-center mt-3.5 cursor-pointer ${
                isInfo ? "border-b-4 border-indigo-500 text-indigo-500" : null
              }`}
              onClick={() => setIsInfo(!isInfo)}
            >
              정보
            </div>
            <div className="flex justify-center items-center w-1/5 border-l">
              <div>
                <span
                  className="input-group-text flex items-center px-1 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
                  id="basic-addon2"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Coin price */}
        {!isInfo && priceInfo ? <CoinPrice priceInfo={priceInfo} /> : null}

        {/* Coin Info */}
        {isInfo ? <CoinInfo /> : null}
      </div>
    </div>
  );
};

export default PriceInfo;
