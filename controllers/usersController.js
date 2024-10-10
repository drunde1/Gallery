const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// //const {secret} = require('../config')
const {validationResult} = require('express-validator')

// const generateAccessToken = (id, roles) => {
//     const payload = {
//         id,
//         roles
//     }
//     return jwt.sign(payload, secret, {expiresIn: "24h"})
// }

class userController {
    // async registration(req, res){
    //     try{
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty()){
    //             return res.status(400).json({message:"Ошибка при регистрации", errors} )
    //         }
    //         const {username, password} = req.body
    //         const candidate = await User.findOne({username})
    //         if (candidate){
    //             return res.status(400).json({message: "Пользователь с таким ником уже существует"})
    //         }
    //         const hashPassword = bcrypt.hashSync(password, 5)
    //         const userRole = await Role.findOne({value: "GUEST"}) 
    //         const user = new User({username, password: hashPassword, roles: [userRole.value]}) 
    //         await user.save()
    //         return res.json({message: "Пользователь зарегестрирован"})
    //     } catch(e){

    //     }
    // }

    // async login(req, res){
    //     try {
    //         const {username, password} = req.body
    //         const user = await User.findOne({username})
    //         if (!user){
    //             console.log("USER: ", username)
    //             return res.status(400).json({message: `Пользователь ${username} не найден`})
    //         }
    //         const validPassword = bcrypt.compareSync(password, user.password)
    //         if (!validPassword){
    //             return res.status(400).json({message: 'Неверный пароль'})
    //         }
    //         const token = generateAccessToken(user._id, user.roles)
    //         return res.json({token})
    //     } catch(e){
    //         console.log(e)
    //         res.status(400).json({message: "login error"})
    //     }
    // }
    async editUser(req, res){
        try {
            const {_id, username, password, roles, name, surname, phone} = req.body
            const user = await User.findOne({_id})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }

            if (user.username !== username){
                await User.updateOne(
                    {_id: _id},
                    {
                        $set: {username: username},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            if (user.roles !== roles){
                await User.updateOne(
                    {_id: _id},
                    {
                        $set: {roles: roles},
                        $currentDate: { lastModified: true }
                    }
                )
            } 
            if (password !== ''){
                const hashPassword = bcrypt.hashSync(password, 5)
                await User.updateOne(
                    {_id: _id},
                    {
                        $set: {password: hashPassword},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            if (user.name !== ''){
                await User.updateOne(
                    {_id: _id},
                    {
                        $set: {name: name},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            if (user.surname !== ''){
                await User.updateOne(
                    {_id: _id},
                    {
                        $set: {surname: surname},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            if (user.phone !== ''){
                await User.updateOne(
                    {_id: _id},
                    {
                        $set: {phone: phone},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            res.json({message: "Edited"})
        } catch(e){

        }
    }

    async addUser(req, res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors} )
            }
            const {username, password, role, name, surname, phone} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "Пользователь с таким ником уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 5)
            const userRole = await Role.findOne({value: role}) 
            const user = new User({username, password: hashPassword, roles: [userRole.value], name: name, surname: surname, phone: phone}) 
            await user.save()
            return res.json({message: "Пользователь зарегестрирован"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: "add error"})
        }
    }

    async deleteUser(req, res){
        try{
            const {username} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const result = await user.deleteOne({username})
            if (!result){
                return res.status(400).json({message: `Пользователь ${username} не удален`})
            }
            return res.status(200).json({message: `Пользователь ${username} удален`})
        } catch(e){
            console.log(e)
            res.status(400).json({message: "delete error"})
        }
    }

    async getUsers(req, res){
        try {
            const params = req.params.filters.split(",")
            if(params[0] === '' && params[1] === 'NONE'){
                const users = await User.find()
                res.json(users)
            } else if (params[0] === '' && params[1] !== 'NONE'){
                const users = await User.find({roles:[params[1]]})
                res.json(users)
            }
            else if (params[0] !== '' && params[1] === 'NONE'){
                const users = await User.find({username:params[0]})
                res.json(users)
            }
            else if (params[0] !== '' && params[1] !== 'NONE'){
                const users = await User.find({username: params[0], roles:[params[1]]})
                res.json(users)
            }
        } catch(e){
            console.log(e)
            res.status(400).json({message: "getUsers error"})
        }
    }
}

module.exports = new userController()   