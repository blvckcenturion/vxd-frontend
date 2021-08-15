import React, { useState } from 'react';
import { Form, Button} from 'semantic-ui-react';

const RegisterForm = ({ showLoginForm}) => {
    return (
        <div>
            <h1>Estamos en el register</h1>
            <button onClick={ showLoginForm }>Ir al login</button>
        </div>
    )
}

export default RegisterForm
