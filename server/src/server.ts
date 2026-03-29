import express from 'express'
import cors from 'cors'
import pool from './database'
import { createUser, getUser, updateUser, deleteUser } from './controllers/usersController'


const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/health', async (req, res) => {
    const resultado = await pool.query('SELECT NOW()')
    res.json({
        status: 'Servidor rodando!',
        banco: 'Conectado!',
        hora: resultado.rows[0].now
    })
})

app.post('/users', createUser)

app.get('/users/:id', getUser)

app.put('/users/:id', updateUser)

app.delete('/users/:id', deleteUser)



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

