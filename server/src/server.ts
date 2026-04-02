import express from 'express'
import cors from 'cors'
import pool from './database'
import { createUser, getUser, updateUser, deleteUser } from './controllers/usersController'
import { register, login } from './controllers/authController'


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

//CRUD - Informações

app.post('/usuarios', createUser)

app.get('/usuarios/:id', getUser)

app.put('/usuarios/:id', updateUser)

app.delete('/usuarios/:id', deleteUser)

//Autenticação JWT

app.post('/auth/register', register)

app.post('/auth/login', login)


// PORTA

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

