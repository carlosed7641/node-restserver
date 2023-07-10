import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth.js'
import { validateFields } from '../middlewares/index.js'


export const auth = Router()

auth.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login)