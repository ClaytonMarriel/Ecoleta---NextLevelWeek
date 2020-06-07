// importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose() // me retorna um objeto pra retornar no sqlite3

//criar o objeto que irá fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db") // iniciando um novo objeto

module.exports = db
// quando utilizo o "new", estou atribuindo um objeto no DB
//método -- função atrelada a um objeto - metodo
//utilizar o objeto de banco de dados para nossas operações

//db.serialize(() => { // irá rodar uma sequencia de código

//Com comandos SQL eu vou:

//1-Criar uma tabela com comandos SQL
/*  db.run(`
      CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          image TEXT,
          address TEXT,
          address2 TEXT,
          state TEXT,
          city TEXT,
          items TEXT
      );
  `)

  //2-Inserir dados na tabela
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items

  ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
      "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      "Papersider",
      "Guirme Gemballa, Jardim América",
      "Nº 260",
      "Santa Catarina",
      "Rio do Sul",
      "Resíduos Eletrônicos, Lâmpadas"
  ]

  function afterInsertData(err) { // depois de inserir dados
      if (err) {
          return console.log(err)
      }
      console.log("Cadastrado com sucesso")
      console.log(this) //this -> é um objeto que está nessa função e está referenciando o que o run está trazendo
  }

  db.run(query, values, afterInsertData)

  /*
      //3-Consultar dados da tabela
      db.all(`SELECT *FROM places`, function (err, rows) {
          if (err) {
              return console.log(err)
          }
          console.log("Aqui estão seus registros: ")
          console.log(rows)

      })*/

// 4 - Deletar um dado da tabela

//  db.run(`DELETE FROM places WHERE id = ?`, [21], function (err) {
//    if (err) {
//      return console.log(err)
//}

//console.log("Registro deletado com sucesso")
//})
//})