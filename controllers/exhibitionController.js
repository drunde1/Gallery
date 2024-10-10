const Work = require('../models/Work')
const Exhibition = require('../models/Exhibition')
const Feedback = require('../models/Feedback')
const Ticket = require('../models/Ticket')
const User = require('../models/User')
const {secret} = require('../config')
const jwt = require('jsonwebtoken')

class exhibitionController{
    async buyTicket(req,res){
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

            const {exhID, name, surname, phone} = req.body

            const exh = Exhibition.findOne({_id:exhID})

            const ticket = new Ticket({user:user.username, exh: exh.name, name: name, surname: surname, phone: phone})
            await ticket.save()
            return res.json({message: "Билет куплен"})
        }catch(e){
            
        }
    }

    async popWorkFromExh(req, res){
        try {
            const {name, _id} = req.body
            const exh = await Exhibition.findOne({_id})
            if (!exh){
                return res.status(400).json({message: `Выставка не найдена`})
            }
            if (exh.works.indexOf(name) !== -1){
                exh.works.pop(name)
            
                await Exhibition.updateOne(
                    {_id: _id},
                    {
                        $set: {works: exh.works},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            res.json({message: 'Edited'})
        } catch(e) {

        }
    }

    async addWorkToExh(req, res){
        try {
            const {name, _id} = req.body
            const exh = await Exhibition.findOne({_id})
            if (!exh){
                return res.status(400).json({message: `Выставка не найдена`})
            }
            if (exh.works.indexOf(name) === -1){
                exh.works.push(name)
            
                await Exhibition.updateOne(
                    {_id: _id},
                    {
                        $set: {works: exh.works},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            res.json({message: 'Edited'})
        } catch(e) {

        }
    }

    async editExh(req, res){
        try {
            const {_id, name, date_start, date_end, info, cost} = req.body
            const exh = await Exhibition.findOne({_id})
            if (!exh){
                return res.status(400).json({message: `Выставка ${name} не найдена`})
            }

            if (exh.name !== name){
                await Exhibition.updateOne(
                    {_id: _id},
                    {
                        $set: {name: name},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            if (exh.date_start !== date_start){
                await Exhibition.updateOne(
                    {_id: _id},
                    {
                        $set: {date_start: date_start},
                        $currentDate: { lastModified: true }
                    }
                )
            } 
            if (exh.date_end !== date_end){
                await Exhibition.updateOne(
                    {_id: _id},
                    {
                        $set: {date_end: date_end},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            if (exh.info !== ''){
                await Exhibition.updateOne(
                    {_id: _id},
                    {
                        $set: {info: info},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            if (exh.cost !== ''){
                await Exhibition.updateOne(
                    {_id: _id},
                    {
                        $set: {cost: cost},
                        $currentDate: { lastModified: true }
                    }
                )
            }
            res.json({message: "Edited"})
        } catch(e){

        }
    }

    async getOutWorks(req, res){
        try{
            // const names = (req.params.names) ? (req.params.names.split(",")) : ([])
            const _id = req.params.names
            const exh = await Exhibition.findOne({_id})
            
            const works = await Work.find({name: {$nin: exh.works}})

            res.json(works)
        } catch(e){
            console.log("getWork error")
            return res.json({message: "getWork error"})
        }
    }

    async getInWorks(req, res){
        try{
            // const names = (req.params.names) ? (req.params.names.split(",")) : ([])
            const _id = req.params.names
            const exh = await Exhibition.findOne({_id})
            const works = await Work.find({name: {$in: exh.works}})
            res.json(works)
        } catch(e){
            console.log("getWork error")
            return res.json({message: "getWork error"})
        }
    }

    async addExh(req, res){
        try{
            const {name, date_start, date_end, info, cost} = req.body
            const candidate = await Exhibition.findOne({name})
            if (candidate){
                return res.status(400).json({message: "Такая выставка уже существует"})
            }
            const exh = new Exhibition({name:name, date_start: date_start, date_end: date_end, info: info, cost:cost, works: []})
            await exh.save()
            return res.json({message: "Выставка добавлена"})
        }catch(e){
            
        }
    }

    async getExhs(req,res){
        try{
            const exhs = await Exhibition.find()
            res.json(exhs)
        } catch(e){
            console.log("getWork error")
            return res.json({message: "getWork error"})
        }
    }

    async getFeedbacks(req, res){
        try{
            // const names = (req.params.names) ? (req.params.names.split(",")) : ([])
            const _id = req.params.names
            const exh = await Exhibition.findOne({_id})
            const feedbacks = await Feedback.find({exh: exh.name})

            res.json(feedbacks)
        } catch(e){
            console.log("getWork error")
            return res.json({message: "getWork error"})
        }
    }

    async addFeedback(req, res){
        try{
            const token = req.headers.authorization.split(' ')[1]

            if (!token){
                return res.status(403).json({message: "Пользователь не авторизован"})
            }

            const id = jwt.verify(token, secret)
            const {exhID, value, mark} = req.body

            const user = await User.findOne({_id:id.id})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            

            const exh = await Exhibition.findOne({_id:exhID})

            const feedback = new Feedback({exh: exh.name, username: user.username, value: value, mark: mark})
            await feedback.save()
            return res.json({message: "Билет куплен"})
        }catch(e){
            
        }
    }

    async deleteFeedback(req, res){
        try{
            const {_id} = req.body
            const feedback = await Feedback.findOne({_id})
            if (!feedback){
                return res.status(400).json({message: `Отзыв не найден`})
            }
            const result = await Feedback.deleteOne({_id})
            if (!result){
                return res.status(400).json({message: `Отзыв не удален`})
            }
            return res.status(200).json({message: `Отзыв удален`})
        } catch(e){
            console.log(e)
            res.status(400).json({message: "delete error"})
        }
    }

    async deleteExh(req, res){
        try{
            const {_id} = req.body
            const exh = await Exhibition.findOne({_id})
            if (!exh){
                return res.status(400).json({message: `Выставка не найдена`})
            }
            const result = await Exhibition.deleteOne({_id})
            if (!result){
                return res.status(400).json({message: `Выставка не удалена`})
            }
            return res.status(200).json({message: `Выставка удалена`})
        } catch(e){
            console.log(e)
            res.status(400).json({message: "delete error"})
        }
    }
}

module.exports = new exhibitionController()   
