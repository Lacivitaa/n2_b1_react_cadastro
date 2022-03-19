import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import { Alert } from 'react-native-web';
import { createTable } from '../../services/service';

export default function Home({ navigation }) {

    const [atividades, setAtividades] = useState([]);
    const [recarregaTela, setRecarregaTela] = useState(true);
    const [criarTabela, setCriarTabela] = useState(false);

    async function processamentoUseEffect() {
        if (!criarTabela) {
            console.log('Verificar necessidade de criação de tabela');
            setCriarTabela(true);
            await createTable();
        }
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

    async function carregaDados() {
        try {
            //let tipos = await obtemTodasAtividades();
            //setTipos(tipos);
            setRecarregaTela(false);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botoesHome} onPress={() => navigation.navigate('TelaTipo')}>
                <Text>Cadastro de tipos de atividade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botoesHome} onPress={() => navigation.navigate('TelaAtividade')}>
                <Text>Cadastro de atividade</Text>
            </TouchableOpacity>
            <ScrollView>
                {
                    atividades.map((atividade, index) => (
                        <View key={index.toString()}>

                            <Text> Descrição: {atividade.descricao}</Text>
                            <View>
                                <Text>Tipo: {atividade.tipo} </Text>
                                <Text>Data: {atividade.data} </Text>
                                <Text>Hora: {atividade.hora} </Text>
                                <Text>Status: {atividade.status} </Text>
                            </View>

                            <View>
                                <TouchableOpacity>
                                    <Text>apaga</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>edita</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                }

            </ScrollView>
        </View>
    );
}