import React, { useState } from 'react';
import { Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';
import { toast } from "react-toastify";

const RegisterForm = ({ showLoginForm }) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await registerApi(formData);
            if (response?.jwt) {
                toast.success("Registro de usuario exitoso.")
                showLoginForm();
            } else {
                toast.error("Error al registrar usuario, intentelo mas tarde.");
            }
            setLoading(false);
        }
    });

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit} >
            <Form.Input name="name" type="text" placeholder="Nombre" onChange={ formik.handleChange} error={ formik.errors.name}/>
            <Form.Input name="lastname" type="text" placeholder="Apellidos" onChange={ formik.handleChange} error={ formik.errors.name}/>
            <Form.Input name="username" type="text" placeholder="Nombre de Usuario" onChange={ formik.handleChange} error={ formik.errors.name}/>
            <Form.Input name="email" type="text" placeholder="Correo" onChange={ formik.handleChange} error={ formik.errors.name}/>
            <Form.Input name="password" type="password" placeholder="Contraseña" onChange={ formik.handleChange} error={ formik.errors.name}/>
            <div className="actions">
                <Button type="button" basic onClick={ showLoginForm }>
                    Iniciar Sesion
                </Button>
                <Button type="submit" className="submit" loading={loading}>
                    Registrar
                </Button>
            </div>
        </Form>
    )
}

export default RegisterForm

const initialValues = () => ({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: ""
})

const validationSchema = () => ({
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
})