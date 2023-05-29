import { response } from 'express';

export const usersGet =  (req, res = response) => {

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

export const usersPut =  (req, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'put API',
        id
    })
}


export const usersPost =  (req, res = response) => {

    const { name, age } = req.body
    
    res.json({
        msg: 'post API',
        name,
        age
    })
}


export const usersDelete =  (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

export const usersPatch =  (req, res = response) => {
    res.json({
        msg: 'patch API'
    })
}