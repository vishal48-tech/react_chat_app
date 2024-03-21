import React, { useEffect, useRef } from 'react';
import MessageBox from './MessageBox';
import { LiaDownloadSolid } from "react-icons/lia";
import { useRecoilState } from 'recoil';
import { messages } from '../store';
import { useParams } from 'react-router-dom';
import { api } from '../Api/api';
import FileIcon from './FileIcon';

const ChatBody = () => {
    const { id } = useParams();
    const messagesRef = useRef();
    const [texts, setTexts] = useRecoilState(messages);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/chat/${id}`);
                if (JSON.stringify(texts) !== JSON.stringify(response.data)) {
                    setTexts(response.data);
                }
            } catch (e) {
                console.log(e.message);
            }
        }

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        if (messagesRef.current && texts.Chats) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [texts])

    return (
        <>
            <div className="chatbody">
                <div className="messages">
                    <div className="messageswrapper" ref={messagesRef}>
                        {texts && texts.Chats && texts.Chats.map((chat) => (chat.text || chat.file) && (
                            <div key={chat.id}
                                className={chat.UserID === texts.UserID ? "user1" : "user2"}
                            >
                                {chat.file &&
                                    <div className="filedata">
                                        <div>
                                            {<FileIcon filename={chat.fileName} />}
                                        </div>
                                        {chat.fileName}
                                        {<a href={chat.file} download={chat.fileName}><LiaDownloadSolid size={15} /></a>}
                                    </div>
                                }
                                {chat.text && chat.text}
                            </div>
                        ))}
                    </div>
                </div>

                <MessageBox />
            </div>
        </>
    )
}

export default ChatBody