import axios from "axios";
import UserService from "./users.service";
const API_URL = "https://localhost:5003/";

const getMessagesFromConv = async (convId) =>
{
    const response = await axios.get(API_URL + "messages/convmessages/" + convId);
    if (response)
    {
        return (response.data);
    }
}

const getConversations = async (userId, logedUserId) =>
{
    try
    {
        const response = await axios.get(API_URL + "conversations/" + logedUserId + "/" + userId);
        if (response)
        {
            return response.data[0].id
        }
    }
    catch (error)
    {
        return null;
    }
}


const getMessages = async (userId, logedUserId) =>
{
    const conversation = await getConversations(userId, logedUserId);
    if (conversation)
    {
        const messages = await getMessagesFromConv(conversation);
        if (messages)
        {
            return messages;
        }
    }
    return null;
}

const getMessagesByBody = async (userId, logedUser, messageBody) =>
{
    try
    {
        const conversationId = await getConversations(userId, logedUser);
        if (conversationId)
        {
            const response = await axios.get(API_URL + "messages/body/" + userId + "/" + conversationId + "/" + messageBody);
            if (response.data)
                return response.data;
        }
    }
    catch (error)
    {
        console.log(error);
        return null;
    }

}

const sendMessage = async (userId, logedUserId, messageBody) =>
{
    try
    {
        let conversationId = await getConversations(userId, logedUserId);
        if (!conversationId)
        {

            await createConversation(userId, logedUserId);
            conversationId = await getConversations(userId, logedUserId);
            if (!conversationId) { throw new Error("Ceva nu a mers bine la preluarea mesajelor"); };
            await axios.post(API_URL + "messages/send", { userId: logedUserId, conversationId, messageBody });
        }
        else
        {
            await axios.post(API_URL + "messages/send", { userId: logedUserId, ConvId: conversationId, messageBody });
        }
    }
    catch (error)
    {
        console.log(error);
    }
}

const createConversation = async (userId, logedUserId) =>
{
    try
    {
        await axios.post(API_URL + "conversations", { UserId: userId, OtherId: logedUserId });
    }
    catch (error)
    {

    }

}


const getAllConversations = async () =>
{
    try
    {
        const currentUser = await UserService.getCurrentUser();
        if (currentUser)
        {
            const response = await axios.get(API_URL + "conversations/" + currentUser.id);
            if (response.data)
                return response.data;
        }
    }
    catch (error)
    {
        console.log(error);
        return null;
    }
}

const MessengerService = {
    getMessages,
    sendMessage,
    getMessagesByBody,
    getAllConversations,
    getMessagesFromConv
};

export default MessengerService;