import React, {useContext, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState('');

    const onChange = (e) => setLink(e.target.value);

    const onKeyPress = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    {
                        from: link
                    },
                    {
                        Authorization: `Bearer ${auth.token}`
                    }
                );

                navigate(`/detail/${data.link._id}`);
            } catch(e) {}
        }
    }

    return (
        <div className='row'>
            <div className='col s8 offset-s2'>
                <div className='input-field'>
                    <input
                        placeholder='Вставьте ссылку'
                        id='link'
                        type='text'
                        value={link}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                    <label htmlFor='link'></label>
                    <div className='red-text text-darken-4'>
                        Осторожно: вставлять ссылку нужно полностью: вместе с "http://" или "https://", иначе перенаправление не сработает
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage;