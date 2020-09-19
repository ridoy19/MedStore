const Product = require('../models/product');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');

const addProduct = async (req, res, next) => {
    try {
        let count = 0;
        fs.createReadStream('drugs.csv')
            .pipe(csv())
            .on('data', (data) => {
                const newProduct = new Product({
                    manufacturer: data['manufacturer'],
                    brandName: data['brandName'],
                    genericName: data['genericName'],
                    strength: data['strength'],
                    dosageType: data['dosageType'],
                    price: data['price'],
                });

                newProduct.save((err, item) => {
                    if (item) {
                        count++
                        console.log(", " + count);
                    }
                    if (err) {
                        console.log(err)
                        //res.send(err)
                    }
                });
            })
            .on('end', () => {
                console.log("Done");
            });
    } catch (error) {
        next(error);
    }
}


const getProductById = async (req, res, next) => {
    try {
        const {
            productId
        } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({
                message: `Provided id is not valid`
            })
        }

        const resposne = await Product.findOne({
            _id: productId
        })
        if (!resposne) {
            return res.status(404).send({
                message: `Not product found!`
            })
        }
        return res.send({
            data: resposne
        })
    } catch (error) {
        next(error);
    }
}


const getAllProducts = async (req, res, next) => {
    try {

        const resposne = await Product.find({})
        if (resposne.length === 0) {
            return res.status(204).send({
                message: `No product found!`
            })
        }
        return res.send({
            data: resposne
        })
    } catch (error) {
        next(error);
    }
}


const deleteProductById = async (req, res, next) => {
    try {
        const {
            productId
        } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({
                message: `Provided id is not valid`
            })
        }

        const resposne = await Product.findOne({
            _id: productId
        })
        if (!resposne) {
            return res.status(404).send({
                message: `No product found!`
            })
        }
        await Product.deleteOne({_id: productId})
        return res.send({
            succcess: true,
            message: `Product deleted successfully~`
        })
    } catch (error) {
        next(error);
    }
}


const updateProduct = async (req, res, next) => {
    try {
        const {
            productId
        } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({
                message: `Provided id is not valid`
            })
        }

        const resposne = await Product.findOne({
            _id: productId
        })
        if (!resposne) {
            return res.status(404).send({
                message: `No product found!`
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
        await Product.updateOne({_id: productId}, {
            $set: req.body
        }, {
            new: true,
            upsert:true,
            runValidators: true
        })
        return res.send({
            succcess: true,
            message: `Product updated successfully~`
        })
    } catch (error) {
        next(error);
    }
}

const paginatedProducts = async (req, res, next) => {
    try {
        const paginate = req.query.paginate ? parseInt(req.query.paginate) : 50;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        const pagenatedResult = await Product
            .find({})
            .skip((page - 1) * paginate)
            .limit(paginate)
            .sort({
                createdAt: -1
            });

        if (pagenatedResult.length !== 0) {
            return res.send({
                data: pagenatedResult
            });
        } else {
            return res.status(204).send({
                message: `Product database empty`
            })
        }
    } catch (error) {
        next(error)
    }
}


const listProductByDosgaeType = async (req, res, next) => {
    try {
        const list = await Product.distinct('dosageType');
        console.log(list)

        return res.send({
            data: list
        })
    } catch (error) {
        next(error);
    }
}

const listProductByManufacturer = async (req, res, next) => {
    try {
        const list = await Product.distinct('manufacturer');
        return res.send({
            data: list
        })
    } catch (error) {
        next(error);
    }
}


const listProductSearch = async (req, res, next) => {
    const query = {};
    try {
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i'}
        }
        const list = await Product.find(query);
        console.log(list)
        // return res.send({
        //     data: list
        // })
    } catch (error) {
        next(error);
    }
}

const productSearchList = async (req, res, next) => {
    try {
        let order = req.body.order ? req.body.order : 'desc';
        let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = parseInt(req.body.skip);

        let findArgs = {};

        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === 'price') {
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    }
                }else {
                    findArgs[key] = req.body.filters[key];
                }
            }
        }

        const sortedData = await Product.find(findArgs).sort([[sortBy, order]]).skip(skip).limit(limit);
        return res.send({
            length: sortedData.length,
            data: sortedData
        })
    } catch (error) {
        next(error);
    }
}



module.exports = {
    addProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProductById,
    paginatedProducts,
    listProductSearch,
    listProductByDosgaeType,
    listProductByManufacturer,
    productSearchList
}