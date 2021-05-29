 const express = require("express");
 const app = express();
 const connection = require("./database/database")
 const Pergunta = require("./database/Pergunta")
 const Resposta = require("./database/Resposta")

//estrutura promisser
connection
   .authenticate()
   .then(() => {
      console.log('Conexão feita com o banco de dados!')
   })
   .catch((msgErro) => {
      console.log('Erro na conexção!')
   })

//estou dizendo para o Express usar o ejs como view engine (renderizador de HTML)
app.set('view engine', 'ejs')
app.use(express.static("public"))

//Body parses
app.use (express.urlencoded ({
   extended: true
}))

app.use (express.json())
 
app.get("/", (req, res) => {
   //SELECT * FROM perguntas
   Pergunta.findAll( {raw: true, order: [
      ['createdAt','DESC']
   ]}).then(perguntas => {
      res.render("index", {
         perguntas: perguntas
      })
   })
})

app.get("/perguntar", (req, res) => {
   res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {

   var titulo = req.body.titulo
   var descricao = req.body.descricao

   Pergunta.create({
      titulo: titulo,
      descricao: descricao
   }).then(() => {
      res.redirect("/")
   })
})

app.get("/pergunta/:id", (req, res) => {
   var id = req.params.id
   Pergunta.findOne({
      where: {id: id}
   }).then(pergunta => {
      if(pergunta != undefined) { //Pergunta encontrada

         Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [ 
               ['id', 'DESC']
            ]
         }).then(respostas => {
            res.render("pergunta", {
               pergunta: pergunta,
               respostas: respostas
            })
         })
      } else { //Não encontrada
         res.redirect('/')
      }
   })
})

app.post("/responder", (req, res) => {
   var corpo = req.body.corpo
   var perguntaId = req.body.pergunta

   Resposta.create({
      corpo: corpo,
      perguntaId: perguntaId
   }).then(() => {
      res.redirect("/pergunta/" + perguntaId)
   })
})

app.listen(8080, () => {
   console.log("App rodando.")
})