import { useState, useEffect, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from '@mui/material/Paper';

import { styled } from "@mui/system";


const TableHeaderNameCell = styled(TableCell)`
  && {
    font-weight: 1000;
    font-family: Noto Sans KR,sans-serif;
  }
  span {
    font-size: 15px;
  }
`;

const TableNameCell = styled(TableCell)`
  && {
    font-weight: 700;
    font-family: Noto Sans KR,sans-serif;
  }
  span {
    color: #666;
    font-size: 13px;
  }
`;


const TablePlusValueCell = styled(TableCell)`
  && {
    font-weight: 600;
    color: #0051c7;
  }
`;

const TableMinusValueCell = styled(TableCell)`
  && {
    font-weight: 600;
    color: #FF5B5B;
  }
  
`;

const PriceTable = (props) => {

    const { columns, data } = props;

    

    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("tradeVolume");

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    const desc = (a, b, sequenceBy) => {
        if (b[sequenceBy] < a[sequenceBy]) {
            return -1;
        }
        if (b[sequenceBy] > a[sequenceBy]) {
            return 1;
        }
        return 0;
    };

    const stableSort = (array, cmp) => {

        const stabilizedThis = array.map((el, index) => [el, index]);

        stabilizedThis.sort((a, b) => {
            const sequence = cmp(a[0], b[0]);
            if (sequence !== 0) return sequence;
            return a[1] - b[1];
        });

        return stabilizedThis.map((el) => el[0]);
    };

    const getSorting = (sequence, sequenceBy) => {
        return sequence === "desc"
            ? (a, b) => desc(a, b, sequenceBy)
            : (a, b) => -desc(a, b, sequenceBy);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };



    const getName = (code) => {

        switch (code) {
            case "KRW-BTC":
                return "비트코인"
            case "KRW-ETH":
                return "이더리움"
            case "KRW-BCH":
                return "비트코인캐시"
            case "KRW-ETC":
                return "이더리움클래식"
            case "KRW-SAND":
                return "샌드박스"

            default:
                break;
        }
    }



    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHeaderNameCell>
                                <TableSortLabel
                                    key={index}
                                    direction={"asc"}
                                    onClick={createSortHandler(column.accessor)}>
                                        <span>{column.Header}</span>
                                </TableSortLabel>
                            </TableHeaderNameCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data !== undefined &&
                        stableSort(data, getSorting(order, orderBy)).map((row, index) => (
                            <TableRow>

                                <TableNameCell>
                                    <span>{getName(row.code)}</span>
                                </TableNameCell>

                                {row.changeRate < 0 ? <TableMinusValueCell>{row.currentPrice.toLocaleString()}</TableMinusValueCell> :
                                    <TablePlusValueCell>{row.currentPrice.toLocaleString()}</TablePlusValueCell>}

                                {row.changeRate < 0 ? <TableMinusValueCell>{(row.changeRate * 100).toFixed(2)}%</TableMinusValueCell> :
                                    <TablePlusValueCell>{(row.changeRate * 100).toFixed(2)}%</TablePlusValueCell>}

                                <TableNameCell><span>{Math.floor(row.tradeVolume * 0.000001).toLocaleString()}백만</span></TableNameCell>

                            </TableRow>
                        ))}

                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default PriceTable;