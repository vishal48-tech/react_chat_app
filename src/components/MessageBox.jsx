import React, { useRef } from 'react';
import { IoIosSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useRecoilState, useRecoilValue } from 'recoil';
import { messages, text, users, files, filename } from '../store';
import { useParams } from 'react-router-dom';
import { api } from '../Api/api';
import FileIcon from './FileIcon';

const MessageBox = () => {
    const { id } = useParams();
    const inputRef = useRef();
    const [message, setMessage] = useRecoilState(text);
    const [texts, setTexts] = useRecoilState(messages);
    const [file, setFile] = useRecoilState(files);
    const [fileN, setFileN] = useRecoilState(filename);
    const username = useRecoilValue(users);

    const user = username.filter((user) => user.id == id);

    const fetchData = async () => {
        try {
            const response = await api.get(`/chat/${id}`);
            setTexts(response.data);
        } catch (e) {
            console.log(e.message);
        }
    }

    const updateApiData = async (newData, newList) => {
        try {
            const response = await api.put(`/chat/${id}`, newData);
            setTexts(response.data);
        } catch (e) {
            console.log(e.message);
        }
        finally {
            fetchData();
        }

        try {
            await api.put(`/Users/${id}`, newList);
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleClick = () => {
        const currentDate = new Date();
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = currentDate.toLocaleDateString('en-GB', options);
        options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const time = currentDate.toLocaleTimeString('en-US', options);

        if (file !== "" && message === "") {
            const chatid = texts.Chats.length ? texts.Chats[texts.Chats.length - 1].id + 1 : 1;
            const newMessage = { id: chatid, UserID: user[0].UserID, file, fileName: fileN };
            const newChats = [...texts.Chats, newMessage];
            const updatedMessages = { ...texts, Chats: newChats, UserID: user[0].UserID };
            const updatedUserlist = { ...user[0], date, time };
            updateApiData(updatedMessages, updatedUserlist);
            setTexts(updatedMessages);
            setFile("");
            setFileN("");
            inputRef.current.focus();
        }

        if (message !== "") {
            const chatid = texts.Chats.length ? texts.Chats[texts.Chats.length - 1].id + 1 : 1;
            const newMessage = file !== "" ? { id: chatid, UserID: user[0].UserID, text: message, file, fileName: fileN } : { id: chatid, UserID: user[0].UserID, text: message };
            const newChats = [...texts.Chats, newMessage];
            const updatedMessages = { ...texts, Chats: newChats, UserID: user[0].UserID };
            const updatedUserlist = { ...user[0], date, time };
            updateApiData(updatedMessages, updatedUserlist);
            setTexts(updatedMessages);
            setMessage("");
            setFile("");
            setFileN("");
            inputRef.current.focus();
        }
    }

    const handlePlusClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleCrossClick = () => {
        setFile("");
        setFileN("");
        const fileInput = document.getElementById('fileInput');
        fileInput.value = '';
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFile(reader.result);
            setFileN(file.name);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setFile("");
            setFileN("");
        }
    };

    return (
        <>
            <div className="messagecontainer">
                <div className="messagebox">
                    {file &&
                        <div id="preview">
                            <RxCross2 size={20} onClick={handleCrossClick} />
                            <div className="file">
                                <FileIcon filename={fileN} />
                                <h4>{fileN}</h4>
                            </div>
                        </div>
                    }
                    <FaPlus
                        size={15}
                        className="plusbtn"
                        onClick={handlePlusClick}
                    />
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                    />
                    <input
                        type="text"
                        placeholder="Enter message"
                        name="messagebox"
                        ref={inputRef}
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <IoIosSend
                        size={20}
                        className="sendbtn"
                        onClick={handleClick}
                    />
                </div>
            </div>
        </>
    )
}

export default MessageBox