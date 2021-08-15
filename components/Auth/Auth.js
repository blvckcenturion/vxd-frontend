import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const Auth = ({ onCloseModal, setTitleModal }) => {
    const [showLogin, setShowLogin] = useState(true);
    

    const showLoginForm = () => {
        setShowLogin(true)
        setTitleModal("Inicia Sesion");
    };
    const showRegisterForm = () => {
        setShowLogin(false)
        setTitleModal("Registrate");
    };

    return showLogin ? <LoginForm showRegisterForm={showRegisterForm} onCloseModal={ onCloseModal } /> : <RegisterForm showLoginForm={ showLoginForm }/>;
}

export default Auth
