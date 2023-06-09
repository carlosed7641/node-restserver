import { Router } from 'express'
import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from '../controllers/user.js'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validate-fields.js'
import Role from '../models/role.js'


export const router = Router()


router.get('/', usersGet)

router.put('/:id', usersPut)

router.post('/', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( async (role = '') => {
        const existRole = await Role.findOne({ role })
        if (!existRole) throw new Error(`El rol ${role} no está registrado en la BD`)
    }),
    validateFields
],
usersPost)

router.delete('/', usersDelete)

router.patch('/', usersPatch)