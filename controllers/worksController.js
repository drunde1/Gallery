const Work = require('../models/Work')

class worksController{
    async deleteWork(req, res){
        try{
            const {name} = req.body
            const work = await Work.findOne({name})
            console.log(work)

            if (!work){
                return res.status(400).json({message: `Работа ${name} не найдена`})
            }
            const result = await work.deleteOne({name})
            if (!result){
                return res.status(400).json({message: `Работа ${name} не удалена`})
            }
            return res.status(200).json({message: `Работа ${name} удалена`})
        }catch(e){
            console.log("deleteWork error")
            return res.json({message: "deleteWork error"})
        }
    }

    async addWork(req,res){
        try{
            const {name, genre, author, date, imageURL} = req.body
            const candidate = await Work.findOne({name})
            console.log(candidate)
            if (candidate){
                return res.status(400).json({message: "Такая работа уже существует"})
            }
            const work = new Work({name:name, genre: genre, author: author, date: date, imageURL: imageURL})
            await work.save()
            return res.json({message: "Работа добавлена"})
        } catch(e){
            console.log("addWork error")
            return res.json({message: "addWork error"})
        }
    }

    async getWorks(req, res){
        try{
            const filters = req.params.filters.split(',')
            if (filters[0] === '' && filters[1] === '' && filters[2] === ''){
                const works = await Work.find()
                res.json(works)
            }else if (filters[0] === '' && filters[1] === '' && filters[2] !== ''){
                const works = await Work.find({genre: filters[2]})
                res.json(works)
            }else if (filters[0] === '' && filters[1] !== '' && filters[2] === ''){
                const works = await Work.find({author: filters[1]})
                res.json(works)
            }else if (filters[0] === '' && filters[1] !== '' && filters[2] !== ''){
                const works = await Work.find({author: filters[1], genre: filters[2]})
                res.json(works)
            }else if (filters[0] !== '' && filters[1] === '' && filters[2] === ''){
                const works = await Work.find({name: filters[0]})
                res.json(works)
            }else if (filters[0] !== '' && filters[1] === '' && filters[2] !== ''){
                const works = await Work.find({name: filters[0], genre: filters[2]})
                res.json(works)
            }else if (filters[0] !== '' && filters[1] !== '' && filters[2] === ''){
                const works = await Work.find({name: filters[0], author: filters[1]})
                res.json(works)
            }else if (filters[0] !== '' && filters[1] !== '' && filters[2] !== ''){
                const works = await Work.find({name: filters[0], author: filters[1], genre: filters[2]})
                res.json(works)
            }
        } catch(e){
            console.log("getWork error")
            return res.json({message: "getWork error"})
        }
    }
}

module.exports = new worksController()   


