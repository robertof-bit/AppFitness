import express from 'express'
import cors from 'cors'
import pool from './database'

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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})