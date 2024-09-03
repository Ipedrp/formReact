import React, { useState, useEffect } from "react";
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
    FormGroup,
    FormSelect,
    Image
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './Login.css'
import { Link } from "react-router-dom";
import img from '../assets/monochrome-street-food-entertainment.jpg'
import Dash from "./Dash";

import validator from 'validator';



function Outro() {
    const [dados, setDados] = useState({
        nome: "",
        sobrenome: "",
        telefone: "",
        cpf: "",
        email: "",
        confirmarEmail: "",
        senha: "",
        confirmarSenha: "",
    });

    const [allData, setAllData] = useState([]);
    const [erros, setErros] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);



    useEffect(() => {
        console.log("aqui estão todos os dados", allData);
    }, [allData]);



    const formatCPF = (cpf) => {
        
        const cleaned = ('' + cpf).replace(/\D/g, '');

        // Aplica a máscara
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return cleaned;
    }

    const formatTelefone = (telefone) => {
        
        const cleaned = ('' + telefone).replace(/\D/g, '');

        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/); 
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        
        const matchTenDigits = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/); // Para números no formato (99) 9999-9999
        if (matchTenDigits) {
            return `(${matchTenDigits[1]}) ${matchTenDigits[2]}-${matchTenDigits[3]}`;
        }

        return cleaned; 
    };


    const handleChange = (e, { name, value }) => {

        if (name === 'cpf') {
            // Aplica a máscara ao CPF
            setDados({ ...dados, [name]: formatCPF(value) });
        } else if (name === 'telefone') {
            // Aplica a máscara ao telefone
            setDados({ ...dados, [name]: formatTelefone(value) });
        } else {

            setDados((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }



        setErros((prevState) => {
            const newErros = { ...prevState };
            switch (name) {
                case "nome":
                    if (value.length > 19) {
                        newErros.nome = "Nome deve ter no máximo 20 caracteres";
                        break;
                    }
                    newErros.nome = "";
                    break;
                case "sobrenome":
                    if (value.length > 55) {
                        newErros.sobrenome = "Sobrenome máximo 60 caracteres";
                        break;
                    }
                    newErros.sobrenome = "";
                    break;
                case "telefone":
                    if (value.length != 15) {
                        newErros.telefone = "Telefone  11 caracteres";
                        break;
                    }
                    newErros.telefone = "";
                    break;
                case "cpf":
                    if (value.length != 11) {
                        newErros.cpf = "CPF 11 caracteres";
                        break;
                    }
                    newErros.cpf = "";
                    break;
                case "email":
                    if (value.length > 29) {
                        newErros.email = "E-mail máximo 30 caracteres";
                        break;
                    }
                    newErros.email = "";
                    break;
                case "confirmarEmail":
                    if (value.length > 29) {
                        newErros.confirmarEmail = "Confirmar E-mail máximo 30 caracteres";
                        break;
                    }
                    newErros.confirmarEmail = "";
                    break;
                case "senha":
                    if (value.length > 29) {
                        newErros.senha = "Senha máximo 30 caracteres";
                        break;
                    }
                    else if(value.length <5){
                        newErros.senha = "Senha mínimo 5 caracteres";
                        break;
                    }
                    newErros.senha = "";
                    break;
                case "confirmarSenha":
                    if (value.length > 29) {
                        newErros.senha = "Senha máximo 30 caracteres";
                        break;
                    }
                    else if(value.length < 5){
                        newErros.senha = "Senha mínimo 5 caracteres";
                        break;
                    }
                    newErros.senha = "";
                    break;
                default:
                    break;
            }
            
            return newErros;
        });
    };

    const logNome = (event) => {
        event.preventDefault();
        let valid = true;
        let newErros = {};



        if (dados.confirmarSenha === "") {
            newErros.confirmarSenha = "Confirmar senha é obrigatório";
            valid = false;
        }
        if (dados.email !== dados.confirmarEmail) {
            newErros.email = "E-mail não está igual!";
            newErros.confirmarEmail = "E-mail não está igual!";
            valid = false;
        }

        if (dados.senha !== dados.confirmarSenha) {
            newErros.senha = "Senha não está igual!";
            newErros.confirmarSenha = "Senha não está igual!";
            valid = false;
        }

        if (!dados.nome) {
            newErros.nome = "Nome é obrigatório";
            valid = false;
        }
        if (dados.sobrenome === "") {
            newErros.sobrenome = "Sobrenome é obrigatório";
            valid = false;
        }
        if (dados.telefone === "") {
            newErros.telefone = "Telefone é obrigatório";
            valid = false;
        }
        if (dados.cpf === "") {
            newErros.cpf = "CPF é obrigatório";
            valid = false;
        }
        if (dados.email) {
              if(!validator.isEmail(dados.email)){
            newErros.email = "E-mail inválido";
            valid = false;
              }
        }
        if(!dados.email){
            newErros.email = "E-mail é obrigatório";
            valid = false;
        }
        
        
        if (dados.confirmarEmail === "") {
            newErros.confirmarEmail = "Confirmar E-mail é obrigatório";
            valid = false;
        }
        if (dados.senha === "") {
            newErros.senha = "Senha é obrigatória";
            valid = false;
        }
      

        // Verificar se o e-mail já existe
        if (!isEditing) {

            const emailExists = allData.some(item => item.email === dados.email);
            if (emailExists) {
                newErros.email = "E-mail já cadastrado!";
                valid = false;
            }
        }

        setErros(newErros);

        if (valid) {

            if (isEditing) {
                const updatedData = [...allData];
                updatedData[editIndex] = { ...dados };
                setAllData(updatedData);
                setIsEditing(false);
                setEditIndex(null);
            } else {
                setAllData((prevData) => [...prevData, { ...dados }]);
            }

            setDados({
                nome: "",
                sobrenome: "",
                telefone: "",
                cpf: "",
                email: "",
                confirmarEmail: "",
                senha: "",
                confirmarSenha: "",
            });
        }
    };
    const handleEdit = (index) => {
        setDados(allData[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        setAllData(allData.filter((_, i) => i !== index));
    };



    return (
        <>
            {/* Renderiza o formulário normal ou  de edição com base no estado isEditing */}

            <Container className="container-login">

                <Segment raised className="segment-login">
                    <Grid columns={2} stackable textAlign='center' className="grid-login">
                        <GridRow verticalAlign='middle'>
                            <GridColumn className="grid-column-form">
                                <Header as={"h2"} className="title">
                                    {isEditing ? "Editar Cadastro" : "Cadastro"}
                                </Header>
                                <Form style={{ textAlign: 'left' }}>
                                    <FormGroup widths='equal'>
                                        <FormInput
                                            fluid
                                            label={<label className="white-label">Nome</label>}
                                            type="text"
                                            maxLength={20}
                                            error={!!erros.nome}
                                            placeholder='Nome'
                                            name="nome"
                                            value={dados.nome}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            label={<label className="white-label">Sobrenome</label>}
                                            type="text"
                                            maxLength={60}
                                            error={!!erros.sobrenome}
                                            placeholder='Sobrenome'
                                            name="sobrenome"
                                            value={dados.sobrenome}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <div className="error-container">
                                    <p className={`error-p ${erros.nome ? 'active' : ''}`}>{erros.nome}</p>
                                    <p className={`error-p ${erros.sobrenome ? 'active' : ''}`}>{erros.sobrenome}</p>
                                    </div>
                                    <FormGroup widths='equal'>
                                        <FormInput
                                            icon={"phone"}
                                            iconPosition="left"
                                            fluid
                                            label={<label className="white-label">Telefone</label>}
                                            type="text" // Usando type text para permitir a validação personalizada
                                            maxLength={15}
                                            error={!!erros.telefone}
                                            placeholder='Telefone'
                                            name="telefone"
                                            value={dados.telefone}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            icon={"address card"}
                                            iconPosition="left"
                                            fluid
                                            label={<label className="white-label">CPF</label>}
                                            type="text" // Usando type text para permitir a validação personalizada
                                            maxLength={14}
                                            error={!!erros.cpf}
                                            placeholder='CPF'
                                            name="cpf"
                                            value={dados.cpf}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <div className="error-container">
                                    <p className={`error-p ${erros.telefone ? 'active' : ''}`}>{erros.telefone}</p>
                                    <p className={`error-p ${erros.cpf ? 'active' : ''}`}>{erros.cpf}</p>
                                    </div>
                                    <FormGroup widths='equal'>
                                        <FormInput
                                            icon={"mail"}
                                            iconPosition="left"
                                            fluid
                                            maxLength={30}
                                            name="email"
                                            label={<label className="white-label">E-mail</label>}
                                            placeholder='E-mail'
                                            error={!!erros.email}
                                            value={dados.email}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            icon={"mail"}
                                            iconPosition="left"
                                            fluid
                                            maxLength={30}
                                            label={<label className="white-label">Confirmar e-mail</label>}
                                            type="email"
                                            placeholder='Confirmar e-mail'
                                            name="confirmarEmail"
                                            error={!!erros.confirmarEmail}
                                            value={dados.confirmarEmail}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <div className="error-container">
                                    <p className={`error-p ${erros.email ? 'active' : ''}`}>{erros.email}</p>
                                    <p className={`error-p ${erros.confirmarEmail ? 'active' : ''}`}>{erros.confirmarEmail}</p>
                                    </div>
                                    <FormGroup widths='equal'>
                                        <FormInput
                                            icon='lock'
                                            iconPosition='left'
                                            fluid
                                            maxLength={30}
                                            label={<label className="white-label">Senha</label>}
                                            type="password"
                                            placeholder='Senha'
                                            name="senha"
                                            error={!!erros.senha}
                                            value={dados.senha}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            icon='lock'
                                            iconPosition='left'
                                            fluid
                                            maxLength={30}
                                            label={<label className="white-label">Confirmar senha</label>}
                                            type="password"
                                            placeholder='Confirmar senha'
                                            name="confirmarSenha"
                                            error={!!erros.confirmarSenha}
                                            value={dados.confirmarSenha}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <div className="error-container">
                                    <p className={`error-p ${erros.senha ? 'active' : ''}`}>{erros.senha}</p>
                                    <p className={`error-p ${erros.confirmarSenha ? 'active' : ''}`}>{erros.confirmarSenha}</p>
                                    </div>
                                    <Button style={{marginBottom:'10px'}} type='button' onClick={logNome} fluid className="btn-submit">{isEditing ? "Atualizar" : "Cadastrar"}</Button>

                                </Form>
                                <Link to={"/"}>Já tem uma conta? clique aqui
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
                            <Header as='h5' style={{ fontSize: '5rem', fontWeight: 'bold', color: '#ffff', lineHeight: '1.5', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'inline-block' }}>
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
            {allData.length > 0 ?

                <Dash
                    allData={allData}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
                :
                <Header as='h3' content='Nenhum usuário cadastrado!' textAlign='center' className="user-list-header" />
            }
        </>
    )
}

export default Outro;