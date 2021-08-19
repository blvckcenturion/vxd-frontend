import React, { useState, useEffect } from 'react'
import { getAddressesApi, deleteAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';
import { Grid, Button, Loader } from 'semantic-ui-react'
import { map, set, size } from 'lodash';
import { toast } from 'react-toastify';

const ListAddress = ({ reloadAddresses, setReloadAddresses, openModal }) => {
    const [addresses, setAddresses] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);

        })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadAddresses]);

    if(!addresses) return <div className="list-address"><Loader active>Loading...</Loader></div>;

    return (
        <div className="list-address">

            {size(addresses) === 0 ? (
                <h3>No hay ninguna direccion registrada</h3>
            ): (
                <Grid>
                    {map(addresses, (address) => (
                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                            <Address address={address} logout={logout} setReloadAddresses={setReloadAddresses} openModal={ openModal }/>
                        </Grid.Column>
                    ))}
                </Grid>    
            ) }
        </div>
    )
}

export default ListAddress

const Address = ({ address, logout, setReloadAddresses, openModal}) => {
    const [loadingDelete, setloadingDelete] = useState(false);
    const deleteAddress = async () => {
        setloadingDelete(true);
        const deleted = await deleteAddressApi(address._id, logout);
        if (deleted) {
            toast.success("Direccion eliminada");
            setReloadAddresses();
            setloadingDelete(false);
        } else {
            toast.error("Error al eliminar direccion");
        }
        
    }

    return (
        <div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.state}, {address.city}</p>
            <p>{address.phone}</p>
            <div className="actions">
                <Button primary onClick={() => openModal(`Editar: ${address.title}`, address)} >Editar</Button>
                <Button onClick={deleteAddress} loading={ loadingDelete}>Eliminar</Button>
            </div>
        </div>
    )
}