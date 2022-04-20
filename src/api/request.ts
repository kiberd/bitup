// import jwt from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { encode } from 'querystring';
import CryptoJS from 'crypto-js';


export const getAuthToken = (params: string) => {

  const ACCESS_KEY: any = process.env.REACT_APP_UPBIT_ACCESS_KEY;
  const SECRET_KEY: any = process.env.REACT_APP_UPBIT_SECRET_KEY;

  const query = encode({
    /* 요청할 파라미터 */
    params
  });

  const queryHash = CryptoJS.enc.Hex.stringify(CryptoJS.SHA512(query));
  
  const payload = {
    access_key: ACCESS_KEY,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const jwtToken = sign(payload, SECRET_KEY);
  const authorizationToken = `Bearer ${jwtToken}`;

  return authorizationToken;

};
