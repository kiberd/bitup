import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

const PriceSearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row; 
  min-height: 3vh;
  border-bottom: 0.5px solid gray;
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const SearchInput = styled.div`
  width: 90%;
  padding: 1% 0 1% 2%;
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const SearchSettingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.5px solid gray;
  width: 10%;
`;

const PriceSearchInput = () => {

    return (
        <PriceSearchInputWrapper>
            <SearchInputContainer>
                <SearchInput> <TextField fullWidth label="코인명/심볼 검색" variant="outlined" size="small" /></SearchInput>
                <SearchButton><SearchIcon fontSize="medium" /></SearchButton>
            </SearchInputContainer>
            <SearchSettingContainer>
                <SettingsIcon/>
            </SearchSettingContainer>
        </PriceSearchInputWrapper>
    )

}

export default PriceSearchInput;