import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()

app.use(express.json())
app.use(cors())

const pool = mysql.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Test connection (Optional, just to log success)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err)
    } else {
        console.log('Conectado ao pool de conexões MySQL')
        connection.release()
    }
})

app.post('/products', (req, res) => {
    const { name, price, description, category } = req.body

    const query = 'INSERT INTO produtos_sophiaakemi (name, price, description, category) VALUES (?, ?, ?, ?)'
    const values = [name, price, description, category]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao salvar produto:', err)
            res.status(500).json({ message: 'Erro ao salvar produto', error: err })
        } else {
            res.status(201).json({ message: 'Produto salvo com sucesso!' })
        }
    })
})

app.get('/products', (req, res) => {
    const query = 'SELECT id, name, price, description, category FROM produtos_sophiaakemi'

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err)
            res.status(500).json({ message: 'Erro ao buscar produtos', error: err })
        } else {
            res.status(200).json(results)
        }
    })
})

app.delete('/products/:id', (req, res) => {
    const { id } = req.params

    const query = 'DELETE FROM produtos_sophiaakemi WHERE id = ?'

    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto:', err)
            res.status(500).json({ message: 'Erro ao deletar produto', error: err })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Produto não encontrado' })
        } else {
            res.status(200).json({ message: 'Produto deletado com sucesso!' })
        }
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
