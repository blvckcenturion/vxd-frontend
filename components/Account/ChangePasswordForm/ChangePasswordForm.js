import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/user";

const ChangePasswordForm = ({ user, logout }) => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updatePasswordApi(
              user.id,
              formData.password,
              logout
            );

            if (!response) {
              toast.error("Error al actualizar la contraseña");
            } 
            else {
              logout();
            }
            setLoading(false);
          },
    })

    return (
        <div className="change-password-form">
        <h4>Cambiar tu contraseña</h4>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="password"
              type="password"
              placeholder="Tu nueva contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
            <Form.Input
              name="repeatPassword"
              type="password"
              placeholder="Confirma tu nueva contraseña"
              onChange={formik.handleChange}
              value={formik.values.repeatPassword}
              error={formik.errors.repeatPassword}
            />
          </Form.Group>
            <Button className="submit" type="submit" loading={loading} >
            Actualizar
          </Button>
        </Form>
      </div>
    )
}

export default ChangePasswordForm

const initialValues = () => {
    return {
      password: "",
      repeatPassword: "",
    };
}

const validationSchema = () => ({
    password: Yup.string()
    .required(true)
    .oneOf([Yup.ref("repeatPassword")], true),
  repeatPassword: Yup.string()
    .required(true)
    .oneOf([Yup.ref("password")], true),
})


