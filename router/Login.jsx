// src/components/Login.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GridRow,
  GridColumn,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Container,
  Button,
  Form,
  FormInput,
  Image
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './Login.css'
import img from '../assets/monochrome-street-food-entertainment.jpg'

function Login() {
  const location = useLocation();
  const { allData } = location.state || {}; // Recebe allData do estado de navegação

  const [dadosLogin, setDadosLogin] = useState({
    email: '',
    senha: '',
  });

  const [erros, setErros] = useState({});

  const handleChange = (e, { name, value }) => {
    setDadosLogin(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErros(prevState => {
      const newErros = { ...prevState };

      switch (name) {
        case 'email':
          if (value.length < 29) {
            newErros.email = '';
            break;
          }

          newErros.email = 'E-mail deve ter no máximo 30 caracteres';
          break;

        case 'senha':
          if(value.length > 15){
            newErros.senha = 'Senha deve ter no máximo 15 caracteres';
            break;
          }
          else if(value.length < 5){
            newErros.senha = 'Senha deve ter pelo menos 5 caracteres';
            break;
          }
          newErros.senha = ''
          break;
        default:
          break;
      }

      return newErros;
    });
  }

  const entrar = (event) => {
    event.preventDefault();

    let valid = true;
    let newErros = {};

    if (dadosLogin.email === '') {
      newErros.email = 'E-mail é obrigatório';
      valid = false;
    }

    if (dadosLogin.senha === '') {
      newErros.senha = 'Senha é obrigatória';
      valid = false;
    }

    setErros(newErros);

    if (valid) {
      // Verifica se o e-mail e a senha correspondem
      const user = allData.find(user => user.email === dadosLogin.email && user.senha === dadosLogin.senha);

      if (user) {
        console.log('Login bem-sucedido');
        // Redirecionar ou realizar outras ações
      } else {
        setErros(prevErros => ({ ...prevErros, email: 'E-mail ou senha incorretos' }));
      }

      setDadosLogin({
        email: '',
        senha: '',
      });
    }
  };

  return (
    <Container className="container-login">
      <Segment raised className="segment-login">
        <Grid columns={2} stackable textAlign='center' className="grid-login">
          <GridRow verticalAlign='middle'>
            <GridColumn className="grid-column-form">
              <Header as={'h2'} className="title">Login</Header>
              <Form style={{ textAlign: 'left' }}>
                <FormInput
                  icon='mail'
                  iconPosition='left'
                  fluid
                  maxLength={30}
                  label={<label className="white-label">E-mail</label>}
                  type="email"
                  placeholder='E-mail'
                  name='email'
                  value={dadosLogin.email}
                  onChange={handleChange}
                  error={!!erros.email}
                />
                <p className={`error-p ${erros.email ? 'active' : ''}`}>{erros.email}</p>
                <FormInput
                  icon='lock'
                  iconPosition='left'
                  fluid
                  maxLength={30}
                  label={<label className="white-label">Senha</label>}
                  type="password"
                  placeholder='Senha'
                  name='senha'
                  value={dadosLogin.senha}
                  onChange={handleChange}
                  error={!!erros.senha}
                  
                />
                <p className={`error-p ${erros.senha ? 'active' : ''}`}>{erros.senha}</p>
                <Button style={{marginBottom:'10px'}} onClick={entrar} type='button' fluid className="btn-submit">Entrar</Button>

              </Form>
              <Link to={"/outro"}>Não tem uma conta? clique aqui!
              </Link>
                <Divider horizontal>Ou</Divider>
                <Button className="btn-face">
                  <Icon name='facebook' className="icon-btn" />
                  Facebook
                </Button>
                <Button className="btn-gmail">
                  <Icon name='google plus' className="icon-btn" /> Google
                </Button>
              </GridColumn>

              <GridColumn className="grid-column-background" style={{ padding: 0, position: 'relative' }}>
                                <Image
                                    src={img}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                                <div style={{ position: 'absolute', top: 100, left: 0, width: '100%', height: '50%', display: 'block', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                <div style={{ textAlign: 'center', margin: '20px 10px' }}>
                            <Header as='h5' style={{ fontSize: '5rem', fontWeight: 'bold', color: '#e60000', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block' }}>
                                Doe
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                agora
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                e
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                veja
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                o
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                impacto
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                real
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                da
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                sua
                            </Header>
                            <Header as='h5' style={{ fontSize: '4rem', fontWeight: 'bold', color: '#e60000', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block', marginLeft: '10px' }}>
                                generosidade.
                            </Header>
                        </div>
                                </div>
                            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    </Container>
  );
}

export default Login;
