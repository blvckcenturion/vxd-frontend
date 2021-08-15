import React from 'react'

const LoginForm = ({ showRegisterForm }) => {
    
    return (
        <div>
            <h1>Estamos en el formulario de login</h1>
            <button onClick={ showRegisterForm}>Ir al registro</button>
        </div>
    )
}

export default LoginForm
