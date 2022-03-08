import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './Navbar.css';

export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const logoutHandler = (e) => {
        e.preventDefault();
        auth.logout();
        navigate('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1 nav">
                <span href="/" className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/create">Создать</Link></li>
                    <li><Link to="/links">Ссылки</Link></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}