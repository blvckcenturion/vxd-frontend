import { useState } from 'react';
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from '../../Auth'
const UserMenu = () => {
    const [showModal, setShowModal] = useState(false);

    const [titleModal, setTitleModal] = useState("Inicia sesion");

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
                        <MenuOptions onShowModal={ onShowModal }/>
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
                <Menu.Item as="a">Playstation</Menu.Item>
            </Link>
            <Link href="/play-station" passHref>
                <Menu.Item as="a">Playstation</Menu.Item>
            </Link>
            <Link href="/play-station" passHref>
                <Menu.Item as="a">Playstation</Menu.Item>
            </Link>
        </Menu>
    );
}

const MenuOptions = ({ onShowModal }) => {
    
    return (
        <Menu>
            <Menu.Item onClick={ onShowModal }>
                <Icon name="user outline" />
                Mi cuenta
            </Menu.Item>
        </Menu>
    )
}