const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const errorRouter = require('./routers/error')
const authoRouter = require('./routers/authoRouter')
const usersRouter = require('./routers/usersRouter')
const worksRouter = require('./routers/worksRouter')
const exhsRouter = require('./routers/exhibitionRouter')
const cabinetRouter = require('./routers/cabinetRouter')

app.use(express.json());

app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/js'));

app.use(errorRouter)
app.use('/autho', authoRouter)
app.use('/users', usersRouter)
app.use('/works', worksRouter)
app.use('/exhs', exhsRouter)
app.use('/cabinet', cabinetRouter)

app.get('/isAccessed', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    var roles = ['ADMIN', 'MANAGER']
    if (!token){
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
    const {roles: userRoles} = jwt.verify(token, secret)
    let hasRole = false
    userRoles.forEach(role => {
        if (roles.includes(role)) {
            hasRole = true
        }
    });
    return res.json({hasRole})
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/html', '404.html'));
})

app.get('/authorization', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html', 'authorization.html'))
})

async function start() {

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Gallery', {
            useNewUrlParser: true
        })
        .then(() => console.log('DB has been conected...'))
        .catch(e => console.log(e));
        app.listen(PORT,() =>{
            console.log('Server has been started...')
        });
    }
    catch(err) {
        return console.log(err);
    }
}


const User = require('./models/User')

start();
process.on("SIGINT", async() => {

    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});