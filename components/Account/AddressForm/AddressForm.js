import React, { useState } from 'react';
import { Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import useAuth from '../../../hooks/useAuth';
import { createAddressApi } from '../../../api/address'
import { toast } from 'react-toastify';

const AddressForm = ({ setShowModal, setReloadAddresses, newAddress, address }) => {
    
    const [loading, setLoading] = useState(false);
    const { auth, logout } = useAuth();
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            createAddress({ ...formData, user: auth.idUser });
        }
    });

    const createAddress = async (formData) => {
        setLoading(true);
            const response = await createAddressApi(formData, logout);
            if (!response) {
                toast.warning("Error al crear la direccion");
            } else {
                formik.resetForm();
                toast.success("Direccion creada correctamente");
                setReloadAddresses();
                setShowModal(false);
            }
            setLoading(false);
     }

    return (
        <Form onSubmit={ formik.handleSubmit}>
            <Form.Input 
            name="title" 
            type="text" 
            label="Titulo de la direccion"
            placeholder="Titulo de la direccion" 
            onChange={formik.handleChange } 
            value={formik.values.title} 
            error={formik.errors.title} />
            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombre y apellidos"
                    placeholder="Nombre y apellidos"
                    onChange={formik.handleChange} 
                    value={formik.values.name} 
                    error={formik.errors.name}
                />
                <Form.Input
                    name="address"
                    type="text"
                    label="Direccion"
                    placeholder="Direccion"
                    onChange={formik.handleChange} 
                    value={formik.values.address} 
                    error={formik.errors.address}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Ciudad"
                    onChange={formik.handleChange} 
                    value={formik.values.city} 
                    error={formik.errors.city}
                />
                <Form.Input
                    name="state"
                    type="text"
                    label="Estado/Provincia/Region"
                    placeholder="Estado/Provincia/Region"
                    onChange={ formik.handleChange } 
                    value={formik.values.state} 
                    error={formik.errors.state}
                />
            </Form.Group>
            <Form.Input 
            name="phone" 
            type="text" 
            label="Numero de telefono" 
            placeholder="Numero de telefono" 
            onChange={ formik.handleChange } 
            value={formik.values.phone} 
            error={formik.errors.phone}
            />
            <div className="actions">
                <Button className="submit" type="submit" loading={ loading }>Crear direccion</Button>
            </div>
        </Form>
    )
}

export default AddressForm


const initialValues = () => ({
    title: "",
    name: "",
    address: "",
    city: "",
    state: "",
    phone: ""
})

const validationSchema = () => ({
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    phone: Yup.string().required(true)
})