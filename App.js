import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, StatusBar, TextInput } from 'react-native';
import axios from 'axios'

const dadosTabela = []

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      nome: '',
      login: '',
      senha: ''
    }
  }

  componentDidMount() {
    this.buscadados()
  }

  buscadados() {
    axios.get('http://DIGITA IP DE DESTINO AQUI:3000/select').then((response) => {
      dadosTabela = response.data
    }).catch((err) => {
      console.log('deu erro', err)
    })
  }

  insereDados(nome, login, senha) {
    axios.post('http://DIGITA IP DE DESTINO AQUI/insere', { nome, login, senha })
      .then((resp) => {
        if (resp.data == 'Deu Certo') {
          this.buscadados()
        }
      }).catch((err) => {
        console.log('deu erro', err)
      })
  }

  renderItem = (source) => {
    return (
      <Text style={{ fontWeight: 'bold', color: 'blue' }} >{source.item.nomeUsuario}</Text>
    )
  }

  render() {
    return (
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <View>
          <TextInput
            placeholder='Nome'
            onChangeText={(nome) => this.setState({ nome: nome })}
          />
          <TextInput
            placeholder='Login'
            onChangeText={(login) => this.setState({ login: login })}
          />
          <TextInput
            placeholder='Senha'
            onChangeText={(senha) => this.setState({ senha: senha })}
            secureTextEntry={true}
          />

        </View>

        <Button
          title='Select'
          onPress={() => this.buscadados()}
        >
        </Button>
        <Button
          title='Insert'
          onPress={() => this.insereDados(this.state.nome, this.state.login, this.state.senha)}
        >

        </Button>
        <View>
          <FlatList

            data={dadosTabela}
            renderItem={this.renderItem}

          />
        </View>

      </View>
    );
  }
}

