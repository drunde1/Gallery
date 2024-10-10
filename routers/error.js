const {Router} = require('express')
const router = Router()
const path = require("path");

router.get('/src/images/404.gif', (req,res) => {
    res.sendFile(path.join(__dirname, '../src/images', '404.gif'));
})

router.get('/src/css/error.css', (req,res) => {
    res.sendFile(path.join(__dirname, '../src/css', 'error.css'));
})

module.exports = router 