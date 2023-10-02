import { client } from "../axios";
import * as CONSTANT from "../endPoint"
export const createConversation = async (payload) => {
    const result = await client.post(CONSTANT.CONVERSATION_CHAT, payload);
    console.log(result);
    return result;
}
export const createConversationMessage = async (payload) => {
    const result = await client.post(CONSTANT.CONVERSATION_MESSAGE, payload);
    console.log(result);
    return result;
}
export const createConversationMessageFile = async (payload) => {
    const result = await client.post(CONSTANT.CONVERSATION_MESSAGE_FILE, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(result);
    return result;
}
export const getConversationMessages = async (id) => {
    const result = await client.get(CONSTANT.CONVERSATION_MESSAGE_LIST + "/" + id);
    console.log(result);
    return result;
}