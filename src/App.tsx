import React, {useEffect} from 'react';

import Container from "./Container";

import Moives from "./Movies/Moives";



import {
    RecoilRoot
} from "recoil";

function App(): JSX.Element {

    return (
        <RecoilRoot>
            {/*<Moives />*/}
            <Container />
        </RecoilRoot>
    );
}



export default App;
