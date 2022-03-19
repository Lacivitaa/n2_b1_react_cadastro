import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
  const cx = SQLite.openDatabase('dbAtividades.db')
  return cx;
}

export async function createTable() {
  return new Promise((resolve, reject) => {
    const queryAtividades = `CREATE TABLE IF NOT EXISTS tbAtividades (
        id TEXT NOT NULL PRIMARY KEY,
        descricao TEXT NOT NULL,
        local TEXT NOT NULL,
        data TEXT NOT NULL,
        hora TEXT NOT NULL,
        status INT NOT NULL,
        tipo TEXT NOT NULL,
        FOREIGN KEY(tipo) REFERENCES tbTipo(id)
      )`;

    const queryTipos = `CREATE TABLE IF NOT EXISTS tbTipo (
        id text not null primary key,
        descricao text not null)`;

    let dbCx = getDbConnection();
    dbCx.transaction(tx => {
      tx.executeSql(
        queryTipos, [], (tx, resultado) => resolve(true)
      )
      tx.executeSql(
        queryAtividades, [], (tx, resultado) => resolve(true)
      )
    },
      error => {
        console.log(error);
        resolve(false);
      }
    )
  })
}