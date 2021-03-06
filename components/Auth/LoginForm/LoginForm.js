import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { loginApi, resetPasswordApi } from '../../../api/user';
import  useAuth  from '../../../hooks/useAuth';

const LoginForm = ({ showRegisterForm, onCloseModal }) => {
    const [loading, setLoading] = useState(false);
    const { auth, login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await loginApi(formData);
            if (response?.jwt) {
                login(response.jwt);
                toast.success("Login success");
                onCloseModal();
            } else {
                toast.error("Error logging in");
            }
            setLoading(false);
        }
    })

    const resetPassword = () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email().required();
    
        if (!validateEmail.isValidSync(formik.values.identifier)) {
          formik.setErrors({ identifier: true });
        } else {
          resetPasswordApi(formik.values.identifier);
        }
      };

    return (
        <Form className="login-form" onSubmit={ formik.handleSubmit }>
            <Form.Input name="identifier" type="text" placeholder="Correo electronico" onChange={formik.handleChange} error={ formik.errors.identifier}/>
            <Form.Input name="password" type="password" placeholder="Contraseña" onChange={formik.handleChange} error={ formik.errors.identifier}/>
            <div className="actions">
                <Button type="button" basic onClick={ showRegisterForm }>
                    Registrarse
                </Button>
                <div>
                    <Button className="submit" type="submit" loading={ loading }>
                        Entrar
                    </Button>
                    <Button type="button" onClick={ resetPassword }>
                        Has olvidado la contraseña?
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default LoginForm

const initialValues = () => ({
    identifier: "",
    password: ""
})

const validationSchema = () => ({
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required()
})