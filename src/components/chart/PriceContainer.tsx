import React, { useState, useEffect, useMemo } from "react";
import { IMessageEvent, w3cwebsocket } from "websocket";

import { useRecoilValue, useRecoilState } from "recoil";

import { coinListState } from "../../recoil/coin/atom";

import PriceSearch from "./../PriceSearch";
import PriceTable from "./../PriceTable";

interface PriceInfo {
  code: string;
  currentPrice: number;
  changeRate: number;
  tradeVolume: number;
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

const PriceContainer = () => {
  // const coinList = useRecoilValue(coinListState);
  const [coinList, setCoinList] = useRecoilState(coinListState);

  const [targetCoinList, setTargetCoinList] = useState<string[]>();
  const [searchKeyword, setSearchKeyword] = useState<string>();

  const [priceInfo, setPriceInfo] = useState<PriceInfo[]>();
  const [socketInit, setSocketInit] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isEntire, setIsEntire] = useState(true);

  let client: w3cwebsocket;

  useEffect(() => {
    // Set inital coin list (entire)
    setTargetCoinList(coinList.entireCoinList);

    // Set inital price info map
    const priceInfoArry: PriceInfo[] = [];
    coinList.entireCoinList.map((code) => {
      const priceInfoObj: PriceInfo = {
        code: code,
        currentPrice: 0,
        changeRate: 0,
        tradeVolume: 0,
      };

      priceInfoArry.push(priceInfoObj);
    });

    setPriceInfo(priceInfoArry);
  }, []);

  useEffect(() => {
    if (priceInfo && !socketInit) {
      client = new w3cwebsocket("wss://api.upbit.com/websocket/v1");
      client.binaryType = "arraybuffer";

      client.onopen = () => {
        onOpen();
      };

      client.onmessage = (e: IMessageEvent) => {
        onMessage(e);
      };

      setSocketInit(true);
    }
  }, [priceInfo]);

  const onOpen = () => {
    const msg = JSON.stringify([
      { ticket: "TEST" },
      { type: "ticker", codes: coinList.entireCoinList },
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

    const code = priceData.code;

    if (priceInfo) {
      let targetIndex = 0;
      priceInfo.map((price, index) => {
        if (code === price.code) targetIndex = index;
      });

      const tempArry = [...priceInfo];
      tempArry[targetIndex].currentPrice = priceData.trade_price;
      tempArry[targetIndex].changeRate = priceData.signed_change_rate;
      tempArry[targetIndex].tradeVolume = priceData.acc_trade_price_24h;

      setPriceInfo(tempArry);
    }
  };

  const handleSearchKeyword = (searchKeyword: string) => {
    setSearchKeyword(searchKeyword);
  };

  const filterCoinList = (data: PriceInfo[] | undefined) => {
    let filterdArry: PriceInfo[] = [];
    let resultArry: PriceInfo[] = [];

    targetCoinList?.map((code) => {
      data?.map((info) => {
        if (code === info.code) filterdArry.push(info);
      });
    });

    resultArry = filterdArry;

    if (searchKeyword) {
      resultArry = [];

      filterdArry.map((info) => {
        if (getName(info.code)?.includes(searchKeyword)) {
          resultArry.push(info);
        }
      });
    }

    return resultArry;
  };

  const data = useMemo(() => filterCoinList(priceInfo), [priceInfo]);

  useEffect(() => {
    if (targetCoinList) setIsLoading(true);
  }, [targetCoinList]);

  useEffect(() => {
    if (data?.length) setIsLoading(false);
  }, [data?.length]);

  const handleClickCategory = (category: any) => {
	//   console.log(category);
	  setTargetCoinList(category);
	  setIsEntire(!isEntire);
  }

  return (
    <div className="flex flex-col h-full min-h-full">
      <div className="h-1/6">
        <PriceSearch onHandleSearchKeyword={handleSearchKeyword} />

        <nav className="px-6 py-3 text-sm font-small">
          <ul className="flex space-x-3 justify-items-center">
            <li className="basis-1/2">
              <a
                onClick={() => handleClickCategory(coinList.entireCoinList)}
                className={`block px-20 py-2 rounded-md text-white cursor-pointer text-center ${isEntire ? "bg-sky-500" : "text-black rounded-md border bg-slate-300"}`}
              >
                전체
              </a>
            </li>
            <li className="basis-1/2">
              <a
                onClick={() => handleClickCategory(coinList.bookMarkCoinList)}
                className={`block px-20 py-2 rounded-md text-white cursor-pointer text-center ${!isEntire ? "bg-sky-500" : "text-black rounded-md border bg-slate-300"}`}
              >
                즐겨찾기
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="h-5/6">
        {data ? <PriceTable data={data} isLoading={isLoading} /> : null}
      </div>
    </div>
  );
};

export default PriceContainer;
