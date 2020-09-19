const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const mongoose = require('mongoose')

const getAllCategory = async (req, res, next) => {
    try {

        const foundList = await Category.find({})
        return res.status(201).send({
            success: true,
            data: foundList
        })
    } catch (error) {
        next(error);
    }
}


const addCategory = async (req, res, next) => {
    try {
        const {
            name
        } = req.body;
        const {userId} = req.params;
        if (!name) {
            return res.status(400).send({
                success: false,
                message: `Field can't be empty`
            })
        }

        const category = new Category({
            name
        })
        const savedCategory = await category.save(category);
        return res.status(201).send({
            success: true,
            message: `Category created successfully`,
            data: savedCategory
        })
    } catch (error) {
        next(error);
    }
}


const getCategoryById = async (req, res, next) => {
    try {
        const {
            categoryId
        } = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({
                message: `Provided id is not valid`
            })
        }

        const resposne = await Category.findOne({
            _id: categoryId
        })
        if (!resposne) {
            return res.status(404).send({
                message: `Not category found!`
            })
        }
        return res.send({
            data: resposne
        })
    } catch (error) {
        next(error);
    }
}


const deleteCategoryById = async (req, res, next) => {
    try {
        const {
            categoryId
        } = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({
                message: `Provided id is not valid`
            })
        }

        const resposne = await Category.findOne({
            _id: categoryId
        })
        if (!resposne) {
            return res.status(404).send({
                message: `No category found!`
            })
        }
        await Category.deleteOne({_id: categoryId})
        return res.send({
            succcess: true,
            message: `Category deleted successfully~`
        })
    } catch (error) {
        next(error);
    }
}


const updateCategory = async (req, res, next) => {
    try {
        const {
            categoryId
        } = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({
                message: `Provided id is not valid`
            })
        }

        const resposne = await Category.findOne({
            _id: categoryId
        })
        if (!resposne) {
            return res.status(404).send({
                message: `No category found!`
            })
        }
        const { manufacturer, brandName, genericName, strength, dosageType, price, countInStock }= req.body;
        // const newProduct = new Product({
        //     manufacturer,
        //     brandName,
        //     genericName,
        //     strength,
        //     dosageType,
        //     price,
        //     quantity
        // });
        await Category.updateOne({_id: categoryId}, {
            $set: req.body
        }, {
            new: true,
            upsert:true,
            runValidators: true
        })
        return res.send({
            succcess: true,
            message: `Category deleted successfully~`
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategoryById,
    getAllCategory

}