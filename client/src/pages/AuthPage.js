import React, {useCallback, useContext, useEffect, useState} from 'react';

import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

import 'materialize-css'
import './AuthPage.css'

const AuthPage = () => {
    const auth = useContext(AuthContext);

    const { loading, error, request, clearError } = useHttp();
    const message = useMessage();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});

            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return <div className='row'>
        <div className='col s6 offset-s3'>
            <h1>Сократи ссылку</h1>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>Авторизация</span>
                    <div className={'card-content__inner'}>
                        <div className='input-field'>
                            <input
                                placeholder='Введите email'
                                id='email'
                                type='text'
                                name='email'
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor='email'></label>
                        </div>
                        <div className='input-field'>
                            <input
                                placeholder='Введите пароль'
                                id='password'
                                type='password'
                                name='password'
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor='password'></label>
                        </div>
                    </div>
                </div>
                <div className='card-action'>
                    <button
                        className='btn card-action__btn--login'
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Войти
                    </button>
                    <button
                        className='btn'
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Зарегестрироваться
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default AuthPage;