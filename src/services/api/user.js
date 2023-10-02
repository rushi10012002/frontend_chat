import { client } from "../axios"
import * as CONSTANT from "../endPoint"

export const loginUser = async (payload) => {
    const result = await client.post(CONSTANT.LOGIN_USER, payload);
    console.log(result);
    return result;
}
export const resisterUser = async (payload) => {
    const result = await client.post(CONSTANT.RESISTER_USER, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(result);
    return result;
}
export const UserListData = async () => {
    const result = await client.get(CONSTANT.USER_LIST);
    console.log(result);
    return result;
}