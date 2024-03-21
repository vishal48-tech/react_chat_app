import React from 'react'
import { Link } from 'react-router-dom';

const HeadOptions = () => {
    const url = window.location.href;
    const endpoint = url.split('/').pop();

    return (
        <>
            <div className="headOptions">
                <Link to="/" className={`${endpoint === "" && "selected"}`}>Chats</Link>
                <Link to="/contacts" className={`${endpoint !== "" && "selected"}`}>Contacts</Link>
            </div>
        </>
    )
}

export default HeadOptions