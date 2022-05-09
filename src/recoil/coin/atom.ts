import { atom } from "recoil";

export const selectedCoin = atom({
  key: "selectedCoin",
  default: {
    name: "KRW-BTC"
  }
});

export const coinListState = atom({
  key: "coinListState",
  // default: [],
  default: {
    entireCoinList: [
      "KRW-BTC",
      "KRW-ETH",
      "KRW-BCH",
      "KRW-ETC",
      "KRW-SAND",
      "KRW-ZIL",
      "KRW-WAVES",
      "KRW-IOST",
      "KRW-FCT2",
      "KRW-HUM",
      "KRW-JST",
      "KRW-IQ",
      "KRW-XRP",
      "KRW-STRAX",
      "KRW-TRX",
      "KRW-POWR",
      "KRW-PLA",
      "KRW-VET",
      "KRW-SRM",
      "KRW-KNC",
      "KRW-OMG",
      "KRW-SC",
      "KRW-NEAR",
      "KRW-CRE",
      "KRW-MBL",
      "KRW-MED",
      "KRW-CBK",
      "KRW-RFR",
      "KRW-UPP",
      "KRW-STPT",
      "KRW-GLM",
      "KRW-ORBS",
      "KRW-POLY",
      "KRW-HIVE",
    ],
    bookMarkCoinList: ["KRW-BTC", "KRW-ETH"],
    selectedCoin: "KRW-BTC",
  },
});
