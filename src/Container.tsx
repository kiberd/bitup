import React, { useEffect } from "react";

import Header from "./components/Header";

import PriceContainer from "./components/chart/PriceContainer";
import PriceChartContainer from "./components/chart/PriceChartContainer";
import PriceChart from "./components/chart/PriceChart";
import PriceSearch from "./components/PriceSearch";
import PriceTable from "./components/PriceTable";
import PriceInfo from "./components/PriceInfo";

import { useRecoilState } from "recoil";
import { selectedCoin } from "./recoil/coin/atom";


interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {

	const [targetCoin, setTargetCoin] = useRecoilState(selectedCoin);

	return (
		<div className="container mx-auto">
			
			<Header />

			
			<div className="flex flex-row h-[90vh]">
				
				<div className="h-full m-2 border rounded-md basis-4/6 border-black-600">
                    <PriceInfo />
					<PriceChartContainer targetCoin={targetCoin.name}/>
				</div>

				
				<div className="h-full m-2 border rounded-md basis-2/6 border-black-600">
					<PriceContainer />
				</div>

			</div>


		</div>
	);
};

export default Container;
