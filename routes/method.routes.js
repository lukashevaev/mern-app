const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Service = require('../models/Service')
const router = Router()

router.get('/services',
    [
        check('name', 'Incorrect name').isString(),
        check('price', 'Incorrect price').isNumeric()
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
                message: "Incorrect data"
            })
        }
        const{name, price} = request.body

        const service = await Service.findOne({name: name != null ? name : /.*/, price: price != null ? price : /.*/})

        if (!service) {
            return response.status(400).json({message: "Сервис не найден"})
        }
        response.json({service})
    } catch (e) {
        response.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/post',
    [
        check('name', 'Incorrect name').isString(),
        check('price', 'Incorrect price').isNumeric()
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request)
        console.log(request.body)

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
                message: "Incorrect data"
            })
        }
        const{name, price} = request.body

        const candidate = await Service.findOne({name})
        if (candidate) {
            return response.status(400).json({message: "Такой сервис уже существует"})
        }
        const service = new Service({name, price})

        await service.save()

        response.status(201).json({message: 'Сервис создан'})

    } catch (e) {
        response.status(500).json({message: 'Something went wrong'})
    }
})

router.get('/delete', async (request, response) => {

})

module.exports = router