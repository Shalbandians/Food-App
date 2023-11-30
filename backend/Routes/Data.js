const express = require('express')
const router = express.Router()
const data = require('../models/Data')

router.post('/data', (req, res) => {
    try {
        data.create({
            CategoryName: req.body.CategoryName,
            name: req.body.name,
            img: req.body.img,
            Option: {
                half: req.body.Option.half,
                full: req.body.Option.full,
            },
            description: req.body.description,


        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: flase })

    }
})
module.exports = router;