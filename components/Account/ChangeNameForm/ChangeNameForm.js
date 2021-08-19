import React, { useRef, useState } from 'react';
import { Form, Button, Ref } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { updateNameApi } from '../../../api/user';

const ChangeNameForm = ({ user, logout, setReloadUser }) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateNameApi(user.id, formData, logout);
            if (!response) {
                toast.error("Error al actualizar nombre y apellidos!")
            } else {
                toast.success("Nombre actualizado")
                setReloadUser();
            }
            setLoading(false);
        }
    })

    return (
        <div className="change-name-form">
            <h4>Cambia tu nombre y apellidos</h4>
            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group widths="equal">
                    <Form.Input
                        name="name"
                        placeholder="Nombre"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                    />
                    <Form.Input
                        name="lastname"
                        placeholder="Apellidos"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={formik.errors.lastname}
                    />
                </Form.Group>
                <Button className="submit" type="submit" loading={ loading }>Actualizar</Button>
            </Form>
        </div>
    )
}

export default ChangeNameForm

const initialValues = (user) => ({
    name: user?.name || "" ,
    lastname: user?.lastname || ""
 })

const validationSchema = () => ({
    name: Yup.string().required(true),
    lastname: Yup.string().required(true)
 })