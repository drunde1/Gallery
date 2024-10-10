const User = require('../models/User')
const Ticket = require('../models/Ticket')
const {secret} = require('../config')
const jwt = require('jsonwebtoken')

class cabinetController{
    async getTickets(req,res){
        try{

            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(403).json({message: "Пользователь не авторизован"})
            }

            const id = jwt.verify(token, secret)
            const user = await User.findOne({_id:id.id})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const tickets = await Ticket.find({user: user.username})
            if (!tickets){
                return res.status(400).json({message: `У пользователя ${user.username} нет билетов`})
            }
            res.json(tickets)
        } catch(e){

        }
    }

    async getUser(req, res){
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const id = jwt.verify(token, secret)
            const user = await User.findOne({_id:id.id})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            res.json(user)
        } catch(e){

        }
    }

    async editUser(req, res){
        try {
            const token = req.headers.authorization.split(' ')[1]
            const {id: ID} = jwt.verify(token, secret)

            const {username, password, name, surname, phone} = req.body
            const user = await User.findOne({_id: ID})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            if (user.username !== username){
                await User.updateOne(
                    {_id: ID},
                    {
                        $set: {username: username},
                        $currentDate: { lastModified: true }
                    }
                )
            }

            if (password !== ''){

                const hashPassword = bcrypt.hashSync(password, 5)
                await User.updateOne(
                    {_id: ID},
                    {
                        $set: {password: hashPassword},
                        $currentDate: { lastModified: true }
                    }
                )
            }

            if (user.name !== name){
                await User.updateOne(
                    {_id: ID},
                    {
                        $set: {name: name},
                        $currentDate: { lastModified: true }
                    }
                )
            }

            if (true){
                await User.updateOne(
                    {_id: ID},
                    {
                        $set: {surname: surname},
                        $currentDate: { lastModified: true }
                    }
                )
            }

            if (user.phone !== phone){
                await User.updateOne(
                    {_id: ID},
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
}

module.exports = new cabinetController()   
