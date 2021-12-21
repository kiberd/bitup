import React, { useState } from "react";
import styled from "styled-components";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const PriceChartHeaderWrapper = styled.div`
	// background: green;
	display: flex;
	// justify-content: center;
	align-items: center;
	flex-direction: row;
	// margin-top: 3%;
	// margin: 5% 0% 2% 2%;
	min-height: 5vh;
`;

const PriceNameWrapper = styled.div`
	margin-right: auto;
	margin-left: 2%;
	font-family: Noto Sans KR, sans-serif;
	font-size: 20px;
`;

const ChangeMenuWrapper = styled.div`
    width: 35%;
	margin-left: auto;
	margin-right: 2%;
`;

const PriceChartHeader = (props) => {

    const [tabValue, setTabValue] = useState("시세");

    const handleChange = (e, value) => {
        setTabValue(value);
        let isChart;
        value === "시세" ? isChart = true : isChart = false;
        console.log(isChart);
        props.onIsChartChange(isChart);
        
    }

	return (
		<PriceChartHeaderWrapper>
			<PriceNameWrapper>비트코인</PriceNameWrapper>
			<ChangeMenuWrapper>
				<Tabs 
					value={tabValue}
					onChange={handleChange}
                    variant="fullWidth"
				>
					<Tab label="시세" value={"시세"} />
					<Tab label="정보" value={"정보"} />
					
				</Tabs>
			</ChangeMenuWrapper>

			{/* <div onClick={(e) => props.onIsChartChange(e, true)}>시세</div>
			<div onClick={(e) => props.onIsChartChange(e, false)}>정보</div> */}
		</PriceChartHeaderWrapper>
	);
};

export default PriceChartHeader;
