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
import img2 from '../assets/img2.jpg'

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
          if (value.length > 29) {
            newErros.email = 'E-mail deve ter no máximo 30 caracteres';
          }
          break;
        case 'senha':
          if (value.length > 29) {
            newErros.senha = 'Senha deve ter no máximo 30 caracteres';
          }
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
                <Button onClick={entrar} type='button' fluid className="btn-submit">Entrar</Button>
              </Form>
                <Divider horizontal>Ou</Divider>
                <Button className="btn-face">
                  <Icon name='facebook' className="icon-btn" />
                  Facebook
                </Button>
                <Button className="btn-gmail">
                  <Icon name='google plus' className="icon-btn" /> Google
                </Button>
              </GridColumn>

            <GridColumn className="grid-column-background">
              <Image
                src={img2}
                size='small'
                circular
                style={{ display: 'block', margin: '0 auto' }}
              />
              <Header as='h5' textAlign='center' className="text-header-gridColumn2">
                "Doe agora e veja o impacto real da sua generosidade."
              </Header>
              <Link to={"/outro"}>
                <Button primary className="blue-outline-button">Criar Conta</Button>
              </Link>
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    </Container>
  );
}

export default Login;
