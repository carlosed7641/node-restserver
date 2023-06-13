import Role from '../models/role.js'
import User from '../models/user.js'


export const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({ role })
    if (!existRole) throw new Error(`El rol ${role} no está registrado en la BD`)
}

export const isEmailValid = async (email = '') => {
    // Verificar si el correo existe
    const existEmail = await User.findOne({ email })
    if (existEmail) throw new Error(`El correo ${email} ya está registrado`)
}

export const existUserById = async (id) => {
    // Verificar si el correo existe
    const existUser = await User.findById(id)
    if (!existUser) throw new Error(`El id ${id} no existe`)
}