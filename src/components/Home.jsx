import React, { useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import Users from './Users';
import { search, users } from '../store';
import HeadOptions from './HeadOptions';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { api } from '../Api/api';

const Home = () => {
    const [searchval, setSearchval] = useRecoilState(search);
    const setUsernames = useSetRecoilState(users);

    useEffect(() => {
        fetchData();
    }, [searchval])

    const fetchData = async () => {
        try {
            const response = await api.get("/Users");
            if (searchval === "") {
                setUsernames(response.data);
            }
            else {
                const userslist = response.data.filter(username => username.Username.toLowerCase().includes(searchval.toLowerCase()));
                setUsernames(userslist);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleChange = (e) => {
        const searchVal = e.target.value;
        setSearchval(searchVal);
    }

    return (
        <>
            <div className="home">
                <header>
                    <p>Chats</p>
                </header>
                <HeadOptions />
                <div className="search-container">
                    <div className="search">
                        <IoIosSearch size={30} />
                        <input
                            type="search"
                            placeholder="Search Chat"
                            name="search chat"
                            autoComplete="off"
                            value={searchval}
                            onInput={handleChange}
                        />
                    </div>
                </div>
                <Users />
            </div>
        </>
    )
}

export default Home