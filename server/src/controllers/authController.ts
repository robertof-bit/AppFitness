import { Request, Response } from 'express'
import pool from '../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Registro de usuário

export const register = async (req: Request, res: Response) => {

    try {

        const { nome, email, senha } = req.body

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const resultado = await pool.query(
            'INSERT INTO appfit (nome, email, senha) VALUES ($1, $2, $3) RETURNING*',
            [nome, email, senhaCriptografada]
        )

        res.json(resultado.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: 'Erro ao registrar usuário' })
    }
}


// Login usuário

export const login = async (req: Request, res: Response) => {

    try {

        const { email, senha } = req.body

        const resultado = await pool.query(
            'SELECT * FROM appfit WHERE email = $1', [email])

        if (!resultado.rows[0]) {
            return res.json({ mensagem: 'Email não encontrado! ' })
        }

        const senhaCorreta = await bcrypt.compare(senha, resultado.rows[0].senha)

        if (!senhaCorreta) {
            return res.json({ mensagem: 'Senha Incorreta!' })
        }

        const { senha: _, ...usuarioSemSenha } = resultado.rows[0]

        const token = jwt.sign(
            { id: resultado.rows[0].id, email: resultado.rows[0].email },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        res.json({ token, usuario: usuarioSemSenha })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: 'Erro ao fazer login' })
    }
}