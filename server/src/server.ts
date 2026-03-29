import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({ status: 'Servidor rodando!' })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})