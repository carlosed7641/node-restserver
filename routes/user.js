import { Router } from 'express'
import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from '../controllers/user.js'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validate-fields.js'
import { existUserById, isEmailValid, isRoleValid } from '../helpers/db-validators.js'


export const router = Router()


router.get('/', usersGet)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isRoleValid),
    validateFields
],usersPut)

router.post('/', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom(isEmailValid),
    check('role').custom(isRoleValid),
    validateFields
],
usersPost)

router.delete('/', usersDelete)

router.patch('/', usersPatch)