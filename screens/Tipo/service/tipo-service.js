import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbAtividades.db')
    return cx;
}

export function obtemTodosTipos() {
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbTipo';
            tx.executeSql(query, [],
                (tx, registros) => {
                    var retorno = []
                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            descricao: registros.rows.item(n).descricao,
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno)
                })
        })
    })
}

export function recuperaTipo(descricao) {
    return new Promise((resolve, reject) => {
        let query = 'select id from tbTipo where descricao=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [atividade.descricao],
                (tx, resultado) => {
                    var retorno = resultado.rows.item(0).id;
                    resolve(retorno);      
                }),
                error => {
                    console.log(error);
                    resolve(null);
                }
        })
    })
}

export function insereTipo(tipo) {
    return new Promise((resolve, reject) => {
        let query = 'insert into tbTipo (id, descricao) values (?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [tipo.id, tipo.descricao],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);

                }),
                error => {
                    console.log(error);
                    resolve(false);
                }
        })
    })
}

export function atualizaTipo(tipo) {
    return new Promise((resolve, reject) => {
        let query = 'update tbTipo set descricao=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [tipo.descricao, tipo.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                }),
                error => {
                    console.log(error);
                    resolve(false);
                }
        })
    })
}

export function deletaTipo(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbTipo where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                }),
                error => {
                    console.log(error);
                    resolve(false);
                }
        })
    })
}