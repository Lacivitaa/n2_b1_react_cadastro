import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export function getDbConnection(){
  const cx = SQLite.openDatabase('dbAtividades.db')
  return cx;
}

export function insereAtividade(atividade){
  return new Promise((resolve, reject) => {
      let query = `insert into tbAtividades (id, descricao, local, data, hora, status, tipo) values (?,?,?,?,?,?,?)`;
      let dbCx = getDbConnection();

      Alert.alert("ponto1"),
      dbCx.transaction(tx => {
          console.log("entrei"),
          tx.executeSql(query, [atividade.id, atividade.descricao, atividade.local, atividade.data, atividade.hora,atividade.status, atividade.tipo],
              console.log('chegou aqui'),
            (tx, resultado) => {
                console.log("ponto");
                  resolve(resultado.rowsAffected>0);
              }),
              error => {
                  console.log(error);
                  Alert.alert(error.toString()),
                  resolve(false);
              }
      })
  })
}

export function atualizaAtividade(atividade){
  return new Promise((resolve, reject) => {
      let query = 'update tbAtividades set descricao=?, tipo=?, local=?, data=?, hora=?, status=? where id=?';
      let dbCx = getDbConnection();

      dbCx.transaction(tx => {
          tx.executeSql(query, [atividade.descricao, atividade.tipo, atividade.local, atividade.data, atividade.hora,atividade.status,atividade.id],
              (tx, resultado) => {
                  resolve(resultado.rowsAffected>0);
              }),
              error => {
                  console.log(error);
                  resolve(false);
              }
      })
  })
}

export function deletaAtividade(atividade){
  return new Promise((resolve, reject) => {
      let query = 'delete from tbAtividades where id=?';
      let dbCx = getDbConnection();

      dbCx.transaction(tx => {
          tx.executeSql(query, [atividade.id],
              (tx, resultado) => {
                  resolve(resultado.rowsAffected>0);
              }),
              error => {
                  console.log(error);
                  resolve(false);
              }
      })
  })
}