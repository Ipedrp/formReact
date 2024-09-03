import React, { useState } from 'react';
import { Menu, Icon, Button, Container, Sidebar, Segment, Visibility } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    const [visible, setVisible] = useState(false);

    const handleSidebarToggle = () => setVisible(!visible);

    return (
        <div>
            <Visibility>
                <Segment className="segment">
                    <Container>
                        <Menu className="menu" secondary>
                            <Menu.Item className="header" header>Anjo bom</Menu.Item>
                            <Menu.Item position='right'>
                                <Button
                                    className="button"
                                    icon

                                    onClick={handleSidebarToggle}
                                    aria-label='Toggle Menu'
                                >
                                    <Icon className="icon" name={visible ? 'close' : 'bars'} />
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Container>
                </Segment>
            </Visibility>

            <Sidebar
                as={Menu}
                className="sidebar"
                animation='overlay'
                icon='labeled'
                vertical
                visible={visible}
                width='thin'
            >
                <Menu.Item as='a' onClick={handleSidebarToggle}>
                    <Icon className="icon" name='close' />
                </Menu.Item>
                <Link to={"/"}>

                    <Menu.Item as='a'>Login</Menu.Item>
                </Link>
                <Link to={"/outro"}>

                    <Menu.Item as='a'>Cadastro</Menu.Item>
                </Link>
            </Sidebar>
            <Sidebar.Pusher>
                <div style={{ padding: '2em' }}>
                    {/* Adicione seu conteúdo principal aqui */}
                </div>
            </Sidebar.Pusher>
        </div>
    );
};

export default Navbar;
