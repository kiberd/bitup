
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import {setContext} from '@apollo/client/link/context';

// import axios from 'axios';

import { getAuthToken } from './api/request';

import { getCandleInfoByDay } from './api/api';



const parmas = `market="KRW-BTC"&count=1`;

const authToken =  getAuthToken(parmas);

getCandleInfoByDay(authToken);




const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});





ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


