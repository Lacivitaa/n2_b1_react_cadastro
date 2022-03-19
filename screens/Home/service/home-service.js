import * as SQLite from 'expo-sqlite';

export function getDbConnection(){
  const cx = SQLite.openDatabase('dbAtividades.db')
  return cx;
}

export function obtemTodasAtividades(){
    return new Promise ((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx =>{
            let query = 'select * from tbAtividades';
            tx.executeSql(query, [],
                (tx, registros) => {
                    var retorno = []
                    for (let n=0; n<registros.rows.length; n++){
                        let obj = {
                            id: registros.rows.item(n).id,
                            descricao: registros.rows.item(n).descricao,
                            tipo: registros.rows.item(n).tipo,
                            local: registros.rows.item(n).local,
                            data: registros.rows.item(n).data,
                            hora: registros.rows.item(n).hora,
                            status: registros.rows.item(n).status,
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno)
                })
        })
    })
}

export function concluiAtividade(atividade){
    return new Promise((resolve, reject) => {
        let query = 'update tbAtividades set status=1 where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [atividade.status],
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


