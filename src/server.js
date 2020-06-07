//Criação do servidor
const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({
    extended: true
}))





//Configurar caminhos da minha aplicação
//Página inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => { // configuração de rota
    return res.render("index.html")
})




server.get("/create-point", (req, res) => {
    //req.query ->  consegue pegar as informações que estão na url
    //req.query()
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body: O corpo do nosso formulário
    // console.log(req.body)

    //inserir dados no banco de dados
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items


    ]

    function afterInsertData(err) { // depois de inserir dados
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this) //this -> é um objeto que está nessa função e está referenciando o que o run está trazendo

        return res.render("create-point.html", {
            saved: true
        })
    }

    db.run(query, values, afterInsertData)


})



server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {
            total: 0
        })
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {
            places: rows,
            total: total
        })
    })
})



//Ligar o servidor
server.listen(3000)