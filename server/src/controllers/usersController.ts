import { Request, Response } from 'express'
import pool from '../database'
import { NOMEM } from 'node:dns'

export const createUser = async (req: Request, res: Response) => {
    const { nome, email, senha, idade, peso, altura, atividade, meta} = req.body

    const resultado = await pool.query(
        'INSERT INTO appfit (nome, email, senha, idade, peso, altura, atividade, meta) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*',[nome, email, senha, idade, peso, altura, atividade, meta] )

        res.json(resultado.rows[0])
    
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const resultado = await pool.query(
        'SELECT * FROM appfit WHERE id = $1', [id])

        res.json(resultado.rows[0])
    
    }


export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { nome, email, senha, idade, peso, altura, atividade, meta} = req.body


    const resultado = await pool.query(
        'UPDATE appfit SET nome = $1, email = $2, senha = $3, idade = $4, peso = $5, altura = $6, atividade = $7, meta = $8 WHERE id = $9 RETURNING *' ,[nome, email, senha, idade, peso, altura, atividade, meta, id])

        res.json(resultado.rows[0])

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const resultado = await pool.query(
        'DELETE FROM appfit WHERE id = $1', [id])

        res.json({ mensagem: 'Usuária deletada com sucesso!' })


}
