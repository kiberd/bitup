import axios from 'axios';
import moment from "moment";

export default async (req, res) => {
    
    const { apiParams, endPoint } = req.query;
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");


    axios.get(`https://api.upbit.com/` + endPoint, {
			params: apiParams
		}).then(response => res.send(response.data))
}