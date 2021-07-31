import Cookies from 'js-cookie';
import axios from 'axios';

const token = Cookies.get('id_token');
// const baseDomain = 'http://45.76.97.89:3000';
const baseDomain = 'http://localhost/shafeeque/backend-modesy/api';
// const baseDomain = 'https://backend.flashdeals.pk/api';

export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders
});

export const serializeQuery = query => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
};