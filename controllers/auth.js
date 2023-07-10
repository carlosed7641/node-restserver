import { response } from "express"
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { generateJWT } from "../helpers/generare-jwt.js"

export const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

        // Verificar si el email existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        // Si el usuario está activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        // Generar el JWT
        const token = await generateJWT(user.id)




        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}