import { useState } from 'react';
import '../../static/css/components/Chat.css'
import MessengerService from '../../services/messenger.service';
import { useEffect, useRef } from 'react';
import Loading from '../Loading';

function Chat(props)
{

    const [conversations, setConversations] = useState("");
    const [time, setTime] = useState("");
    const tmpConversations = useRef([]);
    const [messageBody, setMessageBody] = useState("");
    const [searchMessage, setSearchMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const flagTmpConv = useRef(false);

    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            console.log(searchMessage);
            if (!searchMessage)
            {
                handleConv();
                setIsLoading(false);
            }

        }, 2000);
        return () =>
        {
            clearInterval(interval);
        };
    }, []);

    const handleConv = async () =>
    {
        try
        {
            const conv = await MessengerService.getMessages(props.message.userId, props.message.logedUserId);
            setConversations(conv);

        }
        catch (err)
        {
            // console.log(err);
        }
    }
    const [chatActive, setChatActive] = useState(true);

    const HandleChatVis = () =>
    {
        setChatActive({ chatActive: !chatActive.chatActive })
    }

    const handleSendMessage = async (e) =>
    {
        e.preventDefault();
        try
        {
            await MessengerService.sendMessage(props.message.userId, props.message.logedUserId, messageBody);
            await handleConv();
            await handleMessageBodyResp();
        }
        catch (err)
        {
            //console.log(err);
        }
    }

    const handleMessageBodyResp = async () =>
    {
        const scrollArea = document.querySelector(".chat-main-content");
        scrollArea.scrollTop = scrollArea.scrollHeight;
        setMessageBody("");
    }

    const handleSearchMesage = async (e) =>
    {
        setSearchMessage(e);
        const response = await MessengerService.getMessagesByBody(props.message.userId, props.message.logedUserId, searchMessage);

        setConversations(response);

        if (!flagTmpConv.current)
        {
            tmpConversations.current = conversations;
            flagTmpConv.current = true;
        }

        if (e.length < 1)
        {
            setConversations(tmpConversations.current);
            flagTmpConv.current = false;
        }
    }

    function convertTimeZone(time)
    {
        const originalTime = new Date(time);
        const convertedTime = originalTime.toLocaleString('en-US', {
            timeZone: 'Europe/Bucharest',
        });
        return convertedTime;
    }

    return (
        <div className={chatActive.chatActive ? "chat-container-active" : "chat-container"}>
            <div onClick={HandleChatVis} className="chat-bar">
                <div className="chat-bar-name">{props.message.userFname} {props.message.userLname}</div>
            </div>
            <div className="chat-main-content">
                {
                    isLoading ?
                        (
                            <Loading />
                        )
                        :
                        (
                            <>
                                {
                                    conversations ? (conversations.map((message) =>
                                    {
                                        const uniqueKey = `${message.convId}-${message.type === 'user' ? props.message.userId : message.id}`;
                                        return message.convId === props.message.userId ? (
                                            <div className="chat-msg-this" key={uniqueKey}>
                                                <div className="chat-msg-date">
                                                    {message.createdDate.split('T')[1].split(':')[0]}
                                                    {message.createdDate.split('T')[1].split(':')[1]} /&nbsp;
                                                    {message.createdDate.split('T')[0]}
                                                </div>
                                                <div className="chat-msg-name">{props.message.userFname}</div>
                                                <div className="chat-msg-body"> {message.messageBody} </div>
                                            </div>
                                        ) : (
                                            <div className="chat-msg-other" key={uniqueKey}>
                                                <div className="chat-msg-date">
                                                    {convertTimeZone(message.createdDate).split(',')[1].split('P')[0]} /&nbsp;
                                                    {message.createdDate.split('T')[0]}
                                                </div>
                                                <div className="chat-msg-name">{props.message.logedUserFname}</div>
                                                <div className="chat-msg-body"> {message.messageBody} </div>
                                            </div>
                                        );
                                    })) :
                                        (
                                            <p>Nu exista mesaje</p>
                                        )

                                }
                            </>
                        )
                }
            </div>
            <div className="chat-input">
                <textarea placeholder='Scrie un mesaj aici...' className="chat-text-zone" type="text" value={messageBody} onChange={(e) => setMessageBody(e.target.value)}></textarea>
            </div>
            <div className="chat-input-btn">
                <img onClick={handleSendMessage} src={require('../../static/imgs/messenger/send-btn.png')} />
            </div>
            <input type="text" className="search-click-active" name="" placeholder="Cauta in conversatie..." value={searchMessage} onChange={(e) => handleSearchMesage(e.target.value)} />
        </div>
    );

}

export default Chat