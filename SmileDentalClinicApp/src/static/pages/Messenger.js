import '../css/pages/Messenger.css'
import MessengerService from '../../services/messenger.service'
import { useState, useEffect } from 'react';
import UserService from '../../services/users.service';
import Loading from '../../components/Loading';
import ToastError from '../../components/ToastError';

function Messenger()
{
    const [conversations, setConvs] = useState([]);
    const [usersConv, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const [currentUid, setCurrentUid] = useState("");
    const [currentConvid, setCurrentConvId] = useState("");
    const [logedUser, setLogedUser] = useState("");

    const [messageBody, setMessageBody] = useState("");
    const [messagesForCound, setMessagesForCount] = useState({});
    const [error, setError] = useState("");

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                await handleGetAllConversations();
                await handleGetCurrentUser();

            } catch (error)
            {
                setError("Nu am putut prelua conversatile");
            }
        };
        fetchData();

    }, []);

    useEffect(() =>
    {
        const fetchData = async (conversations) =>
        {
            try
            {
                if (conversations && conversations.length > 0)
                {
                    const response = await handleGetConvUsers(conversations);

                    await handleGetMessages(conversations[0].id);
                }

            } catch (error)
            {
                setError("Nu am putut prelua utilizatorii asociați conversației");
            }
        };
        fetchData(conversations);
    }, [conversations]);



    const handleGetAllConversations = async () =>
    {
        try
        {
            const response = await MessengerService.getAllConversations();
            if (response != null)
            {
                setConvs(response);
                const msgs = await Promise.all(
                    response.map(async (item) =>
                    {
                        const msg = await MessengerService.getMessagesFromConv(item.id);
                        return msg;
                    })
                );
                setMessagesForCount(msgs)

            }
        } catch (error)
        {
            setError("Nu am putut prelua mesajele");
        }
    };

    const handleGetConvUsers = async (conv) =>
    {
        try
        {
            const response = await UserService.getByListId(conv);
            if (response != null)
            {
                setUsers(response);
                return response;
            }
        } catch (error)
        {

        }
    };

    const handleGetMessages = async (convId) =>
    {
        try
        {
            const response = await MessengerService.getMessagesFromConv(convId);
            if (response != null)
            {
                setMessages(response);
                setCurrentConvId(convId);
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }

    const handleSendMessage = async (e) =>
    {
        e.preventDefault();
        try
        {
            if (!messageBody) { setError("Nu puteți trimite un mesaj gol"); return }
            const logedU = await handleGetCurrentUser();
            if (currentUid)
                await MessengerService.sendMessage(currentUid, logedU.id, messageBody);
            await handleGetMessages(currentConvid);
            await handleMessageBodyResp();
        }
        catch (err)
        {
            setError("Nu am putut trimite mesajul");
        }
    }

    const handleGetCurrentUser = async () =>
    {
        try
        {
            const usr = await UserService.getCurrentUser();
            setLogedUser(usr);
            return usr;
        } catch (error)
        {

        }
    }

    const handleCurrentUid = async (uid) =>
    {
        setCurrentUid(uid)
    }

    const handleMessageBodyResp = async () =>
    {
        const scrollArea = document.querySelector(".message-chat-content");
        scrollArea.scrollTop = scrollArea.scrollHeight;
        setMessageBody("");
    }

    const resetError = () =>
    {
        setError("");
    }
    return (
        <>
            {error && <ToastError message={error} duration={4000} resetError={resetError} />}
            {usersConv && conversations ? (
                conversations.length > 0 && usersConv.length > 0 ? (
                    <div className="messenger-container">
                        <div className="messenger-conv-container">
                            {conversations.map((conv, index) =>
                            {
                                const user = usersConv.find((user) => String(user.id) === String(conv.otherId) || user.id === conv.userId);

                                return (
                                    <div className="conv-container" key={conv.id} onClick={() =>
                                    {
                                        handleGetMessages(conv.id);
                                        handleCurrentUid(user.id);
                                    }}>
                                        <div className="conv-image">
                                            <img src={user.profileImage ? require(`../${user.profileImage.split('static/')[1]}`) : require('../../static/imgs/users_profile/no-profile.png')} />
                                        </div>
                                        <div className="info-conv">
                                            <div className="conv-name">{user ? (user.fname + " " + user.lnmae) : 'placeholder'}</div>
                                            <div className="info-conv-msgs">Mesaje: {messagesForCound[index].length}</div>
                                            {/* <div className="info-conv-date">Data ultimului mesaj: {messagesForCound[index][messagesForCound[index].length - 1].createdDate.split("T")[1].split(":")[0]}:
                                                {messagesForCound[index][messagesForCound[index].length - 1].createdDate.split("T")[1].split(":")[1]} <br />
                                                {messagesForCound[index][messagesForCound[index].length - 1].createdDate.split("T")[0]}</div> */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="messenger-chat-container">
                            <div className="message-chat-content">
                                {usersConv && messages && messages.length > 0 && usersConv.length > 0 && messages.map((message) =>
                                {
                                    const user = usersConv.find((user) => user.id === message.convId);

                                    return user ? (
                                        <div className="message-chat-msg-right" key={message.id}>
                                            <div className="msg-sender">{user ? user.fname + " " + user.lnmae : logedUser.fname + " " + logedUser.lnmae}</div>
                                            <div className="msg-body">{message.messageBody}</div>
                                        </div>
                                    ) : (
                                        <div className="message-chat-msg-left" key={message.id}>
                                            <div className="msg-sender">{user ? user.fname + " " + user.lnmae : logedUser.fname + " " + logedUser.lnmae}</div>
                                            <div className="msg-body">{message.messageBody}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="input-container">
                                <input id="input-text" type="textarea" value={messageBody} onChange={(e) => setMessageBody(e.target.value)} required />
                                <img onClick={handleSendMessage} src={require('../../static/imgs/messenger/send-btn.png')} />
                            </div>
                        </div>
                    </div>
                ) : (
                    usersConv.length === 0 && conversations.length === 0 ? (
                        <div className='no-message'>Nu ai nici o conversație deschisă.</div>
                    ) : (
                        <Loading />
                    )
                )
            ) : (
                <Loading />
            )}


        </>
    )
}

export default Messenger