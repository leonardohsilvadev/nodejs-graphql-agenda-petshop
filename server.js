const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const operations = require('./infraestrutura/operations')

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const Clientes = new operations('cliente')

const resolvers = {
  Query: {
    status: () => "Servidor rodando!",
    clientes: () => Clientes.lista()
  },
  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params)
  }
}

const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

servidor.start(() => console.log('servidor escutando'))