import React, { useEffect } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { messages, users } from '../store';
import ChatBody from './ChatBody';
import { api } from '../Api/api';

const Main = () => {
    const { id } = useParams();
    const username = useRecoilValue(users);
    const setTexts = useSetRecoilState(messages);
    const user = username.filter((user) => user.id == id);

    useEffect(() => {
        const currentPageUrl = new URL(window.location.href).pathname;
        const newData = { ...user[0], currentPageUrl };

        const setURI = async () => {
            await api.put(`/Users/${id}`, newData);
        }

        setURI();
    }, [])

    return (
        <>
            <div className="chatpage">
                <header>
                    <Link to="/" onClick={() => setTexts({})}>
                        <IoMdArrowBack size={22} />
                    </Link>
                    <div className="username">
                        <img src={user[0].Useravatar} alt="" />
                        <h3>{user[0].Username}</h3>
                    </div>
                </header>
                <ChatBody />
            </div>
        </>
    )
}

export default Main