import { Alert, Text, TouchableOpacity, View, TextInput, ScrollView, Keyboard } from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import { insereTipo, atualizaTipo, deletaTipo, obtemTodosTipos } from './service/tipo-service';

export default function TelaTipo({ navigation }) {

    const [id, setId] = useState();
    const [tipo, setTipo] = useState();
    const [tipos, setTipos] = useState([]);
    const [recarregaTela, setRecarregaTela] = useState(true);

    async function processamentoUseEffect() {
        if (recarregaTela) {
            console.log('Recarregando dados');
            await carregaDados();
        }
    }

    useEffect(
        () => {
            console.log('useEffect foi disparado');
            processamentoUseEffect();
        }, [recarregaTela]);

    function createUniqueId() {
        const valor = Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
        return valor;
    }

    async function carregaDados() {
        try {
            let tipos = await obtemTodosTipos();
            setTipos(tipos);
            setRecarregaTela(false);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function salvaDados(tipo) {
        let novoRegistro = false;
        let identificador = id;

        if (identificador == undefined) {
            identificador = createUniqueId();
            novoRegistro = true;
        }

        let obj = {
            id: identificador,
            descricao: tipo,
        };

        try {

            if (novoRegistro) {
                let resposta = await insereTipo(obj);
                if (resposta)
                    Alert.alert('Adicionado');
                else
                    Alert.alert('Falha');
            }
            else {
                let resposta = await atualizaTipo(obj);
                if (resposta)
                    Alert.alert('Alterado');
                else
                    Alert.alert('Falha');
            }
            Keyboard.dismiss();
            limparCampos();
            setRecarregaTela(true);
        } catch (e) {
            Alert.alert("Deu ruim");
        }
    }

    function removerElemento(id) {
        Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverTipo(id),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
    }

    async function efetivaRemoverTipo(id) {
        try {
          await deletaTipo(id);
          Keyboard.dismiss();
          Alert.alert('Tipo apagado com sucesso!');
          limparCampos();
          setRecarregaTela(true);
        } catch (e) {
          Alert.alert(e);
        }
      }

    async function limparCampos() {
        setTipo("");
    }


    return (
        <View style={styles.container}>
            <Text>Descrição do tipo:</Text>
            <TextInput placeholder='Digite aqui o tipo' onChangeText={(tipo) => setTipo(tipo)} value={tipo} />
            <TouchableOpacity style={styles.botoesHome} onPress={() => salvaDados(tipo)}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>

            <ScrollView>
                {
                    tipos.map((tipo, index) => (
                        <View style={styles.card} key={index.toString()}>

                            <Text> Descrição: {tipo.descricao}</Text>

                            <View>
                                <TouchableOpacity onPress={() => removerElemento(tipo.id)}>
                                    <Text>Deletar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>Editar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                }

            </ScrollView>
            <TouchableOpacity style={styles.botoesHome} onPress={() => navigation.navigate('Home')}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}