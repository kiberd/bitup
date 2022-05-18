import React, { useEffect } from "react";

import Header from "./Upbit/Header";

import PriceContainer from "./Upbit/PriceContainer";
import PriceChartContainer from "./Upbit/PriceChartContainer";
import PriceChart from "./Upbit/PriceChart";
import PriceSearch from "./Upbit/PriceSearch";
import PriceTable from "./Upbit/PriceTable";
import PriceInfo from "./Upbit/PriceInfo";

import { useRecoilState } from "recoil";
import { selectedCoin } from "./recoil/coin/atom";


interface ContainerProps {}

const Container: React.FunctionComponent<ContainerProps> = () => {

	const [targetCoin, setTargetCoin] = useRecoilState(selectedCoin);

	return (
		<div className="container mx-auto">
			{/*Header*/}
			<Header />

			{/*MainWrapper*/}
			<div className="flex flex-row h-[90vh]">
				{/*Price Chart*/}
				<div className="h-full m-2 border rounded-md basis-4/6 border-black-600">
                    <PriceInfo />
					<PriceChartContainer targetCoin={targetCoin.name}/>
				</div>

				{/*Price Panel*/}
				<div className="h-full m-2 border rounded-md basis-2/6 border-black-600">
					<PriceContainer />
				</div>
			</div>
		</div>
	);
};

export default Container;
