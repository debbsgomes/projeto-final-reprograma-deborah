const psiquiatrasBipolarSchema = require("../models/psiquiatrasBipolarSchema");
const mongoose = require('mongoose');

const getAll = async(req, res) => {
    try{
        const psiquiatrasBipolar = await psiquiatrasBipolarSchema.find();
        res.status(200).json({
            message: "Psiquiatra encontrado com sucesso",
            psiquiatrasBipolar
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createPsiquiatra = async (req, res) => {
    try {
        const newPsiquiatra = new psiquiatrasBipolarSchema({
            name: req.body.name,
            adress: req.body.adress,
            email: req.body.email,
            telephoneNumber: req.body.telephoneNumber,
            crm: req.body.crm,
            _id: new mongoose.Types.ObjectId()
        })

        const savedPsiquiatra = await newPsiquiatra.save()
        res.status(200).json({
            message: "Psiquiatra adicionade com sucesso!",
            savedPsiquiatra
        })
    } catch (error) {
        res.status(500).json({
        message: error.message         
        })
    }
}

const updatePsiquiatraById = async (req, res) => {
    try {
        const findPsiquiatra = await psiquiatrasBipolarSchema.findById(req.params.id)
        console.log(findPsiquiatra)

        if (findPsiquiatra) {
            findPsiquiatra.name = req.body.name || findPsiquiatra.name
            findPsiquiatra.adress = req.body.adress || findPsiquiatra.adress
            findPsiquiatra.email = req.body.email || findPsiquiatra.email
            findPsiquiatra.telephoneNumber = req.body.telephoneNumber || findPsiquiatra.telephoneNumber
            findPsiquiatra.crm = req.body.crm || findPsiquiatra.crm
        }

        const savedPsiquiatra = await findPsiquiatra.save()
        console.log('Após Atualização', savedPsiquiatra)

        res.status(200).json({
            message: "Psiquiatra atualizade com sucesso!!!",
            savedPsiquiatra
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deletePsiquiatraById = async (req, res) => {
    try {
        const psiquiatraFound = await psiquiatrasBipolarSchema.findById(req.params.id)

        await psiquiatraFound.delete()

        res.status(200).json({
            message: `Psiquiatra '${psiquiatraFound.name}' deletado com sucesso!`        
        })
    } catch (error) {
        res.status(400).json({
            message: erro.message
        })
    }
}



module.exports = {
    getAll,
    createPsiquiatra,
    updatePsiquiatraById,
    deletePsiquiatraById
}