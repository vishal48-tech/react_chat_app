import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { lastChat, users } from '../store';
import { Link } from 'react-router-dom';
import { api } from '../Api/api';
import { FaFile } from 'react-icons/fa';

const Header = () => {
    const [usernames, setUsernames] = useRecoilState(users);
    const [chats, setChats] = useRecoilState(lastChat);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/Users");
                setUsernames(response.data);
            } catch (e) {
                console.log(e.message);
            }
        }

        fetchData();

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/chat`);
                setChats(response.data);
            } catch (e) {
                console.log(e.message);
            }
        }

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
    }, [])


    return (
        <>
            <div className="users">
                {usernames
                    .slice() // Create a copy of the array to avoid mutating the original array
                    .sort((a, b) => {
                        // Function to check if date or time is missing
                        const isMissingDateTime = (user) => !user.date && !user.time;

                        // Move users with missing date or time to the end
                        if (isMissingDateTime(a) && !isMissingDateTime(b)) {
                            return 1; // a should come after b
                        } else if (!isMissingDateTime(a) && isMissingDateTime(b)) {
                            return -1; // a should come before b
                        } else if (isMissingDateTime(a) && isMissingDateTime(b)) {
                            return 0; // Keep original order if both are missing
                        }

                        // Convert 'dd/mm/yyyy hh:mm:ss' to a Date object for comparison
                        const convertToDateObject = (dateStr, timeStr) => {
                            const [day, month, year] = dateStr.split('/');
                            const date = new Date(`${year}-${month}-${day}T${timeStr}`);
                            return date;
                        };

                        const dateTimeA = convertToDateObject(a.date, a.time);
                        const dateTimeB = convertToDateObject(b.date, b.time);

                        // Compare the Date objects
                        return dateTimeB - dateTimeA;
                    })
                    .map((user) => (
                        <Link to={`/chat/${user.id}`} key={user.id} className="userdata">
                            <img src={user.Useravatar} alt="" />
                            <div className="usertext">
                                <div>
                                    <h3>{user.Username}</h3>
                                    {chats
                                        .filter((item) => item.id === user.id && item.Chats && item.Chats.length > 0)
                                        .map((item) => (
                                            <p key={item.id}>
                                                {!item.Chats[item.Chats.length - 1].fileName && (item.Chats[item.Chats.length - 1].text.length > 15
                                                    ? `${item.Chats[item.Chats.length - 1].text.slice(0, 15)}...`
                                                    : item.Chats[item.Chats.length - 1].text)
                                                }
                                                {item.Chats[item.Chats.length - 1].fileName &&
                                                    <>
                                                        <FaFile size={13} /> {`File`}
                                                    </>
                                                }
                                            </p>
                                        ))}
                                </div>
                                <div>
                                    <p>
                                        {user.date && user.time && (
                                            new Date(user.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3') + ' ' + user.time) < new Date(new Date().setHours(0, 0, 0, 0))
                                                ? user.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1/$2/') + user.date.slice(-2) // Show date in 'dd/mm/yy' format if it's yesterday or earlier
                                                : user.time.slice(0, 5) // Show time if it's today
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    )
}

export default Header