import { useState, useEffect } from 'react';
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from '../../Auth'
import useAuth from '../../../hooks/useAuth';
import { getMeApi } from '../../../api/user';

const UserMenu = () => {
    const [showModal, setShowModal] = useState(false);

    const [titleModal, setTitleModal] = useState("Inicia sesion");
    const [user, setUser] = useState(undefined)
    const { logout, auth } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getMeApi(logout);
            console.log(user);
            setUser(user);
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" width={6}>
                        <MenuPlatforms />
                    </Grid.Column>
                    <Grid.Column className="menu__right" width={10}>
                        {user !== undefined && <MenuOptions onShowModal={onShowModal} user={user} logout={ logout }/> }
                    </Grid.Column>
                </Grid>
                <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size="small">
                    <Auth onCloseModal={onCloseModal} setTitleModal={ setTitleModal}/>
                </BasicModal>
            </Container>
        </div>
    )
}

export default UserMenu

const MenuPlatforms = () => {
    return (
        <Menu>
            <Link href="/play-station" passHref>
                <Menu.Item as="a">Categoria 1</Menu.Item>
            </Link>
            <Link href="/play-station" passHref>
                <Menu.Item as="a">Categoria 2</Menu.Item>
            </Link>
        </Menu>
    );
}

const MenuOptions = ({ onShowModal, user, logout }) => {
    
    return (
        <Menu>
            {user ? (
                <>
                    <Link href="/orders" passHref>
                        <Menu.Item as="a"><Icon name="truck"/>Mis Pedidos</Menu.Item>
                    </Link>
                    <Link href="/wishlist" passHref>
                        <Menu.Item as="a"><Icon name="heart outline"/>Wishlist</Menu.Item>
                    </Link>
                    <Link href="/account" passHref>
                        <Menu.Item as="a"><Icon name="user outline" />{ user.name } { user.lastname }</Menu.Item>
                    </Link>
                    <Link href="/cart" passHref>
                        <Menu.Item as="a" className="m-0"><Icon name="cart" /></Menu.Item>
                    </Link>
                    <Menu.Item onClick={logout}>
                        <Icon name="power off" />Cerrar Sesion
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item onClick={ onShowModal }>
                    <Icon name="user outline" /> Mi cuenta
                </Menu.Item>
            )}
            
        </Menu>
    )
}