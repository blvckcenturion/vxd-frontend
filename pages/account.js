import React, { useState, useEffect} from 'react';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm';
import { Icon } from 'semantic-ui-react';
import BasicModal from '../components/Modal/BasicModal';
import AddressForm from '../components/Account/AddressForm';
import ListAddress from '../components/Account/ListAddress';
import Seo from '../components/Seo';

const Account = () => {
    const [user, setUser] = useState(undefined);
    const router = useRouter();
    const { logout, auth, setReloadUser } = useAuth();
    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null);
        })()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    if (user === undefined) return <h1>HOLA</h1>;
    if (!auth && !user) {
        router.replace('/')
        return null;
    }

    return (
        <BasicLayout className="account">
            <Seo title={"Mi cuenta"}/>
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser} />
            <Addresses/>
        </BasicLayout>
    )
}

export default Account

const Configuration = ({ user, logout, setReloadUser  }) => {
    return (
        <div className="account__configuration">
            <div className="title">Configuracion</div>
            <div className="data">
                <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangePasswordForm user={user} logout={ logout } />
            </div>
        </div>
    )
}

const Addresses = () => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);
    const [reloadAddresses, setreloadAddresses] = useState(false);

    const setReloadAddresses = () => {
        setreloadAddresses(!reloadAddresses);
    }

    const openModal = (title, address) => {
        setTitleModal(title);
        setFormModal(
            <AddressForm
                setShowModal={setShowModal}
                setReloadAddresses={setReloadAddresses}
                newAddress={address ? false : true}
                address={ address || null}
            />)
        setShowModal(true);
    }

    return (
        <div className="account__addresses">
            <div className="title">Direcciones <Icon name="plus" link onClick={  () => openModal("Nueva Direccion") }/></div>
            <div className="data">
                <ListAddress
                    reloadAddresses={reloadAddresses}
                    setReloadAddresses={setReloadAddresses}
                    openModal={ openModal}
                />
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={ titleModal }>
                { formModal}
            </BasicModal>
        </div>
    )
}