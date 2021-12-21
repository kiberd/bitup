import React from 'react';
import styled from 'styled-components';

const PriceInfoWrapper = styled.div`
  // background: black;
  display: flex;
  flex-direction: column; 
  // margin-top: 3%;
  // margin: 5% 0% 2% 2%;
  min-height: 8vh;
`;

const PriceInfo = () => {
    return (
        <PriceInfoWrapper>
            가격정보
        </PriceInfoWrapper>
    );
};

export default PriceInfo;