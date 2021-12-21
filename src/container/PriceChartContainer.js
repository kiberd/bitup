import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PriceChartHeader from 'components/PriceChartHeader';
import PriceChart from 'components/PriceChart';

import Price from 'components/Price';
import Info from 'components/Info';


const PriceChartContainerWrapper = styled.div`
  // background: black;
  display: flex;
  flex-direction: column; 
  margin-top: 3%;
  // margin: 5% 0% 2% 2%;
  min-height: 80vh;
`;


const PriceChartContainer = (props) => {

    const [isChart, setIsChart] = useState(false);

    const handleIsChartChange = (value) => {
        setIsChart(value);
    }

    return (
        <PriceChartContainerWrapper>
            <PriceChartHeader onIsChartChange={handleIsChartChange}/>
            { isChart ? <Price/> : <Info/>}
        </PriceChartContainerWrapper>
    );

};

export default PriceChartContainer;