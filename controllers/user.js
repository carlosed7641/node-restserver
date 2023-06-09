import { response } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'

export const usersGet = (req, res = response) => {

    const { q, name = 'No name', apikey, page = 1, limit = 10 } = req.query

    res.json({
        msg: 'get API',
        q,
        name,
        apikey,
        page,
        limit
    })
}

export const usersPut = (req, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'put API',
        id
    })
}


export const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    // Verificar si el correo existe
    const existEmail = await User.findOne({ email })


    if (existEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        })
    }


    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    // Guardar en DB
    await user.save()

    res.json({
        user
    })
}


export const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

export const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API'
    })
}