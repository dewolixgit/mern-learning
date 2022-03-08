import React from 'react';
import {useRoutes} from './routes';
import {BrowserRouter} from 'react-router-dom';

import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader';

import './index.css'
import 'materialize-css/dist/css/materialize.min.css'


const App = () => {
    const { token, userId, logout, login, ready } = useAuth();

    const isAuthenticated = Boolean(token);

    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, ifAuthenticated: isAuthenticated
        }}>
            <BrowserRouter>
                { isAuthenticated && <Navbar /> }
                <div className={'container'}>
                    { routes }
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
