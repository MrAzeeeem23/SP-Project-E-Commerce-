import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler( async(req, res) => {
    try {
        const {name} = req.body;
        console.log(name)

        if (!name) {
            return res.json({error: "Name is required"})
        }

        const existingCategory = await Category.findOne({name});

        if(existingCategory){
            return res.json({ error: "Already exists"})
        }

        const category = await new Category({name}).save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
});

const updateCategory = asyncHandler(async(req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params

        const category = await Category.findOne({_id: categoryId })

        if (!category) {
            return res.status(404).json({error: "Category Not Found"})
        }

        category.name = name

        const updateCategory = await category.save()
        res.json(updateCategory)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const removeCategory = asyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.id)

    if(category){
        await Category.deleteOne({_id: category._id})
        res.json({ message: "Category removed"});
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const listCategory = asyncHandler(async(req,res) =>{
    const category = await Category.find({})
    res.json(category)
})

const readCategory = asyncHandler(async( req , res) => {
    try {
        
        const category = await Category.findOne({_id: req.params.id})
        res.json(category)
    } catch (error) {
        console.error(error)
        return res.status(400).josn(error.message)
    }
})

export { createCategory, 
    updateCategory, 
    removeCategory, listCategory, readCategory}