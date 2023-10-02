import axios from 'axios';
import { BASE_URL } from './endPoint';
export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})