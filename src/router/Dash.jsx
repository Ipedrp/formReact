import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Item,
  Label,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Dash.css';

function Dash({ allData, handleDelete, handleEdit}) {

  const data = allData;




  return (
    <>
      <Header as='h3' content='Lista de usuários' textAlign='center' className="user-list-header" />
      {data.map((item, index) => ( // Corrigido a ordem dos parâmetros (item, index)
        <Container key={index} className="user-list-container">
          <Item.Group divided>
            <Item className="user-list-item">
              <Item.Content>
                <Item.Header as='a' className="user-list-item-header">{item.nome}</Item.Header>
                <Item.Meta className="user-list-item-meta">
                  <p>{item.email}</p>
                </Item.Meta>
                <Item.Meta className="user-list-item-meta">
                  <p>{item.telefone}</p>
                </Item.Meta>
                <Item.Extra>
                  <Label className="user-list-item-label">Ver detalhes</Label>
                  <Button floated='right' className="user-list-item-button-delete" onClick={() => handleDelete(index)}>
                    Deletar
                    <Icon name='delete right' className="icon-button" />
                  </Button>
                  <Button floated='right' className="user-list-item-button-update" onClick={() => handleEdit(index)} >
                    Atualizar
                    <Icon name='undo right' className="icon-button" />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Container>
      ))}

    </>
  );
}

export default Dash;
