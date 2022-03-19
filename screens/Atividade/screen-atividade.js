import { Text, TouchableOpacity, View, Button, TextInput, Alert } from 'react-native';
import styles from './styles';
import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import { insereAtividade } from './service/atividade-service';

export default function TelaAtividade({ navigation }) {

    const [id, setId] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('2020-10-02');
    const [desc, setDesc] = useState('');
    const [local, setLocal] = useState('');
    const [hora, setHora] = useState('22:20');
    const [tipo, setTipo] = useState('1');
    const [checked, setChecked] = React.useState('first');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        getDate(date);
        hideDatePicker();
    };

    const getDate = (dateomponent) => {
        var dtNew = new Date(dateomponent).toISOString();
        let splitDt = dtNew.split('T');
        return dateomponent !== ''
            ? setDate(splitDt[0])
            : '';
    };

    function createUniqueId() {
        const valor = Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
        return valor;
    }

    async function salvaDados(desc, tipo, local, dtEnt, hour, status) {
        let novoRegistro = false;
        let identificador = id;

        if (identificador == undefined) {
            identificador = createUniqueId();
            novoRegistro = true;
        }

        if (status == 'first') {
            status = '1';
        }
        else
            status = '0';

        let obj = {
            id: identificador,
            descricao: desc,
            tipo: tipo,
            local: local,
            data: dtEnt,
            hora: hour,
            status: status,
        };

        try {
            if (novoRegistro) {
                let resposta = await insereAtividade(obj);
                if (resposta)
                    Alert.alert('Adicionado');
                else
                    Alert.alert('Falha');
            }
            Keyboard.dismiss();
            limparCampos();
        } catch (e) {
            Alert.alert("Deu ruim");
        }
    }

    async function limparCampos() {
        setDesc("");
        setLocal("");
    }

    return (
        <View style={styles.container}>
            <Text>Descrição da atividade:</Text>
            <TextInput placeholder='Digite aqui a descrição' onChangeText={(desc) => setDesc(desc)} value={desc} />
            <Text>Tipo de atividade:</Text>
            <Text>Local da atividade:</Text>
            <TextInput placeholder='Digite aqui o local' onChangeText={(local) => setLocal(local)} value={local} />
            <Text>Data da entrega:</Text>
            <TextInput
                style={styles.textInput}
                value={date}
                placeholder="Data da prova"
            />
            <Button onPress={(showDatePicker)} title="Insira a data" />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Text>Hora da entrega:</Text>
            <Text>Status da atividade:</Text>
            <Text>Concluido</Text>
            <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
            />
            <Text>Pendente</Text>
            <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
            />
            <TouchableOpacity style={styles.botoesHome} onPress={() => salvaDados(desc, tipo, local, date, hora, checked)}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botoesHome} onPress={() => navigation.navigate('Home')}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}