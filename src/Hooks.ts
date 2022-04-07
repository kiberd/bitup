import { useState, useEffect } from "react";

export const useSort = (rows: any, orderSeq: any, orderSeqBy: any) => {

    const [order, setOrder] = useState(orderSeq);
    const [orderBy, setOrderBy] = useState(orderSeqBy);
  
    const handleRequestSort = (event: any, property: any) => {
      const isDesc = orderBy === property && order === "desc";
      setOrder(isDesc ? "asc" : "desc");
      setOrderBy(property);
    };
  
    const desc = (a: any, b: any, sequenceBy: any) => {
      if (b[sequenceBy] < a[sequenceBy]) {
        return -1;
      }
      if (b[sequenceBy] > a[sequenceBy]) {
        return 1;
      }
      return 0;
    };
  
    const stableSort = (array: any, cmp: any) => {
      const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  
      stabilizedThis.sort((a: any, b: any) => {
        const sequence = cmp(a[0], b[0]);
        if (sequence !== 0) return sequence;
        return a[1] - b[1];
      });
  
      return stabilizedThis.map((el: any) => el[0]);
    };
  
    const getSorting = (sequence: any, sequenceBy: any) => {
      return sequence === "desc"
        ? (a: any, b: any) => desc(a, b, sequenceBy)
        : (a: any, b: any) => -desc(a, b, sequenceBy);
    };
  
    const createSortHandler = (property: any) => (event: any) => {
      handleRequestSort(event, property);
    };
  
    const sortedRows = stableSort(rows, getSorting(order, orderBy));
  
  
    return {sortedRows, order, orderBy, createSortHandler};
  
  }