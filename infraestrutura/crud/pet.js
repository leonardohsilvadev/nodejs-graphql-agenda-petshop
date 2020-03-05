const executaQuery = require('../database/queries')

class Pet {
  lista() {
    const sql = 'SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id as donoId, Clientes.nome as donoNome, Clientes.cpf as donoCpf FROM Pets INNER JOIN Clientes WHERE Pets.donoId = Clientes.id'

    return executaQuery(sql).then(pets => pets.map(pet => ({
      id: pet.id,
      nome: pet.nome,
      tipo: pet.tipo,
      observacoes: pet.observacoes,
      dono: {
        id: pet.donoId,
        nome: pet.donoNome,
        cpf: pet.donoCpf
      }
    })))
  }

  buscaPorId(res, id) {
    const sql = `SELECT * FROM Pets WHERE id=${parseInt(id)}`

    executaQuery(res, sql)
  }

  adiciona(item) {
    const { nome, donoId, tipo, observacoes } = item

    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`

    return executaQuery(sql).then(({ insertId }) => ({
      id: insertId,
      nome,
      donoId,
      tipo,
      observacoes
    }))
  }

  atualiza(res, novoItem, id) {
    const { nome, dono, tipo, observacoes } = novoItem

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${dono}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}`

    executaQuery(res, sql)
  }

  deleta(res, id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`

    executaQuery(res, sql)
  }
}

module.exports = new Pet
