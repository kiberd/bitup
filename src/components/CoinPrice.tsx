import React from "react";

interface CoinPriceProps{
    priceInfo: PriceInfo,
}

interface PriceInfo {
    code: string;
    currentPrice: number;
    changeRate: number;
    tradePrice: number;
    tradeVolume: number;
    highPrice: number;
    lowPrice: number;
  }

const CoinPrice: React.FC<CoinPriceProps> = ({ priceInfo }) => {
  return (
    <div className="flex flex-row h-2/3">
      {/* 실시간 가격 */}

      <div className="flex justify-center items-center">
        <div className="ml-5">
          <span className="block">
            <strong className="text-4xl">
              {priceInfo.currentPrice.toLocaleString()}
            </strong>
            <em>KRW</em>
          </span>

          <span className="block mt-1">
            <p className="inline-block">전일대비</p>
            <strong className="ml-5">
              {(priceInfo.changeRate * 100).toFixed(2)}%
            </strong>
            <strong className="ml-5">
              {Math.floor(priceInfo.tradeVolume * 0.000001).toLocaleString()}
              백만
            </strong>
          </span>
        </div>
      </div>

      <div className="flex flex-row ml-auto w-1/2 h-full">
        <div className="flex flex-row w-1/2 mr-3">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row h-1/2 items-center border-b">
              <div className="text-sm">고가</div>
              <div className="text-sm ml-auto">
                {priceInfo.highPrice.toLocaleString()}
              </div>
            </div>

            <div className="flex flex-row h-1/2 items-center">
              <div className="text-sm">저가</div>
              <div className="text-sm ml-auto">
                {priceInfo.lowPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-1/2 mr-3">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row h-1/2 items-center border-b">
              <div className="text-sm">거래대금(24h)</div>
              <div className="text-sm ml-auto">
                {Math.floor(priceInfo.tradeVolume).toLocaleString()}
              </div>
            </div>

            <div className="flex flex-row h-1/2 items-center">
              <div className="text-sm">거래량(24h)</div>
              <div className=" ml-auto">
                {priceInfo.tradePrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPrice;
