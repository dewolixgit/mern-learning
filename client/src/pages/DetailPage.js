import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {LinkCard} from '../components/LinkCard';

const DetailPage = () => {
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);
    const [link, setLink] = useState(null);

    const { id } = useParams();

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(
                `/api/link/${id}`,
                'GET',
                null,
                {
                    Authorization: `Bearer ${token}`
                });

            setLink(fetched);
        } catch (e) {}
    }, [token, id, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && link && <LinkCard link={link} /> }
        </>
    )
}

export default DetailPage;