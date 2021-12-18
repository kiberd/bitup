import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { w3cwebsocket } from "websocket";
import PriceTable from 'components/PriceTable';


const PriceTableWrapper = styled.div`
  min-height: 80vh;
`;


const PriceTableContainer = () => {


    const [priceInfo, setPriceInfo] = useState(
        [

            {
                code: "KRW-BTC",
                currentPrice: "",
                changeRate: "",
                tradeVolume: "",
            },
            {
                code: "KRW-ETH",
                currentPrice: "",
                changeRate: "",
                tradeVolume: "",
            },
            {
                code: "KRW-BCH",
                currentPrice: "",
                changeRate: "",
                tradeVolume: "",
            },
            {
                code: "KRW-ETC",
                currentPrice: "",
                changeRate: "",
                tradeVolume: "",
            },
            {
                code: "KRW-SAND",
                currentPrice: "",
                changeRate: "",
                tradeVolume: "",
            },

        ]
    );

    let client;

    useEffect(() => {
        client = new w3cwebsocket("wss://api.upbit.com/websocket/v1");
        client.binaryType = "arraybuffer";

        client.onopen = () => {
            onOpen();
        }

        client.onmessage = (e) => {
            onMessage(e);
        }

    }, []);

    const onOpen = () => {
        const msg = JSON.stringify([
            { "ticket": "TEST" }, { "type": "ticker", "codes": ["KRW-BTC", "KRW-ETH", "KRW-BCH", "KRW-ETC", "KRW-SAND"] }
        ]);
        doSend(msg);
    };

    const doSend = (msg) => {
        client.send(msg);
    }

    const onMessage = (e) => {

        const enc = new TextDecoder("utf-8");
        const arr = new Uint8Array(e.data);
        const priceData = JSON.parse(enc.decode(arr));

        

        const code = priceData.code;

        // 해당 메세지가 어느 index 인지 알기위해서 
        let index;
        priceInfo.map((price, idx) => {
            if (code === price.code) {
                index = idx;
            }
        });



        setPriceInfo(
            
            [...priceInfo], 
            priceInfo[index].currentPrice = priceData.trade_price,
            priceInfo[index].changeRate = priceData.signed_change_rate, 
            priceInfo[index].tradeVolume = priceData.acc_trade_price_24h
            
        );




        const getName = (name) => {
            switch (name) {
                case 'KRW-BTC':
                    return '비트코인'
                case 'KRW-ETH':
                    return '이더리움'
                case 'KRW-BCH':
                    return '비트코인캐시'
                case 'KRW-BTC':
                    return '이더리움클래식'
                default:
                    break;
            }
        };





    }

    const columns = useMemo(() => [
        {
            Header: '한글명',
            accessor: 'code'
        },
        {
            Header: '현재가',
            accessor: 'currentPrice',
        },
        {
            Header: '전일대비',
            accessor: 'changeRate',
        },
        {
            Header: '거래대금',
            accessor: 'tradeVolume',
        }
    ], []
    );

    const data = useMemo(() => priceInfo, []);





    return (
        <PriceTableWrapper>

            <PriceTable columns={columns} data={data}/>

        </PriceTableWrapper>
    )

}

export default PriceTableContainer;