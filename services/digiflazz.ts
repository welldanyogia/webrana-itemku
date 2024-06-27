// services/digiflazz.ts
import axios from 'axios';

export const checkBalance = async (username: string, sign: string) => {
    // const sign = md5(username + apiKey + "depo");
    const body = {
        cmd: 'deposit',
        username,
        sign
    };

    console.log('body : ',body)

    const endpoint = 'https://api.digiflazz.com/v1/cek-saldo';

    try {
        const response = await axios.post(endpoint, body);
        if (response.status === 200 && response.data && response.data.data) {
            return response.data.data.deposit;
        } else {
            return response.data;
        }
    } catch (error : any) {
        console.error('Error in checkBalance:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchProducts = async (username: string, sign: string) => {
    // const sign = md5(username + apiKey + "depo");
    const body = {
        cmd: 'prepaid',
        username,
        sign
    };

    console.log('body : ',body)

    const endpoint = 'https://api.digiflazz.com/v1/price-list';

    try {
        const response = await axios.post(endpoint, body);
        if (response.status === 200 && response.data && response.data.data) {
            return response.data.data;
        } else {
            return response.data;
        }
    } catch (error : any) {
        console.error('Error in checkBalance:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const md5 = (data: string) => {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
};
