import styled from 'styled-components';

import PriceSearchInput from 'components/PriceSearchInput';
import PriceTableContainer from 'components/PriceTableContainer';


const PricePanelWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column; 
  margin: 5% 0% 2% 2%;
`;



const PricePanelContainer = () => {

    return (
        <PricePanelWrapper>
            <PriceSearchInput/>
            {/* <MarketSelect/> */}
            <PriceTableContainer/>
        </PricePanelWrapper>
    )

}

export default PricePanelContainer;